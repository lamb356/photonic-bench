# PhotonicBench Goal

Date started: 2026-07-04

## Objective

Complete the current PhotonicBench loop in order:

1. Commit the current state of the project with a clear message.
2. Push that verified commit to the remote repository.
3. Further improve and polish the web visualizer, especially comparison mode.
4. Begin substantive MLCommons-style photonic benchmark proposal work with
   concrete written artifacts.

The first commit/push captures the already-complete visualizer comparison,
smoke-test, and scaling layer currently in the working tree. After that, this
goal adds a new improvement layer and commits/pushes it too, so the final
workspace is not left dirty.

## Required Outcomes

1. Verify the current working tree with `python -m pytest` and
   `python -m ruff check`.
2. Commit the current state with a descriptive, user-authored message and no
   Codex attribution.
3. Push the verified commit to the configured remote branch.
4. Improve the visualizer comparison experience beyond the current feature
   layer:
   - clearer pinned-reference state;
   - stronger compatible-metric analytics;
   - absolute deltas, percent deltas, and ratios where meaningful;
   - grouped same-schema views that help rank selected artifacts;
   - explicit mixed-schema caveats and compatibility handling;
   - compact, readable UI polish suitable for repeated technical inspection.
5. Keep the visualizer easy to generate through the existing CLI, including the
   static path and local `--serve` path.
6. Create or substantially expand MLCommons-style proposal documentation with:
   - draft proposal structure;
   - benchmark scope;
   - workload classes;
   - key metrics;
   - reproducibility and audit requirements;
   - submission/artifact expectations;
   - open questions and decision points.
7. Update README/docs, regenerate generated visualizer examples when assets
   change, and verify the relevant tests and browser smoke.
8. Run a mandatory Hostile Senior Reviewer critique after the visualizer and
   proposal work, record findings, and fix significant issues.
9. Commit and push the final new work after verification.

## Scope

In scope:

- Preserve static generation:
  `python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html`.
- Preserve local server mode:
  `python -m photonic_bench.cli visualize --reports-dir reports --serve`.
- Improve comparison analytics and mixed-schema clarity without weakening the
  schema-aware data model.
- Preserve modeling boundaries between local estimates, published references,
  transformer serial timing, non-additive noise diagnostics, assumptions,
  exclusions, and provenance.
- Add or update tests for meaningful visualizer behavior changes.
- Use current official MLCommons materials as proposal context where needed.
- Produce concrete proposal documents that could seed a real benchmark working
  draft.

Out of scope:

- File upload workflow.
- Hosted backend service or deployment.
- Persistent user accounts or cloud storage.
- A formal MLCommons submission.
- Full implementation of a new benchmark suite beyond proposal foundation
  artifacts.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` have
  been re-read at the start of each cycle.
- All checklist items are marked DONE with proof.
- The current state has been committed and pushed after tests and ruff pass.
- The visualizer comparison mode has additional polished analytical capability
  beyond the pre-goal working tree.
- Substantive MLCommons-style proposal artifacts exist and are documented.
- Documentation and generated examples are current.
- `python -m pytest` passes.
- `python -m ruff check` passes.
- The Playwright visualizer smoke test passes.
- The Hostile Senior Reviewer critique is recorded and major findings are
  fixed or explicitly justified.
- The final workspace changes have been committed and pushed.
