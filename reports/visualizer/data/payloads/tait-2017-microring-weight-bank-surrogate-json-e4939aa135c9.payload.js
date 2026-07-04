window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["tait_2017_microring_weight_bank_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Tait 2017 microring weight-bank WDM surrogate",
    "description": "Source-backed card for the Scientific Reports 2017 broadcast-and-weight microring neural network. The local workload maps a 24-node recurrent weight-bank step to a 24x24 by 24x1 matvec surrogate with optical-interconnect movement assumptions."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 24,
      "k": 24,
      "n": 1
    },
    "macs": 576,
    "equivalent_ops": 1152,
    "output_elements": 24
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
      "adc_conversions": 24,
      "vector_dac_conversions": 576,
      "weight_dac_conversions": 24,
      "dac_conversions": 600
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 576,
      "weight_operand_read_bytes": 24,
      "output_write_bytes": 24,
      "total_interface_bytes": 624,
      "macs_per_byte": 0.9230769230769231,
      "equivalent_ops_per_byte": 1.8461538461538463,
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
          "read_bytes": 600.0,
          "write_bytes": 24.0,
          "total_bytes": 624.0,
          "read_energy_pj": 12.0,
          "write_energy_pj": 0.48,
          "total_energy_pj": 12.48,
          "bandwidth_bytes_per_ns": 2048.0,
          "effective_bandwidth_bytes_per_ns": 1256.1066666666668,
          "transfer_time_ns": 0.3046875,
          "contention_adjusted_transfer_time_ns": 0.4967730978260869,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.5067085597826086,
          "traffic_share": 0.5,
          "movement_energy_share": 0.05223505775991964,
          "system_energy_share": 0.03352027331915168,
          "nominal_transfer_share": 0.6666666666666666,
          "contention_adjusted_transfer_share": 0.6666666666666666,
          "nominal_transfer_pressure_ratio": 0.3046875,
          "contention_adjusted_transfer_pressure_ratio": 0.5067085597826086,
          "compute_window_required_bandwidth_bytes_per_ns": 624.0,
          "contention_bandwidth_utilization": 0.4967730978260869,
          "contention_bandwidth_headroom_bytes_per_ns": 632.1066666666668,
          "contention_bandwidth_headroom_ratio": 2.012991452991453
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 450.0,
          "write_bytes": 18.0,
          "total_bytes": 468.0,
          "read_energy_pj": 36.0,
          "write_energy_pj": 1.44,
          "total_energy_pj": 37.44,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 628.0533333333334,
          "transfer_time_ns": 0.45703125,
          "contention_adjusted_transfer_time_ns": 0.7451596467391304,
          "read_fraction": 0.75,
          "write_fraction": 0.75,
          "calibration_adjusted_transfer_time_ns": 0.760062839673913,
          "traffic_share": 0.375,
          "movement_energy_share": 0.1567051732797589,
          "system_energy_share": 0.10056081995745503,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 0.45703125,
          "contention_adjusted_transfer_pressure_ratio": 0.760062839673913,
          "compute_window_required_bandwidth_bytes_per_ns": 468.0,
          "contention_bandwidth_utilization": 0.7451596467391304,
          "contention_bandwidth_headroom_bytes_per_ns": 160.0533333333334,
          "contention_bandwidth_headroom_ratio": 1.3419943019943021
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 150.0,
          "write_bytes": 6.0,
          "total_bytes": 156.0,
          "read_energy_pj": 180.0,
          "write_energy_pj": 9.0,
          "total_energy_pj": 189.0,
          "bandwidth_bytes_per_ns": 768.0,
          "effective_bandwidth_bytes_per_ns": 471.04,
          "transfer_time_ns": 0.203125,
          "contention_adjusted_transfer_time_ns": 0.3311820652173913,
          "read_fraction": 0.25,
          "write_fraction": 0.25,
          "calibration_adjusted_transfer_time_ns": 0.33780570652173914,
          "traffic_share": 0.125,
          "movement_energy_share": 0.7910597689603215,
          "system_energy_share": 0.5076387545929221,
          "nominal_transfer_share": 0.4444444444444444,
          "contention_adjusted_transfer_share": 0.4444444444444445,
          "nominal_transfer_pressure_ratio": 0.203125,
          "contention_adjusted_transfer_pressure_ratio": 0.33780570652173914,
          "compute_window_required_bandwidth_bytes_per_ns": 156.0,
          "contention_bandwidth_utilization": 0.3311820652173913,
          "contention_bandwidth_headroom_bytes_per_ns": 315.04,
          "contention_bandwidth_headroom_ratio": 3.0194871794871796
        }
      },
      "local_compute_and_conversion_energy_pj": 133.392,
      "total_movement_energy_pj": 238.92,
      "total_system_energy_pj": 372.312,
      "system_energy_per_mac_pj": 0.646375,
      "system_energy_per_op_pj": 0.3231875,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 133.392,
          "share": 0.3582801521304712
        },
        "sram": {
          "energy_pj": 12.48,
          "share": 0.03352027331915168
        },
        "intermediate": {
          "energy_pj": 37.44,
          "share": 0.10056081995745503
        },
        "off_chip": {
          "energy_pj": 189.0,
          "share": 0.5076387545929221
        },
        "movement_total": {
          "energy_pj": 238.92,
          "share": 0.6417198478695287
        },
        "total_system_energy_pj": 372.312,
        "dominant_component": "off_chip",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.3582801521304712,
      "movement_energy_share": 0.6417198478695287,
      "movement_to_compute_energy_ratio": 1.791111910759266,
      "total_hierarchy_bytes": 1248.0,
      "hierarchy_equivalent_ops_per_byte": 0.9230769230769231,
      "movement_energy_per_hierarchy_byte_pj": 0.1914423076923077,
      "sram_traffic_share": 0.5,
      "intermediate_traffic_share": 0.375,
      "off_chip_traffic_share": 0.125,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "intermediate",
      "contention_memory_bottleneck_tier": "intermediate",
      "max_tier_nominal_transfer_pressure_ratio": 0.45703125,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 0.760062839673913,
      "max_tier_movement_energy_share": 0.7910597689603215,
      "max_tier_system_energy_share": 0.5076387545929221,
      "contention_bandwidth_saturation_tier": "intermediate",
      "max_tier_contention_bandwidth_utilization": 0.7451596467391304,
      "min_tier_contention_bandwidth_headroom_ratio": 1.3419943019943021,
      "max_transfer_time_ns": 0.45703125,
      "serial_transfer_time_ns": 0.96484375,
      "effective_transfer_time_ns": 0.45703125,
      "contention_bandwidth_derate_factor": 0.6133333333333334,
      "contention_adjusted_max_transfer_time_ns": 0.7451596467391304,
      "contention_adjusted_serial_transfer_time_ns": 1.5731148097826086,
      "contention_adjusted_effective_transfer_time_ns": 0.7451596467391304,
      "calibration_adjusted_effective_transfer_time_ns": 0.760062839673913,
      "calibration_guardband_time_ns": 0.014903192934782594,
      "contention_transfer_overhead_fraction": 0.6304347826086956,
      "total_transfer_overhead_fraction": 0.6630434782608694,
      "effective_loaded_bandwidth_bytes_per_ns": 2730.6666666666665,
      "contention_only_loaded_bandwidth_bytes_per_ns": 1674.808888888889,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 1641.9694989106756,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 1674.808888888889,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 1641.9694989106756,
      "transfer_to_compute_time_ratio": 0.45703125,
      "bandwidth_limited_batch_latency_ns": 1.0,
      "bandwidth_pressure_ratio": 1.0,
      "bandwidth_limited_equivalent_ops_per_second": 1152000000000.0,
      "bandwidth_limited_tier": "compute",
      "contention_adjusted_batch_latency_ns": 1.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 0.760062839673913,
      "contention_pressure_ratio": 1.0,
      "contention_adjusted_equivalent_ops_per_second": 1152000000000.0,
      "contention_limited_tier": "compute",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.288,
      "laser_electrical_pj": 1.152,
      "detector_pj": 0.24,
      "adc_pj": 12.0,
      "vector_dac_pj": 115.2,
      "weight_dac_pj": 4.800000000000001,
      "dac_pj": 120.0,
      "total_pj": 133.392,
      "energy_per_mac_pj": 0.23158333333333334,
      "energy_per_op_pj": 0.11579166666666667,
      "peripheral_share": 0.9913637999280318
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
      "steady_state_equivalent_ops_per_second": 1152000000000.0
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
      "source_title": "Neuromorphic photonic networks using silicon photonic weight banks",
      "source_url": "https://www.nature.com/articles/s41598-017-07754-z",
      "doi": "10.1038/s41598-017-07754-z",
      "venue": "Scientific Reports 7, Article 7430 (2017)",
      "claim_status": "paper-reported broadcast-and-weight architecture and 24-node simulation; WDM matvec surrogate"
    },
    "reported": {
      "architecture": "Silicon photonic broadcast-and-weight microring weight-bank network",
      "additional_metrics": {
        "simulated_nodes": 24,
        "microring_weights": 576,
        "laser_modulator_count": 24,
        "weight_bank_count": 24,
        "expected_system_power_mw": 106,
        "predicted_acceleration_vs_conventional": 294,
        "protocol": "wavelength-division multiplexed broadcast-and-weight",
        "surrogate_mapping": "m=24, k=24, n=1 follows one 24-node recurrent weight-bank matvec step; it is not a full recurrent network simulation."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Neuromorphic photonic networks using silicon photonic weight banks",
      "source_doi": "10.1038/s41598-017-07754-z",
      "reported_metrics": [
        "architecture",
        "node_count",
        "weight_count",
        "power_estimate",
        "acceleration_estimate"
      ],
      "local_surrogate_type": "wdm_microring_weight_bank_matvec_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "estimated",
        "accuracy": "derived",
        "area": "reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source anchors WDM broadcast-and-weight memory behavior and scale, while local energy and contention outputs are PhotonicBench scenario estimates."
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
    "Source-reported 24-node, 576-weight, expected-power, and acceleration figures remain under published_calibration.",
    "The optical_interconnect scenario is used to stress WDM/broadcast movement; it is not a measured link model from the paper.",
    "Weight-stationary mode approximates microring weight banks for one local recurrent-network step.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": {
    "source_title": "Neuromorphic photonic networks using silicon photonic weight banks",
    "source_url": "https://www.nature.com/articles/s41598-017-07754-z",
    "doi": "10.1038/s41598-017-07754-z",
    "venue": "Scientific Reports 7, Article 7430 (2017)",
    "claim_status": "paper-reported broadcast-and-weight architecture and 24-node simulation; WDM matvec surrogate"
  }
}
;
