# PhotonicBench Benchmark Card: Prapas 2025 TSW PITC tensor-core surrogate

Source-backed card for the Optics Express 2025 time-space-wavelength multiplexed photonic integrated tensor core using WDM SiGe EAM array chiplets. The local workload is an 8x8 dense tensor-core tile surrogate.

## Provenance

| Field | Value |
| --- | --- |
| Source | Time-space-wavelength multiplexed photonic tensor core using WDM SiGe EAM array chiplets |
| URL | https://opg.optica.org/oe/fulltext.cfm?uri=oe-33-17-36960 |
| DOI | 10.1364/OE.564666 |
| Venue | Optics Express 33, 36960-36972 (2025) |
| Claim status | paper-reported PITC throughput, modulation, and benchmark metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | AWGR-enabled photonic integrated tensor core with WDM SiGe EAM array chiplets |
| Reported throughput | 2.560 TOPS |
| Demonstrated pitc shape | 8x8 |
| Eam wdm channels | 8 |
| Modulation rate gbaud | 20 |
| Iris cohen kappa | 0.8438 |
| Mnist cohen kappa | 0.7421 |
| Eam footprint reduction x vs ring modulator | 4.0 |
| Eam energy efficiency improvement x vs mzm | 6.9 |
| Surrogate mapping | m=8, k=8, n=8 is a dense local tile for the demonstrated PITC layout; it does not model AWGR routing or WDM EAM chiplet behavior. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, primitive_shape, modulation_rate, task_kappa, relative_efficiency |
| Local surrogate type | dense_8x8_tsw_pitc_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | derived |
| Accuracy | reported |
| Area | derived |
| Precision | not_reported |

Source-quality notes:

- Reported TOPS and benchmark kappa are direct paper metrics; energy evidence is relative to comparator modulator implementations, so local energy and timing remain generic assumptions.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 8 x 8 times 8 x 8 |
| Operations per batch | 1 |
| MACs per operation | 512 |
| MACs | 512 |
| Equivalent ops per operation | 1024 |
| Equivalent ops | 1024 |
| Output elements per operation | 64 |
| Output elements | 64 |
| Vector DAC conversions | 64 |
| Weight DAC conversions | 64 |
| DAC conversions | 128 |
| ADC conversions | 64 |

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
| Vector operand reads | 64 bytes |
| Weight operand reads | 64 bytes |
| Output writes | 64 bytes |
| Total interface traffic | 192 bytes |
| MACs per interface byte | 2.66667 |
| Equivalent ops per interface byte | 5.33333 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 128 bytes | 64 bytes | 3.840 pJ | 33.33% | 0.20% | 0.19% | 0.188 ns | 0.188 ns | 0.1875 | 1024.000 bytes/ns | 192.000 bytes/ns | 0.1875 | 832.000 bytes/ns |
| Intermediate/cache | 128 bytes | 64 bytes | 38.400 pJ | 33.33% | 1.96% | 1.90% | 0.750 ns | 0.750 ns | 0.75 | 256.000 bytes/ns | 192.000 bytes/ns | 0.75 | 64.000 bytes/ns |
| Off-chip/DRAM | 128 bytes | 64 bytes | 1920.000 pJ | 33.33% | 97.85% | 94.98% | 12.000 ns | 12.000 ns | 12 | 16.000 bytes/ns | 192.000 bytes/ns | 12 | -176.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 59.264 pJ | 2.93% |
| SRAM movement | 3.840 pJ | 0.19% |
| Intermediate/cache movement | 38.400 pJ | 1.90% |
| Off-chip/DRAM movement | 1920.000 pJ | 94.98% |
| Total movement | 1962.240 pJ | 97.07% |

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
| Local compute/conversion energy | 59.264 pJ |
| Total movement energy | 1962.240 pJ |
| Total system energy | 2021.504 pJ |
| System energy per MAC | 3.948 pJ |
| System energy per equivalent op | 1.974 pJ |
| Local compute/conversion energy share | 2.93% |
| Movement energy share | 97.07% |
| Movement-to-compute energy ratio | 33.1102 |
| Total hierarchy traffic | 576 bytes |
| Hierarchy equivalent ops per byte | 1.77778 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 12 |
| Max tier contention pressure ratio | 12 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.98% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 12 |
| Min tier contention bandwidth headroom ratio | 0.0833333 |
| Max transfer time | 12.000 ns |
| Serialized transfer time | 12.938 ns |
| Effective transfer time | 12.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 12.000 ns |
| Calibration-adjusted effective transfer | 12.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 12 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 12.000 ns |
| Bandwidth pressure ratio | 12 |
| Bandwidth-limited equivalent ops/s | 85333333333.333 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 12.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 12 |
| Contention pressure ratio | 12 |
| Contention-adjusted equivalent ops/s | 85333333333.333 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.256 pJ |
| Laser electrical energy | 1.024 pJ |
| Detector energy | 0.640 pJ |
| ADC energy | 32.000 pJ |
| Vector DAC energy | 12.800 pJ |
| Weight DAC energy | 12.800 pJ |
| DAC energy | 25.600 pJ |
| Total energy | 59.264 pJ |
| Energy per MAC | 0.116 pJ |
| Energy per equivalent op | 0.058 pJ |
| Peripheral share | 98.27% |

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
| Steady-state equivalent ops/s | 1024000000000.000 |

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
- The local card maps the reported 8x8 PITC architectural layout into one dense 8x8 GEMM tile.
- Reported 2.56 TOPS and task kappa stay in the published reference section.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
