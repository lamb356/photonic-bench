# PhotonicBench Visualizer Comparison And Scaling Rubric

Use this rubric for checklist completion decisions and the mandatory hostile
senior reviewer critique.

## Commit Quality

- The current visualizer evolution state is committed before new feature work.
- Git status and diff are inspected before staging.
- Files are staged explicitly.
- Commit message is descriptive, imperative, and has no Codex attribution or
  co-author footer.
- No push is performed.
- Commit hash is recorded in `PROGRESS.md`.

## Comparison Analytics

- Users can select multiple artifacts without losing the current detail view.
- Users can pin one selected artifact as the reference for compatible metrics.
- Comparison rows show baseline values, selected values, absolute deltas, and
  ratios where those numbers are meaningful.
- Same-schema comparisons get grouped metric sections with richer compatible
  rows.
- Mixed-schema comparisons are allowed but clearly labeled and avoid false
  equivalence.
- Transformer aggregates keep serial timing and non-additive noise caveats.
- Per-matmul cards keep local-model and published-reference separation.
- Clear and pin actions are easy to find.

## Scaling Mode

- Static generation still creates a portable `file://` visualizer.
- Server mode is available from the visualizer CLI with simple host and port
  options.
- Server mode serves the shell, CSS, JavaScript, lightweight index, and
  individual payload JSON on demand.
- Server mode does not require writing duplicated payload JSON/script assets.
- Server routes preserve schema-aware loading and unsupported/malformed
  artifact warnings.
- Browser paths and payload identifiers are stable and do not expose arbitrary
  filesystem traversal.
- Server shutdown behavior is documented and humane for local CLI use.

## Browser Smoke

- Playwright is declared as a development dependency.
- A checked-in smoke test launches Chromium.
- Smoke coverage opens the visualizer, selects representative per-matmul and
  transformer aggregate artifacts, and exercises comparison mode.
- Smoke coverage fails on page errors and unexpected console errors.
- The smoke test can run from a fresh checkout after installing dev
  dependencies.

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

## UI Quality

- The first screen remains the usable visualizer workbench.
- Layout is compact, dense, and suitable for repeated technical inspection.
- Controls match their jobs: search inputs, selects for filters, checkboxes for
  selection, and buttons for commands.
- Cards are not nested inside cards.
- Text does not overlap or overflow in compact viewports.
- The UI does not imply precision or modeling confidence beyond the JSON
  contract.

## Test Quality

- Unit tests cover discovery, schema routing, generated static assets, and the
  server-mode data path.
- Tests cover comparison labels and at least one pinned/delta/ratio behavior.
- Playwright smoke covers a real browser flow.
- `python -m pytest` passes.
- `python -m ruff check` passes.

## Documentation And Usability

- README/docs explain static generation and direct `file://` opening.
- README/docs explain `--serve`, including when it is better for large report
  directories.
- README/docs explain comparison pinning, deltas, ratios, grouped sections, and
  mixed-schema caveats.
- README/docs explain Playwright smoke setup and invocation.
- Documentation states JSON is the machine interface and Markdown is not
  scraped.
- Example commands are runnable from a fresh checkout.

## Review Readiness

- Checklist DONE items include proof.
- State files are current.
- The hostile senior reviewer critique is recorded in `PROGRESS.md`.
- Major critique findings are fixed before completion or explicitly justified.
- Remaining risks are named plainly.
