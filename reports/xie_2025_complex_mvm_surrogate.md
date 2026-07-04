# PhotonicBench Benchmark Card: Xie 2025 complex coherent MVM surrogate

Source-backed card for the Science Advances 2025 scalable coherent photonic processor. The paper demonstrates a 16-channel complex-valued matrix-vector multiplication processor at 1.28 TOPS; this config uses a 1x16 by 16x16 dense local MVM surrogate only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Complex-valued matrix-vector multiplication using a scalable coherent photonic processor |
| URL | https://www.science.org/doi/10.1126/sciadv.ads7475 |
| DOI | 10.1126/sciadv.ads7475 |
| Venue | Science Advances 11, eads7475 (2025) |
| Claim status | paper-reported complex-valued MVM throughput and demonstrations; MVM-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | 16-channel programmable on-chip coherent photonic matrix-vector multiplication processor |
| Reported throughput | 1.280 TOPS |
| Programmable channels | 16 |
| Complex valued processing | True |
| Demonstrated functions | arbitrary matrix transformation, parallel image processing, handwritten digital recognition |
| Uses low phase error mzi mesh | True |
| Uses ultralow loss waveguide delay lines | True |
| Surrogate mapping | m=1, k=16, n=16 is a dense real-valued local MVM tile for a complex-valued 16-channel coherent processor; it does not reproduce phase encoding or coherent detection. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, architecture, complex_valued_operation, application_demonstrations |
| Local surrogate type | dense_complex_coherent_mvm_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- The source reports a scalar 1.28 TOPS throughput and complex-valued programmable operation, but this card does not encode an energy-efficiency target.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 16 times 16 x 16 |
| Operations per batch | 1 |
| MACs per operation | 256 |
| MACs | 256 |
| Equivalent ops per operation | 512 |
| Equivalent ops | 512 |
| Output elements per operation | 16 |
| Output elements | 16 |
| Vector DAC conversions | 16 |
| Weight DAC conversions | 256 |
| DAC conversions | 272 |
| ADC conversions | 16 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
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
| Vector operand reads | 16 bytes |
| Weight operand reads | 256 bytes |
| Output writes | 16 bytes |
| Total interface traffic | 288 bytes |
| MACs per interface byte | 0.888889 |
| Equivalent ops per interface byte | 1.77778 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 272 bytes | 16 bytes | 5.760 pJ | 0.281 ns | 0.281 ns | 1024.000 bytes/ns |
| Intermediate/cache | 272 bytes | 16 bytes | 57.600 pJ | 1.125 ns | 1.125 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 272 bytes | 16 bytes | 2880.000 pJ | 18.000 ns | 18.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 63.072 pJ |
| Total movement energy | 2943.360 pJ |
| Total system energy | 3006.432 pJ |
| System energy per MAC | 11.744 pJ |
| System energy per equivalent op | 5.872 pJ |
| Movement energy share | 97.90% |
| Total hierarchy traffic | 864 bytes |
| Hierarchy equivalent ops per byte | 0.592593 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 18.000 ns |
| Serialized transfer time | 19.406 ns |
| Effective transfer time | 18.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 18.000 ns |
| Calibration-adjusted effective transfer | 18.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 18 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 18.000 ns |
| Bandwidth pressure ratio | 18 |
| Bandwidth-limited equivalent ops/s | 28444444444.444 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 18.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 18 |
| Contention pressure ratio | 18 |
| Contention-adjusted equivalent ops/s | 28444444444.444 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.128 pJ |
| Laser electrical energy | 0.512 pJ |
| Detector energy | 0.160 pJ |
| ADC energy | 8.000 pJ |
| Vector DAC energy | 3.200 pJ |
| Weight DAC energy | 51.200 pJ |
| DAC energy | 54.400 pJ |
| Total energy | 63.072 pJ |
| Energy per MAC | 0.246 pJ |
| Energy per equivalent op | 0.123 pJ |
| Peripheral share | 99.19% |

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
| Steady-state equivalent ops/s | 512000000000.000 |

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
- Source-reported throughput and demonstration claims remain paper-derived metadata.
- Local dense real-valued matmul, converter energy, system tiers, and latency are PhotonicBench assumptions for comparison only.
- The card does not model complex amplitudes, phase shifter calibration, coherent receiver behavior, delay-line loss, or arbitrary-function programming.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
