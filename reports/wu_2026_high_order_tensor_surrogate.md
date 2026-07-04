# PhotonicBench Benchmark Card: Wu 2026 high-order integrated tensor processor surrogate

Source-backed card for the Optica 2026 scalable high-order integrated photonic tensor processor. The paper uses frequency-domain modulation to decouple tensor dimensionality from physical device count; this config uses a 16x16 dense local GEMM tile for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Scalable high-order integrated photonic tensor processor via frequency-domain modulation |
| URL | https://doi.org/10.1364/OPTICA.579208 |
| DOI | 10.1364/OPTICA.579208 |
| Venue | Optica 13, 998-1006 (2026) |
| Claim status | paper-reported high-order tensor processor architecture; dense-GEMM-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | High-order integrated photonic tensor processor using frequency-domain modulation |
| Demonstrated tensor orders | third-order and fourth-order tensor multiplication |
| Frequency domain modulation | True |
| Decouples computational dimensionality from physical device count | True |
| Physical core | two-dimensional cascaded MZI and photodetector array |
| Surrogate mapping | m=16, k=16, n=16 is a dense local GEMM tile used to place the high-order tensor architecture in PhotonicBench comparisons; it is not a frequency-domain high-order tensor reproduction. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | architecture, tensor_order, scalability |
| Local surrogate type | dense_high_order_tensor_surrogate |
| Confidence grade | C |

| Dimension | Coverage |
| --- | --- |
| Throughput | not_reported |
| Energy | not_reported |
| Accuracy | derived |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- The source is a primary Optica paper with high-order tensor-processor evidence, but this card stores architecture/scaling claims rather than absolute TOPS or TOPS/W.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 16 x 16 times 16 x 16 |
| Operations per batch | 1 |
| MACs per operation | 4096 |
| MACs | 4096 |
| Equivalent ops per operation | 8192 |
| Equivalent ops | 8192 |
| Output elements per operation | 256 |
| Output elements | 256 |
| Vector DAC conversions | 256 |
| Weight DAC conversions | 256 |
| DAC conversions | 512 |
| ADC conversions | 256 |

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
| Vector operand reads | 256 bytes |
| Weight operand reads | 256 bytes |
| Output writes | 256 bytes |
| Total interface traffic | 768 bytes |
| MACs per interface byte | 5.33333 |
| Equivalent ops per interface byte | 10.6667 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 512 bytes | 256 bytes | 15.360 pJ | 33.33% | 0.20% | 0.19% | 0.750 ns | 0.750 ns | 0.75 | 1024.000 bytes/ns | 768.000 bytes/ns | 0.75 | 256.000 bytes/ns |
| Intermediate/cache | 512 bytes | 256 bytes | 153.600 pJ | 33.33% | 1.96% | 1.90% | 3.000 ns | 3.000 ns | 3 | 256.000 bytes/ns | 768.000 bytes/ns | 3 | -512.000 bytes/ns |
| Off-chip/DRAM | 512 bytes | 256 bytes | 7680.000 pJ | 33.33% | 97.85% | 94.93% | 48.000 ns | 48.000 ns | 48 | 16.000 bytes/ns | 768.000 bytes/ns | 48 | -752.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 241.152 pJ | 2.98% |
| SRAM movement | 15.360 pJ | 0.19% |
| Intermediate/cache movement | 153.600 pJ | 1.90% |
| Off-chip/DRAM movement | 7680.000 pJ | 94.93% |
| Total movement | 7848.960 pJ | 97.02% |

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
| Local compute/conversion energy | 241.152 pJ |
| Total movement energy | 7848.960 pJ |
| Total system energy | 8090.112 pJ |
| System energy per MAC | 1.975 pJ |
| System energy per equivalent op | 0.988 pJ |
| Local compute/conversion energy share | 2.98% |
| Movement energy share | 97.02% |
| Movement-to-compute energy ratio | 32.5478 |
| Total hierarchy traffic | 2304 bytes |
| Hierarchy equivalent ops per byte | 3.55556 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 48 |
| Max tier contention pressure ratio | 48 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.93% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 48 |
| Min tier contention bandwidth headroom ratio | 0.0208333 |
| Max transfer time | 48.000 ns |
| Serialized transfer time | 51.750 ns |
| Effective transfer time | 48.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 48.000 ns |
| Calibration-adjusted effective transfer | 48.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 48 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 48.000 ns |
| Bandwidth pressure ratio | 48 |
| Bandwidth-limited equivalent ops/s | 170666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 48.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 48 |
| Contention pressure ratio | 48 |
| Contention-adjusted equivalent ops/s | 170666666666.667 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 2.048 pJ |
| Laser electrical energy | 8.192 pJ |
| Detector energy | 2.560 pJ |
| ADC energy | 128.000 pJ |
| Vector DAC energy | 51.200 pJ |
| Weight DAC energy | 51.200 pJ |
| DAC energy | 102.400 pJ |
| Total energy | 241.152 pJ |
| Energy per MAC | 0.059 pJ |
| Energy per equivalent op | 0.029 pJ |
| Peripheral share | 96.60% |

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
| Steady-state equivalent ops/s | 8192000000000.000 |

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
- Source high-order tensor and frequency-domain modulation claims remain under published_calibration.additional_metrics.
- Local dense GEMM shape, generic device energy, memory hierarchy, and latency are PhotonicBench assumptions for dashboard comparison only.
- The card does not model microwave frequency bins, high-order tensor indexing, MZI calibration, or detector-array scheduling.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
