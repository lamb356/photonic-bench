# PhotonicBench System-Model And Pareto Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Cycle Control

- [x] DONE: Roll state files forward and create the prioritized checklist.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` describe the system-model/Pareto/full-transformer/cards goal.
    - `tasks/todo.md` marks the previous daily-use visualizer/cards/modeling
      goal complete and this goal active.
    - The checklist prioritizes system model first, Pareto charting second,
      then full transformer support, published cards, and external loading.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of the cycle.
    - Re-read `tasks/todo.md`.
    - Verified `git status --short --branch` was clean on `master`.
    - Verified latest merged commit was `ab88d29 Merge pull request #1 from
      lamb356/codex/daily-use-analysis`.
    - Created working branch `codex/system-model-pareto`.

## Task 1: System-Model Recon

- [x] DONE: Map the current config, model, report, schema, transformer, and
      visualizer surfaces affected by multi-tier system modeling.
  - Done when:
    - Current memory-traffic formulas and generated report fields are mapped.
    - Config extension points for SRAM/off-chip tiers are selected.
    - JSON/Markdown/schema/visualizer update points are identified.
    - Implementation plan is recorded in `PROGRESS.md`.
  - Proof:
    - Recorded the existing converter-boundary traffic model and extension
      points in `CONTEXT.md` and `PROGRESS.md`.
    - Implemented the mapped surfaces in `photonic_bench/config.py`,
      `photonic_bench/model.py`, `photonic_bench/json_report.py`,
      `photonic_bench/report.py`, `photonic_bench/comparison.py`,
      `photonic_bench/transformer.py`, and `photonic_bench/visualizer.py`.

## Task 2: Multi-Tier System Model

- [x] DONE: Implement explicit SRAM and off-chip/DRAM interface tiers.
  - Done when:
    - Config supports explicit tier parameters with sensible defaults and
      validation.
    - Model computes per-tier bytes, bandwidth-limited transfer time, movement
      energy, total system movement energy, compute energy, and total system
      energy.
    - JSON and Markdown reports expose compute-vs-movement breakdowns.
    - Tests cover formulas, defaults, and validation failures.
  - Proof:
    - Added `MemoryTierConfig` and `SystemConfig` with default SRAM and
      off-chip tier parameters plus validation.
    - Added `local_model.system` and Markdown `Multi-Tier System Model`
      sections with per-tier bytes, movement energy, transfer time,
      movement share, total system energy, and bandwidth-limited throughput.
    - Covered formulas/defaults/validation in `tests/test_config.py`,
      `tests/test_model.py`, `tests/test_json_report.py`, and
      `tests/test_report.py`.

## Task 3: System Model In Comparison And Visualizer

- [x] DONE: Expose system-model metrics in comparison tables and visualizer
      detail/comparison views.
  - Done when:
    - Comparison tables include system movement energy, total system energy,
      movement share, and bandwidth-limited timing where useful.
    - Visualizer summaries/detail panels show the tier breakdown and model
      boundary notes.
    - Missing legacy fields degrade as `n/a`.
    - Tests cover visualizer indexing and display labels.
  - Proof:
    - `reports/comparison.md` now includes system total energy, system pJ/op,
      movement energy, movement share, and bandwidth-limited throughput.
    - Visualizer detail/comparison/export paths expose system fields and
      boundary notes.
    - `tests/test_comparison.py`, `tests/test_visualizer.py`, and
      `tests/test_visualizer_smoke.py` cover the fields and UI labels.

## Task 4: Pareto Charting

- [x] DONE: Add Pareto-style charting to the visualizer.
  - Done when:
    - Visualizer includes at least energy/op vs throughput and ops/byte vs
      latency chart modes.
    - Frontier points are computed deterministically for each chart mode.
    - Chart interaction or static labeling helps compare trade-offs.
    - Browser smoke coverage verifies the Pareto view.
  - Proof:
    - Added `Energy/op vs throughput` and `Ops/byte vs latency` modes in
      `photonic_bench/visualizer_assets/app.js`.
    - Added deterministic `isParetoFrontierPoint` frontier detection,
      frontier table, and automatic log scaling for wide positive ranges.
    - Browser smoke verifies mode switching and frontier display.

## Task 5: Full Transformer Model Support

- [x] DONE: Improve transformer support beyond single-layer aggregation.
  - Done when:
    - Users can define a multi-layer/full-model transformer analysis.
    - Existing `transformer-layer` behavior remains backward compatible.
    - Generated artifacts remain auditable through decomposed layer/card data.
    - Docs and tests cover the new workflow.
  - Proof:
    - Added `transformer-model` CLI support, model YAML parsing, count-weighted
      model aggregation, model JSON/Markdown reports, schema docs, and
      visualizer detail support.
    - Added `examples/bert_base_12layer_model.yaml` and generated
      `reports/bert_base_12layer_model/`.
    - `tests/test_transformer.py`, `tests/test_schema_docs.py`, and
      `tests/test_visualizer.py` cover model aggregation and compatibility.

## Task 6: Published Accelerator Cards

- [x] DONE: Add at least 2-3 more high-quality source-backed published cards.
  - Done when:
    - At least 2-3 new YAML configs are added under `examples/`.
    - Each card has source title, source URL, DOI or stable citation where
      available, venue/year, paper metrics, and explicit surrogate labeling.
    - Each card has regenerated Markdown and JSON reports.
    - New cards are included in comparison and visualizer generated artifacts.
    - Tests assert provenance and surrogate-boundary fields.
  - Proof:
    - Added HITOP 2025, Lin 2024 TFLN 120 GOPS, and Meng 2025 MRR OTPU
      surrogate YAML configs under `examples/`.
    - Generated matching Markdown/JSON reports under `reports/`.
    - Updated `reports/comparison.md`, `reports/visualizer_presets.json`, and
      `reports/visualizer/` so the cards appear in comparison and visualizer
      workflows.
    - `tests/test_examples.py` asserts DOI, published metrics, and surrogate
      boundary text for all three cards.

## Task 7: External Report Loading Foundation

- [x] DONE: Add limited local-file/external report loading preparation.
  - Done when:
    - A small design note or docs section states scope and validation behavior.
    - Basic local file loading works in the visualizer or supporting utility
      after core local workflow changes are stable.
    - Invalid files fail clearly without breaking existing generated artifacts.
    - Tests or smoke coverage cover the basic validation path.
  - Proof:
    - Added browser-local `Load external JSON reports` support that parses
      supported PhotonicBench JSON schemas client-side and stores payloads only
      in the current UI session.
    - Added inline rejection for malformed JSON, unsupported schemas, and
      missing/non-finite required summary fields.
    - Documented scope and validation behavior in `README.md` and
      `docs/json_schema.md`.
    - Browser smoke covers valid external loading, invalid JSON rejection, and
      clearing external artifacts.

## Task 8: Documentation And Generated Artifacts

- [x] DONE: Update docs and regenerate all affected artifacts.
  - Done when:
    - README documents system tiers, Pareto charts, full-transformer workflow,
      new cards, and external-loading scope.
    - Model/schema docs match generated JSON.
    - Reports, comparison output, and visualizer data/assets are regenerated.
    - Generated artifacts are inspected for stale or overclaiming text.
  - Proof:
    - Updated `README.md`, `docs/model.md`, `docs/json_schema.md`, and JSON
      schema files for system tiers, Pareto charting, transformer models, new
      cards, and external loading.
    - Regenerated per-card reports, transformer reports, comparison output,
      BERT full-model artifacts, and `reports/visualizer/`.
    - `python -m photonic_bench.cli visualize --reports-dir reports --output
      reports/visualizer/index.html` wrote 36 artifacts with 0 warnings.

## Task 9: Verification

- [x] DONE: Run focused, full, and browser verification.
  - Done when:
    - Focused tests for modified areas pass.
    - `python -m ruff check` passes.
    - `python -m pytest` passes.
    - Visualizer generation succeeds.
    - Browser smoke tests cover existing comparison and new Pareto/loading
      behavior where applicable.
  - Proof:
    - `python -m pytest tests/test_examples.py tests/test_visualizer.py
      tests/test_schema_docs.py`: 24 passed.
    - `python -m pytest tests/test_visualizer_smoke.py`: passed.
    - `node --check photonic_bench\visualizer_assets\app.js`: passed.
    - `python -m ruff check`: passed.
    - `python -m pytest`: 89 passed.
    - `python -m build`: built sdist and wheel successfully.

## Task 10: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Critique modeling clarity, usability, and daily-analysis value.
  - Done when:
    - The five required state files are re-read before critique.
    - Findings are recorded in `PROGRESS.md`.
    - Important findings are fixed or explicitly justified.
    - Post-fix verification still passes.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` before critique.
    - Recorded critique findings in `PROGRESS.md`.
    - Fixed the important Pareto usability issue by adding automatic log
      scaling for wide positive axes and documenting it.
    - Post-fix `node --check`, focused visualizer tests, browser smoke, and
      visualizer generation passed.

## Task 11: Final Closeout

- [x] DONE: Close state files and inspect final repository status.
  - Done when:
    - All checklist items are DONE with proof.
    - `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` reflect the
      final verified state.
    - Final `git status --short --branch` is inspected.
    - Commit/PR/merge is completed through the protected-branch workflow if the
      goal produces committable changes.
  - Proof:
    - Created implementation commit `32eea26` on
      `codex/system-model-pareto`.
    - Pushed branch to `origin/codex/system-model-pareto`.
    - Created PR #2:
      `https://github.com/lamb356/photonic-bench/pull/2`.
    - GitHub check `Ruff, package, and pytest` passed on the final closeout
      commit.
    - PR #2 merged into `master` as `d8563dc Merge pull request #2 from
      lamb356/codex/system-model-pareto`.
    - Inspected `git status --short --branch` after merge: clean
      `master...origin/master`.
