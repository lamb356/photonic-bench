window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["kovaios_2025_wdm_1tops_tensor_core_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Kovaios 2025 WDM 1 TOPS tensor core surrogate",
    "description": "Source-backed card for the Journal of Lightwave Technology 2025 WDM silicon photonic coherent crossbar. The local workload mirrors the reported 4x2x1 tensor-vector primitive while published metrics remain separate."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 4,
      "k": 2,
      "n": 1
    },
    "macs": 8,
    "equivalent_ops": 16,
    "output_elements": 4
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
      "weight_stationary": false,
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
      "adc_conversions": 4,
      "vector_dac_conversions": 8,
      "weight_dac_conversions": 2,
      "dac_conversions": 10
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 8,
      "weight_operand_read_bytes": 2,
      "output_write_bytes": 4,
      "total_interface_bytes": 14,
      "macs_per_byte": 0.5714285714285714,
      "equivalent_ops_per_byte": 1.1428571428571428,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "system": {
      "profile": "default",
      "profile_overrides": [],
      "memory_timing_mode": "overlapped",
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 10.0,
          "write_bytes": 4.0,
          "total_bytes": 14.0,
          "read_energy_pj": 0.2,
          "write_energy_pj": 0.08,
          "total_energy_pj": 0.28,
          "bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.013671875,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 10.0,
          "write_bytes": 4.0,
          "total_bytes": 14.0,
          "read_energy_pj": 2.0,
          "write_energy_pj": 0.8,
          "total_energy_pj": 2.8,
          "bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.0546875,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 10.0,
          "write_bytes": 4.0,
          "total_bytes": 14.0,
          "read_energy_pj": 100.0,
          "write_energy_pj": 40.0,
          "total_energy_pj": 140.0,
          "bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 0.875,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 4.056,
      "total_movement_energy_pj": 143.08,
      "total_system_energy_pj": 147.13600000000002,
      "system_energy_per_mac_pj": 18.392000000000003,
      "system_energy_per_op_pj": 9.196000000000002,
      "movement_energy_share": 0.9724336668116572,
      "max_transfer_time_ns": 0.875,
      "serial_transfer_time_ns": 0.943359375,
      "effective_transfer_time_ns": 0.875,
      "bandwidth_limited_batch_latency_ns": 1.0,
      "bandwidth_limited_equivalent_ops_per_second": 15999999999.999998,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.004,
      "laser_electrical_pj": 0.016,
      "detector_pj": 0.04,
      "adc_pj": 2.0,
      "vector_dac_pj": 1.6,
      "weight_dac_pj": 0.4,
      "dac_pj": 2.0,
      "total_pj": 4.056,
      "energy_per_mac_pj": 0.507,
      "energy_per_op_pj": 0.2535,
      "peripheral_share": 0.9960552268244576
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
      "steady_state_equivalent_ops_per_second": 16000000000.0
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
      "source_title": "On-chip 1 TOPS Hyperdimensional Photonic Tensor Core Using a WDM Silicon Photonic Coherent Crossbar",
      "source_url": "https://doi.org/10.1109/JLT.2025.3589088",
      "doi": "10.1109/JLT.2025.3589088",
      "venue": "Journal of Lightwave Technology 43, 8799-8805 (2025)",
      "claim_status": "paper-reported throughput/error/classification metrics; primitive-shape local model"
    },
    "reported": {
      "architecture": "Time-space-wavelength multiplexed WDM silicon photonic coherent crossbar",
      "reported_tops": 0.96,
      "additional_metrics": {
        "tensor_vector_unit_shape": "4x2x1",
        "average_error_percent": 3.9,
        "eam_bandwidth_ghz": 56,
        "channels": 4,
        "inputs_per_channel": 2,
        "iris_accuracy_percent_4x10_to_4x30_gbd": 93.3,
        "iris_accuracy_percent_4x60_gbd": 83.3,
        "zenodo_doi": "10.5281/zenodo.20052485",
        "surrogate_mapping": "m=4, k=2, n=1 mirrors the reported 4x2x1 tensor-vector primitive; it is not the full hyperdimensional scaling analysis."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "On-chip 1 TOPS Hyperdimensional Photonic Tensor Core Using a WDM Silicon Photonic Coherent Crossbar",
      "source_doi": "10.1109/JLT.2025.3589088",
      "reported_metrics": [
        "throughput",
        "error",
        "data_rate",
        "classification_accuracy"
      ],
      "local_surrogate_type": "primitive_wdm_tensor_vector_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The local shape tracks the demonstrated primitive, while the reported 0.96 TOPS system claim is kept as published reference data."
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
    "Source-reported throughput, error, data-rate, and Iris classification metrics remain under published_calibration.",
    "Local energy and system movement are PhotonicBench assumptions for a tiny primitive-shaped matmul workload.",
    "This card does not model POPS-scale extrapolation, wavelength routing, or time-space-wavelength scheduling.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted every 1 operation(s).",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": {
    "source_title": "On-chip 1 TOPS Hyperdimensional Photonic Tensor Core Using a WDM Silicon Photonic Coherent Crossbar",
    "source_url": "https://doi.org/10.1109/JLT.2025.3589088",
    "doi": "10.1109/JLT.2025.3589088",
    "venue": "Journal of Lightwave Technology 43, 8799-8805 (2025)",
    "claim_status": "paper-reported throughput/error/classification metrics; primitive-shape local model"
  }
}
;
