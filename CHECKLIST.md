# PhotonicBench Daily-Use Improvement Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Cycle Control

- [x] DONE: Roll state files forward and create the prioritized checklist.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` describe the visualizer/cards/modeling daily-use goal.
    - `tasks/todo.md` marks the branch-protection goal complete and this goal
      active.
    - The checklist prioritizes visualizer work first, then cards, then
      modeling/transformer support.
  - Proof:
    - Re-read all five required state files at the start of the cycle.
    - Re-read `tasks/todo.md`.
    - Inspected repository root, git status, recent commits, remotes,
      `pyproject.toml`, `README.md`, `photonic_bench/cli.py`, and
      `photonic_bench/visualizer.py`.
    - Confirmed current branch is clean `master` tracking `origin/master`.
    - Confirmed latest commit is
      `397c50b Record public branch protection completion`.
    - Confirmed no PhotonicBench-specific memory-registry hits were found for
      this workspace.

## Task 1: Visualizer Architecture Recon

- [x] DONE: Map the current visualizer data path, UI behavior, tests, and docs.
  - Done when:
    - Current artifact discovery, payload loading, comparison UI, generated
      assets, and serve/static modes are understood.
    - Existing visualizer tests and smoke tests are identified.
    - The implementation plan for analytics, presets, and exports is recorded
      in `PROGRESS.md`.
  - Proof:
    - Mapped Python discovery/indexing in `photonic_bench/visualizer.py`.
    - Mapped static UI assets in `photonic_bench/visualizer_assets/`.
    - Mapped comparison table generation in `photonic_bench/comparison.py`.
    - Mapped model and transformer report data in `photonic_bench/model.py`,
      `photonic_bench/json_report.py`, and `photonic_bench/transformer.py`.
    - Identified visualizer unit coverage in `tests/test_visualizer.py` and
      Playwright coverage in `tests/test_visualizer_smoke.py`.
    - Recorded the implementation path in `PROGRESS.md`.

## Task 2: Visualizer Comparison Analytics

- [x] DONE: Add richer comparison analytics for daily use.
  - Done when:
    - Comparison mode surfaces practical analytical summaries for selected
      cards, including energy/op, throughput, latency, total energy, published
      reference availability, calibration status, and provenance boundaries.
    - Mixed matmul/transformer selections remain readable and schema-aware.
    - Important ratios/deltas are computed deterministically and tested.
    - Documentation describes how to interpret the new analytics.
  - Proof:
    - Added comparison brief, grouped insights, operational-intensity ranking,
      interface-traffic metrics, and boundary notes in the visualizer.
    - Preserved mixed-schema comparison behavior with schema-aware grouping and
      `n/a` cross-schema deltas.
    - Updated README visualizer docs with the new analytics behavior.
    - Verified via `tests/test_visualizer.py` and
      `tests/test_visualizer_smoke.py`.

## Task 3: Saved Comparison Presets

- [x] DONE: Add saved comparison presets.
  - Done when:
    - Users can save or load named comparison selections without hand-editing
      generated HTML.
    - Presets survive visualizer regeneration through a documented config or
      generated data asset.
    - Invalid or stale preset entries degrade clearly.
    - Tests cover preset loading and at least one stale-entry case.
  - Proof:
    - Added `reports/visualizer_presets.json` with two static generated
      presets.
    - Added visualizer discovery/loading for
      `photonic-bench-comparison-presets-v1`.
    - Added browser local-storage save/load/delete support for user presets.
    - Added stale preset ID warnings through visualizer issues.
    - Covered preset indexing, stale IDs, and browser preset loading in tests.

## Task 4: Exportable Comparison Results

- [x] DONE: Make comparison results exportable.
  - Done when:
    - The visualizer can export the current comparison as machine-readable data.
    - The visualizer can export or copy a human-readable summary/table.
    - Exported data includes enough context to preserve local-model vs published
      reference boundaries.
    - Browser smoke coverage verifies the export path.
  - Proof:
    - Added `photonic-bench-comparison-export-v1` browser JSON export.
    - Added Markdown download, copy fallback, and read-only export preview.
    - Export payload includes selected IDs, pinned reference, local metrics,
      provenance status, boundary tags, and modeling-boundary notes.
    - Playwright smoke verifies generated preset loading and JSON/Markdown
      export buttons.

## Task 5: Published Accelerator Cards

- [x] DONE: Add at least 2-3 new high-quality published accelerator cards.
  - Done when:
    - At least 2-3 new YAML configs are added under `examples/`.
    - Each new card cites a published photonic accelerator source with DOI,
      title, venue/year where available, and paper-reported metrics.
    - Each new card has regenerated Markdown and JSON reports.
    - New cards are included in comparison and visualizer example artifacts.
    - Tests or assertions cover the new example configs and generated artifacts.
  - Proof:
    - Added `examples/feldmann_2021_photonic_tensor_core_surrogate.yaml`.
    - Added `examples/pappas_2025_awgr_262tops_surrogate.yaml`.
    - Added `examples/taichi_2024_chiplet_surrogate.yaml`.
    - Generated matching Markdown and JSON reports under `reports/`.
    - Included all three in `reports/comparison.md`, visualizer payloads, and
      the generated published-reference surrogate preset.
    - Added tests for provenance, DOI/source fields, published metrics, and
      surrogate-boundary assumptions.

## Task 6: Modeling Or Transformer Support

- [x] DONE: Improve model realism or transformer workflow convenience.
  - Done when:
    - A concrete modeling or transformer-support gap is selected based on code
      inspection.
    - The change remains auditable and does not conflate local estimates with
      published measurements.
    - Unit tests cover formulas, validation, and CLI behavior as applicable.
    - Docs and generated artifacts reflect the new behavior.
  - Proof:
    - Added auditable converter-interface memory traffic to the core model:
      vector operand read bytes, weight operand read bytes, output write bytes,
      total interface bytes, MACs/byte, and equivalent ops/byte.
    - Added aggregate transformer-layer interface-traffic summaries recomputed
      from decomposed matmul cards.
    - Kept memory traffic explicitly scoped as converter-boundary traffic, not
      cache/SRAM/DRAM/NoC simulation.
    - Updated report JSON, Markdown reports, comparison tables, schemas, model
      docs, and visualizer details.
    - Covered formulas and aggregate behavior in model, JSON report, Markdown
      report, transformer, schema, and comparison tests.

## Task 7: Documentation And Generated Artifacts

- [x] DONE: Update docs and regenerate examples.
  - Done when:
    - README documents visualizer analytics, presets, exports, new cards, and
      modeling/transformer changes.
    - Schema/model docs are updated if output structure or formulas change.
    - Reports, comparison artifacts, and visualizer assets are regenerated.
    - Generated artifacts are inspected for obvious stale or broken content.
  - Proof:
    - Updated `README.md`, `docs/model.md`, `docs/json_schema.md`, and both
      JSON schemas for memory traffic, presets, exports, and new cards.
    - Regenerated all affected example reports and transformer summaries.
    - Regenerated `reports/comparison.md`.
    - Regenerated `reports/visualizer/index.html`, index data, payloads, and
      copied static assets.
    - `python -m photonic_bench.cli visualize --reports-dir reports --output
      reports/visualizer/index.html` reports 26 artifacts and 0 warnings.

## Task 8: Verification

- [x] DONE: Run focused, full, and browser verification.
  - Done when:
    - Focused tests for modified areas pass.
    - `python -m ruff check` passes.
    - `python -m pytest` passes.
    - Visualizer generation succeeds.
    - Static and/or served visualizer browser smoke tests pass.
  - Proof:
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `python -m ruff check` passed.
    - `python -m pytest` passed: 77 tests passed, including
      `tests/test_visualizer_smoke.py`.
    - Visualizer generation passed with 26 artifacts and 0 warnings.
    - Focused visualizer/model/card/schema tests passed during development
      before the final full suite.

## Task 9: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Critique usability and modeling clarity, then fix important issues.
  - Done when:
    - The five required state files are re-read before the critique pass.
    - Findings are recorded in `PROGRESS.md`.
    - Important issues are fixed or explicitly justified.
    - Post-fix verification still passes.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` before the critique pass.
    - Recorded critique findings and fixes in `PROGRESS.md`.
    - Fixed missing-value unit formatting in visualizer exports/metrics.
    - Renamed the generated published preset to
      `Published reference surrogate cards` to avoid implying paper
      reproduction.
    - Re-ran visualizer generation, `node --check`, Ruff, and full pytest after
      fixes.

## Task 10: Final Closeout

- [x] DONE: Close state files and inspect final repository status.
  - Done when:
    - All checklist items are DONE with proof.
    - `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` reflect the
      final verified state.
    - Final `git status --short --branch` is inspected.
    - Commit/push is completed if this goal produces committable changes.
  - Proof:
    - `CHECKLIST.md`, `CONTEXT.md`, `GOAL.md`, `PROGRESS.md`, `RUBRIC.md`,
      and `tasks/todo.md` reflect the verified daily-use improvement goal.
    - `git status --short --branch` was inspected during closeout and showed
      only the expected goal changes before commit.
    - The goal changes are being committed and pushed as the final repository
      closeout action; the final response records the resulting commit/push
      proof.
