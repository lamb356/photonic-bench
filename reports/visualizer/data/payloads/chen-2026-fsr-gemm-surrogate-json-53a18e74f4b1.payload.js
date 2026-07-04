window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["chen_2026_fsr_gemm_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Chen 2026 FSR-GeMM real-valued GEMM surrogate",
    "description": "Source-backed card for the DATE 2026 FSR-GeMM architecture. The paper targets scalable real-valued general matrix multiplication with free-spectral-range multiplexing; this config uses a 64x64 dense local GEMM tile for PhotonicBench comparison only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 64,
      "k": 64,
      "n": 64
    },
    "macs": 262144,
    "equivalent_ops": 524288,
    "output_elements": 4096
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
        "cycle_time_ns": null
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
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 1.0
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 4096,
      "vector_dac_conversions": 4096,
      "weight_dac_conversions": 4096,
      "dac_conversions": 8192
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 4096,
      "weight_operand_read_bytes": 4096,
      "output_write_bytes": 4096,
      "total_interface_bytes": 12288,
      "macs_per_byte": 21.333333333333332,
      "equivalent_ops_per_byte": 42.666666666666664,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "system": {
      "profile": "default",
      "profile_overrides": [],
      "memory_timing_mode": "overlapped",
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 163.84,
          "write_energy_pj": 81.92,
          "total_energy_pj": 245.76,
          "bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 12.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 1638.4,
          "write_energy_pj": 819.2,
          "total_energy_pj": 2457.6000000000004,
          "bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 48.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 81920.0,
          "write_energy_pj": 40960.0,
          "total_energy_pj": 122880.0,
          "bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 768.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 4251.648,
      "total_movement_energy_pj": 125583.36,
      "total_system_energy_pj": 129835.008,
      "system_energy_per_mac_pj": 0.49528125,
      "system_energy_per_op_pj": 0.247640625,
      "movement_energy_share": 0.9672534544766231,
      "max_transfer_time_ns": 768.0,
      "serial_transfer_time_ns": 828.0,
      "effective_transfer_time_ns": 768.0,
      "bandwidth_limited_batch_latency_ns": 768.0,
      "bandwidth_limited_equivalent_ops_per_second": 682666666666.6666,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 131.072,
      "laser_electrical_pj": 524.288,
      "detector_pj": 40.96,
      "adc_pj": 2048.0,
      "vector_dac_pj": 819.2,
      "weight_dac_pj": 819.2,
      "dac_pj": 1638.4,
      "total_pj": 4251.648,
      "energy_per_mac_pj": 0.01621875,
      "energy_per_op_pj": 0.008109375,
      "peripheral_share": 0.8766859344894027
    },
    "timing": {
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 1.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 1.0,
      "batch_latency_ns": 1.0,
      "steady_state_operations_per_second": 1000000000.0,
      "steady_state_equivalent_ops_per_second": 524288000000000.0
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 1.0000000000000002e-10,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "FSR-GeMM: A Scalable FSR-Parallel Photonic Accelerator for Real-Valued GeMM Computing",
      "source_url": "https://doi.org/10.23919/DATE69613.2026.11539161",
      "doi": "10.23919/DATE69613.2026.11539161",
      "venue": "2026 Design, Automation and Test in Europe Conference (DATE 2026)",
      "claim_status": "paper-reported relative FSR-GeMM architecture metrics; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Free-spectral-range parallel photonic accelerator for real-valued GEMM",
      "additional_metrics": {
        "area_efficiency_improvement_x": 57,
        "energy_efficiency_gain_x": 13.8,
        "energy_reduction_percent_vs_mrr": 70,
        "speedup_vs_leading_photonic_gemm_x": 21,
        "supports_dynamic_real_valued_operands": true,
        "avoids_svd_preprocessing": true,
        "surrogate_mapping": "m=64, k=64, n=64 is a dense local GEMM tile for an FSR-GeMM architecture paper; it is not the paper's full FSR-parallel hardware schedule."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "FSR-GeMM: A Scalable FSR-Parallel Photonic Accelerator for Real-Valued GeMM Computing",
      "source_doi": "10.23919/DATE69613.2026.11539161",
      "reported_metrics": [
        "relative_speedup",
        "relative_energy",
        "relative_area",
        "architecture"
      ],
      "local_surrogate_type": "dense_fsr_parallel_gemm_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "derived",
        "accuracy": "not_reported",
        "area": "derived",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source reports relative improvements rather than a scalar absolute TOPS or TOPS/W value, so PhotonicBench stores those as additional metrics only."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
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
    "Source relative speed, energy, and area claims remain under published_calibration.additional_metrics.",
    "Local dense workload, converter counts, latency, and system-tier movement are PhotonicBench assumptions for cross-card analysis.",
    "Weight-stationary mode approximates one reused right-hand operand tile and does not model FSR routing, crosstalk, or FSR-parallel scheduling.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": {
    "source_title": "FSR-GeMM: A Scalable FSR-Parallel Photonic Accelerator for Real-Valued GeMM Computing",
    "source_url": "https://doi.org/10.23919/DATE69613.2026.11539161",
    "doi": "10.23919/DATE69613.2026.11539161",
    "venue": "2026 Design, Automation and Test in Europe Conference (DATE 2026)",
    "claim_status": "paper-reported relative FSR-GeMM architecture metrics; matmul-surrogate local model"
  }
}
;
