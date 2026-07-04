# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Working branch for this goal: `codex/system-model-pareto`
- Base branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`;
  - repository URL is `https://github.com/lamb356/photonic-bench`;
  - `master` tracks `origin/master`.
- Goal-start `HEAD`:
  - `ab88d29 Merge pull request #1 from lamb356/codex/daily-use-analysis`
- Goal implementation commit:
  - `32eea26 Add system model Pareto transformer and card updates`
- Pull request:
  - PR #2, `https://github.com/lamb356/photonic-bench/pull/2`
  - Required check `Ruff, package, and pytest` passed before final closeout
    state-only update.
- Goal-start worktree:
  - clean `master...origin/master` before creating the goal branch.
- Repository automation:
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
  - `transformer-model`: generate representative transformer-layer artifacts
    and a counted full-model summary from multi-layer model YAML;
  - `visualize`: generate or serve a static web visualizer from JSON reports.
- Visualizer architecture:
  - `photonic_bench/visualizer.py` discovers schema-aware JSON artifacts,
    writes a lightweight index, and emits per-artifact payloads;
  - `photonic_bench/visualizer_assets/template.html`, `styles.css`, and
    `app.js` provide the static UI;
  - generated static example lives under `reports/visualizer/`.
- Current comparison/visualizer features:
  - generated presets from `reports/visualizer_presets.json`;
  - browser-local preset save/load/delete;
  - comparison brief and grouped insights;
  - Pareto trade-off charting for energy/op versus throughput and ops/byte
    versus latency;
  - JSON and Markdown comparison export;
  - browser-local external JSON report loading with validation and clear
    failure messages.
- Current modeling:
  - component model includes optical compute, laser, detector, ADC, DAC,
    timing, noise, conversion counts, reuse/stationarity behavior, and
    converter-interface memory traffic.
  - Converter-boundary traffic tracks:
    vector operand bytes, weight operand bytes, output bytes, total interface
    bytes, MACs/byte, and equivalent ops/byte.
  - Multi-tier system movement now adds explicit SRAM and off-chip/DRAM
    interface tiers with per-tier bytes, movement energy, transfer time,
    bandwidth-limited latency/throughput, total movement energy, total system
    energy, system pJ/MAC, system pJ/equivalent-op, and movement-energy share.
  - System movement fields remain local estimates and are explicitly separated
    from paper-reported published references.
- Current transformer support:
  - single transformer-layer YAML expands into decomposed matmul cards and an
    aggregate layer JSON/Markdown summary.
  - transformer-model YAML defines one or more layer specs with counts and
    generates a full-model serial weighted summary while preserving
    decomposed-card audit links.
- Current published cards:
  - Nature PACE 64x64 matrix-vector accelerator;
  - Xu 2021 11 TOPS photonic convolution surrogate;
  - Feldmann 2021 photonic tensor core surrogate;
  - Pappas 2025 262 TOPS AWGR surrogate;
  - Taichi 2024 photonic chiplet surrogate;
  - HITOP 2025 optical tensor processor surrogate;
  - Lin 2024 TFLN 120 GOPS tensor core surrogate;
  - Meng 2025 MRR OTPU tensor core surrogate.

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
- Multi-tier system model fields must be auditable and explicitly scoped.
- Default tier assumptions must be conservative, visible, and documented.
- Visualizer additions must remain static-site friendly and easy to regenerate.
- Pareto charts should help daily trade-off analysis, not just add decorative
  graphics.
- Full-transformer support must preserve decomposed-card auditability and
  backward compatibility with `transformer-layer`.
- External report loading is lower priority and must stay limited until the core
  local workflow is strong.

## Goal Outcome Notes

- Tier defaults live in the dataclass config layer and are serialized into
  report `model_inputs.system` so assumptions are visible.
- `local_model.energy.total_pj` remains the legacy local
  compute/conversion estimate; `local_model.system.total_system_energy_pj`
  adds explicit SRAM/off-chip movement energy as a separate local estimate.
- Pareto charting prefers system pJ/op and bandwidth-limited throughput where
  present, falling back to legacy fields only for older artifacts.
- Transformer-model support deliberately models serial full-model accounting,
  not fused scheduling or non-matmul operator costs.
- External loading is intentionally browser-local and in-memory; it does not
  mutate generated visualizer artifacts.
