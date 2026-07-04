# PhotonicBench Five-Objective Outer Loop Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of this cycle.
    - Re-read the bottom of `tasks/todo.md`.
    - Exposed and called GBrain `get_brain_identity`; GBrain version
      `0.42.56.0`.
    - Queried and directly read GBrain page
      `photonicbench-post-pr5-visual-a11y-2026-07-04`.
    - Searched local memory `MEMORY.md` for PhotonicBench context.
    - Read commit, GitHub publish, GitHub triage, frontend-design, and review
      skill guidance.
    - Confirmed current branch `codex/post-pr5-visual-a11y` with the intended
      uncommitted post-PR5 work present.
- [ ] IN PROGRESS: Keep `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`,
      `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` aligned as work
      advances.

## Task 1: Commit, Push, And Open Pull Request

- [ ] IN PROGRESS: Run quick pre-commit validation so known tests/lint are not
      failing before push.
- [ ] TODO: Create clean logical commit(s) for current branch work.
- [ ] TODO: Push `codex/post-pr5-visual-a11y`.
- [ ] TODO: Open a pull request to `master` with a clear description.
- [ ] TODO: Verify PR CI status or record pending/failure state.

## Task 2: Fix macOS Visual Baseline Issues

- [ ] TODO: Inspect current macOS baseline routing, CI feasibility, and checked
      baseline inventory.
- [ ] TODO: Add a non-fabricated macOS baseline path, CI capture job, or
      clearly gated workflow that can produce reviewed macOS screenshots.
- [ ] TODO: Verify macOS-related behavior without weakening Linux/Windows
      visual regression checks.

## Task 3: Visualizer Improvements

- [ ] TODO: Map current visualizer comparison, dashboard, export, preset,
      profile, and smoke-test surfaces.
- [ ] TODO: Implement high-value interaction polish or analytical features.
- [ ] TODO: Preserve visible modeling-boundary labels.
- [ ] TODO: Update docs, generated visualizer assets, and focused tests.

## Task 4: Deeper System Modeling

- [ ] TODO: Map current multi-tier memory, contention, calibration, reporting,
      JSON, visualizer, and tests.
- [ ] TODO: Add meaningful contention calibration or memory hierarchy behavior
      with explicit assumptions.
- [ ] TODO: Expose new metrics in reports/JSON/visualizer where appropriate.
- [ ] TODO: Add focused tests and regenerate affected artifacts.

## Task 5: More Published Photonic Accelerator Cards

- [ ] TODO: Research recent high-quality photonic GEMM/tensor processor papers
      from primary sources.
- [ ] TODO: Add 3-5 source-backed example YAML cards with quality metadata and
      surrogate labels.
- [ ] TODO: Generate Markdown/JSON reports and update comparisons/visualizer.
- [ ] TODO: Document sources and assumptions.

## Task 6: CLI And Workflow Usability

- [ ] TODO: Map current CLI validation and transformer-model workflow pain
      points.
- [ ] TODO: Improve error messages, validation feedback, or add helpful
      commands/flags.
- [ ] TODO: Add tests and documentation for the workflow improvement.

## Task 7: Documentation, Artifacts, And Verification

- [ ] TODO: Regenerate checked artifacts after model, example, visualizer, or
      docs changes.
- [ ] TODO: Run focused tests for touched surfaces.
- [ ] TODO: Run full Ruff, full pytest, package build, JS syntax, artifact
      freshness, visual regression, accessibility, and diff hygiene before
      closeout.

## Task 8: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Re-read state files and review checklist before critique.
- [ ] TODO: Run critique focused on usability, modeling clarity, source
      boundaries, code quality, test reliability, and macOS visual baseline
      correctness.
- [ ] TODO: Fix important findings.

## Task 9: Final Closeout

- [ ] TODO: Confirm all five objectives have meaningful implementation and
      proof.
- [ ] TODO: Update state files and `tasks/todo.md` to final DONE state.
- [ ] TODO: Record PR, CI, final git status, verification, and remaining risks.
