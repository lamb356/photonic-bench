# PhotonicBench Benchmark Card: Meng 2025 MRR OTPU tensor core surrogate

Source-backed card for the Light: Science & Applications 2025 high-integrated microring-resonator optical tensor processing unit. The published result is a multidomain tensor-convolution OTPU; this config uses a 16x16 dense local matmul surrogate for comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | High-integrated photonic tensor core utilizing high-dimensional lightwave and microwave multidomain multiplexing |
| URL | https://www.nature.com/articles/s41377-024-01706-9 |
| DOI | 10.1038/s41377-024-01706-9 |
| Venue | Light: Science & Applications 14, 27 (2025) |
| Claim status | paper-reported computing-density/accuracy claims; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Microring-resonator optical tensor processing unit with lightwave/microwave multidomain multiplexing |
| Computing density tops per mm2 | 34.04 |
| Mnist accuracy percent | 96.41 |
| Theoretical mnist accuracy percent | 96.79 |
| Multiplexing domains | time-wavelength-microwave-frequency |
| Optical core | single microring resonator |
| Surrogate mapping | m=16, k=16, n=16 is a dense local surrogate for an MRR OTPU tensor-convolution result; not an exact multidomain convolution schedule. |



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 16 x 16 times 16 x 16 |
| Operations per batch | 1 |
| MACs per operation | 4096 |
| MACs | 4096 |
| Equivalent ops per operation | 8192 |
| Equivalent ops | 8192 |
| Output elements per operation | 256 |
| Output elements | 256 |
| Vector DAC conversions | 256 |
| Weight DAC conversions | 256 |
| DAC conversions | 512 |
| ADC conversions | 256 |

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
| Vector operand reads | 256 bytes |
| Weight operand reads | 256 bytes |
| Output writes | 256 bytes |
| Total interface traffic | 768 bytes |
| MACs per interface byte | 5.33333 |
| Equivalent ops per interface byte | 10.6667 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM and off-chip traffic are cumulative tier
movements, not published measurements and not a cache simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: |
| SRAM | 512 bytes | 256 bytes | 15.360 pJ | 0.750 ns | 1024.000 bytes/ns |
| Off-chip/DRAM | 512 bytes | 256 bytes | 7680.000 pJ | 48.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| Local compute/conversion energy | 241.152 pJ |
| Total movement energy | 7695.360 pJ |
| Total system energy | 7936.512 pJ |
| System energy per MAC | 1.938 pJ |
| System energy per equivalent op | 0.969 pJ |
| Movement energy share | 96.96% |
| Max transfer time | 48.000 ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 48.000 ns |
| Bandwidth-limited equivalent ops/s | 170666666666.667 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 2.048 pJ |
| Laser electrical energy | 8.192 pJ |
| Detector energy | 2.560 pJ |
| ADC energy | 128.000 pJ |
| Vector DAC energy | 51.200 pJ |
| Weight DAC energy | 51.200 pJ |
| DAC energy | 102.400 pJ |
| Total energy | 241.152 pJ |
| Energy per MAC | 0.059 pJ |
| Energy per equivalent op | 0.029 pJ |
| Peripheral share | 96.60% |

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
| Steady-state equivalent ops/s | 8192000000000.000 |

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
- Source reports 34.04 TOPS/mm2 computing density and 96.41 percent MNIST accuracy; this card keeps those values as published references.
- No scalar total TOPS or TOPS/W value is encoded because the cited paper metric is computing density rather than absolute throughput or energy efficiency.
- Local timing, converter energy, system tiers, and dense workload shape are PhotonicBench assumptions for cross-card comparison.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
