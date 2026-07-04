# PhotonicBench Goal

Date started: 2026-07-03

## Objective

Create a clean commit of the current hardened PhotonicBench state, including
the transformer-layer aggregate JSON work, then build the first working web
visualizer foundation.

The visualizer must discover checked-in report artifacts, load both supported
JSON schemas, and display a transformer-layer aggregate report without blurring
the modeling boundaries that the benchmark cards were built to preserve.

## Primary Objectives

1. Commit the hardened baseline with a clear professional message.
2. Add artifact discovery and indexing over report directories.
3. Add schema-aware loading for:
   - `photonic-bench-report-v1` per-matmul JSON cards.
   - `photonic-bench-transformer-layer-report-v1` aggregate layer JSON.
4. Build a basic transformer-layer detail view.
5. Present key concepts clearly:
   - local model estimates versus published references;
   - serial transformer-layer timing;
   - non-additive aggregate noise diagnostics;
   - transformer-layer exclusions;
   - assumptions and provenance.
6. Verify the implementation with tests and documentation.
7. Run a mandatory hostile senior reviewer critique and fix major findings.

## Initial Scope

The first visualizer pass is intentionally a local-first static workbench backed
by checked-in JSON artifacts. It should be useful immediately without inventing
a server-side product surface.

In scope:

- Generate a discoverable artifact index from JSON files under `reports/`.
- Load and normalize supported report schemas through a small adapter layer.
- Render artifact lists and schema-specific summaries.
- Render a transformer-layer aggregate detail view with layer shape, aggregate
  totals, energy/timing/noise semantics, formula audit rows, per-matmul rows,
  assumptions, exclusions, and provenance.
- Document how to generate/open the visualizer.
- Add focused tests for discovery, schema routing, and generated page content.

Out of initial scope:

- File upload.
- Persistent user settings.
- Backend APIs.
- Full comparison dashboards.
- Interactive chart libraries.
- MLCommons-style proposal implementation.
- Pushes or pull requests.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`
  have been re-read at the start of each cycle.
- The hardened baseline has been committed.
- The visualizer can discover, load, and display both per-matmul cards and
  transformer-layer aggregate reports.
- A transformer-layer aggregate detail view is working for checked-in examples.
- Key modeling concepts are visible in the UI without overstating what is
  modeled.
- Documentation explains how to generate/open the visualizer.
- Relevant tests pass.
- `python -m pytest` passes.
- `python -m ruff check` passes.
- All checklist items for the baseline commit and initial visualizer are marked
  DONE with proof.
- A hostile senior reviewer critique is recorded in `PROGRESS.md`, and major
  issues are fixed or explicitly justified.
