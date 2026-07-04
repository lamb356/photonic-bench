window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["bert_base_encoder_layer/bert_base_layer_mlp_up_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "BERT-base style encoder layer - MLP up-projection",
    "description": "Dense one-layer BERT-base style encoder benchmark shape with hidden size 768, 12 attention heads, sequence length 128, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 128 x 768 times 768 x 3072; operation multiplicity is 1. The right operand is a learned model-weight matrix."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 128,
      "k": 768,
      "n": 3072
    },
    "macs": 301989888,
    "equivalent_ops": 603979776,
    "output_elements": 393216
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
      "batch_size": 1,
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
      "memory_timing_mode": "overlapped",
      "contention": {
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0
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
      "adc_conversions": 393216,
      "vector_dac_conversions": 98304,
      "weight_dac_conversions": 2359296,
      "dac_conversions": 2457600
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 98304,
      "weight_operand_read_bytes": 2359296,
      "output_write_bytes": 393216,
      "total_interface_bytes": 2850816,
      "macs_per_byte": 105.93103448275862,
      "equivalent_ops_per_byte": 211.86206896551724,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "system": {
      "profile": "default",
      "profile_overrides": [],
      "memory_timing_mode": "overlapped",
      "contention": {
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0
      },
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 2457600.0,
          "write_bytes": 393216.0,
          "total_bytes": 2850816.0,
          "read_energy_pj": 49152.0,
          "write_energy_pj": 7864.32,
          "total_energy_pj": 57016.32,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 2784.0,
          "contention_adjusted_transfer_time_ns": 2784.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 2784.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.001838445055850693,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 556.8,
          "contention_adjusted_transfer_pressure_ratio": 556.8,
          "compute_window_required_bandwidth_bytes_per_ns": 570163.2,
          "contention_bandwidth_utilization": 556.8,
          "contention_bandwidth_headroom_bytes_per_ns": -569139.2,
          "contention_bandwidth_headroom_ratio": 0.001795977011494253
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 2457600.0,
          "write_bytes": 393216.0,
          "total_bytes": 2850816.0,
          "read_energy_pj": 491520.0,
          "write_energy_pj": 78643.20000000001,
          "total_energy_pj": 570163.2,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 11136.0,
          "contention_adjusted_transfer_time_ns": 11136.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 11136.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266144,
          "system_energy_share": 0.01838445055850693,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 2227.2,
          "contention_adjusted_transfer_pressure_ratio": 2227.2,
          "compute_window_required_bandwidth_bytes_per_ns": 570163.2,
          "contention_bandwidth_utilization": 2227.2,
          "contention_bandwidth_headroom_bytes_per_ns": -569907.2,
          "contention_bandwidth_headroom_ratio": 0.00044899425287356327
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 2457600.0,
          "write_bytes": 393216.0,
          "total_bytes": 2850816.0,
          "read_energy_pj": 24576000.0,
          "write_energy_pj": 3932160.0,
          "total_energy_pj": 28508160.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 178176.0,
          "contention_adjusted_transfer_time_ns": 178176.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 178176.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133073,
          "system_energy_share": 0.9192225279253464,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 35635.2,
          "contention_adjusted_transfer_pressure_ratio": 35635.2,
          "compute_window_required_bandwidth_bytes_per_ns": 570163.2,
          "contention_bandwidth_utilization": 35635.2,
          "contention_bandwidth_headroom_bytes_per_ns": -570147.2,
          "contention_bandwidth_headroom_ratio": 2.8062140804597704e-05
        }
      },
      "local_compute_and_conversion_energy_pj": 1877999.616,
      "total_movement_energy_pj": 29135339.52,
      "total_system_energy_pj": 31013339.136,
      "system_energy_per_mac_pj": 0.10269661458333333,
      "system_energy_per_op_pj": 0.051348307291666666,
      "local_compute_and_conversion_energy_share": 0.060554576460295925,
      "movement_energy_share": 0.9394454235397041,
      "movement_to_compute_energy_ratio": 15.514028475711893,
      "total_hierarchy_bytes": 8552448.0,
      "hierarchy_equivalent_ops_per_byte": 70.62068965517241,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 35635.2,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 35635.2,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "max_tier_system_energy_share": 0.9192225279253464,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 35635.2,
      "min_tier_contention_bandwidth_headroom_ratio": 2.8062140804597704e-05,
      "max_transfer_time_ns": 178176.0,
      "serial_transfer_time_ns": 192096.0,
      "effective_transfer_time_ns": 178176.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 178176.0,
      "contention_adjusted_serial_transfer_time_ns": 192096.0,
      "contention_adjusted_effective_transfer_time_ns": 178176.0,
      "calibration_adjusted_effective_transfer_time_ns": 178176.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 35635.2,
      "bandwidth_limited_batch_latency_ns": 178176.0,
      "bandwidth_pressure_ratio": 35635.2,
      "bandwidth_limited_equivalent_ops_per_second": 3389793103448.2754,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 178176.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 35635.2,
      "contention_pressure_ratio": 35635.2,
      "contention_adjusted_equivalent_ops_per_second": 3389793103448.2754,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 150994.944,
      "laser_electrical_pj": 603979.776,
      "detector_pj": 3932.16,
      "adc_pj": 196608.0,
      "vector_dac_pj": 11796.48,
      "weight_dac_pj": 1061683.2,
      "dac_pj": 1073479.68,
      "total_pj": 1877999.616,
      "energy_per_mac_pj": 0.0062187499999999995,
      "energy_per_op_pj": 0.0031093749999999997,
      "peripheral_share": 0.6783919597989949
    },
    "timing": {
      "optical_latency_ns": 3.0,
      "adc_latency_ns": 1.0,
      "dac_latency_ns": 1.0,
      "total_latency_ns": 5.0,
      "pipeline_stages": 4,
      "pipeline_cycle_time_ns": 2.0,
      "batch_latency_ns": 5.0,
      "steady_state_operations_per_second": 500000000.0,
      "steady_state_equivalent_ops_per_second": 3.01989888e+17
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
    "Dense full-sequence encoder self-attention is used.",
    "BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.",
    "Transformer operation: MLP up-projection.",
    "Transformer formula: B * S * H * intermediate.",
    "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
    "Layer shape: batch=1, sequence=128, hidden=768, heads=12, head_dim=64, attention_context=128, intermediate=3072.",
    "Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.",
    "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": null
}
;
