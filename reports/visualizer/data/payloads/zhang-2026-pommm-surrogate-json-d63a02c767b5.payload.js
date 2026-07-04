window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["zhang_2026_pommm_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Zhang 2026 POMMM coherent matrix multiplication surrogate",
    "description": "Source-backed card for the Nature Photonics 2026 parallel optical matrix-matrix multiplication result. The paper demonstrates coherent optical matrix-matrix multiplication across multiple sizes; this config uses the reported 20x20 dense matrix-matrix demonstration as a local PhotonicBench surrogate only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 20,
      "k": 20,
      "n": 20
    },
    "macs": 8000,
    "equivalent_ops": 16000,
    "output_elements": 400
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
      "adc_conversions": 400,
      "vector_dac_conversions": 400,
      "weight_dac_conversions": 400,
      "dac_conversions": 800
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 400,
      "weight_operand_read_bytes": 400,
      "output_write_bytes": 400,
      "total_interface_bytes": 1200,
      "macs_per_byte": 6.666666666666667,
      "equivalent_ops_per_byte": 13.333333333333334,
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
          "read_bytes": 800.0,
          "write_bytes": 400.0,
          "total_bytes": 1200.0,
          "read_energy_pj": 16.0,
          "write_energy_pj": 8.0,
          "total_energy_pj": 24.0,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 1.171875,
          "contention_adjusted_transfer_time_ns": 1.171875,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 800.0,
          "write_bytes": 400.0,
          "total_bytes": 1200.0,
          "read_energy_pj": 160.0,
          "write_energy_pj": 80.0,
          "total_energy_pj": 240.0,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 4.6875,
          "contention_adjusted_transfer_time_ns": 4.6875,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 800.0,
          "write_bytes": 400.0,
          "total_bytes": 1200.0,
          "read_energy_pj": 8000.0,
          "write_energy_pj": 4000.0,
          "total_energy_pj": 12000.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 75.0,
          "contention_adjusted_transfer_time_ns": 75.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 380.0,
      "total_movement_energy_pj": 12264.0,
      "total_system_energy_pj": 12644.0,
      "system_energy_per_mac_pj": 1.5805,
      "system_energy_per_op_pj": 0.79025,
      "movement_energy_share": 0.9699462195507751,
      "total_hierarchy_bytes": 3600.0,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "max_transfer_time_ns": 75.0,
      "serial_transfer_time_ns": 80.859375,
      "effective_transfer_time_ns": 75.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 75.0,
      "contention_adjusted_serial_transfer_time_ns": 80.859375,
      "contention_adjusted_effective_transfer_time_ns": 75.0,
      "calibration_adjusted_effective_transfer_time_ns": 75.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "bandwidth_limited_batch_latency_ns": 75.0,
      "bandwidth_pressure_ratio": 75.0,
      "bandwidth_limited_equivalent_ops_per_second": 213333333333.3333,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 75.0,
      "contention_pressure_ratio": 75.0,
      "contention_adjusted_equivalent_ops_per_second": 213333333333.3333,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 4.0,
      "laser_electrical_pj": 16.0,
      "detector_pj": 4.0,
      "adc_pj": 200.0,
      "vector_dac_pj": 80.0,
      "weight_dac_pj": 80.0,
      "dac_pj": 160.0,
      "total_pj": 380.0,
      "energy_per_mac_pj": 0.0475,
      "energy_per_op_pj": 0.02375,
      "peripheral_share": 0.9578947368421052
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
      "steady_state_equivalent_ops_per_second": 16000000000000.0
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
      "source_title": "Direct tensor processing with coherent light",
      "source_url": "https://www.nature.com/articles/s41566-025-01799-7",
      "doi": "10.1038/s41566-025-01799-7",
      "venue": "Nature Photonics 20, 102-108 (2026)",
      "claim_status": "paper-reported optical matrix-matrix multiplication; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Parallel optical matrix-matrix multiplication with coherent light",
      "additional_metrics": {
        "demonstrated_nonnegative_matrix_size": 20,
        "demonstrated_real_valued_matrix_size": 10,
        "quantitative_matrix_sizes": "10,20,30,40,50",
        "random_matrix_pairs_per_size": 50,
        "mean_absolute_error_less_than": 0.15,
        "normalized_rmse_less_than": 0.1,
        "data_doi": "10.6084/m9.figshare.30173512",
        "code_url": "https://github.com/DecadeBin/POMMM.git",
        "surrogate_mapping": "m=20, k=20, n=20 matches the reported non-negative POMMM matrix-matrix demonstration; it is not a full optical-field propagation or camera-readout reproduction."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Direct tensor processing with coherent light",
      "source_doi": "10.1038/s41566-025-01799-7",
      "reported_metrics": [
        "matrix_size",
        "numerical_error",
        "code",
        "data"
      ],
      "local_surrogate_type": "dense_pommm_matrix_matrix_surrogate",
      "coverage": {
        "throughput": "not_reported",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "derived"
      },
      "confidence_grade": "B",
      "notes": [
        "The source directly demonstrates matrix-matrix multiplication and publishes code/data, but no scalar TOPS or TOPS/W value is encoded in this card."
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
    "Source-reported accuracy/error and matrix-size evidence are preserved as published references.",
    "Local optical MAC energy, converter energy, SRAM/intermediate/off-chip tiers, and one-nanosecond latency are generic PhotonicBench assumptions.",
    "Weight-stationary mode approximates reusing the right operand within the local dense tile and does not model coherent field propagation, imaging, or camera readout.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Direct tensor processing with coherent light",
    "source_url": "https://www.nature.com/articles/s41566-025-01799-7",
    "doi": "10.1038/s41566-025-01799-7",
    "venue": "Nature Photonics 20, 102-108 (2026)",
    "claim_status": "paper-reported optical matrix-matrix multiplication; matmul-surrogate local model"
  }
}
;
