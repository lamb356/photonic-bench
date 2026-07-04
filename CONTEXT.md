# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch at Cycle 0 start: `codex/artifact-freshness-profiles`
- Active follow-up branch after merging PR #4:
  `codex/pr4-followup-improvements`
- Follow-up implementation commit:
  `9c96ac6` (`Deepen contention modeling and visualizer analysis`)
- Follow-up branch is pushed and tracks
  `origin/codex/pr4-followup-improvements`.
- Base branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`;
  - repository URL is `https://github.com/lamb356/photonic-bench`;
  - `master` tracks `origin/master`.
- Current post-merge state:
  - PR #4 is merged at `https://github.com/lamb356/photonic-bench/pull/4`.
  - Merge commit is `216950c39ca20007b390d4c3b8dbdf9cbc6a99fe`.
  - `master` tracks `origin/master` at the PR #4 merge commit.
  - The old head branch was deleted by `gh pr merge 4 --merge --delete-branch`.
  - Follow-up implementation work is on
    `codex/pr4-followup-improvements`.
  - The follow-up implementation commit `9c96ac6` is pushed to
    `origin/codex/pr4-followup-improvements`.
- Repository automation:
  - CI workflow exists under `.github/workflows/ci.yml`;
  - local expected gates include Ruff, pytest, package/build checks where
    configured, artifact freshness, JavaScript syntax, JSON parsing, and
    visualizer browser smoke for UI changes.

## Current Product Surface Expected After PR #4

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
  - comparison mode includes pinned selections, deltas, ratios, saved presets,
    exports, Pareto/profile support, import diagnostics, and decision
    scorecards from the prior PR.
- Generated artifact families:
  - per-card Markdown/JSON reports under `reports/`;
  - transformer-layer decomposed cards and aggregate reports under
    transformer report directories;
  - transformer-model representative-layer and aggregate reports;
  - profile-sensitivity reports;
  - `reports/comparison.md`;
  - `reports/visualizer/` static HTML, data, payloads, and copied assets;
  - `reports/visualizer_presets.json`.

## Current Modeling Baseline Expected After PR #4

- Component model includes optical compute, laser, detector, ADC, DAC, timing,
  noise, conversion counts, reuse/stationarity behavior, and
  converter-interface traffic.
- System movement includes explicit SRAM, intermediate/cache, and off-chip/DRAM
  tiers, movement energy, transfer time, serialized/effective transfer timing,
  bandwidth-limited latency/throughput, total movement energy, total system
  energy, system pJ/MAC, system pJ/equivalent-op, movement-energy share, and
  named sensitivity profiles.
- Transformer support includes decomposed layer cards, full-model summaries,
  embeddings, output projection, activation memory traffic, decoder KV-cache
  mode, and explicit overlap assumptions.
- Published source-backed cards carry `source_quality` metadata with source
  metric coverage, local surrogate type, and confidence grade.

## Active Goal Notes

- This loop started by merging PR #4 into `master`; new work is based on
  merged `master` through the pushed
  `codex/pr4-followup-improvements` branch.
- GBrain MCP tools are available. `get_brain_identity` returned version
  `0.42.56.0`; a PhotonicBench/PR #4 query returned no prior hits.
- State files must be re-read at the start of every cycle:
  `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`.
- The next implementation should improve the already mature surfaces rather
  than replacing them wholesale.
