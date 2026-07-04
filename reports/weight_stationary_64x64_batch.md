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

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 69632 bytes | 65536 bytes | 2703.360 pJ | 132.000 ns | 132.000 ns | 1024.000 bytes/ns |
| Intermediate/cache | 69632 bytes | 65536 bytes | 27033.600 pJ | 528.000 ns | 528.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 69632 bytes | 65536 bytes | 1351680.000 pJ | 8448.000 ns | 8448.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 51519.488 pJ |
| Total movement energy | 1381416.960 pJ |
| Total system energy | 1432936.448 pJ |
| System energy per MAC | 0.342 pJ |
| System energy per equivalent op | 0.171 pJ |
| Movement energy share | 96.40% |
| Total hierarchy traffic | 405504 bytes |
| Hierarchy equivalent ops per byte | 20.6869 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
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
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
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
