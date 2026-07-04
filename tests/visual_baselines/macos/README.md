# macOS Visual Baselines

This folder is reserved for visual regression screenshots captured on a real
macOS renderer. The test helper normalizes `darwin`, `mac`, and
`macos-latest` to this `macos` platform key.

Do not populate this folder by copying Windows or Linux screenshots.

The CI job `macOS visual baseline capture` runs the visual regression suite on
`macos-latest` with `UPDATE_VISUAL_BASELINES=1` and uploads
`macos-visual-regression-screenshots` on every run. To promote macOS baselines,
download that artifact from a reviewed CI run, copy the PNGs into this folder,
and commit them. Until reviewed PNGs are committed here, local macOS test runs
fall back to the root baselines and the normal perceptual threshold.
