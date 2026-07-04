# PhotonicBench Benchmark Card: 64x64 profile sensitivity - HBM

Same 64x64 photonic matmul workload as the starter card, using the hbm system profile to isolate movement-tier sensitivity.





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
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 33.33% | 0.62% | 0.56% | 12.000 ns | 26.609 ns | 5.32174 | 471.040 bytes/ns | 2457.600 bytes/ns | 5.21739 | -1986.560 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 33.33% | 6.21% | 5.61% | 48.000 ns | 106.435 ns | 21.287 | 117.760 bytes/ns | 2457.600 bytes/ns | 20.8696 | -2339.840 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 36864.000 pJ | 33.33% | 93.17% | 84.13% | 24.000 ns | 53.217 ns | 10.6435 | 235.520 bytes/ns | 2457.600 bytes/ns | 10.4348 | -2222.080 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4251.648 pJ | 9.70% |
| SRAM movement | 245.760 pJ | 0.56% |
| Intermediate/cache movement | 2457.600 pJ | 5.61% |
| Off-chip/DRAM movement | 36864.000 pJ | 84.13% |
| Total movement | 39567.360 pJ | 90.30% |

| Metric | Value |
| --- | ---: |
| System profile | hbm |
| Profile tier overrides | none |
| Memory scenario | hbm |
| Scenario description | Local SRAM plus a high-bandwidth-memory style off-chip tier with higher bandwidth and lower movement energy than generic DDR. |
| Memory timing mode | overlapped |
| Contention preset | shared_hbm_stack |
| Contention preset description | HBM-like shared stack: several clients share the loaded tier bandwidth with modest arbitration loss and a small control guardband. |
| Contention overlap model | overlapped_compute_window |
| Shared bandwidth clients | 2 |
| Arbitration efficiency | 0.92 |
| Calibration/control overhead | 0.02 |
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 39567.360 pJ |
| Total system energy | 43819.008 pJ |
| System energy per MAC | 0.167 pJ |
| System energy per equivalent op | 0.084 pJ |
| Local compute/conversion energy share | 9.70% |
| Movement energy share | 90.30% |
| Movement-to-compute energy ratio | 9.30636 |
| Total hierarchy traffic | 36864 bytes |
| Hierarchy equivalent ops per byte | 14.2222 |
| Movement energy per hierarchy byte | 1.073 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | intermediate |
| Contention memory bottleneck tier | intermediate |
| Max tier nominal pressure ratio | 9.6 |
| Max tier contention pressure ratio | 21.287 |
| Max tier movement-energy share | 93.17% |
| Max tier system energy share | 84.13% |
| Contention bandwidth saturation tier | intermediate |
| Max tier contention bandwidth utilization | 20.8696 |
| Min tier contention bandwidth headroom ratio | 0.0479167 |
| Max transfer time | 48.000 ns |
| Serialized transfer time | 84.000 ns |
| Effective transfer time | 48.000 ns |
| Contention bandwidth derate | 0.46 |
| Contention-adjusted effective transfer | 104.348 ns |
| Calibration-adjusted effective transfer | 106.435 ns |
| Calibration guardband time | 2.087 ns |
| Contention transfer overhead | 117.39% |
| Total transfer overhead | 121.74% |
| Effective loaded hierarchy bandwidth | 768.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 353.280 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 346.353 bytes/ns |
| Effective usable bandwidth under load | 353.280 bytes/ns |
| Guardbanded usable bandwidth under load | 346.353 bytes/ns |
| Transfer-to-compute time ratio | 9.6 |
| Bandwidth-limited tier | intermediate |
| Bandwidth-limited batch latency | 48.000 ns |
| Bandwidth pressure ratio | 9.6 |
| Bandwidth-limited equivalent ops/s | 10922666666666.666 |
| Contention-limited tier | intermediate |
| Contention-adjusted batch latency | 106.435 ns |
| Contention-adjusted transfer-to-compute time ratio | 21.287 |
| Contention pressure ratio | 21.287 |
| Contention-adjusted equivalent ops/s | 4925908496732.026 |

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
- The hbm profile is a local modeling preset, not a measured hardware configuration.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
