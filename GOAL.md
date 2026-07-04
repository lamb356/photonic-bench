# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: complete.

## Objective

Merge PR #4 into `master`, then complete a new autonomous improvement loop for
PhotonicBench across four product areas:

1. Visualizer interaction polish and analytical features.
2. Deeper system modeling for contention, shared bandwidth, and calibration.
3. Additional high-quality, source-backed published photonic accelerator cards.
4. CLI and workflow usability improvements.

## Priority Order

1. Merge PR #4 into `master` after confirming CI is green.
2. Improve visualizer interaction, comparison analytics, exports, presets, and
   modeling-boundary clarity.
3. Deepen system modeling with contention/shared-bandwidth/calibration metrics
   that are exposed in reports and the visualizer.
4. Add at least 3 to 4 additional high-quality published photonic accelerator
   cards with conservative source-quality metadata.
5. Improve CLI validation and regular workflow ergonomics, especially around
   complex and full transformer models.
6. Update docs, regenerate checked artifacts, run verification, run the
   Hostile Senior Reviewer critique, fix important issues, and close state.

## Required Outcomes

### PR #4 Merge

- Review PR #4 state and current CI result.
- Merge PR #4 into `master`.
- Ensure local `master` is clean and up to date after merge.
- Delete the old feature branch locally or remotely only if it is safe and not
  needed for traceability.

### Visualizer Improvements

- Improve daily-use interaction polish and dashboard feel.
- Enhance comparison mode with clearer insights, better mixed-schema handling,
  and more useful analytical summaries.
- Improve saved presets, exports, or additional analysis views where they
  reduce user friction.
- Preserve clear separation among paper-reported metrics, local surrogate
  estimates, and local model assumptions.

### Deeper System Modeling

- Add auditable contention, shared-bandwidth, or calibration behavior on top of
  the existing SRAM/intermediate/off-chip system model.
- Add meaningful metrics such as effective bandwidth under contention,
  contention-adjusted transfer time, or calibration-adjusted performance.
- Expose new metrics consistently in JSON, Markdown reports, comparison output,
  and the visualizer.
- Validate new config fields with actionable errors.

### More Published Cards

- Add at least 3 to 4 new source-backed published photonic accelerator cards.
- Prioritize recent high-performance photonic GEMM, tensor processor, or
  closely related accelerator results.
- Include citations, DOI or stable source identifiers where available,
  assumptions, local surrogate labels, source-quality metadata, generated
  Markdown/JSON reports, comparison output, and visualizer payloads.
- Avoid presenting local model estimates as measured published results.

### CLI And Workflow Usability

- Improve error messages and validation feedback around common mistakes.
- Make complex model and full transformer workflows easier to define, inspect,
  or regenerate.
- Add focused tests and docs for any user-facing command, option, or error
  behavior.

## Rules

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of every cycle.
- Keep `tasks/todo.md` aligned with the active goal.
- Before marking any checklist item DONE, verify the change and record proof.
- Keep generated artifacts fresh after changing models, schemas, reports,
  visualizer output, examples, docs, or artifact recipes.
- Run the mandatory Hostile Senior Reviewer critique after substantial
  implementation and fix important findings.
- Preserve conservative source boundaries and local-surrogate labeling.

## Stop Condition

Completed when all of the following are true:

- PR #4 is merged into `master` and local `master` is clean and current.
- Meaningful improvements have landed in visualizer, system modeling, published
  cards, and CLI/workflow usability surfaces.
- Documentation and generated artifacts are updated.
- All checklist items are DONE with proof.
- Ruff, pytest, artifact freshness, JavaScript syntax, browser smoke, JSON
  parsing, and other focused new checks pass or any inability to run them is
  recorded.
- Hostile Senior Reviewer critique is complete and major findings are fixed or
  explicitly justified.
