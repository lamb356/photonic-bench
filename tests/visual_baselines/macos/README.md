# macOS Visual Baselines

This folder is reserved for visual regression screenshots captured on a real
macOS renderer. The test helper normalizes `darwin`, `mac`, and
`macos-latest` to this `macos` platform key.

Do not populate this folder by copying Windows or Linux screenshots.

The checked PNGs in this folder were promoted from the real `macos-latest`
GitHub Actions artifact `macos-visual-regression-screenshots` on CI run
`28710804037`.

The CI job `macOS visual regression` runs the visual regression suite on
`macos-latest` against these checked baselines and uploads
`macos-visual-regression-screenshots` on every run. To refresh macOS baselines,
run the same suite on a real macOS renderer with `UPDATE_VISUAL_BASELINES=1`,
review the screenshots, copy the PNGs into this folder, and commit them.
