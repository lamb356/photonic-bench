# PhotonicBench Benchmark Card: ChipAI 2025 photonic chiplet surrogate

Source-backed card for the Journal of Systems Architecture 2025 ChipAI photonic chiplet accelerator. The local workload is a dense 128x128 surrogate chosen to stress chiplet/off-chip movement while paper-reported relative latency and energy reductions remain separate.

## Provenance

| Field | Value |
| --- | --- |
| Source | A scalable chiplet-based accelerator for efficient DNN inference using silicon photonics |
| URL | https://doi.org/10.1016/j.sysarc.2024.103308 |
| DOI | 10.1016/j.sysarc.2024.103308 |
| Venue | Journal of Systems Architecture 158, 103308 (2025) |
| Claim status | paper-reported relative inference-time and energy reductions; dense chiplet/off-chip surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | ChipAI silicon-photonic chiplet accelerator with hybrid optical network |
| Inference time reduction percent up to | 82 |
| Energy reduction percent up to | 79 |
| Hybrid optical network | True |
| Inter chiplet data sharing | True |
| Intra chiplet data sharing | True |
| Surrogate mapping | m=128, k=128, n=128 with batch/reuse settings stresses off-chip/chiplet movement; it is not a reproduction of the ChipAI simulator. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | relative_latency_reduction, relative_energy_reduction, photonic_interconnect_architecture |
| Local surrogate type | photonic_chiplet_dense_movement_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | not_applicable |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- The paper-reported relative reductions and hybrid optical-network behavior are kept as published references; local absolute energy, timing, and hierarchy metrics are PhotonicBench estimates.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | ChipAI silicon-photonic chiplet accelerator with hybrid optical network | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Inference time reduction percent up to | 82 | published_calibration.additional_metrics.inference_time_reduction_percent_up_to | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Energy reduction percent up to | 79 | published_calibration.additional_metrics.energy_reduction_percent_up_to | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Hybrid optical network | True | published_calibration.additional_metrics.hybrid_optical_network | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Inter chiplet data sharing | True | published_calibration.additional_metrics.inter_chiplet_data_sharing | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Intra chiplet data sharing | True | published_calibration.additional_metrics.intra_chiplet_data_sharing | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=128, k=128, n=128 with batch/reuse settings stresses off-chip/chiplet movement; it is not a reproduction of the ChipAI simulator. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: photonic_chiplet_dense_movement_surrogate.
- The paper-reported relative reductions and hybrid optical-network behavior are kept as published references; local absolute energy, timing, and hierarchy metrics are PhotonicBench estimates.
- The dense local workload intentionally stresses chiplet/off-chip movement and reuse rather than matching a specific DNN layer from the ChipAI paper.
- The optical_interconnect scenario is used as a local calibrated movement assumption for the chiplet interconnect sensitivity.
- Published relative latency and energy reductions remain under published_calibration and are not converted into absolute local model claims.

Confidence flags:

- claim_status=paper-reported relative inference-time and energy reductions; dense chiplet/off-chip surrogate
- source_doi=10.1016/j.sysarc.2024.103308
- source_quality_grade=B
- coverage.accuracy=not_applicable
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
| Operations per batch | 4 |
| MACs per operation | 2097152 |
| MACs | 8388608 |
| Equivalent ops per operation | 4194304 |
| Equivalent ops | 16777216 |
| Output elements per operation | 16384 |
| Output elements | 65536 |
| Vector DAC conversions | 32768 |
| Weight DAC conversions | 16384 |
| DAC conversions | 49152 |
| ADC conversions | 65536 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 4 |
| Vector reuse factor | 2 |
| Weight reuse factor | 8 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 32768 bytes |
| Weight operand reads | 16384 bytes |
| Output writes | 65536 bytes |
| Total interface traffic | 114688 bytes |
| MACs per interface byte | 73.1429 |
| Equivalent ops per interface byte | 146.286 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 49152 bytes | 65536 bytes | 2293.760 pJ | 50.00% | 4.73% | 2.11% | 56.000 ns | 93.130 ns | 23.2826 | 1256.107 bytes/ns | 28672.000 bytes/ns | 22.8261 | -27415.893 bytes/ns |
| Intermediate/cache | 36864 bytes | 49152 bytes | 6881.280 pJ | 37.50% | 14.19% | 6.34% | 84.000 ns | 139.696 ns | 34.9239 | 628.053 bytes/ns | 21504.000 bytes/ns | 34.2391 | -20875.947 bytes/ns |
| Off-chip/DRAM | 12288 bytes | 16384 bytes | 39321.600 pJ | 12.50% | 81.08% | 36.23% | 37.333 ns | 62.087 ns | 15.5217 | 471.040 bytes/ns | 7168.000 bytes/ns | 15.2174 | -6696.960 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 60030.976 pJ | 55.31% |
| SRAM movement | 2293.760 pJ | 2.11% |
| Intermediate/cache movement | 6881.280 pJ | 6.34% |
| Off-chip/DRAM movement | 39321.600 pJ | 36.23% |
| Total movement | 48496.640 pJ | 44.69% |

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
| Local compute/conversion energy | 60030.976 pJ |
| Total movement energy | 48496.640 pJ |
| Total system energy | 108527.616 pJ |
| System energy per MAC | 0.013 pJ |
| System energy per equivalent op | 0.006 pJ |
| Local compute/conversion energy share | 55.31% |
| Movement energy share | 44.69% |
| Movement-to-compute energy ratio | 0.80786 |
| Total hierarchy traffic | 229376 bytes |
| Hierarchy equivalent ops per byte | 73.1429 |
| Movement energy per hierarchy byte | 0.211 pJ |
| SRAM traffic share | 50.00% |
| Intermediate/cache traffic share | 37.50% |
| Off-chip traffic share | 12.50% |
| Dominant traffic tier | sram |
| Dominant system energy component | local_compute_and_conversion |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | intermediate |
| Contention memory bottleneck tier | intermediate |
| Max tier nominal pressure ratio | 21 |
| Max tier contention pressure ratio | 34.9239 |
| Max tier movement-energy share | 81.08% |
| Max tier system energy share | 36.23% |
| Contention bandwidth saturation tier | intermediate |
| Max tier contention bandwidth utilization | 34.2391 |
| Min tier contention bandwidth headroom ratio | 0.0292063 |
| Max transfer time | 84.000 ns |
| Serialized transfer time | 177.333 ns |
| Effective transfer time | 84.000 ns |
| Contention bandwidth derate | 0.613333 |
| Contention-adjusted effective transfer | 136.957 ns |
| Calibration-adjusted effective transfer | 139.696 ns |
| Calibration guardband time | 2.739 ns |
| Contention transfer overhead | 63.04% |
| Total transfer overhead | 66.30% |
| Effective loaded hierarchy bandwidth | 2730.667 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 1674.809 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 1641.969 bytes/ns |
| Effective usable bandwidth under load | 1674.809 bytes/ns |
| Guardbanded usable bandwidth under load | 1641.969 bytes/ns |
| Transfer-to-compute time ratio | 21 |
| Bandwidth-limited tier | intermediate |
| Bandwidth-limited batch latency | 84.000 ns |
| Bandwidth pressure ratio | 21 |
| Bandwidth-limited equivalent ops/s | 199728761904761.875 |
| Contention-limited tier | intermediate |
| Contention-adjusted batch latency | 139.696 ns |
| Contention-adjusted transfer-to-compute time ratio | 34.9239 |
| Contention pressure ratio | 34.9239 |
| Contention-adjusted equivalent ops/s | 120098340491752.266 |

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
| Optical compute delivered | 4194.304 pJ |
| Laser electrical energy | 16777.216 pJ |
| Detector energy | 655.360 pJ |
| ADC energy | 32768.000 pJ |
| Vector DAC energy | 6553.600 pJ |
| Weight DAC energy | 3276.800 pJ |
| DAC energy | 9830.400 pJ |
| Total energy | 60030.976 pJ |
| Energy per MAC | 0.007 pJ |
| Energy per equivalent op | 0.004 pJ |
| Peripheral share | 72.05% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 4.000 ns |
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
- The dense local workload intentionally stresses chiplet/off-chip movement and reuse rather than matching a specific DNN layer from the ChipAI paper.
- The optical_interconnect scenario is used as a local calibrated movement assumption for the chiplet interconnect sensitivity.
- Published relative latency and energy reductions remain under published_calibration and are not converted into absolute local model claims.
- The benchmark models 4 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
