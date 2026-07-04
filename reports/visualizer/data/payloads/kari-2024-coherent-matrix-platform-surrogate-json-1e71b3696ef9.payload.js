window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["kari_2024_coherent_matrix_platform_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Kari 2024 coherent matrix operations platform surrogate",
    "description": "Source-backed card for the Optica 2024 integrated coherent photonic platform for scalable matrix operations. The local workload is a small dense dot-product tile surrogate, not a full temporal-multiplexed coherent receiver model."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 4,
      "k": 4,
      "n": 4
    },
    "macs": 64,
    "equivalent_ops": 128,
    "output_elements": 16
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
      "adc_conversions": 16,
      "vector_dac_conversions": 16,
      "weight_dac_conversions": 16,
      "dac_conversions": 32
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 16,
      "weight_operand_read_bytes": 16,
      "output_write_bytes": 16,
      "total_interface_bytes": 48,
      "macs_per_byte": 1.3333333333333333,
      "equivalent_ops_per_byte": 2.6666666666666665,
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
          "read_bytes": 32.0,
          "write_bytes": 16.0,
          "total_bytes": 48.0,
          "read_energy_pj": 0.64,
          "write_energy_pj": 0.32,
          "total_energy_pj": 0.96,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.046875,
          "contention_adjusted_transfer_time_ns": 0.046875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.046875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.0019569471624266144,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.046875,
          "contention_adjusted_transfer_pressure_ratio": 0.046875
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 32.0,
          "write_bytes": 16.0,
          "total_bytes": 48.0,
          "read_energy_pj": 6.4,
          "write_energy_pj": 3.2,
          "total_energy_pj": 9.600000000000001,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.1875,
          "contention_adjusted_transfer_time_ns": 0.1875,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.1875,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.1875,
          "contention_adjusted_transfer_pressure_ratio": 0.1875
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 32.0,
          "write_bytes": 16.0,
          "total_bytes": 48.0,
          "read_energy_pj": 320.0,
          "write_energy_pj": 160.0,
          "total_energy_pj": 480.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 3.0,
          "contention_adjusted_transfer_time_ns": 3.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 3.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 3.0,
          "contention_adjusted_transfer_pressure_ratio": 3.0
        }
      },
      "local_compute_and_conversion_energy_pj": 14.688,
      "total_movement_energy_pj": 490.56,
      "total_system_energy_pj": 505.248,
      "system_energy_per_mac_pj": 7.8945,
      "system_energy_per_op_pj": 3.94725,
      "movement_energy_share": 0.9709291278738362,
      "total_hierarchy_bytes": 144.0,
      "hierarchy_equivalent_ops_per_byte": 0.8888888888888888,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 3.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 3.0,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_transfer_time_ns": 3.0,
      "serial_transfer_time_ns": 3.234375,
      "effective_transfer_time_ns": 3.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 3.0,
      "contention_adjusted_serial_transfer_time_ns": 3.234375,
      "contention_adjusted_effective_transfer_time_ns": 3.0,
      "calibration_adjusted_effective_transfer_time_ns": 3.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 3.0,
      "bandwidth_limited_batch_latency_ns": 3.0,
      "bandwidth_pressure_ratio": 3.0,
      "bandwidth_limited_equivalent_ops_per_second": 42666666666.666664,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 3.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 3.0,
      "contention_pressure_ratio": 3.0,
      "contention_adjusted_equivalent_ops_per_second": 42666666666.666664,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.032,
      "laser_electrical_pj": 0.128,
      "detector_pj": 0.16,
      "adc_pj": 8.0,
      "vector_dac_pj": 3.2,
      "weight_dac_pj": 3.2,
      "dac_pj": 6.4,
      "total_pj": 14.688,
      "energy_per_mac_pj": 0.2295,
      "energy_per_op_pj": 0.11475,
      "peripheral_share": 0.9912854030501089
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
      "steady_state_equivalent_ops_per_second": 128000000000.0
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
      "source_title": "Realization of an integrated coherent photonic platform for scalable matrix operations",
      "source_url": "https://opg.optica.org/optica/fulltext.cfm?uri=optica-11-4-542",
      "doi": "10.1364/OPTICA.507525",
      "venue": "Optica 11, 542-551 (2024)",
      "claim_status": "paper-reported coherent dot-product and scalable matrix-operation platform; small dense-tile local surrogate"
    },
    "reported": {
      "architecture": "Integrated coherent temporally multiplexed dot-product unit cell",
      "additional_metrics": {
        "operation_types": "real_mac,complex_mac,covariance",
        "scalable_target": "general_matrix_matrix_operations",
        "source_demonstrates_temporal_multiplexing": true,
        "surrogate_mapping": "m=4, k=4, n=4 is a compact dense tile used only to exercise PhotonicBench local accounting for a coherent matrix-operation platform."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Realization of an integrated coherent photonic platform for scalable matrix operations",
      "source_doi": "10.1364/OPTICA.507525",
      "reported_metrics": [
        "operation_type",
        "architecture",
        "scalability_path"
      ],
      "local_surrogate_type": "coherent_dot_product_tile_surrogate",
      "coverage": {
        "throughput": "not_reported",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source directly demonstrates coherent multiply-accumulate and matrix-operation primitives, but does not provide a scalar TOPS or TOPS/W card metric."
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
    "Source-reported operation classes and scalable matrix-operation framing are preserved in published_reference.",
    "Local one-nanosecond timing, optical MAC energy, converter energy, and system movement values are PhotonicBench assumptions.",
    "The dense 4x4 tile is a bookkeeping surrogate rather than a temporal waveform or coherent detection simulation.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Realization of an integrated coherent photonic platform for scalable matrix operations",
    "source_url": "https://opg.optica.org/optica/fulltext.cfm?uri=optica-11-4-542",
    "doi": "10.1364/OPTICA.507525",
    "venue": "Optica 11, 542-551 (2024)",
    "claim_status": "paper-reported coherent dot-product and scalable matrix-operation platform; small dense-tile local surrogate"
  }
}
;
