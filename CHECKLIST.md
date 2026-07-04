# PhotonicBench Autonomous Loop Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create the active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of Cycle 0.
    - Re-read `tasks/todo.md`.
    - Read commit, GitHub, publish, and frontend-design skill instructions.
    - Confirmed the active branch is `codex/artifact-freshness-profiles`.
    - Confirmed `origin` is `https://github.com/lamb356/photonic-bench.git`.
    - Confirmed GBrain tools were not exposed in this thread after deferred
      tool search.

## Task 1: Commit, Push, And Pull Request

- [x] DONE: Inspect the current dirty worktree and classify the existing
      uncommitted work.
  - Proof:
    - `git status --short --branch` confirmed branch
      `codex/artifact-freshness-profiles` with modified source, docs, tests,
      generated reports, visualizer assets, and untracked generated examples.
    - `git diff --stat` showed 191 tracked files changed before untracked
      files.
    - Scope classified as in-goal baseline work from artifact freshness,
      system profiles, transformer realism, external loading diagnostics,
      source-quality metadata, docs, tests, and generated artifacts.

- [x] DONE: Run the most relevant protective verification before committing.
  - Proof:
    - `python -m ruff check` passed.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `python -m photonic_bench.cli verify-artifacts` passed with
      `Artifacts are fresh: checked 194 generated files.`
    - `python -m pytest -q` passed with `102 passed`.
    - `git diff --check` reported no whitespace errors; only Windows
      line-ending warnings.

- [ ] TODO: Create clean logical commit or commits for the current branch.
  - Proof:
    - Pending.

- [ ] TODO: Push `codex/artifact-freshness-profiles` to `origin`.
  - Proof:
    - Pending.

- [ ] TODO: Open a pull request against `master`.
  - Proof:
    - Pending.

## Task 2: Visualizer Improvements

- [ ] TODO: Map current visualizer comparison, preset, export, Pareto, profile,
      and modeling-boundary surfaces.
  - Proof:
    - Pending.

- [ ] TODO: Improve comparison analytics, usability, saved presets, exports, or
      Pareto/profile views with daily-use value.
  - Proof:
    - Pending.

- [ ] TODO: Update visualizer tests and browser smoke coverage.
  - Proof:
    - Pending.

## Task 3: Deeper System Modeling

- [ ] TODO: Map current system memory hierarchy, bandwidth, data movement,
      profile, report, schema, and visualizer exposure.
  - Proof:
    - Pending.

- [ ] TODO: Add richer auditable memory hierarchy and bandwidth/data-movement
      modeling.
  - Proof:
    - Pending.

- [ ] TODO: Surface new model metrics in reports, JSON, comparison output, and
      visualizer views.
  - Proof:
    - Pending.

## Task 4: More Published Cards

- [ ] TODO: Identify at least 3 to 4 high-quality source-backed photonic
      accelerator candidates.
  - Proof:
    - Pending.

- [ ] TODO: Add YAML cards with conservative citations, assumptions,
      source-quality metadata, and local surrogate labeling.
  - Proof:
    - Pending.

- [ ] TODO: Regenerate Markdown/JSON reports, comparison output, and visualizer
      payloads for the new cards.
  - Proof:
    - Pending.

## Task 5: CLI And Usability

- [ ] TODO: Find high-friction CLI or validation paths from current tests/docs.
  - Proof:
    - Pending.

- [ ] TODO: Implement targeted usability improvements with tests and docs.
  - Proof:
    - Pending.

## Task 6: Documentation And Artifact Refresh

- [ ] TODO: Update README, model docs, schema docs, visualizer docs, and/or
      usage examples for all user-facing changes.
  - Proof:
    - Pending.

- [ ] TODO: Regenerate checked generated artifacts.
  - Proof:
    - Pending.

- [ ] TODO: Run artifact freshness verification.
  - Proof:
    - Pending.

## Task 7: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Re-read required state files and run the hostile critique focused
      on modeling credibility, visualizer usefulness, source-card quality,
      CLI usability, and PR readiness.
  - Proof:
    - Pending.

- [ ] TODO: Fix important critique findings or record explicit non-fix
      rationale.
  - Proof:
    - Pending.

## Task 8: Final Verification And Closeout

- [ ] TODO: Run final quality gates.
  - Proof:
    - Pending.

- [ ] TODO: Close `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` with proof.
  - Proof:
    - Pending.

- [ ] TODO: Inspect final git status and push final updates if needed.
  - Proof:
    - Pending.
