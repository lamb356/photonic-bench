window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["dong_2023_continuous_time_tensor_core_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Dong 2023 continuous-time photonic tensor core surrogate",
    "description": "Source-backed card for the Nature Photonics 2023 higher-dimensional photonic tensor core using continuous-time data. The local workload maps the reported 3x3 ECG-kernel by 3x100 input framing into a dense matmul surrogate."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 3,
      "k": 3,
      "n": 100
    },
    "macs": 900,
    "equivalent_ops": 1800,
    "output_elements": 300
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
      "adc_conversions": 300,
      "vector_dac_conversions": 9,
      "weight_dac_conversions": 300,
      "dac_conversions": 309
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 9,
      "weight_operand_read_bytes": 300,
      "output_write_bytes": 300,
      "total_interface_bytes": 609,
      "macs_per_byte": 1.477832512315271,
      "equivalent_ops_per_byte": 2.955665024630542,
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
          "read_bytes": 309.0,
          "write_bytes": 300.0,
          "total_bytes": 609.0,
          "read_energy_pj": 6.18,
          "write_energy_pj": 6.0,
          "total_energy_pj": 12.18,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.5947265625,
          "contention_adjusted_transfer_time_ns": 0.5947265625,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 309.0,
          "write_bytes": 300.0,
          "total_bytes": 609.0,
          "read_energy_pj": 61.800000000000004,
          "write_energy_pj": 60.0,
          "total_energy_pj": 121.80000000000001,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 2.37890625,
          "contention_adjusted_transfer_time_ns": 2.37890625,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 309.0,
          "write_bytes": 300.0,
          "total_bytes": 609.0,
          "read_energy_pj": 3090.0,
          "write_energy_pj": 3000.0,
          "total_energy_pj": 6090.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 38.0625,
          "contention_adjusted_transfer_time_ns": 38.0625,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 216.60000000000002,
      "total_movement_energy_pj": 6223.98,
      "total_system_energy_pj": 6440.58,
      "system_energy_per_mac_pj": 7.1562,
      "system_energy_per_op_pj": 3.5781,
      "movement_energy_share": 0.9663694884622192,
      "total_hierarchy_bytes": 1827.0,
      "hierarchy_equivalent_ops_per_byte": 0.9852216748768473,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666663,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "max_transfer_time_ns": 38.0625,
      "serial_transfer_time_ns": 41.0361328125,
      "effective_transfer_time_ns": 38.0625,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 38.0625,
      "contention_adjusted_serial_transfer_time_ns": 41.0361328125,
      "contention_adjusted_effective_transfer_time_ns": 38.0625,
      "calibration_adjusted_effective_transfer_time_ns": 38.0625,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 38.0625,
      "bandwidth_limited_batch_latency_ns": 38.0625,
      "bandwidth_pressure_ratio": 38.0625,
      "bandwidth_limited_equivalent_ops_per_second": 47290640394.08867,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 38.0625,
      "contention_adjusted_transfer_to_compute_time_ratio": 38.0625,
      "contention_pressure_ratio": 38.0625,
      "contention_adjusted_equivalent_ops_per_second": 47290640394.08867,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.45,
      "laser_electrical_pj": 1.8,
      "detector_pj": 3.0,
      "adc_pj": 150.0,
      "vector_dac_pj": 1.8,
      "weight_dac_pj": 60.0,
      "dac_pj": 61.8,
      "total_pj": 216.60000000000002,
      "energy_per_mac_pj": 0.2406666666666667,
      "energy_per_op_pj": 0.12033333333333335,
      "peripheral_share": 0.9916897506925207
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
      "steady_state_equivalent_ops_per_second": 1800000000000.0
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
      "source_title": "Higher-dimensional processing using a photonic tensor core with continuous-time data",
      "source_url": "https://www.nature.com/articles/s41566-023-01313-x",
      "doi": "10.1038/s41566-023-01313-x",
      "venue": "Nature Photonics 17, 1080-1088 (2023)",
      "claim_status": "paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Electro-optically controlled photonic tensor core with spatial, wavelength, and RF degrees of freedom",
      "additional_metrics": {
        "reported_parallelism": 100,
        "rf_components": 50,
        "wdm_channels": 2,
        "reported_ecg_signals": 100,
        "reported_cnn_accuracy_percent": 93.5,
        "surrogate_mapping": "m=3, k=3, n=100 follows the paper's 3x3 kernel and 3x100 ECG input framing; it is not a continuous-time RF/WDM simulation."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Higher-dimensional processing using a photonic tensor core with continuous-time data",
      "source_doi": "10.1038/s41566-023-01313-x",
      "reported_metrics": [
        "parallelism",
        "rf_components",
        "wavelength_channels",
        "accuracy"
      ],
      "local_surrogate_type": "continuous_time_tensor_core_ecg_matmul_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source reports a hardware photonic tensor core using spatial, wavelength, and RF degrees of freedom with parallelism of 100.",
        "Local dense matmul accounting does not model RF multiplexing, PCM memory programming, optical routing, or clinical ECG preprocessing."
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
    "The dense surrogate preserves the reported 3x3-kernel and 100-signal ECG demonstration scale.",
    "Local timing, energy, converter, and system movement values are generic PhotonicBench assumptions.",
    "Weight-stationary mode approximates fixed tensor-core weights for one local ECG convolution tile.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Higher-dimensional processing using a photonic tensor core with continuous-time data",
    "source_url": "https://www.nature.com/articles/s41566-023-01313-x",
    "doi": "10.1038/s41566-023-01313-x",
    "venue": "Nature Photonics 17, 1080-1088 (2023)",
    "claim_status": "paper-reported continuous-time higher-dimensional photonic tensor core; ECG-convolution matmul-surrogate local model"
  }
}
;
