# Changelog

## 2026-07-04 - Post-PR Visualizer, Modeling, Cards, And Workflow Upgrade

- Opened follow-up PR #7 from `codex/post-pr5-visual-a11y` to `master` and
  fixed the GitHub Linux mobile visual baseline from a CI-produced screenshot.
- Added a real `macos-latest` visual baseline capture job that uploads reviewed
  macOS screenshots without fabricating checked PNGs.
- Extended local system diagnostics with hierarchy traffic shares, contention
  bandwidth derate, guardband timing, loaded hierarchy bandwidth, transfer
  overhead, and bandwidth/contention pressure ratios.
- Exposed the new diagnostics in JSON, Markdown reports, comparison exports,
  and the web visualizer contention/dashboard views.
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
