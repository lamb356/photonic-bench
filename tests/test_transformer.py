import copy
import json
import subprocess
import sys
from pathlib import Path

import pytest

from photonic_bench.comparison import ComparisonCard
from photonic_bench.config import (
    BenchmarkMeta,
    ExecutionConfig,
    TransformerLayerConfig,
    TransformerLayerShapeConfig,
    TransformerModelEmbeddingsConfig,
    TransformerModelOutputProjectionConfig,
    TransformerModelConfig,
    TransformerModelLayerConfig,
    load_transformer_layer_config,
    load_transformer_model_config,
)
from photonic_bench.json_report import report_to_dict
from photonic_bench.model import evaluate
from photonic_bench.transformer import (
    TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION,
    TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION,
    TransformerModelLayerArtifact,
    attention_scores_macs,
    attention_value_macs,
    build_transformer_layer_plan,
    mlp_down_projection_macs,
    mlp_up_projection_macs,
    qkv_projection_macs,
    slugify,
    transformer_layer_config_from_model,
    transformer_layer_report_to_dict,
    transformer_model_report_to_dict,
)
from tests.test_model import unit_config


def small_transformer_layer_config() -> TransformerLayerConfig:
    base = unit_config()
    return TransformerLayerConfig(
        benchmark=BenchmarkMeta(
            name="small transformer sanity layer",
            description="Small transformer layer for exact formula tests.",
        ),
        transformer_layer=TransformerLayerShapeConfig(
            batch_size=2,
            sequence_length=4,
            hidden_size=8,
            num_heads=2,
            head_dim=4,
            mlp_intermediate_size=16,
            layer_type="encoder",
            attention_mode="dense",
        ),
        device=base.device,
        timing=base.timing,
        noise=base.noise,
        execution=ExecutionConfig(weight_stationary=True),
        assumptions=("Synthetic transformer shape for tests.",),
    )


def small_transformer_json_cards(
    config: TransformerLayerConfig | None = None,
) -> list[ComparisonCard]:
    layer_config = config or small_transformer_layer_config()
    plan = build_transformer_layer_plan(layer_config)
    return [
        ComparisonCard(
            path=Path(f"tiny_{card.key}.json"),
            payload=report_to_dict(evaluate(card.config)),
        )
        for card in plan.cards
    ]


def small_transformer_model_config() -> TransformerModelConfig:
    base = small_transformer_layer_config()
    return TransformerModelConfig(
        benchmark=BenchmarkMeta(
            name="small transformer model",
            description="Small counted transformer model for exact tests.",
        ),
        layers=(
            TransformerModelLayerConfig(
                name="encoder_block",
                count=3,
                transformer_layer=base.transformer_layer,
            ),
        ),
        device=base.device,
        timing=base.timing,
        noise=base.noise,
        execution=base.execution,
        system=base.system,
        assumptions=("Synthetic full-model shape for tests.",),
    )


def small_transformer_model_layer_artifacts(
    config: TransformerModelConfig | None = None,
) -> list[TransformerModelLayerArtifact]:
    model_config = config or small_transformer_model_config()
    artifacts = []
    for layer in model_config.layers:
        layer_config = transformer_layer_config_from_model(model_config, layer)
        cards = small_transformer_json_cards(layer_config)
        payload = transformer_layer_report_to_dict(layer_config, cards)
        artifacts.append(
            TransformerModelLayerArtifact(
                name=layer.name,
                count=layer.count,
                json_report=f"{layer.name}/{layer.name}_layer_summary.json",
                payload=payload,
            )
        )
    return artifacts


def test_transformer_formula_helpers_match_standard_counts() -> None:
    shape = small_transformer_layer_config().transformer_layer

    assert qkv_projection_macs(shape) == 3 * 2 * 4 * 8 * 8
    assert attention_scores_macs(shape) == 2 * 2 * 4 * 4 * 4
    assert attention_value_macs(shape) == 2 * 2 * 4 * 4 * 4
    assert mlp_up_projection_macs(shape) == 2 * 4 * 8 * 16
    assert mlp_down_projection_macs(shape) == 2 * 4 * 16 * 8


def test_transformer_layer_plan_builds_decomposed_matmul_cards() -> None:
    plan = build_transformer_layer_plan(small_transformer_layer_config())

    expected_macs = {
        "qkv_projection": 1536,
        "attention_scores": 256,
        "attention_value": 256,
        "mlp_up_projection": 1024,
        "mlp_down_projection": 1024,
    }
    assert [card.key for card in plan.cards] == list(expected_macs)
    assert plan.total_macs == 4096
    assert plan.total_equivalent_ops == 8192

    for card in plan.cards:
        result = evaluate(card.config)
        assert result.macs == expected_macs[card.key]
        assert result.equivalent_ops == 2 * expected_macs[card.key]
        assert card.expected_macs == expected_macs[card.key]
        assert card.expected_equivalent_ops == 2 * expected_macs[card.key]

    qkv_card = plan.cards[0].config
    scores_card = plan.cards[1].config
    assert qkv_card.workload.m == 4
    assert qkv_card.workload.k == 8
    assert qkv_card.workload.n == 24
    assert qkv_card.execution.batch_size == 2
    assert qkv_card.execution.weight_stationary is True
    assert scores_card.workload.m == 4
    assert scores_card.workload.k == 4
    assert scores_card.workload.n == 4
    assert scores_card.execution.batch_size == 4
    assert scores_card.execution.weight_stationary is False
    assert scores_card.execution.vector_reuse_factor == 1
    assert scores_card.execution.weight_reuse_factor == 1


def test_transformer_layer_report_to_dict_aggregates_decomposed_json_cards() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)

    payload = transformer_layer_report_to_dict(config, cards)

    assert payload["schema_version"] == TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION
    assert payload["artifact_type"] == "transformer_layer_aggregate"
    assert payload["transformer_layer"]["shape"] == {
        "batch_size": 2,
        "sequence_length": 4,
        "hidden_size": 8,
        "num_heads": 2,
        "head_dim": 4,
        "attention_context_length": 4,
        "kv_cache_enabled": False,
        "mlp_intermediate_size": 16,
    }
    assert payload["workload"] == {
        "type": "transformer_layer",
        "matmul_count": 5,
        "macs": 4096,
        "equivalent_ops": 8192,
        "output_elements": 512,
    }
    assert payload["formula_audit"]["mac_total_matches_decomposed_json"] is True
    assert (
        payload["formula_audit"]["equivalent_ops_total_matches_decomposed_json"]
        is True
    )
    assert [row["operation_key"] for row in payload["formula_audit"]["rows"]] == [
        "qkv_projection",
        "attention_scores",
        "attention_value",
        "mlp_up_projection",
        "mlp_down_projection",
    ]
    assert payload["local_model"]["energy"]["total_pj"] == pytest.approx(
        sum(card.payload["local_model"]["energy"]["total_pj"] for card in cards)
    )
    assert payload["local_model"]["energy"]["energy_per_op_pj"] == pytest.approx(
        payload["local_model"]["energy"]["total_pj"] / 8192
    )
    assert payload["local_model"]["memory_traffic"][
        "total_interface_bytes"
    ] == sum(
        card.payload["local_model"]["memory_traffic"]["total_interface_bytes"]
        for card in cards
    )
    assert payload["local_model"]["memory_traffic"][
        "equivalent_ops_per_byte"
    ] == pytest.approx(
        8192 / payload["local_model"]["memory_traffic"]["total_interface_bytes"]
    )
    assert payload["local_model"]["system"]["total_movement_energy_pj"] == pytest.approx(
        sum(
            card.payload["local_model"]["system"]["total_movement_energy_pj"]
            for card in cards
        )
    )
    assert payload["local_model"]["system"]["total_system_energy_pj"] == pytest.approx(
        sum(
            card.payload["local_model"]["system"]["total_system_energy_pj"]
            for card in cards
        )
    )
    assert payload["local_model"]["system"]["system_energy_per_op_pj"] == pytest.approx(
        payload["local_model"]["system"]["total_system_energy_pj"] / 8192
    )
    assert payload["local_model"]["system"]["tiers"]["sram"][
        "total_energy_pj"
    ] == pytest.approx(
        sum(
            card.payload["local_model"]["system"]["tiers"]["sram"]["total_energy_pj"]
            for card in cards
        )
    )
    assert payload["local_model"]["system"][
        "bandwidth_limited_serial_batch_latency_ns"
    ] == pytest.approx(
        sum(
            card.payload["local_model"]["system"][
                "bandwidth_limited_batch_latency_ns"
            ]
            for card in cards
        )
    )
    system = payload["local_model"]["system"]
    assert system["total_hierarchy_bytes"] == pytest.approx(
        sum(
            card.payload["local_model"]["system"]["total_hierarchy_bytes"]
            for card in cards
        )
    )
    assert system["hierarchy_equivalent_ops_per_byte"] == pytest.approx(
        payload["workload"]["equivalent_ops"] / system["total_hierarchy_bytes"]
    )
    assert system["movement_energy_per_hierarchy_byte_pj"] == pytest.approx(
        system["total_movement_energy_pj"] / system["total_hierarchy_bytes"]
    )
    assert (
        system["sram_traffic_share"]
        + system["intermediate_traffic_share"]
        + system["off_chip_traffic_share"]
    ) == pytest.approx(1.0)
    assert sum(tier["traffic_share"] for tier in system["tiers"].values()) == (
        pytest.approx(1.0)
    )
    assert sum(tier["movement_energy_share"] for tier in system["tiers"].values()) == (
        pytest.approx(1.0)
    )
    assert system["dominant_movement_energy_tier"] == "off_chip"
    assert system["contention_memory_bottleneck_tier"] == "off_chip"
    assert system["max_tier_contention_adjusted_transfer_pressure_ratio"] == (
        pytest.approx(
            max(
                tier["contention_adjusted_transfer_pressure_ratio"]
                for tier in system["tiers"].values()
            )
        )
    )
    assert system["contention_bandwidth_derate_factor"] == pytest.approx(1.0)
    assert system["effective_loaded_bandwidth_bytes_per_ns"] == pytest.approx(
        system["total_hierarchy_bytes"] / system["serial_transfer_time_ns"]
    )
    assert system[
        "contention_adjusted_loaded_bandwidth_bytes_per_ns"
    ] == pytest.approx(
        system["total_hierarchy_bytes"]
        / system["contention_adjusted_serial_transfer_time_ns"]
    )
    assert system["bandwidth_pressure_ratio"] == pytest.approx(
        system["bandwidth_limited_serial_batch_latency_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert system["transfer_to_compute_time_ratio"] == pytest.approx(
        system["serial_transfer_time_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert system["contention_pressure_ratio"] == pytest.approx(
        system["contention_adjusted_serial_batch_latency_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert system["contention_adjusted_transfer_to_compute_time_ratio"] == pytest.approx(
        system["contention_adjusted_serial_transfer_time_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert payload["local_model"]["timing"]["timing_model"] == (
        "serial_sum_of_decomposed_batch_latencies"
    )
    assert payload["local_model"]["timing"][
        "serial_batch_latency_ns"
    ] == pytest.approx(
        sum(card.payload["local_model"]["timing"]["batch_latency_ns"] for card in cards)
    )
    assert payload["local_model"]["noise"]["aggregation"] == "not_additive"
    assert payload["published_reference"] is None
    assert payload["calibration_fit"] is None
    assert payload["matmuls"][0]["json_report"] == "tiny_qkv_projection.json"
    assert payload["matmuls"][0]["local_model"]["energy"]["total_pj"] == pytest.approx(
        cards[0].payload["local_model"]["energy"]["total_pj"]
    )


def test_transformer_model_report_to_dict_weights_layer_counts() -> None:
    config = small_transformer_model_config()
    layers = small_transformer_model_layer_artifacts(config)

    payload = transformer_model_report_to_dict(config, layers)
    layer_payload = layers[0].payload

    assert payload["schema_version"] == TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION
    assert payload["artifact_type"] == "transformer_model_aggregate"
    assert payload["workload"] == {
        "type": "transformer_model",
        "unique_layer_specs": 1,
        "layer_count": 3,
        "macs": 3 * 4096,
        "equivalent_ops": 3 * 8192,
        "output_elements": 3 * layer_payload["workload"]["output_elements"],
    }
    assert payload["local_model"]["energy"]["total_pj"] == pytest.approx(
        3 * layer_payload["local_model"]["energy"]["total_pj"]
    )
    assert payload["local_model"]["system"]["total_system_energy_pj"] == pytest.approx(
        3 * layer_payload["local_model"]["system"]["total_system_energy_pj"]
    )
    assert payload["local_model"]["system"]["system_energy_per_op_pj"] == pytest.approx(
        payload["local_model"]["system"]["total_system_energy_pj"] / (3 * 8192)
    )
    assert payload["local_model"]["timing"]["serial_batch_latency_ns"] == pytest.approx(
        3 * layer_payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert payload["local_model"]["system"][
        "bandwidth_limited_serial_batch_latency_ns"
    ] == pytest.approx(
        3
        * layer_payload["local_model"]["system"][
            "bandwidth_limited_serial_batch_latency_ns"
        ]
    )
    system = payload["local_model"]["system"]
    assert system["total_hierarchy_bytes"] == pytest.approx(
        3 * layer_payload["local_model"]["system"]["total_hierarchy_bytes"]
    )
    assert system["hierarchy_equivalent_ops_per_byte"] == pytest.approx(
        payload["workload"]["equivalent_ops"] / system["total_hierarchy_bytes"]
    )
    assert system["movement_energy_per_hierarchy_byte_pj"] == pytest.approx(
        system["total_movement_energy_pj"] / system["total_hierarchy_bytes"]
    )
    assert (
        system["sram_traffic_share"]
        + system["intermediate_traffic_share"]
        + system["off_chip_traffic_share"]
    ) == pytest.approx(1.0)
    assert sum(tier["traffic_share"] for tier in system["tiers"].values()) == (
        pytest.approx(1.0)
    )
    assert sum(tier["movement_energy_share"] for tier in system["tiers"].values()) == (
        pytest.approx(1.0)
    )
    assert system["dominant_movement_energy_tier"] == "off_chip"
    assert system["contention_memory_bottleneck_tier"] == "off_chip"
    assert system["max_tier_contention_adjusted_transfer_pressure_ratio"] == (
        pytest.approx(
            max(
                tier["contention_adjusted_transfer_pressure_ratio"]
                for tier in system["tiers"].values()
            )
        )
    )
    assert system["contention_bandwidth_derate_factor"] == pytest.approx(1.0)
    assert system["effective_loaded_bandwidth_bytes_per_ns"] == pytest.approx(
        system["total_hierarchy_bytes"] / system["serial_transfer_time_ns"]
    )
    assert system[
        "contention_adjusted_loaded_bandwidth_bytes_per_ns"
    ] == pytest.approx(
        system["total_hierarchy_bytes"]
        / system["contention_adjusted_serial_transfer_time_ns"]
    )
    assert system["bandwidth_pressure_ratio"] == pytest.approx(
        system["bandwidth_limited_serial_batch_latency_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert system["transfer_to_compute_time_ratio"] == pytest.approx(
        system["serial_transfer_time_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert system["contention_pressure_ratio"] == pytest.approx(
        system["contention_adjusted_serial_batch_latency_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert system["contention_adjusted_transfer_to_compute_time_ratio"] == pytest.approx(
        system["contention_adjusted_serial_transfer_time_ns"]
        / payload["local_model"]["timing"]["serial_batch_latency_ns"]
    )
    assert payload["layers"][0]["name"] == "encoder_block"
    assert payload["layers"][0]["count"] == 3
    assert payload["layers"][0]["weighted_macs"] == 3 * 4096
    assert payload["layers"][0]["matmul_reports"] == [
        "tiny_qkv_projection.json",
        "tiny_attention_scores.json",
        "tiny_attention_value.json",
        "tiny_mlp_up_projection.json",
        "tiny_mlp_down_projection.json",
    ]


def test_transformer_model_report_rejects_stale_layer_summary() -> None:
    config = small_transformer_model_config()
    layers = small_transformer_model_layer_artifacts(config)
    broken_payload = copy.deepcopy(layers[0].payload)
    broken_payload["transformer_layer"]["shape"]["hidden_size"] = 16
    broken_layers = [
        TransformerModelLayerArtifact(
            name=layers[0].name,
            count=layers[0].count,
            json_report=layers[0].json_report,
            payload=broken_payload,
        )
    ]

    with pytest.raises(ValueError, match="transformer_layer.shape"):
        transformer_model_report_to_dict(config, broken_layers)


def test_transformer_layer_report_rejects_inconsistent_json_cards() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    broken_payload = copy.deepcopy(cards[0].payload)
    broken_payload["workload"]["macs"] = 1
    broken_cards = [
        ComparisonCard(path=cards[0].path, payload=broken_payload),
        *cards[1:],
    ]

    with pytest.raises(ValueError, match="expected 1536"):
        transformer_layer_report_to_dict(config, broken_cards)


def test_transformer_layer_report_accepts_out_of_order_cards() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    shuffled_cards = [cards[4], cards[2], cards[0], cards[3], cards[1]]

    payload = transformer_layer_report_to_dict(config, shuffled_cards)

    assert [row["operation_key"] for row in payload["formula_audit"]["rows"]] == [
        "qkv_projection",
        "attention_scores",
        "attention_value",
        "mlp_up_projection",
        "mlp_down_projection",
    ]
    assert payload["matmuls"][0]["json_report"] == "tiny_qkv_projection.json"
    assert payload["workload"]["macs"] == 4096


def test_transformer_layer_report_rejects_duplicate_operation_cards() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    duplicate_cards = [
        cards[0],
        cards[1],
        ComparisonCard(path=Path("duplicate_attention_scores.json"), payload=cards[1].payload),
        cards[3],
        cards[4],
    ]

    with pytest.raises(ValueError, match="duplicate transformer operation"):
        transformer_layer_report_to_dict(config, duplicate_cards)


def test_transformer_layer_report_rejects_missing_operation_cards() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)

    with pytest.raises(ValueError, match="expected 5 transformer JSON cards, got 4"):
        transformer_layer_report_to_dict(config, cards[:-1])


def test_transformer_layer_report_rejects_wrong_schema_version() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    broken_payload = copy.deepcopy(cards[0].payload)
    broken_payload["schema_version"] = "future-schema"
    broken_cards = [
        ComparisonCard(path=cards[0].path, payload=broken_payload),
        *cards[1:],
    ]

    with pytest.raises(ValueError, match="expected 'photonic-bench-report-v1'"):
        transformer_layer_report_to_dict(config, broken_cards)


def test_transformer_layer_report_rejects_unknown_operation_label() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    broken_payload = copy.deepcopy(cards[0].payload)
    broken_payload["assumptions"] = [
        (
            "Transformer operation: Mystery op."
            if assumption == "Transformer operation: QKV projection."
            else assumption
        )
        for assumption in broken_payload["assumptions"]
    ]
    broken_cards = [
        ComparisonCard(path=cards[0].path, payload=broken_payload),
        *cards[1:],
    ]

    with pytest.raises(ValueError, match="declares transformer operation"):
        transformer_layer_report_to_dict(config, broken_cards)


def test_transformer_layer_report_rejects_bool_integer_fields() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    broken_payload = copy.deepcopy(cards[0].payload)
    broken_payload["workload"]["macs"] = True
    broken_cards = [
        ComparisonCard(path=cards[0].path, payload=broken_payload),
        *cards[1:],
    ]

    with pytest.raises(ValueError, match="workload.macs must be an integer"):
        transformer_layer_report_to_dict(config, broken_cards)


def test_transformer_layer_report_rejects_stale_model_inputs() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    broken_payload = copy.deepcopy(cards[0].payload)
    broken_payload["model_inputs"]["timing"]["optical_latency_ns"] = 99
    broken_cards = [
        ComparisonCard(path=cards[0].path, payload=broken_payload),
        *cards[1:],
    ]

    with pytest.raises(ValueError, match="model_inputs.timing.optical_latency_ns"):
        transformer_layer_report_to_dict(config, broken_cards)


def test_transformer_layer_report_rejects_missing_nested_card_fields() -> None:
    config = small_transformer_layer_config()
    cards = small_transformer_json_cards(config)
    broken_payload = copy.deepcopy(cards[0].payload)
    del broken_payload["local_model"]["energy"]["total_pj"]
    broken_cards = [
        ComparisonCard(path=cards[0].path, payload=broken_payload),
        *cards[1:],
    ]

    with pytest.raises(
        ValueError,
        match=r"tiny_qkv_projection\.json: missing local_model\.energy\.total_pj",
    ):
        transformer_layer_report_to_dict(config, broken_cards)


def test_transformer_slugify_keeps_file_prefixes_local() -> None:
    assert slugify("../Tiny Prefix!!") == "tiny_prefix"


def test_load_transformer_layer_config_infers_head_dim(tmp_path: Path) -> None:
    config_path = tmp_path / "transformer.yaml"
    config_path.write_text(_small_transformer_yaml(include_head_dim=False), encoding="utf-8")

    config = load_transformer_layer_config(config_path)

    assert config.benchmark.name == "small transformer sanity layer"
    assert config.transformer_layer.head_dim == 4
    assert config.transformer_layer.layer_type == "encoder"
    assert config.transformer_layer.attention_mode == "dense"
    assert config.assumptions == ("Synthetic transformer shape for tests.",)


def test_load_transformer_layer_config_rejects_invalid_head_dim(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "bad_transformer.yaml"
    config_path.write_text(
        _small_transformer_yaml().replace("head_dim: 4", "head_dim: 5"),
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match="head_dim.*num_heads"):
        load_transformer_layer_config(config_path)


def test_load_transformer_layer_config_rejects_indivisible_inferred_head_dim(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "bad_transformer_hidden_heads.yaml"
    config_path.write_text(
        _small_transformer_yaml(include_head_dim=False).replace(
            "hidden_size: 8",
            "hidden_size: 9",
        ),
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match="hidden_size must be divisible"):
        load_transformer_layer_config(config_path)


@pytest.mark.parametrize(
    ("old", "new", "match"),
    [
        ("layer_type: encoder", "layer_type: cross_encoder", "layer_type"),
        ("attention_mode: dense", "attention_mode: causal", "attention_mode"),
        ("batch_size: 2", "batch_size: 0", "batch_size"),
        ("sequence_length: 4", "sequence_length: false", "sequence_length"),
    ],
)
def test_load_transformer_layer_config_rejects_invalid_shape_values(
    tmp_path: Path,
    old: str,
    new: str,
    match: str,
) -> None:
    config_path = tmp_path / "bad_transformer_shape.yaml"
    config_path.write_text(
        _small_transformer_yaml().replace(old, new),
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match=match):
        load_transformer_layer_config(config_path)


def test_load_transformer_layer_config_rejects_published_calibration(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "bad_transformer_published.yaml"
    config_path.write_text(
        _small_transformer_yaml()
        + """

published_calibration:
  architecture: Layer-level paper target
""",
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match="published_calibration is not supported"):
        load_transformer_layer_config(config_path)


def test_load_transformer_model_config_supports_counted_layers(tmp_path: Path) -> None:
    config_path = tmp_path / "transformer_model.yaml"
    config_path.write_text(_small_transformer_model_yaml(), encoding="utf-8")

    config = load_transformer_model_config(config_path)

    assert config.benchmark.name == "small transformer model"
    assert len(config.layers) == 1
    assert config.layers[0].name == "encoder_block"
    assert config.layers[0].count == 3
    assert config.layers[0].transformer_layer.hidden_size == 8
    assert config.layers[0].transformer_layer.head_dim == 4
    assert config.embeddings.enabled is False
    assert config.output_projection.enabled is False
    assert config.activation_memory.enabled is False
    assert config.kv_cache.enabled is False
    assert config.pipeline.overlap_enabled is False


def test_load_transformer_model_config_supports_realism_sections(tmp_path: Path) -> None:
    config_path = tmp_path / "transformer_model.yaml"
    config_path.write_text(
        _small_transformer_model_yaml().replace(
            "device:\n",
            """
  embeddings:
    enabled: true
    vocab_size: 32
    bits_per_element: 12
  output_projection:
    enabled: true
    vocab_size: 32
    tied_to_token_embedding: true
  activation_memory:
    enabled: true
    bits_per_element: 16
  pipeline_overlap:
    enabled: true
    overlap_fraction: 0.25
    label: local_overlap
device:
""",
        ),
        encoding="utf-8",
    )

    config = load_transformer_model_config(config_path)

    assert config.embeddings.enabled is True
    assert config.embeddings.vocab_size == 32
    assert config.output_projection.enabled is True
    assert config.output_projection.vocab_size == 32
    assert config.output_projection.tied_to_token_embedding is True
    assert config.activation_memory.enabled is True
    assert config.pipeline.overlap_enabled is True
    assert config.pipeline.overlap_fraction == pytest.approx(0.25)


def test_load_transformer_model_config_supports_decoder_kv_cache(tmp_path: Path) -> None:
    config_path = tmp_path / "transformer_model.yaml"
    config_path.write_text(
        _small_transformer_model_yaml()
        .replace("layer_type: encoder", "layer_type: decoder")
        .replace("sequence_length: 4", "sequence_length: 1")
        .replace(
            "device:\n",
            """
  kv_cache:
    enabled: true
    mode: decoder_incremental
    context_length: 7
device:
""",
        ),
        encoding="utf-8",
    )

    config = load_transformer_model_config(config_path)

    shape = config.layers[0].transformer_layer
    assert shape.kv_cache_enabled is True
    assert shape.sequence_length == 1
    assert shape.attention_context_length == 8
    assert attention_scores_macs(shape) == 2 * 2 * 1 * 8 * 4


def test_load_transformer_model_config_rejects_duplicate_layers(
    tmp_path: Path,
) -> None:
    config_path = tmp_path / "transformer_model.yaml"
    config_path.write_text(
        _small_transformer_model_yaml().replace(
            "device:\n",
            """
    - name: encoder_block
      count: 1
      layer_type: encoder
      attention_mode: dense
      batch_size: 2
      sequence_length: 4
      hidden_size: 8
      num_heads: 2
      head_dim: 4
      mlp_intermediate_size: 16
device:
""",
        ),
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match="must be unique"):
        load_transformer_model_config(config_path)


def test_cli_transformer_layer_generates_decomposed_outputs(tmp_path: Path) -> None:
    config_path = tmp_path / "transformer.yaml"
    output_dir = tmp_path / "cards"
    config_path.write_text(_small_transformer_yaml(), encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "transformer-layer",
            str(config_path),
            "--output-dir",
            str(output_dir),
            "--prefix",
            "tiny",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Wrote transformer layer comparison" in completed.stdout
    assert "Wrote transformer layer JSON summary" in completed.stdout

    json_paths = sorted(output_dir.glob("tiny_*.json"))
    matmul_json_paths = [
        path for path in json_paths if path.name != "tiny_layer_summary.json"
    ]
    markdown_paths = sorted(output_dir.glob("tiny_*.md"))
    assert len(json_paths) == 6
    assert len(matmul_json_paths) == 5
    assert len(markdown_paths) == 6
    assert (output_dir / "tiny_layer_comparison.md").exists()
    assert (output_dir / "tiny_layer_summary.json").exists()

    macs_by_name = {
        path.name: json.loads(path.read_text(encoding="utf-8"))["workload"]["macs"]
        for path in matmul_json_paths
    }
    assert macs_by_name == {
        "tiny_attention_scores.json": 256,
        "tiny_attention_value.json": 256,
        "tiny_mlp_down_projection.json": 1024,
        "tiny_mlp_up_projection.json": 1024,
        "tiny_qkv_projection.json": 1536,
    }

    comparison = (output_dir / "tiny_layer_comparison.md").read_text(encoding="utf-8")
    assert "PhotonicBench Transformer Layer Comparison" in comparison
    assert "Aggregate layer total" in comparison
    assert "4096" in comparison
    assert "8192" in comparison
    assert "QKV projection" in comparison
    assert "Attention scores" in comparison
    assert "MLP down-projection" in comparison

    summary = json.loads(
        (output_dir / "tiny_layer_summary.json").read_text(encoding="utf-8")
    )
    assert summary["schema_version"] == TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION
    assert summary["workload"]["macs"] == 4096
    assert summary["workload"]["equivalent_ops"] == 8192
    assert summary["formula_audit"]["json_total_macs"] == 4096
    assert len(summary["matmuls"]) == 5
    assert summary["matmuls"][0]["json_report"] == "tiny_qkv_projection.json"


def test_cli_transformer_model_generates_summary_and_layers(tmp_path: Path) -> None:
    config_path = tmp_path / "transformer_model.yaml"
    output_dir = tmp_path / "model"
    config_path.write_text(_small_transformer_model_yaml(), encoding="utf-8")

    completed = subprocess.run(
        [
            sys.executable,
            "-m",
            "photonic_bench.cli",
            "transformer-model",
            str(config_path),
            "--output-dir",
            str(output_dir),
            "--prefix",
            "tiny_model",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "Wrote transformer model summary" in completed.stdout
    assert "Wrote transformer model JSON summary" in completed.stdout

    model_json = output_dir / "tiny_model_model_summary.json"
    model_md = output_dir / "tiny_model_model_summary.md"
    layer_summary = (
        output_dir
        / "encoder_block"
        / "tiny_model_encoder_block_layer_summary.json"
    )
    assert model_json.exists()
    assert model_md.exists()
    assert layer_summary.exists()
    assert (
        output_dir
        / "encoder_block"
        / "tiny_model_encoder_block_qkv_projection.json"
    ).exists()

    payload = json.loads(model_json.read_text(encoding="utf-8"))
    assert payload["schema_version"] == TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION
    assert payload["workload"]["layer_count"] == 3
    assert payload["workload"]["macs"] == 3 * 4096
    assert payload["layers"][0]["json_report"] == (
        "encoder_block/tiny_model_encoder_block_layer_summary.json"
    )
    markdown = model_md.read_text(encoding="utf-8")
    assert "PhotonicBench Transformer Model Summary" in markdown
    assert "encoder_block" in markdown


@pytest.mark.parametrize(
    ("example_path", "expected_total_macs", "expected_total_equivalent_ops"),
    [
        (Path("examples/transformer_small_sanity.yaml"), 4096, 8192),
        (Path("examples/bert_base_encoder_layer.yaml"), 855_638_016, 1_711_276_032),
        (Path("examples/gpt_style_decoder_layer.yaml"), 8_254_390_272, 16_508_780_544),
    ],
)
def test_transformer_example_configs_have_expected_totals(
    example_path: Path,
    expected_total_macs: int,
    expected_total_equivalent_ops: int,
) -> None:
    config = load_transformer_layer_config(example_path)
    plan = build_transformer_layer_plan(config)
    cards = [
        ComparisonCard(
            path=Path(f"{card.key}.json"),
            payload=report_to_dict(evaluate(card.config)),
        )
        for card in plan.cards
    ]
    payload = transformer_layer_report_to_dict(config, cards)

    assert plan.total_macs == expected_total_macs
    assert plan.total_equivalent_ops == expected_total_equivalent_ops
    assert sum(evaluate(card.config).macs for card in plan.cards) == expected_total_macs
    assert payload["workload"]["macs"] == expected_total_macs
    assert payload["workload"]["equivalent_ops"] == expected_total_equivalent_ops
    assert payload["formula_audit"]["json_total_macs"] == expected_total_macs
    assert len(payload["matmuls"]) == 5


def test_transformer_model_example_config_has_expected_totals() -> None:
    config = load_transformer_model_config(Path("examples/bert_base_12layer_model.yaml"))
    layers = small_transformer_model_layer_artifacts(config)
    payload = transformer_model_report_to_dict(config, layers)
    output_projection_macs = 128 * 768 * 30_522

    assert payload["workload"]["unique_layer_specs"] == 1
    assert payload["workload"]["layer_count"] == 12
    assert payload["workload"]["macs"] == 12 * 855_638_016 + output_projection_macs
    assert payload["workload"]["equivalent_ops"] == (
        12 * 1_711_276_032 + 2 * output_projection_macs
    )
    assert payload["model_components"]["embeddings"]["enabled"] is True
    assert payload["model_components"]["output_projection"]["workload"]["macs"] == (
        output_projection_macs
    )
    assert payload["local_model"]["activation_memory_traffic"]["total_tensor_bytes"] > 0
    assert payload["local_model"]["timing"]["schedule_assumption"] == (
        "local_layer_overlap_assumption"
    )


def test_transformer_model_uses_input_embedding_and_final_projection_shapes() -> None:
    base = small_transformer_layer_config()
    input_shape = TransformerLayerShapeConfig(
        batch_size=2,
        sequence_length=5,
        hidden_size=8,
        num_heads=2,
        head_dim=4,
        mlp_intermediate_size=16,
    )
    final_shape = TransformerLayerShapeConfig(
        batch_size=1,
        sequence_length=3,
        hidden_size=16,
        num_heads=4,
        head_dim=4,
        mlp_intermediate_size=32,
    )
    config = TransformerModelConfig(
        benchmark=BenchmarkMeta(
            name="mixed-shape transformer model",
            description="Regression test for model-level tensor shape choices.",
        ),
        layers=(
            TransformerModelLayerConfig(
                name="input_block",
                count=1,
                transformer_layer=input_shape,
            ),
            TransformerModelLayerConfig(
                name="final_block",
                count=1,
                transformer_layer=final_shape,
            ),
        ),
        device=base.device,
        timing=base.timing,
        noise=base.noise,
        execution=base.execution,
        system=base.system,
        embeddings=TransformerModelEmbeddingsConfig(
            enabled=True,
            vocab_size=128,
            include_token_embedding=True,
            include_position_embedding=False,
            bits_per_element=16,
        ),
        output_projection=TransformerModelOutputProjectionConfig(
            enabled=True,
            vocab_size=64,
        ),
    )

    payload = transformer_model_report_to_dict(
        config,
        small_transformer_model_layer_artifacts(config),
    )

    assert payload["model_components"]["embeddings"][
        "token_embedding_read_bytes"
    ] == (2 * 5 * 8 * 2)
    assert payload["model_components"]["output_projection"]["workload"]["shape"] == {
        "m": 3,
        "k": 16,
        "n": 64,
    }


def _small_transformer_yaml(*, include_head_dim: bool = True) -> str:
    head_dim = "  head_dim: 4\n" if include_head_dim else ""
    return f"""
benchmark:
  name: small transformer sanity layer
  description: Small transformer layer for exact formula tests.
transformer_layer:
  layer_type: encoder
  attention_mode: dense
  batch_size: 2
  sequence_length: 4
  hidden_size: 8
  num_heads: 2
{head_dim}  mlp_intermediate_size: 16
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
execution:
  weight_stationary: true
timing:
  optical_latency_ns: 3
  adc_latency_ns: 1
  dac_latency_ns: 1
noise:
  phase_noise_rad_rms: 0.02
  drift_rad_per_second: 0.1
  integration_time_ns: 3
assumptions:
  - Synthetic transformer shape for tests.
""".strip()


def _small_transformer_model_yaml() -> str:
    return """
benchmark:
  name: small transformer model
  description: Small counted transformer model for exact formula tests.
transformer_model:
  layers:
    - name: encoder_block
      count: 3
      layer_type: encoder
      attention_mode: dense
      batch_size: 2
      sequence_length: 4
      hidden_size: 8
      num_heads: 2
      head_dim: 4
      mlp_intermediate_size: 16
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
execution:
  weight_stationary: true
timing:
  optical_latency_ns: 3
  adc_latency_ns: 1
  dac_latency_ns: 1
noise:
  phase_noise_rad_rms: 0.02
  drift_rad_per_second: 0.1
  integration_time_ns: 3
assumptions:
  - Synthetic full-model shape for tests.
""".strip()
