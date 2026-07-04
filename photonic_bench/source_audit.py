from __future__ import annotations

from typing import Any

from photonic_bench.config import (
    BenchmarkConfig,
    PublishedCalibrationConfig,
    SourceAuditConfig,
    SourceAuditConversion,
    SourceAuditMetric,
)
from photonic_bench.model import PublishedCalibrationResult


def build_source_audit(
    config: BenchmarkConfig,
    derived: PublishedCalibrationResult | None,
    *,
    equivalent_ops: int | None = None,
) -> dict[str, Any] | None:
    calibration = config.published_calibration
    if calibration is None:
        return None

    configured = config.source_audit
    return {
        "quoted_metrics": [
            *_configured_metrics(configured),
            *_calibration_metrics(calibration),
        ],
        "local_assumptions": _local_assumptions(config, configured),
        "conversion_math": [
            *_configured_conversions(configured),
            *_derived_conversion_math(calibration, derived, equivalent_ops),
        ],
        "confidence_flags": _confidence_flags(config, configured),
        "separation_note": (
            "Quoted metrics are source-reported values or source-adjacent "
            "card metadata. Conversion math is a direct unit conversion from "
            "published_calibration fields. Local assumptions remain separate "
            "PhotonicBench surrogate/model inputs."
        ),
    }


def _configured_metrics(audit: SourceAuditConfig | None) -> list[dict[str, str]]:
    if audit is None:
        return []
    return [_metric_to_dict(metric) for metric in audit.quoted_metrics]


def _metric_to_dict(metric: SourceAuditMetric) -> dict[str, str]:
    payload = {
        "metric": metric.metric,
        "quoted_value": metric.quoted_value,
        "source_location": metric.source_location,
    }
    if metric.note:
        payload["note"] = metric.note
    return payload


def _configured_conversions(
    audit: SourceAuditConfig | None,
) -> list[dict[str, Any]]:
    if audit is None:
        return []
    return [_conversion_to_dict(conversion) for conversion in audit.conversion_math]


def _conversion_to_dict(conversion: SourceAuditConversion) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "derived_metric": conversion.derived_metric,
        "formula": conversion.formula,
        "inputs": dict(conversion.inputs),
        "result": conversion.result,
    }
    if conversion.note:
        payload["note"] = conversion.note
    return payload


def _calibration_metrics(
    calibration: PublishedCalibrationConfig,
) -> list[dict[str, str]]:
    field_labels = {
        "architecture": "Architecture",
        "reported_tops": "Reported throughput",
        "energy_efficiency_excluding_lasers_tops_per_watt": (
            "Energy efficiency excluding lasers"
        ),
        "energy_efficiency_including_lasers_tops_per_watt": (
            "Energy efficiency including lasers"
        ),
        "reported_latency_ns": "Reported latency",
        "reported_future_latency_ns": "Reported future-device latency",
        "reported_enob": "Reported ENOB",
        "reported_component_count_min": "Reported component count minimum",
        "a10_latency_ns_min": "A10 comparison latency minimum",
        "pace_total_time_us": "PACE total time",
        "gpu_total_time_us": "GPU/A10 total time",
    }

    rows: list[dict[str, str]] = []
    for field_name, label in field_labels.items():
        value = getattr(calibration, field_name)
        if value is None:
            continue
        rows.append(
            {
                "metric": label,
                "quoted_value": str(value),
                "source_location": f"published_calibration.{field_name}",
                "note": (
                    "Config-level source metric copied into the structured "
                    "audit; exact paper section may be supplied in YAML "
                    "source_audit.quoted_metrics."
                ),
            }
        )

    for metric_name, metric_value in calibration.additional_metrics.items():
        rows.append(
            {
                "metric": _humanize_metric_name(metric_name),
                "quoted_value": str(metric_value),
                "source_location": (
                    f"published_calibration.additional_metrics.{metric_name}"
                ),
                "note": (
                    "Source-specific metric or surrogate boundary metadata "
                    "provided by the card YAML."
                ),
            }
        )
    return rows


def _local_assumptions(
    config: BenchmarkConfig,
    audit: SourceAuditConfig | None,
) -> list[str]:
    assumptions: list[str] = []
    if audit is not None:
        assumptions.extend(audit.local_assumptions)
    if config.source_quality is not None:
        assumptions.append(
            "Local surrogate type: "
            f"{config.source_quality.local_surrogate_type}."
        )
        assumptions.extend(config.source_quality.notes)
    assumptions.extend(config.assumptions)
    return _dedupe_nonempty(assumptions)


def _derived_conversion_math(
    calibration: PublishedCalibrationConfig,
    derived: PublishedCalibrationResult | None,
    equivalent_ops: int | None,
) -> list[dict[str, Any]]:
    if derived is None:
        return []

    rows: list[dict[str, Any]] = []
    rows.extend(
        _tops_per_watt_conversions(
            qualifier="excluding_lasers",
            tops_per_watt=calibration.energy_efficiency_excluding_lasers_tops_per_watt,
            energy_per_op_pj=derived.energy_per_op_excluding_lasers_pj,
            energy_per_mac_pj=derived.energy_per_mac_excluding_lasers_pj,
            total_energy_pj=derived.total_energy_excluding_lasers_pj,
            equivalent_ops=equivalent_ops,
        )
    )
    rows.extend(
        _tops_per_watt_conversions(
            qualifier="including_lasers",
            tops_per_watt=calibration.energy_efficiency_including_lasers_tops_per_watt,
            energy_per_op_pj=derived.energy_per_op_including_lasers_pj,
            energy_per_mac_pj=derived.energy_per_mac_including_lasers_pj,
            total_energy_pj=derived.total_energy_including_lasers_pj,
            equivalent_ops=equivalent_ops,
        )
    )
    if derived.model_to_published_including_lasers_ratio is not None:
        rows.append(
            {
                "derived_metric": "model_to_published_including_lasers_ratio",
                "formula": (
                    "local_model.energy.total_pj / "
                    "published_reference.derived_unit_conversions."
                    "total_energy_including_lasers_pj"
                ),
                "inputs": {
                    "published_total_energy_including_lasers_pj": (
                        derived.total_energy_including_lasers_pj
                    ),
                },
                "result": _format_number(
                    derived.model_to_published_including_lasers_ratio
                ),
                "note": (
                    "Diagnostic ratio only; it does not change local_model or "
                    "published_reference."
                ),
            }
        )
    return rows


def _tops_per_watt_conversions(
    *,
    qualifier: str,
    tops_per_watt: float | None,
    energy_per_op_pj: float | None,
    energy_per_mac_pj: float | None,
    total_energy_pj: float | None,
    equivalent_ops: int | None,
) -> list[dict[str, Any]]:
    if tops_per_watt is None:
        return []
    source_field = f"energy_efficiency_{qualifier}_tops_per_watt"
    rows: list[dict[str, Any]] = []
    if energy_per_op_pj is not None:
        rows.append(
            {
                "derived_metric": f"energy_per_op_{qualifier}_pj",
                "formula": f"1 / {source_field}",
                "inputs": {source_field: tops_per_watt},
                "result": _format_number(energy_per_op_pj),
            }
        )
    if energy_per_mac_pj is not None:
        rows.append(
            {
                "derived_metric": f"energy_per_mac_{qualifier}_pj",
                "formula": f"2 / {source_field}",
                "inputs": {source_field: tops_per_watt},
                "result": _format_number(energy_per_mac_pj),
            }
        )
    if total_energy_pj is not None:
        inputs: dict[str, int | float] = {source_field: tops_per_watt}
        if equivalent_ops is not None:
            inputs["equivalent_ops"] = equivalent_ops
        rows.append(
            {
                "derived_metric": f"total_energy_{qualifier}_pj",
                "formula": f"equivalent_ops / {source_field}",
                "inputs": inputs,
                "result": _format_number(total_energy_pj),
            }
        )
    return rows


def _confidence_flags(
    config: BenchmarkConfig,
    audit: SourceAuditConfig | None,
) -> list[str]:
    flags: list[str] = []
    if audit is not None:
        flags.extend(audit.confidence_flags)
    if config.provenance is not None:
        flags.append(f"claim_status={config.provenance.claim_status}")
        if config.provenance.doi:
            flags.append(f"source_doi={config.provenance.doi}")
    if config.source_quality is not None:
        flags.append(f"source_quality_grade={config.source_quality.confidence_grade}")
        flags.extend(
            f"coverage.{dimension}={status}"
            for dimension, status in sorted(config.source_quality.coverage.items())
        )
    return _dedupe_nonempty(flags)


def _dedupe_nonempty(values: list[str]) -> list[str]:
    seen: set[str] = set()
    deduped: list[str] = []
    for value in values:
        stripped = value.strip()
        if not stripped or stripped in seen:
            continue
        seen.add(stripped)
        deduped.append(stripped)
    return deduped


def _humanize_metric_name(name: str) -> str:
    return name.replace("_", " ").capitalize()


def _format_number(value: float | int) -> str:
    return f"{value:.12g}"
