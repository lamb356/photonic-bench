# PhotonicBench Benchmark Card: GPT-style decoder layer - MLP down-projection

Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 1024 x 3072 times 3072 x 768; operation multiplicity is 1. The right operand is a learned model-weight matrix.





## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1024 x 3072 times 3072 x 768 |
| Operations per batch | 1 |
| MACs per operation | 2415919104 |
| MACs | 2415919104 |
| Equivalent ops per operation | 4831838208 |
| Equivalent ops | 4831838208 |
| Output elements per operation | 786432 |
| Output elements | 786432 |
| Vector DAC conversions | 3145728 |
| Weight DAC conversions | 2359296 |
| DAC conversions | 5505024 |
| ADC conversions | 786432 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | True |
| Pipeline stages | 4 |
| Pipeline cycle time | 2.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 3145728 bytes |
| Weight operand reads | 2359296 bytes |
| Output writes | 786432 bytes |
| Total interface traffic | 6291456 bytes |
| MACs per interface byte | 384 |
| Equivalent ops per interface byte | 768 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Transfer time | Contention-adjusted transfer | Effective bandwidth |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 5505024 bytes | 786432 bytes | 125829.120 pJ | 6144.000 ns | 6144.000 ns | 1024.000 bytes/ns |
| Intermediate/cache | 5505024 bytes | 786432 bytes | 1258291.200 pJ | 24576.000 ns | 24576.000 ns | 256.000 bytes/ns |
| Off-chip/DRAM | 5505024 bytes | 786432 bytes | 62914560.000 pJ | 393216.000 ns | 393216.000 ns | 16.000 bytes/ns |

| Metric | Value |
| --- | ---: |
| System profile | default |
| Profile tier overrides | none |
| Memory timing mode | overlapped |
| Shared bandwidth clients | 1 |
| Arbitration efficiency | 1 |
| Calibration/control overhead | 0 |
| Local compute/conversion energy | 6672089.088 pJ |
| Total movement energy | 64298680.320 pJ |
| Total system energy | 70970769.408 pJ |
| System energy per MAC | 0.029 pJ |
| System energy per equivalent op | 0.015 pJ |
| Movement energy share | 90.60% |
| Total hierarchy traffic | 18874368 bytes |
| Hierarchy equivalent ops per byte | 256 |
| Movement energy per hierarchy byte | 3.407 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Max transfer time | 393216.000 ns |
| Serialized transfer time | 423936.000 ns |
| Effective transfer time | 393216.000 ns |
| Contention bandwidth derate | 1 |
| Contention-adjusted effective transfer | 393216.000 ns |
| Calibration-adjusted effective transfer | 393216.000 ns |
| Calibration guardband time | 0.000 ns |
| Contention transfer overhead | 0.00% |
| Total transfer overhead | 0.00% |
| Effective loaded hierarchy bandwidth | 48.000 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 48.000 bytes/ns |
| Transfer-to-compute time ratio | 78643.2 |
| Bandwidth-limited tier | off_chip |
| Bandwidth-limited batch latency | 393216.000 ns |
| Bandwidth pressure ratio | 78643.2 |
| Bandwidth-limited equivalent ops/s | 12287999999999.998 |
| Contention-limited tier | off_chip |
| Contention-adjusted batch latency | 393216.000 ns |
| Contention-adjusted transfer-to-compute time ratio | 78643.2 |
| Contention pressure ratio | 78643.2 |
| Contention-adjusted equivalent ops/s | 12287999999999.998 |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 1207959.552 pJ |
| Laser electrical energy | 4831838.208 pJ |
| Detector energy | 7864.320 pJ |
| ADC energy | 393216.000 pJ |
| Vector DAC energy | 377487.360 pJ |
| Weight DAC energy | 1061683.200 pJ |
| DAC energy | 1439170.560 pJ |
| Total energy | 6672089.088 pJ |
| Energy per MAC | 0.003 pJ |
| Energy per equivalent op | 0.001 pJ |
| Peripheral share | 27.58% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 3.000 ns |
| ADC latency | 1.000 ns |
| DAC latency | 1.000 ns |
| Total latency | 5.000 ns |
| Pipeline cycle time | 2.000 ns |
| Batch latency | 5.000 ns |
| Steady-state operations/s | 500000000.000 |
| Steady-state equivalent ops/s | 2415919104000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 37.88 dB |
| ADC quantization RMS | 0.004582 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000300 rad |
| Estimated relative error RMS | 2.0518% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Dense full-context decoder self-attention is used for layer-level accounting.
- The decoder label does not apply causal triangular halving or KV-cache incremental decoding.
- GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.
- Transformer operation: MLP down-projection.
- Transformer formula: B * S * intermediate * H.
- Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.
- Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.
- Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.
- Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted once per batch because weight_stationary is true.
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
