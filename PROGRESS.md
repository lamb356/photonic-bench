# PhotonicBench Advanced Visualizer Progress

## 2026-07-04 Cycle 0: State Rollforward And Initial Checklist

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of Cycle 0.
- Re-read `tasks/todo.md`.

### Tooling, Memory, GBrain, And Skill Context

- Attempted to create the active Codex goal record, but this thread already had
  the same unfinished goal active.
- Confirmed the active goal with `get_goal`.
- Searched local memory `MEMORY.md` for PhotonicBench/visualizer context; it
  returned no hits.
- Searched deferred tools for GBrain and exposed the GBrain MCP tools.
- Called `mcp__gbrain__get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `12`;
  - chunk count `12`.
- Queried GBrain for PhotonicBench visualizer/comparison context; it returned
  no prior hits.
- Wrote GBrain page
  `photonicbench-visualizer-advanced-usability-loop-2026-07-04` with the goal,
  rules, and stop condition.
- Read frontend-design skill instructions from
  `C:\Users\burba\.agents\skills\frontend-design\SKILL.md`.

### Initial Repository Status

- Current branch:
  `codex/pr4-followup-improvements`.
- `git status --short --branch` showed modified files from the previous
  visualizer-usability loop.
- Recent baseline commits:
  - `c59f85d` `Close PR4 follow-up improvement state`;
  - `9c96ac6` `Deepen contention modeling and visualizer analysis`;
  - `216950c` `Merge pull request #4 from lamb356/codex/artifact-freshness-profiles`.

### State File Rollforward

- Replaced the previous completed-loop state in `GOAL.md`, `CHECKLIST.md`,
  `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` with an active control set for
  the 10 new tasks.
- Added a granular checklist that breaks every required task into
  implementation, verification, and documentation steps.
- Updated `tasks/todo.md` with the active goal section and preserved older
  completed goals as history.

### Immediate Next Steps

- Inspect the current uncommitted diff from the previous loop.
- Run required checks before task 1 commit/push/PR.
- Map the visualizer state and test surfaces needed for tasks 2-10.

## 2026-07-04 Cycle 1: Commit, Push, And Draft PR

### Required State Re-Read

- Cycle 1 continued immediately after the Cycle 0 state rollforward and used
  the freshly updated state files as the control set.

### Diff Scope

- Reviewed the current diff with `git diff --stat` and changed file names.
- The staged scope was limited to:
  - visualizer source assets;
  - generated visualizer output;
  - README and JSON schema docs;
  - visualizer unit and smoke tests;
  - goal/checklist/context/progress/rubric/todo state files.

### Publish Gates Before Push

- `python -m ruff check` passed:
  `All checks passed!`
- `python -m pytest -q` passed:
  `119 passed`.
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `gh --version` passed with GitHub CLI `2.87.2`.
- `gh auth status` passed for GitHub account `lamb356`.

### Commit, Push, And PR

- Created commit `79259f7`:
  `Improve visualizer comparison ergonomics`.
- Checked for the optional commit-reasoning helper from the commit skill:
  `.Codex\scripts\generate-reasoning.sh` is not present in this repo.
- Pushed the branch:
  `git push -u origin codex/pr4-followup-improvements`.
- Opened draft PR #5 to `master`:
  `https://github.com/lamb356/photonic-bench/pull/5`.

### Next Steps

- Continue implementing tasks 2-10 on the same branch and push follow-up
  commits to PR #5.

## 2026-07-04 Cycle 2: Advanced Visualizer Implementation

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md` before implementation.

### Implemented Tasks 2-10

- Added shareable URL state for filters, selected artifact, selected
  comparison IDs, pinned reference, focus mode, Pareto mode, and custom score
  weights. URL updates use debounced `history.replaceState`.
- Added custom score weights with browser-local persistence and URL
  serialization.
- Replaced unweighted recommendation scoring with `decisionScoreExplanation`,
  feeding recommendation cards, scorecards, JSON export, Markdown export, CSV
  export, and the UI drilldown.
- Added `Explain score` drilldowns showing raw values, normalized values,
  weights, contributions, and final weighted score.
- Added the comparison `Selection Drawer` with remove one, clear schema group,
  invert visible selection, and compare top N visible actions.
- Improved wide-table behavior with sticky headers and sticky first columns in
  scroll containers.
- Added formal schema
  `docs/photonic-bench-comparison-export-v1.schema.json`.
- Added browser-local preset export/import for
  `photonic-bench-comparison-presets-v1` payloads with validation.
- Added accessibility improvements:
  - compare checkbox and pin-button ARIA labels;
  - mode-tab `aria-pressed`;
  - native `details`/`summary` score drilldowns;
  - stronger focus-visible outlines;
  - reduced-motion CSS.
- Added Playwright visual regression tests for desktop and mobile comparison
  views with checked PNG baselines:
  - `tests/visual_baselines/desktop-comparison.png`;
  - `tests/visual_baselines/mobile-comparison.png`.
- Added `Pillow` and `jsonschema` as development dependencies.

### Documentation And Generated Artifacts

- Updated `README.md` for shareable URLs, score explanations, custom weights,
  selection drawer, sticky comparison tables, comparison export schema,
  browser-local preset import/export, accessibility behavior, and visual
  regression workflow.
- Updated `docs/json_schema.md` with comparison export schema fields.
- Regenerated checked visualizer artifacts with:
  `python -c "from photonic_bench.artifacts import regenerate_checked_artifacts; regenerate_checked_artifacts()"`.

### Focused Verification

- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `python -m pytest tests\test_visualizer.py tests\test_schema_docs.py -q`
  passed: `15 passed`.
- `python -m pytest tests\test_visualizer_smoke.py -q` passed: `1 passed`.
  The smoke validates the downloaded comparison export against
  `docs/photonic-bench-comparison-export-v1.schema.json` with
  `jsonschema.validate`.
- `python -m pytest tests\test_visualizer_visual_regression.py -q` passed:
  `2 passed`.
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`

### Notes From Implementation

- Exact PNG byte comparison was too brittle immediately after baseline
  generation, so visual regression compares decoded RGBA pixels with tight
  tolerance.
- Local `file:` visualizer pages may not allow clipboard writes, so `Copy state
  link` now gives deterministic `Shareable link` feedback before optional
  clipboard success.

## 2026-07-04 Cycle 3: Mandatory Hostile Senior Reviewer Critique

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md`.
- Read review skill:
  `C:\Users\burba\.agents\skills\review\SKILL.md`.
- Read review checklist:
  `C:\Users\burba\.agents\skills\review\checklist.md`.
- The review skill assumes `main`; this repository uses `master`, so the PR
  diff was inspected against `origin/master` and the current implementation
  diff was reviewed directly.

### Critique Findings

Pre-Landing Review: 2 issues (0 critical, 2 informational)

**Issues** (non-blocking):

- `photonic_bench/visualizer_assets/app.js`: the selection drawer's top-N
  input reset to the default on each render, which made repeated selection
  management feel inconsistent after actions that rerender the comparison.
  Fix: preserve the chosen top-N count in visualizer state.

- `photonic_bench/visualizer_assets/app.js`: repeated `Clear group` buttons
  had the same accessible name, making screen-reader and strict browser-test
  targeting less specific.
  Fix: add group-specific ARIA labels while keeping visible text compact.

### Critique Fix Verification

- Fixed both findings.
- Regenerated checked visualizer artifacts.
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `python -m pytest tests\test_visualizer_smoke.py -q` passed:
  `1 passed`.
- `python -m pytest tests\test_visualizer_visual_regression.py -q` passed:
  `2 passed`.
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`

## 2026-07-04 Cycle 4: Final Verification And Closeout

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md` before final verification.

### Final Gate Results

- Regenerated checked artifacts with:
  `python -c "from photonic_bench.artifacts import regenerate_checked_artifacts; regenerate_checked_artifacts()"`.
- `python -m pytest tests\test_visualizer.py tests\test_schema_docs.py tests\test_visualizer_smoke.py tests\test_visualizer_visual_regression.py -q`
  passed: `18 passed`.
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `python -m ruff check` passed:
  `All checks passed!`
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`
- `git diff --check` passed. Git printed line-ending normalization warnings
  only.
- `python -m pytest -q` passed:
  `122 passed`.

### Closeout

- Marked `GOAL.md` implementation status complete.
- Marked all `CHECKLIST.md` items DONE with proof.
- Updated `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` for
  final closeout.
- Remaining work is repository publication housekeeping: commit, push, and
  inspect PR #5 branch status.

## 2026-07-04 Cycle 5: Post-Push CI Follow-Up

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Re-read `tasks/todo.md`.

### Live PR And CI State

- `git status --short --branch` showed the local branch synced with
  `origin/codex/pr4-followup-improvements` before the CI fix.
- `gh pr view 5 --json number,title,url,state,isDraft,headRefName,baseRefName,mergeable`
  reported PR #5 open, ready for review, mergeable, and targeting `master`.
- `gh pr checks 5 --watch=false` reported failed check
  `Ruff, package, and pytest`.

### CI Failure Root Cause

- Inspected the failed job with:
  `gh run view 28702327116 --job 85122281383 --log-failed`.
- The job reached pytest and failed only the two visual regression screenshot
  cases:
  - `desktop-comparison`: exact pixel max delta `255`;
  - `mobile-comparison`: exact pixel max delta `244`.
- Root cause: the first checked baselines were generated on Windows, while CI
  renders Chromium screenshots on Ubuntu. Strict `max_delta <= 2` pixel
  comparison was too brittle for cross-platform font and antialiasing
  differences.

### Fix

- Updated `tests/test_visualizer_visual_regression.py`:
  - keep exact pixel matching for identical renderers;
  - add downsampled, blurred perceptual mean/RMS/changed-ratio thresholds as
    the fallback path;
  - keep failure output numeric so future UI regressions are diagnosable.
- Updated `README.md` to document the exact-match plus perceptual-fallback
  behavior.
- Updated state files to record the CI follow-up.

### Verification

- `python -m pytest tests\test_visualizer_visual_regression.py -q` passed:
  `2 passed`.
- `python -m ruff check tests\test_visualizer_visual_regression.py` passed:
  `All checks passed!`.
- Full follow-up gate passed:
  - `python -m pytest -q`: `122 passed`;
  - `python -m ruff check`: `All checks passed!`;
  - `python -m photonic_bench.cli verify-artifacts`:
    `Artifacts are fresh: checked 226 generated files.`;
  - `node --check photonic_bench\visualizer_assets\app.js`: passed;
  - `git diff --check`: passed with Git line-ending normalization warnings
    only.

### Next Steps

- Commit, push, and verify the replacement GitHub Actions check on PR #5.

## 2026-07-04 Cycle 6: GitHub Linux Visual Baselines For CI

### Replacement CI Result

- Pushed commit `0f53ad2`:
  `Stabilize visual regression checks in CI`.
- GitHub Actions run `28705170169`, job `85129549827`, still failed one case:
  - `desktop-comparison`: passed;
  - `mobile-comparison`: failed with exact changed ratio `0.4310`,
    perceptual mean delta `17.58`, RMS delta `29.64`, and perceptual changed
    ratio `0.3271`.
- Conclusion: a global threshold broad enough for mobile Ubuntu would be too
  permissive. The better fix is to carry renderer-specific checked baselines
  for CI.

### Fix

- Updated `tests/test_visualizer_visual_regression.py` so
  `baseline_path_for()` prefers `tests/visual_baselines/<platform-key>/` when
  a matching baseline key exists.
- Preserved the original generic baselines as the fallback path for local
  platforms without specific baselines.
- Generated initial Linux baselines from WSL, then replaced them with
  GitHub-rendered screenshots downloaded from the CI failure artifact.
  The checked CI baselines are:
  - `tests/visual_baselines/github-linux/desktop-comparison.png`;
  - `tests/visual_baselines/github-linux/mobile-comparison.png`.
- Added `VISUAL_REGRESSION_OUTPUT_DIR` support in the test and configured CI
  to upload `test-results/visual-regression/*.png` on failure.
- Downloaded the `visual-regression-screenshots` artifact from GitHub Actions
  run `28705465516` and used those PNGs as the `github-linux` baselines.
- GitHub Linux baseline SHA-256 hashes:
  - desktop:
    `21d8cd041f9073d979366d0bf1ef99a920a0bb6901720bea72f5724204913960`;
  - mobile:
    `16702d23155f6cb6773b520743b18e0d3fa1ce4614a69b55c93c87a8ac6762f5`.
- Removed the accidental local `.venv` and `uv.lock` created by the WSL
  package runner. Windows Git status confirmed they were gone.
- Updated `README.md`, `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`,
  `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` to describe
  renderer-specific visual baselines.

### Verification

- WSL Linux baseline generation and visual regression run passed:
  `2 passed`.
- WSL Linux visual regression without baseline updates passed:
  `2 passed`.
- Windows visual regression run passed:
  `python -m pytest tests\test_visualizer_visual_regression.py -q`:
  `2 passed`.
- Targeted Ruff passed:
  `python -m ruff check tests\test_visualizer_visual_regression.py`:
  `All checks passed!`.
- Full local gate passed:
  - `python -m pytest -q`: `122 passed`;
  - `python -m ruff check`: `All checks passed!`;
  - `python -m build`: passed;
  - `python -m photonic_bench.cli verify-artifacts`:
    `Artifacts are fresh: checked 226 generated files.`;
  - `node --check photonic_bench\visualizer_assets\app.js`: passed;
  - `git diff --check`: passed with Git line-ending normalization warnings
    only.
- Re-ran the full local gate after replacing the WSL baselines with
  GitHub-rendered baselines from run `28705465516`; all commands above still
  passed.

### Next Steps

- Commit, push, and verify the GitHub Actions replacement check on PR #5.
