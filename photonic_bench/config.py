from __future__ import annotations

from dataclasses import dataclass, field, replace
import math
from pathlib import Path
from typing import Any

import yaml


@dataclass(frozen=True)
class BenchmarkMeta:
    name: str
    description: str = ""


@dataclass(frozen=True)
class WorkloadConfig:
    type: str
    m: int
    n: int
    k: int


@dataclass(frozen=True)
class TransformerLayerShapeConfig:
    batch_size: int
    sequence_length: int
    hidden_size: int
    num_heads: int
    mlp_intermediate_size: int
    head_dim: int
    layer_type: str = "encoder"
    attention_mode: str = "dense"
    attention_context_length: int | None = None
    kv_cache_enabled: bool = False


@dataclass(frozen=True)
class TransformerModelLayerConfig:
    name: str
    count: int
    transformer_layer: TransformerLayerShapeConfig


@dataclass(frozen=True)
class TransformerModelEmbeddingsConfig:
    enabled: bool = False
    vocab_size: int | None = None
    include_token_embedding: bool = True
    include_position_embedding: bool = True
    bits_per_element: int = 16


@dataclass(frozen=True)
class TransformerModelOutputProjectionConfig:
    enabled: bool = False
    vocab_size: int | None = None
    tied_to_token_embedding: bool = False


@dataclass(frozen=True)
class TransformerModelActivationMemoryConfig:
    enabled: bool = False
    bits_per_element: int = 16
    include_layer_inputs: bool = True
    include_attention_scores: bool = True
    include_mlp_intermediate: bool = True


@dataclass(frozen=True)
class TransformerModelKvCacheConfig:
    enabled: bool = False
    mode: str = "none"
    context_length: int = 0
    include_cache_reads: bool = True
    include_cache_writes: bool = True
    bits_per_element: int = 16


@dataclass(frozen=True)
class TransformerModelPipelineConfig:
    overlap_enabled: bool = False
    overlap_fraction: float = 0.0
    label: str = "serial"


@dataclass(frozen=True)
class AdcConfig:
    bits: int
    energy_pj_per_conversion: float


@dataclass(frozen=True)
class DacConfig:
    bits: int
    energy_pj_per_conversion: float


@dataclass(frozen=True)
class DeviceConfig:
    optical_mac_energy_fj: float
    laser_wall_plug_efficiency: float
    photodetector_energy_fj_per_sample: float
    adc: AdcConfig
    dac: DacConfig
    vector_dac: DacConfig
    weight_dac: DacConfig


@dataclass(frozen=True)
class TimingConfig:
    optical_latency_ns: float
    adc_latency_ns: float
    dac_latency_ns: float


@dataclass(frozen=True)
class NoiseConfig:
    phase_noise_rad_rms: float
    drift_rad_per_second: float
    integration_time_ns: float


@dataclass(frozen=True)
class PipelineConfig:
    stages: int = 1
    cycle_time_ns: float | None = None


@dataclass(frozen=True)
class ExecutionConfig:
    batch_size: int = 1
    vector_reuse_factor: int = 1
    weight_reuse_factor: int = 1
    weight_stationary: bool = False
    pipeline: PipelineConfig = field(default_factory=PipelineConfig)


@dataclass(frozen=True)
class MemoryTierConfig:
    read_energy_pj_per_byte: float
    write_energy_pj_per_byte: float
    bandwidth_bytes_per_ns: float
    read_fraction: float = 1.0
    write_fraction: float = 1.0


@dataclass(frozen=True)
class SystemConfig:
    profile: str = "default"
    profile_overrides: tuple[str, ...] = ()
    memory_timing_mode: str = "overlapped"
    sram: MemoryTierConfig = field(
        default_factory=lambda: MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=1024.0,
        )
    )
    intermediate: MemoryTierConfig = field(
        default_factory=lambda: MemoryTierConfig(
            read_energy_pj_per_byte=0.2,
            write_energy_pj_per_byte=0.2,
            bandwidth_bytes_per_ns=256.0,
        )
    )
    off_chip: MemoryTierConfig = field(
        default_factory=lambda: MemoryTierConfig(
            read_energy_pj_per_byte=10.0,
            write_energy_pj_per_byte=10.0,
            bandwidth_bytes_per_ns=16.0,
        )
    )


@dataclass(frozen=True)
class SystemProfile:
    name: str
    description: str
    sram: MemoryTierConfig
    intermediate: MemoryTierConfig
    off_chip: MemoryTierConfig
    memory_timing_mode: str = "overlapped"

    def to_system_config(
        self,
        *,
        profile_overrides: tuple[str, ...] = (),
    ) -> SystemConfig:
        return SystemConfig(
            profile=self.name,
            profile_overrides=profile_overrides,
            memory_timing_mode=self.memory_timing_mode,
            sram=self.sram,
            intermediate=self.intermediate,
            off_chip=self.off_chip,
        )


SYSTEM_PROFILES: dict[str, SystemProfile] = {
    "default": SystemProfile(
        name="default",
        description=(
            "PhotonicBench baseline: local SRAM plus a conservative generic "
            "off-chip/DRAM tier matching the historical defaults."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=1024.0,
        ),
        intermediate=MemoryTierConfig(
            read_energy_pj_per_byte=0.2,
            write_energy_pj_per_byte=0.2,
            bandwidth_bytes_per_ns=256.0,
        ),
        off_chip=MemoryTierConfig(
            read_energy_pj_per_byte=10.0,
            write_energy_pj_per_byte=10.0,
            bandwidth_bytes_per_ns=16.0,
        ),
    ),
    "on_chip_sram": SystemProfile(
        name="on_chip_sram",
        description=(
            "All modeled converter-interface traffic is assumed to stay on "
            "local SRAM; off-chip fractions are zero."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=2048.0,
        ),
        intermediate=MemoryTierConfig(
            read_energy_pj_per_byte=0.2,
            write_energy_pj_per_byte=0.2,
            bandwidth_bytes_per_ns=256.0,
            read_fraction=0.0,
            write_fraction=0.0,
        ),
        off_chip=MemoryTierConfig(
            read_energy_pj_per_byte=10.0,
            write_energy_pj_per_byte=10.0,
            bandwidth_bytes_per_ns=16.0,
            read_fraction=0.0,
            write_fraction=0.0,
        ),
    ),
    "hbm": SystemProfile(
        name="hbm",
        description=(
            "Local SRAM plus a high-bandwidth-memory style off-chip tier with "
            "higher bandwidth and lower movement energy than generic DDR."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=1024.0,
        ),
        intermediate=MemoryTierConfig(
            read_energy_pj_per_byte=0.2,
            write_energy_pj_per_byte=0.2,
            bandwidth_bytes_per_ns=256.0,
        ),
        off_chip=MemoryTierConfig(
            read_energy_pj_per_byte=3.0,
            write_energy_pj_per_byte=3.0,
            bandwidth_bytes_per_ns=512.0,
        ),
    ),
    "ddr": SystemProfile(
        name="ddr",
        description=(
            "Local SRAM plus a generic DDR-class off-chip memory tier. This "
            "matches the baseline off-chip movement defaults."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=1024.0,
        ),
        intermediate=MemoryTierConfig(
            read_energy_pj_per_byte=0.2,
            write_energy_pj_per_byte=0.2,
            bandwidth_bytes_per_ns=256.0,
        ),
        off_chip=MemoryTierConfig(
            read_energy_pj_per_byte=10.0,
            write_energy_pj_per_byte=10.0,
            bandwidth_bytes_per_ns=16.0,
        ),
    ),
    "pcie_attached": SystemProfile(
        name="pcie_attached",
        description=(
            "Local SRAM plus a host/PCIe-attached memory path with lower "
            "effective bandwidth and higher movement energy."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=1024.0,
        ),
        intermediate=MemoryTierConfig(
            read_energy_pj_per_byte=0.2,
            write_energy_pj_per_byte=0.2,
            bandwidth_bytes_per_ns=128.0,
        ),
        off_chip=MemoryTierConfig(
            read_energy_pj_per_byte=50.0,
            write_energy_pj_per_byte=50.0,
            bandwidth_bytes_per_ns=8.0,
        ),
        memory_timing_mode="serialized",
    ),
}


def system_config_to_dict(system: SystemConfig) -> dict[str, Any]:
    return {
        "profile": system.profile,
        "profile_overrides": list(system.profile_overrides),
        "memory_timing_mode": system.memory_timing_mode,
        "sram": memory_tier_config_to_dict(system.sram),
        "intermediate": memory_tier_config_to_dict(system.intermediate),
        "off_chip": memory_tier_config_to_dict(system.off_chip),
    }


def memory_tier_config_to_dict(tier: MemoryTierConfig) -> dict[str, float]:
    return {
        "read_energy_pj_per_byte": tier.read_energy_pj_per_byte,
        "write_energy_pj_per_byte": tier.write_energy_pj_per_byte,
        "bandwidth_bytes_per_ns": tier.bandwidth_bytes_per_ns,
        "read_fraction": tier.read_fraction,
        "write_fraction": tier.write_fraction,
    }


@dataclass(frozen=True)
class ProvenanceConfig:
    source_title: str
    source_url: str
    doi: str
    venue: str
    claim_status: str


@dataclass(frozen=True)
class PublishedCalibrationConfig:
    architecture: str
    reported_tops: float | None = None
    energy_efficiency_excluding_lasers_tops_per_watt: float | None = None
    energy_efficiency_including_lasers_tops_per_watt: float | None = None
    reported_latency_ns: float | None = None
    reported_future_latency_ns: float | None = None
    reported_enob: float | None = None
    reported_component_count_min: int | None = None
    a10_latency_ns_min: float | None = None
    pace_total_time_us: float | None = None
    gpu_total_time_us: float | None = None
    additional_metrics: dict[str, str | int | float | bool] = field(default_factory=dict)


SOURCE_QUALITY_COVERAGE_DIMENSIONS = (
    "throughput",
    "energy",
    "accuracy",
    "area",
    "precision",
)
SOURCE_QUALITY_COVERAGE_VALUES = (
    "reported",
    "derived",
    "estimated",
    "not_reported",
    "not_applicable",
)
SOURCE_QUALITY_GRADES = ("A", "B", "C", "D")


@dataclass(frozen=True)
class SourceQualityConfig:
    reported_metrics: tuple[str, ...]
    local_surrogate_type: str
    coverage: dict[str, str]
    confidence_grade: str
    notes: tuple[str, ...] = ()


@dataclass(frozen=True)
class BenchmarkConfig:
    benchmark: BenchmarkMeta
    workload: WorkloadConfig
    device: DeviceConfig
    timing: TimingConfig
    noise: NoiseConfig
    execution: ExecutionConfig = field(default_factory=ExecutionConfig)
    system: SystemConfig = field(default_factory=SystemConfig)
    provenance: ProvenanceConfig | None = None
    published_calibration: PublishedCalibrationConfig | None = None
    source_quality: SourceQualityConfig | None = None
    assumptions: tuple[str, ...] = ()

    def with_updates(self, **changes: Any) -> "BenchmarkConfig":
        return replace(self, **changes)


@dataclass(frozen=True)
class TransformerLayerConfig:
    benchmark: BenchmarkMeta
    transformer_layer: TransformerLayerShapeConfig
    device: DeviceConfig
    timing: TimingConfig
    noise: NoiseConfig
    execution: ExecutionConfig = field(default_factory=ExecutionConfig)
    system: SystemConfig = field(default_factory=SystemConfig)
    provenance: ProvenanceConfig | None = None
    assumptions: tuple[str, ...] = ()


@dataclass(frozen=True)
class TransformerModelConfig:
    benchmark: BenchmarkMeta
    layers: tuple[TransformerModelLayerConfig, ...]
    device: DeviceConfig
    timing: TimingConfig
    noise: NoiseConfig
    execution: ExecutionConfig = field(default_factory=ExecutionConfig)
    system: SystemConfig = field(default_factory=SystemConfig)
    embeddings: TransformerModelEmbeddingsConfig = field(
        default_factory=TransformerModelEmbeddingsConfig
    )
    output_projection: TransformerModelOutputProjectionConfig = field(
        default_factory=TransformerModelOutputProjectionConfig
    )
    activation_memory: TransformerModelActivationMemoryConfig = field(
        default_factory=TransformerModelActivationMemoryConfig
    )
    kv_cache: TransformerModelKvCacheConfig = field(
        default_factory=TransformerModelKvCacheConfig
    )
    pipeline: TransformerModelPipelineConfig = field(
        default_factory=TransformerModelPipelineConfig
    )
    provenance: ProvenanceConfig | None = None
    assumptions: tuple[str, ...] = ()


def load_config(path: str | Path) -> BenchmarkConfig:
    config_path, raw = _load_yaml_mapping(path)

    missing = [
        section
        for section in ("benchmark", "workload", "device", "timing", "noise")
        if section not in raw
    ]
    if missing:
        raise ValueError(f"{config_path} is missing required sections: {', '.join(missing)}")

    workload = _require_mapping(raw, "workload")
    provenance = _optional_provenance(raw)
    published_calibration = _optional_published_calibration(raw)
    execution = _optional_execution(raw)
    assumptions = _optional_assumptions(raw)

    parsed = BenchmarkConfig(
        benchmark=_benchmark_meta(raw),
        workload=WorkloadConfig(
            type=_required_str(workload, "workload.type"),
            m=_positive_int(workload, "workload.m"),
            n=_positive_int(workload, "workload.n"),
            k=_positive_int(workload, "workload.k"),
        ),
        device=_device_config(raw),
        timing=_timing_config(raw),
        noise=_noise_config(raw),
        execution=execution,
        system=_optional_system(raw),
        provenance=provenance,
        published_calibration=published_calibration,
        source_quality=_optional_source_quality(raw),
        assumptions=assumptions,
    )

    if parsed.workload.type != "matmul":
        raise ValueError("workload.type must be 'matmul' for single-card configs")

    return parsed


def load_transformer_layer_config(path: str | Path) -> TransformerLayerConfig:
    config_path, raw = _load_yaml_mapping(path)

    missing = [
        section
        for section in ("benchmark", "transformer_layer", "device", "timing", "noise")
        if section not in raw
    ]
    if missing:
        raise ValueError(f"{config_path} is missing required sections: {', '.join(missing)}")

    if "published_calibration" in raw:
        raise ValueError(
            "published_calibration is not supported in transformer-layer configs; "
            "generated decomposed cards are local-model cards"
        )

    transformer_layer = _require_mapping(raw, "transformer_layer")

    return TransformerLayerConfig(
        benchmark=_benchmark_meta(raw),
        transformer_layer=_transformer_layer_shape(transformer_layer),
        device=_device_config(raw),
        timing=_timing_config(raw),
        noise=_noise_config(raw),
        execution=_optional_execution(raw),
        system=_optional_system(raw),
        provenance=_optional_provenance(raw),
        assumptions=_optional_assumptions(raw),
    )


def load_transformer_model_config(path: str | Path) -> TransformerModelConfig:
    config_path, raw = _load_yaml_mapping(path)

    missing = [
        section
        for section in ("benchmark", "transformer_model", "device", "timing", "noise")
        if section not in raw
    ]
    if missing:
        raise ValueError(f"{config_path} is missing required sections: {', '.join(missing)}")
    if "published_calibration" in raw:
        raise ValueError(
            "published_calibration is not supported in transformer-model configs; "
            "paper targets must stay on source-backed card configs"
        )

    transformer_model = _require_mapping(raw, "transformer_model")
    kv_cache = _transformer_model_kv_cache(transformer_model)
    return TransformerModelConfig(
        benchmark=_benchmark_meta(raw),
        layers=_transformer_model_layers(transformer_model, kv_cache=kv_cache),
        device=_device_config(raw),
        timing=_timing_config(raw),
        noise=_noise_config(raw),
        execution=_optional_execution(raw),
        system=_optional_system(raw),
        embeddings=_transformer_model_embeddings(transformer_model),
        output_projection=_transformer_model_output_projection(transformer_model),
        activation_memory=_transformer_model_activation_memory(transformer_model),
        kv_cache=kv_cache,
        pipeline=_transformer_model_pipeline(transformer_model),
        provenance=_optional_provenance(raw),
        assumptions=_optional_assumptions(raw),
    )


def _load_yaml_mapping(path: str | Path) -> tuple[Path, dict[str, Any]]:
    config_path = Path(path)
    try:
        raw_text = config_path.read_text(encoding="utf-8")
    except FileNotFoundError as exc:
        raise ValueError(f"{config_path} does not exist") from exc
    except OSError as exc:
        raise ValueError(f"cannot read {config_path}: {exc}") from exc

    try:
        raw = yaml.safe_load(raw_text)
    except yaml.YAMLError as exc:
        mark = getattr(exc, "problem_mark", None)
        location = ""
        if mark is not None:
            location = f" at line {mark.line + 1}, column {mark.column + 1}"
        problem = getattr(exc, "problem", None) or str(exc).splitlines()[0]
        raise ValueError(
            f"{config_path} contains invalid YAML{location}: {problem}"
        ) from exc

    if not isinstance(raw, dict):
        raise ValueError(f"{config_path} must contain a YAML mapping at top level")

    return config_path, raw


def _benchmark_meta(raw: dict[str, Any]) -> BenchmarkMeta:
    benchmark = _require_mapping(raw, "benchmark")
    return BenchmarkMeta(
        name=_required_str(benchmark, "benchmark.name"),
        description=str(benchmark.get("description", "")),
    )


def _device_config(raw: dict[str, Any]) -> DeviceConfig:
    device = _require_mapping(raw, "device")
    adc = _require_nested_mapping(device, "device", "adc")
    dac = _optional_nested_mapping(device, "device", "dac")
    vector_dac = _optional_nested_mapping(device, "device", "vector_dac")
    weight_dac = _optional_nested_mapping(device, "device", "weight_dac")
    shared_dac, effective_vector_dac, effective_weight_dac = _dac_configs(
        dac,
        vector_dac,
        weight_dac,
    )

    return DeviceConfig(
        optical_mac_energy_fj=_non_negative_float(
            device, "device.optical_mac_energy_fj"
        ),
        laser_wall_plug_efficiency=_efficiency(
            device, "device.laser_wall_plug_efficiency"
        ),
        photodetector_energy_fj_per_sample=_non_negative_float(
            device, "device.photodetector_energy_fj_per_sample"
        ),
        adc=AdcConfig(
            bits=_positive_int(adc, "device.adc.bits"),
            energy_pj_per_conversion=_non_negative_float(
                adc, "device.adc.energy_pj_per_conversion"
            ),
        ),
        dac=shared_dac,
        vector_dac=effective_vector_dac,
        weight_dac=effective_weight_dac,
    )


def _timing_config(raw: dict[str, Any]) -> TimingConfig:
    timing = _require_mapping(raw, "timing")
    return TimingConfig(
        optical_latency_ns=_non_negative_float(timing, "timing.optical_latency_ns"),
        adc_latency_ns=_non_negative_float(timing, "timing.adc_latency_ns"),
        dac_latency_ns=_non_negative_float(timing, "timing.dac_latency_ns"),
    )


def _noise_config(raw: dict[str, Any]) -> NoiseConfig:
    noise = _require_mapping(raw, "noise")
    return NoiseConfig(
        phase_noise_rad_rms=_non_negative_float(noise, "noise.phase_noise_rad_rms"),
        drift_rad_per_second=_non_negative_float(noise, "noise.drift_rad_per_second"),
        integration_time_ns=_non_negative_float(noise, "noise.integration_time_ns"),
    )


def _transformer_layer_shape(
    raw: dict[str, Any],
    *,
    section: str = "transformer_layer",
) -> TransformerLayerShapeConfig:
    hidden_size = _positive_int(raw, f"{section}.hidden_size")
    num_heads = _positive_int(raw, f"{section}.num_heads")
    head_dim = _optional_positive_int(raw, f"{section}.head_dim")
    if head_dim is None:
        if hidden_size % num_heads != 0:
            raise ValueError(
                f"{section}.hidden_size must be divisible by "
                f"{section}.num_heads when head_dim is omitted"
            )
        head_dim = hidden_size // num_heads
    if head_dim * num_heads != hidden_size:
        raise ValueError(
            f"{section}.head_dim * {section}.num_heads must equal "
            f"{section}.hidden_size"
        )

    layer_type = str(raw.get("layer_type", "encoder"))
    if layer_type not in {"encoder", "decoder"}:
        raise ValueError(f"{section}.layer_type must be 'encoder' or 'decoder'")

    attention_mode = str(raw.get("attention_mode", "dense"))
    if attention_mode != "dense":
        raise ValueError(f"{section}.attention_mode currently supports only 'dense'")

    sequence_length = _positive_int(raw, f"{section}.sequence_length")
    attention_context_length = _optional_positive_int(
        raw,
        f"{section}.attention_context_length",
    )
    kv_cache_enabled = _bool_with_default(
        raw,
        f"{section}.kv_cache_enabled",
        default=False,
    )
    if attention_context_length is not None and attention_context_length < sequence_length:
        raise ValueError(
            f"{section}.attention_context_length must be at least "
            f"{section}.sequence_length"
        )
    if kv_cache_enabled and layer_type != "decoder":
        raise ValueError(f"{section}.kv_cache_enabled requires layer_type 'decoder'")

    return TransformerLayerShapeConfig(
        batch_size=_positive_int(raw, f"{section}.batch_size"),
        sequence_length=sequence_length,
        hidden_size=hidden_size,
        num_heads=num_heads,
        mlp_intermediate_size=_positive_int(
            raw,
            f"{section}.mlp_intermediate_size",
        ),
        head_dim=head_dim,
        layer_type=layer_type,
        attention_mode=attention_mode,
        attention_context_length=attention_context_length,
        kv_cache_enabled=kv_cache_enabled,
    )


def _transformer_model_layers(
    transformer_model: dict[str, Any],
    *,
    kv_cache: TransformerModelKvCacheConfig | None = None,
) -> tuple[TransformerModelLayerConfig, ...]:
    layers = transformer_model.get("layers")
    if not isinstance(layers, list) or not layers:
        raise ValueError("transformer_model.layers must be a non-empty list")

    parsed = []
    seen_names: set[str] = set()
    for index, raw_layer in enumerate(layers):
        section = f"transformer_model.layers[{index}]"
        if not isinstance(raw_layer, dict):
            raise ValueError(f"{section} must be a mapping")
        name = _optional_name(raw_layer, f"layer_{index + 1}", section)
        if name in seen_names:
            raise ValueError(f"{section}.name must be unique; found {name!r}")
        seen_names.add(name)
        layer_shape = _transformer_layer_shape(
            raw_layer,
            section=section,
        )
        if kv_cache is not None and kv_cache.enabled and layer_shape.layer_type == "decoder":
            layer_shape = replace(
                layer_shape,
                attention_context_length=(
                    kv_cache.context_length + layer_shape.sequence_length
                ),
                kv_cache_enabled=True,
            )
        parsed.append(
            TransformerModelLayerConfig(
                name=name,
                count=_positive_int_with_default(
                    raw_layer,
                    f"{section}.count",
                    default=1,
                ),
                transformer_layer=layer_shape,
            )
        )
    if kv_cache is not None and kv_cache.enabled and not any(
        layer.transformer_layer.layer_type == "decoder" for layer in parsed
    ):
        raise ValueError("transformer_model.kv_cache.enabled requires a decoder layer")
    return tuple(parsed)


def _transformer_model_embeddings(
    transformer_model: dict[str, Any],
) -> TransformerModelEmbeddingsConfig:
    raw = _optional_nested_mapping(transformer_model, "transformer_model", "embeddings")
    if raw is None:
        return TransformerModelEmbeddingsConfig()
    enabled = _bool_with_default(raw, "transformer_model.embeddings.enabled", default=True)
    return TransformerModelEmbeddingsConfig(
        enabled=enabled,
        vocab_size=_optional_positive_int(raw, "transformer_model.embeddings.vocab_size"),
        include_token_embedding=_bool_with_default(
            raw,
            "transformer_model.embeddings.include_token_embedding",
            default=True,
        ),
        include_position_embedding=_bool_with_default(
            raw,
            "transformer_model.embeddings.include_position_embedding",
            default=True,
        ),
        bits_per_element=_positive_int_with_default(
            raw,
            "transformer_model.embeddings.bits_per_element",
            default=16,
        ),
    )


def _transformer_model_output_projection(
    transformer_model: dict[str, Any],
) -> TransformerModelOutputProjectionConfig:
    raw = _optional_nested_mapping(
        transformer_model,
        "transformer_model",
        "output_projection",
    )
    if raw is None:
        return TransformerModelOutputProjectionConfig()
    enabled = _bool_with_default(
        raw,
        "transformer_model.output_projection.enabled",
        default=True,
    )
    vocab_size = _optional_positive_int(
        raw,
        "transformer_model.output_projection.vocab_size",
    )
    if enabled and vocab_size is None:
        raise ValueError(
            "transformer_model.output_projection.vocab_size is required when "
            "output_projection is enabled"
        )
    return TransformerModelOutputProjectionConfig(
        enabled=enabled,
        vocab_size=vocab_size,
        tied_to_token_embedding=_bool_with_default(
            raw,
            "transformer_model.output_projection.tied_to_token_embedding",
            default=False,
        ),
    )


def _transformer_model_activation_memory(
    transformer_model: dict[str, Any],
) -> TransformerModelActivationMemoryConfig:
    raw = _optional_nested_mapping(
        transformer_model,
        "transformer_model",
        "activation_memory",
    )
    if raw is None:
        return TransformerModelActivationMemoryConfig()
    enabled = _bool_with_default(
        raw,
        "transformer_model.activation_memory.enabled",
        default=True,
    )
    return TransformerModelActivationMemoryConfig(
        enabled=enabled,
        bits_per_element=_positive_int_with_default(
            raw,
            "transformer_model.activation_memory.bits_per_element",
            default=16,
        ),
        include_layer_inputs=_bool_with_default(
            raw,
            "transformer_model.activation_memory.include_layer_inputs",
            default=True,
        ),
        include_attention_scores=_bool_with_default(
            raw,
            "transformer_model.activation_memory.include_attention_scores",
            default=True,
        ),
        include_mlp_intermediate=_bool_with_default(
            raw,
            "transformer_model.activation_memory.include_mlp_intermediate",
            default=True,
        ),
    )


def _transformer_model_kv_cache(
    transformer_model: dict[str, Any],
) -> TransformerModelKvCacheConfig:
    raw = _optional_nested_mapping(transformer_model, "transformer_model", "kv_cache")
    if raw is None:
        return TransformerModelKvCacheConfig()
    enabled = _bool_with_default(raw, "transformer_model.kv_cache.enabled", default=True)
    mode = str(raw.get("mode", "decoder_incremental" if enabled else "none"))
    if enabled and mode != "decoder_incremental":
        raise ValueError(
            "transformer_model.kv_cache.mode currently supports only "
            "'decoder_incremental'"
        )
    if not enabled and mode != "none":
        raise ValueError("transformer_model.kv_cache.mode must be 'none' when disabled")
    context_length = (
        _positive_int(raw, "transformer_model.kv_cache.context_length")
        if enabled
        else 0
    )
    return TransformerModelKvCacheConfig(
        enabled=enabled,
        mode=mode,
        context_length=context_length,
        include_cache_reads=_bool_with_default(
            raw,
            "transformer_model.kv_cache.include_cache_reads",
            default=True,
        ),
        include_cache_writes=_bool_with_default(
            raw,
            "transformer_model.kv_cache.include_cache_writes",
            default=True,
        ),
        bits_per_element=_positive_int_with_default(
            raw,
            "transformer_model.kv_cache.bits_per_element",
            default=16,
        ),
    )


def _transformer_model_pipeline(
    transformer_model: dict[str, Any],
) -> TransformerModelPipelineConfig:
    raw = _optional_nested_mapping(
        transformer_model,
        "transformer_model",
        "pipeline_overlap",
    )
    if raw is None:
        return TransformerModelPipelineConfig()
    enabled = _bool_with_default(
        raw,
        "transformer_model.pipeline_overlap.enabled",
        default=True,
    )
    overlap_fraction = _fraction_with_default(
        raw,
        "transformer_model.pipeline_overlap.overlap_fraction",
        default=0.0,
    )
    if overlap_fraction >= 1:
        raise ValueError(
            "transformer_model.pipeline_overlap.overlap_fraction must be less than 1"
        )
    label = str(raw.get("label", "layer_overlap" if enabled else "serial")).strip()
    if not label:
        raise ValueError("transformer_model.pipeline_overlap.label must be non-empty")
    return TransformerModelPipelineConfig(
        overlap_enabled=enabled,
        overlap_fraction=overlap_fraction if enabled else 0.0,
        label=label,
    )


def _optional_name(raw: dict[str, Any], default: str, section: str) -> str:
    if "name" not in raw:
        return default
    name = raw["name"]
    if not isinstance(name, str) or not name.strip():
        raise ValueError(f"{section}.name must be a non-empty string")
    return name.strip()


def _optional_provenance(raw: dict[str, Any]) -> ProvenanceConfig | None:
    if "provenance" not in raw:
        return None
    provenance = _require_mapping(raw, "provenance")
    return ProvenanceConfig(
        source_title=_required_str(provenance, "provenance.source_title"),
        source_url=_required_str(provenance, "provenance.source_url"),
        doi=_required_str(provenance, "provenance.doi"),
        venue=_required_str(provenance, "provenance.venue"),
        claim_status=_required_str(provenance, "provenance.claim_status"),
    )


def _optional_published_calibration(
    raw: dict[str, Any],
) -> PublishedCalibrationConfig | None:
    if "published_calibration" not in raw:
        return None
    calibration = _require_mapping(raw, "published_calibration")
    return PublishedCalibrationConfig(
        architecture=_required_str(
            calibration, "published_calibration.architecture"
        ),
        reported_tops=_optional_positive_float(
            calibration, "published_calibration.reported_tops"
        ),
        energy_efficiency_excluding_lasers_tops_per_watt=_optional_positive_float(
            calibration,
            "published_calibration.energy_efficiency_excluding_lasers_tops_per_watt",
        ),
        energy_efficiency_including_lasers_tops_per_watt=_optional_positive_float(
            calibration,
            "published_calibration.energy_efficiency_including_lasers_tops_per_watt",
        ),
        reported_latency_ns=_optional_positive_float(
            calibration, "published_calibration.reported_latency_ns"
        ),
        reported_future_latency_ns=_optional_positive_float(
            calibration, "published_calibration.reported_future_latency_ns"
        ),
        reported_enob=_optional_positive_float(
            calibration, "published_calibration.reported_enob"
        ),
        reported_component_count_min=_optional_positive_int(
            calibration, "published_calibration.reported_component_count_min"
        ),
        a10_latency_ns_min=_optional_positive_float(
            calibration, "published_calibration.a10_latency_ns_min"
        ),
        pace_total_time_us=_optional_positive_float(
            calibration, "published_calibration.pace_total_time_us"
        ),
        gpu_total_time_us=_optional_positive_float(
            calibration, "published_calibration.gpu_total_time_us"
        ),
        additional_metrics=_optional_scalar_metrics(
            calibration,
            "published_calibration.additional_metrics",
        ),
    )


def _optional_source_quality(raw: dict[str, Any]) -> SourceQualityConfig | None:
    if "source_quality" not in raw:
        return None
    quality = _require_mapping(raw, "source_quality")
    coverage = _source_quality_coverage(quality)
    return SourceQualityConfig(
        reported_metrics=_string_list(
            quality,
            "source_quality.reported_metrics",
            required=True,
        ),
        local_surrogate_type=_required_str(
            quality,
            "source_quality.local_surrogate_type",
        ),
        coverage=coverage,
        confidence_grade=_source_quality_grade(quality),
        notes=_string_list(
            quality,
            "source_quality.notes",
            required=False,
        ),
    )


def _source_quality_coverage(raw: dict[str, Any]) -> dict[str, str]:
    coverage = _require_nested_mapping(raw, "source_quality", "coverage")
    parsed: dict[str, str] = {}
    for dimension in SOURCE_QUALITY_COVERAGE_DIMENSIONS:
        if dimension not in coverage:
            raise ValueError(f"source_quality.coverage.{dimension} is required")
        value = coverage[dimension]
        if value not in SOURCE_QUALITY_COVERAGE_VALUES:
            choices = ", ".join(SOURCE_QUALITY_COVERAGE_VALUES)
            raise ValueError(
                f"source_quality.coverage.{dimension} must be one of: {choices}"
            )
        parsed[dimension] = str(value)

    unexpected = sorted(
        key for key in coverage if key not in SOURCE_QUALITY_COVERAGE_DIMENSIONS
    )
    if unexpected:
        raise ValueError(
            "source_quality.coverage has unsupported dimension(s): "
            + ", ".join(unexpected)
        )
    return parsed


def _source_quality_grade(raw: dict[str, Any]) -> str:
    grade = _required_str(raw, "source_quality.confidence_grade").upper()
    if grade not in SOURCE_QUALITY_GRADES:
        choices = ", ".join(SOURCE_QUALITY_GRADES)
        raise ValueError(f"source_quality.confidence_grade must be one of: {choices}")
    return grade


def _optional_assumptions(raw: dict[str, Any]) -> tuple[str, ...]:
    if "assumptions" not in raw:
        return ()

    assumptions = raw["assumptions"]
    if not isinstance(assumptions, list):
        raise ValueError("assumptions must be a list of strings")

    parsed = []
    for index, assumption in enumerate(assumptions):
        if not isinstance(assumption, str) or not assumption.strip():
            raise ValueError(f"assumptions[{index}] must be a non-empty string")
        parsed.append(assumption)
    return tuple(parsed)


def _string_list(
    raw: dict[str, Any],
    dotted_key: str,
    *,
    required: bool,
) -> tuple[str, ...]:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        if required:
            raise ValueError(f"{dotted_key} is required")
        return ()

    value = raw[key]
    if not isinstance(value, list):
        raise ValueError(f"{dotted_key} must be a list of strings")

    parsed = []
    for index, item in enumerate(value):
        if not isinstance(item, str) or not item.strip():
            raise ValueError(f"{dotted_key}[{index}] must be a non-empty string")
        parsed.append(item.strip())
    if required and not parsed:
        raise ValueError(f"{dotted_key} must not be empty")
    return tuple(parsed)


def _optional_execution(raw: dict[str, Any]) -> ExecutionConfig:
    if "execution" not in raw:
        return ExecutionConfig()

    execution = _require_mapping(raw, "execution")
    pipeline = _optional_nested_mapping(execution, "execution", "pipeline")
    return ExecutionConfig(
        batch_size=_positive_int_with_default(
            execution,
            "execution.batch_size",
            default=1,
        ),
        vector_reuse_factor=_positive_int_with_default(
            execution,
            "execution.vector_reuse_factor",
            default=1,
        ),
        weight_reuse_factor=_positive_int_with_default(
            execution,
            "execution.weight_reuse_factor",
            default=1,
        ),
        weight_stationary=_bool_with_default(
            execution,
            "execution.weight_stationary",
            default=False,
        ),
        pipeline=_pipeline_config(pipeline),
    )


def _optional_system(raw: dict[str, Any]) -> SystemConfig:
    if "system" not in raw:
        return SystemConfig()

    system = _require_mapping(raw, "system")
    profile_name = _optional_system_profile_name(system)
    base = _system_profile_config(profile_name)
    sram = _optional_nested_mapping(system, "system", "sram")
    intermediate = _optional_nested_mapping(system, "system", "intermediate")
    off_chip = _optional_nested_mapping(system, "system", "off_chip")
    memory_timing_mode = _optional_memory_timing_mode(
        system,
        default=base.memory_timing_mode,
    )
    profile_overrides = tuple(
        name
        for name, value in (
            ("memory_timing_mode", system.get("memory_timing_mode")),
            ("sram", sram),
            ("intermediate", intermediate),
            ("off_chip", off_chip),
        )
        if value
    )
    effective_profile = profile_name or ("manual" if profile_overrides else "default")
    return SystemConfig(
        profile=effective_profile,
        profile_overrides=profile_overrides,
        memory_timing_mode=memory_timing_mode,
        sram=_memory_tier_config(
            sram,
            "system.sram",
            default=base.sram,
        ),
        intermediate=_memory_tier_config(
            intermediate,
            "system.intermediate",
            default=base.intermediate,
        ),
        off_chip=_memory_tier_config(
            off_chip,
            "system.off_chip",
            default=base.off_chip,
        ),
    )


def _optional_system_profile_name(system: dict[str, Any]) -> str | None:
    if "profile" not in system:
        return None
    value = system["profile"]
    if not isinstance(value, str) or not value.strip():
        raise ValueError("system.profile must be a non-empty string")
    profile_name = value.strip()
    if profile_name not in SYSTEM_PROFILES:
        choices = ", ".join(sorted(SYSTEM_PROFILES))
        raise ValueError(
            f"unknown system.profile {profile_name!r}; expected one of: {choices}"
        )
    return profile_name


def _system_profile_config(profile_name: str | None) -> SystemConfig:
    if profile_name is None:
        return SystemConfig()
    return SYSTEM_PROFILES[profile_name].to_system_config()


def _optional_memory_timing_mode(
    system: dict[str, Any],
    *,
    default: str,
) -> str:
    if "memory_timing_mode" not in system:
        return default
    value = system["memory_timing_mode"]
    if not isinstance(value, str) or not value.strip():
        raise ValueError("system.memory_timing_mode must be a non-empty string")
    mode = value.strip()
    if mode not in {"overlapped", "serialized"}:
        raise ValueError(
            "system.memory_timing_mode must be one of: overlapped, serialized"
        )
    return mode


def _memory_tier_config(
    raw: dict[str, Any] | None,
    section: str,
    *,
    default: MemoryTierConfig,
) -> MemoryTierConfig:
    if raw is None:
        return default

    return MemoryTierConfig(
        read_energy_pj_per_byte=_non_negative_float_with_default(
            raw,
            f"{section}.read_energy_pj_per_byte",
            default=default.read_energy_pj_per_byte,
        ),
        write_energy_pj_per_byte=_non_negative_float_with_default(
            raw,
            f"{section}.write_energy_pj_per_byte",
            default=default.write_energy_pj_per_byte,
        ),
        bandwidth_bytes_per_ns=_positive_float_with_default(
            raw,
            f"{section}.bandwidth_bytes_per_ns",
            default=default.bandwidth_bytes_per_ns,
        ),
        read_fraction=_fraction_with_default(
            raw,
            f"{section}.read_fraction",
            default=default.read_fraction,
        ),
        write_fraction=_fraction_with_default(
            raw,
            f"{section}.write_fraction",
            default=default.write_fraction,
        ),
    )


def _pipeline_config(raw: dict[str, Any] | None) -> PipelineConfig:
    if raw is None:
        return PipelineConfig()

    cycle_time_ns = None
    if "cycle_time_ns" in raw:
        cycle_time_ns = _positive_float(raw, "execution.pipeline.cycle_time_ns")

    return PipelineConfig(
        stages=_positive_int_with_default(
            raw,
            "execution.pipeline.stages",
            default=1,
        ),
        cycle_time_ns=cycle_time_ns,
    )


def _dac_configs(
    dac: dict[str, Any] | None,
    vector_dac: dict[str, Any] | None,
    weight_dac: dict[str, Any] | None,
) -> tuple[DacConfig, DacConfig, DacConfig]:
    if dac is None and (vector_dac is None or weight_dac is None):
        raise ValueError(
            "device.dac is required unless both device.vector_dac and "
            "device.weight_dac are provided"
        )

    shared = _parse_dac(dac, "device.dac") if dac is not None else None
    effective_vector = (
        _parse_dac(vector_dac, "device.vector_dac")
        if vector_dac is not None
        else shared
    )
    effective_weight = (
        _parse_dac(weight_dac, "device.weight_dac")
        if weight_dac is not None
        else shared
    )

    if effective_vector is None or effective_weight is None:
        raise ValueError("internal DAC parsing error")

    return shared or effective_vector, effective_vector, effective_weight


def _parse_dac(raw: dict[str, Any] | None, section: str) -> DacConfig:
    if raw is None:
        raise ValueError(f"{section} must be a mapping")

    return DacConfig(
        bits=_positive_int(raw, f"{section}.bits"),
        energy_pj_per_conversion=_non_negative_float(
            raw,
            f"{section}.energy_pj_per_conversion",
        ),
    )


def _require_mapping(raw: dict[str, Any], section: str) -> dict[str, Any]:
    value = raw[section]
    if not isinstance(value, dict):
        raise ValueError(f"{section} must be a mapping")
    return value


def _require_nested_mapping(
    raw: dict[str, Any], section: str, key: str
) -> dict[str, Any]:
    value = raw.get(key)
    if not isinstance(value, dict):
        raise ValueError(f"{section}.{key} must be a mapping")
    return value


def _optional_nested_mapping(
    raw: dict[str, Any],
    section: str,
    key: str,
) -> dict[str, Any] | None:
    if key not in raw:
        return None
    value = raw[key]
    if not isinstance(value, dict):
        raise ValueError(f"{section}.{key} must be a mapping")
    return value


def _required_str(raw: dict[str, Any], dotted_key: str) -> str:
    key = dotted_key.rsplit(".", 1)[-1]
    value = raw.get(key)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{dotted_key} must be a non-empty string")
    return value


def _positive_int(raw: dict[str, Any], dotted_key: str) -> int:
    value = _number(raw, dotted_key)
    if isinstance(value, bool) or int(value) != value or value <= 0:
        raise ValueError(f"{dotted_key} must be a positive integer")
    return int(value)


def _optional_positive_int(raw: dict[str, Any], dotted_key: str) -> int | None:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return None
    return _positive_int(raw, dotted_key)


def _positive_int_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    default: int,
) -> int:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    return _positive_int(raw, dotted_key)


def _non_negative_float(raw: dict[str, Any], dotted_key: str) -> float:
    value = float(_number(raw, dotted_key))
    if value < 0:
        raise ValueError(f"{dotted_key} must be non-negative")
    return value


def _non_negative_float_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    default: float,
) -> float:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    return _non_negative_float(raw, dotted_key)


def _positive_float(raw: dict[str, Any], dotted_key: str) -> float:
    value = float(_number(raw, dotted_key))
    if value <= 0:
        raise ValueError(f"{dotted_key} must be positive")
    return value


def _positive_float_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    default: float,
) -> float:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    return _positive_float(raw, dotted_key)


def _optional_positive_float(raw: dict[str, Any], dotted_key: str) -> float | None:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return None
    return _positive_float(raw, dotted_key)


def _efficiency(raw: dict[str, Any], dotted_key: str) -> float:
    value = float(_number(raw, dotted_key))
    if not 0 < value <= 1:
        raise ValueError(f"{dotted_key} must be greater than 0 and at most 1")
    return value


def _fraction_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    default: float,
) -> float:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    value = float(_number(raw, dotted_key))
    if not 0 <= value <= 1:
        raise ValueError(f"{dotted_key} must be between 0 and 1")
    return value


def _bool_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    default: bool,
) -> bool:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    value = raw[key]
    if not isinstance(value, bool):
        raise ValueError(f"{dotted_key} must be boolean")
    return value


def _optional_scalar_metrics(
    raw: dict[str, Any],
    dotted_key: str,
) -> dict[str, str | int | float | bool]:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return {}

    value = raw[key]
    if not isinstance(value, dict):
        raise ValueError(f"{dotted_key} must be a mapping")

    metrics: dict[str, str | int | float | bool] = {}
    for metric_name, metric_value in value.items():
        if not isinstance(metric_name, str) or not metric_name.strip():
            raise ValueError(f"{dotted_key} keys must be non-empty strings")
        if not isinstance(metric_value, str | int | float | bool):
            raise ValueError(
                f"{dotted_key}.{metric_name} must be a string, number, or boolean"
            )
        metrics[metric_name] = metric_value

    return metrics


def _number(raw: dict[str, Any], dotted_key: str) -> int | float:
    key = dotted_key.rsplit(".", 1)[-1]
    value = raw.get(key)
    if not isinstance(value, int | float) or isinstance(value, bool):
        raise ValueError(f"{dotted_key} must be numeric and finite")
    if not math.isfinite(float(value)):
        raise ValueError(f"{dotted_key} must be numeric and finite")
    return value
