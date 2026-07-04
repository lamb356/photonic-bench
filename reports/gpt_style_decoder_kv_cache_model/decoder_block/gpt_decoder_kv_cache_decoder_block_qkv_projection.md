# PhotonicBench Benchmark Card: GPT-style decoder KV-cache model - decoder_block - QKV projection

Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for QKV projection. Formula: 3 * B * S * H * H. Matmul shape is 1 x 768 times 768 x 2304; operation multiplicity is 1. The right operand is a learned model-weight matrix.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 768 times 768 x 2304 |
| Operations per batch | 1 |
| MACs per operation | 1769472 |
| MACs | 1769472 |
| Equivalent ops per operation | 3538944 |
| Equivalent ops | 3538944 |
| Output elements per operation | 2304 |
| Output elements | 2304 |
| Vector DAC conversions | 768 |
| Weight DAC conversions | 1769472 |
| DAC conversions | 1770240 |
| ADC conversions | 2304 |

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
| Weight operand reads | 1769472 bytes |
| Output writes | 2304 bytes |
| Total interface traffic | 1772544 bytes |
| MACs per interface byte | 0.998267 |
| Equivalent ops per interface byte | 1.99653 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 1770240 bytes | 2304 bytes | 35450.880 pJ | 33.33% | 0.20% | 0.19% | 1731.000 ns | 1731.000 ns | 346.2 | 1024.000 bytes/ns | 354508.800 bytes/ns | 346.2 | -353484.800 bytes/ns |
| Intermediate/cache | 1770240 bytes | 2304 bytes | 354508.800 pJ | 33.33% | 1.96% | 1.87% | 6924.000 ns | 6924.000 ns | 1384.8 | 256.000 bytes/ns | 354508.800 bytes/ns | 1384.8 | -354252.800 bytes/ns |
| Off-chip/DRAM | 1770240 bytes | 2304 bytes | 17725440.000 pJ | 33.33% | 97.85% | 93.70% | 110784.000 ns | 110784.000 ns | 22156.8 | 16.000 bytes/ns | 354508.800 bytes/ns | 22156.8 | -354492.800 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 801068.544 pJ |
| Total movement energy | 18115399.680 pJ |
| Total system energy | 18916468.224 pJ |
| System energy per MAC | 10.690 pJ |
| System energy per equivalent op | 5.345 pJ |
| Local compute/conversion energy share | 4.23% |
| Movement energy share | 95.77% |
| Movement-to-compute energy ratio | 22.614 |
| Total hierarchy traffic | 5317632 bytes |
| Hierarchy equivalent ops per byte | 0.665511 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 22156.8 |
| Max tier contention pressure ratio | 22156.8 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 93.70% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 22156.8 |
| Min tier contention bandwidth headroom ratio | 4.51329e-05 |
| Max transfer time | 110784.000 ns |
| Serialized transfer time | 119439.000 ns |
| Effective transfer time | 110784.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 110784.000 ns |
| Calibration-adjusted effective transfer | 110784.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 22156.8 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 110784.000 ns |
| Bandwidth pressure ratio | 22156.8 |
| Bandwidth-limited equivalent ops/s | 31944540727.903 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 110784.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 22156.8 |
| Contention pressure ratio | 22156.8 |
| Contention-adjusted equivalent ops/s | 31944540727.903 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 884.736 pJ |
| Laser electrical energy | 3538.944 pJ |
| Detector energy | 23.040 pJ |
| ADC energy | 1152.000 pJ |
| Vector DAC energy | 92.160 pJ |
| Weight DAC energy | 796262.400 pJ |
| DAC energy | 796354.560 pJ |
| Total energy | 801068.544 pJ |
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
| Steady-state equivalent ops/s | 1769472000000000.000 |

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
- Transformer operation: QKV projection.
- Transformer formula: 3 * B * S * H * H.
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
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
