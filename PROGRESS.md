# PhotonicBench Progress

## 2026-07-04 Cycle 0: Active Goal Setup And PR #4 Preflight

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of Cycle 0.
- Re-read `tasks/todo.md`.

### Tooling, Memory, And Skill Context

- Tried to create the active goal record, but this thread already has the same
  unfinished goal active.
- Confirmed the active goal with `get_goal`.
- Searched deferred tools for GBrain and exposed the GBrain MCP tools.
- Called `mcp__gbrain__get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `7`;
  - chunk count `7`.
- Queried GBrain for PhotonicBench/PR #4/visualizer/system-model/card/CLI
  context; it returned no hits.
- Read the GitHub workflow skill at
  `C:\Users\burba\.codex\plugins\cache\openai-curated-remote\github\0.1.5\skills\github\SKILL.md`.
- Local memory `MEMORY.md` keyword search for PhotonicBench/PR #4 context
  returned no hits.

### Initial Repository Status

- Current branch before merge:
  `codex/artifact-freshness-profiles`.
- Remote:
  `origin` is `https://github.com/lamb356/photonic-bench.git`.
- Local status before state edits:
  `git status --short --branch` showed a clean
  `codex/artifact-freshness-profiles` branch tracking
  `origin/codex/artifact-freshness-profiles`.
- Recent commits before merge:
  - `e5835d0` `Record PR ready closeout state`;
  - `2e9f15e` `Close autonomous PR loop state`;
  - `99dbe4f` `Deepen system modeling and visualizer comparison`;
  - `c6cf572` `Add artifact freshness profiles and transformer usability updates`;
  - `1d3d4f0` `Merge pull request #3 from lamb356/codex/system-model-pareto-final-state`.

### PR #4 Preflight

- `gh pr view 4 --json ...` confirmed:
  - PR #4 title:
    `Deepen PhotonicBench system modeling and visualizer analysis`;
  - URL:
    `https://github.com/lamb356/photonic-bench/pull/4`;
  - state `OPEN`;
  - draft `false`;
  - base `master`;
  - head `codex/artifact-freshness-profiles`;
  - merge state `CLEAN`;
  - CI check `Ruff, package, and pytest` completed successfully.
- `gh pr checks 4` confirmed:
  - `Ruff, package, and pytest` passed in `57s`.

### State Rollforward

- Replaced the previous completed-loop state with this active goal state.
- Created a proof-oriented checklist in priority order:
  1. merge PR #4;
  2. visualizer improvements;
  3. system modeling;
  4. published cards;
  5. CLI/workflow usability;
  6. docs/artifacts;
  7. hostile critique;
  8. final verification and closeout.
- Updated `tasks/todo.md` with the active goal section.

## 2026-07-04 Cycle 1: PR #4 Merge And Follow-Up Branch

### Merge Work

- Stashed only active-loop state-file edits so PR #4 could be merged from a
  clean checkout.
- Reconfirmed PR #4 immediately before merge:
  - state `OPEN`;
  - draft `false`;
  - base `master`;
  - head `codex/artifact-freshness-profiles`;
  - merge state `CLEAN`;
  - CI check `Ruff, package, and pytest` completed successfully.
- Ran `gh pr merge 4 --merge --delete-branch`.
- PR #4 merged successfully into `master`.
- `gh pr view 4 --json number,state,mergedAt,mergeCommit,url,headRefName,baseRefName`
  confirmed:
  - state `MERGED`;
  - merged at `2026-07-04T08:11:09Z`;
  - merge commit `216950c39ca20007b390d4c3b8dbdf9cbc6a99fe`;
  - base `master`;
  - head `codex/artifact-freshness-profiles`.
- After merge, `git status --short --branch` showed
  `## master...origin/master` with no file changes.
- `git branch -vv` showed local `master` tracking `origin/master` at
  `216950c`.
- Reapplied the active-loop state files on top of merged `master`.
- Created follow-up branch `codex/pr4-followup-improvements` from merged
  `master` for the new implementation work.

## 2026-07-04 Cycle 2: Implementation Across Visualizer, Modeling, Cards, CLI, Docs

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md` before continuing implementation.

### Visualizer Improvements

- Read the visualizer discovery/adapters, source JavaScript, visualizer tests,
  and preset sidecar.
- Added contention-adjusted latency/throughput to visualizer summaries for
  matmul cards, transformer-layer aggregates, and transformer-model aggregates.
- Added comparison matrix rows and export fields for:
  - shared bandwidth clients;
  - arbitration efficiency;
  - calibration/control overhead;
  - contention-adjusted latency;
  - contention-adjusted throughput.
- Added a `Contention Insight` panel highlighting best adjusted throughput,
  lowest adjusted latency, highest shared-client count, and largest
  calibration/control guardband.
- Added a `contention-throughput` Pareto mode.
- Added an index-level modeling-boundary note:
  contention metrics are local shared-bandwidth and calibration/control
  guardband assumptions, not paper-reported hardware claims.

### Deeper System Modeling

- Added `SystemContentionConfig` with:
  - `shared_bandwidth_clients`;
  - `arbitration_efficiency`;
  - `calibration_overhead_fraction`.
- Added validation and parsing for `system.contention`.
- Added non-default contention assumptions to the built-in `pcie_attached`
  profile:
  - 2 shared bandwidth clients;
  - 0.85 arbitration efficiency;
  - 0.05 calibration/control overhead.
- Extended the tier/system model with:
  - tier effective bandwidth;
  - contention-adjusted tier transfer time;
  - contention-adjusted effective transfer time;
  - calibration-adjusted effective transfer time;
  - contention-adjusted batch latency;
  - contention-adjusted equivalent ops/s;
  - contention-limited tier.
- Propagated these fields through per-card Markdown/JSON reports, transformer
  layer/model aggregates, comparison Markdown, visualizer summaries, and
  machine-readable schemas.

### Published Cards

- Added four new source-backed published-card surrogate configs:
  - `examples/luan_2026_single_shot_mmm_surrogate.yaml`;
  - `examples/bandyopadhyay_2024_single_chip_dnn_surrogate.yaml`;
  - `examples/kari_2024_coherent_matrix_platform_surrogate.yaml`;
  - `examples/dong_2023_continuous_time_tensor_core_surrogate.yaml`.
- Added them to:
  - the artifact freshness manifest;
  - `reports/visualizer_presets.json`;
  - generated Markdown reports;
  - generated JSON reports;
  - generated visualizer payloads;
  - `reports/comparison.md`.
- Kept each card source-backed and locally labeled as a surrogate rather than
  a measured reproduction.

### CLI And Workflow Usability

- Added `inspect-config`.
- Supported `--kind auto|matmul|transformer-layer|transformer-model`.
- Supported `--json`.
- Human-readable output now summarizes normalized workload/system/profile/tier
  and contention assumptions before artifact generation.
- Extended `system-profiles` output with shared-client, arbitration, and
  calibration/control overhead columns.

### Documentation And Schemas

- Updated `README.md` for:
  - new cards;
  - contention config and adjusted metrics;
  - `inspect-config`;
  - visualizer contention insight and third Pareto mode;
  - expanded comparison command fields.
- Updated `docs/model.md` with formulas for effective bandwidth, adjusted
  transfer timing, calibration/control guardbanding, and serial transformer
  adjusted timing.
- Updated `docs/json_schema.md` with contention fields and units.
- Updated all three machine-readable JSON schemas:
  - `docs/photonic-bench-report-v1.schema.json`;
  - `docs/photonic-bench-transformer-layer-report-v1.schema.json`;
  - `docs/photonic-bench-transformer-model-report-v1.schema.json`.

### Verification So Far

- `python -m pytest tests\test_config.py tests\test_json_report.py tests\test_schema_docs.py tests\test_model.py tests\test_cli.py -q`
  passed: `44 passed`.
- `python -m pytest tests\test_visualizer.py tests\test_examples.py tests\test_transformer.py tests\test_artifacts.py -q`
  passed: `67 passed`.
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- Parsed:
  - all three JSON schema files;
  - `reports/visualizer_presets.json`.
- Validated representative generated JSON against schemas:
  - `reports/nature_pace_64x64.json`;
  - `reports/luan_2026_single_shot_mmm_surrogate.json`;
  - `reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json`;
  - `reports/bert_base_12layer_model/bert_base_12layer_model_summary.json`.
- Regenerated checked artifacts with
  `regenerate_checked_artifacts()`.
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`

## 2026-07-04 Cycle 4: Final Verification

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md` before final verification.

### Final Gate Results

- `python -m ruff check` passed:
  `All checks passed!`
- `python -m pytest -q` passed:
  `119 passed`.
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `python -m pytest tests\test_visualizer_smoke.py -q` passed:
  `1 passed`.
- JSON parse checks passed for:
  - `docs/photonic-bench-report-v1.schema.json`;
  - `docs/photonic-bench-transformer-layer-report-v1.schema.json`;
  - `docs/photonic-bench-transformer-model-report-v1.schema.json`;
  - `reports/visualizer/data/index.json`;
  - `reports/visualizer_presets.json`.
- Representative schema validations passed for:
  - `reports/nature_pace_64x64.json`;
  - `reports/luan_2026_single_shot_mmm_surrogate.json`;
  - `reports/bert_base_encoder_layer/bert_base_layer_layer_summary.json`;
  - `reports/bert_base_12layer_model/bert_base_12layer_model_summary.json`.
- `git diff --check` passed. Git printed line-ending normalization warnings
  for working-copy files, but no whitespace errors.

## 2026-07-04 Cycle 3: Hostile Senior Reviewer Critique And Fixes

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md` before the critique pass.

### Review Skill And Checklist

- Read review skill:
  `C:\Users\burba\.agents\skills\review\SKILL.md`.
- The skill text referenced `.Codex/skills/review/checklist.md`, but that
  literal relative path and the workspace path were missing.
- Read the skill-local checklist instead:
  `C:\Users\burba\.agents\skills\review\checklist.md`.
- Reviewed against `origin/master` because this repository uses `master`, not
  `main`.

### Critique Findings

Pre-Landing Review: 3 issues (0 critical, 3 informational)

**Issues** (non-blocking):

- `photonic_bench/visualizer_assets/app.js`: Transformer aggregate system
  detail rows could show `n/a` for contention/calibration-adjusted transfer
  because aggregate JSON uses serial adjusted transfer fields rather than the
  per-card effective-transfer field names.
  Fix: add serial adjusted-transfer fallbacks in the visualizer detail rows.

- `photonic_bench/model.py`: `bandwidth_limited_tier` and
  `contention_limited_tier` named a memory tier even when compute batch latency
  was the actual max term.
  Fix: return `compute` when compute latency dominates; otherwise return the
  serialized tier path or slowest tier.

- `photonic_bench/visualizer_assets/app.js`: numeric fallback rows used `||`,
  which can hide valid zero values.
  Fix: use nullish fallback for numeric system display rows.

### Critique Fix Verification

- Fixed all three findings.
- Regenerated checked artifacts after model and visualizer changes.
- `python -m pytest tests\test_model.py tests\test_json_report.py tests\test_visualizer.py tests\test_artifacts.py -q`
  passed: `26 passed`.
- `node --check photonic_bench\visualizer_assets\app.js` passed.
- `python -m photonic_bench.cli verify-artifacts` passed:
  `Artifacts are fresh: checked 226 generated files.`

## 2026-07-04 Cycle 5: Commit, Push, And Closeout State

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` before closeout.
- Re-read `tasks/todo.md` before editing the final todo state.

### Commit And Push

- Staged the implementation, docs, tests, examples, generated reports, and
  visualizer payloads separately from state files.
- Created implementation commit:
  - `9c96ac6` `Deepen contention modeling and visualizer analysis`.
- Checked for the optional `.Codex/scripts/generate-reasoning.sh` hook; it is
  not present in this repository.
- Ran `git push -u origin codex/pr4-followup-improvements`.
- Git set the branch to track `origin/codex/pr4-followup-improvements`.

### Closeout State

- Marked `GOAL.md` implementation status complete.
- Marked all `CHECKLIST.md` tasks DONE with proof.
- Updated `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` for
  closeout.
- This state-only closeout is committed after the implementation commit and
  pushed to the same follow-up branch.
