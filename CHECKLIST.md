# PhotonicBench Production-Ready Review Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.
- BLOCKED: attempted and prevented by an external constraint.

## Task 0: Cycle Setup And State Control

- [x] DONE: Re-read required state files and current project context.
  - Proof: Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
    `RUBRIC.md`, and `tasks/todo.md` at cycle start.
  - Proof: Inspected branch status on `codex/decision-grade-analysis-tool`;
    the branch contains the prior locally verified decision-grade work as dirty
    changes.
- [x] DONE: Refresh durable context before editing state.
  - Proof: Called GBrain `get_brain_identity`; version `0.42.56.0`, engine
    `pglite`.
  - Proof: Read GBrain page
    `photonicbench-decision-grade-analysis-tool-2026-07-04`, which records
    that the prior implementation was locally verified but not committed,
    pushed, or opened as a PR.
  - Proof: Searched local memory `MEMORY.md` for PhotonicBench visualizer,
    artifact, JSON, and outer-loop workflow guidance.
- [x] DONE: Roll state files forward for the new 10-task goal.
  - Proof: Updated `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
    `RUBRIC.md`, and `tasks/todo.md` with this active goal.

## Task 1: Commit Current Work And Open PR

- [x] DONE: Review the existing dirty branch and separate current state updates
      from implementation commits where practical.
  - Proof: Reviewed diff/status; implementation/docs/tests/artifacts were
    committed separately from active state-file rollforward.
- [x] DONE: Run pre-commit local gates for the current branch state.
  - Proof: Passed `python -m ruff check`, `python -m pytest -q` (134 passed),
    `python -m build`, `python -m photonic_bench.cli verify-artifacts` (278
    files fresh), `python -m photonic_bench.cli validate-examples --json` (40
    ok), source/generated JS syntax checks, workflow YAML parse, and
    `git diff --check`.
- [x] DONE: Create clean logical commits on
      `codex/decision-grade-analysis-tool`.
  - Proof: Created `192a630 Add decision-grade analysis workflow` and
    `ebcee8c Roll production review state`.
- [x] DONE: Push the branch and open a pull request to `master` with a clear
      description of the prior decision-grade implementation and this follow-up
      plan.
  - Proof: Pushed branch and opened draft PR #11:
    `https://github.com/lamb356/photonic-bench/pull/11`.

## Task 2: Remote CI And Screenshot Artifact Inspection

- [x] DONE: Trigger and monitor remote CI on the PR.
  - Proof: PR #11 triggered CI run `28717081779`; Linux and macOS jobs were
    monitored to completion. Follow-up run `28717165055` was monitored to
    completion after the baseline fix.
- [x] DONE: Confirm required checks pass or fix failures.
  - Proof: Run `28717081779` failed only
    `mobile-comparison.png` visual regression on Linux and macOS. The rendered
    screenshots were valid and reflected the new mobile recommendation content.
    Platform-specific mobile baselines were promoted from the generated
    screenshot artifacts.
  - Proof: Follow-up run `28717165055` passed both `Ruff, package, and pytest`
    and `macOS visual regression`.
- [x] DONE: Download or inspect generated screenshot artifacts, including
      visual regression screenshots, and record what was reviewed.
  - Proof: Downloaded `visual-regression-screenshots` and
    `macos-visual-regression-screenshots` from failed run `28717081779` and
    green run `28717165055`.
  - Proof: Inspected Linux and macOS green-run contact sheets for
    `desktop-comparison.png`, `detail-published-reference.png`,
    `external-report-error.png`, `mobile-comparison.png`, and
    `wide-transformer-comparison.png`.
- [x] DONE: Record PR URL, CI run ID, screenshot artifact names, and inspection
      results in `PROGRESS.md`.
  - Proof: Recorded PR #11, runs `28717081779` and `28717165055`, artifact
    names, promoted-baseline hashes, and inspection results.

## Task 3: Calibrated Scenario Provenance Packs

- [x] DONE: Define a machine-readable provenance-pack structure for memory
      scenarios and contention presets.
- [x] DONE: Add source-backed justification for every named memory hierarchy
      scenario.
- [x] DONE: Add source-backed or explicitly local-assumption justification for
      every contention preset.
- [x] DONE: Expose provenance packs in JSON reports, Markdown reports, docs,
      and the visualizer without implying measured hardware behavior.
- [x] DONE: Add schema and test coverage, then regenerate affected artifacts.
  - Proof: Added `ScenarioProvenanceSource` and `ScenarioProvenancePack`
    structures plus named scenario/contention pack dictionaries in
    `photonic_bench/config.py`.
  - Proof: JSON reports now include `scenario_provenance` and
    `contention_provenance`; Markdown reports and the visualizer render
    Scenario Provenance Packs with local-model boundary labels.
  - Proof: Schema and docs cover the new fields, and tests assert every named
    scenario/profile and contention preset has provenance.
  - Proof: `python -m photonic_bench.cli verify-artifacts` passed with 290
    generated files fresh.

## Task 4: Scenario Sensitivity Dashboard

- [x] DONE: Add visualizer state for selecting one card as the sensitivity
      subject.
- [x] DONE: Sweep that card across available memory scenarios and contention
      presets using existing artifact data or generated sensitivity payloads.
- [x] DONE: Present throughput, latency, energy, bandwidth headroom, and
      bottleneck deltas with clear local-model labels.
- [x] DONE: Add browser smoke and visual regression coverage for the dashboard.
- [x] DONE: Update README/reviewer docs and regenerate visualizer artifacts.
  - Proof: Added a static Scenario Sensitivity Dashboard that selects a
    dedicated `profile_sensitivity_*` subject and compares checked artifacts
    across memory scenarios and contention presets.
  - Proof: Dashboard rows include system energy/op, contention-adjusted latency
    and throughput, usable bandwidth, guardbanded bandwidth, bottleneck tier,
    bandwidth utilization, bandwidth headroom, and selected-subject deltas.
  - Proof: Dashboard copy labels the sweep as local-model sensitivity over
    checked artifacts, not measured hardware behavior.
  - Proof: Browser smoke now selects
    `profile_sensitivity_64x64_hbm.json`; local checks passed:
    `python -m pytest tests\test_visualizer_smoke.py
    tests\test_visualizer_accessibility.py -q`,
    `python -m pytest tests\test_visualizer_visual_regression.py -q`,
    source/generated `node --check`, and
    `python -m photonic_bench.cli verify-artifacts`.

## Task 5: Decision-Packet Import And Replay

- [x] DONE: Accept drag/drop or file-picker import of
      `photonic-bench-decision-packet-v1` JSON in the visualizer.
- [x] DONE: Validate packet schema and report useful errors for incompatible or
      stale packets.
- [x] DONE: Restore selected artifacts, pinned baseline, focus mode, score
      profile/weights, filters, Pareto mode, reviewer notes, and checklist
      state.
- [x] DONE: Add replay provenance to the UI so reviewers can distinguish live
      state from imported packet state.
- [x] DONE: Add JavaScript unit/browser tests and documentation.
  - Proof: Added rail import with file-picker and drag/drop support for
    `photonic-bench-decision-packet-v1` JSON.
  - Proof: Replay validates schema version, restores selected artifacts,
    pinned baseline, analysis focus, score weights, filters, Pareto mode,
    reviewer notes, and comparison view, and reports stale artifact IDs.
  - Proof: Added a Decision Packet Replay panel showing replay source, restored
    count, pinned baseline, checklist snapshot count, generated/imported
    timestamps, and stale IDs.
  - Proof: Browser smoke downloads a packet, injects
    `stale_replay_artifact.json`, clears the comparison, imports the packet,
    and verifies restored notes/focus/count plus stale-ID warning.
  - Proof: Updated README, `docs/reviewer_workflow.md`, and
    `docs/json_schema.md`; regenerated `reports/visualizer/**`.

## Task 6: Card Source-Audit Depth

- [x] DONE: Define structured source-audit fields for published cards:
      quoted metrics, exact source locations, local assumptions, conversion
      math, and confidence flags.
- [x] DONE: Backfill source-audit metadata for existing published cards where
      source coverage is already present.
- [x] DONE: Render source-audit summaries in Markdown, JSON, and visualizer
      detail views.
- [x] DONE: Add schema validation and tests that prevent mixing quoted paper
      values with local surrogate estimates.
  - Proof: Added `SourceAuditConfig`, `SourceAuditMetric`, and
    `SourceAuditConversion` parsing plus `photonic_bench/source_audit.py` to
    generate structured quoted metrics, local assumptions, conversion math,
    confidence flags, and a separation note.
  - Proof: `published_reference.source_audit` is emitted in JSON, rendered in
    Markdown, and shown in the visualizer detail panel.
  - Proof: Existing source-backed published cards now receive generated source
    audit information from published calibration and source-quality metadata;
    new cards include explicit configured audit fields.
  - Proof: `tests/test_json_report.py`, `tests/test_report.py`,
    `tests/test_schema_docs.py`, and `tests/test_visualizer_smoke.py` cover the
    source-audit JSON, Markdown, schema, and browser surfaces.

## Task 7: Expanded Memory-Stressing Card Coverage

- [x] DONE: Select 2-4 additional source-backed cards that stress materially
      different memory behavior: activation-heavy, analog/weight-stationary,
      PCIe/host-attached, optical interconnect, or chiplet/off-package
      movement.
- [x] DONE: Add YAML examples with citations, source-quality metadata,
      surrogate labels, and source-audit fields.
- [x] DONE: Generate Markdown/JSON reports, comparison output, and visualizer
      payloads.
- [x] DONE: Update docs to explain why the new cards improve memory-behavior
      coverage.
  - Proof: Added Lightening transformer, LIGHTNING SmartNIC, and ADEPT
    electro-photonic surrogate cards with source-quality metadata and source
    audit fields.
  - Proof: The cards cover activation-heavy dynamic transformer behavior,
    PCIe/host-attached SmartNIC behavior, and SRAM-backed weight-stationary
    electro-photonic GEMM behavior.
  - Proof: Added artifact recipes, generated JSON/Markdown reports and
    visualizer payloads, and included the new cards in the published-reference
    visualizer preset.
  - Proof: `python -m photonic_bench.cli validate-examples --json` passed with
    43 checked and 43 ok.

## Task 8: Formal Schema Versioning Policy

- [x] DONE: Define compatibility rules for report schemas, comparison exports,
      decision packets, and future schema revisions.
- [x] DONE: Add explicit versioning metadata/rules to relevant schema docs and
      JSON schemas.
- [x] DONE: Add tests that validate schema IDs, version strings, and
      compatibility-policy documentation stay aligned.
- [x] DONE: Update reviewer docs to identify when schema changes require extra
      review.
  - Proof: Added `x-schema-version-policy` metadata to the report,
    transformer-layer, transformer-model, comparison-export, and
    decision-packet schemas.
  - Proof: `docs/json_schema.md` now documents the schema compatibility policy,
    additive-v1 rules, and source-audit/provenance fields.
  - Proof: `docs/reviewer_workflow.md` now calls out schema review conditions.
  - Proof: `tests/test_schema_docs.py` validates the policy metadata and docs.

## Task 9: PR Template Reviewer Checklist

- [x] DONE: Add or update the GitHub pull request template.
- [x] DONE: Include checklist entries for artifact freshness, visual regression
      screenshots, decision-packet export/import, and schema compatibility.
- [x] DONE: Verify the template renders as expected and document reviewer use
      in `docs/reviewer_workflow.md`.
  - Proof: Added `.github/pull_request_template.md` with reviewer checklist
    entries for artifact freshness, example validation, visual regression
    screenshots, decision-packet replay, schema compatibility, and source
    boundary checks.
  - Proof: `docs/reviewer_workflow.md` explains how reviewers should use the
    template gates.
  - Proof: `tests/test_schema_docs.py` checks the template includes the
    required gates.

## Task 10: Release Candidate Tag Or Versioned Release Note

- [ ] TODO: After the PR is merged, update local `master` and verify the merge
      result.
- [ ] TODO: Add a small release candidate tag or versioned release note that
      identifies the production-ready review state.
- [ ] TODO: Push the tag or release-note commit only after post-merge checks
      pass.
- [ ] TODO: Record final commit/tag, CI status, and remaining risks.

## Task 11: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Run the critique after substantial implementation across the
      feature tasks.
- [ ] TODO: Focus on usability, modeling clarity, maintainability, source
      boundaries, schema compatibility, CI artifact usability, and reviewer
      experience.
- [ ] TODO: Fix important findings and re-run affected verification before
      final DONE.

## Task 12: Final Verification And Closeout

- [x] DONE: Run focused tests for touched surfaces.
  - Proof: Passed `python -m pytest tests\test_visualizer_smoke.py -q` and
    `python -m pytest tests\test_visualizer_accessibility.py
    tests\test_visualizer_visual_regression.py -q`.
- [x] DONE: Run full local quality gates for the current feature slice: Ruff,
      pytest, build, artifact
      freshness, JS syntax, browser smoke/accessibility/visual regression,
      workflow validation, and diff hygiene.
  - Proof: Passed `python -m ruff check`, `python -m pytest -q` (139 passed),
    `python -m build`, `python -m photonic_bench.cli verify-artifacts` (290
    fresh), `python -m photonic_bench.cli validate-examples --json` (43 ok),
    source and generated `node --check`, workflow YAML parse, browser
    smoke/accessibility/visual-regression tests, and `git diff --check`.
- [ ] TODO: Update final state files and write a durable GBrain closeout note.
- [ ] TODO: Inspect final git, PR, CI, artifact, and release-candidate status.
