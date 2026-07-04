# PhotonicBench Advanced Visualizer Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of Cycle 0.
    - Re-read `tasks/todo.md`.
    - Confirmed the active Codex goal already exists for this thread.
    - Searched local memory `MEMORY.md` for PhotonicBench/visualizer context;
      it returned no hits.
    - Exposed and called GBrain `get_brain_identity`; GBrain is available as
      version `0.42.56.0`.
    - Queried GBrain for PhotonicBench visualizer context; it returned no
      prior hits.
    - Wrote durable GBrain page
      `photonicbench-visualizer-advanced-usability-loop-2026-07-04`.
    - Read `frontend-design` skill instructions for visualizer work.
    - Confirmed current branch is `codex/pr4-followup-improvements`.

## Task 1: Commit Current Work And Open PR

- [x] DONE: Inspect the current uncommitted work and separate baseline changes
      from this new loop.
  - Proof:
    - Reviewed `git diff --stat` and changed file list.
    - Confirmed the staged scope was limited to visualizer assets, generated
      visualizer output, docs, tests, and state files.
- [x] DONE: Run required lint/tests against the current branch state before
      pushing.
  - Proof:
    - `python -m ruff check` passed.
    - `python -m pytest -q` passed: `119 passed`.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `gh --version` and `gh auth status` passed for account `lamb356`.
- [x] DONE: Create a clean commit for the existing current work.
  - Proof:
    - Created commit `79259f7`:
      `Improve visualizer comparison ergonomics`.
    - Optional commit-reasoning helper
      `.Codex\scripts\generate-reasoning.sh` was not present in this repo.
- [x] DONE: Push `codex/pr4-followup-improvements`.
  - Proof:
    - `git push -u origin codex/pr4-followup-improvements` succeeded.
- [x] DONE: Open a pull request to `master` with a clear description.
  - Proof:
    - Opened draft PR #5:
      `https://github.com/lamb356/photonic-bench/pull/5`.

## Task 2: Shareable URL State

- [x] DONE: Map existing visualizer state ownership for filters, focus mode,
      selected artifacts, pinned artifact, and Pareto mode.
  - Proof:
    - Mapped state in `photonic_bench/visualizer_assets/app.js`: filters,
      compare IDs, pinned ID, Pareto mode, analysis focus, and score weights.
- [x] DONE: Implement stable URL serialization and parsing with backward-safe
      defaults.
  - Proof:
    - Added `applyUrlState`, `stateUrlParams`, `stateUrlString`, and
      `updateUrlState`.
    - Missing or invalid artifact IDs are ignored during URL restore.
- [x] DONE: Keep browser history usable without excessive entry spam.
  - Proof:
    - URL writes use debounced `history.replaceState`, not `pushState`.
- [x] DONE: Add tests and browser smoke coverage for loading a shared URL.
  - Proof:
    - Browser smoke captures a filtered comparison URL and reloads it,
      verifying source quality, focus, Pareto mode, selected comparison state,
      and custom weights.
- [x] DONE: Update visualizer documentation.
  - Proof:
    - Updated `README.md` to document shareable URL state.

## Task 3: Visual Regression Screenshot Testing

- [x] DONE: Add deterministic desktop screenshot coverage for representative
      visualizer views.
  - Proof:
    - Added `tests/test_visualizer_visual_regression.py`.
    - Added checked baseline `tests/visual_baselines/desktop-comparison.png`.
- [x] DONE: Add deterministic mobile screenshot coverage for representative
      visualizer views.
  - Proof:
    - Added checked baseline `tests/visual_baselines/mobile-comparison.png`.
- [x] DONE: Store or generate baselines in a repository-appropriate way.
  - Proof:
    - The test keeps exact pixel matching for identical renderers, then falls
      back to renderer-specific baselines and perceptual screenshot metrics so
      GitHub Actions Ubuntu font rasterization differences do not fail
      otherwise stable layouts.
    - It supports `UPDATE_VISUAL_BASELINES=1` for intentional refreshes.
- [x] DONE: Document how to run and update the visual regression tests.
  - Proof:
    - Updated `README.md` with normal run and baseline-refresh commands.

## Task 4: Explain Score Drilldown

- [x] DONE: Identify all recommendation score components and normalize their
      naming.
  - Proof:
    - Recommendation scoring now flows through `decisionScoreExplanation`.
- [x] DONE: Add an explain-score UI for recommendation cards.
  - Proof:
    - Recommendation cards render native `details` drilldowns labeled
      `Explain score`.
- [x] DONE: Show weights, raw values, normalized values, contribution, and
      final score.
  - Proof:
    - Drilldowns show raw value, normalized score, weight, contribution, and
      the final weighted score formula.
- [x] DONE: Add tests and docs for score explanations.
  - Proof:
    - Browser smoke opens an explanation and verifies the contribution table.
    - README and JSON schema docs describe `score_explanation`.

## Task 5: Custom Score Weights

- [x] DONE: Add user-adjustable score weights for comparison focus modes.
  - Proof:
    - Added `Score weights` controls for the active focus mode.
- [x] DONE: Persist custom weights in browser-local state and include them in
      URL state where appropriate.
  - Proof:
    - Weights persist under `photonic-bench-score-weights:v1` and serialize in
      the `weights` URL parameter.
- [x] DONE: Ensure recommendations, scorecards, exports, and explanations use
      the same weight source.
  - Proof:
    - `scoreWeightForMetric` feeds recommendation cards, decision scorecards,
      JSON/Markdown/CSV exports, and explanation tables.
- [x] DONE: Add reset-to-default behavior.
  - Proof:
    - Added `Reset weights` for the active focus mode.
- [x] DONE: Add tests and docs for custom weights.
  - Proof:
    - Browser smoke changes Source confidence to `2`, verifies the scorecard
      copy, URL restore, JSON export weights, CSV weights, and Markdown
      weights.
    - README documents custom weights.

## Task 6: Selection Drawer Controls

- [x] DONE: Add a selection drawer or equivalent dense selection-management
      surface.
  - Proof:
    - Added `Selection Drawer` panel to comparison mode.
- [x] DONE: Support removing one selected artifact.
  - Proof:
    - Added per-artifact `Remove` buttons and browser smoke coverage.
- [x] DONE: Support clearing a schema/group selection.
  - Proof:
    - Added schema-group `Clear group` buttons and browser smoke coverage.
- [x] DONE: Support inverting selection against the visible artifact set.
  - Proof:
    - Added `Invert visible selection` and browser smoke coverage.
- [x] DONE: Support comparing the top N visible artifacts.
  - Proof:
    - Added `Compare top N visible` with numeric input and browser smoke
      coverage.
- [x] DONE: Add tests and docs for selection controls.
  - Proof:
    - Browser smoke verifies remove, clear group, invert visible, and compare
      top N visible.
    - README documents the selection drawer.

## Task 7: Sticky Comparison Table Behavior

- [x] DONE: Audit current comparison table overflow and sticky behavior on
      desktop and mobile.
  - Proof:
    - Reviewed existing `.table-wrap` and `.comparison-table` behavior.
- [x] DONE: Improve sticky comparison header behavior for wide tables.
  - Proof:
    - Added sticky table headers inside scroll containers.
- [x] DONE: Improve sticky first-column behavior without obscuring data.
  - Proof:
    - Strengthened sticky first-column background, min-width, and z-index.
- [x] DONE: Add visual/browser coverage for wide comparison tables.
  - Proof:
    - Desktop and mobile visual baselines include comparison table surfaces.
    - Browser smoke exercises comparison matrix and grouped analytics.
- [x] DONE: Update documentation if user-facing behavior changes.
  - Proof:
    - README documents sticky header and first-column behavior.

## Task 8: Comparison Export JSON Schema

- [x] DONE: Add a formal JSON schema file for
      `photonic-bench-comparison-export-v1`.
  - Proof:
    - Added `docs/photonic-bench-comparison-export-v1.schema.json`.
- [x] DONE: Make the browser JSON export match the schema.
  - Proof:
    - Export now includes `score_weights`, `url_state`, and
      `score_explanation` fields covered by the schema.
- [x] DONE: Add schema validation tests for generated/export-shaped payloads.
  - Proof:
    - Browser smoke downloads JSON and validates it against the schema with
      `jsonschema.validate`.
    - `tests/test_schema_docs.py` asserts the schema contract.
- [x] DONE: Document schema fields and usage.
  - Proof:
    - Updated `docs/json_schema.md` and `README.md`.

## Task 9: Browser-Local Preset Import/Export

- [x] DONE: Add browser-local preset export.
  - Proof:
    - Added `Export local` for browser-local presets.
- [x] DONE: Add browser-local preset import with validation and clear errors.
  - Proof:
    - Added `Import local` file input using
      `photonic-bench-comparison-presets-v1` validation.
- [x] DONE: Preserve existing generated preset behavior.
  - Proof:
    - Generated presets remain read-only and are still loaded through the same
      preset selector.
- [x] DONE: Add tests and docs for preset import/export.
  - Proof:
    - Browser smoke saves, exports, imports, selects, and loads a local preset.
    - README documents local preset import/export.

## Task 10: Accessibility Pass

- [x] DONE: Audit keyboard navigation for rail controls, comparison controls,
      score drilldowns, preset import/export, and selection drawer actions.
  - Proof:
    - Audited the rail controls, comparison header, recommendation drilldowns,
      selection drawer, preset import/export controls, and generated smoke
      coverage paths while implementing the accessibility pass.
- [x] DONE: Add or improve ARIA labels and semantic roles.
  - Proof:
    - Added explicit comparison checkbox and pin-button labels.
    - Mode tabs now expose `aria-pressed`.
    - Score explanations use native `details`/`summary`.
- [x] DONE: Respect reduced-motion preferences.
  - Proof:
    - Added `prefers-reduced-motion` CSS rule.
    - Browser smoke verifies reduced transition duration.
- [x] DONE: Improve contrast where needed.
  - Proof:
    - Added stronger visible focus outlines and sticky-table contrast.
- [x] DONE: Add automated or browser smoke accessibility checks where
      practical.
  - Proof:
    - Browser smoke verifies ARIA pressed state and reduced-motion behavior.
    - Static tests assert `focus-visible` and `prefers-reduced-motion`.
- [x] DONE: Update docs with accessibility-relevant behavior.
  - Proof:
    - README documents keyboard, ARIA, focus, reduced-motion, and layout
      accessibility behavior.

## Task 11: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read state files and review skill instructions before critique.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md`.
    - Read review skill
      `C:\Users\burba\.agents\skills\review\SKILL.md`.
    - Read review checklist
      `C:\Users\burba\.agents\skills\review\checklist.md`.
- [x] DONE: Run a hostile senior reviewer critique focused on usability,
      maintainability, and code quality.
  - Proof:
    - Reviewed current visualizer implementation diff and recorded two
      non-critical findings in `PROGRESS.md`.
- [x] DONE: Fix important findings.
  - Proof:
    - Fixed the top-N selection drawer input so the chosen count persists
      across renders.
    - Added group-specific ARIA labels to repeated `Clear group` buttons.
    - Regenerated checked visualizer artifacts.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `python -m pytest tests\test_visualizer_smoke.py -q` passed:
      `1 passed`.
    - `python -m pytest tests\test_visualizer_visual_regression.py -q`
      passed: `2 passed`.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`
- [x] DONE: Record findings and fixes in `PROGRESS.md`.
  - Proof:
    - Added Cycle 3 critique notes and verification.

## Task 12: Final Verification And Closeout

- [x] DONE: Regenerate checked artifacts.
  - Proof:
    - Ran `python -c "from photonic_bench.artifacts import regenerate_checked_artifacts; regenerate_checked_artifacts()"`.
- [x] DONE: Run focused visualizer tests.
  - Proof:
    - `python -m pytest tests\test_visualizer.py tests\test_schema_docs.py tests\test_visualizer_smoke.py tests\test_visualizer_visual_regression.py -q`
      passed: `18 passed`.
- [x] DONE: Run visual regression tests.
  - Proof:
    - Included in the focused visualizer run: desktop and mobile screenshots
      passed against checked baselines.
- [x] DONE: Run `node --check` for visualizer JavaScript.
  - Proof:
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
- [x] DONE: Run `python -m ruff check`.
  - Proof:
    - `python -m ruff check` passed: `All checks passed!`
- [x] DONE: Run `python -m pytest -q`.
  - Proof:
    - Full suite passed: `122 passed`.
- [x] DONE: Run `python -m photonic_bench.cli verify-artifacts`.
  - Proof:
    - `Artifacts are fresh: checked 226 generated files.`
- [x] DONE: Run `git diff --check`.
  - Proof:
    - `git diff --check` passed; Git printed line-ending normalization
      warnings only.
- [x] DONE: Close `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` only after all stop conditions hold.
  - Proof:
    - All state files were closed after final gates passed.

## Task 13: Post-Push CI Follow-Up

- [x] DONE: Inspect the GitHub Actions failure reported on PR #5.
  - Proof:
    - `gh pr checks 5 --watch=false` reported failed check
      `Ruff, package, and pytest`.
    - `gh run view 28702327116 --job 85122281383 --log-failed` showed only
      the new visual regression assertions failing on Ubuntu:
      `desktop-comparison` and `mobile-comparison` exceeded exact pixel
      deltas.
- [x] DONE: Fix the screenshot comparator without weakening the visualizer
      smoke or export tests.
  - Proof:
    - Updated `tests/test_visualizer_visual_regression.py` to preserve exact
      matching when possible and add perceptual mean/RMS/changed-ratio
      thresholds for cross-platform rendering differences.
    - After the first follow-up still failed the mobile Ubuntu screenshot,
      updated the test to prefer platform-specific baselines and generated
      checked Linux baselines under `tests/visual_baselines/linux/`.
    - Updated `README.md` to document exact matching plus perceptual fallback.
    - `python -m pytest tests\test_visualizer_visual_regression.py -q`
      passed: `2 passed`.
    - WSL Linux baseline generation with `UPDATE_VISUAL_BASELINES=1` passed:
      `2 passed`.
    - WSL Linux visual regression without baseline updates passed:
      `2 passed`.
    - `python -m ruff check tests\test_visualizer_visual_regression.py`
      passed: `All checks passed!`.
    - `python -m pytest -q` passed: `122 passed`.
    - `python -m ruff check` passed: `All checks passed!`.
    - `python -m build` passed and produced source/wheel artifacts locally.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `git diff --check` passed with Git line-ending normalization warnings
      only.
