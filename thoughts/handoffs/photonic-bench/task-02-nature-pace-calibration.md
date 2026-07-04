---
date: 2026-07-03T17:49:03.7230951-05:00
task_number: 2
task_total: 2
status: success
---

# Task Handoff: Nature PACE 64x64 Calibration

## Task Summary

Calibrate the 64x64 benchmark path against a published photonic accelerator paper by adding explicit provenance fields, source-backed published calibration values, a separate Nature PACE example, and generated Markdown report.

## What Was Done

- Added optional `provenance` fields to benchmark configs.
- Added optional `published_calibration` fields for source-reported accelerator metrics.
- Added derived published calibration results for TOPS/W to pJ/op, pJ/MAC, and workload pJ conversions.
- Updated Markdown reports with `Provenance` and `Published Calibration` sections.
- Added `examples/nature_pace_64x64.yaml` for the Nature 2025 PACE 64x64 matrix-vector accelerator.
- Generated `reports/nature_pace_64x64.md`.
- Updated README, model docs, and task ledger.
- Added tests for provenance parsing, calibration math, report rendering, and the Nature example.

## Files Modified

- `photonic_bench/config.py` - Added provenance and published calibration dataclasses/parsing.
- `photonic_bench/model.py` - Added published calibration derived energy calculations.
- `photonic_bench/report.py` - Added provenance and published calibration report sections.
- `examples/nature_pace_64x64.yaml` - Added source-backed Nature PACE config.
- `reports/nature_pace_64x64.md` - Generated source-backed benchmark card.
- `reports/matmul_64x64.md` - Regenerated with current report renderer.
- `tests/test_config.py` - Added provenance/calibration parsing coverage.
- `tests/test_examples.py` - Added Nature PACE example coverage.
- `tests/test_report.py` - Added provenance/calibration rendering coverage.
- `README.md` - Documented calibration workflow and Nature PACE values.
- `docs/model.md` - Documented published calibration formulas.
- `tasks/todo.md` - Marked Task 2 done and set Task 3 to JSON export.

## Decisions Made

- Keep published calibration separate from the component model: avoids falsely implying a first-principles reproduction.
- Encode PACE as `m=1, k=64, n=64`: the Nature system is a 64x64 matrix-vector oMAC engine, not a full 64x64 by 64x64 matrix-matrix run.
- Derive energy from paper-reported TOPS/W using `pJ/op = 1 / TOPS_per_W`: this is auditable and unit-stable.
- Preserve the original starter example: calibration lives in a new file rather than rewriting the local assumption example.

## Patterns/Learnings for Next Tasks

- Reports can now carry two layers of truth: local component-model estimates and source-reported calibration targets.
- Any future source-backed card should use `provenance` and `published_calibration` instead of embedding paper facts in free text only.
- The current component model is intentionally simple and may disagree with source-reported total energy; the ratio is shown explicitly.
- The next high-leverage step is machine-readable JSON export so reports can be compared and diffed without parsing Markdown.

## TDD Verification

- [x] Tests written BEFORE implementation.
- [x] New tests failed first due to missing provenance/calibration API.
- [x] Tests run: `python -m pytest` -> 10 passing, 0 failing.
- [x] Refactoring kept tests green.

## Code Quality

- Issues found: 0 in final `ruff check .`.
- Issues auto-fixed: 0.
- Remaining issues: None.

## Issues Encountered

- The source paper reports a matrix-vector engine, so the calibrated workload is `1 x 64` times `64 x 64`; this differs from the starter `64 x 64` by `64 x 64` config.
- The published TOPS/W values are system-level metrics. They are carried in `published_calibration` rather than forced into the component-level energy fields.

## Next Task Context

Task 3 should add JSON export beside Markdown. It should serialize config metadata, workload counts, component-model energy/timing/noise results, provenance, and published calibration derived values so cards can be compared programmatically.
