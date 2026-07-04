# PhotonicBench Benchmark Card: Meng 2025 digital-analog HOP MVM surrogate

Source-backed card for the Nature Communications 2025 digital-analog hybrid optical processor. The local workload is a 3x3 convolution-kernel MVM surrogate for the cascaded-MRM HOP demonstration only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Digital-analog hybrid matrix multiplication processor for optical neural networks |
| URL | https://www.nature.com/articles/s41467-025-62586-0 |
| DOI | 10.1038/s41467-025-62586-0 |
| Venue | Nature Communications 16, 7465 (2025) |
| Claim status | paper-reported HOP architecture, sample energy, and data-rate metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Digital-analog hybrid optical processor using cascaded microring modulators |
| Hop energy per sample pj | 3.88 |
| Analog scheme energy per sample pj | 34.88 |
| Packaged cascaded mrms | 20 |
| Hdip data rate gbps per mrm | 7.5 |
| Hwdr data rate mbps per input | 400 |
| Yolo data rate mbps per input | 300 |
| Hdip input word bits | 16 |
| Task kernel shape | 3x3 |
| Surrogate mapping | m=1, k=9, n=1 encodes one 3x3 convolution-kernel MVM; it does not reproduce the HOP digital equalization or DSP chain. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | architecture, energy_per_sample, modulator_count, data_rate, precision |
| Local surrogate type | single_kernel_hop_mvm_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | not_applicable |
| Area | derived |
| Precision | reported |

Source-quality notes:

- HOP sample-energy and data-rate values are preserved as paper metadata and are not converted into local pJ/op calibration targets.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 9 times 9 x 1 |
| Operations per batch | 1 |
| MACs per operation | 9 |
| MACs | 9 |
| Equivalent ops per operation | 18 |
| Equivalent ops | 18 |
| Output elements per operation | 1 |
| Output elements | 1 |
| Vector DAC conversions | 9 |
| Weight DAC conversions | 9 |
| DAC conversions | 18 |
| ADC conversions | 1 |

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
| Vector operand reads | 9 bytes |
| Weight operand reads | 9 bytes |
| Output writes | 1 bytes |
| Total interface traffic | 19 bytes |
| MACs per interface byte | 0.473684 |
| Equivalent ops per interface byte | 0.947368 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 18 bytes | 1 bytes | 0.380 pJ | 33.33% | 0.20% | 0.019 ns | 0.019 ns | 0.0185547 | 1024.000 bytes/ns |
| Intermediate/cache | 18 bytes | 1 bytes | 3.800 pJ | 33.33% | 1.96% | 0.074 ns | 0.074 ns | 0.0742188 | 256.000 bytes/ns |
| Off-chip/DRAM | 18 bytes | 1 bytes | 190.000 pJ | 33.33% | 97.85% | 1.188 ns | 1.188 ns | 1.1875 | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 4.128 pJ |
| Total movement energy | 194.180 pJ |
| Total system energy | 198.308 pJ |
| System energy per MAC | 22.034 pJ |
| System energy per equivalent op | 11.017 pJ |
| Movement energy share | 97.92% |
| Total hierarchy traffic | 57 bytes |
| Hierarchy equivalent ops per byte | 0.315789 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 1.1875 |
| Max tier contention pressure ratio | 1.1875 |
| Max tier movement-energy share | 97.85% |
| Max transfer time | 1.188 ns |
| Serialized transfer time | 1.280 ns |
| Effective transfer time | 1.188 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 1.188 ns |
| Calibration-adjusted effective transfer | 1.188 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 1.1875 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 1.188 ns |
| Bandwidth pressure ratio | 1.1875 |
| Bandwidth-limited equivalent ops/s | 15157894736.842 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 1.188 ns |
| Contention-adjusted transfer-to-compute time ratio | 1.1875 |
| Contention pressure ratio | 1.1875 |
| Contention-adjusted equivalent ops/s | 15157894736.842 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.004 pJ |
| Laser electrical energy | 0.018 pJ |
| Detector energy | 0.010 pJ |
| ADC energy | 0.500 pJ |
| Vector DAC energy | 1.800 pJ |
| Weight DAC energy | 1.800 pJ |
| DAC energy | 3.600 pJ |
| Total energy | 4.128 pJ |
| Energy per MAC | 0.459 pJ |
| Energy per equivalent op | 0.229 pJ |
| Peripheral share | 99.56% |

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
| Steady-state equivalent ops/s | 18000000000.000 |

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
- The local card uses a single 3x3-kernel MVM surrogate for the HOP convolution demonstrations.
- The paper's digital-analog encoding, DSP/equalization, and task-level postprocessing remain outside the local component model.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
