window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["gpt_style_decoder_layer/gpt_decoder_layer_attention_scores.json"] = {
  "schema_version": "photonic-bench-report-v1",
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
}
;
