# PhotonicBench Goal

Date started: 2026-07-04

## Objective

Commit the current visualizer work, then evolve the PhotonicBench visualizer
into a more useful analytical workbench with stronger comparison tools, a real
browser smoke test, and a practical scaling path for larger artifact sets.

## Required Outcomes

1. Create a clean commit of the current visualizer state before new feature
   work proceeds.
2. Improve comparison mode so it supports pinned selections, deltas, ratios,
   and clearer grouped or mixed-schema analysis.
3. Add a Playwright browser smoke test as a project dev dependency.
4. Implement a working local `--serve` mode for the visualizer so large report
   directories can be browsed without writing or embedding every full payload
   into the generated static artifact tree.

## Scope

In scope:

- Preserve the static command:
  `python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html`.
- Add a simple server command through the same visualizer CLI surface, for
  example:
  `python -m photonic_bench.cli visualize --reports-dir reports --serve`.
- Keep static `file://` usage working for generated visualizers.
- Make server mode load the artifact index and payloads on demand over HTTP
  from source reports instead of duplicating all payloads into generated
  payload assets.
- Preserve schema-aware adapters for:
  - `photonic-bench-report-v1` per-matmul benchmark cards;
  - `photonic-bench-transformer-layer-report-v1` transformer-layer aggregate
    summaries.
- Extend comparison mode with pinned/reference artifacts, absolute deltas,
  ratios, grouped per-schema sections, and explicit mixed-schema caveats.
- Keep local model estimates, published references, serial transformer timing,
  non-additive aggregate noise diagnostics, exclusions, assumptions, and
  provenance visibly separate.
- Add and document Playwright smoke coverage that exercises the generated
  visualizer in a real browser.
- Update README/docs, generated examples, tests, and state files.
- Run a hostile senior reviewer critique focused on code quality, usability,
  scalability, and maintainability, then fix significant findings.

Out of scope:

- File upload workflow.
- Hosted backend service or deployment.
- Persistent user settings.
- Charting-library dashboards.
- MLCommons-style proposal implementation.
- Pushes or pull requests.

## Scaling Choice

Implement `--serve`.

The existing static output already keeps the HTML small by splitting index and
payload assets, but static `file://` support requires executable payload
wrappers beside JSON payload copies. Server mode should avoid that duplication
for larger corpora by serving:

- the visualizer HTML shell;
- static CSS and JavaScript assets;
- a lightweight JSON index;
- individual artifact payload JSON on demand.

Static output remains the portable artifact for `file://` use. Server mode is
the practical scaling path for larger local report directories.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` have
  been re-read at the start of each cycle.
- All checklist items are marked DONE with proof.
- The current visualizer state has been committed with a clear descriptive
  message and no push has been performed.
- Comparison mode supports pinned selections, deltas, ratios, grouped
  same-schema comparison, and labeled mixed-schema comparison.
- Playwright is declared as a dev dependency and a browser smoke test is part
  of the project test surface.
- A working `--serve` mode avoids generating or embedding all payloads while
  preserving the existing static `file://` visualizer path.
- Documentation explains static generation, server mode, comparison analytics,
  Playwright smoke testing, and modeling boundaries.
- The checked-in visualizer example has been regenerated where appropriate.
- `python -m pytest` passes.
- `python -m ruff check` passes.
- The Playwright browser smoke test passes.
- A hostile senior reviewer critique is recorded in `PROGRESS.md`, and major
  issues are fixed or explicitly justified.
