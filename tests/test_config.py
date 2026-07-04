from pathlib import Path

from photonic_bench.config import load_config


def test_load_config_requires_expected_sections(tmp_path: Path) -> None:
    config_path = tmp_path / "matmul.yaml"
    config_path.write_text(
        """
benchmark:
  name: unit matmul
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

    config = load_config(config_path)

    assert config.benchmark.name == "unit matmul"
    assert config.workload.m == 4
    assert config.device.adc.bits == 6
    assert config.device.vector_dac.energy_pj_per_conversion == 0.2
    assert config.device.weight_dac.energy_pj_per_conversion == 0.2
    assert config.execution.batch_size == 1
    assert config.system.sram.read_energy_pj_per_byte == 0.02
    assert config.system.off_chip.bandwidth_bytes_per_ns == 16.0
    assert config.noise.phase_noise_rad_rms == 0.02


def test_load_config_rejects_missing_sections(tmp_path: Path) -> None:
    config_path = tmp_path / "bad.yaml"
    config_path.write_text("benchmark:\n  name: missing pieces\n", encoding="utf-8")

    try:
        load_config(config_path)
    except ValueError as exc:
        message = str(exc)
    else:
        raise AssertionError("load_config should reject incomplete configs")

    assert "workload" in message
    assert "device" in message


def test_load_config_rejects_non_finite_numeric_values(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_nan.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad nan
workload:
  type: matmul
  m: 4
  n: 8
  k: 2
device:
  optical_mac_energy_fj: .nan
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

    try:
        load_config(config_path)
    except ValueError as exc:
        message = str(exc)
    else:
        raise AssertionError("load_config should reject non-finite numeric values")

    assert "device.optical_mac_energy_fj" in message
    assert "numeric and finite" in message


def test_load_config_supports_provenance_and_published_calibration(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "nature.yaml"
    config_path.write_text(
        """
benchmark:
  name: sourced matvec
workload:
  type: matmul
  m: 1
  n: 64
  k: 64
device:
  optical_mac_energy_fj: 0.5
  laser_wall_plug_efficiency: 0.25
  photodetector_energy_fj_per_sample: 10
  adc:
    bits: 8
    energy_pj_per_conversion: 0.5
  dac:
    bits: 8
    energy_pj_per_conversion: 0.2
timing:
  optical_latency_ns: 3
  adc_latency_ns: 1
  dac_latency_ns: 1
noise:
  phase_noise_rad_rms: 0.02
  drift_rad_per_second: 0.1
  integration_time_ns: 5
provenance:
  source_title: An integrated large-scale photonic accelerator with ultralow latency
  source_url: https://www.nature.com/articles/s41586-025-08786-6
  doi: 10.1038/s41586-025-08786-6
  venue: Nature 640, 361-367 (2025)
  claim_status: paper-reported
published_calibration:
  architecture: PACE 64x64 matrix-vector oMAC
  reported_tops: 8.19
  energy_efficiency_excluding_lasers_tops_per_watt: 4.21
  energy_efficiency_including_lasers_tops_per_watt: 2.38
  reported_latency_ns: 5
  reported_future_latency_ns: 3
  reported_enob: 7.61
  reported_component_count_min: 16000
  a10_latency_ns_min: 2300
  pace_total_time_us: 2.7
  gpu_total_time_us: 798.1
""".strip(),
        encoding="utf-8",
    )

    config = load_config(config_path)

    assert config.provenance is not None
    assert (
        config.provenance.source_title
        == "An integrated large-scale photonic accelerator with ultralow latency"
    )
    assert config.provenance.doi == "10.1038/s41586-025-08786-6"
    assert config.published_calibration is not None
    assert config.published_calibration.architecture == "PACE 64x64 matrix-vector oMAC"
    assert (
        config.published_calibration.energy_efficiency_including_lasers_tops_per_watt
        == 2.38
    )


def test_load_config_supports_execution_and_separate_dacs(tmp_path: Path) -> None:
    config_path = tmp_path / "realistic.yaml"
    config_path.write_text(
        """
benchmark:
  name: realistic matmul
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
  vector_dac:
    bits: 6
    energy_pj_per_conversion: 0.1
  weight_dac:
    bits: 8
    energy_pj_per_conversion: 0.5
execution:
  batch_size: 8
  vector_reuse_factor: 2
  weight_reuse_factor: 1
  weight_stationary: true
  pipeline:
    stages: 3
    cycle_time_ns: 2
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

    config = load_config(config_path)

    assert config.device.vector_dac.bits == 6
    assert config.device.vector_dac.energy_pj_per_conversion == 0.1
    assert config.device.weight_dac.bits == 8
    assert config.device.weight_dac.energy_pj_per_conversion == 0.5
    assert config.execution.batch_size == 8
    assert config.execution.vector_reuse_factor == 2
    assert config.execution.weight_reuse_factor == 1
    assert config.execution.weight_stationary is True
    assert config.execution.pipeline.stages == 3
    assert config.execution.pipeline.cycle_time_ns == 2


def test_load_config_supports_system_memory_tiers(tmp_path: Path) -> None:
    config_path = tmp_path / "system.yaml"
    config_path.write_text(
        """
benchmark:
  name: system matmul
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
system:
  sram:
    read_energy_pj_per_byte: 0.03
    write_energy_pj_per_byte: 0.04
    bandwidth_bytes_per_ns: 512
  off_chip:
    read_energy_pj_per_byte: 12
    write_energy_pj_per_byte: 16
    bandwidth_bytes_per_ns: 8
    read_fraction: 0.25
    write_fraction: 0.5
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

    config = load_config(config_path)

    assert config.system.sram.read_energy_pj_per_byte == 0.03
    assert config.system.sram.write_energy_pj_per_byte == 0.04
    assert config.system.sram.bandwidth_bytes_per_ns == 512
    assert config.system.sram.read_fraction == 1.0
    assert config.system.off_chip.read_energy_pj_per_byte == 12
    assert config.system.off_chip.write_energy_pj_per_byte == 16
    assert config.system.off_chip.bandwidth_bytes_per_ns == 8
    assert config.system.off_chip.read_fraction == 0.25
    assert config.system.off_chip.write_fraction == 0.5


def test_load_config_rejects_invalid_system_fraction(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_system.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad system matmul
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
system:
  off_chip:
    read_fraction: 1.5
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

    try:
        load_config(config_path)
    except ValueError as exc:
        message = str(exc)
    else:
        raise AssertionError("load_config should reject invalid system fractions")

    assert "system.off_chip.read_fraction" in message
    assert "between 0 and 1" in message
