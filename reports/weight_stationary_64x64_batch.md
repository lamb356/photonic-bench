# PhotonicBench Benchmark Card: 64x64 weight-stationary batched photonic matmul

Synthetic component-model example that exercises operand reuse, weight-stationary execution, pipelining, and separate vector/weight DAC assumptions. This is not a published accelerator calibration card.






## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 64 x 64 times 64 x 64 |
| Operations per batch | 16 |
| MACs per operation | 262144 |
| MACs | 4194304 |
| Equivalent ops per operation | 524288 |
| Equivalent ops | 8388608 |
| Output elements per operation | 4096 |
| Output elements | 65536 |
| Vector DAC conversions | 65536 |
| Weight DAC conversions | 4096 |
| DAC conversions | 69632 |
| ADC conversions | 65536 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 16 |
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
| Vector operand reads | 65536 bytes |
| Weight operand reads | 4096 bytes |
| Output writes | 65536 bytes |
| Total interface traffic | 135168 bytes |
| MACs per interface byte | 31.0303 |
| Equivalent ops per interface byte | 62.0606 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 69632 bytes | 65536 bytes | 2703.360 pJ | 33.33% | 0.20% | 0.19% | 132.000 ns | 132.000 ns | 3.77143 | 1024.000 bytes/ns | 3861.943 bytes/ns | 3.77143 | -2837.943 bytes/ns |
| Intermediate/cache | 69632 bytes | 65536 bytes | 27033.600 pJ | 33.33% | 1.96% | 1.89% | 528.000 ns | 528.000 ns | 15.0857 | 256.000 bytes/ns | 3861.943 bytes/ns | 15.0857 | -3605.943 bytes/ns |
| Off-chip/DRAM | 69632 bytes | 65536 bytes | 1351680.000 pJ | 33.33% | 97.85% | 94.33% | 8448.000 ns | 8448.000 ns | 241.371 | 16.000 bytes/ns | 3861.943 bytes/ns | 241.371 | -3845.943 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 51519.488 pJ | 3.60% |
| SRAM movement | 2703.360 pJ | 0.19% |
| Intermediate/cache movement | 27033.600 pJ | 1.89% |
| Off-chip/DRAM movement | 1351680.000 pJ | 94.33% |
| Total movement | 1381416.960 pJ | 96.40% |

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
| Local compute/conversion energy | 51519.488 pJ |
| Total movement energy | 1381416.960 pJ |
| Total system energy | 1432936.448 pJ |
| System energy per MAC | 0.342 pJ |
| System energy per equivalent op | 0.171 pJ |
| Local compute/conversion energy share | 3.60% |
| Movement energy share | 96.40% |
| Movement-to-compute energy ratio | 26.8135 |
| Total hierarchy traffic | 405504 bytes |
| Hierarchy equivalent ops per byte | 20.6869 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 241.371 |
| Max tier contention pressure ratio | 241.371 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.33% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 241.371 |
| Min tier contention bandwidth headroom ratio | 0.00414299 |
| Max transfer time | 8448.000 ns |
| Serialized transfer time | 9108.000 ns |
| Effective transfer time | 8448.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 8448.000 ns |
| Calibration-adjusted effective transfer | 8448.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 241.371 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 8448.000 ns |
| Bandwidth pressure ratio | 241.371 |
| Bandwidth-limited equivalent ops/s | 992969696969.697 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 8448.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 241.371 |
| Contention pressure ratio | 241.371 |
| Contention-adjusted equivalent ops/s | 992969696969.697 |

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
| Optical compute delivered | 2097.152 pJ |
| Laser electrical energy | 8388.608 pJ |
| Detector energy | 655.360 pJ |
| ADC energy | 32768.000 pJ |
| Vector DAC energy | 7864.320 pJ |
| Weight DAC energy | 1843.200 pJ |
| DAC energy | 9707.520 pJ |
| Total energy | 51519.488 pJ |
| Energy per MAC | 0.012 pJ |
| Energy per equivalent op | 0.006 pJ |
| Peripheral share | 83.72% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 2.000 ns |
| Batch latency | 35.000 ns |
| Steady-state operations/s | 500000000.000 |
| Steady-state equivalent ops/s | 262144000000000.000 |

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
- The benchmark models 16 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
