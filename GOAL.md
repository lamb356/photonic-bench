# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: complete; follow-up PR #8 is open, mergeable, and green
on branch `codex/pr7-followup-improvements`.

## Objective

Complete the next autonomous PhotonicBench outer loop:

1. Merge PR #7 into `master`, verify post-merge `master` CI is green, and
   perform post-merge artifact verification.
2. Further improve the web visualizer for interaction, dashboard experience,
   analytical features, and daily usability.
3. Deepen system modeling around contention calibration, more realistic memory
   hierarchy behavior, and related metrics.
4. Add more high-quality, source-backed published photonic accelerator cards.
5. Improve CLI and overall workflow usability.

## Priority Order

1. Merge PR #7 after verifying green PR CI, then verify `master` locally and
   in GitHub Actions.
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

The loop is complete when PR #7 has been merged, post-merge `master` CI and
local artifact verification are green, meaningful implementation has landed
across the visualizer, system model, published-card set, and CLI/workflow
surfaces, all checklist items are marked DONE with proof, generated artifacts
are fresh, and the hostile review pass is complete with major issues fixed.
