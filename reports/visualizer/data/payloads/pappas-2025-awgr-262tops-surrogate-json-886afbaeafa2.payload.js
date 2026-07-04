window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["pappas_2025_awgr_262tops_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Pappas 2025 AWGR 262 TOPS surrogate",
    "description": "Source-backed card for the APL Photonics 2025 AWGR-based multidimensional photonic AI accelerator. The local workload is a 16x16 dense tile surrogate for the reported 16x16 AWGR tensor engine, not an exact Matrix-by-Tensor-Multiply reproduction."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 16,
      "k": 16,
      "n": 16
    },
    "macs": 4096,
    "equivalent_ops": 8192,
    "output_elements": 256
  },
  "model_inputs": {
    "device": {
      "optical_mac_energy_fj": 0.5,
      "laser_wall_plug_efficiency": 0.25,
      "photodetector_energy_fj_per_sample": 10.0,
      "adc": {
        "bits": 8,
        "energy_pj_per_conversion": 0.5
      },
      "dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.2
      },
      "vector_dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.2
      },
      "weight_dac": {
        "bits": 8,
        "energy_pj_per_conversion": 0.2
      }
    },
    "execution": {
      "batch_size": 1,
      "vector_reuse_factor": 1,
      "weight_reuse_factor": 1,
      "weight_stationary": true,
      "pipeline": {
        "stages": 1,
        "cycle_time_ns": 0.03125
      }
    },
    "timing": {
      "optical_latency_ns": 0.03125,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 0.03125
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 256,
      "vector_dac_conversions": 256,
      "weight_dac_conversions": 256,
      "dac_conversions": 512
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 256,
      "weight_operand_read_bytes": 256,
      "output_write_bytes": 256,
      "total_interface_bytes": 768,
      "macs_per_byte": 5.333333333333333,
      "equivalent_ops_per_byte": 10.666666666666666,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "energy": {
      "optical_compute_pj": 2.048,
      "laser_electrical_pj": 8.192,
      "detector_pj": 2.56,
      "adc_pj": 128.0,
      "vector_dac_pj": 51.2,
      "weight_dac_pj": 51.2,
      "dac_pj": 102.4,
      "total_pj": 241.15200000000002,
      "energy_per_mac_pj": 0.058875000000000004,
      "energy_per_op_pj": 0.029437500000000002,
      "peripheral_share": 0.9660297239915074
    },
    "timing": {
      "optical_latency_ns": 0.03125,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 0.03125,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 0.03125,
      "batch_latency_ns": 0.03125,
      "steady_state_operations_per_second": 32000000000.0,
      "steady_state_equivalent_ops_per_second": 262144000000000.0
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 3.1250000000000005e-12,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser",
      "source_url": "https://pubs.aip.org/aip/app/article/10/11/110805/3372196/A-262-TOPS-hyperdimensional-photonic-AI",
      "doi": "10.1063/5.0271374",
      "venue": "APL Photonics 10, 110805 (2025)",
      "claim_status": "paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "16x16 AWGR Matrix-by-Tensor-Multiply photonic AI accelerator",
      "reported_tops": 262.0,
      "energy_efficiency_including_lasers_tops_per_watt": 3.663003663003663,
      "additional_metrics": {
        "reported_energy_per_op_fj": 273,
        "data_rate_gbaud": 32,
        "awgr_dimension": "16x16",
        "ddos_kappa_score": 0.8652,
        "mnist_accuracy_percent": 92.14,
        "energy_efficiency_note": "3.663 TOPS/W is the direct conversion of the paper's 273 fJ/OP statement.",
        "surrogate_mapping": "m=16, k=16, n=16 is a dense tile surrogate for the 16x16 AWGR engine; not an exact MbTM schedule."
      }
    },
    "derived_unit_conversions": {
      "energy_per_op_including_lasers_pj": 0.273,
      "energy_per_mac_including_lasers_pj": 0.546,
      "total_energy_including_lasers_pj": 2236.416,
      "model_to_published_including_lasers_ratio": 0.10782967032967034
    },
    "separation_note": "Published values are paper-reported references or direct unit conversions, not local component-model estimates."
  },
  "calibration_fit": null,
  "assumptions": [
    "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
    "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
    "ADC conversions are counted once per output element.",
    "DAC conversions are counted once per input value for the left and right matmul operands.",
    "Detector energy is counted once per output sample.",
    "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
    "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
    "Source reports 262 TOPS at 32 Gbaud and a 273 fJ/OP silicon-photonic energy-efficiency analysis; PhotonicBench keeps those values in published_reference.",
    "The local model uses a one-cycle 32 Gbaud timing surrogate and generic converter energy assumptions.",
    "Weight-stationary mode approximates reusing the reported AWGR weight/tensor structure for one dense local tile.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation."
  ],
  "provenance": {
    "source_title": "A 262 TOPS hyperdimensional photonic AI accelerator powered by a Si3N4 microcomb laser",
    "source_url": "https://pubs.aip.org/aip/app/article/10/11/110805/3372196/A-262-TOPS-hyperdimensional-photonic-AI",
    "doi": "10.1063/5.0271374",
    "venue": "APL Photonics 10, 110805 (2025)",
    "claim_status": "paper-reported and paper-projected throughput/energy targets; matmul-surrogate local model"
  }
}
;
