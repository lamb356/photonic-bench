# PhotonicBench Comparison

Rows are loaded from machine-readable JSON reports. Local model columns come from `local_model`; paper-derived columns come from `published_reference`.


| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 64x64 starter photonic matmul | n/a | none | 262144 | 524288 | 4251.65 | 0.00810938 | 12288 | 42.6667 | 5 | 1.04858e+14 | n/a | n/a | n/a | none |
| Nature PACE 64x64 matrix-vector calibration | 10.1038/s41586-025-08786-6 | none | 4096 | 8192 | 872.832 | 0.106547 | 4224 | 1.93939 | 5 | 1.6384e+12 | 8.19 | 2.38 | 0.420168 | none |
| Nature PACE 64x64 matrix-vector calibration | 10.1038/s41586-025-08786-6 | published-including-lasers -> device.dac.energy_pj_per_conversion=0.817593 pJ/conversion | 4096 | 8192 | 872.832 | 0.106547 | 4224 | 1.93939 | 5 | 1.6384e+12 | 8.19 | 2.38 | 0.420168 | none |
| Xu 2021 11 TOPS convolution accelerator surrogate | 10.1038/s41586-020-03063-0 | none | 2500000 | 5000000 | 555005 | 0.111001 | 2750010 | 1.81818 | 5 | 1e+15 | 11 | n/a | n/a | image_pixels=250000; kernels=10; input_resolution_bits=8; digit_recognition_accuracy_percent=88 |
| 64x64 weight-stationary batched photonic matmul | n/a | none | 4194304 | 8388608 | 51519.5 | 0.0061416 | 135168 | 62.0606 | 35 | 2.62144e+14 | n/a | n/a | n/a | none |
| Feldmann 2021 photonic tensor core surrogate | 10.1038/s41586-020-03070-1 | none | 1024 | 2048 | 227.808 | 0.111234 | 1104 | 1.85507 | 0.0714286 | 2.8672e+13 | 2 | n/a | n/a | reported_macs_per_second=1000000000000; reported_bandwidth_ghz_min=14 |
| Pappas 2025 AWGR 262 TOPS surrogate | 10.1063/5.0271374 | none | 4096 | 8192 | 241.152 | 0.0294375 | 768 | 10.6667 | 0.03125 | 2.62144e+14 | 262 | 3.663 | 0.273 | reported_energy_per_op_fj=273; data_rate_gbaud=32; awgr_dimension=16x16; mnist_accuracy_percent=92.14 |
| Taichi 2024 photonic chiplet surrogate | 10.1126/science.adl1203 | none | 262144 | 524288 | 4251.65 | 0.00810938 | 12288 | 42.6667 | 1 | 5.24288e+14 | n/a | 160 | 0.00625 | area_efficiency_tmacs_per_mm2=879; input_output_dimension=64x64; experimental_omniglot_accuracy_percent=91.89 |
