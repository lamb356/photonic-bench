# PhotonicBench Visualizer Comparison And Scaling Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.

## Cycle Control

- [x] DONE: Roll state files forward and create the prioritized checklist.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`
      describe the comparison, smoke-test, and scaling goal.
    - `tasks/todo.md` marks Web Visualizer Evolution as complete and this goal
      as active.
    - The scaling implementation path is chosen.
  - Proof:
    - Re-read all five state files and `tasks/todo.md` at the start of the
      cycle.
    - Inspected `git status --short --branch` and `git diff --stat`.
    - Chose local `--serve` mode as the scaling implementation because it
      avoids static payload duplication for large report directories while
      keeping the existing `file://` path intact.

## Task 1: Current Visualizer Commit

- [ ] TODO: Commit the current visualizer evolution work.
  - Done when:
    - Git status and diff have been inspected.
    - Current visualizer evolution files have been staged explicitly.
    - A clean commit exists with a descriptive message.
    - No push has been performed.
    - The commit hash and verification notes are recorded in `PROGRESS.md`.
  - Proof:
    - Pending.

## Task 2: Comparison Analytics

- [ ] TODO: Upgrade comparison mode into a stronger analysis tool.
  - Done when:
    - Users can pin one selected artifact as the reference artifact.
    - Comparison output shows absolute deltas and ratios against the pinned
      reference where the metrics are compatible.
    - Same-schema selections are grouped with richer metric rows.
    - Mixed-schema selections remain allowed but are explicitly labeled and do
      not imply false equivalence.
    - The UI makes pinned state, selected state, and clear actions obvious.
    - Tests and browser smoke cover the new comparison behaviors.
  - Proof:
    - Pending.

## Task 3: Playwright Browser Smoke

- [ ] TODO: Add Playwright as a dev dependency and check in a browser smoke test.
  - Done when:
    - Project dev dependencies include Playwright.
    - A browser smoke test opens the generated visualizer in Chromium.
    - The smoke test verifies representative detail and comparison flows.
    - The smoke test fails on page errors or unexpected console errors.
    - Documentation explains how to run it.
  - Proof:
    - Pending.

## Task 4: Local Server Scaling Mode

- [ ] TODO: Implement `visualize --serve` as the practical scaling path.
  - Done when:
    - The CLI exposes a simple server mode on the visualizer command.
    - Server mode serves the visualizer shell, static assets, a lightweight
      index, and per-artifact payload JSON on demand.
    - Server mode does not write duplicated payload JSON/script assets.
    - Static generation still works from `file://`.
    - Tests cover server route behavior or route construction.
    - Documentation explains when to use static output versus server mode.
  - Proof:
    - Pending.

## Task 5: Documentation, Examples, And Verification

- [ ] TODO: Update docs, regenerate examples, and run verification.
  - Done when:
    - README/docs describe improved comparison analytics, Playwright smoke, and
      `--serve`.
    - The checked-in static visualizer example is regenerated if source assets
      changed.
    - Focused visualizer tests pass.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
    - The Playwright smoke test passes.
  - Proof:
    - Pending.

## Task 6: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Critique code quality, usability, scalability, and maintainability.
  - Done when:
    - The five state files are re-read before the critique pass.
    - Findings are recorded in `PROGRESS.md`.
    - Significant issues are fixed or explicitly justified.
    - The visualizer is regenerated after fixes when assets change.
    - Final `python -m pytest`, `python -m ruff check`, and Playwright smoke
      all pass.
  - Proof:
    - Pending.

## Task 7: Final State

- [ ] TODO: Close the loop cleanly.
  - Done when:
    - All required outcomes in `GOAL.md` are complete.
    - `CHECKLIST.md`, `PROGRESS.md`, `CONTEXT.md`, `RUBRIC.md`, and
      `tasks/todo.md` reflect the final state.
    - Git status is inspected and reported.
  - Proof:
    - Pending.
