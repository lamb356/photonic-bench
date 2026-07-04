# PhotonicBench Reviewer Workflow

This checklist is for pull requests that change reports, schemas, examples,
modeling assumptions, visualizer assets, visual baselines, or generated
artifacts.

## Local Freshness Gate

Run this before reviewing generated diffs:

```powershell
python -m photonic_bench.cli verify-artifacts
```

The command regenerates the checked artifact set in a temporary directory and
byte-compares it against `reports/`. It covers per-card Markdown/JSON reports,
transformer-layer and transformer-model artifacts, `reports/comparison.md`,
`reports/visualizer_presets.json` as an input to generation, and the static
`reports/visualizer/` bundle. A failure means the checked outputs do not match
the source YAML/code/docs contract; review the missing, unexpected, and stale
path lists before trusting the diff.

Use this gate after changing any of:

- `examples/*.yaml`
- `photonic_bench/config.py`, `model.py`, `json_report.py`, `report.py`,
  `comparison.py`, `transformer.py`, or `visualizer.py`
- `photonic_bench/visualizer_assets/*`
- `reports/visualizer_presets.json`
- report schemas under `docs/photonic-bench-*.schema.json`

## Visualizer Review

For visualizer workflow changes, run:

```powershell
python -m pytest tests/test_visualizer_smoke.py
python -m pytest tests/test_visualizer_accessibility.py
python -m pytest tests/test_visualizer_visual_regression.py
```

The smoke test opens a generated static visualizer in Chromium and exercises
generated presets, browser-local full-intent presets, URL state, score
explanations, decision-packet JSON/Markdown export, comparison exports,
selection controls, pinned comparisons, and representative detail views. It
fails on browser page errors or console errors.

The accessibility test uses automated axe checks against representative detail
and comparison states. Passing axe checks are not a complete manual audit, but a
failure is a blocker until fixed or explicitly justified.

The visual regression test captures desktop/mobile comparison states, detail
views, external-report diagnostics, and wide transformer comparisons. It uses
checked baselines and a perceptual fallback for renderer differences.

## CI Artifacts

GitHub Actions uploads screenshots on every run:

- `visual-regression-screenshots`
- `macos-visual-regression-screenshots`

These artifacts are review evidence, not replacement baselines. Use them to
inspect intentional UI changes, unexpected overlap, clipped text, missing
content, or browser-specific differences. CI uses `actions/upload-artifact@v6`
for these uploads to avoid Node 20 action-runtime deprecation warnings without
weakening the Ruff, package, pytest, freshness, or visual regression gates.

## Baseline Promotion

Do not update visual baselines just to make a failure disappear. Promote a new
baseline only when all of these are true:

- The UI change is intentional and documented in the PR.
- The new screenshot has been inspected for layout overlap, clipped text,
  blank regions, and misleading labels.
- Source visualizer assets and generated `reports/visualizer/` outputs have
  been regenerated.
- `verify-artifacts` passes after regeneration.

For local baseline refresh:

```powershell
$env:UPDATE_VISUAL_BASELINES='1'
$env:VISUAL_REGRESSION_BASELINE_PLATFORM='root'
python -m pytest tests/test_visualizer_visual_regression.py
Remove-Item Env:\UPDATE_VISUAL_BASELINES
Remove-Item Env:\VISUAL_REGRESSION_BASELINE_PLATFORM
```

macOS baselines must come from a real macOS runner or reviewed
`macos-visual-regression-screenshots` artifact. Do not fabricate macOS PNGs on
another platform.

## Decision Packet Review

When a PR changes recommendation scoring, presets, Energy Stack, Bottleneck
Stack, checklist logic, or decision packets, export both:

- `Decision Packet JSON`
- `Decision Packet Markdown`

Check that the packet includes the selected artifacts, pinned baseline,
analysis intent, score weights, checklist status, top tradeoffs, reviewer
notes, boundary notes, and embedded comparison export. The packet text must
keep ranking and "why this card ranks here" explanations labeled as local UI
triage, not published benchmark claims.

