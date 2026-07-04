# PhotonicBench Transformer Layer Comparison: GPT-style decoder KV-cache model - decoder_block

Rows are decomposed transformer matmul cards loaded from machine-readable JSON reports. Aggregate totals below are summed from those JSON cards and checked against the helper formulas.

## Transformer Shape

| Field | Value |
| --- | ---: |
| Layer type | decoder |
| Attention mode | dense |
| Batch size | 1 |
| Sequence length | 1 |
| Hidden size | 768 |
| Attention heads | 12 |
| Head dimension | 64 |
| Attention context length | 1025 |
| KV-cache enabled | True |
| MLP intermediate size | 3072 |

## Formula Audit

| Operation | Formula | JSON MACs | JSON equivalent ops |
| --- | --- | ---: | ---: |
| QKV projection | `3 * B * S * H * H` | 1769472 | 3538944 |
| Attention scores | `B * heads * S_query * S_context * head_dim` | 787200 | 1574400 |
| Attention-value | `B * heads * S_query * S_context * head_dim` | 787200 | 1574400 |
| MLP up-projection | `B * S * H * intermediate` | 2359296 | 4718592 |
| MLP down-projection | `B * S * intermediate * H` | 2359296 | 4718592 |
| Aggregate layer total | sum of decomposed JSON cards | 8062464 | 16124928 |

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | System total pJ | System pJ/op | System profile | Movement pJ | Movement share | Bandwidth-limited eq ops/s | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics | Source grade | Surrogate type | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GPT-style decoder KV-cache model - decoder_block - QKV projection | n/a | none | 1769472 | 3538944 | 801069 | 0.226358 | 1.8562e+07 | 5.24506 | default | 1.77609e+07 | 0.956844 | 3.19445e+10 | 1772544 | 1.99653 | 5 | 1.76947e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - Attention scores | n/a | none | 787200 | 1574400 | 362180 | 0.230043 | 8.38086e+06 | 5.32321 | default | 8.01869e+06 | 0.956785 | 3.14775e+10 | 800268 | 1.96734 | 27 | 6.56e+13 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - Attention-value | n/a | none | 787200 | 1574400 | 357682 | 0.227186 | 8.37637e+06 | 5.32036 | default | 8.01869e+06 | 0.957299 | 3.14775e+10 | 800268 | 1.96734 | 27 | 6.56e+13 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - MLP up-projection | n/a | none | 2359296 | 4718592 | 1.06806e+06 | 0.226352 | 2.47467e+07 | 5.24451 | default | 2.36786e+07 | 0.95684 | 3.1948e+10 | 2363136 | 1.99675 | 5 | 2.3593e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - MLP down-projection | n/a | none | 2359296 | 4718592 | 1.06716e+06 | 0.226161 | 2.47458e+07 | 5.24432 | default | 2.36786e+07 | 0.956875 | 3.1948e+10 | 2363136 | 1.99675 | 5 | 2.3593e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
