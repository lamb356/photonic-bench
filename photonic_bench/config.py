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


@dataclass(frozen=True)
class TransformerModelLayerConfig:
    name: str
    count: int
    transformer_layer: TransformerLayerShapeConfig


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
    sram: MemoryTierConfig = field(
        default_factory=lambda: MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=1024.0,
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
    return TransformerModelConfig(
        benchmark=_benchmark_meta(raw),
        layers=_transformer_model_layers(transformer_model),
        device=_device_config(raw),
        timing=_timing_config(raw),
        noise=_noise_config(raw),
        execution=_optional_execution(raw),
        system=_optional_system(raw),
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

    return TransformerLayerShapeConfig(
        batch_size=_positive_int(raw, f"{section}.batch_size"),
        sequence_length=_positive_int(raw, f"{section}.sequence_length"),
        hidden_size=hidden_size,
        num_heads=num_heads,
        mlp_intermediate_size=_positive_int(
            raw,
            f"{section}.mlp_intermediate_size",
        ),
        head_dim=head_dim,
        layer_type=layer_type,
        attention_mode=attention_mode,
    )


def _transformer_model_layers(
    transformer_model: dict[str, Any],
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
        parsed.append(
            TransformerModelLayerConfig(
                name=name,
                count=_positive_int_with_default(
                    raw_layer,
                    f"{section}.count",
                    default=1,
                ),
                transformer_layer=_transformer_layer_shape(
                    raw_layer,
                    section=section,
                ),
            )
        )
    return tuple(parsed)


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
    sram = _optional_nested_mapping(system, "system", "sram")
    off_chip = _optional_nested_mapping(system, "system", "off_chip")
    defaults = SystemConfig()
    return SystemConfig(
        sram=_memory_tier_config(
            sram,
            "system.sram",
            default=defaults.sram,
        ),
        off_chip=_memory_tier_config(
            off_chip,
            "system.off_chip",
            default=defaults.off_chip,
        ),
    )


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
