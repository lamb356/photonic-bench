# PhotonicBench Benchmark Card: 64x64 profile sensitivity - on-chip SRAM

Same 64x64 photonic matmul workload as the starter card, using the on_chip_sram system profile to isolate movement-tier sensitivity.






## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 64 x 64 times 64 x 64 |
| Operations per batch | 1 |
| MACs per operation | 262144 |
| MACs | 262144 |
| Equivalent ops per operation | 524288 |
| Equivalent ops | 524288 |
| Output elements per operation | 4096 |
| Output elements | 4096 |
| Vector DAC conversions | 4096 |
| Weight DAC conversions | 4096 |
| DAC conversions | 8192 |
| ADC conversions | 4096 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 1 |
| Pipeline cycle time | 5.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 4096 bytes |
| Weight operand reads | 4096 bytes |
| Output writes | 4096 bytes |
| Total interface traffic | 12288 bytes |
| MACs per interface byte | 21.3333 |
| Equivalent ops per interface byte | 42.6667 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 100.00% | 100.00% | 5.46% | 6.000 ns | 6.000 ns | 1.2 | 2048.000 bytes/ns | 2457.600 bytes/ns | 1.2 | -409.600 bytes/ns |
| Intermediate/cache | 0 bytes | 0 bytes | 0.000 pJ | 0.00% | 0.00% | 0.00% | 0.000 ns | 0.000 ns | 0 | 256.000 bytes/ns | 0.000 bytes/ns | 0 | 256.000 bytes/ns |
| Off-chip/DRAM | 0 bytes | 0 bytes | 0.000 pJ | 0.00% | 0.00% | 0.00% | 0.000 ns | 0.000 ns | 0 | 16.000 bytes/ns | 0.000 bytes/ns | 0 | 16.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4251.648 pJ | 94.54% |
| SRAM movement | 245.760 pJ | 5.46% |
| Intermediate/cache movement | 0.000 pJ | 0.00% |
| Off-chip/DRAM movement | 0.000 pJ | 0.00% |
| Total movement | 245.760 pJ | 5.46% |

| Metric | Value |
| --- | ---: |
| System profile | on_chip_sram |
| Profile tier overrides | none |
| Memory scenario | on_chip_sram |
| Scenario description | All modeled converter-interface traffic is assumed to stay on local SRAM; off-chip fractions are zero. |
| Memory timing mode | overlapped |
| Contention preset | single_client |
| Contention preset description | Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband. |
| Contention overlap model | profile_timing_mode |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 245.760 pJ |
| Total system energy | 4497.408 pJ |
| System energy per MAC | 0.017 pJ |
| System energy per equivalent op | 0.009 pJ |
| Local compute/conversion energy share | 94.54% |
| Movement energy share | 5.46% |
| Movement-to-compute energy ratio | 0.0578035 |
| Total hierarchy traffic | 12288 bytes |
| Hierarchy equivalent ops per byte | 42.6667 |
| Movement energy per hierarchy byte | 0.020 pJ |
| SRAM traffic share | 100.00% |
| Intermediate/cache traffic share | 0.00% |
| Off-chip traffic share | 0.00% |
| Dominant traffic tier | sram |
| Dominant system energy component | local_compute_and_conversion |
| Dominant movement-energy tier | sram |
| Nominal memory bottleneck tier | sram |
| Contention memory bottleneck tier | sram |
| Max tier nominal pressure ratio | 1.2 |
| Max tier contention pressure ratio | 1.2 |
| Max tier movement-energy share | 100.00% |
| Max tier system energy share | 5.46% |
| Contention bandwidth saturation tier | sram |
| Max tier contention bandwidth utilization | 1.2 |
| Min tier contention bandwidth headroom ratio | 0.833333 |
| Max transfer time | 6.000 ns |
| Serialized transfer time | 6.000 ns |
| Effective transfer time | 6.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 6.000 ns |
| Calibration-adjusted effective transfer | 6.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 2048.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 2048.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 2048.000 bytes/ns |
| Effective usable bandwidth under load | 2048.000 bytes/ns |
| Guardbanded usable bandwidth under load | 2048.000 bytes/ns |
| Transfer-to-compute time ratio | 1.2 |
| Bandwidth-limited tier | sram |
| Bandwidth-limited batch latency | 6.000 ns |
| Bandwidth pressure ratio | 1.2 |
| Bandwidth-limited equivalent ops/s | 87381333333333.328 |
| Contention-limited tier | sram |
| Contention-adjusted batch latency | 6.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 1.2 |
| Contention pressure ratio | 1.2 |
| Contention-adjusted equivalent ops/s | 87381333333333.328 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | All modeled converter-interface traffic stays on local SRAM. | Computing's energy problem (and what we can do about it) (10.1109/ISSCC.2014.6757323) | Off-chip and intermediate traffic fractions are local zeros.; SRAM bandwidth and energy are local parameters for sensitivity, not a specific macro datasheet. | Use this to bound cards whose system story depends on aggressive local buffering. |
| Contention preset | local-baseline | Dedicated path: one modeled client, no arbitration loss, and no calibration/control guardband. | explicit local assumption | shared_bandwidth_clients=1, arbitration_efficiency=1, and calibration_overhead_fraction=0 are local baseline assumptions. | Use as the no-contention reference point. |


## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 131.072 pJ |
| Laser electrical energy | 524.288 pJ |
| Detector energy | 40.960 pJ |
| ADC energy | 2048.000 pJ |
| Vector DAC energy | 819.200 pJ |
| Weight DAC energy | 819.200 pJ |
| DAC energy | 1638.400 pJ |
| Total energy | 4251.648 pJ |
| Energy per MAC | 0.016 pJ |
| Energy per equivalent op | 0.008 pJ |
| Peripheral share | 87.67% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 5.000 ns |
| Batch latency | 5.000 ns |
| Steady-state operations/s | 200000000.000 |
| Steady-state equivalent ops/s | 104857600000000.000 |

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
- Profile sensitivity card; component, timing, and noise assumptions match the starter 64x64 card.
- The on_chip_sram profile is a local modeling preset, not a measured hardware configuration.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
