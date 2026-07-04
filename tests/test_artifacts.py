import shutil
import subprocess
import sys
from pathlib import Path

from photonic_bench.artifacts import (
    expected_generated_report_paths,
    verify_artifact_freshness,
)


def test_expected_generated_report_paths_include_core_artifact_families() -> None:
    paths = set(expected_generated_report_paths())

    assert "matmul_64x64.md" in paths
    assert "matmul_64x64.json" in paths
    assert "comparison.md" in paths
    assert "transformer_small_sanity/small_transformer_layer_summary.json" in paths
    assert "bert_base_12layer_model/bert_base_12layer_model_summary.json" in paths
    assert "visualizer/index.html" in paths
    assert "visualizer/data/index.json" in paths


def test_verify_artifact_freshness_passes_for_checked_in_reports() -> None:
    result = verify_artifact_freshness()

    assert result.is_fresh, result.failure_report()
    assert "comparison.md" in result.checked_files
    assert "visualizer/data/index.json" in result.checked_files
    assert any(
        path.startswith("visualizer/data/payloads/") for path in result.checked_files
    )


def test_verify_artifact_freshness_reports_stale_missing_and_unexpected_files(
    tmp_path: Path,
) -> None:
    reports_dir = tmp_path / "reports"
    shutil.copytree(Path("reports"), reports_dir)
    stale_path = reports_dir / "matmul_64x64.md"
    stale_path.write_text(
        stale_path.read_text(encoding="utf-8") + "\nSTALE CONTENT\n",
        encoding="utf-8",
    )
    (reports_dir / "comparison.md").unlink()
    (reports_dir / "obsolete_report.md").write_text("obsolete\n", encoding="utf-8")

    result = verify_artifact_freshness(reports_dir=reports_dir)

    assert not result.is_fresh
    assert result.missing_files == ("comparison.md",)
    assert result.unexpected_files == ("obsolete_report.md",)
    assert [diff.path for diff in result.stale_files] == ["matmul_64x64.md"]
    report = result.failure_report()
    assert "Missing generated files" in report
    assert "Unexpected generated files" in report
    assert "Stale generated files" in report


def test_verify_artifact_freshness_rejects_unmanifested_example_yaml(
    tmp_path: Path,
) -> None:
    examples_dir = tmp_path / "examples"
    shutil.copytree(Path("examples"), examples_dir)
    (examples_dir / "forgotten_example.yaml").write_text(
        """
benchmark:
  name: forgotten
""".strip(),
        encoding="utf-8",
    )

    result = verify_artifact_freshness(examples_dir=examples_dir)

    assert not result.is_fresh
    assert result.generation_errors
    assert result.generation_errors[0].label == "manifest examples"
    assert "forgotten_example.yaml" in result.generation_errors[0].message


def test_verify_artifact_freshness_rejects_visualizer_generation_warnings(
    tmp_path: Path,
) -> None:
    reports_dir = tmp_path / "reports"
    shutil.copytree(Path("reports"), reports_dir)
    presets_path = reports_dir / "visualizer_presets.json"
    presets_path.write_text(
        """
{
  "schema_version": "photonic-bench-comparison-presets-v1",
  "presets": [
    {
      "name": "broken",
      "artifact_ids": ["missing.json"],
      "pinned_id": "missing.json"
    }
  ]
}
""".strip(),
        encoding="utf-8",
    )

    result = verify_artifact_freshness(reports_dir=reports_dir)

    assert not result.is_fresh
    assert result.generation_errors
    assert result.generation_errors[0].label == "visualize reports"
    assert "missing artifact id" in result.generation_errors[0].message


def test_cli_verify_artifacts_reports_success() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "verify-artifacts",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Artifacts are fresh" in completed.stdout
