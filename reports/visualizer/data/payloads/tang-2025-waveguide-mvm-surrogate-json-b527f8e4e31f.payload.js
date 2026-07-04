window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["tang_2025_waveguide_mvm_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Tang 2025 waveguide-multiplexed MVM surrogate",
    "description": "Source-backed card for the Optica 2025 waveguide-multiplexed photonic MVM processor using multiport photodetectors. The local workload matches the demonstrated 4x4 MVM primitive as a dense bookkeeping surrogate only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 1,
      "k": 4,
      "n": 4
    },
    "macs": 16,
    "equivalent_ops": 32,
    "output_elements": 4
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
      "adc_conversions": 4,
      "vector_dac_conversions": 4,
      "weight_dac_conversions": 16,
      "dac_conversions": 20
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 4,
      "weight_operand_read_bytes": 16,
      "output_write_bytes": 4,
      "total_interface_bytes": 24,
      "macs_per_byte": 0.6666666666666666,
      "equivalent_ops_per_byte": 1.3333333333333333,
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
          "read_bytes": 20.0,
          "write_bytes": 4.0,
          "total_bytes": 24.0,
          "read_energy_pj": 0.4,
          "write_energy_pj": 0.08,
          "total_energy_pj": 0.48000000000000004,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.0234375,
          "contention_adjusted_transfer_time_ns": 0.0234375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.0234375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "system_energy_share": 0.001909672491167765,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.0234375,
          "contention_adjusted_transfer_pressure_ratio": 0.0234375,
          "compute_window_required_bandwidth_bytes_per_ns": 24.0,
          "contention_bandwidth_utilization": 0.0234375,
          "contention_bandwidth_headroom_bytes_per_ns": 1000.0,
          "contention_bandwidth_headroom_ratio": 42.666666666666664
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 20.0,
          "write_bytes": 4.0,
          "total_bytes": 24.0,
          "read_energy_pj": 4.0,
          "write_energy_pj": 0.8,
          "total_energy_pj": 4.8,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.09375,
          "contention_adjusted_transfer_time_ns": 0.09375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.09375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266144,
          "system_energy_share": 0.019096724911677646,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.09375,
          "contention_adjusted_transfer_pressure_ratio": 0.09375,
          "compute_window_required_bandwidth_bytes_per_ns": 24.0,
          "contention_bandwidth_utilization": 0.09375,
          "contention_bandwidth_headroom_bytes_per_ns": 232.0,
          "contention_bandwidth_headroom_ratio": 10.666666666666666
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 20.0,
          "write_bytes": 4.0,
          "total_bytes": 24.0,
          "read_energy_pj": 200.0,
          "write_energy_pj": 40.0,
          "total_energy_pj": 240.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 1.5,
          "contention_adjusted_transfer_time_ns": 1.5,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 1.5,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9548362455838824,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 1.5,
          "contention_adjusted_transfer_pressure_ratio": 1.5,
          "compute_window_required_bandwidth_bytes_per_ns": 24.0,
          "contention_bandwidth_utilization": 1.5,
          "contention_bandwidth_headroom_bytes_per_ns": -8.0,
          "contention_bandwidth_headroom_ratio": 0.6666666666666666
        }
      },
      "local_compute_and_conversion_energy_pj": 6.072,
      "total_movement_energy_pj": 245.28,
      "total_system_energy_pj": 251.352,
      "system_energy_per_mac_pj": 15.7095,
      "system_energy_per_op_pj": 7.85475,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 6.072,
          "share": 0.024157357013272224
        },
        "sram": {
          "energy_pj": 0.48000000000000004,
          "share": 0.001909672491167765
        },
        "intermediate": {
          "energy_pj": 4.8,
          "share": 0.019096724911677646
        },
        "off_chip": {
          "energy_pj": 240.0,
          "share": 0.9548362455838824
        },
        "movement_total": {
          "energy_pj": 245.28,
          "share": 0.9758426429867277
        },
        "total_system_energy_pj": 251.352,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.024157357013272224,
      "movement_energy_share": 0.9758426429867277,
      "movement_to_compute_energy_ratio": 40.39525691699605,
      "total_hierarchy_bytes": 72.0,
      "hierarchy_equivalent_ops_per_byte": 0.4444444444444444,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 1.5,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 1.5,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9548362455838824,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 1.5,
      "min_tier_contention_bandwidth_headroom_ratio": 0.6666666666666666,
      "max_transfer_time_ns": 1.5,
      "serial_transfer_time_ns": 1.6171875,
      "effective_transfer_time_ns": 1.5,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 1.5,
      "contention_adjusted_serial_transfer_time_ns": 1.6171875,
      "contention_adjusted_effective_transfer_time_ns": 1.5,
      "calibration_adjusted_effective_transfer_time_ns": 1.5,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 1.5,
      "bandwidth_limited_batch_latency_ns": 1.5,
      "bandwidth_pressure_ratio": 1.5,
      "bandwidth_limited_equivalent_ops_per_second": 21333333333.333332,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 1.5,
      "contention_adjusted_transfer_to_compute_time_ratio": 1.5,
      "contention_pressure_ratio": 1.5,
      "contention_adjusted_equivalent_ops_per_second": 21333333333.333332,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.008,
      "laser_electrical_pj": 0.032,
      "detector_pj": 0.04,
      "adc_pj": 2.0,
      "vector_dac_pj": 0.8,
      "weight_dac_pj": 3.2,
      "dac_pj": 4.0,
      "total_pj": 6.072,
      "energy_per_mac_pj": 0.3795,
      "energy_per_op_pj": 0.18975,
      "peripheral_share": 0.994729907773386
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
      "steady_state_equivalent_ops_per_second": 32000000000.0
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
      "source_title": "Waveguide-multiplexed photonic matrix-vector multiplication processor using multiport photodetectors",
      "source_url": "https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-6-812",
      "doi": "10.1364/OPTICA.552023",
      "venue": "Optica 12, 812-820 (2025)",
      "claim_status": "paper-reported 4x4 MVM and multiport photodetector metrics; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Waveguide-multiplexed intensity MVM processor with multiport Ge photodetectors",
      "additional_metrics": {
        "demonstrated_mvm_shape": "4x4",
        "photodetector_ports": 16,
        "photodetector_3db_bandwidth_ghz": 11.8,
        "photodetector_bias_voltage_v": -3,
        "projected_scaled_ports": 250,
        "projected_scaled_bandwidth_ghz": 6.1,
        "iris_accuracy_percent": 93.3,
        "fashion_mnist_sim_accuracy_percent": 90.53,
        "surrogate_mapping": "m=1, k=4, n=4 encodes the demonstrated 4x4 MVM primitive; it does not model multiport photodetector analog summing physics."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Waveguide-multiplexed photonic matrix-vector multiplication processor using multiport photodetectors",
      "source_doi": "10.1364/OPTICA.552023",
      "reported_metrics": [
        "photodetector_bandwidth",
        "primitive_shape",
        "scaled_port_projection",
        "task_accuracy"
      ],
      "local_surrogate_type": "direct_4x4_waveguide_mvm_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "Direct primitive shape and detector bandwidth are reported, but energy and exact system timing are not converted into local model outputs."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Waveguide-multiplexed intensity MVM processor with multiport Ge photodetectors",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Demonstrated mvm shape",
          "quoted_value": "4x4",
          "source_location": "published_calibration.additional_metrics.demonstrated_mvm_shape",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Photodetector ports",
          "quoted_value": "16",
          "source_location": "published_calibration.additional_metrics.photodetector_ports",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Photodetector 3db bandwidth ghz",
          "quoted_value": "11.8",
          "source_location": "published_calibration.additional_metrics.photodetector_3db_bandwidth_ghz",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Photodetector bias voltage v",
          "quoted_value": "-3",
          "source_location": "published_calibration.additional_metrics.photodetector_bias_voltage_v",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Projected scaled ports",
          "quoted_value": "250",
          "source_location": "published_calibration.additional_metrics.projected_scaled_ports",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Projected scaled bandwidth ghz",
          "quoted_value": "6.1",
          "source_location": "published_calibration.additional_metrics.projected_scaled_bandwidth_ghz",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Iris accuracy percent",
          "quoted_value": "93.3",
          "source_location": "published_calibration.additional_metrics.iris_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Fashion mnist sim accuracy percent",
          "quoted_value": "90.53",
          "source_location": "published_calibration.additional_metrics.fashion_mnist_sim_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=1, k=4, n=4 encodes the demonstrated 4x4 MVM primitive; it does not model multiport photodetector analog summing physics.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: direct_4x4_waveguide_mvm_surrogate.",
        "Direct primitive shape and detector bandwidth are reported, but energy and exact system timing are not converted into local model outputs.",
        "The local card uses a dense 4x4 MVM bookkeeping surrogate for the paper's waveguide-multiplexed MVM demonstration.",
        "Paper-reported photodetector bandwidth, port scaling, and task accuracy remain published reference metadata.",
        "Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "claim_status=paper-reported 4x4 MVM and multiport photodetector metrics; matmul-surrogate local model",
        "source_doi=10.1364/OPTICA.552023",
        "source_quality_grade=B",
        "coverage.accuracy=reported",
        "coverage.area=not_reported",
        "coverage.energy=not_reported",
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
    "The local card uses a dense 4x4 MVM bookkeeping surrogate for the paper's waveguide-multiplexed MVM demonstration.",
    "Paper-reported photodetector bandwidth, port scaling, and task accuracy remain published reference metadata.",
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
    "source_title": "Waveguide-multiplexed photonic matrix-vector multiplication processor using multiport photodetectors",
    "source_url": "https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-6-812",
    "doi": "10.1364/OPTICA.552023",
    "venue": "Optica 12, 812-820 (2025)",
    "claim_status": "paper-reported 4x4 MVM and multiport photodetector metrics; matmul-surrogate local model"
  }
}
;
