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

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 799500 bytes | 768 bytes | 16005.360 pJ | 33.33% | 0.20% | 0.19% | 781.512 ns | 781.512 ns | 28.9449 | 1024.000 bytes/ns | 29639.556 bytes/ns | 28.9449 | -28615.556 bytes/ns |
| Intermediate/cache | 799500 bytes | 768 bytes | 160053.600 pJ | 33.33% | 1.96% | 1.87% | 3126.047 ns | 3126.047 ns | 115.78 | 256.000 bytes/ns | 29639.556 bytes/ns | 115.78 | -29383.556 bytes/ns |
| Off-chip/DRAM | 799500 bytes | 768 bytes | 8002680.000 pJ | 33.33% | 97.85% | 93.75% | 50016.750 ns | 50016.750 ns | 1852.47 | 16.000 bytes/ns | 29639.556 bytes/ns | 1852.47 | -29623.556 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 357682.080 pJ | 4.19% |
| SRAM movement | 16005.360 pJ | 0.19% |
| Intermediate/cache movement | 160053.600 pJ | 1.87% |
| Off-chip/DRAM movement | 8002680.000 pJ | 93.75% |
| Total movement | 8178738.960 pJ | 95.81% |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory scenario | default |
| Scenario description | PhotonicBench baseline: local SRAM plus a conservative generic off-chip/DRAM tier matching the historical defaults. |
| Memory timing mode | overlapped |
| Contention preset | single_client |
| Contention preset description | Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband. |
| Contention overlap model | profile_timing_mode |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 357682.080 pJ |
| Total movement energy | 8178738.960 pJ |
| Total system energy | 8536421.040 pJ |
| System energy per MAC | 10.844 pJ |
| System energy per equivalent op | 5.422 pJ |
| Local compute/conversion energy share | 4.19% |
| Movement energy share | 95.81% |
| Movement-to-compute energy ratio | 22.8659 |
| Total hierarchy traffic | 2400804 bytes |
| Hierarchy equivalent ops per byte | 0.65578 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 1852.47 |
| Max tier contention pressure ratio | 1852.47 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 93.75% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 1852.47 |
| Min tier contention bandwidth headroom ratio | 0.000539819 |
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
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 1852.47 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 50016.750 ns |
| Bandwidth pressure ratio | 1852.47 |
| Bandwidth-limited equivalent ops/s | 31477455052.557 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 50016.750 ns |
| Contention-adjusted transfer-to-compute time ratio | 1852.47 |
| Contention pressure ratio | 1852.47 |
| Contention-adjusted equivalent ops/s | 31477455052.557 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | Historical PhotonicBench SRAM/intermediate/off-chip defaults; tier numbers are local assumptions. | Computing's energy problem (and what we can do about it) (10.1109/ISSCC.2014.6757323) | SRAM, intermediate, and off-chip pJ/byte and bandwidth values are PhotonicBench defaults, not paper-measured hardware values.; The scenario is a conservative baseline for sensitivity comparisons. | Use this as a baseline scenario only; prefer a named profile when the card is intended to stress a specific hierarchy behavior. |
| Contention preset | local-baseline | Dedicated path: one modeled client, no arbitration loss, and no calibration/control guardband. | explicit local assumption | shared_bandwidth_clients=1, arbitration_efficiency=1, and calibration_overhead_fraction=0 are local baseline assumptions. | Use as the no-contention reference point. |


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
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
