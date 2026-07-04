from __future__ import annotations

from dataclasses import asdict, dataclass, replace
import hashlib
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from importlib import resources
import json
import math
import os
from pathlib import Path
import re
from typing import Any, Iterable, Literal
from urllib.parse import unquote, urlsplit

from photonic_bench.json_report import REPORT_SCHEMA_VERSION
from photonic_bench.transformer import (
    TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION,
    TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION,
)


ArtifactKind = Literal["matmul_card", "transformer_layer", "transformer_model"]

ASSET_PACKAGE = "photonic_bench.visualizer_assets"
INDEX_JSON_PATH = "data/index.json"
INDEX_SCRIPT_PATH = "data/index.js"
PAYLOAD_DIR_PATH = "data/payloads"
STYLE_PATH = "assets/styles.css"
APP_SCRIPT_PATH = "assets/app.js"
PRESETS_JSON_PATH = "visualizer_presets.json"
PRESET_SCHEMA_VERSION = "photonic-bench-comparison-presets-v1"


@dataclass(frozen=True)
class ArtifactSummary:
    id: str
    kind: ArtifactKind
    schema_version: str
    benchmark_name: str
    description: str
    source_path: str
    browser_path: str
    macs: int
    equivalent_ops: int
    output_elements: int
    total_energy_pj: float
    energy_per_op_pj: float
    latency_label: str
    latency_ns: float
    throughput_equivalent_ops_per_second: float
    memory_traffic_bytes: float | None
    operational_intensity_ops_per_byte: float | None
    system_total_energy_pj: float | None
    system_energy_per_op_pj: float | None
    local_compute_and_conversion_energy_share: float | None
    movement_energy_pj: float | None
    movement_energy_share: float | None
    movement_to_compute_energy_ratio: float | None
    total_hierarchy_bytes: float | None
    hierarchy_equivalent_ops_per_byte: float | None
    movement_energy_per_hierarchy_byte_pj: float | None
    off_chip_traffic_share: float | None
    dominant_traffic_tier: str | None
    dominant_system_energy_component: str | None
    dominant_movement_energy_tier: str | None
    nominal_memory_bottleneck_tier: str | None
    contention_memory_bottleneck_tier: str | None
    max_tier_nominal_transfer_pressure_ratio: float | None
    max_tier_contention_adjusted_transfer_pressure_ratio: float | None
    max_tier_movement_energy_share: float | None
    max_tier_system_energy_share: float | None
    contention_bandwidth_saturation_tier: str | None
    max_tier_contention_bandwidth_utilization: float | None
    min_tier_contention_bandwidth_headroom_ratio: float | None
    bandwidth_limited_latency_ns: float | None
    bandwidth_pressure_ratio: float | None
    bandwidth_limited_throughput_equivalent_ops_per_second: float | None
    contention_adjusted_latency_ns: float | None
    contention_pressure_ratio: float | None
    contention_adjusted_throughput_equivalent_ops_per_second: float | None
    shared_bandwidth_clients: float | None
    bandwidth_arbitration_efficiency: float | None
    calibration_overhead_fraction: float | None
    contention_bandwidth_derate_factor: float | None
    total_transfer_overhead_fraction: float | None
    contention_only_loaded_bandwidth_bytes_per_ns: float | None
    contention_adjusted_loaded_bandwidth_bytes_per_ns: float | None
    transfer_to_compute_time_ratio: float | None
    contention_adjusted_transfer_to_compute_time_ratio: float | None
    system_profile: str | None
    memory_scenario: str | None
    system_profile_overrides: tuple[str, ...]
    memory_timing_mode: str | None
    contention_preset: str | None
    contention_overlap_model: str | None
    effective_transfer_time_ns: float | None
    effective_usable_bandwidth_under_load_bytes_per_ns: float | None
    guardbanded_usable_bandwidth_under_load_bytes_per_ns: float | None
    provenance_status: str
    has_published_reference: bool
    source_quality_grade: str | None
    source_surrogate_type: str | None
    assumptions_count: int
    has_calibration_fit: bool
    boundary_tags: tuple[str, ...]
    payload_path: str = ""
    payload_script_path: str = ""


@dataclass(frozen=True)
class ComparisonPreset:
    name: str
    description: str
    artifact_ids: tuple[str, ...]
    pinned_id: str | None
    analysis_intent: dict[str, Any]
    reviewer_notes: str
    source_path: str


@dataclass(frozen=True)
class VisualizerArtifact:
    summary: ArtifactSummary
    payload: dict[str, Any]


@dataclass(frozen=True)
class ArtifactIssue:
    source_path: str
    message: str


@dataclass(frozen=True)
class VisualizerData:
    reports_dir: str
    artifacts: tuple[VisualizerArtifact, ...]
    issues: tuple[ArtifactIssue, ...]
    comparison_presets: tuple[ComparisonPreset, ...] = ()

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    def to_index_dict(self) -> dict[str, Any]:
        return {
            "reports_dir": self.reports_dir,
            "artifacts": [
                {"summary": asdict(artifact.summary)} for artifact in self.artifacts
            ],
            "issues": [asdict(issue) for issue in self.issues],
            "comparison_presets": [
                asdict(preset) for preset in self.comparison_presets
            ],
            "data_layout": {
                "index_json": INDEX_JSON_PATH,
                "index_script": INDEX_SCRIPT_PATH,
                "payload_dir": PAYLOAD_DIR_PATH,
            },
            "modeling_boundaries": [
                "Local model estimates come from local_model fields.",
                "Published references remain separate under published_reference.",
                "Transformer aggregate timing is serial, not a fused scheduler claim.",
                "Transformer model timing is a weighted serial summary over layer summaries, not a fused full-model scheduler claim.",
                "Transformer aggregate noise is diagnostic and non-additive.",
                "Transformer-layer exclusions are not modeled matmul costs.",
                "Interface memory traffic is derived from converter bit widths and reuse counts, not a full memory hierarchy simulation.",
                "System movement energy is a local SRAM/intermediate/off-chip tier estimate added separately from core photonic compute/conversion energy.",
                "System profile names are local sensitivity presets, not measured hardware configurations.",
                "System memory timing can be overlapped or serialized depending on the explicit local timing mode.",
                "Contention metrics are local shared-bandwidth and calibration/control guardband assumptions, not paper-reported hardware claims.",
            ],
        }


@dataclass(frozen=True)
class VisualizerServerSite:
    data: VisualizerData
    payloads_by_path: dict[str, dict[str, Any]]


def discover_visualizer_data(
    reports_dir: Path,
    *,
    link_base_dir: Path | None = None,
    exclude_dirs: Iterable[Path] = (),
) -> VisualizerData:
    reports_root = reports_dir.resolve()
    if not reports_root.exists():
        raise ValueError(f"{reports_dir} does not exist")
    if not reports_root.is_dir():
        raise ValueError(f"{reports_dir} must be a directory")

    link_base = (link_base_dir or reports_root).resolve()
    excluded_roots = tuple(
        path.resolve()
        for path in (reports_root / "visualizer", *exclude_dirs)
        if path.exists()
    )
    artifacts: list[VisualizerArtifact] = []
    issues: list[ArtifactIssue] = []

    for path in sorted(reports_root.rglob("*.json")):
        if _is_below_any(path.resolve(), excluded_roots):
            continue
        if path.name == PRESETS_JSON_PATH:
            continue
        source_path = _source_path(path, reports_root)
        browser_path = _browser_path(path, link_base)
        try:
            artifacts.append(
                load_visualizer_artifact(
                    path,
                    source_path=source_path,
                    browser_path=browser_path,
                )
            )
        except ValueError as exc:
            issues.append(ArtifactIssue(source_path=source_path, message=str(exc)))

    artifacts.sort(key=lambda artifact: (artifact.summary.kind, artifact.summary.id))
    presets = _load_comparison_presets(reports_root, artifacts, issues)
    return VisualizerData(
        reports_dir=reports_dir.as_posix(),
        artifacts=tuple(artifacts),
        issues=tuple(issues),
        comparison_presets=presets,
    )


def load_visualizer_artifact(
    path: Path,
    *,
    source_path: str | None = None,
    browser_path: str | None = None,
) -> VisualizerArtifact:
    payload = _load_json_object(path)
    schema_version = _required_str(payload, "schema_version", source=path)
    source = source_path or path.as_posix()
    browser = browser_path or source

    if schema_version == REPORT_SCHEMA_VERSION:
        return _load_matmul_artifact(payload, source_path=source, browser_path=browser)
    if schema_version == TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION:
        return _load_transformer_layer_artifact(
            payload,
            source_path=source,
            browser_path=browser,
        )
    if schema_version == TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION:
        return _load_transformer_model_artifact(
            payload,
            source_path=source,
            browser_path=browser,
        )

    raise ValueError(f"{source}: unsupported schema_version {schema_version!r}")


def write_visualizer(reports_dir: Path, output_path: Path) -> VisualizerData:
    output_root = output_path.parent
    data = discover_visualizer_data(
        reports_dir,
        link_base_dir=output_root,
        exclude_dirs=(output_root,),
    )
    data = _with_payload_asset_paths(data)

    output_root.mkdir(parents=True, exist_ok=True)
    _write_static_assets(output_root)
    _write_data_assets(output_root, data)
    output_path.write_text(render_visualizer_html(data), encoding="utf-8")
    return data


def build_server_visualizer_site(reports_dir: Path) -> VisualizerServerSite:
    data = discover_visualizer_data(reports_dir)
    data = _with_server_payload_paths(data)
    payloads_by_path: dict[str, dict[str, Any]] = {}
    for artifact in data.artifacts:
        payloads_by_path[artifact.summary.payload_path] = artifact.payload
        payloads_by_path[artifact.summary.browser_path] = artifact.payload
    return VisualizerServerSite(
        data=data,
        payloads_by_path=payloads_by_path,
    )


def build_visualizer_http_server(
    reports_dir: Path,
    *,
    host: str,
    port: int,
) -> tuple[ThreadingHTTPServer, VisualizerServerSite]:
    site = build_server_visualizer_site(reports_dir)

    class VisualizerHandler(_VisualizerRequestHandler):
        server_site = site

    return ThreadingHTTPServer((host, port), VisualizerHandler), site


def render_visualizer_html(
    data: VisualizerData,
    *,
    stylesheet_path: str = STYLE_PATH,
    index_script_path: str = INDEX_SCRIPT_PATH,
    app_script_path: str = APP_SCRIPT_PATH,
) -> str:
    template = _read_asset("template.html")
    replacements = {
        "{{ artifact_count }}": str(len(data.artifacts)),
        "{{ issue_count }}": str(len(data.issues)),
        "{{ stylesheet_path }}": stylesheet_path,
        "{{ index_script_path }}": index_script_path,
        "{{ app_script_path }}": app_script_path,
    }
    for needle, value in replacements.items():
        template = template.replace(needle, value)
    return template


def _with_payload_asset_paths(data: VisualizerData) -> VisualizerData:
    return _with_payload_paths(data, include_script_path=True)


def _with_server_payload_paths(data: VisualizerData) -> VisualizerData:
    return _with_payload_paths(data, include_script_path=False)


def _with_payload_paths(
    data: VisualizerData,
    *,
    include_script_path: bool,
) -> VisualizerData:
    artifacts: list[VisualizerArtifact] = []
    for artifact in data.artifacts:
        stem = _payload_asset_stem(artifact.summary.source_path)
        payload_path = f"{PAYLOAD_DIR_PATH}/{stem}.payload.json"
        summary = replace(
            artifact.summary,
            payload_path=payload_path,
            payload_script_path=(
                f"{PAYLOAD_DIR_PATH}/{stem}.payload.js" if include_script_path else ""
            ),
        )
        artifacts.append(VisualizerArtifact(summary=summary, payload=artifact.payload))
    return VisualizerData(
        reports_dir=data.reports_dir,
        artifacts=tuple(artifacts),
        issues=data.issues,
        comparison_presets=data.comparison_presets,
    )


def _write_static_assets(output_root: Path) -> None:
    assets_dir = output_root / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    for asset_name in ("styles.css", "app.js"):
        (assets_dir / asset_name).write_text(_read_asset(asset_name), encoding="utf-8")


def _write_data_assets(output_root: Path, data: VisualizerData) -> None:
    data_dir = output_root / "data"
    payload_dir = output_root / PAYLOAD_DIR_PATH
    payload_dir.mkdir(parents=True, exist_ok=True)
    _remove_generated_payload_files(payload_dir)

    index_dict = data.to_index_dict()
    (data_dir / "index.json").write_text(_json_dump(index_dict), encoding="utf-8")
    (data_dir / "index.js").write_text(
        f"window.PhotonicBenchIndex = {_json_dump(index_dict)};\n",
        encoding="utf-8",
    )

    for artifact in data.artifacts:
        payload_json_path = output_root / artifact.summary.payload_path
        payload_script_path = output_root / artifact.summary.payload_script_path
        payload_json_path.write_text(_json_dump(artifact.payload), encoding="utf-8")
        payload_script_path.write_text(
            "window.PhotonicBenchPayloadRegistry = "
            "window.PhotonicBenchPayloadRegistry || {};\n"
            f"window.PhotonicBenchPayloadRegistry"
            f"[{json.dumps(artifact.summary.id)}] = {_json_dump(artifact.payload)};\n",
            encoding="utf-8",
        )


class _VisualizerRequestHandler(BaseHTTPRequestHandler):
    server_site: VisualizerServerSite

    def do_GET(self) -> None:
        route = _request_route(self.path)
        if route in ("", "index.html"):
            self._send_text(
                render_visualizer_html(self.server_site.data),
                content_type="text/html",
            )
            return
        if route == STYLE_PATH:
            self._send_text(_read_asset("styles.css"), content_type="text/css")
            return
        if route == APP_SCRIPT_PATH:
            self._send_text(
                _read_asset("app.js"),
                content_type="text/javascript",
            )
            return
        if route == INDEX_JSON_PATH:
            self._send_json(self.server_site.data.to_index_dict())
            return
        if route == INDEX_SCRIPT_PATH:
            self._send_text(
                f"window.PhotonicBenchIndex = "
                f"{_json_dump(self.server_site.data.to_index_dict())};\n",
                content_type="text/javascript",
            )
            return
        payload = self.server_site.payloads_by_path.get(route)
        if payload is not None:
            self._send_json(payload)
            return
        self.send_error(HTTPStatus.NOT_FOUND, "visualizer asset not found")

    def log_message(self, format: str, *args: Any) -> None:
        return

    def _send_json(self, value: Any) -> None:
        self._send_text(_json_dump(value), content_type="application/json")

    def _send_text(self, text: str, *, content_type: str) -> None:
        body = text.encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


def _request_route(raw_path: str) -> str:
    return unquote(urlsplit(raw_path).path).lstrip("/")


def _remove_generated_payload_files(payload_dir: Path) -> None:
    for pattern in ("*.payload.json", "*.payload.js"):
        for path in payload_dir.glob(pattern):
            path.unlink()


def _load_matmul_artifact(
    payload: dict[str, Any],
    *,
    source_path: str,
    browser_path: str,
) -> VisualizerArtifact:
    workload = _required_dict(payload, "workload", source=source_path)
    if _required_str(workload, "type", source=source_path) != "matmul":
        raise ValueError(f"{source_path}: workload.type must be 'matmul'")

    has_published_reference = payload.get("published_reference") is not None
    has_calibration_fit = payload.get("calibration_fit") is not None
    source_quality = _source_quality(payload)
    summary = ArtifactSummary(
        id=source_path,
        kind="matmul_card",
        schema_version=REPORT_SCHEMA_VERSION,
        benchmark_name=_required_str(payload, "benchmark", "name", source=source_path),
        description=_required_str(
            payload,
            "benchmark",
            "description",
            source=source_path,
        ),
        source_path=source_path,
        browser_path=browser_path,
        macs=_required_int(workload, "macs", source=source_path),
        equivalent_ops=_required_int(workload, "equivalent_ops", source=source_path),
        output_elements=_required_int(workload, "output_elements", source=source_path),
        total_energy_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "total_pj",
            source=source_path,
        ),
        energy_per_op_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "energy_per_op_pj",
            source=source_path,
        ),
        latency_label="Batch latency",
        latency_ns=_required_number(
            payload,
            "local_model",
            "timing",
            "batch_latency_ns",
            source=source_path,
        ),
        throughput_equivalent_ops_per_second=_required_number(
            payload,
            "local_model",
            "timing",
            "steady_state_equivalent_ops_per_second",
            source=source_path,
        ),
        memory_traffic_bytes=_optional_number(
            payload,
            "local_model",
            "memory_traffic",
            "total_interface_bytes",
            source=source_path,
        ),
        operational_intensity_ops_per_byte=_optional_number(
            payload,
            "local_model",
            "memory_traffic",
            "equivalent_ops_per_byte",
            source=source_path,
        ),
        system_total_energy_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "total_system_energy_pj",
            source=source_path,
        ),
        system_energy_per_op_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "system_energy_per_op_pj",
            source=source_path,
        ),
        local_compute_and_conversion_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "local_compute_and_conversion_energy_share",
            source=source_path,
        ),
        movement_energy_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "total_movement_energy_pj",
            source=source_path,
        ),
        movement_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_energy_share",
            source=source_path,
        ),
        movement_to_compute_energy_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_to_compute_energy_ratio",
            source=source_path,
        ),
        total_hierarchy_bytes=_optional_number(
            payload,
            "local_model",
            "system",
            "total_hierarchy_bytes",
            source=source_path,
        ),
        hierarchy_equivalent_ops_per_byte=_optional_number(
            payload,
            "local_model",
            "system",
            "hierarchy_equivalent_ops_per_byte",
            source=source_path,
        ),
        movement_energy_per_hierarchy_byte_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_energy_per_hierarchy_byte_pj",
            source=source_path,
        ),
        dominant_traffic_tier=_optional_system_str(
            payload,
            "dominant_traffic_tier",
            source_path,
        ),
        dominant_system_energy_component=_optional_system_str(
            payload,
            "dominant_system_energy_component",
            source_path,
        ),
        dominant_movement_energy_tier=_optional_system_str(
            payload,
            "dominant_movement_energy_tier",
            source_path,
        ),
        nominal_memory_bottleneck_tier=_optional_system_str(
            payload,
            "nominal_memory_bottleneck_tier",
            source_path,
        ),
        contention_memory_bottleneck_tier=_optional_system_str(
            payload,
            "contention_memory_bottleneck_tier",
            source_path,
        ),
        max_tier_nominal_transfer_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_nominal_transfer_pressure_ratio",
            source=source_path,
        ),
        max_tier_contention_adjusted_transfer_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_contention_adjusted_transfer_pressure_ratio",
            source=source_path,
        ),
        max_tier_movement_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_movement_energy_share",
            source=source_path,
        ),
        max_tier_system_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_system_energy_share",
            source=source_path,
        ),
        contention_bandwidth_saturation_tier=_optional_system_str(
            payload,
            "contention_bandwidth_saturation_tier",
            source_path,
        ),
        max_tier_contention_bandwidth_utilization=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_contention_bandwidth_utilization",
            source=source_path,
        ),
        min_tier_contention_bandwidth_headroom_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "min_tier_contention_bandwidth_headroom_ratio",
            source=source_path,
        ),
        off_chip_traffic_share=_optional_number(
            payload,
            "local_model",
            "system",
            "off_chip_traffic_share",
            source=source_path,
        ),
        bandwidth_limited_latency_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_limited_batch_latency_ns",
            source=source_path,
        ),
        bandwidth_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_pressure_ratio",
            source=source_path,
        ),
        bandwidth_limited_throughput_equivalent_ops_per_second=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_limited_equivalent_ops_per_second",
            source=source_path,
        ),
        contention_adjusted_latency_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_batch_latency_ns",
            source=source_path,
        ),
        contention_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_pressure_ratio",
            source=source_path,
        ),
        contention_adjusted_throughput_equivalent_ops_per_second=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_equivalent_ops_per_second",
            source=source_path,
        ),
        shared_bandwidth_clients=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "shared_bandwidth_clients",
            source=source_path,
        ),
        bandwidth_arbitration_efficiency=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "arbitration_efficiency",
            source=source_path,
        ),
        calibration_overhead_fraction=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "calibration_overhead_fraction",
            source=source_path,
        ),
        contention_bandwidth_derate_factor=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_bandwidth_derate_factor",
            source=source_path,
        ),
        total_transfer_overhead_fraction=_optional_number(
            payload,
            "local_model",
            "system",
            "total_transfer_overhead_fraction",
            source=source_path,
        ),
        contention_only_loaded_bandwidth_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_only_loaded_bandwidth_bytes_per_ns",
            source=source_path,
        ),
        contention_adjusted_loaded_bandwidth_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_loaded_bandwidth_bytes_per_ns",
            source=source_path,
        ),
        transfer_to_compute_time_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "transfer_to_compute_time_ratio",
            source=source_path,
        ),
        contention_adjusted_transfer_to_compute_time_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_transfer_to_compute_time_ratio",
            source=source_path,
        ),
        system_profile=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "profile",
            source=source_path,
            field="local_model.system.profile",
        ),
        memory_scenario=_optional_str(
            _dict_or_empty(
                _get_optional(payload, "local_model", "system", "memory_scenario")
            ),
            "name",
            source=source_path,
            field="local_model.system.memory_scenario.name",
        ),
        system_profile_overrides=_system_profile_overrides(payload, source_path),
        memory_timing_mode=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "memory_timing_mode",
            source=source_path,
            field="local_model.system.memory_timing_mode",
        ),
        contention_preset=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "contention_preset",
            source=source_path,
            field="local_model.system.contention_preset",
        ),
        contention_overlap_model=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "contention_overlap_model",
            source=source_path,
            field="local_model.system.contention_overlap_model",
        ),
        effective_transfer_time_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "effective_transfer_time_ns",
            source=source_path,
        ),
        effective_usable_bandwidth_under_load_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "effective_usable_bandwidth_under_load_bytes_per_ns",
            source=source_path,
        ),
        guardbanded_usable_bandwidth_under_load_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "guardbanded_usable_bandwidth_under_load_bytes_per_ns",
            source=source_path,
        ),
        provenance_status=_provenance_status(payload),
        has_published_reference=has_published_reference,
        source_quality_grade=_optional_str(
            source_quality,
            "confidence_grade",
            source=source_path,
            field="published_reference.source_quality.confidence_grade",
        ),
        source_surrogate_type=_optional_str(
            source_quality,
            "local_surrogate_type",
            source=source_path,
            field="published_reference.source_quality.local_surrogate_type",
        ),
        assumptions_count=len(_required_list(payload, "assumptions", source=source_path)),
        has_calibration_fit=has_calibration_fit,
        boundary_tags=_boundary_tags(
            kind="matmul_card",
            has_published_reference=has_published_reference,
            has_calibration_fit=has_calibration_fit,
            provenance_status=_provenance_status(payload),
        ),
    )
    return VisualizerArtifact(summary=summary, payload=payload)


def _load_transformer_layer_artifact(
    payload: dict[str, Any],
    *,
    source_path: str,
    browser_path: str,
) -> VisualizerArtifact:
    artifact_type = _required_str(payload, "artifact_type", source=source_path)
    if artifact_type != "transformer_layer_aggregate":
        raise ValueError(
            f"{source_path}: artifact_type must be 'transformer_layer_aggregate'"
        )
    workload = _required_dict(payload, "workload", source=source_path)
    if _required_str(workload, "type", source=source_path) != "transformer_layer":
        raise ValueError(f"{source_path}: workload.type must be 'transformer_layer'")

    has_published_reference = payload.get("published_reference") is not None
    has_calibration_fit = payload.get("calibration_fit") is not None
    provenance_status = _provenance_status(payload)
    summary = ArtifactSummary(
        id=source_path,
        kind="transformer_layer",
        schema_version=TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION,
        benchmark_name=_required_str(payload, "benchmark", "name", source=source_path),
        description=_required_str(
            payload,
            "benchmark",
            "description",
            source=source_path,
        ),
        source_path=source_path,
        browser_path=browser_path,
        macs=_required_int(workload, "macs", source=source_path),
        equivalent_ops=_required_int(workload, "equivalent_ops", source=source_path),
        output_elements=_required_int(workload, "output_elements", source=source_path),
        total_energy_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "total_pj",
            source=source_path,
        ),
        energy_per_op_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "energy_per_op_pj",
            source=source_path,
        ),
        latency_label="Serial batch latency",
        latency_ns=_required_number(
            payload,
            "local_model",
            "timing",
            "serial_batch_latency_ns",
            source=source_path,
        ),
        throughput_equivalent_ops_per_second=_required_number(
            payload,
            "local_model",
            "timing",
            "serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        memory_traffic_bytes=_optional_number(
            payload,
            "local_model",
            "memory_traffic",
            "total_interface_bytes",
            source=source_path,
        ),
        operational_intensity_ops_per_byte=_optional_number(
            payload,
            "local_model",
            "memory_traffic",
            "equivalent_ops_per_byte",
            source=source_path,
        ),
        system_total_energy_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "total_system_energy_pj",
            source=source_path,
        ),
        system_energy_per_op_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "system_energy_per_op_pj",
            source=source_path,
        ),
        local_compute_and_conversion_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "local_compute_and_conversion_energy_share",
            source=source_path,
        ),
        movement_energy_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "total_movement_energy_pj",
            source=source_path,
        ),
        movement_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_energy_share",
            source=source_path,
        ),
        movement_to_compute_energy_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_to_compute_energy_ratio",
            source=source_path,
        ),
        total_hierarchy_bytes=_optional_number(
            payload,
            "local_model",
            "system",
            "total_hierarchy_bytes",
            source=source_path,
        ),
        hierarchy_equivalent_ops_per_byte=_optional_number(
            payload,
            "local_model",
            "system",
            "hierarchy_equivalent_ops_per_byte",
            source=source_path,
        ),
        movement_energy_per_hierarchy_byte_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_energy_per_hierarchy_byte_pj",
            source=source_path,
        ),
        dominant_traffic_tier=_optional_system_str(
            payload,
            "dominant_traffic_tier",
            source_path,
        ),
        dominant_system_energy_component=_optional_system_str(
            payload,
            "dominant_system_energy_component",
            source_path,
        ),
        dominant_movement_energy_tier=_optional_system_str(
            payload,
            "dominant_movement_energy_tier",
            source_path,
        ),
        nominal_memory_bottleneck_tier=_optional_system_str(
            payload,
            "nominal_memory_bottleneck_tier",
            source_path,
        ),
        contention_memory_bottleneck_tier=_optional_system_str(
            payload,
            "contention_memory_bottleneck_tier",
            source_path,
        ),
        max_tier_nominal_transfer_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_nominal_transfer_pressure_ratio",
            source=source_path,
        ),
        max_tier_contention_adjusted_transfer_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_contention_adjusted_transfer_pressure_ratio",
            source=source_path,
        ),
        max_tier_movement_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_movement_energy_share",
            source=source_path,
        ),
        max_tier_system_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_system_energy_share",
            source=source_path,
        ),
        contention_bandwidth_saturation_tier=_optional_system_str(
            payload,
            "contention_bandwidth_saturation_tier",
            source_path,
        ),
        max_tier_contention_bandwidth_utilization=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_contention_bandwidth_utilization",
            source=source_path,
        ),
        min_tier_contention_bandwidth_headroom_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "min_tier_contention_bandwidth_headroom_ratio",
            source=source_path,
        ),
        off_chip_traffic_share=_optional_number(
            payload,
            "local_model",
            "system",
            "off_chip_traffic_share",
            source=source_path,
        ),
        bandwidth_limited_latency_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_limited_serial_batch_latency_ns",
            source=source_path,
        ),
        bandwidth_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_pressure_ratio",
            source=source_path,
        ),
        bandwidth_limited_throughput_equivalent_ops_per_second=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_limited_serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        contention_adjusted_latency_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_serial_batch_latency_ns",
            source=source_path,
        ),
        contention_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_pressure_ratio",
            source=source_path,
        ),
        contention_adjusted_throughput_equivalent_ops_per_second=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        shared_bandwidth_clients=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "shared_bandwidth_clients",
            source=source_path,
        ),
        bandwidth_arbitration_efficiency=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "arbitration_efficiency",
            source=source_path,
        ),
        calibration_overhead_fraction=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "calibration_overhead_fraction",
            source=source_path,
        ),
        contention_bandwidth_derate_factor=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_bandwidth_derate_factor",
            source=source_path,
        ),
        total_transfer_overhead_fraction=_optional_number(
            payload,
            "local_model",
            "system",
            "total_transfer_overhead_fraction",
            source=source_path,
        ),
        contention_only_loaded_bandwidth_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_only_loaded_bandwidth_bytes_per_ns",
            source=source_path,
        ),
        contention_adjusted_loaded_bandwidth_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_loaded_bandwidth_bytes_per_ns",
            source=source_path,
        ),
        transfer_to_compute_time_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "transfer_to_compute_time_ratio",
            source=source_path,
        ),
        contention_adjusted_transfer_to_compute_time_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_transfer_to_compute_time_ratio",
            source=source_path,
        ),
        system_profile=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "profile",
            source=source_path,
            field="local_model.system.profile",
        ),
        memory_scenario=_optional_str(
            _dict_or_empty(
                _get_optional(payload, "local_model", "system", "memory_scenario")
            ),
            "name",
            source=source_path,
            field="local_model.system.memory_scenario.name",
        ),
        system_profile_overrides=_system_profile_overrides(payload, source_path),
        memory_timing_mode=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "memory_timing_mode",
            source=source_path,
            field="local_model.system.memory_timing_mode",
        ),
        contention_preset=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "contention_preset",
            source=source_path,
            field="local_model.system.contention_preset",
        ),
        contention_overlap_model=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "contention_overlap_model",
            source=source_path,
            field="local_model.system.contention_overlap_model",
        ),
        effective_transfer_time_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "serial_transfer_time_ns",
            source=source_path,
        ),
        effective_usable_bandwidth_under_load_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "effective_usable_bandwidth_under_load_bytes_per_ns",
            source=source_path,
        ),
        guardbanded_usable_bandwidth_under_load_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "guardbanded_usable_bandwidth_under_load_bytes_per_ns",
            source=source_path,
        ),
        provenance_status=provenance_status,
        has_published_reference=has_published_reference,
        source_quality_grade=None,
        source_surrogate_type=None,
        assumptions_count=len(_required_list(payload, "assumptions", source=source_path)),
        has_calibration_fit=has_calibration_fit,
        boundary_tags=_boundary_tags(
            kind="transformer_layer",
            has_published_reference=has_published_reference,
            has_calibration_fit=has_calibration_fit,
            provenance_status=provenance_status,
        ),
    )
    _required_list(payload, "matmuls", source=source_path)
    _required_dict(payload, "formula_audit", source=source_path)
    _required_list(payload, "exclusions", source=source_path)
    return VisualizerArtifact(summary=summary, payload=payload)


def _load_transformer_model_artifact(
    payload: dict[str, Any],
    *,
    source_path: str,
    browser_path: str,
) -> VisualizerArtifact:
    artifact_type = _required_str(payload, "artifact_type", source=source_path)
    if artifact_type != "transformer_model_aggregate":
        raise ValueError(
            f"{source_path}: artifact_type must be 'transformer_model_aggregate'"
        )
    workload = _required_dict(payload, "workload", source=source_path)
    if _required_str(workload, "type", source=source_path) != "transformer_model":
        raise ValueError(f"{source_path}: workload.type must be 'transformer_model'")
    _required_dict(payload, "model_components", source=source_path)
    _required_dict(
        payload,
        "local_model",
        "activation_memory_traffic",
        source=source_path,
    )

    has_published_reference = payload.get("published_reference") is not None
    has_calibration_fit = payload.get("calibration_fit") is not None
    provenance_status = _provenance_status(payload)
    summary = ArtifactSummary(
        id=source_path,
        kind="transformer_model",
        schema_version=TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION,
        benchmark_name=_required_str(payload, "benchmark", "name", source=source_path),
        description=_required_str(
            payload,
            "benchmark",
            "description",
            source=source_path,
        ),
        source_path=source_path,
        browser_path=browser_path,
        macs=_required_int(workload, "macs", source=source_path),
        equivalent_ops=_required_int(workload, "equivalent_ops", source=source_path),
        output_elements=_required_int(workload, "output_elements", source=source_path),
        total_energy_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "total_pj",
            source=source_path,
        ),
        energy_per_op_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "energy_per_op_pj",
            source=source_path,
        ),
        latency_label="Model serial batch latency",
        latency_ns=_required_number(
            payload,
            "local_model",
            "timing",
            "serial_batch_latency_ns",
            source=source_path,
        ),
        throughput_equivalent_ops_per_second=_required_number(
            payload,
            "local_model",
            "timing",
            "serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        memory_traffic_bytes=_optional_number(
            payload,
            "local_model",
            "memory_traffic",
            "total_interface_bytes",
            source=source_path,
        ),
        operational_intensity_ops_per_byte=_optional_number(
            payload,
            "local_model",
            "memory_traffic",
            "equivalent_ops_per_byte",
            source=source_path,
        ),
        system_total_energy_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "total_system_energy_pj",
            source=source_path,
        ),
        system_energy_per_op_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "system_energy_per_op_pj",
            source=source_path,
        ),
        local_compute_and_conversion_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "local_compute_and_conversion_energy_share",
            source=source_path,
        ),
        movement_energy_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "total_movement_energy_pj",
            source=source_path,
        ),
        movement_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_energy_share",
            source=source_path,
        ),
        movement_to_compute_energy_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_to_compute_energy_ratio",
            source=source_path,
        ),
        total_hierarchy_bytes=_optional_number(
            payload,
            "local_model",
            "system",
            "total_hierarchy_bytes",
            source=source_path,
        ),
        hierarchy_equivalent_ops_per_byte=_optional_number(
            payload,
            "local_model",
            "system",
            "hierarchy_equivalent_ops_per_byte",
            source=source_path,
        ),
        movement_energy_per_hierarchy_byte_pj=_optional_number(
            payload,
            "local_model",
            "system",
            "movement_energy_per_hierarchy_byte_pj",
            source=source_path,
        ),
        dominant_traffic_tier=_optional_system_str(
            payload,
            "dominant_traffic_tier",
            source_path,
        ),
        dominant_system_energy_component=_optional_system_str(
            payload,
            "dominant_system_energy_component",
            source_path,
        ),
        dominant_movement_energy_tier=_optional_system_str(
            payload,
            "dominant_movement_energy_tier",
            source_path,
        ),
        nominal_memory_bottleneck_tier=_optional_system_str(
            payload,
            "nominal_memory_bottleneck_tier",
            source_path,
        ),
        contention_memory_bottleneck_tier=_optional_system_str(
            payload,
            "contention_memory_bottleneck_tier",
            source_path,
        ),
        max_tier_nominal_transfer_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_nominal_transfer_pressure_ratio",
            source=source_path,
        ),
        max_tier_contention_adjusted_transfer_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_contention_adjusted_transfer_pressure_ratio",
            source=source_path,
        ),
        max_tier_movement_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_movement_energy_share",
            source=source_path,
        ),
        max_tier_system_energy_share=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_system_energy_share",
            source=source_path,
        ),
        contention_bandwidth_saturation_tier=_optional_system_str(
            payload,
            "contention_bandwidth_saturation_tier",
            source_path,
        ),
        max_tier_contention_bandwidth_utilization=_optional_number(
            payload,
            "local_model",
            "system",
            "max_tier_contention_bandwidth_utilization",
            source=source_path,
        ),
        min_tier_contention_bandwidth_headroom_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "min_tier_contention_bandwidth_headroom_ratio",
            source=source_path,
        ),
        off_chip_traffic_share=_optional_number(
            payload,
            "local_model",
            "system",
            "off_chip_traffic_share",
            source=source_path,
        ),
        bandwidth_limited_latency_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_limited_serial_batch_latency_ns",
            source=source_path,
        ),
        bandwidth_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_pressure_ratio",
            source=source_path,
        ),
        bandwidth_limited_throughput_equivalent_ops_per_second=_optional_number(
            payload,
            "local_model",
            "system",
            "bandwidth_limited_serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        contention_adjusted_latency_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_serial_batch_latency_ns",
            source=source_path,
        ),
        contention_pressure_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_pressure_ratio",
            source=source_path,
        ),
        contention_adjusted_throughput_equivalent_ops_per_second=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        shared_bandwidth_clients=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "shared_bandwidth_clients",
            source=source_path,
        ),
        bandwidth_arbitration_efficiency=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "arbitration_efficiency",
            source=source_path,
        ),
        calibration_overhead_fraction=_optional_number(
            payload,
            "local_model",
            "system",
            "contention",
            "calibration_overhead_fraction",
            source=source_path,
        ),
        contention_bandwidth_derate_factor=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_bandwidth_derate_factor",
            source=source_path,
        ),
        total_transfer_overhead_fraction=_optional_number(
            payload,
            "local_model",
            "system",
            "total_transfer_overhead_fraction",
            source=source_path,
        ),
        contention_only_loaded_bandwidth_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_only_loaded_bandwidth_bytes_per_ns",
            source=source_path,
        ),
        contention_adjusted_loaded_bandwidth_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_loaded_bandwidth_bytes_per_ns",
            source=source_path,
        ),
        transfer_to_compute_time_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "transfer_to_compute_time_ratio",
            source=source_path,
        ),
        contention_adjusted_transfer_to_compute_time_ratio=_optional_number(
            payload,
            "local_model",
            "system",
            "contention_adjusted_transfer_to_compute_time_ratio",
            source=source_path,
        ),
        system_profile=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "profile",
            source=source_path,
            field="local_model.system.profile",
        ),
        memory_scenario=_optional_str(
            _dict_or_empty(
                _get_optional(payload, "local_model", "system", "memory_scenario")
            ),
            "name",
            source=source_path,
            field="local_model.system.memory_scenario.name",
        ),
        system_profile_overrides=_system_profile_overrides(payload, source_path),
        memory_timing_mode=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "memory_timing_mode",
            source=source_path,
            field="local_model.system.memory_timing_mode",
        ),
        contention_preset=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "contention_preset",
            source=source_path,
            field="local_model.system.contention_preset",
        ),
        contention_overlap_model=_optional_str(
            _dict_or_empty(_get_optional(payload, "local_model", "system")),
            "contention_overlap_model",
            source=source_path,
            field="local_model.system.contention_overlap_model",
        ),
        effective_transfer_time_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "serial_transfer_time_ns",
            source=source_path,
        ),
        effective_usable_bandwidth_under_load_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "effective_usable_bandwidth_under_load_bytes_per_ns",
            source=source_path,
        ),
        guardbanded_usable_bandwidth_under_load_bytes_per_ns=_optional_number(
            payload,
            "local_model",
            "system",
            "guardbanded_usable_bandwidth_under_load_bytes_per_ns",
            source=source_path,
        ),
        provenance_status=provenance_status,
        has_published_reference=has_published_reference,
        source_quality_grade=None,
        source_surrogate_type=None,
        assumptions_count=len(_required_list(payload, "assumptions", source=source_path)),
        has_calibration_fit=has_calibration_fit,
        boundary_tags=_boundary_tags(
            kind="transformer_model",
            has_published_reference=has_published_reference,
            has_calibration_fit=has_calibration_fit,
            provenance_status=provenance_status,
        ),
    )
    return VisualizerArtifact(summary=summary, payload=payload)


def _load_comparison_presets(
    reports_root: Path,
    artifacts: list[VisualizerArtifact],
    issues: list[ArtifactIssue],
) -> tuple[ComparisonPreset, ...]:
    presets_path = reports_root / PRESETS_JSON_PATH
    if not presets_path.exists():
        return ()

    source_path = _source_path(presets_path, reports_root)
    known_ids = {artifact.summary.id for artifact in artifacts}
    try:
        payload = _load_json_object(presets_path)
        schema_version = _required_str(payload, "schema_version", source=source_path)
        if schema_version != PRESET_SCHEMA_VERSION:
            raise ValueError(
                f"{source_path}: unsupported schema_version {schema_version!r}"
            )
        raw_presets = _required_list(payload, "presets", source=source_path)
        presets: list[ComparisonPreset] = []
        for index, raw_preset in enumerate(raw_presets):
            if not isinstance(raw_preset, dict):
                raise ValueError(f"{source_path}: presets[{index}] must be an object")
            name = _required_str(raw_preset, "name", source=source_path)
            description = _optional_str(
                raw_preset,
                "description",
                source=source_path,
                field=f"presets[{index}].description",
            )
            raw_ids = _required_list(raw_preset, "artifact_ids", source=source_path)
            artifact_ids: list[str] = []
            for id_index, artifact_id in enumerate(raw_ids):
                if not isinstance(artifact_id, str) or not artifact_id.strip():
                    raise ValueError(
                        f"{source_path}: presets[{index}].artifact_ids[{id_index}] "
                        "must be a non-empty string"
                    )
                artifact_ids.append(artifact_id)

            pinned_id = _optional_str(
                raw_preset,
                "pinned_id",
                source=source_path,
                field=f"presets[{index}].pinned_id",
            )
            analysis_intent = raw_preset.get("analysis_intent", {})
            if not isinstance(analysis_intent, dict):
                raise ValueError(
                    f"{source_path}: presets[{index}].analysis_intent must be an object"
                )
            reviewer_notes = _optional_str(
                raw_preset,
                "reviewer_notes",
                source=source_path,
                field=f"presets[{index}].reviewer_notes",
            )
            stale_ids = [
                artifact_id for artifact_id in artifact_ids if artifact_id not in known_ids
            ]
            if stale_ids:
                issues.append(
                    ArtifactIssue(
                        source_path=source_path,
                        message=(
                            f"preset {name!r} references missing artifact id(s): "
                            f"{', '.join(stale_ids)}"
                        ),
                    )
                )
            if pinned_id is not None and pinned_id not in known_ids:
                issues.append(
                    ArtifactIssue(
                        source_path=source_path,
                        message=f"preset {name!r} pins missing artifact id: {pinned_id}",
                    )
                )

            presets.append(
                ComparisonPreset(
                    name=name,
                    description=description or "",
                    artifact_ids=tuple(artifact_ids),
                    pinned_id=pinned_id,
                    analysis_intent=analysis_intent,
                    reviewer_notes=reviewer_notes or "",
                    source_path=source_path,
                )
            )
    except ValueError as exc:
        issues.append(ArtifactIssue(source_path=source_path, message=str(exc)))
        return ()

    return tuple(presets)


def _boundary_tags(
    *,
    kind: ArtifactKind,
    has_published_reference: bool,
    has_calibration_fit: bool,
    provenance_status: str,
) -> tuple[str, ...]:
    tags = ["local model"]
    if kind in {"transformer_layer", "transformer_model"}:
        tags.extend(["serial timing", "non-additive noise", "exclusions"])
    if has_published_reference:
        tags.append("published reference")
    if has_calibration_fit:
        tags.append("calibration fit")
    if provenance_status != "local model artifact":
        tags.append("provenance")
    return tuple(tags)


def _system_profile_overrides(
    payload: dict[str, Any],
    source_path: str,
) -> tuple[str, ...]:
    value = _get_optional(payload, "local_model", "system", "profile_overrides")
    if value is None:
        return ()
    if not isinstance(value, list):
        raise ValueError(f"{source_path}: local_model.system.profile_overrides must be a list")
    overrides = []
    for index, item in enumerate(value):
        if not isinstance(item, str):
            raise ValueError(
                f"{source_path}: local_model.system.profile_overrides[{index}] "
                "must be a string"
            )
        overrides.append(item)
    return tuple(overrides)


def _load_json_object(path: Path) -> dict[str, Any]:
    try:
        raw_text = path.read_text(encoding="utf-8")
    except OSError as exc:
        raise ValueError(f"{path}: cannot read file: {exc}") from exc

    try:
        payload = json.loads(raw_text, parse_constant=_reject_json_constant)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"{path}: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}"
        ) from exc
    except ValueError as exc:
        raise ValueError(f"{path}: invalid JSON: {exc}") from exc

    if not isinstance(payload, dict):
        raise ValueError(f"{path}: expected a JSON object")
    return payload


def _get_optional(payload: dict[str, Any], *keys: str) -> Any:
    current: Any = payload
    for key in keys:
        if not isinstance(current, dict):
            return None
        if key not in current:
            return None
        current = current[key]
    return current


def _dict_or_empty(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _reject_json_constant(value: str) -> None:
    raise ValueError(f"unsupported non-finite JSON value {value!r}")


def _provenance_status(payload: dict[str, Any]) -> str:
    provenance = payload.get("provenance")
    if isinstance(provenance, dict):
        claim_status = provenance.get("claim_status")
        if isinstance(claim_status, str) and claim_status:
            return claim_status
        source_title = provenance.get("source_title")
        if isinstance(source_title, str) and source_title:
            return source_title
    return "local model artifact"


def _source_quality(payload: dict[str, Any]) -> dict[str, Any]:
    return _dict_or_empty(_get_optional(payload, "published_reference", "source_quality"))


def _source_path(path: Path, reports_root: Path) -> str:
    return path.relative_to(reports_root).as_posix()


def _browser_path(path: Path, link_base: Path) -> str:
    return Path(_relative_path(path.resolve(), link_base)).as_posix()


def _relative_path(path: Path, base: Path) -> str:
    return os.path.relpath(path, start=base)


def _is_below_any(path: Path, roots: tuple[Path, ...]) -> bool:
    return any(_is_relative_to(path, root) for root in roots)


def _is_relative_to(path: Path, root: Path) -> bool:
    try:
        path.relative_to(root)
    except ValueError:
        return False
    return True


def _read_asset(name: str) -> str:
    return resources.files(ASSET_PACKAGE).joinpath(name).read_text(encoding="utf-8")


def _json_dump(value: Any) -> str:
    return (
        json.dumps(value, indent=2, allow_nan=False)
        .replace("</", "<\\/")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
        + "\n"
    )


def _payload_asset_stem(source_path: str) -> str:
    readable = re.sub(r"[^A-Za-z0-9]+", "-", source_path).strip("-").lower()
    readable = readable[:72] or "artifact"
    digest = hashlib.sha256(source_path.encode("utf-8")).hexdigest()[:12]
    return f"{readable}-{digest}"


def _required_dict(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> dict[str, Any]:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, dict):
        raise ValueError(f"{source}: {_field(keys)} must be an object")
    return value


def _required_list(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> list[Any]:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, list):
        raise ValueError(f"{source}: {_field(keys)} must be a list")
    return value


def _required_str(
    payload: dict[str, Any],
    *keys: str,
    source: str | Path,
) -> str:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, str):
        raise ValueError(f"{source}: {_field(keys)} must be a string")
    return value


def _required_int(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> int:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, int) or isinstance(value, bool):
        raise ValueError(f"{source}: {_field(keys)} must be an integer")
    return value


def _required_number(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> float:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, int | float) or isinstance(value, bool):
        raise ValueError(f"{source}: {_field(keys)} must be numeric and finite")
    number = float(value)
    if not math.isfinite(number):
        raise ValueError(f"{source}: {_field(keys)} must be numeric and finite")
    return number


def _optional_number(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> float | None:
    try:
        return _required_number(payload, *keys, source=source)
    except ValueError:
        return None


def _optional_str(
    payload: dict[str, Any],
    key: str,
    *,
    source: str,
    field: str,
) -> str | None:
    value = payload.get(key)
    if value is None:
        return None
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{source}: {field} must be a non-empty string when provided")
    return value


def _optional_system_str(
    payload: dict[str, Any],
    key: str,
    source: str,
) -> str | None:
    return _optional_str(
        _dict_or_empty(_get_optional(payload, "local_model", "system")),
        key,
        source=source,
        field=f"local_model.system.{key}",
    )


def _required_value(
    payload: dict[str, Any],
    *keys: str,
    source: str | Path,
) -> Any:
    current: Any = payload
    for index, key in enumerate(keys):
        if not isinstance(current, dict):
            parent = ".".join(keys[:index]) or "<root>"
            raise ValueError(
                f"{source}: {_field(keys)} is missing because {parent} is not an object"
            )
        if key not in current:
            raise ValueError(f"{source}: missing {_field(keys)}")
        current = current[key]
    return current


def _field(keys: tuple[str, ...]) -> str:
    return ".".join(keys)
