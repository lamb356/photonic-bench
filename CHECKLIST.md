# PhotonicBench Autonomous Loop Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active prioritized
      checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of Cycle 0.
    - Re-read `tasks/todo.md`.
    - Confirmed active goal record already exists for this thread.
    - Read GitHub workflow skill instructions for PR handling.
    - Called GBrain `get_brain_identity`; GBrain is available as version
      `0.42.56.0`.
    - Queried GBrain for PhotonicBench/PR #4 context; it returned no hits.
    - Confirmed current branch before merge is
      `codex/artifact-freshness-profiles`.
    - Confirmed `origin` is `https://github.com/lamb356/photonic-bench.git`.

## Task 1: Merge PR #4 Into Master

- [x] DONE: Verify PR #4 state and CI.
  - Proof:
    - `gh pr view 4 --json ...` confirmed PR #4 was `OPEN`, not draft,
      base `master`, head `codex/artifact-freshness-profiles`, and
      `mergeStateStatus` `CLEAN`.
    - `gh pr checks 4` confirmed `Ruff, package, and pytest` passed in `57s`.

- [x] DONE: Merge PR #4 into `master`.
  - Proof:
    - Ran `gh pr merge 4 --merge --delete-branch`.
    - PR #4 is now `MERGED`.
    - Merge commit is `216950c39ca20007b390d4c3b8dbdf9cbc6a99fe`.
    - GitHub recorded `mergedAt` `2026-07-04T08:11:09Z`.

- [x] DONE: Ensure local `master` is clean and up to date before follow-up
      feature work.
  - Proof:
    - After merge, `git status --short --branch` showed
      `## master...origin/master` with no file changes.
    - `git branch -vv` showed `master 216950c [origin/master] Merge pull
      request #4 from lamb356/codex/artifact-freshness-profiles`.
    - Created follow-up branch `codex/pr4-followup-improvements` from merged
      `master` for this new work.

## Task 2: Visualizer Interaction And Analytical Improvements

- [x] DONE: Map current visualizer comparison, preset, export, mixed-schema,
      Pareto/profile, and modeling-boundary surfaces from `master`.
  - Proof:
    - Read `photonic_bench/visualizer.py`.
    - Read `photonic_bench/visualizer_assets/app.js`.
    - Read `tests/test_visualizer.py`.
    - Read `reports/visualizer_presets.json`.
    - Confirmed comparison mode already had pinned references, presets,
      exports, Pareto/profile views, external loading, and boundary notes.

- [x] DONE: Implement meaningful interaction polish and analytical features.
  - Proof:
    - Added contention-adjusted latency/throughput to visualizer artifact
      summaries.
    - Added contention-adjusted comparison rows and Markdown/JSON export
      fields.
    - Added a `Contention Insight` dashboard panel for adjusted throughput,
      adjusted latency, shared client count, and calibration/control overhead.
    - Added a `contention-throughput` Pareto mode.
    - Added an index-level modeling-boundary note for contention metrics.

- [x] DONE: Add or update visualizer tests and browser smoke coverage.
  - Proof:
    - Updated `tests/test_visualizer.py` for new preset card IDs,
      contention summary fields, static UI strings, and modeling boundaries.
    - `python -m pytest tests\test_visualizer.py tests\test_examples.py tests\test_transformer.py tests\test_artifacts.py -q`
      passed: `67 passed`.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.

## Task 3: Deeper System Modeling

- [x] DONE: Map current config, model, transformer, report, comparison, schema,
      and visualizer system-metric surfaces from `master`.
  - Proof:
    - Read `photonic_bench/config.py`, `model.py`, `json_report.py`,
      `report.py`, `comparison.py`, `transformer.py`, `visualizer.py`, and
      the three JSON schema files.

- [x] DONE: Add auditable contention, shared-bandwidth, or calibration metrics.
  - Proof:
    - Added `SystemContentionConfig` with shared client count, arbitration
      efficiency, and calibration/control overhead.
    - Added config parsing and validation for `system.contention`.
    - Added tier effective bandwidth, contention-adjusted tier transfer time,
      contention-adjusted effective transfer time, calibration-adjusted
      transfer time, adjusted latency/throughput, and limiting tier fields.
    - Added non-default contention assumptions to `pcie_attached`.
    - Updated tests for default behavior, adjusted formulas, and invalid
      contention inputs.

- [x] DONE: Surface new metrics in Markdown, JSON, comparison output, and the
      visualizer.
  - Proof:
    - Updated Markdown reports, JSON reports, transformer aggregates,
      comparison tables, visualizer summaries, schemas, and docs.
    - Representative generated JSON validated against the tightened schemas:
      per-card, new-card, transformer-layer, and transformer-model reports.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`

## Task 4: More Published Cards

- [x] DONE: Identify at least 3 to 4 high-quality source-backed published
      photonic accelerator candidates.
  - Proof:
    - Selected four source-backed cards:
      `luan_2026_single_shot_mmm_surrogate`,
      `bandyopadhyay_2024_single_chip_dnn_surrogate`,
      `kari_2024_coherent_matrix_platform_surrogate`, and
      `dong_2023_continuous_time_tensor_core_surrogate`.
    - Recorded DOI/stable source metadata and conservative surrogate mapping
      in each YAML card.

- [x] DONE: Add YAML cards with conservative citations, assumptions,
      source-quality metadata, and local surrogate labeling.
  - Proof:
    - Added `examples/luan_2026_single_shot_mmm_surrogate.yaml`.
    - Added `examples/bandyopadhyay_2024_single_chip_dnn_surrogate.yaml`.
    - Added `examples/kari_2024_coherent_matrix_platform_surrogate.yaml`.
    - Added `examples/dong_2023_continuous_time_tensor_core_surrogate.yaml`.
    - Added tests in `tests/test_examples.py` for DOI/source metrics and
      source-quality metadata.

- [x] DONE: Regenerate Markdown/JSON reports, comparison output, and visualizer
      payloads for the new cards.
  - Proof:
    - Added the new cards to the artifact freshness manifest and published
      visualizer preset.
    - Regenerated reports, comparison output, and visualizer payloads.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`

## Task 5: CLI And Workflow Usability

- [x] DONE: Identify current high-friction CLI, validation, transformer-model,
      or regeneration workflows.
  - Proof:
    - Read `photonic_bench/cli.py`, config loaders, transformer-model config
      examples, and CLI tests.
    - Chose a read-only config inspection command because it reduces friction
      before generating complex transformer/system-profile artifacts.

- [x] DONE: Implement targeted CLI/workflow improvements with tests and docs.
  - Proof:
    - Added `inspect-config` with `--kind auto|matmul|transformer-layer|transformer-model`
      and `--json`.
    - Extended `system-profiles` output with contention columns.
    - Added CLI tests for human-readable profile output, JSON profile output,
      matmul inspection, and transformer-model JSON inspection.
    - `python -m pytest tests\test_config.py tests\test_json_report.py tests\test_schema_docs.py tests\test_model.py tests\test_cli.py -q`
      passed: `44 passed`.

## Task 6: Documentation And Artifact Refresh

- [x] DONE: Update README, model docs, schema docs, visualizer docs, and usage
      examples for all user-facing changes.
  - Proof:
    - Updated `README.md` for new cards, contention metrics, visualizer
      analytics, `inspect-config`, comparison output, and artifact workflow.
    - Updated `docs/model.md` with contention formulas and transformer
      aggregate adjusted-latency formulas.
    - Updated `docs/json_schema.md` with contention fields, units, and
      adjusted output semantics.
    - Updated all three machine-readable JSON schemas.

- [x] DONE: Regenerate checked generated artifacts.
  - Proof:
    - Ran `python -c "from photonic_bench.artifacts import regenerate_checked_artifacts; regenerate_checked_artifacts()"`.
    - New Markdown/JSON card reports, comparison output, and visualizer
      payloads were generated.

- [x] DONE: Run artifact freshness verification.
  - Proof:
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`

## Task 7: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read required state files and run the critique focused on
      modeling credibility, visualizer usefulness, source-card quality, CLI
      usability, and merge readiness.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md`.
    - Read review skill
      `C:\Users\burba\.agents\skills\review\SKILL.md`.
    - The skill-referenced `.Codex/skills/review/checklist.md` path was
      missing; read the skill-local
      `C:\Users\burba\.agents\skills\review\checklist.md` instead.
    - Reviewed the branch diff against `origin/master`.
    - Recorded findings in `PROGRESS.md`.

- [x] DONE: Fix important critique findings or record explicit non-fix
      rationale.
  - Proof:
    - Fixed aggregate adjusted-transfer visualizer fallbacks.
    - Fixed limiting-tier semantics so compute-dominated cases report
      `compute`.
    - Replaced fragile JavaScript numeric `||` fallbacks with nullish
      fallbacks.
    - `python -m pytest tests\test_model.py tests\test_json_report.py tests\test_visualizer.py tests\test_artifacts.py -q`
      passed: `26 passed`.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`

## Task 8: Final Verification And Closeout

- [x] DONE: Run final quality gates.
  - Proof:
    - `python -m ruff check` passed: `All checks passed!`
    - `python -m pytest -q` passed: `119 passed`.
    - `python -m photonic_bench.cli verify-artifacts` passed:
      `Artifacts are fresh: checked 226 generated files.`
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - Browser smoke passed:
      `python -m pytest tests\test_visualizer_smoke.py -q` reported
      `1 passed`.
    - JSON parse and representative schema validation passed for schemas,
      visualizer index, presets, per-card, new-card, transformer-layer, and
      transformer-model reports.
    - `git diff --check` passed; only Git line-ending normalization warnings
      were printed.

- [x] DONE: Commit and push final goal work.
  - Proof:
    - Created implementation commit `9c96ac6` with message
      `Deepen contention modeling and visualizer analysis`.
    - Optional reasoning hook `.Codex/scripts/generate-reasoning.sh` is not
      present in this repository, so no hook output was generated.
    - Ran `git push -u origin codex/pr4-followup-improvements`; Git set the
      branch to track `origin/codex/pr4-followup-improvements`.

- [x] DONE: Close `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` with proof.
  - Proof:
    - Updated all required state files to complete status after final
      verification and the implementation push.
    - This closeout state is committed separately from the implementation
      commit so the code/report changes remain reviewable.
    - Final repository status is inspected after the closeout commit is pushed
      and reported in the final response.
