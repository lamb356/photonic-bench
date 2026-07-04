# PhotonicBench Benchmark Card: BERT-base style encoder layer - Attention scores

Dense one-layer BERT-base style encoder benchmark shape with hidden size 768, 12 attention heads, sequence length 128, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for Attention scores. Formula: B * heads * S * S * head_dim. Matmul shape is 128 x 64 times 64 x 128; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card.




## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 128 x 64 times 64 x 128 |
| Operations per batch | 12 |
| MACs per operation | 1048576 |
| MACs | 12582912 |
| Equivalent ops per operation | 2097152 |
| Equivalent ops | 25165824 |
| Output elements per operation | 16384 |
| Output elements | 196608 |
| Vector DAC conversions | 98304 |
| Weight DAC conversions | 98304 |
| DAC conversions | 196608 |
| ADC conversions | 196608 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 12 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 4 |
| Pipeline cycle time | 2.000 ns |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 6291.456 pJ |
| Laser electrical energy | 25165.824 pJ |
| Detector energy | 1966.080 pJ |
| ADC energy | 98304.000 pJ |
| Vector DAC energy | 11796.480 pJ |
| Weight DAC energy | 44236.800 pJ |
| DAC energy | 56033.280 pJ |
| Total energy | 181469.184 pJ |
| Energy per MAC | 0.014 pJ |
| Energy per equivalent op | 0.007 pJ |
| Peripheral share | 86.13% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 2.000 ns |
| Batch latency | 27.000 ns |
| Steady-state operations/s | 500000000.000 |
| Steady-state equivalent ops/s | 1048576000000000.000 |

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
- Dense full-sequence encoder self-attention is used.
- BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.
- Transformer operation: Attention scores.
- Transformer formula: B * heads * S * S * head_dim.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=128, hidden=768, heads=12, head_dim=64, intermediate=3072.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 12 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
