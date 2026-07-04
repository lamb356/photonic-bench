# PhotonicBench Benchmark Card: Dong 2023 continuous-time photonic tensor core surrogate

Source-backed card for the Nature Photonics 2023 higher-dimensional photonic tensor core using continuous-time data. The local workload maps the reported 3x3 ECG-kernel by 3x100 input framing into a dense matmul surrogate.

## Provenance

| Field | Value |
| --- | --- |
| Source | Higher-dimensional processing using a photonic tensor core with continuous-time data |
| URL | https://www.nature.com/articles/s41566-023-01313-x |
| DOI | 10.1038/s41566-023-01313-x |
| Venue | Nature Photonics 17, 1080-1088 (2023) |
| Claim status | paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Electro-optically controlled photonic tensor core with spatial, wavelength, and RF degrees of freedom |
| Reported parallelism | 100 |
| Rf components | 50 |
| Wdm channels | 2 |
| Reported ecg signals | 100 |
| Reported cnn accuracy percent | 93.5 |
| Surrogate mapping | m=3, k=3, n=100 follows the paper's 3x3 kernel and 3x100 ECG input framing; it is not a continuous-time RF/WDM simulation. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | parallelism, rf_components, wavelength_channels, accuracy |
| Local surrogate type | continuous_time_tensor_core_ecg_matmul_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- The source reports a hardware photonic tensor core using spatial, wavelength, and RF degrees of freedom with parallelism of 100.
- Local dense matmul accounting does not model RF multiplexing, PCM memory programming, optical routing, or clinical ECG preprocessing.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 3 x 3 times 3 x 100 |
| Operations per batch | 1 |
| MACs per operation | 900 |
| MACs | 900 |
| Equivalent ops per operation | 1800 |
| Equivalent ops | 1800 |
| Output elements per operation | 300 |
| Output elements | 300 |
| Vector DAC conversions | 9 |
| Weight DAC conversions | 300 |
| DAC conversions | 309 |
| ADC conversions | 300 |

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
| Weight operand reads | 300 bytes |
| Output writes | 300 bytes |
| Total interface traffic | 609 bytes |
| MACs per interface byte | 1.47783 |
| Equivalent ops per interface byte | 2.95567 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 309 bytes | 300 bytes | 12.180 pJ | 0.595 ns | 0.595 ns | 1024.000 bytes/ns |
| Intermediate/cache | 309 bytes | 300 bytes | 121.800 pJ | 2.379 ns | 2.379 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 309 bytes | 300 bytes | 6090.000 pJ | 38.062 ns | 38.062 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 216.600 pJ |
| Total movement energy | 6223.980 pJ |
| Total system energy | 6440.580 pJ |
| System energy per MAC | 7.156 pJ |
| System energy per equivalent op | 3.578 pJ |
| Movement energy share | 96.64% |
| Max transfer time | 38.062 ns |
| Serialized transfer time | 41.036 ns |
| Effective transfer time | 38.062 ns |
| Contention-adjusted effective transfer | 38.062 ns |
| Calibration-adjusted effective transfer | 38.062 ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 38.062 ns |
| Bandwidth-limited equivalent ops/s | 47290640394.089 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 38.062 ns |
| Contention-adjusted equivalent ops/s | 47290640394.089 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.450 pJ |
| Laser electrical energy | 1.800 pJ |
| Detector energy | 3.000 pJ |
| ADC energy | 150.000 pJ |
| Vector DAC energy | 1.800 pJ |
| Weight DAC energy | 60.000 pJ |
| DAC energy | 61.800 pJ |
| Total energy | 216.600 pJ |
| Energy per MAC | 0.241 pJ |
| Energy per equivalent op | 0.120 pJ |
| Peripheral share | 99.17% |

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
| Steady-state equivalent ops/s | 1800000000000.000 |

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
- The dense surrogate preserves the reported 3x3-kernel and 100-signal ECG demonstration scale.
- Local timing, energy, converter, and system movement values are generic PhotonicBench assumptions.
- Weight-stationary mode approximates fixed tensor-core weights for one local ECG convolution tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
