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

- [x] DONE: Verify and commit the current project state.
  - Done when:
    - `git status --short --branch` and the relevant diff/stat have been
      inspected.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
    - Current working-tree files are staged explicitly.
    - A clean descriptive commit exists for the current state.
    - Commit hash and proof are recorded in `PROGRESS.md`.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` before the commit cycle.
    - Ran `git status --short --branch` and `git diff --stat`.
    - Ran `python -m pytest`: 72 passed.
    - Ran `python -m ruff check`: passed.
    - Staged explicit state, doc, source, generated asset, dependency, and
      test paths.
    - Created commit `416f1f8 Add visualizer comparison smoke and server mode`.
    - Confirmed `.Codex/scripts/generate-reasoning.sh` is not present in this
      checkout.

## Task 2: Push Current Commit

- [ ] IN PROGRESS: Push the verified current-state commit.
  - Done when:
    - The current-state commit is pushed to the configured remote branch.
    - The push target and resulting branch state are recorded in `PROGRESS.md`.
    - No push is attempted if tests or ruff fail.
  - Current blocker:
    - `git remote -v`, `git branch -vv`, and `git config --get-regexp` show no
      configured remote or upstream for `master`, so there is currently no push
      target.
    - Continuation re-check after final local commits still shows no remote and
      no upstream for `master`.
    - Third consecutive audit confirmed `.git/config` contains no remote
      stanza, `gh repo view` fails with `no git remotes found`, and the
      authenticated GitHub account has no unambiguous PhotonicBench/Photonic
      Acceleration repository to use as a push target.

## Task 3: Further Visualizer Comparison Polish

- [x] DONE: Audit the current comparison implementation and UX.
  - Done when:
    - The comparison JavaScript, styling, generated assets, and tests have been
      inspected.
    - The next improvement layer is narrowed to high-value, maintainable
      changes.
  - Proof:
    - Inspected `photonic_bench/visualizer_assets/app.js`,
      `photonic_bench/visualizer_assets/styles.css`,
      `tests/test_visualizer.py`, `tests/test_visualizer_smoke.py`, and the
      README visualizer section.
    - Chose an insights/compatibility layer because the existing comparison
      mode already had pinning, deltas, ratios, and grouping but still required
      users to parse large tables to identify meaningful winners and
      mixed-schema caveats.

- [x] DONE: Implement stronger comparison analytics and mixed-schema handling.
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
  - Proof:
    - Added direction-aware metric metadata for comparison analytics.
    - Added a `Comparison Insights` panel with per-schema lowest energy/op,
      lowest latency, and highest throughput cues.
    - Added a `Schema Compatibility` panel explaining which groups have a
      compatible pinned baseline and which remain values-only.
    - Added `Percent vs pinned` beside absolute deltas and ratios.
    - Added direction-aware `lowest` / `highest` badges for compatible metric
      rows.
    - Added responsive CSS for insight cards and a success badge style.
    - Expanded unit/static asset tests and Playwright smoke assertions for the
      new comparison labels.

- [x] DONE: Regenerate visualizer examples and update docs for the polish layer.
  - Done when:
    - `reports/visualizer/index.html` and generated assets are updated if
      source assets changed.
    - README or docs explain the new comparison behavior.
  - Proof:
    - Updated README compare-mode documentation for comparison insights, schema
      compatibility, percent deltas, and per-schema ranking boundaries.
    - Regenerated `reports\visualizer\index.html`:
      23 artifacts, 0 warnings.
    - Ran `python -m pytest tests\test_visualizer.py
      tests\test_visualizer_smoke.py`: 9 passed.
    - Ran `python -m ruff check photonic_bench\visualizer_assets
      tests\test_visualizer.py tests\test_visualizer_smoke.py`: passed.

## Task 4: MLCommons-Style Photonic Benchmark Proposal

- [x] DONE: Ground the proposal in current official MLCommons context.
  - Done when:
    - Current official MLCommons materials relevant to benchmark process,
      metrics, reproducibility, or submissions have been checked.
    - Source links and takeaways are recorded in the proposal artifact or
      progress log.
  - Proof:
    - Checked current official MLCommons/MLPerf benchmark, submission,
      inference-rule, power, tiny-benchmark, datacenter-power, and audit
      materials.
    - Recorded source links and takeaways in
      `docs/mlcommons_photonic_benchmark_proposal.md`.

- [x] DONE: Produce substantive proposal foundation artifacts.
  - Done when:
    - A concrete proposal draft structure exists.
    - Scope, workload classes, metrics, reproducibility requirements, artifact
      requirements, and open questions are written down.
    - The proposal explains how PhotonicBench artifacts could map into a
      benchmark submission and what remains unresolved.
  - Proof:
    - Added `docs/mlcommons_photonic_benchmark_proposal.md` with source
      context, one-page proposal, charter, non-goals, candidate divisions,
      availability categories, workload scope, metrics registry, draft
      structure, PhotonicBench mapping, reproducibility requirements, open
      questions, and immediate next work.
    - Added `docs/mlcommons_photonic_reproducibility_checklist.md` with package
      layout, manifest fields, artifact requirements, metric requirements,
      verification commands, review checklist, and audit questions.
    - Updated `thoughts/plans/mlcommons_photonic_benchmark_proposal_plan.md`
      to point at the new active proposal artifacts.
    - Updated README to link the proposal artifacts and state their status.
    - Added `tests/test_proposal_docs.py`.
    - Ran `python -m pytest tests\test_proposal_docs.py -q`: 1 passed.
    - Ran `python -m ruff check tests\test_proposal_docs.py`: passed.

## Task 5: Verification And Documentation

- [x] DONE: Run focused and full verification after implementation.
  - Done when:
    - Focused visualizer tests pass.
    - The Playwright visualizer smoke test passes.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
    - Documentation and state files reflect the completed work.
  - Proof:
    - Focused visualizer tests and smoke passed: 9 passed.
    - Proposal doc test passed: 1 passed.
    - Full `python -m pytest`: 73 passed.
    - Full `python -m ruff check`: passed.
    - Extra Playwright viewport smoke passed for desktop and narrow comparison
      views with no page errors, no console errors, and no page overflow.
    - README, proposal docs, generated visualizer assets, and state files were
      updated.

## Task 6: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Critique the final visualizer and proposal changes, then fix major issues.
  - Done when:
    - The five required state files are re-read before the critique pass.
    - Findings are recorded in `PROGRESS.md`.
    - Significant issues are fixed or explicitly justified.
    - Any changed generated artifacts are regenerated.
    - Post-fix tests, ruff, and Playwright smoke pass.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` before the critique pass.
    - Inspected `git status --short --branch` and `git diff --stat HEAD`.
    - Reviewed the live visualizer, proposal, README, tests, and state-file
      diffs.
    - Finding: `CONTEXT.md` still described the pre-commit/pre-polish state.
    - Fix: rewrote `CONTEXT.md` to record commit `416f1f8`, the no-remote
      push blocker, the current visualizer polish layer, proposal artifacts,
      verification, and constraints.
    - Residual issue: push remains blocked because no remote/upstream exists;
      this is external repository configuration, not a code/test failure.
    - Post-fix `python -m pytest`: 73 passed.
    - Post-fix `python -m ruff check`: passed.

## Task 7: Final Commit And Push

- [ ] IN PROGRESS: Commit and push the final visualizer polish and proposal work.
  - Done when:
    - Final diff/status are inspected.
    - Final verification is recorded.
    - Files are staged explicitly.
    - A clean descriptive final commit exists.
    - The final commit is pushed to the configured remote branch.
    - Final git status is inspected and recorded.
  - Current proof:
    - Final local implementation commit exists:
      `ee90e77 Polish visualizer comparisons and draft benchmark proposal`.
    - Final local worktree was inspected and clean after that commit.
    - Continuation re-check confirmed `master` still has no configured remote
      or upstream, so final push remains blocked by repository configuration.
    - Additional state-only blocker commits exist after the implementation
      commit to keep the ledgers honest; they also cannot be pushed until a
      remote/upstream is configured.
