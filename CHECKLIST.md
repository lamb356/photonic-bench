# PhotonicBench PR #7 Merge And Five-Objective Outer Loop Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create this active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md`.
    - Re-read the bottom of `tasks/todo.md`.
    - Called GBrain `get_brain_identity`; version `0.42.56.0`.
    - Queried GBrain for current PR #7 / post-PR5 context; no direct hit was
      returned.
    - Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
      transformer, and workflow context.
    - Read GitHub, commit, frontend-design, and review skill guidance.
- [x] DONE: Keep `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`,
      `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` aligned as work
      advances.
  - Proof:
    - Updated closeout state after merge, implementation, verification, and
      hostile review.

## Task 1: Merge PR #7 And Verify Master

- [x] DONE: Verify PR #7 is open, non-draft, mergeable, and green before
      merge.
  - Proof:
    - `gh pr view 7` reported state `OPEN`, `isDraft=false`,
      `mergeable=MERGEABLE`.
    - PR checks were green:
      - `Ruff, package, and pytest`: success on run `28710380414`.
      - `macOS visual baseline capture`: success on run `28710380414`.
- [x] DONE: Merge PR #7 into `master`.
  - Proof:
    - `gh pr merge 7 --merge` completed successfully.
    - PR #7 is `MERGED` at merge commit
      `12aaab1554f0584eccb4f4b673880b60720a4f73`.
- [x] DONE: Update local `master`, verify it contains the merge, and clean up
      the merged branch locally/remotely if safe.
  - Proof:
    - Local `master` fast-forwarded to `12aaab1`.
    - Deleted local branch `codex/post-pr5-visual-a11y`.
    - Deleted remote branch `origin/codex/post-pr5-visual-a11y`.
    - Created follow-up branch `codex/pr7-followup-improvements` for new work.
- [x] DONE: Verify post-merge `master` GitHub Actions completes green.
  - Proof:
    - Merge-triggered CI run `28710804037` completed `success`.
    - Jobs passed:
      - `Ruff, package, and pytest`.
      - `macOS visual baseline capture`.
- [x] DONE: Run local full test suite and `verify-artifacts` on `master`.
  - Proof:
    - `python -m pytest -q` passed: 128 tests.
    - `python -m photonic_bench.cli verify-artifacts` passed: 238 generated
      files fresh.
- [x] DONE: Perform post-merge artifact verification, including visualizer
      payload freshness and macOS baseline artifact decision.
  - Proof:
    - Downloaded real `macos-latest` artifact
      `macos-visual-regression-screenshots` from run `28710804037`.
    - Promoted five reviewed macOS PNG baselines into
      `tests/visual_baselines/macos/`.
    - Tightened the macOS CI job from update/capture mode to strict
      baseline comparison.
    - Verified promoted PNG dimensions and reran
      `python -m pytest tests\test_visualizer_visual_regression.py -q`
      successfully.
    - `python -m photonic_bench.cli verify-artifacts` still passed.

## Task 2: Visualizer Improvements

- [x] DONE: Map current visualizer dashboard, comparison, URL-state, preset,
      export, detail, and visual-regression surfaces on `master`.
  - Proof:
    - Reviewed `photonic_bench/visualizer.py`,
      `photonic_bench/visualizer_assets/app.js`, generated payload indexing,
      visualizer smoke, accessibility, and visual-regression tests.
- [x] DONE: Implement high-value interaction, dashboard, analytical, or
      usability improvements while preserving modeling-boundary labels.
  - Proof:
    - Added a Review Queue that triages high contention transfer/compute,
      high movement pJ per hierarchy byte, low hierarchy intensity, and low
      source confidence.
    - Added hierarchy intensity, movement pJ per hierarchy byte,
      transfer/compute ratio, and contention-adjusted transfer/compute ratio
      to detail, comparison, scoring, and export surfaces.
    - Kept published-reference, local-model, and surrogate labels visible.
- [x] DONE: Update visualizer docs, checked artifacts, browser smoke,
      accessibility, or visual regression coverage as relevant.
  - Proof:
    - Updated README and JSON schema docs.
    - Regenerated `reports/visualizer`.
    - `tests/test_visualizer.py`, visualizer smoke, accessibility, and visual
      regression tests passed.

## Task 3: Deeper System Modeling

- [x] DONE: Map current contention calibration, memory hierarchy, transformer
      aggregate, report, JSON schema, and visualizer exposure.
  - Proof:
    - Reviewed model, report, JSON report, comparison, transformer aggregate,
      schema, visualizer, and tests.
- [x] DONE: Add meaningful realism or calibration improvements with explicit
      local-model assumptions.
  - Proof:
    - Added hierarchy equivalent ops per byte, movement energy per hierarchy
      byte, transfer/compute time ratio, and contention-adjusted
      transfer/compute time ratio.
- [x] DONE: Expose new metrics in Markdown, JSON, comparison, transformer, and
      visualizer surfaces where appropriate.
  - Proof:
    - Exposed new metrics in matmul reports, JSON, comparison exports,
      transformer layer/model aggregates, schemas, docs, and visualizer views.
- [x] DONE: Add focused tests and regenerate affected artifacts.
  - Proof:
    - Updated model, JSON report, transformer, CLI, and visualizer tests.
    - Regenerated checked artifacts; final artifact check reports 258 fresh
      generated files.

## Task 4: More Published Photonic Accelerator Cards

- [x] DONE: Research recent high-quality photonic GEMM/tensor/tensor-core
      papers from primary sources.
  - Proof:
    - Used primary source pages/DOIs for Tang 2025 waveguide MVM, Meng 2025
      HOP, Prapas 2025 TSW PITC, Zhang 2025 PULTC, and Sved 2026
      inverse-designed PNN.
- [x] DONE: Add at least 3-5 source-backed example YAML cards with quality
      metadata, citations, and clear surrogate labels.
  - Proof:
    - Added five checked YAML cards under `examples/`.
    - `python -m photonic_bench.cli validate-examples --json` passed with 35
      checked examples and 0 errors.
- [x] DONE: Generate Markdown/JSON reports, comparison updates, and visualizer
      payloads for the new cards.
  - Proof:
    - Generated Markdown and JSON reports for all five cards.
    - Updated comparison and visualizer payload artifacts.
- [x] DONE: Document sources, assumptions, and source-vs-local-model
      boundaries.
  - Proof:
    - README and generated reports identify source-backed fields, local
      surrogate mappings, and source-quality metadata.

## Task 5: CLI And Workflow Usability

- [x] DONE: Map current CLI validation and full transformer-model workflow
      friction.
  - Proof:
    - Reviewed CLI example inventory, kind detection, YAML validation, and
      transformer workflow surfaces.
- [x] DONE: Improve validation feedback, workflow commands, or flags that
      reduce daily friction.
  - Proof:
    - Added `python -m photonic_bench.cli validate-examples` with text and
      JSON summaries.
- [x] DONE: Add tests and documentation for CLI/workflow improvements.
  - Proof:
    - Added CLI tests and README documentation for `validate-examples`.

## Task 6: Verification And Documentation

- [x] DONE: Regenerate checked artifacts after source/model/example/visualizer
      changes.
  - Proof:
    - Ran checked artifact regeneration.
    - `python -m photonic_bench.cli verify-artifacts` passed with 258 fresh
      generated files.
- [x] DONE: Run focused tests for touched surfaces.
  - Proof:
    - Focused CLI/model/JSON/transformer/visualizer tests passed with 71
      tests.
    - Visualizer smoke and accessibility tests passed.
    - Visual regression tests passed with 5 tests.
- [x] DONE: Run full Ruff, full pytest, package build, JS syntax,
      `verify-artifacts`, visual regression, accessibility, and diff hygiene
      before closeout.
  - Proof:
    - `python -m ruff check` passed.
    - `python -m pytest -q` passed with 130 tests.
    - `python -m build` passed.
    - Node syntax checks passed for source and generated visualizer JS.
    - `python -m photonic_bench.cli verify-artifacts` passed.
    - Browser smoke, accessibility, and visual regression tests passed.
    - `git diff --check` passed with only Git line-ending normalization
      warnings.

## Task 7: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read state files and review checklist before critique.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, `tasks/todo.md`, and the review skill checklist.
- [x] DONE: Run critique focused on usability, modeling clarity, source
      boundaries, code quality, test reliability, CI artifact usability, and
      visual regression portability.
  - Proof:
    - Hostile review found stale `CHANGELOG.md` language describing PR #7 as
      newly opened and macOS CI as capture-only after it had been merged and
      tightened.
- [x] DONE: Fix important findings and re-run affected verification.
  - Proof:
    - Consolidated the changelog entry to match the post-merge strict macOS
      baseline state.
    - Re-ran affected verification during closeout.

## Task 8: Final Closeout

- [x] DONE: Confirm all five objectives have meaningful implementation and
      proof.
  - Proof:
    - PR #7 merge and master verification completed.
    - Visualizer, system modeling, published-card, and CLI/workflow surfaces
      all received tested implementation.
- [x] DONE: Update state files and `tasks/todo.md` to final DONE state.
  - Proof:
    - This closeout update marks the active checklist items complete with
      recorded proof.
- [x] DONE: Record PR merge, CI, final git status, verification, durable notes,
      and remaining risks.
  - Proof:
    - PR merge, CI, artifact, test, source, and review evidence are recorded
      here and in `PROGRESS.md`.
    - Durable GBrain note:
      `photonicbench-pr7-merge-followup-2026-07-04`.
    - Follow-up PR #8 is open and green:
      `https://github.com/lamb356/photonic-bench/pull/8`.
