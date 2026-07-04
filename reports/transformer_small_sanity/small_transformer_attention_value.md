# PhotonicBench Benchmark Card: Small transformer sanity layer - Attention-value

Tiny dense transformer layer shape for exact MAC-count sanity checks. This is a synthetic helper example, not a published accelerator calibration card. Generated decomposed card for Attention-value. Formula: B * heads * S * S * head_dim. Matmul shape is 4 x 4 times 4 x 4; operation multiplicity is 4. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card.




## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 4 times 4 x 4 |
| Operations per batch | 4 |
| MACs per operation | 64 |
| MACs | 256 |
| Equivalent ops per operation | 128 |
| Equivalent ops | 512 |
| Output elements per operation | 16 |
| Output elements | 64 |
| Vector DAC conversions | 64 |
| Weight DAC conversions | 64 |
| DAC conversions | 128 |
| ADC conversions | 64 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 4 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 4 |
| Pipeline cycle time | 2.000 ns |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.128 pJ |
| Laser electrical energy | 0.512 pJ |
| Detector energy | 0.640 pJ |
| ADC energy | 32.000 pJ |
| Vector DAC energy | 7.680 pJ |
| Weight DAC energy | 28.800 pJ |
| DAC energy | 36.480 pJ |
| Total energy | 69.632 pJ |
| Energy per MAC | 0.272 pJ |
| Energy per equivalent op | 0.136 pJ |
| Peripheral share | 99.26% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 2.000 ns |
| Batch latency | 11.000 ns |
| Steady-state operations/s | 500000000.000 |
| Steady-state equivalent ops/s | 64000000000.000 |

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
- Transformer operation: Attention-value.
- Transformer formula: B * heads * S * S * head_dim.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=2, sequence=4, hidden=8, heads=2, head_dim=4, intermediate=16.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 4 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
