from __future__ import annotations

from dataclasses import asdict, dataclass
import json
import math
import re
from typing import Any, Sequence

from photonic_bench.comparison import ComparisonCard, render_comparison_markdown
from photonic_bench.config import (
    BenchmarkConfig,
    BenchmarkMeta,
    ExecutionConfig,
    TransformerLayerConfig,
    TransformerLayerShapeConfig,
    WorkloadConfig,
)
from photonic_bench.json_report import REPORT_SCHEMA_VERSION


TRANSFORMER_OPERATION_ORDER = (
    "qkv_projection",
    "attention_scores",
    "attention_value",
    "mlp_up_projection",
    "mlp_down_projection",
)
TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION = "photonic-bench-transformer-layer-report-v1"
TRANSFORMER_LAYER_ARTIFACT_TYPE = "transformer_layer_aggregate"

_CONVERSION_SUM_FIELDS = (
    "adc_conversions",
    "vector_dac_conversions",
    "weight_dac_conversions",
    "dac_conversions",
)
_ENERGY_SUM_FIELDS = (
    "optical_compute_pj",
    "laser_electrical_pj",
    "detector_pj",
    "adc_pj",
    "vector_dac_pj",
    "weight_dac_pj",
    "dac_pj",
    "total_pj",
)


@dataclass(frozen=True)
class TransformerMatmulCardConfig:
    key: str
    label: str
    formula: str
    config: BenchmarkConfig
    expected_macs: int
    expected_equivalent_ops: int


@dataclass(frozen=True)
class TransformerLayerPlan:
    config: TransformerLayerConfig
    cards: tuple[TransformerMatmulCardConfig, ...]
    total_macs: int
    total_equivalent_ops: int


@dataclass(frozen=True)
class TransformerLayerCardAudit:
    expected_card: TransformerMatmulCardConfig
    json_card: ComparisonCard
    json_macs: int
    json_equivalent_ops: int


@dataclass(frozen=True)
class _OperationTemplate:
    key: str
    label: str
    formula: str
    workload: WorkloadConfig
    operation_batch_size: int
    uses_model_weights: bool
    expected_macs: int


def build_transformer_layer_plan(
    config: TransformerLayerConfig,
) -> TransformerLayerPlan:
    cards = tuple(_matmul_card(config, template) for template in _operation_templates(config))
    total_macs = sum(card.expected_macs for card in cards)
    return TransformerLayerPlan(
        config=config,
        cards=cards,
        total_macs=total_macs,
        total_equivalent_ops=2 * total_macs,
    )


def qkv_projection_macs(shape: TransformerLayerShapeConfig) -> int:
    return (
        3
        * shape.batch_size
        * shape.sequence_length
        * shape.hidden_size
        * shape.hidden_size
    )


def attention_scores_macs(shape: TransformerLayerShapeConfig) -> int:
    return (
        shape.batch_size
        * shape.num_heads
        * shape.sequence_length
        * shape.sequence_length
        * shape.head_dim
    )


def attention_value_macs(shape: TransformerLayerShapeConfig) -> int:
    return attention_scores_macs(shape)


def mlp_up_projection_macs(shape: TransformerLayerShapeConfig) -> int:
    return (
        shape.batch_size
        * shape.sequence_length
        * shape.hidden_size
        * shape.mlp_intermediate_size
    )


def mlp_down_projection_macs(shape: TransformerLayerShapeConfig) -> int:
    return mlp_up_projection_macs(shape)


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")
    return slug or "transformer_layer"


def render_transformer_layer_comparison_markdown(
    config: TransformerLayerConfig,
    cards: Sequence[ComparisonCard],
) -> str:
    plan, audits = _audit_transformer_layer_cards(config, cards)

    formula_rows = []
    total_macs = 0
    total_equivalent_ops = 0
    for audit in audits:
        expected_card = audit.expected_card
        total_macs += audit.json_macs
        total_equivalent_ops += audit.json_equivalent_ops
        formula_rows.append(
            [
                expected_card.label,
                expected_card.formula,
                str(audit.json_macs),
                str(audit.json_equivalent_ops),
            ]
        )

    if total_macs != plan.total_macs:
        raise ValueError("aggregate MAC total does not match helper formulas")
    if total_equivalent_ops != plan.total_equivalent_ops:
        raise ValueError("aggregate equivalent-op total does not match formulas")

    extra_sections = (
        _shape_section(config.transformer_layer)
        + "\n\n"
        + _formula_section(formula_rows, total_macs, total_equivalent_ops)
    )
    return render_comparison_markdown(
        cards,
        title=f"PhotonicBench Transformer Layer Comparison: {config.benchmark.name}",
        intro=(
            "Rows are decomposed transformer matmul cards loaded from "
            "machine-readable JSON reports. Aggregate totals below are summed "
            "from those JSON cards and checked against the helper formulas."
        ),
        extra_sections=extra_sections,
    )


def render_transformer_layer_json(
    config: TransformerLayerConfig,
    cards: Sequence[ComparisonCard],
) -> str:
    return (
        json.dumps(
            transformer_layer_report_to_dict(config, cards),
            indent=2,
            allow_nan=False,
        )
        + "\n"
    )


def transformer_layer_report_to_dict(
    config: TransformerLayerConfig,
    cards: Sequence[ComparisonCard],
) -> dict[str, Any]:
    plan, audits = _audit_transformer_layer_cards(config, cards)
    total_macs = sum(audit.json_macs for audit in audits)
    total_equivalent_ops = sum(audit.json_equivalent_ops for audit in audits)
    total_output_elements = sum(
        _required_int(
            audit.json_card.payload,
            "workload",
            "output_elements",
            source=audit.json_card.path,
        )
        for audit in audits
    )
    total_energy_pj = _sum_local_energy(audits, "total_pj")
    detector_pj = _sum_local_energy(audits, "detector_pj")
    adc_pj = _sum_local_energy(audits, "adc_pj")
    dac_pj = _sum_local_energy(audits, "dac_pj")
    serial_batch_latency_ns = _sum_local_timing(audits, "batch_latency_ns")

    return {
        "schema_version": TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION,
        "artifact_type": TRANSFORMER_LAYER_ARTIFACT_TYPE,
        "benchmark": {
            "name": config.benchmark.name,
            "description": config.benchmark.description,
        },
        "transformer_layer": {
            "layer_type": config.transformer_layer.layer_type,
            "attention_mode": config.transformer_layer.attention_mode,
            "shape": _transformer_shape_dict(config.transformer_layer),
        },
        "workload": {
            "type": "transformer_layer",
            "matmul_count": len(audits),
            "macs": total_macs,
            "equivalent_ops": total_equivalent_ops,
            "output_elements": total_output_elements,
        },
        "aggregate_semantics": _aggregate_semantics(),
        "local_model": {
            "conversion_counts": {
                field: _sum_local_conversion_count(audits, field)
                for field in _CONVERSION_SUM_FIELDS
            },
            "energy": {
                **{field: _sum_local_energy(audits, field) for field in _ENERGY_SUM_FIELDS},
                "energy_per_mac_pj": total_energy_pj / total_macs,
                "energy_per_op_pj": total_energy_pj / total_equivalent_ops,
                "peripheral_share": (
                    (detector_pj + adc_pj + dac_pj) / total_energy_pj
                    if total_energy_pj
                    else 0.0
                ),
            },
            "timing": {
                "timing_model": "serial_sum_of_decomposed_batch_latencies",
                "serial_single_operation_latency_ns": _sum_local_timing(
                    audits,
                    "total_latency_ns",
                ),
                "serial_batch_latency_ns": serial_batch_latency_ns,
                "serial_effective_macs_per_second": _per_second(
                    total_macs,
                    serial_batch_latency_ns,
                ),
                "serial_effective_equivalent_ops_per_second": _per_second(
                    total_equivalent_ops,
                    serial_batch_latency_ns,
                ),
                "max_pipeline_cycle_time_ns": _max_local_timing(
                    audits,
                    "pipeline_cycle_time_ns",
                ),
                "max_per_matmul_batch_latency_ns": _max_local_timing(
                    audits,
                    "batch_latency_ns",
                ),
            },
            "noise": {
                "aggregation": "not_additive",
                "note": (
                    "Noise is not summed into a layer-level error model. "
                    "Extrema below are diagnostics over per-matmul cards."
                ),
                "max_quantization_rms": _max_local_noise(audits, "quantization_rms"),
                "max_phase_noise_rad_rms": _max_local_noise(
                    audits,
                    "phase_noise_rad_rms",
                ),
                "max_drift_rms_rad": _max_local_noise(audits, "drift_rms_rad"),
                "max_estimated_relative_error_rms": _max_local_noise(
                    audits,
                    "estimated_relative_error_rms",
                ),
            },
        },
        "published_reference": None,
        "calibration_fit": None,
        "formula_audit": _formula_audit(plan, audits),
        "matmuls": [_matmul_breakdown(audit) for audit in audits],
        "assumptions": _aggregate_assumptions(config),
        "exclusions": _transformer_exclusions(),
        "provenance": _provenance_dict(config),
    }


def _operation_templates(
    config: TransformerLayerConfig,
) -> tuple[_OperationTemplate, ...]:
    shape = config.transformer_layer
    return (
        _OperationTemplate(
            key="qkv_projection",
            label="QKV projection",
            formula="3 * B * S * H * H",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=shape.hidden_size,
                n=3 * shape.hidden_size,
            ),
            operation_batch_size=shape.batch_size,
            uses_model_weights=True,
            expected_macs=qkv_projection_macs(shape),
        ),
        _OperationTemplate(
            key="attention_scores",
            label="Attention scores",
            formula="B * heads * S * S * head_dim",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=shape.head_dim,
                n=shape.sequence_length,
            ),
            operation_batch_size=shape.batch_size * shape.num_heads,
            uses_model_weights=False,
            expected_macs=attention_scores_macs(shape),
        ),
        _OperationTemplate(
            key="attention_value",
            label="Attention-value",
            formula="B * heads * S * S * head_dim",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=shape.sequence_length,
                n=shape.head_dim,
            ),
            operation_batch_size=shape.batch_size * shape.num_heads,
            uses_model_weights=False,
            expected_macs=attention_value_macs(shape),
        ),
        _OperationTemplate(
            key="mlp_up_projection",
            label="MLP up-projection",
            formula="B * S * H * intermediate",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=shape.hidden_size,
                n=shape.mlp_intermediate_size,
            ),
            operation_batch_size=shape.batch_size,
            uses_model_weights=True,
            expected_macs=mlp_up_projection_macs(shape),
        ),
        _OperationTemplate(
            key="mlp_down_projection",
            label="MLP down-projection",
            formula="B * S * intermediate * H",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=shape.mlp_intermediate_size,
                n=shape.hidden_size,
            ),
            operation_batch_size=shape.batch_size,
            uses_model_weights=True,
            expected_macs=mlp_down_projection_macs(shape),
        ),
    )


def _matmul_card(
    layer_config: TransformerLayerConfig,
    operation: _OperationTemplate,
) -> TransformerMatmulCardConfig:
    shape = layer_config.transformer_layer
    execution = _operation_execution(layer_config.execution, operation)
    config = BenchmarkConfig(
        benchmark=BenchmarkMeta(
            name=f"{layer_config.benchmark.name} - {operation.label}",
            description=_operation_description(layer_config, operation),
        ),
        workload=operation.workload,
        device=layer_config.device,
        timing=layer_config.timing,
        noise=layer_config.noise,
        execution=execution,
        provenance=layer_config.provenance,
        published_calibration=None,
        assumptions=(
            *layer_config.assumptions,
            f"Transformer operation: {operation.label}.",
            f"Transformer formula: {operation.formula}.",
            (
                "Transformer batch/head multiplicity is represented by the "
                "generated card's execution.batch_size."
            ),
            (
                f"Layer shape: batch={shape.batch_size}, sequence="
                f"{shape.sequence_length}, hidden={shape.hidden_size}, "
                f"heads={shape.num_heads}, head_dim={shape.head_dim}, "
                f"intermediate={shape.mlp_intermediate_size}."
            ),
            (
                "Dense attention accounting is used; decoder/causal labels do "
                "not halve attention MAC counts."
            ),
            (
                "Non-matmul costs such as softmax, layer norm, bias adds, "
                "activations, dropout, masking, KV-cache incremental decoding, "
                "and non-matmul memory traffic are excluded."
            ),
        ),
    )
    return TransformerMatmulCardConfig(
        key=operation.key,
        label=operation.label,
        formula=operation.formula,
        config=config,
        expected_macs=operation.expected_macs,
        expected_equivalent_ops=2 * operation.expected_macs,
    )


def _operation_execution(
    execution: ExecutionConfig,
    operation: _OperationTemplate,
) -> ExecutionConfig:
    if operation.uses_model_weights:
        return ExecutionConfig(
            batch_size=operation.operation_batch_size,
            vector_reuse_factor=execution.vector_reuse_factor,
            weight_reuse_factor=execution.weight_reuse_factor,
            weight_stationary=execution.weight_stationary,
            pipeline=execution.pipeline,
        )

    return ExecutionConfig(
        batch_size=operation.operation_batch_size,
        vector_reuse_factor=1,
        weight_reuse_factor=1,
        weight_stationary=False,
        pipeline=execution.pipeline,
    )


def _operation_description(
    layer_config: TransformerLayerConfig,
    operation: _OperationTemplate,
) -> str:
    base = layer_config.benchmark.description or "Transformer layer helper output."
    rhs_note = (
        "The right operand is a learned model-weight matrix."
        if operation.uses_model_weights
        else (
            "The right operand is activation data for attention, so cross-batch "
            "weight-stationary reuse is disabled in this generated card."
        )
    )
    workload = operation.workload
    return (
        f"{base} Generated decomposed card for {operation.label}. "
        f"Formula: {operation.formula}. Matmul shape is {workload.m} x "
        f"{workload.k} times {workload.k} x {workload.n}; operation "
        f"multiplicity is {operation.operation_batch_size}. {rhs_note}"
    )


def _shape_section(shape: TransformerLayerShapeConfig) -> str:
    return f"""## Transformer Shape

| Field | Value |
| --- | ---: |
| Layer type | {shape.layer_type} |
| Attention mode | {shape.attention_mode} |
| Batch size | {shape.batch_size} |
| Sequence length | {shape.sequence_length} |
| Hidden size | {shape.hidden_size} |
| Attention heads | {shape.num_heads} |
| Head dimension | {shape.head_dim} |
| MLP intermediate size | {shape.mlp_intermediate_size} |"""


def _formula_section(
    formula_rows: list[list[str]],
    total_macs: int,
    total_equivalent_ops: int,
) -> str:
    rows = "\n".join(
        f"| {label} | `{formula}` | {macs} | {equivalent_ops} |"
        for label, formula, macs, equivalent_ops in formula_rows
    )
    return f"""## Formula Audit

| Operation | Formula | JSON MACs | JSON equivalent ops |
| --- | --- | ---: | ---: |
{rows}
| Aggregate layer total | sum of decomposed JSON cards | {total_macs} | {total_equivalent_ops} |"""


def _audit_transformer_layer_cards(
    config: TransformerLayerConfig,
    cards: Sequence[ComparisonCard],
) -> tuple[TransformerLayerPlan, tuple[TransformerLayerCardAudit, ...]]:
    plan = build_transformer_layer_plan(config)
    if len(cards) != len(plan.cards):
        raise ValueError(
            f"expected {len(plan.cards)} transformer JSON cards, got {len(cards)}"
        )

    cards_by_label = _cards_by_transformer_operation(plan, cards)

    audits = []
    for expected_card in plan.cards:
        json_card = cards_by_label[expected_card.label]
        _validate_card_identity(expected_card, json_card)
        json_macs = _required_int(
            json_card.payload,
            "workload",
            "macs",
            source=json_card.path,
        )
        json_equivalent_ops = _required_int(
            json_card.payload,
            "workload",
            "equivalent_ops",
            source=json_card.path,
        )
        if json_macs != expected_card.expected_macs:
            raise ValueError(
                f"{json_card.path} has {json_macs} MACs; expected "
                f"{expected_card.expected_macs} for {expected_card.key}"
            )
        if json_equivalent_ops != expected_card.expected_equivalent_ops:
            raise ValueError(
                f"{json_card.path} has {json_equivalent_ops} equivalent ops; "
                f"expected {expected_card.expected_equivalent_ops}"
            )
        audits.append(
            TransformerLayerCardAudit(
                expected_card=expected_card,
                json_card=json_card,
                json_macs=json_macs,
                json_equivalent_ops=json_equivalent_ops,
            )
        )

    total_macs = sum(audit.json_macs for audit in audits)
    total_equivalent_ops = sum(audit.json_equivalent_ops for audit in audits)
    if total_macs != plan.total_macs:
        raise ValueError("aggregate MAC total does not match helper formulas")
    if total_equivalent_ops != plan.total_equivalent_ops:
        raise ValueError("aggregate equivalent-op total does not match formulas")

    return plan, tuple(audits)


def _cards_by_transformer_operation(
    plan: TransformerLayerPlan,
    cards: Sequence[ComparisonCard],
) -> dict[str, ComparisonCard]:
    expected_labels = {card.label for card in plan.cards}
    cards_by_label: dict[str, ComparisonCard] = {}

    for json_card in cards:
        schema_version = _required_str(
            json_card.payload,
            "schema_version",
            source=json_card.path,
        )
        if schema_version != REPORT_SCHEMA_VERSION:
            raise ValueError(
                f"{json_card.path} has schema_version {schema_version!r}; "
                f"expected {REPORT_SCHEMA_VERSION!r}"
            )

        workload_type = _required_str(
            json_card.payload,
            "workload",
            "type",
            source=json_card.path,
        )
        if workload_type != "matmul":
            raise ValueError(f"{json_card.path}: workload.type must be 'matmul'")

        operation_label = _transformer_operation_label(json_card)
        if operation_label not in expected_labels:
            expected = ", ".join(sorted(expected_labels))
            raise ValueError(
                f"{json_card.path} declares transformer operation "
                f"{operation_label!r}; expected one of: {expected}"
            )
        if operation_label in cards_by_label:
            raise ValueError(
                f"duplicate transformer operation {operation_label!r}: "
                f"{cards_by_label[operation_label].path} and {json_card.path}"
            )
        cards_by_label[operation_label] = json_card

    missing = [card.label for card in plan.cards if card.label not in cards_by_label]
    if missing:
        found = ", ".join(sorted(cards_by_label)) or "none"
        raise ValueError(
            "missing transformer JSON card(s) for operation(s): "
            f"{', '.join(missing)}; found: {found}"
        )

    return cards_by_label


def _transformer_operation_label(json_card: ComparisonCard) -> str:
    operation_prefix = "Transformer operation: "
    assumptions = _required_list(
        json_card.payload,
        "assumptions",
        source=json_card.path,
    )
    labels = []
    for assumption in assumptions:
        if not isinstance(assumption, str):
            raise ValueError(f"{json_card.path}: assumptions entries must be strings")
        if assumption.startswith(operation_prefix) and assumption.endswith("."):
            labels.append(assumption.removeprefix(operation_prefix).removesuffix("."))

    if not labels:
        raise ValueError(
            f"{json_card.path} is missing a 'Transformer operation: ...' "
            "assumption; cannot match it to the transformer-layer plan"
        )
    if len(labels) > 1:
        raise ValueError(
            f"{json_card.path} has multiple transformer operation assumptions: "
            f"{', '.join(labels)}"
        )

    return labels[0]


def _validate_card_identity(
    expected_card: TransformerMatmulCardConfig,
    json_card: ComparisonCard,
) -> None:
    payload = json_card.payload
    operation_assumption = f"Transformer operation: {expected_card.label}."
    assumptions = _required_list(payload, "assumptions", source=json_card.path)
    if operation_assumption not in assumptions:
        raise ValueError(
            f"{json_card.path} is missing expected assumption "
            f"{operation_assumption!r}"
        )

    expected_workload = expected_card.config.workload
    for field, expected_value in (
        ("m", expected_workload.m),
        ("k", expected_workload.k),
        ("n", expected_workload.n),
    ):
        value = _required_int(
            payload,
            "workload",
            "shape",
            field,
            source=json_card.path,
        )
        if value != expected_value:
            raise ValueError(
                f"{json_card.path} workload.shape.{field} is {value}; "
                f"expected {expected_value} for {expected_card.key}"
            )

    _validate_model_inputs_match(expected_card, json_card)


def _validate_model_inputs_match(
    expected_card: TransformerMatmulCardConfig,
    json_card: ComparisonCard,
) -> None:
    expected_model_inputs = {
        "device": asdict(expected_card.config.device),
        "execution": asdict(expected_card.config.execution),
        "timing": asdict(expected_card.config.timing),
        "noise": asdict(expected_card.config.noise),
    }
    _validate_expected_mapping(
        json_card.payload,
        expected_model_inputs,
        path=("model_inputs",),
        source=json_card.path,
        operation_key=expected_card.key,
    )


def _validate_expected_mapping(
    payload: dict[str, Any],
    expected: dict[str, Any],
    *,
    path: tuple[str, ...],
    source: Any,
    operation_key: str,
) -> None:
    _required_dict(payload, *path, source=source)
    for key, expected_value in expected.items():
        field_path = (*path, key)
        if isinstance(expected_value, dict):
            _validate_expected_mapping(
                payload,
                expected_value,
                path=field_path,
                source=source,
                operation_key=operation_key,
            )
            continue

        actual_value = _get_required(payload, *field_path, source=source)
        if isinstance(expected_value, bool):
            actual_value = _required_bool(payload, *field_path, source=source)
        elif isinstance(expected_value, int) and not isinstance(expected_value, bool):
            actual_value = _required_int(payload, *field_path, source=source)
        elif isinstance(expected_value, float):
            actual_value = _required_number(payload, *field_path, source=source)

        if actual_value != expected_value:
            raise ValueError(
                f"{source}: {'.'.join(field_path)} is {actual_value!r}; "
                f"expected {expected_value!r} for {operation_key}"
            )


def _formula_audit(
    plan: TransformerLayerPlan,
    audits: Sequence[TransformerLayerCardAudit],
) -> dict[str, Any]:
    json_total_macs = sum(audit.json_macs for audit in audits)
    json_total_equivalent_ops = sum(audit.json_equivalent_ops for audit in audits)
    return {
        "expected_total_macs": plan.total_macs,
        "json_total_macs": json_total_macs,
        "mac_total_matches_decomposed_json": json_total_macs == plan.total_macs,
        "expected_total_equivalent_ops": plan.total_equivalent_ops,
        "json_total_equivalent_ops": json_total_equivalent_ops,
        "equivalent_ops_total_matches_decomposed_json": (
            json_total_equivalent_ops == plan.total_equivalent_ops
        ),
        "rows": [
            {
                "operation_key": audit.expected_card.key,
                "label": audit.expected_card.label,
                "formula": audit.expected_card.formula,
                "expected_macs": audit.expected_card.expected_macs,
                "json_macs": audit.json_macs,
                "expected_equivalent_ops": (
                    audit.expected_card.expected_equivalent_ops
                ),
                "json_equivalent_ops": audit.json_equivalent_ops,
            }
            for audit in audits
        ],
    }


def _matmul_breakdown(audit: TransformerLayerCardAudit) -> dict[str, Any]:
    payload = audit.json_card.payload
    return {
        "operation_key": audit.expected_card.key,
        "label": audit.expected_card.label,
        "formula": audit.expected_card.formula,
        "json_report": audit.json_card.path.name,
        "benchmark": _required_dict(payload, "benchmark", source=audit.json_card.path),
        "workload": _required_dict(payload, "workload", source=audit.json_card.path),
        "model_inputs": _required_dict(
            payload,
            "model_inputs",
            source=audit.json_card.path,
        ),
        "local_model": _required_dict(
            payload,
            "local_model",
            source=audit.json_card.path,
        ),
        "assumptions": _required_list(
            payload,
            "assumptions",
            source=audit.json_card.path,
        ),
        "provenance": payload.get("provenance"),
    }


def _transformer_shape_dict(shape: TransformerLayerShapeConfig) -> dict[str, int]:
    return {
        "batch_size": shape.batch_size,
        "sequence_length": shape.sequence_length,
        "hidden_size": shape.hidden_size,
        "num_heads": shape.num_heads,
        "head_dim": shape.head_dim,
        "mlp_intermediate_size": shape.mlp_intermediate_size,
    }


def _aggregate_semantics() -> dict[str, str]:
    return {
        "source": (
            "Generated from decomposed per-matmul JSON cards emitted by the "
            "transformer-layer command."
        ),
        "energy": (
            "Additive local_model.energy components are summed; energy_per_mac_pj, "
            "energy_per_op_pj, and peripheral_share are recomputed from summed "
            "layer quantities."
        ),
        "timing": (
            "serial_* timing fields assume the decomposed matmuls execute one "
            "after another. No parallel hardware scheduler or fused layer "
            "pipeline is modeled."
        ),
        "noise": (
            "Noise is not an additive layer total. Per-matmul noise remains in "
            "matmuls[].local_model.noise; aggregate noise fields are labeled "
            "diagnostic extrema."
        ),
    }


def _aggregate_assumptions(config: TransformerLayerConfig) -> list[str]:
    return [
        *config.assumptions,
        (
            "Aggregate transformer-layer JSON is generated by loading the "
            "decomposed per-matmul JSON cards."
        ),
        (
            "Layer energy and conversion counts are sums of decomposed local "
            "model card values."
        ),
        (
            "Layer serial timing is a sum of decomposed batch latencies, not a "
            "claim about a fused hardware scheduler."
        ),
        (
            "Transformer-layer configs reject published_calibration, so this "
            "aggregate JSON carries no layer-level published calibration target."
        ),
    ]


def _transformer_exclusions() -> list[str]:
    return [
        "softmax",
        "layer_norm",
        "bias_adds",
        "activation_functions",
        "dropout",
        "masking",
        "kv_cache_incremental_decoding",
        "causal_triangular_halving",
        "non_matmul_memory_traffic",
    ]


def _provenance_dict(config: TransformerLayerConfig) -> dict[str, str] | None:
    provenance = config.provenance
    if provenance is None:
        return None

    return {
        "source_title": provenance.source_title,
        "source_url": provenance.source_url,
        "doi": provenance.doi,
        "venue": provenance.venue,
        "claim_status": provenance.claim_status,
    }


def _sum_local_conversion_count(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> int:
    return sum(
        _required_int(
            audit.json_card.payload,
            "local_model",
            "conversion_counts",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _sum_local_energy(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> float:
    return sum(
        _required_number(
            audit.json_card.payload,
            "local_model",
            "energy",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _sum_local_timing(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> float:
    return sum(
        _required_number(
            audit.json_card.payload,
            "local_model",
            "timing",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _max_local_timing(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> float:
    return max(
        _required_number(
            audit.json_card.payload,
            "local_model",
            "timing",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _max_local_noise(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> float:
    return max(
        _required_number(
            audit.json_card.payload,
            "local_model",
            "noise",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _per_second(count: int, latency_ns: float) -> float:
    return count / (latency_ns * 1e-9) if latency_ns else 0.0


def _required_dict(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> dict[str, Any]:
    value = _get_required(payload, *keys, source=source)
    if not isinstance(value, dict):
        raise ValueError(f"{_field_name(keys, source)} must be an object")
    return value


def _required_list(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> list[Any]:
    value = _get_required(payload, *keys, source=source)
    if not isinstance(value, list):
        raise ValueError(f"{_field_name(keys, source)} must be a list")
    return value


def _required_int(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> int:
    value = _get_required(payload, *keys, source=source)
    if not isinstance(value, int) or isinstance(value, bool):
        raise ValueError(f"{_field_name(keys, source)} must be an integer")
    return value


def _required_number(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> float:
    value = _get_required(payload, *keys, source=source)
    if not isinstance(value, int | float) or isinstance(value, bool):
        raise ValueError(f"{_field_name(keys, source)} must be numeric and finite")
    if not math.isfinite(float(value)):
        raise ValueError(f"{_field_name(keys, source)} must be numeric and finite")
    return float(value)


def _required_str(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> str:
    value = _get_required(payload, *keys, source=source)
    if not isinstance(value, str):
        raise ValueError(f"{_field_name(keys, source)} must be a string")
    return value


def _required_bool(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> bool:
    value = _get_required(payload, *keys, source=source)
    if not isinstance(value, bool):
        raise ValueError(f"{_field_name(keys, source)} must be boolean")
    return value


def _get_required(
    payload: dict[str, Any],
    *keys: str,
    source: Any | None = None,
) -> Any:
    value: Any = payload
    for index, key in enumerate(keys):
        if not isinstance(value, dict):
            parent = ".".join(keys[:index]) or "<root>"
            prefix = f"{source}: " if source is not None else ""
            raise ValueError(
                f"{prefix}{'.'.join(keys)} is missing because "
                f"{parent} is not an object"
            )
        if key not in value:
            prefix = f"{source}: " if source is not None else ""
            raise ValueError(f"{prefix}missing {'.'.join(keys)}")
        value = value[key]
    return value


def _field_name(keys: Sequence[str], source: Any | None = None) -> str:
    field = ".".join(keys)
    return f"{source}: {field}" if source is not None else field
