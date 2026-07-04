window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["meyer_2026_reconfigurable_ptp_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Meyer 2026 reconfigurable photonic tensor processor surrogate",
    "description": "Source-backed card for the Nature Communications 2026 rack-integrated photonic tensor processor. The paper demonstrates a 9-input, 3-output all-optical crossbar with PyTorch-facing inference; this config uses one 1x9 by 9x3 local MVM surrogate for PhotonicBench comparison only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 1,
      "k": 9,
      "n": 3
    },
    "macs": 27,
    "equivalent_ops": 54,
    "output_elements": 3
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
      "adc_conversions": 3,
      "vector_dac_conversions": 9,
      "weight_dac_conversions": 27,
      "dac_conversions": 36
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 9,
      "weight_operand_read_bytes": 27,
      "output_write_bytes": 3,
      "total_interface_bytes": 39,
      "macs_per_byte": 0.6923076923076923,
      "equivalent_ops_per_byte": 1.3846153846153846,
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
          "read_bytes": 36.0,
          "write_bytes": 3.0,
          "total_bytes": 39.0,
          "read_energy_pj": 0.72,
          "write_energy_pj": 0.06,
          "total_energy_pj": 0.78,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.0380859375,
          "contention_adjusted_transfer_time_ns": 0.0380859375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.0380859375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.0380859375,
          "contention_adjusted_transfer_pressure_ratio": 0.0380859375,
          "compute_window_required_bandwidth_bytes_per_ns": 39.0,
          "contention_bandwidth_utilization": 0.0380859375,
          "contention_bandwidth_headroom_bytes_per_ns": 985.0,
          "contention_bandwidth_headroom_ratio": 26.256410256410255
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 36.0,
          "write_bytes": 3.0,
          "total_bytes": 39.0,
          "read_energy_pj": 7.2,
          "write_energy_pj": 0.6000000000000001,
          "total_energy_pj": 7.800000000000001,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.15234375,
          "contention_adjusted_transfer_time_ns": 0.15234375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.15234375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.15234375,
          "contention_adjusted_transfer_pressure_ratio": 0.15234375,
          "compute_window_required_bandwidth_bytes_per_ns": 39.0,
          "contention_bandwidth_utilization": 0.15234375,
          "contention_bandwidth_headroom_bytes_per_ns": 217.0,
          "contention_bandwidth_headroom_ratio": 6.564102564102564
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 36.0,
          "write_bytes": 3.0,
          "total_bytes": 39.0,
          "read_energy_pj": 360.0,
          "write_energy_pj": 30.0,
          "total_energy_pj": 390.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 2.4375,
          "contention_adjusted_transfer_time_ns": 2.4375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 2.4375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133073,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 2.4375,
          "contention_adjusted_transfer_pressure_ratio": 2.4375,
          "compute_window_required_bandwidth_bytes_per_ns": 39.0,
          "contention_bandwidth_utilization": 2.4375,
          "contention_bandwidth_headroom_bytes_per_ns": -23.0,
          "contention_bandwidth_headroom_ratio": 0.41025641025641024
        }
      },
      "local_compute_and_conversion_energy_pj": 8.784,
      "total_movement_energy_pj": 398.58,
      "total_system_energy_pj": 407.364,
      "system_energy_per_mac_pj": 15.087555555555555,
      "system_energy_per_op_pj": 7.543777777777778,
      "movement_energy_share": 0.9784369752850031,
      "total_hierarchy_bytes": 117.0,
      "hierarchy_equivalent_ops_per_byte": 0.46153846153846156,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 2.4375,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 2.4375,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 2.4375,
      "min_tier_contention_bandwidth_headroom_ratio": 0.41025641025641024,
      "max_transfer_time_ns": 2.4375,
      "serial_transfer_time_ns": 2.6279296875,
      "effective_transfer_time_ns": 2.4375,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 2.4375,
      "contention_adjusted_serial_transfer_time_ns": 2.6279296875,
      "contention_adjusted_effective_transfer_time_ns": 2.4375,
      "calibration_adjusted_effective_transfer_time_ns": 2.4375,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 2.4375,
      "bandwidth_limited_batch_latency_ns": 2.4375,
      "bandwidth_pressure_ratio": 2.4375,
      "bandwidth_limited_equivalent_ops_per_second": 22153846153.84615,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 2.4375,
      "contention_adjusted_transfer_to_compute_time_ratio": 2.4375,
      "contention_pressure_ratio": 2.4375,
      "contention_adjusted_equivalent_ops_per_second": 22153846153.84615,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.0135,
      "laser_electrical_pj": 0.054,
      "detector_pj": 0.03,
      "adc_pj": 1.5,
      "vector_dac_pj": 1.8,
      "weight_dac_pj": 5.4,
      "dac_pj": 7.2,
      "total_pj": 8.784,
      "energy_per_mac_pj": 0.32533333333333336,
      "energy_per_op_pj": 0.16266666666666668,
      "peripheral_share": 0.9938524590163934
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
      "steady_state_equivalent_ops_per_second": 54000000000.0
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
      "source_title": "Deep neural network inference on an integrated, reconfigurable photonic tensor processor",
      "source_url": "https://www.nature.com/articles/s41467-026-71599-2",
      "doi": "10.1038/s41467-026-71599-2",
      "venue": "Nature Communications 17, 3396 (2026)",
      "claim_status": "paper-reported integrated photonic tensor processor metrics; MVM-surrogate local model"
    },
    "reported": {
      "architecture": "Rack-integrated 9-input, 3-output incoherent photonic tensor processor",
      "reported_tops": 0.054,
      "energy_efficiency_including_lasers_tops_per_watt": 0.022,
      "additional_metrics": {
        "reported_gmac_per_second": 27,
        "projected_continuous_streaming_power_w": 2.5,
        "effective_symbol_rate_ghz": 1,
        "input_dac_rate_gsps": 4,
        "output_adc_rate_gsps": 2,
        "weight_reprogramming_ms": 62,
        "mvm_error_single_shot_percent": 19.4,
        "mvm_error_four_average_percent": 10.9,
        "mnist_accuracy_precision_percent": 98.1,
        "cifar10_accuracy_percent": 72.0,
        "optical_workload_mnist_percent": 97.5,
        "optical_workload_cifar10_percent": 99.0,
        "surrogate_mapping": "m=1, k=9, n=3 mirrors one reported 9-input by 3-output MVM primitive; it is not an end-to-end CNN, RFSoC, calibration, or tiling reproduction."
      }
    },
    "derived_unit_conversions": {
      "energy_per_op_including_lasers_pj": 45.45454545454546,
      "energy_per_mac_including_lasers_pj": 90.90909090909092,
      "total_energy_including_lasers_pj": 2454.545454545455,
      "model_to_published_including_lasers_ratio": 0.003578666666666666
    },
    "source_quality": {
      "source_reference": "Deep neural network inference on an integrated, reconfigurable photonic tensor processor",
      "source_doi": "10.1038/s41467-026-71599-2",
      "reported_metrics": [
        "throughput",
        "energy_efficiency",
        "accuracy",
        "system_integration",
        "error"
      ],
      "local_surrogate_type": "primitive_ptp_mvm_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "reported"
      },
      "confidence_grade": "A",
      "notes": [
        "The paper reports system-level throughput, projected efficiency, classification accuracy, MVM error, and integration details; the local PhotonicBench workload only mirrors the crossbar primitive shape."
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
    "Source throughput, efficiency, MVM error, and accuracy values remain under published_calibration and published_reference.",
    "Local optical MAC energy, converter energy, one-nanosecond latency, and system-tier movement are generic PhotonicBench assumptions.",
    "Weight-stationary mode approximates fixed programmed weights during streamed input vectors and does not model RFSoC scheduling, calibration, analog averaging, CNN tiling, or off-board electronics.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Deep neural network inference on an integrated, reconfigurable photonic tensor processor",
    "source_url": "https://www.nature.com/articles/s41467-026-71599-2",
    "doi": "10.1038/s41467-026-71599-2",
    "venue": "Nature Communications 17, 3396 (2026)",
    "claim_status": "paper-reported integrated photonic tensor processor metrics; MVM-surrogate local model"
  }
}
;
