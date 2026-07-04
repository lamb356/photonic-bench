# PhotonicBench Five-Objective Outer Loop Context

## Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch: `codex/post-pr5-visual-a11y`
- Base branch: `master`
- Remote: `https://github.com/lamb356/photonic-bench.git`
- Current branch contains the completed post-PR5 visual regression,
  accessibility, release-note, and baseline work, but it is not yet committed
  or pushed at the start of this loop.

## Carry-Forward Post-PR5 Work To Protect

From GBrain page `photonicbench-post-pr5-visual-a11y-2026-07-04` and local
state files:

- PR #5 was live-verified merged into `master` at
  `14cf2afd75eb873852675585de89f6b04eb752a2`.
- Post-merge `master` CI run `28706296529` concluded `success`.
- CI visual regression screenshots changed from `if: failure()` to
  `if: always()`.
- Visual regression coverage expanded to desktop comparison, mobile
  comparison, published-reference detail, external-report error diagnostics,
  and wide transformer comparison.
- `axe-playwright-python>=0.1.7` and accessibility tests were added.
- Axe findings were fixed in source UI: focusable scrollable table regions,
  visible focus rings, unique table region labels, and labeled export preview.
- Root and `github-linux` baselines were generated.
- macOS platform aliases normalize to `macos`, but real macOS PNGs were not
  fabricated.
- `CHANGELOG.md` summarizes the visualizer test and analysis upgrade.

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

- Do not push with failing known tests or lint.
- Do not fabricate published values or macOS screenshots.
- Source-backed card additions must cite primary sources and label surrogate
  local workloads clearly.
- Keep local estimates and paper-reported values visibly separate.
- Generated artifacts must be refreshed after source/model/example changes.
