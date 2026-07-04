from __future__ import annotations

from dataclasses import dataclass, replace
import math

from photonic_bench.config import (
    BenchmarkConfig,
    MemoryTierConfig,
    SystemContentionConfig,
)


SUPPORTED_CALIBRATION_TARGETS = (
    "published-including-lasers",
    "published-excluding-lasers",
)
SUPPORTED_CALIBRATION_FIT_PARAMETERS = (
    "device.optical_mac_energy_fj",
    "device.laser_wall_plug_efficiency",
    "device.photodetector_energy_fj_per_sample",
    "device.adc.energy_pj_per_conversion",
    "device.dac.energy_pj_per_conversion",
    "device.vector_dac.energy_pj_per_conversion",
    "device.weight_dac.energy_pj_per_conversion",
)
_LINEAR_FIT_PARAMETER_UNITS = {
    "device.optical_mac_energy_fj": "fJ/MAC",
    "device.photodetector_energy_fj_per_sample": "fJ/sample",
    "device.adc.energy_pj_per_conversion": "pJ/conversion",
    "device.dac.energy_pj_per_conversion": "pJ/conversion",
    "device.vector_dac.energy_pj_per_conversion": "pJ/conversion",
    "device.weight_dac.energy_pj_per_conversion": "pJ/conversion",
}


@dataclass(frozen=True)
class EnergyResult:
    optical_compute_pj: float
    laser_electrical_pj: float
    detector_pj: float
    adc_pj: float
    vector_dac_pj: float
    weight_dac_pj: float
    dac_pj: float
    total_pj: float
    energy_per_mac_pj: float
    energy_per_op_pj: float
    peripheral_share: float


@dataclass(frozen=True)
class TimingResult:
    optical_latency_ns: float
    adc_latency_ns: float
    dac_latency_ns: float
    total_latency_ns: float
    pipeline_stages: int
    pipeline_cycle_time_ns: float
    batch_latency_ns: float
    steady_state_operations_per_second: float
    steady_state_equivalent_ops_per_second: float


@dataclass(frozen=True)
class NoiseResult:
    quantization_snr_db: float
    quantization_rms: float
    phase_noise_rad_rms: float
    drift_rms_rad: float
    estimated_relative_error_rms: float


@dataclass(frozen=True)
class MemoryTrafficResult:
    vector_operand_read_bytes: int
    weight_operand_read_bytes: int
    output_write_bytes: int
    total_interface_bytes: int
    macs_per_byte: float
    equivalent_ops_per_byte: float


@dataclass(frozen=True)
class SystemTierResult:
    name: str
    read_bytes: float
    write_bytes: float
    total_bytes: float
    read_energy_pj: float
    write_energy_pj: float
    total_energy_pj: float
    bandwidth_bytes_per_ns: float
    effective_bandwidth_bytes_per_ns: float
    transfer_time_ns: float
    contention_adjusted_transfer_time_ns: float
    read_fraction: float
    write_fraction: float


@dataclass(frozen=True)
class SystemModelResult:
    sram: SystemTierResult
    intermediate: SystemTierResult
    off_chip: SystemTierResult
    memory_timing_mode: str
    local_compute_and_conversion_energy_pj: float
    total_movement_energy_pj: float
    total_system_energy_pj: float
    system_energy_per_mac_pj: float
    system_energy_per_op_pj: float
    movement_energy_share: float
    max_transfer_time_ns: float
    serial_transfer_time_ns: float
    effective_transfer_time_ns: float
    shared_bandwidth_clients: float
    bandwidth_arbitration_efficiency: float
    calibration_overhead_fraction: float
    contention_adjusted_max_transfer_time_ns: float
    contention_adjusted_serial_transfer_time_ns: float
    contention_adjusted_effective_transfer_time_ns: float
    calibration_adjusted_effective_transfer_time_ns: float
    bandwidth_limited_batch_latency_ns: float
    bandwidth_limited_equivalent_ops_per_second: float
    bandwidth_limited_tier: str
    contention_adjusted_batch_latency_ns: float
    contention_adjusted_equivalent_ops_per_second: float
    contention_limited_tier: str


@dataclass(frozen=True)
class PublishedCalibrationResult:
    energy_per_op_excluding_lasers_pj: float | None
    energy_per_op_including_lasers_pj: float | None
    energy_per_mac_excluding_lasers_pj: float | None
    energy_per_mac_including_lasers_pj: float | None
    total_energy_excluding_lasers_pj: float | None
    total_energy_including_lasers_pj: float | None
    model_to_published_including_lasers_ratio: float | None


@dataclass(frozen=True)
class CalibrationFitRequest:
    target: str
    parameter: str


@dataclass(frozen=True)
class CalibrationFitResult:
    target: str
    target_source: str
    target_total_energy_pj: float
    fitted_parameter: str
    fitted_parameter_unit: str
    original_value: float
    fitted_value: float
    pre_fit_total_energy_pj: float
    post_fit_total_energy_pj: float
    absolute_error_pj: float
    relative_error: float
    objective: str
    assumptions: tuple[str, ...]


@dataclass(frozen=True)
class BenchmarkResult:
    config: BenchmarkConfig
    operation_macs: int
    macs: int
    operation_equivalent_ops: int
    equivalent_ops: int
    operations_per_batch: int
    output_elements_per_operation: int
    output_elements: int
    adc_conversions: int
    vector_dac_conversions: int
    weight_dac_conversions: int
    dac_conversions: int
    energy: EnergyResult
    timing: TimingResult
    noise: NoiseResult
    memory_traffic: MemoryTrafficResult
    system: SystemModelResult
    published_calibration: PublishedCalibrationResult | None = None
    calibration_fit: CalibrationFitResult | None = None


def evaluate(
    config: BenchmarkConfig,
    calibration_fit: CalibrationFitRequest | None = None,
) -> BenchmarkResult:
    result = _evaluate_core(config)
    if calibration_fit is None:
        return result

    return replace(
        result,
        calibration_fit=_fit_calibration(result, calibration_fit),
    )


def _evaluate_core(config: BenchmarkConfig) -> BenchmarkResult:
    workload = config.workload
    device = config.device
    execution = config.execution

    operation_macs = workload.m * workload.n * workload.k
    operation_equivalent_ops = 2 * operation_macs
    operations_per_batch = execution.batch_size
    macs = operation_macs * operations_per_batch
    equivalent_ops = operation_equivalent_ops * operations_per_batch
    output_elements_per_operation = workload.m * workload.n
    output_elements = output_elements_per_operation * operations_per_batch
    adc_conversions = output_elements
    vector_dac_conversions = (
        workload.m
        * workload.k
        * math.ceil(operations_per_batch / execution.vector_reuse_factor)
    )
    weight_reuse_factor = (
        operations_per_batch if execution.weight_stationary else execution.weight_reuse_factor
    )
    weight_dac_conversions = (
        workload.k
        * workload.n
        * math.ceil(operations_per_batch / weight_reuse_factor)
    )
    dac_conversions = vector_dac_conversions + weight_dac_conversions
    memory_traffic = _memory_traffic(
        config,
        macs=macs,
        equivalent_ops=equivalent_ops,
        output_elements=output_elements,
        vector_dac_conversions=vector_dac_conversions,
        weight_dac_conversions=weight_dac_conversions,
    )

    optical_compute_pj = macs * device.optical_mac_energy_fj / 1000.0
    laser_electrical_pj = optical_compute_pj / device.laser_wall_plug_efficiency
    detector_pj = output_elements * device.photodetector_energy_fj_per_sample / 1000.0
    adc_pj = adc_conversions * device.adc.energy_pj_per_conversion
    vector_dac_pj = (
        vector_dac_conversions * device.vector_dac.energy_pj_per_conversion
    )
    weight_dac_pj = (
        weight_dac_conversions * device.weight_dac.energy_pj_per_conversion
    )
    dac_pj = vector_dac_pj + weight_dac_pj
    total_pj = laser_electrical_pj + detector_pj + adc_pj + dac_pj
    peripheral_pj = detector_pj + adc_pj + dac_pj
    single_operation_latency_ns = (
        config.timing.optical_latency_ns
        + config.timing.adc_latency_ns
        + config.timing.dac_latency_ns
    )
    pipeline_cycle_time_ns = (
        execution.pipeline.cycle_time_ns
        if execution.pipeline.cycle_time_ns is not None
        else single_operation_latency_ns
    )
    batch_latency_ns = single_operation_latency_ns + (
        max(0, operations_per_batch - 1) * pipeline_cycle_time_ns
    )
    steady_state_operations_per_second = (
        1e9 / pipeline_cycle_time_ns if pipeline_cycle_time_ns else 0.0
    )

    timing = TimingResult(
        optical_latency_ns=config.timing.optical_latency_ns,
        adc_latency_ns=config.timing.adc_latency_ns,
        dac_latency_ns=config.timing.dac_latency_ns,
        total_latency_ns=single_operation_latency_ns,
        pipeline_stages=execution.pipeline.stages,
        pipeline_cycle_time_ns=pipeline_cycle_time_ns,
        batch_latency_ns=batch_latency_ns,
        steady_state_operations_per_second=steady_state_operations_per_second,
        steady_state_equivalent_ops_per_second=(
            steady_state_operations_per_second * operation_equivalent_ops
        ),
    )
    energy = EnergyResult(
        optical_compute_pj=optical_compute_pj,
        laser_electrical_pj=laser_electrical_pj,
        detector_pj=detector_pj,
        adc_pj=adc_pj,
        vector_dac_pj=vector_dac_pj,
        weight_dac_pj=weight_dac_pj,
        dac_pj=dac_pj,
        total_pj=total_pj,
        energy_per_mac_pj=total_pj / macs,
        energy_per_op_pj=total_pj / equivalent_ops,
        peripheral_share=peripheral_pj / total_pj if total_pj else 0.0,
    )
    system = _system_model(
        config,
        memory_traffic=memory_traffic,
        energy=energy,
        timing=timing,
        macs=macs,
        equivalent_ops=equivalent_ops,
    )

    quantization_snr_db = 6.02 * device.adc.bits + 1.76
    quantization_rms = 1 / (math.sqrt(12) * ((2**device.adc.bits) - 1))
    drift_rms_rad = (
        config.noise.drift_rad_per_second * config.noise.integration_time_ns * 1e-9
    )
    estimated_relative_error_rms = math.sqrt(
        quantization_rms**2
        + config.noise.phase_noise_rad_rms**2
        + drift_rms_rad**2
    )

    published_calibration = _evaluate_published_calibration(config, equivalent_ops, total_pj)

    return BenchmarkResult(
        config=config,
        operation_macs=operation_macs,
        macs=macs,
        operation_equivalent_ops=operation_equivalent_ops,
        equivalent_ops=equivalent_ops,
        operations_per_batch=operations_per_batch,
        output_elements_per_operation=output_elements_per_operation,
        output_elements=output_elements,
        adc_conversions=adc_conversions,
        vector_dac_conversions=vector_dac_conversions,
        weight_dac_conversions=weight_dac_conversions,
        dac_conversions=dac_conversions,
        energy=energy,
        timing=timing,
        noise=NoiseResult(
            quantization_snr_db=quantization_snr_db,
            quantization_rms=quantization_rms,
            phase_noise_rad_rms=config.noise.phase_noise_rad_rms,
            drift_rms_rad=drift_rms_rad,
            estimated_relative_error_rms=estimated_relative_error_rms,
        ),
        memory_traffic=memory_traffic,
        system=system,
        published_calibration=published_calibration,
    )


def _memory_traffic(
    config: BenchmarkConfig,
    *,
    macs: int,
    equivalent_ops: int,
    output_elements: int,
    vector_dac_conversions: int,
    weight_dac_conversions: int,
) -> MemoryTrafficResult:
    vector_operand_read_bytes = (
        vector_dac_conversions * _bytes_per_scalar(config.device.vector_dac.bits)
    )
    weight_operand_read_bytes = (
        weight_dac_conversions * _bytes_per_scalar(config.device.weight_dac.bits)
    )
    output_write_bytes = output_elements * _bytes_per_scalar(config.device.adc.bits)
    total_interface_bytes = (
        vector_operand_read_bytes + weight_operand_read_bytes + output_write_bytes
    )
    return MemoryTrafficResult(
        vector_operand_read_bytes=vector_operand_read_bytes,
        weight_operand_read_bytes=weight_operand_read_bytes,
        output_write_bytes=output_write_bytes,
        total_interface_bytes=total_interface_bytes,
        macs_per_byte=macs / total_interface_bytes if total_interface_bytes else 0.0,
        equivalent_ops_per_byte=(
            equivalent_ops / total_interface_bytes if total_interface_bytes else 0.0
        ),
    )


def _bytes_per_scalar(bits: int) -> int:
    return math.ceil(bits / 8)


def _system_model(
    config: BenchmarkConfig,
    *,
    memory_traffic: MemoryTrafficResult,
    energy: EnergyResult,
    timing: TimingResult,
    macs: int,
    equivalent_ops: int,
) -> SystemModelResult:
    operand_read_bytes = (
        memory_traffic.vector_operand_read_bytes
        + memory_traffic.weight_operand_read_bytes
    )
    output_write_bytes = memory_traffic.output_write_bytes
    sram = _system_tier(
        "sram",
        config.system.sram,
        contention=config.system.contention,
        operand_read_bytes=operand_read_bytes,
        output_write_bytes=output_write_bytes,
    )
    intermediate = _system_tier(
        "intermediate",
        config.system.intermediate,
        contention=config.system.contention,
        operand_read_bytes=operand_read_bytes,
        output_write_bytes=output_write_bytes,
    )
    off_chip = _system_tier(
        "off_chip",
        config.system.off_chip,
        contention=config.system.contention,
        operand_read_bytes=operand_read_bytes,
        output_write_bytes=output_write_bytes,
    )
    tiers = (sram, intermediate, off_chip)
    total_movement_energy_pj = sum(tier.total_energy_pj for tier in tiers)
    total_system_energy_pj = energy.total_pj + total_movement_energy_pj
    max_transfer_time_ns = max(tier.transfer_time_ns for tier in tiers)
    serial_transfer_time_ns = sum(tier.transfer_time_ns for tier in tiers)
    effective_transfer_time_ns = (
        serial_transfer_time_ns
        if config.system.memory_timing_mode == "serialized"
        else max_transfer_time_ns
    )
    contention_adjusted_max_transfer_time_ns = max(
        tier.contention_adjusted_transfer_time_ns for tier in tiers
    )
    contention_adjusted_serial_transfer_time_ns = sum(
        tier.contention_adjusted_transfer_time_ns for tier in tiers
    )
    contention_adjusted_effective_transfer_time_ns = (
        contention_adjusted_serial_transfer_time_ns
        if config.system.memory_timing_mode == "serialized"
        else contention_adjusted_max_transfer_time_ns
    )
    calibration_adjusted_effective_transfer_time_ns = (
        contention_adjusted_effective_transfer_time_ns
        * (1.0 + config.system.contention.calibration_overhead_fraction)
    )
    bandwidth_limited_batch_latency_ns = max(
        timing.batch_latency_ns,
        effective_transfer_time_ns,
    )
    contention_adjusted_batch_latency_ns = max(
        timing.batch_latency_ns,
        calibration_adjusted_effective_transfer_time_ns,
    )
    slowest_tier = max(tiers, key=lambda tier: tier.transfer_time_ns)
    contention_slowest_tier = max(
        tiers,
        key=lambda tier: tier.contention_adjusted_transfer_time_ns,
    )
    if timing.batch_latency_ns >= effective_transfer_time_ns:
        bandwidth_limited_tier = "compute"
    elif config.system.memory_timing_mode == "serialized":
        bandwidth_limited_tier = "serialized_tier_path"
    else:
        bandwidth_limited_tier = slowest_tier.name

    if timing.batch_latency_ns >= calibration_adjusted_effective_transfer_time_ns:
        contention_limited_tier = "compute"
    elif config.system.memory_timing_mode == "serialized":
        contention_limited_tier = "serialized_tier_path"
    else:
        contention_limited_tier = contention_slowest_tier.name
    return SystemModelResult(
        sram=sram,
        intermediate=intermediate,
        off_chip=off_chip,
        memory_timing_mode=config.system.memory_timing_mode,
        local_compute_and_conversion_energy_pj=energy.total_pj,
        total_movement_energy_pj=total_movement_energy_pj,
        total_system_energy_pj=total_system_energy_pj,
        system_energy_per_mac_pj=total_system_energy_pj / macs,
        system_energy_per_op_pj=total_system_energy_pj / equivalent_ops,
        movement_energy_share=(
            total_movement_energy_pj / total_system_energy_pj
            if total_system_energy_pj
            else 0.0
        ),
        max_transfer_time_ns=max_transfer_time_ns,
        serial_transfer_time_ns=serial_transfer_time_ns,
        effective_transfer_time_ns=effective_transfer_time_ns,
        shared_bandwidth_clients=config.system.contention.shared_bandwidth_clients,
        bandwidth_arbitration_efficiency=(
            config.system.contention.arbitration_efficiency
        ),
        calibration_overhead_fraction=(
            config.system.contention.calibration_overhead_fraction
        ),
        contention_adjusted_max_transfer_time_ns=(
            contention_adjusted_max_transfer_time_ns
        ),
        contention_adjusted_serial_transfer_time_ns=(
            contention_adjusted_serial_transfer_time_ns
        ),
        contention_adjusted_effective_transfer_time_ns=(
            contention_adjusted_effective_transfer_time_ns
        ),
        calibration_adjusted_effective_transfer_time_ns=(
            calibration_adjusted_effective_transfer_time_ns
        ),
        bandwidth_limited_batch_latency_ns=bandwidth_limited_batch_latency_ns,
        bandwidth_limited_equivalent_ops_per_second=(
            equivalent_ops / (bandwidth_limited_batch_latency_ns * 1e-9)
            if bandwidth_limited_batch_latency_ns
            else 0.0
        ),
        bandwidth_limited_tier=bandwidth_limited_tier,
        contention_adjusted_batch_latency_ns=contention_adjusted_batch_latency_ns,
        contention_adjusted_equivalent_ops_per_second=(
            equivalent_ops / (contention_adjusted_batch_latency_ns * 1e-9)
            if contention_adjusted_batch_latency_ns
            else 0.0
        ),
        contention_limited_tier=contention_limited_tier,
    )


def _system_tier(
    name: str,
    tier: MemoryTierConfig,
    *,
    contention: SystemContentionConfig,
    operand_read_bytes: int,
    output_write_bytes: int,
) -> SystemTierResult:
    read_bytes = operand_read_bytes * tier.read_fraction
    write_bytes = output_write_bytes * tier.write_fraction
    total_bytes = read_bytes + write_bytes
    read_energy_pj = read_bytes * tier.read_energy_pj_per_byte
    write_energy_pj = write_bytes * tier.write_energy_pj_per_byte
    total_energy_pj = read_energy_pj + write_energy_pj
    effective_bandwidth_bytes_per_ns = (
        tier.bandwidth_bytes_per_ns
        * contention.arbitration_efficiency
        / contention.shared_bandwidth_clients
    )
    return SystemTierResult(
        name=name,
        read_bytes=read_bytes,
        write_bytes=write_bytes,
        total_bytes=total_bytes,
        read_energy_pj=read_energy_pj,
        write_energy_pj=write_energy_pj,
        total_energy_pj=total_energy_pj,
        bandwidth_bytes_per_ns=tier.bandwidth_bytes_per_ns,
        effective_bandwidth_bytes_per_ns=effective_bandwidth_bytes_per_ns,
        transfer_time_ns=total_bytes / tier.bandwidth_bytes_per_ns,
        contention_adjusted_transfer_time_ns=(
            total_bytes / effective_bandwidth_bytes_per_ns
        ),
        read_fraction=tier.read_fraction,
        write_fraction=tier.write_fraction,
    )


def _evaluate_published_calibration(
    config: BenchmarkConfig, equivalent_ops: int, model_total_pj: float
) -> PublishedCalibrationResult | None:
    calibration = config.published_calibration
    if calibration is None:
        return None

    energy_per_op_excluding_lasers_pj = _energy_per_op_pj(
        calibration.energy_efficiency_excluding_lasers_tops_per_watt
    )
    energy_per_op_including_lasers_pj = _energy_per_op_pj(
        calibration.energy_efficiency_including_lasers_tops_per_watt
    )
    energy_per_mac_excluding_lasers_pj = _twice_or_none(
        energy_per_op_excluding_lasers_pj
    )
    energy_per_mac_including_lasers_pj = _twice_or_none(
        energy_per_op_including_lasers_pj
    )
    total_energy_excluding_lasers_pj = _scale_or_none(
        equivalent_ops,
        energy_per_op_excluding_lasers_pj,
    )
    total_energy_including_lasers_pj = _scale_or_none(
        equivalent_ops,
        energy_per_op_including_lasers_pj,
    )

    return PublishedCalibrationResult(
        energy_per_op_excluding_lasers_pj=energy_per_op_excluding_lasers_pj,
        energy_per_op_including_lasers_pj=energy_per_op_including_lasers_pj,
        energy_per_mac_excluding_lasers_pj=energy_per_mac_excluding_lasers_pj,
        energy_per_mac_including_lasers_pj=energy_per_mac_including_lasers_pj,
        total_energy_excluding_lasers_pj=total_energy_excluding_lasers_pj,
        total_energy_including_lasers_pj=total_energy_including_lasers_pj,
        model_to_published_including_lasers_ratio=(
            model_total_pj / total_energy_including_lasers_pj
            if total_energy_including_lasers_pj
            else None
        ),
    )


def _energy_per_op_pj(tops_per_watt: float | None) -> float | None:
    if tops_per_watt is None:
        return None
    return 1 / tops_per_watt


def _twice_or_none(value: float | None) -> float | None:
    if value is None:
        return None
    return 2 * value


def _scale_or_none(scale: int, value: float | None) -> float | None:
    if value is None:
        return None
    return scale * value


def _fit_calibration(
    result: BenchmarkResult,
    request: CalibrationFitRequest,
) -> CalibrationFitResult:
    _validate_calibration_request(request)
    target_total_pj, target_source = _calibration_target(result, request.target)
    original_value = _parameter_value(result.config, request.parameter)

    if request.parameter == "device.laser_wall_plug_efficiency":
        fitted_value = _fit_laser_wall_plug_efficiency(result, target_total_pj)
        parameter_unit = "fraction"
    else:
        fitted_value = _fit_linear_energy_parameter(
            result.config,
            request.parameter,
            target_total_pj,
        )
        parameter_unit = _LINEAR_FIT_PARAMETER_UNITS[request.parameter]

    post_fit_result = _evaluate_core(
        _config_with_parameter(result.config, request.parameter, fitted_value)
    )
    absolute_error_pj = abs(post_fit_result.energy.total_pj - target_total_pj)

    return CalibrationFitResult(
        target=request.target,
        target_source=target_source,
        target_total_energy_pj=target_total_pj,
        fitted_parameter=request.parameter,
        fitted_parameter_unit=parameter_unit,
        original_value=original_value,
        fitted_value=fitted_value,
        pre_fit_total_energy_pj=result.energy.total_pj,
        post_fit_total_energy_pj=post_fit_result.energy.total_pj,
        absolute_error_pj=absolute_error_pj,
        relative_error=absolute_error_pj / target_total_pj,
        objective=(
            "Solve one scalar component-model parameter so local_model.energy."
            "total_pj matches the selected published total-energy target."
        ),
        assumptions=(
            "Only the selected scalar parameter is changed.",
            "All other component-model inputs remain fixed.",
            "The fit is a calibration aid, not an independent reproduction of the paper.",
        ),
    )


def _validate_calibration_request(request: CalibrationFitRequest) -> None:
    if request.target not in SUPPORTED_CALIBRATION_TARGETS:
        choices = ", ".join(SUPPORTED_CALIBRATION_TARGETS)
        raise ValueError(f"unsupported calibration target {request.target!r}; use {choices}")

    if request.parameter not in SUPPORTED_CALIBRATION_FIT_PARAMETERS:
        choices = ", ".join(SUPPORTED_CALIBRATION_FIT_PARAMETERS)
        raise ValueError(
            f"unsupported calibration fit parameter {request.parameter!r}; use {choices}"
        )


def _calibration_target(
    result: BenchmarkResult,
    target: str,
) -> tuple[float, str]:
    published = result.published_calibration
    if published is None:
        raise ValueError(
            "calibration fitting to a published target requires "
            "published_calibration in the config"
        )

    if target == "published-including-lasers":
        if published.total_energy_including_lasers_pj is None:
            raise ValueError(
                "published-including-lasers calibration fitting requires "
                "energy_efficiency_including_lasers_tops_per_watt"
            )
        return (
            published.total_energy_including_lasers_pj,
            "published_reference.derived_unit_conversions."
            "total_energy_including_lasers_pj",
        )
    if target == "published-excluding-lasers":
        if published.total_energy_excluding_lasers_pj is None:
            raise ValueError(
                "published-excluding-lasers calibration fitting requires "
                "energy_efficiency_excluding_lasers_tops_per_watt"
            )
        return (
            published.total_energy_excluding_lasers_pj,
            "published_reference.derived_unit_conversions."
            "total_energy_excluding_lasers_pj",
        )

    raise ValueError(f"unsupported calibration target {target!r}")


def _fit_linear_energy_parameter(
    config: BenchmarkConfig,
    parameter: str,
    target_total_pj: float,
) -> float:
    zero_config = _config_with_parameter(config, parameter, 0.0)
    unit_config = _config_with_parameter(config, parameter, 1.0)
    zero_total_pj = _evaluate_core(zero_config).energy.total_pj
    unit_total_pj = _evaluate_core(unit_config).energy.total_pj
    coefficient = unit_total_pj - zero_total_pj

    if coefficient <= 0:
        raise ValueError(f"cannot fit {parameter}: parameter does not increase energy")

    fitted_value = (target_total_pj - zero_total_pj) / coefficient
    if fitted_value < 0:
        raise ValueError(
            f"cannot fit {parameter}: target {target_total_pj:.6g} pJ is below "
            f"the fixed energy floor {zero_total_pj:.6g} pJ"
        )

    return fitted_value


def _fit_laser_wall_plug_efficiency(
    result: BenchmarkResult,
    target_total_pj: float,
) -> float:
    fixed_energy_pj = result.energy.total_pj - result.energy.laser_electrical_pj
    optical_compute_pj = result.energy.optical_compute_pj

    if optical_compute_pj <= 0:
        raise ValueError("cannot fit laser wall-plug efficiency without optical energy")
    if target_total_pj <= fixed_energy_pj:
        raise ValueError(
            "cannot fit device.laser_wall_plug_efficiency: target "
            f"{target_total_pj:.6g} pJ is at or below the fixed non-laser "
            f"energy floor {fixed_energy_pj:.6g} pJ"
        )

    fitted_efficiency = optical_compute_pj / (target_total_pj - fixed_energy_pj)
    if not 0 < fitted_efficiency <= 1:
        raise ValueError(
            "cannot fit device.laser_wall_plug_efficiency: solved efficiency "
            f"{fitted_efficiency:.6g} is outside the valid interval (0, 1]"
        )

    return fitted_efficiency


def _parameter_value(config: BenchmarkConfig, parameter: str) -> float:
    if parameter == "device.optical_mac_energy_fj":
        return config.device.optical_mac_energy_fj
    if parameter == "device.laser_wall_plug_efficiency":
        return config.device.laser_wall_plug_efficiency
    if parameter == "device.photodetector_energy_fj_per_sample":
        return config.device.photodetector_energy_fj_per_sample
    if parameter == "device.adc.energy_pj_per_conversion":
        return config.device.adc.energy_pj_per_conversion
    if parameter == "device.dac.energy_pj_per_conversion":
        return config.device.dac.energy_pj_per_conversion
    if parameter == "device.vector_dac.energy_pj_per_conversion":
        return config.device.vector_dac.energy_pj_per_conversion
    if parameter == "device.weight_dac.energy_pj_per_conversion":
        return config.device.weight_dac.energy_pj_per_conversion

    raise ValueError(f"unsupported calibration fit parameter {parameter!r}")


def _config_with_parameter(
    config: BenchmarkConfig,
    parameter: str,
    value: float,
) -> BenchmarkConfig:
    if parameter != "device.laser_wall_plug_efficiency" and value < 0:
        raise ValueError(f"{parameter} must be non-negative")
    if parameter == "device.laser_wall_plug_efficiency" and not 0 < value <= 1:
        raise ValueError("device.laser_wall_plug_efficiency must be in (0, 1]")

    if parameter == "device.optical_mac_energy_fj":
        return config.with_updates(
            device=replace(config.device, optical_mac_energy_fj=value)
        )
    if parameter == "device.laser_wall_plug_efficiency":
        return config.with_updates(
            device=replace(config.device, laser_wall_plug_efficiency=value)
        )
    if parameter == "device.photodetector_energy_fj_per_sample":
        return config.with_updates(
            device=replace(config.device, photodetector_energy_fj_per_sample=value)
        )
    if parameter == "device.adc.energy_pj_per_conversion":
        return config.with_updates(
            device=replace(
                config.device,
                adc=replace(config.device.adc, energy_pj_per_conversion=value),
            )
        )
    if parameter == "device.dac.energy_pj_per_conversion":
        dac = replace(config.device.dac, energy_pj_per_conversion=value)
        return config.with_updates(
            device=replace(
                config.device,
                dac=dac,
                vector_dac=dac,
                weight_dac=dac,
            )
        )
    if parameter == "device.vector_dac.energy_pj_per_conversion":
        return config.with_updates(
            device=replace(
                config.device,
                vector_dac=replace(
                    config.device.vector_dac,
                    energy_pj_per_conversion=value,
                ),
            )
        )
    if parameter == "device.weight_dac.energy_pj_per_conversion":
        return config.with_updates(
            device=replace(
                config.device,
                weight_dac=replace(
                    config.device.weight_dac,
                    energy_pj_per_conversion=value,
                ),
            )
        )

    raise ValueError(f"unsupported calibration fit parameter {parameter!r}")
