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
      "scenario": {
        "name": "default",
        "description": "PhotonicBench baseline: local SRAM plus a conservative generic off-chip/DRAM tier matching the historical defaults.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "single_client",
        "contention_preset_description": "Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband.",
        "overlap_model": "profile_timing_mode",
        "assumptions": {
          "shared_bandwidth_clients": 1.0,
          "arbitration_efficiency": 1.0,
          "calibration_overhead_fraction": 0.0,
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
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "single_client",
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0,
        "overlap_model": "profile_timing_mode"
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
      "memory_scenario": {
        "name": "default",
        "description": "PhotonicBench baseline: local SRAM plus a conservative generic off-chip/DRAM tier matching the historical defaults.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "single_client",
        "contention_preset_description": "Dedicated memory path: one modeled client, no arbitration loss, and no calibration/control guardband.",
        "overlap_model": "profile_timing_mode",
        "assumptions": {
          "shared_bandwidth_clients": 1.0,
          "arbitration_efficiency": 1.0,
          "calibration_overhead_fraction": 0.0,
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
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "single_client",
        "shared_bandwidth_clients": 1.0,
        "arbitration_efficiency": 1.0,
        "calibration_overhead_fraction": 0.0,
        "overlap_model": "profile_timing_mode"
      },
      "contention_preset": "single_client",
      "contention_overlap_model": "profile_timing_mode",
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
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.013671875,
          "contention_adjusted_transfer_time_ns": 0.013671875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.013671875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "system_energy_share": 0.0019030013049151804,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.013671875,
          "contention_adjusted_transfer_pressure_ratio": 0.013671875,
          "compute_window_required_bandwidth_bytes_per_ns": 14.0,
          "contention_bandwidth_utilization": 0.013671875,
          "contention_bandwidth_headroom_bytes_per_ns": 1010.0,
          "contention_bandwidth_headroom_ratio": 73.14285714285714
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
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.0546875,
          "contention_adjusted_transfer_time_ns": 0.0546875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.0546875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.01956947162426614,
          "system_energy_share": 0.0190300130491518,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.0546875,
          "contention_adjusted_transfer_pressure_ratio": 0.0546875,
          "compute_window_required_bandwidth_bytes_per_ns": 14.0,
          "contention_bandwidth_utilization": 0.0546875,
          "contention_bandwidth_headroom_bytes_per_ns": 242.0,
          "contention_bandwidth_headroom_ratio": 18.285714285714285
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
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 0.875,
          "contention_adjusted_transfer_time_ns": 0.875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9515006524575901,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 0.875,
          "contention_adjusted_transfer_pressure_ratio": 0.875,
          "compute_window_required_bandwidth_bytes_per_ns": 14.0,
          "contention_bandwidth_utilization": 0.875,
          "contention_bandwidth_headroom_bytes_per_ns": 2.0,
          "contention_bandwidth_headroom_ratio": 1.1428571428571428
        }
      },
      "local_compute_and_conversion_energy_pj": 4.056,
      "total_movement_energy_pj": 143.08,
      "total_system_energy_pj": 147.13600000000002,
      "system_energy_per_mac_pj": 18.392000000000003,
      "system_energy_per_op_pj": 9.196000000000002,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 4.056,
          "share": 0.027566333188342753
        },
        "sram": {
          "energy_pj": 0.28,
          "share": 0.0019030013049151804
        },
        "intermediate": {
          "energy_pj": 2.8,
          "share": 0.0190300130491518
        },
        "off_chip": {
          "energy_pj": 140.0,
          "share": 0.9515006524575901
        },
        "movement_total": {
          "energy_pj": 143.08,
          "share": 0.9724336668116572
        },
        "total_system_energy_pj": 147.13600000000002,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.027566333188342753,
      "movement_energy_share": 0.9724336668116572,
      "movement_to_compute_energy_ratio": 35.27613412228797,
      "total_hierarchy_bytes": 42.0,
      "hierarchy_equivalent_ops_per_byte": 0.38095238095238093,
      "movement_energy_per_hierarchy_byte_pj": 3.406666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 0.875,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 0.875,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9515006524575901,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 0.875,
      "min_tier_contention_bandwidth_headroom_ratio": 1.1428571428571428,
      "max_transfer_time_ns": 0.875,
      "serial_transfer_time_ns": 0.943359375,
      "effective_transfer_time_ns": 0.875,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 0.875,
      "contention_adjusted_serial_transfer_time_ns": 0.943359375,
      "contention_adjusted_effective_transfer_time_ns": 0.875,
      "calibration_adjusted_effective_transfer_time_ns": 0.875,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 0.875,
      "bandwidth_limited_batch_latency_ns": 1.0,
      "bandwidth_pressure_ratio": 1.0,
      "bandwidth_limited_equivalent_ops_per_second": 15999999999.999998,
      "bandwidth_limited_tier": "compute",
      "contention_adjusted_batch_latency_ns": 1.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 0.875,
      "contention_pressure_ratio": 1.0,
      "contention_adjusted_equivalent_ops_per_second": 15999999999.999998,
      "contention_limited_tier": "compute",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
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
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
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
