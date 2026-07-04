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


def test_zhang_2026_pommm_card_is_source_backed() -> None:
    config = load_config(Path("examples/zhang_2026_pommm_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41566-025-01799-7"
    assert config.published_calibration is not None
    assert result.macs == 8000
    assert result.equivalent_ops == 16_000
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["demonstrated_nonnegative_matrix_size"] == 20
    assert metrics["demonstrated_real_valued_matrix_size"] == 10
    assert metrics["random_matrix_pairs_per_size"] == 50
    assert metrics["data_doi"] == "10.6084/m9.figshare.30173512"
    assert "not a full optical-field propagation" in metrics["surrogate_mapping"]


def test_chen_2026_fsr_gemm_card_is_source_backed() -> None:
    config = load_config(Path("examples/chen_2026_fsr_gemm_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.23919/DATE69613.2026.11539161"
    assert config.published_calibration is not None
    assert result.macs == 262_144
    assert result.equivalent_ops == 524_288
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["area_efficiency_improvement_x"] == pytest.approx(57)
    assert metrics["energy_efficiency_gain_x"] == pytest.approx(13.8)
    assert metrics["energy_reduction_percent_vs_mrr"] == pytest.approx(70)
    assert metrics["speedup_vs_leading_photonic_gemm_x"] == pytest.approx(21)
    assert metrics["supports_dynamic_real_valued_operands"] is True
    assert "not the paper's full FSR-parallel hardware schedule" in (
        metrics["surrogate_mapping"]
    )


def test_ning_2025_cirptc_card_is_source_backed() -> None:
    config = load_config(Path("examples/ning_2025_cirptc_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1364/OPTICA.559604"
    assert config.published_calibration is not None
    assert result.macs == 4096
    assert result.equivalent_ops == 8192
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["projected_power_efficiency_tops_per_watt"] == pytest.approx(47.94)
    assert metrics["computational_density_tops_per_mm2"] == pytest.approx(5.84)
    assert metrics["trainable_parameter_reduction_percent"] == pytest.approx(74.91)
    assert metrics["hardware_software_codesign_improvement_x"] == pytest.approx(6.87)
    assert "does not encode the block-circulant training" in (
        metrics["surrogate_mapping"]
    )


def test_kovaios_2025_wdm_tensor_core_card_is_source_backed() -> None:
    config = load_config(
        Path("examples/kovaios_2025_wdm_1tops_tensor_core_surrogate.yaml")
    )
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1109/JLT.2025.3589088"
    assert config.published_calibration is not None
    assert config.published_calibration.reported_tops == pytest.approx(0.96)
    assert result.macs == 8
    assert result.equivalent_ops == 16
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["tensor_vector_unit_shape"] == "4x2x1"
    assert metrics["average_error_percent"] == pytest.approx(3.9)
    assert metrics["eam_bandwidth_ghz"] == pytest.approx(56)
    assert metrics["iris_accuracy_percent_4x10_to_4x30_gbd"] == pytest.approx(93.3)
    assert metrics["iris_accuracy_percent_4x60_gbd"] == pytest.approx(83.3)
    assert "not the full hyperdimensional scaling analysis" in (
        metrics["surrogate_mapping"]
    )


def test_luan_2026_single_shot_mmm_card_is_source_backed() -> None:
    config = load_config(Path("examples/luan_2026_single_shot_mmm_surrogate.yaml"))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41467-026-68452-x"
    assert config.published_calibration is not None
    assert result.macs == 4096
    assert result.equivalent_ops == 8192
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["reported_macs_per_shot"] == 4096
    assert metrics["reported_sample_rate_gsa_per_s"] == pytest.approx(2)
    assert metrics["reported_optical_energy_per_mac_aj"] == pytest.approx(20)
    assert metrics["reported_classification_accuracy_percent"] == pytest.approx(96.4)
    assert "preserves the reported 4096 MACs per shot" in (
        metrics["surrogate_mapping"]
    )


def test_bandyopadhyay_2024_single_chip_dnn_card_is_source_backed() -> None:
    config = load_config(
        Path("examples/bandyopadhyay_2024_single_chip_dnn_surrogate.yaml")
    )
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41566-024-01567-z"
    assert config.published_calibration is not None
    assert result.macs == 216
    assert result.equivalent_ops == 432
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["reported_neurons"] == 6
    assert metrics["reported_layers"] == 3
    assert metrics["reported_latency_ps"] == pytest.approx(410)
    assert metrics["reported_accuracy_percent"] == pytest.approx(92.5)
    assert "six-neuron integrated photonic DNN" in metrics["surrogate_mapping"]


def test_kari_2024_coherent_matrix_platform_card_is_source_backed() -> None:
    config = load_config(
        Path("examples/kari_2024_coherent_matrix_platform_surrogate.yaml")
    )
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1364/OPTICA.507525"
    assert config.published_calibration is not None
    assert result.macs == 64
    assert result.equivalent_ops == 128
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["operation_types"] == "real_mac,complex_mac,covariance"
    assert metrics["scalable_target"] == "general_matrix_matrix_operations"
    assert metrics["source_demonstrates_temporal_multiplexing"] is True
    assert "coherent matrix-operation platform" in metrics["surrogate_mapping"]


def test_dong_2023_continuous_time_tensor_core_card_is_source_backed() -> None:
    config = load_config(
        Path("examples/dong_2023_continuous_time_tensor_core_surrogate.yaml")
    )
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == "10.1038/s41566-023-01313-x"
    assert config.published_calibration is not None
    assert result.macs == 900
    assert result.equivalent_ops == 1800
    metrics = payload["published_reference"]["reported"]["additional_metrics"]
    assert metrics["reported_parallelism"] == 100
    assert metrics["rf_components"] == 50
    assert metrics["wdm_channels"] == 2
    assert metrics["reported_cnn_accuracy_percent"] == pytest.approx(93.5)
    assert "not a continuous-time RF/WDM simulation" in metrics["surrogate_mapping"]


@pytest.mark.parametrize(
    (
        "config_path",
        "expected_doi",
        "expected_profile",
        "expected_metric",
        "expected_audit_metric",
    ),
    [
        (
            "examples/lightening_transformer_2024_surrogate.yaml",
            "10.48550/arXiv.2305.19533",
            "optical_interconnect",
            "energy_reduction_vs_prior_photonic_accelerators_min_x",
            "Energy reduction vs prior photonic accelerators",
        ),
        (
            "examples/lightning_2023_smartnic_surrogate.yaml",
            "10.1145/3603269.3604821",
            "pcie_attached",
            "realtime_network_rate_gbps",
            "Real-time inference network rate",
        ),
        (
            "examples/adept_2023_electro_photonic_surrogate.yaml",
            "10.1145/3606949",
            "on_chip_sram",
            "throughput_per_watt_vs_systolic_arrays_x",
            "Throughput per Watt vs traditional systolic arrays",
        ),
    ],
)
def test_new_memory_stressing_cards_are_source_backed_and_audited(
    config_path: str,
    expected_doi: str,
    expected_profile: str,
    expected_metric: str,
    expected_audit_metric: str,
) -> None:
    config = load_config(Path(config_path))
    result = evaluate(config)
    payload = report_to_dict(result)

    assert config.provenance is not None
    assert config.provenance.doi == expected_doi
    assert config.system.profile == expected_profile
    assert config.published_calibration is not None
    assert expected_metric in config.published_calibration.additional_metrics

    reference = payload["published_reference"]
    assert reference is not None
    metrics = reference["reported"]["additional_metrics"]
    assert expected_metric in metrics
    audit = reference["source_audit"]
    assert any(
        row["metric"] == expected_audit_metric for row in audit["quoted_metrics"]
    )
    assert audit["local_assumptions"]
    assert audit["confidence_flags"]
