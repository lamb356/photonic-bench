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

- [ ] TODO: Inspect the current uncommitted work and separate baseline changes
      from this new loop.
- [ ] TODO: Run required lint/tests against the current branch state before
      pushing.
- [ ] TODO: Create a clean commit for the existing current work.
- [ ] TODO: Push `codex/pr4-followup-improvements`.
- [ ] TODO: Open a pull request to `master` with a clear description.

## Task 2: Shareable URL State

- [ ] TODO: Map existing visualizer state ownership for filters, focus mode,
      selected artifacts, pinned artifact, and Pareto mode.
- [ ] TODO: Implement stable URL serialization and parsing with backward-safe
      defaults.
- [ ] TODO: Keep browser history usable without excessive entry spam.
- [ ] TODO: Add tests and browser smoke coverage for loading a shared URL.
- [ ] TODO: Update visualizer documentation.

## Task 3: Visual Regression Screenshot Testing

- [ ] TODO: Add deterministic desktop screenshot coverage for representative
      visualizer views.
- [ ] TODO: Add deterministic mobile screenshot coverage for representative
      visualizer views.
- [ ] TODO: Store or generate baselines in a repository-appropriate way.
- [ ] TODO: Document how to run and update the visual regression tests.

## Task 4: Explain Score Drilldown

- [ ] TODO: Identify all recommendation score components and normalize their
      naming.
- [ ] TODO: Add an explain-score UI for recommendation cards.
- [ ] TODO: Show weights, raw values, normalized values, contribution, and
      final score.
- [ ] TODO: Add tests and docs for score explanations.

## Task 5: Custom Score Weights

- [ ] TODO: Add user-adjustable score weights for comparison focus modes.
- [ ] TODO: Persist custom weights in browser-local state and include them in
      URL state where appropriate.
- [ ] TODO: Ensure recommendations, scorecards, exports, and explanations use
      the same weight source.
- [ ] TODO: Add reset-to-default behavior.
- [ ] TODO: Add tests and docs for custom weights.

## Task 6: Selection Drawer Controls

- [ ] TODO: Add a selection drawer or equivalent dense selection-management
      surface.
- [ ] TODO: Support removing one selected artifact.
- [ ] TODO: Support clearing a schema/group selection.
- [ ] TODO: Support inverting selection against the visible artifact set.
- [ ] TODO: Support comparing the top N visible artifacts.
- [ ] TODO: Add tests and docs for selection controls.

## Task 7: Sticky Comparison Table Behavior

- [ ] TODO: Audit current comparison table overflow and sticky behavior on
      desktop and mobile.
- [ ] TODO: Improve sticky comparison header behavior for wide tables.
- [ ] TODO: Improve sticky first-column behavior without obscuring data.
- [ ] TODO: Add visual/browser coverage for wide comparison tables.
- [ ] TODO: Update documentation if user-facing behavior changes.

## Task 8: Comparison Export JSON Schema

- [ ] TODO: Add a formal JSON schema file for
      `photonic-bench-comparison-export-v1`.
- [ ] TODO: Make the browser JSON export match the schema.
- [ ] TODO: Add schema validation tests for generated/export-shaped payloads.
- [ ] TODO: Document schema fields and usage.

## Task 9: Browser-Local Preset Import/Export

- [ ] TODO: Add browser-local preset export.
- [ ] TODO: Add browser-local preset import with validation and clear errors.
- [ ] TODO: Preserve existing generated preset behavior.
- [ ] TODO: Add tests and docs for preset import/export.

## Task 10: Accessibility Pass

- [ ] TODO: Audit keyboard navigation for rail controls, comparison controls,
      score drilldowns, preset import/export, and selection drawer actions.
- [ ] TODO: Add or improve ARIA labels and semantic roles.
- [ ] TODO: Respect reduced-motion preferences.
- [ ] TODO: Improve contrast where needed.
- [ ] TODO: Add automated or browser smoke accessibility checks where
      practical.
- [ ] TODO: Update docs with accessibility-relevant behavior.

## Task 11: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Re-read state files and review skill instructions before critique.
- [ ] TODO: Run a hostile senior reviewer critique focused on usability,
      maintainability, and code quality.
- [ ] TODO: Fix important findings.
- [ ] TODO: Record findings and fixes in `PROGRESS.md`.

## Task 12: Final Verification And Closeout

- [ ] TODO: Regenerate checked artifacts.
- [ ] TODO: Run focused visualizer tests.
- [ ] TODO: Run visual regression tests.
- [ ] TODO: Run `node --check` for visualizer JavaScript.
- [ ] TODO: Run `python -m ruff check`.
- [ ] TODO: Run `python -m pytest -q`.
- [ ] TODO: Run `python -m photonic_bench.cli verify-artifacts`.
- [ ] TODO: Run `git diff --check`.
- [ ] TODO: Close `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` only after all stop conditions hold.
