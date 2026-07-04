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

This interface traffic model captures the effect of batch size, vector reuse,
weight reuse, weight-stationary execution, and converter precision on operand
reads and output writes. It is also the byte source for the optional system tier
model below. It is still not a cache simulator: it does not model bank conflicts,
replacement policy, NoC routing, instruction traffic, nonlinear operations, or
non-matmul tensor traffic.

## Multi-Tier System Movement Model

PhotonicBench extends converter-interface traffic into an auditable local system
movement estimate with explicit SRAM, intermediate/cache, and off-chip tiers.
The default tiers are deliberately simple and visible:

```yaml
system:
  profile: default
  memory_timing_mode: overlapped
  sram:
    read_energy_pj_per_byte: 0.02
    write_energy_pj_per_byte: 0.02
    bandwidth_bytes_per_ns: 1024
    read_fraction: 1.0
    write_fraction: 1.0
  intermediate:
    read_energy_pj_per_byte: 0.2
    write_energy_pj_per_byte: 0.2
    bandwidth_bytes_per_ns: 256
    read_fraction: 1.0
    write_fraction: 1.0
  off_chip:
    read_energy_pj_per_byte: 10.0
    write_energy_pj_per_byte: 10.0
    bandwidth_bytes_per_ns: 16
    read_fraction: 1.0
    write_fraction: 1.0
  contention:
    shared_bandwidth_clients: 1.0
    arbitration_efficiency: 1.0
    calibration_overhead_fraction: 0.0
```

The named profiles are convenience presets for sensitivity analysis. They are
local assumptions, not measured hardware:

| Profile | SRAM pJ/byte read/write | Intermediate pJ/byte read/write | Off-chip pJ/byte read/write | Timing mode | Shared clients | Arbitration | Calibration overhead |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| `default` | 0.02 / 0.02 | 0.2 / 0.2 | 10 / 10 | `overlapped` | 1.0 | 1.0 | 0.0 |
| `on_chip_sram` | 0.02 / 0.02 | 0.2 / 0.2 with zero fractions | 10 / 10 with zero fractions | `overlapped` | 1.0 | 1.0 | 0.0 |
| `hbm` | 0.02 / 0.02 | 0.2 / 0.2 | 3 / 3 | `overlapped` | 1.0 | 1.0 | 0.0 |
| `ddr` | 0.02 / 0.02 | 0.2 / 0.2 | 10 / 10 | `overlapped` | 1.0 | 1.0 | 0.0 |
| `pcie_attached` | 0.02 / 0.02 | 0.2 / 0.2 | 50 / 50 | `serialized` | 2.0 | 0.85 | 0.05 |

Configs can select a profile and optionally override tier fields:

```yaml
system:
  profile: hbm
  memory_timing_mode: serialized
  off_chip:
    bandwidth_bytes_per_ns: 256
    read_fraction: 0.5
  contention:
    shared_bandwidth_clients: 2
    arbitration_efficiency: 0.85
    calibration_overhead_fraction: 0.05
```

When `system.profile` is omitted but explicit tier sections are present,
PhotonicBench labels the report as `manual` and preserves the supplied tier
values. Generated JSON records `profile`, `profile_overrides`, and
`memory_timing_mode` under both `model_inputs.system` and
`local_model.system`.

For each tier:

```text
operand_read_bytes = vector_operand_read_bytes + weight_operand_read_bytes
tier_read_bytes = operand_read_bytes * tier.read_fraction
tier_write_bytes = output_write_bytes * tier.write_fraction
tier_total_bytes = tier_read_bytes + tier_write_bytes
tier_read_energy_pj = tier_read_bytes * tier.read_energy_pj_per_byte
tier_write_energy_pj = tier_write_bytes * tier.write_energy_pj_per_byte
tier_total_energy_pj = tier_read_energy_pj + tier_write_energy_pj
tier_transfer_time_ns = tier_total_bytes / tier.bandwidth_bytes_per_ns
tier_effective_bandwidth_bytes_per_ns =
    tier.bandwidth_bytes_per_ns * arbitration_efficiency / shared_bandwidth_clients
tier_contention_adjusted_transfer_time_ns =
    tier_total_bytes / tier_effective_bandwidth_bytes_per_ns
tier_calibration_adjusted_transfer_time_ns =
    tier_contention_adjusted_transfer_time_ns * (1 + calibration_overhead_fraction)
tier_compute_window_required_bandwidth_bytes_per_ns =
    tier_total_bytes / batch_latency_ns
tier_contention_bandwidth_utilization =
    tier_compute_window_required_bandwidth_bytes_per_ns /
    tier_effective_bandwidth_bytes_per_ns
tier_contention_bandwidth_headroom_bytes_per_ns =
    tier_effective_bandwidth_bytes_per_ns -
    tier_compute_window_required_bandwidth_bytes_per_ns
tier_contention_bandwidth_headroom_ratio =
    tier_effective_bandwidth_bytes_per_ns /
    tier_compute_window_required_bandwidth_bytes_per_ns
```

The per-card system summary is:

```text
total_movement_energy_pj =
    sram_total_energy_pj + intermediate_total_energy_pj + off_chip_total_energy_pj
total_system_energy_pj =
    local_compute_and_conversion_energy_pj + total_movement_energy_pj
system_energy_per_mac_pj = total_system_energy_pj / macs
system_energy_per_op_pj = total_system_energy_pj / equivalent_ops
movement_energy_share = total_movement_energy_pj / total_system_energy_pj
total_hierarchy_bytes =
    sram_total_bytes + intermediate_total_bytes + off_chip_total_bytes
hierarchy_equivalent_ops_per_byte = equivalent_ops / total_hierarchy_bytes
movement_energy_per_hierarchy_byte_pj =
    total_movement_energy_pj / total_hierarchy_bytes
sram_traffic_share = sram_total_bytes / total_hierarchy_bytes
intermediate_traffic_share = intermediate_total_bytes / total_hierarchy_bytes
off_chip_traffic_share = off_chip_total_bytes / total_hierarchy_bytes
dominant_traffic_tier =
    tier with largest tier_total_bytes / total_hierarchy_bytes
dominant_movement_energy_tier =
    tier with largest tier_total_energy_pj / total_movement_energy_pj
nominal_memory_bottleneck_tier =
    tier with largest tier_transfer_time_ns
contention_memory_bottleneck_tier =
    tier with largest tier_calibration_adjusted_transfer_time_ns
max_tier_nominal_transfer_pressure_ratio =
    max(tier_transfer_time_ns / batch_latency_ns)
max_tier_contention_adjusted_transfer_pressure_ratio =
    max(tier_calibration_adjusted_transfer_time_ns / batch_latency_ns)
max_tier_movement_energy_share =
    max(tier_total_energy_pj / total_movement_energy_pj)
contention_bandwidth_saturation_tier =
    tier with largest tier_contention_bandwidth_utilization
max_tier_contention_bandwidth_utilization =
    max(tier_contention_bandwidth_utilization)
min_tier_contention_bandwidth_headroom_ratio =
    min(tier_contention_bandwidth_headroom_ratio for tiers with tier_total_bytes > 0)
max_transfer_time_ns =
    max(sram_transfer_time_ns, intermediate_transfer_time_ns, off_chip_transfer_time_ns)
serial_transfer_time_ns =
    sram_transfer_time_ns + intermediate_transfer_time_ns + off_chip_transfer_time_ns
effective_transfer_time_ns =
    max_transfer_time_ns when memory_timing_mode == "overlapped"
    serial_transfer_time_ns when memory_timing_mode == "serialized"
contention_bandwidth_derate_factor =
    arbitration_efficiency / shared_bandwidth_clients
contention_adjusted_effective_transfer_time_ns =
    max(contention_adjusted_tier_transfer_time_ns) when overlapped
    sum(contention_adjusted_tier_transfer_time_ns) when serialized
calibration_adjusted_effective_transfer_time_ns =
    contention_adjusted_effective_transfer_time_ns
    * (1 + calibration_overhead_fraction)
calibration_guardband_time_ns =
    calibration_adjusted_effective_transfer_time_ns
    - contention_adjusted_effective_transfer_time_ns
contention_transfer_overhead_fraction =
    max(contention_adjusted_effective_transfer_time_ns / effective_transfer_time_ns - 1, 0)
total_transfer_overhead_fraction =
    max(calibration_adjusted_effective_transfer_time_ns / effective_transfer_time_ns - 1, 0)
effective_loaded_bandwidth_bytes_per_ns =
    total_hierarchy_bytes / effective_transfer_time_ns
contention_adjusted_loaded_bandwidth_bytes_per_ns =
    total_hierarchy_bytes / calibration_adjusted_effective_transfer_time_ns
transfer_to_compute_time_ratio =
    effective_transfer_time_ns / batch_latency_ns
bandwidth_limited_batch_latency_ns =
    max(batch_latency_ns, effective_transfer_time_ns)
bandwidth_pressure_ratio =
    bandwidth_limited_batch_latency_ns / batch_latency_ns
bandwidth_limited_equivalent_ops_per_second =
    equivalent_ops / (bandwidth_limited_batch_latency_ns * 1e-9)
contention_adjusted_batch_latency_ns =
    max(batch_latency_ns, calibration_adjusted_effective_transfer_time_ns)
contention_adjusted_transfer_to_compute_time_ratio =
    calibration_adjusted_effective_transfer_time_ns / batch_latency_ns
contention_pressure_ratio =
    contention_adjusted_batch_latency_ns / batch_latency_ns
contention_adjusted_equivalent_ops_per_second =
    equivalent_ops / (contention_adjusted_batch_latency_ns * 1e-9)
```

These fields live under `local_model.system` in JSON and under the
`Multi-Tier System Movement` section in Markdown. They are local estimates, not
paper-published measurements. They intentionally remain separate from
`local_model.energy.total_pj`, which is the photonic compute/conversion estimate
used by older cards and calibration flows.

The hierarchy traffic, hierarchy-intensity, movement-per-byte, tier-share,
tier-pressure, transfer/compute ratio, loaded-bandwidth, compute-window
bandwidth utilization, and bandwidth-headroom fields are diagnostic summaries
over the explicit tiers already declared in the config. A zero-traffic tier
uses `0` for headroom ratio to keep JSON finite, and the top-level minimum
headroom ratio only considers tiers with modeled traffic. These fields do not
add a cache policy, memory scheduler, or packetized NoC model; they make
locality, movement cost, bottleneck tier, contention derate, calibration
guardband, and memory pressure visible for cross-card comparisons.

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
  workload = S_query x head_dim times head_dim x S_context
  generated execution.batch_size = B * heads
  MACs = B * heads * S_query * S_context * head_dim

Attention-value:
  workload = S_query x S_context times S_context x head_dim
  generated execution.batch_size = B * heads
  MACs = B * heads * S_query * S_context * head_dim

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

Aggregate system movement fields are serial summaries over decomposed cards.
`local_model.system.total_movement_energy_pj` and
`local_model.system.total_system_energy_pj` are sums of the per-matmul system
estimates. `bandwidth_limited_serial_batch_latency_ns` sums the decomposed
bandwidth-limited batch latencies and should not be read as a fused layer memory
scheduler. `contention_adjusted_serial_batch_latency_ns` and
`contention_adjusted_serial_effective_equivalent_ops_per_second` apply the same
serial aggregation to decomposed local contention-adjusted timing.
Aggregate tier bandwidth utilization uses each aggregate tier's summed bytes
divided by `serial_batch_latency_ns`, and compares that required bandwidth with
the minimum positive effective bandwidth carried by the contributing cards.

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

For normal layer helpers, `S_query = S_context = sequence_length`.
Transformer-model KV-cache mode can explicitly set decoder representative
layers to `S_query = sequence_length` and
`S_context = kv_cache.context_length + sequence_length`. The resulting layer
summary records both `attention_context_length` and `kv_cache_enabled`.

The transformer helper does not count softmax, layer norm, bias adds, nonlinear
activations, dropout, masking, causal triangular halving, or non-matmul tensor
traffic unless a full-model option below explicitly adds that tensor traffic.
Decoder labels are recorded as assumptions; they do not silently change dense
attention MAC counts.

Transformer-layer configs may include `provenance`, but they currently reject
`published_calibration`. That prevents a layer-level paper target from being
silently copied or dropped across decomposed per-matmul local-model cards.

## Full Transformer Model Helpers

Transformer-model helper configs use a `transformer_model.layers` list to build
counted full-model summaries from representative transformer-layer artifacts:

```yaml
transformer_model:
  layers:
    - name: encoder_block
      count: 12
      layer_type: encoder
      attention_mode: dense
      batch_size: 1
      sequence_length: 128
      hidden_size: 768
      num_heads: 12
      head_dim: 64
      mlp_intermediate_size: 3072
  embeddings:
    enabled: true
    vocab_size: 30522
    bits_per_element: 16
  output_projection:
    enabled: true
    vocab_size: 30522
    tied_to_token_embedding: true
  activation_memory:
    enabled: true
    bits_per_element: 16
  pipeline_overlap:
    enabled: true
    overlap_fraction: 0.25
    label: local_layer_overlap_assumption
```

The `transformer-model` command generates one normal decomposed
transformer-layer artifact tree for each layer spec, then writes model-level
Markdown and JSON summaries. Additive fields are multiplied by the layer spec's
`count` and summed:

```text
model_macs = sum(layer_count_i * layer_macs_i)
model_equivalent_ops = sum(layer_count_i * layer_equivalent_ops_i)
model_total_energy_pj = sum(layer_count_i * layer_total_energy_pj_i)
model_total_system_energy_pj =
    sum(layer_count_i * layer_total_system_energy_pj_i)
model_serial_batch_latency_ns =
    sum(layer_count_i * layer_serial_batch_latency_ns_i)
model_bandwidth_limited_serial_batch_latency_ns =
    sum(layer_count_i * layer_bandwidth_limited_serial_batch_latency_ns_i)
model_contention_adjusted_serial_batch_latency_ns =
    sum(layer_count_i * layer_contention_adjusted_serial_batch_latency_ns_i)
```

Per-MAC, per-op, movement-share, operational-intensity, and throughput fields
are recomputed from model totals. The summary preserves auditability by storing
`layers[].json_report` for each representative layer summary and
`layers[].matmul_reports` for the decomposed per-matmul cards behind that layer.

Full-model summaries remain local accounting artifacts. The serial baseline is
always preserved, while optional sections add explicitly labeled local
assumptions:

- embeddings are tensor-read bytes, not optical matmuls;
- output projection is a local matmul added to MAC, energy, interface-traffic,
  system, and timing totals;
- activation memory is reported as separate hidden-state tensor traffic;
- decoder KV-cache mode increases attention context length and reports cache
  read/write bytes;
- pipeline overlap adds overlap-adjusted timing fields without replacing the
  serial baseline.

These assumptions do not model tokenizer work, poolers, losses, operator
fusion, measured layer scheduling, or a full cache hierarchy.

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

Published cards can also include a `source_quality` section. This records the
audit status of the paper/card relationship, not a new model result:

```yaml
source_quality:
  reported_metrics:
    - throughput
    - energy
    - precision
  local_surrogate_type: direct_64x64_matrix_vector_calibration
  confidence_grade: A
  coverage:
    throughput: reported
    energy: reported
    accuracy: reported
    area: reported
    precision: reported
  notes:
    - Direct matrix-vector shape match to the local benchmark card.
```

Allowed coverage values are `reported`, `derived`, `estimated`,
`not_reported`, and `not_applicable`. Grades are conservative `A` through `D`
labels for source/card coverage. The generated report copies the DOI/reference
from `provenance` into `published_reference.source_quality` so a published card
can be audited without mixing paper-reported metrics into `local_model`.

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
