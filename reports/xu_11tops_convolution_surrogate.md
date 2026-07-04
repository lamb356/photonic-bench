# PhotonicBench Benchmark Card: Xu 2021 11 TOPS convolution accelerator surrogate

Source-backed benchmark card for Xu et al. Nature 2021. The published reference is an optical vector convolution accelerator; this config uses PhotonicBench's matmul path as a dense vector-by-kernel surrogate only, not as an exact convolution dataflow reproduction.

## Provenance

| Field | Value |
| --- | --- |
| Source | 11 TOPS photonic convolutional accelerator for optical neural networks |
| URL | https://www.nature.com/articles/s41586-020-03063-0 |
| DOI | 10.1038/s41586-020-03063-0 |
| Venue | Nature 589, 44-51 (2021) |
| Claim status | paper-reported throughput/workload targets; matmul-surrogate local model |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Kerr microcomb optical vector convolution accelerator |
| Reported throughput | 11.000 TOPS |
| Reported speed note | Nature title reports 11 TOPS; abstract states more than ten TOPS. |
| Image pixels | 250000 |
| Kernels | 10 |
| Input resolution bits | 8 |
| Digit recognition accuracy percent | 88 |
| Surrogate mapping | m=1, k=250000, n=10 represents one dense vector-by-kernel surrogate; not an exact convolution dataflow reproduction. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | throughput, workload_shape, precision, accuracy |
| Local surrogate type | dense_vector_by_kernel_matmul_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | not_reported |
| Accuracy | reported |
| Area | not_reported |
| Precision | reported |

Source-quality notes:

- Strong source-backed throughput and task metric coverage, but the local workload is a dense matmul surrogate for vector convolution.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Architecture | Kerr microcomb optical vector convolution accelerator | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported throughput | 11.0 | published_calibration.reported_tops | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Reported speed note | Nature title reports 11 TOPS; abstract states more than ten TOPS. | published_calibration.additional_metrics.reported_speed_note | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Image pixels | 250000 | published_calibration.additional_metrics.image_pixels | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Kernels | 10 | published_calibration.additional_metrics.kernels | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Input resolution bits | 8 | published_calibration.additional_metrics.input_resolution_bits | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Digit recognition accuracy percent | 88 | published_calibration.additional_metrics.digit_recognition_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=1, k=250000, n=10 represents one dense vector-by-kernel surrogate; not an exact convolution dataflow reproduction. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local surrogate type: dense_vector_by_kernel_matmul_surrogate.
- Strong source-backed throughput and task metric coverage, but the local workload is a dense matmul surrogate for vector convolution.

Confidence flags:

- claim_status=paper-reported throughput/workload targets; matmul-surrogate local model
- source_doi=10.1038/s41586-020-03063-0
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
| Shape | 1 x 250000 times 250000 x 10 |
| Operations per batch | 1 |
| MACs per operation | 2500000 |
| MACs | 2500000 |
| Equivalent ops per operation | 5000000 |
| Equivalent ops | 5000000 |
| Output elements per operation | 10 |
| Output elements | 10 |
| Vector DAC conversions | 250000 |
| Weight DAC conversions | 2500000 |
| DAC conversions | 2750000 |
| ADC conversions | 10 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 1 |
| Pipeline cycle time | 5.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 250000 bytes |
| Weight operand reads | 2500000 bytes |
| Output writes | 10 bytes |
| Total interface traffic | 2750010 bytes |
| MACs per interface byte | 0.909088 |
| Equivalent ops per interface byte | 1.81818 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 2750000 bytes | 10 bytes | 55000.200 pJ | 33.33% | 0.20% | 0.19% | 2685.557 ns | 2685.557 ns | 537.111 | 1024.000 bytes/ns | 550002.000 bytes/ns | 537.111 | -548978.000 bytes/ns |
| Intermediate/cache | 2750000 bytes | 10 bytes | 550002.000 pJ | 33.33% | 1.96% | 1.92% | 10742.227 ns | 10742.227 ns | 2148.45 | 256.000 bytes/ns | 550002.000 bytes/ns | 2148.45 | -549746.000 bytes/ns |
| Off-chip/DRAM | 2750000 bytes | 10 bytes | 27500100.000 pJ | 33.33% | 97.85% | 95.95% | 171875.625 ns | 171875.625 ns | 34375.1 | 16.000 bytes/ns | 550002.000 bytes/ns | 34375.1 | -549986.000 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 555005.100 pJ | 1.94% |
| SRAM movement | 55000.200 pJ | 0.19% |
| Intermediate/cache movement | 550002.000 pJ | 1.92% |
| Off-chip/DRAM movement | 27500100.000 pJ | 95.95% |
| Total movement | 28105102.200 pJ | 98.06% |

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
| Local compute/conversion energy | 555005.100 pJ |
| Total movement energy | 28105102.200 pJ |
| Total system energy | 28660107.300 pJ |
| System energy per MAC | 11.464 pJ |
| System energy per equivalent op | 5.732 pJ |
| Local compute/conversion energy share | 1.94% |
| Movement energy share | 98.06% |
| Movement-to-compute energy ratio | 50.6394 |
| Total hierarchy traffic | 8250030 bytes |
| Hierarchy equivalent ops per byte | 0.606058 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 34375.1 |
| Max tier contention pressure ratio | 34375.1 |
| Max tier movement-energy share | 97.85% |
| Max tier system energy share | 95.95% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 34375.1 |
| Min tier contention bandwidth headroom ratio | 2.90908e-05 |
| Max transfer time | 171875.625 ns |
| Serialized transfer time | 185303.408 ns |
| Effective transfer time | 171875.625 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 171875.625 ns |
| Calibration-adjusted effective transfer | 171875.625 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Effective usable bandwidth under load | 48.000 bytes/ns |
| Guardbanded usable bandwidth under load | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 34375.1 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 171875.625 ns |
| Bandwidth pressure ratio | 34375.1 |
| Bandwidth-limited equivalent ops/s | 29090803306.170 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 171875.625 ns |
| Contention-adjusted transfer-to-compute time ratio | 34375.1 |
| Contention pressure ratio | 34375.1 |
| Contention-adjusted equivalent ops/s | 29090803306.170 |

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
| Optical compute delivered | 1250.000 pJ |
| Laser electrical energy | 5000.000 pJ |
| Detector energy | 0.100 pJ |
| ADC energy | 5.000 pJ |
| Vector DAC energy | 50000.000 pJ |
| Weight DAC energy | 500000.000 pJ |
| DAC energy | 550000.000 pJ |
| Total energy | 555005.100 pJ |
| Energy per MAC | 0.222 pJ |
| Energy per equivalent op | 0.111 pJ |
| Peripheral share | 99.10% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 5.000 ns |
| Batch latency | 5.000 ns |
| Steady-state operations/s | 200000000.000 |
| Steady-state equivalent ops/s | 1000000000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000300 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
