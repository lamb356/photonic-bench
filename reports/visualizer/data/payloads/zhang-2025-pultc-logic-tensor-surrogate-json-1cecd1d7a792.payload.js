window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["zhang_2025_pultc_logic_tensor_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Zhang 2025 PULTC logic tensor surrogate",
    "description": "Source-backed card for the Optica 2025 photonic universal logic tensor core. The local workload is a compact dense tensor bookkeeping surrogate only, not a Boolean-logic or microring-nonlinearity model."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 4,
      "k": 4,
      "n": 10
    },
    "macs": 160,
    "equivalent_ops": 320,
    "output_elements": 40
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
      "adc_conversions": 40,
      "vector_dac_conversions": 16,
      "weight_dac_conversions": 40,
      "dac_conversions": 56
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 16,
      "weight_operand_read_bytes": 40,
      "output_write_bytes": 40,
      "total_interface_bytes": 96,
      "macs_per_byte": 1.6666666666666667,
      "equivalent_ops_per_byte": 3.3333333333333335,
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
          "read_bytes": 56.0,
          "write_bytes": 40.0,
          "total_bytes": 96.0,
          "read_energy_pj": 1.12,
          "write_energy_pj": 0.8,
          "total_energy_pj": 1.9200000000000002,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.09375,
          "contention_adjusted_transfer_time_ns": 0.09375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.09375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.09375,
          "contention_adjusted_transfer_pressure_ratio": 0.09375,
          "compute_window_required_bandwidth_bytes_per_ns": 96.0,
          "contention_bandwidth_utilization": 0.09375,
          "contention_bandwidth_headroom_bytes_per_ns": 928.0,
          "contention_bandwidth_headroom_ratio": 10.666666666666666
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 56.0,
          "write_bytes": 40.0,
          "total_bytes": 96.0,
          "read_energy_pj": 11.200000000000001,
          "write_energy_pj": 8.0,
          "total_energy_pj": 19.200000000000003,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.375,
          "contention_adjusted_transfer_time_ns": 0.375,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.375,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 0.375,
          "contention_adjusted_transfer_pressure_ratio": 0.375,
          "compute_window_required_bandwidth_bytes_per_ns": 96.0,
          "contention_bandwidth_utilization": 0.375,
          "contention_bandwidth_headroom_bytes_per_ns": 160.0,
          "contention_bandwidth_headroom_ratio": 2.6666666666666665
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 56.0,
          "write_bytes": 40.0,
          "total_bytes": 96.0,
          "read_energy_pj": 560.0,
          "write_energy_pj": 400.0,
          "total_energy_pj": 960.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 6.0,
          "contention_adjusted_transfer_time_ns": 6.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 6.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 6.0,
          "contention_adjusted_transfer_pressure_ratio": 6.0,
          "compute_window_required_bandwidth_bytes_per_ns": 96.0,
          "contention_bandwidth_utilization": 6.0,
          "contention_bandwidth_headroom_bytes_per_ns": -80.0,
          "contention_bandwidth_headroom_ratio": 0.16666666666666666
        }
      },
      "local_compute_and_conversion_energy_pj": 31.919999999999998,
      "total_movement_energy_pj": 981.12,
      "total_system_energy_pj": 1013.04,
      "system_energy_per_mac_pj": 6.3315,
      "system_energy_per_op_pj": 3.16575,
      "movement_energy_share": 0.9684908789386402,
      "total_hierarchy_bytes": 288.0,
      "hierarchy_equivalent_ops_per_byte": 1.1111111111111112,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 6.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 6.0,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 6.0,
      "min_tier_contention_bandwidth_headroom_ratio": 0.16666666666666666,
      "max_transfer_time_ns": 6.0,
      "serial_transfer_time_ns": 6.46875,
      "effective_transfer_time_ns": 6.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 6.0,
      "contention_adjusted_serial_transfer_time_ns": 6.46875,
      "contention_adjusted_effective_transfer_time_ns": 6.0,
      "calibration_adjusted_effective_transfer_time_ns": 6.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 6.0,
      "bandwidth_limited_batch_latency_ns": 6.0,
      "bandwidth_pressure_ratio": 6.0,
      "bandwidth_limited_equivalent_ops_per_second": 53333333333.33333,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 6.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 6.0,
      "contention_pressure_ratio": 6.0,
      "contention_adjusted_equivalent_ops_per_second": 53333333333.33333,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.08,
      "laser_electrical_pj": 0.32,
      "detector_pj": 0.4,
      "adc_pj": 20.0,
      "vector_dac_pj": 3.2,
      "weight_dac_pj": 8.0,
      "dac_pj": 11.2,
      "total_pj": 31.919999999999998,
      "energy_per_mac_pj": 0.19949999999999998,
      "energy_per_op_pj": 0.09974999999999999,
      "peripheral_share": 0.9899749373433584
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
      "steady_state_equivalent_ops_per_second": 320000000000.0
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
      "source_title": "Photonic logic tensor computing beyond Tbit/s per core",
      "source_url": "https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-8-1252",
      "doi": "10.1364/OPTICA.557867",
      "venue": "Optica 12, 1252-1260 (2025)",
      "claim_status": "paper-reported PULTC wavelength/spatial logic tensor metrics; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Photonic universal logic tensor core with microring nonlinear mapping and MZI mesh linear transform",
      "additional_metrics": {
        "wavelength_channels": 10,
        "spatial_channels": 4,
        "line_rate_gbps_per_channel": 50,
        "measured_mrm_eo_bandwidth_ghz": 53.73,
        "reported_logic_capacity_note": "beyond Tbit/s per core in the published title; supporting preprint reports beyond TOPS per core and optimized 40 TOPS.",
        "supporting_preprint_url": "https://arxiv.org/abs/2504.20331",
        "surrogate_mapping": "m=4, k=4, n=10 is a compact bookkeeping surrogate for four spatial channels and ten wavelengths; it is not a Boolean logic tensor simulator."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Photonic logic tensor computing beyond Tbit/s per core",
      "source_doi": "10.1364/OPTICA.557867",
      "reported_metrics": [
        "line_rate",
        "wavelength_channels",
        "spatial_channels",
        "modulation_bandwidth"
      ],
      "local_surrogate_type": "logic_tensor_dense_bookkeeping_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "not_reported",
        "accuracy": "not_applicable",
        "area": "not_reported",
        "precision": "not_applicable"
      },
      "confidence_grade": "C",
      "notes": [
        "This is a logic tensor processor, so the local dense matmul shape is only a comparison placeholder and must not be read as an exact operation mapping."
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
    "The local card preserves the paper's wavelength, spatial, and line-rate metadata without converting logic capacity into local matrix-multiply throughput.",
    "The dense tile is intentionally a low-confidence bookkeeping surrogate for visual comparison only.",
    "Local converter energy, system tiers, timing, and noise settings are generic PhotonicBench assumptions.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Photonic logic tensor computing beyond Tbit/s per core",
    "source_url": "https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-8-1252",
    "doi": "10.1364/OPTICA.557867",
    "venue": "Optica 12, 1252-1260 (2025)",
    "claim_status": "paper-reported PULTC wavelength/spatial logic tensor metrics; matmul-surrogate local model"
  }
}
;
