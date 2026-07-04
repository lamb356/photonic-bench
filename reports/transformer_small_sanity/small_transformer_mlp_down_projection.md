# PhotonicBench Benchmark Card: Small transformer sanity layer - MLP down-projection

Tiny dense transformer layer shape for exact MAC-count sanity checks. This is a synthetic helper example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 4 x 16 times 16 x 8; operation multiplicity is 2. The right operand is a learned model-weight matrix.






## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 16 times 16 x 8 |
| Operations per batch | 2 |
| MACs per operation | 512 |
| MACs | 1024 |
| Equivalent ops per operation | 1024 |
| Equivalent ops | 2048 |
| Output elements per operation | 32 |
| Output elements | 64 |
| Vector DAC conversions | 128 |
| Weight DAC conversions | 128 |
| DAC conversions | 256 |
| ADC conversions | 64 |

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
| Vector operand reads | 128 bytes |
| Weight operand reads | 128 bytes |
| Output writes | 64 bytes |
| Total interface traffic | 320 bytes |
| MACs per interface byte | 3.2 |
| Equivalent ops per interface byte | 6.4 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 256 bytes | 64 bytes | 6.400 pJ | 33.33% | 0.20% | 0.19% | 0.312 ns | 0.312 ns | 0.0446429 | 1024.000 bytes/ns | 45.714 bytes/ns | 0.0446429 | 978.286 bytes/ns |
| Intermediate/cache | 256 bytes | 64 bytes | 64.000 pJ | 33.33% | 1.96% | 1.89% | 1.250 ns | 1.250 ns | 0.178571 | 256.000 bytes/ns | 45.714 bytes/ns | 0.178571 | 210.286 bytes/ns |
| Off-chip/DRAM | 256 bytes | 64 bytes | 3200.000 pJ | 33.33% | 97.85% | 94.73% | 20.000 ns | 20.000 ns | 2.85714 | 16.000 bytes/ns | 45.714 bytes/ns | 2.85714 | -29.714 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 107.648 pJ | 3.19% |
| SRAM movement | 6.400 pJ | 0.19% |
| Intermediate/cache movement | 64.000 pJ | 1.89% |
| Off-chip/DRAM movement | 3200.000 pJ | 94.73% |
| Total movement | 3270.400 pJ | 96.81% |

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
| Local compute/conversion energy | 107.648 pJ |
| Total movement energy | 3270.400 pJ |
| Total system energy | 3378.048 pJ |
| System energy per MAC | 3.299 pJ |
| System energy per equivalent op | 1.649 pJ |
| Local compute/conversion energy share | 3.19% |
| Movement energy share | 96.81% |
| Movement-to-compute energy ratio | 30.3805 |
| Total hierarchy traffic | 960 bytes |
| Hierarchy equivalent ops per byte | 2.13333 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 2.85714 |
| Max tier contention pressure ratio | 2.85714 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.73% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 2.85714 |
| Min tier contention bandwidth headroom ratio | 0.35 |
| Max transfer time | 20.000 ns |
| Serialized transfer time | 21.562 ns |
| Effective transfer time | 20.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 20.000 ns |
| Calibration-adjusted effective transfer | 20.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 2.85714 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 20.000 ns |
| Bandwidth pressure ratio | 2.85714 |
| Bandwidth-limited equivalent ops/s | 102400000000.000 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 20.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 2.85714 |
| Contention pressure ratio | 2.85714 |
| Contention-adjusted equivalent ops/s | 102400000000.000 |

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
| Optical compute delivered | 0.512 pJ |
| Laser electrical energy | 2.048 pJ |
| Detector energy | 0.640 pJ |
| ADC energy | 32.000 pJ |
| Vector DAC energy | 15.360 pJ |
| Weight DAC energy | 57.600 pJ |
| DAC energy | 72.960 pJ |
| Total energy | 107.648 pJ |
| Energy per MAC | 0.105 pJ |
| Energy per equivalent op | 0.053 pJ |
| Peripheral share | 98.10% |

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
- Transformer operation: MLP down-projection.
- Transformer formula: B * S * intermediate * H.
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
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
