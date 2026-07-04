window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["bert_base_12layer_model/encoder_block/bert_base_12layer_encoder_block_qkv_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
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
      "sram": {
        "read_energy_pj_per_byte": 0.02,
        "write_energy_pj_per_byte": 0.02,
        "bandwidth_bytes_per_ns": 1024.0,
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
          "transfer_time_ns": 2112.0,
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
          "transfer_time_ns": 135168.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 1411448.832,
      "total_movement_energy_pj": 21670133.76,
      "total_system_energy_pj": 23081582.592,
      "system_energy_per_mac_pj": 0.10190885416666667,
      "system_energy_per_op_pj": 0.05095442708333334,
      "movement_energy_share": 0.93884956430634,
      "max_transfer_time_ns": 135168.0,
      "bandwidth_limited_batch_latency_ns": 135168.0,
      "bandwidth_limited_equivalent_ops_per_second": 3351272727272.727,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
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
    "The model summary multiplies one representative encoder-layer artifact by 12 and does not model embeddings, pooler, classifier head, layer norm, softmax, or activation functions.",
    "Full transformer model layer spec: encoder_block.",
    "Full transformer model layer count: 12.",
    "Transformer operation: QKV projection.",
    "Transformer formula: 3 * B * S * H * H.",
    "Transformer batch/head multiplicity is represented by the generated card's execution.batch_size.",
    "Layer shape: batch=1, sequence=128, hidden=768, heads=12, head_dim=64, intermediate=3072.",
    "Dense attention accounting is used; decoder/causal labels do not halve attention MAC counts.",
    "Non-matmul costs such as softmax, layer norm, bias adds, activations, dropout, masking, KV-cache incremental decoding, and non-matmul memory traffic are excluded.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": null
}
;
