window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["profile_sensitivity_64x64_hbm.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "64x64 profile sensitivity - HBM",
    "description": "Same 64x64 photonic matmul workload as the starter card, using the hbm system profile to isolate movement-tier sensitivity."
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
        "bits": 6,
        "energy_pj_per_conversion": 0.5
      },
      "dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.2
      },
      "vector_dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.2
      },
      "weight_dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.2
      }
    },
    "execution": {
      "batch_size": 1,
      "vector_reuse_factor": 1,
      "weight_reuse_factor": 1,
      "weight_stationary": false,
      "pipeline": {
        "stages": 1,
        "cycle_time_ns": null
      }
    },
    "system": {
      "profile": "hbm",
      "profile_overrides": [],
      "scenario": {
        "name": "hbm",
        "description": "Local SRAM plus a high-bandwidth-memory style off-chip tier with higher bandwidth and lower movement energy than generic DDR.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "shared_hbm_stack",
        "contention_preset_description": "HBM-like shared stack: several clients share the loaded tier bandwidth with modest arbitration loss and a small control guardband.",
        "overlap_model": "overlapped_compute_window",
        "assumptions": {
          "shared_bandwidth_clients": 2.0,
          "arbitration_efficiency": 0.92,
          "calibration_overhead_fraction": 0.02,
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
            "read_energy_pj_per_byte": 3.0,
            "write_energy_pj_per_byte": 3.0,
            "bandwidth_bytes_per_ns": 512.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          }
        },
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "shared_hbm_stack",
        "shared_bandwidth_clients": 2.0,
        "arbitration_efficiency": 0.92,
        "calibration_overhead_fraction": 0.02,
        "overlap_model": "overlapped_compute_window"
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
        "read_energy_pj_per_byte": 3.0,
        "write_energy_pj_per_byte": 3.0,
        "bandwidth_bytes_per_ns": 512.0,
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
      "profile": "hbm",
      "profile_overrides": [],
      "memory_scenario": {
        "name": "hbm",
        "description": "Local SRAM plus a high-bandwidth-memory style off-chip tier with higher bandwidth and lower movement energy than generic DDR.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "shared_hbm_stack",
        "contention_preset_description": "HBM-like shared stack: several clients share the loaded tier bandwidth with modest arbitration loss and a small control guardband.",
        "overlap_model": "overlapped_compute_window",
        "assumptions": {
          "shared_bandwidth_clients": 2.0,
          "arbitration_efficiency": 0.92,
          "calibration_overhead_fraction": 0.02,
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
            "read_energy_pj_per_byte": 3.0,
            "write_energy_pj_per_byte": 3.0,
            "bandwidth_bytes_per_ns": 512.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          }
        },
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "shared_hbm_stack",
        "shared_bandwidth_clients": 2.0,
        "arbitration_efficiency": 0.92,
        "calibration_overhead_fraction": 0.02,
        "overlap_model": "overlapped_compute_window"
      },
      "contention_preset": "shared_hbm_stack",
      "contention_overlap_model": "overlapped_compute_window",
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
          "effective_bandwidth_bytes_per_ns": 471.04,
          "transfer_time_ns": 12.0,
          "contention_adjusted_transfer_time_ns": 26.08695652173913,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 26.60869565217391,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.006211180124223602,
          "system_energy_share": 0.005608524957936062,
          "nominal_transfer_share": 0.25,
          "contention_adjusted_transfer_share": 0.25,
          "nominal_transfer_pressure_ratio": 2.4,
          "contention_adjusted_transfer_pressure_ratio": 5.321739130434782,
          "compute_window_required_bandwidth_bytes_per_ns": 2457.6,
          "contention_bandwidth_utilization": 5.217391304347825,
          "contention_bandwidth_headroom_bytes_per_ns": -1986.56,
          "contention_bandwidth_headroom_ratio": 0.19166666666666668
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
          "effective_bandwidth_bytes_per_ns": 117.76,
          "transfer_time_ns": 48.0,
          "contention_adjusted_transfer_time_ns": 104.34782608695652,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 106.43478260869564,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.06211180124223603,
          "system_energy_share": 0.05608524957936063,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 9.6,
          "contention_adjusted_transfer_pressure_ratio": 21.28695652173913,
          "compute_window_required_bandwidth_bytes_per_ns": 2457.6,
          "contention_bandwidth_utilization": 20.8695652173913,
          "contention_bandwidth_headroom_bytes_per_ns": -2339.8399999999997,
          "contention_bandwidth_headroom_ratio": 0.04791666666666667
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 24576.0,
          "write_energy_pj": 12288.0,
          "total_energy_pj": 36864.0,
          "bandwidth_bytes_per_ns": 512.0,
          "effective_bandwidth_bytes_per_ns": 235.52,
          "transfer_time_ns": 24.0,
          "contention_adjusted_transfer_time_ns": 52.17391304347826,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 53.21739130434782,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9316770186335404,
          "system_energy_share": 0.8412787436904093,
          "nominal_transfer_share": 0.5,
          "contention_adjusted_transfer_share": 0.5,
          "nominal_transfer_pressure_ratio": 4.8,
          "contention_adjusted_transfer_pressure_ratio": 10.643478260869564,
          "compute_window_required_bandwidth_bytes_per_ns": 2457.6,
          "contention_bandwidth_utilization": 10.43478260869565,
          "contention_bandwidth_headroom_bytes_per_ns": -2222.08,
          "contention_bandwidth_headroom_ratio": 0.09583333333333334
        }
      },
      "local_compute_and_conversion_energy_pj": 4251.648,
      "total_movement_energy_pj": 39567.36,
      "total_system_energy_pj": 43819.008,
      "system_energy_per_mac_pj": 0.16715625,
      "system_energy_per_op_pj": 0.083578125,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 4251.648,
          "share": 0.09702748177229388
        },
        "sram": {
          "energy_pj": 245.76,
          "share": 0.005608524957936062
        },
        "intermediate": {
          "energy_pj": 2457.6000000000004,
          "share": 0.05608524957936063
        },
        "off_chip": {
          "energy_pj": 36864.0,
          "share": 0.8412787436904093
        },
        "movement_total": {
          "energy_pj": 39567.36,
          "share": 0.9029725182277061
        },
        "total_system_energy_pj": 43819.008,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.09702748177229388,
      "movement_energy_share": 0.9029725182277061,
      "movement_to_compute_energy_ratio": 9.30635838150289,
      "total_hierarchy_bytes": 36864.0,
      "hierarchy_equivalent_ops_per_byte": 14.222222222222221,
      "movement_energy_per_hierarchy_byte_pj": 1.0733333333333333,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "intermediate",
      "contention_memory_bottleneck_tier": "intermediate",
      "max_tier_nominal_transfer_pressure_ratio": 9.6,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 21.28695652173913,
      "max_tier_movement_energy_share": 0.9316770186335404,
      "max_tier_system_energy_share": 0.8412787436904093,
      "contention_bandwidth_saturation_tier": "intermediate",
      "max_tier_contention_bandwidth_utilization": 20.8695652173913,
      "min_tier_contention_bandwidth_headroom_ratio": 0.04791666666666667,
      "max_transfer_time_ns": 48.0,
      "serial_transfer_time_ns": 84.0,
      "effective_transfer_time_ns": 48.0,
      "contention_bandwidth_derate_factor": 0.46,
      "contention_adjusted_max_transfer_time_ns": 104.34782608695652,
      "contention_adjusted_serial_transfer_time_ns": 182.6086956521739,
      "contention_adjusted_effective_transfer_time_ns": 104.34782608695652,
      "calibration_adjusted_effective_transfer_time_ns": 106.43478260869564,
      "calibration_guardband_time_ns": 2.0869565217391255,
      "contention_transfer_overhead_fraction": 1.1739130434782608,
      "total_transfer_overhead_fraction": 1.2173913043478257,
      "effective_loaded_bandwidth_bytes_per_ns": 768.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 353.28000000000003,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 346.3529411764706,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 353.28000000000003,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 346.3529411764706,
      "transfer_to_compute_time_ratio": 9.6,
      "bandwidth_limited_batch_latency_ns": 48.0,
      "bandwidth_pressure_ratio": 9.6,
      "bandwidth_limited_equivalent_ops_per_second": 10922666666666.666,
      "bandwidth_limited_tier": "intermediate",
      "contention_adjusted_batch_latency_ns": 106.43478260869564,
      "contention_adjusted_transfer_to_compute_time_ratio": 21.28695652173913,
      "contention_pressure_ratio": 21.28695652173913,
      "contention_adjusted_equivalent_ops_per_second": 4925908496732.026,
      "contention_limited_tier": "intermediate",
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
      "optical_latency_ns": 3.0,
      "adc_latency_ns": 1.0,
      "dac_latency_ns": 1.0,
      "total_latency_ns": 5.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 5.0,
      "batch_latency_ns": 5.0,
      "steady_state_operations_per_second": 200000000.0,
      "steady_state_equivalent_ops_per_second": 104857600000000.0
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
    "Profile sensitivity card; component, timing, and noise assumptions match the starter 64x64 card.",
    "The hbm profile is a local modeling preset, not a measured hardware configuration.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted every 1 operation(s).",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": null
}
;
