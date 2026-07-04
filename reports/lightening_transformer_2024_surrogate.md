# PhotonicBench Benchmark Card: Lightening-Transformer 2024 dynamic transformer surrogate

Source-backed activation-heavy card for the HPCA 2024 Lightening-Transformer accelerator. The paper targets dynamic full-range tensor multiplication and optical inter-core broadcast for Transformers; this config uses a dense 128x128 local matmul under the optical_interconnect scenario for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator |
| URL | https://arxiv.org/abs/2305.19533 |
| DOI | 10.48550/arXiv.2305.19533 |
| Venue | HPCA 2024; arXiv:2305.19533 |
| Claim status | paper-reported relative energy, latency, EDP, and architecture claims; dense transformer-matmul surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Dynamically-operated photonic tensor core with optical inter-core broadcast |
| Energy reduction vs prior photonic accelerators min x | 2.6 |
| Latency reduction vs prior photonic accelerators min x | 12 |
| Edp reduction vs electronic transformer accelerators orders min | 2 |
| Edp reduction vs electronic transformer accelerators orders max | 3 |
| Supports dynamic full range tensor multiplication | True |
| Photonic inter core broadcast | True |
| Implementation available | https://github.com/zhuhanqing/Lightening-Transformer |
| Surrogate mapping | m=128, k=128, n=128 with batch=8 stresses dynamic activation and optical-broadcast movement; it is not the paper's full transformer scheduler, DPTC microarchitecture, or model-accuracy evaluation. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | relative_energy_reduction, relative_latency_reduction, energy_delay_product, transformer_architecture, dynamic_tensor_core |
| Local surrogate type | activation_heavy_dynamic_transformer_matmul_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Source claims relative energy, latency, EDP, and architecture behavior; PhotonicBench localizes that to one dense activation-heavy matmul and optical_interconnect movement sensitivity.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Energy reduction vs prior photonic accelerators | >2.6x | Abstract, arXiv:2305.19533 / HPCA 2024 | Relative source claim; no absolute TOPS/W is entered. |
| Latency reduction vs prior photonic accelerators | >12x | Abstract, arXiv:2305.19533 / HPCA 2024 | Relative source claim; local_model timing remains a PhotonicBench surrogate. |
| Energy-delay product vs electronic Transformer accelerators | 2 to 3 orders of magnitude lower | Abstract, arXiv:2305.19533 / HPCA 2024 |  |
| Dynamic tensor behavior | DPTC supports dynamic and full-range matrix multiplication | Abstract, arXiv:2305.19533 / HPCA 2024 |  |
| Architecture | Dynamically-operated photonic tensor core with optical inter-core broadcast | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Energy reduction vs prior photonic accelerators min x | 2.6 | published_calibration.additional_metrics.energy_reduction_vs_prior_photonic_accelerators_min_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Latency reduction vs prior photonic accelerators min x | 12 | published_calibration.additional_metrics.latency_reduction_vs_prior_photonic_accelerators_min_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Edp reduction vs electronic transformer accelerators orders min | 2 | published_calibration.additional_metrics.edp_reduction_vs_electronic_transformer_accelerators_orders_min | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Edp reduction vs electronic transformer accelerators orders max | 3 | published_calibration.additional_metrics.edp_reduction_vs_electronic_transformer_accelerators_orders_max | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Supports dynamic full range tensor multiplication | True | published_calibration.additional_metrics.supports_dynamic_full_range_tensor_multiplication | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Photonic inter core broadcast | True | published_calibration.additional_metrics.photonic_inter_core_broadcast | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Implementation available | https://github.com/zhuhanqing/Lightening-Transformer | published_calibration.additional_metrics.implementation_available | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=128, k=128, n=128 with batch=8 stresses dynamic activation and optical-broadcast movement; it is not the paper's full transformer scheduler, DPTC microarchitecture, or model-accuracy evaluation. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local 128x128 dense matmul and batch=8 are chosen to stress activation-heavy movement, not to reproduce a specific transformer layer.
- The optical_interconnect scenario is a local PhotonicBench sensitivity pack for broadcast-style movement.
- Local surrogate type: activation_heavy_dynamic_transformer_matmul_surrogate.
- Source claims relative energy, latency, EDP, and architecture behavior; PhotonicBench localizes that to one dense activation-heavy matmul and optical_interconnect movement sensitivity.
- Relative energy, latency, and EDP claims remain under published_calibration and published_reference.
- Local optical MAC energy, converter energy, one-nanosecond latency, and hierarchy movement are generic PhotonicBench assumptions.
- The non-weight-stationary local execution intentionally stresses dynamic operand movement and does not model the DPTC scheduler or attention/MLP tiling.

Confidence flags:

- relative_metrics_only_no_absolute_tops_per_watt
- transformer_scheduler_not_reproduced
- claim_status=paper-reported relative energy, latency, EDP, and architecture claims; dense transformer-matmul surrogate
- source_doi=10.48550/arXiv.2305.19533
- source_quality_grade=B
- coverage.accuracy=reported
- coverage.area=not_reported
- coverage.energy=reported
- coverage.precision=not_reported
- coverage.throughput=reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 128 x 128 times 128 x 128 |
| Operations per batch | 8 |
| MACs per operation | 2097152 |
| MACs | 16777216 |
| Equivalent ops per operation | 4194304 |
| Equivalent ops | 33554432 |
| Output elements per operation | 16384 |
| Output elements | 131072 |
| Vector DAC conversions | 131072 |
| Weight DAC conversions | 131072 |
| DAC conversions | 262144 |
| ADC conversions | 131072 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 8 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 131072 bytes |
| Weight operand reads | 131072 bytes |
| Output writes | 131072 bytes |
| Total interface traffic | 393216 bytes |
| MACs per interface byte | 42.6667 |
| Equivalent ops per interface byte | 85.3333 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 262144 bytes | 131072 bytes | 7864.320 pJ | 50.00% | 4.94% | 2.52% | 192.000 ns | 319.304 ns | 39.913 | 1256.107 bytes/ns | 49152.000 bytes/ns | 39.1304 | -47895.893 bytes/ns |
| Intermediate/cache | 196608 bytes | 98304 bytes | 23592.960 pJ | 37.50% | 14.81% | 7.56% | 288.000 ns | 478.957 ns | 59.8696 | 628.053 bytes/ns | 36864.000 bytes/ns | 58.6957 | -36235.947 bytes/ns |
| Off-chip/DRAM | 65536 bytes | 32768 bytes | 127795.200 pJ | 12.50% | 80.25% | 40.95% | 128.000 ns | 212.870 ns | 26.6087 | 471.040 bytes/ns | 12288.000 bytes/ns | 26.087 | -11816.960 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 152829.952 pJ | 48.97% |
| SRAM movement | 7864.320 pJ | 2.52% |
| Intermediate/cache movement | 23592.960 pJ | 7.56% |
| Off-chip/DRAM movement | 127795.200 pJ | 40.95% |
| Total movement | 159252.480 pJ | 51.03% |

| Metric | Value |
| --- | ---: |
| System profile | optical_interconnect |
| Profile tier overrides | none |
| Memory scenario | optical_interconnect |
| Scenario description | Optical interconnect scenario: local SRAM is paired with high bandwidth intermediate and off-chip optical movement paths to stress WDM/broadcast-like data movement separately from core photonic compute. |
| Memory timing mode | overlapped |
| Contention preset | optical_interconnect_broadcast |
| Contention preset description | Optical interconnect/broadcast path: wavelength fanout reduces loaded-client contention, but arbitration and control guardband remain explicit local assumptions. |
| Contention overlap model | wavelength_broadcast_overlap |
| Shared bandwidth clients | 1.5 |
| Arbitration efficiency | 0.92 |
| Calibration/control overhead | 0.02 |
| Local compute/conversion energy | 152829.952 pJ |
| Total movement energy | 159252.480 pJ |
| Total system energy | 312082.432 pJ |
| System energy per MAC | 0.019 pJ |
| System energy per equivalent op | 0.009 pJ |
| Local compute/conversion energy share | 48.97% |
| Movement energy share | 51.03% |
| Movement-to-compute energy ratio | 1.04202 |
| Total hierarchy traffic | 786432 bytes |
| Hierarchy equivalent ops per byte | 42.6667 |
| Movement energy per hierarchy byte | 0.202 pJ |
| SRAM traffic share | 50.00% |
| Intermediate/cache traffic share | 37.50% |
| Off-chip traffic share | 12.50% |
| Dominant traffic tier | sram |
| Dominant system energy component | local_compute_and_conversion |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | intermediate |
| Contention memory bottleneck tier | intermediate |
| Max tier nominal pressure ratio | 36 |
| Max tier contention pressure ratio | 59.8696 |
| Max tier movement-energy share | 80.25% |
| Max tier system energy share | 40.95% |
| Contention bandwidth saturation tier | intermediate |
| Max tier contention bandwidth utilization | 58.6957 |
| Min tier contention bandwidth headroom ratio | 0.017037 |
| Max transfer time | 288.000 ns |
| Serialized transfer time | 608.000 ns |
| Effective transfer time | 288.000 ns |
| Contention bandwidth derate | 0.613333 |
| Contention-adjusted effective transfer | 469.565 ns |
| Calibration-adjusted effective transfer | 478.957 ns |
| Calibration guardband time | 9.391 ns |
| Contention transfer overhead | 63.04% |
| Total transfer overhead | 66.30% |
| Effective loaded hierarchy bandwidth | 2730.667 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 1674.809 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 1641.969 bytes/ns |
| Effective usable bandwidth under load | 1674.809 bytes/ns |
| Guardbanded usable bandwidth under load | 1641.969 bytes/ns |
| Transfer-to-compute time ratio | 36 |
| Bandwidth-limited tier | intermediate |
| Bandwidth-limited batch latency | 288.000 ns |
| Bandwidth pressure ratio | 36 |
| Bandwidth-limited equivalent ops/s | 116508444444444.422 |
| Contention-limited tier | intermediate |
| Contention-adjusted batch latency | 478.957 ns |
| Contention-adjusted transfer-to-compute time ratio | 59.8696 |
| Contention pressure ratio | 59.8696 |
| Contention-adjusted equivalent ops/s | 70057365286855.469 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | WDM/broadcast-like optical movement scenario with high-bandwidth intermediate/off-chip paths. | Neuromorphic photonic networks using silicon photonic weight banks (10.1038/s41598-017-07754-z); Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator (10.48550/arXiv.2305.19533) | Optical interconnect tier pJ/byte, bandwidth, and traffic fractions are PhotonicBench local sweep parameters.; Broadcast overlap is represented by a local contention model, not measured link-level scheduling. | Use this scenario for cards whose claim depends on optical movement, broadcast, or chiplet/interconnect behavior. |
| Contention preset | source-context-plus-local-parameters | Optical broadcast contention model with reduced loaded-client penalty and explicit control guardband. | Neuromorphic photonic networks using silicon photonic weight banks (10.1038/s41598-017-07754-z); Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator (10.48550/arXiv.2305.19533) | 1.5 modeled clients, 0.92 arbitration efficiency, and 0.02 guardband are local WDM/broadcast sensitivity parameters. | Use to compare whether optical broadcast movement changes the decision without presenting it as measured hardware contention. |


## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 8388.608 pJ |
| Laser electrical energy | 33554.432 pJ |
| Detector energy | 1310.720 pJ |
| ADC energy | 65536.000 pJ |
| Vector DAC energy | 26214.400 pJ |
| Weight DAC energy | 26214.400 pJ |
| DAC energy | 52428.800 pJ |
| Total energy | 152829.952 pJ |
| Energy per MAC | 0.009 pJ |
| Energy per equivalent op | 0.005 pJ |
| Peripheral share | 78.04% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 8.000 ns |
| Steady-state operations/s | 1000000000.000 |
| Steady-state equivalent ops/s | 4194304000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000100 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Relative energy, latency, and EDP claims remain under published_calibration and published_reference.
- Local optical MAC energy, converter energy, one-nanosecond latency, and hierarchy movement are generic PhotonicBench assumptions.
- The non-weight-stationary local execution intentionally stresses dynamic operand movement and does not model the DPTC scheduler or attention/MLP tiling.
- The benchmark models 8 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
