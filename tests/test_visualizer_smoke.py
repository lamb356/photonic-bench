import json
from pathlib import Path

import jsonschema
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
    missing_field_external = tmp_path / "missing_field_external.json"
    missing_field_external.write_text(
        json.dumps(
            {
                "schema_version": "photonic-bench-report-v1",
                "benchmark": {
                    "name": "broken external",
                    "description": "missing workload type",
                },
                "workload": {
                    "shape": {"m": 1, "k": 1, "n": 1},
                    "macs": 1,
                    "equivalent_ops": 2,
                    "output_elements": 1,
                },
                "local_model": {
                    "energy": {"total_pj": 1.0, "energy_per_op_pj": 0.5},
                    "timing": {
                        "batch_latency_ns": 1.0,
                        "steady_state_equivalent_ops_per_second": 2.0,
                    },
                },
                "assumptions": [],
            }
        ),
        encoding="utf-8",
    )
    imported_presets = tmp_path / "imported_presets.json"
    imported_presets.write_text(
        json.dumps(
            {
                "schema_version": "photonic-bench-comparison-presets-v1",
                "presets": [
                    {
                        "name": "Imported smoke preset",
                        "description": "Imported during browser smoke.",
                        "artifact_ids": [
                            "nature_pace_64x64.json",
                            "matmul_64x64.json",
                        ],
                        "pinned_id": "nature_pace_64x64.json",
                    }
                ],
            }
        ),
        encoding="utf-8",
    )
    write_visualizer(Path("reports"), output_path)

    page_errors: list[str] = []
    console_errors: list[str] = []

    with playwright_api.sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 950})
            page.emulate_media(reduced_motion="reduce")
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
            page.get_by_text("nature_pace_64x64.json: accepted").wait_for()
            page.locator(".external-diagnostic > div").filter(
                has_text="Per-matmul report (photonic-bench-report-v1)"
            ).wait_for()
            page.get_by_text("Detected and accepted").wait_for()
            page.get_by_text("external/nature_pace_64x64.json").first.wait_for()
            assert int(page.locator("#artifact-count").text_content()) == initial_count + 1
            page.locator("#external-report-file").set_input_files(
                str(missing_field_external)
            )
            page.get_by_text(
                "Rejected missing_field_external.json: Missing required field: workload.type."
            ).wait_for()
            page.get_by_text("missing_field_external.json: rejected").wait_for()
            page.locator(".external-diagnostic li").filter(
                has_text="Missing required field: workload.type."
            ).wait_for()
            page.locator("#external-report-file").set_input_files(str(bad_external))
            page.get_by_text("Rejected bad_external.json: invalid JSON").wait_for()
            page.get_by_role("button", name="Clear external").click()
            page.get_by_text("Cleared 1 external report(s).").wait_for()
            assert int(page.locator("#artifact-count").text_content()) == initial_count

            page.locator("#quality-filter").select_option("A")
            page.locator("#group-filter").select_option("source-quality")
            page.get_by_text("source grade: A").first.wait_for()
            page.locator(".artifact-group-heading").filter(
                has_text="Source grade A"
            ).wait_for()
            page.get_by_role("button", name="Compare visible").click()
            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            page.get_by_role("heading", name="Comparison Workspace").wait_for()
            page.get_by_role("heading", name="Comparison Recommendations").wait_for()
            page.get_by_text("Analysis focus").first.wait_for()
            selected_count = page.locator("#compare-count").text_content()
            page.get_by_text("Score Profile Gallery").first.wait_for()
            page.get_by_role("button", name="Apply Efficiency score profile").click()
            page.get_by_text("Applied Efficiency score profile.").wait_for()
            page.get_by_text("Efficiency profile active").first.wait_for()
            assert page.locator("#analysis-focus").input_value() == "efficiency"
            assert page.locator("#compare-count").text_content() == selected_count
            page.get_by_text("System energy per op x2").first.wait_for()
            page.locator("#analysis-focus").select_option("contention")
            page.get_by_text("Contention focus").first.wait_for()
            page.locator("#analysis-focus").select_option("provenance")
            page.get_by_text("Source confidence").first.wait_for()
            page.get_by_text("Score weights").first.wait_for()
            page.locator('input[data-score-weight="Source confidence"]').evaluate(
                "(node) => { node.value = '2'; node.dispatchEvent(new Event('change', { bubbles: true })); }"
            )
            page.get_by_text("Source confidence x2").first.wait_for()
            page.get_by_text("Explain score").first.click()
            page.get_by_text("Contribution").first.wait_for()
            page.get_by_role("heading", name="Selection Drawer").wait_for()
            page.locator("#pareto-mode").select_option("contention-throughput")
            page.wait_for_timeout(200)
            shared_url = page.url
            assert "view=compare" in shared_url
            assert "quality=A" in shared_url
            assert "focus=provenance" in shared_url
            assert "pareto=contention-throughput" in shared_url
            assert "weights=" in shared_url
            page.goto(shared_url)
            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            assert page.locator("#quality-filter").input_value() == "A"
            assert page.locator("#analysis-focus").input_value() == "provenance"
            assert page.locator("#pareto-mode").input_value() == (
                "contention-throughput"
            )
            assert page.locator('input[data-score-weight="Source confidence"]').input_value() == "2"
            page.get_by_role("button", name="Copy state link").click()
            page.get_by_text("Shareable link").wait_for()
            page.get_by_role("button", name="Reset filters").click()
            page.get_by_text("All artifacts, sorted by name").first.wait_for()
            page.locator("#top-visible-count").fill("3")
            page.get_by_role("button", name="Compare top N visible").click()
            assert page.locator("#compare-count").text_content() == "3"
            page.get_by_role("button", name="Remove").first.click()
            assert page.locator("#compare-count").text_content() == "2"
            page.get_by_role("button", name="Compare top N visible").click()
            page.get_by_role("button", name="Invert visible selection").click()
            assert int(page.locator("#compare-count").text_content()) > 3
            page.get_by_role("button", name="Compare top N visible").click()
            page.locator("[data-clear-selection-group]").first.click()
            assert int(page.locator("#compare-count").text_content()) <= 3
            page.get_by_role("button", name="Compare visible").click()
            page.locator("#analysis-focus").select_option("provenance")
            page.locator("#preset-name").fill("Smoke local preset")
            page.get_by_role("button", name="Save").click()
            page.get_by_text("Saved Smoke local preset.").wait_for()
            with page.expect_download() as preset_download:
                page.get_by_role("button", name="Export local").click()
            preset_text = Path(preset_download.value.path()).read_text(
                encoding="utf-8"
            )
            assert "photonic-bench-comparison-presets-v1" in preset_text
            page.locator("#import-preset-file").set_input_files(str(imported_presets))
            page.get_by_text("Imported 1 browser-local preset(s).").wait_for()
            page.locator("#preset-select").select_option(label="Imported smoke preset (local)")
            page.locator("#load-preset").click()
            page.get_by_text("Loaded Imported smoke preset.").wait_for()
            with page.expect_download() as csv_download:
                page.get_by_role("button", name="Download CSV").click()
            assert csv_download.value.suggested_filename.endswith(".csv")
            csv_text = Path(csv_download.value.path()).read_text(encoding="utf-8")
            assert (
                '"analysis_focus","score_profile","score_weights","artifact_id","benchmark"'
                in csv_text
            )
            assert "comparison_boundary_notes" in csv_text
            assert '"provenance"' in csv_text
            page.get_by_role("button", name="Reset filters").click()
            page.get_by_text("All artifacts, sorted by name").first.wait_for()

            page.locator("#preset-select").select_option(
                label="Published reference surrogate cards (generated)"
            )
            page.locator("#load-preset").click()
            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            page.get_by_role("heading", name="Comparison Recommendations").wait_for()
            page.get_by_role("heading", name="Comparison Brief").wait_for()
            page.get_by_role("heading", name="Bottleneck Stack").wait_for()
            page.get_by_role("heading", name="Energy Stack").wait_for()
            page.get_by_role(
                "heading", name="Comparison Review Checklist"
            ).wait_for()
            page.get_by_role("heading", name="Review Queue").wait_for()
            page.get_by_role("heading", name="Decision Scorecard").wait_for()
            page.get_by_role("heading", name="Pareto Trade-Offs").wait_for()
            page.get_by_role("button", name="Apply Provenance score profile").click()
            page.get_by_text("Provenance profile active").first.wait_for()
            page.get_by_text("Frontier Points").first.wait_for()
            page.locator("#pareto-mode").select_option("intensity-latency")
            page.get_by_text("Eq ops/byte is higher better").first.wait_for()
            page.locator("#pareto-mode").select_option("energy-throughput")
            page.get_by_text("Operational intensity").first.wait_for()
            page.get_by_text("Interface traffic").first.wait_for()

            with page.expect_download() as json_download:
                page.get_by_role("button", name="Download JSON").click()
            assert json_download.value.suggested_filename.endswith(".json")
            export_json = json.loads(
                Path(json_download.value.path()).read_text(encoding="utf-8")
            )
            export_schema = json.loads(
                Path("docs/photonic-bench-comparison-export-v1.schema.json").read_text(
                    encoding="utf-8"
                )
            )
            jsonschema.validate(
                export_json,
                export_schema,
                format_checker=jsonschema.FormatChecker(),
            )
            assert export_json["analysis_focus"]["key"] == "provenance"
            assert export_json["analysis_focus"]["score_profile"]["key"] == "provenance"
            assert export_json["analysis_focus"]["score_profile"]["is_builtin"] is True
            assert export_json["analysis_focus"]["score_weights"]
            assert export_json["filters"]["grouping"] == "schema"
            assert export_json["recommendations"]
            assert "hierarchy_equivalent_ops_per_byte" in export_json["artifacts"][0]
            assert "dominant_traffic_tier" in export_json["artifacts"][0]
            assert "dominant_movement_energy_tier" in export_json["artifacts"][0]
            assert "contention_memory_bottleneck_tier" in export_json["artifacts"][0]
            assert (
                "max_tier_contention_adjusted_transfer_pressure_ratio"
                in export_json["artifacts"][0]
            )
            assert (
                "contention_bandwidth_saturation_tier"
                in export_json["artifacts"][0]
            )
            assert (
                "max_tier_contention_bandwidth_utilization"
                in export_json["artifacts"][0]
            )
            assert (
                "min_tier_contention_bandwidth_headroom_ratio"
                in export_json["artifacts"][0]
            )
            assert "max_tier_movement_energy_share" in export_json["artifacts"][0]
            assert (
                "local_compute_and_conversion_energy_share"
                in export_json["artifacts"][0]
            )
            assert "movement_to_compute_energy_ratio" in export_json["artifacts"][0]
            assert (
                "contention_only_loaded_bandwidth_bytes_per_ns"
                in export_json["artifacts"][0]
            )
            assert (
                "guardbanded_loaded_hierarchy_bandwidth_bytes_per_ns"
                in export_json["artifacts"][0]
            )
            assert (
                "dominant_system_energy_component"
                in export_json["artifacts"][0]
            )
            assert "max_tier_system_energy_share" in export_json["artifacts"][0]
            assert export_json["review_checklist"]
            assert "transfer_to_compute_time_ratio" in export_json["artifacts"][0]
            assert (
                "contention_adjusted_transfer_to_compute_time_ratio"
                in export_json["artifacts"][0]
            )
            assert export_json["recommendations"][0]["score_explanation"][
                "components"
            ]
            assert export_json["url_state"].startswith("file:")

            with page.expect_download() as markdown_download:
                page.get_by_role("button", name="Download Markdown").click()
            assert markdown_download.value.suggested_filename.endswith(".md")
            markdown_text = Path(markdown_download.value.path()).read_text(
                encoding="utf-8"
            )
            assert "Analysis focus: Provenance" in markdown_text
            assert "Score profile: Provenance" in markdown_text
            assert "Score weights:" in markdown_text
            assert "## Recommendations" in markdown_text
            assert "## Review Checklist" in markdown_text

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
            assert (
                page.get_by_role("button", name="Detail").get_attribute("aria-pressed")
                == "false"
            )
            reduced_transition = page.locator(".artifact-row").first.evaluate(
                "(node) => getComputedStyle(node).transitionDuration"
            )
            assert reduced_transition in {"0.001ms", "0s", "1e-06s"}
        finally:
            browser.close()

    assert page_errors == []
    assert console_errors == []
