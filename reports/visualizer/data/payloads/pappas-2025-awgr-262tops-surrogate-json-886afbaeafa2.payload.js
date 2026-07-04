window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["pappas_2025_awgr_262tops_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Pappas 2025 AWGR 262 TOPS surrogate",
    "description": "Source-backed card for the APL Photonics 2025 AWGR-based multidimensional photonic AI accelerator. The local workload is a 16x16 dense tile surrogate for the reported 16x16 AWGR tensor engine, not an exact Matrix-by-Tensor-Multiply reproduction."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 16,
      "k": 16,
      "n": 16
    },
    "macs": 4096,
    "equivalent_ops": 8192,
    "output_elements": 256
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
        "cycle_time_ns": 0.03125
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
      "optical_latency_ns": 0.03125,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 0.03125
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 256,
      "vector_dac_conversions": 256,
      "weight_dac_conversions": 256,
      "dac_conversions": 512
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 256,
      "weight_operand_read_bytes": 256,
      "output_write_bytes": 256,
      "total_interface_bytes": 768,
      "macs_per_byte": 5.333333333333333,
      "equivalent_ops_per_byte": 10.666666666666666,
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
          "read_bytes": 512.0,
          "write_bytes": 256.0,
          "total_bytes": 768.0,
          "read_energy_pj": 10.24,
          "write_energy_pj": 5.12,
          "total_energy_pj": 15.36,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.75,
          "contention_adjusted_transfer_time_ns": 0.75,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.75,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.0018986140117714068,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 24.0,
          "contention_adjusted_transfer_pressure_ratio": 24.0,
          "compute_window_required_bandwidth_bytes_per_ns": 24576.0,
          "contention_bandwidth_utilization": 24.0,
          "contention_bandwidth_headroom_bytes_per_ns": -23552.0,
          "contention_bandwidth_headroom_ratio": 0.041666666666666664
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 512.0,
          "write_bytes": 256.0,
          "total_bytes": 768.0,
          "read_energy_pj": 102.4,
          "write_energy_pj": 51.2,
          "total_energy_pj": 153.60000000000002,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 3.0,
          "contention_adjusted_transfer_time_ns": 3.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 3.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.01898614011771407,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 96.0,
          "contention_adjusted_transfer_pressure_ratio": 96.0,
          "compute_window_required_bandwidth_bytes_per_ns": 24576.0,
          "contention_bandwidth_utilization": 96.0,
          "contention_bandwidth_headroom_bytes_per_ns": -24320.0,
          "contention_bandwidth_headroom_ratio": 0.010416666666666666
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 512.0,
          "write_bytes": 256.0,
          "total_bytes": 768.0,
          "read_energy_pj": 5120.0,
          "write_energy_pj": 2560.0,
          "total_energy_pj": 7680.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 48.0,
          "contention_adjusted_transfer_time_ns": 48.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 48.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9493070058857034,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 1536.0,
          "contention_adjusted_transfer_pressure_ratio": 1536.0,
          "compute_window_required_bandwidth_bytes_per_ns": 24576.0,
          "contention_bandwidth_utilization": 1536.0,
          "contention_bandwidth_headroom_bytes_per_ns": -24560.0,
          "contention_bandwidth_headroom_ratio": 0.0006510416666666666
        }
      },
      "local_compute_and_conversion_energy_pj": 241.15200000000002,
      "total_movement_energy_pj": 7848.96,
      "total_system_energy_pj": 8090.112,
      "system_energy_per_mac_pj": 1.975125,
      "system_energy_per_op_pj": 0.9875625,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 241.15200000000002,
          "share": 0.02980823998481109
        },
        "sram": {
          "energy_pj": 15.36,
          "share": 0.0018986140117714068
        },
        "intermediate": {
          "energy_pj": 153.60000000000002,
          "share": 0.01898614011771407
        },
        "off_chip": {
          "energy_pj": 7680.0,
          "share": 0.9493070058857034
        },
        "movement_total": {
          "energy_pj": 7848.96,
          "share": 0.9701917600151889
        },
        "total_system_energy_pj": 8090.112,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.02980823998481109,
      "movement_energy_share": 0.9701917600151889,
      "movement_to_compute_energy_ratio": 32.54777070063694,
      "total_hierarchy_bytes": 2304.0,
      "hierarchy_equivalent_ops_per_byte": 3.5555555555555554,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 1536.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 1536.0,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9493070058857034,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 1536.0,
      "min_tier_contention_bandwidth_headroom_ratio": 0.0006510416666666666,
      "max_transfer_time_ns": 48.0,
      "serial_transfer_time_ns": 51.75,
      "effective_transfer_time_ns": 48.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 48.0,
      "contention_adjusted_serial_transfer_time_ns": 51.75,
      "contention_adjusted_effective_transfer_time_ns": 48.0,
      "calibration_adjusted_effective_transfer_time_ns": 48.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 1536.0,
      "bandwidth_limited_batch_latency_ns": 48.0,
      "bandwidth_pressure_ratio": 1536.0,
      "bandwidth_limited_equivalent_ops_per_second": 170666666666.66666,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 48.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 1536.0,
      "contention_pressure_ratio": 1536.0,
      "contention_adjusted_equivalent_ops_per_second": 170666666666.66666,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 2.048,
      "laser_electrical_pj": 8.192,
      "detector_pj": 2.56,
      "adc_pj": 128.0,
      "vector_dac_pj": 51.2,
      "weight_dac_pj": 51.2,
      "dac_pj": 102.4,
      "total_pj": 241.15200000000002,
      "energy_per_mac_pj": 0.058875000000000004,
      "energy_per_op_pj": 0.029437500000000002,
      "peripheral_share": 0.9660297239915074
    },
    "timing": {
      "optical_latency_ns": 0.03125,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 0.03125,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 0.03125,
      "batch_latency_ns": 0.03125,
      "steady_state_operations_per_second": 32000000000.0,
      "steady_state_equivalent_ops_per_second": 262144000000000.0
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 3.1250000000000005e-12,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser",
      "source_url": "https://pubs.aip.org/aip/app/article/10/11/110805/3372196/A-262-TOPS-hyperdimensional-photonic-AI",
      "doi": "10.1063/5.0271374",
      "venue": "APL Photonics 10, 110805 (2025)",
      "claim_status": "paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "16x16 AWGR Matrix-by-Tensor-Multiply photonic AI accelerator",
      "reported_tops": 262.0,
      "energy_efficiency_including_lasers_tops_per_watt": 3.663003663003663,
      "additional_metrics": {
        "reported_energy_per_op_fj": 273,
        "data_rate_gbaud": 32,
        "awgr_dimension": "16x16",
        "ddos_kappa_score": 0.8652,
        "mnist_accuracy_percent": 92.14,
        "energy_efficiency_note": "3.663 TOPS/W is the direct conversion of the paper's 273 fJ/OP statement.",
        "surrogate_mapping": "m=16, k=16, n=16 is a dense tile surrogate for the 16x16 AWGR engine; not an exact MbTM schedule."
      }
    },
    "derived_unit_conversions": {
      "energy_per_op_including_lasers_pj": 0.273,
      "energy_per_mac_including_lasers_pj": 0.546,
      "total_energy_including_lasers_pj": 2236.416,
      "model_to_published_including_lasers_ratio": 0.10782967032967034
    },
    "source_quality": {
      "source_reference": "A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser",
      "source_doi": "10.1063/5.0271374",
      "reported_metrics": [
        "throughput",
        "energy_per_op",
        "data_rate",
        "accuracy"
      ],
      "local_surrogate_type": "dense_awgr_tile_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "Good throughput, energy, and task-metric coverage; local dense tile is still a surrogate for the reported AWGR MbTM schedule."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "16x16 AWGR Matrix-by-Tensor-Multiply photonic AI accelerator",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Reported throughput",
          "quoted_value": "262.0",
          "source_location": "published_calibration.reported_tops",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Energy efficiency including lasers",
          "quoted_value": "3.663003663003663",
          "source_location": "published_calibration.energy_efficiency_including_lasers_tops_per_watt",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Reported energy per op fj",
          "quoted_value": "273",
          "source_location": "published_calibration.additional_metrics.reported_energy_per_op_fj",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Data rate gbaud",
          "quoted_value": "32",
          "source_location": "published_calibration.additional_metrics.data_rate_gbaud",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Awgr dimension",
          "quoted_value": "16x16",
          "source_location": "published_calibration.additional_metrics.awgr_dimension",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Ddos kappa score",
          "quoted_value": "0.8652",
          "source_location": "published_calibration.additional_metrics.ddos_kappa_score",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Mnist accuracy percent",
          "quoted_value": "92.14",
          "source_location": "published_calibration.additional_metrics.mnist_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Energy efficiency note",
          "quoted_value": "3.663 TOPS/W is the direct conversion of the paper's 273 fJ/OP statement.",
          "source_location": "published_calibration.additional_metrics.energy_efficiency_note",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=16, k=16, n=16 is a dense tile surrogate for the 16x16 AWGR engine; not an exact MbTM schedule.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: dense_awgr_tile_surrogate.",
        "Good throughput, energy, and task-metric coverage; local dense tile is still a surrogate for the reported AWGR MbTM schedule.",
        "Source reports 262 TOPS at 32 Gbaud and a 273 fJ/OP silicon-photonic energy-efficiency analysis; PhotonicBench keeps those values in published_reference.",
        "The local model uses a one-cycle 32 Gbaud timing surrogate and generic converter energy assumptions.",
        "Weight-stationary mode approximates reusing the reported AWGR weight/tensor structure for one dense local tile."
      ],
      "conversion_math": [
        {
          "derived_metric": "energy_per_op_including_lasers_pj",
          "formula": "1 / energy_efficiency_including_lasers_tops_per_watt",
          "inputs": {
            "energy_efficiency_including_lasers_tops_per_watt": 3.663003663003663
          },
          "result": "0.273"
        },
        {
          "derived_metric": "energy_per_mac_including_lasers_pj",
          "formula": "2 / energy_efficiency_including_lasers_tops_per_watt",
          "inputs": {
            "energy_efficiency_including_lasers_tops_per_watt": 3.663003663003663
          },
          "result": "0.546"
        },
        {
          "derived_metric": "total_energy_including_lasers_pj",
          "formula": "equivalent_ops / energy_efficiency_including_lasers_tops_per_watt",
          "inputs": {
            "energy_efficiency_including_lasers_tops_per_watt": 3.663003663003663,
            "equivalent_ops": 8192
          },
          "result": "2236.416"
        },
        {
          "derived_metric": "model_to_published_including_lasers_ratio",
          "formula": "local_model.energy.total_pj / published_reference.derived_unit_conversions.total_energy_including_lasers_pj",
          "inputs": {
            "published_total_energy_including_lasers_pj": 2236.416
          },
          "result": "0.10782967033",
          "note": "Diagnostic ratio only; it does not change local_model or published_reference."
        }
      ],
      "confidence_flags": [
        "claim_status=paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model",
        "source_doi=10.1063/5.0271374",
        "source_quality_grade=B",
        "coverage.accuracy=reported",
        "coverage.area=not_reported",
        "coverage.energy=reported",
        "coverage.precision=not_reported",
        "coverage.throughput=reported"
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
    "Source reports 262 TOPS at 32 Gbaud and a 273 fJ/OP silicon-photonic energy-efficiency analysis; PhotonicBench keeps those values in published_reference.",
    "The local model uses a one-cycle 32 Gbaud timing surrogate and generic converter energy assumptions.",
    "Weight-stationary mode approximates reusing the reported AWGR weight/tensor structure for one dense local tile.",
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
    "source_title": "A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser",
    "source_url": "https://pubs.aip.org/aip/app/article/10/11/110805/3372196/A-262-TOPS-hyperdimensional-photonic-AI",
    "doi": "10.1063/5.0271374",
    "venue": "APL Photonics 10, 110805 (2025)",
    "claim_status": "paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model"
  }
}
;
