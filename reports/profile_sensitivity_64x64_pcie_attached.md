# PhotonicBench Benchmark Card: 64x64 profile sensitivity - PCIe attached

Same 64x64 photonic matmul workload as the starter card, using the pcie_attached system profile to isolate movement-tier sensitivity.





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
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 33.33% | 0.04% | 0.04% | 12.000 ns | 29.647 ns | 5.92941 | 435.200 bytes/ns | 2457.600 bytes/ns | 5.64706 | -2022.400 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 33.33% | 0.40% | 0.40% | 96.000 ns | 237.176 ns | 47.4353 | 54.400 bytes/ns | 2457.600 bytes/ns | 45.1765 | -2403.200 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 614400.000 pJ | 33.33% | 99.56% | 98.88% | 1536.000 ns | 3794.824 ns | 758.965 | 3.400 bytes/ns | 2457.600 bytes/ns | 722.824 | -2454.200 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4251.648 pJ | 0.68% |
| SRAM movement | 245.760 pJ | 0.04% |
| Intermediate/cache movement | 2457.600 pJ | 0.40% |
| Off-chip/DRAM movement | 614400.000 pJ | 98.88% |
| Total movement | 617103.360 pJ | 99.32% |

| Metric | Value |
| --- | ---: |
| System profile | pcie_attached |
| Profile tier overrides | none |
| Memory scenario | pcie_attached |
| Scenario description | Local SRAM plus a host/PCIe-attached memory path with lower effective bandwidth and higher movement energy. |
| Memory timing mode | serialized |
| Contention preset | pcie_round_robin |
| Contention preset description | Host/PCIe-attached path: two clients share a serialized host link with round-robin arbitration and explicit protocol guardband. |
| Contention overlap model | serialized_host_link |
| Shared bandwidth clients | 2 |
| Arbitration efficiency | 0.85 |
| Calibration/control overhead | 0.05 |
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 617103.360 pJ |
| Total system energy | 621355.008 pJ |
| System energy per MAC | 2.370 pJ |
| System energy per equivalent op | 1.185 pJ |
| Local compute/conversion energy share | 0.68% |
| Movement energy share | 99.32% |
| Movement-to-compute energy ratio | 145.145 |
| Total hierarchy traffic | 36864 bytes |
| Hierarchy equivalent ops per byte | 14.2222 |
| Movement energy per hierarchy byte | 16.740 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 307.2 |
| Max tier contention pressure ratio | 758.965 |
| Max tier movement-energy share | 99.56% |
| Max tier system energy share | 98.88% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 722.824 |
| Min tier contention bandwidth headroom ratio | 0.00138346 |
| Max transfer time | 1536.000 ns |
| Serialized transfer time | 1644.000 ns |
| Effective transfer time | 1644.000 ns |
| Contention bandwidth derate | 0.425 |
| Contention-adjusted effective transfer | 3868.235 ns |
| Calibration-adjusted effective transfer | 4061.647 ns |
| Calibration guardband time | 193.412 ns |
| Contention transfer overhead | 135.29% |
| Total transfer overhead | 147.06% |
| Effective loaded hierarchy bandwidth | 22.423 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 9.530 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 9.076 bytes/ns |
| Effective usable bandwidth under load | 9.530 bytes/ns |
| Guardbanded usable bandwidth under load | 9.076 bytes/ns |
| Transfer-to-compute time ratio | 328.8 |
| Bandwidth-limited tier | serialized_tier_path |
| Bandwidth-limited batch latency | 1644.000 ns |
| Bandwidth pressure ratio | 328.8 |
| Bandwidth-limited equivalent ops/s | 318909975669.100 |
| Contention-limited tier | serialized_tier_path |
| Contention-adjusted batch latency | 4061.647 ns |
| Contention-adjusted transfer-to-compute time ratio | 812.329 |
| Contention pressure ratio | 812.329 |
| Contention-adjusted equivalent ops/s | 129082609199.398 |

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
- The pcie_attached profile is a local modeling preset, not a measured hardware configuration.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
