# PhotonicBench Benchmark Card: HITOP 2025 optical tensor processor surrogate

Source-backed card for the Science Advances 2025 HITOP optical tensor processor. The published system uses space-time-wavelength hypermultiplexing; this config uses a 64x64 dense local matmul surrogate for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Hypermultiplexed integrated photonics-based optical tensor processor |
| URL | https://www.science.org/doi/10.1126/sciadv.adu0228 |
| DOI | 10.1126/sciadv.adu0228 |
| Venue | Science Advances 11, eadu0228 (2025) |
| Claim status | paper-reported HITOP efficiency/scale claims; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Space-time-wavelength hypermultiplexed integrated photonic tensor processor |
| Energy efficiency, including lasers | 40.000 TOPS/W |
| Energy per equivalent op, including lasers | 0.025 pJ |
| Energy per MAC, including lasers | 0.050 pJ |
| Workload energy, including lasers | 13107.200 pJ |
| Component-model / published including-lasers ratio | 0.324 x |
| Reported throughput note | Source reports trillions of operations per second but no single scalar TOPS value is encoded in this card. |
| Reported energy per op fj from efficiency | 25 |
| Model parameters validated | 405000 |
| Multiplexing dimensions | space-time-wavelength |
| Dataset url | https://datadryad.org/dataset/doi:10.5061/dryad.kprr4xhgj |
| Surrogate mapping | m=64, k=64, n=64 is a dense local surrogate for HITOP tensor processing; not an exact space-time-wavelength streaming schedule. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | energy_efficiency, scale, model_size, dataset |
| Local surrogate type | dense_hypermultiplexed_tensor_surrogate |
| Confidence grade | C |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | reported |
| Accuracy | not_reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Useful efficiency and scale evidence, but this card does not encode a single reported TOPS value or exact HITOP streaming schedule.



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

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: |
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 12.000 ns | 1024.000 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 48.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 122880.000 pJ | 768.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 125583.360 pJ |
| Total system energy | 129835.008 pJ |
| System energy per MAC | 0.495 pJ |
| System energy per equivalent op | 0.248 pJ |
| Movement energy share | 96.73% |
| Max transfer time | 768.000 ns |
| Serialized transfer time | 828.000 ns |
| Effective transfer time | 768.000 ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 768.000 ns |
| Bandwidth-limited equivalent ops/s | 682666666666.667 |

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
- Source reports HITOP operating at 40 TOPS/W and trillion-operation-per-second scale; PhotonicBench keeps those values as published references.
- Local timing, converter energy, system tiers, and noise settings are generic PhotonicBench assumptions, not HITOP device extraction.
- Weight-stationary mode is used only to model one reused surrogate right operand within a dense local tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
