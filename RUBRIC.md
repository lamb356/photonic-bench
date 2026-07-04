# PhotonicBench Advanced Visualizer Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## URL State Quality

- Shared URLs restore filters, focus mode, selected artifacts, pinned artifact,
  Pareto mode, and custom score weights where relevant.
- URL parameters are stable, compact, human-inspectable enough for review, and
  backward-safe when artifacts are missing or renamed.
- Browser history remains useful and does not receive noisy updates for every
  minor keystroke.

## Visual Regression Quality

- Desktop and mobile screenshots cover representative artifact list,
  comparison dashboard, wide table, score explanation, and preset surfaces.
- Screenshots are deterministic enough for local and CI review.
- Failure output points to actual UI regressions rather than timing flake.
- Documentation explains how to run and update baselines.

## Explainability And Weighting Quality

- Recommendation scores expose raw values, normalization direction, weights,
  component contributions, and final score.
- Custom weights update recommendation cards, scorecards, exports, URL state,
  and score explanations consistently.
- Defaults remain sensible for balanced, efficiency, throughput, contention,
  and provenance analysis.
- UI copy labels scores as local same-schema triage heuristics, not benchmark
  claims.

## Selection And Wide-Table Quality

- Users can remove one selected artifact, clear a group, invert selection, and
  compare top N visible without losing context.
- Selection controls are dense, predictable, keyboard reachable, and compatible
  with filters/grouping.
- Wide comparison tables keep the header and first column available without
  hiding important data or causing incoherent overlap.

## Export And Preset Quality

- `photonic-bench-comparison-export-v1` has a formal JSON schema.
- Browser JSON exports validate against the schema.
- Export payloads include enough state to reproduce the comparison context.
- Browser-local preset import validates shape and gives clear errors.
- Browser-local preset export is deterministic and does not corrupt generated
  presets.

## Accessibility Quality

- Keyboard users can reach and operate rail controls, comparison controls,
  selection controls, score drilldowns, and preset import/export.
- Interactive controls have meaningful labels, roles, and focus states.
- Reduced-motion preferences are honored.
- Contrast remains usable in dense dashboard areas.

## Modeling Boundary Quality

- Published-reference metrics remain visibly separate from local estimates.
- Local surrogate labels, source-quality grades, system-profile assumptions,
  interface-traffic estimates, transformer aggregate timing/noise semantics,
  and contention assumptions remain visible.
- No UI copy suggests that local heuristics, local system movement estimates,
  or scorecard rankings are measured hardware results.

## Documentation And Artifact Quality

- README visualizer documentation explains changed controls and exports.
- JSON schema documentation covers the comparison export schema.
- Generated `reports/visualizer/` assets reflect source asset changes.
- Artifact freshness verification passes after regeneration.

## Verification Quality

- Focused visualizer tests cover changed static UI strings and source behavior.
- Browser smoke covers representative interaction paths.
- Visual regression tests cover desktop and mobile.
- `node --check photonic_bench\visualizer_assets\app.js` passes.
- Relevant focused pytest tests pass.
- Full `python -m ruff check` and `python -m pytest -q` pass before final
  closeout.
- `python -m photonic_bench.cli verify-artifacts` passes.
- `git diff --check` passes before completion.

## Review Readiness

- All checklist DONE items include proof.
- State files are current.
- A pull request is open against `master`.
- The mandatory Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Important critique findings are fixed before completion or explicitly
  justified.
- Remaining risks are named plainly.

## Final Closeout Status

- Complete.
- All ten required improvements landed with source, docs, generated artifacts,
  and tests.
- PR #5 is open and ready for review against `master`.
- Mandatory Hostile Senior Reviewer critique completed with two non-critical
  findings, both fixed.
- Final gates passed: focused visualizer tests, browser smoke, visual
  regression, JavaScript syntax, Ruff, full pytest, artifact freshness, and
  `git diff --check`.
- Remaining risk: screenshot baselines are intentionally tied to Playwright
  Chromium layout. The comparator prefers platform-specific checked baselines
  when present and tolerates smaller cross-platform font rasterization
  differences, but baselines should still be refreshed only after reviewed UI
  changes.
