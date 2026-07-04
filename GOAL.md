# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: active. The first priority is to publish the already
verified `codex/pr8-followup-improvements` work, then continue with one more
meaningful visualizer and system-modeling improvement pass.

## Objective

Complete the next autonomous PhotonicBench outer loop:

1. Commit the current work on `codex/pr8-followup-improvements`, push it to
   GitHub, and open a pull request to `master`.
2. Further improve the web visualizer for interaction, dashboard experience,
   analytical features, and daily usability.
3. Deepen system modeling around contention calibration, realistic memory
   hierarchy behavior, and related metrics.

## Priority Order

1. Protect the current verified branch by committing, pushing, and opening a
   PR early.
2. Improve the visualizer where it adds practical daily analytical value.
3. Deepen the local system model with explicit, auditable assumptions and
   report/visualizer exposure.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Before marking any checklist item DONE, verify the change and update
  documentation where relevant.
- Do not push if known lint or tests are failing.
- Keep source-backed published values separate from local model estimates.
- Preserve modeling-boundary labels in reports, JSON, and the visualizer.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  progress and fix important issues.

## Stop Condition

The loop is complete when the current branch is committed, pushed, and opened
as a PR to `master`; a second meaningful pass lands across visualizer and
system-modeling surfaces; generated artifacts and documentation are fresh; all
checklist items are DONE with proof; and the hostile review pass is complete
with major findings addressed.
