# PhotonicBench Production-Ready Review Progress

## 2026-07-04 Cycle 0: State Rollforward And Context Re-Read

### Required State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Re-read `tasks/todo.md`.

### GBrain And Memory

- Called GBrain `get_brain_identity`:
  - version `0.42.56.0`;
  - engine `pglite`;
  - page count `41`;
  - chunk count `41`.
- Queried/searched GBrain for PhotonicBench decision-grade, PR, visualizer,
  memory-scenario, schema, and release context.
- Read GBrain page:
  - `photonicbench-decision-grade-analysis-tool-2026-07-04`.
- Read GBrain page:
  - `photonicbench-pr9-bandwidth-headroom-followup-2026-07-04`.
- Searched local memory `MEMORY.md` for PhotonicBench visualizer, JSON,
  generated artifact, and outer-loop workflow guidance.

### Repository State

- Current branch:
  - `codex/decision-grade-analysis-tool`.
- Current worktree:
  - dirty with the previous locally verified decision-grade implementation;
  - includes updated source, docs, schemas, tests, generated reports, visualizer
    payloads, and visual baselines;
  - includes untracked decision-packet schema, reviewer workflow doc, new YAML
    examples, and generated reports/payloads.

### State Rollforward

- Replaced the completed four-workstream goal state with this new active
  production-readiness goal.
- Created a proof-oriented checklist covering all 10 user-required tasks plus
  mandatory hostile review and final verification.
- Updated `tasks/todo.md` to preserve the previous decision-grade goal as
  completed and make this goal active.

### Next Execution Order

1. Review dirty branch content and run fast local gates.
2. Commit current decision-grade implementation in clean logical commits.
3. Push `codex/decision-grade-analysis-tool` and open PR to `master`.
4. Implement decision-packet replay and scenario sensitivity dashboard.
5. Add provenance packs, source audits, extra memory-stressing cards, schema
   policy, PR template, docs, generated artifacts, tests, remote CI artifact
   inspection, hostile review, merge, and release candidate note/tag.

## 2026-07-04 Cycle 1: Commit, Push, And PR Opened

### Local Publish Gates

- `python -m ruff check`: passed.
- `python -m pytest -q`: passed, 134 tests.
- `python -m build`: passed.
- `python -m photonic_bench.cli verify-artifacts`: passed, 278 generated files
  fresh.
- `python -m photonic_bench.cli validate-examples --json`: passed, 40 checked
  and 40 ok.
- `node --check photonic_bench\visualizer_assets\app.js`: passed.
- `node --check reports\visualizer\assets\app.js`: passed.
- `.github/workflows/ci.yml` parsed with PyYAML.
- `git diff --check`: passed with only line-ending normalization warnings.

### Commits

- `192a630 Add decision-grade analysis workflow`
  - Contains implementation, docs, tests, schemas, generated reports,
    visualizer payloads, visual baselines, and new source-backed cards from the
    previous locally verified decision-grade pass.
- `ebcee8c Roll production review state`
  - Contains active state-file rollforward for this production-ready follow-up
    loop.

### Pull Request

- Pushed `codex/decision-grade-analysis-tool` to `origin`.
- Opened draft PR #11:
  `https://github.com/lamb356/photonic-bench/pull/11`.
- PR is intentionally draft while the remaining production-readiness tasks are
  implemented on the same branch.

## 2026-07-04 Cycle 2: First Remote CI And Screenshot Artifact Inspection

### Remote CI Run `28717081779`

- PR #11 triggered CI run `28717081779`.
- `Ruff, package, and pytest` failed only in
  `tests/test_visualizer_visual_regression.py` for
  `mobile-comparison.png`.
- `macOS visual regression` failed only in
  `tests/test_visualizer_visual_regression.py` for
  `mobile-comparison.png`.
- All other screenshot cases in both jobs passed.

### Screenshot Artifacts Downloaded And Inspected

- Downloaded artifact `visual-regression-screenshots` to:
  `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28717081779\linux`.
- Downloaded artifact `macos-visual-regression-screenshots` to:
  `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28717081779\macos`.
- Inspected the failing Linux and macOS `mobile-comparison.png` screenshots.
  They showed the intended new mobile recommendation explanation and scorecard
  content with no horizontal overflow.

### Fix

- Promoted only the platform-specific failing mobile baselines:
  - `tests/visual_baselines/github-linux/mobile-comparison.png`
  - `tests/visual_baselines/macos/mobile-comparison.png`
- Hash proof:
  - Linux CI artifact and checked baseline:
    `37be07f875424b97f3b84436f77219563e31ea616657c1e358e800744b5a1bd4`.
  - macOS CI artifact and checked baseline:
    `1ff6b88ccbc908c02007a33d52bc7fa5a46678dcd2961109f556b0c2aa62ead6`.
- Local default visual-regression verification after promotion:
  - `python -m pytest tests\test_visualizer_visual_regression.py -q`: passed,
    5 tests.

### Pending

- Completed by commit `c2ad0d7 Promote remote mobile visual baselines`.

## 2026-07-04 Cycle 3: Green Remote CI And Screenshot Artifact Inspection

### Remote CI Run `28717165055`

- PR #11 follow-up CI run:
  `https://github.com/lamb356/photonic-bench/actions/runs/28717165055`.
- Head commit: `c2ad0d7d5cee8fa6730951c88bc98cdf11fe36d4`.
- `Ruff, package, and pytest`: passed.
- `macOS visual regression`: passed.
- PR #11 remained open, draft, and mergeable after the run:
  `https://github.com/lamb356/photonic-bench/pull/11`.

### Green-Run Screenshot Artifact Inspection

- Downloaded `visual-regression-screenshots` from run `28717165055`:
  - `desktop-comparison.png`
  - `detail-published-reference.png`
  - `external-report-error.png`
  - `mobile-comparison.png`
  - `wide-transformer-comparison.png`
- Downloaded `macos-visual-regression-screenshots` from run `28717165055`:
  - macOS actual screenshots for the same five cases;
  - checked macOS baseline images included by the artifact path.
- Built temporary contact sheets for Linux and macOS artifacts and inspected the
  rendered views.
- Inspection result:
  - desktop comparison, detail view, external-report error state, mobile
    comparison, and wide transformer comparison all rendered coherently;
  - mobile comparison showed the expanded recommendation explanation and
    scorecard without horizontal overflow;
  - no screenshot artifact suggested a missing asset, blank panel, or broken
    local-file visualizer path.

### Task 2 Status

- Remote CI and screenshot artifact inspection are complete for the current PR
  head before the next feature work begins.

## 2026-07-04 Cycle 4: Decision Replay And Scenario Sensitivity

### Scenario Sensitivity Dashboard

- Added a static Scenario Sensitivity Dashboard to the visualizer.
- The dashboard selects a dedicated `profile_sensitivity_*` subject and compares
  checked same-workload artifacts across memory scenarios and contention
  presets.
- Rows include:
  - system energy/op;
  - contention-adjusted latency;
  - contention-adjusted throughput;
  - effective usable bandwidth under load;
  - guardbanded usable bandwidth;
  - bottleneck tier;
  - bandwidth utilization;
  - bandwidth headroom;
  - energy/latency deltas and throughput ratio against the selected subject.
- Dashboard wording explicitly labels the table as a local-model sweep over
  generated artifacts, not a measured hardware sweep.
- During implementation, an accidental same-shape pair from unrelated published
  cards was found and excluded by narrowing the dashboard to the dedicated
  `profile_sensitivity_*` family.

### Decision-Packet Import And Replay

- Added rail support for importing `photonic-bench-decision-packet-v1` JSON via
  file picker or drag/drop.
- Replay validates schema version and restores selected artifact IDs, pinned
  baseline, analysis focus, score weights, filters, Pareto mode, reviewer
  notes, and comparison mode against the live generated index.
- Stale artifact IDs are reported in the rail message and in the Decision
  Packet Replay panel rather than silently ignored.
- The replay panel records source file, schema version, restored artifact
  count, pinned baseline, checklist snapshot count, packet generation time,
  replay time, and missing artifact IDs.

### Documentation And Generated Artifacts

- Updated README visualizer documentation for scenario sensitivity and decision
  packet replay.
- Updated `docs/reviewer_workflow.md` with reviewer replay checks and
  sensitivity-dashboard checks.
- Updated `docs/json_schema.md` to document packet replay semantics.
- Regenerated checked visualizer outputs under `reports/visualizer/**`.

### Focused Verification

- `node --check photonic_bench\visualizer_assets\app.js`: passed.
- `node --check reports\visualizer\assets\app.js`: passed.
- `python -m photonic_bench.cli verify-artifacts`: passed, 278 generated files
  fresh.
- `python -m pytest tests\test_visualizer_smoke.py -q`: passed.
- `python -m pytest tests\test_visualizer_smoke.py tests\test_visualizer_accessibility.py -q`:
  passed.
- `python -m pytest tests\test_visualizer_visual_regression.py -q`: passed.

### Task Status

- Task 4 is DONE with focused browser and visual-regression proof.
- Task 5 is DONE with focused browser proof for restored state and stale-ID
  handling.

## 2026-07-04 Cycle 5: Provenance, Source Audits, Cards, Schemas, PR Template

### Scenario Provenance Packs

- Added machine-readable scenario provenance pack structures for memory
  hierarchy scenarios and contention presets.
- Added named provenance packs for every built-in memory scenario/profile and
  contention preset.
- Each pack separates source-backed anchors from local PhotonicBench modeling
  assumptions.
- JSON reports now expose `memoryScenario.scenario_provenance` and
  `memoryScenario.contention_provenance`.
- Markdown reports and the visualizer render Scenario Provenance Packs with
  local-model boundary wording.

### Card Source Audits

- Added structured source-audit config parsing for:
  - quoted metrics;
  - source URLs/DOIs/sections;
  - local assumptions;
  - conversion math;
  - confidence flags.
- Added `photonic_bench/source_audit.py` to derive generated audit entries from
  published calibration and source-quality metadata without mixing paper values
  and local surrogate estimates.
- JSON reports now include `published_reference.source_audit`.
- Markdown and the visualizer render Source Audit sections for published-card
  detail review.

### Expanded Memory-Stressing Cards

- Added `lightening_transformer_2024_surrogate`:
  - activation-heavy dynamic transformer/broadcast behavior;
  - profile: `optical_interconnect`.
- Added `lightning_2023_smartnic_surrogate`:
  - host/network-attached SmartNIC behavior;
  - profile: `pcie_attached`.
- Added `adept_2023_electro_photonic_surrogate`:
  - SRAM-backed weight-stationary electro-photonic GEMM behavior;
  - profile: `on_chip_sram`.
- Added artifact recipes, generated JSON/Markdown reports, generated
  visualizer payloads, and included the new cards in the published-reference
  visualizer preset.

### Schema Policy And Reviewer Checklist

- Added `x-schema-version-policy` to the report, transformer-layer,
  transformer-model, comparison-export, and decision-packet schemas.
- Documented the v1 compatibility policy in `docs/json_schema.md`.
- Added source-audit and scenario-provenance schema definitions while keeping
  new fields optional for additive v1 compatibility.
- Added `.github/pull_request_template.md` with checklist gates for:
  - artifact freshness;
  - example validation;
  - visual regression screenshots;
  - decision-packet export/import replay;
  - schema compatibility;
  - source-boundary review.
- Updated reviewer docs for schema review and PR-template use.

### Verification

- `python -m pytest tests\test_visualizer_smoke.py -q`: passed.
- `python -m pytest tests\test_visualizer_accessibility.py tests\test_visualizer_visual_regression.py -q`:
  passed.
- `python -m ruff check`: passed.
- `python -m pytest -q`: passed, 139 tests.
- `python -m build`: passed.
- `python -m photonic_bench.cli verify-artifacts`: passed, 290 generated files
  fresh.
- `python -m photonic_bench.cli validate-examples --json`: passed, 43 checked
  and 43 ok.
- `node --check photonic_bench\visualizer_assets\app.js`: passed.
- `node --check reports\visualizer\assets\app.js`: passed.
- `.github/workflows/*.yml` parsed with PyYAML.
- `git diff --check`: passed with only line-ending normalization warnings.

### Task Status

- Task 3 is DONE with JSON, Markdown, visualizer, schema, docs, tests, and
  regenerated-artifact proof.
- Task 6 is DONE with structured source-audit fields rendered across JSON,
  Markdown, and visualizer surfaces.
- Task 7 is DONE with three additional source-backed memory-stressing cards and
  generated artifacts.
- Task 8 is DONE with schema policy metadata, docs, and tests.
- Task 9 is DONE with a PR template and reviewer workflow documentation.

### Pending

- Commit and push this feature slice to PR #11.
- Re-run remote CI and inspect fresh screenshot artifacts for the new PR head.
- Run the mandatory Hostile Senior Reviewer critique and fix important issues.
- Merge PR #11 when ready, then add the release-candidate tag or versioned
  release note.

## 2026-07-04 Cycle 6: Current-Head Remote CI And Screenshot Inspection

### Commits Pushed

- `b94f33d Add provenance packs and source audits`
  - Implements scenario provenance packs, source audit depth, three additional
    memory-stressing cards, schema policy metadata, PR template gates, docs,
    tests, and regenerated artifacts.
- `b372eec Record production review progress`
  - Records task 3, 6, 7, 8, and 9 proof in state files.
- Pushed `codex/decision-grade-analysis-tool` to PR #11.

### Remote CI Run `28718212388`

- Run URL:
  `https://github.com/lamb356/photonic-bench/actions/runs/28718212388`.
- Head commit:
  `b372eec22b04aed0e3f8f4a03d59343ba58ad3c3`.
- `Ruff, package, and pytest`: passed.
- `macOS visual regression`: passed.

### Screenshot Artifacts Downloaded And Inspected

- Downloaded `visual-regression-screenshots` to:
  `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28718212388\linux`.
- Downloaded `macos-visual-regression-screenshots` to:
  `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28718212388\macos`.
- Generated and inspected local contact sheets:
  - `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28718212388\linux-contact-sheet.png`;
  - `C:\Users\burba\AppData\Local\Temp\photonicbench-pr11-artifacts-28718212388\macos-contact-sheet.png`.
- Reviewed screenshot states:
  - `desktop-comparison.png`;
  - `detail-published-reference.png`;
  - `external-report-error.png`;
  - `mobile-comparison.png`;
  - `wide-transformer-comparison.png`.
- Inspection result:
  - Linux and macOS screenshots render coherent comparison/detail/error/mobile/
    wide-transformer states;
  - no screenshot artifact showed a blank panel, missing asset, broken local
    file path, or mobile overflow.

### Pending

- Update PR #11 body so it reflects the now-completed production-readiness
  feature slice and current local/remote validation.
- Run the mandatory Hostile Senior Reviewer critique and fix important issues.
- Merge PR #11 when ready, then add the release-candidate tag or versioned
  release note.

## 2026-07-04 Cycle 7: Hostile Senior Reviewer Critique

### Review Method

- Attempted to use the local `review` skill as the pre-landing review workflow.
- The skill could not run as written because this repo does not contain
  `.Codex/skills/review/checklist.md`.
- Continued with the project-specific Hostile Senior Reviewer rubric in
  `RUBRIC.md`.
- Reviewed the branch diff against `origin/master` with focus on:
  - usability and reviewer experience;
  - modeling-boundary clarity;
  - source-audit and scenario-provenance separation;
  - decision-packet replay failure modes;
  - schema compatibility policy;
  - generated artifact freshness and browser coverage;
  - CI screenshot artifact usability.

### Additional Audit

- Ran a generated report audit across `reports/*.json`.
- Result:
  - no `published_reference` report is missing `source_audit`;
  - no generated `memory_scenario` object is missing `scenario_provenance` or
    `contention_provenance`.

### Finding Fixed

- Finding: PR #11 body was stale after the production-readiness feature slice.
  It still described scenario provenance, source audit, schema policy, replay,
  and related work as future work and listed old validation counts.
- Fix: Updated PR #11 body with the completed feature list, current local
  validation, remote CI run `28718212388`, screenshot artifact inspection, and
  reviewer boundary notes.

### Review Result

- No code-level critical findings remained after the data audit and PR-body
  update.
- Mandatory Hostile Senior Reviewer critique is complete for the current PR
  head.

### Pending

- Push state-file updates after this critique.
- Mark PR #11 ready when the final state commit is pushed and CI remains green.
- Merge PR #11, then add the release-candidate tag or versioned release note.
