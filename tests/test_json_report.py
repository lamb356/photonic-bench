import json

import pytest

from photonic_bench.config import (
    ProvenanceConfig,
    PublishedCalibrationConfig,
    SourceQualityConfig,
)
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
    assert payload["model_inputs"]["system"]["profile"] == "default"
    assert payload["model_inputs"]["system"]["profile_overrides"] == []
    assert payload["model_inputs"]["system"]["memory_timing_mode"] == "overlapped"
    assert payload["model_inputs"]["system"]["contention"] == {
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0,
    }
    assert payload["model_inputs"]["system"]["intermediate"] == {
        "read_energy_pj_per_byte": 0.2,
        "write_energy_pj_per_byte": 0.2,
        "bandwidth_bytes_per_ns": 256.0,
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
    assert system["profile"] == "default"
    assert system["profile_overrides"] == []
    assert system["memory_timing_mode"] == "overlapped"
    assert system["contention"] == {
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0,
    }
    assert system["tiers"]["sram"]["read_bytes"] == pytest.approx(24)
    assert system["tiers"]["sram"]["effective_bandwidth_bytes_per_ns"] == pytest.approx(
        1024
    )
    assert system["tiers"]["sram"]["contention_adjusted_transfer_time_ns"] == (
        pytest.approx(56 / 1024)
    )
    assert system["tiers"]["sram"]["write_bytes"] == pytest.approx(32)
    assert system["tiers"]["sram"]["total_energy_pj"] == pytest.approx(1.12)
    assert system["tiers"]["sram"]["traffic_share"] == pytest.approx(1 / 3)
    assert system["tiers"]["sram"]["nominal_transfer_pressure_ratio"] == pytest.approx(
        (56 / 1024) / 5
    )
    assert system["tiers"]["intermediate"]["total_energy_pj"] == pytest.approx(11.2)
    assert system["tiers"]["off_chip"]["total_energy_pj"] == pytest.approx(560)
    assert system["tiers"]["off_chip"][
        "calibration_adjusted_transfer_time_ns"
    ] == pytest.approx(56 / 16)
    assert system["tiers"]["off_chip"][
        "compute_window_required_bandwidth_bytes_per_ns"
    ] == pytest.approx(56 / 5)
    assert system["tiers"]["off_chip"][
        "contention_bandwidth_utilization"
    ] == pytest.approx((56 / 5) / 16)
    assert system["tiers"]["off_chip"][
        "contention_bandwidth_headroom_bytes_per_ns"
    ] == pytest.approx(16 - (56 / 5))
    assert system["tiers"]["off_chip"][
        "contention_bandwidth_headroom_ratio"
    ] == pytest.approx(16 / (56 / 5))
    assert system["tiers"]["off_chip"]["movement_energy_share"] == pytest.approx(
        560 / 572.32
    )
    assert system["tiers"]["off_chip"]["system_energy_share"] == pytest.approx(
        560 / 593.568
    )
    assert system["tiers"]["off_chip"][
        "contention_adjusted_transfer_pressure_ratio"
    ] == pytest.approx((56 / 16) / 5)
    assert system["local_compute_and_conversion_energy_pj"] == pytest.approx(21.248)
    assert system["total_movement_energy_pj"] == pytest.approx(572.32)
    assert system["total_system_energy_pj"] == pytest.approx(593.568)
    assert system["system_energy_per_op_pj"] == pytest.approx(593.568 / 128)
    assert system["local_compute_and_conversion_energy_share"] == pytest.approx(
        21.248 / 593.568
    )
    assert system["movement_energy_share"] == pytest.approx(572.32 / 593.568)
    assert system["movement_to_compute_energy_ratio"] == pytest.approx(
        572.32 / 21.248
    )
    assert system["total_hierarchy_bytes"] == pytest.approx(168)
    assert system["hierarchy_equivalent_ops_per_byte"] == pytest.approx(128 / 168)
    assert system["movement_energy_per_hierarchy_byte_pj"] == pytest.approx(
        572.32 / 168
    )
    assert system["sram_traffic_share"] == pytest.approx(1 / 3)
    assert system["intermediate_traffic_share"] == pytest.approx(1 / 3)
    assert system["off_chip_traffic_share"] == pytest.approx(1 / 3)
    assert system["dominant_movement_energy_tier"] == "off_chip"
    assert system["dominant_system_energy_component"] == "off_chip"
    assert system["nominal_memory_bottleneck_tier"] == "off_chip"
    assert system["contention_memory_bottleneck_tier"] == "off_chip"
    assert system["max_tier_contention_adjusted_transfer_pressure_ratio"] == (
        pytest.approx((56 / 16) / 5)
    )
    assert system["max_tier_movement_energy_share"] == pytest.approx(560 / 572.32)
    assert system["max_tier_system_energy_share"] == pytest.approx(560 / 593.568)
    assert system["contention_bandwidth_saturation_tier"] == "off_chip"
    assert system["max_tier_contention_bandwidth_utilization"] == pytest.approx(
        (56 / 5) / 16
    )
    assert system["min_tier_contention_bandwidth_headroom_ratio"] == pytest.approx(
        16 / (56 / 5)
    )
    assert system["serial_transfer_time_ns"] == pytest.approx(
        (56 / 1024) + (56 / 256) + (56 / 16)
    )
    assert system["effective_transfer_time_ns"] == pytest.approx(56 / 16)
    assert system["contention_bandwidth_derate_factor"] == pytest.approx(1.0)
    assert system["contention_adjusted_max_transfer_time_ns"] == pytest.approx(56 / 16)
    assert system["contention_adjusted_serial_transfer_time_ns"] == pytest.approx(
        (56 / 1024) + (56 / 256) + (56 / 16)
    )
    assert system["contention_adjusted_effective_transfer_time_ns"] == pytest.approx(
        56 / 16
    )
    assert system["calibration_adjusted_effective_transfer_time_ns"] == pytest.approx(
        56 / 16
    )
    assert system["calibration_guardband_time_ns"] == pytest.approx(0)
    assert system["contention_transfer_overhead_fraction"] == pytest.approx(0)
    assert system["total_transfer_overhead_fraction"] == pytest.approx(0)
    assert system["effective_loaded_bandwidth_bytes_per_ns"] == pytest.approx(48)
    assert system["contention_adjusted_loaded_bandwidth_bytes_per_ns"] == pytest.approx(
        48
    )
    assert system["contention_only_loaded_bandwidth_bytes_per_ns"] == pytest.approx(48)
    assert system["transfer_to_compute_time_ratio"] == pytest.approx((56 / 16) / 5)
    assert system["bandwidth_limited_batch_latency_ns"] == pytest.approx(5.0)
    assert system["bandwidth_pressure_ratio"] == pytest.approx(1.0)
    assert system["bandwidth_limited_tier"] == "compute"
    assert system["contention_adjusted_batch_latency_ns"] == pytest.approx(5.0)
    assert system["contention_adjusted_transfer_to_compute_time_ratio"] == pytest.approx(
        (56 / 16) / 5
    )
    assert system["contention_pressure_ratio"] == pytest.approx(1.0)
    assert system["contention_adjusted_equivalent_ops_per_second"] == pytest.approx(
        128 / 5e-9
    )
    assert system["contention_limited_tier"] == "compute"
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
        source_quality=SourceQualityConfig(
            reported_metrics=("throughput", "energy_efficiency"),
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

    payload = report_to_dict(result)

    reference = payload["published_reference"]
    assert reference is not None
    assert reference["source_type"] == "published_calibration"
    assert "not local component-model estimates" in reference["separation_note"]
    assert reference["provenance"]["doi"] == "10.1038/s41586-025-08786-6"
    assert reference["reported"]["reported_tops"] == pytest.approx(8.19)
    assert reference["source_quality"]["confidence_grade"] == "A"
    assert reference["source_quality"]["local_surrogate_type"] == (
        "direct_matrix_vector"
    )
    assert reference["source_quality"]["coverage"]["throughput"] == "reported"
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
