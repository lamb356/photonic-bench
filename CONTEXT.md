# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Branch: `master`
- Current pre-goal working tree:
  - contains the completed visualizer comparison, Playwright smoke, and local
    `visualize --serve` scaling feature layer;
  - has not yet been committed or pushed.
- Recent commits:
  - `c5d9816 Evolve visualizer static workbench`
  - `ef731c9 Add initial web visualizer`
  - `a147736 Harden transformer layer aggregate reports`

## CLI Commands

Existing commands:

- `python -m photonic_bench.cli run CONFIG --report REPORT [--json-report JSON]`
- `python -m photonic_bench.cli compare JSON... --report REPORT`
- `python -m photonic_bench.cli transformer-layer CONFIG --output-dir DIR [--prefix PREFIX]`
- `python -m photonic_bench.cli visualize [--reports-dir reports] [--output reports/visualizer/index.html]`
- `python -m photonic_bench.cli visualize --reports-dir reports --serve [--host 127.0.0.1] [--port PORT]`

## Visualizer Architecture

- `photonic_bench/visualizer.py` discovers JSON reports recursively and routes
  supported schemas through explicit adapters.
- `photonic_bench/visualizer_assets/template.html` is the shell.
- `photonic_bench/visualizer_assets/styles.css` contains workbench styling.
- `photonic_bench/visualizer_assets/app.js` contains browser navigation,
  filtering, lazy payload loading, detail views, and comparison mode.
- Static generation writes:
  - `reports/visualizer/index.html`
  - `reports/visualizer/assets/styles.css`
  - `reports/visualizer/assets/app.js`
  - `reports/visualizer/data/index.json`
  - `reports/visualizer/data/index.js`
  - `reports/visualizer/data/payloads/*.payload.json`
  - `reports/visualizer/data/payloads/*.payload.js`
- Server mode serves the shell, static assets, index JSON/script, and
  per-artifact payload JSON on demand from discovered source report files.

## Data Contracts

The visualizer consumes JSON, not Markdown.

Per-matmul benchmark cards:

- Schema version: `photonic-bench-report-v1`
- Schema file: `docs/photonic-bench-report-v1.schema.json`
- Example reports:
  - `reports/nature_pace_64x64.json`
  - `reports/xu_11tops_convolution_surrogate.json`

Transformer-layer aggregate reports:

- Schema version: `photonic-bench-transformer-layer-report-v1`
- Schema file: `docs/photonic-bench-transformer-layer-report-v1.schema.json`
- Example reports:
  - `reports/transformer_small_sanity/small_transformer_layer_summary.json`
  - `reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json`
  - `reports/gpt_style_decoder_layer/gpt_decoder_layer_layer_summary.json`

Aggregate JSON is a summary over decomposed JSON cards. It must not be
presented as a hidden fused-layer hardware model.

## Modeling Boundaries To Preserve

- Local model estimates come from `local_model`.
- Published references and direct unit conversions come from
  `published_reference`.
- Transformer aggregate timing fields with `serial_*` names are serial sums of
  decomposed matmul batch latencies.
- Aggregate noise is not additive. Aggregate noise fields are diagnostic
  extrema; per-matmul noise remains in `matmuls[].local_model.noise`.
- Transformer-layer exclusions must remain visible:
  softmax, layer norm, bias adds, activation functions, dropout, masking,
  KV-cache incremental decoding, causal triangular halving, and non-matmul
  memory traffic.
- File references inside aggregate JSON are local filenames relative to the
  aggregate report directory.
- Calibration fits and published references remain separate from local model
  outputs.

## Proposal Direction

The MLCommons-style proposal should be concrete enough to seed a real working
draft while remaining honest about its status. It should define:

- benchmark scope and non-goals;
- workload classes and representative shapes;
- required metrics and units;
- accuracy/noise/quality guardrails;
- reproducibility package expectations;
- reference implementations and calibration evidence;
- disclosure requirements for photonic hardware assumptions;
- open governance and methodology questions.

Use current official MLCommons materials for context before writing claims
about process or submission expectations.

## Constraints

- Do not scrape Markdown reports as the machine interface.
- Do not claim parallel or fused transformer scheduling unless the JSON contract
  explicitly models it.
- Do not sum noise into a layer-level error.
- Do not hide assumptions, exclusions, provenance, schema version, or
  published-reference boundaries.
- Do not push unless tests and ruff pass.
- Do not treat the proposal as a completed MLCommons submission.
