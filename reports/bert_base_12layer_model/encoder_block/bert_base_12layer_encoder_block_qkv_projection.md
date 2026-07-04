# PhotonicBench Benchmark Card: BERT-base style 12-layer encoder model - encoder_block - QKV projection

Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for QKV projection. Formula: 3 * B * S * H * H. Matmul shape is 128 x 768 times 768 x 2304; operation multiplicity is 1. The right operand is a learned model-weight matrix.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 128 x 768 times 768 x 2304 |
| Operations per batch | 1 |
| MACs per operation | 226492416 |
| MACs | 226492416 |
| Equivalent ops per operation | 452984832 |
| Equivalent ops | 452984832 |
| Output elements per operation | 294912 |
| Output elements | 294912 |
| Vector DAC conversions | 98304 |
| Weight DAC conversions | 1769472 |
| DAC conversions | 1867776 |
| ADC conversions | 294912 |

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
| Vector operand reads | 98304 bytes |
| Weight operand reads | 1769472 bytes |
| Output writes | 294912 bytes |
| Total interface traffic | 2162688 bytes |
| MACs per interface byte | 104.727 |
| Equivalent ops per interface byte | 209.455 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 1867776 bytes | 294912 bytes | 43253.760 pJ | 2112.000 ns | 2112.000 ns | 1024.000 bytes/ns |
| Intermediate/cache | 1867776 bytes | 294912 bytes | 432537.600 pJ | 8448.000 ns | 8448.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 1867776 bytes | 294912 bytes | 21626880.000 pJ | 135168.000 ns | 135168.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 1411448.832 pJ |
| Total movement energy | 22102671.360 pJ |
| Total system energy | 23514120.192 pJ |
| System energy per MAC | 0.104 pJ |
| System energy per equivalent op | 0.052 pJ |
| Movement energy share | 94.00% |
| Total hierarchy traffic | 6488064 bytes |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 135168.000 ns |
| Serialized transfer time | 145728.000 ns |
| Effective transfer time | 135168.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 135168.000 ns |
| Calibration-adjusted effective transfer | 135168.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 135168.000 ns |
| Bandwidth pressure ratio | 27033.6 |
| Bandwidth-limited equivalent ops/s | 3351272727272.727 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 135168.000 ns |
| Contention pressure ratio | 27033.6 |
| Contention-adjusted equivalent ops/s | 3351272727272.727 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 113246.208 pJ |
| Laser electrical energy | 452984.832 pJ |
| Detector energy | 2949.120 pJ |
| ADC energy | 147456.000 pJ |
| Vector DAC energy | 11796.480 pJ |
| Weight DAC energy | 796262.400 pJ |
| DAC energy | 808058.880 pJ |
| Total energy | 1411448.832 pJ |
| Energy per MAC | 0.006 pJ |
| Energy per equivalent op | 0.003 pJ |
| Peripheral share | 67.91% |

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
| Steady-state equivalent ops/s | 226492416000000000.000 |

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
- Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.
- Full transformer model layer spec: encoder_block.
- Full transformer model layer count: 12.
- Transformer operation: QKV projection.
- Transformer formula: 3 * B * S * H * H.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=128, hidden=768, heads=12, head_dim=64, attention_context=128, intermediate=3072.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
