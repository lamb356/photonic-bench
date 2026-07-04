# PhotonicBench Benchmark Card: GPT-style decoder KV-cache model - decoder_block - MLP up-projection

Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 1 x 768 times 768 x 3072; operation multiplicity is 1. The right operand is a learned model-weight matrix.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 768 times 768 x 3072 |
| Operations per batch | 1 |
| MACs per operation | 2359296 |
| MACs | 2359296 |
| Equivalent ops per operation | 4718592 |
| Equivalent ops | 4718592 |
| Output elements per operation | 3072 |
| Output elements | 3072 |
| Vector DAC conversions | 768 |
| Weight DAC conversions | 2359296 |
| DAC conversions | 2360064 |
| ADC conversions | 3072 |

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
| Vector operand reads | 768 bytes |
| Weight operand reads | 2359296 bytes |
| Output writes | 3072 bytes |
| Total interface traffic | 2363136 bytes |
| MACs per interface byte | 0.998375 |
| Equivalent ops per interface byte | 1.99675 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: |
| SRAM | 2360064 bytes | 3072 bytes | 47262.720 pJ | 2307.750 ns | 1024.000 bytes/ns |
| Intermediate/cache | 2360064 bytes | 3072 bytes | 472627.200 pJ | 9231.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 2360064 bytes | 3072 bytes | 23631360.000 pJ | 147696.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Local compute/conversion energy | 1068060.672 pJ |
| Total movement energy | 24151249.920 pJ |
| Total system energy | 25219310.592 pJ |
| System energy per MAC | 10.689 pJ |
| System energy per equivalent op | 5.345 pJ |
| Movement energy share | 95.76% |
| Max transfer time | 147696.000 ns |
| Serialized transfer time | 159234.750 ns |
| Effective transfer time | 147696.000 ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 147696.000 ns |
| Bandwidth-limited equivalent ops/s | 31948001299.967 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 1179.648 pJ |
| Laser electrical energy | 4718.592 pJ |
| Detector energy | 30.720 pJ |
| ADC energy | 1536.000 pJ |
| Vector DAC energy | 92.160 pJ |
| Weight DAC energy | 1061683.200 pJ |
| DAC energy | 1061775.360 pJ |
| Total energy | 1068060.672 pJ |
| Energy per MAC | 0.453 pJ |
| Energy per equivalent op | 0.226 pJ |
| Peripheral share | 99.56% |

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
| Steady-state equivalent ops/s | 2359296000000000.000 |

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
- Decoder incremental inference uses one query token and a 1024-token KV-cache context.
- GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.
- Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.
- Full transformer model layer spec: decoder_block.
- Full transformer model layer count: 12.
- Transformer operation: MLP up-projection.
- Transformer formula: B * S * H * intermediate.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.
- Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
