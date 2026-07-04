window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["gpt_style_decoder_layer/gpt_decoder_layer_mlp_down_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
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
          "transfer_time_ns": 6144.0,
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
          "transfer_time_ns": 24576.0,
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
          "transfer_time_ns": 393216.0,
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
      "max_transfer_time_ns": 393216.0,
      "serial_transfer_time_ns": 423936.0,
      "effective_transfer_time_ns": 393216.0,
      "bandwidth_limited_batch_latency_ns": 393216.0,
      "bandwidth_limited_equivalent_ops_per_second": 12287999999999.998,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
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
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": null
}
;
