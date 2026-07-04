import json
import subprocess
import sys
from pathlib import Path

from photonic_bench.comparison import ComparisonCard, render_comparison_markdown
from photonic_bench.config import load_config
from photonic_bench.json_report import report_to_dict
from photonic_bench.model import CalibrationFitRequest, evaluate
from tests.test_model import unit_config


def test_render_comparison_markdown_summarizes_local_and_published_cards() -> None:
    local_payload = report_to_dict(evaluate(unit_config()))
    xu_payload = report_to_dict(
        evaluate(load_config(Path("examples/xu_11tops_convolution_surrogate.yaml")))
    )

    markdown = render_comparison_markdown(
        [
            ComparisonCard(path=Path("local.json"), payload=local_payload),
            ComparisonCard(path=Path("xu.json"), payload=xu_payload),
        ]
    )

    assert "# PhotonicBench Comparison" in markdown
    assert "unit matmul" in markdown
    assert "Xu 2021 11 TOPS convolution accelerator surrogate" in markdown
    assert "10.1038/s41586-020-03063-0" in markdown
    assert "Interface bytes" in markdown
    assert "Eq ops/byte" in markdown
    assert "System total pJ" in markdown
    assert "System pJ/op" in markdown
    assert "System profile" in markdown
    assert "Movement pJ" in markdown
    assert "Bandwidth-limited eq ops/s" in markdown
    assert "Source grade" in markdown
    assert "Surrogate type" in markdown
    assert "Coverage" in markdown
    assert "582.368" in markdown
    assert "2.28571" in markdown
    assert "image_pixels=250000" in markdown
    assert "dense_vector_by_kernel_matmul_surrogate" in markdown
    assert "throughput=reported" in markdown
    assert "n/a" in markdown


def test_render_comparison_markdown_summarizes_calibration_fit() -> None:
    config = load_config(Path("examples/nature_pace_64x64.yaml"))
    payload = report_to_dict(
        evaluate(
            config,
            calibration_fit=CalibrationFitRequest(
                target="published-including-lasers",
                parameter="device.dac.energy_pj_per_conversion",
            ),
        )
    )

    markdown = render_comparison_markdown(
        [ComparisonCard(path=Path("nature_fit.json"), payload=payload)]
    )

    assert "published-including-lasers" in markdown
    assert "device.dac.energy_pj_per_conversion" in markdown
    assert "2.38" in markdown
    assert "0.420168" in markdown


def test_cli_compare_writes_markdown_report(tmp_path: Path) -> None:
    local_path = tmp_path / "local.json"
    xu_path = tmp_path / "xu.json"
    report_path = tmp_path / "comparison.md"

    local_path.write_text(
        json.dumps(report_to_dict(evaluate(unit_config()))),
        encoding="utf-8",
    )
    xu_path.write_text(
        json.dumps(
            report_to_dict(
                evaluate(
                    load_config(Path("examples/xu_11tops_convolution_surrogate.yaml"))
                )
            )
        ),
        encoding="utf-8",
    )

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "compare",
            str(local_path),
            str(xu_path),
            "--report",
            str(report_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Wrote comparison table" in completed.stdout
    assert report_path.exists()
    markdown = report_path.read_text(encoding="utf-8")
    assert "PhotonicBench Comparison" in markdown
    assert "unit matmul" in markdown
    assert "Eq ops/byte" in markdown
    assert "System pJ/op" in markdown
    assert "System profile" in markdown
    assert "11" in markdown
