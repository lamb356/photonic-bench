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

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 3145728 bytes |
| Weight operand reads | 2359296 bytes |
| Output writes | 786432 bytes |
| Total interface traffic | 6291456 bytes |
| MACs per interface byte | 384 |
| Equivalent ops per interface byte | 768 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 5505024 bytes | 786432 bytes | 125829.120 pJ | 33.33% | 0.20% | 0.18% | 6144.000 ns | 6144.000 ns | 1228.8 | 1024.000 bytes/ns | 1258291.200 bytes/ns | 1228.8 | -1257267.200 bytes/ns |
| Intermediate/cache | 5505024 bytes | 786432 bytes | 1258291.200 pJ | 33.33% | 1.96% | 1.77% | 24576.000 ns | 24576.000 ns | 4915.2 | 256.000 bytes/ns | 1258291.200 bytes/ns | 4915.2 | -1258035.200 bytes/ns |
| Off-chip/DRAM | 5505024 bytes | 786432 bytes | 62914560.000 pJ | 33.33% | 97.85% | 88.65% | 393216.000 ns | 393216.000 ns | 78643.2 | 16.000 bytes/ns | 1258291.200 bytes/ns | 78643.2 | -1258275.200 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 6672089.088 pJ | 9.40% |
| SRAM movement | 125829.120 pJ | 0.18% |
| Intermediate/cache movement | 1258291.200 pJ | 1.77% |
| Off-chip/DRAM movement | 62914560.000 pJ | 88.65% |
| Total movement | 64298680.320 pJ | 90.60% |

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
| Local compute/conversion energy | 6672089.088 pJ |
| Total movement energy | 64298680.320 pJ |
| Total system energy | 70970769.408 pJ |
| System energy per MAC | 0.029 pJ |
| System energy per equivalent op | 0.015 pJ |
| Local compute/conversion energy share | 9.40% |
| Movement energy share | 90.60% |
| Movement-to-compute energy ratio | 9.63696 |
| Total hierarchy traffic | 18874368 bytes |
| Hierarchy equivalent ops per byte | 256 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 78643.2 |
| Max tier contention pressure ratio | 78643.2 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 88.65% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 78643.2 |
| Min tier contention bandwidth headroom ratio | 1.27157e-05 |
| Max transfer time | 393216.000 ns |
| Serialized transfer time | 423936.000 ns |
| Effective transfer time | 393216.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 393216.000 ns |
| Calibration-adjusted effective transfer | 393216.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 78643.2 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 393216.000 ns |
| Bandwidth pressure ratio | 78643.2 |
| Bandwidth-limited equivalent ops/s | 12287999999999.998 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 393216.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 78643.2 |
| Contention pressure ratio | 78643.2 |
| Contention-adjusted equivalent ops/s | 12287999999999.998 |

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
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
