# PhotonicBench Benchmark Card: GPT-style decoder layer - MLP down-projection

Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 1024 x 3072 times 3072 x 768; operation multiplicity is 1. The right operand is a learned model-weight matrix.




## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1024 x 3072 times 3072 x 768 |
| Operations per batch | 1 |
| MACs per operation | 2415919104 |
| MACs | 2415919104 |
| Equivalent ops per operation | 4831838208 |
| Equivalent ops | 4831838208 |
| Output elements per operation | 786432 |
| Output elements | 786432 |
| Vector DAC conversions | 3145728 |
| Weight DAC conversions | 2359296 |
| DAC conversions | 5505024 |
| ADC conversions | 786432 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 4 |
| Pipeline cycle time | 2.000 ns |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 1207959.552 pJ |
| Laser electrical energy | 4831838.208 pJ |
| Detector energy | 7864.320 pJ |
| ADC energy | 393216.000 pJ |
| Vector DAC energy | 377487.360 pJ |
| Weight DAC energy | 1061683.200 pJ |
| DAC energy | 1439170.560 pJ |
| Total energy | 6672089.088 pJ |
| Energy per MAC | 0.003 pJ |
| Energy per equivalent op | 0.001 pJ |
| Peripheral share | 27.58% |

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
| Steady-state equivalent ops/s | 2415919104000000000.000 |

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
- Transformer operation: MLP down-projection.
- Transformer formula: B * S * intermediate * H.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, intermediate=3072.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
