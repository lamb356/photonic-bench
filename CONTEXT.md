# PhotonicBench Advanced Visualizer Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch at Cycle 0 start: `codex/pr4-followup-improvements`
- Base branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`
  - `master` tracks `origin/master`
- Recent baseline commits:
  - `c59f85d` `Close PR4 follow-up improvement state`
  - `9c96ac6` `Deepen contention modeling and visualizer analysis`
  - `216950c` `Merge pull request #4 from lamb356/codex/artifact-freshness-profiles`
- The working tree starts with uncommitted changes from the previous completed
  visualizer-usability loop. Task 1 must verify, commit, push, and open a PR for
  that current work before the branch is considered review-ready.

## Current Visualizer Surface

- `photonic_bench/visualizer.py` discovers schema-aware JSON artifacts, writes
  a lightweight index, emits lazy payloads, and renders the static HTML shell.
- `photonic_bench/visualizer_assets/template.html` defines the rail, filters,
  preset controls, external JSON loader, mode tabs, and detail mount.
- `photonic_bench/visualizer_assets/app.js` implements:
  - detail and comparison modes;
  - generated and browser-local comparison presets;
  - external JSON loading diagnostics;
  - rail search, schema, boundary, source-quality, grouping, and sorting;
  - compare-visible and reset-filter actions;
  - side-by-side comparison matrix;
  - comparison workspace panel, recommendations, scorecards, Pareto chart,
    contention insight, schema compatibility, grouped same-schema analytics,
    and JSON/Markdown/CSV exports.
- `photonic_bench/visualizer_assets/styles.css` implements the dense workbench
  styling.
- Checked static output lives under `reports/visualizer/`.
- Preset sidecar: `reports/visualizer_presets.json`.

## Active Improvement Direction

- Make the visualizer state shareable through stable URLs.
- Add screenshot-based regression coverage so UI changes become reviewable and
  harder to regress.
- Make recommendation scores transparent and tunable.
- Improve large comparison management with selection drawer controls and sticky
  table affordances.
- Formalize the comparison export schema.
- Allow browser-local preset import/export without breaking generated presets.
- Improve accessibility without reducing the dense workbench feel.

## Required State Discipline

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Before marking an item DONE, verify the change in source, generated
  visualizer output, tests, and docs as appropriate.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  implementation and fix important findings.

## Out Of Scope

- Hosted backend web service.
- Formal MLCommons submission.
- Release publishing automation.

## Final Closeout State

- Implementation status: complete.
- Draft PR #5 is open against `master`:
  `https://github.com/lamb356/photonic-bench/pull/5`.
- Completed visualizer improvements:
  - shareable URL state;
  - desktop/mobile visual regression tests and baselines;
  - explain-score drilldowns;
  - custom score weights;
  - selection drawer controls;
  - sticky comparison headers and first columns;
  - formal comparison export JSON schema;
  - browser-local preset import/export;
  - accessibility pass.
- Mandatory Hostile Senior Reviewer critique completed with two non-critical
  findings, both fixed.
- Final gates passed: focused visualizer tests, browser smoke, visual
  regression, JavaScript syntax, Ruff, full pytest, artifact freshness, and
  `git diff --check`.
