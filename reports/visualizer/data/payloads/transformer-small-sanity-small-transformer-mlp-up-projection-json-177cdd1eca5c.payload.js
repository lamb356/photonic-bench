window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["transformer_small_sanity/small_transformer_mlp_up_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Small transformer sanity layer - MLP up-projection",
    "description": "Tiny dense transformer layer shape for exact MAC-count sanity checks. This is a synthetic helper example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 4 x 8 times 8 x 16; operation multiplicity is 2. The right operand is a learned model-weight matrix."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 4,
      "k": 8,
      "n": 16
    },
    "macs": 1024,
    "equivalent_ops": 2048,
    "output_elements": 128
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
      "adc_conversions": 128,
      "vector_dac_conversions": 64,
      "weight_dac_conversions": 128,
      "dac_conversions": 192
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 64,
      "weight_operand_read_bytes": 128,
      "output_write_bytes": 128,
      "total_interface_bytes": 320,
      "macs_per_byte": 3.2,
      "equivalent_ops_per_byte": 6.4,
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
          "read_bytes": 192.0,
          "write_bytes": 128.0,
          "total_bytes": 320.0,
          "read_energy_pj": 3.84,
          "write_energy_pj": 2.56,
          "total_energy_pj": 6.4,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.3125,
          "contention_adjusted_transfer_time_ns": 0.3125,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 192.0,
          "write_bytes": 128.0,
          "total_bytes": 320.0,
          "read_energy_pj": 38.400000000000006,
          "write_energy_pj": 25.6,
          "total_energy_pj": 64.0,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 1.25,
          "contention_adjusted_transfer_time_ns": 1.25,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 192.0,
          "write_bytes": 128.0,
          "total_bytes": 320.0,
          "read_energy_pj": 1920.0,
          "write_energy_pj": 1280.0,
          "total_energy_pj": 3200.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 20.0,
          "contention_adjusted_transfer_time_ns": 20.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 132.608,
      "total_movement_energy_pj": 3270.4,
      "total_system_energy_pj": 3403.0080000000003,
      "system_energy_per_mac_pj": 3.3232500000000003,
      "system_energy_per_op_pj": 1.6616250000000001,
      "movement_energy_share": 0.9610321221695629,
      "total_hierarchy_bytes": 960.0,
      "hierarchy_equivalent_ops_per_byte": 2.1333333333333333,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
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
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
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
      "detector_pj": 1.28,
      "adc_pj": 64.0,
      "vector_dac_pj": 7.68,
      "weight_dac_pj": 57.6,
      "dac_pj": 65.28,
      "total_pj": 132.608,
      "energy_per_mac_pj": 0.1295,
      "energy_per_op_pj": 0.06475,
      "peripheral_share": 0.9845559845559846
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
    "Transformer operation: MLP up-projection.",
    "Transformer formula: B * S * H * intermediate.",
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
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": null
}
;
