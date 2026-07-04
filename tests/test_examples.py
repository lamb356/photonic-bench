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
