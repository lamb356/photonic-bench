import json
import subprocess
import sys
from pathlib import Path


def test_cli_run_writes_markdown_report(tmp_path: Path) -> None:
    config_path = tmp_path / "matmul.yaml"
    report_path = tmp_path / "report.md"
    config_path.write_text(
        """
benchmark:
  name: cli matmul
  description: CLI smoke case
workload:
  type: matmul
  m: 4
  n: 8
  k: 2
device:
  optical_mac_energy_fj: 0.5
  laser_wall_plug_efficiency: 0.25
  photodetector_energy_fj_per_sample: 10
  adc:
    bits: 6
    energy_pj_per_conversion: 0.5
  dac:
    bits: 6
    energy_pj_per_conversion: 0.2
timing:
  optical_latency_ns: 3
  adc_latency_ns: 1
  dac_latency_ns: 1
noise:
  phase_noise_rad_rms: 0.02
  drift_rad_per_second: 0.1
  integration_time_ns: 3
""".strip(),
        encoding="utf-8",
    )

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "run",
            str(config_path),
            "--report",
            str(report_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Wrote benchmark card" in completed.stdout
    assert report_path.exists()
    assert "# PhotonicBench Benchmark Card: cli matmul" in report_path.read_text(
        encoding="utf-8"
    )


def test_cli_run_can_write_json_report_with_markdown(tmp_path: Path) -> None:
    config_path = tmp_path / "matmul.yaml"
    report_path = tmp_path / "report.md"
    json_report_path = tmp_path / "report.json"
    config_path.write_text(
        """
benchmark:
  name: cli json matmul
  description: CLI JSON smoke case
workload:
  type: matmul
  m: 4
  n: 8
  k: 2
device:
  optical_mac_energy_fj: 0.5
  laser_wall_plug_efficiency: 0.25
  photodetector_energy_fj_per_sample: 10
  adc:
    bits: 6
    energy_pj_per_conversion: 0.5
  dac:
    bits: 6
    energy_pj_per_conversion: 0.2
timing:
  optical_latency_ns: 3
  adc_latency_ns: 1
  dac_latency_ns: 1
noise:
  phase_noise_rad_rms: 0.02
  drift_rad_per_second: 0.1
  integration_time_ns: 3
""".strip(),
        encoding="utf-8",
    )

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "run",
            str(config_path),
            "--report",
            str(report_path),
            "--json-report",
            str(json_report_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Wrote benchmark card" in completed.stdout
    assert "Wrote machine-readable benchmark card" in completed.stdout
    assert report_path.exists()
    assert json_report_path.exists()

    payload = json.loads(json_report_path.read_text(encoding="utf-8"))
    assert payload["schema_version"] == "photonic-bench-report-v1"
    assert payload["benchmark"]["name"] == "cli json matmul"
    assert payload["local_model"]["energy"]["total_pj"] == 21.248


def test_cli_run_can_write_calibrated_reports(tmp_path: Path) -> None:
    report_path = tmp_path / "nature_fit.md"
    json_report_path = tmp_path / "nature_fit.json"

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "run",
            "examples/nature_pace_64x64.yaml",
            "--report",
            str(report_path),
            "--json-report",
            str(json_report_path),
            "--fit-target",
            "published-including-lasers",
            "--fit-parameter",
            "device.dac.energy_pj_per_conversion",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "## Calibration Fit" in report_path.read_text(encoding="utf-8")

    payload = json.loads(json_report_path.read_text(encoding="utf-8"))
    fit = payload["calibration_fit"]
    assert fit["target"] == "published-including-lasers"
    assert fit["fitted_parameter"]["path"] == "device.dac.energy_pj_per_conversion"
    assert fit["post_fit_total_energy_pj"] == 8192 / 2.38


def test_cli_run_rejects_incomplete_calibration_fit_args(tmp_path: Path) -> None:
    report_path = tmp_path / "nature_fit.md"

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "run",
            "examples/nature_pace_64x64.yaml",
            "--report",
            str(report_path),
            "--fit-target",
            "published-including-lasers",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 2
    assert "requires both --fit-target and --fit-parameter" in completed.stderr


def test_cli_transformer_layer_reports_missing_config_file(tmp_path: Path) -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "transformer-layer",
            str(tmp_path / "missing.yaml"),
            "--output-dir",
            str(tmp_path / "cards"),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 2
    assert "missing.yaml does not exist" in completed.stderr


def test_cli_transformer_layer_reports_malformed_yaml(tmp_path: Path) -> None:
    config_path = tmp_path / "broken_transformer.yaml"
    config_path.write_text("benchmark: [\n", encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "transformer-layer",
            str(config_path),
            "--output-dir",
            str(tmp_path / "cards"),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 2
    assert "contains invalid YAML" in completed.stderr
    assert "line" in completed.stderr


def test_cli_compare_reports_malformed_json(tmp_path: Path) -> None:
    json_path = tmp_path / "broken.json"
    report_path = tmp_path / "comparison.md"
    json_path.write_text("{", encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "compare",
            str(json_path),
            "--report",
            str(report_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 2
    assert "contains invalid JSON" in completed.stderr
    assert "line 1" in completed.stderr


def test_cli_compare_reports_non_object_json(tmp_path: Path) -> None:
    json_path = tmp_path / "array.json"
    report_path = tmp_path / "comparison.md"
    json_path.write_text("[]", encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "compare",
            str(json_path),
            "--report",
            str(report_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 2
    assert "array.json must contain a JSON object" in completed.stderr


def test_cli_compare_reports_non_finite_json_constants(tmp_path: Path) -> None:
    json_path = tmp_path / "nan.json"
    report_path = tmp_path / "comparison.md"
    json_path.write_text('{"schema_version": NaN}', encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "compare",
            str(json_path),
            "--report",
            str(report_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 2
    assert "unsupported non-finite JSON value" in completed.stderr


def test_cli_system_profiles_lists_human_readable_profiles() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "system-profiles",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "| Profile | Timing | Shared clients | Arbitration |" in completed.stdout
    assert "default" in completed.stdout
    assert "pcie_attached" in completed.stdout
    assert "serialized" in completed.stdout
    assert "0.05" in completed.stdout


def test_cli_system_profiles_can_emit_json() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "system-profiles",
            "--json",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    payload = json.loads(completed.stdout)
    profiles = {profile["name"]: profile for profile in payload["profiles"]}
    assert profiles["default"]["system"]["intermediate"][
        "bandwidth_bytes_per_ns"
    ] == 256.0
    assert profiles["pcie_attached"]["memory_timing_mode"] == "serialized"
    assert profiles["pcie_attached"]["system"]["contention"][
        "shared_bandwidth_clients"
    ] == 2.0


def test_cli_list_examples_summarizes_inventory() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "list-examples",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "PhotonicBench Example Inventory" in completed.stdout
    assert "nature_pace_64x64.yaml" in completed.stdout
    assert "| matmul |" in completed.stdout
    assert "| yes | A | direct_64x64_matrix_vector_calibration |" in completed.stdout
    assert "meyer_2026_reconfigurable_ptp_surrogate.yaml" in completed.stdout
    assert "xie_2025_complex_mvm_surrogate.yaml" in completed.stdout
    assert "wu_2026_high_order_tensor_surrogate.yaml" in completed.stdout
    assert "bert_base_12layer_model.yaml" in completed.stdout
    assert "| transformer-model |" in completed.stdout


def test_cli_list_examples_can_emit_json() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "list-examples",
            "--json",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    payload = json.loads(completed.stdout)
    examples = {Path(row["path"]).name: row for row in payload["examples"]}
    assert examples["nature_pace_64x64.yaml"]["has_published_reference"] is True
    assert examples["nature_pace_64x64.yaml"]["source_quality_grade"] == "A"
    assert examples["bert_base_12layer_model.yaml"]["kind"] == "transformer-model"


def test_cli_validate_examples_passes_checked_examples() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "validate-examples",
            "--json",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    payload = json.loads(completed.stdout)
    assert payload["checked"] >= 1
    assert payload["errors"] == 0
    assert payload["failed"] == []


def test_cli_validate_examples_returns_failure_for_bad_example(tmp_path: Path) -> None:
    broken = tmp_path / "broken.yaml"
    broken.write_text("benchmark: [\n", encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "validate-examples",
            "--examples-dir",
            str(tmp_path),
            "--json",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 1
    payload = json.loads(completed.stdout)
    assert payload["checked"] == 1
    assert payload["errors"] == 1
    assert Path(payload["failed"][0]["path"]).name == "broken.yaml"
    assert "contains invalid YAML" in payload["failed"][0]["error"]


def test_cli_inspect_config_summarizes_matmul_config() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "inspect-config",
            "examples/profile_sensitivity_64x64_pcie_attached.yaml",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "PhotonicBench Config Inspection" in completed.stdout
    assert "| Kind | matmul |" in completed.stdout
    assert "| System profile | pcie_attached |" in completed.stdout
    assert "| Shared bandwidth clients | 2.0 |" in completed.stdout


def test_cli_inspect_config_can_emit_transformer_model_json() -> None:
    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "inspect-config",
            "examples/bert_base_12layer_model.yaml",
            "--kind",
            "transformer-model",
            "--json",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    payload = json.loads(completed.stdout)
    assert payload["kind"] == "transformer-model"
    assert payload["benchmark"] == "BERT-base style 12-layer encoder model"
    assert payload["system"]["contention"]["arbitration_efficiency"] == 1.0
