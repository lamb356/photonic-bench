import json
import subprocess
import sys
from pathlib import Path

from photonic_bench.visualizer import (
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
    layer = summaries["transformer_small_sanity/small_transformer_layer_summary.json"]
    assert layer.kind == "transformer_layer"
    assert layer.latency_label == "Serial batch latency"
    assert layer.equivalent_ops == 8192


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


def test_render_visualizer_html_contains_transformer_detail_concepts() -> None:
    data = discover_visualizer_data(Path("reports"))
    html = render_visualizer_html(data)

    assert "PhotonicBench Visualizer" in html
    assert "Small transformer sanity layer" in html
    assert "Local model estimate" in html
    assert "Published references" in html
    assert "Serial timing" in html
    assert "Non-additive noise" in html
    assert "Transformer Exclusions" in html
    assert "softmax" in html
    assert "Formula Audit" in html
    assert "Per-Matmul Breakdown" in html
    assert "photonicbench-data" in html


def test_write_visualizer_uses_browser_relative_artifact_paths(tmp_path: Path) -> None:
    output_path = tmp_path / "site" / "index.html"

    data = write_visualizer(Path("reports"), output_path)
    html = output_path.read_text(encoding="utf-8")

    assert output_path.exists()
    assert "../" in html
    layer = next(
        artifact
        for artifact in data.artifacts
        if artifact.summary.source_path
        == "transformer_small_sanity/small_transformer_layer_summary.json"
    )
    assert layer.summary.browser_path.endswith(
        "reports/transformer_small_sanity/small_transformer_layer_summary.json"
    )


def test_cli_visualize_writes_static_html(tmp_path: Path) -> None:
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
    assert "photonic-bench-transformer-layer-report-v1" in output_path.read_text(
        encoding="utf-8"
    )
