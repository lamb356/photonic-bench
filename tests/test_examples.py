from pathlib import Path

import pytest

from photonic_bench.config import load_config
from photonic_bench.json_report import report_to_dict
from photonic_bench.model import evaluate
from photonic_bench.report import render_markdown


def test_matmul_64x64_example_remains_renderable() -> None:
    config = load_config(Path("examples/matmul_64x64.yaml"))
    result = evaluate(config)
    markdown = render_markdown(result)

    assert result.macs == 262_144
    assert result.adc_conversions == 4_096
    assert result.dac_conversions == 8_192
    assert "| Total energy | 4251.648 pJ |" in markdown
    assert "This is not yet a calibrated reproduction" in markdown


def test_nature_pace_64x64_example_encodes_published_calibration() -> None:
    config = load_config(Path("examples/nature_pace_64x64.yaml"))
    result = evaluate(config)
    markdown = render_markdown(result)

    assert config.workload.m == 1
    assert config.workload.n == 64
    assert config.workload.k == 64
    assert result.macs == 4_096
    assert result.equivalent_ops == 8_192

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41586-025-08786-6"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_enob == pytest.approx(7.61)

    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj == pytest.approx(
        1 / 2.38
    )
    assert result.published_calibration.energy_per_mac_including_lasers_pj == pytest.approx(
        2 / 2.38
    )
    assert result.published_calibration.total_energy_including_lasers_pj == pytest.approx(
        8192 / 2.38
    )
    assert result.published_calibration.total_energy_excluding_lasers_pj == pytest.approx(
        8192 / 4.21
    )

    assert "## Provenance" in markdown
    assert "An integrated large-scale photonic accelerator" in markdown
    assert "## Published Calibration" in markdown
    assert "| Reported throughput | 8.190 TOPS |" in markdown
    assert "| Energy per equivalent op, including lasers | 0.420 pJ |" in markdown
    assert "| Energy per MAC, including lasers | 0.840 pJ |" in markdown
    assert "| Workload energy, including lasers | 3442.017 pJ |" in markdown


def test_weight_stationary_batch_example_exercises_realistic_model() -> None:
    config = load_config(Path("examples/weight_stationary_64x64_batch.yaml"))
    result = evaluate(config)
    markdown = render_markdown(result)

    assert result.operations_per_batch == 16
    assert result.macs == 4_194_304
    assert result.vector_dac_conversions == 65_536
    assert result.weight_dac_conversions == 4_096
    assert result.dac_conversions == 69_632
    assert result.energy.vector_dac_pj == pytest.approx(7_864.32)
    assert result.energy.weight_dac_pj == pytest.approx(1_843.2)
    assert result.energy.total_pj == pytest.approx(51_519.488)
    assert result.timing.batch_latency_ns == pytest.approx(35.0)
    assert result.timing.steady_state_equivalent_ops_per_second == pytest.approx(
        262_144_000_000_000.0
    )
    assert "## Execution Model" in markdown
    assert "| Weight stationary | True |" in markdown


def test_xu_11tops_convolution_surrogate_card_is_source_backed() -> None:
    config = load_config(Path("examples/xu_11tops_convolution_surrogate.yaml"))
    result = evaluate(config)
    markdown = render_markdown(result)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41586-020-03063-0"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_tops == pytest.approx(11)
    assert config.published_calibration.additional_metrics["image_pixels"] == 250_000
    assert config.published_calibration.additional_metrics["kernels"] == 10
    assert (
        config.published_calibration.additional_metrics[
            "digit_recognition_accuracy_percent"
        ]
        == 88
    )

    assert result.macs == 2_500_000
    assert result.equivalent_ops == 5_000_000
    assert result.weight_dac_conversions == 2_500_000
    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj is None

    assert "## Provenance" in markdown
    assert "10.1038/s41586-020-03063-0" in markdown
    assert "| Reported throughput | 11.000 TOPS |" in markdown
    assert "Surrogate mapping" in markdown

    assert payload["published_reference"]["reported"]["reported_tops"] == 11
    assert (
        payload["published_reference"]["reported"]["additional_metrics"][
            "surrogate_mapping"
        ]
        == "m=1, k=250000, n=10 represents one dense vector-by-kernel surrogate; not an exact convolution dataflow reproduction."
    )
    assert payload["published_reference"]["derived_unit_conversions"] == {}


def test_feldmann_2021_tensor_core_surrogate_card_is_source_backed() -> None:
    config = load_config(Path("examples/feldmann_2021_photonic_tensor_core_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41586-020-03070-1"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_tops == pytest.approx(2)
    assert (
        config.published_calibration.additional_metrics["reported_macs_per_second"]
        == 1_000_000_000_000
    )
    assert result.macs == 1024
    assert result.equivalent_ops == 2048
    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj is None
    assert "not an exact convolutional tensor-core dataflow" in (
        payload["published_reference"]["reported"]["additional_metrics"][
            "surrogate_mapping"
        ]
    )


def test_pappas_2025_awgr_surrogate_card_is_source_backed() -> None:
    config = load_config(Path("examples/pappas_2025_awgr_262tops_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1063/5.0271374"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_tops == pytest.approx(262)
    assert (
        config.published_calibration.energy_efficiency_including_lasers_tops_per_watt
        == pytest.approx(1 / 0.273)
    )
    assert result.macs == 4096
    assert result.equivalent_ops == 8192
    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj == pytest.approx(
        0.273
    )
    assert result.published_calibration.total_energy_including_lasers_pj == pytest.approx(
        8192 * 0.273
    )
    assert (
        payload["published_reference"]["reported"]["additional_metrics"][
            "mnist_accuracy_percent"
        ]
        == pytest.approx(92.14)
    )


def test_taichi_2024_chiplet_surrogate_card_is_source_backed() -> None:
    config = load_config(Path("examples/taichi_2024_chiplet_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1126/science.adl1203"
    assert config.published_calibration is not None
    assert (
        config.published_calibration.energy_efficiency_including_lasers_tops_per_watt
        == pytest.approx(160)
    )
    assert result.macs == 262_144
    assert result.equivalent_ops == 524_288
    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj == pytest.approx(
        1 / 160
    )
    assert result.published_calibration.total_energy_including_lasers_pj == pytest.approx(
        524_288 / 160
    )
    assert (
        payload["published_reference"]["reported"]["additional_metrics"][
            "experimental_omniglot_accuracy_percent"
        ]
        == pytest.approx(91.89)
    )
    assert "not the Taichi distributed optical protocol" in (
        payload["published_reference"]["reported"]["additional_metrics"][
            "surrogate_mapping"
        ]
    )


def test_hitop_2025_optical_tensor_processor_card_is_source_backed() -> None:
    config = load_config(
        Path("examples/hitop_2025_optical_tensor_processor_surrogate.yaml")
    )
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1126/sciadv.adu0228"
    assert config.published_calibration is not None
    assert (
        config.published_calibration.energy_efficiency_including_lasers_tops_per_watt
        == pytest.approx(40)
    )
    assert result.macs == 262_144
    assert result.equivalent_ops == 524_288
    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj == pytest.approx(
        1 / 40
    )
    assert result.published_calibration.total_energy_including_lasers_pj == pytest.approx(
        524_288 / 40
    )
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["model_parameters_validated"] == 405_000
    assert metrics["reported_energy_per_op_fj_from_efficiency"] == pytest.approx(25)
    assert "not an exact space-time-wavelength streaming schedule" in (
        metrics["surrogate_mapping"]
    )


def test_lin_2024_tfln_tensor_core_card_is_source_backed() -> None:
    config = load_config(
        Path("examples/lin_2024_tfln_120gops_tensor_core_surrogate.yaml")
    )
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41467-024-53261-x"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_tops == pytest.approx(0.12)
    assert result.macs == 4096
    assert result.equivalent_ops == 8192
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["reported_gops"] == pytest.approx(120)
    assert metrics["weight_update_speed_ghz"] == pytest.approx(60)
    assert metrics["fan_in_dimension"] == 131_072
    assert "not an exact time-domain integration schedule" in (
        metrics["surrogate_mapping"]
    )


def test_meng_2025_mrr_otpu_tensor_core_card_is_source_backed() -> None:
    config = load_config(Path("examples/meng_2025_mrr_otpu_tensor_core_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41377-024-01706-9"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_tops is None
    assert result.macs == 4096
    assert result.equivalent_ops == 8192
    assert result.published_calibration is not None
    assert result.published_calibration.energy_per_op_including_lasers_pj is None
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["computing_density_tops_per_mm2"] == pytest.approx(34.04)
    assert metrics["mnist_accuracy_percent"] == pytest.approx(96.41)
    assert "not an exact multidomain convolution schedule" in (
        metrics["surrogate_mapping"]
    )
