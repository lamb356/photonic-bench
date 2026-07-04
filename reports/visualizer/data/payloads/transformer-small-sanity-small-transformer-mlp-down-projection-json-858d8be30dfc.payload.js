window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["transformer_small_sanity/small_transformer_mlp_down_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Small transformer sanity layer - MLP down-projection",
    "description": "Tiny dense transformer layer shape for exact MAC-count sanity checks. This is a synthetic helper example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 4 x 16 times 16 x 8; operation multiplicity is 2. The right operand is a learned model-weight matrix."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 4,
      "k": 16,
      "n": 8
    },
    "macs": 1024,
    "equivalent_ops": 2048,
    "output_elements": 64
  },
  "model_inputs": {
    "device": {
      "optical_mac_energy_fj": 0.5,
      "laser_wall_plug_efficiency": 0.25,
      "photodetector_energy_fj_per_sample": 10.0,
      "adc": {
        "bits": 6,
        "energy_pj_per_conversion": 0.5
      },
      "dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.12
      },
      "vector_dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.12
      },
      "weight_dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.45
      }
    },
    "execution": {
      "batch_size": 2,
      "vector_reuse_factor": 1,
      "weight_reuse_factor": 1,
      "weight_stationary": true,
      "pipeline": {
        "stages": 4,
        "cycle_time_ns": 2.0
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
      "optical_latency_ns": 3.0,
      "adc_latency_ns": 1.0,
      "dac_latency_ns": 1.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 3.0
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 64,
      "vector_dac_conversions": 128,
      "weight_dac_conversions": 128,
      "dac_conversions": 256
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 128,
      "weight_operand_read_bytes": 128,
      "output_write_bytes": 64,
      "total_interface_bytes": 320,
      "macs_per_byte": 3.2,
      "equivalent_ops_per_byte": 6.4,
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
          "read_bytes": 256.0,
          "write_bytes": 64.0,
          "total_bytes": 320.0,
          "read_energy_pj": 5.12,
          "write_energy_pj": 1.28,
          "total_energy_pj": 6.4,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.3125,
          "contention_adjusted_transfer_time_ns": 0.3125,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.3125,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.0018945852752832405,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.044642857142857144,
          "contention_adjusted_transfer_pressure_ratio": 0.044642857142857144,
          "compute_window_required_bandwidth_bytes_per_ns": 45.714285714285715,
          "contention_bandwidth_utilization": 0.044642857142857144,
          "contention_bandwidth_headroom_bytes_per_ns": 978.2857142857143,
          "contention_bandwidth_headroom_ratio": 22.4
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 256.0,
          "write_bytes": 64.0,
          "total_bytes": 320.0,
          "read_energy_pj": 51.2,
          "write_energy_pj": 12.8,
          "total_energy_pj": 64.0,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 1.25,
          "contention_adjusted_transfer_time_ns": 1.25,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 1.25,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266144,
          "system_energy_share": 0.018945852752832403,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.17857142857142858,
          "contention_adjusted_transfer_pressure_ratio": 0.17857142857142858,
          "compute_window_required_bandwidth_bytes_per_ns": 45.714285714285715,
          "contention_bandwidth_utilization": 0.17857142857142858,
          "contention_bandwidth_headroom_bytes_per_ns": 210.28571428571428,
          "contention_bandwidth_headroom_ratio": 5.6
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 256.0,
          "write_bytes": 64.0,
          "total_bytes": 320.0,
          "read_energy_pj": 2560.0,
          "write_energy_pj": 640.0,
          "total_energy_pj": 3200.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 20.0,
          "contention_adjusted_transfer_time_ns": 20.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 20.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9472926376416202,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 2.857142857142857,
          "contention_adjusted_transfer_pressure_ratio": 2.857142857142857,
          "compute_window_required_bandwidth_bytes_per_ns": 45.714285714285715,
          "contention_bandwidth_utilization": 2.857142857142857,
          "contention_bandwidth_headroom_bytes_per_ns": -29.714285714285715,
          "contention_bandwidth_headroom_ratio": 0.35
        }
      },
      "local_compute_and_conversion_energy_pj": 107.64800000000001,
      "total_movement_energy_pj": 3270.4,
      "total_system_energy_pj": 3378.0480000000002,
      "system_energy_per_mac_pj": 3.2988750000000002,
      "system_energy_per_op_pj": 1.6494375000000001,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 107.64800000000001,
          "share": 0.031866924330264106
        },
        "sram": {
          "energy_pj": 6.4,
          "share": 0.0018945852752832405
        },
        "intermediate": {
          "energy_pj": 64.0,
          "share": 0.018945852752832403
        },
        "off_chip": {
          "energy_pj": 3200.0,
          "share": 0.9472926376416202
        },
        "movement_total": {
          "energy_pj": 3270.4,
          "share": 0.9681330756697358
        },
        "total_system_energy_pj": 3378.0480000000002,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.031866924330264106,
      "movement_energy_share": 0.9681330756697358,
      "movement_to_compute_energy_ratio": 30.380499405469678,
      "total_hierarchy_bytes": 960.0,
      "hierarchy_equivalent_ops_per_byte": 2.1333333333333333,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 2.857142857142857,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 2.857142857142857,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9472926376416202,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 2.857142857142857,
      "min_tier_contention_bandwidth_headroom_ratio": 0.35,
      "max_transfer_time_ns": 20.0,
      "serial_transfer_time_ns": 21.5625,
      "effective_transfer_time_ns": 20.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 20.0,
      "contention_adjusted_serial_transfer_time_ns": 21.5625,
      "contention_adjusted_effective_transfer_time_ns": 20.0,
      "calibration_adjusted_effective_transfer_time_ns": 20.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 2.857142857142857,
      "bandwidth_limited_batch_latency_ns": 20.0,
      "bandwidth_pressure_ratio": 2.857142857142857,
      "bandwidth_limited_equivalent_ops_per_second": 102400000000.0,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 20.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 2.857142857142857,
      "contention_pressure_ratio": 2.857142857142857,
      "contention_adjusted_equivalent_ops_per_second": 102400000000.0,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.512,
      "laser_electrical_pj": 2.048,
      "detector_pj": 0.64,
      "adc_pj": 32.0,
      "vector_dac_pj": 15.36,
      "weight_dac_pj": 57.6,
      "dac_pj": 72.96000000000001,
      "total_pj": 107.64800000000001,
      "energy_per_mac_pj": 0.10512500000000001,
      "energy_per_op_pj": 0.052562500000000005,
      "peripheral_share": 0.9809750297265161
    },
    "timing": {
      "optical_latency_ns": 3.0,
      "adc_latency_ns": 1.0,
      "dac_latency_ns": 1.0,
      "total_latency_ns": 5.0,
      "pipeline_stages": 4,
      "pipeline_cycle_time_ns": 2.0,
      "batch_latency_ns": 7.0,
      "steady_state_operations_per_second": 500000000.0,
      "steady_state_equivalent_ops_per_second": 512000000000.0
    },
    "noise": {
      "quantization_snr_db": 37.879999999999995,
      "quantization_rms": 0.004582144993568459,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 3.0000000000000005e-10,
      "estimated_relative_error_rms": 0.02051818833966792
    }
  },
  "published_reference": null,
  "calibration_fit": null,
  "assumptions": [
    "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
    "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
    "ADC conversions are counted once per output element.",
    "DAC conversions are counted once per input value for the left and right matmul operands.",
    "Detector energy is counted once per output sample.",
    "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
    "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
    "Dense full-sequence transformer accounting is used.",
    "This tiny shape is intended for manual MAC-count verification.",
    "Transformer operation: MLP down-projection.",
    "Transformer formula: B * S * intermediate * H.",
    "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
    "Layer shape: batch=2, sequence=4, hidden=8, heads=2, head_dim=4, attention_context=4, intermediate=16.",
    "Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.",
    "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.",
    "The benchmark models 2 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": null
}
;
