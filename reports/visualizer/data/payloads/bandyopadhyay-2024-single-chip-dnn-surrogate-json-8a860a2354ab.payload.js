window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["bandyopadhyay_2024_single_chip_dnn_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Bandyopadhyay 2024 single-chip photonic DNN surrogate",
    "description": "Source-backed card for the Nature Photonics 2024 single-chip photonic deep neural network with forward-only training. The local workload is a compact dense-layer surrogate for the reported six-neuron, three-layer optical neural network."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 6,
      "k": 6,
      "n": 6
    },
    "macs": 216,
    "equivalent_ops": 432,
    "output_elements": 36
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
        "cycle_time_ns": 0.41
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
      "optical_latency_ns": 0.41,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 0.41
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 36,
      "vector_dac_conversions": 36,
      "weight_dac_conversions": 36,
      "dac_conversions": 72
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 36,
      "weight_operand_read_bytes": 36,
      "output_write_bytes": 36,
      "total_interface_bytes": 108,
      "macs_per_byte": 2.0,
      "equivalent_ops_per_byte": 4.0,
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
          "read_bytes": 72.0,
          "write_bytes": 36.0,
          "total_bytes": 108.0,
          "read_energy_pj": 1.44,
          "write_energy_pj": 0.72,
          "total_energy_pj": 2.16,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.10546875,
          "contention_adjusted_transfer_time_ns": 0.10546875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.10546875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "system_energy_share": 0.0018998163510860618,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.2572408536585366,
          "contention_adjusted_transfer_pressure_ratio": 0.2572408536585366,
          "compute_window_required_bandwidth_bytes_per_ns": 263.4146341463415,
          "contention_bandwidth_utilization": 0.2572408536585366,
          "contention_bandwidth_headroom_bytes_per_ns": 760.5853658536585,
          "contention_bandwidth_headroom_ratio": 3.887407407407407
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 72.0,
          "write_bytes": 36.0,
          "total_bytes": 108.0,
          "read_energy_pj": 14.4,
          "write_energy_pj": 7.2,
          "total_energy_pj": 21.6,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.421875,
          "contention_adjusted_transfer_time_ns": 0.421875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.421875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.01899816351086062,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 1.0289634146341464,
          "contention_adjusted_transfer_pressure_ratio": 1.0289634146341464,
          "compute_window_required_bandwidth_bytes_per_ns": 263.4146341463415,
          "contention_bandwidth_utilization": 1.0289634146341464,
          "contention_bandwidth_headroom_bytes_per_ns": -7.414634146341484,
          "contention_bandwidth_headroom_ratio": 0.9718518518518517
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 72.0,
          "write_bytes": 36.0,
          "total_bytes": 108.0,
          "read_energy_pj": 720.0,
          "write_energy_pj": 360.0,
          "total_energy_pj": 1080.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 6.75,
          "contention_adjusted_transfer_time_ns": 6.75,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 6.75,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133073,
          "system_energy_share": 0.9499081755430309,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 16.463414634146343,
          "contention_adjusted_transfer_pressure_ratio": 16.463414634146343,
          "compute_window_required_bandwidth_bytes_per_ns": 263.4146341463415,
          "contention_bandwidth_utilization": 16.463414634146343,
          "contention_bandwidth_headroom_bytes_per_ns": -247.41463414634148,
          "contention_bandwidth_headroom_ratio": 0.060740740740740734
        }
      },
      "local_compute_and_conversion_energy_pj": 33.192,
      "total_movement_energy_pj": 1103.76,
      "total_system_energy_pj": 1136.952,
      "system_energy_per_mac_pj": 5.2636666666666665,
      "system_energy_per_op_pj": 2.6318333333333332,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 33.192,
          "share": 0.029193844595022483
        },
        "sram": {
          "energy_pj": 2.16,
          "share": 0.0018998163510860618
        },
        "intermediate": {
          "energy_pj": 21.6,
          "share": 0.01899816351086062
        },
        "off_chip": {
          "energy_pj": 1080.0,
          "share": 0.9499081755430309
        },
        "movement_total": {
          "energy_pj": 1103.76,
          "share": 0.9708061554049775
        },
        "total_system_energy_pj": 1136.952,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.029193844595022483,
      "movement_energy_share": 0.9708061554049775,
      "movement_to_compute_energy_ratio": 33.253796095444685,
      "total_hierarchy_bytes": 324.0,
      "hierarchy_equivalent_ops_per_byte": 1.3333333333333333,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 16.463414634146343,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 16.463414634146343,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "max_tier_system_energy_share": 0.9499081755430309,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 16.463414634146343,
      "min_tier_contention_bandwidth_headroom_ratio": 0.060740740740740734,
      "max_transfer_time_ns": 6.75,
      "serial_transfer_time_ns": 7.27734375,
      "effective_transfer_time_ns": 6.75,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 6.75,
      "contention_adjusted_serial_transfer_time_ns": 7.27734375,
      "contention_adjusted_effective_transfer_time_ns": 6.75,
      "calibration_adjusted_effective_transfer_time_ns": 6.75,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 16.463414634146343,
      "bandwidth_limited_batch_latency_ns": 6.75,
      "bandwidth_pressure_ratio": 16.463414634146343,
      "bandwidth_limited_equivalent_ops_per_second": 64000000000.0,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 6.75,
      "contention_adjusted_transfer_to_compute_time_ratio": 16.463414634146343,
      "contention_pressure_ratio": 16.463414634146343,
      "contention_adjusted_equivalent_ops_per_second": 64000000000.0,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.108,
      "laser_electrical_pj": 0.432,
      "detector_pj": 0.36,
      "adc_pj": 18.0,
      "vector_dac_pj": 7.2,
      "weight_dac_pj": 7.2,
      "dac_pj": 14.4,
      "total_pj": 33.192,
      "energy_per_mac_pj": 0.15366666666666667,
      "energy_per_op_pj": 0.07683333333333334,
      "peripheral_share": 0.9869848156182212
    },
    "timing": {
      "optical_latency_ns": 0.41,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 0.41,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 0.41,
      "batch_latency_ns": 0.41,
      "steady_state_operations_per_second": 2439024390.2439027,
      "steady_state_equivalent_ops_per_second": 1053658536585.366
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 4.100000000000001e-11,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "Single-chip photonic deep neural network with forward-only training",
      "source_url": "https://www.nature.com/articles/s41566-024-01567-z",
      "doi": "10.1038/s41566-024-01567-z",
      "venue": "Nature Photonics 18, 1335-1343 (2024)",
      "claim_status": "paper-reported integrated photonic DNN latency and accuracy; compact dense-layer surrogate local model"
    },
    "reported": {
      "architecture": "Integrated coherent photonic neural network with optical nonlinear activation",
      "reported_latency_ns": 0.41,
      "additional_metrics": {
        "reported_neurons": 6,
        "reported_layers": 3,
        "reported_latency_ps": 410,
        "reported_accuracy_percent": 92.5,
        "training_mode": "forward-only in situ training",
        "surrogate_mapping": "m=6, k=6, n=6 is a compact dense-layer proxy for the reported six-neuron integrated photonic DNN."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Single-chip photonic deep neural network with forward-only training",
      "source_doi": "10.1038/s41566-024-01567-z",
      "reported_metrics": [
        "latency",
        "network_size",
        "accuracy",
        "training_mode"
      ],
      "local_surrogate_type": "compact_single_chip_dnn_dense_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source reports a fully integrated coherent optical neural network with optical nonlinear functions and 410 ps latency.",
        "Local dense matmul accounting does not reproduce the integrated nonlinear optical network or forward-only training loop."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Integrated coherent photonic neural network with optical nonlinear activation",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Reported latency",
          "quoted_value": "0.41",
          "source_location": "published_calibration.reported_latency_ns",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Reported neurons",
          "quoted_value": "6",
          "source_location": "published_calibration.additional_metrics.reported_neurons",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported layers",
          "quoted_value": "3",
          "source_location": "published_calibration.additional_metrics.reported_layers",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported latency ps",
          "quoted_value": "410",
          "source_location": "published_calibration.additional_metrics.reported_latency_ps",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported accuracy percent",
          "quoted_value": "92.5",
          "source_location": "published_calibration.additional_metrics.reported_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Training mode",
          "quoted_value": "forward-only in situ training",
          "source_location": "published_calibration.additional_metrics.training_mode",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=6, k=6, n=6 is a compact dense-layer proxy for the reported six-neuron integrated photonic DNN.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: compact_single_chip_dnn_dense_surrogate.",
        "The source reports a fully integrated coherent optical neural network with optical nonlinear functions and 410 ps latency.",
        "Local dense matmul accounting does not reproduce the integrated nonlinear optical network or forward-only training loop.",
        "Local timing uses the reported 410 ps latency as a one-operation surrogate.",
        "Local energy, converter, and system movement values are generic PhotonicBench assumptions.",
        "Weight-stationary mode approximates fixed optical weights in the compact local dense layer."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "claim_status=paper-reported integrated photonic DNN latency and accuracy; compact dense-layer surrogate local model",
        "source_doi=10.1038/s41566-024-01567-z",
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
    "Local timing uses the reported 410 ps latency as a one-operation surrogate.",
    "Local energy, converter, and system movement values are generic PhotonicBench assumptions.",
    "Weight-stationary mode approximates fixed optical weights in the compact local dense layer.",
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
    "source_title": "Single-chip photonic deep neural network with forward-only training",
    "source_url": "https://www.nature.com/articles/s41566-024-01567-z",
    "doi": "10.1038/s41566-024-01567-z",
    "venue": "Nature Photonics 18, 1335-1343 (2024)",
    "claim_status": "paper-reported integrated photonic DNN latency and accuracy; compact dense-layer surrogate local model"
  }
}
;
