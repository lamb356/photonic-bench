# PhotonicBench Benchmark Card: Small transformer sanity layer - MLP up-projection

Tiny dense transformer layer shape for exact MAC-count sanity checks. This is a synthetic helper example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 4 x 8 times 8 x 16; operation multiplicity is 2. The right operand is a learned model-weight matrix.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 8 times 8 x 16 |
| Operations per batch | 2 |
| MACs per operation | 512 |
| MACs | 1024 |
| Equivalent ops per operation | 1024 |
| Equivalent ops | 2048 |
| Output elements per operation | 64 |
| Output elements | 128 |
| Vector DAC conversions | 64 |
| Weight DAC conversions | 128 |
| DAC conversions | 192 |
| ADC conversions | 128 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 2 |
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
| Vector operand reads | 64 bytes |
| Weight operand reads | 128 bytes |
| Output writes | 128 bytes |
| Total interface traffic | 320 bytes |
| MACs per interface byte | 3.2 |
| Equivalent ops per interface byte | 6.4 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: |
| SRAM | 192 bytes | 128 bytes | 6.400 pJ | 0.312 ns | 1024.000 bytes/ns |
| Intermediate/cache | 192 bytes | 128 bytes | 64.000 pJ | 1.250 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 192 bytes | 128 bytes | 3200.000 pJ | 20.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Local compute/conversion energy | 132.608 pJ |
| Total movement energy | 3270.400 pJ |
| Total system energy | 3403.008 pJ |
| System energy per MAC | 3.323 pJ |
| System energy per equivalent op | 1.662 pJ |
| Movement energy share | 96.10% |
| Max transfer time | 20.000 ns |
| Serialized transfer time | 21.562 ns |
| Effective transfer time | 20.000 ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 20.000 ns |
| Bandwidth-limited equivalent ops/s | 102400000000.000 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.512 pJ |
| Laser electrical energy | 2.048 pJ |
| Detector energy | 1.280 pJ |
| ADC energy | 64.000 pJ |
| Vector DAC energy | 7.680 pJ |
| Weight DAC energy | 57.600 pJ |
| DAC energy | 65.280 pJ |
| Total energy | 132.608 pJ |
| Energy per MAC | 0.130 pJ |
| Energy per equivalent op | 0.065 pJ |
| Peripheral share | 98.46% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 2.000 ns |
| Batch latency | 7.000 ns |
| Steady-state operations/s | 500000000.000 |
| Steady-state equivalent ops/s | 512000000000.000 |

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
- Dense full-sequence transformer accounting is used.
- This tiny shape is intended for manual MAC-count verification.
- Transformer operation: MLP up-projection.
- Transformer formula: B * S * H * intermediate.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=2, sequence=4, hidden=8, heads=2, head_dim=4, attention_context=4, intermediate=16.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 2 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
