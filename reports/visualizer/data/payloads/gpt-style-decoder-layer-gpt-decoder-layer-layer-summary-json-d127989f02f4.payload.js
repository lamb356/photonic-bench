window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["gpt_style_decoder_layer/gpt_decoder_layer_layer_summary.json"] = {
  "schema_version": "photonic-bench-transformer-layer-report-v1",
  "artifact_type": "transformer_layer_aggregate",
  "benchmark": {
    "name": "GPT-style decoder layer",
    "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card."
  },
  "transformer_layer": {
    "layer_type": "decoder",
    "attention_mode": "dense",
    "shape": {
      "batch_size": 1,
      "sequence_length": 1024,
      "hidden_size": 768,
      "num_heads": 12,
      "head_dim": 64,
      "attention_context_length": 1024,
      "kv_cache_enabled": false,
      "mlp_intermediate_size": 3072
    }
  },
  "workload": {
    "type": "transformer_layer",
    "matmul_count": 5,
    "macs": 8254390272,
    "equivalent_ops": 16508780544,
    "output_elements": 19660800
  },
  "aggregate_semantics": {
    "source": "Generated from decomposed per-matmul JSON cards emitted by the transformer-layer command.",
    "energy": "Additive local_model.energy components are summed; energy_per_mac_pj, energy_per_op_pj, and peripheral_share are recomputed from summed layer quantities.",
    "memory_traffic": "Interface memory traffic is summed from decomposed cards and operational intensity is recomputed from aggregate MAC/equivalent-op counts. It is not a full memory hierarchy simulation.",
    "system": "System movement energy/timing is summed from decomposed card estimates over explicit SRAM, intermediate/cache, and off-chip tiers. Bandwidth-limited and contention-adjusted serial timing are sums of decomposed batch latencies, not fused scheduler claims.",
    "timing": "serial_* timing fields assume the decomposed matmuls execute one after another. No parallel hardware scheduler or fused layer pipeline is modeled.",
    "noise": "Noise is not an additive layer total. Per-matmul noise remains in matmuls[].local_model.noise; aggregate noise fields are labeled diagnostic extrema."
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 19660800,
      "vector_dac_conversions": 18087936,
      "weight_dac_conversions": 8060928,
      "dac_conversions": 26148864
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 18087936,
      "weight_operand_read_bytes": 8060928,
      "output_write_bytes": 19660800,
      "total_interface_bytes": 45809664,
      "macs_per_byte": 180.18884120171674,
      "equivalent_ops_per_byte": 360.3776824034335,
      "note": "Summed from decomposed per-matmul interface traffic. This is not a full memory hierarchy simulation."
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
      "local_compute_and_conversion_energy_pj": 32333758.464,
      "total_movement_energy_pj": 468174766.08,
      "total_system_energy_pj": 500508524.54399997,
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 26148864.0,
          "write_bytes": 19660800.0,
          "total_bytes": 45809664.0,
          "read_energy_pj": 522977.28,
          "write_energy_pj": 393216.0,
          "total_energy_pj": 916193.28,
          "transfer_time_ns": 44736.0,
          "contention_adjusted_transfer_time_ns": 44736.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 26148864.0,
          "write_bytes": 19660800.0,
          "total_bytes": 45809664.0,
          "read_energy_pj": 5229772.800000001,
          "write_energy_pj": 3932160.0000000005,
          "total_energy_pj": 9161932.8,
          "transfer_time_ns": 178944.0,
          "contention_adjusted_transfer_time_ns": 178944.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 26148864.0,
          "write_bytes": 19660800.0,
          "total_bytes": 45809664.0,
          "read_energy_pj": 261488640.0,
          "write_energy_pj": 196608000.0,
          "total_energy_pj": 458096640.0,
          "transfer_time_ns": 2863104.0,
          "contention_adjusted_transfer_time_ns": 2863104.0
        }
      },
      "serial_transfer_time_ns": 2863104.0,
      "max_per_matmul_transfer_time_ns": 884736.0,
      "contention_adjusted_serial_transfer_time_ns": 2863104.0,
      "max_per_matmul_contention_adjusted_transfer_time_ns": 884736.0,
      "bandwidth_limited_serial_batch_latency_ns": 2863104.0,
      "contention_adjusted_serial_batch_latency_ns": 2863104.0,
      "system_energy_per_mac_pj": 0.060635432545731706,
      "system_energy_per_op_pj": 0.030317716272865853,
      "movement_energy_share": 0.9353981862877192,
      "total_hierarchy_bytes": 137428992.0,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "contention_bandwidth_derate_factor": 1.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "bandwidth_pressure_ratio": 41494.260869565216,
      "contention_pressure_ratio": 41494.260869565216,
      "bandwidth_limited_serial_effective_macs_per_second": 2883021459227.468,
      "bandwidth_limited_serial_effective_equivalent_ops_per_second": 5766042918454.936,
      "contention_adjusted_serial_effective_macs_per_second": 2883021459227.468,
      "contention_adjusted_serial_effective_equivalent_ops_per_second": 5766042918454.936,
      "note": "Summed from decomposed per-matmul system movement estimates. This is a serial aggregate over explicit SRAM, intermediate, and off-chip tiers with local contention assumptions, not a fused memory scheduler."
    },
    "energy": {
      "optical_compute_pj": 4127195.136,
      "laser_electrical_pj": 16508780.544,
      "detector_pj": 196608.0,
      "adc_pj": 9830400.0,
      "vector_dac_pj": 2170552.32,
      "weight_dac_pj": 3627417.6,
      "dac_pj": 5797969.92,
      "total_pj": 32333758.464,
      "energy_per_mac_pj": 0.003917158917682927,
      "energy_per_op_pj": 0.0019585794588414633,
      "peripheral_share": 0.4894258716511206
    },
    "timing": {
      "timing_model": "serial_sum_of_decomposed_batch_latencies",
      "serial_single_operation_latency_ns": 25.0,
      "serial_batch_latency_ns": 69.0,
      "serial_effective_macs_per_second": 1.1962884452173912e+17,
      "serial_effective_equivalent_ops_per_second": 2.3925768904347824e+17,
      "max_pipeline_cycle_time_ns": 2.0,
      "max_per_matmul_batch_latency_ns": 27.0
    },
    "noise": {
      "aggregation": "not_additive",
      "note": "Noise is not summed into a layer-level error model. Extrema below are diagnostics over per-matmul cards.",
      "max_quantization_rms": 0.004582144993568459,
      "max_phase_noise_rad_rms": 0.02,
      "max_drift_rms_rad": 3.0000000000000005e-10,
      "max_estimated_relative_error_rms": 0.02051818833966792
    }
  },
  "published_reference": null,
  "calibration_fit": null,
  "formula_audit": {
    "expected_total_macs": 8254390272,
    "json_total_macs": 8254390272,
    "mac_total_matches_decomposed_json": true,
    "expected_total_equivalent_ops": 16508780544,
    "json_total_equivalent_ops": 16508780544,
    "equivalent_ops_total_matches_decomposed_json": true,
    "rows": [
      {
        "operation_key": "qkv_projection",
        "label": "QKV projection",
        "formula": "3 * B * S * H * H",
        "expected_macs": 1811939328,
        "json_macs": 1811939328,
        "expected_equivalent_ops": 3623878656,
        "json_equivalent_ops": 3623878656
      },
      {
        "operation_key": "attention_scores",
        "label": "Attention scores",
        "formula": "B * heads * S_query * S_context * head_dim",
        "expected_macs": 805306368,
        "json_macs": 805306368,
        "expected_equivalent_ops": 1610612736,
        "json_equivalent_ops": 1610612736
      },
      {
        "operation_key": "attention_value",
        "label": "Attention-value",
        "formula": "B * heads * S_query * S_context * head_dim",
        "expected_macs": 805306368,
        "json_macs": 805306368,
        "expected_equivalent_ops": 1610612736,
        "json_equivalent_ops": 1610612736
      },
      {
        "operation_key": "mlp_up_projection",
        "label": "MLP up-projection",
        "formula": "B * S * H * intermediate",
        "expected_macs": 2415919104,
        "json_macs": 2415919104,
        "expected_equivalent_ops": 4831838208,
        "json_equivalent_ops": 4831838208
      },
      {
        "operation_key": "mlp_down_projection",
        "label": "MLP down-projection",
        "formula": "B * S * intermediate * H",
        "expected_macs": 2415919104,
        "json_macs": 2415919104,
        "expected_equivalent_ops": 4831838208,
        "json_equivalent_ops": 4831838208
      }
    ]
  },
  "matmuls": [
    {
      "operation_key": "qkv_projection",
      "label": "QKV projection",
      "formula": "3 * B * S * H * H",
      "json_report": "gpt_decoder_layer_qkv_projection.json",
      "benchmark": {
        "name": "GPT-style decoder layer - QKV projection",
        "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for QKV projection. Formula: 3 * B * S * H * H. Matmul shape is 1024 x 768 times 768 x 2304; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1024,
          "k": 768,
          "n": 2304
        },
        "macs": 1811939328,
        "equivalent_ops": 3623878656,
        "output_elements": 2359296
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
          "adc_conversions": 2359296,
          "vector_dac_conversions": 786432,
          "weight_dac_conversions": 1769472,
          "dac_conversions": 2555904
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 786432,
          "weight_operand_read_bytes": 1769472,
          "output_write_bytes": 2359296,
          "total_interface_bytes": 4915200,
          "macs_per_byte": 368.64,
          "equivalent_ops_per_byte": 737.28,
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
              "read_bytes": 2555904.0,
              "write_bytes": 2359296.0,
              "total_bytes": 4915200.0,
              "read_energy_pj": 51118.08,
              "write_energy_pj": 47185.92,
              "total_energy_pj": 98304.0,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 4800.0,
              "contention_adjusted_transfer_time_ns": 4800.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 2555904.0,
              "write_bytes": 2359296.0,
              "total_bytes": 4915200.0,
              "read_energy_pj": 511180.80000000005,
              "write_energy_pj": 471859.2,
              "total_energy_pj": 983040.0,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 19200.0,
              "contention_adjusted_transfer_time_ns": 19200.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 2555904.0,
              "write_bytes": 2359296.0,
              "total_bytes": 4915200.0,
              "read_energy_pj": 25559040.0,
              "write_energy_pj": 23592960.0,
              "total_energy_pj": 49152000.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 307200.0,
              "contention_adjusted_transfer_time_ns": 307200.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 5717753.856000001,
          "total_movement_energy_pj": 50233344.0,
          "total_system_energy_pj": 55951097.856,
          "system_energy_per_mac_pj": 0.030879123263888888,
          "system_energy_per_op_pj": 0.015439561631944444,
          "movement_energy_share": 0.8978080131561378,
          "total_hierarchy_bytes": 14745600.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 307200.0,
          "serial_transfer_time_ns": 331200.0,
          "effective_transfer_time_ns": 307200.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 307200.0,
          "contention_adjusted_serial_transfer_time_ns": 331200.0,
          "contention_adjusted_effective_transfer_time_ns": 307200.0,
          "calibration_adjusted_effective_transfer_time_ns": 307200.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 307200.0,
          "bandwidth_pressure_ratio": 61440.0,
          "bandwidth_limited_equivalent_ops_per_second": 11796479999999.998,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 307200.0,
          "contention_pressure_ratio": 61440.0,
          "contention_adjusted_equivalent_ops_per_second": 11796479999999.998,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 905969.664,
          "laser_electrical_pj": 3623878.656,
          "detector_pj": 23592.96,
          "adc_pj": 1179648.0,
          "vector_dac_pj": 94371.84,
          "weight_dac_pj": 796262.4,
          "dac_pj": 890634.24,
          "total_pj": 5717753.856000001,
          "energy_per_mac_pj": 0.0031555989583333336,
          "energy_per_op_pj": 0.0015777994791666668,
          "peripheral_share": 0.36620590055704555
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
          "steady_state_equivalent_ops_per_second": 1.811939328e+18
        },
        "noise": {
          "quantization_snr_db": 37.879999999999995,
          "quantization_rms": 0.004582144993568459,
          "phase_noise_rad_rms": 0.02,
          "drift_rms_rad": 3.0000000000000005e-10,
          "estimated_relative_error_rms": 0.02051818833966792
        }
      },
      "assumptions": [
        "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
        "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
        "ADC conversions are counted once per output element.",
        "DAC conversions are counted once per input value for the left and right matmul operands.",
        "Detector energy is counted once per output sample.",
        "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
        "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
        "Dense full-context decoder self-attention is used for layer-level accounting.",
        "The decoder label does not apply causal triangular halving or KV-cache incremental decoding.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Transformer operation: QKV projection.",
        "Transformer formula: 3 * B * S * H * H.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.",
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
    },
    {
      "operation_key": "attention_scores",
      "label": "Attention scores",
      "formula": "B * heads * S_query * S_context * head_dim",
      "json_report": "gpt_decoder_layer_attention_scores.json",
      "benchmark": {
        "name": "GPT-style decoder layer - Attention scores",
        "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for Attention scores. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 1024 x 64 times 64 x 1024; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1024,
          "k": 64,
          "n": 1024
        },
        "macs": 805306368,
        "equivalent_ops": 1610612736,
        "output_elements": 12582912
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
          "batch_size": 12,
          "vector_reuse_factor": 1,
          "weight_reuse_factor": 1,
          "weight_stationary": false,
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
          "adc_conversions": 12582912,
          "vector_dac_conversions": 786432,
          "weight_dac_conversions": 786432,
          "dac_conversions": 1572864
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 786432,
          "weight_operand_read_bytes": 786432,
          "output_write_bytes": 12582912,
          "total_interface_bytes": 14155776,
          "macs_per_byte": 56.888888888888886,
          "equivalent_ops_per_byte": 113.77777777777777,
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
              "read_bytes": 1572864.0,
              "write_bytes": 12582912.0,
              "total_bytes": 14155776.0,
              "read_energy_pj": 31457.28,
              "write_energy_pj": 251658.24,
              "total_energy_pj": 283115.52,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 13824.0,
              "contention_adjusted_transfer_time_ns": 13824.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 1572864.0,
              "write_bytes": 12582912.0,
              "total_bytes": 14155776.0,
              "read_energy_pj": 314572.80000000005,
              "write_energy_pj": 2516582.4000000004,
              "total_energy_pj": 2831155.2,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 55296.0,
              "contention_adjusted_transfer_time_ns": 55296.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 1572864.0,
              "write_bytes": 12582912.0,
              "total_bytes": 14155776.0,
              "read_energy_pj": 15728640.0,
              "write_energy_pj": 125829120.0,
              "total_energy_pj": 141557760.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 884736.0,
              "contention_adjusted_transfer_time_ns": 884736.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 8476164.096,
          "total_movement_energy_pj": 144672030.72,
          "total_system_energy_pj": 153148194.81599998,
          "system_energy_per_mac_pj": 0.19017382812499997,
          "system_energy_per_op_pj": 0.09508691406249999,
          "movement_energy_share": 0.9446538425987738,
          "total_hierarchy_bytes": 42467328.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 884736.0,
          "serial_transfer_time_ns": 953856.0,
          "effective_transfer_time_ns": 884736.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 884736.0,
          "contention_adjusted_serial_transfer_time_ns": 953856.0,
          "contention_adjusted_effective_transfer_time_ns": 884736.0,
          "calibration_adjusted_effective_transfer_time_ns": 884736.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 884736.0,
          "bandwidth_pressure_ratio": 32768.0,
          "bandwidth_limited_equivalent_ops_per_second": 1820444444444.4443,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 884736.0,
          "contention_pressure_ratio": 32768.0,
          "contention_adjusted_equivalent_ops_per_second": 1820444444444.4443,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 402653.184,
          "laser_electrical_pj": 1610612.736,
          "detector_pj": 125829.12,
          "adc_pj": 6291456.0,
          "vector_dac_pj": 94371.84,
          "weight_dac_pj": 353894.4,
          "dac_pj": 448266.24,
          "total_pj": 8476164.096,
          "energy_per_mac_pj": 0.010525390625,
          "energy_per_op_pj": 0.0052626953125,
          "peripheral_share": 0.8099832993134162
        },
        "timing": {
          "optical_latency_ns": 3.0,
          "adc_latency_ns": 1.0,
          "dac_latency_ns": 1.0,
          "total_latency_ns": 5.0,
          "pipeline_stages": 4,
          "pipeline_cycle_time_ns": 2.0,
          "batch_latency_ns": 27.0,
          "steady_state_operations_per_second": 500000000.0,
          "steady_state_equivalent_ops_per_second": 6.7108864e+16
        },
        "noise": {
          "quantization_snr_db": 37.879999999999995,
          "quantization_rms": 0.004582144993568459,
          "phase_noise_rad_rms": 0.02,
          "drift_rms_rad": 3.0000000000000005e-10,
          "estimated_relative_error_rms": 0.02051818833966792
        }
      },
      "assumptions": [
        "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
        "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
        "ADC conversions are counted once per output element.",
        "DAC conversions are counted once per input value for the left and right matmul operands.",
        "Detector energy is counted once per output sample.",
        "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
        "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
        "Dense full-context decoder self-attention is used for layer-level accounting.",
        "The decoder label does not apply causal triangular halving or KV-cache incremental decoding.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Transformer operation: Attention scores.",
        "Transformer formula: B * heads * S_query * S_context * head_dim.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.",
        "Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.",
        "The benchmark models 12 operation(s) per batch.",
        "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
        "Weight DAC conversions are counted every 1 operation(s).",
        "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
        "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
        "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
        "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
      ],
      "provenance": null
    },
    {
      "operation_key": "attention_value",
      "label": "Attention-value",
      "formula": "B * heads * S_query * S_context * head_dim",
      "json_report": "gpt_decoder_layer_attention_value.json",
      "benchmark": {
        "name": "GPT-style decoder layer - Attention-value",
        "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for Attention-value. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 1024 x 1024 times 1024 x 64; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1024,
          "k": 1024,
          "n": 64
        },
        "macs": 805306368,
        "equivalent_ops": 1610612736,
        "output_elements": 786432
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
          "batch_size": 12,
          "vector_reuse_factor": 1,
          "weight_reuse_factor": 1,
          "weight_stationary": false,
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
          "adc_conversions": 786432,
          "vector_dac_conversions": 12582912,
          "weight_dac_conversions": 786432,
          "dac_conversions": 13369344
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 12582912,
          "weight_operand_read_bytes": 786432,
          "output_write_bytes": 786432,
          "total_interface_bytes": 14155776,
          "macs_per_byte": 56.888888888888886,
          "equivalent_ops_per_byte": 113.77777777777777,
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
              "read_bytes": 13369344.0,
              "write_bytes": 786432.0,
              "total_bytes": 14155776.0,
              "read_energy_pj": 267386.88,
              "write_energy_pj": 15728.64,
              "total_energy_pj": 283115.52,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 13824.0,
              "contention_adjusted_transfer_time_ns": 13824.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 13369344.0,
              "write_bytes": 786432.0,
              "total_bytes": 14155776.0,
              "read_energy_pj": 2673868.8000000003,
              "write_energy_pj": 157286.40000000002,
              "total_energy_pj": 2831155.2,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 55296.0,
              "contention_adjusted_transfer_time_ns": 55296.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 13369344.0,
              "write_bytes": 786432.0,
              "total_bytes": 14155776.0,
              "read_energy_pj": 133693440.0,
              "write_energy_pj": 7864320.0,
              "total_energy_pj": 141557760.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 884736.0,
              "contention_adjusted_transfer_time_ns": 884736.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 3875536.8959999997,
          "total_movement_energy_pj": 144672030.72,
          "total_system_energy_pj": 148547567.616,
          "system_energy_per_mac_pj": 0.1844609375,
          "system_energy_per_op_pj": 0.09223046875,
          "movement_energy_share": 0.9739104654610139,
          "total_hierarchy_bytes": 42467328.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 884736.0,
          "serial_transfer_time_ns": 953856.0,
          "effective_transfer_time_ns": 884736.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 884736.0,
          "contention_adjusted_serial_transfer_time_ns": 953856.0,
          "contention_adjusted_effective_transfer_time_ns": 884736.0,
          "calibration_adjusted_effective_transfer_time_ns": 884736.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 884736.0,
          "bandwidth_pressure_ratio": 32768.0,
          "bandwidth_limited_equivalent_ops_per_second": 1820444444444.4443,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 884736.0,
          "contention_pressure_ratio": 32768.0,
          "contention_adjusted_equivalent_ops_per_second": 1820444444444.4443,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 402653.184,
          "laser_electrical_pj": 1610612.736,
          "detector_pj": 7864.32,
          "adc_pj": 393216.0,
          "vector_dac_pj": 1509949.44,
          "weight_dac_pj": 353894.4,
          "dac_pj": 1863843.8399999999,
          "total_pj": 3875536.8959999997,
          "energy_per_mac_pj": 0.0048125,
          "energy_per_op_pj": 0.00240625,
          "peripheral_share": 0.5844155844155844
        },
        "timing": {
          "optical_latency_ns": 3.0,
          "adc_latency_ns": 1.0,
          "dac_latency_ns": 1.0,
          "total_latency_ns": 5.0,
          "pipeline_stages": 4,
          "pipeline_cycle_time_ns": 2.0,
          "batch_latency_ns": 27.0,
          "steady_state_operations_per_second": 500000000.0,
          "steady_state_equivalent_ops_per_second": 6.7108864e+16
        },
        "noise": {
          "quantization_snr_db": 37.879999999999995,
          "quantization_rms": 0.004582144993568459,
          "phase_noise_rad_rms": 0.02,
          "drift_rms_rad": 3.0000000000000005e-10,
          "estimated_relative_error_rms": 0.02051818833966792
        }
      },
      "assumptions": [
        "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
        "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
        "ADC conversions are counted once per output element.",
        "DAC conversions are counted once per input value for the left and right matmul operands.",
        "Detector energy is counted once per output sample.",
        "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
        "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
        "Dense full-context decoder self-attention is used for layer-level accounting.",
        "The decoder label does not apply causal triangular halving or KV-cache incremental decoding.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Transformer operation: Attention-value.",
        "Transformer formula: B * heads * S_query * S_context * head_dim.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.",
        "Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.",
        "The benchmark models 12 operation(s) per batch.",
        "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
        "Weight DAC conversions are counted every 1 operation(s).",
        "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
        "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
        "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
        "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
      ],
      "provenance": null
    },
    {
      "operation_key": "mlp_up_projection",
      "label": "MLP up-projection",
      "formula": "B * S * H * intermediate",
      "json_report": "gpt_decoder_layer_mlp_up_projection.json",
      "benchmark": {
        "name": "GPT-style decoder layer - MLP up-projection",
        "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 1024 x 768 times 768 x 3072; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1024,
          "k": 768,
          "n": 3072
        },
        "macs": 2415919104,
        "equivalent_ops": 4831838208,
        "output_elements": 3145728
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
          "adc_conversions": 3145728,
          "vector_dac_conversions": 786432,
          "weight_dac_conversions": 2359296,
          "dac_conversions": 3145728
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 786432,
          "weight_operand_read_bytes": 2359296,
          "output_write_bytes": 3145728,
          "total_interface_bytes": 6291456,
          "macs_per_byte": 384.0,
          "equivalent_ops_per_byte": 768.0,
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
              "read_bytes": 3145728.0,
              "write_bytes": 3145728.0,
              "total_bytes": 6291456.0,
              "read_energy_pj": 62914.56,
              "write_energy_pj": 62914.56,
              "total_energy_pj": 125829.12,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 6144.0,
              "contention_adjusted_transfer_time_ns": 6144.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 3145728.0,
              "write_bytes": 3145728.0,
              "total_bytes": 6291456.0,
              "read_energy_pj": 629145.6000000001,
              "write_energy_pj": 629145.6000000001,
              "total_energy_pj": 1258291.2000000002,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 24576.0,
              "contention_adjusted_transfer_time_ns": 24576.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 3145728.0,
              "write_bytes": 3145728.0,
              "total_bytes": 6291456.0,
              "read_energy_pj": 31457280.0,
              "write_energy_pj": 31457280.0,
              "total_energy_pj": 62914560.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 393216.0,
              "contention_adjusted_transfer_time_ns": 393216.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 7592214.528,
          "total_movement_energy_pj": 64298680.32,
          "total_system_energy_pj": 71890894.848,
          "system_energy_per_mac_pj": 0.029757161458333334,
          "system_energy_per_op_pj": 0.014878580729166667,
          "movement_energy_share": 0.8943925438116699,
          "total_hierarchy_bytes": 18874368.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 393216.0,
          "serial_transfer_time_ns": 423936.0,
          "effective_transfer_time_ns": 393216.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 393216.0,
          "contention_adjusted_serial_transfer_time_ns": 423936.0,
          "contention_adjusted_effective_transfer_time_ns": 393216.0,
          "calibration_adjusted_effective_transfer_time_ns": 393216.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 393216.0,
          "bandwidth_pressure_ratio": 78643.2,
          "bandwidth_limited_equivalent_ops_per_second": 12287999999999.998,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 393216.0,
          "contention_pressure_ratio": 78643.2,
          "contention_adjusted_equivalent_ops_per_second": 12287999999999.998,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 1207959.552,
          "laser_electrical_pj": 4831838.208,
          "detector_pj": 31457.28,
          "adc_pj": 1572864.0,
          "vector_dac_pj": 94371.84,
          "weight_dac_pj": 1061683.2,
          "dac_pj": 1156055.04,
          "total_pj": 7592214.528,
          "energy_per_mac_pj": 0.003142578125,
          "energy_per_op_pj": 0.0015712890625,
          "peripheral_share": 0.3635798632691113
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
          "steady_state_equivalent_ops_per_second": 2.415919104e+18
        },
        "noise": {
          "quantization_snr_db": 37.879999999999995,
          "quantization_rms": 0.004582144993568459,
          "phase_noise_rad_rms": 0.02,
          "drift_rms_rad": 3.0000000000000005e-10,
          "estimated_relative_error_rms": 0.02051818833966792
        }
      },
      "assumptions": [
        "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
        "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
        "ADC conversions are counted once per output element.",
        "DAC conversions are counted once per input value for the left and right matmul operands.",
        "Detector energy is counted once per output sample.",
        "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
        "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
        "Dense full-context decoder self-attention is used for layer-level accounting.",
        "The decoder label does not apply causal triangular halving or KV-cache incremental decoding.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Transformer operation: MLP up-projection.",
        "Transformer formula: B * S * H * intermediate.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.",
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
    },
    {
      "operation_key": "mlp_down_projection",
      "label": "MLP down-projection",
      "formula": "B * S * intermediate * H",
      "json_report": "gpt_decoder_layer_mlp_down_projection.json",
      "benchmark": {
        "name": "GPT-style decoder layer - MLP down-projection",
        "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 1024 x 3072 times 3072 x 768; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1024,
          "k": 3072,
          "n": 768
        },
        "macs": 2415919104,
        "equivalent_ops": 4831838208,
        "output_elements": 786432
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
          "adc_conversions": 786432,
          "vector_dac_conversions": 3145728,
          "weight_dac_conversions": 2359296,
          "dac_conversions": 5505024
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 3145728,
          "weight_operand_read_bytes": 2359296,
          "output_write_bytes": 786432,
          "total_interface_bytes": 6291456,
          "macs_per_byte": 384.0,
          "equivalent_ops_per_byte": 768.0,
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
              "read_bytes": 5505024.0,
              "write_bytes": 786432.0,
              "total_bytes": 6291456.0,
              "read_energy_pj": 110100.48,
              "write_energy_pj": 15728.64,
              "total_energy_pj": 125829.12,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 6144.0,
              "contention_adjusted_transfer_time_ns": 6144.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 5505024.0,
              "write_bytes": 786432.0,
              "total_bytes": 6291456.0,
              "read_energy_pj": 1101004.8,
              "write_energy_pj": 157286.40000000002,
              "total_energy_pj": 1258291.2000000002,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 24576.0,
              "contention_adjusted_transfer_time_ns": 24576.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 5505024.0,
              "write_bytes": 786432.0,
              "total_bytes": 6291456.0,
              "read_energy_pj": 55050240.0,
              "write_energy_pj": 7864320.0,
              "total_energy_pj": 62914560.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 393216.0,
              "contention_adjusted_transfer_time_ns": 393216.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 6672089.0879999995,
          "total_movement_energy_pj": 64298680.32,
          "total_system_energy_pj": 70970769.40799999,
          "system_energy_per_mac_pj": 0.02937630208333333,
          "system_energy_per_op_pj": 0.014688151041666665,
          "movement_energy_share": 0.9059882097424761,
          "total_hierarchy_bytes": 18874368.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 393216.0,
          "serial_transfer_time_ns": 423936.0,
          "effective_transfer_time_ns": 393216.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 393216.0,
          "contention_adjusted_serial_transfer_time_ns": 423936.0,
          "contention_adjusted_effective_transfer_time_ns": 393216.0,
          "calibration_adjusted_effective_transfer_time_ns": 393216.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 393216.0,
          "bandwidth_pressure_ratio": 78643.2,
          "bandwidth_limited_equivalent_ops_per_second": 12287999999999.998,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 393216.0,
          "contention_pressure_ratio": 78643.2,
          "contention_adjusted_equivalent_ops_per_second": 12287999999999.998,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 1207959.552,
          "laser_electrical_pj": 4831838.208,
          "detector_pj": 7864.32,
          "adc_pj": 393216.0,
          "vector_dac_pj": 377487.36,
          "weight_dac_pj": 1061683.2,
          "dac_pj": 1439170.56,
          "total_pj": 6672089.0879999995,
          "energy_per_mac_pj": 0.00276171875,
          "energy_per_op_pj": 0.001380859375,
          "peripheral_share": 0.27581329561527584
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
          "steady_state_equivalent_ops_per_second": 2.415919104e+18
        },
        "noise": {
          "quantization_snr_db": 37.879999999999995,
          "quantization_rms": 0.004582144993568459,
          "phase_noise_rad_rms": 0.02,
          "drift_rms_rad": 3.0000000000000005e-10,
          "estimated_relative_error_rms": 0.02051818833966792
        }
      },
      "assumptions": [
        "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
        "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
        "ADC conversions are counted once per output element.",
        "DAC conversions are counted once per input value for the left and right matmul operands.",
        "Detector energy is counted once per output sample.",
        "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
        "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
        "Dense full-context decoder self-attention is used for layer-level accounting.",
        "The decoder label does not apply causal triangular halving or KV-cache incremental decoding.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Transformer operation: MLP down-projection.",
        "Transformer formula: B * S * intermediate * H.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, attention_context=1024, intermediate=3072.",
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
  ],
  "assumptions": [
    "Dense full-context decoder self-attention is used for layer-level accounting.",
    "The decoder label does not apply causal triangular halving or KV-cache incremental decoding.",
    "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
    "Aggregate transformer-layer JSON is generated by loading the decomposed per-matmul JSON cards.",
    "Layer energy and conversion counts are sums of decomposed local model card values.",
    "Layer system movement energy, bandwidth-limited timing, and contention-adjusted timing are sums of decomposed local model card values.",
    "Layer serial timing is a sum of decomposed batch latencies, not a claim about a fused hardware scheduler.",
    "Transformer-layer configs reject published_calibration, so this aggregate JSON carries no layer-level published calibration target."
  ],
  "exclusions": [
    "softmax",
    "layer_norm",
    "bias_adds",
    "activation_functions",
    "dropout",
    "masking",
    "kv_cache_incremental_decoding",
    "causal_triangular_halving",
    "non_matmul_memory_traffic"
  ],
  "provenance": null
}
;
