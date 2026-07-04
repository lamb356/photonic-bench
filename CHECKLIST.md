# PhotonicBench PR9 Merge, Visualizer, And System Modeling Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md`.
    - Called GBrain `get_brain_identity`; version `0.42.56.0`, engine
      `pglite`.
    - Queried GBrain for PhotonicBench PR9 bandwidth/headroom follow-up
      context; no matching page was returned.
    - Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
      transformer, and workflow context.
    - Read GitHub, frontend-design, review, and commit skill guidance.
    - Checked `git status --short --branch`; current branch is clean on
      `codex/pr8-followup-improvements`.
    - Checked PR #9 with `gh pr view`; PR is open, non-draft, mergeable,
      base `master`, head `codex/pr8-followup-improvements`, head commit
      `b75d4e409aa6594c6941aa1a97e34fb470e91c24`, and both checks are green.
- [x] DONE: Roll `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` to the merge-first outer loop.
  - Proof:
    - This checklist records the new stop condition: merge PR #9 first,
      verify `master`, clean the feature branch, then add one more
      visualizer/modeling pass.
- [x] DONE: Keep state files aligned as each task advances.
  - Proof:
    - Updated `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` for closeout after verification.

## Task 1: Merge PR #9 And Verify Master

- [x] DONE: Confirm PR #9 checks are green immediately before merge.
  - Proof:
    - `gh pr view 9` confirmed PR #9 was open, non-draft, mergeable, based on
      `master`, and at head `b75d4e409aa6594c6941aa1a97e34fb470e91c24`.
    - Required checks were green before merge:
      - `Ruff, package, and pytest`;
      - `macOS visual regression`.
- [x] DONE: Merge PR #9 into `master`.
  - Proof:
    - `gh pr merge 9 --merge --delete-branch` succeeded.
    - PR #9 state is `MERGED`.
    - Merge commit:
      `0f9ba2acc893ffbe5c5fbfd163481e4f69052328`.
    - Merged at `2026-07-04T17:38:23Z`.
- [x] DONE: Verify post-merge GitHub Actions is green on `master`.
  - Proof:
    - Watched master CI run `28714312225` to completion.
    - `macOS visual regression` passed.
    - `Ruff, package, and pytest` passed, including CI artifact freshness.
- [x] DONE: Update local `master` to the merge commit and confirm it is clean.
  - Proof:
    - Local `master` fast-forwarded to `origin/master` at merge commit
      `0f9ba2acc893ffbe5c5fbfd163481e4f69052328`.
    - `git status --short --branch` showed `master...origin/master` clean
      before active state edits were restored.
- [x] DONE: Run post-merge local verification on `master`, including full
      pytest and `verify-artifacts`.
  - Proof:
    - `python -m pytest -q` passed: 130 tests.
    - `python -m photonic_bench.cli verify-artifacts` passed: 258 generated
      files fresh.
- [x] DONE: Delete `codex/pr8-followup-improvements` locally and remotely, and
      prune stale tracking refs.
  - Proof:
    - `git fetch --prune origin` removed stale
      `origin/codex/pr8-followup-improvements`.
    - `git branch --list "codex/pr8-followup-improvements"` returned no local
      branch.
    - `git ls-remote --heads origin codex/pr8-followup-improvements` returned
      no remote branch.

## Task 2: Visualizer Improvements

- [x] DONE: Map the current visualizer dashboard, comparison, selection,
      URL-state, preset, export, detail, smoke, accessibility, and
      visual-regression surfaces after PR #9 is merged.
  - Proof:
    - Reviewed `photonic_bench/visualizer.py`,
      `photonic_bench/visualizer_assets/app.js`,
      `tests/test_visualizer.py`, `tests/test_visualizer_smoke.py`,
      `tests/test_visualizer_accessibility.py`, and
      `tests/test_visualizer_visual_regression.py`.
    - Used parallel visualizer exploration guidance for a summary-driven
      comparison review checklist and daily-use comparison panel.
- [x] DONE: Implement meaningful interaction, dashboard, analytical, or
      usability improvements while preserving modeling-boundary labels.
  - Proof:
    - Added an Energy Stack panel ranking selected artifacts by local
      movement-to-compute energy ratio and largest hierarchy-tier share of
      total local system energy.
    - Added a Comparison Review Checklist panel and JSON/Markdown export data
      for pinned baseline, schema compatibility, source/provenance coverage,
      system metric coverage, energy split coverage, bandwidth phase coverage,
      transformer boundaries, and external/legacy payloads.
    - Added guardbanded-vs-contention-only loaded bandwidth labels in the
      detail, comparison, contention insight, Markdown, CSV, and JSON export
      surfaces while retaining the old JSON key as a compatibility alias.
- [x] DONE: Update visualizer docs, generated visualizer artifacts, and
      browser/focused tests as relevant.
  - Proof:
    - Updated `README.md`, `docs/json_schema.md`,
      `docs/photonic-bench-comparison-export-v1.schema.json`, and
      `CHANGELOG.md`.
    - Regenerated checked `reports/visualizer/**` artifacts.
    - Added focused static, discovery, schema, and browser-smoke assertions in
      `tests/test_visualizer.py` and `tests/test_visualizer_smoke.py`.

## Task 3: Deeper System Modeling

- [x] DONE: Map current contention calibration, memory hierarchy, report, JSON
      schema, transformer aggregate, and visualizer exposure after PR #9 is
      merged.
  - Proof:
    - Reviewed `photonic_bench/model.py`, `photonic_bench/json_report.py`,
      `photonic_bench/report.py`, `photonic_bench/comparison.py`,
      `photonic_bench/transformer.py`, report schemas, docs, and generated
      report artifacts.
    - Used parallel modeling exploration guidance to separate contention-only
      loaded bandwidth from the existing guardbanded loaded bandwidth field.
- [x] DONE: Add meaningful contention calibration, effective-bandwidth,
      hierarchy-energy, pressure-ratio, or related metrics with explicit
      local-model assumptions.
  - Proof:
    - Added per-tier `system_energy_share`.
    - Added top-level local compute/conversion energy share,
      movement-to-compute energy ratio, dominant total-system energy
      component, max tier system-energy share, and contention-only loaded
      hierarchy bandwidth.
    - Preserved existing guardbanded
      `contention_adjusted_loaded_bandwidth_bytes_per_ns` semantics.
- [x] DONE: Expose new metrics in Markdown, JSON, comparison, transformer, and
      visualizer surfaces where appropriate.
  - Proof:
    - Exposed the new metrics through per-matmul JSON/Markdown, comparison
      Markdown, transformer layer/model aggregate JSON/Markdown, visualizer
      summaries, comparison exports, schemas, docs, and generated reports.
- [x] DONE: Add focused tests and regenerate affected checked artifacts.
  - Proof:
    - Added assertions in `tests/test_model.py`, `tests/test_json_report.py`,
      `tests/test_report.py`, `tests/test_transformer.py`,
      `tests/test_comparison.py`, `tests/test_visualizer.py`, and
      `tests/test_visualizer_smoke.py`.
    - `python -m photonic_bench.cli verify-artifacts` passed with 258 fresh
      generated files.

## Task 4: Verification And Documentation

- [x] DONE: Regenerate checked artifacts after source/model/visualizer changes.
  - Proof:
    - Regenerated all checked artifacts via
      `python -c "from photonic_bench.artifacts import regenerate_checked_artifacts; regenerate_checked_artifacts()"`.
    - `python -m photonic_bench.cli verify-artifacts` passed: 258 generated
      files fresh.
- [x] DONE: Run focused tests for touched surfaces.
  - Proof:
    - `python -m pytest tests\test_model.py tests\test_json_report.py tests\test_report.py tests\test_transformer.py tests\test_comparison.py -q`
      passed: 51 tests.
    - `python -m pytest tests\test_visualizer.py tests\test_visualizer_smoke.py tests\test_schema_docs.py -q`
      passed: 16 tests.
- [x] DONE: Run full Ruff, full pytest, package build, JS syntax checks,
      `verify-artifacts`, browser smoke/accessibility/visual regression, and
      diff hygiene before closeout.
  - Proof:
    - `python -m ruff check` passed.
    - `python -m pytest -q` passed: 130 tests.
    - `python -m build` passed.
    - `python -m photonic_bench.cli verify-artifacts` passed: 258 generated
      files fresh.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `node --check reports\visualizer\assets\app.js` passed.
    - `python -m pytest tests\test_visualizer.py tests\test_visualizer_smoke.py -q`
      passed: 10 tests.
    - `python -m pytest tests\test_visualizer_accessibility.py tests\test_visualizer_visual_regression.py -q`
      passed: 6 tests.
    - `git diff --check` passed.

## Task 5: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read state files and review checklist before critique.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` immediately before the critique pass.
- [x] DONE: Run critique focused on usability, modeling clarity, source
      boundaries, code quality, test reliability, CI artifact usability, and
      visual regression portability.
  - Proof:
    - Hostile review finding: the UI and JSON export still used the ambiguous
      "loaded hierarchy bandwidth" label/key for the guardbanded value while a
      new contention-only value had been added.
    - No evidence found that published-reference values were merged into
      `local_model`; the new Energy Stack and checklist are explicitly labeled
      as local diagnostics.
- [x] DONE: Fix important findings and re-run affected verification.
  - Proof:
    - Renamed browser-facing labels to "Guardbanded loaded bandwidth".
    - Added `guardbanded_loaded_hierarchy_bandwidth_bytes_per_ns` to JSON
      export/schema/docs while preserving
      `loaded_hierarchy_bandwidth_bytes_per_ns` as a backward-compatible alias.
    - Re-ran affected tests, schema-doc checks, JS syntax, artifact freshness,
      Ruff, full pytest, package build, browser accessibility/visual
      regression, and diff hygiene successfully.

## Task 6: Final Closeout

- [x] DONE: Confirm all three objectives have meaningful implementation and
      proof.
  - Proof:
    - PR #9 merge and post-merge verification are complete.
    - Visualizer Energy Stack and Comparison Review Checklist are implemented,
      documented, tested, and regenerated.
    - System-energy decomposition and bandwidth phase split are implemented,
      documented, tested, and regenerated.
- [x] DONE: Update state files and `tasks/todo.md` to final DONE state.
  - Proof:
    - This closeout updates `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`,
      `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md`.
- [x] DONE: Record PR merge commit, post-merge CI run, commits, verification,
      durable notes, and remaining risks.
  - Proof:
    - PR #9 merge commit:
      `0f9ba2acc893ffbe5c5fbfd163481e4f69052328`.
    - Post-merge master CI run: `28714312225`, passed.
    - Follow-up implementation commit:
      `8be7316725fd0ef2fd00e54e96d7bb9e7ef473a7`.
    - Durable GBrain note slug reserved for final write:
      `photonicbench-pr9-merge-energy-stack-followup-2026-07-04`.
    - Remaining risk: the final closeout commit and post-push CI run are
      created after this state update and are reported in the final response.
