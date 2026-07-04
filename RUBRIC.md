# PhotonicBench Commit, Push, Visualizer Polish, And Proposal Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## Commit And Push Quality

- The current working tree is verified before commit.
- `python -m pytest` passes before any push.
- `python -m ruff check` passes before any push.
- Git status and diff/stat are inspected before staging.
- Files are staged explicitly.
- Commit messages are descriptive, imperative, and have no Codex attribution or
  co-author footer.
- Push target is explicit and recorded.
- No push is performed after failed verification.

## Comparison Analytics

- Users can select multiple artifacts without losing the current detail view.
- Users can pin one selected artifact as the reference for compatible metrics.
- Comparison rows show baseline values, selected values, absolute deltas,
  percent deltas, and ratios where those numbers are meaningful.
- Same-schema comparisons provide grouped metric sections and useful
  best/worst or ranking cues.
- Mixed-schema comparisons are allowed but clearly labeled and avoid false
  equivalence.
- Transformer aggregates keep serial timing and non-additive noise caveats.
- Per-matmul cards keep local-model and published-reference separation.
- Clear, pin, filter, and comparison actions are easy to find.

## UI Quality

- The first screen remains the usable visualizer workbench, not a landing page.
- Layout is compact, dense, and suitable for repeated technical inspection.
- Controls match their jobs: search inputs, selects for filters, checkboxes for
  selection, and buttons for commands.
- Cards are not nested inside cards.
- Text does not overlap or overflow in compact viewports.
- The UI does not imply precision or modeling confidence beyond the JSON
  contract.

## Schema And Detail Correctness

- Loader branches first on `schema_version`.
- `photonic-bench-report-v1` and
  `photonic-bench-transformer-layer-report-v1` have separate adapter paths.
- Unknown schemas surface clear unsupported-artifact messages.
- Per-matmul detail view shows workload, local energy, timing, assumptions,
  published reference separation, and provenance when present.
- Transformer detail view shows layer shape, workload totals, local energy,
  serial timing, non-additive noise diagnostics, formula audit rows,
  per-matmul rows, assumptions, exclusions, aggregate semantics, and provenance.
- Numeric values are formatted at presentation boundaries only.

## Scaling And Smoke

- Static generation still creates a portable `file://` visualizer.
- Server mode remains available and serves payload JSON on demand.
- Browser paths and payload identifiers are stable and do not expose arbitrary
  filesystem traversal.
- Playwright smoke opens the visualizer, exercises representative details, and
  checks comparison mode.
- Smoke coverage fails on page errors and unexpected console errors.

## MLCommons-Style Proposal Quality

- The proposal cites or links current official MLCommons context for process,
  metrics, reproducibility, or submission expectations where relevant.
- Scope is clear about what photonic acceleration surfaces are included and
  excluded.
- Workload classes are concrete enough to guide future benchmark
  implementation.
- Metrics include units, directionality, required provenance, and compatibility
  notes.
- Reproducibility requirements describe config, code, environment, calibration,
  source data, generated artifacts, and audit expectations.
- The proposal separates benchmark rules from PhotonicBench's current modeling
  limitations.
- Open questions are decision-grade, not vague placeholders.

## Test And Documentation Quality

- Unit tests cover new visualizer behavior where practical.
- Playwright smoke covers the critical browser flow after asset changes.
- README/docs explain new comparison behavior and proposal artifacts.
- Generated visualizer examples are regenerated after source asset changes.
- `python -m pytest` passes.
- `python -m ruff check` passes.

## Review Readiness

- Checklist DONE items include proof.
- State files are current.
- The Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Major critique findings are fixed before completion or explicitly justified.
- Remaining risks are named plainly.
