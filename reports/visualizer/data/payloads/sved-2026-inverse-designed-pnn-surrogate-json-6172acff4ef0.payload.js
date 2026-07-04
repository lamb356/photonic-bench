window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["sved_2026_inverse_designed_pnn_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Sved 2026 inverse-designed PNN surrogate",
    "description": "Source-backed card for the Nature Communications 2026 inverse-designed nanophotonic neural network accelerator. The local workload is a compact 16-feature classifier tile surrogate only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 1,
      "k": 16,
      "n": 10
    },
    "macs": 160,
    "equivalent_ops": 320,
    "output_elements": 10
  },
  "model_inputs": {
    "device": {
      "optical_mac_energy_fj": 0.5,
      "laser_wall_plug_efficiency": 0.25,
      "photodetector_energy_fj_per_sample": 10.0,
      "adc": {
        "bits": 8,
        "energy_pj_per_conversion": 0.5
      },
      "dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.2
      },
      "vector_dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.2
      },
      "weight_dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.2
      }
    },
    "execution": {
      "batch_size": 1,
      "vector_reuse_factor": 1,
      "weight_reuse_factor": 1,
      "weight_stationary": true,
      "pipeline": {
        "stages": 1,
        "cycle_time_ns": null
      }
    },
    "system": {
      "profile": "default",
      "profile_overrides": [],
      "scenario": {
        "name": "default",
        "description": "PhotonicBench baseline: local SRAM plus a conservative generic off-chip/DRAM tier matching the historical defaults.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "single_client",
        "contention_preset_description": "Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband.",
        "overlap_model": "profile_timing_mode",
        "scenario_provenance": {
          "status": "source-context-plus-local-parameters",
          "calibration_scope": "Historical PhotonicBench SRAM/intermediate/off-chip defaults; tier numbers are local assumptions.",
          "sources": [
            {
              "title": "Computing's energy problem (and what we can do about it)",
              "url": "https://doi.org/10.1109/ISSCC.2014.6757323",
              "reference_id": "10.1109/ISSCC.2014.6757323",
              "evidence_type": "memory-energy hierarchy context",
              "supports": [
                "local SRAM/intermediate/off-chip tier separation",
                "data movement can dominate efficient compute"
              ]
            }
          ],
          "local_assumptions": [
            "SRAM, intermediate, and off-chip pJ/byte and bandwidth values are PhotonicBench defaults, not paper-measured hardware values.",
            "The scenario is a conservative baseline for sensitivity comparisons."
          ],
          "reviewer_note": "Use this as a baseline scenario only; prefer a named profile when the card is intended to stress a specific hierarchy behavior."
        },
        "contention_provenance": {
          "status": "local-baseline",
          "calibration_scope": "Dedicated path: one modeled client, no arbitration loss, and no calibration/control guardband.",
          "sources": [],
          "local_assumptions": [
            "shared_bandwidth_clients=1, arbitration_efficiency=1, and calibration_overhead_fraction=0 are local baseline assumptions."
          ],
          "reviewer_note": "Use as the no-contention reference point."
        },
        "assumptions": {
          "shared_bandwidth_clients": 1.0,
          "arbitration_efficiency": 1.0,
          "calibration_overhead_fraction": 0.0,
          "sram": {
            "read_energy_pj_per_byte": 0.02,
            "write_energy_pj_per_byte": 0.02,
            "bandwidth_bytes_per_ns": 1024.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          },
          "intermediate": {
            "read_energy_pj_per_byte": 0.2,
            "write_energy_pj_per_byte": 0.2,
            "bandwidth_bytes_per_ns": 256.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          },
          "off_chip": {
            "read_energy_pj_per_byte": 10.0,
            "write_energy_pj_per_byte": 10.0,
            "bandwidth_bytes_per_ns": 16.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          }
        },
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "single_client",
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0,
        "overlap_model": "profile_timing_mode"
      },
      "sram": {
        "read_energy_pj_per_byte": 0.02,
        "write_energy_pj_per_byte": 0.02,
        "bandwidth_bytes_per_ns": 1024.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0
      },
      "intermediate": {
        "read_energy_pj_per_byte": 0.2,
        "write_energy_pj_per_byte": 0.2,
        "bandwidth_bytes_per_ns": 256.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0
      },
      "off_chip": {
        "read_energy_pj_per_byte": 10.0,
        "write_energy_pj_per_byte": 10.0,
        "bandwidth_bytes_per_ns": 16.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0
      }
    },
    "timing": {
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 1.0
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 10,
      "vector_dac_conversions": 16,
      "weight_dac_conversions": 160,
      "dac_conversions": 176
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 16,
      "weight_operand_read_bytes": 160,
      "output_write_bytes": 10,
      "total_interface_bytes": 186,
      "macs_per_byte": 0.8602150537634409,
      "equivalent_ops_per_byte": 1.7204301075268817,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "system": {
      "profile": "default",
      "profile_overrides": [],
      "memory_scenario": {
        "name": "default",
        "description": "PhotonicBench baseline: local SRAM plus a conservative generic off-chip/DRAM tier matching the historical defaults.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "single_client",
        "contention_preset_description": "Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband.",
        "overlap_model": "profile_timing_mode",
        "scenario_provenance": {
          "status": "source-context-plus-local-parameters",
          "calibration_scope": "Historical PhotonicBench SRAM/intermediate/off-chip defaults; tier numbers are local assumptions.",
          "sources": [
            {
              "title": "Computing's energy problem (and what we can do about it)",
              "url": "https://doi.org/10.1109/ISSCC.2014.6757323",
              "reference_id": "10.1109/ISSCC.2014.6757323",
              "evidence_type": "memory-energy hierarchy context",
              "supports": [
                "local SRAM/intermediate/off-chip tier separation",
                "data movement can dominate efficient compute"
              ]
            }
          ],
          "local_assumptions": [
            "SRAM, intermediate, and off-chip pJ/byte and bandwidth values are PhotonicBench defaults, not paper-measured hardware values.",
            "The scenario is a conservative baseline for sensitivity comparisons."
          ],
          "reviewer_note": "Use this as a baseline scenario only; prefer a named profile when the card is intended to stress a specific hierarchy behavior."
        },
        "contention_provenance": {
          "status": "local-baseline",
          "calibration_scope": "Dedicated path: one modeled client, no arbitration loss, and no calibration/control guardband.",
          "sources": [],
          "local_assumptions": [
            "shared_bandwidth_clients=1, arbitration_efficiency=1, and calibration_overhead_fraction=0 are local baseline assumptions."
          ],
          "reviewer_note": "Use as the no-contention reference point."
        },
        "assumptions": {
          "shared_bandwidth_clients": 1.0,
          "arbitration_efficiency": 1.0,
          "calibration_overhead_fraction": 0.0,
          "sram": {
            "read_energy_pj_per_byte": 0.02,
            "write_energy_pj_per_byte": 0.02,
            "bandwidth_bytes_per_ns": 1024.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          },
          "intermediate": {
            "read_energy_pj_per_byte": 0.2,
            "write_energy_pj_per_byte": 0.2,
            "bandwidth_bytes_per_ns": 256.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          },
          "off_chip": {
            "read_energy_pj_per_byte": 10.0,
            "write_energy_pj_per_byte": 10.0,
            "bandwidth_bytes_per_ns": 16.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          }
        },
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "single_client",
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0,
        "overlap_model": "profile_timing_mode"
      },
      "contention_preset": "single_client",
      "contention_overlap_model": "profile_timing_mode",
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 176.0,
          "write_bytes": 10.0,
          "total_bytes": 186.0,
          "read_energy_pj": 3.52,
          "write_energy_pj": 0.2,
          "total_energy_pj": 3.72,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.181640625,
          "contention_adjusted_transfer_time_ns": 0.181640625,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.181640625,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.0019160048209153559,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.181640625,
          "contention_adjusted_transfer_pressure_ratio": 0.181640625,
          "compute_window_required_bandwidth_bytes_per_ns": 186.0,
          "contention_bandwidth_utilization": 0.181640625,
          "contention_bandwidth_headroom_bytes_per_ns": 838.0,
          "contention_bandwidth_headroom_ratio": 5.505376344086022
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 176.0,
          "write_bytes": 10.0,
          "total_bytes": 186.0,
          "read_energy_pj": 35.2,
          "write_energy_pj": 2.0,
          "total_energy_pj": 37.2,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.7265625,
          "contention_adjusted_transfer_time_ns": 0.7265625,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.7265625,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.01916004820915356,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.7265625,
          "contention_adjusted_transfer_pressure_ratio": 0.7265625,
          "compute_window_required_bandwidth_bytes_per_ns": 186.0,
          "contention_bandwidth_utilization": 0.7265625,
          "contention_bandwidth_headroom_bytes_per_ns": 70.0,
          "contention_bandwidth_headroom_ratio": 1.3763440860215055
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 176.0,
          "write_bytes": 10.0,
          "total_bytes": 186.0,
          "read_energy_pj": 1760.0,
          "write_energy_pj": 100.0,
          "total_energy_pj": 1860.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 11.625,
          "contention_adjusted_transfer_time_ns": 11.625,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 11.625,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.958002410457678,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 11.625,
          "contention_adjusted_transfer_pressure_ratio": 11.625,
          "compute_window_required_bandwidth_bytes_per_ns": 186.0,
          "contention_bandwidth_utilization": 11.625,
          "contention_bandwidth_headroom_bytes_per_ns": -170.0,
          "contention_bandwidth_headroom_ratio": 0.08602150537634409
        }
      },
      "local_compute_and_conversion_energy_pj": 40.620000000000005,
      "total_movement_energy_pj": 1900.92,
      "total_system_energy_pj": 1941.54,
      "system_energy_per_mac_pj": 12.134625,
      "system_energy_per_op_pj": 6.0673125,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 40.620000000000005,
          "share": 0.02092153651225316
        },
        "sram": {
          "energy_pj": 3.72,
          "share": 0.0019160048209153559
        },
        "intermediate": {
          "energy_pj": 37.2,
          "share": 0.01916004820915356
        },
        "off_chip": {
          "energy_pj": 1860.0,
          "share": 0.958002410457678
        },
        "movement_total": {
          "energy_pj": 1900.92,
          "share": 0.9790784634877469
        },
        "total_system_energy_pj": 1941.54,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.02092153651225316,
      "movement_energy_share": 0.9790784634877469,
      "movement_to_compute_energy_ratio": 46.797636632200884,
      "total_hierarchy_bytes": 558.0,
      "hierarchy_equivalent_ops_per_byte": 0.5734767025089605,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 11.625,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 11.625,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.958002410457678,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 11.625,
      "min_tier_contention_bandwidth_headroom_ratio": 0.08602150537634409,
      "max_transfer_time_ns": 11.625,
      "serial_transfer_time_ns": 12.533203125,
      "effective_transfer_time_ns": 11.625,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 11.625,
      "contention_adjusted_serial_transfer_time_ns": 12.533203125,
      "contention_adjusted_effective_transfer_time_ns": 11.625,
      "calibration_adjusted_effective_transfer_time_ns": 11.625,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 11.625,
      "bandwidth_limited_batch_latency_ns": 11.625,
      "bandwidth_pressure_ratio": 11.625,
      "bandwidth_limited_equivalent_ops_per_second": 27526881720.430103,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 11.625,
      "contention_adjusted_transfer_to_compute_time_ratio": 11.625,
      "contention_pressure_ratio": 11.625,
      "contention_adjusted_equivalent_ops_per_second": 27526881720.430103,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.08,
      "laser_electrical_pj": 0.32,
      "detector_pj": 0.1,
      "adc_pj": 5.0,
      "vector_dac_pj": 3.2,
      "weight_dac_pj": 32.0,
      "dac_pj": 35.2,
      "total_pj": 40.620000000000005,
      "energy_per_mac_pj": 0.253875,
      "energy_per_op_pj": 0.1269375,
      "peripheral_share": 0.9921221073362876
    },
    "timing": {
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 1.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 1.0,
      "batch_latency_ns": 1.0,
      "steady_state_operations_per_second": 1000000000.0,
      "steady_state_equivalent_ops_per_second": 320000000000.0
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 1.0000000000000002e-10,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "Inverse-designed nanophotonic neural network accelerators for ultra-compact optical computing",
      "source_url": "https://www.nature.com/articles/s41467-026-68648-1",
      "doi": "10.1038/s41467-026-68648-1",
      "venue": "Nature Communications 17, 1059 (2026)",
      "claim_status": "paper-reported inverse-designed PNN density, footprint, and accuracy metrics; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Inverse-designed nanophotonic neural network accelerator on SOI",
      "additional_metrics": {
        "computational_density_parameters_per_mm2": 400000000,
        "mnist_accuracy_percent": 89,
        "mednist_accuracy_percent": 90,
        "mnist_footprint_um2": 400,
        "mednist_footprint_um2": 600,
        "example_patch_input_dimension": 16,
        "single_wavelength_operation": true,
        "surrogate_mapping": "m=1, k=16, n=10 is a compact classifier-head surrogate; it does not reproduce inverse-designed scattering fields."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Inverse-designed nanophotonic neural network accelerators for ultra-compact optical computing",
      "source_doi": "10.1038/s41467-026-68648-1",
      "reported_metrics": [
        "computational_density",
        "footprint",
        "task_accuracy",
        "architecture"
      ],
      "local_surrogate_type": "compact_inverse_designed_pnn_classifier_surrogate",
      "coverage": {
        "throughput": "not_reported",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "reported",
        "precision": "not_reported"
      },
      "confidence_grade": "C",
      "notes": [
        "The source is an accelerator paper with strong density and accuracy evidence, but the local dense tile is not a field-propagation or inverse-design model."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Inverse-designed nanophotonic neural network accelerator on SOI",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Computational density parameters per mm2",
          "quoted_value": "400000000",
          "source_location": "published_calibration.additional_metrics.computational_density_parameters_per_mm2",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Mnist accuracy percent",
          "quoted_value": "89",
          "source_location": "published_calibration.additional_metrics.mnist_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Mednist accuracy percent",
          "quoted_value": "90",
          "source_location": "published_calibration.additional_metrics.mednist_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Mnist footprint um2",
          "quoted_value": "400",
          "source_location": "published_calibration.additional_metrics.mnist_footprint_um2",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Mednist footprint um2",
          "quoted_value": "600",
          "source_location": "published_calibration.additional_metrics.mednist_footprint_um2",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Example patch input dimension",
          "quoted_value": "16",
          "source_location": "published_calibration.additional_metrics.example_patch_input_dimension",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Single wavelength operation",
          "quoted_value": "True",
          "source_location": "published_calibration.additional_metrics.single_wavelength_operation",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=1, k=16, n=10 is a compact classifier-head surrogate; it does not reproduce inverse-designed scattering fields.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: compact_inverse_designed_pnn_classifier_surrogate.",
        "The source is an accelerator paper with strong density and accuracy evidence, but the local dense tile is not a field-propagation or inverse-design model.",
        "The local card uses a 16-feature by 10-class classifier surrogate to keep the accelerator visible in PhotonicBench comparisons.",
        "Published density, footprint, and accuracy are preserved as reference metadata only.",
        "Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "claim_status=paper-reported inverse-designed PNN density, footprint, and accuracy metrics; matmul-surrogate local model",
        "source_doi=10.1038/s41467-026-68648-1",
        "source_quality_grade=C",
        "coverage.accuracy=reported",
        "coverage.area=reported",
        "coverage.energy=not_reported",
        "coverage.precision=not_reported",
        "coverage.throughput=not_reported"
      ],
      "separation_note": "Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs."
    },
    "separation_note": "Published values are paper-reported references or direct unit conversions, not local component-model estimates."
  },
  "calibration_fit": null,
  "assumptions": [
    "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
    "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
    "ADC conversions are counted once per output element.",
    "DAC conversions are counted once per input value for the left and right matmul operands.",
    "Detector energy is counted once per output sample.",
    "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
    "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
    "The local card uses a 16-feature by 10-class classifier surrogate to keep the accelerator visible in PhotonicBench comparisons.",
    "Published density, footprint, and accuracy are preserved as reference metadata only.",
    "Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": {
    "source_title": "Inverse-designed nanophotonic neural network accelerators for ultra-compact optical computing",
    "source_url": "https://www.nature.com/articles/s41467-026-68648-1",
    "doi": "10.1038/s41467-026-68648-1",
    "venue": "Nature Communications 17, 1059 (2026)",
    "claim_status": "paper-reported inverse-designed PNN density, footprint, and accuracy metrics; matmul-surrogate local model"
  }
}
;
