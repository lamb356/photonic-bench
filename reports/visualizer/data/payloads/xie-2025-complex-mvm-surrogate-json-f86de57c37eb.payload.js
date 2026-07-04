window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["xie_2025_complex_mvm_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Xie 2025 complex coherent MVM surrogate",
    "description": "Source-backed card for the Science Advances 2025 scalable coherent photonic processor. The paper demonstrates a 16-channel complex-valued matrix-vector multiplication processor at 1.28 TOPS; this config uses a 1x16 by 16x16 dense local MVM surrogate only."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 1,
      "k": 16,
      "n": 16
    },
    "macs": 256,
    "equivalent_ops": 512,
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
      "weight_dac_conversions": 256,
      "dac_conversions": 272
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 16,
      "weight_operand_read_bytes": 256,
      "output_write_bytes": 16,
      "total_interface_bytes": 288,
      "macs_per_byte": 0.8888888888888888,
      "equivalent_ops_per_byte": 1.7777777777777777,
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
          "read_bytes": 272.0,
          "write_bytes": 16.0,
          "total_bytes": 288.0,
          "read_energy_pj": 5.44,
          "write_energy_pj": 0.32,
          "total_energy_pj": 5.760000000000001,
          "bandwidth_bytes_per_ns": 1024.0,
          "effective_bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 0.28125,
          "contention_adjusted_transfer_time_ns": 0.28125,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 0.28125,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.001956947162426615,
          "system_energy_share": 0.001915892326851231,
          "nominal_transfer_share": 0.015625,
          "contention_adjusted_transfer_share": 0.015625,
          "nominal_transfer_pressure_ratio": 0.28125,
          "contention_adjusted_transfer_pressure_ratio": 0.28125,
          "compute_window_required_bandwidth_bytes_per_ns": 288.0,
          "contention_bandwidth_utilization": 0.28125,
          "contention_bandwidth_headroom_bytes_per_ns": 736.0,
          "contention_bandwidth_headroom_ratio": 3.5555555555555554
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 272.0,
          "write_bytes": 16.0,
          "total_bytes": 288.0,
          "read_energy_pj": 54.400000000000006,
          "write_energy_pj": 3.2,
          "total_energy_pj": 57.60000000000001,
          "bandwidth_bytes_per_ns": 256.0,
          "effective_bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 1.125,
          "contention_adjusted_transfer_time_ns": 1.125,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 1.125,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.019569471624266147,
          "system_energy_share": 0.01915892326851231,
          "nominal_transfer_share": 0.0625,
          "contention_adjusted_transfer_share": 0.0625,
          "nominal_transfer_pressure_ratio": 1.125,
          "contention_adjusted_transfer_pressure_ratio": 1.125,
          "compute_window_required_bandwidth_bytes_per_ns": 288.0,
          "contention_bandwidth_utilization": 1.125,
          "contention_bandwidth_headroom_bytes_per_ns": -32.0,
          "contention_bandwidth_headroom_ratio": 0.8888888888888888
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 272.0,
          "write_bytes": 16.0,
          "total_bytes": 288.0,
          "read_energy_pj": 2720.0,
          "write_energy_pj": 160.0,
          "total_energy_pj": 2880.0,
          "bandwidth_bytes_per_ns": 16.0,
          "effective_bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 18.0,
          "contention_adjusted_transfer_time_ns": 18.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0,
          "calibration_adjusted_transfer_time_ns": 18.0,
          "traffic_share": 0.3333333333333333,
          "movement_energy_share": 0.9784735812133072,
          "system_energy_share": 0.9579461634256154,
          "nominal_transfer_share": 1.0,
          "contention_adjusted_transfer_share": 1.0,
          "nominal_transfer_pressure_ratio": 18.0,
          "contention_adjusted_transfer_pressure_ratio": 18.0,
          "compute_window_required_bandwidth_bytes_per_ns": 288.0,
          "contention_bandwidth_utilization": 18.0,
          "contention_bandwidth_headroom_bytes_per_ns": -272.0,
          "contention_bandwidth_headroom_ratio": 0.05555555555555555
        }
      },
      "local_compute_and_conversion_energy_pj": 63.072,
      "total_movement_energy_pj": 2943.36,
      "total_system_energy_pj": 3006.4320000000002,
      "system_energy_per_mac_pj": 11.743875000000001,
      "system_energy_per_op_pj": 5.8719375000000005,
      "local_compute_and_conversion_energy_share": 0.02097902097902098,
      "movement_energy_share": 0.979020979020979,
      "movement_to_compute_energy_ratio": 46.666666666666664,
      "total_hierarchy_bytes": 864.0,
      "hierarchy_equivalent_ops_per_byte": 0.5925925925925926,
      "movement_energy_per_hierarchy_byte_pj": 3.4066666666666667,
      "sram_traffic_share": 0.3333333333333333,
      "intermediate_traffic_share": 0.3333333333333333,
      "off_chip_traffic_share": 0.3333333333333333,
      "dominant_traffic_tier": "sram",
      "dominant_system_energy_component": "off_chip",
      "dominant_movement_energy_tier": "off_chip",
      "nominal_memory_bottleneck_tier": "off_chip",
      "contention_memory_bottleneck_tier": "off_chip",
      "max_tier_nominal_transfer_pressure_ratio": 18.0,
      "max_tier_contention_adjusted_transfer_pressure_ratio": 18.0,
      "max_tier_movement_energy_share": 0.9784735812133072,
      "max_tier_system_energy_share": 0.9579461634256154,
      "contention_bandwidth_saturation_tier": "off_chip",
      "max_tier_contention_bandwidth_utilization": 18.0,
      "min_tier_contention_bandwidth_headroom_ratio": 0.05555555555555555,
      "max_transfer_time_ns": 18.0,
      "serial_transfer_time_ns": 19.40625,
      "effective_transfer_time_ns": 18.0,
      "contention_bandwidth_derate_factor": 1.0,
      "contention_adjusted_max_transfer_time_ns": 18.0,
      "contention_adjusted_serial_transfer_time_ns": 19.40625,
      "contention_adjusted_effective_transfer_time_ns": 18.0,
      "calibration_adjusted_effective_transfer_time_ns": 18.0,
      "calibration_guardband_time_ns": 0.0,
      "contention_transfer_overhead_fraction": 0.0,
      "total_transfer_overhead_fraction": 0.0,
      "effective_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_only_loaded_bandwidth_bytes_per_ns": 48.0,
      "contention_adjusted_loaded_bandwidth_bytes_per_ns": 48.0,
      "transfer_to_compute_time_ratio": 18.0,
      "bandwidth_limited_batch_latency_ns": 18.0,
      "bandwidth_pressure_ratio": 18.0,
      "bandwidth_limited_equivalent_ops_per_second": 28444444444.44444,
      "bandwidth_limited_tier": "off_chip",
      "contention_adjusted_batch_latency_ns": 18.0,
      "contention_adjusted_transfer_to_compute_time_ratio": 18.0,
      "contention_pressure_ratio": 18.0,
      "contention_adjusted_equivalent_ops_per_second": 28444444444.44444,
      "contention_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. Contention and calibration guardband fields are local shared-link assumptions. These values are added separately from photonic core compute/conversion energy and are not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 0.128,
      "laser_electrical_pj": 0.512,
      "detector_pj": 0.16,
      "adc_pj": 8.0,
      "vector_dac_pj": 3.2,
      "weight_dac_pj": 51.2,
      "dac_pj": 54.400000000000006,
      "total_pj": 63.072,
      "energy_per_mac_pj": 0.246375,
      "energy_per_op_pj": 0.1231875,
      "peripheral_share": 0.9918822932521563
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
      "steady_state_equivalent_ops_per_second": 512000000000.0
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
      "source_title": "Complex-valued matrix-vector multiplication using a scalable coherent photonic processor",
      "source_url": "https://www.science.org/doi/10.1126/sciadv.ads7475",
      "doi": "10.1126/sciadv.ads7475",
      "venue": "Science Advances 11, eads7475 (2025)",
      "claim_status": "paper-reported complex-valued MVM throughput and demonstrations; MVM-surrogate local model"
    },
    "reported": {
      "architecture": "16-channel programmable on-chip coherent photonic matrix-vector multiplication processor",
      "reported_tops": 1.28,
      "additional_metrics": {
        "programmable_channels": 16,
        "complex_valued_processing": true,
        "demonstrated_functions": "arbitrary matrix transformation, parallel image processing, handwritten digital recognition",
        "uses_low_phase_error_mzi_mesh": true,
        "uses_ultralow_loss_waveguide_delay_lines": true,
        "surrogate_mapping": "m=1, k=16, n=16 is a dense real-valued local MVM tile for a complex-valued 16-channel coherent processor; it does not reproduce phase encoding or coherent detection."
      }
    },
    "derived_unit_conversions": {},
    "source_quality": {
      "source_reference": "Complex-valued matrix-vector multiplication using a scalable coherent photonic processor",
      "source_doi": "10.1126/sciadv.ads7475",
      "reported_metrics": [
        "throughput",
        "architecture",
        "complex_valued_operation",
        "application_demonstrations"
      ],
      "local_surrogate_type": "dense_complex_coherent_mvm_surrogate",
      "coverage": {
        "throughput": "reported",
        "energy": "not_reported",
        "accuracy": "reported",
        "area": "not_reported",
        "precision": "reported"
      },
      "confidence_grade": "B",
      "notes": [
        "The source reports a scalar 1.28 TOPS throughput and complex-valued programmable operation, but this card does not encode an energy-efficiency target."
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
    "Source-reported throughput and demonstration claims remain paper-derived metadata.",
    "Local dense real-valued matmul, converter energy, system tiers, and latency are PhotonicBench assumptions for comparison only.",
    "The card does not model complex amplitudes, phase shifter calibration, coherent receiver behavior, delay-line loss, or arbitrary-function programming.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted every 1 operation(s).",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.",
    "System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so."
  ],
  "provenance": {
    "source_title": "Complex-valued matrix-vector multiplication using a scalable coherent photonic processor",
    "source_url": "https://www.science.org/doi/10.1126/sciadv.ads7475",
    "doi": "10.1126/sciadv.ads7475",
    "venue": "Science Advances 11, eads7475 (2025)",
    "claim_status": "paper-reported complex-valued MVM throughput and demonstrations; MVM-surrogate local model"
  }
}
;
