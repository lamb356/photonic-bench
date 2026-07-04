from __future__ import annotations

import json
from typing import Any

from photonic_bench.config import (
    BenchmarkConfig,
    ProvenanceConfig,
    PublishedCalibrationConfig,
)
from photonic_bench.model import (
    BenchmarkResult,
    CalibrationFitResult,
    PublishedCalibrationResult,
)
from photonic_bench.report import result_assumptions


REPORT_SCHEMA_VERSION = "photonic-bench-report-v1"


def render_json(result: BenchmarkResult) -> str:
    return json.dumps(report_to_dict(result), indent=2, allow_nan=False) + "\n"


def report_to_dict(result: BenchmarkResult) -> dict[str, Any]:
    config = result.config

    return {
        "schema_version": REPORT_SCHEMA_VERSION,
        "benchmark": {
            "name": config.benchmark.name,
            "description": config.benchmark.description,
        },
        "workload": {
            "type": config.workload.type,
            "shape": {
                "m": config.workload.m,
                "k": config.workload.k,
                "n": config.workload.n,
            },
            "macs": result.macs,
            "equivalent_ops": result.equivalent_ops,
            "output_elements": result.output_elements,
        },
        "model_inputs": _model_inputs(config),
        "local_model": _local_model(result),
        "published_reference": _published_reference(config, result),
        "calibration_fit": _calibration_fit(result.calibration_fit),
        "assumptions": list(result_assumptions(result)),
        "provenance": _provenance(config.provenance),
    }


def _model_inputs(config: BenchmarkConfig) -> dict[str, Any]:
    return {
        "device": {
            "optical_mac_energy_fj": config.device.optical_mac_energy_fj,
            "laser_wall_plug_efficiency": config.device.laser_wall_plug_efficiency,
            "photodetector_energy_fj_per_sample": (
                config.device.photodetector_energy_fj_per_sample
            ),
            "adc": {
                "bits": config.device.adc.bits,
                "energy_pj_per_conversion": (
                    config.device.adc.energy_pj_per_conversion
                ),
            },
            "dac": {
                "bits": config.device.dac.bits,
                "energy_pj_per_conversion": (
                    config.device.dac.energy_pj_per_conversion
                ),
            },
            "vector_dac": {
                "bits": config.device.vector_dac.bits,
                "energy_pj_per_conversion": (
                    config.device.vector_dac.energy_pj_per_conversion
                ),
            },
            "weight_dac": {
                "bits": config.device.weight_dac.bits,
                "energy_pj_per_conversion": (
                    config.device.weight_dac.energy_pj_per_conversion
                ),
            },
        },
        "execution": {
            "batch_size": config.execution.batch_size,
            "vector_reuse_factor": config.execution.vector_reuse_factor,
            "weight_reuse_factor": config.execution.weight_reuse_factor,
            "weight_stationary": config.execution.weight_stationary,
            "pipeline": {
                "stages": config.execution.pipeline.stages,
                "cycle_time_ns": config.execution.pipeline.cycle_time_ns,
            },
        },
        "timing": {
            "optical_latency_ns": config.timing.optical_latency_ns,
            "adc_latency_ns": config.timing.adc_latency_ns,
            "dac_latency_ns": config.timing.dac_latency_ns,
        },
        "noise": {
            "phase_noise_rad_rms": config.noise.phase_noise_rad_rms,
            "drift_rad_per_second": config.noise.drift_rad_per_second,
            "integration_time_ns": config.noise.integration_time_ns,
        },
    }


def _local_model(result: BenchmarkResult) -> dict[str, Any]:
    return {
        "conversion_counts": {
            "adc_conversions": result.adc_conversions,
            "vector_dac_conversions": result.vector_dac_conversions,
            "weight_dac_conversions": result.weight_dac_conversions,
            "dac_conversions": result.dac_conversions,
        },
        "memory_traffic": {
            "vector_operand_read_bytes": (
                result.memory_traffic.vector_operand_read_bytes
            ),
            "weight_operand_read_bytes": (
                result.memory_traffic.weight_operand_read_bytes
            ),
            "output_write_bytes": result.memory_traffic.output_write_bytes,
            "total_interface_bytes": result.memory_traffic.total_interface_bytes,
            "macs_per_byte": result.memory_traffic.macs_per_byte,
            "equivalent_ops_per_byte": result.memory_traffic.equivalent_ops_per_byte,
            "note": (
                "Interface traffic is derived from DAC/ADC bit widths and reuse "
                "counts. It is not a full memory hierarchy simulation."
            ),
        },
        "energy": {
            "optical_compute_pj": result.energy.optical_compute_pj,
            "laser_electrical_pj": result.energy.laser_electrical_pj,
            "detector_pj": result.energy.detector_pj,
            "adc_pj": result.energy.adc_pj,
            "vector_dac_pj": result.energy.vector_dac_pj,
            "weight_dac_pj": result.energy.weight_dac_pj,
            "dac_pj": result.energy.dac_pj,
            "total_pj": result.energy.total_pj,
            "energy_per_mac_pj": result.energy.energy_per_mac_pj,
            "energy_per_op_pj": result.energy.energy_per_op_pj,
            "peripheral_share": result.energy.peripheral_share,
        },
        "timing": {
            "optical_latency_ns": result.timing.optical_latency_ns,
            "adc_latency_ns": result.timing.adc_latency_ns,
            "dac_latency_ns": result.timing.dac_latency_ns,
            "total_latency_ns": result.timing.total_latency_ns,
            "pipeline_stages": result.timing.pipeline_stages,
            "pipeline_cycle_time_ns": result.timing.pipeline_cycle_time_ns,
            "batch_latency_ns": result.timing.batch_latency_ns,
            "steady_state_operations_per_second": (
                result.timing.steady_state_operations_per_second
            ),
            "steady_state_equivalent_ops_per_second": (
                result.timing.steady_state_equivalent_ops_per_second
            ),
        },
        "noise": {
            "quantization_snr_db": result.noise.quantization_snr_db,
            "quantization_rms": result.noise.quantization_rms,
            "phase_noise_rad_rms": result.noise.phase_noise_rad_rms,
            "drift_rms_rad": result.noise.drift_rms_rad,
            "estimated_relative_error_rms": (
                result.noise.estimated_relative_error_rms
            ),
        },
    }


def _published_reference(
    config: BenchmarkConfig,
    result: BenchmarkResult,
) -> dict[str, Any] | None:
    calibration = config.published_calibration
    derived = result.published_calibration
    if calibration is None or derived is None:
        return None

    return {
        "source_type": "published_calibration",
        "provenance": _provenance(config.provenance),
        "reported": _reported_calibration(calibration),
        "derived_unit_conversions": _derived_calibration(derived),
        "separation_note": (
            "Published values are paper-reported references or direct unit "
            "conversions, not local component-model estimates."
        ),
    }


def _reported_calibration(
    calibration: PublishedCalibrationConfig,
) -> dict[str, Any]:
    return _without_none(
        {
            "architecture": calibration.architecture,
            "reported_tops": calibration.reported_tops,
            "energy_efficiency_excluding_lasers_tops_per_watt": (
                calibration.energy_efficiency_excluding_lasers_tops_per_watt
            ),
            "energy_efficiency_including_lasers_tops_per_watt": (
                calibration.energy_efficiency_including_lasers_tops_per_watt
            ),
            "reported_latency_ns": calibration.reported_latency_ns,
            "reported_future_latency_ns": calibration.reported_future_latency_ns,
            "reported_enob": calibration.reported_enob,
            "reported_component_count_min": calibration.reported_component_count_min,
            "a10_latency_ns_min": calibration.a10_latency_ns_min,
            "pace_total_time_us": calibration.pace_total_time_us,
            "gpu_total_time_us": calibration.gpu_total_time_us,
            "additional_metrics": calibration.additional_metrics or None,
        }
    )


def _derived_calibration(
    derived: PublishedCalibrationResult,
) -> dict[str, Any]:
    return _without_none(
        {
            "energy_per_op_excluding_lasers_pj": (
                derived.energy_per_op_excluding_lasers_pj
            ),
            "energy_per_op_including_lasers_pj": (
                derived.energy_per_op_including_lasers_pj
            ),
            "energy_per_mac_excluding_lasers_pj": (
                derived.energy_per_mac_excluding_lasers_pj
            ),
            "energy_per_mac_including_lasers_pj": (
                derived.energy_per_mac_including_lasers_pj
            ),
            "total_energy_excluding_lasers_pj": (
                derived.total_energy_excluding_lasers_pj
            ),
            "total_energy_including_lasers_pj": (
                derived.total_energy_including_lasers_pj
            ),
            "model_to_published_including_lasers_ratio": (
                derived.model_to_published_including_lasers_ratio
            ),
        }
    )


def _provenance(provenance: ProvenanceConfig | None) -> dict[str, str] | None:
    if provenance is None:
        return None

    return {
        "source_title": provenance.source_title,
        "source_url": provenance.source_url,
        "doi": provenance.doi,
        "venue": provenance.venue,
        "claim_status": provenance.claim_status,
    }


def _calibration_fit(fit: CalibrationFitResult | None) -> dict[str, Any] | None:
    if fit is None:
        return None

    return {
        "target": fit.target,
        "target_source": fit.target_source,
        "target_total_energy_pj": fit.target_total_energy_pj,
        "fitted_parameter": {
            "path": fit.fitted_parameter,
            "unit": fit.fitted_parameter_unit,
            "original_value": fit.original_value,
            "fitted_value": fit.fitted_value,
        },
        "objective": fit.objective,
        "pre_fit_total_energy_pj": fit.pre_fit_total_energy_pj,
        "post_fit_total_energy_pj": fit.post_fit_total_energy_pj,
        "absolute_error_pj": fit.absolute_error_pj,
        "relative_error": fit.relative_error,
        "assumptions": list(fit.assumptions),
    }


def _without_none(raw: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in raw.items() if value is not None}
