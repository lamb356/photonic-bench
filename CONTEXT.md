# PhotonicBench PR Publication, Visualizer, And System Modeling Context

## Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch: `codex/pr8-followup-improvements`
- Base branch: `master`
- Remote: `https://github.com/lamb356/photonic-bench.git`
- GitHub CLI auth: account `lamb356`; token has `repo` and `workflow` scopes.
- Existing branch state before this cycle:
  - Large verified dirty worktree on `codex/pr8-followup-improvements`.
  - Work was previously verified locally but deliberately left unpublished.
  - GBrain note:
    `photonicbench-pr8-merge-bottleneck-stack-2026-07-04`.

## Current Unpublished Work To Protect First

- Visualizer:
  - Bottleneck Stack comparison panel.
  - Worst tier pressure and largest tier movement-share diagnostics.
  - Exposure in comparison matrix, Review Queue, scoring profiles, JSON export,
    Markdown export, CSV export, and browser smoke coverage.
  - Local-model boundary language preserved.
- System model:
  - Per-tier `calibration_adjusted_transfer_time_ns`.
  - Tier traffic share, movement-energy share, and transfer share.
  - Nominal and contention-adjusted pressure ratios.
  - Top-level dominant traffic tier, dominant movement-energy tier,
    nominal/contention memory bottleneck tiers, max tier pressure ratios, and
    max tier movement-energy share.
  - Exposure through matmul JSON/Markdown, comparison Markdown, transformer
    layer/model aggregate JSON, strict schemas, docs, tests, generated reports,
    and visualizer payloads.
- Prior verification recorded in GBrain:
  - `python -m ruff check`.
  - `python -m pytest -q` with 130 tests.
  - `python -m build`.
  - `python -m photonic_bench.cli verify-artifacts` with 258 fresh generated
    files.
  - Source and generated visualizer JS syntax checks.
  - Browser smoke/accessibility/visual-regression tests with 7 tests.
  - `git diff --check` with only line-ending normalization warnings.

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
- Docs and schemas:
  - `README.md`
  - `CHANGELOG.md`
  - `docs/*.schema.json`
  - `docs/json_schema.md`
  - `docs/model.md`
- Examples and reports:
  - `examples/*.yaml`
  - `reports/*.json`
  - `reports/*.md`
  - `reports/visualizer/**`
- Tests:
  - `tests/test_visualizer*.py`
  - `tests/test_model.py`
  - `tests/test_report.py`
  - `tests/test_json_report.py`
  - `tests/test_transformer.py`
  - `tests/test_cli.py`
  - `tests/test_artifacts.py`

## Constraints

- Commit, push, and open the PR relatively early.
- Do not push with known failing lint or tests.
- Do not fabricate published values, measured hardware data, or macOS
  screenshots.
- Keep local estimates and paper-reported values visibly separate.
- Generated artifacts must be refreshed after source/model/visualizer changes.
- The visualizer remains directly openable from disk via static JS payload
  wrappers.
