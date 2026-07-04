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

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | System total pJ | System pJ/op | Compute energy share | System profile | Memory timing | Effective transfer ns | Contention-only loaded BW B/ns | Loaded BW B/ns | Hierarchy eq ops/byte | Movement pJ/hierarchy byte | Dominant traffic tier | Dominant system energy | Dominant movement tier | Memory bottleneck tier | Worst tier pressure | Bandwidth saturation tier | Max bandwidth utilization | Min bandwidth headroom | Max tier system share | Derate factor | Off-chip traffic share | Total transfer overhead | Transfer/compute | Bandwidth pressure | Contention-adjusted latency ns | Contention transfer/compute | Contention pressure | Contention-adjusted eq ops/s | Movement pJ | Movement share | Movement/compute energy | Bandwidth-limited eq ops/s | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics | Source grade | Surrogate type | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GPT-style decoder KV-cache model - decoder_block - QKV projection | n/a | none | 1769472 | 3538944 | 801069 | 0.226358 | 1.89165e+07 | 5.34523 | 0.0423477 | default | overlapped | 110784 | 48 | 48 | 0.665511 | 3.40667 | sram | off_chip | off_chip | off_chip | 22156.8 | off_chip | 22156.8 | 4.51329e-05 | 0.937037 | 1 | 0.333333 | 0 | 22156.8 | 22156.8 | 110784 | 22156.8 | 22156.8 | 3.19445e+10 | 1.81154e+07 | 0.957652 | 22.614 | 3.19445e+10 | 1772544 | 1.99653 | 5 | 1.76947e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - Attention scores | n/a | none | 787200 | 1574400 | 362180 | 0.230043 | 8.54092e+06 | 5.42487 | 0.0424052 | default | overlapped | 50016.8 | 48 | 48 | 0.65578 | 3.40667 | sram | off_chip | off_chip | off_chip | 1852.47 | off_chip | 1852.47 | 0.000539819 | 0.936981 | 1 | 0.333333 | 0 | 1852.47 | 1852.47 | 50016.8 | 1852.47 | 1852.47 | 3.14775e+10 | 8.17874e+06 | 0.957595 | 22.582 | 3.14775e+10 | 800268 | 1.96734 | 27 | 6.56e+13 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - Attention-value | n/a | none | 787200 | 1574400 | 357682 | 0.227186 | 8.53642e+06 | 5.42202 | 0.0419007 | default | overlapped | 50016.8 | 48 | 48 | 0.65578 | 3.40667 | sram | off_chip | off_chip | off_chip | 1852.47 | off_chip | 1852.47 | 0.000539819 | 0.937475 | 1 | 0.333333 | 0 | 1852.47 | 1852.47 | 50016.8 | 1852.47 | 1852.47 | 3.14775e+10 | 8.17874e+06 | 0.958099 | 22.8659 | 3.14775e+10 | 800268 | 1.96734 | 27 | 6.56e+13 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - MLP up-projection | n/a | none | 2359296 | 4718592 | 1.06806e+06 | 0.226352 | 2.52193e+07 | 5.34467 | 0.0423509 | default | overlapped | 147696 | 48 | 48 | 0.665583 | 3.40667 | sram | off_chip | off_chip | off_chip | 29539.2 | off_chip | 29539.2 | 3.38533e-05 | 0.937034 | 1 | 0.333333 | 0 | 29539.2 | 29539.2 | 147696 | 29539.2 | 29539.2 | 3.1948e+10 | 2.41512e+07 | 0.957649 | 22.6122 | 3.1948e+10 | 2363136 | 1.99675 | 5 | 2.3593e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| GPT-style decoder KV-cache model - decoder_block - MLP down-projection | n/a | none | 2359296 | 4718592 | 1.06716e+06 | 0.226161 | 2.52184e+07 | 5.34448 | 0.0423168 | default | overlapped | 147696 | 48 | 48 | 0.665583 | 3.40667 | sram | off_chip | off_chip | off_chip | 29539.2 | off_chip | 29539.2 | 3.38533e-05 | 0.937068 | 1 | 0.333333 | 0 | 29539.2 | 29539.2 | 147696 | 29539.2 | 29539.2 | 3.1948e+10 | 2.41512e+07 | 0.957683 | 22.6313 | 3.1948e+10 | 2363136 | 1.99675 | 5 | 2.3593e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
