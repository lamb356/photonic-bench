import json
import shutil
import subprocess
import sys
import threading
from pathlib import Path
from urllib.request import urlopen

from photonic_bench.visualizer import (
    build_server_visualizer_site,
    build_visualizer_http_server,
    discover_visualizer_data,
    render_visualizer_html,
    write_visualizer,
)


def test_discover_visualizer_data_loads_root_and_nested_reports() -> None:
    data = discover_visualizer_data(Path("reports"))
    summaries = {artifact.summary.source_path: artifact.summary for artifact in data.artifacts}

    assert not data.issues
    assert "nature_pace_64x64.json" in summaries
    assert (
        "transformer_small_sanity/small_transformer_layer_summary.json" in summaries
    )
    assert "bert_base_12layer_model/bert_base_12layer_model_summary.json" in summaries
    assert summaries["nature_pace_64x64.json"].kind == "matmul_card"
    assert summaries["nature_pace_64x64.json"].has_published_reference is True
    assert summaries["nature_pace_64x64.json"].source_quality_grade == "A"
    assert (
        summaries["nature_pace_64x64.json"].source_surrogate_type
        == "direct_64x64_matrix_vector_calibration"
    )
    assert "published reference" in summaries["nature_pace_64x64.json"].boundary_tags
    layer = summaries["transformer_small_sanity/small_transformer_layer_summary.json"]
    assert layer.kind == "transformer_layer"
    assert layer.latency_label == "Serial batch latency"
    assert layer.equivalent_ops == 8192
    assert "serial timing" in layer.boundary_tags
    assert "non-additive noise" in layer.boundary_tags
    assert layer.memory_traffic_bytes is not None
    assert layer.operational_intensity_ops_per_byte is not None
    assert layer.system_total_energy_pj is not None
    assert layer.system_energy_per_op_pj is not None
    assert layer.movement_energy_pj is not None
    assert layer.movement_energy_share is not None
    assert layer.bandwidth_limited_latency_ns is not None
    assert layer.bandwidth_limited_throughput_equivalent_ops_per_second is not None
    assert layer.system_profile == "default"
    assert layer.system_profile_overrides == ()
    model = summaries["bert_base_12layer_model/bert_base_12layer_model_summary.json"]
    assert model.kind == "transformer_model"
    assert model.latency_label == "Model serial batch latency"
    assert model.equivalent_ops == (12 * 1_711_276_032) + (
        2 * 128 * 768 * 30_522
    )
    assert "serial timing" in model.boundary_tags
    assert model.system_energy_per_op_pj is not None
    assert model.system_profile == "default"
    profile = summaries["profile_sensitivity_64x64_hbm.json"]
    assert profile.kind == "matmul_card"
    assert profile.system_profile == "hbm"

    assert [preset.name for preset in data.comparison_presets] == [
        "Published reference surrogate cards",
        "Local reuse sensitivity",
        "System profile sensitivity",
    ]
    assert data.comparison_presets[0].artifact_ids == (
        "nature_pace_64x64.json",
        "xu_11tops_convolution_surrogate.json",
        "feldmann_2021_photonic_tensor_core_surrogate.json",
        "pappas_2025_awgr_262tops_surrogate.json",
        "taichi_2024_chiplet_surrogate.json",
        "hitop_2025_optical_tensor_processor_surrogate.json",
        "lin_2024_tfln_120gops_tensor_core_surrogate.json",
        "meng_2025_mrr_otpu_tensor_core_surrogate.json",
        "zhang_2026_pommm_surrogate.json",
        "chen_2026_fsr_gemm_surrogate.json",
        "ning_2025_cirptc_surrogate.json",
        "kovaios_2025_wdm_1tops_tensor_core_surrogate.json",
        "luan_2026_single_shot_mmm_surrogate.json",
        "bandyopadhyay_2024_single_chip_dnn_surrogate.json",
        "kari_2024_coherent_matrix_platform_surrogate.json",
        "dong_2023_continuous_time_tensor_core_surrogate.json",
    )
    assert data.comparison_presets[2].artifact_ids == (
        "profile_sensitivity_64x64_on_chip_sram.json",
        "profile_sensitivity_64x64_hbm.json",
        "profile_sensitivity_64x64_ddr.json",
        "profile_sensitivity_64x64_pcie_attached.json",
    )
    assert (
        data.comparison_presets[2].pinned_id
        == "profile_sensitivity_64x64_ddr.json"
    )


def test_discover_visualizer_data_reports_unsupported_schema(tmp_path: Path) -> None:
    reports_dir = tmp_path / "reports"
    reports_dir.mkdir()
    (reports_dir / "unknown.json").write_text(
        json.dumps({"schema_version": "not-photonic-bench"}),
        encoding="utf-8",
    )

    data = discover_visualizer_data(reports_dir)

    assert data.artifacts == ()
    assert len(data.issues) == 1
    assert data.issues[0].source_path == "unknown.json"
    assert "unsupported schema_version" in data.issues[0].message


def test_discover_visualizer_data_reports_stale_preset_ids(tmp_path: Path) -> None:
    reports_dir = tmp_path / "reports"
    reports_dir.mkdir()
    shutil.copy(Path("reports/nature_pace_64x64.json"), reports_dir / "nature.json")
    (reports_dir / "visualizer_presets.json").write_text(
        json.dumps(
            {
                "schema_version": "photonic-bench-comparison-presets-v1",
                "presets": [
                    {
                        "name": "stale",
                        "artifact_ids": ["nature.json", "missing.json"],
                        "pinned_id": "missing.json",
                    }
                ],
            }
        ),
        encoding="utf-8",
    )

    data = discover_visualizer_data(reports_dir)

    assert len(data.artifacts) == 1
    assert len(data.comparison_presets) == 1
    assert len(data.issues) == 2
    assert "missing artifact id" in data.issues[0].message
    assert "pins missing artifact id" in data.issues[1].message


def test_render_visualizer_html_uses_external_static_assets() -> None:
    data = discover_visualizer_data(Path("reports"))
    html = render_visualizer_html(data)

    assert "PhotonicBench Visualizer" in html
    assert 'href="assets/styles.css"' in html
    assert 'src="data/index.js"' in html
    assert 'src="assets/app.js"' in html
    assert "photonicbench-data" not in html
    assert "Small transformer sanity layer" not in html


def test_write_visualizer_emits_index_payloads_and_static_assets(
    tmp_path: Path,
) -> None:
    output_path = tmp_path / "site" / "index.html"

    data = write_visualizer(Path("reports"), output_path)
    html = output_path.read_text(encoding="utf-8")
    index = json.loads((output_path.parent / "data" / "index.json").read_text())

    assert output_path.exists()
    assert "assets/styles.css" in html
    assert "data/index.js" in html
    assert (output_path.parent / "assets" / "styles.css").exists()
    assert (output_path.parent / "assets" / "app.js").exists()
    assert (output_path.parent / "data" / "index.js").exists()
    assert len(index["artifacts"]) == len(data.artifacts)
    assert "modeling_boundaries" in index
    assert (
        index["comparison_presets"][0]["name"]
        == "Published reference surrogate cards"
    )
    assert "Interface memory traffic" in " ".join(index["modeling_boundaries"])
    assert "System movement energy" in " ".join(index["modeling_boundaries"])
    assert "System profile names" in " ".join(index["modeling_boundaries"])
    assert "Transformer model timing" in " ".join(index["modeling_boundaries"])
    assert "Contention metrics" in " ".join(index["modeling_boundaries"])
    assert index["artifacts"][0]["summary"]["system_profile"] is not None
    assert (
        index["artifacts"][0]["summary"]["shared_bandwidth_clients"]
        is not None
    )

    layer = next(
        artifact
        for artifact in data.artifacts
        if artifact.summary.source_path
        == "transformer_small_sanity/small_transformer_layer_summary.json"
    )
    assert layer.summary.browser_path.endswith(
        "reports/transformer_small_sanity/small_transformer_layer_summary.json"
    )
    assert layer.summary.payload_path.endswith(".payload.json")
    assert layer.summary.payload_script_path.endswith(".payload.js")
    payload_json = output_path.parent / layer.summary.payload_path
    payload_script = output_path.parent / layer.summary.payload_script_path
    assert payload_json.exists()
    assert payload_script.exists()
    assert (
        json.loads(payload_json.read_text(encoding="utf-8"))["schema_version"]
        == "photonic-bench-transformer-layer-report-v1"
    )


def test_static_app_contains_comparison_and_boundary_labels() -> None:
    app_js = Path("photonic_bench/visualizer_assets/app.js").read_text(
        encoding="utf-8"
    )
    styles = Path("photonic_bench/visualizer_assets/styles.css").read_text(
        encoding="utf-8"
    )

    assert "Comparison Mode" in app_js
    assert "Mixed-schema comparison" in app_js
    assert "Pinned reference" in app_js
    assert "Delta vs pinned" in app_js
    assert "Percent vs pinned" in app_js
    assert "Ratio vs pinned" in app_js
    assert "Comparison Insights" in app_js
    assert "Comparison Brief" in app_js
    assert "Decision Scorecard" in app_js
    assert "decision_scorecard" in app_js
    assert "Download JSON" in app_js
    assert "Download Markdown" in app_js
    assert "Copy Markdown" in app_js
    assert "comparison_presets" in app_js
    assert "Operational intensity" in app_js
    assert "Interface Memory Traffic" in app_js
    assert "Multi-Tier System Model" in app_js
    assert "System profile" in app_js
    assert "Profile tier overrides" in app_js
    assert "System energy per op" in app_js
    assert "Movement share" in app_js
    assert "Contention Insight" in app_js
    assert "Contention-adjusted latency" in app_js
    assert "Contention-adjusted throughput" in app_js
    assert "contention-throughput" in app_js
    assert "Pareto Trade-Offs" in app_js
    assert "Energy/op vs throughput" in app_js
    assert "Ops/byte vs latency" in app_js
    assert "isParetoFrontierPoint" in app_js
    assert "axisScale" in app_js
    assert "log-scaled automatically" in app_js
    assert "Schema Compatibility" in app_js
    assert "compatible pinned baseline" in app_js
    assert "Grouped Same-Schema Analytics" in app_js
    assert "fetchPayloadJson" in app_js
    assert "Serial Timing" in app_js
    assert "Transformer Model Workload" in app_js
    assert "Layer Specs" in app_js
    assert "renderTransformerModel" in app_js
    assert "Non-additive Noise" in app_js
    assert "Transformer Exclusions" in app_js
    assert "Published references" in app_js
    assert "Source Quality Index" in app_js
    assert "source_quality_grade" in app_js
    assert "validateExternalPayload" in app_js
    assert "Unexpected top-level field" in app_js
    assert "Detected and accepted" in app_js
    assert "Load external JSON reports" in Path(
        "photonic_bench/visualizer_assets/template.html"
    ).read_text(encoding="utf-8")
    assert "external-diagnostics" in Path(
        "photonic_bench/visualizer_assets/template.html"
    ).read_text(encoding="utf-8")
    assert "summarizeExternalPayload" in app_js
    assert "unsupported schema_version" in app_js
    assert "external file" in app_js
    assert 'startsWith("<")' not in app_js
    assert ".comparison-table" in styles
    assert ".insight-grid" in styles
    assert ".preset-panel" in styles
    assert ".external-panel" in styles
    assert ".export-preview" in styles
    assert ".pareto-chart" in styles
    assert ".pareto-point.frontier" in styles


def test_server_visualizer_site_uses_fetchable_payload_paths() -> None:
    site = build_server_visualizer_site(Path("reports"))
    layer = next(
        artifact
        for artifact in site.data.artifacts
        if artifact.summary.source_path
        == "transformer_small_sanity/small_transformer_layer_summary.json"
    )

    assert layer.summary.payload_path.endswith(".payload.json")
    assert layer.summary.payload_script_path == ""
    assert layer.summary.payload_path in site.payloads_by_path
    assert layer.summary.browser_path in site.payloads_by_path
    assert (
        site.payloads_by_path[layer.summary.payload_path]["schema_version"]
        == "photonic-bench-transformer-layer-report-v1"
    )


def test_visualizer_http_server_serves_index_and_payload_json() -> None:
    server, site = build_visualizer_http_server(
        Path("reports"),
        host="127.0.0.1",
        port=0,
    )
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base_url = f"http://127.0.0.1:{server.server_address[1]}"

    try:
        with urlopen(f"{base_url}/data/index.json", timeout=5) as response:
            index = json.loads(response.read().decode("utf-8"))
        payload_path = index["artifacts"][0]["summary"]["payload_path"]
        with urlopen(f"{base_url}/{payload_path}", timeout=5) as response:
            payload = json.loads(response.read().decode("utf-8"))
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)

    assert len(index["artifacts"]) == len(site.data.artifacts)
    assert payload["schema_version"] in {
        "photonic-bench-report-v1",
        "photonic-bench-transformer-layer-report-v1",
        "photonic-bench-transformer-model-report-v1",
    }


def test_cli_visualize_writes_static_html_and_data_assets(tmp_path: Path) -> None:
    output_path = tmp_path / "visualizer" / "index.html"

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "visualize",
            "--reports-dir",
            "reports",
            "--output",
            str(output_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Wrote web visualizer" in completed.stdout
    assert output_path.exists()
    assert (output_path.parent / "data" / "index.json").exists()
    assert (output_path.parent / "data" / "payloads").is_dir()
    assert "photonic-bench-transformer-layer-report-v1" in (
        output_path.parent / "data" / "index.json"
    ).read_text(encoding="utf-8")
    assert "photonic-bench-transformer-model-report-v1" in (
        output_path.parent / "data" / "index.json"
    ).read_text(encoding="utf-8")
