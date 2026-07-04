from tests.test_model import unit_config

from photonic_bench.config import (
    ProvenanceConfig,
    PublishedCalibrationConfig,
    SourceQualityConfig,
)
from photonic_bench.model import CalibrationFitRequest, evaluate
from photonic_bench.report import render_markdown


def test_render_markdown_exposes_assumptions_and_totals() -> None:
    result = evaluate(unit_config())

    markdown = render_markdown(result)

    assert "# PhotonicBench Benchmark Card: unit matmul" in markdown
    assert "| MACs | 64 |" in markdown
    assert "| Total energy | 21.248 pJ |" in markdown
    assert "| ADC energy | 16.000 pJ |" in markdown
    assert "| DAC energy | 4.800 pJ |" in markdown
    assert "| Total latency | 5.000 ns |" in markdown
    assert "## Interface Memory Traffic" in markdown
    assert "| Total interface traffic | 56 bytes |" in markdown
    assert "| Equivalent ops per interface byte | 2.28571 |" in markdown
    assert "## Multi-Tier System Movement" in markdown
    assert "| SRAM | 24 bytes | 32 bytes | 1.120 pJ | 0.055 ns | 1024.000 bytes/ns |" in markdown
    assert (
        "| Off-chip/DRAM | 24 bytes | 32 bytes | 560.000 pJ | 3.500 ns | 16.000 bytes/ns |"
        in markdown
    )
    assert "| System profile | default |" in markdown
    assert "| Profile tier overrides | none |" in markdown
    assert "| Total movement energy | 561.120 pJ |" in markdown
    assert "| Total system energy | 582.368 pJ |" in markdown
    assert "| Bandwidth-limited batch latency | 5.000 ns |" in markdown
    assert "## Assumptions" in markdown
    assert "optical MAC energy" in markdown
    assert "laser wall-plug efficiency" in markdown


def test_render_markdown_includes_optional_provenance_and_published_calibration() -> None:
    config = unit_config()
    config = config.with_updates(
        provenance=ProvenanceConfig(
            source_title="An integrated large-scale photonic accelerator with ultralow latency",
            source_url="https://www.nature.com/articles/s41586-025-08786-6",
            doi="10.1038/s41586-025-08786-6",
            venue="Nature 640, 361-367 (2025)",
            claim_status="paper-reported",
        ),
        published_calibration=PublishedCalibrationConfig(
            architecture="PACE 64x64 matrix-vector oMAC",
            reported_tops=8.19,
            energy_efficiency_excluding_lasers_tops_per_watt=4.21,
            energy_efficiency_including_lasers_tops_per_watt=2.38,
            reported_latency_ns=5.0,
            reported_future_latency_ns=3.0,
            reported_enob=7.61,
            reported_component_count_min=16_000,
            a10_latency_ns_min=2_300.0,
            pace_total_time_us=2.7,
            gpu_total_time_us=798.1,
        ),
        source_quality=SourceQualityConfig(
            reported_metrics=("throughput", "energy_efficiency", "precision"),
            local_surrogate_type="direct_matrix_vector",
            coverage={
                "throughput": "reported",
                "energy": "reported",
                "accuracy": "not_applicable",
                "area": "derived",
                "precision": "reported",
            },
            confidence_grade="A",
            notes=("Direct source-backed calibration.",),
        ),
    )
    result = evaluate(config)

    markdown = render_markdown(result)

    assert "## Provenance" in markdown
    assert "| DOI | 10.1038/s41586-025-08786-6 |" in markdown
    assert "| Claim status | paper-reported |" in markdown
    assert "## Published Calibration" in markdown
    assert "| Reported ENOB | 7.610 bits |" in markdown
    assert "| Reported component count | >= 16000 |" in markdown
    assert "## Source Quality Index" in markdown
    assert "| Confidence grade | A |" in markdown
    assert "| Precision | reported |" in markdown


def test_render_markdown_includes_calibration_fit() -> None:
    config = unit_config()
    config = config.with_updates(
        provenance=ProvenanceConfig(
            source_title="An integrated large-scale photonic accelerator",
            source_url="https://www.nature.com/articles/s41586-025-08786-6",
            doi="10.1038/s41586-025-08786-6",
            venue="Nature 640, 361-367 (2025)",
            claim_status="paper-reported calibration targets",
        ),
        published_calibration=PublishedCalibrationConfig(
            architecture="PACE 64x64 matrix-vector oMAC",
            reported_tops=8.19,
            energy_efficiency_excluding_lasers_tops_per_watt=4.21,
            energy_efficiency_including_lasers_tops_per_watt=2.38,
            reported_latency_ns=5.0,
            reported_future_latency_ns=3.0,
            reported_enob=7.61,
            reported_component_count_min=16_000,
            a10_latency_ns_min=2_300.0,
            pace_total_time_us=2.7,
            gpu_total_time_us=798.1,
        ),
    )
    result = evaluate(
        config,
        calibration_fit=CalibrationFitRequest(
            target="published-including-lasers",
            parameter="device.dac.energy_pj_per_conversion",
        ),
    )

    markdown = render_markdown(result)

    assert "## Calibration Fit" in markdown
    assert "| Target | published-including-lasers |" in markdown
    assert "| Fitted parameter | device.dac.energy_pj_per_conversion |" in markdown
    assert "not an independent reproduction" in markdown
