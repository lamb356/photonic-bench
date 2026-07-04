# PhotonicBench Benchmark Card: Chen 2026 FSR-GeMM real-valued GEMM surrogate

Source-backed card for the DATE 2026 FSR-GeMM architecture. The paper targets scalable real-valued general matrix multiplication with free-spectral-range multiplexing; this config uses a 64x64 dense local GEMM tile for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | FSR-GeMM: A Scalable FSR-Parallel Photonic Accelerator for Real-Valued GeMM Computing |
| URL | https://doi.org/10.23919/DATE69613.2026.11539161 |
| DOI | 10.23919/DATE69613.2026.11539161 |
| Venue | 2026 Design, Automation and Test in Europe Conference (DATE 2026) |
| Claim status | paper-reported relative FSR-GeMM architecture metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Free-spectral-range parallel photonic accelerator for real-valued GEMM |
| Area efficiency improvement x | 57 |
| Energy efficiency gain x | 13.8 |
| Energy reduction percent vs mrr | 70 |
| Speedup vs leading photonic gemm x | 21 |
| Supports dynamic real valued operands | True |
| Avoids svd preprocessing | True |
| Surrogate mapping | m=64, k=64, n=64 is a dense local GEMM tile for an FSR-GeMM architecture paper; it is not the paper's full FSR-parallel hardware schedule. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | relative_speedup, relative_energy, relative_area, architecture |
| Local surrogate type | dense_fsr_parallel_gemm_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | derived |
| Accuracy | not_reported |
| Area | derived |
| Precision | not_reported |

Source-quality notes:

- The source reports relative improvements rather than a scalar absolute TOPS or TOPS/W value, so PhotonicBench stores those as additional metrics only.



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

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 12.000 ns | 12.000 ns | 1024.000 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 48.000 ns | 48.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 122880.000 pJ | 768.000 ns | 768.000 ns | 16.000 bytes/ns |

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
| Movement energy share | 96.73% |
| Total hierarchy traffic | 36864 bytes |
| Hierarchy equivalent ops per byte | 14.2222 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
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
- Source relative speed, energy, and area claims remain under published_calibration.additional_metrics.
- Local dense workload, converter counts, latency, and system-tier movement are PhotonicBench assumptions for cross-card analysis.
- Weight-stationary mode approximates one reused right-hand operand tile and does not model FSR routing, crosstalk, or FSR-parallel scheduling.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
