# PhotonicBench Production-Ready Review Rubric

## Required Outcome

This goal succeeds only if all 10 required tasks receive implementation-backed
progress and proof:

1. The current `codex/decision-grade-analysis-tool` work is committed, pushed,
   and opened as a PR to `master`.
2. Remote CI is run on the PR and generated screenshot artifacts are inspected.
3. Scenario provenance packs exist for memory hierarchy scenarios and
   contention presets.
4. The visualizer has a scenario sensitivity dashboard for sweeping one card
   across memory scenarios.
5. The visualizer can import/replay a decision packet and restore review state.
6. Published cards have structured source-audit depth.
7. The benchmark includes 2-4 additional source-backed memory-stressing cards.
8. Report schemas have a formal compatibility/versioning policy.
9. The PR template guides reviewers through artifacts, visual regression,
   decision packets, and schema changes.
10. A small release candidate tag or versioned release note exists after merge.

## Quality Bar

- Changes are real implementation, not planning-only.
- JSON contracts remain strict, documented, and backward-compatible where
  feasible.
- Generated Markdown/JSON reports and `reports/visualizer/**` are regenerated
  whenever model, schema, example, or visualizer outputs change.
- Published paper values, quoted metrics, conversion math, and local model
  estimates stay visibly separate.
- Scenario and contention provenance is explicit, auditable, and labeled as
  local modeling unless directly source-backed.
- Decision-packet replay reports stale or incompatible artifacts rather than
  silently restoring partial state.
- Scenario sensitivity dashboards cannot be worded as measured hardware sweeps.
- New cards must add real comparison value by stressing materially different
  movement, bandwidth, activation, interconnect, host-attached, or hierarchy
  behavior.
- CI/reviewer docs and PR-template checklists must make generated artifact
  diffs and screenshot artifacts easy to review.
- Tests scale with blast radius and include browser coverage for user-facing
  workflow changes.

## Verification Expectations

Before any checklist item is marked DONE:

- Relevant implementation is complete.
- Relevant docs are updated.
- Relevant generated artifacts are regenerated.
- Focused tests for that surface pass.
- Proof is recorded in `CHECKLIST.md` or `PROGRESS.md`.

Before PR push/open:

- Fast local gates for the current branch pass.
- Known generated artifacts are fresh.
- The commit set is logical enough for review.

Before final closeout:

- `python -m ruff check`
- `python -m pytest -q`
- `python -m build`
- `python -m photonic_bench.cli verify-artifacts`
- `python -m photonic_bench.cli validate-examples --json`
- `node --check photonic_bench\visualizer_assets\app.js`
- `node --check reports\visualizer\assets\app.js`
- browser smoke/accessibility/visual-regression tests
- workflow syntax or equivalent static CI validation for changed workflows
- remote GitHub Actions checks on the PR
- screenshot artifact inspection from remote CI
- `git diff --check`
- clean or intentionally explained `git status`

## Hostile Senior Reviewer Focus

The critique pass must look for:

- UI controls that are hard to discover, hard to compare, or misleading.
- Decision-packet import/replay states that silently degrade or overclaim.
- Scenario sensitivity wording that implies measured hardware sweeps.
- Scenario provenance or card source-audit fields that blend paper values with
  local assumptions.
- Schema docs that leave compatibility or version bumps ambiguous.
- Generated artifact drift or stale visualizer payloads.
- Browser tests that miss the new replay/sensitivity workflows.
- Over-coupled JavaScript or Python surfaces that make new metrics fragile.
- CI screenshot artifacts that are hard for PR reviewers to find or interpret.
- Release notes/tags that are too vague to identify the production-ready state.

Important findings must be fixed before final DONE unless they are explicitly
recorded as residual risks with rationale.

## Current Rubric Status

- Required outcome: satisfied.
- Quality bar: satisfied.
- Verification expectations: satisfied.
- Hostile-review pass: complete.
