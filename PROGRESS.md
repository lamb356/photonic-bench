# PhotonicBench Progress

## 2026-07-04 Cycle 1: State Rollover

### State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of the cycle.
- Re-read `tasks/todo.md`.
- Read applicable `agentic-workflow` and `frontend-design` skill instructions.

### Repository Inspection

- Ran `git status --short --branch`:
  - branch was clean `master...origin/master`.
- Ran `git log --oneline -n 5 --decorate`:
  - latest commit was `ab88d29 Merge pull request #1 from
    lamb356/codex/daily-use-analysis`.
- Confirmed previous daily-use goal was merged through PR #1 and CI passed.
- Created branch `codex/system-model-pareto` for this goal.

### State File Update

- Rolled `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` forward to the five-area system-model/Pareto/full-transformer
  goal.
- Updated `tasks/todo.md` so the previous goal remains completed and this goal
  is the active work item.
- Created prioritized checklist tasks:
  1. system-model recon;
  2. multi-tier system model;
  3. system model in comparison and visualizer;
  4. Pareto charting;
  5. full transformer model support;
  6. new published accelerator cards;
  7. external report loading foundation;
  8. docs and generated artifacts;
  9. verification;
  10. mandatory Hostile Senior Reviewer critique;
  11. final closeout.

### Next Step

- Inspect config/model/report/schema/visualizer code paths for the multi-tier
  system model and Pareto chart integration points.

## 2026-07-04 Cycle 2: System Model, Pareto, Transformer Models, Cards, Loading

### State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of the cycle.
- Re-read `tasks/todo.md`.
- Read applicable `agentic-workflow` and `frontend-design` skill instructions.
- Searched memory for PhotonicBench-specific prior context; no relevant memory
  entry was found.

### System-Model Recon And Implementation

- Mapped the existing converter-boundary memory traffic fields across config,
  model, JSON, Markdown, comparison, transformer aggregation, and visualizer
  code paths.
- Added explicit `system.sram` and `system.off_chip` tier inputs with read
  energy, write energy, bandwidth, read fraction, and write fraction.
- Added deterministic model outputs under `local_model.system`:
  - per-tier read/write/total bytes;
  - per-tier read/write/total movement energy;
  - transfer time by tier;
  - local compute/conversion energy;
  - total movement energy;
  - total system energy;
  - system pJ/MAC and pJ/equivalent-op;
  - movement-energy share;
  - bandwidth-limited batch latency and throughput.
- Preserved backward compatibility by keeping existing `local_model.energy`
  fields unchanged and treating system movement as a separate local estimate.
- Added schema-backed docs and tests for formulas, defaults, validation, JSON,
  Markdown, comparison, and visualizer indexing.

### Visualizer And Pareto Work

- Added system-model summary fields to the visualizer index and detail views.
- Added system-aware comparison rows, comparison export fields, and boundary
  notes.
- Added a Pareto chart section in comparison mode with:
  - `Energy/op vs throughput`;
  - `Ops/byte vs latency`;
  - deterministic frontier detection;
  - frontier table;
  - browser smoke coverage.
- Hostile-review fix: added automatic log scaling when positive Pareto axes
  span at least 100x, so outlier-heavy card sets remain readable while exact
  values stay in the table.

### Full Transformer Model Support

- Added first-class `transformer-model` YAML parsing and CLI support.
- Added count-weighted full-model aggregation over representative
  transformer-layer summaries.
- Preserved decomposed-card auditability by generating representative layer
  artifact trees and linking model summaries back to per-layer and per-matmul
  JSON reports.
- Added transformer-model Markdown/JSON rendering, schema file, docs, tests,
  visualizer indexing, and visualizer detail rendering.
- Added `examples/bert_base_12layer_model.yaml`.
- Generated `reports/bert_base_12layer_model/`.

### New Published Cards

- Researched source-backed 2024-2025 photonic tensor/GEMM-style accelerator
  references and added three conservative surrogate cards:
  - HITOP 2025 optical tensor processor, DOI `10.1126/sciadv.adu0228`;
  - Lin 2024 TFLN 120 GOPS tensor core, DOI
    `10.1038/s41467-024-53261-x`;
  - Meng 2025 MRR OTPU tensor core, DOI `10.1038/s41377-024-01706-9`.
- Kept paper metrics under `published_calibration` and `provenance`.
- Added explicit surrogate descriptions and assumptions for each card.
- Generated Markdown/JSON reports for all three cards.
- Updated the published-card visualizer preset and comparison report.
- Added `tests/test_examples.py` coverage for DOI, paper metrics, and
  surrogate-boundary text.

### External Report Loading Foundation

- Added browser-local `Load external JSON reports` support.
- Supported external schemas:
  - `photonic-bench-report-v1`;
  - `photonic-bench-transformer-layer-report-v1`;
  - `photonic-bench-transformer-model-report-v1`.
- External reports are parsed and validated client-side, then added as
  in-memory `external/...` artifacts for detail and comparison views.
- Invalid JSON, unsupported schemas, missing required fields, and non-finite
  required numbers fail inline without corrupting generated artifacts.
- Added `Clear external` behavior.
- Documented the limited scope in `README.md` and `docs/json_schema.md`.
- Browser smoke covers valid local external loading, invalid JSON rejection,
  and clearing external reports.

### Generated Artifacts

- Regenerated new card reports:
  - `reports/hitop_2025_optical_tensor_processor_surrogate.md/json`;
  - `reports/lin_2024_tfln_120gops_tensor_core_surrogate.md/json`;
  - `reports/meng_2025_mrr_otpu_tensor_core_surrogate.md/json`.
- Regenerated `reports/comparison.md`.
- Regenerated `reports/visualizer/index.html` and static data/assets:
  - final visualizer generation reported 36 artifacts and 0 warnings.

### Verification

- `python -m pytest tests/test_examples.py`: 10 passed.
- `node --check photonic_bench\visualizer_assets\app.js`: passed.
- `python -m pytest tests/test_examples.py tests/test_visualizer.py
  tests/test_schema_docs.py`: 24 passed.
- `python -m pytest tests/test_visualizer_smoke.py`: passed.
- `python -m json.tool` passed for the three new generated card JSON files.
- `python -m ruff check`: passed.
- `python -m pytest`: 89 passed.
- `python -m build`: built sdist and wheel successfully.
- Removed ignored local build outputs `dist/` and `photonic_bench.egg-info/`
  after the package build check.

### Mandatory Hostile Senior Reviewer Critique

Findings:

1. Important usability issue: the Pareto chart used only linear scaling. With
   photonic reports spanning orders of magnitude, daily analysis could falsely
   make most points look identical or pinned to an axis.
   - Fix: added automatic log scaling for positive axes spanning at least 100x,
     documented the behavior, and kept exact values in the frontier table.
   - Post-fix verification: `node --check`, focused visualizer tests, browser
     smoke, and visualizer regeneration passed.
2. Residual acceptable limitation: external loading intentionally validates the
   summary contract used by the visualizer, not the full JSON Schema. This is
   acceptable for the requested limited foundation because invalid files fail
   clearly and generated artifacts are unaffected. Full schema validation can
   be added later if the browser bundle accepts a schema validator dependency.
3. Residual acceptable limitation: full transformer-model timing remains a
   serial weighted summary and does not model fused scheduling, overlap,
   activation lifetimes, or KV-cache reuse. This is explicit in docs and
   aggregate semantics, preserving auditable boundaries.

### Next Step

- Close state files for final status, run final verification after state-only
  updates, inspect git status, then commit/push through the protected-branch
  workflow.

## 2026-07-04 Cycle 3: Final Closeout

### Final Verification After State Updates

- Ran `python -m ruff check`: passed.
- Ran `python -m pytest`: 89 passed.
- Ran `python -m build`: built sdist and wheel successfully.
- Removed ignored local build outputs after the build check.

### Branch Workflow

- Staged the complete implementation, docs, tests, generated reports, generated
  visualizer artifacts, and state-file updates.
- Created implementation commit:
  - `32eea26 Add system model Pareto transformer and card updates`
- Pushed branch:
  - `origin/codex/system-model-pareto`
- Created PR:
  - `https://github.com/lamb356/photonic-bench/pull/2`
- Verified GitHub check on PR #2:
  - `Ruff, package, and pytest`: passed in 42 seconds before the final
    closeout state-only commit.

### Final Status

- All checklist implementation tasks are complete with proof.
- The mandatory Hostile Senior Reviewer critique is recorded and the important
  Pareto usability finding was fixed.
- The final closeout state commit will be pushed to PR #2, verified by the same
  required GitHub check, and merged through the protected branch workflow.
