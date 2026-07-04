# PhotonicBench Benchmark Card: Sved 2026 inverse-designed PNN surrogate

Source-backed card for the Nature Communications 2026 inverse-designed nanophotonic neural network accelerator. The local workload is a compact 16-feature classifier tile surrogate only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Inverse-designed nanophotonic neural network accelerators for ultra-compact optical computing |
| URL | https://www.nature.com/articles/s41467-026-68648-1 |
| DOI | 10.1038/s41467-026-68648-1 |
| Venue | Nature Communications 17, 1059 (2026) |
| Claim status | paper-reported inverse-designed PNN density, footprint, and accuracy metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Inverse-designed nanophotonic neural network accelerator on SOI |
| Computational density parameters per mm2 | 400000000 |
| Mnist accuracy percent | 89 |
| Mednist accuracy percent | 90 |
| Mnist footprint um2 | 400 |
| Mednist footprint um2 | 600 |
| Example patch input dimension | 16 |
| Single wavelength operation | True |
| Surrogate mapping | m=1, k=16, n=10 is a compact classifier-head surrogate; it does not reproduce inverse-designed scattering fields. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | computational_density, footprint, task_accuracy, architecture |
| Local surrogate type | compact_inverse_designed_pnn_classifier_surrogate |
| Confidence grade | C |

| Dimension | Coverage |
| --- | --- |
| Throughput | not_reported |
| Energy | not_reported |
| Accuracy | reported |
| Area | reported |
| Precision | not_reported |

Source-quality notes:

- The source is an accelerator paper with strong density and accuracy evidence, but the local dense tile is not a field-propagation or inverse-design model.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Inverse-designed nanophotonic neural network accelerator on SOI | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Computational density parameters per mm2 | 400000000 | published_calibration.additional_metrics.computational_density_parameters_per_mm2 | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mnist accuracy percent | 89 | published_calibration.additional_metrics.mnist_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mednist accuracy percent | 90 | published_calibration.additional_metrics.mednist_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mnist footprint um2 | 400 | published_calibration.additional_metrics.mnist_footprint_um2 | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mednist footprint um2 | 600 | published_calibration.additional_metrics.mednist_footprint_um2 | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Example patch input dimension | 16 | published_calibration.additional_metrics.example_patch_input_dimension | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Single wavelength operation | True | published_calibration.additional_metrics.single_wavelength_operation | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=1, k=16, n=10 is a compact classifier-head surrogate; it does not reproduce inverse-designed scattering fields. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: compact_inverse_designed_pnn_classifier_surrogate.
- The source is an accelerator paper with strong density and accuracy evidence, but the local dense tile is not a field-propagation or inverse-design model.
- The local card uses a 16-feature by 10-class classifier surrogate to keep the accelerator visible in PhotonicBench comparisons.
- Published density, footprint, and accuracy are preserved as reference metadata only.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.

Confidence flags:

- claim_status=paper-reported inverse-designed PNN density, footprint, and accuracy metrics; matmul-surrogate local model
- source_doi=10.1038/s41467-026-68648-1
- source_quality_grade=C
- coverage.accuracy=reported
- coverage.area=reported
- coverage.energy=not_reported
- coverage.precision=not_reported
- coverage.throughput=not_reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 16 times 16 x 10 |
| Operations per batch | 1 |
| MACs per operation | 160 |
| MACs | 160 |
| Equivalent ops per operation | 320 |
| Equivalent ops | 320 |
| Output elements per operation | 10 |
| Output elements | 10 |
| Vector DAC conversions | 16 |
| Weight DAC conversions | 160 |
| DAC conversions | 176 |
| ADC conversions | 10 |

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
| Weight operand reads | 160 bytes |
| Output writes | 10 bytes |
| Total interface traffic | 186 bytes |
| MACs per interface byte | 0.860215 |
| Equivalent ops per interface byte | 1.72043 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 176 bytes | 10 bytes | 3.720 pJ | 33.33% | 0.20% | 0.19% | 0.182 ns | 0.182 ns | 0.181641 | 1024.000 bytes/ns | 186.000 bytes/ns | 0.181641 | 838.000 bytes/ns |
| Intermediate/cache | 176 bytes | 10 bytes | 37.200 pJ | 33.33% | 1.96% | 1.92% | 0.727 ns | 0.727 ns | 0.726562 | 256.000 bytes/ns | 186.000 bytes/ns | 0.726562 | 70.000 bytes/ns |
| Off-chip/DRAM | 176 bytes | 10 bytes | 1860.000 pJ | 33.33% | 97.85% | 95.80% | 11.625 ns | 11.625 ns | 11.625 | 16.000 bytes/ns | 186.000 bytes/ns | 11.625 | -170.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 40.620 pJ | 2.09% |
| SRAM movement | 3.720 pJ | 0.19% |
| Intermediate/cache movement | 37.200 pJ | 1.92% |
| Off-chip/DRAM movement | 1860.000 pJ | 95.80% |
| Total movement | 1900.920 pJ | 97.91% |

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
| Local compute/conversion energy | 40.620 pJ |
| Total movement energy | 1900.920 pJ |
| Total system energy | 1941.540 pJ |
| System energy per MAC | 12.135 pJ |
| System energy per equivalent op | 6.067 pJ |
| Local compute/conversion energy share | 2.09% |
| Movement energy share | 97.91% |
| Movement-to-compute energy ratio | 46.7976 |
| Total hierarchy traffic | 558 bytes |
| Hierarchy equivalent ops per byte | 0.573477 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 11.625 |
| Max tier contention pressure ratio | 11.625 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 95.80% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 11.625 |
| Min tier contention bandwidth headroom ratio | 0.0860215 |
| Max transfer time | 11.625 ns |
| Serialized transfer time | 12.533 ns |
| Effective transfer time | 11.625 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 11.625 ns |
| Calibration-adjusted effective transfer | 11.625 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 11.625 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 11.625 ns |
| Bandwidth pressure ratio | 11.625 |
| Bandwidth-limited equivalent ops/s | 27526881720.430 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 11.625 ns |
| Contention-adjusted transfer-to-compute time ratio | 11.625 |
| Contention pressure ratio | 11.625 |
| Contention-adjusted equivalent ops/s | 27526881720.430 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | Historical PhotonicBench SRAM/intermediate/off-chip defaults; tier numbers are local assumptions. | Computing's energy problem (and what we can do about it) (10.1109/ISSCC.2014.6757323) | SRAM, intermediate, and off-chip pJ/byte and bandwidth values are PhotonicBench defaults, not paper-measured hardware values.; The scenario is a conservative baseline for sensitivity comparisons. | Use this as a baseline scenario only; prefer a named profile when the card is intended to stress a specific hierarchy behavior. |
| Contention preset | local-baseline | Dedicated path: one modeled client, no arbitration loss, and no calibration/control guardband. | explicit local assumption | shared_bandwidth_clients=1, arbitration_efficiency=1, and calibration_overhead_fraction=0 are local baseline assumptions. | Use as the no-contention reference point. |


## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 0.080 pJ |
| Laser electrical energy | 0.320 pJ |
| Detector energy | 0.100 pJ |
| ADC energy | 5.000 pJ |
| Vector DAC energy | 3.200 pJ |
| Weight DAC energy | 32.000 pJ |
| DAC energy | 35.200 pJ |
| Total energy | 40.620 pJ |
| Energy per MAC | 0.254 pJ |
| Energy per equivalent op | 0.127 pJ |
| Peripheral share | 99.21% |

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
| Steady-state equivalent ops/s | 320000000000.000 |

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
- The local card uses a 16-feature by 10-class classifier surrogate to keep the accelerator visible in PhotonicBench comparisons.
- Published density, footprint, and accuracy are preserved as reference metadata only.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
