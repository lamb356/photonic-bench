window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["chipai_2025_photonic_chiplet_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "ChipAI 2025 photonic chiplet surrogate",
    "description": "Source-backed card for the Journal of Systems Architecture 2025 ChipAI photonic chiplet accelerator. The local workload is a dense 128x128 surrogate chosen to stress chiplet/off-chip movement while paper-reported relative latency and energy reductions remain separate."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 128,
      "k": 128,
      "n": 128
    },
    "macs": 8388608,
    "equivalent_ops": 16777216,
    "output_elements": 65536
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
      "batch_size": 4,
      "vector_reuse_factor": 2,
      "weight_reuse_factor": 8,
      "weight_stationary": true,
      "pipeline": {
        "stages": 1,
        "cycle_time_ns": null
      }
    },
    "system": {
      "profile": "optical_interconnect",
      "profile_overrides": [],
      "scenario": {
        "name": "optical_interconnect",
        "description": "Optical interconnect scenario: local SRAM is paired with high bandwidth intermediate and off-chip optical movement paths to stress WDM/broadcast-like data movement separately from core photonic compute.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "optical_interconnect_broadcast",
        "contention_preset_description": "Optical interconnect/broadcast path: wavelength fanout reduces loaded-client contention, but arbitration and control guardband remain explicit local assumptions.",
        "overlap_model": "wavelength_broadcast_overlap",
        "assumptions": {
          "shared_bandwidth_clients": 1.5,
          "arbitration_efficiency": 0.92,
          "calibration_overhead_fraction": 0.02,
          "sram": {
            "read_energy_pj_per_byte": 0.02,
            "write_energy_pj_per_byte": 0.02,
            "bandwidth_bytes_per_ns": 2048.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          },
          "intermediate": {
            "read_energy_pj_per_byte": 0.08,
            "write_energy_pj_per_byte": 0.08,
            "bandwidth_bytes_per_ns": 1024.0,
            "read_fraction": 0.75,
            "write_fraction": 0.75
          },
          "off_chip": {
            "read_energy_pj_per_byte": 1.2,
            "write_energy_pj_per_byte": 1.5,
            "bandwidth_bytes_per_ns": 768.0,
            "read_fraction": 0.25,
            "write_fraction": 0.25
          }
        },
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "optical_interconnect_broadcast",
        "shared_bandwidth_clients": 1.5,
        "arbitration_efficiency": 0.92,
        "calibration_overhead_fraction": 0.02,
        "overlap_model": "wavelength_broadcast_overlap"
      },
      "sram": {
        "read_energy_pj_per_byte": 0.02,
        "write_energy_pj_per_byte": 0.02,
        "bandwidth_bytes_per_ns": 2048.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0
      },
      "intermediate": {
        "read_energy_pj_per_byte": 0.08,
        "write_energy_pj_per_byte": 0.08,
        "bandwidth_bytes_per_ns": 1024.0,
        "read_fraction": 0.75,
        "write_fraction": 0.75
      },
      "off_chip": {
        "read_energy_pj_per_byte": 1.2,
        "write_energy_pj_per_byte": 1.5,
        "bandwidth_bytes_per_ns": 768.0,
        "read_fraction": 0.25,
        "write_fraction": 0.25
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
      "adc_conversions": 65536,
      "vector_dac_conversions": 32768,
      "weight_dac_conversions": 16384,
      "dac_conversions": 49152
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 32768,
      "weight_operand_read_bytes": 16384,
      "output_write_bytes": 65536,
      "total_interface_bytes": 114688,
      "macs_per_byte": 73.14285714285714,
      "equivalent_ops_per_byte": 146.28571428571428,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "system": {
      "profile": "optical_interconnect",
      "profile_overrides": [],
      "memory_scenario": {
        "name": "optical_interconnect",
        "description": "Optical interconnect scenario: local SRAM is paired with high bandwidth intermediate and off-chip optical movement paths to stress WDM/broadcast-like data movement separately from core photonic compute.",
        "profile_overrides": [],
        "memory_timing_mode": "overlapped",
        "contention_preset": "optical_interconnect_broadcast",
        "contention_preset_description": "Optical interconnect/broadcast path: wavelength fanout reduces loaded-client contention, but arbitration and control guardband remain explicit local assumptions.",
        "overlap_model": "wavelength_broadcast_overlap",
        "assumptions": {
          "shared_bandwidth_clients": 1.5,
          "arbitration_efficiency": 0.92,
          "calibration_overhead_fraction": 0.02,
          "sram": {
            "read_energy_pj_per_byte": 0.02,
            "write_energy_pj_per_byte": 0.02,
            "bandwidth_bytes_per_ns": 2048.0,
            "read_fraction": 1.0,
            "write_fraction": 1.0
          },
          "intermediate": {
            "read_energy_pj_per_byte": 0.08,
            "write_energy_pj_per_byte": 0.08,
            "bandwidth_bytes_per_ns": 1024.0,
            "read_fraction": 0.75,
            "write_fraction": 0.75
          },
          "off_chip": {
            "read_energy_pj_per_byte": 1.2,
            "write_energy_pj_per_byte": 1.5,
            "bandwidth_bytes_per_ns": 768.0,
            "read_fraction": 0.25,
            "write_fraction": 0.25
          }
        },
        "note": "Memory scenario fields are local modeling assumptions for review and sensitivity analysis; they are not paper-published hardware measurements unless a card states otherwise."
      },
      "memory_timing_mode": "overlapped",
      "contention": {
        "preset": "optical_interconnect_broadcast",
        "shared_bandwidth_clients": 1.5,
        "arbitration_efficiency": 0.92,
        "calibration_overhead_fraction": 0.02,
        "overlap_model": "wavelength_broadcast_overlap"
      },
      "contention_preset": "optical_interconnect_broadcast",
      "contention_overlap_model": "wavelength_broadcast_overlap",
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 49152.0,
          "write_bytes": 65536.0,
          "total_bytes": 114688.0,
          "read_energy_pj": 983.04,
          "write_energy_pj": 1310.72,
          "total_energy_pj": 2293.76,
          "bandwidth_bytes_per_ns": 2048.0,
          "effective_bandwidth_bytes_per_ns": 1256.1066666666668,
          "transfer_time_ns": 56.0,
          "contention_adjusted_transfer_time_ns": 91.30434782608695,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 93.13043478260869,
          "traffic_share": 0.5,
          "movement_energy_share": 0.0472972972972973,
          "system_energy_share": 0.021135265700483092,
          "nominal_transfer_share": 0.6666666666666666,
          "contention_adjusted_transfer_share": 0.6666666666666666,
          "nominal_transfer_pressure_ratio": 14.0,
          "contention_adjusted_transfer_pressure_ratio": 23.282608695652172,
          "compute_window_required_bandwidth_bytes_per_ns": 28672.0,
          "contention_bandwidth_utilization": 22.82608695652174,
          "contention_bandwidth_headroom_bytes_per_ns": -27415.893333333333,
          "contention_bandwidth_headroom_ratio": 0.04380952380952381
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 36864.0,
          "write_bytes": 49152.0,
          "total_bytes": 86016.0,
          "read_energy_pj": 2949.12,
          "write_energy_pj": 3932.16,
          "total_energy_pj": 6881.28,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 628.0533333333334,
          "transfer_time_ns": 84.0,
          "contention_adjusted_transfer_time_ns": 136.9565217391304,
          "read_fraction": 0.75,
          "write_fraction": 0.75,
          "calibration_adjusted_transfer_time_ns": 139.69565217391303,
          "traffic_share": 0.375,
          "movement_energy_share": 0.14189189189189189,
          "system_energy_share": 0.06340579710144927,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 21.0,
          "contention_adjusted_transfer_pressure_ratio": 34.92391304347826,
          "compute_window_required_bandwidth_bytes_per_ns": 21504.0,
          "contention_bandwidth_utilization": 34.2391304347826,
          "contention_bandwidth_headroom_bytes_per_ns": -20875.946666666667,
          "contention_bandwidth_headroom_ratio": 0.029206349206349208
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 12288.0,
          "write_bytes": 16384.0,
          "total_bytes": 28672.0,
          "read_energy_pj": 14745.599999999999,
          "write_energy_pj": 24576.0,
          "total_energy_pj": 39321.6,
          "bandwidth_bytes_per_ns": 768.0,
          "effective_bandwidth_bytes_per_ns": 471.04,
          "transfer_time_ns": 37.333333333333336,
          "contention_adjusted_transfer_time_ns": 60.869565217391305,
          "read_fraction": 0.25,
          "write_fraction": 0.25,
          "calibration_adjusted_transfer_time_ns": 62.08695652173913,
          "traffic_share": 0.125,
          "movement_energy_share": 0.8108108108108107,
          "system_energy_share": 0.3623188405797101,
          "nominal_transfer_share": 0.4444444444444445,
          "contention_adjusted_transfer_share": 0.4444444444444445,
          "nominal_transfer_pressure_ratio": 9.333333333333334,
          "contention_adjusted_transfer_pressure_ratio": 15.521739130434783,
          "compute_window_required_bandwidth_bytes_per_ns": 7168.0,
          "contention_bandwidth_utilization": 15.217391304347826,
          "contention_bandwidth_headroom_bytes_per_ns": -6696.96,
          "contention_bandwidth_headroom_ratio": 0.06571428571428571
        }
      },
      "local_compute_and_conversion_energy_pj": 60030.976,
      "total_movement_energy_pj": 48496.64,
      "total_system_energy_pj": 108527.61600000001,
      "system_energy_per_mac_pj": 0.012937500000000001,
      "system_energy_per_op_pj": 0.0064687500000000005,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 60030.976,
          "share": 0.5531400966183575
        },
        "sram": {
          "energy_pj": 2293.76,
          "share": 0.021135265700483092
        },
        "intermediate": {
          "energy_pj": 6881.28,
          "share": 0.06340579710144927
        },
        "off_chip": {
          "energy_pj": 39321.6,
          "share": 0.3623188405797101
        },
        "movement_total": {
          "energy_pj": 48496.64,
          "share": 0.44685990338164244
        },
        "total_system_energy_pj": 108527.61600000001,
        "dominant_component": "local_compute_and_conversion",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.5531400966183575,
      "movement_energy_share": 0.44685990338164244,
      "movement_to_compute_energy_ratio": 0.8078602620087336,
      "total_hierarchy_bytes": 229376.0,
      "hierarchy_equivalent_ops_per_byte": 73.14285714285714,
      "movement_energy_per_hierarchy_byte_pj": 0.21142857142857144,
      "sram_traffic_share": 0.5,
      "intermediate_traffic_share": 0.375,
      "off_chip_traffic_share": 0.125,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "local_compute_and_conversion",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "intermediate",
      "contention_memory_bottleneck_tier": "intermediate",
      "max_tier_nominal_transfer_pressure_ratio": 21.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 34.92391304347826,
      "max_tier_movement_energy_share": 0.8108108108108107,
      "max_tier_system_energy_share": 0.3623188405797101,
      "contention_bandwidth_saturation_tier": "intermediate",
      "max_tier_contention_bandwidth_utilization": 34.2391304347826,
      "min_tier_contention_bandwidth_headroom_ratio": 0.029206349206349208,
      "max_transfer_time_ns": 84.0,
      "serial_transfer_time_ns": 177.33333333333334,
      "effective_transfer_time_ns": 84.0,
      "contention_bandwidth_derate_factor": 0.6133333333333334,
      "contention_adjusted_max_transfer_time_ns": 136.9565217391304,
      "contention_adjusted_serial_transfer_time_ns": 289.1304347826087,
      "contention_adjusted_effective_transfer_time_ns": 136.9565217391304,
      "calibration_adjusted_effective_transfer_time_ns": 139.69565217391303,
      "calibration_guardband_time_ns": 2.7391304347826235,
      "contention_transfer_overhead_fraction": 0.6304347826086953,
      "total_transfer_overhead_fraction": 0.6630434782608694,
      "effective_loaded_bandwidth_bytes_per_ns": 2730.6666666666665,
      "contention_only_loaded_bandwidth_bytes_per_ns": 1674.8088888888892,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 1641.9694989106756,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 1674.8088888888892,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 1641.9694989106756,
      "transfer_to_compute_time_ratio": 21.0,
      "bandwidth_limited_batch_latency_ns": 84.0,
      "bandwidth_pressure_ratio": 21.0,
      "bandwidth_limited_equivalent_ops_per_second": 199728761904761.88,
      "bandwidth_limited_tier": "intermediate",
      "contention_adjusted_batch_latency_ns": 139.69565217391303,
      "contention_adjusted_transfer_to_compute_time_ratio": 34.92391304347826,
      "contention_pressure_ratio": 34.92391304347826,
      "contention_adjusted_equivalent_ops_per_second": 120098340491752.27,
      "contention_limited_tier": "intermediate",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 4194.304,
      "laser_electrical_pj": 16777.216,
      "detector_pj": 655.36,
      "adc_pj": 32768.0,
      "vector_dac_pj": 6553.6,
      "weight_dac_pj": 3276.8,
      "dac_pj": 9830.400000000001,
      "total_pj": 60030.976,
      "energy_per_mac_pj": 0.00715625,
      "energy_per_op_pj": 0.003578125,
      "peripheral_share": 0.7205240174672489
    },
    "timing": {
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 1.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 1.0,
      "batch_latency_ns": 4.0,
      "steady_state_operations_per_second": 1000000000.0,
      "steady_state_equivalent_ops_per_second": 4194304000000000.0
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
      "source_title": "A scalable chiplet-based accelerator for efficient DNN inference using silicon photonics",
      "source_url": "https://doi.org/10.1016/j.sysarc.2024.103308",
      "doi": "10.1016/j.sysarc.2024.103308",
      "venue": "Journal of Systems Architecture 158, 103308 (2025)",
      "claim_status": "paper-reported relative inference-time and energy reductions; dense chiplet/off-chip surrogate"
    },
    "reported": {
      "architecture": "ChipAI silicon-photonic chiplet accelerator with hybrid optical network",
      "additional_metrics": {
        "inference_time_reduction_percent_up_to": 82,
        "energy_reduction_percent_up_to": 79,
        "hybrid_optical_network": true,
        "inter_chiplet_data_sharing": true,
        "intra_chiplet_data_sharing": true,
        "surrogate_mapping": "m=128, k=128, n=128 with batch/reuse settings stresses off-chip/chiplet movement; it is not a reproduction of the ChipAI simulator."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "A scalable chiplet-based accelerator for efficient DNN inference using silicon photonics",
      "source_doi": "10.1016/j.sysarc.2024.103308",
      "reported_metrics": [
        "relative_latency_reduction",
        "relative_energy_reduction",
        "photonic_interconnect_architecture"
      ],
      "local_surrogate_type": "photonic_chiplet_dense_movement_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "reported",
        "accuracy": "not_applicable",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The paper-reported relative reductions and hybrid optical-network behavior are kept as published references; local absolute energy, timing, and hierarchy metrics are PhotonicBench estimates."
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
    "The dense local workload intentionally stresses chiplet/off-chip movement and reuse rather than matching a specific DNN layer from the ChipAI paper.",
    "The optical_interconnect scenario is used as a local calibrated movement assumption for the chiplet interconnect sensitivity.",
    "Published relative latency and energy reductions remain under published_calibration and are not converted into absolute local model claims.",
    "The benchmark models 4 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": {
    "source_title": "A scalable chiplet-based accelerator for efficient DNN inference using silicon photonics",
    "source_url": "https://doi.org/10.1016/j.sysarc.2024.103308",
    "doi": "10.1016/j.sysarc.2024.103308",
    "venue": "Journal of Systems Architecture 158, 103308 (2025)",
    "claim_status": "paper-reported relative inference-time and energy reductions; dense chiplet/off-chip surrogate"
  }
}
;
