# PhotonicBench Benchmark Card: Bandyopadhyay 2024 single-chip photonic DNN surrogate

Source-backed card for the Nature Photonics 2024 single-chip photonic deep neural network with forward-only training. The local workload is a compact dense-layer surrogate for the reported six-neuron, three-layer optical neural network.

## Provenance

| Field | Value |
| --- | --- |
| Source | Single-chip photonic deep neural network with forward-only training |
| URL | https://www.nature.com/articles/s41566-024-01567-z |
| DOI | 10.1038/s41566-024-01567-z |
| Venue | Nature Photonics 18, 1335-1343 (2024) |
| Claim status | paper-reported integrated photonic DNN latency and accuracy; compact dense-layer surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Integrated coherent photonic neural network with optical nonlinear activation |
| Reported cycle latency | 0.410 ns |
| Reported neurons | 6 |
| Reported layers | 3 |
| Reported latency ps | 410 |
| Reported accuracy percent | 92.5 |
| Training mode | forward-only in situ training |
| Surrogate mapping | m=6, k=6, n=6 is a compact dense-layer proxy for the reported six-neuron integrated photonic DNN. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | latency, network_size, accuracy, training_mode |
| Local surrogate type | compact_single_chip_dnn_dense_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- The source reports a fully integrated coherent optical neural network with optical nonlinear functions and 410 ps latency.
- Local dense matmul accounting does not reproduce the integrated nonlinear optical network or forward-only training loop.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 6 x 6 times 6 x 6 |
| Operations per batch | 1 |
| MACs per operation | 216 |
| MACs | 216 |
| Equivalent ops per operation | 432 |
| Equivalent ops | 432 |
| Output elements per operation | 36 |
| Output elements | 36 |
| Vector DAC conversions | 36 |
| Weight DAC conversions | 36 |
| DAC conversions | 72 |
| ADC conversions | 36 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 0.410 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 36 bytes |
| Weight operand reads | 36 bytes |
| Output writes | 36 bytes |
| Total interface traffic | 108 bytes |
| MACs per interface byte | 2 |
| Equivalent ops per interface byte | 4 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 72 bytes | 36 bytes | 2.160 pJ | 33.33% | 0.20% | 0.19% | 0.105 ns | 0.105 ns | 0.257241 | 1024.000 bytes/ns | 263.415 bytes/ns | 0.257241 | 760.585 bytes/ns |
| Intermediate/cache | 72 bytes | 36 bytes | 21.600 pJ | 33.33% | 1.96% | 1.90% | 0.422 ns | 0.422 ns | 1.02896 | 256.000 bytes/ns | 263.415 bytes/ns | 1.02896 | -7.415 bytes/ns |
| Off-chip/DRAM | 72 bytes | 36 bytes | 1080.000 pJ | 33.33% | 97.85% | 94.99% | 6.750 ns | 6.750 ns | 16.4634 | 16.000 bytes/ns | 263.415 bytes/ns | 16.4634 | -247.415 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 33.192 pJ |
| Total movement energy | 1103.760 pJ |
| Total system energy | 1136.952 pJ |
| System energy per MAC | 5.264 pJ |
| System energy per equivalent op | 2.632 pJ |
| Local compute/conversion energy share | 2.92% |
| Movement energy share | 97.08% |
| Movement-to-compute energy ratio | 33.2538 |
| Total hierarchy traffic | 324 bytes |
| Hierarchy equivalent ops per byte | 1.33333 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 16.4634 |
| Max tier contention pressure ratio | 16.4634 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.99% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 16.4634 |
| Min tier contention bandwidth headroom ratio | 0.0607407 |
| Max transfer time | 6.750 ns |
| Serialized transfer time | 7.277 ns |
| Effective transfer time | 6.750 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 6.750 ns |
| Calibration-adjusted effective transfer | 6.750 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 16.4634 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 6.750 ns |
| Bandwidth pressure ratio | 16.4634 |
| Bandwidth-limited equivalent ops/s | 64000000000.000 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 6.750 ns |
| Contention-adjusted transfer-to-compute time ratio | 16.4634 |
| Contention pressure ratio | 16.4634 |
| Contention-adjusted equivalent ops/s | 64000000000.000 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.108 pJ |
| Laser electrical energy | 0.432 pJ |
| Detector energy | 0.360 pJ |
| ADC energy | 18.000 pJ |
| Vector DAC energy | 7.200 pJ |
| Weight DAC energy | 7.200 pJ |
| DAC energy | 14.400 pJ |
| Total energy | 33.192 pJ |
| Energy per MAC | 0.154 pJ |
| Energy per equivalent op | 0.077 pJ |
| Peripheral share | 98.70% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 0.410 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 0.410 ns |
| Pipeline cycle time | 0.410 ns |
| Batch latency | 0.410 ns |
| Steady-state operations/s | 2439024390.244 |
| Steady-state equivalent ops/s | 1053658536585.366 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000041 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Local timing uses the reported 410 ps latency as a one-operation surrogate.
- Local energy, converter, and system movement values are generic PhotonicBench assumptions.
- Weight-stationary mode approximates fixed optical weights in the compact local dense layer.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
