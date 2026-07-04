window.PhotonicBenchPayloadRegistry = window.PhotonicBenchPayloadRegistry || {};
window.PhotonicBenchPayloadRegistry["taichi_2024_chiplet_surrogate.json"] = {
  "schema_version": "photonic-bench-report-v1",
  "benchmark": {
    "name": "Taichi 2024 photonic chiplet surrogate",
    "description": "Source-backed card for the Science 2024 Taichi photonic chiplet. The published reference is a diffractive-interference hybrid optical neural-network chiplet; this config uses a 64x64 dense local matmul surrogate because PhotonicBench does not model Taichi's distributed optical protocol."
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
      "sram": {
        "read_energy_pj_per_byte": 0.02,
        "write_energy_pj_per_byte": 0.02,
        "bandwidth_bytes_per_ns": 1024.0,
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
      "profile": "default",
      "profile_overrides": [],
      "tiers": {
        "sram": {
          "name": "sram",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 163.84,
          "write_energy_pj": 81.92,
          "total_energy_pj": 245.76,
          "bandwidth_bytes_per_ns": 1024.0,
          "transfer_time_ns": 12.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        },
        "off_chip": {
          "name": "off_chip",
          "read_bytes": 8192.0,
          "write_bytes": 4096.0,
          "total_bytes": 12288.0,
          "read_energy_pj": 81920.0,
          "write_energy_pj": 40960.0,
          "total_energy_pj": 122880.0,
          "bandwidth_bytes_per_ns": 16.0,
          "transfer_time_ns": 768.0,
          "read_fraction": 1.0,
          "write_fraction": 1.0
        }
      },
      "local_compute_and_conversion_energy_pj": 4251.648,
      "total_movement_energy_pj": 123125.76,
      "total_system_energy_pj": 127377.408,
      "system_energy_per_mac_pj": 0.48590625,
      "system_energy_per_op_pj": 0.242953125,
      "movement_energy_share": 0.9666216476943855,
      "max_transfer_time_ns": 768.0,
      "bandwidth_limited_batch_latency_ns": 768.0,
      "bandwidth_limited_equivalent_ops_per_second": 682666666666.6666,
      "bandwidth_limited_tier": "off_chip",
      "note": "System movement energy is a local estimate over explicit SRAM and off-chip tiers. It is added separately from photonic core compute/conversion energy and is not a published measurement."
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
      "optical_latency_ns": 1.0,
      "adc_latency_ns": 0.0,
      "dac_latency_ns": 0.0,
      "total_latency_ns": 1.0,
      "pipeline_stages": 1,
      "pipeline_cycle_time_ns": 1.0,
      "batch_latency_ns": 1.0,
      "steady_state_operations_per_second": 1000000000.0,
      "steady_state_equivalent_ops_per_second": 524288000000000.0
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
      "source_title": "Large-scale photonic chiplet Taichi empowers 160-TOPS/W artificial general intelligence",
      "source_url": "https://www.science.org/doi/10.1126/science.adl1203",
      "doi": "10.1126/science.adl1203",
      "venue": "Science 384, 202-209 (2024)",
      "claim_status": "paper-reported energy/scale targets; matmul-surrogate local model"
    },
    "reported": {
      "architecture": "Diffractive-interference hybrid photonic AI chiplet",
      "energy_efficiency_including_lasers_tops_per_watt": 160.0,
      "additional_metrics": {
        "input_output_dimension": "64x64",
        "area_efficiency_tmacs_per_mm2": 879,
        "optical_neurons_max": 10000000000,
        "experimental_omniglot_accuracy_percent": 91.89,
        "experimental_mini_imagenet_accuracy_percent": 87.74,
        "reported_energy_efficiency_note": "Source reports 160 TOPS/W on-chip energy efficiency.",
        "surrogate_mapping": "m=64, k=64, n=64 is a dense local surrogate for comparison only; not the Taichi distributed optical protocol."
      }
    },
    "derived_unit_conversions": {
      "energy_per_op_including_lasers_pj": 0.00625,
      "energy_per_mac_including_lasers_pj": 0.0125,
      "total_energy_including_lasers_pj": 3276.8,
      "model_to_published_including_lasers_ratio": 1.2974999999999999
    },
    "source_quality": {
      "source_reference": "Large-scale photonic chiplet Taichi empowers 160-TOPS/W artificial general intelligence",
      "source_doi": "10.1126/science.adl1203",
      "reported_metrics": [
        "energy_efficiency",
        "area_efficiency",
        "accuracy",
        "scale"
      ],
      "local_surrogate_type": "dense_photonic_chiplet_surrogate",
      "coverage": {
        "throughput": "derived",
        "energy": "reported",
        "accuracy": "reported",
        "area": "reported",
        "precision": "not_reported"
      },
      "confidence_grade": "B",
      "notes": [
        "Strong energy, area, scale, and task-metric coverage, but no exact dense-matmul local reproduction of the Taichi protocol is claimed."
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
    "Source reports 64x64 input/output chiplet dimensions and 160 TOPS/W energy efficiency; this card keeps those values as published references.",
    "Local timing, device energy, converter, and noise settings are PhotonicBench assumptions, not extracted Taichi device-level measurements.",
    "Weight-stationary mode is used only to avoid reloading the surrogate right operand within one dense local tile.",
    "The benchmark models 1 operation(s) per batch.",
    "Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.",
    "Weight DAC conversions are counted once per batch because weight_stationary is true.",
    "The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.",
    "Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.",
    "The multi-tier system model adds explicit SRAM and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements."
  ],
  "provenance": {
    "source_title": "Large-scale photonic chiplet Taichi empowers 160-TOPS/W artificial general intelligence",
    "source_url": "https://www.science.org/doi/10.1126/science.adl1203",
    "doi": "10.1126/science.adl1203",
    "venue": "Science 384, 202-209 (2024)",
    "claim_status": "paper-reported energy/scale targets; matmul-surrogate local model"
  }
}
;
