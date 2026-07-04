# PhotonicBench Five-Objective Outer Loop Progress

## 2026-07-04 Cycle 0: State Rollforward And Context Re-Read

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Re-read the bottom of `tasks/todo.md`.

### GBrain, Memory, And Skills

- Called `mcp__gbrain__get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `21`;
  - chunk count `21`.
- Queried GBrain for the post-PR5 work; direct query returned no hit.
- Read GBrain page `photonicbench-post-pr5-visual-a11y-2026-07-04`.
- Searched local memory `MEMORY.md` for PhotonicBench context.
- Read skills:
  - `commit`;
  - `github:github`;
  - `github:yeet`;
  - `frontend-design`;
  - `review`.

### Repository State

- Current branch: `codex/post-pr5-visual-a11y`.
- Working tree contains the intended uncommitted post-PR5 visual regression,
  accessibility, generated baseline, generated visualizer, docs, and state
  file changes.

### State Rollforward

- Replaced the prior complete-local post-PR5 goal state with an active
  five-objective loop state.
- Added a prioritized checklist for commit/push/PR, macOS baseline fix,
  visualizer improvements, system modeling, published cards, CLI workflow,
  verification, hostile review, and closeout.
- Updated `tasks/todo.md` with the active goal.

### Immediate Next Steps

1. Run quick validation on the existing branch work.
2. Commit, push, and open the pull request to protect current work.
3. Continue with macOS baseline fix and broad implementation tasks.

## 2026-07-04 Cycle 1: PR Protection And CI Diagnosis

### Commit, Push, And PR

- Ran quick pre-commit validation:
  - `python -m ruff check`;
  - `python -m pytest tests\test_visualizer_visual_regression.py tests\test_visualizer_accessibility.py -q`;
  - `python -m photonic_bench.cli verify-artifacts`;
  - `node --check photonic_bench\visualizer_assets\app.js`;
  - `git diff --check`.
- Committed the carried post-PR5 visual/a11y work as
  `582408af063a50570fd2d40e3816a96fcab59f81`.
- Pushed `codex/post-pr5-visual-a11y`.
- Opened PR #7:
  - `https://github.com/lamb356/photonic-bench/pull/7`.

### Initial PR CI Failure

- PR CI failed in the Linux visual regression job.
- Downloaded the `visual-regression-screenshots` artifact from the failing run.
- Diagnosed the failure as renderer-specific `github-linux` baseline drift,
  initially visible on `mobile-comparison.png`.

## 2026-07-04 Cycle 2: Broader Implementation

### macOS Visual Baseline Workflow

- Added a `macOS visual baseline capture` GitHub Actions job on `macos-latest`.
- The job installs Chromium, runs
  `tests/test_visualizer_visual_regression.py` with
  `UPDATE_VISUAL_BASELINES=1` and `VISUAL_REGRESSION_BASELINE_PLATFORM=macos`,
  and uploads `macos-visual-regression-screenshots`.
- Added `tests/visual_baselines/macos/README.md` documenting that macOS PNGs
  must be promoted only from a reviewed real macOS artifact, never copied from
  Windows or Linux.

### Visualizer Improvements

- Added system hierarchy and contention diagnostics to visualizer summaries,
  detail panels, comparison rows, insight panels, and browser exports:
  - total hierarchy traffic;
  - off-chip traffic share;
  - contention bandwidth derate;
  - total transfer overhead;
  - loaded hierarchy bandwidth;
  - bandwidth pressure ratio;
  - contention pressure ratio.
- Extended JSON, Markdown, and CSV comparison exports with the new fields.
- Preserved local-model boundary notes in the contention insight panel.

### System Modeling

- Added local system metrics to `SystemModelResult`, Markdown reports, JSON
  reports, comparison tables, JSON schema, model docs, and generated reports:
  - hierarchy traffic totals and shares;
  - contention derate;
  - calibration guardband time;
  - contention and total transfer overhead;
  - effective and contention-adjusted loaded hierarchy bandwidth;
  - bandwidth and contention pressure ratios.
- Updated transformer layer/model aggregates after hostile review so aggregate
  JSON and wide transformer comparisons expose the same top-level diagnostics.
- Clamped overhead helper outputs to non-negative values to match schema
  semantics.

### Published Cards

- Added three source-backed surrogate cards:
  - `examples/meyer_2026_reconfigurable_ptp_surrogate.yaml`;
  - `examples/xie_2025_complex_mvm_surrogate.yaml`;
  - `examples/wu_2026_high_order_tensor_surrogate.yaml`.
- Added artifact recipes for those cards.
- Generated Markdown and JSON reports, visualizer payloads, and updated the
  comparison report.
- Updated README with DOI/source, reported-metric, quality-grade, and local
  surrogate mapping notes.

### CLI / Workflow Usability

- Added `python -m photonic_bench.cli list-examples`.
- Added `list-examples --json`.
- The inventory reports each example path, detected kind, benchmark name,
  workload, system profile, published-reference status, source-quality grade,
  local surrogate type, and validation status.
- Added CLI tests and README documentation.

### Changelog

- Added a 2026-07-04 changelog section covering PR #7, screenshot artifacts,
  macOS capture workflow, system diagnostics, published cards, and CLI
  workflow improvements.

## 2026-07-04 Cycle 3: mac/Linux Baselines And Verification

### Linux Baseline Repair

- Docker was installed but the Docker Desktop Linux engine was unavailable.
- WSL2 was available with Ubuntu 24.04 and Python 3.12.
- Used WSL2 plus `uv` to create an isolated Python 3.12 environment and run
  Chromium visual regression against the mounted repo.
- Regenerated `tests/visual_baselines/github-linux/*.png` from a real Linux
  renderer.
- Verified the Linux suite without update mode:
  - `VISUAL_REGRESSION_BASELINE_PLATFORM=github-linux python -m pytest tests/test_visualizer_visual_regression.py -q`;
  - result: 5 passed.

### Root Baseline Repair

- Regenerated root visual baselines locally after adding aggregate transformer
  diagnostics.
- Verified the root suite without update mode:
  - `python -m pytest tests\test_visualizer_visual_regression.py -q`;
  - result: 5 passed.

### Local Verification

- Focused tests passed:
  - model/report/schema/transformer/CLI/visualizer tests;
  - visual regression on root and `github-linux`;
  - axe accessibility test.
- Full gate set passed before closeout:
  - `python -m ruff check`;
  - `python -m pytest -q` with 128 tests;
  - `python -m build`;
  - `node --check photonic_bench\visualizer_assets\app.js`;
  - `python -m photonic_bench.cli verify-artifacts` with 238 generated files;
  - `git diff --check` with only Git line-ending normalization warnings.

## 2026-07-04 Cycle 4: Hostile Senior Reviewer Critique

### Review Setup

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md`.
- Read the review skill and its checklist from
  `C:\Users\burba\.agents\skills\review\checklist.md`.
- Applied the review checklist plus the PhotonicBench rubric to the branch diff.

### Findings

- Finding 1: Transformer aggregate summaries did not expose the newly added
  system hierarchy and pressure diagnostics at the top aggregate `system`
  level, so wide transformer comparisons could degrade to `n/a` despite the
  decomposed cards carrying the data.
  - Fix: added aggregate derived metrics for transformer layer/model reports,
    updated transformer JSON schemas, added regression tests, regenerated
    reports/visualizer payloads, and refreshed affected visual baselines.
- Finding 2: Overhead fractions were documented and schema-constrained as
  non-negative, but the helper could produce a negative value for invalid or
  nonsensical bandwidth-improving contention inputs.
  - Fix: clamped overhead helper outputs to zero minimum and updated the model
    documentation formulas.

### Post-Critique Verification

- `python -m pytest tests\test_model.py tests\test_transformer.py tests\test_json_report.py tests\test_report.py tests\test_schema_docs.py -q`
  passed.
- `python -m ruff check photonic_bench tests` passed.
- `python -m photonic_bench.cli verify-artifacts` passed.
- Root visual regression passed.
- WSL2 `github-linux` visual regression passed.

## 2026-07-04 Cycle 5: Closeout State

- Updated `GOAL.md`, `CHECKLIST.md`, `PROGRESS.md`, and `tasks/todo.md`.
- Final follow-up commit, push, PR CI, macOS artifact availability, and final
  git status are checked after this state update and reported in the final
  response.
