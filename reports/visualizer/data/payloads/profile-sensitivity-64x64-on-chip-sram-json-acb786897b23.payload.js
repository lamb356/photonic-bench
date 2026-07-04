window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["profile_sensitivity_64x64_on_chip_sram.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "64x64 profile sensitivity - on-chip SRAM",
    "description": "Same 64x64 photonic matmul workload as the starter card, using the on_chip_sram system profile to isolate movement-tier sensitivity."
  },
  "workload": {
    "type": "matmul",
    "shape": {
      "m": 64,
      "k": 64,
      "n": 64
    },
    "macs": 262144,
    "equivalent_ops": 524288,
    "output_elements": 4096
  },
  "model_inputs": {
    "device": {
      "optical_mac_energy_fj": 0.5,
      "laser_wall_plug_efficiency": 0.25,
      "photodetector_energy_fj_per_sample": 10.0,
      "adc": {
        "bits": 6,
        "energy_pj_per_conversion": 0.5
      },
      "dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.2
      },
      "vector_dac": {
        "bits": 6,
        "energy_pj_per_conversion": 0.2
      },
      "weight_dac": {
        "bits": 6,
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
      "profile": "on_chip_sram",
      "profile_overrides": [],
      "memory_timing_mode": "overlapped",
      "sram": {
        "read_energy_pj_per_byte": 0.02,
        "write_energy_pj_per_byte": 0.02,
        "bandwidth_bytes_per_ns": 2048.0,
        "read_fraction": 1.0,
        "write_fraction": 1.0
      },
      "intermediate": {
        "read_energy_pj_per_byte": 0.2,
        "write_energy_pj_per_byte": 0.2,
        "bandwidth_bytes_per_ns": 256.0,
        "read_fraction": 0.0,
        "write_fraction": 0.0
      },
      "off_chip": {
        "read_energy_pj_per_byte": 10.0,
        "write_energy_pj_per_byte": 10.0,
        "bandwidth_bytes_per_ns": 16.0,
        "read_fraction": 0.0,
        "write_fraction": 0.0
      }
    },
    "timing": {
      "optical_latency_ns": 3.0,
      "adc_latency_ns": 1.0,
      "dac_latency_ns": 1.0
    },
    "noise": {
      "phase_noise_rad_rms": 0.02,
      "drift_rad_per_second": 0.1,
      "integration_time_ns": 3.0
    }
  },
  "local_model": {
    "conversion_counts": {
      "adc_conversions": 4096,
      "vector_dac_conversions": 4096,
      "weight_dac_conversions": 4096,
      "dac_conversions": 8192
    },
    "memory_traffic": {
      "vector_operand_read_bytes": 4096,
      "weight_operand_read_bytes": 4096,
      "output_write_bytes": 4096,
      "total_interface_bytes": 12288,
      "macs_per_byte": 21.333333333333332,
      "equivalent_ops_per_byte": 42.666666666666664,
      "note": "Interface traffic is derived from DAC/ADC bit widths and reuse counts. It is not a full memory hierarchy simulation."
    },
    "system": {
      "profile": "on_chip_sram",
      "profile_overrides": [],
      "memory_timing_mode": "overlapped",
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 163.84,
          "write_energy_pj": 81.92,
          "total_energy_pj": 245.76,
          "bandwidth_bytes_per_ns": 2048.0,
          "transfer_time_ns": 6.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "intermediate": {
          "name": "intermediate",
          "read_bytes": 0.0,
          "write_bytes": 0.0,
          "total_bytes": 0.0,
          "read_energy_pj": 0.0,
          "write_energy_pj": 0.0,
          "total_energy_pj": 0.0,
          "bandwidth_bytes_per_ns": 256.0,
          "transfer_time_ns": 0.0,
          "read_fraction": 0.0,
          "write_fraction": 0.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 0.0,
          "write_bytes": 0.0,
          "total_bytes": 0.0,
          "read_energy_pj": 0.0,
          "write_energy_pj": 0.0,
          "total_energy_pj": 0.0,
          "bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 0.0,
          "read_fraction": 0.0,
          "write_fraction": 0.0
        }
      },
      "local_compute_and_conversion_energy_pj": 4251.648,
      "total_movement_energy_pj": 245.76,
      "total_system_energy_pj": 4497.408,
      "system_energy_per_mac_pj": 0.01715625,
      "system_energy_per_op_pj": 0.008578125,
      "movement_energy_share": 0.05464480874316939,
      "max_transfer_time_ns": 6.0,
      "serial_transfer_time_ns": 6.0,
      "effective_transfer_time_ns": 6.0,
      "bandwidth_limited_batch_latency_ns": 6.0,
      "bandwidth_limited_equivalent_ops_per_second": 87381333333333.33,
      "bandwidth_limited_tier": "sram",
      "note": "System movement energy is a local estimate over explicit SRAM, intermediate, and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
    },
    "energy": {
      "optical_compute_pj": 131.072,
      "laser_electrical_pj": 524.288,
      "detector_pj": 40.96,
      "adc_pj": 2048.0,
      "vector_dac_pj": 819.2,
      "weight_dac_pj": 819.2,
      "dac_pj": 1638.4,
      "total_pj": 4251.648,
      "energy_per_mac_pj": 0.01621875,
      "energy_per_op_pj": 0.008109375,
      "peripheral_share": 0.8766859344894027
    },
    "timing": {
      "optical_latency_ns": 3.0,
      "adc_latency_ns": 1.0,
      "dac_latency_ns": 1.0,
      "total_latency_ns": 5.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 5.0,
      "batch_latency_ns": 5.0,
      "steady_state_operations_per_second": 200000000.0,
      "steady_state_equivalent_ops_per_second": 104857600000000.0
    },
    "noise": {
      "quantization_snr_db": 37.879999999999995,
      "quantization_rms": 0.004582144993568459,
      "phase_noise_rad_rms": 0.02,
      "drift_rms_rad": 3.0000000000000005e-10,
      "estimated_relative_error_rms": 0.02051818833966792
    }
  },
  "published_reference": null,
  "calibration_fit": null,
  "assumptions": [
    "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
    "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
    "ADC conversions are counted once per output element.",
    "DAC conversions are counted once per input value for the left and right matmul operands.",
    "Detector energy is counted once per output sample.",
    "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
    "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
    "Profile sensitivity card; component, timing, and noise assumptions match the starter 64x64 card.",
    "The on_chip_sram profile is a local modeling preset, not a measured hardware configuration.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted every 1 operation(s).",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": null
}
;
