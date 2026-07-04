# PhotonicBench Autonomous Loop Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## Publish Quality

- The current branch is committed before additional high-risk feature work.
- Commits are logical, reviewable, and free of Codex attribution.
- The branch is pushed to `origin`.
- The pull request targets `master`, has a clear title and body, and states
  validation performed.
- PR scope is understandable even though generated artifacts are included.

## Visualizer Quality

- Comparison mode helps a daily user decide between cards, profiles, and model
  assumptions quickly.
- Deltas, ratios, pinned selections, grouping, saved presets, exports, Pareto
  or frontier views, decision scorecards, and stale-artifact handling remain
  coherent.
- Source-reported metrics, local surrogate estimates, and local system-model
  assumptions remain visibly separated.
- The UI stays dense, work-focused, responsive, and free of overlapping text or
  fragile layout shifts.
- Browser smoke and JavaScript syntax checks cover changed visualizer behavior.

## System Modeling Quality

- Memory hierarchy changes are explicit and auditable, including SRAM,
  intermediate/cache, and off-chip tiers where modeled.
- Bandwidth, movement energy, timing, serialization/overlap, reuse, and
  profile assumptions are named instead of hidden.
- Defaults are conservative and documented.
- Invalid or inconsistent config fails with actionable errors.
- JSON, Markdown reports, comparison output, and visualizer surfaces expose the
  new metrics without blurring measured paper claims and local model estimates.

## Published-Card Quality

- New cards are source-backed and cite the relevant paper, DOI, or stable
  source.
- Local surrogate labels and source-quality metadata are conservative.
- Source-reported metric coverage is recorded.
- Generated artifacts are reproducible and included.
- The project does not overclaim that local estimates reproduce published
  hardware measurements beyond documented calibration or surrogate assumptions.

## CLI And Usability Quality

- CLI improvements reduce real friction in common workflows.
- Error messages identify the bad file, field, value, and likely fix where
  feasible.
- New options compose with existing commands and preserve backward
  compatibility unless a breaking change is explicitly justified.
- Tests and docs cover user-facing behavior.

## Documentation And Artifact Quality

- README examples stay runnable.
- Model docs explain formulas and assumptions.
- Schema docs and JSON schemas stay aligned with generated JSON.
- Visualizer docs explain changed comparison, preset, export, and import
  behavior.
- Artifact freshness verification passes after regeneration.

## Verification Quality

- Focused tests cover new system, visualizer, card, and CLI behavior.
- Full `python -m ruff check` passes.
- Full `python -m pytest` passes.
- `python -m photonic_bench.cli verify-artifacts` passes.
- `node --check photonic_bench\visualizer_assets\app.js` passes after JS
  changes.
- Browser smoke passes after visualizer behavior changes.
- `git diff --check` passes before final commit.

## Review Readiness

- All checklist DONE items include proof.
- State files are current.
- The mandatory Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Important critique findings are fixed before completion or explicitly
  justified.
- Remaining risks are named plainly.
