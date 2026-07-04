# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`;
  - repository URL is `https://github.com/lamb356/photonic-bench`;
  - `master` tracks `origin/master`.
- Phase-start `HEAD`:
  - `397c50b Record public branch protection completion`
- Phase-start worktree:
  - clean `master...origin/master`.
- Repository automation baseline:
  - public repository;
  - CI badge in `README.md`;
  - Dependabot config present;
  - CI requires Ruff, package build, and pytest;
  - `master` branch protection requires `Ruff, package, and pytest`.

## Existing Product Surface

- CLI commands:
  - `run`: evaluate a YAML matmul benchmark config and write Markdown/JSON;
  - `compare`: generate Markdown comparison tables from JSON cards;
  - `transformer-layer`: generate decomposed transformer-layer cards and an
    aggregate layer summary;
  - `visualize`: generate or serve a static web visualizer from JSON reports.
- Existing visualizer architecture:
  - Python artifact discovery and schema-aware loading in
    `photonic_bench/visualizer.py`;
  - HTML/CSS/JS assets in `photonic_bench/visualizer_assets/`;
  - generated static example under `reports/visualizer/`;
  - lightweight index plus per-artifact payload files.
- Existing published cards include:
  - Nature PACE 64x64 matrix-vector accelerator example;
  - Xu 2021 11 TOPS photonic convolution surrogate;
  - Feldmann 2021 photonic tensor core surrogate;
  - Pappas 2025 262 TOPS AWGR surrogate;
  - Taichi 2024 photonic chiplet surrogate;
  - local/reference-style 64x64 and weight-stationary examples.
- Existing transformer examples include:
  - small sanity layer;
  - BERT-base style encoder layer;
  - GPT-style decoder layer.

## Goal Implementation State

- Visualizer comparison mode now supports:
  - generated comparison presets from `reports/visualizer_presets.json`;
  - browser-local preset save/load/delete;
  - comparison brief metrics for published coverage, calibration fits,
    interface traffic, best operational intensity, and fastest artifact;
  - grouped comparison insights over energy/op, latency, throughput, and
    operational intensity;
  - JSON comparison download;
  - Markdown comparison download/copy with an export preview.
- Visualizer generated data now includes:
  - `comparison_presets` in the lightweight index;
  - per-artifact converter-interface memory traffic and operational intensity
    summaries when available;
  - warnings for stale generated preset artifact IDs.
- Core reports now include `local_model.memory_traffic`:
  - vector operand read bytes;
  - weight operand read bytes;
  - output write bytes;
  - total interface bytes;
  - MACs per byte;
  - equivalent ops per byte.
- Transformer aggregate JSON now sums decomposed-card interface traffic and
  recomputes aggregate operational intensity.
- Modeling boundary:
  - memory traffic is converter-interface traffic derived from bit widths and
    reuse/conversion counts;
  - it is not a cache, SRAM, DRAM, NoC, or full memory hierarchy model.
- Published-card boundary:
  - Feldmann, Pappas, and Taichi cards carry paper metrics as
    `published_reference`/`published_calibration` data;
  - local workloads are explicitly labeled surrogates and do not claim
    device-level reproduction.

## Current Dependencies And Verification

- Python requirement: `>=3.12`.
- Runtime dependency:
  - `PyYAML>=6.0`.
- Dev dependencies:
  - `build>=1.2`;
  - `playwright>=1.49`;
  - `pytest>=8.0`;
  - `ruff>=0.8`.
- Standard verification commands:
  - `python -m ruff check`;
  - `python -m pytest`;
  - `python -m build` when packaging is touched;
  - `python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html`;
  - Playwright smoke tests for visualizer behavior.

## Goal-Specific Design Constraints

- Keep published paper numbers separate from local component-model estimates.
- New modeling realism must be auditable through formulas, JSON fields, and
  docs.
- Visualizer improvements should remain static-site friendly and easy to
  regenerate through the CLI.
- Saved comparison presets should not require a hosted backend.
- Comparison exports must preserve provenance and modeling-boundary context.
- New cards must be source-backed and must not imply independent reproduction
  of device-level paper results.

## Completed Recon Decisions

- Static preset format: use `reports/visualizer_presets.json` as a sidecar
  discovered during `visualize`, and combine it with browser-local presets at
  runtime.
- Published card additions: Feldmann 2021, Pappas 2025, and Taichi 2024 were
  selected because each has public source details and usable paper-reported
  metrics.
- Modeling improvement: converter-interface memory traffic was selected because
  it provides practical operational-intensity context without pretending to be
  a full memory-system simulator.
- Verification baseline: final local checks passed with 26 visualizer artifacts,
  0 generation warnings, clean Ruff, and 77 passing pytest tests.
