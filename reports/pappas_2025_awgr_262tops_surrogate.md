# PhotonicBench Benchmark Card: Pappas 2025 AWGR 262 TOPS surrogate

Source-backed card for the APL Photonics 2025 AWGR-based multidimensional photonic AI accelerator. The local workload is a 16x16 dense tile surrogate for the reported 16x16 AWGR tensor engine, not an exact Matrix-by-Tensor-Multiply reproduction.

## Provenance

| Field | Value |
| --- | --- |
| Source | A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser |
| URL | https://pubs.aip.org/aip/app/article/10/11/110805/3372196/A-262-TOPS-hyperdimensional-photonic-AI |
| DOI | 10.1063/5.0271374 |
| Venue | APL Photonics 10, 110805 (2025) |
| Claim status | paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | 16x16 AWGR Matrix-by-Tensor-Multiply photonic AI accelerator |
| Reported throughput | 262.000 TOPS |
| Energy efficiency, including lasers | 3.663 TOPS/W |
| Energy per equivalent op, including lasers | 0.273 pJ |
| Energy per MAC, including lasers | 0.546 pJ |
| Workload energy, including lasers | 2236.416 pJ |
| Component-model / published including-lasers ratio | 0.108 x |
| Reported energy per op fj | 273 |
| Data rate gbaud | 32 |
| Awgr dimension | 16x16 |
| Ddos kappa score | 0.8652 |
| Mnist accuracy percent | 92.14 |
| Energy efficiency note | 3.663 TOPS/W is the direct conversion of the paper's 273 fJ/OP statement. |
| Surrogate mapping | m=16, k=16, n=16 is a dense tile surrogate for the 16x16 AWGR engine; not an exact MbTM schedule. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, energy_per_op, data_rate, accuracy |
| Local surrogate type | dense_awgr_tile_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Good throughput, energy, and task-metric coverage; local dense tile is still a surrogate for the reported AWGR MbTM schedule.



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
| Pipeline cycle time | 0.031 ns |

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
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 512 bytes | 256 bytes | 15.360 pJ | 0.750 ns | 0.750 ns | 1024.000 bytes/ns |
| Intermediate/cache | 512 bytes | 256 bytes | 153.600 pJ | 3.000 ns | 3.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 512 bytes | 256 bytes | 7680.000 pJ | 48.000 ns | 48.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 241.152 pJ |
| Total movement energy | 7848.960 pJ |
| Total system energy | 8090.112 pJ |
| System energy per MAC | 1.975 pJ |
| System energy per equivalent op | 0.988 pJ |
| Movement energy share | 97.02% |
| Total hierarchy traffic | 2304 bytes |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 48.000 ns |
| Serialized transfer time | 51.750 ns |
| Effective transfer time | 48.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 48.000 ns |
| Calibration-adjusted effective transfer | 48.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 48.000 ns |
| Bandwidth pressure ratio | 1536 |
| Bandwidth-limited equivalent ops/s | 170666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 48.000 ns |
| Contention pressure ratio | 1536 |
| Contention-adjusted equivalent ops/s | 170666666666.667 |

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
| Optical latency | 0.031 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 0.031 ns |
| Pipeline cycle time | 0.031 ns |
| Batch latency | 0.031 ns |
| Steady-state operations/s | 32000000000.000 |
| Steady-state equivalent ops/s | 262144000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000003 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Source reports 262 TOPS at 32 Gbaud and a 273 fJ/OP silicon-photonic energy-efficiency analysis; PhotonicBench keeps those values in published_reference.
- The local model uses a one-cycle 32 Gbaud timing surrogate and generic converter energy assumptions.
- Weight-stationary mode approximates reusing the reported AWGR weight/tensor structure for one dense local tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
