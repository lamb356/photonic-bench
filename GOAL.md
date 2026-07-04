# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: complete.

## Objective

Merge PR #5 (`codex/pr4-followup-improvements`) into `master`, verify
`master` CI, then make meaningful web visualizer improvements focused on
daily analytical value. The first visualizer priority is a preset gallery with
named score-weight profiles for common analysis modes.

## Primary Objectives

1. Verify PR #5 is clean, mergeable, and GitHub Actions green.
2. Merge PR #5 into `master`, optionally delete the feature branch for
   hygiene, and verify `master` CI is green after the merge.
3. Add a visualizer preset gallery with named score-weight profiles for common
   analysis modes:
   - Balanced;
   - Efficiency;
   - Throughput;
   - Contention;
   - Provenance.
4. Improve overall visualizer usability and analytical value where it compounds
   the gallery work, while preserving explicit modeling-boundary labels.
5. Update documentation, regenerate checked artifacts, and verify the changes
   with focused and full quality gates.
6. Run a mandatory Hostile Senior Reviewer critique focused on usability and
   clarity, then fix important findings.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Work from a clear checklist. The merge is the first major checklist item.
- Before marking any checklist item DONE, complete the work, verify it, and
  update documentation where relevant.
- Keep generated artifacts fresh after changing models, schemas, reports,
  visualizer output, examples, docs, or artifact recipes.
- Preserve conservative source boundaries and local-surrogate labeling.
- Do not claim local score rankings, local system movement estimates, or local
  heuristics are measured hardware results.

## Stop Condition

Completed when all of the following are true:

- PR #5 has been merged into `master`.
- `master` GitHub Actions is green after the merge.
- Meaningful visualizer progress has landed, especially the preset gallery for
  named score-weight profiles.
- All checklist items are DONE with proof.
- Documentation and checked generated visualizer artifacts are updated.
- Focused tests, JavaScript syntax checks, Ruff, full pytest, artifact
  freshness verification, browser/manual visualizer checks, and other relevant
  gates pass or any inability to run them is recorded.
- The mandatory Hostile Senior Reviewer critique is complete and major issues
  are addressed.

## Closeout

Completed on 2026-07-04. PR #5 was merged into `master`, post-merge `master`
CI passed, and the follow-up score-profile gallery work was implemented on a
protected-branch PR path. The visualizer now has a named score-profile gallery
for Balanced, Efficiency, Throughput, Contention, and Provenance analysis,
current-set same-schema previews, profile-aware URL/export behavior, updated
docs/schema/tests, regenerated visualizer assets, and a completed hostile
review pass. Local verification passed across focused visualizer tests, browser
smoke, visual regression, JavaScript syntax, artifact freshness, Ruff, full
pytest, package build, and whitespace checks.
