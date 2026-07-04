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

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | System total pJ | System pJ/op | System profile | Movement pJ | Movement share | Bandwidth-limited eq ops/s | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics | Source grade | Surrogate type | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GPT-style decoder layer - QKV projection | n/a | none | 1811939328 | 3623878656 | 5.71775e+06 | 0.0015778 | 5.49681e+07 | 0.0151683 | default | 4.92503e+07 | 0.89598 | 1.17965e+13 | 4915200 | 737.28 | 5 | 1.81194e+18 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - Attention scores | n/a | none | 805306368 | 1610612736 | 8.47616e+06 | 0.0052627 | 1.50317e+08 | 0.0933291 | default | 1.41841e+08 | 0.943611 | 1.82044e+12 | 14155776 | 113.778 | 27 | 6.71089e+16 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - Attention-value | n/a | none | 805306368 | 1610612736 | 3.87554e+06 | 0.00240625 | 1.45716e+08 | 0.0904727 | default | 1.41841e+08 | 0.973404 | 1.82044e+12 | 14155776 | 113.778 | 27 | 6.71089e+16 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - MLP up-projection | n/a | none | 2415919104 | 4831838208 | 7.59221e+06 | 0.00157129 | 7.06326e+07 | 0.0146182 | default | 6.30404e+07 | 0.892511 | 1.2288e+13 | 6291456 | 768 | 5 | 2.41592e+18 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder layer - MLP down-projection | n/a | none | 2415919104 | 4831838208 | 6.67209e+06 | 0.00138086 | 6.97125e+07 | 0.0144277 | default | 6.30404e+07 | 0.904291 | 1.2288e+13 | 6291456 | 768 | 5 | 2.41592e+18 | n/a | n/a | n/a | none | n/a | n/a | n/a |
