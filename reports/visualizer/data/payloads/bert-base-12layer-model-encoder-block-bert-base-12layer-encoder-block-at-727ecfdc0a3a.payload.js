window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["bert_base_12layer_model/encoder_block/bert_base_12layer_encoder_block_attention_scores.json"] = {
  "schema_version": "photonic-bench-report-v1",
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
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 384.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 14.222222222222221,
          "contention_adjusted_transfer_pressure_ratio": 14.222222222222221,
          "compute_window_required_bandwidth_bytes_per_ns": 14563.555555555555,
          "contention_bandwidth_utilization": 14.222222222222221,
          "contention_bandwidth_headroom_bytes_per_ns": -13539.555555555555,
          "contention_bandwidth_headroom_ratio": 0.0703125
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
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 1536.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 56.888888888888886,
          "contention_adjusted_transfer_pressure_ratio": 56.888888888888886,
          "compute_window_required_bandwidth_bytes_per_ns": 14563.555555555555,
          "contention_bandwidth_utilization": 56.888888888888886,
          "contention_bandwidth_headroom_bytes_per_ns": -14307.555555555555,
          "contention_bandwidth_headroom_ratio": 0.017578125
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
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 24576.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 910.2222222222222,
          "contention_adjusted_transfer_pressure_ratio": 910.2222222222222,
          "compute_window_required_bandwidth_bytes_per_ns": 14563.555555555555,
          "contention_bandwidth_utilization": 910.2222222222222,
          "contention_bandwidth_headroom_bytes_per_ns": -14547.555555555555,
          "contention_bandwidth_headroom_ratio": 0.0010986328125
        }
      },
      "local_compute_and_conversion_energy_pj": 181469.184,
      "total_movement_energy_pj": 4018667.52,
      "total_system_energy_pj": 4200136.704,
      "system_energy_per_mac_pj": 0.333796875,
      "system_energy_per_op_pj": 0.1668984375,
      "movement_energy_share": 0.9567944577072509,
      "total_hierarchy_bytes": 1179648.0,
      "hierarchy_equivalent_ops_per_byte": 21.333333333333332,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 910.2222222222222,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 910.2222222222222,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 910.2222222222222,
      "min_tier_contention_bandwidth_headroom_ratio": 0.0010986328125,
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
      "transfer_to_compute_time_ratio": 910.2222222222222,
      "bandwidth_limited_batch_latency_ns": 24576.0,
      "bandwidth_pressure_ratio": 910.2222222222222,
      "bandwidth_limited_equivalent_ops_per_second": 1023999999999.9999,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 24576.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 910.2222222222222,
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
}
;
