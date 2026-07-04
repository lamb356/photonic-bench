from pathlib import Path


def test_mlcommons_style_proposal_docs_exist_and_cover_required_sections() -> None:
    proposal = Path("docs/mlcommons_photonic_benchmark_proposal.md").read_text(
        encoding="utf-8"
    )
    checklist = Path(
        "docs/mlcommons_photonic_reproducibility_checklist.md"
    ).read_text(encoding="utf-8")

    for heading in [
        "## Source Context",
        "## Workload Scope",
        "## Metrics Registry",
        "## Reproducibility Requirements",
        "## Open Questions",
    ]:
        assert heading in proposal

    for source in [
        "https://mlcommons.org/benchmarks/",
        "https://docs.mlcommons.org/inference/submission/",
        "https://github.com/mlcommons/inference_policies/blob/master/inference_rules.adoc",
    ]:
        assert source in proposal

    for heading in [
        "## Package Layout",
        "## Required Manifest Fields",
        "## Artifact Requirements",
        "## Metric Requirements",
        "## Audit Questions",
    ]:
        assert heading in checklist

    assert "does not claim MLCommons acceptance" in proposal
    assert "full-system power" in checklist
