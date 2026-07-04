window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["lin_2024_tfln_120gops_tensor_core_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Lin 2024 TFLN 120 GOPS tensor core surrogate",
    "description": "Source-backed card for the Nature Communications 2024 thin-film lithium niobate photonic tensor core. The published device performs large fan-in neural-network layers; this config uses a 16x16 dense local matmul surrogate for comparison only."
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
        "cycle_time_ns": null
      }
    },
    "system": {
      "profile": "default",
      "profile_overrides": [],
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
    "system": {
      "profile": "default",
      "profile_overrides": [],
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 512.0,
          "write_bytes": 256.0,
          "total_bytes": 768.0,
          "read_energy_pj": 10.24,
          "write_energy_pj": 5.12,
          "total_energy_pj": 15.36,
          "bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.75,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 512.0,
          "write_bytes": 256.0,
          "total_bytes": 768.0,
          "read_energy_pj": 5120.0,
          "write_energy_pj": 2560.0,
          "total_energy_pj": 7680.0,
          "bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 48.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 241.15200000000002,
      "total_movement_energy_pj": 7695.36,
      "total_system_energy_pj": 7936.512,
      "system_energy_per_mac_pj": 1.937625,
      "system_energy_per_op_pj": 0.9688125,
      "movement_energy_share": 0.9696148635571898,
      "max_transfer_time_ns": 48.0,
      "bandwidth_limited_batch_latency_ns": 48.0,
      "bandwidth_limited_equivalent_ops_per_second": 170666666666.66666,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
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
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 1.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 1.0,
      "batch_latency_ns": 1.0,
      "steady_state_operations_per_second": 1000000000.0,
      "steady_state_equivalent_ops_per_second": 8192000000000.0
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
      "source_title": "120 GOPS Photonic tensor core in thin-film lithium niobate for inference and in situ training",
      "source_url": "https://www.nature.com/articles/s41467-024-53261-x",
      "doi": "10.1038/s41467-024-53261-x",
      "venue": "Nature Communications 15, 9081 (2024)",
      "claim_status": "paper-reported speed/training claims; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Thin-film lithium niobate integrated photonic tensor core",
      "reported_tops": 0.12,
      "additional_metrics": {
        "reported_gops": 120,
        "weight_update_speed_ghz": 60,
        "fan_in_dimension": 131072,
        "image_pixels": 12544,
        "physical_components_note": "two TFLN modulators, III-V laser, and charge-integration photoreceiver",
        "surrogate_mapping": "m=16, k=16, n=16 is a dense local surrogate for the large fan-in TFLN tensor core; not an exact time-domain integration schedule."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "120 GOPS Photonic tensor core in thin-film lithium niobate for inference and in situ training",
      "source_doi": "10.1038/s41467-024-53261-x",
      "reported_metrics": [
        "throughput",
        "weight_update_speed",
        "fan_in",
        "architecture"
      ],
      "local_surrogate_type": "dense_tfln_fan_in_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "not_reported",
        "accuracy": "not_reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "C",
      "notes": [
        "Source-backed speed and fan-in evidence are present, but energy and task-quality coverage are not encoded in this card."
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
    "Source reports 120 GOPS computational speed and 60 GHz weight update speed; this card stores those values as published references.",
    "Local workload and component energy values are PhotonicBench assumptions selected for comparable dense-card analysis.",
    "Weight-stationary mode approximates reusing the surrogate right operand and does not model the paper's charge-integration schedule.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": {
    "source_title": "120 GOPS Photonic tensor core in thin-film lithium niobate for inference and in situ training",
    "source_url": "https://www.nature.com/articles/s41467-024-53261-x",
    "doi": "10.1038/s41467-024-53261-x",
    "venue": "Nature Communications 15, 9081 (2024)",
    "claim_status": "paper-reported speed/training claims; matmul-surrogate local model"
  }
}
;
