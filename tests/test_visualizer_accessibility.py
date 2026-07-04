from pathlib import Path

import pytest

from photonic_bench.visualizer import write_visualizer

playwright_api = pytest.importorskip(
    "playwright.sync_api",
    reason="Install dev dependencies to run visualizer accessibility tests.",
)
axe_api = pytest.importorskip(
    "axe_playwright_python.sync_playwright",
    reason="Install dev dependencies to run axe accessibility tests.",
)


def test_generated_visualizer_has_no_axe_violations_in_core_states(
    tmp_path: Path,
) -> None:
    output_path = tmp_path / "visualizer" / "index.html"
    write_visualizer(Path("reports"), output_path)

    with playwright_api.sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 950})
            page.emulate_media(reduced_motion="reduce")
            page.goto(output_path.resolve().as_uri())
            page.get_by_text("Serial Timing").first.wait_for()
            assert_no_axe_violations(page, "default detail view")

            page.locator("#preset-select").select_option(
                label="Published reference surrogate cards (generated)"
            )
            page.locator("#load-preset").click()
            page.get_by_role("heading", name="Artifact Comparison").wait_for()
            page.get_by_role("button", name="Apply Efficiency score profile").click()
            page.get_by_text("Efficiency profile active").first.wait_for()
            page.get_by_text("Explain score").first.click()
            assert_no_axe_violations(page, "comparison with score profile")
        finally:
            browser.close()


def assert_no_axe_violations(page, label: str) -> None:
    results = axe_api.Axe().run(page)
    violations = results.response.get("violations", [])
    assert violations == [], format_axe_violations(label, violations)


def format_axe_violations(label: str, violations: list[dict]) -> str:
    lines = [f"Axe found {len(violations)} violation(s) in {label}:"]
    for violation in violations:
        nodes = violation.get("nodes", [])
        targets = [
            ", ".join(node.get("target", []))
            for node in nodes[:3]
            if node.get("target")
        ]
        lines.append(
            "- {id}: {impact}; {description}; targets: {targets}".format(
                id=violation.get("id", "unknown"),
                impact=violation.get("impact", "unknown impact"),
                description=violation.get("description", "no description"),
                targets=" | ".join(targets) or "n/a",
            )
        )
    return "\n".join(lines)
