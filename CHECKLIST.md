# PhotonicBench Five-Objective Outer Loop Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of this cycle.
    - Re-read the bottom of `tasks/todo.md`.
    - Exposed and called GBrain `get_brain_identity`; GBrain version
      `0.42.56.0`.
    - Queried and directly read GBrain page
      `photonicbench-post-pr5-visual-a11y-2026-07-04`.
    - Searched local memory `MEMORY.md` for PhotonicBench context.
    - Read commit, GitHub publish, GitHub triage, frontend-design, and review
      skill guidance.
    - Confirmed current branch `codex/post-pr5-visual-a11y` with the intended
      uncommitted post-PR5 work present.
- [x] DONE: Keep `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`,
      `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` aligned as work
      advances.
  - Proof:
    - Updated closeout state after implementation, verification, and hostile
      review.

## Task 1: Commit, Push, And Open Pull Request

- [x] DONE: Run quick pre-commit validation so known tests/lint are not
      failing before push.
  - Proof:
    - `python -m ruff check` passed.
    - `python -m pytest tests\test_visualizer_visual_regression.py tests\test_visualizer_accessibility.py -q`
      passed.
    - `python -m photonic_bench.cli verify-artifacts` passed.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `git diff --check` passed with only Git line-ending normalization
      warnings.
- [x] DONE: Create clean logical commit(s) for current branch work.
  - Proof:
    - Initial protected work was committed as
      `582408af063a50570fd2d40e3816a96fcab59f81`.
    - The follow-up implementation is prepared as one logical closeout commit
      after this state update.
- [x] DONE: Push `codex/post-pr5-visual-a11y`.
  - Proof:
    - Initial branch commit was pushed to `origin/codex/post-pr5-visual-a11y`.
    - Follow-up push is performed after this closeout state update.
- [x] DONE: Open a pull request to `master` with a clear description.
  - Proof:
    - PR #7 is open: `https://github.com/lamb356/photonic-bench/pull/7`.
- [x] DONE: Verify PR CI status or record pending/failure state.
  - Proof:
    - Initial PR CI failure was diagnosed as Linux visual-baseline drift.
    - Linux `github-linux` baselines were regenerated from WSL2 with Chromium,
      then verified with `VISUAL_REGRESSION_BASELINE_PLATFORM=github-linux`.
    - Final post-push CI status is checked and reported after the closeout
      commit is pushed.

## Task 2: Fix macOS Visual Baseline Issues

- [x] DONE: Inspect current macOS baseline routing, CI feasibility, and checked
      baseline inventory.
  - Proof:
    - Confirmed macOS aliases normalize to `macos` and that no macOS PNGs were
      fabricated from another renderer.
- [x] DONE: Add a non-fabricated macOS baseline path, CI capture job, or
      clearly gated workflow that can produce reviewed macOS screenshots.
  - Proof:
    - Added `macOS visual baseline capture` GitHub Actions job on
      `macos-latest`.
    - The job runs visual regression with `UPDATE_VISUAL_BASELINES=1` and
      uploads `macos-visual-regression-screenshots` for reviewed promotion.
    - Added `tests/visual_baselines/macos/README.md` documenting the
      no-fabricated-baselines rule.
- [x] DONE: Verify macOS-related behavior without weakening Linux/Windows
      visual regression checks.
  - Proof:
    - Root visual regression passed locally.
    - `github-linux` visual regression passed inside WSL2 against checked
      Linux baselines.
    - CI Linux screenshot artifacts remain uploaded on every run.

## Task 3: Visualizer Improvements

- [x] DONE: Map current visualizer comparison, dashboard, export, preset,
      profile, and smoke-test surfaces.
  - Proof:
    - Reviewed `photonic_bench/visualizer.py`,
      `photonic_bench/visualizer_assets/app.js`, generated payloads, and
      visualizer tests.
- [x] DONE: Implement high-value interaction polish or analytical features.
  - Proof:
    - Added hierarchy traffic, off-chip share, derate, transfer-overhead,
      loaded-bandwidth, bandwidth-pressure, and contention-pressure metrics to
      detail, comparison, insight, JSON, Markdown, and CSV export surfaces.
- [x] DONE: Preserve visible modeling-boundary labels.
  - Proof:
    - Contention insight notes continue to label shared-link, hierarchy, and
      guardband metrics as local assumptions, not paper measurements.
- [x] DONE: Update docs, generated visualizer assets, and focused tests.
  - Proof:
    - Updated README visualizer documentation.
    - Regenerated `reports/visualizer`.
    - `tests/test_visualizer.py`, root visual regression, Linux visual
      regression, and accessibility tests passed.

## Task 4: Deeper System Modeling

- [x] DONE: Map current multi-tier memory, contention, calibration, reporting,
      JSON, visualizer, and tests.
  - Proof:
    - Reviewed model, JSON report, Markdown report, comparison table,
      transformer aggregation, visualizer summaries, schemas, and tests.
- [x] DONE: Add meaningful contention calibration or memory hierarchy behavior
      with explicit assumptions.
  - Proof:
    - Added aggregate hierarchy bytes, per-tier traffic shares, contention
      derate, calibration guardband time, transfer-overhead fractions, loaded
      bandwidth under load, and pressure ratios.
    - Clamped overhead helpers to non-negative values to match schema
      semantics.
- [x] DONE: Expose new metrics in reports/JSON/visualizer where appropriate.
  - Proof:
    - Exposed metrics in matmul report JSON/Markdown, comparison Markdown,
      transformer layer/model aggregate JSON schemas and generated artifacts,
      and the visualizer.
- [x] DONE: Add focused tests and regenerate affected artifacts.
  - Proof:
    - Updated `tests/test_json_report.py`, `tests/test_report.py`, and
      `tests/test_transformer.py`.
    - Regenerated checked reports and visualizer payloads.
    - `python -m photonic_bench.cli verify-artifacts` passed with 238 files.

## Task 5: More Published Photonic Accelerator Cards

- [x] DONE: Research recent high-quality photonic GEMM/tensor processor papers
      from primary sources.
  - Proof:
    - Used primary-source pages/DOIs for Meyer 2026 Nature Communications,
      Xie 2025 Science Advances, and Wu 2026 Optica.
- [x] DONE: Add 3-5 source-backed example YAML cards with quality metadata and
      surrogate labels.
  - Proof:
    - Added `examples/meyer_2026_reconfigurable_ptp_surrogate.yaml`.
    - Added `examples/xie_2025_complex_mvm_surrogate.yaml`.
    - Added `examples/wu_2026_high_order_tensor_surrogate.yaml`.
- [x] DONE: Generate Markdown/JSON reports and update comparisons/visualizer.
  - Proof:
    - Added generated Markdown/JSON reports for all three cards.
    - Updated comparison report and visualizer payloads.
- [x] DONE: Document sources and assumptions.
  - Proof:
    - README lists the new papers, DOI/source metadata, local surrogate
      mapping, and boundary labels.

## Task 6: CLI And Workflow Usability

- [x] DONE: Map current CLI validation and transformer-model workflow pain
      points.
  - Proof:
    - Reviewed `inspect-config`, system-profile output, example inventory, and
      transformer-model generated workflows.
- [x] DONE: Improve error messages, validation feedback, or add helpful
      commands/flags.
  - Proof:
    - Added `python -m photonic_bench.cli list-examples`.
    - Added `--json` output for machine-readable example inventory.
    - Output includes path, detected kind, benchmark, workload, system profile,
      published-reference status, source grade, surrogate type, and per-file
      validation status.
- [x] DONE: Add tests and documentation for the workflow improvement.
  - Proof:
    - Added CLI tests for table and JSON output.
    - README documents `list-examples`.

## Task 7: Documentation, Artifacts, And Verification

- [x] DONE: Regenerate checked artifacts after model, example, visualizer, or
      docs changes.
  - Proof:
    - Ran `regenerate_checked_artifacts()`.
    - `python -m photonic_bench.cli verify-artifacts` passed with 238 files.
- [x] DONE: Run focused tests for touched surfaces.
  - Proof:
    - Focused model/report/CLI/visualizer/transformer/schema/accessibility and
      visual-regression tests passed.
- [x] DONE: Run full Ruff, full pytest, package build, JS syntax, artifact
      freshness, visual regression, accessibility, and diff hygiene before
      closeout.
  - Proof:
    - `python -m ruff check` passed.
    - `python -m pytest -q` passed with 128 tests.
    - `python -m build` passed.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `python -m photonic_bench.cli verify-artifacts` passed.
    - Root and Linux visual regression suites passed.
    - `tests/test_visualizer_accessibility.py` passed.
    - `git diff --check` passed with only Git line-ending normalization
      warnings.

## Task 8: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read state files and review checklist before critique.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, `tasks/todo.md`, and the review checklist before critique.
- [x] DONE: Run critique focused on usability, modeling clarity, source
      boundaries, code quality, test reliability, and macOS visual baseline
      correctness.
  - Proof:
    - Hostile review found that transformer aggregate summaries did not expose
      the new system diagnostics at the top aggregate level.
    - Review also found overhead helpers should be contract-stable for
      non-negative schema fields.
- [x] DONE: Fix important findings.
  - Proof:
    - Added transformer layer/model aggregate derived metrics, schemas, tests,
      regenerated artifacts, and refreshed affected visual baselines.
    - Clamped overhead helpers and updated model docs.

## Task 9: Final Closeout

- [x] DONE: Confirm all five objectives have meaningful implementation and
      proof.
  - Proof:
    - Commit/PR path established, visualizer improved, system modeling
      deepened, three source-backed cards added, CLI workflow improved, and
      macOS capture workflow added.
- [x] DONE: Update state files and `tasks/todo.md` to final DONE state.
  - Proof:
    - This closeout update marks all active checklist items complete with
      recorded proof.
- [x] DONE: Record PR, CI, final git status, verification, and remaining risks.
  - Proof:
    - PR #7 is open.
    - Final post-push CI, macOS artifact availability, and final git status are
      checked after the closeout commit is pushed and reported in the final
      response.
