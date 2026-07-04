window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["bert_base_encoder_layer/bert_base_layer_mlp_down_projection.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "BERT-base style encoder layer - MLP down-projection",
    "description": "Dense one-layer BERT-base style encoder benchmark shape with hidden size 768, 12 attention heads, sequence length 128, and MLP intermediate size 3072. This is a shape helper example, not a published accelerator calibration card. Generated decomposed card for MLP down-projection. Formula: B * S * intermediate * H. Matmul shape is 128 x 3072 times 3072 x 768; operation multiplicity is 1. The right operand is a learned model-weight matrix."
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
          "transfer_time_ns": 2784.0,
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
          "transfer_time_ns": 178176.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 1762983.9359999998,
      "total_movement_energy_pj": 28565176.32,
      "total_system_energy_pj": 30328160.256,
      "system_energy_per_mac_pj": 0.10042773437500001,
      "system_energy_per_op_pj": 0.050213867187500004,
      "movement_energy_share": 0.9418697368676948,
      "max_transfer_time_ns": 178176.0,
      "bandwidth_limited_batch_latency_ns": 178176.0,
      "bandwidth_limited_equivalent_ops_per_second": 3389793103448.2754,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
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
    "Transformer operation: MLP down-projection.",
    "Transformer formula: B * S * intermediate * H.",
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
