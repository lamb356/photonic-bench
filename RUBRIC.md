# PhotonicBench PR #7 Merge And Five-Objective Outer Loop Rubric

Use this rubric for completion decisions and the mandatory Hostile Senior
Reviewer critique.

## PR #7 Merge And Master Verification

- PR #7 is verified open, non-draft, mergeable, and green before merge.
- PR #7 is merged into `master`.
- Local `master` is updated and contains the merge.
- Post-merge `master` GitHub Actions completes successfully.
- Local full tests and `python -m photonic_bench.cli verify-artifacts` pass on
  `master`.
- Branch cleanup is performed when safe or explicitly recorded as skipped.
- macOS visual baseline artifacts are promoted only if they come from reviewed
  real macOS screenshots.

## Visualizer Quality

- Improvements make daily comparison work faster, clearer, or more analytical.
- UI remains dense, operational, keyboard reachable, and boundary-labeled.
- Mixed-schema and local-vs-published semantics remain explicit.
- Export/share/preset behavior remains reproducible.
- Browser smoke, accessibility, or visual regression coverage is updated when
  behavior changes.

## System Modeling Quality

- New behavior improves realism for memory hierarchy, contention, calibration,
  or effective bandwidth under load.
- Assumptions are explicit in config, Markdown, JSON, and visualizer surfaces.
- Published values remain separate from local estimates.
- New metrics are tested and are not presented as measured hardware data unless
  source-backed.

## Published Card Quality

- Adds at least 3-5 high-quality cards based on primary sources.
- Cards include citation metadata, source-quality grading, and surrogate type.
- Local workloads are clearly labeled as surrogates when not exactly the paper
  workload.
- Reports, JSON, comparisons, and visualizer artifacts are regenerated.

## CLI And Workflow Quality

- CLI improvements reduce daily friction for common tasks.
- Validation errors are path-aware and actionable.
- Transformer-model workflows become clearer or easier to inspect.
- Tests and documentation cover new commands, flags, or error behavior.

## Verification Quality

- Focused tests pass for every touched surface.
- Full `python -m ruff check` and `python -m pytest -q` pass before closeout.
- `python -m build` passes.
- `python -m photonic_bench.cli verify-artifacts` passes.
- `node --check photonic_bench\visualizer_assets\app.js` passes after JS
  changes.
- Visual regression and accessibility checks pass.
- `git diff --check` passes, allowing only Git line-ending normalization
  warnings.

## Review Readiness

- State files and `tasks/todo.md` are current.
- Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Important critique findings are fixed before completion.
- Remaining risks are concrete and not hidden.
