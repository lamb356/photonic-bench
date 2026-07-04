window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["gpt_style_decoder_kv_cache_model/decoder_block/gpt_decoder_kv_cache_decoder_block_layer_summary.json"] = {
  "schema_version": "photonic-bench-transformer-layer-report-v1",
  "artifact_type": "transformer_layer_aggregate",
  "benchmark": {
    "name": "GPT-style decoder KV-cache model - decoder_block",
    "description": "Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card."
  },
  "transformer_layer": {
    "layer_type": "decoder",
    "attention_mode": "dense",
    "shape": {
      "batch_size": 1,
      "sequence_length": 1,
      "hidden_size": 768,
      "num_heads": 12,
      "head_dim": 64,
      "attention_context_length": 1025,
      "kv_cache_enabled": true,
      "mlp_intermediate_size": 3072
    }
  },
  "workload": {
    "type": "transformer_layer",
    "matmul_count": 5,
    "macs": 8062464,
    "equivalent_ops": 16124928,
    "output_elements": 19212
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
      "adc_conversions": 19212,
      "vector_dac_conversions": 17676,
      "weight_dac_conversions": 8062464,
      "dac_conversions": 8080140
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 17676,
      "weight_operand_read_bytes": 8062464,
      "output_write_bytes": 19212,
      "total_interface_bytes": 8099352,
      "macs_per_byte": 0.9954455615708516,
      "equivalent_ops_per_byte": 1.9908911231417032,
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
      "local_compute_and_conversion_energy_pj": 3656152.968,
      "total_movement_energy_pj": 82775377.44,
      "total_system_energy_pj": 86431530.40799999,
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 8080140.0,
          "write_bytes": 19212.0,
          "total_bytes": 8099352.0,
          "read_energy_pj": 161602.8,
          "write_energy_pj": 384.24,
          "total_energy_pj": 161987.04,
          "transfer_time_ns": 7909.5234375,
          "contention_adjusted_transfer_time_ns": 7909.5234375,
          "calibration_adjusted_transfer_time_ns": 7909.5234375,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 114.63077445652173,
          "contention_adjusted_transfer_pressure_ratio": 114.63077445652173,
          "compute_window_required_bandwidth_bytes_per_ns": 117381.91304347826,
          "contention_bandwidth_utilization": 114.63077445652173,
          "contention_bandwidth_headroom_bytes_per_ns": -116357.91304347826,
          "contention_bandwidth_headroom_ratio": 0.00872366085583143
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 8080140.0,
          "write_bytes": 19212.0,
          "total_bytes": 8099352.0,
          "read_energy_pj": 1616028.0,
          "write_energy_pj": 3842.4,
          "total_energy_pj": 1619870.4000000001,
          "transfer_time_ns": 31638.09375,
          "contention_adjusted_transfer_time_ns": 31638.09375,
          "calibration_adjusted_transfer_time_ns": 31638.09375,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 458.52309782608694,
          "contention_adjusted_transfer_pressure_ratio": 458.52309782608694,
          "compute_window_required_bandwidth_bytes_per_ns": 117381.91304347826,
          "contention_bandwidth_utilization": 458.52309782608694,
          "contention_bandwidth_headroom_bytes_per_ns": -117125.91304347826,
          "contention_bandwidth_headroom_ratio": 0.0021809152139578574
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 8080140.0,
          "write_bytes": 19212.0,
          "total_bytes": 8099352.0,
          "read_energy_pj": 80801400.0,
          "write_energy_pj": 192120.0,
          "total_energy_pj": 80993520.0,
          "transfer_time_ns": 506209.5,
          "contention_adjusted_transfer_time_ns": 506209.5,
          "calibration_adjusted_transfer_time_ns": 506209.5,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133073,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 7336.369565217391,
          "contention_adjusted_transfer_pressure_ratio": 7336.369565217391,
          "compute_window_required_bandwidth_bytes_per_ns": 117381.91304347826,
          "contention_bandwidth_utilization": 7336.369565217391,
          "contention_bandwidth_headroom_bytes_per_ns": -117365.91304347826,
          "contention_bandwidth_headroom_ratio": 0.00013630720087236608
        }
      },
      "serial_transfer_time_ns": 506209.5,
      "max_per_matmul_transfer_time_ns": 147696.0,
      "contention_adjusted_serial_transfer_time_ns": 506209.5,
      "max_per_matmul_contention_adjusted_transfer_time_ns": 147696.0,
      "bandwidth_limited_serial_batch_latency_ns": 506209.5,
      "contention_adjusted_serial_batch_latency_ns": 506209.5,
      "system_energy_per_mac_pj": 10.720237685154315,
      "system_energy_per_op_pj": 5.360118842577157,
      "movement_energy_share": 0.9576988519034532,
      "total_hierarchy_bytes": 24298056.0,
      "hierarchy_equivalent_ops_per_byte": 0.6636303743805677,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "contention_bandwidth_derate_factor": 1.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 7336.369565217391,
      "bandwidth_pressure_ratio": 7336.369565217391,
      "contention_adjusted_transfer_to_compute_time_ratio": 7336.369565217391,
      "contention_pressure_ratio": 7336.369565217391,
      "dominant_traffic_tier": "sram",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 7336.369565217391,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 7336.369565217391,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 7336.369565217391,
      "min_tier_contention_bandwidth_headroom_ratio": 0.00013630720087236608,
      "bandwidth_limited_serial_effective_macs_per_second": 15927128985.133625,
      "bandwidth_limited_serial_effective_equivalent_ops_per_second": 31854257970.26725,
      "contention_adjusted_serial_effective_macs_per_second": 15927128985.133625,
      "contention_adjusted_serial_effective_equivalent_ops_per_second": 31854257970.26725,
      "note": "Summed from decomposed per-matmul system movement estimates. This is a serial aggregate over explicit SRAM, intermediate, and off-chip tiers with local contention assumptions, not a fused memory scheduler."
    },
    "energy": {
      "optical_compute_pj": 4031.232,
      "laser_electrical_pj": 16124.928,
      "detector_pj": 192.12,
      "adc_pj": 9606.0,
      "vector_dac_pj": 2121.12,
      "weight_dac_pj": 3628108.8,
      "dac_pj": 3630229.92,
      "total_pj": 3656152.968,
      "energy_per_mac_pj": 0.4534783619498952,
      "energy_per_op_pj": 0.2267391809749476,
      "peripheral_share": 0.995589646237143
    },
    "timing": {
      "timing_model": "serial_sum_of_decomposed_batch_latencies",
      "serial_single_operation_latency_ns": 25.0,
      "serial_batch_latency_ns": 69.0,
      "serial_effective_macs_per_second": 116847304347826.08,
      "serial_effective_equivalent_ops_per_second": 233694608695652.16,
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
    "expected_total_macs": 8062464,
    "json_total_macs": 8062464,
    "mac_total_matches_decomposed_json": true,
    "expected_total_equivalent_ops": 16124928,
    "json_total_equivalent_ops": 16124928,
    "equivalent_ops_total_matches_decomposed_json": true,
    "rows": [
      {
        "operation_key": "qkv_projection",
        "label": "QKV projection",
        "formula": "3 * B * S * H * H",
        "expected_macs": 1769472,
        "json_macs": 1769472,
        "expected_equivalent_ops": 3538944,
        "json_equivalent_ops": 3538944
      },
      {
        "operation_key": "attention_scores",
        "label": "Attention scores",
        "formula": "B * heads * S_query * S_context * head_dim",
        "expected_macs": 787200,
        "json_macs": 787200,
        "expected_equivalent_ops": 1574400,
        "json_equivalent_ops": 1574400
      },
      {
        "operation_key": "attention_value",
        "label": "Attention-value",
        "formula": "B * heads * S_query * S_context * head_dim",
        "expected_macs": 787200,
        "json_macs": 787200,
        "expected_equivalent_ops": 1574400,
        "json_equivalent_ops": 1574400
      },
      {
        "operation_key": "mlp_up_projection",
        "label": "MLP up-projection",
        "formula": "B * S * H * intermediate",
        "expected_macs": 2359296,
        "json_macs": 2359296,
        "expected_equivalent_ops": 4718592,
        "json_equivalent_ops": 4718592
      },
      {
        "operation_key": "mlp_down_projection",
        "label": "MLP down-projection",
        "formula": "B * S * intermediate * H",
        "expected_macs": 2359296,
        "json_macs": 2359296,
        "expected_equivalent_ops": 4718592,
        "json_equivalent_ops": 4718592
      }
    ]
  },
  "matmuls": [
    {
      "operation_key": "qkv_projection",
      "label": "QKV projection",
      "formula": "3 * B * S * H * H",
      "json_report": "gpt_decoder_kv_cache_decoder_block_qkv_projection.json",
      "benchmark": {
        "name": "GPT-style decoder KV-cache model - decoder_block - QKV projection",
        "description": "Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for QKV projection. Formula: 3 * B * S * H * H. Matmul shape is 1 x 768 times 768 x 2304; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1,
          "k": 768,
          "n": 2304
        },
        "macs": 1769472,
        "equivalent_ops": 3538944,
        "output_elements": 2304
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
          "adc_conversions": 2304,
          "vector_dac_conversions": 768,
          "weight_dac_conversions": 1769472,
          "dac_conversions": 1770240
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 768,
          "weight_operand_read_bytes": 1769472,
          "output_write_bytes": 2304,
          "total_interface_bytes": 1772544,
          "macs_per_byte": 0.9982668977469671,
          "equivalent_ops_per_byte": 1.9965337954939342,
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
              "read_bytes": 1770240.0,
              "write_bytes": 2304.0,
              "total_bytes": 1772544.0,
              "read_energy_pj": 35404.8,
              "write_energy_pj": 46.08,
              "total_energy_pj": 35450.880000000005,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 1731.0,
              "contention_adjusted_transfer_time_ns": 1731.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 1731.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.001956947162426615,
              "nominal_transfer_share": 0.015625,
              "contention_adjusted_transfer_share": 0.015625,
              "nominal_transfer_pressure_ratio": 346.2,
              "contention_adjusted_transfer_pressure_ratio": 346.2,
              "compute_window_required_bandwidth_bytes_per_ns": 354508.8,
              "contention_bandwidth_utilization": 346.2,
              "contention_bandwidth_headroom_bytes_per_ns": -353484.8,
              "contention_bandwidth_headroom_ratio": 0.0028885037550548816
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 1770240.0,
              "write_bytes": 2304.0,
              "total_bytes": 1772544.0,
              "read_energy_pj": 354048.0,
              "write_energy_pj": 460.8,
              "total_energy_pj": 354508.8,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 6924.0,
              "contention_adjusted_transfer_time_ns": 6924.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 6924.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.019569471624266144,
              "nominal_transfer_share": 0.0625,
              "contention_adjusted_transfer_share": 0.0625,
              "nominal_transfer_pressure_ratio": 1384.8,
              "contention_adjusted_transfer_pressure_ratio": 1384.8,
              "compute_window_required_bandwidth_bytes_per_ns": 354508.8,
              "contention_bandwidth_utilization": 1384.8,
              "contention_bandwidth_headroom_bytes_per_ns": -354252.8,
              "contention_bandwidth_headroom_ratio": 0.0007221259387637204
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 1770240.0,
              "write_bytes": 2304.0,
              "total_bytes": 1772544.0,
              "read_energy_pj": 17702400.0,
              "write_energy_pj": 23040.0,
              "total_energy_pj": 17725440.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 110784.0,
              "contention_adjusted_transfer_time_ns": 110784.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 110784.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.9784735812133073,
              "nominal_transfer_share": 1.0,
              "contention_adjusted_transfer_share": 1.0,
              "nominal_transfer_pressure_ratio": 22156.8,
              "contention_adjusted_transfer_pressure_ratio": 22156.8,
              "compute_window_required_bandwidth_bytes_per_ns": 354508.8,
              "contention_bandwidth_utilization": 22156.8,
              "contention_bandwidth_headroom_bytes_per_ns": -354492.8,
              "contention_bandwidth_headroom_ratio": 4.5132871172732525e-05
            }
          },
          "local_compute_and_conversion_energy_pj": 801068.5440000001,
          "total_movement_energy_pj": 18115399.68,
          "total_system_energy_pj": 18916468.224,
          "system_energy_per_mac_pj": 10.690459201388888,
          "system_energy_per_op_pj": 5.345229600694444,
          "movement_energy_share": 0.9576523199513715,
          "total_hierarchy_bytes": 5317632.0,
          "hierarchy_equivalent_ops_per_byte": 0.6655112651646448,
          "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "dominant_traffic_tier": "sram",
          "dominant_movement_energy_tier": "off_chip",
          "nominal_memory_bottleneck_tier": "off_chip",
          "contention_memory_bottleneck_tier": "off_chip",
          "max_tier_nominal_transfer_pressure_ratio": 22156.8,
          "max_tier_contention_adjusted_transfer_pressure_ratio": 22156.8,
          "max_tier_movement_energy_share": 0.9784735812133073,
          "contention_bandwidth_saturation_tier": "off_chip",
          "max_tier_contention_bandwidth_utilization": 22156.8,
          "min_tier_contention_bandwidth_headroom_ratio": 4.5132871172732525e-05,
          "max_transfer_time_ns": 110784.0,
          "serial_transfer_time_ns": 119439.0,
          "effective_transfer_time_ns": 110784.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 110784.0,
          "contention_adjusted_serial_transfer_time_ns": 119439.0,
          "contention_adjusted_effective_transfer_time_ns": 110784.0,
          "calibration_adjusted_effective_transfer_time_ns": 110784.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "transfer_to_compute_time_ratio": 22156.8,
          "bandwidth_limited_batch_latency_ns": 110784.0,
          "bandwidth_pressure_ratio": 22156.8,
          "bandwidth_limited_equivalent_ops_per_second": 31944540727.902946,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 110784.0,
          "contention_adjusted_transfer_to_compute_time_ratio": 22156.8,
          "contention_pressure_ratio": 22156.8,
          "contention_adjusted_equivalent_ops_per_second": 31944540727.902946,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 884.736,
          "laser_electrical_pj": 3538.944,
          "detector_pj": 23.04,
          "adc_pj": 1152.0,
          "vector_dac_pj": 92.16,
          "weight_dac_pj": 796262.4,
          "dac_pj": 796354.56,
          "total_pj": 801068.5440000001,
          "energy_per_mac_pj": 0.4527161458333334,
          "energy_per_op_pj": 0.2263580729166667,
          "peripheral_share": 0.9955822207394027
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
          "steady_state_equivalent_ops_per_second": 1769472000000000.0
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
        "Decoder incremental inference uses one query token and a 1024-token KV-cache context.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.",
        "Full transformer model layer spec: decoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: QKV projection.",
        "Transformer formula: 3 * B * S * H * H.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.",
        "Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.",
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
      "json_report": "gpt_decoder_kv_cache_decoder_block_attention_scores.json",
      "benchmark": {
        "name": "GPT-style decoder KV-cache model - decoder_block - Attention scores",
        "description": "Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for Attention scores. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 1 x 64 times 64 x 1025; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1,
          "k": 64,
          "n": 1025
        },
        "macs": 787200,
        "equivalent_ops": 1574400,
        "output_elements": 12300
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
          "adc_conversions": 12300,
          "vector_dac_conversions": 768,
          "weight_dac_conversions": 787200,
          "dac_conversions": 787968
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 768,
          "weight_operand_read_bytes": 787200,
          "output_write_bytes": 12300,
          "total_interface_bytes": 800268,
          "macs_per_byte": 0.9836704703924185,
          "equivalent_ops_per_byte": 1.967340940784837,
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
              "read_bytes": 787968.0,
              "write_bytes": 12300.0,
              "total_bytes": 800268.0,
              "read_energy_pj": 15759.36,
              "write_energy_pj": 246.0,
              "total_energy_pj": 16005.36,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 781.51171875,
              "contention_adjusted_transfer_time_ns": 781.51171875,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 781.51171875,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.0019569471624266144,
              "nominal_transfer_share": 0.015625,
              "contention_adjusted_transfer_share": 0.015625,
              "nominal_transfer_pressure_ratio": 28.94487847222222,
              "contention_adjusted_transfer_pressure_ratio": 28.94487847222222,
              "compute_window_required_bandwidth_bytes_per_ns": 29639.555555555555,
              "contention_bandwidth_utilization": 28.94487847222222,
              "contention_bandwidth_headroom_bytes_per_ns": -28615.555555555555,
              "contention_bandwidth_headroom_ratio": 0.03454842627719714
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 787968.0,
              "write_bytes": 12300.0,
              "total_bytes": 800268.0,
              "read_energy_pj": 157593.6,
              "write_energy_pj": 2460.0,
              "total_energy_pj": 160053.6,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 3126.046875,
              "contention_adjusted_transfer_time_ns": 3126.046875,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 3126.046875,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.019569471624266147,
              "nominal_transfer_share": 0.0625,
              "contention_adjusted_transfer_share": 0.0625,
              "nominal_transfer_pressure_ratio": 115.77951388888889,
              "contention_adjusted_transfer_pressure_ratio": 115.77951388888889,
              "compute_window_required_bandwidth_bytes_per_ns": 29639.555555555555,
              "contention_bandwidth_utilization": 115.77951388888889,
              "contention_bandwidth_headroom_bytes_per_ns": -29383.555555555555,
              "contention_bandwidth_headroom_ratio": 0.008637106569299285
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 787968.0,
              "write_bytes": 12300.0,
              "total_bytes": 800268.0,
              "read_energy_pj": 7879680.0,
              "write_energy_pj": 123000.0,
              "total_energy_pj": 8002680.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 50016.75,
              "contention_adjusted_transfer_time_ns": 50016.75,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 50016.75,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.9784735812133073,
              "nominal_transfer_share": 1.0,
              "contention_adjusted_transfer_share": 1.0,
              "nominal_transfer_pressure_ratio": 1852.4722222222222,
              "contention_adjusted_transfer_pressure_ratio": 1852.4722222222222,
              "compute_window_required_bandwidth_bytes_per_ns": 29639.555555555555,
              "contention_bandwidth_utilization": 1852.4722222222222,
              "contention_bandwidth_headroom_bytes_per_ns": -29623.555555555555,
              "contention_bandwidth_headroom_ratio": 0.0005398191605812053
            }
          },
          "local_compute_and_conversion_energy_pj": 362179.56,
          "total_movement_energy_pj": 8178738.96,
          "total_system_energy_pj": 8540918.52,
          "system_energy_per_mac_pj": 10.849744054878048,
          "system_energy_per_op_pj": 5.424872027439024,
          "movement_energy_share": 0.9575947763519936,
          "total_hierarchy_bytes": 2400804.0,
          "hierarchy_equivalent_ops_per_byte": 0.6557803135949457,
          "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "dominant_traffic_tier": "sram",
          "dominant_movement_energy_tier": "off_chip",
          "nominal_memory_bottleneck_tier": "off_chip",
          "contention_memory_bottleneck_tier": "off_chip",
          "max_tier_nominal_transfer_pressure_ratio": 1852.4722222222222,
          "max_tier_contention_adjusted_transfer_pressure_ratio": 1852.4722222222222,
          "max_tier_movement_energy_share": 0.9784735812133073,
          "contention_bandwidth_saturation_tier": "off_chip",
          "max_tier_contention_bandwidth_utilization": 1852.4722222222222,
          "min_tier_contention_bandwidth_headroom_ratio": 0.0005398191605812053,
          "max_transfer_time_ns": 50016.75,
          "serial_transfer_time_ns": 53924.30859375,
          "effective_transfer_time_ns": 50016.75,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 50016.75,
          "contention_adjusted_serial_transfer_time_ns": 53924.30859375,
          "contention_adjusted_effective_transfer_time_ns": 50016.75,
          "calibration_adjusted_effective_transfer_time_ns": 50016.75,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "transfer_to_compute_time_ratio": 1852.4722222222222,
          "bandwidth_limited_batch_latency_ns": 50016.75,
          "bandwidth_pressure_ratio": 1852.4722222222222,
          "bandwidth_limited_equivalent_ops_per_second": 31477455052.557392,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 50016.75,
          "contention_adjusted_transfer_to_compute_time_ratio": 1852.4722222222222,
          "contention_pressure_ratio": 1852.4722222222222,
          "contention_adjusted_equivalent_ops_per_second": 31477455052.557392,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 393.6,
          "laser_electrical_pj": 1574.4,
          "detector_pj": 123.0,
          "adc_pj": 6150.0,
          "vector_dac_pj": 92.16,
          "weight_dac_pj": 354240.0,
          "dac_pj": 354332.16,
          "total_pj": 362179.56,
          "energy_per_mac_pj": 0.4600858231707317,
          "energy_per_op_pj": 0.23004291158536586,
          "peripheral_share": 0.9956529849448157
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
          "steady_state_equivalent_ops_per_second": 65600000000000.0
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
        "Decoder incremental inference uses one query token and a 1024-token KV-cache context.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.",
        "Full transformer model layer spec: decoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: Attention scores.",
        "Transformer formula: B * heads * S_query * S_context * head_dim.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.",
        "Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.",
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
      "json_report": "gpt_decoder_kv_cache_decoder_block_attention_value.json",
      "benchmark": {
        "name": "GPT-style decoder KV-cache model - decoder_block - Attention-value",
        "description": "Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for Attention-value. Formula: B * heads * S_query * S_context * head_dim. Matmul shape is 1 x 1025 times 1025 x 64; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1,
          "k": 1025,
          "n": 64
        },
        "macs": 787200,
        "equivalent_ops": 1574400,
        "output_elements": 768
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
          "adc_conversions": 768,
          "vector_dac_conversions": 12300,
          "weight_dac_conversions": 787200,
          "dac_conversions": 799500
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 12300,
          "weight_operand_read_bytes": 787200,
          "output_write_bytes": 768,
          "total_interface_bytes": 800268,
          "macs_per_byte": 0.9836704703924185,
          "equivalent_ops_per_byte": 1.967340940784837,
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
              "read_bytes": 799500.0,
              "write_bytes": 768.0,
              "total_bytes": 800268.0,
              "read_energy_pj": 15990.0,
              "write_energy_pj": 15.36,
              "total_energy_pj": 16005.36,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 781.51171875,
              "contention_adjusted_transfer_time_ns": 781.51171875,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 781.51171875,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.0019569471624266144,
              "nominal_transfer_share": 0.015625,
              "contention_adjusted_transfer_share": 0.015625,
              "nominal_transfer_pressure_ratio": 28.94487847222222,
              "contention_adjusted_transfer_pressure_ratio": 28.94487847222222,
              "compute_window_required_bandwidth_bytes_per_ns": 29639.555555555555,
              "contention_bandwidth_utilization": 28.94487847222222,
              "contention_bandwidth_headroom_bytes_per_ns": -28615.555555555555,
              "contention_bandwidth_headroom_ratio": 0.03454842627719714
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 799500.0,
              "write_bytes": 768.0,
              "total_bytes": 800268.0,
              "read_energy_pj": 159900.0,
              "write_energy_pj": 153.60000000000002,
              "total_energy_pj": 160053.6,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 3126.046875,
              "contention_adjusted_transfer_time_ns": 3126.046875,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 3126.046875,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.019569471624266147,
              "nominal_transfer_share": 0.0625,
              "contention_adjusted_transfer_share": 0.0625,
              "nominal_transfer_pressure_ratio": 115.77951388888889,
              "contention_adjusted_transfer_pressure_ratio": 115.77951388888889,
              "compute_window_required_bandwidth_bytes_per_ns": 29639.555555555555,
              "contention_bandwidth_utilization": 115.77951388888889,
              "contention_bandwidth_headroom_bytes_per_ns": -29383.555555555555,
              "contention_bandwidth_headroom_ratio": 0.008637106569299285
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 799500.0,
              "write_bytes": 768.0,
              "total_bytes": 800268.0,
              "read_energy_pj": 7995000.0,
              "write_energy_pj": 7680.0,
              "total_energy_pj": 8002680.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 50016.75,
              "contention_adjusted_transfer_time_ns": 50016.75,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 50016.75,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.9784735812133073,
              "nominal_transfer_share": 1.0,
              "contention_adjusted_transfer_share": 1.0,
              "nominal_transfer_pressure_ratio": 1852.4722222222222,
              "contention_adjusted_transfer_pressure_ratio": 1852.4722222222222,
              "compute_window_required_bandwidth_bytes_per_ns": 29639.555555555555,
              "contention_bandwidth_utilization": 1852.4722222222222,
              "contention_bandwidth_headroom_bytes_per_ns": -29623.555555555555,
              "contention_bandwidth_headroom_ratio": 0.0005398191605812053
            }
          },
          "local_compute_and_conversion_energy_pj": 357682.08,
          "total_movement_energy_pj": 8178738.96,
          "total_system_energy_pj": 8536421.04,
          "system_energy_per_mac_pj": 10.844030792682926,
          "system_energy_per_op_pj": 5.422015396341463,
          "movement_energy_share": 0.9580992926281434,
          "total_hierarchy_bytes": 2400804.0,
          "hierarchy_equivalent_ops_per_byte": 0.6557803135949457,
          "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "dominant_traffic_tier": "sram",
          "dominant_movement_energy_tier": "off_chip",
          "nominal_memory_bottleneck_tier": "off_chip",
          "contention_memory_bottleneck_tier": "off_chip",
          "max_tier_nominal_transfer_pressure_ratio": 1852.4722222222222,
          "max_tier_contention_adjusted_transfer_pressure_ratio": 1852.4722222222222,
          "max_tier_movement_energy_share": 0.9784735812133073,
          "contention_bandwidth_saturation_tier": "off_chip",
          "max_tier_contention_bandwidth_utilization": 1852.4722222222222,
          "min_tier_contention_bandwidth_headroom_ratio": 0.0005398191605812053,
          "max_transfer_time_ns": 50016.75,
          "serial_transfer_time_ns": 53924.30859375,
          "effective_transfer_time_ns": 50016.75,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 50016.75,
          "contention_adjusted_serial_transfer_time_ns": 53924.30859375,
          "contention_adjusted_effective_transfer_time_ns": 50016.75,
          "calibration_adjusted_effective_transfer_time_ns": 50016.75,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "transfer_to_compute_time_ratio": 1852.4722222222222,
          "bandwidth_limited_batch_latency_ns": 50016.75,
          "bandwidth_pressure_ratio": 1852.4722222222222,
          "bandwidth_limited_equivalent_ops_per_second": 31477455052.557392,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 50016.75,
          "contention_adjusted_transfer_to_compute_time_ratio": 1852.4722222222222,
          "contention_pressure_ratio": 1852.4722222222222,
          "contention_adjusted_equivalent_ops_per_second": 31477455052.557392,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 393.6,
          "laser_electrical_pj": 1574.4,
          "detector_pj": 7.68,
          "adc_pj": 384.0,
          "vector_dac_pj": 1476.0,
          "weight_dac_pj": 354240.0,
          "dac_pj": 355716.0,
          "total_pj": 357682.08,
          "energy_per_mac_pj": 0.4543725609756098,
          "energy_per_op_pj": 0.2271862804878049,
          "peripheral_share": 0.9955983257534176
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
          "steady_state_equivalent_ops_per_second": 65600000000000.0
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
        "Decoder incremental inference uses one query token and a 1024-token KV-cache context.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.",
        "Full transformer model layer spec: decoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: Attention-value.",
        "Transformer formula: B * heads * S_query * S_context * head_dim.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.",
        "Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.",
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
      "json_report": "gpt_decoder_kv_cache_decoder_block_mlp_up_projection.json",
      "benchmark": {
        "name": "GPT-style decoder KV-cache model - decoder_block - MLP up-projection",
        "description": "Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for MLP up-projection. Formula: B * S * H * intermediate. Matmul shape is 1 x 768 times 768 x 3072; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1,
          "k": 768,
          "n": 3072
        },
        "macs": 2359296,
        "equivalent_ops": 4718592,
        "output_elements": 3072
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
          "adc_conversions": 3072,
          "vector_dac_conversions": 768,
          "weight_dac_conversions": 2359296,
          "dac_conversions": 2360064
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 768,
          "weight_operand_read_bytes": 2359296,
          "output_write_bytes": 3072,
          "total_interface_bytes": 2363136,
          "macs_per_byte": 0.9983750406239844,
          "equivalent_ops_per_byte": 1.9967500812479688,
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
              "read_bytes": 2360064.0,
              "write_bytes": 3072.0,
              "total_bytes": 2363136.0,
              "read_energy_pj": 47201.28,
              "write_energy_pj": 61.44,
              "total_energy_pj": 47262.72,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 2307.75,
              "contention_adjusted_transfer_time_ns": 2307.75,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 2307.75,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.0019569471624266144,
              "nominal_transfer_share": 0.015625,
              "contention_adjusted_transfer_share": 0.015625,
              "nominal_transfer_pressure_ratio": 461.55,
              "contention_adjusted_transfer_pressure_ratio": 461.55,
              "compute_window_required_bandwidth_bytes_per_ns": 472627.2,
              "contention_bandwidth_utilization": 461.55,
              "contention_bandwidth_headroom_bytes_per_ns": -471603.2,
              "contention_bandwidth_headroom_ratio": 0.0021666125013541327
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 2360064.0,
              "write_bytes": 3072.0,
              "total_bytes": 2363136.0,
              "read_energy_pj": 472012.80000000005,
              "write_energy_pj": 614.4000000000001,
              "total_energy_pj": 472627.20000000007,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 9231.0,
              "contention_adjusted_transfer_time_ns": 9231.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 9231.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.019569471624266147,
              "nominal_transfer_share": 0.0625,
              "contention_adjusted_transfer_share": 0.0625,
              "nominal_transfer_pressure_ratio": 1846.2,
              "contention_adjusted_transfer_pressure_ratio": 1846.2,
              "compute_window_required_bandwidth_bytes_per_ns": 472627.2,
              "contention_bandwidth_utilization": 1846.2,
              "contention_bandwidth_headroom_bytes_per_ns": -472371.2,
              "contention_bandwidth_headroom_ratio": 0.0005416531253385332
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 2360064.0,
              "write_bytes": 3072.0,
              "total_bytes": 2363136.0,
              "read_energy_pj": 23600640.0,
              "write_energy_pj": 30720.0,
              "total_energy_pj": 23631360.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 147696.0,
              "contention_adjusted_transfer_time_ns": 147696.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 147696.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.9784735812133072,
              "nominal_transfer_share": 1.0,
              "contention_adjusted_transfer_share": 1.0,
              "nominal_transfer_pressure_ratio": 29539.2,
              "contention_adjusted_transfer_pressure_ratio": 29539.2,
              "compute_window_required_bandwidth_bytes_per_ns": 472627.2,
              "contention_bandwidth_utilization": 29539.2,
              "contention_bandwidth_headroom_bytes_per_ns": -472611.2,
              "contention_bandwidth_headroom_ratio": 3.3853320333658324e-05
            }
          },
          "local_compute_and_conversion_energy_pj": 1068060.6719999998,
          "total_movement_energy_pj": 24151249.92,
          "total_system_energy_pj": 25219310.592,
          "system_energy_per_mac_pj": 10.689337239583333,
          "system_energy_per_op_pj": 5.344668619791666,
          "movement_energy_share": 0.9576490932175281,
          "total_hierarchy_bytes": 7089408.0,
          "hierarchy_equivalent_ops_per_byte": 0.6655833604159896,
          "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "dominant_traffic_tier": "sram",
          "dominant_movement_energy_tier": "off_chip",
          "nominal_memory_bottleneck_tier": "off_chip",
          "contention_memory_bottleneck_tier": "off_chip",
          "max_tier_nominal_transfer_pressure_ratio": 29539.2,
          "max_tier_contention_adjusted_transfer_pressure_ratio": 29539.2,
          "max_tier_movement_energy_share": 0.9784735812133072,
          "contention_bandwidth_saturation_tier": "off_chip",
          "max_tier_contention_bandwidth_utilization": 29539.2,
          "min_tier_contention_bandwidth_headroom_ratio": 3.3853320333658324e-05,
          "max_transfer_time_ns": 147696.0,
          "serial_transfer_time_ns": 159234.75,
          "effective_transfer_time_ns": 147696.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 147696.0,
          "contention_adjusted_serial_transfer_time_ns": 159234.75,
          "contention_adjusted_effective_transfer_time_ns": 147696.0,
          "calibration_adjusted_effective_transfer_time_ns": 147696.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "transfer_to_compute_time_ratio": 29539.2,
          "bandwidth_limited_batch_latency_ns": 147696.0,
          "bandwidth_pressure_ratio": 29539.2,
          "bandwidth_limited_equivalent_ops_per_second": 31948001299.9675,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 147696.0,
          "contention_adjusted_transfer_to_compute_time_ratio": 29539.2,
          "contention_pressure_ratio": 29539.2,
          "contention_adjusted_equivalent_ops_per_second": 31948001299.9675,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 1179.648,
          "laser_electrical_pj": 4718.592,
          "detector_pj": 30.72,
          "adc_pj": 1536.0,
          "vector_dac_pj": 92.16,
          "weight_dac_pj": 1061683.2,
          "dac_pj": 1061775.3599999999,
          "total_pj": 1068060.6719999998,
          "energy_per_mac_pj": 0.45270312499999993,
          "energy_per_op_pj": 0.22635156249999996,
          "peripheral_share": 0.9955820936734201
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
          "steady_state_equivalent_ops_per_second": 2359296000000000.0
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
        "Decoder incremental inference uses one query token and a 1024-token KV-cache context.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.",
        "Full transformer model layer spec: decoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: MLP up-projection.",
        "Transformer formula: B * S * H * intermediate.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.",
        "Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.",
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
      "json_report": "gpt_decoder_kv_cache_decoder_block_mlp_down_projection.json",
      "benchmark": {
        "name": "GPT-style decoder KV-cache model - decoder_block - MLP down-projection",
        "description": "Representative transformer layer spec 'decoder_block' used 12 time(s) in full-model aggregation. GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 1 x 3072 times 3072 x 768; operation multiplicity is 1. The right operand is a learned model-weight matrix."
      },
      "workload": {
        "type": "matmul",
        "shape": {
          "m": 1,
          "k": 3072,
          "n": 768
        },
        "macs": 2359296,
        "equivalent_ops": 4718592,
        "output_elements": 768
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
          "adc_conversions": 768,
          "vector_dac_conversions": 3072,
          "weight_dac_conversions": 2359296,
          "dac_conversions": 2362368
        },
        "memory_traffic": {
          "vector_operand_read_bytes": 3072,
          "weight_operand_read_bytes": 2359296,
          "output_write_bytes": 768,
          "total_interface_bytes": 2363136,
          "macs_per_byte": 0.9983750406239844,
          "equivalent_ops_per_byte": 1.9967500812479688,
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
              "read_bytes": 2362368.0,
              "write_bytes": 768.0,
              "total_bytes": 2363136.0,
              "read_energy_pj": 47247.36,
              "write_energy_pj": 15.36,
              "total_energy_pj": 47262.72,
              "bandwidth_bytes_per_ns": 1024.0,
              "effective_bandwidth_bytes_per_ns": 1024.0,
              "transfer_time_ns": 2307.75,
              "contention_adjusted_transfer_time_ns": 2307.75,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 2307.75,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.0019569471624266144,
              "nominal_transfer_share": 0.015625,
              "contention_adjusted_transfer_share": 0.015625,
              "nominal_transfer_pressure_ratio": 461.55,
              "contention_adjusted_transfer_pressure_ratio": 461.55,
              "compute_window_required_bandwidth_bytes_per_ns": 472627.2,
              "contention_bandwidth_utilization": 461.55,
              "contention_bandwidth_headroom_bytes_per_ns": -471603.2,
              "contention_bandwidth_headroom_ratio": 0.0021666125013541327
            },
            "intermediate": {
              "name": "intermediate",
              "read_bytes": 2362368.0,
              "write_bytes": 768.0,
              "total_bytes": 2363136.0,
              "read_energy_pj": 472473.60000000003,
              "write_energy_pj": 153.60000000000002,
              "total_energy_pj": 472627.2,
              "bandwidth_bytes_per_ns": 256.0,
              "effective_bandwidth_bytes_per_ns": 256.0,
              "transfer_time_ns": 9231.0,
              "contention_adjusted_transfer_time_ns": 9231.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 9231.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.019569471624266144,
              "nominal_transfer_share": 0.0625,
              "contention_adjusted_transfer_share": 0.0625,
              "nominal_transfer_pressure_ratio": 1846.2,
              "contention_adjusted_transfer_pressure_ratio": 1846.2,
              "compute_window_required_bandwidth_bytes_per_ns": 472627.2,
              "contention_bandwidth_utilization": 1846.2,
              "contention_bandwidth_headroom_bytes_per_ns": -472371.2,
              "contention_bandwidth_headroom_ratio": 0.0005416531253385332
            },
            "off_chip": {
              "name": "off_chip",
              "read_bytes": 2362368.0,
              "write_bytes": 768.0,
              "total_bytes": 2363136.0,
              "read_energy_pj": 23623680.0,
              "write_energy_pj": 7680.0,
              "total_energy_pj": 23631360.0,
              "bandwidth_bytes_per_ns": 16.0,
              "effective_bandwidth_bytes_per_ns": 16.0,
              "transfer_time_ns": 147696.0,
              "contention_adjusted_transfer_time_ns": 147696.0,
              "read_fraction": 1.0,
              "write_fraction": 1.0,
              "calibration_adjusted_transfer_time_ns": 147696.0,
              "traffic_share": 0.3333333333333333,
              "movement_energy_share": 0.9784735812133072,
              "nominal_transfer_share": 1.0,
              "contention_adjusted_transfer_share": 1.0,
              "nominal_transfer_pressure_ratio": 29539.2,
              "contention_adjusted_transfer_pressure_ratio": 29539.2,
              "compute_window_required_bandwidth_bytes_per_ns": 472627.2,
              "contention_bandwidth_utilization": 29539.2,
              "contention_bandwidth_headroom_bytes_per_ns": -472611.2,
              "contention_bandwidth_headroom_ratio": 3.3853320333658324e-05
            }
          },
          "local_compute_and_conversion_energy_pj": 1067162.112,
          "total_movement_energy_pj": 24151249.92,
          "total_system_energy_pj": 25218412.032,
          "system_energy_per_mac_pj": 10.688956380208333,
          "system_energy_per_op_pj": 5.344478190104167,
          "movement_energy_share": 0.957683215317211,
          "total_hierarchy_bytes": 7089408.0,
          "hierarchy_equivalent_ops_per_byte": 0.6655833604159896,
          "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
          "sram_traffic_share": 0.3333333333333333,
          "intermediate_traffic_share": 0.3333333333333333,
          "off_chip_traffic_share": 0.3333333333333333,
          "dominant_traffic_tier": "sram",
          "dominant_movement_energy_tier": "off_chip",
          "nominal_memory_bottleneck_tier": "off_chip",
          "contention_memory_bottleneck_tier": "off_chip",
          "max_tier_nominal_transfer_pressure_ratio": 29539.2,
          "max_tier_contention_adjusted_transfer_pressure_ratio": 29539.2,
          "max_tier_movement_energy_share": 0.9784735812133072,
          "contention_bandwidth_saturation_tier": "off_chip",
          "max_tier_contention_bandwidth_utilization": 29539.2,
          "min_tier_contention_bandwidth_headroom_ratio": 3.3853320333658324e-05,
          "max_transfer_time_ns": 147696.0,
          "serial_transfer_time_ns": 159234.75,
          "effective_transfer_time_ns": 147696.0,
          "contention_bandwidth_derate_factor": 1.0,
          "contention_adjusted_max_transfer_time_ns": 147696.0,
          "contention_adjusted_serial_transfer_time_ns": 159234.75,
          "contention_adjusted_effective_transfer_time_ns": 147696.0,
          "calibration_adjusted_effective_transfer_time_ns": 147696.0,
          "calibration_guardband_time_ns": 0.0,
          "contention_transfer_overhead_fraction": 0.0,
          "total_transfer_overhead_fraction": 0.0,
          "effective_loaded_bandwidth_bytes_per_ns": 48.0,
          "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
          "transfer_to_compute_time_ratio": 29539.2,
          "bandwidth_limited_batch_latency_ns": 147696.0,
          "bandwidth_pressure_ratio": 29539.2,
          "bandwidth_limited_equivalent_ops_per_second": 31948001299.9675,
          "bandwidth_limited_tier": "off_chip",
          "contention_adjusted_batch_latency_ns": 147696.0,
          "contention_adjusted_transfer_to_compute_time_ratio": 29539.2,
          "contention_pressure_ratio": 29539.2,
          "contention_adjusted_equivalent_ops_per_second": 31948001299.9675,
          "contention_limited_tier": "off_chip",
          "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
        },
        "energy": {
          "optical_compute_pj": 1179.648,
          "laser_electrical_pj": 4718.592,
          "detector_pj": 7.68,
          "adc_pj": 384.0,
          "vector_dac_pj": 368.64,
          "weight_dac_pj": 1061683.2,
          "dac_pj": 1062051.8399999999,
          "total_pj": 1067162.112,
          "energy_per_mac_pj": 0.452322265625,
          "energy_per_op_pj": 0.2261611328125,
          "peripheral_share": 0.9955783737569572
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
          "steady_state_equivalent_ops_per_second": 2359296000000000.0
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
        "Decoder incremental inference uses one query token and a 1024-token KV-cache context.",
        "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
        "Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.",
        "Full transformer model layer spec: decoder_block.",
        "Full transformer model layer count: 12.",
        "Transformer operation: MLP down-projection.",
        "Transformer formula: B * S * intermediate * H.",
        "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
        "Layer shape: batch=1, sequence=1, hidden=768, heads=12, head_dim=64, attention_context=1025, intermediate=3072.",
        "Decoder KV-cache attention accounting is enabled: attention uses query length 1 and context length 1025. Cache read/write traffic is reported at the transformer-model level.",
        "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, and non-matmul memory traffic are excluded. KV-cache read/write traffic is reported only in the transformer-model aggregate.",
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
    "Decoder incremental inference uses one query token and a 1024-token KV-cache context.",
    "GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.",
    "Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.",
    "Full transformer model layer spec: decoder_block.",
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
    "causal_triangular_halving",
    "non_matmul_memory_traffic"
  ],
  "provenance": null
}
;
