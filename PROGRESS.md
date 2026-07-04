# PhotonicBench Progress

## 2026-07-03 Prior Baseline

Completed before this goal:

- First tested matmul benchmark-card CLI.
- JSON export beside Markdown reports.
- Calibration fitting mode.
- Component realism improvements for operand reuse, weight-stationary behavior,
  pipelining, and separate vector/weight DAC handling.
- Two source-backed photonic accelerator cards.
- Comparison tables across JSON cards.
- JSON schema documentation and loading examples.
- Transformer-layer shape helpers with decomposed per-matmul Markdown/JSON.
- Aggregate transformer-layer Markdown comparison.
- Aggregate transformer-layer JSON summary:
  `<prefix>_layer_summary.json`.
- Transformer-layer hardening:
  - path-aware config and JSON errors;
  - stricter aggregate card validation;
  - exact five-row aggregate schema contract;
  - strict non-finite JSON handling;
  - stronger shape and CLI tests;
  - regenerated transformer examples;
  - final hardening verification.
- Web visualizer and MLCommons-style proposal planning artifacts.

Latest recorded hardening verification:

- `python -m pytest`: 63 passed.
- `python -m ruff check`: passed.

## 2026-07-03 Commit And Visualizer Cycle 1

### State Re-Read

- Re-read existing `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Found they described the completed transformer-layer hardening goal, while
  the new active goal is hardened baseline commit plus initial web visualizer.
- Re-read `tasks/todo.md`.
- Inspected repository file list and git status.
- Confirmed there are no commits yet on `master`; all project files are
  untracked and form the baseline snapshot.
- Read the local commit, frontend-design, and review skill entrypoints.
- Searched memory for PhotonicBench/visualizer context; no project-specific
  prior memory notes were found.

### State File Update

- Replaced `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` with the current commit plus initial visualizer goal state.
- Updated `tasks/todo.md` to record transformer-layer hardening as complete and
  the initial web visualizer as active.
- Created a prioritized checklist:
  1. commit the hardened baseline;
  2. add artifact discovery and indexing;
  3. add schema-aware loading;
  4. build the static visualizer UI;
  5. render the transformer-layer detail view;
  6. document and verify;
  7. run hostile senior reviewer critique and fix major findings.

### Baseline Commit Preparation

- Ran baseline verification before commit:
  - `python -m pytest`: 63 passed.
  - `python -m ruff check`: passed.
- Inspected `git status --short --branch`.
- Listed project files to stage with `git ls-files --others --exclude-standard`.
- Staged those listed files.
- Created commit:
  - `a147736 Harden transformer layer aggregate reports`
- Confirmed post-commit `git status --short --branch` reported a clean
  `master` worktree.
- Confirmed no push was performed.
- Checked for `.Codex/scripts/generate-reasoning.sh`; it is not present in this
  checkout, so no reasoning sidecar was generated.

### Visualizer Implementation

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` before starting visualizer implementation.
- Inspected the per-matmul JSON schema, aggregate transformer-layer JSON
  schema, `reports/nature_pace_64x64.json`, and
  `reports/transformer_small_sanity/small_transformer_layer_summary.json`.
- Added `photonic_bench/visualizer.py` with:
  - recursive JSON artifact discovery;
  - strict JSON object loading with non-finite constant rejection;
  - schema-aware adapter routing for `photonic-bench-report-v1` and
    `photonic-bench-transformer-layer-report-v1`;
  - artifact summaries for schema version, kind, benchmark name, MACs,
    equivalent ops, output elements, local energy, timing, source path, browser
    path, provenance status, and published-reference status;
  - non-crashing index warnings for unsupported or malformed artifacts;
  - static self-contained HTML rendering.
- Added CLI command:
  - `python -m photonic_bench.cli visualize --reports-dir reports --output reports\visualizer\index.html`
- Generated `reports/visualizer/index.html`:
  - 23 artifacts.
  - 0 warnings.
- Added `tests/test_visualizer.py` covering:
  - root and nested report discovery;
  - per-matmul and transformer-layer summary fields;
  - unsupported schema warnings;
  - generated HTML concept labels;
  - browser-relative artifact links;
  - CLI generation.
- Updated README with visualizer generation/opening instructions and modeling
  boundaries.
- Focused verification:
  - `python -m pytest tests\test_visualizer.py`: 5 passed.
  - `python -m ruff check photonic_bench\visualizer.py photonic_bench\cli.py tests\test_visualizer.py`: passed.
- Generated-content check:
  - `Select-String` confirmed `reports\visualizer\index.html` contains
    `photonicbench-data`, `nature_pace_64x64.json`,
    `Small transformer sanity layer`, `Serial timing`,
    `Non-additive noise`, `Transformer Exclusions`, `Formula Audit`, and
    `Per-Matmul Breakdown`.

### Verification

- Pre-critique full verification:
  - `python -m pytest`: 68 passed.
  - `python -m ruff check`: passed.
- After critique fixes:
  - Regenerated `reports/visualizer/index.html`: 23 artifacts, 0 warnings.
  - `python -m pytest tests\test_visualizer.py`: 5 passed.
  - `python -m ruff check photonic_bench\visualizer.py photonic_bench\cli.py tests\test_visualizer.py`: passed.
- Browser smoke:
  - Playwright opened `reports/visualizer/index.html`.
  - Selected
    `transformer_small_sanity/small_transformer_layer_summary.json`.
  - Verified `Small transformer sanity layer`, `Serial Timing`,
    `Non-additive Noise`, `Transformer Exclusions`, `Formula Audit`, and
    `Per-Matmul Breakdown`.
  - No page errors or console errors were observed.
- Final post-critique verification:
  - `python -m pytest`: 68 passed.
  - `python -m ruff check`: passed.

### Hostile Senior Reviewer Critique

Findings:

1. CLI warning routing was sloppy. Visualizer generation warnings are not the
   primary command result and should not share stdout with the generated-output
   success line.
2. The JavaScript detail-table formatter was too numeric by default. It would
   render string-valued rows such as `timing_model` as `n/a`, weakening the
   serial-timing explanation in the detail view.
3. String-level HTML checks were not enough UI proof. They proved the generated
   artifact contained labels, but not that the browser script could actually
   render and select the transformer detail view.
4. `photonic_bench/visualizer.py` is large because it embeds the initial CSS and
   JavaScript. That is acceptable for this self-contained first pass, but it is
   the first thing to split into template/static assets before adding upload,
   dashboard, or charting features.
5. The generated HTML embeds all loaded payloads. This is appropriate for the
   current 23-artifact, 287 KB local artifact, but a larger report corpus should
   move to a small index plus lazy artifact loading.

Fixes applied:

- Imported `sys` in `photonic_bench/cli.py` and routed visualizer warnings to
  stderr.
- Changed the browser `objectRows()` default formatter so numeric values are
  formatted numerically while string values are preserved.
- Regenerated `reports/visualizer/index.html` after the JavaScript fix.
- Ran a Playwright browser smoke test against the generated file.

Residual risks:

- No persistent browser screenshot test is checked into the suite because
  Playwright is not declared as a project dependency.
- Template/static-asset splitting is deferred until the next visualizer feature
  expansion because the initial single-file static artifact remains simpler to
  open and review.
