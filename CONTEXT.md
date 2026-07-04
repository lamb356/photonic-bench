# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Branch: `master`
- Current-state feature commit:
  - `416f1f8 Add visualizer comparison smoke and server mode`
- Final local implementation commit:
  - `ee90e77 Polish visualizer comparisons and draft benchmark proposal`
- Remote status:
  - no `git remote` is configured;
  - `master` has no upstream;
  - push is blocked until a remote URL/upstream is configured.
- Remote discovery:
  - `.git/config` contains only `[core]` settings and no remote stanza;
  - `gh repo view` reports `no git remotes found`;
  - authenticated GitHub account `lamb356` is available, but a read-only repo
    search did not find an unambiguous PhotonicBench/Photonic Acceleration
    target.
- Continuation re-audit:
  - worktree was clean at `ee90e77`;
  - no remote or upstream was configured;
  - state ledgers were updated afterward to record the remaining push blocker.
- Recent commits:
  - `85db200 Record remote push blocker`
  - `ee90e77 Polish visualizer comparisons and draft benchmark proposal`
  - `416f1f8 Add visualizer comparison smoke and server mode`
  - `c5d9816 Evolve visualizer static workbench`
  - `ef731c9 Add initial web visualizer`

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

## Current Visualizer Polish Layer

- Comparison mode now includes:
  - pinned reference state;
  - absolute deltas;
  - percent deltas;
  - ratios;
  - grouped same-schema analytics;
  - direction-aware `lowest` / `highest` badges;
  - `Comparison Insights` cards;
  - `Schema Compatibility` table;
  - explicit mixed-schema caveats.
- The checked-in visualizer example has been regenerated after JavaScript and
  CSS changes.
- The visualizer polish layer is committed locally in `ee90e77`; only pushing
  to a remote remains incomplete.

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

## Proposal Artifacts

- `docs/mlcommons_photonic_benchmark_proposal.md`
  - source-grounded proposal draft;
  - scope, workloads, metrics, divisions, reproducibility requirements, mapping,
    open questions, and next work.
- `docs/mlcommons_photonic_reproducibility_checklist.md`
  - package layout, manifest fields, artifact requirements, metric
    requirements, verification commands, review checklist, and audit questions.
- `thoughts/plans/mlcommons_photonic_benchmark_proposal_plan.md`
  - retained as the original planning note and now points to the docs above.
- The proposal artifacts are committed locally in `ee90e77`; only pushing to a
  remote remains incomplete.

## Current Verification

- Focused visualizer tests and Playwright smoke:
  - 9 passed.
- Proposal doc test:
  - 1 passed.
- Full `python -m pytest`:
  - 73 passed.
- Full `python -m ruff check`:
  - passed.
- Extra Playwright viewport smoke:
  - desktop and narrow comparison views passed with no page errors, no console
    errors, and no page-level horizontal overflow.

## Constraints

- Do not scrape Markdown reports as the machine interface.
- Do not claim parallel or fused transformer scheduling unless the JSON contract
  explicitly models it.
- Do not sum noise into a layer-level error.
- Do not hide assumptions, exclusions, provenance, schema version, or
  published-reference boundaries.
- Do not push unless tests and ruff pass.
- Do not treat the proposal as a completed MLCommons submission.
- Do not mark the push tasks complete until a remote exists and `git push`
  succeeds.
