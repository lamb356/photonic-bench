window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["luan_2026_single_shot_mmm_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Luan 2026 single-shot MMM optical tensor processor surrogate",
    "description": "Source-backed card for the Nature Communications 2026 single-shot matrix-matrix photonic processor. The local workload is a 16x16 dense GEMM tile matching the reported 4096 MACs per optical shot; it is not a diffraction-field or camera/readout reproduction."
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
      "optical_mac_energy_fj": 0.02,
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
        "cycle_time_ns": 0.5
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
      "optical_latency_ns": 0.5,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 0.5
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
          "system_energy_share": 0.001900461432035698,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 1.5,
          "contention_adjusted_transfer_pressure_ratio": 1.5,
          "compute_window_required_bandwidth_bytes_per_ns": 1536.0,
          "contention_bandwidth_utilization": 1.5,
          "contention_bandwidth_headroom_bytes_per_ns": -512.0,
          "contention_bandwidth_headroom_ratio": 0.6666666666666666
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
          "system_energy_share": 0.019004614320356984,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 6.0,
          "contention_adjusted_transfer_pressure_ratio": 6.0,
          "compute_window_required_bandwidth_bytes_per_ns": 1536.0,
          "contention_bandwidth_utilization": 6.0,
          "contention_bandwidth_headroom_bytes_per_ns": -1280.0,
          "contention_bandwidth_headroom_ratio": 0.16666666666666666
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
          "system_energy_share": 0.9502307160178491,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 96.0,
          "contention_adjusted_transfer_pressure_ratio": 96.0,
          "compute_window_required_bandwidth_bytes_per_ns": 1536.0,
          "contention_bandwidth_utilization": 96.0,
          "contention_bandwidth_headroom_bytes_per_ns": -1520.0,
          "contention_bandwidth_headroom_ratio": 0.010416666666666666
        }
      },
      "local_compute_and_conversion_energy_pj": 233.28768,
      "total_movement_energy_pj": 7848.96,
      "total_system_energy_pj": 8082.24768,
      "system_energy_per_mac_pj": 1.973205,
      "system_energy_per_op_pj": 0.9866025,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 233.28768,
          "share": 0.028864208229758184
        },
        "sram": {
          "energy_pj": 15.36,
          "share": 0.001900461432035698
        },
        "intermediate": {
          "energy_pj": 153.60000000000002,
          "share": 0.019004614320356984
        },
        "off_chip": {
          "energy_pj": 7680.0,
          "share": 0.9502307160178491
        },
        "movement_total": {
          "energy_pj": 7848.96,
          "share": 0.9711357917702418
        },
        "total_system_energy_pj": 8082.24768,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.028864208229758184,
      "movement_energy_share": 0.9711357917702418,
      "movement_to_compute_energy_ratio": 33.64498288122202,
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
      "max_tier_nominal_transfer_pressure_ratio": 96.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 96.0,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9502307160178491,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 96.0,
      "min_tier_contention_bandwidth_headroom_ratio": 0.010416666666666666,
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
      "transfer_to_compute_time_ratio": 96.0,
      "bandwidth_limited_batch_latency_ns": 48.0,
      "bandwidth_pressure_ratio": 96.0,
      "bandwidth_limited_equivalent_ops_per_second": 170666666666.66666,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 48.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 96.0,
      "contention_pressure_ratio": 96.0,
      "contention_adjusted_equivalent_ops_per_second": 170666666666.66666,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.08192,
      "laser_electrical_pj": 0.32768,
      "detector_pj": 2.56,
      "adc_pj": 128.0,
      "vector_dac_pj": 51.2,
      "weight_dac_pj": 51.2,
      "dac_pj": 102.4,
      "total_pj": 233.28768,
      "energy_per_mac_pj": 0.056955,
      "energy_per_op_pj": 0.0284775,
      "peripheral_share": 0.9985953823193751
    },
    "timing": {
      "optical_latency_ns": 0.5,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 0.5,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 0.5,
      "batch_latency_ns": 0.5,
      "steady_state_operations_per_second": 2000000000.0,
      "steady_state_equivalent_ops_per_second": 16384000000000.0
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 5.000000000000001e-11,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "Single-shot matrix-matrix photonic processor based on spatial-spectral hypermultiplexed parallel diffraction",
      "source_url": "https://www.nature.com/articles/s41467-026-68452-x",
      "doi": "10.1038/s41467-026-68452-x",
      "venue": "Nature Communications 17, 484 (2026)",
      "claim_status": "paper-reported single-shot matrix-matrix optical processor metrics; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Spatial-wavelength-temporal hypermultiplexed optical tensor processor",
      "additional_metrics": {
        "demonstrated_tile": "16x16_by_16x16",
        "reported_macs_per_shot": 4096,
        "reported_sample_rate_gsa_per_s": 2,
        "reported_optical_energy_per_mac_aj": 20,
        "reported_classification_accuracy_percent": 96.4,
        "derived_equivalent_tops_from_macs_per_shot_and_rate": 16.384,
        "surrogate_mapping": "m=16, k=16, n=16 preserves the reported 4096 MACs per shot; local converter and system tiers are PhotonicBench assumptions."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Single-shot matrix-matrix photonic processor based on spatial-spectral hypermultiplexed parallel diffraction",
      "source_doi": "10.1038/s41467-026-68452-x",
      "reported_metrics": [
        "macs_per_shot",
        "sample_rate",
        "optical_energy_per_mac",
        "accuracy"
      ],
      "local_surrogate_type": "dense_single_shot_mmm_tile_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source directly reports the optical tensor processor tile, MACs per shot, sample rate, optical energy per MAC, and task accuracy.",
        "PhotonicBench does not model the diffraction optics, spatial/spectral routing, imaging, or detector-array readout."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Architecture",
          "quoted_value": "Spatial-wavelength-temporal hypermultiplexed optical tensor processor",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Demonstrated tile",
          "quoted_value": "16x16_by_16x16",
          "source_location": "published_calibration.additional_metrics.demonstrated_tile",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported macs per shot",
          "quoted_value": "4096",
          "source_location": "published_calibration.additional_metrics.reported_macs_per_shot",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported sample rate gsa per s",
          "quoted_value": "2",
          "source_location": "published_calibration.additional_metrics.reported_sample_rate_gsa_per_s",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported optical energy per mac aj",
          "quoted_value": "20",
          "source_location": "published_calibration.additional_metrics.reported_optical_energy_per_mac_aj",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Reported classification accuracy percent",
          "quoted_value": "96.4",
          "source_location": "published_calibration.additional_metrics.reported_classification_accuracy_percent",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Derived equivalent tops from macs per shot and rate",
          "quoted_value": "16.384",
          "source_location": "published_calibration.additional_metrics.derived_equivalent_tops_from_macs_per_shot_and_rate",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=16, k=16, n=16 preserves the reported 4096 MACs per shot; local converter and system tiers are PhotonicBench assumptions.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local surrogate type: dense_single_shot_mmm_tile_surrogate.",
        "The source directly reports the optical tensor processor tile, MACs per shot, sample rate, optical energy per MAC, and task accuracy.",
        "PhotonicBench does not model the diffraction optics, spatial/spectral routing, imaging, or detector-array readout.",
        "The local optical MAC energy is set to the paper-reported optical 20 aJ/MAC value converted to 0.02 fJ/MAC.",
        "Converter energy, SRAM/intermediate/off-chip movement, and wall-plug assumptions are local PhotonicBench values and not source-reported system power.",
        "Weight-stationary mode approximates reusing the right operand inside the reported 16x16-by-16x16 optical tile."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "claim_status=paper-reported single-shot matrix-matrix optical processor metrics; matmul-surrogate local model",
        "source_doi=10.1038/s41467-026-68452-x",
        "source_quality_grade=B",
        "coverage.accuracy=reported",
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
    "The local optical MAC energy is set to the paper-reported optical 20 aJ/MAC value converted to 0.02 fJ/MAC.",
    "Converter energy, SRAM/intermediate/off-chip movement, and wall-plug assumptions are local PhotonicBench values and not source-reported system power.",
    "Weight-stationary mode approximates reusing the right operand inside the reported 16x16-by-16x16 optical tile.",
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
    "source_title": "Single-shot matrix-matrix photonic processor based on spatial-spectral hypermultiplexed parallel diffraction",
    "source_url": "https://www.nature.com/articles/s41467-026-68452-x",
    "doi": "10.1038/s41467-026-68452-x",
    "venue": "Nature Communications 17, 484 (2026)",
    "claim_status": "paper-reported single-shot matrix-matrix optical processor metrics; matmul-surrogate local model"
  }
}
;
