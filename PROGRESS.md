# PhotonicBench Progress

## 2026-07-04 Cycle 1: State Rollover

### State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of the cycle.
- Re-read `tasks/todo.md`.
- Read applicable `agentic-workflow` and `frontend-design` skill instructions.
- Checked local memory registry for PhotonicBench/Photonic Acceleration hits:
  - no relevant PhotonicBench-specific entries were found.

### Repository Inspection

- Ran `git status --short --branch`:
  - branch is `master`;
  - `master` tracks `origin/master`;
  - worktree was clean at phase start.
- Ran `git log --oneline -n 10`:
  - latest commit was `397c50b Record public branch protection completion`.
- Ran `git remote -v`:
  - `origin` points to `https://github.com/lamb356/photonic-bench.git`.
- Inspected `pyproject.toml`:
  - package name: `photonic-bench`;
  - Python `>=3.12`;
  - dev dependencies include build, Playwright, pytest, and Ruff.
- Inspected `README.md`:
  - current quick start includes `run`, `transformer-layer`, `compare`, and
    `visualize` examples;
  - published calibration and transformer-helper sections already exist.
- Inspected `photonic_bench/cli.py`:
  - visualizer supports static output and local `--serve`;
  - compare currently emits Markdown only.
- Inspected `photonic_bench/visualizer.py`:
  - discovery is schema-aware for matmul cards and transformer aggregate JSON;
  - generated data uses a lightweight index plus per-artifact payloads.

### State File Update

- Rolled the state files forward from the completed branch-protection phase to
  the daily-use improvement goal.
- Created prioritized checklist tasks:
  1. visualizer architecture recon;
  2. comparison analytics;
  3. saved comparison presets;
  4. exportable comparison results;
  5. new published accelerator cards;
  6. modeling or transformer support;
  7. docs and generated artifacts;
  8. verification;
  9. mandatory Hostile Senior Reviewer critique;
  10. final closeout.
- Updated `tasks/todo.md` so the branch-protection goal is complete and this
  visualizer/cards/modeling goal is active.

## 2026-07-04 Cycle 2: Implementation And Verification

### Recon

- Mapped the visualizer path:
  - `photonic_bench/visualizer.py` discovers schema-aware JSON artifacts,
    writes a lightweight index, and emits per-artifact payloads.
  - `photonic_bench/visualizer_assets/template.html`, `styles.css`, and
    `app.js` provide the static UI.
  - `tests/test_visualizer.py` covers generated data/assets and
    `tests/test_visualizer_smoke.py` covers browser behavior.
- Mapped comparison/modeling paths:
  - `photonic_bench/comparison.py` renders Markdown comparison tables.
  - `photonic_bench/model.py`, `json_report.py`, `report.py`, and
    `transformer.py` define the auditable local report fields.

### Visualizer Work

- Added generated comparison presets:
  - sidecar: `reports/visualizer_presets.json`;
  - schema version: `photonic-bench-comparison-presets-v1`;
  - generated preset: `Published reference surrogate cards`;
  - generated preset: `Local reuse sensitivity`.
- Added browser-local presets:
  - save current selection by name;
  - load/delete local presets;
  - keep generated presets static-site friendly and regeneration-safe.
- Added comparison analytics:
  - comparison brief;
  - published-reference coverage count;
  - calibration-fit count;
  - total interface traffic;
  - best operational intensity;
  - fastest selected artifact;
  - operational-intensity metric in comparison matrix and insights.
- Added comparison export:
  - JSON export schema `photonic-bench-comparison-export-v1`;
  - Markdown download;
  - Markdown copy/fallback through a read-only preview.
- Hardened old/external report behavior:
  - missing unit-bearing numeric values now render as plain `n/a`, not
    `n/a <unit>`.

### Published Cards

- Added three source-backed published-reference surrogate cards:
  - `examples/feldmann_2021_photonic_tensor_core_surrogate.yaml`;
  - `examples/pappas_2025_awgr_262tops_surrogate.yaml`;
  - `examples/taichi_2024_chiplet_surrogate.yaml`.
- Generated matching Markdown and JSON reports in `reports/`.
- Included the new cards in:
  - `reports/comparison.md`;
  - `reports/visualizer/data/index.json`;
  - visualizer payload files;
  - the generated published-reference surrogate preset.
- Added tests asserting DOI/source fields, paper metric placement, and explicit
  surrogate-boundary assumptions.

### Modeling Work

- Added converter-interface memory traffic to the core matmul model:
  - vector operand read bytes;
  - weight operand read bytes;
  - output write bytes;
  - total interface bytes;
  - MACs per byte;
  - equivalent ops per byte.
- Formula boundary:
  - these fields use converter bit widths and existing reuse/conversion counts;
  - they are not a cache, SRAM, DRAM, NoC, or full memory hierarchy simulation.
- Added transformer-layer aggregate memory traffic by summing decomposed matmul
  cards and recomputing aggregate operational intensity.
- Threaded the new fields through:
  - JSON reports;
  - Markdown reports;
  - comparison tables;
  - visualizer summaries and detail panels;
  - JSON schemas and docs.

### Documentation And Artifacts

- Updated `README.md`:
  - quick-start commands for the three new cards;
  - component model formulas for interface traffic and operational intensity;
  - published-card descriptions and surrogate boundaries;
  - visualizer presets, analytics, and export workflow.
- Updated `docs/model.md`, `docs/json_schema.md`, and JSON schema files.
- Regenerated all affected reports, comparison output, visualizer index, payloads,
  copied static assets, and `reports/visualizer/index.html`.

### Verification

- Focused tests passed during development:
  - model/report/JSON/transformer/comparison/schema/example tests;
  - visualizer unit tests;
  - Playwright visualizer smoke.
- Final verification after critique fixes:
  - `node --check photonic_bench\visualizer_assets\app.js`: passed.
  - `python -m ruff check`: passed.
  - `python -m photonic_bench.cli visualize --reports-dir reports --output
    reports/visualizer/index.html`: wrote 26 artifacts, 0 warnings.
  - `python -m pytest`: 77 passed, 154 warnings from
    `pytest_freezegun`/`distutils` deprecation.

## 2026-07-04 Mandatory Hostile Senior Reviewer Critique

### Scope

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` before critique.
- Focused on daily-use visualizer usability, published-card provenance clarity,
  and modeling-boundary clarity.

### Findings And Resolutions

- Finding: Optional unit-bearing metrics could render as `n/a eq ops/byte`,
  which is sloppy and confusing for older or external report sets missing the
  new memory fields.
  - Resolution: Added missing-value guards to pJ, ns, throughput, and
    ops/byte formatters so they render plain `n/a`.
  - Verification: regenerated visualizer; `node --check`, Ruff, and full pytest
    passed.
- Finding: The generated preset name `Published accelerator baselines` could be
  read as independently reproduced paper baselines rather than source-backed
  published-reference cards with local surrogate workloads.
  - Resolution: renamed it to `Published reference surrogate cards` and changed
    the description to state that paper metrics stay in published references and
    local workloads are surrogates.
  - Verification: updated tests and regenerated visualizer; full pytest passed.
- Finding: Memory traffic could be overread as full memory-system simulation.
  - Resolution: No code change needed after inspection because the model docs,
    README, JSON report notes, transformer aggregate semantics, visualizer
    boundary notes, and export boundary notes all state converter-interface
    scope explicitly.
  - Verification: schema/docs/tests and generated reports include the boundary.

### Critique Result

- Major usability/modeling-clarity issues found during the critique were fixed
  before closeout.
- Remaining risk: the new published cards are honest surrogate cards, not
  device-level reproductions; this is intentionally explicit in YAML
  descriptions, assumptions, README text, visualizer preset naming, and report
  provenance.
