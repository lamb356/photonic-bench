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


SYSTEM_CONTENTION_OVERLAP_MODELS = (
    "profile_timing_mode",
    "overlapped_compute_window",
    "serialized_tier_path",
    "serialized_host_link",
    "wavelength_broadcast_overlap",
)


@dataclass(frozen=True)
class SystemContentionConfig:
    preset: str = "single_client"
    shared_bandwidth_clients: float = 1.0
    arbitration_efficiency: float = 1.0
    calibration_overhead_fraction: float = 0.0
    overlap_model: str = "profile_timing_mode"


@dataclass(frozen=True)
class SystemContentionPreset:
    name: str
    description: str
    shared_bandwidth_clients: float
    arbitration_efficiency: float
    calibration_overhead_fraction: float
    overlap_model: str

    def to_contention_config(self) -> SystemContentionConfig:
        return SystemContentionConfig(
            preset=self.name,
            shared_bandwidth_clients=self.shared_bandwidth_clients,
            arbitration_efficiency=self.arbitration_efficiency,
            calibration_overhead_fraction=self.calibration_overhead_fraction,
            overlap_model=self.overlap_model,
        )


@dataclass(frozen=True)
class ScenarioProvenanceSource:
    title: str
    url: str
    reference_id: str
    evidence_type: str
    supports: tuple[str, ...] = ()


@dataclass(frozen=True)
class ScenarioProvenancePack:
    status: str
    calibration_scope: str
    sources: tuple[ScenarioProvenanceSource, ...] = ()
    local_assumptions: tuple[str, ...] = ()
    reviewer_note: str = ""


@dataclass(frozen=True)
class SystemConfig:
    profile: str = "default"
    profile_overrides: tuple[str, ...] = ()
    memory_timing_mode: str = "overlapped"
    contention: SystemContentionConfig = field(default_factory=SystemContentionConfig)
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
    contention: SystemContentionConfig = field(default_factory=SystemContentionConfig)

    def to_system_config(
        self,
        *,
        profile_overrides: tuple[str, ...] = (),
    ) -> SystemConfig:
        return SystemConfig(
            profile=self.name,
            profile_overrides=profile_overrides,
            memory_timing_mode=self.memory_timing_mode,
            contention=self.contention,
            sram=self.sram,
            intermediate=self.intermediate,
            off_chip=self.off_chip,
        )


SYSTEM_CONTENTION_PRESETS: dict[str, SystemContentionPreset] = {
    "single_client": SystemContentionPreset(
        name="single_client",
        description=(
            "Dedicated memory path: one modeled client, no arbitration loss, "
            "and no calibration/control guardband."
        ),
        shared_bandwidth_clients=1.0,
        arbitration_efficiency=1.0,
        calibration_overhead_fraction=0.0,
        overlap_model="profile_timing_mode",
    ),
    "shared_hbm_stack": SystemContentionPreset(
        name="shared_hbm_stack",
        description=(
            "HBM-like shared stack: several clients share the loaded tier "
            "bandwidth with modest arbitration loss and a small control "
            "guardband."
        ),
        shared_bandwidth_clients=2.0,
        arbitration_efficiency=0.92,
        calibration_overhead_fraction=0.02,
        overlap_model="overlapped_compute_window",
    ),
    "ddr_controller": SystemContentionPreset(
        name="ddr_controller",
        description=(
            "DDR/controller-style sharing: multiple clients and controller "
            "turnaround reduce usable bandwidth and add a larger guardband."
        ),
        shared_bandwidth_clients=4.0,
        arbitration_efficiency=0.75,
        calibration_overhead_fraction=0.08,
        overlap_model="serialized_tier_path",
    ),
    "pcie_round_robin": SystemContentionPreset(
        name="pcie_round_robin",
        description=(
            "Host/PCIe-attached path: two clients share a serialized host link "
            "with round-robin arbitration and explicit protocol guardband."
        ),
        shared_bandwidth_clients=2.0,
        arbitration_efficiency=0.85,
        calibration_overhead_fraction=0.05,
        overlap_model="serialized_host_link",
    ),
    "optical_interconnect_broadcast": SystemContentionPreset(
        name="optical_interconnect_broadcast",
        description=(
            "Optical interconnect/broadcast path: wavelength fanout reduces "
            "loaded-client contention, but arbitration and control guardband "
            "remain explicit local assumptions."
        ),
        shared_bandwidth_clients=1.5,
        arbitration_efficiency=0.92,
        calibration_overhead_fraction=0.02,
        overlap_model="wavelength_broadcast_overlap",
    ),
}


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
    "on_package_sram": SystemProfile(
        name="on_package_sram",
        description=(
            "On-package SRAM scenario: converter-interface traffic is kept on "
            "a high-bandwidth local SRAM path with no modeled off-package "
            "movement."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.018,
            write_energy_pj_per_byte=0.018,
            bandwidth_bytes_per_ns=4096.0,
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
        contention=SYSTEM_CONTENTION_PRESETS["single_client"].to_contention_config(),
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
        contention=SYSTEM_CONTENTION_PRESETS["single_client"].to_contention_config(),
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
        contention=SYSTEM_CONTENTION_PRESETS["shared_hbm_stack"].to_contention_config(),
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
        contention=SYSTEM_CONTENTION_PRESETS["ddr_controller"].to_contention_config(),
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
        contention=SYSTEM_CONTENTION_PRESETS["pcie_round_robin"].to_contention_config(),
    ),
    "optical_interconnect": SystemProfile(
        name="optical_interconnect",
        description=(
            "Optical interconnect scenario: local SRAM is paired with high "
            "bandwidth intermediate and off-chip optical movement paths to "
            "stress WDM/broadcast-like data movement separately from core "
            "photonic compute."
        ),
        sram=MemoryTierConfig(
            read_energy_pj_per_byte=0.02,
            write_energy_pj_per_byte=0.02,
            bandwidth_bytes_per_ns=2048.0,
            read_fraction=1.0,
            write_fraction=1.0,
        ),
        intermediate=MemoryTierConfig(
            read_energy_pj_per_byte=0.08,
            write_energy_pj_per_byte=0.08,
            bandwidth_bytes_per_ns=1024.0,
            read_fraction=0.75,
            write_fraction=0.75,
        ),
        off_chip=MemoryTierConfig(
            read_energy_pj_per_byte=1.2,
            write_energy_pj_per_byte=1.5,
            bandwidth_bytes_per_ns=768.0,
            read_fraction=0.25,
            write_fraction=0.25,
        ),
        contention=SYSTEM_CONTENTION_PRESETS[
            "optical_interconnect_broadcast"
        ].to_contention_config(),
    ),
}


_HOROWITZ_ENERGY_SOURCE = ScenarioProvenanceSource(
    title="Computing's energy problem (and what we can do about it)",
    url="https://doi.org/10.1109/ISSCC.2014.6757323",
    reference_id="10.1109/ISSCC.2014.6757323",
    evidence_type="memory-energy hierarchy context",
    supports=(
        "local SRAM/intermediate/off-chip tier separation",
        "data movement can dominate efficient compute",
    ),
)
_JEDEC_HBM_SOURCE = ScenarioProvenanceSource(
    title="JEDEC JESD238 High Bandwidth Memory HBM3 standard notice",
    url=(
        "https://www.businesswire.com/news/home/20220127005320/en/"
        "JEDEC-Publishes-HBM3-Update-to-High-Bandwidth-Memory-HBM-Standard"
    ),
    reference_id="JEDEC JESD238",
    evidence_type="memory-standard context",
    supports=("HBM-class off-chip tier", "shared high-bandwidth stack scenario"),
)
_JEDEC_DDR_SOURCE = ScenarioProvenanceSource(
    title="JEDEC DDR5 SDRAM standard catalog",
    url="https://www.jedec.org/standards-documents/docs/jesd79-5",
    reference_id="JEDEC JESD79-5",
    evidence_type="memory-standard context",
    supports=("DDR-class off-chip tier", "controller/shared DRAM scenario"),
)
_PCI_SIG_SOURCE = ScenarioProvenanceSource(
    title="PCI-SIG PCI Express 6.0 specification overview",
    url="https://pcisig.com/pci-express-6.0-specification",
    reference_id="PCIe 6.0 specification overview",
    evidence_type="host-link/interconnect context",
    supports=("serialized host-link scenario", "PCIe-attached movement path"),
)
_TAIT_WDM_SOURCE = ScenarioProvenanceSource(
    title="Neuromorphic photonic networks using silicon photonic weight banks",
    url="https://www.nature.com/articles/s41598-017-07754-z",
    reference_id="10.1038/s41598-017-07754-z",
    evidence_type="photonic WDM broadcast-and-weight context",
    supports=("optical interconnect scenario", "broadcast movement preset"),
)
_LIGHTENING_TRANSFORMER_SOURCE = ScenarioProvenanceSource(
    title=(
        "Lightening-Transformer: A dynamically-operated optically-interconnected "
        "photonic Transformer accelerator"
    ),
    url="https://arxiv.org/abs/2305.19533",
    reference_id="10.48550/arXiv.2305.19533",
    evidence_type="optically interconnected accelerator context",
    supports=("activation-heavy optical broadcast", "dynamic tensor movement"),
)
_LIGHTNING_SMARTNIC_SOURCE = ScenarioProvenanceSource(
    title=(
        "Lightning: A reconfigurable photonic-electronic SmartNIC for fast and "
        "energy-efficient inference"
    ),
    url="https://dl.acm.org/doi/10.1145/3603269.3604821",
    reference_id="10.1145/3603269.3604821",
    evidence_type="host/network-attached photonic system context",
    supports=("serialized host-attached movement", "packet-to-photonic datapath"),
)

SYSTEM_SCENARIO_PROVENANCE_PACKS: dict[str, ScenarioProvenancePack] = {
    "default": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "Historical PhotonicBench SRAM/intermediate/off-chip defaults; "
            "tier numbers are local assumptions."
        ),
        sources=(_HOROWITZ_ENERGY_SOURCE,),
        local_assumptions=(
            "SRAM, intermediate, and off-chip pJ/byte and bandwidth values are "
            "PhotonicBench defaults, not paper-measured hardware values.",
            "The scenario is a conservative baseline for sensitivity comparisons.",
        ),
        reviewer_note=(
            "Use this as a baseline scenario only; prefer a named profile when "
            "the card is intended to stress a specific hierarchy behavior."
        ),
    ),
    "on_package_sram": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "High-bandwidth local memory sensitivity case with no modeled "
            "off-package movement."
        ),
        sources=(_HOROWITZ_ENERGY_SOURCE,),
        local_assumptions=(
            "All intermediate and off-chip read/write fractions are set to zero.",
            "On-package SRAM bandwidth and pJ/byte are local sweep parameters.",
        ),
        reviewer_note=(
            "This pack tests the upside of keeping converter-interface traffic "
            "near the photonic core."
        ),
    ),
    "on_chip_sram": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope="All modeled converter-interface traffic stays on local SRAM.",
        sources=(_HOROWITZ_ENERGY_SOURCE,),
        local_assumptions=(
            "Off-chip and intermediate traffic fractions are local zeros.",
            "SRAM bandwidth and energy are local parameters for sensitivity, not "
            "a specific macro datasheet."
        ),
        reviewer_note=(
            "Use this to bound cards whose system story depends on aggressive "
            "local buffering."
        ),
    ),
    "hbm": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "HBM-like off-chip tier with lower movement energy and higher "
            "bandwidth than the DDR/default tier."
        ),
        sources=(_JEDEC_HBM_SOURCE, _HOROWITZ_ENERGY_SOURCE),
        local_assumptions=(
            "The 512 bytes/ns off-chip bandwidth is a PhotonicBench local "
            "scenario parameter.",
            "The 3 pJ/byte read/write energy is a local comparison value, not a "
            "JEDEC-published energy number."
        ),
        reviewer_note=(
            "The source anchors the HBM-class hierarchy choice; numeric model "
            "inputs remain local assumptions."
        ),
    ),
    "ddr": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "Generic DDR-class off-chip tier matching the conservative "
            "PhotonicBench baseline movement defaults."
        ),
        sources=(_JEDEC_DDR_SOURCE, _HOROWITZ_ENERGY_SOURCE),
        local_assumptions=(
            "The 16 bytes/ns off-chip bandwidth and 10 pJ/byte energy are local "
            "default parameters.",
            "Controller turnaround is represented by the local contention preset.",
        ),
        reviewer_note=(
            "Use this scenario to expose cards that become movement-bound when "
            "off-chip traffic is DDR-like."
        ),
    ),
    "pcie_attached": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "Serialized host/PCIe-attached path for cards whose data movement "
            "leaves the local accelerator package."
        ),
        sources=(_PCI_SIG_SOURCE, _LIGHTNING_SMARTNIC_SOURCE),
        local_assumptions=(
            "Host-link bandwidth and 50 pJ/byte movement are conservative local "
            "parameters.",
            "The serialized timing mode is a local review guardrail for "
            "host-attached designs."
        ),
        reviewer_note=(
            "The pack makes host-link exposure visible without claiming a full "
            "PCIe protocol simulation."
        ),
    ),
    "optical_interconnect": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "WDM/broadcast-like optical movement scenario with high-bandwidth "
            "intermediate/off-chip paths."
        ),
        sources=(_TAIT_WDM_SOURCE, _LIGHTENING_TRANSFORMER_SOURCE),
        local_assumptions=(
            "Optical interconnect tier pJ/byte, bandwidth, and traffic fractions "
            "are PhotonicBench local sweep parameters.",
            "Broadcast overlap is represented by a local contention model, not "
            "measured link-level scheduling."
        ),
        reviewer_note=(
            "Use this scenario for cards whose claim depends on optical "
            "movement, broadcast, or chiplet/interconnect behavior."
        ),
    ),
}

SYSTEM_CONTENTION_PROVENANCE_PACKS: dict[str, ScenarioProvenancePack] = {
    "single_client": ScenarioProvenancePack(
        status="local-baseline",
        calibration_scope=(
            "Dedicated path: one modeled client, no arbitration loss, and no "
            "calibration/control guardband."
        ),
        local_assumptions=(
            "shared_bandwidth_clients=1, arbitration_efficiency=1, and "
            "calibration_overhead_fraction=0 are local baseline assumptions.",
        ),
        reviewer_note="Use as the no-contention reference point.",
    ),
    "shared_hbm_stack": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "HBM-style shared stack with local two-client bandwidth division, "
            "arbitration loss, and small guardband."
        ),
        sources=(_JEDEC_HBM_SOURCE,),
        local_assumptions=(
            "Two modeled clients, 0.92 arbitration efficiency, and 0.02 "
            "guardband are PhotonicBench local contention parameters.",
        ),
        reviewer_note="Use to test whether HBM sharing changes the ranking.",
    ),
    "ddr_controller": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "DDR/controller-style sharing with local multi-client derate and "
            "larger control guardband."
        ),
        sources=(_JEDEC_DDR_SOURCE,),
        local_assumptions=(
            "Four modeled clients, 0.75 arbitration efficiency, and 0.08 "
            "guardband are local controller-stress assumptions.",
        ),
        reviewer_note=(
            "Use when off-chip traffic should be penalized for controller and "
            "turnaround pressure."
        ),
    ),
    "pcie_round_robin": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "Serialized host-link contention with a local round-robin sharing "
            "and protocol guardband model."
        ),
        sources=(_PCI_SIG_SOURCE, _LIGHTNING_SMARTNIC_SOURCE),
        local_assumptions=(
            "Two modeled clients, 0.85 arbitration efficiency, and 0.05 "
            "guardband are local host-link review parameters.",
        ),
        reviewer_note=(
            "Use to catch host-attached designs whose ranking depends on "
            "assuming free host movement."
        ),
    ),
    "optical_interconnect_broadcast": ScenarioProvenancePack(
        status="source-context-plus-local-parameters",
        calibration_scope=(
            "Optical broadcast contention model with reduced loaded-client "
            "penalty and explicit control guardband."
        ),
        sources=(_TAIT_WDM_SOURCE, _LIGHTENING_TRANSFORMER_SOURCE),
        local_assumptions=(
            "1.5 modeled clients, 0.92 arbitration efficiency, and 0.02 "
            "guardband are local WDM/broadcast sensitivity parameters.",
        ),
        reviewer_note=(
            "Use to compare whether optical broadcast movement changes the "
            "decision without presenting it as measured hardware contention."
        ),
    ),
}


def system_config_to_dict(system: SystemConfig) -> dict[str, Any]:
    return {
        "profile": system.profile,
        "profile_overrides": list(system.profile_overrides),
        "scenario": system_memory_scenario_to_dict(system),
        "memory_timing_mode": system.memory_timing_mode,
        "contention": system_contention_config_to_dict(system.contention),
        "sram": memory_tier_config_to_dict(system.sram),
        "intermediate": memory_tier_config_to_dict(system.intermediate),
        "off_chip": memory_tier_config_to_dict(system.off_chip),
    }


def system_memory_scenario_to_dict(system: SystemConfig) -> dict[str, Any]:
    profile = SYSTEM_PROFILES.get(system.profile)
    contention_preset = SYSTEM_CONTENTION_PRESETS.get(system.contention.preset)
    scenario_pack = SYSTEM_SCENARIO_PROVENANCE_PACKS.get(
        system.profile,
        _custom_scenario_provenance_pack(system.profile),
    )
    contention_pack = SYSTEM_CONTENTION_PROVENANCE_PACKS.get(
        system.contention.preset,
        _custom_contention_provenance_pack(system.contention.preset),
    )
    return {
        "name": system.profile,
        "description": (
            profile.description
            if profile is not None
            else "Manual system scenario assembled from explicit tier settings."
        ),
        "profile_overrides": list(system.profile_overrides),
        "memory_timing_mode": system.memory_timing_mode,
        "contention_preset": system.contention.preset,
        "contention_preset_description": _contention_preset_description(
            system.contention,
            contention_preset,
        ),
        "overlap_model": system.contention.overlap_model,
        "scenario_provenance": scenario_provenance_pack_to_dict(scenario_pack),
        "contention_provenance": scenario_provenance_pack_to_dict(contention_pack),
        "assumptions": {
            "shared_bandwidth_clients": system.contention.shared_bandwidth_clients,
            "arbitration_efficiency": system.contention.arbitration_efficiency,
            "calibration_overhead_fraction": (
                system.contention.calibration_overhead_fraction
            ),
            "sram": memory_tier_config_to_dict(system.sram),
            "intermediate": memory_tier_config_to_dict(system.intermediate),
            "off_chip": memory_tier_config_to_dict(system.off_chip),
        },
        "note": (
            "Memory scenario fields are local modeling assumptions for review "
            "and sensitivity analysis; they are not paper-published hardware "
            "measurements unless a card states otherwise."
        ),
    }


def scenario_provenance_pack_to_dict(pack: ScenarioProvenancePack) -> dict[str, Any]:
    return {
        "status": pack.status,
        "calibration_scope": pack.calibration_scope,
        "sources": [
            {
                "title": source.title,
                "url": source.url,
                "reference_id": source.reference_id,
                "evidence_type": source.evidence_type,
                "supports": list(source.supports),
            }
            for source in pack.sources
        ],
        "local_assumptions": list(pack.local_assumptions),
        "reviewer_note": pack.reviewer_note,
    }


def _custom_scenario_provenance_pack(profile_name: str) -> ScenarioProvenancePack:
    return ScenarioProvenancePack(
        status="custom-local-parameters",
        calibration_scope=(
            f"Manual system scenario {profile_name!r} assembled from explicit "
            "tier settings."
        ),
        local_assumptions=(
            "Custom profile tier energy, bandwidth, traffic fractions, timing "
            "mode, and contention values are authoritative local inputs.",
        ),
        reviewer_note=(
            "No named scenario pack matched this profile; audit the explicit "
            "model_inputs.system tier values."
        ),
    )


def _custom_contention_provenance_pack(preset_name: str) -> ScenarioProvenancePack:
    return ScenarioProvenancePack(
        status="custom-local-parameters",
        calibration_scope=(
            f"Manual contention preset {preset_name!r} assembled from explicit "
            "contention settings."
        ),
        local_assumptions=(
            "Custom shared-client count, arbitration efficiency, calibration "
            "guardband, and overlap model are authoritative local inputs.",
        ),
        reviewer_note=(
            "No named contention pack matched this preset; audit the explicit "
            "model_inputs.system.contention values."
        ),
    )


def _contention_preset_description(
    contention: SystemContentionConfig,
    preset: SystemContentionPreset | None,
) -> str:
    if preset is None:
        return "Custom contention calibration preset."
    if contention == preset.to_contention_config():
        return preset.description
    return (
        f"Custom overrides applied to {preset.name}: {preset.description} "
        "Numeric contention assumptions in this scenario are authoritative."
    )


def system_contention_config_to_dict(
    contention: SystemContentionConfig,
) -> dict[str, float | str]:
    return {
        "preset": contention.preset,
        "shared_bandwidth_clients": contention.shared_bandwidth_clients,
        "arbitration_efficiency": contention.arbitration_efficiency,
        "calibration_overhead_fraction": contention.calibration_overhead_fraction,
        "overlap_model": contention.overlap_model,
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
class SourceAuditMetric:
    metric: str
    quoted_value: str
    source_location: str
    note: str = ""


@dataclass(frozen=True)
class SourceAuditConversion:
    derived_metric: str
    formula: str
    inputs: dict[str, str | int | float | bool] = field(default_factory=dict)
    result: str = ""
    note: str = ""


@dataclass(frozen=True)
class SourceAuditConfig:
    quoted_metrics: tuple[SourceAuditMetric, ...] = ()
    local_assumptions: tuple[str, ...] = ()
    conversion_math: tuple[SourceAuditConversion, ...] = ()
    confidence_flags: tuple[str, ...] = ()


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
    source_audit: SourceAuditConfig | None = None
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
        source_audit=_optional_source_audit(raw),
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


def _optional_source_audit(raw: dict[str, Any]) -> SourceAuditConfig | None:
    if "source_audit" not in raw:
        return None
    audit = _require_mapping(raw, "source_audit")
    return SourceAuditConfig(
        quoted_metrics=_source_audit_metrics(audit),
        local_assumptions=_string_list(
            audit,
            "source_audit.local_assumptions",
            required=False,
        ),
        conversion_math=_source_audit_conversions(audit),
        confidence_flags=_string_list(
            audit,
            "source_audit.confidence_flags",
            required=False,
        ),
    )


def _source_audit_metrics(raw: dict[str, Any]) -> tuple[SourceAuditMetric, ...]:
    if "quoted_metrics" not in raw:
        return ()
    values = raw["quoted_metrics"]
    if not isinstance(values, list):
        raise ValueError("source_audit.quoted_metrics must be a list of mappings")

    parsed: list[SourceAuditMetric] = []
    for index, value in enumerate(values):
        if not isinstance(value, dict):
            raise ValueError(
                f"source_audit.quoted_metrics[{index}] must be a mapping"
            )
        parsed.append(
            SourceAuditMetric(
                metric=_required_str(
                    value,
                    f"source_audit.quoted_metrics[{index}].metric",
                ),
                quoted_value=_required_str(
                    value,
                    f"source_audit.quoted_metrics[{index}].quoted_value",
                ),
                source_location=_required_str(
                    value,
                    f"source_audit.quoted_metrics[{index}].source_location",
                ),
                note=_optional_str(
                    value,
                    f"source_audit.quoted_metrics[{index}].note",
                ),
            )
        )
    return tuple(parsed)


def _source_audit_conversions(
    raw: dict[str, Any],
) -> tuple[SourceAuditConversion, ...]:
    if "conversion_math" not in raw:
        return ()
    values = raw["conversion_math"]
    if not isinstance(values, list):
        raise ValueError("source_audit.conversion_math must be a list of mappings")

    parsed: list[SourceAuditConversion] = []
    for index, value in enumerate(values):
        if not isinstance(value, dict):
            raise ValueError(
                f"source_audit.conversion_math[{index}] must be a mapping"
            )
        parsed.append(
            SourceAuditConversion(
                derived_metric=_required_str(
                    value,
                    f"source_audit.conversion_math[{index}].derived_metric",
                ),
                formula=_required_str(
                    value,
                    f"source_audit.conversion_math[{index}].formula",
                ),
                inputs=_optional_scalar_metrics(
                    value,
                    f"source_audit.conversion_math[{index}].inputs",
                ),
                result=_required_str(
                    value,
                    f"source_audit.conversion_math[{index}].result",
                ),
                note=_optional_str(
                    value,
                    f"source_audit.conversion_math[{index}].note",
                ),
            )
        )
    return tuple(parsed)


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
    contention = _optional_nested_mapping(system, "system", "contention")
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
            ("contention", contention),
        )
        if value
    )
    effective_profile = profile_name or ("manual" if profile_overrides else "default")
    return SystemConfig(
        profile=effective_profile,
        profile_overrides=profile_overrides,
        memory_timing_mode=memory_timing_mode,
        contention=_system_contention_config(
            contention,
            "system.contention",
            default=base.contention,
        ),
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


def _contention_preset_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    *,
    default: str,
) -> str:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    value = raw[key]
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{dotted_key} must be a non-empty string")
    preset = value.strip()
    if preset not in SYSTEM_CONTENTION_PRESETS:
        choices = ", ".join(sorted(SYSTEM_CONTENTION_PRESETS))
        raise ValueError(f"{dotted_key} must be one of: {choices}")
    return preset


def _contention_overlap_model_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    *,
    default: str,
) -> str:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    value = raw[key]
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{dotted_key} must be a non-empty string")
    overlap_model = value.strip()
    if overlap_model not in SYSTEM_CONTENTION_OVERLAP_MODELS:
        choices = ", ".join(SYSTEM_CONTENTION_OVERLAP_MODELS)
        raise ValueError(f"{dotted_key} must be one of: {choices}")
    return overlap_model


def _system_contention_config(
    raw: dict[str, Any] | None,
    section: str,
    *,
    default: SystemContentionConfig,
) -> SystemContentionConfig:
    if raw is None:
        return default

    preset = _contention_preset_with_default(
        raw,
        f"{section}.preset",
        default=default.preset,
    )
    base = (
        SYSTEM_CONTENTION_PRESETS[preset].to_contention_config()
        if preset != default.preset
        else default
    )
    return SystemContentionConfig(
        preset=preset,
        shared_bandwidth_clients=_positive_float_with_default(
            raw,
            f"{section}.shared_bandwidth_clients",
            default=base.shared_bandwidth_clients,
        ),
        arbitration_efficiency=_efficiency_with_default(
            raw,
            f"{section}.arbitration_efficiency",
            default=base.arbitration_efficiency,
        ),
        calibration_overhead_fraction=_non_negative_float_with_default(
            raw,
            f"{section}.calibration_overhead_fraction",
            default=base.calibration_overhead_fraction,
        ),
        overlap_model=_contention_overlap_model_with_default(
            raw,
            f"{section}.overlap_model",
            default=base.overlap_model,
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
    return value.strip()


def _optional_str(raw: dict[str, Any], dotted_key: str) -> str:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return ""
    value = raw[key]
    if not isinstance(value, str):
        raise ValueError(f"{dotted_key} must be a string")
    return value.strip()


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


def _efficiency_with_default(
    raw: dict[str, Any],
    dotted_key: str,
    default: float,
) -> float:
    key = dotted_key.rsplit(".", 1)[-1]
    if key not in raw:
        return default
    return _efficiency(raw, dotted_key)


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
