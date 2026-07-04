# PhotonicBench Web Visualizer Plan

## Goal

Build a local-first web visualizer that consumes PhotonicBench JSON artifacts
directly. It should make benchmark cards easier to inspect without parsing
Markdown or weakening the distinction between local model estimates, published
references, assumptions, and exclusions.

## Current Data Contracts

The visualizer should treat these JSON schemas as the initial source of truth:

- Per-card matmul reports:
  - schema version: `photonic-bench-report-v1`
  - schema file: `docs/photonic-bench-report-v1.schema.json`
  - example: `reports/nature_pace_64x64.json`
- Aggregate transformer-layer reports:
  - schema version: `photonic-bench-transformer-layer-report-v1`
  - schema file: `docs/photonic-bench-transformer-layer-report-v1.schema.json`
  - examples:
    - `reports/transformer_small_sanity/small_transformer_layer_summary.json`
    - `reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json`
    - `reports/gpt_style_decoder_layer/gpt_decoder_layer_layer_summary.json`

The visualizer should not scrape Markdown. Markdown reports remain
human-readable artifacts; JSON reports are the machine interface.

## Initial Views

1. Artifact index
   - Load one or more JSON files from `reports/`.
   - Detect `schema_version`.
   - Group artifacts as matmul cards or transformer-layer aggregate reports.
   - Show benchmark name, schema, MACs, equivalent ops, total energy, and
     provenance status.

2. Matmul card detail
   - Show workload shape `m x k` times `k x n`.
   - Show local energy component stack:
     optical compute, laser electrical, detector, ADC, vector DAC, weight DAC.
   - Show timing:
     single-operation latency, batch latency, steady-state equivalent ops/s.
   - Show assumptions, provenance, published reference, and calibration fit in
     separate panels.

3. Transformer layer detail
   - Show layer shape:
     batch, sequence, hidden, heads, head dimension, MLP intermediate size.
   - Show aggregate totals:
     MACs, equivalent ops, output elements, total energy, energy per op,
     serial batch latency, serial effective equivalent ops/s.
   - Show formula audit rows and highlight mismatches if a future artifact ever
     records one.
   - Show per-matmul breakdown table with links to the referenced local JSON
     card filenames.

4. Comparison view
   - Compare selected artifacts on:
     MACs, equivalent ops, total energy, energy per op, latency, throughput.
   - Keep published metrics visually distinct from local model metrics.
   - Allow filtering by schema type and source/provenance status.

## Data Handling Rules

- Validate `schema_version` before reading schema-specific fields.
- Treat `published_reference` as paper-derived context, never local output.
- Treat aggregate `local_model.timing.serial_*` fields as serial summaries, not
  fused hardware scheduler claims.
- Treat aggregate noise fields as diagnostics; do not display them as a summed
  layer error.
- Use `matmuls[].json_report` as a local artifact filename relative to the
  aggregate JSON directory.
- Surface `exclusions` prominently for transformer-layer aggregate reports.

## Suggested Implementation Shape

- Start with a static frontend that loads checked-in JSON from `reports/`.
- Keep data parsing in a small typed adapter layer:
  - `loadArtifact(json): MatmulReport | TransformerLayerReport`
  - `summarizeArtifact(report): ArtifactSummary`
  - `getEnergySeries(report): EnergySlice[]`
  - `getTimingSummary(report): TimingSummary`
- Add schema-aware sample fixtures from the checked-in report files before
  adding file upload or dev-server data APIs.
- Use a compact workbench layout, not a marketing page:
  artifact list, detail pane, comparison pane, assumptions/provenance drawer.

## Implementation Risks

- Confusing published references with local model outputs.
- Treating serial transformer timing as a fused hardware schedule.
- Hiding exclusions and assumptions behind charts.
- Letting visual formatting imply precision beyond the current component model.
- Building against Markdown instead of JSON.
- Hard-coding only the small transformer example and missing larger shapes.

## First Build Checklist

- Load one per-card JSON and one aggregate transformer-layer JSON.
- Display schema-specific summaries without errors.
- Render energy breakdowns from JSON numeric fields.
- Render transformer formula audit and per-matmul breakdown.
- Show assumptions, exclusions, and provenance without truncating the meaning.
- Add browser-level screenshot tests only after a frontend stack exists.
