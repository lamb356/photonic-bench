# PhotonicBench

PhotonicBench generates transparent benchmark cards for photonic AI energy and noise claims.

The current CLI reads YAML configs for photonic matmul benchmark cards and transformer-layer shape helpers, computes auditable local model budgets, and writes Markdown plus optional JSON reports that expose assumptions, provenance, calibration fits, and comparison tables.

## Quick Start

```powershell
python -m pytest
python -m photonic_bench.cli run examples/matmul_64x64.yaml --report reports/matmul_64x64.md
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64.md
python -m photonic_bench.cli run examples/xu_11tops_convolution_surrogate.yaml --report reports/xu_11tops_convolution_surrogate.md --json-report reports/xu_11tops_convolution_surrogate.json
python -m photonic_bench.cli run examples/weight_stationary_64x64_batch.yaml --report reports/weight_stationary_64x64_batch.md --json-report reports/weight_stationary_64x64_batch.json
python -m photonic_bench.cli transformer-layer examples/transformer_small_sanity.yaml --output-dir reports/transformer_small_sanity --prefix small_transformer
python -m photonic_bench.cli transformer-layer examples/bert_base_encoder_layer.yaml --output-dir reports/bert_base_encoder_layer --prefix bert_base_layer
python -m photonic_bench.cli transformer-layer examples/gpt_style_decoder_layer.yaml --output-dir reports/gpt_style_decoder_layer --prefix gpt_decoder_layer
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64.md --json-report reports/nature_pace_64x64.json
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64_calibrated.md --json-report reports/nature_pace_64x64_calibrated.json --fit-target published-including-lasers --fit-parameter device.dac.energy_pj_per_conversion
python -m photonic_bench.cli compare reports/matmul_64x64.json reports/nature_pace_64x64.json reports/nature_pace_64x64_calibrated.json reports/xu_11tops_convolution_surrogate.json reports/weight_stationary_64x64_batch.json --report reports/comparison.md
python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html
```

After the commands run, open `reports/matmul_64x64.md` and `reports/nature_pace_64x64.md`.
Use `--json-report <path>` when you also want a machine-readable card beside the Markdown report.

## What The Model Counts

For a matmul with shape `m x k` times `k x n`, PhotonicBench computes:

- `MACs per operation = m * n * k`
- `Equivalent ops per operation = 2 * MACs per operation`
- `Operations per batch = execution.batch_size`
- `ADC conversions = m * n * batch_size`
- `Vector DAC conversions = m * k * ceil(batch_size / vector_reuse_factor)`
- `Weight DAC conversions = k * n * ceil(batch_size / weight_reuse_factor)`, or one weight load per batch when `weight_stationary: true`
- `DAC conversions = vector_dac_conversions + weight_dac_conversions`
- `Optical compute pJ = MACs * optical_mac_energy_fj / 1000`
- `Laser electrical pJ = optical_compute_pJ / laser_wall_plug_efficiency`
- `Detector pJ = output_elements * photodetector_energy_fj_per_sample / 1000`
- `Total pJ = laser_electrical_pJ + detector_pJ + ADC_pJ + DAC_pJ`

Configs may provide a legacy shared `device.dac`, separate `device.vector_dac` and `device.weight_dac`, or both. If separate DACs are present, vector and weight DAC energy are reported separately and summed into total DAC energy.

The first noise estimate combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms. This is deliberately conservative and auditable, not a replacement for device-level simulation.

Timing now reports both single-operation latency and batch/pipeline behavior. With a pipeline cycle time, batch latency is:

```text
batch_latency_ns = single_operation_latency_ns + (batch_size - 1) * pipeline_cycle_time_ns
```

Steady-state throughput uses one operation per configured pipeline cycle.

## Transformer Layer Helpers

Use the `transformer-layer` command when you want decomposed benchmark cards for
the major dense matmuls in a transformer layer:

```powershell
python -m photonic_bench.cli transformer-layer examples/bert_base_encoder_layer.yaml --output-dir reports/bert_base_encoder_layer --prefix bert_base_layer
```

The command writes one Markdown card and one JSON card for each generated
matmul:

- `<prefix>_qkv_projection.md/json`
- `<prefix>_attention_scores.md/json`
- `<prefix>_attention_value.md/json`
- `<prefix>_mlp_up_projection.md/json`
- `<prefix>_mlp_down_projection.md/json`

It also writes two aggregate layer artifacts loaded from the generated JSON
reports:

- `<prefix>_layer_comparison.md`: human-readable comparison card.
- `<prefix>_layer_summary.json`: machine-readable layer summary.

Both aggregate artifacts include a formula audit and verify that the summed JSON
MAC counts match the helper formulas. Aggregate validation matches decomposed
cards by their `Transformer operation: ...` assumption, so callers do not have
to supply cards in filename order. Missing, duplicate, wrong-schema,
wrong-operation, stale-model-input, or malformed cards are rejected with an
error that names the offending file and JSON field where practical.

Transformer-layer YAML uses a `transformer_layer` section beside the existing
device, timing, noise, execution, provenance, and assumptions sections:

```yaml
benchmark:
  name: BERT-base style encoder layer
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

If `head_dim` is omitted, it is inferred as `hidden_size / num_heads` when the
division is exact. PhotonicBench validates that `head_dim * num_heads` equals
`hidden_size`. Shape fields such as `batch_size`, `sequence_length`,
`hidden_size`, `num_heads`, `head_dim`, and `mlp_intermediate_size` must be
positive integers. The supported `layer_type` values are `encoder` and
`decoder`; `attention_mode` currently supports only `dense`.

The dense transformer MAC formulas are:

```text
QKV projection MACs       = 3 * B * S * H * H
Attention scores MACs    = B * heads * S * S * head_dim
Attention-value MACs     = B * heads * S * S * head_dim
MLP up-projection MACs   = B * S * H * intermediate
MLP down-projection MACs = B * S * intermediate * H
Layer equivalent ops     = 2 * summed MACs
```

For generated cards, learned-weight matmuls use the configured weight reuse and
weight-stationary settings. Attention-score and attention-value cards treat the
right operand as activation data, so cross-batch weight-stationary reuse is
disabled for those cards.

The helper intentionally excludes softmax, layer norm, bias adds, activation
functions, dropout, masking, KV-cache incremental decoding, causal triangular
shortcuts, and non-matmul memory traffic. A `decoder` layer label is preserved
in assumptions but does not halve dense attention MAC counts.

Transformer-layer configs may include provenance, but `published_calibration` is
not accepted for this helper yet; decomposed per-matmul cards remain local-model
cards unless a future layer-level published-reference model is added explicitly.

### Common Transformer-Layer Validation Failures

CLI errors are intended to point at the file and field that need attention:

- `... does not exist`: the config or JSON path passed to the command is wrong.
- `contains invalid YAML at line ..., column ...`: the YAML parser could not
  read the config.
- `transformer_layer.hidden_size must be divisible by
  transformer_layer.num_heads when head_dim is omitted`: add a valid `head_dim`
  or fix the shape.
- `transformer_layer.head_dim * transformer_layer.num_heads must equal
  transformer_layer.hidden_size`: the explicit head dimension does not match
  the hidden size.
- `duplicate transformer operation ...` or `missing transformer JSON card(s)
  ...`: the aggregate was built from an incomplete or duplicated decomposed-card
  set.
- `<card>.json: model_inputs... expected ...`: a stale decomposed card was
  generated from different device, execution, timing, or noise settings.

## Published Calibration Cards

Configs may include optional `provenance` and `published_calibration` sections. These let a benchmark card carry paper-reported targets beside the local component model without pretending they came from the local formulas.

The Nature PACE example uses the paper-reported 64x64 matrix-vector accelerator values:

- 64x64 matrix-vector oMAC architecture
- More than 16,000 photonic components
- Approximately 8.19 TOPS
- 4.21 TOPS/W excluding lasers
- 2.38 TOPS/W including lasers
- 7.61 ENOB average bit accuracy
- 5 ns demonstrated cycle latency

PhotonicBench converts TOPS/W to pJ/op with:

```text
energy_per_op_pj = 1 / tops_per_watt
energy_per_mac_pj = 2 / tops_per_watt
workload_energy_pj = equivalent_ops / tops_per_watt
```

The Xu 2021 example uses the Nature paper "11 TOPS photonic convolutional accelerator for optical neural networks" as a second published source:

- DOI: `10.1038/s41586-020-03063-0`
- Nature 589, 44-51 (2021)
- Reported 11 TOPS title / more-than-10 TOPS abstract claim
- 250,000-pixel image convolution workload
- 8-bit resolution
- 10 kernels
- 88% handwritten-digit recognition accuracy

Because that source is a vector convolution accelerator, PhotonicBench labels the local workload as a dense matmul surrogate (`m=1`, `k=250000`, `n=10`). The card carries the paper numbers as published references, not as local model results.

## Current Boundary

This repo now carries multiple source-backed cards, but it still does not claim independent device-level reproduction of the source papers. Published calibration/reference tables are paper-derived; component-model tables remain transparent local assumption sets.

## Machine-Readable JSON

The `run` command can write Markdown and JSON in the same invocation:

```powershell
python -m photonic_bench.cli run examples/matmul_64x64.yaml --report reports/matmul_64x64.md --json-report reports/matmul_64x64.json
```

The JSON card includes:

- `schema_version`
- benchmark metadata and workload dimensions
- model input assumptions
- local component-model energy, timing, noise, and conversion-count outputs
- optional published reference data and provenance
- a `calibration_fit` field reserved for fitted calibration results

Published reference values remain under `published_reference`; local estimates remain under `local_model`.

Transformer-layer aggregate JSON uses the separate schema version
`photonic-bench-transformer-layer-report-v1` and is written by default as
`<prefix>_layer_summary.json` when running `transformer-layer`. It includes
layer shape metadata, summed MAC/equivalent-op totals, summed conversion and
energy totals, a serial timing summary, non-additive noise diagnostics, a
per-matmul breakdown, formula-audit rows, assumptions, exclusions, and
provenance. Per-matmul artifact references are local filenames so downstream
tools do not need private machine paths.

Schema documentation:

- Human-readable guide: `docs/json_schema.md`
- Machine-readable JSON Schema: `docs/photonic-bench-report-v1.schema.json`
- Machine-readable transformer layer schema: `docs/photonic-bench-transformer-layer-report-v1.schema.json`
- Programmatic loading example: `examples/load_report_json.py`

```powershell
python examples/load_report_json.py reports/nature_pace_64x64.json
```

## Web Visualizer

Generate the local static visualizer from checked-in JSON reports:

```powershell
python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html
```

Then open `reports/visualizer/index.html` in a browser. The generated page is
static and can be opened directly from disk without a backend server. The CLI
writes a small visualizer bundle beside the HTML:

- `reports/visualizer/index.html`: shell page.
- `reports/visualizer/assets/styles.css`: visualizer styling.
- `reports/visualizer/assets/app.js`: browser UI logic.
- `reports/visualizer/data/index.json`: lightweight artifact index for tools.
- `reports/visualizer/data/index.js`: disk-safe browser bootstrap for the same
  index.
- `reports/visualizer/data/payloads/*.payload.json`: one full JSON payload per
  discovered artifact.
- `reports/visualizer/data/payloads/*.payload.js`: disk-safe lazy-load wrappers
  for those payloads.

The visualizer discovers `.json` files recursively under `reports/`, branches on
`schema_version`, and loads both supported contracts:

- `photonic-bench-report-v1`: per-matmul benchmark cards.
- `photonic-bench-transformer-layer-report-v1`: transformer-layer aggregate
  summaries.

Unsupported or malformed JSON files are shown as index warnings instead of
crashing the whole page. Markdown reports are not scraped; JSON is the machine
interface. The generated `reports/visualizer/` directory is excluded from input
discovery so regenerating the visualizer does not index its own payload copies.

The Detail view lazy-loads the selected artifact payload. Per-matmul cards show
workload shape, local energy components, timing, published-reference separation,
provenance, and assumptions. Transformer-layer summaries show layer shape,
aggregate workload totals, local energy, serial timing, non-additive noise
diagnostics, aggregate semantics, formula audit rows, per-matmul breakdowns,
assumptions, exclusions, and provenance.

The Compare view lets you select multiple artifacts from the rail and inspect a
schema-aware side-by-side matrix. Mixed per-matmul and transformer-layer
comparison is allowed, but labeled as mixed-schema comparison so serial timing,
non-additive aggregate noise, exclusions, local estimates, and published
references are not flattened into one false hardware model.

Source layout for the visualizer:

- `photonic_bench/visualizer.py`: discovery, schema-aware adapters, data asset
  generation, and template assembly.
- `photonic_bench/visualizer_assets/template.html`: generated HTML shell.
- `photonic_bench/visualizer_assets/styles.css`: workbench styling.
- `photonic_bench/visualizer_assets/app.js`: browser navigation, lazy payload
  loading, detail views, and comparison mode.

## Comparison Tables

Use the `compare` command to generate a Markdown table from JSON cards:

```powershell
python -m photonic_bench.cli compare reports/matmul_64x64.json reports/nature_pace_64x64.json reports/nature_pace_64x64_calibrated.json reports/xu_11tops_convolution_surrogate.json reports/weight_stationary_64x64_batch.json --report reports/comparison.md
```

The comparison table is generated from `local_model`, `published_reference`, `calibration_fit`, and `provenance` fields in JSON. Missing optional paper metrics are rendered as `n/a` instead of guessed.

## Calibration Fitting

Calibration fitting is optional and explicit. It solves one selected scalar component-model parameter so `local_model.energy.total_pj` matches a paper-derived total-energy target from the `published_calibration` section.

Example:

```powershell
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64_calibrated.md --json-report reports/nature_pace_64x64_calibrated.json --fit-target published-including-lasers --fit-parameter device.dac.energy_pj_per_conversion
```

Supported targets:

- `published-including-lasers`: fit to the published including-lasers TOPS/W converted to total workload energy.
- `published-excluding-lasers`: fit to the published excluding-lasers TOPS/W converted to total workload energy.

Supported fitted parameters:

- `device.optical_mac_energy_fj`
- `device.laser_wall_plug_efficiency`
- `device.photodetector_energy_fj_per_sample`
- `device.adc.energy_pj_per_conversion`
- `device.dac.energy_pj_per_conversion`
- `device.vector_dac.energy_pj_per_conversion`
- `device.weight_dac.energy_pj_per_conversion`

The output records the target, target source, original value, fitted value, pre-fit local energy, post-fit local energy, fit error, and assumptions. The fitted result is reported under a separate `calibration_fit` section and does not overwrite the local model inputs or paper-reported reference fields.

## Project Files

- `photonic_bench/config.py`: YAML loading and validation.
- `photonic_bench/model.py`: energy, timing, and noise calculations.
- `photonic_bench/report.py`: Markdown benchmark card rendering.
- `photonic_bench/json_report.py`: machine-readable JSON card rendering.
- `photonic_bench/comparison.py`: Markdown comparison table rendering from JSON cards.
- `photonic_bench/transformer.py`: transformer-layer shape helpers and aggregate layer comparison rendering.
- `photonic_bench/visualizer.py`: static web visualizer discovery, schema-aware loading, template assembly, and generated data asset writing.
- `photonic_bench/visualizer_assets/`: source HTML, CSS, and JavaScript assets for the generated visualizer.
- `docs/photonic-bench-transformer-layer-report-v1.schema.json`: machine-readable aggregate transformer-layer JSON Schema.
- `photonic_bench/cli.py`: command-line entry point.
- `docs/json_schema.md`: JSON schema guide, units, nullability, and examples.
- `docs/photonic-bench-report-v1.schema.json`: machine-readable JSON Schema.
- `examples/matmul_64x64.yaml`: first example workload.
- `examples/nature_pace_64x64.yaml`: source-backed Nature PACE calibration card config.
- `examples/xu_11tops_convolution_surrogate.yaml`: source-backed Xu 2021 convolution accelerator card encoded as a labeled matmul surrogate.
- `examples/weight_stationary_64x64_batch.yaml`: synthetic realism example for reuse, stationarity, pipelining, and separate DACs.
- `examples/transformer_small_sanity.yaml`: tiny transformer-layer formula sanity example.
- `examples/bert_base_encoder_layer.yaml`: BERT-base style encoder-layer shape helper example.
- `examples/gpt_style_decoder_layer.yaml`: GPT-style decoder-layer shape helper example.
- `examples/load_report_json.py`: small programmatic JSON loading example.
- `reports/visualizer/index.html`: generated static web visualizer.
- `tasks/goal-prompt.md`: first-task execution prompt.
- `tasks/todo.md`: live task ledger.
