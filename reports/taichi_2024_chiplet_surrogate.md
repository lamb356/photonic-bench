# PhotonicBench Benchmark Card: Taichi 2024 photonic chiplet surrogate

Source-backed card for the Science 2024 Taichi photonic chiplet. The published reference is a diffractive-interference hybrid optical neural-network chiplet; this config uses a 64x64 dense local matmul surrogate because PhotonicBench does not model Taichi's distributed optical protocol.

## Provenance

| Field | Value |
| --- | --- |
| Source | Large-scale photonic chiplet Taichi empowers 160-TOPS/W artificial general intelligence |
| URL | https://www.science.org/doi/10.1126/science.adl1203 |
| DOI | 10.1126/science.adl1203 |
| Venue | Science 384, 202-209 (2024) |
| Claim status | paper-reported energy/scale targets; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Diffractive-interference hybrid photonic AI chiplet |
| Energy efficiency, including lasers | 160.000 TOPS/W |
| Energy per equivalent op, including lasers | 0.006 pJ |
| Energy per MAC, including lasers | 0.013 pJ |
| Workload energy, including lasers | 3276.800 pJ |
| Component-model / published including-lasers ratio | 1.297 x |
| Input output dimension | 64x64 |
| Area efficiency tmacs per mm2 | 879 |
| Optical neurons max | 10000000000 |
| Experimental omniglot accuracy percent | 91.89 |
| Experimental mini imagenet accuracy percent | 87.74 |
| Reported energy efficiency note | Source reports 160 TOPS/W on-chip energy efficiency. |
| Surrogate mapping | m=64, k=64, n=64 is a dense local surrogate for comparison only; not the Taichi distributed optical protocol. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | energy_efficiency, area_efficiency, accuracy, scale |
| Local surrogate type | dense_photonic_chiplet_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | reported |
| Accuracy | reported |
| Area | reported |
| Precision | not_reported |

Source-quality notes:

- Strong energy, area, scale, and task-metric coverage, but no exact dense-matmul local reproduction of the Taichi protocol is claimed.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 64 x 64 times 64 x 64 |
| Operations per batch | 1 |
| MACs per operation | 262144 |
| MACs | 262144 |
| Equivalent ops per operation | 524288 |
| Equivalent ops | 524288 |
| Output elements per operation | 4096 |
| Output elements | 4096 |
| Vector DAC conversions | 4096 |
| Weight DAC conversions | 4096 |
| DAC conversions | 8192 |
| ADC conversions | 4096 |

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
| Vector operand reads | 4096 bytes |
| Weight operand reads | 4096 bytes |
| Output writes | 4096 bytes |
| Total interface traffic | 12288 bytes |
| MACs per interface byte | 21.3333 |
| Equivalent ops per interface byte | 42.6667 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 33.33% | 0.20% | 0.19% | 12.000 ns | 12.000 ns | 12 | 1024.000 bytes/ns | 12288.000 bytes/ns | 12 | -11264.000 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 33.33% | 1.96% | 1.89% | 48.000 ns | 48.000 ns | 48 | 256.000 bytes/ns | 12288.000 bytes/ns | 48 | -12032.000 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 122880.000 pJ | 33.33% | 97.85% | 94.64% | 768.000 ns | 768.000 ns | 768 | 16.000 bytes/ns | 12288.000 bytes/ns | 768 | -12272.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 125583.360 pJ |
| Total system energy | 129835.008 pJ |
| System energy per MAC | 0.495 pJ |
| System energy per equivalent op | 0.248 pJ |
| Local compute/conversion energy share | 3.27% |
| Movement energy share | 96.73% |
| Movement-to-compute energy ratio | 29.5376 |
| Total hierarchy traffic | 36864 bytes |
| Hierarchy equivalent ops per byte | 14.2222 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 768 |
| Max tier contention pressure ratio | 768 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.64% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 768 |
| Min tier contention bandwidth headroom ratio | 0.00130208 |
| Max transfer time | 768.000 ns |
| Serialized transfer time | 828.000 ns |
| Effective transfer time | 768.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 768.000 ns |
| Calibration-adjusted effective transfer | 768.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 768 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 768.000 ns |
| Bandwidth pressure ratio | 768 |
| Bandwidth-limited equivalent ops/s | 682666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 768.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 768 |
| Contention pressure ratio | 768 |
| Contention-adjusted equivalent ops/s | 682666666666.667 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 131.072 pJ |
| Laser electrical energy | 524.288 pJ |
| Detector energy | 40.960 pJ |
| ADC energy | 2048.000 pJ |
| Vector DAC energy | 819.200 pJ |
| Weight DAC energy | 819.200 pJ |
| DAC energy | 1638.400 pJ |
| Total energy | 4251.648 pJ |
| Energy per MAC | 0.016 pJ |
| Energy per equivalent op | 0.008 pJ |
| Peripheral share | 87.67% |

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
| Steady-state equivalent ops/s | 524288000000000.000 |

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
- Source reports 64x64 input/output chiplet dimensions and 160 TOPS/W energy efficiency; this card keeps those values as published references.
- Local timing, device energy, converter, and noise settings are PhotonicBench assumptions, not extracted Taichi device-level measurements.
- Weight-stationary mode is used only to avoid reloading the surrogate right operand within one dense local tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
