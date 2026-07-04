# PhotonicBench Outer Loop Rubric

## Required Outcome

This goal is successful only if all three objectives are completed with proof:

1. The current `codex/pr8-followup-improvements` work is committed, pushed, and
   opened as a PR to `master`.
2. The web visualizer receives another meaningful improvement to interaction,
   dashboard clarity, analytical features, or daily usability.
3. The system model receives another meaningful improvement to contention
   calibration, realistic memory hierarchy behavior, or related metrics.

## Quality Bar

- Changes are implementation-backed, not planning-only.
- JSON contracts remain strict and documented.
- Generated Markdown/JSON reports and `reports/visualizer/**` are regenerated
  whenever model or visualizer outputs change.
- Published paper values and local model estimates stay visibly separate.
- New modeling assumptions are explicit, auditable, and labeled as local model
  estimates.
- Browser-facing labels preserve the `published_reference` versus
  `local_model` boundary.
- Visualizer changes are ergonomic for repeated analysis, not decorative.
- Tests are focused where behavior changed, and full verification runs before
  closeout.

## Verification Expectations

- Before the initial publish:
  - `python -m ruff check`
  - relevant tests for the current dirty work
  - `python -m photonic_bench.cli verify-artifacts`
- Before final closeout:
  - `python -m ruff check`
  - `python -m pytest -q`
  - `python -m build`
  - `python -m photonic_bench.cli verify-artifacts`
  - `node --check photonic_bench\visualizer_assets\app.js`
  - `node --check reports\visualizer\assets\app.js`
  - browser smoke/accessibility/visual-regression tests
  - `git diff --check`

## Hostile Senior Reviewer Focus

The critique pass must look for:

- UI controls that are hard to discover, hard to compare, or misleading.
- Modeling numbers that look source-backed when they are local estimates.
- Schema/docs drift.
- Generated artifacts that are stale or not reproducible.
- Visual regression or browser tests that miss the new workflow.
- Over-coupled JavaScript or Python surfaces that make the next metric fragile.
- PR/CI usability problems for reviewers.

Important findings must be fixed before final DONE.
