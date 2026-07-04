# PhotonicBench Autonomous Loop Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and create the active checklist.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of Cycle 0.
    - Re-read `tasks/todo.md`.
    - Read commit, GitHub, publish, and frontend-design skill instructions.
    - Confirmed the active branch is `codex/artifact-freshness-profiles`.
    - Confirmed `origin` is `https://github.com/lamb356/photonic-bench.git`.
    - Confirmed GBrain tools were not exposed in this thread after deferred
      tool search.

## Task 1: Commit, Push, And Pull Request

- [x] DONE: Inspect the current dirty worktree and classify the existing
      uncommitted work.
  - Proof:
    - `git status --short --branch` confirmed branch
      `codex/artifact-freshness-profiles` with modified source, docs, tests,
      generated reports, visualizer assets, and untracked generated examples.
    - `git diff --stat` showed 191 tracked files changed before untracked
      files.
    - Scope classified as in-goal baseline work from artifact freshness,
      system profiles, transformer realism, external loading diagnostics,
      source-quality metadata, docs, tests, and generated artifacts.

- [x] DONE: Run the most relevant protective verification before committing.
  - Proof:
    - `python -m ruff check` passed.
    - `node --check photonic_bench\visualizer_assets\app.js` passed.
    - `python -m photonic_bench.cli verify-artifacts` passed with
      `Artifacts are fresh: checked 194 generated files.`
    - `python -m pytest -q` passed with `102 passed`.
    - `git diff --check` reported no whitespace errors; only Windows
      line-ending warnings.

- [x] DONE: Create clean logical commit or commits for the current branch.
  - Proof:
    - Created commit `c6cf572`:
      `Add artifact freshness profiles and transformer usability updates`.
    - Commit contains 242 staged paths covering the verified branch baseline.
    - No Codex attribution or co-author trailer was added.
    - The commit-skill reasoning script was not present under `.Codex` or
      `.codex`, so no local reasoning artifact could be generated.

- [x] DONE: Push `codex/artifact-freshness-profiles` to `origin`.
  - Proof:
    - `git push -u origin codex/artifact-freshness-profiles` succeeded.
    - Local branch now tracks
      `origin/codex/artifact-freshness-profiles`.

- [x] DONE: Open a pull request against `master`.
  - Proof:
    - GitHub connector PR creation returned 403, so authenticated
      `gh pr create` fallback was used.
    - Opened draft PR #4:
      `https://github.com/lamb356/photonic-bench/pull/4`.
    - `gh pr view 4` confirmed base `master`, head
      `codex/artifact-freshness-profiles`, state `OPEN`, draft `true`.

## Task 2: Visualizer Improvements

- [x] DONE: Map current visualizer comparison, preset, export, Pareto, profile,
      and modeling-boundary surfaces.
  - Proof:
    - Re-read `photonic_bench/visualizer.py`,
      `photonic_bench/visualizer_assets/app.js`, generated visualizer data,
      preset data, and current visualizer tests.
    - Confirmed existing comparison mode already had pinned selections,
      deltas, ratios, grouped analytics, saved presets, exports, Pareto views,
      and modeling-boundary labels.

- [x] DONE: Improve comparison analytics, usability, saved presets, exports, or
      Pareto/profile views with daily-use value.
  - Proof:
    - Added same-schema comparison decision scorecards that normalize selected
      artifacts across energy, system energy, movement share, latency,
      bandwidth-limited throughput, and operational intensity.
    - Added memory timing mode and effective transfer time to visualizer
      summaries, comparison matrix rows, JSON export, and Markdown export.
    - Extended the generated "Published reference surrogate cards" preset to
      include the four new source-backed cards.
    - Preserved explicit boundary text that scorecards are triage aids, not
      benchmark claims.

- [x] DONE: Update visualizer tests and browser smoke coverage.
  - Proof:
    - Updated `tests/test_visualizer.py` for the expanded preset and scorecard
      strings.
    - Updated `tests/test_visualizer_smoke.py` to wait for the Decision
      Scorecard in comparison mode.
    - `python -m pytest -q` passed with `109 passed`.

## Task 3: Deeper System Modeling

- [x] DONE: Map current system memory hierarchy, bandwidth, data movement,
      profile, report, schema, and visualizer exposure.
  - Proof:
    - Re-read `photonic_bench/config.py`, `model.py`, `json_report.py`,
      `report.py`, `transformer.py`, `comparison.py`, `visualizer.py`, JSON
      schemas, model docs, and system/profile tests.

- [x] DONE: Add richer auditable memory hierarchy and bandwidth/data-movement
      modeling.
  - Proof:
    - Added an explicit `intermediate` memory tier between SRAM and off-chip.
    - Added `system.memory_timing_mode` with validated `overlapped` and
      `serialized` modes.
    - Updated built-in system profiles so `pcie_attached` uses serialized
      transfer timing and all profiles carry intermediate-tier assumptions.
    - Updated per-card and transformer system accounting to report serialized
      transfer time and effective transfer time.

- [x] DONE: Surface new model metrics in reports, JSON, comparison output, and
      visualizer views.
  - Proof:
    - Updated Markdown reports, JSON reports, transformer aggregate JSON,
      comparison Markdown, visualizer summaries, visualizer detail views, and
      JSON schemas for intermediate-tier and memory-timing fields.
    - Updated README, `docs/model.md`, `docs/json_schema.md`, and generated
      artifacts.
    - Focused tests for model/config/report/schema/comparison/transformer/
      visualizer behavior passed before full verification.

## Task 4: More Published Cards

- [x] DONE: Identify at least 3 to 4 high-quality source-backed photonic
      accelerator candidates.
  - Proof:
    - Researched recent published candidates using source pages and stable DOI
      records.
    - Selected four cards: Zhang 2026 POMMM, Chen 2026 FSR-GeMM, Ning 2025
      CirPTC, and Kovaios 2025 WDM 1 TOPS tensor core.

- [x] DONE: Add YAML cards with conservative citations, assumptions,
      source-quality metadata, and local surrogate labeling.
  - Proof:
    - Added:
      - `examples/zhang_2026_pommm_surrogate.yaml`;
      - `examples/chen_2026_fsr_gemm_surrogate.yaml`;
      - `examples/ning_2025_cirptc_surrogate.yaml`;
      - `examples/kovaios_2025_wdm_1tops_tensor_core_surrogate.yaml`.
    - Added source-quality grades, coverage metadata, paper DOI/venue fields,
      source metrics, and explicit surrogate-mapping notes.
    - Added `tests/test_examples.py` coverage for the new DOI and metric
      fields.

- [x] DONE: Regenerate Markdown/JSON reports, comparison output, and visualizer
      payloads for the new cards.
  - Proof:
    - Added the four card recipes to `MATMUL_ARTIFACT_RECIPES`.
    - Regenerated checked reports, comparison output, visualizer index/assets,
      and payloads.
    - `python -m photonic_bench.cli verify-artifacts` passed with
      `Artifacts are fresh: checked 210 generated files.`

## Task 5: CLI And Usability

- [x] DONE: Find high-friction CLI or validation paths from current tests/docs.
  - Proof:
    - Reviewed CLI command surface and system-profile documentation.
    - Identified that users could select profiles but had no quick command to
      inspect their concrete tier assumptions.

- [x] DONE: Implement targeted usability improvements with tests and docs.
  - Proof:
    - Added `python -m photonic_bench.cli system-profiles` for human-readable
      profile tables.
    - Added `python -m photonic_bench.cli system-profiles --json` for
      machine-readable profile inspection.
    - Added CLI tests for both output modes and README/model-doc coverage.

## Task 6: Documentation And Artifact Refresh

- [x] DONE: Update README, model docs, schema docs, visualizer docs, and/or
      usage examples for all user-facing changes.
  - Proof:
    - Updated README system-profile docs, published-card catalog, and
      memory-timing examples.
    - Updated `docs/model.md` formulas and profile descriptions.
    - Updated `docs/json_schema.md` for system fields and transformer summary
      fields.
    - Updated JSON schemas for intermediate tiers and memory timing fields.

- [x] DONE: Regenerate checked generated artifacts.
  - Proof:
    - Ran `regenerate_checked_artifacts()` after source/model/card changes.
    - Regenerated reports and visualizer files include 210 checked artifacts.

- [x] DONE: Run artifact freshness verification.
  - Proof:
    - `python -m photonic_bench.cli verify-artifacts` passed with
      `Artifacts are fresh: checked 210 generated files.`

## Task 7: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Re-read required state files and run the hostile critique focused
      on modeling credibility, visualizer usefulness, source-card quality,
      CLI usability, and PR readiness.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` at the start of the critique cycle.
    - Read the installed review skill and checklist from
      `C:\Users\burba\.agents\skills\review\`.
    - Reviewed the diff for SQL/data/LLM-boundary risks, stale modeling labels,
      source-card overclaiming, visualizer export correctness, and test gaps.

- [x] DONE: Fix important critique findings or record explicit non-fix
      rationale.
  - Proof:
    - Found and fixed stale "SRAM/off-chip" modeling-boundary labels after the
      intermediate-tier change.
    - Regenerated artifacts after the fix.
    - `rg` confirmed no remaining source/generated `SRAM/off-chip` wording.
    - Ruff and artifact freshness passed after the fix.

## Task 8: Final Verification And Closeout

- [x] DONE: Run final quality gates.
  - Proof:
    - Full gates passed after implementation and before final closeout:
      - `python -m ruff check`;
      - `python -m pytest -q` with `109 passed`;
      - `python -m photonic_bench.cli verify-artifacts`;
      - `node --check photonic_bench\visualizer_assets\app.js`;
      - JSON schema parsing with `python -m json.tool`;
      - `git diff --check` with no whitespace errors and only Windows
        line-ending warnings.
    - Final closeout rerun passed after this state update:
      - `python -m ruff check`;
      - `python -m pytest -q` with `109 passed`;
      - `python -m photonic_bench.cli verify-artifacts` with
        `Artifacts are fresh: checked 210 generated files.`;
      - `node --check photonic_bench\visualizer_assets\app.js`;
      - `python -m json.tool` on all three JSON schemas,
        `reports\visualizer\data\index.json`, and
        `reports\visualizer_presets.json`;
      - `git diff --check` with no whitespace errors and only Windows
        line-ending warnings.

- [x] DONE: Close `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md` with proof.
  - Proof:
    - Re-read all required state files before closeout.
    - Marked `GOAL.md` complete.
    - Marked this checklist complete with verification evidence.
    - Updated `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md`
      to reflect the final implementation, critique, verification, PR, and
      push status.

- [x] DONE: Inspect final git status and push final updates if needed.
  - Proof:
    - Created implementation commit `99dbe4f`
      (`Deepen system modeling and visualizer comparison`).
    - Pushed `99dbe4f` to
      `origin/codex/artifact-freshness-profiles`.
    - Final closeout state commit is recorded after this state update and
      pushed to the same PR branch.
    - PR #4 remains open at
      `https://github.com/lamb356/photonic-bench/pull/4` and its body was
      refreshed with the final summary and validation.
