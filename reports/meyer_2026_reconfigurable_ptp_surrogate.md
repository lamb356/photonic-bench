# PhotonicBench Benchmark Card: Meyer 2026 reconfigurable photonic tensor processor surrogate

Source-backed card for the Nature Communications 2026 rack-integrated photonic tensor processor. The paper demonstrates a 9-input, 3-output all-optical crossbar with PyTorch-facing inference; this config uses one 1x9 by 9x3 local MVM surrogate for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Deep neural network inference on an integrated, reconfigurable photonic tensor processor |
| URL | https://www.nature.com/articles/s41467-026-71599-2 |
| DOI | 10.1038/s41467-026-71599-2 |
| Venue | Nature Communications 17, 3396 (2026) |
| Claim status | paper-reported integrated photonic tensor processor metrics; MVM-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Rack-integrated 9-input, 3-output incoherent photonic tensor processor |
| Reported throughput | 0.054 TOPS |
| Energy efficiency, including lasers | 0.022 TOPS/W |
| Energy per equivalent op, including lasers | 45.455 pJ |
| Energy per MAC, including lasers | 90.909 pJ |
| Workload energy, including lasers | 2454.545 pJ |
| Component-model / published including-lasers ratio | 0.004 x |
| Reported gmac per second | 27 |
| Projected continuous streaming power w | 2.5 |
| Effective symbol rate ghz | 1 |
| Input dac rate gsps | 4 |
| Output adc rate gsps | 2 |
| Weight reprogramming ms | 62 |
| Mvm error single shot percent | 19.4 |
| Mvm error four average percent | 10.9 |
| Mnist accuracy precision percent | 98.1 |
| Cifar10 accuracy percent | 72.0 |
| Optical workload mnist percent | 97.5 |
| Optical workload cifar10 percent | 99.0 |
| Surrogate mapping | m=1, k=9, n=3 mirrors one reported 9-input by 3-output MVM primitive; it is not an end-to-end CNN, RFSoC, calibration, or tiling reproduction. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, energy_efficiency, accuracy, system_integration, error |
| Local surrogate type | primitive_ptp_mvm_surrogate |
| Confidence grade | A |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- The paper reports system-level throughput, projected efficiency, classification accuracy, MVM error, and integration details; the local PhotonicBench workload only mirrors the crossbar primitive shape.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 9 times 9 x 3 |
| Operations per batch | 1 |
| MACs per operation | 27 |
| MACs | 27 |
| Equivalent ops per operation | 54 |
| Equivalent ops | 54 |
| Output elements per operation | 3 |
| Output elements | 3 |
| Vector DAC conversions | 9 |
| Weight DAC conversions | 27 |
| DAC conversions | 36 |
| ADC conversions | 3 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 9 bytes |
| Weight operand reads | 27 bytes |
| Output writes | 3 bytes |
| Total interface traffic | 39 bytes |
| MACs per interface byte | 0.692308 |
| Equivalent ops per interface byte | 1.38462 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 36 bytes | 3 bytes | 0.780 pJ | 33.33% | 0.20% | 0.19% | 0.038 ns | 0.038 ns | 0.0380859 | 1024.000 bytes/ns | 39.000 bytes/ns | 0.0380859 | 985.000 bytes/ns |
| Intermediate/cache | 36 bytes | 3 bytes | 7.800 pJ | 33.33% | 1.96% | 1.91% | 0.152 ns | 0.152 ns | 0.152344 | 256.000 bytes/ns | 39.000 bytes/ns | 0.152344 | 217.000 bytes/ns |
| Off-chip/DRAM | 36 bytes | 3 bytes | 390.000 pJ | 33.33% | 97.85% | 95.74% | 2.438 ns | 2.438 ns | 2.4375 | 16.000 bytes/ns | 39.000 bytes/ns | 2.4375 | -23.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 8.784 pJ |
| Total movement energy | 398.580 pJ |
| Total system energy | 407.364 pJ |
| System energy per MAC | 15.088 pJ |
| System energy per equivalent op | 7.544 pJ |
| Local compute/conversion energy share | 2.16% |
| Movement energy share | 97.84% |
| Movement-to-compute energy ratio | 45.3757 |
| Total hierarchy traffic | 117 bytes |
| Hierarchy equivalent ops per byte | 0.461538 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 2.4375 |
| Max tier contention pressure ratio | 2.4375 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 95.74% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 2.4375 |
| Min tier contention bandwidth headroom ratio | 0.410256 |
| Max transfer time | 2.438 ns |
| Serialized transfer time | 2.628 ns |
| Effective transfer time | 2.438 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 2.438 ns |
| Calibration-adjusted effective transfer | 2.438 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 2.4375 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 2.438 ns |
| Bandwidth pressure ratio | 2.4375 |
| Bandwidth-limited equivalent ops/s | 22153846153.846 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 2.438 ns |
| Contention-adjusted transfer-to-compute time ratio | 2.4375 |
| Contention pressure ratio | 2.4375 |
| Contention-adjusted equivalent ops/s | 22153846153.846 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.013 pJ |
| Laser electrical energy | 0.054 pJ |
| Detector energy | 0.030 pJ |
| ADC energy | 1.500 pJ |
| Vector DAC energy | 1.800 pJ |
| Weight DAC energy | 5.400 pJ |
| DAC energy | 7.200 pJ |
| Total energy | 8.784 pJ |
| Energy per MAC | 0.325 pJ |
| Energy per equivalent op | 0.163 pJ |
| Peripheral share | 99.39% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 1.000 ns |
| Steady-state operations/s | 1000000000.000 |
| Steady-state equivalent ops/s | 54000000000.000 |

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
- Source throughput, efficiency, MVM error, and accuracy values remain under published_calibration and published_reference.
- Local optical MAC energy, converter energy, one-nanosecond latency, and system-tier movement are generic PhotonicBench assumptions.
- Weight-stationary mode approximates fixed programmed weights during streamed input vectors and does not model RFSoC scheduling, calibration, analog averaging, CNN tiling, or off-board electronics.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
