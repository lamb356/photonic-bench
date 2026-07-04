# PhotonicBench Transformer Layer Comparison: GPT-style decoder layer

Rows are decomposed transformer matmul cards loaded from machine-readable JSON reports. Aggregate totals below are summed from those JSON cards and checked against the helper formulas.

## Transformer Shape

| Field | Value |
| --- | ---: |
| Layer type | decoder |
| Attention mode | dense |
| Batch size | 1 |
| Sequence length | 1024 |
| Hidden size | 768 |
| Attention heads | 12 |
| Head dimension | 64 |
| Attention context length | 1024 |
| KV-cache enabled | False |
| MLP intermediate size | 3072 |

## Formula Audit

| Operation | Formula | JSON MACs | JSON equivalent ops |
| --- | --- | ---: | ---: |
| QKV projection | `3 * B * S * H * H` | 1811939328 | 3623878656 |
| Attention scores | `B * heads * S_query * S_context * head_dim` | 805306368 | 1610612736 |
| Attention-value | `B * heads * S_query * S_context * head_dim` | 805306368 | 1610612736 |
| MLP up-projection | `B * S * H * intermediate` | 2415919104 | 4831838208 |
| MLP down-projection | `B * S * intermediate * H` | 2415919104 | 4831838208 |
| Aggregate layer total | sum of decomposed JSON cards | 8254390272 | 16508780544 |

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | System total pJ | System pJ/op | System profile | Memory timing | Effective transfer ns | Loaded BW B/ns | Hierarchy eq ops/byte | Movement pJ/hierarchy byte | Derate factor | Off-chip traffic share | Total transfer overhead | Transfer/compute | Bandwidth pressure | Contention-adjusted latency ns | Contention transfer/compute | Contention pressure | Contention-adjusted eq ops/s | Movement pJ | Movement share | Bandwidth-limited eq ops/s | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics | Source grade | Surrogate type | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GPT-style decoder layer - QKV projection | n/a | none | 1811939328 | 3623878656 | 5.71775e+06 | 0.0015778 | 5.59511e+07 | 0.0154396 | default | overlapped | 307200 | 48 | 245.76 | 3.40667 | 1 | 0.333333 | 0 | 61440 | 61440 | 307200 | 61440 | 61440 | 1.17965e+13 | 5.02333e+07 | 0.897808 | 1.17965e+13 | 4915200 | 737.28 | 5 | 1.81194e+18 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - Attention scores | n/a | none | 805306368 | 1610612736 | 8.47616e+06 | 0.0052627 | 1.53148e+08 | 0.0950869 | default | overlapped | 884736 | 48 | 37.9259 | 3.40667 | 1 | 0.333333 | 0 | 32768 | 32768 | 884736 | 32768 | 32768 | 1.82044e+12 | 1.44672e+08 | 0.944654 | 1.82044e+12 | 14155776 | 113.778 | 27 | 6.71089e+16 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - Attention-value | n/a | none | 805306368 | 1610612736 | 3.87554e+06 | 0.00240625 | 1.48548e+08 | 0.0922305 | default | overlapped | 884736 | 48 | 37.9259 | 3.40667 | 1 | 0.333333 | 0 | 32768 | 32768 | 884736 | 32768 | 32768 | 1.82044e+12 | 1.44672e+08 | 0.97391 | 1.82044e+12 | 14155776 | 113.778 | 27 | 6.71089e+16 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - MLP up-projection | n/a | none | 2415919104 | 4831838208 | 7.59221e+06 | 0.00157129 | 7.18909e+07 | 0.0148786 | default | overlapped | 393216 | 48 | 256 | 3.40667 | 1 | 0.333333 | 0 | 78643.2 | 78643.2 | 393216 | 78643.2 | 78643.2 | 1.2288e+13 | 6.42987e+07 | 0.894393 | 1.2288e+13 | 6291456 | 768 | 5 | 2.41592e+18 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - MLP down-projection | n/a | none | 2415919104 | 4831838208 | 6.67209e+06 | 0.00138086 | 7.09708e+07 | 0.0146882 | default | overlapped | 393216 | 48 | 256 | 3.40667 | 1 | 0.333333 | 0 | 78643.2 | 78643.2 | 393216 | 78643.2 | 78643.2 | 1.2288e+13 | 6.42987e+07 | 0.905988 | 1.2288e+13 | 6291456 | 768 | 5 | 2.41592e+18 | n/a | n/a | n/a | none | n/a | n/a | n/a |
