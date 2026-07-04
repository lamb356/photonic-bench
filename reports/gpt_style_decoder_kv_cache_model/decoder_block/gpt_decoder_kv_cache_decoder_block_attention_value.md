# PhotonicBench Benchmark Card: GPT-style decoder KV-cache model - decoder_block - Attention-value

Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for Attention-value. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 1 x 1025 times 1025 x 64; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 1025 times 1025 x 64 |
| Operations per batch | 12 |
| MACs per operation | 65600 |
| MACs | 787200 |
| Equivalent ops per operation | 131200 |
| Equivalent ops | 1574400 |
| Output elements per operation | 64 |
| Output elements | 768 |
| Vector DAC conversions | 12300 |
| Weight DAC conversions | 787200 |
| DAC conversions | 799500 |
| ADC conversions | 768 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 12 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 4 |
| Pipeline cycle time | 2.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 12300 bytes |
| Weight operand reads | 787200 bytes |
| Output writes | 768 bytes |
| Total interface traffic | 800268 bytes |
| MACs per interface byte | 0.98367 |
| Equivalent ops per interface byte | 1.96734 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 799500 bytes | 768 bytes | 16005.360 pJ | 781.512 ns | 781.512 ns | 1024.000 bytes/ns |
| Intermediate/cache | 799500 bytes | 768 bytes | 160053.600 pJ | 3126.047 ns | 3126.047 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 799500 bytes | 768 bytes | 8002680.000 pJ | 50016.750 ns | 50016.750 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 357682.080 pJ |
| Total movement energy | 8178738.960 pJ |
| Total system energy | 8536421.040 pJ |
| System energy per MAC | 10.844 pJ |
| System energy per equivalent op | 5.422 pJ |
| Movement energy share | 95.81% |
| Total hierarchy traffic | 2400804 bytes |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 50016.750 ns |
| Serialized transfer time | 53924.309 ns |
| Effective transfer time | 50016.750 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 50016.750 ns |
| Calibration-adjusted effective transfer | 50016.750 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 50016.750 ns |
| Bandwidth pressure ratio | 1852.47 |
| Bandwidth-limited equivalent ops/s | 31477455052.557 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 50016.750 ns |
| Contention pressure ratio | 1852.47 |
| Contention-adjusted equivalent ops/s | 31477455052.557 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 393.600 pJ |
| Laser electrical energy | 1574.400 pJ |
| Detector energy | 7.680 pJ |
| ADC energy | 384.000 pJ |
| Vector DAC energy | 1476.000 pJ |
| Weight DAC energy | 354240.000 pJ |
| DAC energy | 355716.000 pJ |
| Total energy | 357682.080 pJ |
| Energy per MAC | 0.454 pJ |
| Energy per equivalent op | 0.227 pJ |
| Peripheral share | 99.56% |

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
| Steady-state equivalent ops/s | 65600000000000.000 |

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
- Transformer operation: Attention-value.
- Transformer formula: B * heads * S_query * S_context * head_dim.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.
- Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.
- The benchmark models 12 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
