# PhotonicBench PR9 Merge, Visualizer, And System Modeling Context

## Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Current branch after PR #9 merge: `master`
- Base branch: `master`
- Remote: `https://github.com/lamb356/photonic-bench.git`
- GitHub CLI auth was previously verified for account `lamb356` with `repo`
  and `workflow` scopes.
- PR #9 at cycle start: `https://github.com/lamb356/photonic-bench/pull/9`
  - title: `Add tier bottleneck diagnostics and visualizer stack`;
  - base: `master`;
  - head: `codex/pr8-followup-improvements`;
  - state: open, non-draft, mergeable;
  - head commit: `b75d4e409aa6594c6941aa1a97e34fb470e91c24`;
  - checks at setup:
    - `Ruff, package, and pytest`: success;
    - `macOS visual regression`: success.
- PR #9 merge:
  - state: merged;
  - merge commit: `0f9ba2acc893ffbe5c5fbfd163481e4f69052328`;
  - merged at: `2026-07-04T17:38:23Z`;
  - post-merge master CI run: `28714312225`, passed;
  - local post-merge verification on clean `master`: `python -m pytest -q`
    passed with 130 tests, and `python -m photonic_bench.cli verify-artifacts`
    passed with 258 fresh generated files;
  - branch cleanup: no local or remote `codex/pr8-followup-improvements`
    branch remains after pruning.

## PR #9 Work To Merge First

- Protected publish commits:
  - `6e80186 Add tier bottleneck diagnostics and visualizer stack`;
  - `50fe226 Refresh bottleneck diagnostic artifacts`.
- Follow-up implementation commit:
  - `d452cf8 Add hierarchy bandwidth headroom diagnostics`.
- Closeout state commit:
  - `b75d4e4 Close PR9 follow-up state`.
- Durable GBrain note from the prior loop:
  - `photonicbench-pr9-bandwidth-headroom-followup-2026-07-04`.

## Current PR #9 Feature Surface

- Visualizer:
  - Bottleneck Stack comparison panel.
  - Worst tier pressure and largest tier movement-share diagnostics.
  - Bandwidth utilization, headroom, and saturation-tier analytics in
    Contention Insight, Bottleneck Stack, Review Queue, comparison summary,
    scoring, JSON export, Markdown export, and CSV export.
  - Local-model boundary language preserved for hierarchy, contention, and
    bandwidth-headroom diagnostics.
- System model:
  - Per-tier calibrated transfer time, traffic share, movement-energy share,
    transfer share, pressure ratios, compute-window required bandwidth,
    contention bandwidth utilization, bandwidth headroom in bytes/ns, and
    bandwidth headroom ratio.
  - Top-level dominant traffic tier, dominant movement-energy tier,
    nominal/contention memory bottleneck tiers, max pressure ratios, max
    movement-energy share, saturation tier, max bandwidth utilization, and
    minimum traffic-tier headroom ratio.
  - Exposure through matmul JSON/Markdown, comparison Markdown/exports,
    transformer layer/model aggregate JSON/Markdown, strict schemas, docs,
    tests, checked reports, and visualizer payloads.

## Follow-Up Implementation In This Goal

- Implementation commit:
  `8be7316725fd0ef2fd00e54e96d7bb9e7ef473a7`
  (`Add system energy stack diagnostics`).
- Visualizer changes:
  - Added Energy Stack in comparison mode, ranking selected artifacts by local
    movement-to-compute energy ratio and largest hierarchy-tier share of total
    local system energy.
  - Added Comparison Review Checklist in comparison mode and JSON/Markdown
    exports for pinned baseline, schema compatibility, published-reference
    coverage, source-quality coverage, provenance coverage, system metric
    coverage, energy split coverage, bandwidth phase coverage, transformer
    boundaries, and external/legacy payload review.
  - Clarified guardbanded versus contention-only loaded bandwidth labels and
    added `guardbanded_loaded_hierarchy_bandwidth_bytes_per_ns` to comparison
    JSON exports while preserving the old
    `loaded_hierarchy_bandwidth_bytes_per_ns` alias.
- System-model changes:
  - Added per-tier `system_energy_share`.
  - Added local compute/conversion energy share,
    movement-to-compute energy ratio, dominant total-system energy component,
    max tier system-energy share, and contention-only loaded hierarchy
    bandwidth.
  - Preserved the existing guardbanded
    `contention_adjusted_loaded_bandwidth_bytes_per_ns` meaning.
- Exposure:
  - Per-matmul JSON/Markdown reports.
  - Comparison Markdown and CLI table.
  - Transformer layer/model aggregate JSON/Markdown.
  - Visualizer summaries, comparison dashboards, score profiles, JSON export,
    Markdown export, CSV export, and generated static payloads.
  - Strict report schemas and comparison-export schema docs.
- Verification after the hostile-review fix:
  - `python -m ruff check`;
  - `python -m pytest -q` (130 tests);
  - `python -m build`;
  - `python -m photonic_bench.cli verify-artifacts` (258 fresh files);
  - `node --check photonic_bench\visualizer_assets\app.js`;
  - `node --check reports\visualizer\assets\app.js`;
  - `python -m pytest tests\test_visualizer.py tests\test_visualizer_smoke.py -q`;
  - `python -m pytest tests\test_visualizer_accessibility.py tests\test_visualizer_visual_regression.py -q`;
  - `git diff --check`.
- Hostile Senior Reviewer finding fixed:
  - Ambiguous "loaded hierarchy bandwidth" labels/key were corrected to
    explicitly distinguish guardbanded loaded bandwidth from contention-only
    loaded bandwidth.

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

- Merge PR #9 and verify `master` before starting new feature work.
- Do not push or merge with known failing lint, tests, artifact freshness, or
  GitHub Actions checks.
- Do not fabricate published values, measured hardware data, or macOS
  screenshots.
- Keep local estimates and paper-reported values visibly separate.
- Generated artifacts must be refreshed after source/model/visualizer changes.
- The visualizer remains directly openable from disk via static JS payload
  wrappers.
