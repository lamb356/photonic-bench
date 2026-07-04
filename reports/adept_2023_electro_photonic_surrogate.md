# PhotonicBench Benchmark Card: ADEPT 2023 electro-photonic system surrogate

Source-backed analog/full-system card for the JETC 2023 ADEPT electro-photonic DNN accelerator. The paper combines photonic GEMM, a vectorized digital ASIC for non-GEMM work, and SRAM arrays for parameters and activations; this config uses a batch weight-stationary 128x128 local GEMM under the on_chip_sram scenario for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | An electro-photonic system for accelerating deep neural networks |
| URL | https://doi.org/10.1145/3606949 |
| DOI | 10.1145/3606949 |
| Venue | ACM Journal on Emerging Technologies in Computing Systems 19(4), Article 30 (2023) |
| Claim status | paper-reported full-system throughput-per-Watt comparisons and architecture; SRAM-backed GEMM surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | ADEPT electro-photonic accelerator with photonic GEMM, vectorized digital ASIC, and SRAM arrays |
| Throughput per watt vs systolic arrays x | 5.73 |
| Throughput per watt vs state of art electronic accelerators min x | 6.8 |
| Throughput per watt vs state of art photonic accelerators x | 2.5 |
| Photonic unit for gemm | True |
| Vectorized digital asic for non gemm | True |
| Sram arrays for parameters and activations | True |
| Full system perspective | True |
| Surrogate mapping | m=128, k=128, n=128 with batch=16 and weight_stationary=true stresses SRAM-backed GEMM reuse; it is not an ADEPT full-system simulator or non-GEMM ASIC model. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput_per_watt, full_system_architecture, memory_architecture, comparative_efficiency |
| Local surrogate type | sram_backed_weight_stationary_gemm_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | not_reported |
| Area | not_reported |
| Precision | not_reported |

Source-quality notes:

- Source reports full-system throughput-per-Watt comparisons and SRAM-backed architecture; local energy, timing, and hierarchy values remain PhotonicBench estimates.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Throughput per Watt vs traditional systolic arrays | 5.73x higher on average | Abstract, arXiv:2109.01126 / JETC 2023 |  |
| Throughput per Watt vs state-of-the-art electronic accelerators | at least 6.8x better | Abstract, arXiv:2109.01126 / JETC 2023 |  |
| Throughput per Watt vs state-of-the-art photonic accelerators | 2.5x better | Abstract, arXiv:2109.01126 / JETC 2023 |  |
| Memory architecture | SRAM arrays for storing DNN parameters and activations | Abstract, arXiv:2109.01126 / JETC 2023 |  |
| Architecture | ADEPT electro-photonic accelerator with photonic GEMM, vectorized digital ASIC, and SRAM arrays | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Throughput per watt vs systolic arrays x | 5.73 | published_calibration.additional_metrics.throughput_per_watt_vs_systolic_arrays_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Throughput per watt vs state of art electronic accelerators min x | 6.8 | published_calibration.additional_metrics.throughput_per_watt_vs_state_of_art_electronic_accelerators_min_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Throughput per watt vs state of art photonic accelerators x | 2.5 | published_calibration.additional_metrics.throughput_per_watt_vs_state_of_art_photonic_accelerators_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Photonic unit for gemm | True | published_calibration.additional_metrics.photonic_unit_for_gemm | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Vectorized digital asic for non gemm | True | published_calibration.additional_metrics.vectorized_digital_asic_for_non_gemm | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Sram arrays for parameters and activations | True | published_calibration.additional_metrics.sram_arrays_for_parameters_and_activations | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Full system perspective | True | published_calibration.additional_metrics.full_system_perspective | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=128, k=128, n=128 with batch=16 and weight_stationary=true stresses SRAM-backed GEMM reuse; it is not an ADEPT full-system simulator or non-GEMM ASIC model. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local batch weight-stationary 128x128 GEMM is chosen to stress SRAM-backed reuse and does not reproduce ADEPT's full DNN pipeline.
- The on_chip_sram scenario is a local PhotonicBench movement assumption for parameter and activation locality.
- Local surrogate type: sram_backed_weight_stationary_gemm_surrogate.
- Source reports full-system throughput-per-Watt comparisons and SRAM-backed architecture; local energy, timing, and hierarchy values remain PhotonicBench estimates.
- Published comparative throughput-per-Watt claims and architecture facts remain under published_calibration and published_reference.
- Local optical MAC energy, converter energy, one-nanosecond latency, and SRAM tier parameters are generic PhotonicBench assumptions.
- Weight-stationary mode approximates parameter reuse in an SRAM-backed GEMM slice and does not model ADEPT's vectorized non-GEMM ASIC.

Confidence flags:

- comparative_efficiency_only_no_absolute_tops_per_watt
- non_gemm_asic_not_modeled
- claim_status=paper-reported full-system throughput-per-Watt comparisons and architecture; SRAM-backed GEMM surrogate
- source_doi=10.1145/3606949
- source_quality_grade=B
- coverage.accuracy=not_reported
- coverage.area=not_reported
- coverage.energy=reported
- coverage.precision=not_reported
- coverage.throughput=reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 128 x 128 times 128 x 128 |
| Operations per batch | 16 |
| MACs per operation | 2097152 |
| MACs | 33554432 |
| Equivalent ops per operation | 4194304 |
| Equivalent ops | 67108864 |
| Output elements per operation | 16384 |
| Output elements | 262144 |
| Vector DAC conversions | 131072 |
| Weight DAC conversions | 16384 |
| DAC conversions | 147456 |
| ADC conversions | 262144 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 16 |
| Vector reuse factor | 2 |
| Weight reuse factor | 16 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 131072 bytes |
| Weight operand reads | 16384 bytes |
| Output writes | 262144 bytes |
| Total interface traffic | 409600 bytes |
| MACs per interface byte | 81.92 |
| Equivalent ops per interface byte | 163.84 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 147456 bytes | 262144 bytes | 8192.000 pJ | 100.00% | 100.00% | 3.44% | 200.000 ns | 200.000 ns | 12.5 | 2048.000 bytes/ns | 25600.000 bytes/ns | 12.5 | -23552.000 bytes/ns |
| Intermediate/cache | 0 bytes | 0 bytes | 0.000 pJ | 0.00% | 0.00% | 0.00% | 0.000 ns | 0.000 ns | 0 | 256.000 bytes/ns | 0.000 bytes/ns | 0 | 256.000 bytes/ns |
| Off-chip/DRAM | 0 bytes | 0 bytes | 0.000 pJ | 0.00% | 0.00% | 0.00% | 0.000 ns | 0.000 ns | 0 | 16.000 bytes/ns | 0.000 bytes/ns | 0 | 16.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 230293.504 pJ | 96.56% |
| SRAM movement | 8192.000 pJ | 3.44% |
| Intermediate/cache movement | 0.000 pJ | 0.00% |
| Off-chip/DRAM movement | 0.000 pJ | 0.00% |
| Total movement | 8192.000 pJ | 3.44% |

| Metric | Value |
| --- | ---: |
| System profile | on_chip_sram |
| Profile tier overrides | none |
| Memory scenario | on_chip_sram |
| Scenario description | All modeled converter-interface traffic is assumed to stay on local SRAM; off-chip fractions are zero. |
| Memory timing mode | overlapped |
| Contention preset | single_client |
| Contention preset description | Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband. |
| Contention overlap model | profile_timing_mode |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 230293.504 pJ |
| Total movement energy | 8192.000 pJ |
| Total system energy | 238485.504 pJ |
| System energy per MAC | 0.007 pJ |
| System energy per equivalent op | 0.004 pJ |
| Local compute/conversion energy share | 96.56% |
| Movement energy share | 3.44% |
| Movement-to-compute energy ratio | 0.035572 |
| Total hierarchy traffic | 409600 bytes |
| Hierarchy equivalent ops per byte | 163.84 |
| Movement energy per hierarchy byte | 0.020 pJ |
| SRAM traffic share | 100.00% |
| Intermediate/cache traffic share | 0.00% |
| Off-chip traffic share | 0.00% |
| Dominant traffic tier | sram |
| Dominant system energy component | local_compute_and_conversion |
| Dominant movement-energy tier | sram |
| Nominal memory bottleneck tier | sram |
| Contention memory bottleneck tier | sram |
| Max tier nominal pressure ratio | 12.5 |
| Max tier contention pressure ratio | 12.5 |
| Max tier movement-energy share | 100.00% |
| Max tier system energy share | 3.44% |
| Contention bandwidth saturation tier | sram |
| Max tier contention bandwidth utilization | 12.5 |
| Min tier contention bandwidth headroom ratio | 0.08 |
| Max transfer time | 200.000 ns |
| Serialized transfer time | 200.000 ns |
| Effective transfer time | 200.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 200.000 ns |
| Calibration-adjusted effective transfer | 200.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 2048.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 2048.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 2048.000 bytes/ns |
| Effective usable bandwidth under load | 2048.000 bytes/ns |
| Guardbanded usable bandwidth under load | 2048.000 bytes/ns |
| Transfer-to-compute time ratio | 12.5 |
| Bandwidth-limited tier | sram |
| Bandwidth-limited batch latency | 200.000 ns |
| Bandwidth pressure ratio | 12.5 |
| Bandwidth-limited equivalent ops/s | 335544320000000.000 |
| Contention-limited tier | sram |
| Contention-adjusted batch latency | 200.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 12.5 |
| Contention pressure ratio | 12.5 |
| Contention-adjusted equivalent ops/s | 335544320000000.000 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | All modeled converter-interface traffic stays on local SRAM. | Computing's energy problem (and what we can do about it) (10.1109/ISSCC.2014.6757323) | Off-chip and intermediate traffic fractions are local zeros.; SRAM bandwidth and energy are local parameters for sensitivity, not a specific macro datasheet. | Use this to bound cards whose system story depends on aggressive local buffering. |
| Contention preset | local-baseline | Dedicated path: one modeled client, no arbitration loss, and no calibration/control guardband. | explicit local assumption | shared_bandwidth_clients=1, arbitration_efficiency=1, and calibration_overhead_fraction=0 are local baseline assumptions. | Use as the no-contention reference point. |


## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 16777.216 pJ |
| Laser electrical energy | 67108.864 pJ |
| Detector energy | 2621.440 pJ |
| ADC energy | 131072.000 pJ |
| Vector DAC energy | 26214.400 pJ |
| Weight DAC energy | 3276.800 pJ |
| DAC energy | 29491.200 pJ |
| Total energy | 230293.504 pJ |
| Energy per MAC | 0.007 pJ |
| Energy per equivalent op | 0.003 pJ |
| Peripheral share | 70.86% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 16.000 ns |
| Steady-state operations/s | 1000000000.000 |
| Steady-state equivalent ops/s | 4194304000000000.000 |

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
- Published comparative throughput-per-Watt claims and architecture facts remain under published_calibration and published_reference.
- Local optical MAC energy, converter energy, one-nanosecond latency, and SRAM tier parameters are generic PhotonicBench assumptions.
- Weight-stationary mode approximates parameter reuse in an SRAM-backed GEMM slice and does not model ADEPT's vectorized non-GEMM ASIC.
- The benchmark models 16 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
