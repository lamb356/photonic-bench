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


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Digital-analog hybrid optical processor using cascaded microring modulators | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Hop energy per sample pj | 3.88 | published_calibration.additional_metrics.hop_energy_per_sample_pj | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Analog scheme energy per sample pj | 34.88 | published_calibration.additional_metrics.analog_scheme_energy_per_sample_pj | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Packaged cascaded mrms | 20 | published_calibration.additional_metrics.packaged_cascaded_mrms | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Hdip data rate gbps per mrm | 7.5 | published_calibration.additional_metrics.hdip_data_rate_gbps_per_mrm | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Hwdr data rate mbps per input | 400 | published_calibration.additional_metrics.hwdr_data_rate_mbps_per_input | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Yolo data rate mbps per input | 300 | published_calibration.additional_metrics.yolo_data_rate_mbps_per_input | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Hdip input word bits | 16 | published_calibration.additional_metrics.hdip_input_word_bits | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Task kernel shape | 3x3 | published_calibration.additional_metrics.task_kernel_shape | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=1, k=9, n=1 encodes one 3x3 convolution-kernel MVM; it does not reproduce the HOP digital equalization or DSP chain. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: single_kernel_hop_mvm_surrogate.
- HOP sample-energy and data-rate values are preserved as paper metadata and are not converted into local pJ/op calibration targets.
- The local card uses a single 3x3-kernel MVM surrogate for the HOP convolution demonstrations.
- The paper's digital-analog encoding, DSP/equalization, and task-level postprocessing remain outside the local component model.
- Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.

Confidence flags:

- claim_status=paper-reported HOP architecture, sample energy, and data-rate metrics; matmul-surrogate local model
- source_doi=10.1038/s41467-025-62586-0
- source_quality_grade=B
- coverage.accuracy=not_applicable
- coverage.area=derived
- coverage.energy=reported
- coverage.precision=reported
- coverage.throughput=reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



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

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 18 bytes | 1 bytes | 0.380 pJ | 33.33% | 0.20% | 0.19% | 0.019 ns | 0.019 ns | 0.0185547 | 1024.000 bytes/ns | 19.000 bytes/ns | 0.0185547 | 1005.000 bytes/ns |
| Intermediate/cache | 18 bytes | 1 bytes | 3.800 pJ | 33.33% | 1.96% | 1.92% | 0.074 ns | 0.074 ns | 0.0742188 | 256.000 bytes/ns | 19.000 bytes/ns | 0.0742188 | 237.000 bytes/ns |
| Off-chip/DRAM | 18 bytes | 1 bytes | 190.000 pJ | 33.33% | 97.85% | 95.81% | 1.188 ns | 1.188 ns | 1.1875 | 16.000 bytes/ns | 19.000 bytes/ns | 1.1875 | -3.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 4.128 pJ | 2.08% |
| SRAM movement | 0.380 pJ | 0.19% |
| Intermediate/cache movement | 3.800 pJ | 1.92% |
| Off-chip/DRAM movement | 190.000 pJ | 95.81% |
| Total movement | 194.180 pJ | 97.92% |

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
| Local compute/conversion energy | 4.128 pJ |
| Total movement energy | 194.180 pJ |
| Total system energy | 198.308 pJ |
| System energy per MAC | 22.034 pJ |
| System energy per equivalent op | 11.017 pJ |
| Local compute/conversion energy share | 2.08% |
| Movement energy share | 97.92% |
| Movement-to-compute energy ratio | 47.0397 |
| Total hierarchy traffic | 57 bytes |
| Hierarchy equivalent ops per byte | 0.315789 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 1.1875 |
| Max tier contention pressure ratio | 1.1875 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 95.81% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 1.1875 |
| Min tier contention bandwidth headroom ratio | 0.842105 |
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
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
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
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
