# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch: `codex/artifact-freshness-profiles`
- Base branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`;
  - repository URL is `https://github.com/lamb356/photonic-bench`;
  - `master` tracks `origin/master`.
- Recent baseline:
  - `master` includes merged work through the system-model Pareto goal.
  - The current branch has protective baseline commit `c6cf572`
    (`Add artifact freshness profiles and transformer usability updates`)
    pushed to `origin/codex/artifact-freshness-profiles`.
  - The branch also has implementation commit `99dbe4f`
    (`Deepen system modeling and visualizer comparison`) pushed to the same
    remote branch.
  - Draft PR #4 is open at
    `https://github.com/lamb356/photonic-bench/pull/4`, targeting `master`.
- Repository automation:
  - CI workflow exists under `.github/workflows/ci.yml`;
  - local expected gates include Ruff, pytest, package/build checks where
    configured, artifact freshness, JavaScript syntax, and visualizer browser
    smoke for UI changes.

## Current Product Surface

- CLI commands:
  - `run`: evaluate a YAML matmul benchmark config and write Markdown/JSON;
  - `compare`: generate Markdown comparison tables from JSON cards;
  - `system-profiles`: list built-in system memory profile assumptions as a
    Markdown table or JSON;
  - `transformer-layer`: generate decomposed transformer-layer cards and an
    aggregate layer summary;
  - `transformer-model`: generate representative transformer-layer artifacts
    and counted full-model summaries;
  - `visualize`: generate or serve a static web visualizer from JSON reports;
  - `verify-artifacts`: non-mutating freshness check for checked generated
    reports, comparison output, and visualizer output.
- Visualizer architecture:
  - `photonic_bench/visualizer.py` discovers schema-aware JSON artifacts,
    writes a lightweight index, and emits payloads;
  - `photonic_bench/visualizer_assets/template.html`, `styles.css`, and
    `app.js` provide the static browser UI;
  - checked generated static output lives under `reports/visualizer/`;
  - comparison mode already includes pinned selections, deltas, ratios, saved
    presets, export behavior, Pareto/profile support, and import diagnostics
    from previous goals.
- Generated artifact families:
  - per-card Markdown/JSON reports under `reports/`;
  - transformer-layer decomposed cards and aggregate reports under
    `reports/bert_base_encoder_layer/`, `reports/gpt_style_decoder_layer/`,
    and `reports/transformer_small_sanity/`;
  - transformer-model representative-layer and aggregate reports under
    `reports/bert_base_12layer_model/` and
    `reports/gpt_style_decoder_kv_cache_model/`;
  - profile-sensitivity reports under `reports/`;
  - `reports/comparison.md`;
  - `reports/visualizer/` static HTML, data, payloads, and copied assets;
  - `reports/visualizer_presets.json`.

## Current Modeling

- Component model includes optical compute, laser, detector, ADC, DAC, timing,
  noise, conversion counts, reuse/stationarity behavior, and
  converter-interface traffic.
- System movement currently includes explicit SRAM, intermediate/cache, and
  off-chip/DRAM tiers, movement energy, transfer time, serialized/effective
  transfer timing, bandwidth-limited latency/throughput, total movement energy,
  total system energy, system pJ/MAC, system pJ/equivalent-op,
  movement-energy share, and named sensitivity profiles.
- Transformer support includes decomposed layer cards, full-model summaries,
  embeddings, output projection, activation memory traffic, decoder KV-cache
  mode, and explicit overlap assumptions.
- Published source-backed cards carry `source_quality` metadata with source
  metric coverage, local surrogate type, and confidence grade. The current
  catalog includes the new Zhang 2026 POMMM, Chen 2026 FSR-GeMM, Ning 2025
  CirPTC, and Kovaios 2025 WDM 1 TOPS tensor-core surrogate cards.

## Active Goal Notes

- This loop started by committing and pushing the existing dirty branch, then
  opening PR #4 before new feature work.
- Follow-up work implemented the intermediate/cache tier, memory timing mode,
  visualizer decision scorecards, `system-profiles` CLI command, four new
  cards, regenerated artifacts, and a hostile-review boundary-label fix.
- Final local gates passed with Ruff, pytest, artifact freshness, JavaScript
  syntax, JSON parsing, and `git diff --check`.
- The new implementation should build on the existing visualizer, system model,
  and source-card quality foundation rather than replacing it wholesale.
- GBrain tools are expected by user instructions, but were not exposed in this
  thread after deferred tool search. Local repo state files are therefore the
  durable coordination surface for this loop.
- State files must be re-read at the start of every cycle:
  `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`.
