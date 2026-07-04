# PhotonicBench TODO

## Done Before This Goal

- [x] Build the first tested CLI slice for a photonic matmul benchmark card.
- [x] Calibrate the 64x64 example against a published photonic accelerator paper.
- [x] Add source citations and assumption notes to benchmark card reports.
- [x] Implement JSON export beside Markdown reports.
- [x] Add calibration fitting mode.
- [x] Improve component model realism: operand reuse, weight-stationary behavior,
      pipelining, and separate vector/weight DAC handling.
- [x] Add a second published photonic accelerator benchmark card.
- [x] Add comparison tables across cards.
- [x] Create clear JSON schema documentation and usage examples.
- [x] Add transformer-layer shape helpers with YAML integration.
- [x] Generate decomposed transformer per-matmul Markdown and JSON artifacts.
- [x] Generate aggregate transformer-layer Markdown comparison artifacts.
- [x] Test transformer helper MAC/op formulas and CLI generation.
- [x] Document transformer helper usage, formulas, assumptions, and artifact
      layout.
- [x] Add aggregate transformer-layer JSON output.
- [x] Test aggregate JSON structure, totals, CLI behavior, and docs.
- [x] Document aggregate JSON usage and regenerate example artifacts.
- [x] Run full aggregate JSON verification and hostile senior reviewer critique.
- [x] Complete transformer-layer hardening:
      path-aware errors, strict aggregate validation, schema tightening,
      regenerated examples, docs, tests, and critique fixes.
- [x] Create gated web visualizer planning artifact.
- [x] Create gated MLCommons-style photonic benchmark proposal planning artifact.

## Completed Goal: Hardened Baseline Commit And Initial Web Visualizer

- [x] Task 1: Commit the current hardened PhotonicBench baseline.
- [x] Task 2: Add artifact discovery and indexing over report directories.
- [x] Task 3: Add schema-aware loading for per-matmul and aggregate JSON.
- [x] Task 4: Build the initial static visualizer UI.
- [x] Task 5: Build a basic transformer-layer aggregate detail view.
- [x] Task 6: Document visualizer usage and run verification.
- [x] Task 7: Run mandatory hostile senior reviewer critique and fix important
      findings.

## Completed Goal: Web Visualizer Evolution

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Refactor visualizer source structure into Python, template, CSS,
      and JavaScript assets.
- [x] Task 2: Separate lightweight artifact index data from full artifact
      payload data.
- [x] Task 3: Improve navigation, filtering, labeling, and artifact
      presentation.
- [x] Task 4: Add schema-aware side-by-side comparison mode.
- [x] Task 5: Preserve and harden per-matmul and transformer-layer detail views
      through the new data path.
- [x] Task 6: Update documentation, regenerate visualizer artifacts, and run
      focused plus full verification.
- [x] Task 7: Run hostile senior reviewer critique focused on maintainability,
      performance, and UX, then fix major findings.

## Completed Goal: Visualizer Comparison, Smoke, And Scaling

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Commit the current visualizer evolution work.
- [x] Task 2: Upgrade comparison mode with pinned selections, deltas, ratios,
      and grouped or mixed-schema analysis.
- [x] Task 3: Add Playwright as a dev dependency and check in a browser smoke
      test.
- [x] Task 4: Implement local `visualize --serve` scaling mode.
- [x] Task 5: Update documentation, regenerate examples, and run full
      verification.
- [x] Task 6: Run hostile senior reviewer critique and fix significant
      findings.
- [x] Task 7: Close final state files and inspect git status.

## Completed Goal: Commit, Push, Visualizer Polish, And MLCommons Proposal

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Verify and commit the current project state.
- [x] Task 2: Push the verified current-state commit.
- [x] Task 3: Further improve and polish visualizer comparison mode.
- [x] Task 4: Produce substantive MLCommons-style photonic benchmark proposal
      artifacts.
- [x] Task 5: Update documentation, regenerate examples, and run full
      verification.
- [x] Task 6: Run hostile senior reviewer critique and fix significant
      findings.
- [x] Task 7: Commit and push the final visualizer polish and proposal work.
      Created private repo `lamb356/photonic-bench`, configured `origin`, and
      pushed `master`.

## Completed Goal: GitHub Actions CI And Repository Hygiene

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Add a GitHub Actions workflow for pushes to `master` and pull
      requests.
- [x] Task 2: Verify local `ruff check` and `pytest` command path.
- [x] Task 3: Decide and verify repository visibility.
- [x] Task 4: Add and verify GitHub repository description and topics.
- [x] Task 5: Commit, push, and verify the GitHub Actions run passes.
- [x] Task 6: Run hostile senior reviewer critique and fix significant issues.
- [x] Task 7: Close final state files and inspect clean synced git status.

## Completed Goal: Branch Protection, Dependabot, CI Badge, And Packaging Check

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Add a packaging build check to CI and verify locally.
- [x] Task 2: Add and verify a README CI status badge.
- [x] Task 3: Add and verify Dependabot configuration for GitHub Actions and
      Python dependencies.
- [x] Task 4: Commit, push, and verify the updated GitHub Actions run passes.
- [x] Task 5: Enable and verify `master` branch protection requiring CI.
      Completed after user explicitly authorized making the repository public.
      Branch protection now requires `Ruff, package, and pytest`.
- [x] Task 6: Run hostile senior reviewer critique and fix significant issues.
- [x] Task 7: Close final state files and inspect clean synced git status.
      Final closeout state update is state-only; post-push CI is verified after
      this commit and reported in the final response.

## Completed Goal: Daily-Use Visualizer, Cards, And Modeling Improvements

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Map the current visualizer architecture, tests, comparison logic,
      model logic, transformer helpers, docs, and generated artifact flow.
- [x] Task 2: Improve visualizer comparison analytics for energy, throughput,
      latency, calibration, provenance, and modeling-boundary interpretation.
- [x] Task 3: Add saved comparison presets that survive CLI regeneration and
      degrade clearly when artifacts are stale.
- [x] Task 4: Make comparison results exportable in machine-readable and
      human-readable forms.
- [x] Task 5: Add at least 2-3 new high-quality, source-backed published
      photonic accelerator cards with YAML, Markdown, JSON, citations, and
      explicit local-model-vs-published boundaries.
- [x] Task 6: Improve core modeling realism or transformer workflow convenience
      with auditable formulas, tests, docs, and generated artifacts.
- [x] Task 7: Update documentation and regenerate comparison/visualizer example
      artifacts.
- [x] Task 8: Run focused tests, full Ruff, full pytest, visualizer generation,
      and browser smoke verification.
- [x] Task 9: Run the mandatory Hostile Senior Reviewer critique focused on
      usability and modeling clarity, then fix important findings.
- [x] Task 10: Close final state files and inspect final repository status.

## Completed Goal: Multi-Tier System Model, Pareto Visualizer, Transformers, Cards

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Map config, model, report, schema, transformer, comparison, and
      visualizer surfaces for multi-tier system modeling.
- [x] Task 2: Implement explicit SRAM and off-chip/DRAM tiers with bandwidth,
      movement energy, timing, defaults, validation, reports, and tests.
- [x] Task 3: Expose system-model metrics in comparison tables and visualizer
      detail/comparison views.
- [x] Task 4: Add Pareto-style visualizer charts for trade-off analysis.
- [x] Task 5: Improve full transformer model support beyond single-layer
      aggregation while preserving existing `transformer-layer` behavior.
- [x] Task 6: Add at least 2-3 additional source-backed published photonic
      accelerator cards with surrogate labeling and regenerated artifacts.
- [x] Task 7: Add limited external report loading foundation after core local
      workflow progress.
- [x] Task 8: Update documentation and regenerate all affected artifacts.
- [x] Task 9: Run focused tests, full Ruff, full pytest, visualizer generation,
      and browser smoke verification.
- [x] Task 10: Run mandatory Hostile Senior Reviewer critique focused on
      modeling clarity, usability, and daily-analysis value.
- [x] Task 11: Close final state files and inspect final repository status.

## Completed Goal: Artifact Freshness Verification And System Profiles

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Map generated artifact families and source commands.
- [x] Task 2: Implement artifact freshness verification command.
- [x] Task 3: Add freshness tests and CI/local quality-path integration.
- [x] Task 4: Add named system-model profiles while preserving manual config.
- [x] Task 5: Add initial visualizer profile sensitivity or profile-aware
      comparison support.
- [x] Task 6: Update documentation and regenerate affected artifacts.
- [x] Task 7: Run mandatory Hostile Senior Reviewer critique and fix important
      findings.
- [x] Task 8: Run final verification and close state files.

## Completed Goal: Transformer Realism, External Loading, And Card Quality

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Map current transformer, external loading, published-card,
      documentation, generated-artifact, and test surfaces.
- [x] Task 2: Extend transformer-model realism for embeddings, output
      projection, activation memory traffic, KV-cache decoder inference, and
      explicit pipeline/overlap assumptions.
- [x] Task 3: Harden browser-based external report loading validation
      feedback.
- [x] Task 4: Add published-card source-confidence and quality/coverage table.
- [x] Task 5: Update documentation and regenerate affected artifacts.
- [x] Task 6: Run mandatory Hostile Senior Reviewer critique and fix important
      issues.
- [x] Task 7: Run final verification and close state files.

## Completed Goal: Autonomous PR, Visualizer, System Model, Cards, Usability

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Commit and push the current
      `codex/artifact-freshness-profiles` work and open a pull request.
- [x] Task 2: Improve web visualizer comparison analytics, presets/exports,
      modeling-boundary labels, and daily-use ergonomics.
- [x] Task 3: Deepen system memory hierarchy, bandwidth, and data-movement
      modeling with auditable assumptions.
- [x] Task 4: Add at least 3 to 4 high-quality published photonic accelerator
      cards with citations, source-quality metadata, and generated artifacts.
- [x] Task 5: Improve CLI and validation usability where it adds clear value.
- [x] Task 6: Update documentation and regenerate checked artifacts.
- [x] Task 7: Run mandatory Hostile Senior Reviewer critique and fix important
      findings.
- [x] Task 8: Run final verification, close state files, commit, push, and
      inspect final repository status.

## Completed Goal: Merge PR #4 And Continue Improvements

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Verify and merge PR #4 into `master`, then ensure local
      `master` is clean and up to date.
- [x] Task 2: Improve visualizer interaction polish and analytical comparison
      features.
- [x] Task 3: Deepen system modeling with contention, shared bandwidth, and
      calibration-oriented metrics.
- [x] Task 4: Add at least 3 to 4 additional high-quality published photonic
      accelerator cards with citations, source-quality metadata, and generated
      artifacts.
- [x] Task 5: Improve CLI validation and workflow usability, especially around
      complex/full transformer model workflows.
- [x] Task 6: Update documentation and regenerate checked artifacts.
- [x] Task 7: Run mandatory Hostile Senior Reviewer critique and fix important
      findings.
- [x] Task 8: Run final verification, close state files, commit/push final
      work, and inspect final repository status.

## Completed Goal: Visualizer Interaction, Usability, And Dashboard Experience

- [x] Task 0: Roll state files forward and create prioritized checklist.
- [x] Task 1: Map current visualizer dashboard, filter, grouping, preset,
      export, boundary-label, and browser-smoke coverage.
- [x] Task 2: Improve filtering, sorting, and grouping with source-quality
      filtering, user-selectable grouping, compare-visible, and reset-filter
      controls.
- [x] Task 3: Improve comparison dashboard insights with an analysis-focus
      selector and schema-aware recommendation panel.
- [x] Task 4: Improve export options with CSV export and focus/filter/grouping
      metadata in comparison exports.
- [x] Task 5: Update documentation, regenerate checked visualizer artifacts,
      and run focused visualizer verification.
- [x] Task 6: Run mandatory Hostile Senior Reviewer critique focused on
      interaction, dashboard clarity, boundary labels, and maintainability,
      then fix important findings.
- [x] Task 7: Run final quality gates, close state files, and inspect final
      repository status.

## Completed Goal: Advanced Visualizer Shareability, Explainability, Testing, And Accessibility

- [x] Task 0: Roll state files forward and create the initial checklist for
      tasks 1-10.
- [x] Task 1: Commit the current work on branch
      `codex/pr4-followup-improvements` and open a pull request to `master`.
- [x] Task 2: Add shareable URL state for filters, focus mode, selected
      artifacts, pinned artifact, and Pareto mode.
- [x] Task 3: Add visual regression screenshot testing for desktop and mobile
      views.
- [x] Task 4: Add an explain-score drilldown showing how each recommendation
      score is calculated.
- [x] Task 5: Add custom score weights for comparison focus modes.
- [x] Task 6: Add selection drawer controls: remove one, clear group, invert
      selection, and compare top N visible.
- [x] Task 7: Improve sticky comparison header and first-column behavior for
      wide comparison tables.
- [x] Task 8: Add a formal JSON schema for
      `photonic-bench-comparison-export-v1`.
- [x] Task 9: Add import/export functionality for browser-local presets.
- [x] Task 10: Perform an accessibility pass covering keyboard navigation,
      ARIA labels, reduced motion, and contrast.
- [x] Task 11: Run mandatory Hostile Senior Reviewer critique and fix important
      findings.
- [x] Task 12: Run final verification, close state files, commit/push final
      work, and inspect final repository status.
- [x] Task 13: Fix post-push GitHub Actions visual regression portability issue
      with platform-specific checked baselines, exact matching when possible,
      and perceptual screenshot fallback metrics.

## Completed Goal: Merge PR #5 And Preset Gallery Visualizer Improvements

- [x] Task 0: Roll state files forward and create the active checklist.
      Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
      `RUBRIC.md`, and `tasks/todo.md`; exposed GBrain; searched GBrain and
      memory; read GitHub and frontend-design guidance; confirmed a clean
      starting branch.
- [x] Task 1: Verify and merge PR #5 into `master`, optionally delete the
      feature branch, then verify local `master` and post-merge GitHub Actions.
      Pre-merge verification is complete: PR #5 is open, non-draft,
      mergeable, and `Ruff, package, and pytest` passed on run `28705631600`.
      PR #5 merged into `master` at merge commit `14cf2afd`; post-merge
      `master` CI run `28706296529` passed; the remote PR branch was pruned.
- [x] Task 2: Map the current visualizer preset, score-weight, URL-state,
      export, and smoke-test surfaces.
- [x] Task 3: Add a visualizer preset gallery with named score-weight profiles:
      Balanced, Efficiency, Throughput, Contention, and Provenance.
- [x] Task 4: Add at least one adjacent daily-use analytical or usability
      improvement around the gallery while preserving modeling-boundary labels.
- [x] Task 5: Update documentation, regenerate checked visualizer artifacts,
      and run focused plus full verification.
- [x] Task 6: Run mandatory Hostile Senior Reviewer critique focused on
      usability and clarity, then fix important findings.
- [x] Task 7: Close state files only after all stop conditions are proven,
      commit/push final work, and inspect final repository status.

## Explicitly Not Active In This Goal

- [ ] Hosted backend web service.
- [ ] Formal MLCommons submission.
- [ ] Release publishing automation.
