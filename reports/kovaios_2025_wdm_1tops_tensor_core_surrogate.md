# PhotonicBench Benchmark Card: Kovaios 2025 WDM 1 TOPS tensor core surrogate

Source-backed card for the Journal of Lightwave Technology 2025 WDM silicon photonic coherent crossbar. The local workload mirrors the reported 4x2x1 tensor-vector primitive while published metrics remain separate.

## Provenance

| Field | Value |
| --- | --- |
| Source | On-chip 1 TOPS Hyperdimensional Photonic Tensor Core Using a WDM Silicon Photonic Coherent Crossbar |
| URL | https://doi.org/10.1109/JLT.2025.3589088 |
| DOI | 10.1109/JLT.2025.3589088 |
| Venue | Journal of Lightwave Technology 43, 8799-8805 (2025) |
| Claim status | paper-reported throughput/error/classification metrics; primitive-shape local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Time-space-wavelength multiplexed WDM silicon photonic coherent crossbar |
| Reported throughput | 0.960 TOPS |
| Tensor vector unit shape | 4x2x1 |
| Average error percent | 3.9 |
| Eam bandwidth ghz | 56 |
| Channels | 4 |
| Inputs per channel | 2 |
| Iris accuracy percent 4x10 to 4x30 gbd | 93.3 |
| Iris accuracy percent 4x60 gbd | 83.3 |
| Zenodo doi | 10.5281/zenodo.20052485 |
| Surrogate mapping | m=4, k=2, n=1 mirrors the reported 4x2x1 tensor-vector primitive; it is not the full hyperdimensional scaling analysis. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, error, data_rate, classification_accuracy |
| Local surrogate type | primitive_wdm_tensor_vector_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- The local shape tracks the demonstrated primitive, while the reported 0.96 TOPS system claim is kept as published reference data.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Time-space-wavelength multiplexed WDM silicon photonic coherent crossbar | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported throughput | 0.96 | published_calibration.reported_tops | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Tensor vector unit shape | 4x2x1 | published_calibration.additional_metrics.tensor_vector_unit_shape | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Average error percent | 3.9 | published_calibration.additional_metrics.average_error_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Eam bandwidth ghz | 56 | published_calibration.additional_metrics.eam_bandwidth_ghz | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Channels | 4 | published_calibration.additional_metrics.channels | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Inputs per channel | 2 | published_calibration.additional_metrics.inputs_per_channel | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Iris accuracy percent 4x10 to 4x30 gbd | 93.3 | published_calibration.additional_metrics.iris_accuracy_percent_4x10_to_4x30_gbd | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Iris accuracy percent 4x60 gbd | 83.3 | published_calibration.additional_metrics.iris_accuracy_percent_4x60_gbd | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Zenodo doi | 10.5281/zenodo.20052485 | published_calibration.additional_metrics.zenodo_doi | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=4, k=2, n=1 mirrors the reported 4x2x1 tensor-vector primitive; it is not the full hyperdimensional scaling analysis. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: primitive_wdm_tensor_vector_surrogate.
- The local shape tracks the demonstrated primitive, while the reported 0.96 TOPS system claim is kept as published reference data.
- Source-reported throughput, error, data-rate, and Iris classification metrics remain under published_calibration.
- Local energy and system movement are PhotonicBench assumptions for a tiny primitive-shaped matmul workload.
- This card does not model POPS-scale extrapolation, wavelength routing, or time-space-wavelength scheduling.

Confidence flags:

- claim_status=paper-reported throughput/error/classification metrics; primitive-shape local model
- source_doi=10.1109/JLT.2025.3589088
- source_quality_grade=B
- coverage.accuracy=reported
- coverage.area=not_reported
- coverage.energy=not_reported
- coverage.precision=reported
- coverage.throughput=reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 4 x 2 times 2 x 1 |
| Operations per batch | 1 |
| MACs per operation | 8 |
| MACs | 8 |
| Equivalent ops per operation | 16 |
| Equivalent ops | 16 |
| Output elements per operation | 4 |
| Output elements | 4 |
| Vector DAC conversions | 8 |
| Weight DAC conversions | 2 |
| DAC conversions | 10 |
| ADC conversions | 4 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 8 bytes |
| Weight operand reads | 2 bytes |
| Output writes | 4 bytes |
| Total interface traffic | 14 bytes |
| MACs per interface byte | 0.571429 |
| Equivalent ops per interface byte | 1.14286 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 10 bytes | 4 bytes | 0.280 pJ | 33.33% | 0.20% | 0.19% | 0.014 ns | 0.014 ns | 0.0136719 | 1024.000 bytes/ns | 14.000 bytes/ns | 0.0136719 | 1010.000 bytes/ns |
| Intermediate/cache | 10 bytes | 4 bytes | 2.800 pJ | 33.33% | 1.96% | 1.90% | 0.055 ns | 0.055 ns | 0.0546875 | 256.000 bytes/ns | 14.000 bytes/ns | 0.0546875 | 242.000 bytes/ns |
| Off-chip/DRAM | 10 bytes | 4 bytes | 140.000 pJ | 33.33% | 97.85% | 95.15% | 0.875 ns | 0.875 ns | 0.875 | 16.000 bytes/ns | 14.000 bytes/ns | 0.875 | 2.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4.056 pJ | 2.76% |
| SRAM movement | 0.280 pJ | 0.19% |
| Intermediate/cache movement | 2.800 pJ | 1.90% |
| Off-chip/DRAM movement | 140.000 pJ | 95.15% |
| Total movement | 143.080 pJ | 97.24% |

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
| Local compute/conversion energy | 4.056 pJ |
| Total movement energy | 143.080 pJ |
| Total system energy | 147.136 pJ |
| System energy per MAC | 18.392 pJ |
| System energy per equivalent op | 9.196 pJ |
| Local compute/conversion energy share | 2.76% |
| Movement energy share | 97.24% |
| Movement-to-compute energy ratio | 35.2761 |
| Total hierarchy traffic | 42 bytes |
| Hierarchy equivalent ops per byte | 0.380952 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 0.875 |
| Max tier contention pressure ratio | 0.875 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 95.15% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 0.875 |
| Min tier contention bandwidth headroom ratio | 1.14286 |
| Max transfer time | 0.875 ns |
| Serialized transfer time | 0.943 ns |
| Effective transfer time | 0.875 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 0.875 ns |
| Calibration-adjusted effective transfer | 0.875 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 0.875 |
| Bandwidth-limited tier | compute |
| Bandwidth-limited batch latency | 1.000 ns |
| Bandwidth pressure ratio | 1 |
| Bandwidth-limited equivalent ops/s | 16000000000.000 |
| Contention-limited tier | compute |
| Contention-adjusted batch latency | 1.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 0.875 |
| Contention pressure ratio | 1 |
| Contention-adjusted equivalent ops/s | 16000000000.000 |

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
| Optical compute delivered | 0.004 pJ |
| Laser electrical energy | 0.016 pJ |
| Detector energy | 0.040 pJ |
| ADC energy | 2.000 pJ |
| Vector DAC energy | 1.600 pJ |
| Weight DAC energy | 0.400 pJ |
| DAC energy | 2.000 pJ |
| Total energy | 4.056 pJ |
| Energy per MAC | 0.507 pJ |
| Energy per equivalent op | 0.254 pJ |
| Peripheral share | 99.61% |

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
| Steady-state equivalent ops/s | 16000000000.000 |

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
- Source-reported throughput, error, data-rate, and Iris classification metrics remain under published_calibration.
- Local energy and system movement are PhotonicBench assumptions for a tiny primitive-shaped matmul workload.
- This card does not model POPS-scale extrapolation, wavelength routing, or time-space-wavelength scheduling.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
