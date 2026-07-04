# PhotonicBench Commit And Visualizer Rubric

Use this rubric for checklist completion decisions and for the mandatory
hostile senior reviewer critique.

## Baseline Commit Quality

- Git status and diff are inspected before staging.
- The hardened baseline is committed before visualizer implementation starts.
- The commit message is clear, professional, and written in imperative mood.
- The commit does not include generated cache directories or unrelated local
  junk.
- The commit has no Codex attribution or co-author footer.
- No push is performed.

## Artifact Discovery

- Discovery walks report directories recursively.
- Discovery considers JSON files only.
- Malformed or unsupported JSON does not crash the entire index.
- Index entries preserve source paths in browser-friendly relative form.
- Per-card and aggregate artifacts are both represented.
- Nested transformer-layer report directories are covered.

## Schema-Aware Loading

- Loader branches first on `schema_version`.
- `photonic-bench-report-v1` and
  `photonic-bench-transformer-layer-report-v1` have separate adapter paths.
- Unknown schemas surface a clear unsupported-artifact message.
- Required summary fields are read from structured JSON, not scraped Markdown.
- Numeric values are handled consistently and formatted only at presentation
  boundaries.

## Transformer Detail Correctness

- The detail view shows layer shape, workload totals, local energy, timing,
  noise diagnostics, formula audit rows, per-matmul rows, assumptions,
  exclusions, aggregate semantics, and provenance when present.
- Serial timing is explicitly labeled as serial.
- Noise is explicitly labeled as non-additive diagnostic extrema.
- Exclusions are visible without requiring the user to inspect raw JSON.
- Published references and local model estimates are visually and textually
  distinct.
- Formula audit status is visible and future mismatches would be noticeable.

## UI Quality

- The first screen is the usable visualizer, not a marketing page.
- The layout is compact, workbench-like, and easy to scan.
- Cards are used only for repeated artifact/detail panels, not nested page
  sections.
- Typography, spacing, and color choices support technical inspection.
- Text does not overlap or overflow in compact viewports.
- The UI does not imply precision or modeling confidence beyond the JSON
  contract.

## Test Quality

- Tests cover discovery over root and nested `reports/` JSON.
- Tests cover schema routing and unsupported schema behavior.
- Tests cover transformer aggregate summary/detail content.
- Generated HTML or data assets are checked for key concept labels.
- `python -m pytest` passes.
- `python -m ruff check` passes.

## Documentation And Usability

- README or docs describe how to generate and open the visualizer.
- Documentation states that JSON is the machine interface and Markdown is not
  scraped.
- Documentation explains the initial scope and key modeling boundaries.
- Example commands are runnable from a fresh checkout.

## Review Readiness

- Checklist DONE items include proof.
- State files are current.
- The hostile senior reviewer critique is recorded in `PROGRESS.md`.
- Major critique findings are fixed before completion.
- Remaining risks are named plainly and are not disguised as solved.
