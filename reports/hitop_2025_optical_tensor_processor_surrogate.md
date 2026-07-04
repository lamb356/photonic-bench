# PhotonicBench Benchmark Card: HITOP 2025 optical tensor processor surrogate

Source-backed card for the Science Advances 2025 HITOP optical tensor processor. The published system uses space-time-wavelength hypermultiplexing; this config uses a 64x64 dense local matmul surrogate for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Hypermultiplexed integrated photonics-based optical tensor processor |
| URL | https://www.science.org/doi/10.1126/sciadv.adu0228 |
| DOI | 10.1126/sciadv.adu0228 |
| Venue | Science Advances 11, eadu0228 (2025) |
| Claim status | paper-reported HITOP efficiency/scale claims; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Space-time-wavelength hypermultiplexed integrated photonic tensor processor |
| Energy efficiency, including lasers | 40.000 TOPS/W |
| Energy per equivalent op, including lasers | 0.025 pJ |
| Energy per MAC, including lasers | 0.050 pJ |
| Workload energy, including lasers | 13107.200 pJ |
| Component-model / published including-lasers ratio | 0.324 x |
| Reported throughput note | Source reports trillions of operations per second but no single scalar TOPS value is encoded in this card. |
| Reported energy per op fj from efficiency | 25 |
| Model parameters validated | 405000 |
| Multiplexing dimensions | space-time-wavelength |
| Dataset url | https://datadryad.org/dataset/doi:10.5061/dryad.kprr4xhgj |
| Surrogate mapping | m=64, k=64, n=64 is a dense local surrogate for HITOP tensor processing; not an exact space-time-wavelength streaming schedule. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | energy_efficiency, scale, model_size, dataset |
| Local surrogate type | dense_hypermultiplexed_tensor_surrogate |
| Confidence grade | C |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | reported |
| Accuracy | not_reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Useful efficiency and scale evidence, but this card does not encode a single reported TOPS value or exact HITOP streaming schedule.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Space-time-wavelength hypermultiplexed integrated photonic tensor processor | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Energy efficiency including lasers | 40.0 | published_calibration.energy_efficiency_including_lasers_tops_per_watt | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported throughput note | Source reports trillions of operations per second but no single scalar TOPS value is encoded in this card. | published_calibration.additional_metrics.reported_throughput_note | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Reported energy per op fj from efficiency | 25 | published_calibration.additional_metrics.reported_energy_per_op_fj_from_efficiency | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Model parameters validated | 405000 | published_calibration.additional_metrics.model_parameters_validated | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Multiplexing dimensions | space-time-wavelength | published_calibration.additional_metrics.multiplexing_dimensions | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Dataset url | https://datadryad.org/dataset/doi:10.5061/dryad.kprr4xhgj | published_calibration.additional_metrics.dataset_url | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=64, k=64, n=64 is a dense local surrogate for HITOP tensor processing; not an exact space-time-wavelength streaming schedule. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |
| energy_per_op_including_lasers_pj | 1 / energy_efficiency_including_lasers_tops_per_watt | energy_efficiency_including_lasers_tops_per_watt=40.0 | 0.025 |  |
| energy_per_mac_including_lasers_pj | 2 / energy_efficiency_including_lasers_tops_per_watt | energy_efficiency_including_lasers_tops_per_watt=40.0 | 0.05 |  |
| total_energy_including_lasers_pj | equivalent_ops / energy_efficiency_including_lasers_tops_per_watt | energy_efficiency_including_lasers_tops_per_watt=40.0, equivalent_ops=524288 | 13107.2 |  |
| model_to_published_including_lasers_ratio | local_model.energy.total_pj / published_reference.derived_unit_conversions.total_energy_including_lasers_pj | published_total_energy_including_lasers_pj=13107.2 | 0.324375 | Diagnostic ratio only; it does not change local_model or published_reference. |

Local assumptions:

- Local surrogate type: dense_hypermultiplexed_tensor_surrogate.
- Useful efficiency and scale evidence, but this card does not encode a single reported TOPS value or exact HITOP streaming schedule.
- Source reports HITOP operating at 40 TOPS/W and trillion-operation-per-second scale; PhotonicBench keeps those values as published references.
- Local timing, converter energy, system tiers, and noise settings are generic PhotonicBench assumptions, not HITOP device extraction.
- Weight-stationary mode is used only to model one reused surrogate right operand within a dense local tile.

Confidence flags:

- claim_status=paper-reported HITOP efficiency/scale claims; matmul-surrogate local model
- source_doi=10.1126/sciadv.adu0228
- source_quality_grade=C
- coverage.accuracy=not_reported
- coverage.area=not_reported
- coverage.energy=reported
- coverage.precision=not_reported
- coverage.throughput=derived

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



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
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

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
| SRAM | 8192 bytes | 4096 bytes | 245.760 pJ | 33.33% | 0.20% | 0.19% | 12.000 ns | 12.000 ns | 12 | 1024.000 bytes/ns | 12288.000 bytes/ns | 12 | -11264.000 bytes/ns |
| Intermediate/cache | 8192 bytes | 4096 bytes | 2457.600 pJ | 33.33% | 1.96% | 1.89% | 48.000 ns | 48.000 ns | 48 | 256.000 bytes/ns | 12288.000 bytes/ns | 48 | -12032.000 bytes/ns |
| Off-chip/DRAM | 8192 bytes | 4096 bytes | 122880.000 pJ | 33.33% | 97.85% | 94.64% | 768.000 ns | 768.000 ns | 768 | 16.000 bytes/ns | 12288.000 bytes/ns | 768 | -12272.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4251.648 pJ | 3.27% |
| SRAM movement | 245.760 pJ | 0.19% |
| Intermediate/cache movement | 2457.600 pJ | 1.89% |
| Off-chip/DRAM movement | 122880.000 pJ | 94.64% |
| Total movement | 125583.360 pJ | 96.73% |

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
| Local compute/conversion energy | 4251.648 pJ |
| Total movement energy | 125583.360 pJ |
| Total system energy | 129835.008 pJ |
| System energy per MAC | 0.495 pJ |
| System energy per equivalent op | 0.248 pJ |
| Local compute/conversion energy share | 3.27% |
| Movement energy share | 96.73% |
| Movement-to-compute energy ratio | 29.5376 |
| Total hierarchy traffic | 36864 bytes |
| Hierarchy equivalent ops per byte | 14.2222 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 768 |
| Max tier contention pressure ratio | 768 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.64% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 768 |
| Min tier contention bandwidth headroom ratio | 0.00130208 |
| Max transfer time | 768.000 ns |
| Serialized transfer time | 828.000 ns |
| Effective transfer time | 768.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 768.000 ns |
| Calibration-adjusted effective transfer | 768.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 768 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 768.000 ns |
| Bandwidth pressure ratio | 768 |
| Bandwidth-limited equivalent ops/s | 682666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 768.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 768 |
| Contention pressure ratio | 768 |
| Contention-adjusted equivalent ops/s | 682666666666.667 |

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
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 1.000 ns |
| Steady-state operations/s | 1000000000.000 |
| Steady-state equivalent ops/s | 524288000000000.000 |

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
- Source reports HITOP operating at 40 TOPS/W and trillion-operation-per-second scale; PhotonicBench keeps those values as published references.
- Local timing, converter energy, system tiers, and noise settings are generic PhotonicBench assumptions, not HITOP device extraction.
- Weight-stationary mode is used only to model one reused surrogate right operand within a dense local tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
