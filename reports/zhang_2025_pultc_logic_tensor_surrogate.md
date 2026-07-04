# PhotonicBench Benchmark Card: Zhang 2025 PULTC logic tensor surrogate

Source-backed card for the Optica 2025 photonic universal logic tensor core. The local workload is a compact dense tensor bookkeeping surrogate only, not a Boolean-logic or microring-nonlinearity model.

## Provenance

| Field | Value |
| --- | --- |
| Source | Photonic logic tensor computing beyond Tbit/s per core |
| URL | https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-8-1252 |
| DOI | 10.1364/OPTICA.557867 |
| Venue | Optica 12, 1252-1260 (2025) |
| Claim status | paper-reported PULTC wavelength/spatial logic tensor metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Photonic universal logic tensor core with microring nonlinear mapping and MZI mesh linear transform |
| Wavelength channels | 10 |
| Spatial channels | 4 |
| Line rate gbps per channel | 50 |
| Measured mrm eo bandwidth ghz | 53.73 |
| Reported logic capacity note | beyond Tbit/s per core in the published title; supporting preprint reports beyond TOPS per core and optimized 40 TOPS. |
| Supporting preprint url | https://arxiv.org/abs/2504.20331 |
| Surrogate mapping | m=4, k=4, n=10 is a compact bookkeeping surrogate for four spatial channels and ten wavelengths; it is not a Boolean logic tensor simulator. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | line_rate, wavelength_channels, spatial_channels, modulation_bandwidth |
| Local surrogate type | logic_tensor_dense_bookkeeping_surrogate |
| Confidence grade | C |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | not_reported |
| Accuracy | not_applicable |
| Area | not_reported |
| Precision | not_applicable |

Source-quality notes:

- This is a logic tensor processor, so the local dense matmul shape is only a comparison placeholder and must not be read as an exact operation mapping.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 4 times 4 x 10 |
| Operations per batch | 1 |
| MACs per operation | 160 |
| MACs | 160 |
| Equivalent ops per operation | 320 |
| Equivalent ops | 320 |
| Output elements per operation | 40 |
| Output elements | 40 |
| Vector DAC conversions | 16 |
| Weight DAC conversions | 40 |
| DAC conversions | 56 |
| ADC conversions | 40 |

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
| Vector operand reads | 16 bytes |
| Weight operand reads | 40 bytes |
| Output writes | 40 bytes |
| Total interface traffic | 96 bytes |
| MACs per interface byte | 1.66667 |
| Equivalent ops per interface byte | 3.33333 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 56 bytes | 40 bytes | 1.920 pJ | 0.094 ns | 0.094 ns | 1024.000 bytes/ns |
| Intermediate/cache | 56 bytes | 40 bytes | 19.200 pJ | 0.375 ns | 0.375 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 56 bytes | 40 bytes | 960.000 pJ | 6.000 ns | 6.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 31.920 pJ |
| Total movement energy | 981.120 pJ |
| Total system energy | 1013.040 pJ |
| System energy per MAC | 6.332 pJ |
| System energy per equivalent op | 3.166 pJ |
| Movement energy share | 96.85% |
| Total hierarchy traffic | 288 bytes |
| Hierarchy equivalent ops per byte | 1.11111 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 6.000 ns |
| Serialized transfer time | 6.469 ns |
| Effective transfer time | 6.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 6.000 ns |
| Calibration-adjusted effective transfer | 6.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 6 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 6.000 ns |
| Bandwidth pressure ratio | 6 |
| Bandwidth-limited equivalent ops/s | 53333333333.333 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 6.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 6 |
| Contention pressure ratio | 6 |
| Contention-adjusted equivalent ops/s | 53333333333.333 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.080 pJ |
| Laser electrical energy | 0.320 pJ |
| Detector energy | 0.400 pJ |
| ADC energy | 20.000 pJ |
| Vector DAC energy | 3.200 pJ |
| Weight DAC energy | 8.000 pJ |
| DAC energy | 11.200 pJ |
| Total energy | 31.920 pJ |
| Energy per MAC | 0.199 pJ |
| Energy per equivalent op | 0.100 pJ |
| Peripheral share | 99.00% |

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
| Steady-state equivalent ops/s | 320000000000.000 |

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
- The local card preserves the paper's wavelength, spatial, and line-rate metadata without converting logic capacity into local matrix-multiply throughput.
- The dense tile is intentionally a low-confidence bookkeeping surrogate for visual comparison only.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
