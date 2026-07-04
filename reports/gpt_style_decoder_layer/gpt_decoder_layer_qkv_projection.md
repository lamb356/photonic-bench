# PhotonicBench Benchmark Card: GPT-style decoder layer - QKV projection

Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for QKV projection. Formula: 3 * B * S * H * H. Matmul shape is 1024 x 768 times 768 x 2304; operation multiplicity is 1. The right operand is a learned model-weight matrix.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1024 x 768 times 768 x 2304 |
| Operations per batch | 1 |
| MACs per operation | 1811939328 |
| MACs | 1811939328 |
| Equivalent ops per operation | 3623878656 |
| Equivalent ops | 3623878656 |
| Output elements per operation | 2359296 |
| Output elements | 2359296 |
| Vector DAC conversions | 786432 |
| Weight DAC conversions | 1769472 |
| DAC conversions | 2555904 |
| ADC conversions | 2359296 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 4 |
| Pipeline cycle time | 2.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 786432 bytes |
| Weight operand reads | 1769472 bytes |
| Output writes | 2359296 bytes |
| Total interface traffic | 4915200 bytes |
| MACs per interface byte | 368.64 |
| Equivalent ops per interface byte | 737.28 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 2555904 bytes | 2359296 bytes | 98304.000 pJ | 33.33% | 0.20% | 0.18% | 4800.000 ns | 4800.000 ns | 960 | 1024.000 bytes/ns | 983040.000 bytes/ns | 960 | -982016.000 bytes/ns |
| Intermediate/cache | 2555904 bytes | 2359296 bytes | 983040.000 pJ | 33.33% | 1.96% | 1.76% | 19200.000 ns | 19200.000 ns | 3840 | 256.000 bytes/ns | 983040.000 bytes/ns | 3840 | -982784.000 bytes/ns |
| Off-chip/DRAM | 2555904 bytes | 2359296 bytes | 49152000.000 pJ | 33.33% | 97.85% | 87.85% | 307200.000 ns | 307200.000 ns | 61440 | 16.000 bytes/ns | 983040.000 bytes/ns | 61440 | -983024.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 5717753.856 pJ |
| Total movement energy | 50233344.000 pJ |
| Total system energy | 55951097.856 pJ |
| System energy per MAC | 0.031 pJ |
| System energy per equivalent op | 0.015 pJ |
| Local compute/conversion energy share | 10.22% |
| Movement energy share | 89.78% |
| Movement-to-compute energy ratio | 8.7855 |
| Total hierarchy traffic | 14745600 bytes |
| Hierarchy equivalent ops per byte | 245.76 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 61440 |
| Max tier contention pressure ratio | 61440 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 87.85% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 61440 |
| Min tier contention bandwidth headroom ratio | 1.6276e-05 |
| Max transfer time | 307200.000 ns |
| Serialized transfer time | 331200.000 ns |
| Effective transfer time | 307200.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 307200.000 ns |
| Calibration-adjusted effective transfer | 307200.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 61440 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 307200.000 ns |
| Bandwidth pressure ratio | 61440 |
| Bandwidth-limited equivalent ops/s | 11796479999999.998 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 307200.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 61440 |
| Contention pressure ratio | 61440 |
| Contention-adjusted equivalent ops/s | 11796479999999.998 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 905969.664 pJ |
| Laser electrical energy | 3623878.656 pJ |
| Detector energy | 23592.960 pJ |
| ADC energy | 1179648.000 pJ |
| Vector DAC energy | 94371.840 pJ |
| Weight DAC energy | 796262.400 pJ |
| DAC energy | 890634.240 pJ |
| Total energy | 5717753.856 pJ |
| Energy per MAC | 0.003 pJ |
| Energy per equivalent op | 0.002 pJ |
| Peripheral share | 36.62% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 2.000 ns |
| Batch latency | 5.000 ns |
| Steady-state operations/s | 500000000.000 |
| Steady-state equivalent ops/s | 1811939328000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 37.88 dB |
| ADC quantization RMS | 0.004582 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000300 rad |
| Estimated relative error RMS | 2.0518% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Dense full-context decoder self-attention is used for layer-level accounting.
- The decoder label does not apply causal triangular halving or KV-cache incremental decoding.
- GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.
- Transformer operation: QKV projection.
- Transformer formula: 3 * B * S * H * H.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
