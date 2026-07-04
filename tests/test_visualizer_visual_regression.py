import os
from pathlib import Path

import pytest
from PIL import Image, ImageChops

from photonic_bench.visualizer import write_visualizer

playwright_api = pytest.importorskip(
    "playwright.sync_api",
    reason="Install dev dependencies to run visual regression tests.",
)


BASELINE_DIR = Path("tests/visual_baselines")
UPDATE_BASELINES = os.environ.get("UPDATE_VISUAL_BASELINES") == "1"


@pytest.mark.parametrize(
    ("name", "viewport"),
    [
        ("desktop-comparison", {"width": 1440, "height": 950}),
        ("mobile-comparison", {"width": 390, "height": 900}),
    ],
)
def test_visualizer_comparison_screenshot_regression(
    tmp_path: Path, name: str, viewport: dict[str, int]
) -> None:
    output_path = tmp_path / "visualizer" / "index.html"
    write_visualizer(Path("reports"), output_path)
    actual_path = tmp_path / f"{name}.png"
    baseline_path = BASELINE_DIR / f"{name}.png"

    with playwright_api.sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page(
                viewport=viewport,
                device_scale_factor=1,
                color_scheme="light",
            )
            page.emulate_media(reduced_motion="reduce")
            page.goto(output_path.resolve().as_uri())
            page.locator("#preset-select").select_option(
                label="Published reference surrogate cards (generated)"
            )
            page.locator("#load-preset").click()
            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            page.locator("#analysis-focus").select_option("provenance")
            page.get_by_text("Explain score").first.click()
            page.screenshot(
                path=actual_path,
                full_page=False,
                animations="disabled",
                caret="hide",
            )
        finally:
            browser.close()

    if UPDATE_BASELINES:
        BASELINE_DIR.mkdir(parents=True, exist_ok=True)
        baseline_path.write_bytes(actual_path.read_bytes())

    assert baseline_path.exists(), (
        f"Missing visual baseline {baseline_path}; run with "
        "UPDATE_VISUAL_BASELINES=1 to create it."
    )
    assert_screenshot_matches(actual_path, baseline_path)


def assert_screenshot_matches(actual_path: Path, baseline_path: Path) -> None:
    with Image.open(actual_path) as actual_image:
        actual = actual_image.convert("RGBA")
    with Image.open(baseline_path) as baseline_image:
        baseline = baseline_image.convert("RGBA")

    assert actual.size == baseline.size
    diff = ImageChops.difference(actual, baseline)
    extrema = diff.getextrema()
    max_delta = max(channel[1] for channel in extrema)
    diff_mask = diff.convert("L").point(lambda value: 255 if value else 0)
    changed_pixels = diff_mask.histogram()[255]
    changed_ratio = changed_pixels / (actual.size[0] * actual.size[1])

    assert max_delta <= 2
    assert changed_ratio <= 0.001
