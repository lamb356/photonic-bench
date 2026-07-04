# PhotonicBench PR #7 Merge And Five-Objective Outer Loop Context

## Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch at cycle start: `codex/post-pr5-visual-a11y`
- Current branch after PR #7 merge: `codex/pr7-followup-improvements`
- Follow-up branch status: implementation committed, pushed, opened as PR #8,
  and verified green in GitHub Actions.
- Base branch: `master`
- Remote: `https://github.com/lamb356/photonic-bench.git`
- PR #7: `https://github.com/lamb356/photonic-bench/pull/7`
- PR #7 head: `codex/post-pr5-visual-a11y`
- PR #7 base: `master`
- PR #7 start state: open, non-draft, mergeable, and green.
- PR #7 merged at `12aaab1554f0584eccb4f4b673880b60720a4f73`.
- Post-merge `master` CI run `28710804037` passed.
- Follow-up work adds strict macOS visual baselines, visualizer triage metrics,
  deeper hierarchy/contention ratios, five new source-backed cards, and
  `validate-examples`.
- Follow-up PR #8: `https://github.com/lamb356/photonic-bench/pull/8`
- PR #8 head commit before state-only closeout:
  `fd70f5d0f9172bfbb2d1145b28d7aec6bc06cb09`.
- PR #8 CI run `28711667848` passed:
  - `Ruff, package, and pytest`;
  - `macOS visual regression`.

## PR #7 Carry-Forward Work To Merge First

- Screenshot artifact upload on every visual regression run.
- Expanded visual regression coverage for comparison, detail, external-report
  error, and wide transformer comparison views.
- Axe-style accessibility checks and related UI accessibility fixes.
- Non-fabricated macOS visual baseline capture workflow.
- New system hierarchy, transfer-overhead, loaded-bandwidth, derate, and
  pressure diagnostics in reports, JSON, transformer aggregates, visualizer
  views, and exports.
- Meyer 2026, Xie 2025, and Wu 2026 source-backed surrogate cards.
- `list-examples` CLI inventory command and JSON output.
- Generated report and visualizer artifact updates.

## Relevant Code Surfaces

- CI and PR flow:
  - `.github/workflows/ci.yml`
- Visualizer:
  - `photonic_bench/visualizer_assets/app.js`
  - `photonic_bench/visualizer_assets/styles.css`
  - `photonic_bench/visualizer_assets/template.html`
  - `photonic_bench/visualizer.py`
- Model/report/JSON:
  - `photonic_bench/model.py`
  - `photonic_bench/report.py`
  - `photonic_bench/json_report.py`
  - `photonic_bench/comparison.py`
  - `photonic_bench/transformer.py`
- CLI/artifacts:
  - `photonic_bench/cli.py`
  - `photonic_bench/artifacts.py`
- Examples and reports:
  - `examples/*.yaml`
  - `reports/*.json`
  - `reports/*.md`
- Tests:
  - `tests/test_visualizer*.py`
  - `tests/test_model.py`
  - `tests/test_report.py`
  - `tests/test_json_report.py`
  - `tests/test_config.py`
  - `tests/test_cli.py`
  - `tests/test_artifacts.py`

## Constraints

- Do PR #7 merge and post-merge verification first.
- Do not push with failing known tests or lint.
- Do not fabricate published values or macOS screenshots.
- Source-backed card additions must cite primary sources and label surrogate
  local workloads clearly.
- Keep local estimates and paper-reported values visibly separate.
- Generated artifacts must be refreshed after source/model/example changes.
