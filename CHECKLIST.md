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

- [ ] TODO: Review the existing dirty branch and separate current state updates
      from implementation commits where practical.
- [ ] TODO: Run pre-commit local gates for the current branch state.
- [ ] TODO: Create clean logical commits on
      `codex/decision-grade-analysis-tool`.
- [ ] TODO: Push the branch and open a pull request to `master` with a clear
      description of the prior decision-grade implementation and this follow-up
      plan.

## Task 2: Remote CI And Screenshot Artifact Inspection

- [ ] TODO: Trigger and monitor remote CI on the PR.
- [ ] TODO: Confirm required checks pass or fix failures.
- [ ] TODO: Download or inspect generated screenshot artifacts, including
      visual regression screenshots, and record what was reviewed.
- [ ] TODO: Record PR URL, CI run ID, screenshot artifact names, and inspection
      results in `PROGRESS.md`.

## Task 3: Calibrated Scenario Provenance Packs

- [ ] TODO: Define a machine-readable provenance-pack structure for memory
      scenarios and contention presets.
- [ ] TODO: Add source-backed justification for every named memory hierarchy
      scenario.
- [ ] TODO: Add source-backed or explicitly local-assumption justification for
      every contention preset.
- [ ] TODO: Expose provenance packs in JSON reports, Markdown reports, docs,
      and the visualizer without implying measured hardware behavior.
- [ ] TODO: Add schema and test coverage, then regenerate affected artifacts.

## Task 4: Scenario Sensitivity Dashboard

- [ ] TODO: Add visualizer state for selecting one card as the sensitivity
      subject.
- [ ] TODO: Sweep that card across available memory scenarios and contention
      presets using existing artifact data or generated sensitivity payloads.
- [ ] TODO: Present throughput, latency, energy, bandwidth headroom, and
      bottleneck deltas with clear local-model labels.
- [ ] TODO: Add browser smoke and visual regression coverage for the dashboard.
- [ ] TODO: Update README/reviewer docs and regenerate visualizer artifacts.

## Task 5: Decision-Packet Import And Replay

- [ ] TODO: Accept drag/drop or file-picker import of
      `photonic-bench-decision-packet-v1` JSON in the visualizer.
- [ ] TODO: Validate packet schema and report useful errors for incompatible or
      stale packets.
- [ ] TODO: Restore selected artifacts, pinned baseline, focus mode, score
      profile/weights, filters, Pareto mode, reviewer notes, and checklist
      state.
- [ ] TODO: Add replay provenance to the UI so reviewers can distinguish live
      state from imported packet state.
- [ ] TODO: Add JavaScript unit/browser tests and documentation.

## Task 6: Card Source-Audit Depth

- [ ] TODO: Define structured source-audit fields for published cards:
      quoted metrics, exact source locations, local assumptions, conversion
      math, and confidence flags.
- [ ] TODO: Backfill source-audit metadata for existing published cards where
      source coverage is already present.
- [ ] TODO: Render source-audit summaries in Markdown, JSON, and visualizer
      detail views.
- [ ] TODO: Add schema validation and tests that prevent mixing quoted paper
      values with local surrogate estimates.

## Task 7: Expanded Memory-Stressing Card Coverage

- [ ] TODO: Select 2-4 additional source-backed cards that stress materially
      different memory behavior: activation-heavy, analog/weight-stationary,
      PCIe/host-attached, optical interconnect, or chiplet/off-package
      movement.
- [ ] TODO: Add YAML examples with citations, source-quality metadata,
      surrogate labels, and source-audit fields.
- [ ] TODO: Generate Markdown/JSON reports, comparison output, and visualizer
      payloads.
- [ ] TODO: Update docs to explain why the new cards improve memory-behavior
      coverage.

## Task 8: Formal Schema Versioning Policy

- [ ] TODO: Define compatibility rules for report schemas, comparison exports,
      decision packets, and future schema revisions.
- [ ] TODO: Add explicit versioning metadata/rules to relevant schema docs and
      JSON schemas.
- [ ] TODO: Add tests that validate schema IDs, version strings, and
      compatibility-policy documentation stay aligned.
- [ ] TODO: Update reviewer docs to identify when schema changes require extra
      review.

## Task 9: PR Template Reviewer Checklist

- [ ] TODO: Add or update the GitHub pull request template.
- [ ] TODO: Include checklist entries for artifact freshness, visual regression
      screenshots, decision-packet export/import, and schema compatibility.
- [ ] TODO: Verify the template renders as expected and document reviewer use
      in `docs/reviewer_workflow.md`.

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

- [ ] TODO: Run focused tests for touched surfaces.
- [ ] TODO: Run full local quality gates: Ruff, pytest, build, artifact
      freshness, JS syntax, browser smoke/accessibility/visual regression,
      workflow validation, and diff hygiene.
- [ ] TODO: Update final state files and write a durable GBrain closeout note.
- [ ] TODO: Inspect final git, PR, CI, artifact, and release-candidate status.
