# PhotonicBench PR9 Merge, Visualizer, And System Modeling Progress

## 2026-07-04 Cycle 0: State Rollforward And Context Re-Read

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Re-read `tasks/todo.md`.

### GBrain, Memory, And Skills

- Called GBrain `get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `36`;
  - chunk count `36`.
- Queried GBrain for PR9 bandwidth/headroom follow-up context; no matching page
  was returned.
- Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
  transformer, and workflow context.
- Read skills:
  - `github:github`;
  - `frontend-design`;
  - `review`;
  - `commit`.

### Repository And PR State

- Current branch: `codex/pr8-followup-improvements`.
- `git status --short --branch` shows a clean branch tracking
  `origin/codex/pr8-followup-improvements`.
- Recent commits:
  - `b75d4e4 Close PR9 follow-up state`;
  - `d452cf8 Add hierarchy bandwidth headroom diagnostics`;
  - `50fe226 Refresh bottleneck diagnostic artifacts`;
  - `6e80186 Add tier bottleneck diagnostics and visualizer stack`;
  - `c5cffaa Merge pull request #8 from lamb356/codex/pr7-followup-improvements`.
- PR #9 is open, non-draft, mergeable, and targets `master` from
  `codex/pr8-followup-improvements`.
- PR #9 head commit:
  `b75d4e409aa6594c6941aa1a97e34fb470e91c24`.
- PR #9 checks at setup:
  - `Ruff, package, and pytest`: success;
  - `macOS visual regression`: success.

### State Rollforward

- Replaced the previous completed PR #9 publication loop state with this
  active merge-first outer-loop state.
- Created a prioritized checklist:
  1. Merge PR #9 into `master`, verify post-merge CI and local artifacts, and
     clean the old branch.
  2. Add another meaningful visualizer improvement pass.
  3. Add another deeper system-modeling pass.
  4. Regenerate artifacts, update docs, and verify.
  5. Run hostile review and fix important findings.
  6. Close state with proof, durable note, and remaining risks.

## Current Next Step

Map the merged visualizer and system-modeling surfaces on `master`, then
choose the next implementation slice.

## 2026-07-04 Cycle 1: PR #9 Merge And Post-Merge Verification

### Pre-Merge Check

- Re-checked PR #9 immediately before merge:
  - state: open;
  - draft: false;
  - mergeable: true;
  - base: `master`;
  - head: `codex/pr8-followup-improvements`;
  - head commit: `b75d4e409aa6594c6941aa1a97e34fb470e91c24`.
- Required PR checks were green:
  - `Ruff, package, and pytest`;
  - `macOS visual regression`.

### Merge

- Ran `gh pr merge 9 --merge --delete-branch`.
- PR #9 is merged.
- Merge commit:
  `0f9ba2acc893ffbe5c5fbfd163481e4f69052328`.
- Merged at `2026-07-04T17:38:23Z`.
- Local checkout is now `master` at `origin/master`.

### Post-Merge Verification

- Watched master CI run `28714312225` to completion:
  - `macOS visual regression` passed;
  - `Ruff, package, and pytest` passed;
  - CI artifact freshness passed inside the `Ruff, package, and pytest` job.
- Local post-merge verification on clean `master`:
  - `python -m pytest -q` passed: 130 tests;
  - `python -m photonic_bench.cli verify-artifacts` passed: 258 generated
    files fresh.

### Branch Cleanup

- `git fetch --prune origin` removed stale
  `origin/codex/pr8-followup-improvements`.
- `git branch --list "codex/pr8-followup-improvements"` returned no local
  branch.
- `git ls-remote --heads origin codex/pr8-followup-improvements` returned no
  remote branch.

## 2026-07-04 Cycle 2: Energy Stack, Review Checklist, And System-Energy Split

### Visualizer Improvement

- Added Energy Stack to comparison mode:
  - ranks selected artifacts by movement-to-compute local energy ratio;
  - shows common dominant total-system energy component;
  - shows common movement tier;
  - shows largest hierarchy-tier share of total local system energy;
  - labels the panel as local system-energy decomposition, not paper-reported
    energy breakdowns.
- Added Comparison Review Checklist:
  - pinned baseline;
  - schema compatibility;
  - published-reference coverage;
  - source-quality grade coverage;
  - provenance coverage;
  - system-metric coverage;
  - energy split coverage;
  - bandwidth phase coverage;
  - transformer boundary coverage;
  - external/legacy payload review.
- Added checklist output to JSON and Markdown comparison exports.
- Clarified guardbanded versus contention-only loaded bandwidth in UI labels,
  Markdown exports, CSV exports, JSON exports, docs, and tests.

### System Modeling Improvement

- Added per-tier `system_energy_share`.
- Added top-level:
  - `local_compute_and_conversion_energy_share`;
  - `movement_to_compute_energy_ratio`;
  - `dominant_system_energy_component`;
  - `max_tier_system_energy_share`;
  - `contention_only_loaded_bandwidth_bytes_per_ns`.
- Preserved existing
  `contention_adjusted_loaded_bandwidth_bytes_per_ns` as the guardbanded loaded
  bandwidth field.
- Exposed the new metrics in:
  - per-matmul JSON/Markdown;
  - comparison Markdown;
  - transformer layer/model aggregate JSON/Markdown;
  - visualizer summaries and detail/comparison dashboards;
  - comparison JSON/Markdown/CSV exports;
  - strict schemas and docs.

### Documentation, Tests, And Artifacts

- Updated `README.md`, `CHANGELOG.md`, `docs/model.md`,
  `docs/json_schema.md`, report JSON schemas, and comparison export JSON
  schema.
- Added focused assertions in `tests/test_model.py`,
  `tests/test_json_report.py`, `tests/test_report.py`,
  `tests/test_transformer.py`, `tests/test_comparison.py`,
  `tests/test_visualizer.py`, and `tests/test_visualizer_smoke.py`.
- Regenerated checked reports and visualizer payloads.

### Hostile Senior Reviewer Critique

- Finding:
  - The UI and JSON export still used the ambiguous legacy "loaded hierarchy
    bandwidth" wording/key for the guardbanded value after a new
    contention-only value was added.
- Fix:
  - Renamed browser-facing labels to "Guardbanded loaded bandwidth".
  - Added `guardbanded_loaded_hierarchy_bandwidth_bytes_per_ns` to comparison
    JSON export/schema/docs.
  - Preserved `loaded_hierarchy_bandwidth_bytes_per_ns` as a backward-compatible
    alias.

### Verification

- `python -m pytest tests\test_model.py tests\test_json_report.py tests\test_report.py tests\test_transformer.py tests\test_comparison.py -q`
  passed: 51 tests.
- `python -m pytest tests\test_visualizer.py tests\test_visualizer_smoke.py tests\test_schema_docs.py -q`
  passed: 16 tests.
- `python -m ruff check` passed.
- `python -m pytest -q` passed: 130 tests.
- `python -m build` passed.
- `python -m photonic_bench.cli verify-artifacts` passed: 258 generated files
  fresh.
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `node --check reports\visualizer\assets\app.js` passed.
- `python -m pytest tests\test_visualizer_accessibility.py tests\test_visualizer_visual_regression.py -q`
  passed: 6 tests.
- `git diff --check` passed.

### Commit

- Implementation commit:
  `8be7316725fd0ef2fd00e54e96d7bb9e7ef473a7`
  (`Add system energy stack diagnostics`).
- Direct push to protected `master` was rejected with GH006 because required
  status check `Ruff, package, and pytest` is expected on protected branch
  updates.
- Follow-up PR #10 was opened from `codex/pr9-merge-energy-stack`:
  `https://github.com/lamb356/photonic-bench/pull/10`.
- PR #10 CI, merge, branch cleanup, and final synced `master` status are
  reported in the final response after this state update.
