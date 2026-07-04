import math
from pathlib import Path

import pytest

from photonic_bench.config import (
    AdcConfig,
    BenchmarkConfig,
    BenchmarkMeta,
    DacConfig,
    DeviceConfig,
    ExecutionConfig,
    NoiseConfig,
    PipelineConfig,
    ProvenanceConfig,
    PublishedCalibrationConfig,
    TimingConfig,
    WorkloadConfig,
    load_config,
)
from photonic_bench.model import CalibrationFitRequest, evaluate


def unit_config() -> BenchmarkConfig:
    return BenchmarkConfig(
        benchmark=BenchmarkMeta(name="unit matmul", description="small audited case"),
        workload=WorkloadConfig(type="matmul", m=4, n=8, k=2),
        device=DeviceConfig(
            optical_mac_energy_fj=0.5,
            laser_wall_plug_efficiency=0.25,
            photodetector_energy_fj_per_sample=10.0,
            adc=AdcConfig(bits=6, energy_pj_per_conversion=0.5),
            dac=DacConfig(bits=6, energy_pj_per_conversion=0.2),
            vector_dac=DacConfig(bits=6, energy_pj_per_conversion=0.2),
            weight_dac=DacConfig(bits=6, energy_pj_per_conversion=0.2),
        ),
        timing=TimingConfig(optical_latency_ns=3.0, adc_latency_ns=1.0, dac_latency_ns=1.0),
        noise=NoiseConfig(
            phase_noise_rad_rms=0.02,
            drift_rad_per_second=0.1,
            integration_time_ns=3.0,
        ),
    )


def test_evaluate_matmul_energy_accounting() -> None:
    result = evaluate(unit_config())

    assert result.macs == 64
    assert result.equivalent_ops == 128
    assert result.output_elements == 32
    assert result.dac_conversions == 24
    assert result.adc_conversions == 32

    assert result.energy.optical_compute_pj == pytest.approx(0.032)
    assert result.energy.laser_electrical_pj == pytest.approx(0.128)
    assert result.energy.detector_pj == pytest.approx(0.32)
    assert result.energy.adc_pj == pytest.approx(16.0)
    assert result.energy.vector_dac_pj == pytest.approx(1.6)
    assert result.energy.weight_dac_pj == pytest.approx(3.2)
    assert result.energy.dac_pj == pytest.approx(4.8)
    assert result.energy.total_pj == pytest.approx(21.248)
    assert result.energy.peripheral_share == pytest.approx((16.0 + 4.8 + 0.32) / 21.248)
    assert result.energy.energy_per_mac_pj == pytest.approx(21.248 / 64)
    assert result.energy.energy_per_op_pj == pytest.approx(21.248 / 128)
    assert result.memory_traffic.vector_operand_read_bytes == 8
    assert result.memory_traffic.weight_operand_read_bytes == 16
    assert result.memory_traffic.output_write_bytes == 32
    assert result.memory_traffic.total_interface_bytes == 56
    assert result.memory_traffic.macs_per_byte == pytest.approx(64 / 56)
    assert result.memory_traffic.equivalent_ops_per_byte == pytest.approx(128 / 56)
    assert result.system.sram.read_bytes == pytest.approx(24)
    assert result.system.sram.write_bytes == pytest.approx(32)
    assert result.system.sram.total_energy_pj == pytest.approx(56 * 0.02)
    assert result.system.sram.transfer_time_ns == pytest.approx(56 / 1024)
    assert result.system.intermediate.total_energy_pj == pytest.approx(56 * 0.2)
    assert result.system.intermediate.transfer_time_ns == pytest.approx(56 / 256)
    assert result.system.off_chip.total_energy_pj == pytest.approx(56 * 10)
    assert result.system.off_chip.transfer_time_ns == pytest.approx(56 / 16)
    assert result.system.memory_timing_mode == "overlapped"
    assert result.system.local_compute_and_conversion_energy_pj == pytest.approx(
        result.energy.total_pj
    )
    assert result.system.total_movement_energy_pj == pytest.approx(572.32)
    assert result.system.total_system_energy_pj == pytest.approx(21.248 + 572.32)
    assert result.system.system_energy_per_op_pj == pytest.approx(
        (21.248 + 572.32) / 128
    )
    assert result.system.movement_energy_share == pytest.approx(
        572.32 / (21.248 + 572.32)
    )
    assert result.system.max_transfer_time_ns == pytest.approx(56 / 16)
    assert result.system.serial_transfer_time_ns == pytest.approx(
        (56 / 1024) + (56 / 256) + (56 / 16)
    )
    assert result.system.effective_transfer_time_ns == pytest.approx(56 / 16)
    assert result.system.bandwidth_limited_batch_latency_ns == pytest.approx(5.0)


def test_evaluate_noise_and_latency_estimates() -> None:
    result = evaluate(unit_config())

    expected_quantization_snr_db = 6.02 * 6 + 1.76
    expected_quantization_rms = 1 / (math.sqrt(12) * ((2**6) - 1))
    expected_drift_rms = 0.1 * 3e-9
    expected_relative_error = math.sqrt(
        expected_quantization_rms**2 + 0.02**2 + expected_drift_rms**2
    )

    assert result.timing.total_latency_ns == 5.0
    assert result.timing.batch_latency_ns == 5.0
    assert result.timing.pipeline_cycle_time_ns == 5.0
    assert result.timing.steady_state_operations_per_second == pytest.approx(2e8)
    assert result.noise.quantization_snr_db == pytest.approx(expected_quantization_snr_db)
    assert result.noise.quantization_rms == pytest.approx(expected_quantization_rms)
    assert result.noise.drift_rms_rad == pytest.approx(expected_drift_rms)
    assert result.noise.estimated_relative_error_rms == pytest.approx(
        expected_relative_error
    )


def test_evaluate_reuse_weight_stationary_pipeline_and_separate_dacs() -> None:
    config = unit_config().with_updates(
        device=DeviceConfig(
            optical_mac_energy_fj=0.5,
            laser_wall_plug_efficiency=0.25,
            photodetector_energy_fj_per_sample=10.0,
            adc=AdcConfig(bits=6, energy_pj_per_conversion=0.5),
            dac=DacConfig(bits=6, energy_pj_per_conversion=0.2),
            vector_dac=DacConfig(bits=6, energy_pj_per_conversion=0.1),
            weight_dac=DacConfig(bits=8, energy_pj_per_conversion=0.5),
        ),
        execution=ExecutionConfig(
            batch_size=8,
            vector_reuse_factor=2,
            weight_reuse_factor=1,
            weight_stationary=True,
            pipeline=PipelineConfig(stages=3, cycle_time_ns=2.0),
        ),
    )

    result = evaluate(config)

    assert result.operation_macs == 64
    assert result.macs == 512
    assert result.operation_equivalent_ops == 128
    assert result.equivalent_ops == 1024
    assert result.operations_per_batch == 8
    assert result.output_elements_per_operation == 32
    assert result.output_elements == 256
    assert result.adc_conversions == 256
    assert result.vector_dac_conversions == 32
    assert result.weight_dac_conversions == 16
    assert result.dac_conversions == 48

    assert result.energy.vector_dac_pj == pytest.approx(3.2)
    assert result.energy.weight_dac_pj == pytest.approx(8.0)
    assert result.energy.dac_pj == pytest.approx(11.2)
    assert result.energy.total_pj == pytest.approx(142.784)
    assert result.memory_traffic.vector_operand_read_bytes == 32
    assert result.memory_traffic.weight_operand_read_bytes == 16
    assert result.memory_traffic.output_write_bytes == 256
    assert result.memory_traffic.total_interface_bytes == 304
    assert result.memory_traffic.equivalent_ops_per_byte == pytest.approx(1024 / 304)

    assert result.timing.total_latency_ns == pytest.approx(5.0)
    assert result.timing.pipeline_stages == 3
    assert result.timing.pipeline_cycle_time_ns == pytest.approx(2.0)
    assert result.timing.batch_latency_ns == pytest.approx(19.0)
    assert result.timing.steady_state_operations_per_second == pytest.approx(5e8)
    assert result.timing.steady_state_equivalent_ops_per_second == pytest.approx(64e9)


def test_evaluate_can_fit_dac_energy_to_published_energy_target() -> None:
    config = load_config(Path("examples/nature_pace_64x64.yaml"))

    result = evaluate(
        config,
        calibration_fit=CalibrationFitRequest(
            target="published-including-lasers",
            parameter="device.dac.energy_pj_per_conversion",
        ),
    )

    assert result.calibration_fit is not None
    fit = result.calibration_fit
    assert fit.target == "published-including-lasers"
    assert fit.target_total_energy_pj == pytest.approx(8192 / 2.38)
    assert fit.fitted_parameter == "device.dac.energy_pj_per_conversion"
    assert fit.original_value == pytest.approx(0.2)
    assert fit.fitted_value == pytest.approx((8192 / 2.38 - 40.832) / 4160)
    assert fit.pre_fit_total_energy_pj == pytest.approx(872.832)
    assert fit.post_fit_total_energy_pj == pytest.approx(8192 / 2.38)
    assert fit.absolute_error_pj == pytest.approx(0.0)
    assert "not an independent reproduction" in fit.assumptions[-1]


def test_evaluate_rejects_fit_without_published_calibration() -> None:
    with pytest.raises(ValueError, match="published_calibration"):
        evaluate(
            unit_config(),
            calibration_fit=CalibrationFitRequest(
                target="published-including-lasers",
                parameter="device.dac.energy_pj_per_conversion",
            ),
        )


def test_evaluate_rejects_impossible_energy_floor_fit() -> None:
    config = unit_config().with_updates(
        provenance=ProvenanceConfig(
            source_title="Synthetic high-efficiency reference",
            source_url="https://example.invalid/reference",
            doi="10.0000/example",
            venue="Synthetic test",
            claim_status="test-only paper target",
        ),
        published_calibration=PublishedCalibrationConfig(
            architecture="Synthetic target",
            reported_tops=1_000_000.0,
            energy_efficiency_excluding_lasers_tops_per_watt=1_000_000.0,
            energy_efficiency_including_lasers_tops_per_watt=1_000_000.0,
            reported_latency_ns=1.0,
            reported_future_latency_ns=1.0,
            reported_enob=8.0,
            reported_component_count_min=1,
            a10_latency_ns_min=1.0,
            pace_total_time_us=1.0,
            gpu_total_time_us=1.0,
        ),
    )

    with pytest.raises(ValueError, match="fixed energy floor"):
        evaluate(
            config,
            calibration_fit=CalibrationFitRequest(
                target="published-including-lasers",
                parameter="device.dac.energy_pj_per_conversion",
            ),
        )
