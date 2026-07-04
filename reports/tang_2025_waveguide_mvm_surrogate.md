# PhotonicBench Benchmark Card: Tang 2025 waveguide-multiplexed MVM surrogate

Source-backed card for the Optica 2025 waveguide-multiplexed photonic MVM processor using multiport photodetectors. The local workload matches the demonstrated 4x4 MVM primitive as a dense bookkeeping surrogate only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Waveguide-multiplexed photonic matrix-vector multiplication processor using multiport photodetectors |
| URL | https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-6-812 |
| DOI | 10.1364/OPTICA.552023 |
| Venue | Optica 12, 812-820 (2025) |
| Claim status | paper-reported 4x4 MVM and multiport photodetector metrics; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Waveguide-multiplexed intensity MVM processor with multiport Ge photodetectors |
| Demonstrated mvm shape | 4x4 |
| Photodetector ports | 16 |
| Photodetector 3db bandwidth ghz | 11.8 |
| Photodetector bias voltage v | -3 |
| Projected scaled ports | 250 |
| Projected scaled bandwidth ghz | 6.1 |
| Iris accuracy percent | 93.3 |
| Fashion mnist sim accuracy percent | 90.53 |
| Surrogate mapping | m=1, k=4, n=4 encodes the demonstrated 4x4 MVM primitive; it does not model multiport photodetector analog summing physics. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | photodetector_bandwidth, primitive_shape, scaled_port_projection, task_accuracy |
| Local surrogate type | direct_4x4_waveguide_mvm_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Direct primitive shape and detector bandwidth are reported, but energy and exact system timing are not converted into local model outputs.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Waveguide-multiplexed intensity MVM processor with multiport Ge photodetectors | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Demonstrated mvm shape | 4x4 | published_calibration.additional_metrics.demonstrated_mvm_shape | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Photodetector ports | 16 | published_calibration.additional_metrics.photodetector_ports | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Photodetector 3db bandwidth ghz | 11.8 | published_calibration.additional_metrics.photodetector_3db_bandwidth_ghz | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Photodetector bias voltage v | -3 | published_calibration.additional_metrics.photodetector_bias_voltage_v | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Projected scaled ports | 250 | published_calibration.additional_metrics.projected_scaled_ports | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Projected scaled bandwidth ghz | 6.1 | published_calibration.additional_metrics.projected_scaled_bandwidth_ghz | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Iris accuracy percent | 93.3 | published_calibration.additional_metrics.iris_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Fashion mnist sim accuracy percent | 90.53 | published_calibration.additional_metrics.fashion_mnist_sim_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=1, k=4, n=4 encodes the demonstrated 4x4 MVM primitive; it does not model multiport photodetector analog summing physics. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: direct_4x4_waveguide_mvm_surrogate.
- Direct primitive shape and detector bandwidth are reported, but energy and exact system timing are not converted into local model outputs.
- The local card uses a dense 4x4 MVM bookkeeping surrogate for the paper's waveguide-multiplexed MVM demonstration.
- Paper-reported photodetector bandwidth, port scaling, and task accuracy remain published reference metadata.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.

Confidence flags:

- claim_status=paper-reported 4x4 MVM and multiport photodetector metrics; matmul-surrogate local model
- source_doi=10.1364/OPTICA.552023
- source_quality_grade=B
- coverage.accuracy=reported
- coverage.area=not_reported
- coverage.energy=not_reported
- coverage.precision=not_reported
- coverage.throughput=derived

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 4 times 4 x 4 |
| Operations per batch | 1 |
| MACs per operation | 16 |
| MACs | 16 |
| Equivalent ops per operation | 32 |
| Equivalent ops | 32 |
| Output elements per operation | 4 |
| Output elements | 4 |
| Vector DAC conversions | 4 |
| Weight DAC conversions | 16 |
| DAC conversions | 20 |
| ADC conversions | 4 |

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
| Vector operand reads | 4 bytes |
| Weight operand reads | 16 bytes |
| Output writes | 4 bytes |
| Total interface traffic | 24 bytes |
| MACs per interface byte | 0.666667 |
| Equivalent ops per interface byte | 1.33333 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 20 bytes | 4 bytes | 0.480 pJ | 33.33% | 0.20% | 0.19% | 0.023 ns | 0.023 ns | 0.0234375 | 1024.000 bytes/ns | 24.000 bytes/ns | 0.0234375 | 1000.000 bytes/ns |
| Intermediate/cache | 20 bytes | 4 bytes | 4.800 pJ | 33.33% | 1.96% | 1.91% | 0.094 ns | 0.094 ns | 0.09375 | 256.000 bytes/ns | 24.000 bytes/ns | 0.09375 | 232.000 bytes/ns |
| Off-chip/DRAM | 20 bytes | 4 bytes | 240.000 pJ | 33.33% | 97.85% | 95.48% | 1.500 ns | 1.500 ns | 1.5 | 16.000 bytes/ns | 24.000 bytes/ns | 1.5 | -8.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 6.072 pJ | 2.42% |
| SRAM movement | 0.480 pJ | 0.19% |
| Intermediate/cache movement | 4.800 pJ | 1.91% |
| Off-chip/DRAM movement | 240.000 pJ | 95.48% |
| Total movement | 245.280 pJ | 97.58% |

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
| Local compute/conversion energy | 6.072 pJ |
| Total movement energy | 245.280 pJ |
| Total system energy | 251.352 pJ |
| System energy per MAC | 15.710 pJ |
| System energy per equivalent op | 7.855 pJ |
| Local compute/conversion energy share | 2.42% |
| Movement energy share | 97.58% |
| Movement-to-compute energy ratio | 40.3953 |
| Total hierarchy traffic | 72 bytes |
| Hierarchy equivalent ops per byte | 0.444444 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 1.5 |
| Max tier contention pressure ratio | 1.5 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 95.48% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 1.5 |
| Min tier contention bandwidth headroom ratio | 0.666667 |
| Max transfer time | 1.500 ns |
| Serialized transfer time | 1.617 ns |
| Effective transfer time | 1.500 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 1.500 ns |
| Calibration-adjusted effective transfer | 1.500 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 1.5 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 1.500 ns |
| Bandwidth pressure ratio | 1.5 |
| Bandwidth-limited equivalent ops/s | 21333333333.333 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 1.500 ns |
| Contention-adjusted transfer-to-compute time ratio | 1.5 |
| Contention pressure ratio | 1.5 |
| Contention-adjusted equivalent ops/s | 21333333333.333 |

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
| Optical compute delivered | 0.008 pJ |
| Laser electrical energy | 0.032 pJ |
| Detector energy | 0.040 pJ |
| ADC energy | 2.000 pJ |
| Vector DAC energy | 0.800 pJ |
| Weight DAC energy | 3.200 pJ |
| DAC energy | 4.000 pJ |
| Total energy | 6.072 pJ |
| Energy per MAC | 0.380 pJ |
| Energy per equivalent op | 0.190 pJ |
| Peripheral share | 99.47% |

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
| Steady-state equivalent ops/s | 32000000000.000 |

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
- The local card uses a dense 4x4 MVM bookkeeping surrogate for the paper's waveguide-multiplexed MVM demonstration.
- Paper-reported photodetector bandwidth, port scaling, and task accuracy remain published reference metadata.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
