# PhotonicBench Benchmark Card: Pappas 2025 AWGR 262 TOPS surrogate

Source-backed card for the APL Photonics 2025 AWGR-based multidimensional photonic AI accelerator. The local workload is a 16x16 dense tile surrogate for the reported 16x16 AWGR tensor engine, not an exact Matrix-by-Tensor-Multiply reproduction.

## Provenance

| Field | Value |
| --- | --- |
| Source | A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser |
| URL | https://pubs.aip.org/aip/app/article/10/11/110805/3372196/A-262-TOPS-hyperdimensional-photonic-AI |
| DOI | 10.1063/5.0271374 |
| Venue | APL Photonics 10, 110805 (2025) |
| Claim status | paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | 16x16 AWGR Matrix-by-Tensor-Multiply photonic AI accelerator |
| Reported throughput | 262.000 TOPS |
| Energy efficiency, including lasers | 3.663 TOPS/W |
| Energy per equivalent op, including lasers | 0.273 pJ |
| Energy per MAC, including lasers | 0.546 pJ |
| Workload energy, including lasers | 2236.416 pJ |
| Component-model / published including-lasers ratio | 0.108 x |
| Reported energy per op fj | 273 |
| Data rate gbaud | 32 |
| Awgr dimension | 16x16 |
| Ddos kappa score | 0.8652 |
| Mnist accuracy percent | 92.14 |
| Energy efficiency note | 3.663 TOPS/W is the direct conversion of the paper's 273 fJ/OP statement. |
| Surrogate mapping | m=16, k=16, n=16 is a dense tile surrogate for the 16x16 AWGR engine; not an exact MbTM schedule. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, energy_per_op, data_rate, accuracy |
| Local surrogate type | dense_awgr_tile_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Good throughput, energy, and task-metric coverage; local dense tile is still a surrogate for the reported AWGR MbTM schedule.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | 16x16 AWGR Matrix-by-Tensor-Multiply photonic AI accelerator | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported throughput | 262.0 | published_calibration.reported_tops | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Energy efficiency including lasers | 3.663003663003663 | published_calibration.energy_efficiency_including_lasers_tops_per_watt | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported energy per op fj | 273 | published_calibration.additional_metrics.reported_energy_per_op_fj | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Data rate gbaud | 32 | published_calibration.additional_metrics.data_rate_gbaud | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Awgr dimension | 16x16 | published_calibration.additional_metrics.awgr_dimension | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Ddos kappa score | 0.8652 | published_calibration.additional_metrics.ddos_kappa_score | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mnist accuracy percent | 92.14 | published_calibration.additional_metrics.mnist_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Energy efficiency note | 3.663 TOPS/W is the direct conversion of the paper's 273 fJ/OP statement. | published_calibration.additional_metrics.energy_efficiency_note | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=16, k=16, n=16 is a dense tile surrogate for the 16x16 AWGR engine; not an exact MbTM schedule. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |
| energy_per_op_including_lasers_pj | 1 / energy_efficiency_including_lasers_tops_per_watt | energy_efficiency_including_lasers_tops_per_watt=3.663003663003663 | 0.273 |  |
| energy_per_mac_including_lasers_pj | 2 / energy_efficiency_including_lasers_tops_per_watt | energy_efficiency_including_lasers_tops_per_watt=3.663003663003663 | 0.546 |  |
| total_energy_including_lasers_pj | equivalent_ops / energy_efficiency_including_lasers_tops_per_watt | energy_efficiency_including_lasers_tops_per_watt=3.663003663003663, equivalent_ops=8192 | 2236.416 |  |
| model_to_published_including_lasers_ratio | local_model.energy.total_pj / published_reference.derived_unit_conversions.total_energy_including_lasers_pj | published_total_energy_including_lasers_pj=2236.416 | 0.10782967033 | Diagnostic ratio only; it does not change local_model or published_reference. |

Local assumptions:

- Local surrogate type: dense_awgr_tile_surrogate.
- Good throughput, energy, and task-metric coverage; local dense tile is still a surrogate for the reported AWGR MbTM schedule.
- Source reports 262 TOPS at 32 Gbaud and a 273 fJ/OP silicon-photonic energy-efficiency analysis; PhotonicBench keeps those values in published_reference.
- The local model uses a one-cycle 32 Gbaud timing surrogate and generic converter energy assumptions.
- Weight-stationary mode approximates reusing the reported AWGR weight/tensor structure for one dense local tile.

Confidence flags:

- claim_status=paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model
- source_doi=10.1063/5.0271374
- source_quality_grade=B
- coverage.accuracy=reported
- coverage.area=not_reported
- coverage.energy=reported
- coverage.precision=not_reported
- coverage.throughput=reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



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
| Pipeline cycle time | 0.031 ns |

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
| SRAM | 512 bytes | 256 bytes | 15.360 pJ | 33.33% | 0.20% | 0.19% | 0.750 ns | 0.750 ns | 24 | 1024.000 bytes/ns | 24576.000 bytes/ns | 24 | -23552.000 bytes/ns |
| Intermediate/cache | 512 bytes | 256 bytes | 153.600 pJ | 33.33% | 1.96% | 1.90% | 3.000 ns | 3.000 ns | 96 | 256.000 bytes/ns | 24576.000 bytes/ns | 96 | -24320.000 bytes/ns |
| Off-chip/DRAM | 512 bytes | 256 bytes | 7680.000 pJ | 33.33% | 97.85% | 94.93% | 48.000 ns | 48.000 ns | 1536 | 16.000 bytes/ns | 24576.000 bytes/ns | 1536 | -24560.000 bytes/ns |

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
| Max tier nominal pressure ratio | 1536 |
| Max tier contention pressure ratio | 1536 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.93% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 1536 |
| Min tier contention bandwidth headroom ratio | 0.000651042 |
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
| Transfer-to-compute time ratio | 1536 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 48.000 ns |
| Bandwidth pressure ratio | 1536 |
| Bandwidth-limited equivalent ops/s | 170666666666.667 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 48.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 1536 |
| Contention pressure ratio | 1536 |
| Contention-adjusted equivalent ops/s | 170666666666.667 |

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
| Optical latency | 0.031 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 0.031 ns |
| Pipeline cycle time | 0.031 ns |
| Batch latency | 0.031 ns |
| Steady-state operations/s | 32000000000.000 |
| Steady-state equivalent ops/s | 262144000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000003 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Source reports 262 TOPS at 32 Gbaud and a 273 fJ/OP silicon-photonic energy-efficiency analysis; PhotonicBench keeps those values in published_reference.
- The local model uses a one-cycle 32 Gbaud timing surrogate and generic converter energy assumptions.
- Weight-stationary mode approximates reusing the reported AWGR weight/tensor structure for one dense local tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
