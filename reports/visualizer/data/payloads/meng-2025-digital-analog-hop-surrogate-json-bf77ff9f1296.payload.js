window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["meng_2025_digital_analog_hop_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Meng 2025 digital-analog HOP MVM surrogate",
    "description": "Source-backed card for the Nature Communications 2025 digital-analog hybrid optical processor. The local workload is a 3x3 convolution-kernel MVM surrogate for the cascaded-MRM HOP demonstration only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 1,
      "k": 9,
      "n": 1
    },
    "macs": 9,
    "equivalent_ops": 18,
    "output_elements": 1
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
      "adc_conversions": 1,
      "vector_dac_conversions": 9,
      "weight_dac_conversions": 9,
      "dac_conversions": 18
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 9,
      "weight_operand_read_bytes": 9,
      "output_write_bytes": 1,
      "total_interface_bytes": 19,
      "macs_per_byte": 0.47368421052631576,
      "equivalent_ops_per_byte": 0.9473684210526315,
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
          "read_bytes": 18.0,
          "write_bytes": 1.0,
          "total_bytes": 19.0,
          "read_energy_pj": 0.36,
          "write_energy_pj": 0.02,
          "total_energy_pj": 0.38,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.0185546875,
          "contention_adjusted_transfer_time_ns": 0.0185546875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.0185546875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.0019162111462976785,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.0185546875,
          "contention_adjusted_transfer_pressure_ratio": 0.0185546875,
          "compute_window_required_bandwidth_bytes_per_ns": 19.0,
          "contention_bandwidth_utilization": 0.0185546875,
          "contention_bandwidth_headroom_bytes_per_ns": 1005.0,
          "contention_bandwidth_headroom_ratio": 53.89473684210526
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 18.0,
          "write_bytes": 1.0,
          "total_bytes": 19.0,
          "read_energy_pj": 3.6,
          "write_energy_pj": 0.2,
          "total_energy_pj": 3.8000000000000003,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.07421875,
          "contention_adjusted_transfer_time_ns": 0.07421875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.07421875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.019162111462976784,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.07421875,
          "contention_adjusted_transfer_pressure_ratio": 0.07421875,
          "compute_window_required_bandwidth_bytes_per_ns": 19.0,
          "contention_bandwidth_utilization": 0.07421875,
          "contention_bandwidth_headroom_bytes_per_ns": 237.0,
          "contention_bandwidth_headroom_ratio": 13.473684210526315
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 18.0,
          "write_bytes": 1.0,
          "total_bytes": 19.0,
          "read_energy_pj": 180.0,
          "write_energy_pj": 10.0,
          "total_energy_pj": 190.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 1.1875,
          "contention_adjusted_transfer_time_ns": 1.1875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 1.1875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9581055731488393,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 1.1875,
          "contention_adjusted_transfer_pressure_ratio": 1.1875,
          "compute_window_required_bandwidth_bytes_per_ns": 19.0,
          "contention_bandwidth_utilization": 1.1875,
          "contention_bandwidth_headroom_bytes_per_ns": -3.0,
          "contention_bandwidth_headroom_ratio": 0.8421052631578947
        }
      },
      "local_compute_and_conversion_energy_pj": 4.128,
      "total_movement_energy_pj": 194.18,
      "total_system_energy_pj": 198.308,
      "system_energy_per_mac_pj": 22.034222222222223,
      "system_energy_per_op_pj": 11.017111111111111,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 4.128,
          "share": 0.02081610424188636
        },
        "sram": {
          "energy_pj": 0.38,
          "share": 0.0019162111462976785
        },
        "intermediate": {
          "energy_pj": 3.8000000000000003,
          "share": 0.019162111462976784
        },
        "off_chip": {
          "energy_pj": 190.0,
          "share": 0.9581055731488393
        },
        "movement_total": {
          "energy_pj": 194.18,
          "share": 0.9791838957581137
        },
        "total_system_energy_pj": 198.308,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.02081610424188636,
      "movement_energy_share": 0.9791838957581137,
      "movement_to_compute_energy_ratio": 47.03972868217054,
      "total_hierarchy_bytes": 57.0,
      "hierarchy_equivalent_ops_per_byte": 0.3157894736842105,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 1.1875,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 1.1875,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9581055731488393,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 1.1875,
      "min_tier_contention_bandwidth_headroom_ratio": 0.8421052631578947,
      "max_transfer_time_ns": 1.1875,
      "serial_transfer_time_ns": 1.2802734375,
      "effective_transfer_time_ns": 1.1875,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 1.1875,
      "contention_adjusted_serial_transfer_time_ns": 1.2802734375,
      "contention_adjusted_effective_transfer_time_ns": 1.1875,
      "calibration_adjusted_effective_transfer_time_ns": 1.1875,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 1.1875,
      "bandwidth_limited_batch_latency_ns": 1.1875,
      "bandwidth_pressure_ratio": 1.1875,
      "bandwidth_limited_equivalent_ops_per_second": 15157894736.842104,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 1.1875,
      "contention_adjusted_transfer_to_compute_time_ratio": 1.1875,
      "contention_pressure_ratio": 1.1875,
      "contention_adjusted_equivalent_ops_per_second": 15157894736.842104,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.0045,
      "laser_electrical_pj": 0.018,
      "detector_pj": 0.01,
      "adc_pj": 0.5,
      "vector_dac_pj": 1.8,
      "weight_dac_pj": 1.8,
      "dac_pj": 3.6,
      "total_pj": 4.128,
      "energy_per_mac_pj": 0.45866666666666667,
      "energy_per_op_pj": 0.22933333333333333,
      "peripheral_share": 0.995639534883721
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
      "steady_state_equivalent_ops_per_second": 18000000000.0
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
      "source_title": "Digital-analog hybrid matrix multiplication processor for optical neural networks",
      "source_url": "https://www.nature.com/articles/s41467-025-62586-0",
      "doi": "10.1038/s41467-025-62586-0",
      "venue": "Nature Communications 16, 7465 (2025)",
      "claim_status": "paper-reported HOP architecture, sample energy, and data-rate metrics; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Digital-analog hybrid optical processor using cascaded microring modulators",
      "additional_metrics": {
        "hop_energy_per_sample_pj": 3.88,
        "analog_scheme_energy_per_sample_pj": 34.88,
        "packaged_cascaded_mrms": 20,
        "hdip_data_rate_gbps_per_mrm": 7.5,
        "hwdr_data_rate_mbps_per_input": 400,
        "yolo_data_rate_mbps_per_input": 300,
        "hdip_input_word_bits": 16,
        "task_kernel_shape": "3x3",
        "surrogate_mapping": "m=1, k=9, n=1 encodes one 3x3 convolution-kernel MVM; it does not reproduce the HOP digital equalization or DSP chain."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Digital-analog hybrid matrix multiplication processor for optical neural networks",
      "source_doi": "10.1038/s41467-025-62586-0",
      "reported_metrics": [
        "architecture",
        "energy_per_sample",
        "modulator_count",
        "data_rate",
        "precision"
      ],
      "local_surrogate_type": "single_kernel_hop_mvm_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "reported",
        "accuracy": "not_applicable",
        "area": "derived",
        "precision": "reported"
      },
      "confidence_grade": "B",
      "notes": [
        "HOP sample-energy and data-rate values are preserved as paper metadata and are not converted into local pJ/op calibration targets."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Digital-analog hybrid optical processor using cascaded microring modulators",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Hop energy per sample pj",
          "quoted_value": "3.88",
          "source_location": "published_calibration.additional_metrics.hop_energy_per_sample_pj",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Analog scheme energy per sample pj",
          "quoted_value": "34.88",
          "source_location": "published_calibration.additional_metrics.analog_scheme_energy_per_sample_pj",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Packaged cascaded mrms",
          "quoted_value": "20",
          "source_location": "published_calibration.additional_metrics.packaged_cascaded_mrms",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Hdip data rate gbps per mrm",
          "quoted_value": "7.5",
          "source_location": "published_calibration.additional_metrics.hdip_data_rate_gbps_per_mrm",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Hwdr data rate mbps per input",
          "quoted_value": "400",
          "source_location": "published_calibration.additional_metrics.hwdr_data_rate_mbps_per_input",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Yolo data rate mbps per input",
          "quoted_value": "300",
          "source_location": "published_calibration.additional_metrics.yolo_data_rate_mbps_per_input",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Hdip input word bits",
          "quoted_value": "16",
          "source_location": "published_calibration.additional_metrics.hdip_input_word_bits",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Task kernel shape",
          "quoted_value": "3x3",
          "source_location": "published_calibration.additional_metrics.task_kernel_shape",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=1, k=9, n=1 encodes one 3x3 convolution-kernel MVM; it does not reproduce the HOP digital equalization or DSP chain.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: single_kernel_hop_mvm_surrogate.",
        "HOP sample-energy and data-rate values are preserved as paper metadata and are not converted into local pJ/op calibration targets.",
        "The local card uses a single 3x3-kernel MVM surrogate for the HOP convolution demonstrations.",
        "The paper's digital-analog encoding, DSP/equalization, and task-level postprocessing remain outside the local component model.",
        "Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "claim_status=paper-reported HOP architecture, sample energy, and data-rate metrics; matmul-surrogate local model",
        "source_doi=10.1038/s41467-025-62586-0",
        "source_quality_grade=B",
        "coverage.accuracy=not_applicable",
        "coverage.area=derived",
        "coverage.energy=reported",
        "coverage.precision=reported",
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
    "The local card uses a single 3x3-kernel MVM surrogate for the HOP convolution demonstrations.",
    "The paper's digital-analog encoding, DSP/equalization, and task-level postprocessing remain outside the local component model.",
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
    "source_title": "Digital-analog hybrid matrix multiplication processor for optical neural networks",
    "source_url": "https://www.nature.com/articles/s41467-025-62586-0",
    "doi": "10.1038/s41467-025-62586-0",
    "venue": "Nature Communications 16, 7465 (2025)",
    "claim_status": "paper-reported HOP architecture, sample energy, and data-rate metrics; matmul-surrogate local model"
  }
}
;
