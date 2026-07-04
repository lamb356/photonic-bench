from pathlib import Path

import pytest

from photonic_bench.visualizer import write_visualizer

playwright_api = pytest.importorskip(
    "playwright.sync_api",
    reason="Install dev dependencies to run the browser smoke test.",
)


def test_generated_visualizer_browser_smoke(tmp_path: Path) -> None:
    output_path = tmp_path / "visualizer" / "index.html"
    write_visualizer(Path("reports"), output_path)

    page_errors: list[str] = []
    console_errors: list[str] = []

    with playwright_api.sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 950})
            page.on("pageerror", lambda error: page_errors.append(str(error)))
            page.on(
                "console",
                lambda message: console_errors.append(message.text)
                if message.type == "error"
                else None,
            )

            page.goto(output_path.resolve().as_uri())
            page.get_by_text("Serial Timing").first.wait_for()

            page.locator('button[data-id="nature_pace_64x64.json"]').click()
            page.get_by_role("heading", name="Published Reference").wait_for()

            page.locator('input[data-compare-id="nature_pace_64x64.json"]').check()
            page.locator('button[data-pin-id="nature_pace_64x64.json"]').click()
            page.locator(
                'input[data-compare-id="transformer_small_sanity/small_transformer_layer_summary.json"]'
            ).check()
            page.locator("#compare-mode").click()

            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            page.get_by_text("Pinned reference").first.wait_for()
            page.get_by_text("Delta vs pinned").first.wait_for()
            page.get_by_text("Ratio vs pinned").first.wait_for()
            page.get_by_text("Mixed-schema comparison").first.wait_for()
        finally:
            browser.close()

    assert page_errors == []
    assert console_errors == []
