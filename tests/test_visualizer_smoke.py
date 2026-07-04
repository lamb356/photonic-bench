from pathlib import Path

import pytest

from photonic_bench.visualizer import write_visualizer

playwright_api = pytest.importorskip(
    "playwright.sync_api",
    reason="Install dev dependencies to run the browser smoke test.",
)


def test_generated_visualizer_browser_smoke(tmp_path: Path) -> None:
    output_path = tmp_path / "visualizer" / "index.html"
    bad_external = tmp_path / "bad_external.json"
    bad_external.write_text("{not json", encoding="utf-8")
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
            initial_count = int(page.locator("#artifact-count").text_content())
            page.locator("#external-report-file").set_input_files(
                str(Path("reports/nature_pace_64x64.json").resolve())
            )
            page.get_by_text("Loaded external report(s): nature_pace_64x64.json").wait_for()
            page.get_by_text("external/nature_pace_64x64.json").first.wait_for()
            assert int(page.locator("#artifact-count").text_content()) == initial_count + 1
            page.locator("#external-report-file").set_input_files(str(bad_external))
            page.get_by_text("Rejected bad_external.json: invalid JSON").wait_for()
            page.get_by_role("button", name="Clear external").click()
            page.get_by_text("Cleared 1 external report(s).").wait_for()
            assert int(page.locator("#artifact-count").text_content()) == initial_count

            page.locator("#preset-select").select_option(
                label="Published reference surrogate cards (generated)"
            )
            page.locator("#load-preset").click()
            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            page.get_by_role("heading", name="Comparison Brief").wait_for()
            page.get_by_role("heading", name="Pareto Trade-Offs").wait_for()
            page.get_by_text("Frontier Points").first.wait_for()
            page.locator("#pareto-mode").select_option("intensity-latency")
            page.get_by_text("Eq ops/byte is higher better").first.wait_for()
            page.locator("#pareto-mode").select_option("energy-throughput")
            page.get_by_text("Operational intensity").first.wait_for()
            page.get_by_text("Interface traffic").first.wait_for()

            with page.expect_download() as json_download:
                page.get_by_role("button", name="Download JSON").click()
            assert json_download.value.suggested_filename.endswith(".json")

            with page.expect_download() as markdown_download:
                page.get_by_role("button", name="Download Markdown").click()
            assert markdown_download.value.suggested_filename.endswith(".md")

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
            page.get_by_text("Percent vs pinned").first.wait_for()
            page.get_by_text("Ratio vs pinned").first.wait_for()
            page.get_by_role("heading", name="Comparison Insights").wait_for()
            page.get_by_role("heading", name="Schema Compatibility").wait_for()
            page.get_by_text("Mixed-schema comparison").first.wait_for()
        finally:
            browser.close()

    assert page_errors == []
    assert console_errors == []
