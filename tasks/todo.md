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

## Explicitly Not Active In This Goal

- [ ] Hosted backend web service.
- [ ] Formal MLCommons submission.
- [ ] Release publishing automation.
