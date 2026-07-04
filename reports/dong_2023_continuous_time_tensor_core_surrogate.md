# PhotonicBench Benchmark Card: Dong 2023 continuous-time photonic tensor core surrogate

Source-backed card for the Nature Photonics 2023 higher-dimensional photonic tensor core using continuous-time data. The local workload maps the reported 3x3 ECG-kernel by 3x100 input framing into a dense matmul surrogate.

## Provenance

| Field | Value |
| --- | --- |
| Source | Higher-dimensional processing using a photonic tensor core with continuous-time data |
| URL | https://www.nature.com/articles/s41566-023-01313-x |
| DOI | 10.1038/s41566-023-01313-x |
| Venue | Nature Photonics 17, 1080-1088 (2023) |
| Claim status | paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Electro-optically controlled photonic tensor core with spatial, wavelength, and RF degrees of freedom |
| Reported parallelism | 100 |
| Rf components | 50 |
| Wdm channels | 2 |
| Reported ecg signals | 100 |
| Reported cnn accuracy percent | 93.5 |
| Surrogate mapping | m=3, k=3, n=100 follows the paper's 3x3 kernel and 3x100 ECG input framing; it is not a continuous-time RF/WDM simulation. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | parallelism, rf_components, wavelength_channels, accuracy |
| Local surrogate type | continuous_time_tensor_core_ecg_matmul_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | derived |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- The source reports a hardware photonic tensor core using spatial, wavelength, and RF degrees of freedom with parallelism of 100.
- Local dense matmul accounting does not model RF multiplexing, PCM memory programming, optical routing, or clinical ECG preprocessing.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Electro-optically controlled photonic tensor core with spatial, wavelength, and RF degrees of freedom | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported parallelism | 100 | published_calibration.additional_metrics.reported_parallelism | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Rf components | 50 | published_calibration.additional_metrics.rf_components | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Wdm channels | 2 | published_calibration.additional_metrics.wdm_channels | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Reported ecg signals | 100 | published_calibration.additional_metrics.reported_ecg_signals | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Reported cnn accuracy percent | 93.5 | published_calibration.additional_metrics.reported_cnn_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=3, k=3, n=100 follows the paper's 3x3 kernel and 3x100 ECG input framing; it is not a continuous-time RF/WDM simulation. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: continuous_time_tensor_core_ecg_matmul_surrogate.
- The source reports a hardware photonic tensor core using spatial, wavelength, and RF degrees of freedom with parallelism of 100.
- Local dense matmul accounting does not model RF multiplexing, PCM memory programming, optical routing, or clinical ECG preprocessing.
- The dense surrogate preserves the reported 3x3-kernel and 100-signal ECG demonstration scale.
- Local timing, energy, converter, and system movement values are generic PhotonicBench assumptions.
- Weight-stationary mode approximates fixed tensor-core weights for one local ECG convolution tile.

Confidence flags:

- claim_status=paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model
- source_doi=10.1038/s41566-023-01313-x
- source_quality_grade=B
- coverage.accuracy=reported
- coverage.area=not_reported
- coverage.energy=not_reported
- coverage.precision=reported
- coverage.throughput=derived

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 3 x 3 times 3 x 100 |
| Operations per batch | 1 |
| MACs per operation | 900 |
| MACs | 900 |
| Equivalent ops per operation | 1800 |
| Equivalent ops | 1800 |
| Output elements per operation | 300 |
| Output elements | 300 |
| Vector DAC conversions | 9 |
| Weight DAC conversions | 300 |
| DAC conversions | 309 |
| ADC conversions | 300 |

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
| Weight operand reads | 300 bytes |
| Output writes | 300 bytes |
| Total interface traffic | 609 bytes |
| MACs per interface byte | 1.47783 |
| Equivalent ops per interface byte | 2.95567 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 309 bytes | 300 bytes | 12.180 pJ | 33.33% | 0.20% | 0.19% | 0.595 ns | 0.595 ns | 0.594727 | 1024.000 bytes/ns | 609.000 bytes/ns | 0.594727 | 415.000 bytes/ns |
| Intermediate/cache | 309 bytes | 300 bytes | 121.800 pJ | 33.33% | 1.96% | 1.89% | 2.379 ns | 2.379 ns | 2.37891 | 256.000 bytes/ns | 609.000 bytes/ns | 2.37891 | -353.000 bytes/ns |
| Off-chip/DRAM | 309 bytes | 300 bytes | 6090.000 pJ | 33.33% | 97.85% | 94.56% | 38.062 ns | 38.062 ns | 38.0625 | 16.000 bytes/ns | 609.000 bytes/ns | 38.0625 | -593.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 216.600 pJ | 3.36% |
| SRAM movement | 12.180 pJ | 0.19% |
| Intermediate/cache movement | 121.800 pJ | 1.89% |
| Off-chip/DRAM movement | 6090.000 pJ | 94.56% |
| Total movement | 6223.980 pJ | 96.64% |

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
| Local compute/conversion energy | 216.600 pJ |
| Total movement energy | 6223.980 pJ |
| Total system energy | 6440.580 pJ |
| System energy per MAC | 7.156 pJ |
| System energy per equivalent op | 3.578 pJ |
| Local compute/conversion energy share | 3.36% |
| Movement energy share | 96.64% |
| Movement-to-compute energy ratio | 28.7349 |
| Total hierarchy traffic | 1827 bytes |
| Hierarchy equivalent ops per byte | 0.985222 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 38.0625 |
| Max tier contention pressure ratio | 38.0625 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 94.56% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 38.0625 |
| Min tier contention bandwidth headroom ratio | 0.0262726 |
| Max transfer time | 38.062 ns |
| Serialized transfer time | 41.036 ns |
| Effective transfer time | 38.062 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 38.062 ns |
| Calibration-adjusted effective transfer | 38.062 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 38.0625 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 38.062 ns |
| Bandwidth pressure ratio | 38.0625 |
| Bandwidth-limited equivalent ops/s | 47290640394.089 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 38.062 ns |
| Contention-adjusted transfer-to-compute time ratio | 38.0625 |
| Contention pressure ratio | 38.0625 |
| Contention-adjusted equivalent ops/s | 47290640394.089 |

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
| Optical compute delivered | 0.450 pJ |
| Laser electrical energy | 1.800 pJ |
| Detector energy | 3.000 pJ |
| ADC energy | 150.000 pJ |
| Vector DAC energy | 1.800 pJ |
| Weight DAC energy | 60.000 pJ |
| DAC energy | 61.800 pJ |
| Total energy | 216.600 pJ |
| Energy per MAC | 0.241 pJ |
| Energy per equivalent op | 0.120 pJ |
| Peripheral share | 99.17% |

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
| Steady-state equivalent ops/s | 1800000000000.000 |

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
- The dense surrogate preserves the reported 3x3-kernel and 100-signal ECG demonstration scale.
- Local timing, energy, converter, and system movement values are generic PhotonicBench assumptions.
- Weight-stationary mode approximates fixed tensor-core weights for one local ECG convolution tile.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
