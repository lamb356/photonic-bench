# PhotonicBench PR Publication, Visualizer, And System Modeling Checklist

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
    - Checked branch state with `git status --short --branch`; current branch
      is `codex/pr8-followup-improvements`.
    - Called GBrain `get_brain_identity`; version `0.42.56.0`.
    - Searched GBrain for the PR #8 follow-up context and read
      `photonicbench-pr8-merge-bottleneck-stack-2026-07-04`.
    - Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
      transformer, and workflow context.
    - Read GitHub, commit, frontend-design, and review skill guidance.
- [x] DONE: Roll `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` to the new commit-first outer loop.
  - Proof:
    - This checklist records the new stop condition: publish the existing
      verified branch first, then add one more visualizer/modeling pass.
- [x] DONE: Keep state files aligned as each task advances.
  - Proof:
    - Updated state after the initial verification, two commits, push, and PR
      creation.

## Task 1: Commit, Push, And Open PR

- [x] DONE: Review the current dirty worktree and split commits logically.
  - Proof:
    - `git diff --stat` reviewed.
    - Split selected:
      - source/docs/schemas/tests/state commit;
      - generated reports and visualizer payload refresh commit.
- [x] DONE: Re-run fast quality gates before committing.
  - Proof:
    - `python -m ruff check` passed.
    - `python -m pytest -q` passed: 130 tests.
    - `python -m photonic_bench.cli verify-artifacts` passed: 258 generated
      files fresh.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `node --check reports\visualizer\assets\app.js` passed.
    - `python -m build` passed.
- [x] DONE: Create one or more clean commits on
      `codex/pr8-followup-improvements`.
  - Proof:
    - `6e80186 Add tier bottleneck diagnostics and visualizer stack`.
    - `50fe226 Refresh bottleneck diagnostic artifacts`.
    - Workspace was clean after the commits.
    - The `.Codex/scripts/generate-reasoning.sh` hook referenced by the commit
      skill is not present in this workspace, so no reasoning sidecar was
      generated.
- [x] DONE: Push `codex/pr8-followup-improvements` and open a PR to `master`.
  - Proof:
    - `git push -u origin codex/pr8-followup-improvements` succeeded.
    - PR opened: `https://github.com/lamb356/photonic-bench/pull/9`.
    - `gh pr view 9` confirms state `OPEN`, `isDraft=false`,
      `mergeable=MERGEABLE`, base `master`, head
      `codex/pr8-followup-improvements`, and head commit `50fe226`.
    - PR CI run `28713516645` has started.

## Task 2: Visualizer Improvements

- [x] DONE: Map the current visualizer dashboard, comparison, URL-state,
      preset, export, detail, smoke, accessibility, and visual-regression
      surfaces after the protected PR is open.
  - Proof:
    - Reviewed `photonic_bench/visualizer.py`,
      `photonic_bench/visualizer_assets/app.js`, visualizer tests, README
      visualizer docs, and generated `reports/visualizer/**`.
- [x] DONE: Implement high-value interaction, dashboard, analytical, or
      usability improvements while preserving modeling-boundary labels.
  - Proof:
    - Added bandwidth utilization, headroom, and saturation-tier analytics to
      Contention Insight, Bottleneck Stack, Review Queue, comparison summary,
      scoring, JSON export, Markdown export, and CSV export.
    - Preserved explicit local-model boundary notes for contention, hierarchy,
      guardband, and bandwidth-headroom diagnostics.
    - Hostile-review fix tightened legacy/external payload handling so the
      Contention Insight panel only names a highest-utilization artifact when
      that metric is finite.
- [x] DONE: Update visualizer docs, generated visualizer artifacts, and
      browser/focused tests as relevant.
  - Proof:
    - Updated `README.md`, `docs/json_schema.md`, `CHANGELOG.md`, and
      comparison-export schema docs.
    - Regenerated checked visualizer assets and payloads under
      `reports/visualizer/**`.
    - Added static and browser-smoke coverage for the new export fields and UI
      labels.

## Task 3: Deeper System Modeling

- [x] DONE: Map the current contention calibration, memory hierarchy, report,
      JSON schema, transformer aggregate, and visualizer exposure after the
      protected PR is open.
  - Proof:
    - Reviewed `photonic_bench/model.py`, `json_report.py`, `report.py`,
      `comparison.py`, `transformer.py`, strict schemas, model docs, and focused
      model/report/transformer tests.
- [x] DONE: Add meaningful contention calibration or hierarchy-realism
      improvements with explicit local-model assumptions.
  - Proof:
    - Added per-tier compute-window required bandwidth, contention bandwidth
      utilization, bandwidth headroom in bytes/ns, and bandwidth headroom ratio.
    - Added system-level bandwidth saturation tier, maximum tier utilization,
      and minimum traffic-tier headroom ratio.
    - Documented formulas and boundary language in `docs/model.md`.
- [x] DONE: Expose new metrics in Markdown, JSON, comparison, transformer, and
      visualizer surfaces where appropriate.
  - Proof:
    - Exposed fields in per-card Markdown/JSON, comparison Markdown,
      transformer-layer aggregate JSON/Markdown, transformer-model aggregate
      JSON/Markdown, strict schemas, visualizer summaries, visualizer detail
      tables, comparison dashboard, and browser exports.
- [x] DONE: Add focused tests and regenerate affected checked artifacts.
  - Proof:
    - Added assertions in model, JSON report, Markdown report, transformer,
      comparison, visualizer, and browser smoke tests.
    - Regenerated 258 checked artifacts.

## Task 4: Verification And Documentation

- [x] DONE: Regenerate checked artifacts after source/model/visualizer changes.
  - Proof:
    - `python -c "from photonic_bench.artifacts import regenerate_checked_artifacts; regenerate_checked_artifacts()"`
      completed after source/docs/schema updates and again after the critique
      visualizer fix.
    - `python -m photonic_bench.cli verify-artifacts` passed: 258 generated
      files fresh.
- [x] DONE: Run focused tests for touched surfaces.
  - Proof:
    - Focused suite passed: `python -m pytest tests\test_model.py
      tests\test_json_report.py tests\test_report.py tests\test_transformer.py
      tests\test_comparison.py tests\test_visualizer.py
      tests\test_visualizer_smoke.py -q`: 61 passed.
    - Post-critique visualizer/browser suite passed:
      `python -m pytest tests\test_visualizer.py
      tests\test_visualizer_smoke.py tests\test_visualizer_accessibility.py
      tests\test_visualizer_visual_regression.py -q`: 16 passed.
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
    - `python -m pytest tests\test_visualizer_smoke.py
      tests\test_visualizer_accessibility.py
      tests\test_visualizer_visual_regression.py -q` passed: 7 tests.
    - `git diff --check` passed with only Git line-ending normalization
      warnings.

## Task 5: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read state files and review checklist before critique.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` immediately before critique.
- [x] DONE: Run critique focused on usability, modeling clarity, source
      boundaries, code quality, test reliability, CI artifact usability, and
      visual regression portability.
  - Proof:
    - Audited source/model/schema/docs/test diff for end-to-end field
      consistency, local-model boundary clarity, generated artifact freshness,
      browser export coverage, and visualizer mixed/legacy payload behavior.
- [x] DONE: Fix important findings and re-run affected verification.
  - Proof:
    - Fixed Contention Insight to avoid selecting a non-finite highest
      bandwidth-utilization artifact from legacy/external payloads.
    - Expanded the Contention Insight note to explicitly label
      utilization/headroom as compute-window bytes versus contention-adjusted
      effective bandwidth.
    - Re-ran visualizer/browser focused tests, generated JS syntax check, and
      artifact freshness after the fix.

## Task 6: Final Closeout

- [ ] TODO: Confirm all three objectives have meaningful implementation and
      proof.
- [ ] TODO: Update state files and `tasks/todo.md` to final DONE state.
- [ ] TODO: Record PR URL, commit hashes, verification, GBrain note, and
      remaining risks.
