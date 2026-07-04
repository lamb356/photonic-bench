# PhotonicBench Model Notes

## Purpose

The model is an assumption ledger. It is designed to make photonic AI energy claims auditable while keeping device assumptions, paper-reported references, calibration fits, and local model outputs separate.

## Energy Accounting

PhotonicBench separates delivered optical compute from electrical system energy:

```text
optical_compute_pj = macs * optical_mac_energy_fj / 1000
laser_electrical_pj = optical_compute_pj / laser_wall_plug_efficiency
detector_pj = output_elements * photodetector_energy_fj_per_sample / 1000
adc_pj = adc_conversions * adc_energy_pj_per_conversion
vector_dac_pj = vector_dac_conversions * vector_dac_energy_pj_per_conversion
weight_dac_pj = weight_dac_conversions * weight_dac_energy_pj_per_conversion
dac_pj = vector_dac_pj + weight_dac_pj
total_pj = laser_electrical_pj + detector_pj + adc_pj + dac_pj
```

The report shows optical compute energy separately because it is useful scientifically, but it is not double-counted in total electrical energy.

## Conversion Counts

For a matmul operation with shape `m x k` times `k x n`:

```text
operation_macs = m * n * k
operation_equivalent_ops = 2 * operation_macs
operations_per_batch = execution.batch_size
macs = operation_macs * operations_per_batch
equivalent_ops = operation_equivalent_ops * operations_per_batch
adc_conversions = m * n * operations_per_batch
```

Vector and weight DAC conversions are counted separately:

```text
vector_dac_conversions = m * k * ceil(batch_size / vector_reuse_factor)
```

If `weight_stationary: false`:

```text
weight_dac_conversions = k * n * ceil(batch_size / weight_reuse_factor)
```

If `weight_stationary: true`, PhotonicBench treats the weight operand as loaded once for the batch:

```text
weight_dac_conversions = k * n
```

The legacy `device.dac` block is still accepted. If `device.vector_dac` or `device.weight_dac` are omitted, they inherit the shared `device.dac` values. If both separate DAC sections are present, `device.dac` may be omitted.

## Interface Memory Traffic

PhotonicBench now estimates converter-interface traffic from the same reuse
counts used for DAC accounting:

```text
vector_operand_read_bytes =
    vector_dac_conversions * ceil(vector_dac_bits / 8)
weight_operand_read_bytes =
    weight_dac_conversions * ceil(weight_dac_bits / 8)
output_write_bytes =
    output_elements * ceil(adc_bits / 8)
total_interface_bytes =
    vector_operand_read_bytes + weight_operand_read_bytes + output_write_bytes
macs_per_byte = macs / total_interface_bytes
equivalent_ops_per_byte = equivalent_ops / total_interface_bytes
```

This is an interface traffic model, not a full memory hierarchy simulation. It
captures the effect of batch size, vector reuse, weight reuse, weight-stationary
execution, and converter precision on operand reads and output writes, but it
does not model caches, SRAM banks, DRAM, interposer links, NoCs, instruction
traffic, or nonlinear/non-matmul tensor traffic.

## Noise Estimate

```text
quantization_snr_db = 6.02 * adc_bits + 1.76
quantization_rms = 1 / (sqrt(12) * (2 ** adc_bits - 1))
drift_rms_rad = drift_rad_per_second * integration_time_ns * 1e-9
estimated_relative_error_rms = sqrt(
    quantization_rms ** 2
    + phase_noise_rad_rms ** 2
    + drift_rms_rad ** 2
)
```

The relative-error estimate is a first-order comparability metric. It is not yet a calibrated accuracy predictor.

## Timing

The single-operation latency model is a transparent sum:

```text
single_operation_latency_ns = dac_latency_ns + optical_latency_ns + adc_latency_ns
```

Batch and steady-state timing are represented by a simple pipeline fill/drain model:

```text
pipeline_cycle_time_ns = execution.pipeline.cycle_time_ns or single_operation_latency_ns
batch_latency_ns = single_operation_latency_ns + (batch_size - 1) * pipeline_cycle_time_ns
steady_state_operations_per_second = 1e9 / pipeline_cycle_time_ns
steady_state_equivalent_ops_per_second =
    steady_state_operations_per_second * operation_equivalent_ops
```

This is a scheduling abstraction, not a transistor- or photonic-routing simulation. Reports label single-operation latency, batch latency, and steady-state throughput separately.

## Execution Model

Configs can include an optional execution section:

```yaml
execution:
  batch_size: 16
  vector_reuse_factor: 1
  weight_reuse_factor: 1
  weight_stationary: true
  pipeline:
    stages: 4
    cycle_time_ns: 2
```

The default is equivalent to the original one-operation model:

```yaml
execution:
  batch_size: 1
  vector_reuse_factor: 1
  weight_reuse_factor: 1
  weight_stationary: false
  pipeline:
    stages: 1
    cycle_time_ns: null
```

Separate vector and weight DACs are optional:

```yaml
device:
  vector_dac:
    bits: 6
    energy_pj_per_conversion: 0.12
  weight_dac:
    bits: 8
    energy_pj_per_conversion: 0.45
```

When separate DACs are used, reports expose vector DAC conversions, weight DAC conversions, vector DAC energy, weight DAC energy, and total DAC energy.

## Transformer Layer Shape Helpers

Transformer-layer helper configs use a `transformer_layer` section instead of a
single `workload` section. The helper expands one layer shape into five ordinary
matmul benchmark cards, so the existing energy, timing, noise, Markdown, JSON,
and comparison paths remain the source of truth.

Required shape fields:

```yaml
transformer_layer:
  layer_type: encoder
  attention_mode: dense
  batch_size: 1
  sequence_length: 128
  hidden_size: 768
  num_heads: 12
  head_dim: 64
  mlp_intermediate_size: 3072
```

`layer_type` may be `encoder` or `decoder`. `attention_mode` currently supports
only `dense`. If `head_dim` is omitted, the loader infers it as
`hidden_size / num_heads` when that division is exact. The loader rejects shapes
where `head_dim * num_heads != hidden_size`.

The generated dense matmul cards use these mappings:

```text
QKV projection:
  workload = S x H times H x 3H
  generated execution.batch_size = B
  MACs = 3 * B * S * H * H

Attention scores:
  workload = S x head_dim times head_dim x S
  generated execution.batch_size = B * heads
  MACs = B * heads * S * S * head_dim

Attention-value:
  workload = S x S times S x head_dim
  generated execution.batch_size = B * heads
  MACs = B * heads * S * S * head_dim

MLP up-projection:
  workload = S x H times H x intermediate
  generated execution.batch_size = B
  MACs = B * S * H * intermediate

MLP down-projection:
  workload = S x intermediate times intermediate x H
  generated execution.batch_size = B
  MACs = B * S * intermediate * H
```

Equivalent ops remain `2 * MACs` for every generated card. The aggregate layer
comparison card sums the generated JSON reports and checks that those JSON MAC
counts match the helper formulas.

The transformer-layer command also writes aggregate JSON as
`<prefix>_layer_summary.json` using schema version
`photonic-bench-transformer-layer-report-v1`. This artifact is generated from
the same decomposed per-matmul JSON cards as the Markdown comparison. It sums
additive quantities such as MACs, equivalent ops, output elements, conversion
counts, and energy components; then it recomputes energy per MAC, energy per
equivalent op, and peripheral share from the summed quantities.

Aggregate timing fields are labeled serial summaries. In particular,
`serial_batch_latency_ns` is the sum of per-matmul batch latencies, and
`serial_effective_equivalent_ops_per_second` divides total layer equivalent ops
by that serial latency. Transformer aggregate JSON also sums converter-interface
traffic from the decomposed cards and recomputes MACs/byte and equivalent
ops/byte from the layer totals. These fields are useful for reproducible
layer-level accounting, but they are not a claim about a fused hardware
scheduler, parallel transformer pipeline, or complete memory hierarchy.

Noise is not treated as additive in the aggregate JSON. Per-matmul noise values
remain in the breakdown, and layer-level noise fields are diagnostic extrema
only.

Aggregate validation matches decomposed JSON cards by their embedded
`Transformer operation: ...` assumption and then orders the output by the
canonical helper operation list. It rejects missing or duplicate operation
cards, unknown operation labels, wrong per-card schema versions, non-matmul
cards, inconsistent MAC/equivalent-op totals, missing nested fields, and stale
`model_inputs` that no longer match the transformer-layer config. This keeps the
aggregate artifact tied to the decomposed cards while preventing accidental
mixing of cards generated from different device, execution, timing, or noise
assumptions.

Learned-weight operations keep the configured `weight_stationary`,
`weight_reuse_factor`, and `vector_reuse_factor` assumptions. Attention-score
and attention-value operations treat the right operand as activation data, so
their generated cards force `weight_stationary: false`,
`weight_reuse_factor: 1`, and `vector_reuse_factor: 1`.

The transformer helper does not count softmax, layer norm, bias adds, nonlinear
activations, dropout, masking, KV-cache incremental decoding, causal triangular
halving, or non-matmul tensor traffic. Decoder labels are recorded as
assumptions; they do not silently change dense attention MAC counts.

Transformer-layer configs may include `provenance`, but they currently reject
`published_calibration`. That prevents a layer-level paper target from being
silently copied or dropped across decomposed per-matmul local-model cards.

## Provenance And Published Calibration

The optional `provenance` section records where a benchmark card's external target claims came from:

```yaml
provenance:
  source_title: ...
  source_url: ...
  doi: ...
  venue: ...
  claim_status: paper-reported calibration targets
```

The optional `published_calibration` section stores paper-reported metrics separately from the component model:

```yaml
published_calibration:
  architecture: PACE 64x64 matrix-vector oMAC
  reported_tops: 8.19
  energy_efficiency_excluding_lasers_tops_per_watt: 4.21
  energy_efficiency_including_lasers_tops_per_watt: 2.38
  reported_latency_ns: 5
  reported_future_latency_ns: 3
  reported_enob: 7.61
```

Published fields other than `architecture` are optional. Source-specific paper numbers can be stored under `additional_metrics`:

```yaml
published_calibration:
  architecture: Kerr microcomb optical vector convolution accelerator
  reported_tops: 11
  additional_metrics:
    image_pixels: 250000
    kernels: 10
    input_resolution_bits: 8
    digit_recognition_accuracy_percent: 88
```

PhotonicBench only derives energy units when the corresponding TOPS/W fields are present. Throughput-only published cards remain valid, but their `derived_unit_conversions` section is empty.

PhotonicBench derives comparable energy units directly from the paper-reported TOPS/W:

```text
energy_per_op_pj = 1 / tops_per_watt
energy_per_mac_pj = 2 / tops_per_watt
total_workload_energy_pj = equivalent_ops / tops_per_watt
```

For the Nature PACE 64x64 matrix-vector workload, `m=1`, `k=64`, and `n=64`, so the benchmark has `4096` MACs and `8192` equivalent ops. With the reported `2.38 TOPS/W` including lasers, this yields `0.420 pJ/op`, `0.840 pJ/MAC`, and `3442.017 pJ` for one modeled 64-output matrix-vector pass.

## Calibration Fitting Mode

Calibration fitting is an explicit CLI mode, not a default behavior. A fit request has two inputs:

- `--fit-target`: which paper-derived total-energy target to match.
- `--fit-parameter`: which scalar component-model parameter to change.

The current supported targets are:

```text
published-including-lasers
published-excluding-lasers
```

Both targets are derived from the optional `published_calibration` section by converting reported TOPS/W into total workload energy:

```text
target_total_energy_pj = equivalent_ops / reported_tops_per_watt
```

The current supported fitted parameters are:

```text
device.optical_mac_energy_fj
device.laser_wall_plug_efficiency
device.photodetector_energy_fj_per_sample
device.adc.energy_pj_per_conversion
device.dac.energy_pj_per_conversion
device.vector_dac.energy_pj_per_conversion
device.weight_dac.energy_pj_per_conversion
```

For linear energy parameters, PhotonicBench solves:

```text
target_total_energy_pj = fixed_energy_pj + coefficient * fitted_value
```

For `device.laser_wall_plug_efficiency`, PhotonicBench solves:

```text
target_total_energy_pj = fixed_non_laser_energy_pj + optical_compute_pj / fitted_efficiency
```

The fit output records:

- target name and source field
- target total energy in pJ
- fitted parameter path and unit
- original parameter value
- fitted parameter value
- pre-fit local total energy
- post-fit local total energy
- absolute and relative fit error
- fit assumptions

The fit is intentionally labeled as a calibration aid. It changes one scalar local-model parameter to match one published target while holding all other assumptions fixed. It does not turn the component model into an independent reproduction of the source paper.
