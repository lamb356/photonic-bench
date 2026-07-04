# Changelog

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
