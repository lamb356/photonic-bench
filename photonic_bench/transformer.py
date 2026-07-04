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
    TransformerModelConfig,
    TransformerModelLayerConfig,
    WorkloadConfig,
    system_config_to_dict,
)
from photonic_bench.json_report import REPORT_SCHEMA_VERSION, report_to_dict
from photonic_bench.model import evaluate


TRANSFORMER_OPERATION_ORDER = (
    "qkv_projection",
    "attention_scores",
    "attention_value",
    "mlp_up_projection",
    "mlp_down_projection",
)
TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION = "photonic-bench-transformer-layer-report-v1"
TRANSFORMER_LAYER_ARTIFACT_TYPE = "transformer_layer_aggregate"
TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION = "photonic-bench-transformer-model-report-v1"
TRANSFORMER_MODEL_ARTIFACT_TYPE = "transformer_model_aggregate"

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
_MEMORY_SUM_FIELDS = (
    "vector_operand_read_bytes",
    "weight_operand_read_bytes",
    "output_write_bytes",
    "total_interface_bytes",
)
_SYSTEM_SUM_FIELDS = (
    "local_compute_and_conversion_energy_pj",
    "total_movement_energy_pj",
    "total_system_energy_pj",
)
_SYSTEM_TIER_SUM_FIELDS = (
    "read_bytes",
    "write_bytes",
    "total_bytes",
    "read_energy_pj",
    "write_energy_pj",
    "total_energy_pj",
    "transfer_time_ns",
    "contention_adjusted_transfer_time_ns",
    "calibration_adjusted_transfer_time_ns",
)
_SYSTEM_TIER_CAPACITY_FIELDS = (
    "bandwidth_bytes_per_ns",
    "effective_bandwidth_bytes_per_ns",
)
_SYSTEM_TIER_NAMES = ("sram", "intermediate", "off_chip")
_SYSTEM_DERIVED_FIELDS = (
    "total_hierarchy_bytes",
    "hierarchy_equivalent_ops_per_byte",
    "movement_energy_per_hierarchy_byte_pj",
    "local_compute_and_conversion_energy_share",
    "movement_to_compute_energy_ratio",
    "sram_traffic_share",
    "intermediate_traffic_share",
    "off_chip_traffic_share",
    "contention_bandwidth_derate_factor",
    "calibration_guardband_time_ns",
    "contention_transfer_overhead_fraction",
    "total_transfer_overhead_fraction",
    "effective_loaded_bandwidth_bytes_per_ns",
    "contention_only_loaded_bandwidth_bytes_per_ns",
    "contention_adjusted_loaded_bandwidth_bytes_per_ns",
    "transfer_to_compute_time_ratio",
    "bandwidth_pressure_ratio",
    "contention_adjusted_transfer_to_compute_time_ratio",
    "contention_pressure_ratio",
    "dominant_traffic_tier",
    "dominant_system_energy_component",
    "dominant_movement_energy_tier",
    "nominal_memory_bottleneck_tier",
    "contention_memory_bottleneck_tier",
    "max_tier_nominal_transfer_pressure_ratio",
    "max_tier_contention_adjusted_transfer_pressure_ratio",
    "max_tier_movement_energy_share",
    "max_tier_system_energy_share",
    "contention_bandwidth_saturation_tier",
    "max_tier_contention_bandwidth_utilization",
    "min_tier_contention_bandwidth_headroom_ratio",
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
class TransformerModelLayerArtifact:
    name: str
    count: int
    json_report: str
    payload: dict[str, Any]


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
        * _attention_context_length(shape)
        * shape.head_dim
    )


def attention_value_macs(shape: TransformerLayerShapeConfig) -> int:
    return attention_scores_macs(shape)


def _attention_context_length(shape: TransformerLayerShapeConfig) -> int:
    return shape.attention_context_length or shape.sequence_length


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


def transformer_layer_config_from_model(
    config: TransformerModelConfig,
    layer: TransformerModelLayerConfig,
) -> TransformerLayerConfig:
    return TransformerLayerConfig(
        benchmark=BenchmarkMeta(
            name=f"{config.benchmark.name} - {layer.name}",
            description=(
                f"Representative transformer layer spec '{layer.name}' used "
                f"{layer.count} time(s) in full-model aggregation. "
                f"{config.benchmark.description}"
            ).strip(),
        ),
        transformer_layer=layer.transformer_layer,
        device=config.device,
        timing=config.timing,
        noise=config.noise,
        execution=config.execution,
        system=config.system,
        provenance=config.provenance,
        assumptions=(
            *config.assumptions,
            f"Full transformer model layer spec: {layer.name}.",
            f"Full transformer model layer count: {layer.count}.",
        ),
    )


def render_transformer_model_json(
    config: TransformerModelConfig,
    layers: Sequence[TransformerModelLayerArtifact],
) -> str:
    return (
        json.dumps(
            transformer_model_report_to_dict(config, layers),
            indent=2,
            allow_nan=False,
        )
        + "\n"
    )


def render_transformer_model_markdown(
    config: TransformerModelConfig,
    layers: Sequence[TransformerModelLayerArtifact],
) -> str:
    payload = transformer_model_report_to_dict(config, layers)
    workload = payload["workload"]
    local = payload["local_model"]
    system = local["system"]
    timing = local["timing"]
    activation_memory = local["activation_memory_traffic"]
    components = payload["model_components"]

    layer_rows = "\n".join(
        "| "
        + " | ".join(
            [
                str(layer["name"]),
                str(layer["count"]),
                str(layer["json_report"]),
                str(layer["workload"]["macs"]),
                str(layer["weighted_macs"]),
                _format_metric(layer["local_model"]["system"]["system_energy_per_op_pj"]),
                _format_metric(
                    layer["local_model"]["system"][
                        "bandwidth_limited_serial_batch_latency_ns"
                    ]
                ),
                _format_metric(
                    layer["local_model"]["system"][
                        "contention_adjusted_serial_batch_latency_ns"
                    ]
                ),
            ]
        )
        + " |"
        for layer in payload["layers"]
    )
    component_table_rows = [
        [
            "Embeddings",
            str(components["embeddings"]["enabled"]),
            _format_metric(components["embeddings"]["total_embedding_read_bytes"]),
            "tensor reads",
        ],
        [
            "Output projection",
            str(bool(components["output_projection"])),
            _format_metric(
                components["output_projection"]["workload"]["macs"]
                if components["output_projection"]
                else 0
            ),
            "matmul MACs",
        ],
        [
            "Activation tensors",
            str(activation_memory["enabled"]),
            _format_metric(activation_memory["total_tensor_bytes"]),
            "read/write bytes",
        ],
        [
            "KV cache",
            str(components["kv_cache"]["enabled"]),
            _format_metric(
                components["kv_cache"]["cache_read_bytes"]
                + components["kv_cache"]["cache_write_bytes"]
            ),
            components["kv_cache"]["mode"],
        ],
    ]
    component_rows = "\n".join(
        "| " + " | ".join(row) + " |" for row in component_table_rows
    )
    assumption_rows = "\n".join(f"- {assumption}" for assumption in payload["assumptions"])
    exclusion_rows = "\n".join(f"- {exclusion}" for exclusion in payload["exclusions"])

    return f"""# PhotonicBench Transformer Model Summary: {config.benchmark.name}

{config.benchmark.description}

## Workload

| Metric | Value |
| --- | ---: |
| Layer specs | {workload["unique_layer_specs"]} |
| Total layer instances | {workload["layer_count"]} |
| Total MACs | {workload["macs"]} |
| Total equivalent ops | {workload["equivalent_ops"]} |
| Total output elements | {workload["output_elements"]} |

## Local Model Totals

| Metric | Value |
| --- | ---: |
| Compute/conversion energy (pJ) | {_format_metric(system["local_compute_and_conversion_energy_pj"])} |
| Movement energy (pJ) | {_format_metric(system["total_movement_energy_pj"])} |
| Total system energy (pJ) | {_format_metric(system["total_system_energy_pj"])} |
| System energy per MAC (pJ) | {_format_metric(system["system_energy_per_mac_pj"])} |
| System energy per equivalent op (pJ) | {_format_metric(system["system_energy_per_op_pj"])} |
| Compute/conversion energy share | {_format_metric(system["local_compute_and_conversion_energy_share"])} |
| Movement energy share | {_format_metric(system["movement_energy_share"])} |
| Movement-to-compute energy ratio | {_format_metric(system["movement_to_compute_energy_ratio"])} |
| Serial batch latency (ns) | {_format_metric(timing["serial_batch_latency_ns"])} |
| Overlap-adjusted latency (ns) | {_format_metric(timing["overlap_adjusted_batch_latency_ns"])} |
| Bandwidth-limited serial latency (ns) | {_format_metric(system["bandwidth_limited_serial_batch_latency_ns"])} |
| Bandwidth-limited overlap-adjusted latency (ns) | {_format_metric(timing["bandwidth_limited_overlap_adjusted_batch_latency_ns"])} |
| Bandwidth-limited equivalent ops/s | {_format_metric(system["bandwidth_limited_serial_effective_equivalent_ops_per_second"])} |
| Contention-adjusted serial latency (ns) | {_format_metric(system["contention_adjusted_serial_batch_latency_ns"])} |
| Contention-adjusted equivalent ops/s | {_format_metric(system["contention_adjusted_serial_effective_equivalent_ops_per_second"])} |
| Contention-only loaded bandwidth (bytes/ns) | {_format_metric(system["contention_only_loaded_bandwidth_bytes_per_ns"])} |
| Bandwidth saturation tier | {system["contention_bandwidth_saturation_tier"]} |
| Max tier bandwidth utilization | {_format_metric(system["max_tier_contention_bandwidth_utilization"])} |
| Min tier bandwidth headroom ratio | {_format_metric(system["min_tier_contention_bandwidth_headroom_ratio"])} |
| Dominant system energy component | {system["dominant_system_energy_component"]} |
| Max tier system energy share | {_format_metric(system["max_tier_system_energy_share"])} |

## Model Components

| Component | Enabled | Quantity | Basis |
| --- | --- | ---: | --- |
{component_rows}

## Activation And KV-Cache Tensor Traffic

| Metric | Value |
| --- | ---: |
| Embedding reads | {_format_metric(activation_memory["embedding_read_bytes"])} bytes |
| Layer input reads | {_format_metric(activation_memory["layer_input_read_bytes"])} bytes |
| Layer output writes | {_format_metric(activation_memory["layer_output_write_bytes"])} bytes |
| Attention score tensors | {_format_metric(activation_memory["attention_score_bytes"])} bytes |
| MLP intermediate tensors | {_format_metric(activation_memory["mlp_intermediate_bytes"])} bytes |
| KV-cache reads | {_format_metric(activation_memory["kv_cache_read_bytes"])} bytes |
| KV-cache writes | {_format_metric(activation_memory["kv_cache_write_bytes"])} bytes |
| Total tensor traffic | {_format_metric(activation_memory["total_tensor_bytes"])} bytes |

## Layer Specs

| Layer spec | Count | Summary JSON | Per-layer MACs | Weighted MACs | System pJ/op | BW-limited layer latency (ns) | Contention-adjusted layer latency (ns) |
| --- | ---: | --- | ---: | ---: | ---: | ---: | ---: |
{layer_rows}

## Aggregate Semantics

{_markdown_mapping(payload["aggregate_semantics"])}

## Assumptions

{assumption_rows}

## Exclusions

{exclusion_rows}
"""


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
    total_interface_bytes = _sum_local_memory(audits, "total_interface_bytes")
    total_system_energy_pj = _sum_local_system(audits, "total_system_energy_pj")
    total_movement_energy_pj = _sum_local_system(audits, "total_movement_energy_pj")
    bandwidth_limited_serial_batch_latency_ns = _sum_local_system(
        audits,
        "bandwidth_limited_batch_latency_ns",
    )
    contention_adjusted_serial_batch_latency_ns = _sum_local_system(
        audits,
        "contention_adjusted_batch_latency_ns",
    )
    serial_transfer_time_ns = _sum_local_system(
        audits,
        "effective_transfer_time_ns",
    )
    contention_only_transfer_time_ns = _sum_local_system(
        audits,
        "contention_adjusted_effective_transfer_time_ns",
    )
    contention_adjusted_serial_transfer_time_ns = _sum_local_system(
        audits,
        "calibration_adjusted_effective_transfer_time_ns",
    )
    aggregate_tiers = {
        tier: _aggregate_system_tier(audits, tier) for tier in _SYSTEM_TIER_NAMES
    }
    system_derived = _aggregate_system_derived_metrics(
        tiers=aggregate_tiers,
        contention=system_config_to_dict(config.system)["contention"],
        total_equivalent_ops=total_equivalent_ops,
        local_compute_and_conversion_energy_pj=total_energy_pj,
        total_movement_energy_pj=total_movement_energy_pj,
        total_system_energy_pj=total_system_energy_pj,
        serial_transfer_time_ns=serial_transfer_time_ns,
        contention_only_transfer_time_ns=contention_only_transfer_time_ns,
        contention_adjusted_serial_transfer_time_ns=(
            contention_adjusted_serial_transfer_time_ns
        ),
        serial_batch_latency_ns=serial_batch_latency_ns,
        bandwidth_limited_serial_batch_latency_ns=(
            bandwidth_limited_serial_batch_latency_ns
        ),
        contention_adjusted_serial_batch_latency_ns=(
            contention_adjusted_serial_batch_latency_ns
        ),
    )

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
            "memory_traffic": {
                **{
                    field: _sum_local_memory(audits, field)
                    for field in _MEMORY_SUM_FIELDS
                },
                "macs_per_byte": (
                    total_macs / total_interface_bytes
                    if total_interface_bytes
                    else 0.0
                ),
                "equivalent_ops_per_byte": (
                    total_equivalent_ops / total_interface_bytes
                    if total_interface_bytes
                    else 0.0
                ),
                "note": (
                    "Summed from decomposed per-matmul interface traffic. "
                    "This is not a full memory hierarchy simulation."
                ),
            },
            "system": {
                "profile": config.system.profile,
                "profile_overrides": list(config.system.profile_overrides),
                "memory_timing_mode": config.system.memory_timing_mode,
                "contention": system_config_to_dict(config.system)["contention"],
                **{field: _sum_local_system(audits, field) for field in _SYSTEM_SUM_FIELDS},
                "tiers": aggregate_tiers,
                "serial_transfer_time_ns": serial_transfer_time_ns,
                "max_per_matmul_transfer_time_ns": _max_local_system(
                    audits,
                    "effective_transfer_time_ns",
                ),
                "contention_adjusted_serial_transfer_time_ns": (
                    contention_adjusted_serial_transfer_time_ns
                ),
                "max_per_matmul_contention_adjusted_transfer_time_ns": (
                    _max_local_system(
                        audits,
                        "calibration_adjusted_effective_transfer_time_ns",
                    )
                ),
                "bandwidth_limited_serial_batch_latency_ns": (
                    bandwidth_limited_serial_batch_latency_ns
                ),
                "contention_adjusted_serial_batch_latency_ns": (
                    contention_adjusted_serial_batch_latency_ns
                ),
                "system_energy_per_mac_pj": total_system_energy_pj / total_macs,
                "system_energy_per_op_pj": (
                    total_system_energy_pj / total_equivalent_ops
                ),
                "movement_energy_share": (
                    total_movement_energy_pj / total_system_energy_pj
                    if total_system_energy_pj
                    else 0.0
                ),
                **system_derived,
                "bandwidth_limited_serial_effective_macs_per_second": _per_second(
                    total_macs,
                    bandwidth_limited_serial_batch_latency_ns,
                ),
                "bandwidth_limited_serial_effective_equivalent_ops_per_second": (
                    _per_second(
                        total_equivalent_ops,
                        bandwidth_limited_serial_batch_latency_ns,
                    )
                ),
                "contention_adjusted_serial_effective_macs_per_second": _per_second(
                    total_macs,
                    contention_adjusted_serial_batch_latency_ns,
                ),
                "contention_adjusted_serial_effective_equivalent_ops_per_second": (
                    _per_second(
                        total_equivalent_ops,
                        contention_adjusted_serial_batch_latency_ns,
                    )
                ),
                "note": (
                    "Summed from decomposed per-matmul system movement estimates. "
                    "This is a serial aggregate over explicit SRAM, intermediate, "
                    "and off-chip tiers with local contention assumptions, not a "
                    "fused memory scheduler."
                ),
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
        "exclusions": _transformer_exclusions(config),
        "provenance": _provenance_dict(config),
    }


def transformer_model_report_to_dict(
    config: TransformerModelConfig,
    layers: Sequence[TransformerModelLayerArtifact],
) -> dict[str, Any]:
    audited_layers = _audit_transformer_model_layers(config, layers)
    extra = _model_extra_accounting(config, audited_layers)
    layer_macs = _weighted_layer_int(audited_layers, "workload", "macs")
    total_macs = layer_macs + extra["workload"]["macs"]
    total_equivalent_ops = _weighted_layer_int(
        audited_layers,
        "workload",
        "equivalent_ops",
    ) + extra["workload"]["equivalent_ops"]
    total_output_elements = _weighted_layer_int(
        audited_layers,
        "workload",
        "output_elements",
    ) + extra["workload"]["output_elements"]
    total_energy_pj = _weighted_layer_number(
        audited_layers,
        "local_model",
        "energy",
        "total_pj",
    ) + extra["energy"]["total_pj"]
    detector_pj = _weighted_layer_number(
        audited_layers,
        "local_model",
        "energy",
        "detector_pj",
    ) + extra["energy"]["detector_pj"]
    adc_pj = (
        _weighted_layer_number(audited_layers, "local_model", "energy", "adc_pj")
        + extra["energy"]["adc_pj"]
    )
    dac_pj = (
        _weighted_layer_number(audited_layers, "local_model", "energy", "dac_pj")
        + extra["energy"]["dac_pj"]
    )
    total_interface_bytes = _weighted_layer_int(
        audited_layers,
        "local_model",
        "memory_traffic",
        "total_interface_bytes",
    ) + extra["memory_traffic"]["total_interface_bytes"]
    total_system_energy_pj = _weighted_layer_number(
        audited_layers,
        "local_model",
        "system",
        "total_system_energy_pj",
    ) + extra["system"]["total_system_energy_pj"]
    total_movement_energy_pj = _weighted_layer_number(
        audited_layers,
        "local_model",
        "system",
        "total_movement_energy_pj",
    ) + extra["system"]["total_movement_energy_pj"]
    serial_batch_latency_ns = _weighted_layer_number(
        audited_layers,
        "local_model",
        "timing",
        "serial_batch_latency_ns",
    ) + extra["timing"]["serial_batch_latency_ns"]
    bandwidth_limited_serial_batch_latency_ns = _weighted_layer_number(
        audited_layers,
        "local_model",
        "system",
        "bandwidth_limited_serial_batch_latency_ns",
    ) + extra["system"]["bandwidth_limited_serial_batch_latency_ns"]
    contention_adjusted_serial_batch_latency_ns = _weighted_layer_number(
        audited_layers,
        "local_model",
        "system",
        "contention_adjusted_serial_batch_latency_ns",
    ) + extra["system"]["contention_adjusted_serial_batch_latency_ns"]
    serial_transfer_time_ns = (
        _weighted_layer_number(
            audited_layers,
            "local_model",
            "system",
            "serial_transfer_time_ns",
        )
        + extra["system"]["serial_transfer_time_ns"]
    )
    contention_adjusted_serial_transfer_time_ns = (
        _weighted_layer_number(
            audited_layers,
            "local_model",
            "system",
            "contention_adjusted_serial_transfer_time_ns",
        )
        + extra["system"]["contention_adjusted_serial_transfer_time_ns"]
    )
    aggregate_tiers = {
        tier: _add_system_tiers(
            _weighted_model_system_tier(audited_layers, tier),
            extra["system"]["tiers"][tier],
        )
        for tier in _SYSTEM_TIER_NAMES
    }
    aggregate_guardband_time_ns = (
        _weighted_layer_number(
            audited_layers,
            "local_model",
            "system",
            "calibration_guardband_time_ns",
        )
        + extra["system"]["calibration_guardband_time_ns"]
    )
    system_derived = _aggregate_system_derived_metrics(
        tiers=aggregate_tiers,
        contention=system_config_to_dict(config.system)["contention"],
        total_equivalent_ops=total_equivalent_ops,
        local_compute_and_conversion_energy_pj=total_energy_pj,
        total_movement_energy_pj=total_movement_energy_pj,
        total_system_energy_pj=total_system_energy_pj,
        serial_transfer_time_ns=serial_transfer_time_ns,
        contention_only_transfer_time_ns=(
            contention_adjusted_serial_transfer_time_ns - aggregate_guardband_time_ns
        ),
        contention_adjusted_serial_transfer_time_ns=(
            contention_adjusted_serial_transfer_time_ns
        ),
        serial_batch_latency_ns=serial_batch_latency_ns,
        bandwidth_limited_serial_batch_latency_ns=(
            bandwidth_limited_serial_batch_latency_ns
        ),
        contention_adjusted_serial_batch_latency_ns=(
            contention_adjusted_serial_batch_latency_ns
        ),
    )
    overlap_timing = _model_overlap_timing(
        config,
        serial_batch_latency_ns=serial_batch_latency_ns,
        bandwidth_limited_serial_batch_latency_ns=(
            bandwidth_limited_serial_batch_latency_ns
        ),
        max_per_layer_serial_batch_latency_ns=_max_layer_number(
            audited_layers,
            "local_model",
            "timing",
            "serial_batch_latency_ns",
        ),
        max_per_layer_bandwidth_limited_batch_latency_ns=_max_layer_number(
            audited_layers,
            "local_model",
            "system",
            "bandwidth_limited_serial_batch_latency_ns",
        ),
        total_equivalent_ops=total_equivalent_ops,
    )

    return {
        "schema_version": TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION,
        "artifact_type": TRANSFORMER_MODEL_ARTIFACT_TYPE,
        "benchmark": {
            "name": config.benchmark.name,
            "description": config.benchmark.description,
        },
        "workload": {
            "type": "transformer_model",
            "unique_layer_specs": len(audited_layers),
            "layer_count": sum(layer.count for layer in audited_layers),
            "macs": total_macs,
            "equivalent_ops": total_equivalent_ops,
            "output_elements": total_output_elements,
        },
        "aggregate_semantics": _model_aggregate_semantics(),
        "local_model": {
            "conversion_counts": {
                field: (
                    _weighted_layer_int(
                        audited_layers,
                        "local_model",
                        "conversion_counts",
                        field,
                    )
                    + extra["conversion_counts"][field]
                )
                for field in _CONVERSION_SUM_FIELDS
            },
            "memory_traffic": {
                **{
                    field: (
                        _weighted_layer_int(
                            audited_layers,
                            "local_model",
                            "memory_traffic",
                            field,
                        )
                        + extra["memory_traffic"][field]
                    )
                    for field in _MEMORY_SUM_FIELDS
                },
                "macs_per_byte": (
                    total_macs / total_interface_bytes if total_interface_bytes else 0.0
                ),
                "equivalent_ops_per_byte": (
                    total_equivalent_ops / total_interface_bytes
                    if total_interface_bytes
                    else 0.0
                ),
                "note": (
                    "Weighted sum of transformer-layer interface traffic. "
                    "Counts are multiplied by layer spec count and include any "
                    "explicit model-level output projection. Activation tensor "
                    "and KV-cache traffic are reported separately."
                ),
            },
            "activation_memory_traffic": extra["activation_memory_traffic"],
            "system": {
                "profile": config.system.profile,
                "profile_overrides": list(config.system.profile_overrides),
                "memory_timing_mode": config.system.memory_timing_mode,
                "contention": system_config_to_dict(config.system)["contention"],
                **{
                    field: (
                        _weighted_layer_number(
                            audited_layers,
                            "local_model",
                            "system",
                            field,
                        )
                        + extra["system"][field]
                    )
                    for field in _SYSTEM_SUM_FIELDS
                },
                "tiers": aggregate_tiers,
                "serial_transfer_time_ns": serial_transfer_time_ns,
                "max_per_layer_transfer_time_ns": _max_layer_number(
                    audited_layers,
                    "local_model",
                    "system",
                    "serial_transfer_time_ns",
                ),
                "contention_adjusted_serial_transfer_time_ns": (
                    contention_adjusted_serial_transfer_time_ns
                ),
                "max_per_layer_contention_adjusted_transfer_time_ns": (
                    _max_layer_number(
                        audited_layers,
                        "local_model",
                        "system",
                        "contention_adjusted_serial_transfer_time_ns",
                    )
                ),
                "bandwidth_limited_serial_batch_latency_ns": (
                    bandwidth_limited_serial_batch_latency_ns
                ),
                "contention_adjusted_serial_batch_latency_ns": (
                    contention_adjusted_serial_batch_latency_ns
                ),
                "system_energy_per_mac_pj": total_system_energy_pj / total_macs,
                "system_energy_per_op_pj": (
                    total_system_energy_pj / total_equivalent_ops
                ),
                "movement_energy_share": (
                    total_movement_energy_pj / total_system_energy_pj
                    if total_system_energy_pj
                    else 0.0
                ),
                **system_derived,
                "bandwidth_limited_serial_effective_macs_per_second": _per_second(
                    total_macs,
                    bandwidth_limited_serial_batch_latency_ns,
                ),
                "bandwidth_limited_serial_effective_equivalent_ops_per_second": (
                    _per_second(
                        total_equivalent_ops,
                        bandwidth_limited_serial_batch_latency_ns,
                    )
                ),
                "contention_adjusted_serial_effective_macs_per_second": _per_second(
                    total_macs,
                    contention_adjusted_serial_batch_latency_ns,
                ),
                "contention_adjusted_serial_effective_equivalent_ops_per_second": (
                    _per_second(
                        total_equivalent_ops,
                        contention_adjusted_serial_batch_latency_ns,
                    )
                ),
                "note": (
                    "Weighted sum of transformer-layer system movement estimates "
                    "plus explicit output-projection and tensor-memory movement "
                    "assumptions over SRAM, intermediate, and off-chip tiers. "
                    "Contention fields remain local shared-link assumptions. "
                    "This is serial accounting, not a measured full-model scheduler."
                ),
            },
            "energy": {
                **{
                    field: (
                        _weighted_layer_number(
                            audited_layers,
                            "local_model",
                            "energy",
                            field,
                        )
                        + extra["energy"][field]
                    )
                    for field in _ENERGY_SUM_FIELDS
                },
                "energy_per_mac_pj": total_energy_pj / total_macs,
                "energy_per_op_pj": total_energy_pj / total_equivalent_ops,
                "peripheral_share": (
                    (detector_pj + adc_pj + dac_pj) / total_energy_pj
                    if total_energy_pj
                    else 0.0
                ),
            },
            "timing": {
                "timing_model": "serial_sum_of_weighted_layer_summaries",
                "serial_batch_latency_ns": serial_batch_latency_ns,
                "serial_effective_macs_per_second": _per_second(
                    total_macs,
                    serial_batch_latency_ns,
                ),
                "serial_effective_equivalent_ops_per_second": _per_second(
                    total_equivalent_ops,
                    serial_batch_latency_ns,
                ),
                "max_per_layer_serial_batch_latency_ns": _max_layer_number(
                    audited_layers,
                    "local_model",
                    "timing",
                    "serial_batch_latency_ns",
                ),
                **overlap_timing,
            },
            "noise": {
                "aggregation": "not_additive",
                "note": (
                    "Noise is not summed into a model-level error. Values below "
                    "are maxima over representative layer summaries."
                ),
                "max_quantization_rms": _max_layer_number(
                    audited_layers,
                    "local_model",
                    "noise",
                    "max_quantization_rms",
                ),
                "max_phase_noise_rad_rms": _max_layer_number(
                    audited_layers,
                    "local_model",
                    "noise",
                    "max_phase_noise_rad_rms",
                ),
                "max_drift_rms_rad": _max_layer_number(
                    audited_layers,
                    "local_model",
                    "noise",
                    "max_drift_rms_rad",
                ),
                "max_estimated_relative_error_rms": _max_layer_number(
                    audited_layers,
                    "local_model",
                    "noise",
                    "max_estimated_relative_error_rms",
                ),
            },
        },
        "model_components": extra["model_components"],
        "layers": [_model_layer_summary(layer) for layer in audited_layers],
        "published_reference": None,
        "calibration_fit": None,
        "assumptions": _model_assumptions(config),
        "exclusions": _model_exclusions(audited_layers),
        "provenance": _provenance_dict(config),
    }


def _operation_templates(
    config: TransformerLayerConfig,
) -> tuple[_OperationTemplate, ...]:
    shape = config.transformer_layer
    context_length = _attention_context_length(shape)
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
            formula="B * heads * S_query * S_context * head_dim",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=shape.head_dim,
                n=context_length,
            ),
            operation_batch_size=shape.batch_size * shape.num_heads,
            uses_model_weights=False,
            expected_macs=attention_scores_macs(shape),
        ),
        _OperationTemplate(
            key="attention_value",
            label="Attention-value",
            formula="B * heads * S_query * S_context * head_dim",
            workload=WorkloadConfig(
                type="matmul",
                m=shape.sequence_length,
                k=context_length,
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
    context_length = _attention_context_length(shape)
    execution = _operation_execution(layer_config.execution, operation)
    attention_assumption = (
        (
            "Decoder KV-cache attention accounting is enabled: attention "
            f"uses query length {shape.sequence_length} and context length "
            f"{context_length}. Cache read/write traffic is reported at the "
            "transformer-model level."
        )
        if shape.kv_cache_enabled
        else (
            "Dense attention accounting is used; decoder/causal labels do "
            "not halve attention MAC counts."
        )
    )
    non_matmul_exclusion = (
        "Non-matmul costs such as softmax, layer norm, bias adds, "
        "activations, dropout, masking, and non-matmul memory traffic are "
        "excluded. KV-cache read/write traffic is reported only in the "
        "transformer-model aggregate."
        if shape.kv_cache_enabled
        else (
            "Non-matmul costs such as softmax, layer norm, bias adds, "
            "activations, dropout, masking, KV-cache incremental decoding, "
            "and non-matmul memory traffic are excluded."
        )
    )
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
        system=layer_config.system,
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
                f"attention_context={context_length}, intermediate="
                f"{shape.mlp_intermediate_size}."
            ),
            attention_assumption,
            non_matmul_exclusion,
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
| Attention context length | {_attention_context_length(shape)} |
| KV-cache enabled | {shape.kv_cache_enabled} |
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
        "system": system_config_to_dict(expected_card.config.system),
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


def _transformer_shape_dict(shape: TransformerLayerShapeConfig) -> dict[str, int | bool]:
    return {
        "batch_size": shape.batch_size,
        "sequence_length": shape.sequence_length,
        "hidden_size": shape.hidden_size,
        "num_heads": shape.num_heads,
        "head_dim": shape.head_dim,
        "attention_context_length": _attention_context_length(shape),
        "kv_cache_enabled": shape.kv_cache_enabled,
        "mlp_intermediate_size": shape.mlp_intermediate_size,
    }


def _model_extra_accounting(
    config: TransformerModelConfig,
    layers: Sequence[TransformerModelLayerArtifact],
) -> dict[str, Any]:
    output_projection = _output_projection_component(config)
    tensor_memory = _tensor_memory_component(config)
    tensor_system = _tensor_memory_system(config, tensor_memory)

    output_workload = _dict_or_empty(output_projection.get("workload"))
    output_local = _dict_or_empty(output_projection.get("local_model"))
    output_energy = _dict_or_empty(output_local.get("energy"))
    output_memory = _dict_or_empty(output_local.get("memory_traffic"))
    output_system = _dict_or_empty(output_local.get("system"))
    output_timing = _dict_or_empty(output_local.get("timing"))
    output_counts = _dict_or_empty(output_local.get("conversion_counts"))

    output_system_tiers = _output_system_tiers(output_system)
    extra_system_tiers = {
        tier: _add_system_tiers(
            output_system_tiers[tier],
            tensor_system["tiers"][tier],
        )
        for tier in _SYSTEM_TIER_NAMES
    }
    output_system_movement = float(output_system.get("total_movement_energy_pj") or 0.0)
    output_system_total = float(output_system.get("total_system_energy_pj") or 0.0)
    output_compute_energy = float(
        output_system.get("local_compute_and_conversion_energy_pj") or 0.0
    )
    tensor_movement_energy = tensor_system["total_movement_energy_pj"]
    tensor_transfer_time_ns = tensor_system["effective_transfer_time_ns"]
    tensor_adjusted_transfer_time_ns = tensor_system[
        "calibration_adjusted_effective_transfer_time_ns"
    ]
    output_bandwidth_latency = float(
        output_system.get("bandwidth_limited_batch_latency_ns") or 0.0
    )
    output_contention_latency = float(
        output_system.get("contention_adjusted_batch_latency_ns")
        or output_bandwidth_latency
    )
    output_transfer_time = float(
        output_system.get("effective_transfer_time_ns")
        or output_system.get("max_transfer_time_ns")
        or 0.0
    )
    output_adjusted_transfer_time = float(
        output_system.get("calibration_adjusted_effective_transfer_time_ns")
        or output_system.get("contention_adjusted_effective_transfer_time_ns")
        or output_transfer_time
    )
    output_calibration_guardband = float(
        output_system.get("calibration_guardband_time_ns") or 0.0
    )
    tensor_calibration_guardband = tensor_system["calibration_guardband_time_ns"]

    return {
        "workload": {
            "macs": int(output_workload.get("macs") or 0),
            "equivalent_ops": int(output_workload.get("equivalent_ops") or 0),
            "output_elements": int(output_workload.get("output_elements") or 0),
        },
        "conversion_counts": {
            field: int(output_counts.get(field) or 0) for field in _CONVERSION_SUM_FIELDS
        },
        "memory_traffic": {
            field: int(output_memory.get(field) or 0) for field in _MEMORY_SUM_FIELDS
        },
        "energy": {
            field: float(output_energy.get(field) or 0.0) for field in _ENERGY_SUM_FIELDS
        },
        "timing": {
            "serial_batch_latency_ns": float(output_timing.get("batch_latency_ns") or 0.0),
        },
        "system": {
            "local_compute_and_conversion_energy_pj": output_compute_energy,
            "total_movement_energy_pj": output_system_movement + tensor_movement_energy,
            "total_system_energy_pj": output_system_total + tensor_movement_energy,
            "tiers": extra_system_tiers,
            "serial_transfer_time_ns": output_transfer_time + tensor_transfer_time_ns,
            "contention_adjusted_serial_transfer_time_ns": (
                output_adjusted_transfer_time + tensor_adjusted_transfer_time_ns
            ),
            "calibration_guardband_time_ns": (
                output_calibration_guardband + tensor_calibration_guardband
            ),
            "bandwidth_limited_serial_batch_latency_ns": (
                output_bandwidth_latency + tensor_transfer_time_ns
            ),
            "contention_adjusted_serial_batch_latency_ns": (
                output_contention_latency + tensor_adjusted_transfer_time_ns
            ),
        },
        "activation_memory_traffic": tensor_memory,
        "model_components": {
            "embeddings": _embedding_component(config),
            "output_projection": output_projection or None,
            "activation_memory": tensor_memory,
            "kv_cache": _kv_cache_component(config),
            "pipeline_overlap": _pipeline_component(config),
            "notes": [
                "Model components are local PhotonicBench assumptions.",
                (
                    "Output projection reuses the normal matmul evaluator when "
                    "enabled; embeddings, activation traffic, and KV-cache "
                    "traffic are tensor-memory estimates."
                ),
            ],
        },
    }


def _embedding_component(config: TransformerModelConfig) -> dict[str, Any]:
    embeddings = config.embeddings
    input_shape = _input_model_shape(config)
    bytes_per_element = _bytes_per_element(embeddings.bits_per_element)
    token_bytes = (
        input_shape.batch_size
        * input_shape.sequence_length
        * input_shape.hidden_size
        * bytes_per_element
        if embeddings.enabled and embeddings.include_token_embedding
        else 0
    )
    position_bytes = (
        input_shape.batch_size
        * input_shape.sequence_length
        * input_shape.hidden_size
        * bytes_per_element
        if embeddings.enabled and embeddings.include_position_embedding
        else 0
    )
    return {
        "enabled": embeddings.enabled,
        "vocab_size": embeddings.vocab_size,
        "include_token_embedding": embeddings.include_token_embedding,
        "include_position_embedding": embeddings.include_position_embedding,
        "bits_per_element": embeddings.bits_per_element,
        "token_embedding_read_bytes": token_bytes,
        "position_embedding_read_bytes": position_bytes,
        "total_embedding_read_bytes": token_bytes + position_bytes,
        "note": (
            "Embedding rows are modeled as local tensor reads only; no optical "
            "matmul work is assigned to lookup operations."
        ),
    }


def _output_projection_component(config: TransformerModelConfig) -> dict[str, Any]:
    projection = config.output_projection
    if not projection.enabled:
        return {}
    final_shape = _final_model_shape(config)
    if projection.vocab_size is None:
        raise ValueError("output_projection.vocab_size must be set when enabled")

    output_config = BenchmarkConfig(
        benchmark=BenchmarkMeta(
            name=f"{config.benchmark.name} - output projection",
            description=(
                "Model-level output projection generated as a local matmul "
                "assumption for the transformer-model summary."
            ),
        ),
        workload=WorkloadConfig(
            type="matmul",
            m=final_shape.sequence_length,
            k=final_shape.hidden_size,
            n=projection.vocab_size,
        ),
        device=config.device,
        timing=config.timing,
        noise=config.noise,
        execution=ExecutionConfig(
            batch_size=final_shape.batch_size,
            vector_reuse_factor=config.execution.vector_reuse_factor,
            weight_reuse_factor=config.execution.weight_reuse_factor,
            weight_stationary=config.execution.weight_stationary,
            pipeline=config.execution.pipeline,
        ),
        system=config.system,
        assumptions=(
            *config.assumptions,
            "Transformer model output projection is a local matmul assumption.",
            (
                "Output projection uses the final configured layer shape and "
                f"vocab_size={projection.vocab_size}."
            ),
            (
                "Tied token/output embedding weights are recorded as metadata "
                "only; the local movement model still counts projection weight "
                "operand traffic explicitly."
            )
            if projection.tied_to_token_embedding
            else "Output projection weights are counted as an explicit right operand.",
        ),
    )
    payload = report_to_dict(evaluate(output_config))
    return {
        "enabled": True,
        "vocab_size": projection.vocab_size,
        "tied_to_token_embedding": projection.tied_to_token_embedding,
        "workload": payload["workload"],
        "local_model": payload["local_model"],
        "assumptions": payload["assumptions"],
        "note": (
            "Output projection is included in transformer-model totals as a "
            "local matmul estimate, not as a source-paper measurement."
        ),
    }


def _tensor_memory_component(config: TransformerModelConfig) -> dict[str, Any]:
    activation = config.activation_memory
    embedding = _embedding_component(config)
    kv_cache = _kv_cache_component(config)
    if not activation.enabled and not config.embeddings.enabled and not config.kv_cache.enabled:
        return {
            "enabled": False,
            "bits_per_element": activation.bits_per_element,
            "embedding_read_bytes": 0,
            "layer_input_read_bytes": 0,
            "layer_output_write_bytes": 0,
            "attention_score_bytes": 0,
            "mlp_intermediate_bytes": 0,
            "kv_cache_read_bytes": 0,
            "kv_cache_write_bytes": 0,
            "total_tensor_read_bytes": 0,
            "total_tensor_write_bytes": 0,
            "total_tensor_bytes": 0,
            "note": "Tensor activation memory traffic is disabled.",
        }

    bytes_per_element = _bytes_per_element(activation.bits_per_element)
    layer_input_read_bytes = 0
    layer_output_write_bytes = 0
    attention_score_bytes = 0
    mlp_intermediate_bytes = 0
    if activation.enabled:
        for layer in config.layers:
            shape = layer.transformer_layer
            hidden_elements = shape.batch_size * shape.sequence_length * shape.hidden_size
            if activation.include_layer_inputs:
                layer_input_read_bytes += layer.count * hidden_elements * bytes_per_element
                layer_output_write_bytes += layer.count * hidden_elements * bytes_per_element
            if activation.include_attention_scores:
                attention_score_bytes += (
                    layer.count
                    * shape.batch_size
                    * shape.num_heads
                    * shape.sequence_length
                    * _attention_context_length(shape)
                    * bytes_per_element
                )
            if activation.include_mlp_intermediate:
                mlp_intermediate_bytes += (
                    layer.count
                    * shape.batch_size
                    * shape.sequence_length
                    * shape.mlp_intermediate_size
                    * bytes_per_element
                )

    embedding_read_bytes = int(embedding["total_embedding_read_bytes"])
    kv_cache_read_bytes = int(kv_cache["cache_read_bytes"])
    kv_cache_write_bytes = int(kv_cache["cache_write_bytes"])
    total_read = embedding_read_bytes + layer_input_read_bytes + kv_cache_read_bytes
    total_write = (
        layer_output_write_bytes
        + attention_score_bytes
        + mlp_intermediate_bytes
        + kv_cache_write_bytes
    )
    return {
        "enabled": activation.enabled or config.embeddings.enabled or config.kv_cache.enabled,
        "bits_per_element": activation.bits_per_element,
        "embedding_read_bytes": embedding_read_bytes,
        "layer_input_read_bytes": layer_input_read_bytes,
        "layer_output_write_bytes": layer_output_write_bytes,
        "attention_score_bytes": attention_score_bytes,
        "mlp_intermediate_bytes": mlp_intermediate_bytes,
        "kv_cache_read_bytes": kv_cache_read_bytes,
        "kv_cache_write_bytes": kv_cache_write_bytes,
        "total_tensor_read_bytes": total_read,
        "total_tensor_write_bytes": total_write,
        "total_tensor_bytes": total_read + total_write,
        "note": (
            "Tensor memory traffic is a local activation/KV/cache movement "
            "estimate. It is intentionally separate from converter-interface "
            "memory_traffic."
        ),
    }


def _kv_cache_component(config: TransformerModelConfig) -> dict[str, Any]:
    kv_cache = config.kv_cache
    if not kv_cache.enabled:
        return {
            "enabled": False,
            "mode": kv_cache.mode,
            "context_length": 0,
            "bits_per_element": kv_cache.bits_per_element,
            "cache_read_bytes": 0,
            "cache_write_bytes": 0,
            "note": "KV-cache mode is disabled.",
        }

    bytes_per_element = _bytes_per_element(kv_cache.bits_per_element)
    read_bytes = 0
    write_bytes = 0
    for layer in config.layers:
        shape = layer.transformer_layer
        if shape.layer_type != "decoder":
            continue
        if kv_cache.include_cache_reads:
            read_bytes += (
                layer.count
                * shape.batch_size
                * kv_cache.context_length
                * shape.hidden_size
                * 2
                * bytes_per_element
            )
        if kv_cache.include_cache_writes:
            write_bytes += (
                layer.count
                * shape.batch_size
                * shape.sequence_length
                * shape.hidden_size
                * 2
                * bytes_per_element
            )
    return {
        "enabled": True,
        "mode": kv_cache.mode,
        "context_length": kv_cache.context_length,
        "include_cache_reads": kv_cache.include_cache_reads,
        "include_cache_writes": kv_cache.include_cache_writes,
        "bits_per_element": kv_cache.bits_per_element,
        "cache_read_bytes": read_bytes,
        "cache_write_bytes": write_bytes,
        "note": (
            "Decoder KV-cache mode changes decoder attention context length in "
            "the layer formulas and separately estimates cache read/write bytes."
        ),
    }


def _tensor_memory_system(
    config: TransformerModelConfig,
    tensor_memory: dict[str, Any],
) -> dict[str, Any]:
    read_bytes = int(tensor_memory["total_tensor_read_bytes"])
    write_bytes = int(tensor_memory["total_tensor_write_bytes"])
    sram = _tier_movement(
        "sram",
        config.system.sram,
        config.system.contention,
        read_bytes,
        write_bytes,
    )
    intermediate = _tier_movement(
        "intermediate",
        config.system.intermediate,
        config.system.contention,
        read_bytes,
        write_bytes,
    )
    off_chip = _tier_movement(
        "off_chip",
        config.system.off_chip,
        config.system.contention,
        read_bytes,
        write_bytes,
    )
    tiers = {
        "sram": sram,
        "intermediate": intermediate,
        "off_chip": off_chip,
    }
    total_movement = sum(tier["total_energy_pj"] for tier in tiers.values())
    max_transfer_time = max(tier["transfer_time_ns"] for tier in tiers.values())
    serial_transfer_time = sum(tier["transfer_time_ns"] for tier in tiers.values())
    effective_transfer_time = (
        serial_transfer_time
        if config.system.memory_timing_mode == "serialized"
        else max_transfer_time
    )
    contention_adjusted_max_transfer_time = max(
        tier["contention_adjusted_transfer_time_ns"] for tier in tiers.values()
    )
    contention_adjusted_serial_transfer_time = sum(
        tier["contention_adjusted_transfer_time_ns"] for tier in tiers.values()
    )
    contention_adjusted_effective_transfer_time = (
        contention_adjusted_serial_transfer_time
        if config.system.memory_timing_mode == "serialized"
        else contention_adjusted_max_transfer_time
    )
    calibration_adjusted_effective_transfer_time = (
        contention_adjusted_effective_transfer_time
        * (1.0 + config.system.contention.calibration_overhead_fraction)
    )
    calibration_guardband_time = (
        calibration_adjusted_effective_transfer_time
        - contention_adjusted_effective_transfer_time
    )
    return {
        "tiers": tiers,
        "total_movement_energy_pj": total_movement,
        "serial_transfer_time_ns": serial_transfer_time,
        "effective_transfer_time_ns": effective_transfer_time,
        "contention_adjusted_serial_transfer_time_ns": (
            contention_adjusted_serial_transfer_time
        ),
        "contention_adjusted_effective_transfer_time_ns": (
            contention_adjusted_effective_transfer_time
        ),
        "calibration_adjusted_effective_transfer_time_ns": (
            calibration_adjusted_effective_transfer_time
        ),
        "calibration_guardband_time_ns": calibration_guardband_time,
    }


def _aggregate_system_derived_metrics(
    *,
    tiers: dict[str, dict[str, Any]],
    contention: dict[str, Any],
    total_equivalent_ops: int,
    local_compute_and_conversion_energy_pj: float,
    total_movement_energy_pj: float,
    total_system_energy_pj: float,
    serial_transfer_time_ns: float,
    contention_only_transfer_time_ns: float,
    contention_adjusted_serial_transfer_time_ns: float,
    serial_batch_latency_ns: float,
    bandwidth_limited_serial_batch_latency_ns: float,
    contention_adjusted_serial_batch_latency_ns: float,
) -> dict[str, Any]:
    total_hierarchy_bytes = sum(float(tier["total_bytes"]) for tier in tiers.values())
    calibration_guardband_time_ns = (
        contention_adjusted_serial_transfer_time_ns - contention_only_transfer_time_ns
    )
    _annotate_aggregate_system_tiers(
        tiers,
        total_hierarchy_bytes=total_hierarchy_bytes,
        total_movement_energy_pj=total_movement_energy_pj,
        total_system_energy_pj=total_system_energy_pj,
        serial_transfer_time_ns=serial_transfer_time_ns,
        contention_adjusted_serial_transfer_time_ns=(
            contention_adjusted_serial_transfer_time_ns
        ),
        serial_batch_latency_ns=serial_batch_latency_ns,
    )
    dominant_traffic_tier = max(
        tiers.values(),
        key=lambda tier: float(tier.get("traffic_share") or 0.0),
    )
    dominant_system_energy_tier = max(
        tiers.values(),
        key=lambda tier: float(tier.get("system_energy_share") or 0.0),
    )
    dominant_movement_energy_tier = max(
        tiers.values(),
        key=lambda tier: float(tier.get("movement_energy_share") or 0.0),
    )
    nominal_memory_bottleneck_tier = max(
        tiers.values(),
        key=lambda tier: float(tier.get("transfer_time_ns") or 0.0),
    )
    contention_memory_bottleneck_tier = max(
        tiers.values(),
        key=lambda tier: float(
            tier.get("calibration_adjusted_transfer_time_ns")
            or tier.get("contention_adjusted_transfer_time_ns")
            or 0.0
        ),
    )
    bandwidth_saturation_tier = max(
        tiers.values(),
        key=lambda tier: float(tier.get("contention_bandwidth_utilization") or 0.0),
    )
    traffic_tiers = [
        tier for tier in tiers.values() if float(tier.get("total_bytes") or 0.0) > 0.0
    ]
    return {
        "total_hierarchy_bytes": total_hierarchy_bytes,
        "hierarchy_equivalent_ops_per_byte": _safe_divide(
            total_equivalent_ops,
            total_hierarchy_bytes,
        ),
        "movement_energy_per_hierarchy_byte_pj": _safe_divide(
            total_movement_energy_pj,
            total_hierarchy_bytes,
        ),
        "local_compute_and_conversion_energy_share": _safe_divide(
            local_compute_and_conversion_energy_pj,
            total_system_energy_pj,
        ),
        "movement_to_compute_energy_ratio": _safe_divide(
            total_movement_energy_pj,
            local_compute_and_conversion_energy_pj,
        ),
        "sram_traffic_share": _safe_divide(
            float(tiers["sram"]["total_bytes"]),
            total_hierarchy_bytes,
        ),
        "intermediate_traffic_share": _safe_divide(
            float(tiers["intermediate"]["total_bytes"]),
            total_hierarchy_bytes,
        ),
        "off_chip_traffic_share": _safe_divide(
            float(tiers["off_chip"]["total_bytes"]),
            total_hierarchy_bytes,
        ),
        "contention_bandwidth_derate_factor": _safe_divide(
            float(contention["arbitration_efficiency"]),
            float(contention["shared_bandwidth_clients"]),
        ),
        "calibration_guardband_time_ns": calibration_guardband_time_ns,
        "contention_transfer_overhead_fraction": _safe_ratio_overhead(
            contention_only_transfer_time_ns,
            serial_transfer_time_ns,
        ),
        "total_transfer_overhead_fraction": _safe_ratio_overhead(
            contention_adjusted_serial_transfer_time_ns,
            serial_transfer_time_ns,
        ),
        "effective_loaded_bandwidth_bytes_per_ns": _safe_divide(
            total_hierarchy_bytes,
            serial_transfer_time_ns,
        ),
        "contention_only_loaded_bandwidth_bytes_per_ns": _safe_divide(
            total_hierarchy_bytes,
            contention_only_transfer_time_ns,
        ),
        "contention_adjusted_loaded_bandwidth_bytes_per_ns": _safe_divide(
            total_hierarchy_bytes,
            contention_adjusted_serial_transfer_time_ns,
        ),
        "transfer_to_compute_time_ratio": _safe_divide(
            serial_transfer_time_ns,
            serial_batch_latency_ns,
        ),
        "bandwidth_pressure_ratio": _safe_divide(
            bandwidth_limited_serial_batch_latency_ns,
            serial_batch_latency_ns,
        ),
        "contention_adjusted_transfer_to_compute_time_ratio": _safe_divide(
            contention_adjusted_serial_transfer_time_ns,
            serial_batch_latency_ns,
        ),
        "contention_pressure_ratio": _safe_divide(
            contention_adjusted_serial_batch_latency_ns,
            serial_batch_latency_ns,
        ),
        "dominant_traffic_tier": str(dominant_traffic_tier.get("name") or "tier"),
        "dominant_system_energy_component": (
            "local_compute_and_conversion"
            if local_compute_and_conversion_energy_pj
            >= float(dominant_system_energy_tier.get("total_energy_pj") or 0.0)
            else str(dominant_system_energy_tier.get("name") or "tier")
        ),
        "dominant_movement_energy_tier": str(
            dominant_movement_energy_tier.get("name") or "tier"
        ),
        "nominal_memory_bottleneck_tier": str(
            nominal_memory_bottleneck_tier.get("name") or "tier"
        ),
        "contention_memory_bottleneck_tier": str(
            contention_memory_bottleneck_tier.get("name") or "tier"
        ),
        "max_tier_nominal_transfer_pressure_ratio": max(
            float(tier.get("nominal_transfer_pressure_ratio") or 0.0)
            for tier in tiers.values()
        ),
        "max_tier_contention_adjusted_transfer_pressure_ratio": max(
            float(tier.get("contention_adjusted_transfer_pressure_ratio") or 0.0)
            for tier in tiers.values()
        ),
        "max_tier_movement_energy_share": float(
            dominant_movement_energy_tier.get("movement_energy_share") or 0.0
        ),
        "max_tier_system_energy_share": float(
            dominant_system_energy_tier.get("system_energy_share") or 0.0
        ),
        "contention_bandwidth_saturation_tier": str(
            bandwidth_saturation_tier.get("name") or "tier"
        ),
        "max_tier_contention_bandwidth_utilization": float(
            bandwidth_saturation_tier.get("contention_bandwidth_utilization") or 0.0
        ),
        "min_tier_contention_bandwidth_headroom_ratio": (
            min(
                float(tier.get("contention_bandwidth_headroom_ratio") or 0.0)
                for tier in traffic_tiers
            )
            if traffic_tiers
            else 0.0
        ),
    }


def _annotate_aggregate_system_tiers(
    tiers: dict[str, dict[str, Any]],
    *,
    total_hierarchy_bytes: float,
    total_movement_energy_pj: float,
    total_system_energy_pj: float,
    serial_transfer_time_ns: float,
    contention_adjusted_serial_transfer_time_ns: float,
    serial_batch_latency_ns: float,
) -> None:
    for tier in tiers.values():
        calibration_adjusted_transfer_time_ns = float(
            tier.get("calibration_adjusted_transfer_time_ns")
            or tier.get("contention_adjusted_transfer_time_ns")
            or 0.0
        )
        tier["calibration_adjusted_transfer_time_ns"] = (
            calibration_adjusted_transfer_time_ns
        )
        tier["traffic_share"] = _safe_divide(
            float(tier.get("total_bytes") or 0.0),
            total_hierarchy_bytes,
        )
        tier["movement_energy_share"] = _safe_divide(
            float(tier.get("total_energy_pj") or 0.0),
            total_movement_energy_pj,
        )
        tier["system_energy_share"] = _safe_divide(
            float(tier.get("total_energy_pj") or 0.0),
            total_system_energy_pj,
        )
        tier["nominal_transfer_share"] = _safe_divide(
            float(tier.get("transfer_time_ns") or 0.0),
            serial_transfer_time_ns,
        )
        tier["contention_adjusted_transfer_share"] = _safe_divide(
            calibration_adjusted_transfer_time_ns,
            contention_adjusted_serial_transfer_time_ns,
        )
        tier["nominal_transfer_pressure_ratio"] = _safe_divide(
            float(tier.get("transfer_time_ns") or 0.0),
            serial_batch_latency_ns,
        )
        tier["contention_adjusted_transfer_pressure_ratio"] = _safe_divide(
            calibration_adjusted_transfer_time_ns,
            serial_batch_latency_ns,
        )
        required_bandwidth = _safe_divide(
            float(tier.get("total_bytes") or 0.0),
            serial_batch_latency_ns,
        )
        effective_bandwidth = float(tier.get("effective_bandwidth_bytes_per_ns") or 0.0)
        tier["compute_window_required_bandwidth_bytes_per_ns"] = required_bandwidth
        tier["contention_bandwidth_utilization"] = _safe_divide(
            required_bandwidth,
            effective_bandwidth,
        )
        tier["contention_bandwidth_headroom_bytes_per_ns"] = (
            effective_bandwidth - required_bandwidth
        )
        tier["contention_bandwidth_headroom_ratio"] = _safe_divide(
            effective_bandwidth,
            required_bandwidth,
        )


def _safe_divide(numerator: float, denominator: float) -> float:
    return numerator / denominator if denominator else 0.0


def _safe_ratio_overhead(adjusted: float, baseline: float) -> float:
    return max(adjusted / baseline - 1.0, 0.0) if baseline else 0.0


def _tier_movement(
    name: str,
    tier,
    contention,
    read_bytes: int,
    write_bytes: int,
) -> dict[str, Any]:
    tier_read_bytes = read_bytes * tier.read_fraction
    tier_write_bytes = write_bytes * tier.write_fraction
    total_bytes = tier_read_bytes + tier_write_bytes
    effective_bandwidth = (
        tier.bandwidth_bytes_per_ns
        * contention.arbitration_efficiency
        / contention.shared_bandwidth_clients
    )
    return {
        "name": name,
        "read_bytes": tier_read_bytes,
        "write_bytes": tier_write_bytes,
        "total_bytes": total_bytes,
        "read_energy_pj": tier_read_bytes * tier.read_energy_pj_per_byte,
        "write_energy_pj": tier_write_bytes * tier.write_energy_pj_per_byte,
        "total_energy_pj": (
            tier_read_bytes * tier.read_energy_pj_per_byte
            + tier_write_bytes * tier.write_energy_pj_per_byte
        ),
        "bandwidth_bytes_per_ns": tier.bandwidth_bytes_per_ns,
        "effective_bandwidth_bytes_per_ns": effective_bandwidth,
        "transfer_time_ns": total_bytes / tier.bandwidth_bytes_per_ns,
        "contention_adjusted_transfer_time_ns": total_bytes / effective_bandwidth,
        "calibration_adjusted_transfer_time_ns": (
            total_bytes
            / effective_bandwidth
            * (1.0 + contention.calibration_overhead_fraction)
        ),
    }


def _output_system_tiers(output_system: dict[str, Any]) -> dict[str, dict[str, Any]]:
    tiers = _dict_or_empty(output_system.get("tiers"))
    return {
        tier: _system_tier_or_zero(_dict_or_empty(tiers.get(tier)), tier)
        for tier in _SYSTEM_TIER_NAMES
    }


def _system_tier_or_zero(raw: dict[str, Any], name: str) -> dict[str, Any]:
    return {
        "name": name,
        **{field: float(raw.get(field) or 0.0) for field in _SYSTEM_TIER_SUM_FIELDS},
        **{
            field: float(raw.get(field) or 0.0)
            for field in _SYSTEM_TIER_CAPACITY_FIELDS
        },
    }


def _add_system_tiers(left: dict[str, Any], right: dict[str, Any]) -> dict[str, Any]:
    return {
        "name": str(left.get("name") or right.get("name") or "tier"),
        **{
            field: float(left.get(field) or 0.0) + float(right.get(field) or 0.0)
            for field in _SYSTEM_TIER_SUM_FIELDS
        },
        **{
            field: _min_positive(
                float(left.get(field) or 0.0),
                float(right.get(field) or 0.0),
            )
            for field in _SYSTEM_TIER_CAPACITY_FIELDS
        },
    }


def _min_positive(*values: float) -> float:
    positive = [value for value in values if value > 0.0]
    return min(positive) if positive else 0.0


def _pipeline_component(config: TransformerModelConfig) -> dict[str, Any]:
    pipeline = config.pipeline
    return {
        "overlap_enabled": pipeline.overlap_enabled,
        "overlap_fraction": pipeline.overlap_fraction,
        "label": pipeline.label,
        "note": (
            "Pipeline overlap is an optional local latency assumption. Serial "
            "latency fields remain present and unchanged."
        ),
    }


def _model_overlap_timing(
    config: TransformerModelConfig,
    *,
    serial_batch_latency_ns: float,
    bandwidth_limited_serial_batch_latency_ns: float,
    max_per_layer_serial_batch_latency_ns: float,
    max_per_layer_bandwidth_limited_batch_latency_ns: float,
    total_equivalent_ops: int,
) -> dict[str, Any]:
    pipeline = config.pipeline
    if not pipeline.overlap_enabled:
        return {
            "schedule_assumption": "serial",
            "overlap_fraction": 0.0,
            "overlap_adjusted_batch_latency_ns": serial_batch_latency_ns,
            "overlap_adjusted_effective_equivalent_ops_per_second": _per_second(
                total_equivalent_ops,
                serial_batch_latency_ns,
            ),
            "bandwidth_limited_overlap_adjusted_batch_latency_ns": (
                bandwidth_limited_serial_batch_latency_ns
            ),
            "bandwidth_limited_overlap_adjusted_equivalent_ops_per_second": _per_second(
                total_equivalent_ops,
                bandwidth_limited_serial_batch_latency_ns,
            ),
            "schedule_note": (
                "No model-level overlap assumption is enabled; overlap-adjusted "
                "fields equal serial fields."
            ),
        }

    adjusted = max(
        max_per_layer_serial_batch_latency_ns,
        serial_batch_latency_ns * (1.0 - pipeline.overlap_fraction),
    )
    bandwidth_adjusted = max(
        max_per_layer_bandwidth_limited_batch_latency_ns,
        bandwidth_limited_serial_batch_latency_ns * (1.0 - pipeline.overlap_fraction),
    )
    return {
        "schedule_assumption": pipeline.label,
        "overlap_fraction": pipeline.overlap_fraction,
        "overlap_adjusted_batch_latency_ns": adjusted,
        "overlap_adjusted_effective_equivalent_ops_per_second": _per_second(
            total_equivalent_ops,
            adjusted,
        ),
        "bandwidth_limited_overlap_adjusted_batch_latency_ns": bandwidth_adjusted,
        "bandwidth_limited_overlap_adjusted_equivalent_ops_per_second": _per_second(
            total_equivalent_ops,
            bandwidth_adjusted,
        ),
        "schedule_note": (
            "Overlap-adjusted latency is a local assumption derived from the "
            "configured overlap_fraction and clamped to at least the slowest "
            "representative layer latency."
        ),
    }


def _input_model_shape(config: TransformerModelConfig) -> TransformerLayerShapeConfig:
    return config.layers[0].transformer_layer


def _final_model_shape(config: TransformerModelConfig) -> TransformerLayerShapeConfig:
    return config.layers[-1].transformer_layer


def _bytes_per_element(bits: int) -> int:
    return math.ceil(bits / 8)


def _dict_or_empty(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _audit_transformer_model_layers(
    config: TransformerModelConfig,
    layers: Sequence[TransformerModelLayerArtifact],
) -> tuple[TransformerModelLayerArtifact, ...]:
    if len(layers) != len(config.layers):
        raise ValueError(
            f"expected {len(config.layers)} transformer model layer summaries, "
            f"got {len(layers)}"
        )

    audited = []
    for expected, actual in zip(config.layers, layers, strict=True):
        source = actual.json_report
        if actual.name != expected.name:
            raise ValueError(
                f"{source}: layer name is {actual.name!r}; expected {expected.name!r}"
            )
        if actual.count != expected.count:
            raise ValueError(
                f"{source}: layer count is {actual.count}; expected {expected.count}"
            )
        schema_version = _required_str(actual.payload, "schema_version", source=source)
        if schema_version != TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION:
            raise ValueError(
                f"{source} has schema_version {schema_version!r}; expected "
                f"{TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION!r}"
            )
        artifact_type = _required_str(actual.payload, "artifact_type", source=source)
        if artifact_type != TRANSFORMER_LAYER_ARTIFACT_TYPE:
            raise ValueError(
                f"{source} has artifact_type {artifact_type!r}; expected "
                f"{TRANSFORMER_LAYER_ARTIFACT_TYPE!r}"
            )
        workload_type = _required_str(actual.payload, "workload", "type", source=source)
        if workload_type != "transformer_layer":
            raise ValueError(f"{source}: workload.type must be 'transformer_layer'")

        expected_shape = _transformer_shape_dict(expected.transformer_layer)
        actual_shape = _required_dict(
            actual.payload,
            "transformer_layer",
            "shape",
            source=source,
        )
        if actual_shape != expected_shape:
            raise ValueError(
                f"{source}: transformer_layer.shape is {actual_shape!r}; "
                f"expected {expected_shape!r}"
            )
        audited.append(actual)

    return tuple(audited)


def _weighted_layer_int(
    layers: Sequence[TransformerModelLayerArtifact],
    *keys: str,
) -> int:
    return sum(
        layer.count * _required_int(layer.payload, *keys, source=layer.json_report)
        for layer in layers
    )


def _weighted_layer_number(
    layers: Sequence[TransformerModelLayerArtifact],
    *keys: str,
) -> float:
    return sum(
        layer.count * _required_number(layer.payload, *keys, source=layer.json_report)
        for layer in layers
    )


def _max_layer_number(
    layers: Sequence[TransformerModelLayerArtifact],
    *keys: str,
) -> float:
    return max(
        _required_number(layer.payload, *keys, source=layer.json_report)
        for layer in layers
    )


def _weighted_model_system_tier(
    layers: Sequence[TransformerModelLayerArtifact],
    tier: str,
) -> dict[str, Any]:
    return {
        "name": tier,
        **{
            field: sum(
                layer.count
                * _required_number(
                    layer.payload,
                    "local_model",
                    "system",
                    "tiers",
                    tier,
                    field,
                    source=layer.json_report,
                )
                for layer in layers
            )
            for field in _SYSTEM_TIER_SUM_FIELDS
        },
        **{
            field: _min_positive(
                *[
                    _required_number(
                        layer.payload,
                        "local_model",
                        "system",
                        "tiers",
                        tier,
                        field,
                        source=layer.json_report,
                    )
                    for layer in layers
                ]
            )
            for field in _SYSTEM_TIER_CAPACITY_FIELDS
        },
    }


def _model_layer_summary(layer: TransformerModelLayerArtifact) -> dict[str, Any]:
    workload = _required_dict(layer.payload, "workload", source=layer.json_report)
    local_model = _required_dict(
        layer.payload,
        "local_model",
        source=layer.json_report,
    )
    matmuls = _required_list(layer.payload, "matmuls", source=layer.json_report)
    macs = _required_int(layer.payload, "workload", "macs", source=layer.json_report)
    equivalent_ops = _required_int(
        layer.payload,
        "workload",
        "equivalent_ops",
        source=layer.json_report,
    )
    return {
        "name": layer.name,
        "count": layer.count,
        "json_report": layer.json_report,
        "transformer_layer": _required_dict(
            layer.payload,
            "transformer_layer",
            source=layer.json_report,
        ),
        "workload": workload,
        "weighted_macs": layer.count * macs,
        "weighted_equivalent_ops": layer.count * equivalent_ops,
        "local_model": local_model,
        "matmul_reports": [
            _required_str(matmul, "json_report", source=layer.json_report)
            for matmul in matmuls
            if isinstance(matmul, dict)
        ],
    }


def _model_aggregate_semantics() -> dict[str, str]:
    return {
        "source": (
            "Generated from transformer-layer aggregate JSON summaries emitted "
            "by the transformer-model command."
        ),
        "layer_counts": (
            "Each layer spec is generated once as decomposed transformer-layer "
            "artifacts and multiplied by its configured count."
        ),
        "energy": (
            "Additive layer energy fields are multiplied by layer count and "
            "summed; per-MAC and per-op fields are recomputed from model totals."
        ),
        "memory_traffic": (
            "Layer interface traffic is multiplied by layer count and summed. "
            "Output projection interface traffic is added when enabled. "
            "Activation tensor and KV-cache traffic are reported separately."
        ),
        "activation_memory_traffic": (
            "Embedding reads, activation tensor materialization, and KV-cache "
            "read/write bytes are local model-level assumptions outside the "
            "converter-interface traffic table."
        ),
        "system": (
            "Layer system movement estimates are multiplied by layer count and "
            "summed over explicit SRAM, intermediate/cache, and off-chip tiers. "
            "Output projection and tensor-memory movement are added when configured. "
            "Bandwidth-limited and contention-adjusted timing are serial "
            "accounting, not a measured full-model scheduler."
        ),
        "timing": (
            "serial_* timing fields assume weighted layer summaries execute one "
            "after another. Overlap-adjusted timing fields are optional local "
            "assumptions and do not replace the serial fields."
        ),
        "noise": (
            "Noise remains non-additive. Model-level noise fields are maxima "
            "over representative layer summaries."
        ),
    }


def _model_assumptions(config: TransformerModelConfig) -> list[str]:
    return [
        *config.assumptions,
        (
            "Full transformer model JSON is generated from representative "
            "transformer-layer summaries and configured layer counts."
        ),
        (
            "Layer counts multiply additive energy, movement, conversion, memory, "
            "and serial timing fields."
        ),
        (
            "Embeddings, output projection, activation traffic, KV-cache traffic, "
            "and overlap timing are explicit local assumptions when configured."
        ),
        (
            "The model summary preserves decomposed layer/card provenance through "
            "layers[].json_report and layers[].matmul_reports."
        ),
        (
            "Published calibration targets are rejected for transformer-model "
            "configs so model totals remain local estimates."
        ),
    ]


def _model_exclusions(
    layers: Sequence[TransformerModelLayerArtifact],
) -> list[str]:
    exclusions: list[str] = []
    for layer in layers:
        for exclusion in _required_list(
            layer.payload,
            "exclusions",
            source=layer.json_report,
        ):
            if isinstance(exclusion, str) and exclusion not in exclusions:
                exclusions.append(exclusion)
    return exclusions


def _markdown_mapping(mapping: dict[str, str]) -> str:
    return "\n".join(f"- `{key}`: {value}" for key, value in mapping.items())


def _format_metric(value: Any) -> str:
    if isinstance(value, int | float) and not isinstance(value, bool):
        return f"{float(value):.6g}"
    return str(value)


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
        "memory_traffic": (
            "Interface memory traffic is summed from decomposed cards and "
            "operational intensity is recomputed from aggregate MAC/equivalent-op "
            "counts. It is not a full memory hierarchy simulation."
        ),
        "system": (
            "System movement energy/timing is summed from decomposed card "
            "estimates over explicit SRAM, intermediate/cache, and off-chip tiers. "
            "Bandwidth-limited and contention-adjusted serial timing are sums "
            "of decomposed batch latencies, not fused scheduler claims."
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
            "Layer system movement energy, bandwidth-limited timing, and "
            "contention-adjusted timing are sums of decomposed local model card "
            "values."
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


def _transformer_exclusions(config: TransformerLayerConfig) -> list[str]:
    exclusions = [
        "softmax",
        "layer_norm",
        "bias_adds",
        "activation_functions",
        "dropout",
        "masking",
        "causal_triangular_halving",
        "non_matmul_memory_traffic",
    ]
    if not config.transformer_layer.kv_cache_enabled:
        exclusions.insert(6, "kv_cache_incremental_decoding")
    return exclusions


def _provenance_dict(
    config: TransformerLayerConfig | TransformerModelConfig,
) -> dict[str, str] | None:
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


def _sum_local_memory(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> int:
    return sum(
        _required_int(
            audit.json_card.payload,
            "local_model",
            "memory_traffic",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _sum_local_system(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> float:
    return sum(
        _required_number(
            audit.json_card.payload,
            "local_model",
            "system",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _max_local_system(
    audits: Sequence[TransformerLayerCardAudit],
    field: str,
) -> float:
    return max(
        _required_number(
            audit.json_card.payload,
            "local_model",
            "system",
            field,
            source=audit.json_card.path,
        )
        for audit in audits
    )


def _aggregate_system_tier(
    audits: Sequence[TransformerLayerCardAudit],
    tier: str,
) -> dict[str, Any]:
    return {
        "name": tier,
        **{
            field: sum(
                _required_number(
                    audit.json_card.payload,
                    "local_model",
                    "system",
                    "tiers",
                    tier,
                    field,
                    source=audit.json_card.path,
                )
                for audit in audits
            )
            for field in _SYSTEM_TIER_SUM_FIELDS
        },
        **{
            field: _min_positive(
                *[
                    _required_number(
                        audit.json_card.payload,
                        "local_model",
                        "system",
                        "tiers",
                        tier,
                        field,
                        source=audit.json_card.path,
                    )
                    for audit in audits
                ]
            )
            for field in _SYSTEM_TIER_CAPACITY_FIELDS
        },
    }


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
