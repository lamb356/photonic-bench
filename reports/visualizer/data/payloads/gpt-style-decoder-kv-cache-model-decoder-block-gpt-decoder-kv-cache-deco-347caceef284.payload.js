window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["gpt_style_decoder_kv_cache_model/decoder_block/gpt_decoder_kv_cache_decoder_block_qkv_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
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
          "system_energy_share": 0.001874074990120101,
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
          "system_energy_share": 0.018740749901201007,
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
          "system_energy_share": 0.9370374950600504,
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
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 801068.5440000001,
          "share": 0.04234768004862852
        },
        "sram": {
          "energy_pj": 35450.880000000005,
          "share": 0.001874074990120101
        },
        "intermediate": {
          "energy_pj": 354508.8,
          "share": 0.018740749901201007
        },
        "off_chip": {
          "energy_pj": 17725440.0,
          "share": 0.9370374950600504
        },
        "movement_total": {
          "energy_pj": 18115399.68,
          "share": 0.9576523199513715
        },
        "total_system_energy_pj": 18916468.224,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.04234768004862852,
      "movement_energy_share": 0.9576523199513715,
      "movement_to_compute_energy_ratio": 22.614044473078195,
      "total_hierarchy_bytes": 5317632.0,
      "hierarchy_equivalent_ops_per_byte": 0.6655112651646448,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 22156.8,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 22156.8,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "max_tier_system_energy_share": 0.9370374950600504,
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
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
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
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": null
}
;
