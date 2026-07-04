# PhotonicBench PR Publication, Visualizer, And System Modeling Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md`.
    - Checked branch state with `git status --short --branch`; current branch
      is `codex/pr8-followup-improvements`.
    - Called GBrain `get_brain_identity`; version `0.42.56.0`.
    - Searched GBrain for the PR #8 follow-up context and read
      `photonicbench-pr8-merge-bottleneck-stack-2026-07-04`.
    - Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
      transformer, and workflow context.
    - Read GitHub, commit, frontend-design, and review skill guidance.
- [x] DONE: Roll `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` to the new commit-first outer loop.
  - Proof:
    - This checklist records the new stop condition: publish the existing
      verified branch first, then add one more visualizer/modeling pass.
- [ ] TODO: Keep state files aligned as each task advances.

## Task 1: Commit, Push, And Open PR

- [ ] TODO: Review the current dirty worktree and split commits logically.
  - Required proof:
    - `git diff --stat` reviewed.
    - Commit grouping selected before staging.
- [ ] TODO: Re-run fast quality gates before committing.
  - Required proof:
    - `python -m ruff check` passes.
    - Focused or full tests relevant to the current dirty work pass.
    - `python -m photonic_bench.cli verify-artifacts` passes.
- [ ] TODO: Create one or more clean commits on
      `codex/pr8-followup-improvements`.
  - Required proof:
    - `git log --oneline -n` shows the new commit or commits.
- [ ] TODO: Push `codex/pr8-followup-improvements` and open a PR to `master`.
  - Required proof:
    - `git push -u origin codex/pr8-followup-improvements` succeeds.
    - `gh pr create` returns a PR URL.
    - PR metadata confirms base `master` and head
      `codex/pr8-followup-improvements`.

## Task 2: Visualizer Improvements

- [ ] TODO: Map the current visualizer dashboard, comparison, URL-state,
      preset, export, detail, smoke, accessibility, and visual-regression
      surfaces after the protected PR is open.
- [ ] TODO: Implement high-value interaction, dashboard, analytical, or
      usability improvements while preserving modeling-boundary labels.
  - Candidate directions:
    - Better comparison interaction and selected-artifact workflow.
    - Stronger dashboard analysis and review-priority surfacing.
    - More useful export or preset behavior.
    - Shareable URL or state quality improvements.
- [ ] TODO: Update visualizer docs, generated visualizer artifacts, and
      browser/focused tests as relevant.

## Task 3: Deeper System Modeling

- [ ] TODO: Map the current contention calibration, memory hierarchy, report,
      JSON schema, transformer aggregate, and visualizer exposure after the
      protected PR is open.
- [ ] TODO: Add meaningful contention calibration or hierarchy-realism
      improvements with explicit local-model assumptions.
  - Candidate directions:
    - Effective bandwidth under load.
    - Contention-adjusted hierarchy-level energy or time attribution.
    - Pressure ratios and saturation diagnostics that remain auditable.
- [ ] TODO: Expose new metrics in Markdown, JSON, comparison, transformer, and
      visualizer surfaces where appropriate.
- [ ] TODO: Add focused tests and regenerate affected checked artifacts.

## Task 4: Verification And Documentation

- [ ] TODO: Regenerate checked artifacts after source/model/visualizer changes.
- [ ] TODO: Run focused tests for touched surfaces.
- [ ] TODO: Run full Ruff, full pytest, package build, JS syntax checks,
      `verify-artifacts`, browser smoke/accessibility/visual regression, and
      diff hygiene before closeout.

## Task 5: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Re-read state files and review checklist before critique.
- [ ] TODO: Run critique focused on usability, modeling clarity, source
      boundaries, code quality, test reliability, CI artifact usability, and
      visual regression portability.
- [ ] TODO: Fix important findings and re-run affected verification.

## Task 6: Final Closeout

- [ ] TODO: Confirm all three objectives have meaningful implementation and
      proof.
- [ ] TODO: Update state files and `tasks/todo.md` to final DONE state.
- [ ] TODO: Record PR URL, commit hashes, verification, GBrain note, and
      remaining risks.
