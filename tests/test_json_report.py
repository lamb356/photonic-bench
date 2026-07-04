import json

import pytest

from photonic_bench.config import ProvenanceConfig, PublishedCalibrationConfig
from photonic_bench.json_report import REPORT_SCHEMA_VERSION, render_json, report_to_dict
from photonic_bench.model import CalibrationFitRequest, evaluate
from tests.test_model import unit_config


def test_report_to_dict_exposes_json_schema_sections() -> None:
    result = evaluate(unit_config())

    payload = report_to_dict(result)

    assert payload["schema_version"] == REPORT_SCHEMA_VERSION
    assert payload["benchmark"] == {
        "name": "unit matmul",
        "description": "small audited case",
    }
    assert payload["workload"] == {
        "type": "matmul",
        "shape": {"m": 4, "k": 2, "n": 8},
        "macs": 64,
        "equivalent_ops": 128,
        "output_elements": 32,
    }
    assert payload["model_inputs"]["device"]["adc"] == {
        "bits": 6,
        "energy_pj_per_conversion": 0.5,
    }
    assert payload["model_inputs"]["device"]["dac"] == {
        "bits": 6,
        "energy_pj_per_conversion": 0.2,
    }
    assert payload["model_inputs"]["device"]["vector_dac"] == {
        "bits": 6,
        "energy_pj_per_conversion": 0.2,
    }
    assert payload["model_inputs"]["device"]["weight_dac"] == {
        "bits": 6,
        "energy_pj_per_conversion": 0.2,
    }
    assert payload["model_inputs"]["execution"] == {
        "batch_size": 1,
        "vector_reuse_factor": 1,
        "weight_reuse_factor": 1,
        "weight_stationary": False,
        "pipeline": {"stages": 1, "cycle_time_ns": None},
    }
    assert payload["model_inputs"]["system"]["sram"] == {
        "read_energy_pj_per_byte": 0.02,
        "write_energy_pj_per_byte": 0.02,
        "bandwidth_bytes_per_ns": 1024.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0,
    }
    assert payload["model_inputs"]["system"]["off_chip"] == {
        "read_energy_pj_per_byte": 10.0,
        "write_energy_pj_per_byte": 10.0,
        "bandwidth_bytes_per_ns": 16.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0,
    }
    assert payload["local_model"]["conversion_counts"] == {
        "adc_conversions": 32,
        "vector_dac_conversions": 8,
        "weight_dac_conversions": 16,
        "dac_conversions": 24,
    }
    assert payload["local_model"]["memory_traffic"] == {
        "vector_operand_read_bytes": 8,
        "weight_operand_read_bytes": 16,
        "output_write_bytes": 32,
        "total_interface_bytes": 56,
        "macs_per_byte": pytest.approx(64 / 56),
        "equivalent_ops_per_byte": pytest.approx(128 / 56),
        "note": (
            "Interface traffic is derived from DAC/ADC bit widths and reuse "
            "counts. It is not a full memory hierarchy simulation."
        ),
    }
    system = payload["local_model"]["system"]
    assert system["tiers"]["sram"]["read_bytes"] == pytest.approx(24)
    assert system["tiers"]["sram"]["write_bytes"] == pytest.approx(32)
    assert system["tiers"]["sram"]["total_energy_pj"] == pytest.approx(1.12)
    assert system["tiers"]["off_chip"]["total_energy_pj"] == pytest.approx(560)
    assert system["local_compute_and_conversion_energy_pj"] == pytest.approx(21.248)
    assert system["total_movement_energy_pj"] == pytest.approx(561.12)
    assert system["total_system_energy_pj"] == pytest.approx(582.368)
    assert system["system_energy_per_op_pj"] == pytest.approx(582.368 / 128)
    assert system["movement_energy_share"] == pytest.approx(561.12 / 582.368)
    assert system["bandwidth_limited_batch_latency_ns"] == pytest.approx(5.0)
    assert "not a published measurement" in system["note"]
    assert payload["local_model"]["energy"]["vector_dac_pj"] == pytest.approx(1.6)
    assert payload["local_model"]["energy"]["weight_dac_pj"] == pytest.approx(3.2)
    assert payload["local_model"]["energy"]["total_pj"] == pytest.approx(21.248)
    assert payload["local_model"]["timing"]["batch_latency_ns"] == pytest.approx(5.0)
    assert payload["local_model"]["timing"][
        "steady_state_operations_per_second"
    ] == pytest.approx(2e8)
    assert payload["published_reference"] is None
    assert payload["calibration_fit"] is None
    assert payload["provenance"] is None
    assert payload["assumptions"]


def test_report_to_dict_keeps_published_reference_separate() -> None:
    config = unit_config().with_updates(
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
    result = evaluate(config)

    payload = report_to_dict(result)

    reference = payload["published_reference"]
    assert reference is not None
    assert reference["source_type"] == "published_calibration"
    assert "not local component-model estimates" in reference["separation_note"]
    assert reference["provenance"]["doi"] == "10.1038/s41586-025-08786-6"
    assert reference["reported"]["reported_tops"] == pytest.approx(8.19)
    assert reference["derived_unit_conversions"][
        "energy_per_op_including_lasers_pj"
    ] == pytest.approx(1 / 2.38)
    assert payload["local_model"]["energy"]["total_pj"] == pytest.approx(21.248)


def test_render_json_is_parseable_and_deterministic() -> None:
    result = evaluate(unit_config())

    rendered = render_json(result)

    parsed = json.loads(rendered)
    assert parsed == report_to_dict(result)
    assert rendered.endswith("\n")


def test_report_to_dict_includes_calibration_fit() -> None:
    config = unit_config().with_updates(
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

    payload = report_to_dict(result)

    fit = payload["calibration_fit"]
    assert fit is not None
    assert fit["target"] == "published-including-lasers"
    assert fit["fitted_parameter"]["path"] == "device.dac.energy_pj_per_conversion"
    assert fit["pre_fit_total_energy_pj"] == pytest.approx(21.248)
    assert fit["post_fit_total_energy_pj"] == pytest.approx(128 / 2.38)
    assert fit["absolute_error_pj"] == pytest.approx(0.0)
