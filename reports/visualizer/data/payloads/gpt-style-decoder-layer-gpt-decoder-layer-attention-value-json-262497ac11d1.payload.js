window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["gpt_style_decoder_layer/gpt_decoder_layer_attention_value.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "GPT-style decoder layer - Attention-value",
    "description": "Dense GPT-2-small style decoder benchmark shape with hidden size 768, 12 attention heads, sequence length 1024, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for Attention-value. Formula: B * heads * S * S * head_dim. Matmul shape is 1024 x 1024 times 1024 x 64; operation multiplicity is 12. The right operand is activation data for attention, so cross-batch weight-stationary reuse is disabled in this generated card."
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
    "Transformer operation: Attention-value.",
    "Transformer formula: B * heads * S * S * head_dim.",
    "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
    "Layer shape: batch=1, sequence=1024, hidden=768, heads=12, head_dim=64, intermediate=3072.",
    "Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.",
    "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.",
    "The benchmark models 12 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted every 1 operation(s).",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time."
  ],
  "provenance": null
}
;
