# PhotonicBench Benchmark Card: 64x64 profile sensitivity - DDR

Same 64x64 photonic matmul workload as the starter card, using the ddr system profile to isolate movement-tier sensitivity.






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
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 33.33% | 0.20% | 0.19% | 12.000 ns | 69.120 ns | 13.824 | 192.000 bytes/ns | 2457.600 bytes/ns | 12.8 | -2265.600 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 33.33% | 1.96% | 1.89% | 48.000 ns | 276.480 ns | 55.296 | 48.000 bytes/ns | 2457.600 bytes/ns | 51.2 | -2409.600 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 122880.000 pJ | 33.33% | 97.85% | 94.64% | 768.000 ns | 4423.680 ns | 884.736 | 3.000 bytes/ns | 2457.600 bytes/ns | 819.2 | -2454.600 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4251.648 pJ | 3.27% |
| SRAM movement | 245.760 pJ | 0.19% |
| Intermediate/cache movement | 2457.600 pJ | 1.89% |
| Off-chip/DRAM movement | 122880.000 pJ | 94.64% |
| Total movement | 125583.360 pJ | 96.73% |

| Metric | Value |
| --- | ---: |
| System profile | ddr |
| Profile tier overrides | none |
| Memory scenario | ddr |
| Scenario description | Local SRAM plus a generic DDR-class off-chip memory tier. This matches the baseline off-chip movement defaults. |
| Memory timing mode | overlapped |
| Contention preset | ddr_controller |
| Contention preset description | DDR/controller-style sharing: multiple clients and controller turnaround reduce usable bandwidth and add a larger guardband. |
| Contention overlap model | serialized_tier_path |
| Shared bandwidth clients | 4 |
| Arbitration efficiency | 0.75 |
| Calibration/control overhead | 0.08 |
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 125583.360 pJ |
| Total system energy | 129835.008 pJ |
| System energy per MAC | 0.495 pJ |
| System energy per equivalent op | 0.248 pJ |
| Local compute/conversion energy share | 3.27% |
| Movement energy share | 96.73% |
| Movement-to-compute energy ratio | 29.5376 |
| Total hierarchy traffic | 36864 bytes |
| Hierarchy equivalent ops per byte | 14.2222 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 153.6 |
| Max tier contention pressure ratio | 884.736 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.64% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 819.2 |
| Min tier contention bandwidth headroom ratio | 0.0012207 |
| Max transfer time | 768.000 ns |
| Serialized transfer time | 828.000 ns |
| Effective transfer time | 768.000 ns |
| Contention bandwidth derate | 0.1875 |
| Contention-adjusted effective transfer | 4096.000 ns |
| Calibration-adjusted effective transfer | 4423.680 ns |
| Calibration guardband time | 327.680 ns |
| Contention transfer overhead | 433.33% |
| Total transfer overhead | 476.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 9.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 8.333 bytes/ns |
| Effective usable bandwidth under load | 9.000 bytes/ns |
| Guardbanded usable bandwidth under load | 8.333 bytes/ns |
| Transfer-to-compute time ratio | 153.6 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 768.000 ns |
| Bandwidth pressure ratio | 153.6 |
| Bandwidth-limited equivalent ops/s | 682666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 4423.680 ns |
| Contention-adjusted transfer-to-compute time ratio | 884.736 |
| Contention pressure ratio | 884.736 |
| Contention-adjusted equivalent ops/s | 118518518518.518 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | Generic DDR-class off-chip tier matching the conservative PhotonicBench baseline movement defaults. | JEDEC DDR5 SDRAM standard catalog (JEDEC JESD79-5); Computing's energy problem (and what we can do about it) (10.1109/ISSCC.2014.6757323) | The 16 bytes/ns off-chip bandwidth and 10 pJ/byte energy are local default parameters.; Controller turnaround is represented by the local contention preset. | Use this scenario to expose cards that become movement-bound when off-chip traffic is DDR-like. |
| Contention preset | source-context-plus-local-parameters | DDR/controller-style sharing with local multi-client derate and larger control guardband. | JEDEC DDR5 SDRAM standard catalog (JEDEC JESD79-5) | Four modeled clients, 0.75 arbitration efficiency, and 0.08 guardband are local controller-stress assumptions. | Use when off-chip traffic should be penalized for controller and turnaround pressure. |


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
- The ddr profile is a local modeling preset, not a measured hardware configuration.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
