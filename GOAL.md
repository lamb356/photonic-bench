# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: complete.

## Objective

Complete an autonomous visualizer and repository improvement loop for
PhotonicBench. The work must make the static web visualizer more shareable,
testable, explainable, configurable, keyboard-accessible, and review-ready
while preserving explicit modeling-boundary labels.

## Required Improvements

1. Commit the current work on branch `codex/pr4-followup-improvements` and
   open a pull request to `master`.
2. Add shareable URL state for filters, focus mode, selected artifacts, pinned
   artifact, and Pareto mode.
3. Add desktop and mobile visual regression screenshot testing.
4. Add an explain-score drilldown showing how each recommendation score is
   calculated.
5. Add custom score weights so users can tune comparison focus modes.
6. Add selection drawer controls: remove one, clear group, invert selection,
   and compare top N visible.
7. Improve sticky comparison header and first-column behavior for wide
   comparison tables.
8. Add a formal JSON schema for `photonic-bench-comparison-export-v1`.
9. Add import/export functionality for browser-local presets.
10. Perform an accessibility pass covering keyboard navigation, ARIA labels,
    reduced motion, and contrast.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Before marking any checklist item DONE, complete the implementation, verify
  it with tests or manual visualizer checks, and update documentation where
  relevant.
- Keep generated artifacts fresh after changing models, schemas, reports,
  visualizer output, examples, docs, or artifact recipes.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  implementation and fix important usability, maintainability, and code-quality
  findings.
- For task 1, create clean logical commits, push the branch, and open a pull
  request only after lint and tests pass.
- Preserve conservative source boundaries and local-surrogate labeling.

## Stop Condition

Completed when all of the following are true:

- Real implementation progress has landed across all ten required
  improvements.
- All checklist items are DONE with proof.
- Documentation and checked generated visualizer artifacts are updated.
- Focused tests, Ruff, pytest, artifact freshness, JavaScript syntax, browser
  smoke, visual regression, JSON schema validation, and other relevant checks
  pass or any inability to run them is recorded.
- The pull request is open against `master`.
- Hostile Senior Reviewer critique is complete and major findings are fixed or
  explicitly justified.

## Closeout

Completed on 2026-07-04. All ten required improvements were implemented, the
pull request is open and ready for review against `master`, the mandatory
critique pass was completed, important findings were fixed, checked visualizer
artifacts were regenerated, and final verification passed. A post-push CI
follow-up found that exact screenshot pixel thresholds were too brittle across
Windows and GitHub Actions Ubuntu renderers; the visual regression comparator
now keeps exact matching for identical renderers and uses a perceptual fallback
for cross-platform font rasterization differences.
