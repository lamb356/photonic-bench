# PhotonicBench Goal

Date started: 2026-07-04
Date completed: 2026-07-04
Implementation status: complete.

## Objective

Complete a full autonomous improvement loop for PhotonicBench:

1. Commit and push the current work on branch
   `codex/artifact-freshness-profiles`.
2. Open a pull request for the branch.
3. Further improve the web visualizer, especially comparison mode,
   analytical features, and daily-use usability.
4. Deepen the system model with more realistic memory hierarchy,
   bandwidth, and data-movement accounting.
5. Add more high-quality, source-backed published photonic accelerator cards.
6. Improve CLI and overall usability where the changes reduce daily friction.

## Priority Order

1. Protect current work with a clean commit, push, and pull request.
2. Improve visualizer comparison and analysis workflows.
3. Deepen memory hierarchy and data-movement modeling.
4. Add high-quality published photonic accelerator cards.
5. Improve CLI validation, commands, and usage ergonomics.
6. Regenerate artifacts, update docs, verify, critique, and close state.

## Required Outcomes

### Commit, Push, And Pull Request

- Review the dirty worktree on `codex/artifact-freshness-profiles`.
- Stage only goal-relevant files.
- Create one or more clean commits with descriptive messages.
- Push the branch to `origin`.
- Open a pull request against `master` with a clear description and validation
  notes.

### Visualizer Improvements

- Improve comparison-mode analytics for daily decision-making.
- Preserve and improve pinned selections, deltas, ratios, grouped views, saved
  presets, and export behavior where useful.
- Add or improve Pareto/frontier and system/profile analysis if it adds clear
  value.
- Keep modeling-boundary labels visible and conservative.
- Verify static generation, served mode where relevant, JavaScript syntax, and
  browser smoke behavior after UI changes.

### Deeper System Modeling

- Extend the current multi-tier model with a richer and auditable memory
  hierarchy.
- Account for bandwidth, data movement, and contention or overlap assumptions
  explicitly rather than hiding them in aggregate constants.
- Expose new metrics in JSON, Markdown reports, comparison output, and the
  visualizer.
- Validate new config fields with actionable errors.
- Document formulas, defaults, and local-model boundaries.

### More Published Cards

- Add at least 3 to 4 additional high-quality, source-backed photonic
  accelerator cards.
- Prioritize recent or high-impact photonic GEMM, tensor processor, or closely
  related accelerator results.
- Include citations, assumptions, local surrogate labeling, source-quality
  metadata, generated Markdown/JSON reports, comparison output, and visualizer
  payloads.
- Avoid presenting local estimates as measured source hardware behavior.

### CLI And Usability

- Improve error messages and validation feedback around common mistakes.
- Make full transformer-model definition and generation easier where there is
  a clear workflow win.
- Add focused tests and docs for any new user-facing command or option.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Before marking any checklist item DONE, verify the change and record proof.
- Keep generated artifacts fresh after changing models, reports, schemas,
  visualizer output, examples, or docs that are checked by artifact
  verification.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  implementation and fix important findings.
- Preserve the distinction between paper-reported metrics, local surrogate
  estimates, and local modeling assumptions.

## Stop Condition

Completed when all of the following are true:

- The branch is committed, pushed, and has an open pull request.
- Meaningful improvements have landed in the visualizer, system model,
  published cards, and usability surfaces.
- Documentation and generated artifacts are updated.
- All checklist items are marked DONE with proof.
- Ruff, pytest, artifact freshness, JavaScript syntax, browser smoke, and any
  focused new checks pass or any inability to run them is plainly recorded.
- Hostile Senior Reviewer critique is complete and major findings are
  addressed.
