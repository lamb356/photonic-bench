# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: active.

## Objective

Complete the next autonomous PhotonicBench outer loop after the
`codex/post-pr5-visual-a11y` work:

1. Commit the current `codex/post-pr5-visual-a11y` work, push it, and open a
   pull request to `master`.
2. Further improve the web visualizer for interaction polish, dashboard
   experience, analytical value, and daily usability.
3. Deepen the system modeling around contention calibration, realistic memory
   hierarchy behavior, and related metrics.
4. Add 3-5 high-quality, source-backed published photonic accelerator cards.
5. Improve CLI and workflow usability, especially validation feedback and full
   transformer-model workflows.

## Priority Order

1. Protect the existing work with a clean commit, push, and pull request.
2. Improve the visualizer where it provides high daily analytical value.
3. Deepen system modeling with explicit assumptions and report/visualizer
   exposure.
4. Add more published cards with clear source quality metadata and surrogate
   labels.
5. Improve CLI and workflow usability.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Before marking any checklist item DONE, verify the change and update
  documentation where relevant.
- Keep source-backed published values separate from local model estimates.
- Preserve modeling-boundary labels in reports, JSON, and the visualizer.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  progress and fix important issues.

## Stop Condition

The loop is complete when meaningful implementation has landed across all five
objectives, all checklist items are marked DONE with proof, generated artifacts
are fresh, focused and full verification pass or blockers are recorded, the
pull request path is established, and the hostile review pass is complete with
major issues addressed.
