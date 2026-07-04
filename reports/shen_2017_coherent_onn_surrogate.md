# PhotonicBench Benchmark Card: Shen 2017 coherent ONN surrogate

Source-backed card for the Nature Photonics 2017 coherent nanophotonic neural-network experiment. The local workload is a 4x4 dense coherent-mesh surrogate; published accuracy and mesh facts remain separate.

## Provenance

| Field | Value |
| --- | --- |
| Source | Deep learning with coherent nanophotonic circuits |
| URL | https://doi.org/10.1038/nphoton.2017.93 |
| DOI | 10.1038/nphoton.2017.93 |
| Venue | Nature Photonics 11, 441-446 (2017) |
| Claim status | paper-reported coherent-mesh accuracy and scaling discussion; 4x4 local dense surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Coherent nanophotonic neural-network mesh |
| Matrix dimension | 4 |
| Output classes | 4 |
| Programmable unitary | SU(4) |
| Experimental vowel accuracy percent | 76.7 |
| Simulated vowel accuracy percent | 91.7 |
| Source energy scaling note | Source discusses optical matrix-multiplication energy scaling under idealized assumptions; PhotonicBench does not claim measured energy from this paper. |
| Surrogate mapping | m=4, k=4, n=4 follows the demonstrated four-dimensional coherent optical classifier, not a full neural-network training reproduction. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | accuracy, mesh_dimension, scaling_discussion |
| Local surrogate type | coherent_mesh_4x4_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | derived |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- The source strongly anchors the coherent 4x4 optical primitive and vowel-classification accuracy, but the local energy and hierarchy model are PhotonicBench assumptions.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 4 times 4 x 4 |
| Operations per batch | 1 |
| MACs per operation | 64 |
| MACs | 64 |
| Equivalent ops per operation | 128 |
| Equivalent ops | 128 |
| Output elements per operation | 16 |
| Output elements | 16 |
| Vector DAC conversions | 16 |
| Weight DAC conversions | 16 |
| DAC conversions | 32 |
| ADC conversions | 16 |

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
| Vector operand reads | 16 bytes |
| Weight operand reads | 16 bytes |
| Output writes | 16 bytes |
| Total interface traffic | 48 bytes |
| MACs per interface byte | 1.33333 |
| Equivalent ops per interface byte | 2.66667 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 32 bytes | 16 bytes | 0.864 pJ | 100.00% | 100.00% | 5.56% | 0.012 ns | 0.012 ns | 0.0117188 | 4096.000 bytes/ns | 48.000 bytes/ns | 0.0117188 | 4048.000 bytes/ns |
| Intermediate/cache | 0 bytes | 0 bytes | 0.000 pJ | 0.00% | 0.00% | 0.00% | 0.000 ns | 0.000 ns | 0 | 256.000 bytes/ns | 0.000 bytes/ns | 0 | 256.000 bytes/ns |
| Off-chip/DRAM | 0 bytes | 0 bytes | 0.000 pJ | 0.00% | 0.00% | 0.00% | 0.000 ns | 0.000 ns | 0 | 16.000 bytes/ns | 0.000 bytes/ns | 0 | 16.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 14.688 pJ | 94.44% |
| SRAM movement | 0.864 pJ | 5.56% |
| Intermediate/cache movement | 0.000 pJ | 0.00% |
| Off-chip/DRAM movement | 0.000 pJ | 0.00% |
| Total movement | 0.864 pJ | 5.56% |

| Metric | Value |
| --- | ---: |
| System profile | on_package_sram |
| Profile tier overrides | none |
| Memory scenario | on_package_sram |
| Scenario description | On-package SRAM scenario: converter-interface traffic is kept on a high-bandwidth local SRAM path with no modeled off-package movement. |
| Memory timing mode | overlapped |
| Contention preset | single_client |
| Contention preset description | Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband. |
| Contention overlap model | profile_timing_mode |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 14.688 pJ |
| Total movement energy | 0.864 pJ |
| Total system energy | 15.552 pJ |
| System energy per MAC | 0.243 pJ |
| System energy per equivalent op | 0.121 pJ |
| Local compute/conversion energy share | 94.44% |
| Movement energy share | 5.56% |
| Movement-to-compute energy ratio | 0.0588235 |
| Total hierarchy traffic | 48 bytes |
| Hierarchy equivalent ops per byte | 2.66667 |
| Movement energy per hierarchy byte | 0.018 pJ |
| SRAM traffic share | 100.00% |
| Intermediate/cache traffic share | 0.00% |
| Off-chip traffic share | 0.00% |
| Dominant traffic tier | sram |
| Dominant system energy component | local_compute_and_conversion |
| Dominant movement-energy tier | sram |
| Nominal memory bottleneck tier | sram |
| Contention memory bottleneck tier | sram |
| Max tier nominal pressure ratio | 0.0117188 |
| Max tier contention pressure ratio | 0.0117188 |
| Max tier movement-energy share | 100.00% |
| Max tier system energy share | 5.56% |
| Contention bandwidth saturation tier | sram |
| Max tier contention bandwidth utilization | 0.0117188 |
| Min tier contention bandwidth headroom ratio | 85.3333 |
| Max transfer time | 0.012 ns |
| Serialized transfer time | 0.012 ns |
| Effective transfer time | 0.012 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 0.012 ns |
| Calibration-adjusted effective transfer | 0.012 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 4096.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 4096.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 4096.000 bytes/ns |
| Effective usable bandwidth under load | 4096.000 bytes/ns |
| Guardbanded usable bandwidth under load | 4096.000 bytes/ns |
| Transfer-to-compute time ratio | 0.0117188 |
| Bandwidth-limited tier | compute |
| Bandwidth-limited batch latency | 1.000 ns |
| Bandwidth pressure ratio | 1 |
| Bandwidth-limited equivalent ops/s | 128000000000.000 |
| Contention-limited tier | compute |
| Contention-adjusted batch latency | 1.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 0.0117188 |
| Contention pressure ratio | 1 |
| Contention-adjusted equivalent ops/s | 128000000000.000 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.032 pJ |
| Laser electrical energy | 0.128 pJ |
| Detector energy | 0.160 pJ |
| ADC energy | 8.000 pJ |
| Vector DAC energy | 3.200 pJ |
| Weight DAC energy | 3.200 pJ |
| DAC energy | 6.400 pJ |
| Total energy | 14.688 pJ |
| Energy per MAC | 0.230 pJ |
| Energy per equivalent op | 0.115 pJ |
| Peripheral share | 99.13% |

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
| Steady-state equivalent ops/s | 128000000000.000 |

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
- Published coherent-mesh and accuracy values remain under published_calibration.
- Local timing, converter, energy, noise, and on-package SRAM scenario settings are PhotonicBench assumptions for comparison only.
- Weight-stationary mode approximates programmed coherent mesh weights during one local inference tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
