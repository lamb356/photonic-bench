import os
import platform
from pathlib import Path

import pytest
from PIL import Image, ImageChops, ImageFilter, ImageStat

from photonic_bench.visualizer import write_visualizer

playwright_api = pytest.importorskip(
    "playwright.sync_api",
    reason="Install dev dependencies to run visual regression tests.",
)


BASELINE_ROOT = Path("tests/visual_baselines")
UPDATE_BASELINES = os.environ.get("UPDATE_VISUAL_BASELINES") == "1"
EXACT_MAX_CHANNEL_DELTA = 2
EXACT_CHANGED_RATIO = 0.001
PERCEPTUAL_WIDTH = 192
PERCEPTUAL_MEAN_DELTA = 10.0
PERCEPTUAL_RMS_DELTA = 24.0
PERCEPTUAL_CHANGED_RATIO = 0.22


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
    actual_path = actual_screenshot_path(tmp_path, name)
    baseline_path = baseline_path_for(name)

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
            page.get_by_role("button", name="Apply Provenance score profile").click()
            page.get_by_text("Provenance profile active").first.wait_for()
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
        baseline_path.parent.mkdir(parents=True, exist_ok=True)
        baseline_path.write_bytes(actual_path.read_bytes())

    assert baseline_path.exists(), (
        f"Missing visual baseline {baseline_path}; run with "
        "UPDATE_VISUAL_BASELINES=1 to create it."
    )
    assert_screenshot_matches(actual_path, baseline_path)


def actual_screenshot_path(tmp_path: Path, name: str) -> Path:
    output_dir_text = os.environ.get("VISUAL_REGRESSION_OUTPUT_DIR")
    output_dir = Path(output_dir_text) if output_dir_text else tmp_path
    output_dir.mkdir(parents=True, exist_ok=True)
    return output_dir / f"{name}.png"


def baseline_path_for(name: str) -> Path:
    platform_key = os.environ.get(
        "VISUAL_REGRESSION_BASELINE_PLATFORM", platform.system().lower()
    )
    platform_path = BASELINE_ROOT / platform_key / f"{name}.png"
    if UPDATE_BASELINES or platform_path.exists():
        return platform_path
    return BASELINE_ROOT / f"{name}.png"


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

    if max_delta <= EXACT_MAX_CHANNEL_DELTA and changed_ratio <= EXACT_CHANGED_RATIO:
        return

    perceptual_metrics = screenshot_perceptual_metrics(actual, baseline)
    assert (
        perceptual_metrics["mean_delta"] <= PERCEPTUAL_MEAN_DELTA
        and perceptual_metrics["rms_delta"] <= PERCEPTUAL_RMS_DELTA
        and perceptual_metrics["changed_ratio"] <= PERCEPTUAL_CHANGED_RATIO
    ), (
        "Screenshot regression exceeded exact and perceptual thresholds: "
        f"exact max_delta={max_delta}, exact changed_ratio={changed_ratio:.4f}, "
        f"perceptual mean_delta={perceptual_metrics['mean_delta']:.2f}, "
        f"perceptual rms_delta={perceptual_metrics['rms_delta']:.2f}, "
        f"perceptual changed_ratio={perceptual_metrics['changed_ratio']:.4f}"
    )


def screenshot_perceptual_metrics(
    actual: Image.Image, baseline: Image.Image
) -> dict[str, float]:
    actual_preview = screenshot_preview(actual)
    baseline_preview = screenshot_preview(baseline)
    diff = ImageChops.difference(actual_preview, baseline_preview)
    grayscale_diff = diff.convert("L")
    stat = ImageStat.Stat(grayscale_diff)
    histogram = grayscale_diff.point(lambda value: 255 if value > 18 else 0).histogram()
    changed_pixels = histogram[255]
    changed_ratio = changed_pixels / (
        grayscale_diff.size[0] * grayscale_diff.size[1]
    )
    return {
        "mean_delta": float(stat.mean[0]),
        "rms_delta": float(stat.rms[0]),
        "changed_ratio": changed_ratio,
    }


def screenshot_preview(image: Image.Image) -> Image.Image:
    width, height = image.size
    preview_height = max(1, round(height * PERCEPTUAL_WIDTH / width))
    return (
        image.convert("RGB")
        .resize((PERCEPTUAL_WIDTH, preview_height), Image.Resampling.LANCZOS)
        .filter(ImageFilter.GaussianBlur(radius=1.1))
    )
