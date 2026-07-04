# PhotonicBench Comparison

Rows are loaded from machine-readable JSON reports. Local model columns come from `local_model`; paper-derived columns come from `published_reference`.

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 64x64 starter photonic matmul | n/a | none | 262144 | 524288 | 4251.65 | 0.00810938 | 5 | 1.04858e+14 | n/a | n/a | n/a | none |
| Nature PACE 64x64 matrix-vector calibration | 10.1038/s41586-025-08786-6 | none | 4096 | 8192 | 872.832 | 0.106547 | 5 | 1.6384e+12 | 8.19 | 2.38 | 0.420168 | none |
| Nature PACE 64x64 matrix-vector calibration | 10.1038/s41586-025-08786-6 | published-including-lasers -> device.dac.energy_pj_per_conversion=0.817593 pJ/conversion | 4096 | 8192 | 872.832 | 0.106547 | 5 | 1.6384e+12 | 8.19 | 2.38 | 0.420168 | none |
| Xu 2021 11 TOPS convolution accelerator surrogate | 10.1038/s41586-020-03063-0 | none | 2500000 | 5000000 | 555005 | 0.111001 | 5 | 1e+15 | 11 | n/a | n/a | image_pixels=250000; kernels=10; input_resolution_bits=8; digit_recognition_accuracy_percent=88 |
| 64x64 weight-stationary batched photonic matmul | n/a | none | 4194304 | 8388608 | 51519.5 | 0.0061416 | 35 | 2.62144e+14 | n/a | n/a | n/a | none |
