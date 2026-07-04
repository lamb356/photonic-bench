# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: complete. PR #9 was merged into `master`, post-merge
GitHub Actions and local artifact verification passed, the old feature branch
was cleaned up, and follow-up visualizer/modeling work was implemented in
commit `8be7316725fd0ef2fd00e54e96d7bb9e7ef473a7`.

## Objective

Complete the next autonomous PhotonicBench outer loop:

1. Merge PR #9 into `master`, verify GitHub Actions is green on `master` after
   the merge, run post-merge local verification, and clean up the old feature
   branch.
2. Further improve the web visualizer for interaction, dashboard experience,
   analytical features, and daily usability.
3. Deepen system modeling around contention calibration, realistic memory
   hierarchy behavior, and related metrics.

## Priority Order

1. Merge PR #9 into `master` only after confirming the PR checks are green.
2. Verify `master` after the merge locally and in GitHub Actions, then clean up
   the merged feature branch.
3. Add a meaningful visualizer improvement that is useful in daily analysis and
   keeps modeling-boundary labels clear.
4. Add a meaningful system-modeling improvement with explicit, auditable local
   assumptions.
5. Regenerate checked artifacts, update documentation, verify, run hostile
   review, fix important findings, and close state with proof.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Before marking any checklist item DONE, verify the change and update
  documentation where relevant.
- Do not merge or push with known failing lint, tests, artifact freshness, or
  GitHub Actions checks.
- Keep source-backed published values separate from local model estimates.
- Preserve modeling-boundary labels in reports, JSON, and the visualizer.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  progress and fix important issues.

## Stop Condition

The loop is complete only when PR #9 is merged into `master`; post-merge
GitHub Actions and local verification are green; the old feature branch is
cleaned up; meaningful visualizer and system-modeling improvements are
implemented, documented, regenerated, and tested; all checklist items are DONE
with proof; and the hostile review pass is complete with major findings
addressed.

Closeout note: the final state commit and post-push GitHub Actions run are
created after this file is updated and are reported in the final response.
