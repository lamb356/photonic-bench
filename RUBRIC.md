# PhotonicBench Autonomous Loop Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## Merge Quality

- PR #4 is inspected before merge.
- CI is confirmed green before merge.
- The merge target is `master`.
- Local `master` is synced after merge.
- The worktree is clean before new feature work begins.

## Visualizer Quality

- Comparison mode helps a daily user decide between cards, profiles, and model
  assumptions quickly.
- Deltas, ratios, pinned selections, grouping, saved presets, exports, Pareto
  or frontier views, scorecards, stale-artifact handling, and mixed-schema
  behavior remain coherent.
- Source-reported metrics, local surrogate estimates, and local system-model
  assumptions remain visibly separated.
- The UI stays dense, work-focused, responsive, and free of overlapping text or
  fragile layout shifts.
- Browser smoke and JavaScript syntax checks cover changed visualizer behavior.

## System Modeling Quality

- Contention, shared-bandwidth, calibration, overlap, and transfer timing
  assumptions are explicit and auditable.
- Memory hierarchy behavior remains clear across SRAM, intermediate/cache, and
  off-chip tiers.
- New metrics are useful for real comparison work, not merely extra fields.
- Defaults are conservative and documented.
- Invalid or inconsistent config fails with actionable errors.
- JSON, Markdown reports, comparison output, and visualizer surfaces expose new
  metrics without blurring measured paper claims and local model estimates.

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
- Visualizer docs explain changed comparison, preset, export, import, and
  boundary-label behavior.
- Artifact freshness verification passes after regeneration.

## Verification Quality

- Focused tests cover new system, visualizer, card, and CLI behavior.
- Full `python -m ruff check` passes.
- Full `python -m pytest -q` passes.
- `python -m photonic_bench.cli verify-artifacts` passes.
- `node --check photonic_bench\visualizer_assets\app.js` passes after JS
  changes.
- Browser smoke passes after visualizer behavior changes.
- JSON schemas and generated JSON parse.
- `git diff --check` passes before final commit.

## Review Readiness

- All checklist DONE items include proof.
- State files are current.
- The mandatory Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Important critique findings are fixed before completion or explicitly
  justified.
- Remaining risks are named plainly.

## Final Closeout Status

- Complete.
- PR #4 was merged into `master` after green CI.
- Follow-up improvements landed in visualizer analytics, contention-aware
  system modeling, new published-card surrogates, and CLI workflow usability.
- Documentation, schemas, checked generated artifacts, tests, and visualizer
  payloads were refreshed.
- Mandatory Hostile Senior Reviewer critique was completed and all recorded
  findings were fixed.
- Final local gates passed: Ruff, pytest, artifact freshness, JavaScript
  syntax, browser smoke, JSON/schema validation, and `git diff --check`.
- Implementation commit `9c96ac6` was pushed to
  `origin/codex/pr4-followup-improvements`; closeout state is committed and
  pushed afterward.
