import json
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
    assert summaries["nature_pace_64x64.json"].kind == "matmul_card"
    assert summaries["nature_pace_64x64.json"].has_published_reference is True
    assert "published reference" in summaries["nature_pace_64x64.json"].boundary_tags
    layer = summaries["transformer_small_sanity/small_transformer_layer_summary.json"]
    assert layer.kind == "transformer_layer"
    assert layer.latency_label == "Serial batch latency"
    assert layer.equivalent_ops == 8192
    assert "serial timing" in layer.boundary_tags
    assert "non-additive noise" in layer.boundary_tags


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
    assert "Schema Compatibility" in app_js
    assert "compatible pinned baseline" in app_js
    assert "Grouped Same-Schema Analytics" in app_js
    assert "fetchPayloadJson" in app_js
    assert "Serial Timing" in app_js
    assert "Non-additive Noise" in app_js
    assert "Transformer Exclusions" in app_js
    assert "Published references" in app_js
    assert 'startsWith("<")' not in app_js
    assert ".comparison-table" in styles
    assert ".insight-grid" in styles


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
