# PhotonicBench Benchmark Card: Feldmann 2021 photonic tensor core surrogate

Source-backed card for Feldmann et al. Nature 2021. The published reference is an integrated photonic tensor core for convolutional processing; this config uses a small dense matmul tile as a PhotonicBench surrogate and does not claim to reproduce the paper dataflow.

## Provenance

| Field | Value |
| --- | --- |
| Source | Parallel convolutional processing using an integrated photonic tensor core |
| URL | https://www.nature.com/articles/s41586-020-03070-1 |
| DOI | 10.1038/s41586-020-03070-1 |
| Venue | Nature 589, 52-58 (2021) |
| Claim status | paper-reported throughput/bandwidth; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Integrated photonic tensor core with PCM memory arrays and soliton microcombs |
| Reported throughput | 2.000 TOPS |
| Reported macs per second | 1000000000000 |
| Reported bandwidth ghz min | 14 |
| Reported tops note | PhotonicBench converts the paper's 10^12 MAC/s statement to 2 TOPS using 2 equivalent ops per MAC. |
| Surrogate mapping | m=1, k=64, n=16 is a small dense tile surrogate; not an exact convolutional tensor-core dataflow reproduction. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, bandwidth, architecture |
| Local surrogate type | dense_convolution_tile_surrogate |
| Confidence grade | C |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | not_reported |
| Accuracy | not_reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Source-backed throughput and bandwidth are useful, but energy, precision, area, and accuracy coverage are not encoded in this card.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 64 times 64 x 16 |
| Operations per batch | 1 |
| MACs per operation | 1024 |
| MACs | 1024 |
| Equivalent ops per operation | 2048 |
| Equivalent ops | 2048 |
| Output elements per operation | 16 |
| Output elements | 16 |
| Vector DAC conversions | 64 |
| Weight DAC conversions | 1024 |
| DAC conversions | 1088 |
| ADC conversions | 16 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 0.071 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 64 bytes |
| Weight operand reads | 1024 bytes |
| Output writes | 16 bytes |
| Total interface traffic | 1104 bytes |
| MACs per interface byte | 0.927536 |
| Equivalent ops per interface byte | 1.85507 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 1088 bytes | 16 bytes | 22.080 pJ | 1.078 ns | 1.078 ns | 1024.000 bytes/ns |
| Intermediate/cache | 1088 bytes | 16 bytes | 220.800 pJ | 4.312 ns | 4.312 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 1088 bytes | 16 bytes | 11040.000 pJ | 69.000 ns | 69.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 227.808 pJ |
| Total movement energy | 11282.880 pJ |
| Total system energy | 11510.688 pJ |
| System energy per MAC | 11.241 pJ |
| System energy per equivalent op | 5.620 pJ |
| Movement energy share | 98.02% |
| Total hierarchy traffic | 3312 bytes |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 69.000 ns |
| Serialized transfer time | 74.391 ns |
| Effective transfer time | 69.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 69.000 ns |
| Calibration-adjusted effective transfer | 69.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 69.000 ns |
| Bandwidth pressure ratio | 966 |
| Bandwidth-limited equivalent ops/s | 29681159420.290 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 69.000 ns |
| Contention pressure ratio | 966 |
| Contention-adjusted equivalent ops/s | 29681159420.290 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.512 pJ |
| Laser electrical energy | 2.048 pJ |
| Detector energy | 0.160 pJ |
| ADC energy | 8.000 pJ |
| Vector DAC energy | 12.800 pJ |
| Weight DAC energy | 204.800 pJ |
| DAC energy | 217.600 pJ |
| Total energy | 227.808 pJ |
| Energy per MAC | 0.222 pJ |
| Energy per equivalent op | 0.111 pJ |
| Peripheral share | 99.10% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 0.071 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 0.071 ns |
| Pipeline cycle time | 0.071 ns |
| Batch latency | 0.071 ns |
| Steady-state operations/s | 14000000084.000 |
| Steady-state equivalent ops/s | 28672000172032.004 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000007 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Source reports tera-MAC/s operation and bandwidth exceeding 14 GHz; this config stores that as a published reference and uses a reciprocal 14 GHz local cycle only as an illustrative timing assumption.
- Local device energy, ADC, DAC, and noise settings are PhotonicBench assumptions, not extracted device-level measurements from the paper.
- Weight-stationary mode approximates the paper's in-memory weighting concept for one dense surrogate tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
