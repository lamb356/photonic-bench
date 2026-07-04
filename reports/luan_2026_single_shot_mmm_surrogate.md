# PhotonicBench Benchmark Card: Luan 2026 single-shot MMM optical tensor processor surrogate

Source-backed card for the Nature Communications 2026 single-shot matrix-matrix photonic processor. The local workload is a 16x16 dense GEMM tile matching the reported 4096 MACs per optical shot; it is not a diffraction-field or camera/readout reproduction.

## Provenance

| Field | Value |
| --- | --- |
| Source | Single-shot matrix-matrix photonic processor based on spatial-spectral hypermultiplexed parallel diffraction |
| URL | https://www.nature.com/articles/s41467-026-68452-x |
| DOI | 10.1038/s41467-026-68452-x |
| Venue | Nature Communications 17, 484 (2026) |
| Claim status | paper-reported single-shot matrix-matrix optical processor metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Spatial-wavelength-temporal hypermultiplexed optical tensor processor |
| Demonstrated tile | 16x16_by_16x16 |
| Reported macs per shot | 4096 |
| Reported sample rate gsa per s | 2 |
| Reported optical energy per mac aj | 20 |
| Reported classification accuracy percent | 96.4 |
| Derived equivalent tops from macs per shot and rate | 16.384 |
| Surrogate mapping | m=16, k=16, n=16 preserves the reported 4096 MACs per shot; local converter and system tiers are PhotonicBench assumptions. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | macs_per_shot, sample_rate, optical_energy_per_mac, accuracy |
| Local surrogate type | dense_single_shot_mmm_tile_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- The source directly reports the optical tensor processor tile, MACs per shot, sample rate, optical energy per MAC, and task accuracy.
- PhotonicBench does not model the diffraction optics, spatial/spectral routing, imaging, or detector-array readout.



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
| Pipeline cycle time | 0.500 ns |

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

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 512 bytes | 256 bytes | 15.360 pJ | 0.750 ns | 0.750 ns | 1024.000 bytes/ns |
| Intermediate/cache | 512 bytes | 256 bytes | 153.600 pJ | 3.000 ns | 3.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 512 bytes | 256 bytes | 7680.000 pJ | 48.000 ns | 48.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 233.288 pJ |
| Total movement energy | 7848.960 pJ |
| Total system energy | 8082.248 pJ |
| System energy per MAC | 1.973 pJ |
| System energy per equivalent op | 0.987 pJ |
| Movement energy share | 97.11% |
| Total hierarchy traffic | 2304 bytes |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
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
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 48.000 ns |
| Bandwidth pressure ratio | 96 |
| Bandwidth-limited equivalent ops/s | 170666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 48.000 ns |
| Contention pressure ratio | 96 |
| Contention-adjusted equivalent ops/s | 170666666666.667 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.082 pJ |
| Laser electrical energy | 0.328 pJ |
| Detector energy | 2.560 pJ |
| ADC energy | 128.000 pJ |
| Vector DAC energy | 51.200 pJ |
| Weight DAC energy | 51.200 pJ |
| DAC energy | 102.400 pJ |
| Total energy | 233.288 pJ |
| Energy per MAC | 0.057 pJ |
| Energy per equivalent op | 0.028 pJ |
| Peripheral share | 99.86% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 0.500 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 0.500 ns |
| Pipeline cycle time | 0.500 ns |
| Batch latency | 0.500 ns |
| Steady-state operations/s | 2000000000.000 |
| Steady-state equivalent ops/s | 16384000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000050 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- The local optical MAC energy is set to the paper-reported optical 20 aJ/MAC value converted to 0.02 fJ/MAC.
- Converter energy, SRAM/intermediate/off-chip movement, and wall-plug assumptions are local PhotonicBench values and not source-reported system power.
- Weight-stationary mode approximates reusing the right operand inside the reported 16x16-by-16x16 optical tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
