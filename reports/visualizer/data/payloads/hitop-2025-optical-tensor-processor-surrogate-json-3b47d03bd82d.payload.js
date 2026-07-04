window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["hitop_2025_optical_tensor_processor_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "HITOP 2025 optical tensor processor surrogate",
    "description": "Source-backed card for the Science Advances 2025 HITOP optical tensor processor. The published system uses space-time-wavelength hypermultiplexing; this config uses a 64x64 dense local matmul surrogate for PhotonicBench comparison only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 64,
      "k": 64,
      "n": 64
    },
    "macs": 262144,
    "equivalent_ops": 524288,
    "output_elements": 4096
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
      "adc_conversions": 4096,
      "vector_dac_conversions": 4096,
      "weight_dac_conversions": 4096,
      "dac_conversions": 8192
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 4096,
      "weight_operand_read_bytes": 4096,
      "output_write_bytes": 4096,
      "total_interface_bytes": 12288,
      "macs_per_byte": 21.333333333333332,
      "equivalent_ops_per_byte": 42.666666666666664,
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
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 163.84,
          "write_energy_pj": 81.92,
          "total_energy_pj": 245.76,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 12.0,
          "contention_adjusted_transfer_time_ns": 12.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 12.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.001892863903085368,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 12.0,
          "contention_adjusted_transfer_pressure_ratio": 12.0,
          "compute_window_required_bandwidth_bytes_per_ns": 12288.0,
          "contention_bandwidth_utilization": 12.0,
          "contention_bandwidth_headroom_bytes_per_ns": -11264.0,
          "contention_bandwidth_headroom_ratio": 0.08333333333333333
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 1638.4,
          "write_energy_pj": 819.2,
          "total_energy_pj": 2457.6000000000004,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 48.0,
          "contention_adjusted_transfer_time_ns": 48.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 48.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.018928639030853685,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 48.0,
          "contention_adjusted_transfer_pressure_ratio": 48.0,
          "compute_window_required_bandwidth_bytes_per_ns": 12288.0,
          "contention_bandwidth_utilization": 48.0,
          "contention_bandwidth_headroom_bytes_per_ns": -12032.0,
          "contention_bandwidth_headroom_ratio": 0.020833333333333332
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 81920.0,
          "write_energy_pj": 40960.0,
          "total_energy_pj": 122880.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 768.0,
          "contention_adjusted_transfer_time_ns": 768.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 768.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9464319515426841,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 768.0,
          "contention_adjusted_transfer_pressure_ratio": 768.0,
          "compute_window_required_bandwidth_bytes_per_ns": 12288.0,
          "contention_bandwidth_utilization": 768.0,
          "contention_bandwidth_headroom_bytes_per_ns": -12272.0,
          "contention_bandwidth_headroom_ratio": 0.0013020833333333333
        }
      },
      "local_compute_and_conversion_energy_pj": 4251.648,
      "total_movement_energy_pj": 125583.36,
      "total_system_energy_pj": 129835.008,
      "system_energy_per_mac_pj": 0.49528125,
      "system_energy_per_op_pj": 0.247640625,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 4251.648,
          "share": 0.03274654552337687
        },
        "sram": {
          "energy_pj": 245.76,
          "share": 0.001892863903085368
        },
        "intermediate": {
          "energy_pj": 2457.6000000000004,
          "share": 0.018928639030853685
        },
        "off_chip": {
          "energy_pj": 122880.0,
          "share": 0.9464319515426841
        },
        "movement_total": {
          "energy_pj": 125583.36,
          "share": 0.9672534544766231
        },
        "total_system_energy_pj": 129835.008,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.03274654552337687,
      "movement_energy_share": 0.9672534544766231,
      "movement_to_compute_energy_ratio": 29.53757225433526,
      "total_hierarchy_bytes": 36864.0,
      "hierarchy_equivalent_ops_per_byte": 14.222222222222221,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 768.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 768.0,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9464319515426841,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 768.0,
      "min_tier_contention_bandwidth_headroom_ratio": 0.0013020833333333333,
      "max_transfer_time_ns": 768.0,
      "serial_transfer_time_ns": 828.0,
      "effective_transfer_time_ns": 768.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 768.0,
      "contention_adjusted_serial_transfer_time_ns": 828.0,
      "contention_adjusted_effective_transfer_time_ns": 768.0,
      "calibration_adjusted_effective_transfer_time_ns": 768.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 768.0,
      "bandwidth_limited_batch_latency_ns": 768.0,
      "bandwidth_pressure_ratio": 768.0,
      "bandwidth_limited_equivalent_ops_per_second": 682666666666.6666,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 768.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 768.0,
      "contention_pressure_ratio": 768.0,
      "contention_adjusted_equivalent_ops_per_second": 682666666666.6666,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 131.072,
      "laser_electrical_pj": 524.288,
      "detector_pj": 40.96,
      "adc_pj": 2048.0,
      "vector_dac_pj": 819.2,
      "weight_dac_pj": 819.2,
      "dac_pj": 1638.4,
      "total_pj": 4251.648,
      "energy_per_mac_pj": 0.01621875,
      "energy_per_op_pj": 0.008109375,
      "peripheral_share": 0.8766859344894027
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
      "steady_state_equivalent_ops_per_second": 524288000000000.0
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
      "source_title": "Hypermultiplexed integrated photonics-based optical tensor processor",
      "source_url": "https://www.science.org/doi/10.1126/sciadv.adu0228",
      "doi": "10.1126/sciadv.adu0228",
      "venue": "Science Advances 11, eadu0228 (2025)",
      "claim_status": "paper-reported HITOP efficiency/scale claims; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Space-time-wavelength hypermultiplexed integrated photonic tensor processor",
      "energy_efficiency_including_lasers_tops_per_watt": 40.0,
      "additional_metrics": {
        "reported_throughput_note": "Source reports trillions of operations per second but no single scalar TOPS value is encoded in this card.",
        "reported_energy_per_op_fj_from_efficiency": 25,
        "model_parameters_validated": 405000,
        "multiplexing_dimensions": "space-time-wavelength",
        "dataset_url": "https://datadryad.org/dataset/doi:10.5061/dryad.kprr4xhgj",
        "surrogate_mapping": "m=64, k=64, n=64 is a dense local surrogate for HITOP tensor processing; not an exact space-time-wavelength streaming schedule."
      }
    },
    "derived_unit_conversions": {
      "energy_per_op_including_lasers_pj": 0.025,
      "energy_per_mac_including_lasers_pj": 0.05,
      "total_energy_including_lasers_pj": 13107.2,
      "model_to_published_including_lasers_ratio": 0.32437499999999997
    },
    "source_quality": {
      "source_reference": "Hypermultiplexed integrated photonics-based optical tensor processor",
      "source_doi": "10.1126/sciadv.adu0228",
      "reported_metrics": [
        "energy_efficiency",
        "scale",
        "model_size",
        "dataset"
      ],
      "local_surrogate_type": "dense_hypermultiplexed_tensor_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "reported",
        "accuracy": "not_reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "C",
      "notes": [
        "Useful efficiency and scale evidence, but this card does not encode a single reported TOPS value or exact HITOP streaming schedule."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Space-time-wavelength hypermultiplexed integrated photonic tensor processor",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Energy efficiency including lasers",
          "quoted_value": "40.0",
          "source_location": "published_calibration.energy_efficiency_including_lasers_tops_per_watt",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Reported throughput note",
          "quoted_value": "Source reports trillions of operations per second but no single scalar TOPS value is encoded in this card.",
          "source_location": "published_calibration.additional_metrics.reported_throughput_note",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported energy per op fj from efficiency",
          "quoted_value": "25",
          "source_location": "published_calibration.additional_metrics.reported_energy_per_op_fj_from_efficiency",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Model parameters validated",
          "quoted_value": "405000",
          "source_location": "published_calibration.additional_metrics.model_parameters_validated",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Multiplexing dimensions",
          "quoted_value": "space-time-wavelength",
          "source_location": "published_calibration.additional_metrics.multiplexing_dimensions",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Dataset url",
          "quoted_value": "https://datadryad.org/dataset/doi:10.5061/dryad.kprr4xhgj",
          "source_location": "published_calibration.additional_metrics.dataset_url",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=64, k=64, n=64 is a dense local surrogate for HITOP tensor processing; not an exact space-time-wavelength streaming schedule.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: dense_hypermultiplexed_tensor_surrogate.",
        "Useful efficiency and scale evidence, but this card does not encode a single reported TOPS value or exact HITOP streaming schedule.",
        "Source reports HITOP operating at 40 TOPS/W and trillion-operation-per-second scale; PhotonicBench keeps those values as published references.",
        "Local timing, converter energy, system tiers, and noise settings are generic PhotonicBench assumptions, not HITOP device extraction.",
        "Weight-stationary mode is used only to model one reused surrogate right operand within a dense local tile."
      ],
      "conversion_math": [
        {
          "derived_metric": "energy_per_op_including_lasers_pj",
          "formula": "1 / energy_efficiency_including_lasers_tops_per_watt",
          "inputs": {
            "energy_efficiency_including_lasers_tops_per_watt": 40.0
          },
          "result": "0.025"
        },
        {
          "derived_metric": "energy_per_mac_including_lasers_pj",
          "formula": "2 / energy_efficiency_including_lasers_tops_per_watt",
          "inputs": {
            "energy_efficiency_including_lasers_tops_per_watt": 40.0
          },
          "result": "0.05"
        },
        {
          "derived_metric": "total_energy_including_lasers_pj",
          "formula": "equivalent_ops / energy_efficiency_including_lasers_tops_per_watt",
          "inputs": {
            "energy_efficiency_including_lasers_tops_per_watt": 40.0,
            "equivalent_ops": 524288
          },
          "result": "13107.2"
        },
        {
          "derived_metric": "model_to_published_including_lasers_ratio",
          "formula": "local_model.energy.total_pj / published_reference.derived_unit_conversions.total_energy_including_lasers_pj",
          "inputs": {
            "published_total_energy_including_lasers_pj": 13107.2
          },
          "result": "0.324375",
          "note": "Diagnostic ratio only; it does not change local_model or published_reference."
        }
      ],
      "confidence_flags": [
        "claim_status=paper-reported HITOP efficiency/scale claims; matmul-surrogate local model",
        "source_doi=10.1126/sciadv.adu0228",
        "source_quality_grade=C",
        "coverage.accuracy=not_reported",
        "coverage.area=not_reported",
        "coverage.energy=reported",
        "coverage.precision=not_reported",
        "coverage.throughput=derived"
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
    "Source reports HITOP operating at 40 TOPS/W and trillion-operation-per-second scale; PhotonicBench keeps those values as published references.",
    "Local timing, converter energy, system tiers, and noise settings are generic PhotonicBench assumptions, not HITOP device extraction.",
    "Weight-stationary mode is used only to model one reused surrogate right operand within a dense local tile.",
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
    "source_title": "Hypermultiplexed integrated photonics-based optical tensor processor",
    "source_url": "https://www.science.org/doi/10.1126/sciadv.adu0228",
    "doi": "10.1126/sciadv.adu0228",
    "venue": "Science Advances 11, eadu0228 (2025)",
    "claim_status": "paper-reported HITOP efficiency/scale claims; matmul-surrogate local model"
  }
}
;
