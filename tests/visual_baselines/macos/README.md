# macOS Visual Baselines

This folder is reserved for visual regression screenshots captured on a real
macOS renderer. The test helper normalizes `darwin`, `mac`, and
`macos-latest` to this `macos` platform key.

Do not populate this folder by copying Windows or Linux screenshots. Until a
macOS runner captures reviewed PNGs, macOS test runs fall back to the root
baselines and the normal perceptual threshold.
