# PhotonicBench Benchmark Card: Nature PACE 64x64 matrix-vector calibration

Source-backed calibration card for the Nature 2025 PACE 64x64 photonic matrix-vector accelerator. The component model remains a simple local assumption set; the published calibration table carries the paper-reported values.

## Provenance

| Field | Value |
| --- | --- |
| Source | An integrated large-scale photonic accelerator with ultralow latency |
| URL | https://www.nature.com/articles/s41586-025-08786-6 |
| DOI | 10.1038/s41586-025-08786-6 |
| Venue | Nature 640, 361-367 (2025) |
| Claim status | paper-reported calibration targets |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | PACE 64x64 matrix-vector oMAC |
| Reported throughput | 8.190 TOPS |
| Energy efficiency, excluding lasers | 4.210 TOPS/W |
| Energy efficiency, including lasers | 2.380 TOPS/W |
| Energy per equivalent op, excluding lasers | 0.238 pJ |
| Energy per equivalent op, including lasers | 0.420 pJ |
| Energy per MAC, excluding lasers | 0.475 pJ |
| Energy per MAC, including lasers | 0.840 pJ |
| Workload energy, excluding lasers | 1945.843 pJ |
| Workload energy, including lasers | 3442.017 pJ |
| Component-model / published including-lasers ratio | 0.254 x |
| Reported cycle latency | 5.000 ns |
| Future-device latency discussed | 3.000 ns |
| Reported ENOB | 7.610 bits |
| PACE total Ising computation time | 2.700 us |
| A10 total Ising computation time | 798.100 us |
| Reported component count | >= 16000 |
| A10 single-cycle latency comparison | >= 2300.000 ns |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, energy_efficiency, latency, precision, component_count |
| Local surrogate type | direct_64x64_matrix_vector_calibration |
| Confidence grade | A |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | not_applicable |
| Area | derived |
| Precision | reported |

Source-quality notes:

- Direct 64x64 matrix-vector calibration card with paper-reported TOPS, TOPS/W, latency, ENOB, and component-count evidence.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 64 times 64 x 64 |
| Operations per batch | 1 |
| MACs per operation | 4096 |
| MACs | 4096 |
| Equivalent ops per operation | 8192 |
| Equivalent ops | 8192 |
| Output elements per operation | 64 |
| Output elements | 64 |
| Vector DAC conversions | 64 |
| Weight DAC conversions | 4096 |
| DAC conversions | 4160 |
| ADC conversions | 64 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 1 |
| Pipeline cycle time | 5.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 64 bytes |
| Weight operand reads | 4096 bytes |
| Output writes | 64 bytes |
| Total interface traffic | 4224 bytes |
| MACs per interface byte | 0.969697 |
| Equivalent ops per interface byte | 1.93939 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 4160 bytes | 64 bytes | 84.480 pJ | 33.33% | 0.20% | 4.125 ns | 4.125 ns | 0.825 | 1024.000 bytes/ns | 844.800 bytes/ns | 0.825 | 179.200 bytes/ns |
| Intermediate/cache | 4160 bytes | 64 bytes | 844.800 pJ | 33.33% | 1.96% | 16.500 ns | 16.500 ns | 3.3 | 256.000 bytes/ns | 844.800 bytes/ns | 3.3 | -588.800 bytes/ns |
| Off-chip/DRAM | 4160 bytes | 64 bytes | 42240.000 pJ | 33.33% | 97.85% | 264.000 ns | 264.000 ns | 52.8 | 16.000 bytes/ns | 844.800 bytes/ns | 52.8 | -828.800 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 872.832 pJ |
| Total movement energy | 43169.280 pJ |
| Total system energy | 44042.112 pJ |
| System energy per MAC | 10.752 pJ |
| System energy per equivalent op | 5.376 pJ |
| Movement energy share | 98.02% |
| Total hierarchy traffic | 12672 bytes |
| Hierarchy equivalent ops per byte | 0.646465 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 52.8 |
| Max tier contention pressure ratio | 52.8 |
| Max tier movement-energy share | 97.85% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 52.8 |
| Min tier contention bandwidth headroom ratio | 0.0189394 |
| Max transfer time | 264.000 ns |
| Serialized transfer time | 284.625 ns |
| Effective transfer time | 264.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 264.000 ns |
| Calibration-adjusted effective transfer | 264.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 52.8 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 264.000 ns |
| Bandwidth pressure ratio | 52.8 |
| Bandwidth-limited equivalent ops/s | 31030303030.303 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 264.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 52.8 |
| Contention pressure ratio | 52.8 |
| Contention-adjusted equivalent ops/s | 31030303030.303 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 2.048 pJ |
| Laser electrical energy | 8.192 pJ |
| Detector energy | 0.640 pJ |
| ADC energy | 32.000 pJ |
| Vector DAC energy | 12.800 pJ |
| Weight DAC energy | 819.200 pJ |
| DAC energy | 832.000 pJ |
| Total energy | 872.832 pJ |
| Energy per MAC | 0.213 pJ |
| Energy per equivalent op | 0.107 pJ |
| Peripheral share | 99.06% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 5.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 5.000 ns |
| Batch latency | 5.000 ns |
| Steady-state operations/s | 200000000.000 |
| Steady-state equivalent ops/s | 1638400000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000500 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
