window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["feldmann_2021_photonic_tensor_core_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Feldmann 2021 photonic tensor core surrogate",
    "description": "Source-backed card for Feldmann et al. Nature 2021. The published reference is an integrated photonic tensor core for convolutional processing; this config uses a small dense matmul tile as a PhotonicBench surrogate and does not claim to reproduce the paper dataflow."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 1,
      "k": 64,
      "n": 16
    },
    "macs": 1024,
    "equivalent_ops": 2048,
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
        "cycle_time_ns": 0.071428571
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
      "optical_latency_ns": 0.071428571,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 0.071428571
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 16,
      "vector_dac_conversions": 64,
      "weight_dac_conversions": 1024,
      "dac_conversions": 1088
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 64,
      "weight_operand_read_bytes": 1024,
      "output_write_bytes": 16,
      "total_interface_bytes": 1104,
      "macs_per_byte": 0.927536231884058,
      "equivalent_ops_per_byte": 1.855072463768116,
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
          "read_bytes": 1088.0,
          "write_bytes": 16.0,
          "total_bytes": 1104.0,
          "read_energy_pj": 21.76,
          "write_energy_pj": 0.32,
          "total_energy_pj": 22.080000000000002,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 1.078125,
          "contention_adjusted_transfer_time_ns": 1.078125,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 1.078125,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "system_energy_share": 0.001918217225590686,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 15.093750090562501,
          "contention_adjusted_transfer_pressure_ratio": 15.093750090562501,
          "compute_window_required_bandwidth_bytes_per_ns": 15456.000092736002,
          "contention_bandwidth_utilization": 15.093750090562501,
          "contention_bandwidth_headroom_bytes_per_ns": -14432.000092736002,
          "contention_bandwidth_headroom_ratio": 0.0662525875942029
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 1088.0,
          "write_bytes": 16.0,
          "total_bytes": 1104.0,
          "read_energy_pj": 217.60000000000002,
          "write_energy_pj": 3.2,
          "total_energy_pj": 220.8,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 4.3125,
          "contention_adjusted_transfer_time_ns": 4.3125,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 4.3125,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.01918217225590686,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 60.375000362250006,
          "contention_adjusted_transfer_pressure_ratio": 60.375000362250006,
          "compute_window_required_bandwidth_bytes_per_ns": 15456.000092736002,
          "contention_bandwidth_utilization": 60.375000362250006,
          "contention_bandwidth_headroom_bytes_per_ns": -15200.000092736002,
          "contention_bandwidth_headroom_ratio": 0.016563146898550724
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 1088.0,
          "write_bytes": 16.0,
          "total_bytes": 1104.0,
          "read_energy_pj": 10880.0,
          "write_energy_pj": 160.0,
          "total_energy_pj": 11040.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 69.0,
          "contention_adjusted_transfer_time_ns": 69.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 69.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133073,
          "system_energy_share": 0.9591086127953429,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 966.0000057960001,
          "contention_adjusted_transfer_pressure_ratio": 966.0000057960001,
          "compute_window_required_bandwidth_bytes_per_ns": 15456.000092736002,
          "contention_bandwidth_utilization": 966.0000057960001,
          "contention_bandwidth_headroom_bytes_per_ns": -15440.000092736002,
          "contention_bandwidth_headroom_ratio": 0.0010351966811594203
        }
      },
      "local_compute_and_conversion_energy_pj": 227.80800000000002,
      "total_movement_energy_pj": 11282.88,
      "total_system_energy_pj": 11510.688,
      "system_energy_per_mac_pj": 11.24090625,
      "system_energy_per_op_pj": 5.620453125,
      "local_compute_and_conversion_energy_share": 0.019790997723159554,
      "movement_energy_share": 0.9802090022768404,
      "movement_to_compute_energy_ratio": 49.52802359882005,
      "total_hierarchy_bytes": 3312.0,
      "hierarchy_equivalent_ops_per_byte": 0.6183574879227053,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666663,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 966.0000057960001,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 966.0000057960001,
      "max_tier_movement_energy_share": 0.9784735812133073,
      "max_tier_system_energy_share": 0.9591086127953429,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 966.0000057960001,
      "min_tier_contention_bandwidth_headroom_ratio": 0.0010351966811594203,
      "max_transfer_time_ns": 69.0,
      "serial_transfer_time_ns": 74.390625,
      "effective_transfer_time_ns": 69.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 69.0,
      "contention_adjusted_serial_transfer_time_ns": 74.390625,
      "contention_adjusted_effective_transfer_time_ns": 69.0,
      "calibration_adjusted_effective_transfer_time_ns": 69.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 966.0000057960001,
      "bandwidth_limited_batch_latency_ns": 69.0,
      "bandwidth_pressure_ratio": 966.0000057960001,
      "bandwidth_limited_equivalent_ops_per_second": 29681159420.289852,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 69.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 966.0000057960001,
      "contention_pressure_ratio": 966.0000057960001,
      "contention_adjusted_equivalent_ops_per_second": 29681159420.289852,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.512,
      "laser_electrical_pj": 2.048,
      "detector_pj": 0.16,
      "adc_pj": 8.0,
      "vector_dac_pj": 12.8,
      "weight_dac_pj": 204.8,
      "dac_pj": 217.60000000000002,
      "total_pj": 227.80800000000002,
      "energy_per_mac_pj": 0.22246875000000002,
      "energy_per_op_pj": 0.11123437500000001,
      "peripheral_share": 0.9910099733108583
    },
    "timing": {
      "optical_latency_ns": 0.071428571,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 0.071428571,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 0.071428571,
      "batch_latency_ns": 0.071428571,
      "steady_state_operations_per_second": 14000000084.000002,
      "steady_state_equivalent_ops_per_second": 28672000172032.004
    },
    "noise": {
      "quantization_snr_db": 49.919999999999995,
      "quantization_rms": 0.0011320593513522075,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 7.1428571000000005e-12,
      "estimated_relative_error_rms": 0.020032013338029307
    }
  },
  "published_reference": {
    "source_type": "published_calibration",
    "provenance": {
      "source_title": "Parallel convolutional processing using an integrated photonic tensor core",
      "source_url": "https://www.nature.com/articles/s41586-020-03070-1",
      "doi": "10.1038/s41586-020-03070-1",
      "venue": "Nature 589, 52-58 (2021)",
      "claim_status": "paper-reported throughput/bandwidth; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Integrated photonic tensor core with PCM memory arrays and soliton microcombs",
      "reported_tops": 2.0,
      "additional_metrics": {
        "reported_macs_per_second": 1000000000000,
        "reported_bandwidth_ghz_min": 14,
        "reported_tops_note": "PhotonicBench converts the paper's 10^12 MAC/s statement to 2 TOPS using 2 equivalent ops per MAC.",
        "surrogate_mapping": "m=1, k=64, n=16 is a small dense tile surrogate; not an exact convolutional tensor-core dataflow reproduction."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Parallel convolutional processing using an integrated photonic tensor core",
      "source_doi": "10.1038/s41586-020-03070-1",
      "reported_metrics": [
        "throughput",
        "bandwidth",
        "architecture"
      ],
      "local_surrogate_type": "dense_convolution_tile_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "not_reported",
        "accuracy": "not_reported",
        "area": "not_reported",
        "precision": "not_reported"
      },
      "confidence_grade": "C",
      "notes": [
        "Source-backed throughput and bandwidth are useful, but energy, precision, area, and accuracy coverage are not encoded in this card."
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
    "Source reports tera-MAC/s operation and bandwidth exceeding 14 GHz; this config stores that as a published reference and uses a reciprocal 14 GHz local cycle only as an illustrative timing assumption.",
    "Local device energy, ADC, DAC, and noise settings are PhotonicBench assumptions, not extracted device-level measurements from the paper.",
    "Weight-stationary mode approximates the paper's in-memory weighting concept for one dense surrogate tile.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Parallel convolutional processing using an integrated photonic tensor core",
    "source_url": "https://www.nature.com/articles/s41586-020-03070-1",
    "doi": "10.1038/s41586-020-03070-1",
    "venue": "Nature 589, 52-58 (2021)",
    "claim_status": "paper-reported throughput/bandwidth; matmul-surrogate local model"
  }
}
;
