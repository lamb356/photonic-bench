window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["lightening_transformer_2024_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Lightening-Transformer 2024 dynamic transformer surrogate",
    "description": "Source-backed activation-heavy card for the HPCA 2024 Lightening-Transformer accelerator. The paper targets dynamic full-range tensor multiplication and optical inter-core broadcast for Transformers; this config uses a dense 128x128 local matmul under the optical_interconnect scenario for PhotonicBench comparison only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 128,
      "k": 128,
      "n": 128
    },
    "macs": 16777216,
    "equivalent_ops": 33554432,
    "output_elements": 131072
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
      "batch_size": 8,
      "vector_reuse_factor": 1,
      "weight_reuse_factor": 1,
      "weight_stationary": false,
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
        "scenario_provenance": {
          "status": "source-context-plus-local-parameters",
          "calibration_scope": "WDM/broadcast-like optical movement scenario with high-bandwidth intermediate/off-chip paths.",
          "sources": [
            {
              "title": "Neuromorphic photonic networks using silicon photonic weight banks",
              "url": "https://www.nature.com/articles/s41598-017-07754-z",
              "reference_id": "10.1038/s41598-017-07754-z",
              "evidence_type": "photonic WDM broadcast-and-weight context",
              "supports": [
                "optical interconnect scenario",
                "broadcast movement preset"
              ]
            },
            {
              "title": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
              "url": "https://arxiv.org/abs/2305.19533",
              "reference_id": "10.48550/arXiv.2305.19533",
              "evidence_type": "optically interconnected accelerator context",
              "supports": [
                "activation-heavy optical broadcast",
                "dynamic tensor movement"
              ]
            }
          ],
          "local_assumptions": [
            "Optical interconnect tier pJ/byte, bandwidth, and traffic fractions are PhotonicBench local sweep parameters.",
            "Broadcast overlap is represented by a local contention model, not measured link-level scheduling."
          ],
          "reviewer_note": "Use this scenario for cards whose claim depends on optical movement, broadcast, or chiplet/interconnect behavior."
        },
        "contention_provenance": {
          "status": "source-context-plus-local-parameters",
          "calibration_scope": "Optical broadcast contention model with reduced loaded-client penalty and explicit control guardband.",
          "sources": [
            {
              "title": "Neuromorphic photonic networks using silicon photonic weight banks",
              "url": "https://www.nature.com/articles/s41598-017-07754-z",
              "reference_id": "10.1038/s41598-017-07754-z",
              "evidence_type": "photonic WDM broadcast-and-weight context",
              "supports": [
                "optical interconnect scenario",
                "broadcast movement preset"
              ]
            },
            {
              "title": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
              "url": "https://arxiv.org/abs/2305.19533",
              "reference_id": "10.48550/arXiv.2305.19533",
              "evidence_type": "optically interconnected accelerator context",
              "supports": [
                "activation-heavy optical broadcast",
                "dynamic tensor movement"
              ]
            }
          ],
          "local_assumptions": [
            "1.5 modeled clients, 0.92 arbitration efficiency, and 0.02 guardband are local WDM/broadcast sensitivity parameters."
          ],
          "reviewer_note": "Use to compare whether optical broadcast movement changes the decision without presenting it as measured hardware contention."
        },
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
      "adc_conversions": 131072,
      "vector_dac_conversions": 131072,
      "weight_dac_conversions": 131072,
      "dac_conversions": 262144
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 131072,
      "weight_operand_read_bytes": 131072,
      "output_write_bytes": 131072,
      "total_interface_bytes": 393216,
      "macs_per_byte": 42.666666666666664,
      "equivalent_ops_per_byte": 85.33333333333333,
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
        "scenario_provenance": {
          "status": "source-context-plus-local-parameters",
          "calibration_scope": "WDM/broadcast-like optical movement scenario with high-bandwidth intermediate/off-chip paths.",
          "sources": [
            {
              "title": "Neuromorphic photonic networks using silicon photonic weight banks",
              "url": "https://www.nature.com/articles/s41598-017-07754-z",
              "reference_id": "10.1038/s41598-017-07754-z",
              "evidence_type": "photonic WDM broadcast-and-weight context",
              "supports": [
                "optical interconnect scenario",
                "broadcast movement preset"
              ]
            },
            {
              "title": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
              "url": "https://arxiv.org/abs/2305.19533",
              "reference_id": "10.48550/arXiv.2305.19533",
              "evidence_type": "optically interconnected accelerator context",
              "supports": [
                "activation-heavy optical broadcast",
                "dynamic tensor movement"
              ]
            }
          ],
          "local_assumptions": [
            "Optical interconnect tier pJ/byte, bandwidth, and traffic fractions are PhotonicBench local sweep parameters.",
            "Broadcast overlap is represented by a local contention model, not measured link-level scheduling."
          ],
          "reviewer_note": "Use this scenario for cards whose claim depends on optical movement, broadcast, or chiplet/interconnect behavior."
        },
        "contention_provenance": {
          "status": "source-context-plus-local-parameters",
          "calibration_scope": "Optical broadcast contention model with reduced loaded-client penalty and explicit control guardband.",
          "sources": [
            {
              "title": "Neuromorphic photonic networks using silicon photonic weight banks",
              "url": "https://www.nature.com/articles/s41598-017-07754-z",
              "reference_id": "10.1038/s41598-017-07754-z",
              "evidence_type": "photonic WDM broadcast-and-weight context",
              "supports": [
                "optical interconnect scenario",
                "broadcast movement preset"
              ]
            },
            {
              "title": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
              "url": "https://arxiv.org/abs/2305.19533",
              "reference_id": "10.48550/arXiv.2305.19533",
              "evidence_type": "optically interconnected accelerator context",
              "supports": [
                "activation-heavy optical broadcast",
                "dynamic tensor movement"
              ]
            }
          ],
          "local_assumptions": [
            "1.5 modeled clients, 0.92 arbitration efficiency, and 0.02 guardband are local WDM/broadcast sensitivity parameters."
          ],
          "reviewer_note": "Use to compare whether optical broadcast movement changes the decision without presenting it as measured hardware contention."
        },
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
          "read_bytes": 262144.0,
          "write_bytes": 131072.0,
          "total_bytes": 393216.0,
          "read_energy_pj": 5242.88,
          "write_energy_pj": 2621.44,
          "total_energy_pj": 7864.32,
          "bandwidth_bytes_per_ns": 2048.0,
          "effective_bandwidth_bytes_per_ns": 1256.1066666666668,
          "transfer_time_ns": 192.0,
          "contention_adjusted_transfer_time_ns": 313.0434782608695,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 319.3043478260869,
          "traffic_share": 0.5,
          "movement_energy_share": 0.04938271604938272,
          "system_energy_share": 0.0251994960100798,
          "nominal_transfer_share": 0.6666666666666666,
          "contention_adjusted_transfer_share": 0.6666666666666665,
          "nominal_transfer_pressure_ratio": 24.0,
          "contention_adjusted_transfer_pressure_ratio": 39.91304347826086,
          "compute_window_required_bandwidth_bytes_per_ns": 49152.0,
          "contention_bandwidth_utilization": 39.13043478260869,
          "contention_bandwidth_headroom_bytes_per_ns": -47895.89333333333,
          "contention_bandwidth_headroom_ratio": 0.025555555555555557
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 196608.0,
          "write_bytes": 98304.0,
          "total_bytes": 294912.0,
          "read_energy_pj": 15728.64,
          "write_energy_pj": 7864.32,
          "total_energy_pj": 23592.96,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 628.0533333333334,
          "transfer_time_ns": 288.0,
          "contention_adjusted_transfer_time_ns": 469.5652173913043,
          "read_fraction": 0.75,
          "write_fraction": 0.75,
          "calibration_adjusted_transfer_time_ns": 478.95652173913044,
          "traffic_share": 0.375,
          "movement_energy_share": 0.14814814814814817,
          "system_energy_share": 0.0755984880302394,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 36.0,
          "contention_adjusted_transfer_pressure_ratio": 59.869565217391305,
          "compute_window_required_bandwidth_bytes_per_ns": 36864.0,
          "contention_bandwidth_utilization": 58.69565217391304,
          "contention_bandwidth_headroom_bytes_per_ns": -36235.94666666666,
          "contention_bandwidth_headroom_ratio": 0.017037037037037038
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 65536.0,
          "write_bytes": 32768.0,
          "total_bytes": 98304.0,
          "read_energy_pj": 78643.2,
          "write_energy_pj": 49152.0,
          "total_energy_pj": 127795.2,
          "bandwidth_bytes_per_ns": 768.0,
          "effective_bandwidth_bytes_per_ns": 471.04,
          "transfer_time_ns": 128.0,
          "contention_adjusted_transfer_time_ns": 208.69565217391303,
          "read_fraction": 0.25,
          "write_fraction": 0.25,
          "calibration_adjusted_transfer_time_ns": 212.86956521739128,
          "traffic_share": 0.125,
          "movement_energy_share": 0.8024691358024693,
          "system_energy_share": 0.40949181016379677,
          "nominal_transfer_share": 0.4444444444444444,
          "contention_adjusted_transfer_share": 0.4444444444444444,
          "nominal_transfer_pressure_ratio": 16.0,
          "contention_adjusted_transfer_pressure_ratio": 26.60869565217391,
          "compute_window_required_bandwidth_bytes_per_ns": 12288.0,
          "contention_bandwidth_utilization": 26.08695652173913,
          "contention_bandwidth_headroom_bytes_per_ns": -11816.96,
          "contention_bandwidth_headroom_ratio": 0.03833333333333334
        }
      },
      "local_compute_and_conversion_energy_pj": 152829.952,
      "total_movement_energy_pj": 159252.47999999998,
      "total_system_energy_pj": 312082.432,
      "system_energy_per_mac_pj": 0.0186015625,
      "system_energy_per_op_pj": 0.00930078125,
      "hierarchy_energy_breakdown": {
        "local_compute_and_conversion": {
          "energy_pj": 152829.952,
          "share": 0.4897102057958841
        },
        "sram": {
          "energy_pj": 7864.32,
          "share": 0.0251994960100798
        },
        "intermediate": {
          "energy_pj": 23592.96,
          "share": 0.0755984880302394
        },
        "off_chip": {
          "energy_pj": 127795.2,
          "share": 0.40949181016379677
        },
        "movement_total": {
          "energy_pj": 159252.47999999998,
          "share": 0.5102897942041159
        },
        "total_system_energy_pj": 312082.432,
        "dominant_component": "local_compute_and_conversion",
        "note": "Hierarchy energy is a local decomposition of compute/conversion energy plus modeled movement energy by tier; it is not a published hardware energy breakdown."
      },
      "local_compute_and_conversion_energy_share": 0.4897102057958841,
      "movement_energy_share": 0.5102897942041159,
      "movement_to_compute_energy_ratio": 1.0420240137221268,
      "total_hierarchy_bytes": 786432.0,
      "hierarchy_equivalent_ops_per_byte": 42.666666666666664,
      "movement_energy_per_hierarchy_byte_pj": 0.20249999999999999,
      "sram_traffic_share": 0.5,
      "intermediate_traffic_share": 0.375,
      "off_chip_traffic_share": 0.125,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "local_compute_and_conversion",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "intermediate",
      "contention_memory_bottleneck_tier": "intermediate",
      "max_tier_nominal_transfer_pressure_ratio": 36.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 59.869565217391305,
      "max_tier_movement_energy_share": 0.8024691358024693,
      "max_tier_system_energy_share": 0.40949181016379677,
      "contention_bandwidth_saturation_tier": "intermediate",
      "max_tier_contention_bandwidth_utilization": 58.69565217391304,
      "min_tier_contention_bandwidth_headroom_ratio": 0.017037037037037038,
      "max_transfer_time_ns": 288.0,
      "serial_transfer_time_ns": 608.0,
      "effective_transfer_time_ns": 288.0,
      "contention_bandwidth_derate_factor": 0.6133333333333334,
      "contention_adjusted_max_transfer_time_ns": 469.5652173913043,
      "contention_adjusted_serial_transfer_time_ns": 991.3043478260869,
      "contention_adjusted_effective_transfer_time_ns": 469.5652173913043,
      "calibration_adjusted_effective_transfer_time_ns": 478.95652173913044,
      "calibration_guardband_time_ns": 9.391304347826122,
      "contention_transfer_overhead_fraction": 0.6304347826086956,
      "total_transfer_overhead_fraction": 0.6630434782608696,
      "effective_loaded_bandwidth_bytes_per_ns": 2730.6666666666665,
      "contention_only_loaded_bandwidth_bytes_per_ns": 1674.808888888889,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 1641.9694989106754,
      "effective_usable_bandwidth_under_load_bytes_per_ns": 1674.808888888889,
      "guardbanded_usable_bandwidth_under_load_bytes_per_ns": 1641.9694989106754,
      "transfer_to_compute_time_ratio": 36.0,
      "bandwidth_limited_batch_latency_ns": 288.0,
      "bandwidth_pressure_ratio": 36.0,
      "bandwidth_limited_equivalent_ops_per_second": 116508444444444.42,
      "bandwidth_limited_tier": "intermediate",
      "contention_adjusted_batch_latency_ns": 478.95652173913044,
      "contention_adjusted_transfer_to_compute_time_ratio": 59.869565217391305,
      "contention_pressure_ratio": 59.869565217391305,
      "contention_adjusted_equivalent_ops_per_second": 70057365286855.47,
      "contention_limited_tier": "intermediate",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 8388.608,
      "laser_electrical_pj": 33554.432,
      "detector_pj": 1310.72,
      "adc_pj": 65536.0,
      "vector_dac_pj": 26214.4,
      "weight_dac_pj": 26214.4,
      "dac_pj": 52428.8,
      "total_pj": 152829.952,
      "energy_per_mac_pj": 0.009109375,
      "energy_per_op_pj": 0.0045546875,
      "peripheral_share": 0.7804459691252145
    },
    "timing": {
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 1.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 1.0,
      "batch_latency_ns": 8.0,
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
      "source_title": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
      "source_url": "https://arxiv.org/abs/2305.19533",
      "doi": "10.48550/arXiv.2305.19533",
      "venue": "HPCA 2024; arXiv:2305.19533",
      "claim_status": "paper-reported relative energy, latency, EDP, and architecture claims; dense transformer-matmul surrogate"
    },
    "reported": {
      "architecture": "Dynamically-operated photonic tensor core with optical inter-core broadcast",
      "additional_metrics": {
        "energy_reduction_vs_prior_photonic_accelerators_min_x": 2.6,
        "latency_reduction_vs_prior_photonic_accelerators_min_x": 12,
        "edp_reduction_vs_electronic_transformer_accelerators_orders_min": 2,
        "edp_reduction_vs_electronic_transformer_accelerators_orders_max": 3,
        "supports_dynamic_full_range_tensor_multiplication": true,
        "photonic_inter_core_broadcast": true,
        "implementation_available": "https://github.com/zhuhanqing/Lightening-Transformer",
        "surrogate_mapping": "m=128, k=128, n=128 with batch=8 stresses dynamic activation and optical-broadcast movement; it is not the paper's full transformer scheduler, DPTC microarchitecture, or model-accuracy evaluation."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
      "source_doi": "10.48550/arXiv.2305.19533",
      "reported_metrics": [
        "relative_energy_reduction",
        "relative_latency_reduction",
        "energy_delay_product",
        "transformer_architecture",
        "dynamic_tensor_core"
      ],
      "local_surrogate_type": "activation_heavy_dynamic_transformer_matmul_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "Source claims relative energy, latency, EDP, and architecture behavior; PhotonicBench localizes that to one dense activation-heavy matmul and optical_interconnect movement sensitivity."
      ],
      "note": "Source quality grades summarize evidence coverage for the published reference card. They do not upgrade local surrogate estimates into paper measurements."
    },
    "source_audit": {
      "quoted_metrics": [
        {
          "metric": "Energy reduction vs prior photonic accelerators",
          "quoted_value": ">2.6x",
          "source_location": "Abstract, arXiv:2305.19533 / HPCA 2024",
          "note": "Relative source claim; no absolute TOPS/W is entered."
        },
        {
          "metric": "Latency reduction vs prior photonic accelerators",
          "quoted_value": ">12x",
          "source_location": "Abstract, arXiv:2305.19533 / HPCA 2024",
          "note": "Relative source claim; local_model timing remains a PhotonicBench surrogate."
        },
        {
          "metric": "Energy-delay product vs electronic Transformer accelerators",
          "quoted_value": "2 to 3 orders of magnitude lower",
          "source_location": "Abstract, arXiv:2305.19533 / HPCA 2024"
        },
        {
          "metric": "Dynamic tensor behavior",
          "quoted_value": "DPTC supports dynamic and full-range matrix multiplication",
          "source_location": "Abstract, arXiv:2305.19533 / HPCA 2024"
        },
        {
          "metric": "Architecture",
          "quoted_value": "Dynamically-operated photonic tensor core with optical inter-core broadcast",
          "source_location": "published_calibration.architecture",
          "note": "Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics."
        },
        {
          "metric": "Energy reduction vs prior photonic accelerators min x",
          "quoted_value": "2.6",
          "source_location": "published_calibration.additional_metrics.energy_reduction_vs_prior_photonic_accelerators_min_x",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Latency reduction vs prior photonic accelerators min x",
          "quoted_value": "12",
          "source_location": "published_calibration.additional_metrics.latency_reduction_vs_prior_photonic_accelerators_min_x",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Edp reduction vs electronic transformer accelerators orders min",
          "quoted_value": "2",
          "source_location": "published_calibration.additional_metrics.edp_reduction_vs_electronic_transformer_accelerators_orders_min",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Edp reduction vs electronic transformer accelerators orders max",
          "quoted_value": "3",
          "source_location": "published_calibration.additional_metrics.edp_reduction_vs_electronic_transformer_accelerators_orders_max",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Supports dynamic full range tensor multiplication",
          "quoted_value": "True",
          "source_location": "published_calibration.additional_metrics.supports_dynamic_full_range_tensor_multiplication",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Photonic inter core broadcast",
          "quoted_value": "True",
          "source_location": "published_calibration.additional_metrics.photonic_inter_core_broadcast",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Implementation available",
          "quoted_value": "https://github.com/zhuhanqing/Lightening-Transformer",
          "source_location": "published_calibration.additional_metrics.implementation_available",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        },
        {
          "metric": "Surrogate mapping",
          "quoted_value": "m=128, k=128, n=128 with batch=8 stresses dynamic activation and optical-broadcast movement; it is not the paper's full transformer scheduler, DPTC microarchitecture, or model-accuracy evaluation.",
          "source_location": "published_calibration.additional_metrics.surrogate_mapping",
          "note": "Source-specific metric or surrogate boundary metadata provided by the card YAML."
        }
      ],
      "local_assumptions": [
        "Local 128x128 dense matmul and batch=8 are chosen to stress activation-heavy movement, not to reproduce a specific transformer layer.",
        "The optical_interconnect scenario is a local PhotonicBench sensitivity pack for broadcast-style movement.",
        "Local surrogate type: activation_heavy_dynamic_transformer_matmul_surrogate.",
        "Source claims relative energy, latency, EDP, and architecture behavior; PhotonicBench localizes that to one dense activation-heavy matmul and optical_interconnect movement sensitivity.",
        "Relative energy, latency, and EDP claims remain under published_calibration and published_reference.",
        "Local optical MAC energy, converter energy, one-nanosecond latency, and hierarchy movement are generic PhotonicBench assumptions.",
        "The non-weight-stationary local execution intentionally stresses dynamic operand movement and does not model the DPTC scheduler or attention/MLP tiling."
      ],
      "conversion_math": [],
      "confidence_flags": [
        "relative_metrics_only_no_absolute_tops_per_watt",
        "transformer_scheduler_not_reproduced",
        "claim_status=paper-reported relative energy, latency, EDP, and architecture claims; dense transformer-matmul surrogate",
        "source_doi=10.48550/arXiv.2305.19533",
        "source_quality_grade=B",
        "coverage.accuracy=reported",
        "coverage.area=not_reported",
        "coverage.energy=reported",
        "coverage.precision=not_reported",
        "coverage.throughput=reported"
      ],
      "separation_note": "Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs."
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
    "Relative energy, latency, and EDP claims remain under published_calibration and published_reference.",
    "Local optical MAC energy, converter energy, one-nanosecond latency, and hierarchy movement are generic PhotonicBench assumptions.",
    "The non-weight-stationary local execution intentionally stresses dynamic operand movement and does not model the DPTC scheduler or attention/MLP tiling.",
    "The benchmark models 8 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted every 1 operation(s).",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.",
    "Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims."
  ],
  "provenance": {
    "source_title": "Lightening-Transformer: A dynamically-operated optically-interconnected photonic Transformer accelerator",
    "source_url": "https://arxiv.org/abs/2305.19533",
    "doi": "10.48550/arXiv.2305.19533",
    "venue": "HPCA 2024; arXiv:2305.19533",
    "claim_status": "paper-reported relative energy, latency, EDP, and architecture claims; dense transformer-matmul surrogate"
  }
}
;
