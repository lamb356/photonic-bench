window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["profile_sensitivity_64x64_ddr.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "64x64 profile sensitivity - DDR",
    "description": "Same 64x64 photonic matmul workload as the starter card, using the ddr system profile to isolate movement-tier sensitivity."
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
      "profile": "ddr",
      "profile_overrides": [],
      "scenario": {
        "name": "ddr",
        "description": "Local SRAM plus a generic DDR-class off-chip memory tier. This matches the baseline off-chip movement defaults.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "ddr_controller",
        "contention_preset_description": "DDR/controller-style sharing: multiple clients and controller turnaround reduce usable bandwidth and add a larger guardband.",
        "overlap_model": "serialized_tier_path",
        "assumptions": {
          "shared_bandwidth_clients": 4.0,
          "arbitration_efficiency": 0.75,
          "calibration_overhead_fraction": 0.08,
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
        "preset": "ddr_controller",
        "shared_bandwidth_clients": 4.0,
        "arbitration_efficiency": 0.75,
        "calibration_overhead_fraction": 0.08,
        "overlap_model": "serialized_tier_path"
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
      "profile": "ddr",
      "profile_overrides": [],
      "memory_scenario": {
        "name": "ddr",
        "description": "Local SRAM plus a generic DDR-class off-chip memory tier. This matches the baseline off-chip movement defaults.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "ddr_controller",
        "contention_preset_description": "DDR/controller-style sharing: multiple clients and controller turnaround reduce usable bandwidth and add a larger guardband.",
        "overlap_model": "serialized_tier_path",
        "assumptions": {
          "shared_bandwidth_clients": 4.0,
          "arbitration_efficiency": 0.75,
          "calibration_overhead_fraction": 0.08,
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
        "preset": "ddr_controller",
        "shared_bandwidth_clients": 4.0,
        "arbitration_efficiency": 0.75,
        "calibration_overhead_fraction": 0.08,
        "overlap_model": "serialized_tier_path"
      },
      "contention_preset": "ddr_controller",
      "contention_overlap_model": "serialized_tier_path",
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
          "effective_bandwidth_bytes_per_ns": 192.0,
          "transfer_time_ns": 12.0,
          "contention_adjusted_transfer_time_ns": 64.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 69.12,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.001892863903085368,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 2.4,
          "contention_adjusted_transfer_pressure_ratio": 13.824000000000002,
          "compute_window_required_bandwidth_bytes_per_ns": 2457.6,
          "contention_bandwidth_utilization": 12.799999999999999,
          "contention_bandwidth_headroom_bytes_per_ns": -2265.6,
          "contention_bandwidth_headroom_ratio": 0.078125
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
          "effective_bandwidth_bytes_per_ns": 48.0,
          "transfer_time_ns": 48.0,
          "contention_adjusted_transfer_time_ns": 256.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 276.48,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.018928639030853685,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 9.6,
          "contention_adjusted_transfer_pressure_ratio": 55.29600000000001,
          "compute_window_required_bandwidth_bytes_per_ns": 2457.6,
          "contention_bandwidth_utilization": 51.199999999999996,
          "contention_bandwidth_headroom_bytes_per_ns": -2409.6,
          "contention_bandwidth_headroom_ratio": 0.01953125
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
          "effective_bandwidth_bytes_per_ns": 3.0,
          "transfer_time_ns": 768.0,
          "contention_adjusted_transfer_time_ns": 4096.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 4423.68,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9464319515426841,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 153.6,
          "contention_adjusted_transfer_pressure_ratio": 884.7360000000001,
          "compute_window_required_bandwidth_bytes_per_ns": 2457.6,
          "contention_bandwidth_utilization": 819.1999999999999,
          "contention_bandwidth_headroom_bytes_per_ns": -2454.6,
          "contention_bandwidth_headroom_ratio": 0.001220703125
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
      "max_tier_nominal_transfer_pressure_ratio": 153.6,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 884.7360000000001,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9464319515426841,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 819.1999999999999,
      "min_tier_contention_bandwidth_headroom_ratio": 0.001220703125,
      "max_transfer_time_ns": 768.0,
      "serial_transfer_time_ns": 828.0,
      "effective_transfer_time_ns": 768.0,
      "contention_bandwidth_derate_factor": 0.1875,
      "contention_adjusted_max_transfer_time_ns": 4096.0,
      "contention_adjusted_serial_transfer_time_ns": 4416.0,
      "contention_adjusted_effective_transfer_time_ns": 4096.0,
      "calibration_adjusted_effective_transfer_time_ns": 4423.68,
      "calibration_guardband_time_ns": 327.6800000000003,
      "contention_transfer_overhead_fraction": 4.333333333333333,
      "total_transfer_overhead_fraction": 4.760000000000001,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 9.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 8.333333333333332,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 9.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 8.333333333333332,
      "transfer_to_compute_time_ratio": 153.6,
      "bandwidth_limited_batch_latency_ns": 768.0,
      "bandwidth_pressure_ratio": 153.6,
      "bandwidth_limited_equivalent_ops_per_second": 682666666666.6666,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 4423.68,
      "contention_adjusted_transfer_to_compute_time_ratio": 884.7360000000001,
      "contention_pressure_ratio": 884.7360000000001,
      "contention_adjusted_equivalent_ops_per_second": 118518518518.5185,
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
    "The ddr profile is a local modeling preset, not a measured hardware configuration.",
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
