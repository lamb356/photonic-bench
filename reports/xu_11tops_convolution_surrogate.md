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
