window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["dong_2023_continuous_time_tensor_core_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Dong 2023 continuous-time photonic tensor core surrogate",
    "description": "Source-backed card for the Nature Photonics 2023 higher-dimensional photonic tensor core using continuous-time data. The local workload maps the reported 3x3 ECG-kernel by 3x100 input framing into a dense matmul surrogate."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 3,
      "k": 3,
      "n": 100
    },
    "macs": 900,
    "equivalent_ops": 1800,
    "output_elements": 300
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
      "adc_conversions": 300,
      "vector_dac_conversions": 9,
      "weight_dac_conversions": 300,
      "dac_conversions": 309
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 9,
      "weight_operand_read_bytes": 300,
      "output_write_bytes": 300,
      "total_interface_bytes": 609,
      "macs_per_byte": 1.477832512315271,
      "equivalent_ops_per_byte": 2.955665024630542,
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
          "read_bytes": 309.0,
          "write_bytes": 300.0,
          "total_bytes": 609.0,
          "read_energy_pj": 6.18,
          "write_energy_pj": 6.0,
          "total_energy_pj": 12.18,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.5947265625,
          "contention_adjusted_transfer_time_ns": 0.5947265625,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.5947265625,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.0018911340283017989,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.5947265625,
          "contention_adjusted_transfer_pressure_ratio": 0.5947265625,
          "compute_window_required_bandwidth_bytes_per_ns": 609.0,
          "contention_bandwidth_utilization": 0.5947265625,
          "contention_bandwidth_headroom_bytes_per_ns": 415.0,
          "contention_bandwidth_headroom_ratio": 1.6814449917898193
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 309.0,
          "write_bytes": 300.0,
          "total_bytes": 609.0,
          "read_energy_pj": 61.800000000000004,
          "write_energy_pj": 60.0,
          "total_energy_pj": 121.80000000000001,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 2.37890625,
          "contention_adjusted_transfer_time_ns": 2.37890625,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 2.37890625,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.01891134028301799,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 2.37890625,
          "contention_adjusted_transfer_pressure_ratio": 2.37890625,
          "compute_window_required_bandwidth_bytes_per_ns": 609.0,
          "contention_bandwidth_utilization": 2.37890625,
          "contention_bandwidth_headroom_bytes_per_ns": -353.0,
          "contention_bandwidth_headroom_ratio": 0.42036124794745483
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 309.0,
          "write_bytes": 300.0,
          "total_bytes": 609.0,
          "read_energy_pj": 3090.0,
          "write_energy_pj": 3000.0,
          "total_energy_pj": 6090.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 38.0625,
          "contention_adjusted_transfer_time_ns": 38.0625,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 38.0625,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133073,
          "system_energy_share": 0.9455670141508995,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 38.0625,
          "contention_adjusted_transfer_pressure_ratio": 38.0625,
          "compute_window_required_bandwidth_bytes_per_ns": 609.0,
          "contention_bandwidth_utilization": 38.0625,
          "contention_bandwidth_headroom_bytes_per_ns": -593.0,
          "contention_bandwidth_headroom_ratio": 0.026272577996715927
        }
      },
      "local_compute_and_conversion_energy_pj": 216.60000000000002,
      "total_movement_energy_pj": 6223.98,
      "total_system_energy_pj": 6440.58,
      "system_energy_per_mac_pj": 7.1562,
      "system_energy_per_op_pj": 3.5781,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 216.60000000000002,
          "share": 0.033630511537780766
        },
        "sram": {
          "energy_pj": 12.18,
          "share": 0.0018911340283017989
        },
        "intermediate": {
          "energy_pj": 121.80000000000001,
          "share": 0.01891134028301799
        },
        "off_chip": {
          "energy_pj": 6090.0,
          "share": 0.9455670141508995
        },
        "movement_total": {
          "energy_pj": 6223.98,
          "share": 0.9663694884622192
        },
        "total_system_energy_pj": 6440.58,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.033630511537780766,
      "movement_energy_share": 0.9663694884622192,
      "movement_to_compute_energy_ratio": 28.734903047091407,
      "total_hierarchy_bytes": 1827.0,
      "hierarchy_equivalent_ops_per_byte": 0.9852216748768473,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666663,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 38.0625,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 38.0625,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "max_tier_system_energy_share": 0.9455670141508995,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 38.0625,
      "min_tier_contention_bandwidth_headroom_ratio": 0.026272577996715927,
      "max_transfer_time_ns": 38.0625,
      "serial_transfer_time_ns": 41.0361328125,
      "effective_transfer_time_ns": 38.0625,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 38.0625,
      "contention_adjusted_serial_transfer_time_ns": 41.0361328125,
      "contention_adjusted_effective_transfer_time_ns": 38.0625,
      "calibration_adjusted_effective_transfer_time_ns": 38.0625,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 38.0625,
      "bandwidth_limited_batch_latency_ns": 38.0625,
      "bandwidth_pressure_ratio": 38.0625,
      "bandwidth_limited_equivalent_ops_per_second": 47290640394.08867,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 38.0625,
      "contention_adjusted_transfer_to_compute_time_ratio": 38.0625,
      "contention_pressure_ratio": 38.0625,
      "contention_adjusted_equivalent_ops_per_second": 47290640394.08867,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.45,
      "laser_electrical_pj": 1.8,
      "detector_pj": 3.0,
      "adc_pj": 150.0,
      "vector_dac_pj": 1.8,
      "weight_dac_pj": 60.0,
      "dac_pj": 61.8,
      "total_pj": 216.60000000000002,
      "energy_per_mac_pj": 0.2406666666666667,
      "energy_per_op_pj": 0.12033333333333335,
      "peripheral_share": 0.9916897506925207
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
      "steady_state_equivalent_ops_per_second": 1800000000000.0
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
      "source_title": "Higher-dimensional processing using a photonic tensor core with continuous-time data",
      "source_url": "https://www.nature.com/articles/s41566-023-01313-x",
      "doi": "10.1038/s41566-023-01313-x",
      "venue": "Nature Photonics 17, 1080-1088 (2023)",
      "claim_status": "paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Electro-optically controlled photonic tensor core with spatial, wavelength, and RF degrees of freedom",
      "additional_metrics": {
        "reported_parallelism": 100,
        "rf_components": 50,
        "wdm_channels": 2,
        "reported_ecg_signals": 100,
        "reported_cnn_accuracy_percent": 93.5,
        "surrogate_mapping": "m=3, k=3, n=100 follows the paper's 3x3 kernel and 3x100 ECG input framing; it is not a continuous-time RF/WDM simulation."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Higher-dimensional processing using a photonic tensor core with continuous-time data",
      "source_doi": "10.1038/s41566-023-01313-x",
      "reported_metrics": [
        "parallelism",
        "rf_components",
        "wavelength_channels",
        "accuracy"
      ],
      "local_surrogate_type": "continuous_time_tensor_core_ecg_matmul_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source reports a hardware photonic tensor core using spatial, wavelength, and RF degrees of freedom with parallelism of 100.",
        "Local dense matmul accounting does not model RF multiplexing, PCM memory programming, optical routing, or clinical ECG preprocessing."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Electro-optically controlled photonic tensor core with spatial, wavelength, and RF degrees of freedom",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Reported parallelism",
          "quoted_value": "100",
          "source_location": "published_calibration.additional_metrics.reported_parallelism",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Rf components",
          "quoted_value": "50",
          "source_location": "published_calibration.additional_metrics.rf_components",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Wdm channels",
          "quoted_value": "2",
          "source_location": "published_calibration.additional_metrics.wdm_channels",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported ecg signals",
          "quoted_value": "100",
          "source_location": "published_calibration.additional_metrics.reported_ecg_signals",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported cnn accuracy percent",
          "quoted_value": "93.5",
          "source_location": "published_calibration.additional_metrics.reported_cnn_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=3, k=3, n=100 follows the paper's 3x3 kernel and 3x100 ECG input framing; it is not a continuous-time RF/WDM simulation.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: continuous_time_tensor_core_ecg_matmul_surrogate.",
        "The source reports a hardware photonic tensor core using spatial, wavelength, and RF degrees of freedom with parallelism of 100.",
        "Local dense matmul accounting does not model RF multiplexing, PCM memory programming, optical routing, or clinical ECG preprocessing.",
        "The dense surrogate preserves the reported 3x3-kernel and 100-signal ECG demonstration scale.",
        "Local timing, energy, converter, and system movement values are generic PhotonicBench assumptions.",
        "Weight-stationary mode approximates fixed tensor-core weights for one local ECG convolution tile."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "claim_status=paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model",
        "source_doi=10.1038/s41566-023-01313-x",
        "source_quality_grade=B",
        "coverage.accuracy=reported",
        "coverage.area=not_reported",
        "coverage.energy=not_reported",
        "coverage.precision=reported",
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
    "The dense surrogate preserves the reported 3x3-kernel and 100-signal ECG demonstration scale.",
    "Local timing, energy, converter, and system movement values are generic PhotonicBench assumptions.",
    "Weight-stationary mode approximates fixed tensor-core weights for one local ECG convolution tile.",
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
    "source_title": "Higher-dimensional processing using a photonic tensor core with continuous-time data",
    "source_url": "https://www.nature.com/articles/s41566-023-01313-x",
    "doi": "10.1038/s41566-023-01313-x",
    "venue": "Nature Photonics 17, 1080-1088 (2023)",
    "claim_status": "paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model"
  }
}
;
