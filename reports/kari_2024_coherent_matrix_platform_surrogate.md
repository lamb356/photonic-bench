# PhotonicBench Benchmark Card: Kari 2024 coherent matrix operations platform surrogate

Source-backed card for the Optica 2024 integrated coherent photonic platform for scalable matrix operations. The local workload is a small dense dot-product tile surrogate, not a full temporal-multiplexed coherent receiver model.

## Provenance

| Field | Value |
| --- | --- |
| Source | Realization of an integrated coherent photonic platform for scalable matrix operations |
| URL | https://opg.optica.org/optica/fulltext.cfm?uri=optica-11-4-542 |
| DOI | 10.1364/OPTICA.507525 |
| Venue | Optica 11, 542-551 (2024) |
| Claim status | paper-reported coherent dot-product and scalable matrix-operation platform; small dense-tile local surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Integrated coherent temporally multiplexed dot-product unit cell |
| Operation types | real_mac,complex_mac,covariance |
| Scalable target | general_matrix_matrix_operations |
| Source demonstrates temporal multiplexing | True |
| Surrogate mapping | m=4, k=4, n=4 is a compact dense tile used only to exercise PhotonicBench local accounting for a coherent matrix-operation platform. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | operation_type, architecture, scalability_path |
| Local surrogate type | coherent_dot_product_tile_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | not_reported |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- The source directly demonstrates coherent multiply-accumulate and matrix-operation primitives, but does not provide a scalar TOPS or TOPS/W card metric.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 4 times 4 x 4 |
| Operations per batch | 1 |
| MACs per operation | 64 |
| MACs | 64 |
| Equivalent ops per operation | 128 |
| Equivalent ops | 128 |
| Output elements per operation | 16 |
| Output elements | 16 |
| Vector DAC conversions | 16 |
| Weight DAC conversions | 16 |
| DAC conversions | 32 |
| ADC conversions | 16 |

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
| Weight operand reads | 16 bytes |
| Output writes | 16 bytes |
| Total interface traffic | 48 bytes |
| MACs per interface byte | 1.33333 |
| Equivalent ops per interface byte | 2.66667 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 32 bytes | 16 bytes | 0.960 pJ | 0.047 ns | 0.047 ns | 1024.000 bytes/ns |
| Intermediate/cache | 32 bytes | 16 bytes | 9.600 pJ | 0.188 ns | 0.188 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 32 bytes | 16 bytes | 480.000 pJ | 3.000 ns | 3.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 14.688 pJ |
| Total movement energy | 490.560 pJ |
| Total system energy | 505.248 pJ |
| System energy per MAC | 7.894 pJ |
| System energy per equivalent op | 3.947 pJ |
| Movement energy share | 97.09% |
| Total hierarchy traffic | 144 bytes |
| Hierarchy equivalent ops per byte | 0.888889 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 3.000 ns |
| Serialized transfer time | 3.234 ns |
| Effective transfer time | 3.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 3.000 ns |
| Calibration-adjusted effective transfer | 3.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 3 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 3.000 ns |
| Bandwidth pressure ratio | 3 |
| Bandwidth-limited equivalent ops/s | 42666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 3.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 3 |
| Contention pressure ratio | 3 |
| Contention-adjusted equivalent ops/s | 42666666666.667 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.032 pJ |
| Laser electrical energy | 0.128 pJ |
| Detector energy | 0.160 pJ |
| ADC energy | 8.000 pJ |
| Vector DAC energy | 3.200 pJ |
| Weight DAC energy | 3.200 pJ |
| DAC energy | 6.400 pJ |
| Total energy | 14.688 pJ |
| Energy per MAC | 0.230 pJ |
| Energy per equivalent op | 0.115 pJ |
| Peripheral share | 99.13% |

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
| Steady-state equivalent ops/s | 128000000000.000 |

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
- Source-reported operation classes and scalable matrix-operation framing are preserved in published_reference.
- Local one-nanosecond timing, optical MAC energy, converter energy, and system movement values are PhotonicBench assumptions.
- The dense 4x4 tile is a bookkeeping surrogate rather than a temporal waveform or coherent detection simulation.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
