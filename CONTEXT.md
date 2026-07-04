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
  - The current branch contains uncommitted work from the artifact freshness,
    named system-profile, transformer realism, external-loading, and
    card-quality goals.
  - Those changes are in scope for the first protective commit and PR because
    the user explicitly requested committing and pushing the current work on
    `codex/artifact-freshness-profiles`.
- Repository automation:
  - CI workflow exists under `.github/workflows/ci.yml`;
  - local expected gates include Ruff, pytest, package/build checks where
    configured, artifact freshness, JavaScript syntax, and visualizer browser
    smoke for UI changes.

## Current Product Surface

- CLI commands:
  - `run`: evaluate a YAML matmul benchmark config and write Markdown/JSON;
  - `compare`: generate Markdown comparison tables from JSON cards;
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
- System movement currently includes explicit SRAM and off-chip/DRAM tiers,
  movement energy, transfer time, bandwidth-limited latency/throughput, total
  movement energy, total system energy, system pJ/MAC, system
  pJ/equivalent-op, movement-energy share, and named sensitivity profiles.
- Transformer support includes decomposed layer cards, full-model summaries,
  embeddings, output projection, activation memory traffic, decoder KV-cache
  mode, and explicit overlap assumptions.
- Published source-backed cards carry `source_quality` metadata with source
  metric coverage, local surrogate type, and confidence grade.

## Active Goal Notes

- This loop starts by committing and pushing the existing dirty branch, then
  opens a PR before new feature work.
- The new implementation should build on the existing visualizer, system model,
  and source-card quality foundation rather than replacing it wholesale.
- GBrain tools are expected by user instructions, but were not exposed in this
  thread after deferred tool search. Local repo state files are therefore the
  durable coordination surface for this loop.
- State files must be re-read at the start of every cycle:
  `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`.
