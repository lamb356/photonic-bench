# PhotonicBench JSON Report Schemas

Schema version: `photonic-bench-report-v1`

Machine-readable schema: `docs/photonic-bench-report-v1.schema.json`

Aggregate transformer-layer schema version:
`photonic-bench-transformer-layer-report-v1`

Machine-readable aggregate schema:
`docs/photonic-bench-transformer-layer-report-v1.schema.json`

Transformer-model aggregate schema version:
`photonic-bench-transformer-model-report-v1`

Machine-readable transformer-model aggregate schema:
`docs/photonic-bench-transformer-model-report-v1.schema.json`

## Versioning

`schema_version` is required and currently must be `photonic-bench-report-v1`.

Patch-level additions may add optional fields under existing objects. A future breaking change must use a new schema version string.

Transformer-layer aggregate JSON uses its own schema version because it
summarizes a whole layer rather than one matmul card. Its current
`schema_version` is `photonic-bench-transformer-layer-report-v1`.

Transformer-model aggregate JSON uses a third schema version because it
summarizes one or more counted transformer-layer specs. Its current
`schema_version` is `photonic-bench-transformer-model-report-v1`.

## Per-Card Top-Level Fields

| Field | Required | Type | Meaning |
| --- | --- | --- | --- |
| `schema_version` | yes | string | Report schema identifier. |
| `benchmark` | yes | object | Name and description from the YAML config. |
| `workload` | yes | object | Matmul dimensions and total workload size. |
| `model_inputs` | yes | object | Device, execution, system-tier, timing, and noise assumptions used by the local model. |
| `local_model` | yes | object | PhotonicBench-computed conversion counts, interface memory traffic, system movement estimates, energy, timing, and noise. |
| `published_reference` | yes | object or null | Paper-reported values and direct unit conversions, when present. |
| `calibration_fit` | yes | object or null | Optional one-parameter calibration fit result. |
| `assumptions` | yes | string array | Human-readable assumptions that apply to this card. |
| `provenance` | yes | object or null | Source citation metadata, when present. |

Transformer-layer helper per-matmul outputs use this same per-card JSON schema.

## Published Source Quality

Published cards may include `published_reference.source_quality`. This optional
object is an audit index for source confidence; it does not change local model
math and does not convert a surrogate into a paper measurement. The object
records source DOI/reference, metric types reported by the paper, local
surrogate type, coverage for throughput/energy/accuracy/area/precision, a
conservative `A` through `D` confidence grade, and grading notes.

## Per-Card System Model Fields

Per-card reports include `model_inputs.system` with the selected profile,
profile override list, memory timing mode, and explicit `sram`,
`intermediate`, and `off_chip` tier assumptions:

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

Supported profile names are `default`, `on_chip_sram`, `hbm`, `ddr`, and
`pcie_attached`. Profile names are local modeling presets, not measured hardware
claims. A config can select a profile and override selected tier fields; those
overridden tier names or timing-mode names appear in
`model_inputs.system.profile_overrides` and
`local_model.system.profile_overrides`.

`model_inputs.system.contention` records local shared-link assumptions:
`shared_bandwidth_clients` divides nominal tier bandwidth by the number of
active clients, `arbitration_efficiency` multiplies the remaining bandwidth by
an arbitration efficiency in `(0, 1]`, and
`calibration_overhead_fraction` applies a final guardband to adjusted transfer
time. These values are local modeling assumptions and are not paper-reported
hardware metrics unless a future measured-system schema says so explicitly.

`local_model.system.tiers.sram`, `local_model.system.tiers.intermediate`, and
`local_model.system.tiers.off_chip` report the tier read bytes, write bytes,
movement energy, nominal bandwidth, effective bandwidth under contention,
nominal transfer time, contention-adjusted transfer time, compute-window
required bandwidth, contention bandwidth utilization, bandwidth headroom in
bytes/ns, and bandwidth headroom ratio.
`local_model.system.total_movement_energy_pj` is added to
`local_model.system.local_compute_and_conversion_energy_pj` to produce
`local_model.system.total_system_energy_pj`. The legacy
`local_model.energy.total_pj` remains the local photonic compute/conversion
estimate and is not overwritten by movement energy.
`local_model.system.hierarchy_equivalent_ops_per_byte` divides equivalent ops
by cumulative SRAM/intermediate/off-chip traffic, while
`local_model.system.movement_energy_per_hierarchy_byte_pj` divides local
movement energy by that same hierarchy traffic. These are local hierarchy
diagnostics, not measured cache or NoC counters.
Each `local_model.system.tiers.*` entry also reports `traffic_share`,
`movement_energy_share`, `calibration_adjusted_transfer_time_ns`,
`nominal_transfer_share`, `contention_adjusted_transfer_share`,
`nominal_transfer_pressure_ratio`, and
`contention_adjusted_transfer_pressure_ratio`. The top-level system block
summarizes those tier fields with `dominant_traffic_tier`,
`dominant_movement_energy_tier`, `nominal_memory_bottleneck_tier`,
`contention_memory_bottleneck_tier`,
`max_tier_nominal_transfer_pressure_ratio`,
`max_tier_contention_adjusted_transfer_pressure_ratio`, and
`max_tier_movement_energy_share`. It also reports
`contention_bandwidth_saturation_tier`,
`max_tier_contention_bandwidth_utilization`, and
`min_tier_contention_bandwidth_headroom_ratio` as local compute-window
bandwidth diagnostics.

Bandwidth-limited fields are local estimates. For per-card reports,
`local_model.system.effective_transfer_time_ns` is either the slowest tier
transfer time (`overlapped`) or the sum of tier transfer times (`serialized`).
`local_model.system.bandwidth_limited_batch_latency_ns` is the maximum of the
existing batch latency and that effective transfer time, and
`local_model.system.bandwidth_limited_equivalent_ops_per_second` divides the
card's equivalent ops by that bandwidth-limited latency.
`local_model.system.transfer_to_compute_time_ratio` preserves the raw effective
transfer-time divided by compute-only batch latency, even when the existing
batch latency remains the limiting path.

Contention-adjusted timing uses the same overlapped/serialized timing mode after
reducing each tier's effective bandwidth by the local contention assumptions.
`local_model.system.calibration_adjusted_effective_transfer_time_ns` then
applies the calibration/control overhead guardband.
`local_model.system.contention_adjusted_transfer_to_compute_time_ratio` divides
that guardbanded transfer time by compute-only batch latency.
`local_model.system.contention_adjusted_batch_latency_ns` is the maximum of the
card's batch latency and that guardbanded transfer time, and
`local_model.system.contention_adjusted_equivalent_ops_per_second` divides
equivalent ops by the adjusted latency.

## Aggregate Transformer-Layer JSON

The `transformer-layer` command writes one aggregate JSON artifact beside the
aggregate Markdown comparison:

```powershell
python -m photonic_bench.cli transformer-layer examples/bert_base_encoder_layer.yaml --output-dir reports/bert_base_encoder_layer --prefix bert_base_layer
```

The aggregate JSON path is:

```text
reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json
```

Schema version: `photonic-bench-transformer-layer-report-v1`

| Field | Required | Type | Meaning |
| --- | --- | --- | --- |
| `schema_version` | yes | string | Aggregate layer schema identifier. |
| `artifact_type` | yes | string | Currently `transformer_layer_aggregate`. |
| `benchmark` | yes | object | Layer-level benchmark name and description. |
| `transformer_layer` | yes | object | Layer type, attention mode, and shape fields. |
| `workload` | yes | object | Layer-level matmul count, MACs, equivalent ops, and summed generated output elements. |
| `aggregate_semantics` | yes | object | Text labels explaining source cards, energy aggregation, memory traffic aggregation, system aggregation, timing aggregation, and noise handling. |
| `local_model` | yes | object | Summed conversion counts, summed interface traffic, summed system movement estimates, summed energy, serial timing summary, and non-additive noise diagnostics. |
| `published_reference` | yes | null | Always null for current transformer-layer configs, which reject `published_calibration`. |
| `calibration_fit` | yes | null | Always null for current aggregate layer reports. |
| `formula_audit` | yes | object | Expected helper totals, JSON totals, match booleans, and per-operation formula rows. |
| `matmuls` | yes | array | Per-matmul breakdown copied from the generated per-card JSON reports, with local JSON artifact names. |
| `assumptions` | yes | string array | Layer-level and aggregate-report assumptions. |
| `exclusions` | yes | string array | Known excluded transformer costs. |
| `provenance` | yes | object or null | Layer-level provenance metadata, when present. |

Aggregate layer reports are generated by loading the decomposed JSON cards,
summing additive quantities, and checking `workload.macs` and
`workload.equivalent_ops` against the transformer helper formulas. Version 1
of the transformer-layer aggregate schema expects exactly the five dense
matmul cards generated by the helper: QKV projection, attention scores,
attention-value, MLP up-projection, and MLP down-projection.

Layer shape JSON includes `attention_context_length` and `kv_cache_enabled`.
For default dense attention, `attention_context_length == sequence_length` and
`kv_cache_enabled` is false. Decoder KV-cache model examples set
`attention_context_length` to the configured cache context plus query length,
so attention score/value formulas use
`B * heads * S_query * S_context * head_dim`.

Validation is intentionally stricter than a loose JSON merge. PhotonicBench
matches decomposed cards by the `Transformer operation: ...` assumption embedded
in each per-card JSON report, then emits aggregate rows in canonical helper
order. It rejects missing operations, duplicate operations, unknown operations,
wrong schema versions, non-matmul cards, stale `model_inputs`, missing nested
fields, bool values in integer fields, and non-finite numeric values. Error
messages include the card path and JSON field path where practical.

Energy component fields under `local_model.energy` are summed directly.
`energy_per_mac_pj`, `energy_per_op_pj`, and `peripheral_share` are recomputed
from the summed layer quantities.

Interface memory traffic fields under `local_model.memory_traffic` are summed
from decomposed cards where additive, and `macs_per_byte` plus
`equivalent_ops_per_byte` are recomputed from aggregate layer totals. These
fields describe converter-interface traffic, not full cache, SRAM, DRAM, NoC,
or non-matmul tensor traffic.

System movement fields under `local_model.system` are summed from decomposed
cards where additive. Transformer-layer aggregate JSON sums per-matmul SRAM and
off-chip movement energy, recomputes system energy per MAC/op from aggregate
workload totals, and reports
`bandwidth_limited_serial_batch_latency_ns` as the sum of decomposed
bandwidth-limited batch latencies. It also reports
`contention_adjusted_serial_batch_latency_ns` and
`contention_adjusted_serial_effective_equivalent_ops_per_second` as serial sums
of the decomposed local contention-adjusted card timing. Aggregate tier
bandwidth utilization and headroom compare each tier's summed bytes per serial
batch-latency window against the minimum positive effective bandwidth inherited
from the contributing cards. This is a serial accounting artifact, not a fused
memory scheduler or complete memory hierarchy.

Timing fields are explicitly serial summaries. `serial_batch_latency_ns` sums
the per-matmul `batch_latency_ns` values. The effective layer throughputs divide
the aggregate MAC or equivalent-op totals by that serial latency. These fields
do not claim a fused hardware scheduler or parallel layer pipeline.

Noise is not additive. Aggregate noise fields are labeled diagnostics over the
per-matmul cards; the detailed per-card noise values remain under
`matmuls[].local_model.noise`.

## Aggregate Transformer-Model JSON

The `transformer-model` command writes representative transformer-layer
artifacts for each configured layer spec, then writes a full-model summary:

```powershell
python -m photonic_bench.cli transformer-model examples/bert_base_12layer_model.yaml --output-dir reports/bert_base_12layer_model --prefix bert_base_12layer
```

The aggregate model JSON path is:

```text
reports/bert_base_12layer_model/bert_base_12layer_model_summary.json
```

Schema version: `photonic-bench-transformer-model-report-v1`

| Field | Required | Type | Meaning |
| --- | --- | --- | --- |
| `schema_version` | yes | string | Aggregate model schema identifier. |
| `artifact_type` | yes | string | Currently `transformer_model_aggregate`. |
| `benchmark` | yes | object | Model-level benchmark name and description. |
| `workload` | yes | object | Unique layer spec count, total layer instances, MACs, equivalent ops, and output elements. |
| `aggregate_semantics` | yes | object | Text labels explaining layer-count, energy, memory, activation-memory, system, timing, and noise aggregation. |
| `local_model` | yes | object | Count-weighted conversion counts, interface traffic, activation tensor traffic, system movement estimates, energy, serial timing, and non-additive noise diagnostics. |
| `model_components` | yes | object | Explicit local assumptions for embeddings, output projection, activation memory, KV-cache traffic, and pipeline overlap. |
| `layers` | yes | array | Representative layer summary references, counts, weighted totals, local layer summaries, and decomposed matmul report names. |
| `published_reference` | yes | null | Always null for current transformer-model configs, which reject `published_calibration`. |
| `calibration_fit` | yes | null | Always null for current aggregate model reports. |
| `assumptions` | yes | string array | Model-level and aggregate-report assumptions. |
| `exclusions` | yes | string array | Union of known excluded transformer costs from layer summaries. |
| `provenance` | yes | object or null | Model-level provenance metadata, when present. |

Transformer-model aggregation is deliberately count based. Each
`transformer_model.layers[]` entry is generated once as a normal
transformer-layer aggregate. The model summary multiplies additive layer fields
by that entry's `count`, sums the results, and recomputes per-MAC/per-op and
throughput metrics from model totals. The model summary preserves auditability
through `layers[].json_report` and `layers[].matmul_reports`.
In short, model totals are built from representative transformer-layer summaries and configured layer counts.

Transformer-model summaries can include explicit model-level realism
assumptions. Embeddings are modeled as tensor reads, not optical matmuls.
Output projection reuses the normal matmul evaluator and is added to model MAC,
energy, interface-traffic, system, and timing totals. Activation tensor traffic
and KV-cache read/write bytes are reported separately under
`local_model.activation_memory_traffic` and are also included in the model-level
system movement estimate.

This is not a fused full-model scheduler. Serial timing fields assume weighted
layer summaries and explicit output projection execute one after another.
Optional pipeline-overlap fields preserve the serial baseline and add
`overlap_adjusted_*` latency/throughput fields as local assumptions. They do
not claim a measured layer pipeline or hidden scheduler.

## Transformer-Layer Config Validation

Transformer-layer YAML configs must provide a `transformer_layer` mapping with
positive integer shape fields:

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

`head_dim` may be omitted only when `hidden_size` is exactly divisible by
`num_heads`; otherwise the loader reports the invalid field relationship.
Currently supported values are `layer_type: encoder|decoder` and
`attention_mode: dense`. Transformer-layer configs reject
`published_calibration` so layer-level paper targets are not silently mixed with
local-model decomposed cards.

## Transformer-Model Config Validation

Transformer-model YAML configs use a `transformer_model.layers` array. Each
entry has the same dense layer shape fields as `transformer_layer`, plus an
optional unique `name` and a positive integer `count`:

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

Names default to `layer_1`, `layer_2`, and so on when omitted, but explicit
names must be unique. `head_dim` inference and validation match
`transformer-layer`. Transformer-model configs reject `published_calibration`
for the same reason as transformer-layer configs: model totals are local
estimates, not paper targets.

`kv_cache.enabled` requires at least one decoder layer. In decoder incremental
mode, each decoder layer's attention context length becomes
`kv_cache.context_length + sequence_length`; cache read/write bytes remain
visible in `model_components.kv_cache` and
`local_model.activation_memory_traffic`.

```yaml
transformer_model:
  layers:
    - name: decoder_block
      count: 12
      layer_type: decoder
      attention_mode: dense
      batch_size: 1
      sequence_length: 1
      hidden_size: 768
      num_heads: 12
      head_dim: 64
      mlp_intermediate_size: 3072
  kv_cache:
    enabled: true
    mode: decoder_incremental
    context_length: 1024
```

## Units

| JSON path | Unit |
| --- | --- |
| `model_inputs.device.optical_mac_energy_fj` | fJ/MAC |
| `model_inputs.device.photodetector_energy_fj_per_sample` | fJ/sample |
| `model_inputs.device.*dac.energy_pj_per_conversion` | pJ/conversion |
| `model_inputs.system.profile` | profile name |
| `model_inputs.system.profile_overrides[]` | overridden tier names |
| `model_inputs.system.contention.shared_bandwidth_clients` | count |
| `model_inputs.system.contention.arbitration_efficiency` | unitless fraction |
| `model_inputs.system.contention.calibration_overhead_fraction` | unitless fraction |
| `model_inputs.system.*.read_energy_pj_per_byte` | pJ/byte |
| `model_inputs.system.*.write_energy_pj_per_byte` | pJ/byte |
| `model_inputs.system.*.bandwidth_bytes_per_ns` | bytes/ns |
| `model_inputs.system.*.read_fraction` | unitless fraction |
| `model_inputs.system.*.write_fraction` | unitless fraction |
| `model_inputs.timing.*_latency_ns` | ns |
| `model_inputs.noise.phase_noise_rad_rms` | radians RMS |
| `model_inputs.noise.drift_rad_per_second` | radians/second |
| `local_model.energy.*_pj` | pJ |
| `local_model.energy.energy_per_mac_pj` | pJ/MAC |
| `local_model.energy.energy_per_op_pj` | pJ/equivalent op |
| `local_model.memory_traffic.*_bytes` | bytes |
| `local_model.activation_memory_traffic.*_bytes` | bytes |
| `local_model.memory_traffic.macs_per_byte` | MACs/byte |
| `local_model.memory_traffic.equivalent_ops_per_byte` | equivalent ops/byte |
| `local_model.system.profile` | profile name |
| `local_model.system.profile_overrides[]` | overridden tier names |
| `local_model.system.tiers.*.*_bytes` | bytes |
| `local_model.system.tiers.*.*_energy_pj` | pJ |
| `local_model.system.tiers.*.bandwidth_bytes_per_ns` | bytes/ns |
| `local_model.system.tiers.*.effective_bandwidth_bytes_per_ns` | bytes/ns |
| `local_model.system.tiers.*.transfer_time_ns` | ns |
| `local_model.system.tiers.*.contention_adjusted_transfer_time_ns` | ns |
| `local_model.system.tiers.*.compute_window_required_bandwidth_bytes_per_ns` | bytes/ns |
| `local_model.system.tiers.*.contention_bandwidth_utilization` | required bandwidth / effective bandwidth |
| `local_model.system.tiers.*.contention_bandwidth_headroom_bytes_per_ns` | bytes/ns |
| `local_model.system.tiers.*.contention_bandwidth_headroom_ratio` | effective bandwidth / required bandwidth |
| `local_model.system.total_movement_energy_pj` | pJ |
| `local_model.system.total_system_energy_pj` | pJ |
| `local_model.system.system_energy_per_mac_pj` | pJ/MAC |
| `local_model.system.system_energy_per_op_pj` | pJ/equivalent op |
| `local_model.system.movement_energy_share` | unitless fraction |
| `local_model.system.hierarchy_equivalent_ops_per_byte` | equivalent ops/hierarchy byte |
| `local_model.system.movement_energy_per_hierarchy_byte_pj` | pJ/hierarchy byte |
| `local_model.system.transfer_to_compute_time_ratio` | transfer time / compute batch latency |
| `local_model.system.bandwidth_limited_batch_latency_ns` | ns |
| `local_model.system.bandwidth_limited_equivalent_ops_per_second` | equivalent ops/second |
| `local_model.system.contention_bandwidth_saturation_tier` | tier name |
| `local_model.system.max_tier_contention_bandwidth_utilization` | required bandwidth / effective bandwidth |
| `local_model.system.min_tier_contention_bandwidth_headroom_ratio` | effective bandwidth / required bandwidth |
| `local_model.system.contention_adjusted_transfer_to_compute_time_ratio` | adjusted transfer time / compute batch latency |
| `local_model.system.contention_adjusted_batch_latency_ns` | ns |
| `local_model.system.contention_adjusted_equivalent_ops_per_second` | equivalent ops/second |
| `local_model.system.bandwidth_limited_serial_batch_latency_ns` | ns |
| `local_model.system.bandwidth_limited_serial_effective_equivalent_ops_per_second` | equivalent ops/second |
| `local_model.system.contention_adjusted_serial_batch_latency_ns` | ns |
| `local_model.system.contention_adjusted_serial_effective_equivalent_ops_per_second` | equivalent ops/second |
| `local_model.timing.*_ns` | ns |
| `local_model.timing.serial_batch_latency_ns` | ns |
| `local_model.timing.serial_effective_macs_per_second` | MACs/second |
| `local_model.timing.serial_effective_equivalent_ops_per_second` | equivalent ops/second |
| `local_model.timing.steady_state_operations_per_second` | operations/second |
| `local_model.timing.steady_state_equivalent_ops_per_second` | equivalent ops/second |
| `published_reference.reported.reported_tops` | TOPS |
| `published_reference.reported.*tops_per_watt` | TOPS/W |
| `published_reference.derived_unit_conversions.*_pj` | pJ |
| `calibration_fit.target_total_energy_pj` | pJ |
| `calibration_fit.fitted_parameter.unit` | unit for the selected parameter |

## Local vs Published Data

`local_model` always contains PhotonicBench model outputs.

`published_reference` contains paper-reported values or direct unit conversions from paper-reported values. These values are not local model outputs.

For throughput-only papers, `published_reference.derived_unit_conversions` may be empty. Missing optional paper fields are omitted rather than guessed.

## Calibration Fit

`calibration_fit` is null unless the CLI run included both `--fit-target` and `--fit-parameter`.

When present, it records:

- the target name and source path
- target total energy in pJ
- selected fitted parameter path, unit, original value, and fitted value
- pre-fit and post-fit local total energy
- absolute and relative fit error
- assumptions for the fit

The fitted result is a calibration aid and does not overwrite `model_inputs`, `local_model`, or `published_reference`.

## Generate JSON

```powershell
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64.md --json-report reports/nature_pace_64x64.json
```

## Programmatic Loading

```powershell
python examples/load_report_json.py reports/nature_pace_64x64.json
python examples/load_report_json.py reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json
python examples/load_report_json.py reports/bert_base_12layer_model/bert_base_12layer_model_summary.json
```

Minimal Python pattern:

```python
import json
from pathlib import Path

card = json.loads(Path("reports/nature_pace_64x64.json").read_text())
name = card["benchmark"]["name"]
total_pj = card["local_model"]["energy"]["total_pj"]
system_pj = card["local_model"]["system"]["total_system_energy_pj"]
eq_ops_per_byte = card["local_model"]["memory_traffic"]["equivalent_ops_per_byte"]
published = card["published_reference"]
print(name, total_pj, system_pj, eq_ops_per_byte, published is not None)
```

Minimal aggregate-layer pattern:

```python
import json
from pathlib import Path

layer = json.loads(
    Path("reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json").read_text()
)
assert layer["schema_version"] == "photonic-bench-transformer-layer-report-v1"
total_macs = layer["workload"]["macs"]
total_interface_bytes = layer["local_model"]["memory_traffic"]["total_interface_bytes"]
system_pj_per_op = layer["local_model"]["system"]["system_energy_per_op_pj"]
rows = layer["formula_audit"]["rows"]
print(
    total_macs,
    total_interface_bytes,
    system_pj_per_op,
    [row["operation_key"] for row in rows],
)
```

Minimal aggregate-model pattern:

```python
import json
from pathlib import Path

model = json.loads(
    Path("reports/bert_base_12layer_model/bert_base_12layer_model_summary.json").read_text()
)
assert model["schema_version"] == "photonic-bench-transformer-model-report-v1"
layer_count = model["workload"]["layer_count"]
system_pj_per_op = model["local_model"]["system"]["system_energy_per_op_pj"]
layer_reports = [layer["json_report"] for layer in model["layers"]]
print(layer_count, system_pj_per_op, layer_reports)
```

## Visualizer External Loading

The static visualizer can load additional local JSON reports from the browser
with `Load external JSON reports`. This is a limited foundation for external
report inspection, not a hosted upload service. The browser parses each selected
file, accepts only these schema versions, and builds an in-memory artifact
summary:

- `photonic-bench-report-v1`
- `photonic-bench-transformer-layer-report-v1`
- `photonic-bench-transformer-model-report-v1`

Required summary fields such as `schema_version`, `benchmark.name`, workload
totals, local energy, timing, assumptions, and aggregate artifact markers are
validated before the external artifact enters the UI. Unsupported schemas,
malformed JSON, and missing or non-finite required numbers are rejected inline.
The import panel now keeps a per-file diagnostics list showing detected
schema/version, accepted or rejected status, missing required fields, and
unexpected top-level fields. Unexpected fields are warnings for otherwise valid
files; missing required fields and unsupported schema versions are errors.
Loaded external artifacts are labeled as `external/...`, can be selected for
detail or comparison views, and remain browser-session state only; the generated
`reports/visualizer/data/index.json` and payload files are not modified.

## Visualizer Comparison Export

Machine-readable comparison export schema:
`docs/photonic-bench-comparison-export-v1.schema.json`

The browser comparison dashboard exports a client-generated
`photonic-bench-comparison-export-v1` JSON object. It is intentionally separate
from the checked report schemas because it records an analyst's current browser
view, not a regenerated benchmark artifact. The export includes selected
artifact summaries, the pinned reference, active analysis focus, active score
profile, score weights, filter state, rail grouping, the shareable
`url_state`, visible artifact IDs, same-schema recommendation cards with
`score_explanation` drilldowns, grouped best-metric analysis, provenance status,
and modeling-boundary notes. Selected artifact summaries also carry the local
hierarchy-intensity, movement-per-hierarchy-byte, transfer/compute, and
contention-adjusted transfer/compute fields when those metrics are available.
Newer exports also carry dominant traffic/movement tiers, memory bottleneck
tier, worst tier pressure, largest tier movement share, bandwidth saturation
tier, maximum bandwidth utilization, and minimum bandwidth headroom when
present.

| Field | Meaning |
| --- | --- |
| `analysis_focus` | Active focus mode, description, metric labels, score profile, and score weights. |
| `analysis_focus.score_profile` | Built-in profile identity such as `balanced`, `efficiency`, `throughput`, `contention`, or `provenance`, or `custom` when the weights no longer match a built-in profile. |
| `filters` | Search/schema/boundary/source-quality/sort/grouping state. |
| `url_state` | Shareable browser URL that restores the comparison context. |
| `artifacts[].hierarchy_equivalent_ops_per_byte` | Local hierarchy equivalent ops per modeled hierarchy byte, or `null` for legacy/external artifacts that omit it. |
| `artifacts[].movement_energy_per_hierarchy_byte_pj` | Local movement energy per hierarchy byte, or `null`. |
| `artifacts[].dominant_traffic_tier` | Tier with the largest modeled hierarchy-byte share, or `null`. |
| `artifacts[].dominant_movement_energy_tier` | Tier with the largest modeled movement-energy share, or `null`. |
| `artifacts[].contention_memory_bottleneck_tier` | Memory tier with the largest guardbanded transfer time, or `null`. |
| `artifacts[].max_tier_contention_adjusted_transfer_pressure_ratio` | Largest guardbanded tier transfer divided by compute batch latency, or `null`. |
| `artifacts[].max_tier_movement_energy_share` | Largest single-tier movement-energy share, or `null`. |
| `artifacts[].contention_bandwidth_saturation_tier` | Tier with the highest compute-window bandwidth utilization, or `null`. |
| `artifacts[].max_tier_contention_bandwidth_utilization` | Largest required-bandwidth divided by effective-bandwidth ratio, or `null`. |
| `artifacts[].min_tier_contention_bandwidth_headroom_ratio` | Smallest effective-bandwidth divided by required-bandwidth ratio among modeled traffic tiers, or `null`. |
| `artifacts[].transfer_to_compute_time_ratio` | Local effective transfer time divided by compute batch latency, or `null`. |
| `artifacts[].contention_adjusted_transfer_to_compute_time_ratio` | Local contention-adjusted transfer time divided by compute batch latency, or `null`. |
| `recommendations[].score_explanation` | Raw metric values, normalized scores, weights, contributions, and final weighted score. |
| `grouped_metrics[].decision_scorecard` | Same-schema scorecard entries using the same score-explanation model. |

The analysis focus and recommendation scores are local UI heuristics for
triage. They preserve schema groups and must not be interpreted as measured
hardware rankings or as conversions between per-matmul cards,
transformer-layer aggregates, and transformer-model aggregates.

## Comparison Tables

Comparison tables are generated from JSON cards:

```powershell
python -m photonic_bench.cli compare reports/matmul_64x64.json reports/nature_pace_64x64.json reports/xu_11tops_convolution_surrogate.json --report reports/comparison.md
```
