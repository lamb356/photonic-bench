from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path
from typing import Any, Sequence


@dataclass(frozen=True)
class ComparisonCard:
    path: Path
    payload: dict[str, Any]


def load_comparison_cards(paths: Sequence[Path]) -> list[ComparisonCard]:
    cards = []
    for path in paths:
        try:
            raw_text = path.read_text(encoding="utf-8")
        except FileNotFoundError as exc:
            raise ValueError(f"{path} does not exist") from exc
        except OSError as exc:
            raise ValueError(f"cannot read {path}: {exc}") from exc

        try:
            payload = json.loads(raw_text, parse_constant=_reject_json_constant)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"{path} contains invalid JSON at line {exc.lineno}, "
                f"column {exc.colno}: {exc.msg}"
            ) from exc
        except ValueError as exc:
            raise ValueError(f"{path} contains invalid JSON: {exc}") from exc

        if not isinstance(payload, dict):
            raise ValueError(f"{path} must contain a JSON object")
        if "schema_version" not in payload:
            raise ValueError(f"{path} is missing schema_version")
        cards.append(ComparisonCard(path=path, payload=payload))
    return cards


def _reject_json_constant(value: str) -> None:
    raise ValueError(f"unsupported non-finite JSON value {value!r}")


def render_comparison_markdown(
    cards: Sequence[ComparisonCard],
    *,
    title: str = "PhotonicBench Comparison",
    intro: str | None = None,
    extra_sections: str = "",
) -> str:
    if not cards:
        raise ValueError("at least one JSON card is required")

    headers = [
        "Benchmark",
        "Source DOI",
        "Calibration fit",
        "MACs",
        "Eq ops",
        "Local total pJ",
        "Local pJ/op",
        "System total pJ",
        "System pJ/op",
        "System profile",
        "Memory timing",
        "Effective transfer ns",
        "Loaded BW B/ns",
        "Hierarchy eq ops/byte",
        "Movement pJ/hierarchy byte",
        "Dominant traffic tier",
        "Dominant movement tier",
        "Memory bottleneck tier",
        "Worst tier pressure",
        "Derate factor",
        "Off-chip traffic share",
        "Total transfer overhead",
        "Transfer/compute",
        "Bandwidth pressure",
        "Contention-adjusted latency ns",
        "Contention transfer/compute",
        "Contention pressure",
        "Contention-adjusted eq ops/s",
        "Movement pJ",
        "Movement share",
        "Bandwidth-limited eq ops/s",
        "Interface bytes",
        "Eq ops/byte",
        "Batch latency ns",
        "Steady eq ops/s",
        "Published TOPS",
        "Published TOPS/W incl lasers",
        "Published pJ/op incl lasers",
        "Published metrics",
        "Source grade",
        "Surrogate type",
        "Coverage",
    ]
    rows = [_row(card) for card in cards]
    table = _markdown_table(headers, rows)
    rendered_intro = intro
    if rendered_intro is None:
        rendered_intro = (
            "Rows are loaded from machine-readable JSON reports. Local model "
            "columns come from `local_model`; paper-derived columns come from "
            "`published_reference`."
        )
    rendered_extra_sections = f"\n{extra_sections}\n" if extra_sections else "\n"

    return f"""# {title}

{rendered_intro}
{rendered_extra_sections}
{table}
"""


def _row(card: ComparisonCard) -> list[str]:
    payload = card.payload
    published = _dict_or_empty(payload.get("published_reference"))
    reported = _dict_or_empty(published.get("reported"))
    derived = _dict_or_empty(published.get("derived_unit_conversions"))
    source_quality = _dict_or_empty(published.get("source_quality"))
    provenance = _dict_or_empty(payload.get("provenance"))
    local_energy = _dict_or_empty(_get(payload, "local_model", "energy"))
    memory = _dict_or_empty(_get(payload, "local_model", "memory_traffic"))
    system = _dict_or_empty(_get(payload, "local_model", "system"))
    local_timing = _dict_or_empty(_get(payload, "local_model", "timing"))

    return [
        _fmt(_get(payload, "benchmark", "name")),
        _fmt(provenance.get("doi")),
        _calibration_label(payload.get("calibration_fit")),
        _fmt(_get(payload, "workload", "macs")),
        _fmt(_get(payload, "workload", "equivalent_ops")),
        _fmt(local_energy.get("total_pj")),
        _fmt(local_energy.get("energy_per_op_pj")),
        _fmt(system.get("total_system_energy_pj")),
        _fmt(system.get("system_energy_per_op_pj")),
        _fmt(system.get("profile")),
        _fmt(system.get("memory_timing_mode")),
        _fmt(system.get("effective_transfer_time_ns")),
        _fmt(system.get("contention_adjusted_loaded_bandwidth_bytes_per_ns")),
        _fmt(system.get("hierarchy_equivalent_ops_per_byte")),
        _fmt(system.get("movement_energy_per_hierarchy_byte_pj")),
        _fmt(system.get("dominant_traffic_tier")),
        _fmt(system.get("dominant_movement_energy_tier")),
        _fmt(system.get("contention_memory_bottleneck_tier")),
        _fmt(system.get("max_tier_contention_adjusted_transfer_pressure_ratio")),
        _fmt(system.get("contention_bandwidth_derate_factor")),
        _fmt(system.get("off_chip_traffic_share")),
        _fmt(system.get("total_transfer_overhead_fraction")),
        _fmt(system.get("transfer_to_compute_time_ratio")),
        _fmt(system.get("bandwidth_pressure_ratio")),
        _fmt(system.get("contention_adjusted_batch_latency_ns")),
        _fmt(system.get("contention_adjusted_transfer_to_compute_time_ratio")),
        _fmt(system.get("contention_pressure_ratio")),
        _fmt(system.get("contention_adjusted_equivalent_ops_per_second")),
        _fmt(system.get("total_movement_energy_pj")),
        _fmt(system.get("movement_energy_share")),
        _fmt(system.get("bandwidth_limited_equivalent_ops_per_second")),
        _fmt(memory.get("total_interface_bytes")),
        _fmt(memory.get("equivalent_ops_per_byte")),
        _fmt(local_timing.get("batch_latency_ns")),
        _fmt(local_timing.get("steady_state_equivalent_ops_per_second")),
        _fmt(reported.get("reported_tops")),
        _fmt(reported.get("energy_efficiency_including_lasers_tops_per_watt")),
        _fmt(derived.get("energy_per_op_including_lasers_pj")),
        _published_metrics_label(reported),
        _fmt(source_quality.get("confidence_grade")),
        _fmt(source_quality.get("local_surrogate_type")),
        _coverage_label(_dict_or_empty(source_quality.get("coverage"))),
    ]


def _get(raw: dict[str, Any], *keys: str) -> Any:
    current: Any = raw
    for key in keys:
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


def _dict_or_empty(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _calibration_label(value: Any) -> str:
    fit = _dict_or_empty(value)
    if not fit:
        return "none"

    parameter = _dict_or_empty(fit.get("fitted_parameter"))
    path = parameter.get("path", "unknown")
    fitted_value = _fmt(parameter.get("fitted_value"))
    unit = parameter.get("unit", "")
    return f"{fit.get('target', 'unknown')} -> {path}={fitted_value} {unit}".strip()


def _published_metrics_label(reported: dict[str, Any]) -> str:
    metrics = _dict_or_empty(reported.get("additional_metrics"))
    if not metrics:
        return "none"

    selected = []
    for key in (
        "image_pixels",
        "kernels",
        "input_resolution_bits",
        "digit_recognition_accuracy_percent",
        "reported_macs_per_second",
        "reported_bandwidth_ghz_min",
        "reported_energy_per_op_fj",
        "data_rate_gbaud",
        "awgr_dimension",
        "mnist_accuracy_percent",
        "area_efficiency_tmacs_per_mm2",
        "input_output_dimension",
        "experimental_omniglot_accuracy_percent",
    ):
        if key in metrics:
            selected.append(f"{key}={metrics[key]}")

    return "; ".join(selected) if selected else "see JSON"


def _coverage_label(coverage: dict[str, Any]) -> str:
    if not coverage:
        return "n/a"
    return "; ".join(f"{key}={value}" for key, value in coverage.items())


def _fmt(value: Any) -> str:
    if value is None:
        return "n/a"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, float):
        return f"{value:.6g}"
    return str(value)


def _markdown_table(headers: list[str], rows: list[list[str]]) -> str:
    header_row = "| " + " | ".join(_cell(header) for header in headers) + " |"
    separator = "| " + " | ".join("---" for _ in headers) + " |"
    body = [
        "| " + " | ".join(_cell(value) for value in row) + " |"
        for row in rows
    ]
    return "\n".join([header_row, separator, *body])


def _cell(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ")
