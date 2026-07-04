# PhotonicBench Production-Ready Review Progress

## 2026-07-04 Cycle 0: State Rollforward And Context Re-Read

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Re-read `tasks/todo.md`.

### GBrain And Memory

- Called GBrain `get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `41`;
  - chunk count `41`.
- Queried/searched GBrain for PhotonicBench decision-grade, PR, visualizer,
  memory-scenario, schema, and release context.
- Read GBrain page:
  - `photonicbench-decision-grade-analysis-tool-2026-07-04`.
- Read GBrain page:
  - `photonicbench-pr9-bandwidth-headroom-followup-2026-07-04`.
- Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
  generated artifact, and outer-loop workflow guidance.

### Repository State

- Current branch:
  - `codex/decision-grade-analysis-tool`.
- Current worktree:
  - dirty with the previous locally verified decision-grade implementation;
  - includes updated source, docs, schemas, tests, generated reports, visualizer
    payloads, and visual baselines;
  - includes untracked decision-packet schema, reviewer workflow doc, new YAML
    examples, and generated reports/payloads.

### State Rollforward

- Replaced the completed four-workstream goal state with this new active
  production-readiness goal.
- Created a proof-oriented checklist covering all 10 user-required tasks plus
  mandatory hostile review and final verification.
- Updated `tasks/todo.md` to preserve the previous decision-grade goal as
  completed and make this goal active.

### Next Execution Order

1. Review dirty branch content and run fast local gates.
2. Commit current decision-grade implementation in clean logical commits.
3. Push `codex/decision-grade-analysis-tool` and open PR to `master`.
4. Implement decision-packet replay and scenario sensitivity dashboard.
5. Add provenance packs, source audits, extra memory-stressing cards, schema
   policy, PR template, docs, generated artifacts, tests, remote CI artifact
   inspection, hostile review, merge, and release candidate note/tag.

## 2026-07-04 Cycle 1: Commit, Push, And PR Opened

### Local Publish Gates

- `python -m ruff check`: passed.
- `python -m pytest -q`: passed, 134 tests.
- `python -m build`: passed.
- `python -m photonic_bench.cli verify-artifacts`: passed, 278 generated files
  fresh.
- `python -m photonic_bench.cli validate-examples --json`: passed, 40 checked
  and 40 ok.
- `node --check photonic_bench\visualizer_assets\app.js`: passed.
- `node --check reports\visualizer\assets\app.js`: passed.
- `.github/workflows/ci.yml` parsed with PyYAML.
- `git diff --check`: passed with only line-ending normalization warnings.

### Commits

- `192a630 Add decision-grade analysis workflow`
  - Contains implementation, docs, tests, schemas, generated reports,
    visualizer payloads, visual baselines, and new source-backed cards from the
    previous locally verified decision-grade pass.
- `ebcee8c Roll production review state`
  - Contains active state-file rollforward for this production-ready follow-up
    loop.

### Pull Request

- Pushed `codex/decision-grade-analysis-tool` to `origin`.
- Opened draft PR #11:
  `https://github.com/lamb356/photonic-bench/pull/11`.
- PR is intentionally draft while the remaining production-readiness tasks are
  implemented on the same branch.

## 2026-07-04 Cycle 2: First Remote CI And Screenshot Artifact Inspection

### Remote CI Run `28717081779`

- PR #11 triggered CI run `28717081779`.
- `Ruff, package, and pytest` failed only in
  `tests/test_visualizer_visual_regression.py` for
  `mobile-comparison.png`.
- `macOS visual regression` failed only in
  `tests/test_visualizer_visual_regression.py` for
  `mobile-comparison.png`.
- All other screenshot cases in both jobs passed.

### Screenshot Artifacts Downloaded And Inspected

- Downloaded artifact `visual-regression-screenshots` to:
  `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28717081779\linux`.
- Downloaded artifact `macos-visual-regression-screenshots` to:
  `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28717081779\macos`.
- Inspected the failing Linux and macOS `mobile-comparison.png` screenshots.
  They showed the intended new mobile recommendation explanation and scorecard
  content with no horizontal overflow.

### Fix

- Promoted only the platform-specific failing mobile baselines:
  - `tests/visual_baselines/github-linux/mobile-comparison.png`
  - `tests/visual_baselines/macos/mobile-comparison.png`
- Hash proof:
  - Linux CI artifact and checked baseline:
    `37be07f875424b97f3b84436f77219563e31ea616657c1e358e800744b5a1bd4`.
  - macOS CI artifact and checked baseline:
    `1ff6b88ccbc908c02007a33d52bc7fa5a46678dcd2961109f556b0c2aa62ead6`.
- Local default visual-regression verification after promotion:
  - `python -m pytest tests\test_visualizer_visual_regression.py -q`: passed,
    5 tests.

### Pending

- Completed by commit `c2ad0d7 Promote remote mobile visual baselines`.

## 2026-07-04 Cycle 3: Green Remote CI And Screenshot Artifact Inspection

### Remote CI Run `28717165055`

- PR #11 follow-up CI run:
  `https://github.com/lamb356/photonic-bench/actions/runs/28717165055`.
- Head commit: `c2ad0d7d5cee8fa6730951c88bc98cdf11fe36d4`.
- `Ruff, package, and pytest`: passed.
- `macOS visual regression`: passed.
- PR #11 remained open, draft, and mergeable after the run:
  `https://github.com/lamb356/photonic-bench/pull/11`.

### Green-Run Screenshot Artifact Inspection

- Downloaded `visual-regression-screenshots` from run `28717165055`:
  - `desktop-comparison.png`
  - `detail-published-reference.png`
  - `external-report-error.png`
  - `mobile-comparison.png`
  - `wide-transformer-comparison.png`
- Downloaded `macos-visual-regression-screenshots` from run `28717165055`:
  - macOS actual screenshots for the same five cases;
  - checked macOS baseline images included by the artifact path.
- Built temporary contact sheets for Linux and macOS artifacts and inspected the
  rendered views.
- Inspection result:
  - desktop comparison, detail view, external-report error state, mobile
    comparison, and wide transformer comparison all rendered coherently;
  - mobile comparison showed the expanded recommendation explanation and
    scorecard without horizontal overflow;
  - no screenshot artifact suggested a missing asset, blank panel, or broken
    local-file visualizer path.

### Task 2 Status

- Remote CI and screenshot artifact inspection are complete for the current PR
  head before the next feature work begins.

## 2026-07-04 Cycle 4: Decision Replay And Scenario Sensitivity

### Scenario Sensitivity Dashboard

- Added a static Scenario Sensitivity Dashboard to the visualizer.
- The dashboard selects a dedicated `profile_sensitivity_*` subject and compares
  checked same-workload artifacts across memory scenarios and contention
  presets.
- Rows include:
  - system energy/op;
  - contention-adjusted latency;
  - contention-adjusted throughput;
  - effective usable bandwidth under load;
  - guardbanded usable bandwidth;
  - bottleneck tier;
  - bandwidth utilization;
  - bandwidth headroom;
  - energy/latency deltas and throughput ratio against the selected subject.
- Dashboard wording explicitly labels the table as a local-model sweep over
  generated artifacts, not a measured hardware sweep.
- During implementation, an accidental same-shape pair from unrelated published
  cards was found and excluded by narrowing the dashboard to the dedicated
  `profile_sensitivity_*` family.

### Decision-Packet Import And Replay

- Added rail support for importing `photonic-bench-decision-packet-v1` JSON via
  file picker or drag/drop.
- Replay validates schema version and restores selected artifact IDs, pinned
  baseline, analysis focus, score weights, filters, Pareto mode, reviewer
  notes, and comparison mode against the live generated index.
- Stale artifact IDs are reported in the rail message and in the Decision
  Packet Replay panel rather than silently ignored.
- The replay panel records source file, schema version, restored artifact
  count, pinned baseline, checklist snapshot count, packet generation time,
  replay time, and missing artifact IDs.

### Documentation And Generated Artifacts

- Updated README visualizer documentation for scenario sensitivity and decision
  packet replay.
- Updated `docs/reviewer_workflow.md` with reviewer replay checks and
  sensitivity-dashboard checks.
- Updated `docs/json_schema.md` to document packet replay semantics.
- Regenerated checked visualizer outputs under `reports/visualizer/**`.

### Focused Verification

- `node --check photonic_bench\visualizer_assets\app.js`: passed.
- `node --check reports\visualizer\assets\app.js`: passed.
- `python -m photonic_bench.cli verify-artifacts`: passed, 278 generated files
  fresh.
- `python -m pytest tests\test_visualizer_smoke.py -q`: passed.
- `python -m pytest tests\test_visualizer_smoke.py tests\test_visualizer_accessibility.py -q`:
  passed.
- `python -m pytest tests\test_visualizer_visual_regression.py -q`: passed.

### Task Status

- Task 4 is DONE with focused browser and visual-regression proof.
- Task 5 is DONE with focused browser proof for restored state and stale-ID
  handling.
