# Changelog

## 2026-07-04 - Decision Packets, Calibrated Scenarios, And Release Hygiene

- Documented the PR #9 and PR #10 modeling/visualizer sequence as the baseline
  for this follow-up: bandwidth headroom, Energy Stack, review checklist, and
  guardbanded versus contention-only bandwidth split are now part of the
  decision-grade workflow.
- Added visualizer decision packets in JSON and Markdown. A packet bundles
  selected artifacts, pinned baseline, analysis intent, score weights, review
  checklist status, top tradeoffs, reviewer notes, boundary notes, and the
  embedded comparison export while labeling rankings as local UI triage.
- Upgraded generated and browser-local presets so they preserve full analysis
  intent: selected artifacts, pinned baseline, focus mode, score profile,
  score weights, filters, Pareto mode, and reviewer notes.
- Promoted named memory scenarios and contention calibration presets into
  report, JSON, transformer aggregate, comparison, schema, and visualizer
  surfaces. Effective usable bandwidth under load and hierarchy energy
  breakdowns are first-class local outputs.
- Added source-backed surrogate cards for Shen 2017 coherent ONN, Tait 2017
  microring/WDM weight-bank, and ChipAI 2025 photonic chiplet architectures to
  stress on-package SRAM, WDM/broadcast, and chiplet/off-chip movement cases.
- Updated CI screenshot artifact uploads to `actions/upload-artifact@v6` to
  remove the GitHub Actions Node 20 deprecation warning without weakening Ruff,
  package build, pytest, artifact freshness, or visual regression coverage.
- Added reviewer workflow documentation for artifact freshness, generated
  visualizer review, visual regression screenshots, and baseline promotion.

## 2026-07-04 - PR9 Merge, Energy Stack, And Bandwidth Phase Split

- Merged PR #9 into `master`, verified post-merge master CI, ran local pytest
  and artifact freshness verification, and pruned the merged feature branch.
- Added local system-energy decomposition diagnostics: compute/conversion
  energy share, movement-to-compute energy ratio, per-tier system-energy share,
  dominant system energy component, and max tier system-energy share.
- Split loaded hierarchy bandwidth into nominal, contention-only, and
  guardbanded contention-adjusted phases while preserving the existing
  guardbanded field semantics.
- Added the web visualizer Energy Stack and Comparison Review Checklist panels,
  plus JSON/Markdown/CSV export coverage for the new metrics and checklist.

## 2026-07-04 - Post-PR Visualizer, Modeling, Cards, And Workflow Upgrade

- Merged PR #7 into `master`, verified the post-merge master CI run, promoted
  reviewed macOS visual baselines from the real macOS artifact, and tightened
  macOS CI to strict visual regression.
- Extended local system diagnostics with hierarchy traffic shares, contention
  bandwidth derate, guardband timing, loaded hierarchy bandwidth, transfer
  overhead, and bandwidth/contention pressure ratios.
- Added compute-window bandwidth utilization, bandwidth headroom, and bandwidth
  saturation tier diagnostics across reports, JSON, transformer aggregates,
  comparison exports, and the web visualizer.
- Added hierarchy intensity, movement-per-hierarchy-byte, and transfer/compute
  ratios across reports, JSON, transformer aggregates, comparisons, exports,
  and the visualizer Review Queue.
- Exposed the new diagnostics in JSON, Markdown reports, comparison exports,
  and the web visualizer contention/dashboard views.
- Added `photonic-bench validate-examples` for fast YAML inventory validation
  with text or JSON summaries.
- Added source-backed surrogate cards for Tang 2025 waveguide MVM, Meng 2025
  HOP, Prapas 2025 TSW PITC, Zhang 2025 PULTC, and Sved 2026 inverse-designed
  PNN accelerators.
- Added source-backed surrogate cards for Meyer 2026 reconfigurable PTP, Xie
  2025 complex coherent MVM, and Wu 2026 high-order tensor processing.
- Added `photonic-bench list-examples` for table or JSON inventory of checked
  YAML examples before running longer report-generation workflows.

## 2026-07-04 - Visualizer Test And Analysis Upgrade

- Merged the PR #5 visualizer shareability work into `master` and verified the
  post-merge `master` CI run.
- Added the Score Profile Gallery for Balanced, Efficiency, Throughput,
  Contention, and Provenance same-schema score-weight profiles.
- Changed CI to upload visual regression screenshots on every run, including
  passing pull request runs.
- Expanded visual regression coverage beyond the comparison dashboard to detail
  views, external report error diagnostics, and wide transformer comparisons.
- Added axe-core based accessibility checks for the generated visualizer's
  detail and comparison states.
- Kept macOS visual baselines gated on a real macOS renderer. The baseline
  selector now normalizes `darwin`/`macos` platform names, but no macOS PNG
  baseline is checked in without a macOS capture source.
