from pathlib import Path

from photonic_bench.config import (
    SYSTEM_CONTENTION_PRESETS,
    SYSTEM_CONTENTION_PROVENANCE_PACKS,
    SYSTEM_PROFILES,
    SYSTEM_SCENARIO_PROVENANCE_PACKS,
    load_config,
    system_memory_scenario_to_dict,
)


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
    assert config.system.intermediate.read_energy_pj_per_byte == 0.2
    assert config.system.off_chip.bandwidth_bytes_per_ns == 16.0
    assert config.system.memory_timing_mode == "overlapped"
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


def test_load_config_supports_source_quality(tmp_path: Path) -> None:
    config_path = tmp_path / "quality.yaml"
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
source_quality:
  reported_metrics:
    - throughput
    - energy_efficiency
  local_surrogate_type: direct_matrix_vector
  coverage:
    throughput: reported
    energy: reported
    accuracy: not_applicable
    area: not_reported
    precision: reported
  confidence_grade: A
  notes:
    - Direct source-backed calibration.
source_audit:
  quoted_metrics:
    - metric: Reported throughput
      quoted_value: "8.19 TOPS"
      source_location: Paper Table 1
      note: Direct source quote.
  local_assumptions:
    - Local model uses generic converter assumptions.
  conversion_math:
    - derived_metric: energy_per_op_pj
      formula: 1 / TOPS_per_W
      inputs:
        tops_per_watt: 2.38
      result: "0.420"
      note: Direct unit conversion.
  confidence_flags:
    - exact_shape_match
""".strip(),
        encoding="utf-8",
    )

    config = load_config(config_path)

    assert config.source_quality is not None
    assert config.source_quality.reported_metrics == (
        "throughput",
        "energy_efficiency",
    )
    assert config.source_quality.coverage["precision"] == "reported"
    assert config.source_quality.confidence_grade == "A"
    assert config.source_audit is not None
    assert config.source_audit.quoted_metrics[0].metric == "Reported throughput"
    assert config.source_audit.quoted_metrics[0].quoted_value == "8.19 TOPS"
    assert config.source_audit.conversion_math[0].inputs["tops_per_watt"] == 2.38
    assert config.source_audit.confidence_flags == ("exact_shape_match",)


def test_load_config_rejects_invalid_source_quality_grade(tmp_path: Path) -> None:
    config_path = tmp_path / "quality_bad.yaml"
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
source_quality:
  reported_metrics:
    - throughput
  local_surrogate_type: direct_matrix_vector
  coverage:
    throughput: reported
    energy: reported
    accuracy: not_applicable
    area: not_reported
    precision: reported
  confidence_grade: Z
""".strip(),
        encoding="utf-8",
    )

    try:
        load_config(config_path)
    except ValueError as exc:
        message = str(exc)
    else:
        raise AssertionError("load_config should reject invalid source quality grade")

    assert "source_quality.confidence_grade" in message


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
    assert config.system.profile == "default"
    assert config.system.profile_overrides == ()


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
  memory_timing_mode: serialized
  sram:
    read_energy_pj_per_byte: 0.03
    write_energy_pj_per_byte: 0.04
    bandwidth_bytes_per_ns: 512
  intermediate:
    read_energy_pj_per_byte: 0.25
    write_energy_pj_per_byte: 0.35
    bandwidth_bytes_per_ns: 128
    read_fraction: 0.75
  off_chip:
    read_energy_pj_per_byte: 12
    write_energy_pj_per_byte: 16
    bandwidth_bytes_per_ns: 8
    read_fraction: 0.25
    write_fraction: 0.5
  contention:
    shared_bandwidth_clients: 3
    arbitration_efficiency: 0.8
    calibration_overhead_fraction: 0.1
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

    assert config.system.profile == "manual"
    assert config.system.profile_overrides == (
        "memory_timing_mode",
        "sram",
        "intermediate",
        "off_chip",
        "contention",
    )
    assert config.system.memory_timing_mode == "serialized"
    assert config.system.contention.preset == "single_client"
    assert config.system.contention.shared_bandwidth_clients == 3
    assert config.system.contention.arbitration_efficiency == 0.8
    assert config.system.contention.calibration_overhead_fraction == 0.1
    assert config.system.contention.overlap_model == "profile_timing_mode"
    scenario = system_memory_scenario_to_dict(config.system)
    assert "Custom overrides applied to single_client" in (
        scenario["contention_preset_description"]
    )
    assert "Numeric contention assumptions" in (
        scenario["contention_preset_description"]
    )
    assert config.system.sram.read_energy_pj_per_byte == 0.03
    assert config.system.sram.write_energy_pj_per_byte == 0.04
    assert config.system.sram.bandwidth_bytes_per_ns == 512
    assert config.system.sram.read_fraction == 1.0
    assert config.system.intermediate.read_energy_pj_per_byte == 0.25
    assert config.system.intermediate.write_energy_pj_per_byte == 0.35
    assert config.system.intermediate.bandwidth_bytes_per_ns == 128
    assert config.system.intermediate.read_fraction == 0.75
    assert config.system.intermediate.write_fraction == 1.0
    assert config.system.off_chip.read_energy_pj_per_byte == 12
    assert config.system.off_chip.write_energy_pj_per_byte == 16
    assert config.system.off_chip.bandwidth_bytes_per_ns == 8
    assert config.system.off_chip.read_fraction == 0.25
    assert config.system.off_chip.write_fraction == 0.5


def test_load_config_supports_named_system_profile_with_tier_override(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "profiled_system.yaml"
    config_path.write_text(
        """
benchmark:
  name: profiled system matmul
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
  profile: hbm
  off_chip:
    bandwidth_bytes_per_ns: 256
    read_fraction: 0.5
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

    assert config.system.profile == "hbm"
    assert config.system.profile_overrides == ("off_chip",)
    assert config.system.contention.preset == "shared_hbm_stack"
    assert config.system.contention.shared_bandwidth_clients == 2.0
    assert config.system.contention.arbitration_efficiency == 0.92
    assert config.system.contention.calibration_overhead_fraction == 0.02
    assert config.system.contention.overlap_model == "overlapped_compute_window"
    assert config.system.sram.bandwidth_bytes_per_ns == 1024
    assert config.system.intermediate.bandwidth_bytes_per_ns == 256
    assert config.system.off_chip.read_energy_pj_per_byte == 3.0
    assert config.system.off_chip.write_energy_pj_per_byte == 3.0
    assert config.system.off_chip.bandwidth_bytes_per_ns == 256
    assert config.system.off_chip.read_fraction == 0.5
    assert config.system.off_chip.write_fraction == 1.0


def test_load_config_supports_optical_interconnect_scenario_and_preset_override(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "optical_interconnect.yaml"
    config_path.write_text(
        """
benchmark:
  name: optical interconnect scenario matmul
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
  profile: optical_interconnect
  contention:
    preset: optical_interconnect_broadcast
    shared_bandwidth_clients: 2
    calibration_overhead_fraction: 0.03
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

    assert config.system.profile == "optical_interconnect"
    assert config.system.profile_overrides == ("contention",)
    assert config.system.intermediate.read_fraction == 0.75
    assert config.system.off_chip.read_energy_pj_per_byte == 1.2
    assert config.system.contention.preset == "optical_interconnect_broadcast"
    assert config.system.contention.shared_bandwidth_clients == 2
    assert config.system.contention.arbitration_efficiency == 0.92
    assert config.system.contention.calibration_overhead_fraction == 0.03
    assert config.system.contention.overlap_model == "wavelength_broadcast_overlap"


def test_load_config_rejects_unknown_system_profile(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_profile.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad profile matmul
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
  profile: imaginary_memory
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
        raise AssertionError("load_config should reject unknown system profiles")

    assert "unknown system.profile" in message
    assert "hbm" in message
    assert "pcie_attached" in message


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


def test_load_config_rejects_invalid_contention_clients(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_contention_clients.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad contention clients
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
  contention:
    shared_bandwidth_clients: 0
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
        raise AssertionError("load_config should reject non-positive contention clients")

    assert "system.contention.shared_bandwidth_clients" in message
    assert "must be positive" in message


def test_load_config_rejects_invalid_contention_efficiency(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_contention_efficiency.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad contention efficiency
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
  contention:
    arbitration_efficiency: 1.2
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
        raise AssertionError("load_config should reject invalid contention efficiency")

    assert "system.contention.arbitration_efficiency" in message
    assert "at most 1" in message


def test_load_config_rejects_invalid_calibration_overhead(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_calibration_overhead.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad calibration overhead
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
  contention:
    calibration_overhead_fraction: -0.1
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
        raise AssertionError("load_config should reject negative calibration overhead")

    assert "system.contention.calibration_overhead_fraction" in message
    assert "must be non-negative" in message


def test_load_config_rejects_unknown_contention_preset(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_contention_preset.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad contention preset
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
  contention:
    preset: made_up_fabric
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
        raise AssertionError("load_config should reject unknown contention presets")

    assert "system.contention.preset" in message
    assert "single_client" in message
    assert "optical_interconnect_broadcast" in message


def test_load_config_rejects_unknown_contention_overlap_model(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_contention_overlap.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad contention overlap
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
  contention:
    overlap_model: impossible_overlap
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
        raise AssertionError("load_config should reject unknown overlap models")

    assert "system.contention.overlap_model" in message
    assert "profile_timing_mode" in message
    assert "wavelength_broadcast_overlap" in message


def test_load_config_rejects_invalid_memory_timing_mode(tmp_path: Path) -> None:
    config_path = tmp_path / "bad_system_timing.yaml"
    config_path.write_text(
        """
benchmark:
  name: bad system timing matmul
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
  memory_timing_mode: speculative
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
        raise AssertionError("load_config should reject invalid memory timing mode")

    assert "system.memory_timing_mode" in message
    assert "overlapped" in message
    assert "serialized" in message


def test_named_system_profiles_and_contention_presets_have_provenance_packs() -> None:
    assert set(SYSTEM_SCENARIO_PROVENANCE_PACKS) == set(SYSTEM_PROFILES)
    assert set(SYSTEM_CONTENTION_PROVENANCE_PACKS) == set(SYSTEM_CONTENTION_PRESETS)

    for profile_name, profile in SYSTEM_PROFILES.items():
        scenario = system_memory_scenario_to_dict(profile.to_system_config())

        scenario_pack = scenario["scenario_provenance"]
        assert scenario_pack["status"]
        assert scenario_pack["calibration_scope"]
        assert scenario_pack["local_assumptions"] or scenario_pack["sources"]
        assert scenario_pack["reviewer_note"]

        contention_pack = scenario["contention_provenance"]
        assert contention_pack["status"]
        assert contention_pack["calibration_scope"]
        assert (
            contention_pack["local_assumptions"]
            or contention_pack["sources"]
            or profile_name == "default"
        )
