# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: active.
Branch: `codex/decision-grade-analysis-tool`

## Objective

Turn the recent PhotonicBench modeling and visualizer work into a
production-ready, reviewable state.

The current branch already contains the locally verified
decision-grade-analysis implementation. This goal promotes that work into a PR,
then adds the missing reviewability and production-readiness layers: scenario
provenance, sensitivity analysis, decision-packet replay, deeper card source
audit metadata, additional memory-stressing cards, schema compatibility policy,
reviewer checklist updates, remote CI artifact inspection, and a small release
candidate note/tag after merge.

## Required Tasks

1. Commit the current work on branch `codex/decision-grade-analysis-tool` and
   open a pull request to `master`.
2. Run remote CI on the PR and inspect generated screenshot artifacts.
3. Add calibrated scenario provenance packs with source-backed justification
   for every memory hierarchy scenario and contention preset.
4. Add a scenario sensitivity dashboard in the visualizer that allows selecting
   one card and sweeping it across different memory scenarios.
5. Add decision-packet import/replay so a dragged decision packet restores the
   full review state.
6. Add card source-audit depth with structured quoted metrics, local
   assumptions, conversion math, and confidence flags per published card.
7. Expand memory-stressing card coverage with 2-4 more source-backed cards
   chosen for distinct memory behavior.
8. Version report schemas more formally with a compatibility policy and clear
   versioning rules in the relevant schemas and docs.
9. Add PR-template checklist entries for artifact freshness, visual regression,
   decision packets, and schema changes.
10. Add a small release candidate tag or versioned release note after the work
    is merged.

## Priority Order

1. Roll state files forward and create this active checklist.
2. Verify the dirty branch, make clean logical commits, push, and open the PR.
3. Implement decision-packet import/replay and the scenario sensitivity
   dashboard.
4. Add scenario provenance packs and expand memory-stressing cards.
5. Deepen structured source-audit metadata for published cards.
6. Add schema compatibility policy and PR template reviewer checklist.
7. Regenerate artifacts, update documentation, and run focused plus full local
   verification.
8. Run remote CI on the PR and inspect generated screenshot artifacts.
9. Run the mandatory Hostile Senior Reviewer critique and fix important
   findings.
10. Merge when ready, then add the small release candidate tag or versioned
    release note.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Use GBrain at the start of non-trivial work when exposed, and write durable
  notes for decisions, closeouts, and notable project facts.
- Before marking any checklist item DONE, complete implementation, verify it,
  and update relevant documentation.
- Do not push or open a PR if local lint, tests, artifact freshness, or build
  checks are failing.
- Keep source-backed published values separate from local model estimates.
- Preserve modeling-boundary labels in reports, JSON, visualizer UI, decision
  packets, and reviewer documentation.
- Do not fabricate published values, measured hardware data, screenshots, or
  visual baselines.
- Run the mandatory Hostile Senior Reviewer critique after substantial progress
  and fix important issues before final closeout.

## Stop Condition

The loop ends when all 10 required tasks are implemented with proof, all
checklist items are marked DONE, local and remote verification are complete,
the generated screenshot artifacts have been inspected, the mandatory hostile
review has been completed with major issues addressed, the PR is merged, and a
small release candidate tag or versioned release note exists.
