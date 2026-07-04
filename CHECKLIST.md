# PhotonicBench Commit, Push, Visualizer Polish, And Proposal Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.

## Cycle Control

- [x] DONE: Roll state files forward and create the prioritized checklist.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`
      describe the commit, push, visualizer polish, and MLCommons-style
      proposal goal.
    - `tasks/todo.md` marks the comparison/smoke/scaling goal as complete and
      this new goal as active.
    - The checklist covers all four user objectives in order, plus final
      verification, critique, commit, and push.
  - Proof:
    - Re-read all five required state files at the start of the cycle.
    - Re-read `tasks/todo.md`.
    - Inspected `git status --short --branch`.
    - Confirmed the current working tree contains the completed visualizer
      comparison, smoke-test, and `--serve` scaling layer awaiting commit.

## Task 1: Commit Current State

- [ ] TODO: Verify and commit the current project state.
  - Done when:
    - `git status --short --branch` and the relevant diff/stat have been
      inspected.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
    - Current working-tree files are staged explicitly.
    - A clean descriptive commit exists for the current state.
    - Commit hash and proof are recorded in `PROGRESS.md`.

## Task 2: Push Current Commit

- [ ] TODO: Push the verified current-state commit.
  - Done when:
    - The current-state commit is pushed to the configured remote branch.
    - The push target and resulting branch state are recorded in `PROGRESS.md`.
    - No push is attempted if tests or ruff fail.

## Task 3: Further Visualizer Comparison Polish

- [ ] TODO: Audit the current comparison implementation and UX.
  - Done when:
    - The comparison JavaScript, styling, generated assets, and tests have been
      inspected.
    - The next improvement layer is narrowed to high-value, maintainable
      changes.

- [ ] TODO: Implement stronger comparison analytics and mixed-schema handling.
  - Done when:
    - Pinned reference state is easier to understand and act on.
    - Compatible metrics show values, absolute deltas, percent deltas, and
      ratios where meaningful.
    - Same-schema grouped views help users identify best/worst selected
      artifacts by metric.
    - Mixed-schema selections expose compatibility/caveat information without
      implying false equivalence.
    - The UI remains compact, readable, and usable at desktop and mobile-ish
      widths.
    - Unit or browser smoke coverage exercises the new behavior.

- [ ] TODO: Regenerate visualizer examples and update docs for the polish layer.
  - Done when:
    - `reports/visualizer/index.html` and generated assets are updated if
      source assets changed.
    - README or docs explain the new comparison behavior.

## Task 4: MLCommons-Style Photonic Benchmark Proposal

- [ ] TODO: Ground the proposal in current official MLCommons context.
  - Done when:
    - Current official MLCommons materials relevant to benchmark process,
      metrics, reproducibility, or submissions have been checked.
    - Source links and takeaways are recorded in the proposal artifact or
      progress log.

- [ ] TODO: Produce substantive proposal foundation artifacts.
  - Done when:
    - A concrete proposal draft structure exists.
    - Scope, workload classes, metrics, reproducibility requirements, artifact
      requirements, and open questions are written down.
    - The proposal explains how PhotonicBench artifacts could map into a
      benchmark submission and what remains unresolved.

## Task 5: Verification And Documentation

- [ ] TODO: Run focused and full verification after implementation.
  - Done when:
    - Focused visualizer tests pass.
    - The Playwright visualizer smoke test passes.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
    - Documentation and state files reflect the completed work.

## Task 6: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Critique the final visualizer and proposal changes, then fix major issues.
  - Done when:
    - The five required state files are re-read before the critique pass.
    - Findings are recorded in `PROGRESS.md`.
    - Significant issues are fixed or explicitly justified.
    - Any changed generated artifacts are regenerated.
    - Post-fix tests, ruff, and Playwright smoke pass.

## Task 7: Final Commit And Push

- [ ] TODO: Commit and push the final visualizer polish and proposal work.
  - Done when:
    - Final diff/status are inspected.
    - Final verification is recorded.
    - Files are staged explicitly.
    - A clean descriptive final commit exists.
    - The final commit is pushed to the configured remote branch.
    - Final git status is inspected and recorded.
