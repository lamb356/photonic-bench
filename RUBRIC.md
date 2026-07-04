# PhotonicBench Merge And Preset Gallery Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## PR Merge Quality

- PR #5 is verified open, non-draft, mergeable, and targeted at `master`
  before merge.
- PR #5 GitHub Actions is green before merge.
- The merge lands on `master` without bypassing required checks.
- Local `master` is updated after the merge.
- `master` GitHub Actions is green after the merge.
- Optional branch deletion does not remove any unmerged work.

## Preset Gallery Quality

- The gallery exposes named score-weight profiles for Balanced, Efficiency,
  Throughput, Contention, and Provenance.
- Each profile explains its analytical intent in concise, workbench-style copy.
- Each profile shows enough weight detail for users to understand what will
  change before applying it.
- Applying a profile updates the same score-weight source used by
  recommendations, scorecards, score explanations, exports, and URL state.
- Applying a profile does not disturb selected artifacts, pinned reference,
  filters, grouping, or detail context.
- Users can distinguish built-in profiles, active profile state, default
  weights, and custom tuned weights.

## Daily Analytical Value

- The new UI helps a repeated user answer comparison questions faster.
- Controls are dense, predictable, keyboard reachable, and not hidden behind
  marketing-style explanations.
- Recommendation and comparison surfaces remain schema-aware.
- Mixed-schema comparisons remain visibly labeled.
- Same-schema score heuristics are not presented as benchmark truth.

## Modeling Boundary Quality

- Published-reference metrics remain visibly separate from local estimates.
- Local surrogate labels, source-quality grades, system-profile assumptions,
  interface-traffic estimates, transformer aggregate timing/noise semantics,
  and contention assumptions remain visible.
- No UI copy suggests that local heuristics, local system movement estimates,
  or scorecard rankings are measured hardware results.

## Export And Reproducibility Quality

- Export payloads include enough profile/weight state to reproduce the
  comparison context when gallery state affects scores.
- JSON schema documentation is updated if exported shape changes.
- Markdown and CSV exports remain human-readable and include relevant weight
  context.
- Shareable URL state continues to restore applied weights.

## Accessibility And Layout Quality

- Gallery cards or controls are keyboard reachable.
- Buttons and selectors have meaningful labels and focus states.
- Text fits within its parent elements on desktop and mobile.
- The dense workbench layout remains scannable without overlapping controls.
- Reduced-motion behavior and existing visual regression expectations are not
  regressed.

## Documentation And Artifact Quality

- README visualizer documentation explains the gallery and any adjacent
  workflow changes.
- JSON schema docs are updated if export fields change.
- Generated `reports/visualizer/` assets reflect source asset changes.
- Artifact freshness verification passes after regeneration.

## Verification Quality

- Focused visualizer tests cover changed static UI strings and source behavior.
- Browser smoke covers applying at least one built-in profile and confirms
  selected comparison context is preserved.
- Visual regression tests pass for desktop and mobile, or any intentional
  baseline changes are reviewed and regenerated.
- `node --check photonic_bench\visualizer_assets\app.js` passes.
- Relevant focused pytest tests pass.
- Full `python -m ruff check` and `python -m pytest -q` pass before final
  closeout.
- `python -m photonic_bench.cli verify-artifacts` passes.
- `git diff --check` passes before completion.

## Review Readiness

- All checklist DONE items include proof.
- State files are current.
- The mandatory Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Important critique findings are fixed before completion or explicitly
  justified.
- Remaining risks are named plainly.

## Final Closeout Status

- Complete.
- PR #5 merged into `master`; post-merge `master` CI passed.
- Score Profile Gallery implemented with Balanced, Efficiency, Throughput,
  Contention, and Provenance profiles.
- Gallery cards show profile intent, weight summaries, active/custom state,
  and current-set same-schema previews.
- Applying a profile updates the same scorer used by recommendations,
  scorecards, score explanations, exports, and URL state without disturbing
  selected artifacts or pinned reference.
- JSON/Markdown/CSV exports include score-profile context.
- Documentation, formal schema, tests, and checked generated visualizer assets
  are updated.
- Mandatory hostile review completed; the one non-blocking test-coverage
  finding was fixed.
- Local full gates passed: focused visualizer tests, browser smoke, visual
  regression, JavaScript syntax, artifact freshness, Ruff, full pytest,
  package build, and `git diff --check`.
- Remaining risk: named score profiles are local same-schema triage stances,
  not measured hardware rankings.
