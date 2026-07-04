# PhotonicBench PR #7 Merge And Five-Objective Outer Loop Progress

## 2026-07-04 Cycle 0: State Rollforward And Context Re-Read

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Re-read the bottom of `tasks/todo.md`.

### GBrain, Memory, And Skills

- Called GBrain `get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `27`;
  - chunk count `27`.
- Queried GBrain for current PR #7 / post-PR5 context; no direct hit was
  returned.
- Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
  transformer, and workflow context.
- Read skills:
  - `commit`;
  - `github:github`;
  - `frontend-design`;
  - `review`.

### Repository And PR State

- Current local branch at cycle start: `codex/post-pr5-visual-a11y`.
- `git status --short --branch` showed a clean branch tracking
  `origin/codex/post-pr5-visual-a11y`.
- PR #7 state from `gh pr view 7`:
  - URL: `https://github.com/lamb356/photonic-bench/pull/7`;
  - state: `OPEN`;
  - draft: `false`;
  - mergeable: `MERGEABLE`;
  - base: `master`;
  - head: `codex/post-pr5-visual-a11y`.
- PR #7 checks were green before merge:
  - `Ruff, package, and pytest`: success on run `28710380414`;
  - `macOS visual baseline capture`: success on run `28710380414`.

### State Rollforward

- Replaced the prior completed branch-closeout state with an active
  merge-first outer-loop state.
- Created the prioritized checklist for:
  1. PR #7 merge and post-merge `master` verification;
  2. visualizer improvements;
  3. deeper system modeling;
  4. more published cards;
  5. CLI/workflow usability;
  6. documentation and verification;
  7. mandatory hostile review;
  8. final closeout.

### Immediate Next Steps

1. Merge PR #7 into `master`.
2. Update local `master` and verify the merge locally.
3. Run local full verification and `verify-artifacts` on `master`.
4. Check post-merge `master` GitHub Actions.
5. Begin the next implementation slice from clean `master`.

## 2026-07-04 Cycle 1: PR #7 Merge And Post-Merge Verification

### Merge And Branch Cleanup

- Merged PR #7 with `gh pr merge 7 --merge`.
- PR #7 is merged at commit
  `12aaab1554f0584eccb4f4b673880b60720a4f73`.
- Fast-forwarded local `master` to `12aaab1`.
- Deleted local branch `codex/post-pr5-visual-a11y`.
- Deleted remote branch `origin/codex/post-pr5-visual-a11y`.
- Created follow-up branch `codex/pr7-followup-improvements` for this
  post-merge improvement loop.

### Post-Merge Verification

- Local verification on merged `master`:
  - `python -m pytest -q`: 128 passed;
  - `python -m photonic_bench.cli verify-artifacts`: 238 generated files
    fresh.
- GitHub Actions:
  - merge-triggered run `28710804037`;
  - conclusion: `success`;
  - jobs passed: `Ruff, package, and pytest`; `macOS visual baseline capture`.

### macOS Baseline Promotion

- Downloaded real `macos-latest` artifact
  `macos-visual-regression-screenshots` from run `28710804037`.
- Promoted five reviewed macOS PNG baselines:
  - `desktop-comparison.png`;
  - `detail-published-reference.png`;
  - `external-report-error.png`;
  - `mobile-comparison.png`;
  - `wide-transformer-comparison.png`.
- Verified promoted PNG dimensions:
  - desktop/detail/error: `1440x950`;
  - mobile: `390x900`;
  - wide transformer: `1680x1000`.
- Tightened `.github/workflows/ci.yml` so the macOS job now runs strict visual
  regression against checked `macos` baselines instead of update-only capture.
- Focused post-promotion checks:
  - `python -m pytest tests\test_visualizer_visual_regression.py -q`: 5
    passed;
  - `python -m photonic_bench.cli verify-artifacts`: 238 generated files
    fresh.

## 2026-07-04 Cycle 2: Implementation Slice

### Visualizer Improvements

- Added a Review Queue to the generated visualizer for daily triage:
  - highest contention-adjusted transfer/compute ratio;
  - highest movement energy per hierarchy byte;
  - lowest hierarchy equivalent ops per byte;
  - lowest source confidence.
- Added new metrics to generated visualizer summaries, detail panels,
  comparison rows, scoring profiles, and JSON/Markdown/CSV exports:
  - hierarchy equivalent ops per byte;
  - movement energy per hierarchy byte;
  - transfer/compute time ratio;
  - contention-adjusted transfer/compute time ratio.
- Preserved modeling-boundary language for published references, local model
  estimates, and surrogate workloads.

### Deeper System Modeling

- Extended `SystemModelResult` with:
  - `hierarchy_equivalent_ops_per_byte`;
  - `movement_energy_per_hierarchy_byte_pj`;
  - `transfer_to_compute_time_ratio`;
  - `contention_adjusted_transfer_to_compute_time_ratio`.
- Wired those metrics through Markdown reports, JSON reports, comparison
  exports, transformer layer/model aggregates, JSON schemas, docs, tests, and
  generated artifacts.

### Published Cards

- Added five source-backed surrogate cards:
  - `examples/tang_2025_waveguide_mvm_surrogate.yaml`;
  - `examples/meng_2025_digital_analog_hop_surrogate.yaml`;
  - `examples/prapas_2025_tsw_pitc_surrogate.yaml`;
  - `examples/zhang_2025_pultc_logic_tensor_surrogate.yaml`;
  - `examples/sved_2026_inverse_designed_pnn_surrogate.yaml`.
- Added artifact recipes, Markdown reports, JSON reports, comparison updates,
  and visualizer payloads for the five cards.
- Kept source-backed values, derived values, and local surrogate estimates
  separate in card metadata and reports.

### CLI / Workflow Usability

- Added `python -m photonic_bench.cli validate-examples`.
- Added `validate-examples --json` for machine-readable inventory validation.
- Added CLI tests and README documentation for the command.

## 2026-07-04 Cycle 3: Verification

- `python -m photonic_bench.cli validate-examples --json` passed:
  - checked examples: 35;
  - ok examples: 35;
  - errors: 0.
- Focused tests passed:
  - `python -m pytest tests\test_cli.py tests\test_model.py tests\test_json_report.py tests\test_transformer.py tests\test_visualizer.py -q`;
  - result: 71 passed.
- Browser checks passed:
  - `python -m pytest tests\test_visualizer_smoke.py tests\test_visualizer_accessibility.py -q`;
  - result: 2 passed.
- Visual regression passed:
  - `python -m pytest tests\test_visualizer_visual_regression.py -q`;
  - result: 5 passed.
- Full gate set passed:
  - `python -m ruff check`;
  - `python -m pytest -q`: 130 passed;
  - `python -m build`;
  - `node --check photonic_bench\visualizer_assets\app.js`;
  - `node --check reports\visualizer\assets\app.js`;
  - `python -m photonic_bench.cli verify-artifacts`: 258 generated files fresh;
  - `git diff --check` with only Git line-ending normalization warnings.

## 2026-07-04 Cycle 4: Hostile Senior Reviewer Critique

### Review Setup

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md`.
- Re-read the review skill and checklist.
- Reviewed the branch diff against `origin/master` after fetching latest
  `master`.

### Finding

- Finding 1: `CHANGELOG.md` mixed the new post-merge entry with stale language
  describing PR #7 as newly opened and macOS CI as capture-only, even though
  PR #7 had been merged and the macOS job was tightened to strict visual
  regression.
  - Fix: consolidated the top changelog section so it records the merged PR,
    strict macOS baseline state, new metrics, new cards, and CLI workflow
    commands without contradictory stale release wording.

### Post-Critique Verification

- Re-ran closeout verification after the documentation fix:
  - schema/docs focused tests;
  - `python -m photonic_bench.cli verify-artifacts`;
  - `git diff --check`.

## 2026-07-04 Cycle 5: Closeout State

- Updated `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
  `RUBRIC.md`, and `tasks/todo.md` to match the completed loop.
- Durable GBrain note written:
  - `photonicbench-pr7-merge-followup-2026-07-04`.

## 2026-07-04 Cycle 6: PR #8 Publish And Remote CI

- Committed the implementation package:
  - `fd70f5d0f9172bfbb2d1145b28d7aec6bc06cb09`;
  - message: `Extend PhotonicBench follow-up analysis`.
- Pushed branch `codex/pr7-followup-improvements`.
- Opened PR #8:
  - `https://github.com/lamb356/photonic-bench/pull/8`;
  - base: `master`;
  - head: `codex/pr7-followup-improvements`;
  - state: open, non-draft, mergeable.
- PR #8 CI run `28711667848` passed:
  - `Ruff, package, and pytest`: pass;
  - `macOS visual regression`: pass.
- Added this state-only closeout update so committed state files record the
  actual PR #8 URL and green CI result.
