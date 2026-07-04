window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["bert_base_12layer_model/encoder_block/bert_base_12layer_encoder_block_layer_summary.json"] = {
  "schema_version": "photonic-bench-transformer-layer-report-v1",
  "artifact_type": "transformer_layer_aggregate",
  "benchmark": {
    "name": "BERT-base style 12-layer encoder model - encoder_block",
    "description": "Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card."
  },
  "transformer_layer": {
    "layer_type": "encoder",
    "attention_mode": "dense",
    "shape": {
      "batch_size": 1,
      "sequence_length": 128,
      "hidden_size": 768,
      "num_heads": 12,
      "head_dim": 64,
      "attention_context_length": 128,
      "kv_cache_enabled": false,
      "mlp_intermediate_size": 3072
    }
  },
  "workload": {
    "type": "transformer_layer",
    "matmul_count": 5,
    "macs": 855638016,
    "equivalent_ops": 1711276032,
    "output_elements": 1081344
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
      "adc_conversions": 1081344,
      "vector_dac_conversions": 884736,
      "weight_dac_conversions": 6684672,
      "dac_conversions": 7569408
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 884736,
      "weight_operand_read_bytes": 6684672,
      "output_write_bytes": 1081344,
      "total_interface_bytes": 8650752,
      "macs_per_byte": 98.9090909090909,
      "equivalent_ops_per_byte": 197.8181818181818,
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
      "local_compute_and_conversion_energy_pj": 5377032.192,
      "total_movement_energy_pj": 88410685.44,
      "total_system_energy_pj": 93787717.632,
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 7569408.0,
          "write_bytes": 1081344.0,
          "total_bytes": 8650752.0,
          "read_energy_pj": 151388.16,
          "write_energy_pj": 21626.879999999997,
          "total_energy_pj": 173015.04,
          "transfer_time_ns": 8448.0,
          "contention_adjusted_transfer_time_ns": 8448.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 7569408.0,
          "write_bytes": 1081344.0,
          "total_bytes": 8650752.0,
          "read_energy_pj": 1513881.6,
          "write_energy_pj": 216268.80000000002,
          "total_energy_pj": 1730150.4000000001,
          "transfer_time_ns": 33792.0,
          "contention_adjusted_transfer_time_ns": 33792.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 7569408.0,
          "write_bytes": 1081344.0,
          "total_bytes": 8650752.0,
          "read_energy_pj": 75694080.0,
          "write_energy_pj": 10813440.0,
          "total_energy_pj": 86507520.0,
          "transfer_time_ns": 540672.0,
          "contention_adjusted_transfer_time_ns": 540672.0
        }
      },
      "serial_transfer_time_ns": 540672.0,
      "max_per_matmul_transfer_time_ns": 178176.0,
      "contention_adjusted_serial_transfer_time_ns": 540672.0,
      "max_per_matmul_contention_adjusted_transfer_time_ns": 178176.0,
      "bandwidth_limited_serial_batch_latency_ns": 540672.0,
      "contention_adjusted_serial_batch_latency_ns": 540672.0,
      "system_energy_per_mac_pj": 0.10961144301470588,
      "system_energy_per_op_pj": 0.05480572150735294,
      "movement_energy_share": 0.9426680558205056,
      "total_hierarchy_bytes": 25952256.0,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "contention_bandwidth_derate_factor": 1.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "bandwidth_pressure_ratio": 7835.826086956522,
      "contention_pressure_ratio": 7835.826086956522,
      "bandwidth_limited_serial_effective_macs_per_second": 1582545454545.4543,
      "bandwidth_limited_serial_effective_equivalent_ops_per_second": 3165090909090.9087,
      "contention_adjusted_serial_effective_macs_per_second": 1582545454545.4543,
      "contention_adjusted_serial_effective_equivalent_ops_per_second": 3165090909090.9087,
      "note": "Summed from decomposed per-matmul system movement estimates. This is a serial aggregate over explicit SRAM, intermediate, and off-chip tiers with local contention assumptions, not a fused memory scheduler."
    },
    "energy": {
      "optical_compute_pj": 427819.008,
      "laser_electrical_pj": 1711276.032,
      "detector_pj": 10813.439999999999,
      "adc_pj": 540672.0,
      "vector_dac_pj": 106168.31999999999,
      "weight_dac_pj": 3008102.4,
      "dac_pj": 3114270.7199999997,
      "total_pj": 5377032.192,
      "energy_per_mac_pj": 0.006284237132352941,
      "energy_per_op_pj": 0.0031421185661764705,
      "peripheral_share": 0.6817433909832169
    },
    "timing": {
      "timing_model": "serial_sum_of_decomposed_batch_latencies",
      "serial_single_operation_latency_ns": 25.0,
      "serial_batch_latency_ns": 69.0,
      "serial_effective_macs_per_second": 1.2400550956521738e+16,
      "serial_effective_equivalent_ops_per_second": 2.4801101913043476e+16,
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
    "expected_total_macs": 855638016,
    "json_total_macs": 855638016,
    "mac_total_matches_decomposed_json": true,
    "expected_total_equivalent_ops": 1711276032,
    "json_total_equivalent_ops": 1711276032,
    "equivalent_ops_total_matches_decomposed_json": true,
    "rows": [
      {
        "operation_key": "qkv_projection",
        "label": "QKV projection",
        "formula": "3 * B * S * H * H",
        "expected_macs": 226492416,
        "json_macs": 226492416,
        "expected_equivalent_ops": 452984832,
        "json_equivalent_ops": 452984832
      },
      {
        "operation_key": "attention_scores",
        "label": "Attention scores",
        "formula": "B * heads * S_query * S_context * head_dim",
        "expected_macs": 12582912,
        "json_macs": 12582912,
        "expected_equivalent_ops": 25165824,
        "json_equivalent_ops": 25165824
      },
      {
        "operation_key": "attention_value",
        "label": "Attention-value",
        "formula": "B * heads * S_query * S_context * head_dim",
        "expected_macs": 12582912,
        "json_macs": 12582912,
        "expected_equivalent_ops": 25165824,
        "json_equivalent_ops": 25165824
      },
      {
        "operation_key": "mlp_up_projection",
        "label": "MLP up-projection",
        "formula": "B * S * H * intermediate",
        "expected_macs": 301989888,
        "json_macs": 301989888,
        "expected_equivalent_ops": 603979776,
        "json_equivalent_ops": 603979776
      },
      {
        "operation_key": "mlp_down_projection",
        "label": "MLP down-projection",
        "formula": "B * S * intermediate * H",
        "expected_macs": 301989888,
        "json_macs": 301989888,
        "expected_equivalent_ops": 603979776,
        "json_equivalent_ops": 603979776
      }
    ]
  },
  "matmuls": [
    {
      "operation_key": "qkv_projection",
      "label": "QKV projection",
      "formula": "3 * B * S * H * H",
      "json_report": "bert_base_12layer_encoder_block_qkv_projection.json",
      "benchmark": {
        "name": "BERT-base style 12-layer encoder model - encoder_block - QKV projection",
        "description": "Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for QKV projection. Formula: 3 * B * S * H * H. Matmul shape is 128 x 768 times 768 x 2304; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 128,
          "k": 768,
          "n": 2304
        },
        "macs": 226492416,
        "equivalent_ops": 452984832,
        "output_elements": 294912
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
          "adc_conversions": 294912,
          "vector_dac_conversions": 98304,
          "weight_dac_conversions": 1769472,
          "dac_conversions": 1867776
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 98304,
          "weight_operand_read_bytes": 1769472,
          "output_write_bytes": 294912,
          "total_interface_bytes": 2162688,
          "macs_per_byte": 104.72727272727273,
          "equivalent_ops_per_byte": 209.45454545454547,
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
              "read_bytes": 1867776.0,
              "write_bytes": 294912.0,
              "total_bytes": 2162688.0,
              "read_energy_pj": 37355.520000000004,
              "write_energy_pj": 5898.24,
              "total_energy_pj": 43253.76,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 2112.0,
              "contention_adjusted_transfer_time_ns": 2112.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 1867776.0,
              "write_bytes": 294912.0,
              "total_bytes": 2162688.0,
              "read_energy_pj": 373555.2,
              "write_energy_pj": 58982.4,
              "total_energy_pj": 432537.60000000003,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 8448.0,
              "contention_adjusted_transfer_time_ns": 8448.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 1867776.0,
              "write_bytes": 294912.0,
              "total_bytes": 2162688.0,
              "read_energy_pj": 18677760.0,
              "write_energy_pj": 2949120.0,
              "total_energy_pj": 21626880.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 135168.0,
              "contention_adjusted_transfer_time_ns": 135168.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 1411448.832,
          "total_movement_energy_pj": 22102671.36,
          "total_system_energy_pj": 23514120.191999998,
          "system_energy_per_mac_pj": 0.10381857638888888,
          "system_energy_per_op_pj": 0.05190928819444444,
          "movement_energy_share": 0.9399744145017935,
          "total_hierarchy_bytes": 6488064.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 135168.0,
          "serial_transfer_time_ns": 145728.0,
          "effective_transfer_time_ns": 135168.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 135168.0,
          "contention_adjusted_serial_transfer_time_ns": 145728.0,
          "contention_adjusted_effective_transfer_time_ns": 135168.0,
          "calibration_adjusted_effective_transfer_time_ns": 135168.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 135168.0,
          "bandwidth_pressure_ratio": 27033.6,
          "bandwidth_limited_equivalent_ops_per_second": 3351272727272.727,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 135168.0,
          "contention_pressure_ratio": 27033.6,
          "contention_adjusted_equivalent_ops_per_second": 3351272727272.727,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 113246.208,
          "laser_electrical_pj": 452984.832,
          "detector_pj": 2949.12,
          "adc_pj": 147456.0,
          "vector_dac_pj": 11796.48,
          "weight_dac_pj": 796262.4,
          "dac_pj": 808058.88,
          "total_pj": 1411448.832,
          "energy_per_mac_pj": 0.006231770833333333,
          "energy_per_op_pj": 0.0031158854166666665,
          "peripheral_share": 0.6790639364814042
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
          "steady_state_equivalent_ops_per_second": 2.26492416e+17
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
        "Dense full-sequence encoder self-attention is used.",
        "BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.",
        "Full transformer model layer spec: encoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: QKV projection.",
        "Transformer formula: 3 * B * S * H * H.",
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
    },
    {
      "operation_key": "attention_scores",
      "label": "Attention scores",
      "formula": "B * heads * S_query * S_context * head_dim",
      "json_report": "bert_base_12layer_encoder_block_attention_scores.json",
      "benchmark": {
        "name": "BERT-base style 12-layer encoder model - encoder_block - Attention scores",
        "description": "Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for Attention scores. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 128 x 64 times 64 x 128; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 128,
          "k": 64,
          "n": 128
        },
        "macs": 12582912,
        "equivalent_ops": 25165824,
        "output_elements": 196608
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
          "adc_conversions": 196608,
          "vector_dac_conversions": 98304,
          "weight_dac_conversions": 98304,
          "dac_conversions": 196608
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 98304,
          "weight_operand_read_bytes": 98304,
          "output_write_bytes": 196608,
          "total_interface_bytes": 393216,
          "macs_per_byte": 32.0,
          "equivalent_ops_per_byte": 64.0,
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
              "read_bytes": 196608.0,
              "write_bytes": 196608.0,
              "total_bytes": 393216.0,
              "read_energy_pj": 3932.16,
              "write_energy_pj": 3932.16,
              "total_energy_pj": 7864.32,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 384.0,
              "contention_adjusted_transfer_time_ns": 384.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 196608.0,
              "write_bytes": 196608.0,
              "total_bytes": 393216.0,
              "read_energy_pj": 39321.600000000006,
              "write_energy_pj": 39321.600000000006,
              "total_energy_pj": 78643.20000000001,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 1536.0,
              "contention_adjusted_transfer_time_ns": 1536.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 196608.0,
              "write_bytes": 196608.0,
              "total_bytes": 393216.0,
              "read_energy_pj": 1966080.0,
              "write_energy_pj": 1966080.0,
              "total_energy_pj": 3932160.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 24576.0,
              "contention_adjusted_transfer_time_ns": 24576.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 181469.184,
          "total_movement_energy_pj": 4018667.52,
          "total_system_energy_pj": 4200136.704,
          "system_energy_per_mac_pj": 0.333796875,
          "system_energy_per_op_pj": 0.1668984375,
          "movement_energy_share": 0.9567944577072509,
          "total_hierarchy_bytes": 1179648.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 24576.0,
          "serial_transfer_time_ns": 26496.0,
          "effective_transfer_time_ns": 24576.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 24576.0,
          "contention_adjusted_serial_transfer_time_ns": 26496.0,
          "contention_adjusted_effective_transfer_time_ns": 24576.0,
          "calibration_adjusted_effective_transfer_time_ns": 24576.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 24576.0,
          "bandwidth_pressure_ratio": 910.2222222222222,
          "bandwidth_limited_equivalent_ops_per_second": 1023999999999.9999,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 24576.0,
          "contention_pressure_ratio": 910.2222222222222,
          "contention_adjusted_equivalent_ops_per_second": 1023999999999.9999,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 6291.456,
          "laser_electrical_pj": 25165.824,
          "detector_pj": 1966.08,
          "adc_pj": 98304.0,
          "vector_dac_pj": 11796.48,
          "weight_dac_pj": 44236.8,
          "dac_pj": 56033.28,
          "total_pj": 181469.184,
          "energy_per_mac_pj": 0.014421875,
          "energy_per_op_pj": 0.0072109375,
          "peripheral_share": 0.8613217768147344
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
          "steady_state_equivalent_ops_per_second": 1048576000000000.0
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
        "Dense full-sequence encoder self-attention is used.",
        "BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.",
        "Full transformer model layer spec: encoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: Attention scores.",
        "Transformer formula: B * heads * S_query * S_context * head_dim.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=128, hidden=768, heads=12, head_dim=64, attention_context=128, intermediate=3072.",
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
      "json_report": "bert_base_12layer_encoder_block_attention_value.json",
      "benchmark": {
        "name": "BERT-base style 12-layer encoder model - encoder_block - Attention-value",
        "description": "Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for Attention-value. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 128 x 128 times 128 x 64; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 128,
          "k": 128,
          "n": 64
        },
        "macs": 12582912,
        "equivalent_ops": 25165824,
        "output_elements": 98304
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
          "adc_conversions": 98304,
          "vector_dac_conversions": 196608,
          "weight_dac_conversions": 98304,
          "dac_conversions": 294912
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 196608,
          "weight_operand_read_bytes": 98304,
          "output_write_bytes": 98304,
          "total_interface_bytes": 393216,
          "macs_per_byte": 32.0,
          "equivalent_ops_per_byte": 64.0,
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
              "read_bytes": 294912.0,
              "write_bytes": 98304.0,
              "total_bytes": 393216.0,
              "read_energy_pj": 5898.24,
              "write_energy_pj": 1966.08,
              "total_energy_pj": 7864.32,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 384.0,
              "contention_adjusted_transfer_time_ns": 384.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 294912.0,
              "write_bytes": 98304.0,
              "total_bytes": 393216.0,
              "read_energy_pj": 58982.4,
              "write_energy_pj": 19660.800000000003,
              "total_energy_pj": 78643.20000000001,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 1536.0,
              "contention_adjusted_transfer_time_ns": 1536.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 294912.0,
              "write_bytes": 98304.0,
              "total_bytes": 393216.0,
              "read_energy_pj": 2949120.0,
              "write_energy_pj": 983040.0,
              "total_energy_pj": 3932160.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 24576.0,
              "contention_adjusted_transfer_time_ns": 24576.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 143130.624,
          "total_movement_energy_pj": 4018667.52,
          "total_system_energy_pj": 4161798.144,
          "system_energy_per_mac_pj": 0.33075,
          "system_energy_per_op_pj": 0.165375,
          "movement_energy_share": 0.9656084656084657,
          "total_hierarchy_bytes": 1179648.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "max_transfer_time_ns": 24576.0,
          "serial_transfer_time_ns": 26496.0,
          "effective_transfer_time_ns": 24576.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 24576.0,
          "contention_adjusted_serial_transfer_time_ns": 26496.0,
          "contention_adjusted_effective_transfer_time_ns": 24576.0,
          "calibration_adjusted_effective_transfer_time_ns": 24576.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 24576.0,
          "bandwidth_pressure_ratio": 910.2222222222222,
          "bandwidth_limited_equivalent_ops_per_second": 1023999999999.9999,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 24576.0,
          "contention_pressure_ratio": 910.2222222222222,
          "contention_adjusted_equivalent_ops_per_second": 1023999999999.9999,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 6291.456,
          "laser_electrical_pj": 25165.824,
          "detector_pj": 983.04,
          "adc_pj": 49152.0,
          "vector_dac_pj": 23592.96,
          "weight_dac_pj": 44236.8,
          "dac_pj": 67829.76000000001,
          "total_pj": 143130.624,
          "energy_per_mac_pj": 0.011375000000000001,
          "energy_per_op_pj": 0.005687500000000001,
          "peripheral_share": 0.8241758241758242
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
          "steady_state_equivalent_ops_per_second": 1048576000000000.0
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
        "Dense full-sequence encoder self-attention is used.",
        "BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.",
        "Full transformer model layer spec: encoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: Attention-value.",
        "Transformer formula: B * heads * S_query * S_context * head_dim.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=128, hidden=768, heads=12, head_dim=64, attention_context=128, intermediate=3072.",
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
      "json_report": "bert_base_12layer_encoder_block_mlp_up_projection.json",
      "benchmark": {
        "name": "BERT-base style 12-layer encoder model - encoder_block - MLP up-projection",
        "description": "Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 128 x 768 times 768 x 3072; operation multiplicity is 1. The right operand is a learned model-weight matrix."
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
              "write_fraction": 1.0
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
              "write_fraction": 1.0
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
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 1877999.616,
          "total_movement_energy_pj": 29135339.52,
          "total_system_energy_pj": 31013339.136,
          "system_energy_per_mac_pj": 0.10269661458333333,
          "system_energy_per_op_pj": 0.051348307291666666,
          "movement_energy_share": 0.9394454235397041,
          "total_hierarchy_bytes": 8552448.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
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
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 178176.0,
          "bandwidth_pressure_ratio": 35635.2,
          "bandwidth_limited_equivalent_ops_per_second": 3389793103448.2754,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 178176.0,
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
        "Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.",
        "Full transformer model layer spec: encoder_block.",
        "Full transformer model layer count: 12.",
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
    },
    {
      "operation_key": "mlp_down_projection",
      "label": "MLP down-projection",
      "formula": "B * S * intermediate * H",
      "json_report": "bert_base_12layer_encoder_block_mlp_down_projection.json",
      "benchmark": {
        "name": "BERT-base style 12-layer encoder model - encoder_block - MLP down-projection",
        "description": "Representative transformer layer spec 'encoder_block' used 12 time(s) in full-model aggregation. Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 128 x 3072 times 3072 x 768; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 128,
          "k": 3072,
          "n": 768
        },
        "macs": 301989888,
        "equivalent_ops": 603979776,
        "output_elements": 98304
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
          "adc_conversions": 98304,
          "vector_dac_conversions": 393216,
          "weight_dac_conversions": 2359296,
          "dac_conversions": 2752512
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 393216,
          "weight_operand_read_bytes": 2359296,
          "output_write_bytes": 98304,
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
              "read_bytes": 2752512.0,
              "write_bytes": 98304.0,
              "total_bytes": 2850816.0,
              "read_energy_pj": 55050.24,
              "write_energy_pj": 1966.08,
              "total_energy_pj": 57016.32,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 2784.0,
              "contention_adjusted_transfer_time_ns": 2784.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 2752512.0,
              "write_bytes": 98304.0,
              "total_bytes": 2850816.0,
              "read_energy_pj": 550502.4,
              "write_energy_pj": 19660.800000000003,
              "total_energy_pj": 570163.2000000001,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 11136.0,
              "contention_adjusted_transfer_time_ns": 11136.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 2752512.0,
              "write_bytes": 98304.0,
              "total_bytes": 2850816.0,
              "read_energy_pj": 27525120.0,
              "write_energy_pj": 983040.0,
              "total_energy_pj": 28508160.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 178176.0,
              "contention_adjusted_transfer_time_ns": 178176.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0
            }
          },
          "local_compute_and_conversion_energy_pj": 1762983.9359999998,
          "total_movement_energy_pj": 29135339.52,
          "total_system_energy_pj": 30898323.456,
          "system_energy_per_mac_pj": 0.10231575520833333,
          "system_energy_per_op_pj": 0.051157877604166666,
          "movement_energy_share": 0.9429424079105607,
          "total_hierarchy_bytes": 8552448.0,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
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
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "bandwidth_limited_batch_latency_ns": 178176.0,
          "bandwidth_pressure_ratio": 35635.2,
          "bandwidth_limited_equivalent_ops_per_second": 3389793103448.2754,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 178176.0,
          "contention_pressure_ratio": 35635.2,
          "contention_adjusted_equivalent_ops_per_second": 3389793103448.2754,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 150994.944,
          "laser_electrical_pj": 603979.776,
          "detector_pj": 983.04,
          "adc_pj": 49152.0,
          "vector_dac_pj": 47185.92,
          "weight_dac_pj": 1061683.2,
          "dac_pj": 1108869.1199999999,
          "total_pj": 1762983.9359999998,
          "energy_per_mac_pj": 0.005837890624999999,
          "energy_per_op_pj": 0.0029189453124999994,
          "peripheral_share": 0.6574105051856809
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
        "Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.",
        "Full transformer model layer spec: encoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: MLP down-projection.",
        "Transformer formula: B * S * intermediate * H.",
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
  ],
  "assumptions": [
    "Dense full-sequence encoder self-attention is used.",
    "BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.",
    "Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.",
    "Full transformer model layer spec: encoder_block.",
    "Full transformer model layer count: 12.",
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
