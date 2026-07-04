# PhotonicBench Benchmark Card: Tait 2017 microring weight-bank WDM surrogate

Source-backed card for the Scientific Reports 2017 broadcast-and-weight microring neural network. The local workload maps a 24-node recurrent weight-bank step to a 24x24 by 24x1 matvec surrogate with optical-interconnect movement assumptions.

## Provenance

| Field | Value |
| --- | --- |
| Source | Neuromorphic photonic networks using silicon photonic weight banks |
| URL | https://www.nature.com/articles/s41598-017-07754-z |
| DOI | 10.1038/s41598-017-07754-z |
| Venue | Scientific Reports 7, Article 7430 (2017) |
| Claim status | paper-reported broadcast-and-weight architecture and 24-node simulation; WDM matvec surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Silicon photonic broadcast-and-weight microring weight-bank network |
| Simulated nodes | 24 |
| Microring weights | 576 |
| Laser modulator count | 24 |
| Weight bank count | 24 |
| Expected system power mw | 106 |
| Predicted acceleration vs conventional | 294 |
| Protocol | wavelength-division multiplexed broadcast-and-weight |
| Surrogate mapping | m=24, k=24, n=1 follows one 24-node recurrent weight-bank matvec step; it is not a full recurrent network simulation. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | architecture, node_count, weight_count, power_estimate, acceleration_estimate |
| Local surrogate type | wdm_microring_weight_bank_matvec_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | estimated |
| Accuracy | derived |
| Area | reported |
| Precision | not_reported |

Source-quality notes:

- The source anchors WDM broadcast-and-weight memory behavior and scale, while local energy and contention outputs are PhotonicBench scenario estimates.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 24 x 24 times 24 x 1 |
| Operations per batch | 1 |
| MACs per operation | 576 |
| MACs | 576 |
| Equivalent ops per operation | 1152 |
| Equivalent ops | 1152 |
| Output elements per operation | 24 |
| Output elements | 24 |
| Vector DAC conversions | 576 |
| Weight DAC conversions | 24 |
| DAC conversions | 600 |
| ADC conversions | 24 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 576 bytes |
| Weight operand reads | 24 bytes |
| Output writes | 24 bytes |
| Total interface traffic | 624 bytes |
| MACs per interface byte | 0.923077 |
| Equivalent ops per interface byte | 1.84615 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 600 bytes | 24 bytes | 12.480 pJ | 50.00% | 5.22% | 3.35% | 0.305 ns | 0.507 ns | 0.506709 | 1256.107 bytes/ns | 624.000 bytes/ns | 0.496773 | 632.107 bytes/ns |
| Intermediate/cache | 450 bytes | 18 bytes | 37.440 pJ | 37.50% | 15.67% | 10.06% | 0.457 ns | 0.760 ns | 0.760063 | 628.053 bytes/ns | 468.000 bytes/ns | 0.74516 | 160.053 bytes/ns |
| Off-chip/DRAM | 150 bytes | 6 bytes | 189.000 pJ | 12.50% | 79.11% | 50.76% | 0.203 ns | 0.338 ns | 0.337806 | 471.040 bytes/ns | 156.000 bytes/ns | 0.331182 | 315.040 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 133.392 pJ | 35.83% |
| SRAM movement | 12.480 pJ | 3.35% |
| Intermediate/cache movement | 37.440 pJ | 10.06% |
| Off-chip/DRAM movement | 189.000 pJ | 50.76% |
| Total movement | 238.920 pJ | 64.17% |

| Metric | Value |
| --- | ---: |
| System profile | optical_interconnect |
| Profile tier overrides | none |
| Memory scenario | optical_interconnect |
| Scenario description | Optical interconnect scenario: local SRAM is paired with high bandwidth intermediate and off-chip optical movement paths to stress WDM/broadcast-like data movement separately from core photonic compute. |
| Memory timing mode | overlapped |
| Contention preset | optical_interconnect_broadcast |
| Contention preset description | Optical interconnect/broadcast path: wavelength fanout reduces loaded-client contention, but arbitration and control guardband remain explicit local assumptions. |
| Contention overlap model | wavelength_broadcast_overlap |
| Shared bandwidth clients | 1.5 |
| Arbitration efficiency | 0.92 |
| Calibration/control overhead | 0.02 |
| Local compute/conversion energy | 133.392 pJ |
| Total movement energy | 238.920 pJ |
| Total system energy | 372.312 pJ |
| System energy per MAC | 0.646 pJ |
| System energy per equivalent op | 0.323 pJ |
| Local compute/conversion energy share | 35.83% |
| Movement energy share | 64.17% |
| Movement-to-compute energy ratio | 1.79111 |
| Total hierarchy traffic | 1248 bytes |
| Hierarchy equivalent ops per byte | 0.923077 |
| Movement energy per hierarchy byte | 0.191 pJ |
| SRAM traffic share | 50.00% |
| Intermediate/cache traffic share | 37.50% |
| Off-chip traffic share | 12.50% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | intermediate |
| Contention memory bottleneck tier | intermediate |
| Max tier nominal pressure ratio | 0.457031 |
| Max tier contention pressure ratio | 0.760063 |
| Max tier movement-energy share | 79.11% |
| Max tier system energy share | 50.76% |
| Contention bandwidth saturation tier | intermediate |
| Max tier contention bandwidth utilization | 0.74516 |
| Min tier contention bandwidth headroom ratio | 1.34199 |
| Max transfer time | 0.457 ns |
| Serialized transfer time | 0.965 ns |
| Effective transfer time | 0.457 ns |
| Contention bandwidth derate | 0.613333 |
| Contention-adjusted effective transfer | 0.745 ns |
| Calibration-adjusted effective transfer | 0.760 ns |
| Calibration guardband time | 0.015 ns |
| Contention transfer overhead | 63.04% |
| Total transfer overhead | 66.30% |
| Effective loaded hierarchy bandwidth | 2730.667 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 1674.809 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 1641.969 bytes/ns |
| Effective usable bandwidth under load | 1674.809 bytes/ns |
| Guardbanded usable bandwidth under load | 1641.969 bytes/ns |
| Transfer-to-compute time ratio | 0.457031 |
| Bandwidth-limited tier | compute |
| Bandwidth-limited batch latency | 1.000 ns |
| Bandwidth pressure ratio | 1 |
| Bandwidth-limited equivalent ops/s | 1152000000000.000 |
| Contention-limited tier | compute |
| Contention-adjusted batch latency | 1.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 0.760063 |
| Contention pressure ratio | 1 |
| Contention-adjusted equivalent ops/s | 1152000000000.000 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.288 pJ |
| Laser electrical energy | 1.152 pJ |
| Detector energy | 0.240 pJ |
| ADC energy | 12.000 pJ |
| Vector DAC energy | 115.200 pJ |
| Weight DAC energy | 4.800 pJ |
| DAC energy | 120.000 pJ |
| Total energy | 133.392 pJ |
| Energy per MAC | 0.232 pJ |
| Energy per equivalent op | 0.116 pJ |
| Peripheral share | 99.14% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 1.000 ns |
| Steady-state operations/s | 1000000000.000 |
| Steady-state equivalent ops/s | 1152000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000100 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Source-reported 24-node, 576-weight, expected-power, and acceleration figures remain under published_calibration.
- The optical_interconnect scenario is used to stress WDM/broadcast movement; it is not a measured link model from the paper.
- Weight-stationary mode approximates microring weight banks for one local recurrent-network step.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
