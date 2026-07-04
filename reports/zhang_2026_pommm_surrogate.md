# PhotonicBench Benchmark Card: Zhang 2026 POMMM coherent matrix multiplication surrogate

Source-backed card for the Nature Photonics 2026 parallel optical matrix-matrix multiplication result. The paper demonstrates coherent optical matrix-matrix multiplication across multiple sizes; this config uses the reported 20x20 dense matrix-matrix demonstration as a local PhotonicBench surrogate only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Direct tensor processing with coherent light |
| URL | https://www.nature.com/articles/s41566-025-01799-7 |
| DOI | 10.1038/s41566-025-01799-7 |
| Venue | Nature Photonics 20, 102-108 (2026) |
| Claim status | paper-reported optical matrix-matrix multiplication; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Parallel optical matrix-matrix multiplication with coherent light |
| Demonstrated nonnegative matrix size | 20 |
| Demonstrated real valued matrix size | 10 |
| Quantitative matrix sizes | 10,20,30,40,50 |
| Random matrix pairs per size | 50 |
| Mean absolute error less than | 0.15 |
| Normalized rmse less than | 0.1 |
| Data doi | 10.6084/m9.figshare.30173512 |
| Code url | https://github.com/DecadeBin/POMMM.git |
| Surrogate mapping | m=20, k=20, n=20 matches the reported non-negative POMMM matrix-matrix demonstration; it is not a full optical-field propagation or camera-readout reproduction. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | matrix_size, numerical_error, code, data |
| Local surrogate type | dense_pommm_matrix_matrix_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | not_reported |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | derived |

Source-quality notes:

- The source directly demonstrates matrix-matrix multiplication and publishes code/data, but no scalar TOPS or TOPS/W value is encoded in this card.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 20 x 20 times 20 x 20 |
| Operations per batch | 1 |
| MACs per operation | 8000 |
| MACs | 8000 |
| Equivalent ops per operation | 16000 |
| Equivalent ops | 16000 |
| Output elements per operation | 400 |
| Output elements | 400 |
| Vector DAC conversions | 400 |
| Weight DAC conversions | 400 |
| DAC conversions | 800 |
| ADC conversions | 400 |

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
| Vector operand reads | 400 bytes |
| Weight operand reads | 400 bytes |
| Output writes | 400 bytes |
| Total interface traffic | 1200 bytes |
| MACs per interface byte | 6.66667 |
| Equivalent ops per interface byte | 13.3333 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 800 bytes | 400 bytes | 24.000 pJ | 33.33% | 0.20% | 1.172 ns | 1.172 ns | 1.17188 | 1024.000 bytes/ns | 1200.000 bytes/ns | 1.17188 | -176.000 bytes/ns |
| Intermediate/cache | 800 bytes | 400 bytes | 240.000 pJ | 33.33% | 1.96% | 4.688 ns | 4.688 ns | 4.6875 | 256.000 bytes/ns | 1200.000 bytes/ns | 4.6875 | -944.000 bytes/ns |
| Off-chip/DRAM | 800 bytes | 400 bytes | 12000.000 pJ | 33.33% | 97.85% | 75.000 ns | 75.000 ns | 75 | 16.000 bytes/ns | 1200.000 bytes/ns | 75 | -1184.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 380.000 pJ |
| Total movement energy | 12264.000 pJ |
| Total system energy | 12644.000 pJ |
| System energy per MAC | 1.581 pJ |
| System energy per equivalent op | 0.790 pJ |
| Movement energy share | 96.99% |
| Total hierarchy traffic | 3600 bytes |
| Hierarchy equivalent ops per byte | 4.44444 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 75 |
| Max tier contention pressure ratio | 75 |
| Max tier movement-energy share | 97.85% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 75 |
| Min tier contention bandwidth headroom ratio | 0.0133333 |
| Max transfer time | 75.000 ns |
| Serialized transfer time | 80.859 ns |
| Effective transfer time | 75.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 75.000 ns |
| Calibration-adjusted effective transfer | 75.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 75 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 75.000 ns |
| Bandwidth pressure ratio | 75 |
| Bandwidth-limited equivalent ops/s | 213333333333.333 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 75.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 75 |
| Contention pressure ratio | 75 |
| Contention-adjusted equivalent ops/s | 213333333333.333 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 4.000 pJ |
| Laser electrical energy | 16.000 pJ |
| Detector energy | 4.000 pJ |
| ADC energy | 200.000 pJ |
| Vector DAC energy | 80.000 pJ |
| Weight DAC energy | 80.000 pJ |
| DAC energy | 160.000 pJ |
| Total energy | 380.000 pJ |
| Energy per MAC | 0.048 pJ |
| Energy per equivalent op | 0.024 pJ |
| Peripheral share | 95.79% |

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
| Steady-state equivalent ops/s | 16000000000000.000 |

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
- Source-reported accuracy/error and matrix-size evidence are preserved as published references.
- Local optical MAC energy, converter energy, SRAM/intermediate/off-chip tiers, and one-nanosecond latency are generic PhotonicBench assumptions.
- Weight-stationary mode approximates reusing the right operand within the local dense tile and does not model coherent field propagation, imaging, or camera readout.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
