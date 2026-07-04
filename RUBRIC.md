# PhotonicBench Outer Loop Rubric

## Closeout Status

- Required outcomes are complete through implementation commit
  `8be7316725fd0ef2fd00e54e96d7bb9e7ef473a7`.
- PR #9 merged into `master` at
  `0f9ba2acc893ffbe5c5fbfd163481e4f69052328`; post-merge master CI run
  `28714312225` passed.
- Follow-up visualizer/modeling work passed the required local gates:
  Ruff, full pytest, package build, artifact freshness, source/generated JS
  syntax checks, browser smoke/accessibility/visual regression, and diff
  hygiene.
- Mandatory Hostile Senior Reviewer critique completed. The material finding
  was the ambiguous guardbanded loaded-bandwidth label/export key; it was fixed
  and re-verified.
- Final closeout commit and post-push CI are created after this file is updated
  and are reported in the final response.

## Required Outcome

This goal is successful only if all three objectives are completed with proof:

1. PR #9 is merged into `master`, post-merge GitHub Actions is green, local
   `master` passes post-merge full tests and `verify-artifacts`, and
   `codex/pr8-followup-improvements` is cleaned up locally/remotely.
2. The web visualizer receives another meaningful improvement to interaction,
   dashboard clarity, analytical features, or daily usability.
3. The system model receives another meaningful improvement to contention
   calibration, realistic memory hierarchy behavior, or related metrics.

## Quality Bar

- Changes are implementation-backed, not planning-only.
- Merge and branch cleanup happen before new feature work.
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

- Before merging PR #9:
  - PR state is open, non-draft, mergeable, and all required checks are green.
- After merging PR #9:
  - post-merge GitHub Actions on `master` is green;
  - local `master` is clean and current;
  - `python -m pytest -q` passes;
  - `python -m photonic_bench.cli verify-artifacts` passes.
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
