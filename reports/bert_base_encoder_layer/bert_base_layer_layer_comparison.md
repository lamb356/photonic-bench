# PhotonicBench Transformer Layer Comparison: BERT-base style encoder layer

Rows are decomposed transformer matmul cards loaded from machine-readable JSON reports. Aggregate totals below are summed from those JSON cards and checked against the helper formulas.

## Transformer Shape

| Field | Value |
| --- | ---: |
| Layer type | encoder |
| Attention mode | dense |
| Batch size | 1 |
| Sequence length | 128 |
| Hidden size | 768 |
| Attention heads | 12 |
| Head dimension | 64 |
| Attention context length | 128 |
| KV-cache enabled | False |
| MLP intermediate size | 3072 |

## Formula Audit

| Operation | Formula | JSON MACs | JSON equivalent ops |
| --- | --- | ---: | ---: |
| QKV projection | `3 * B * S * H * H` | 226492416 | 452984832 |
| Attention scores | `B * heads * S_query * S_context * head_dim` | 12582912 | 25165824 |
| Attention-value | `B * heads * S_query * S_context * head_dim` | 12582912 | 25165824 |
| MLP up-projection | `B * S * H * intermediate` | 301989888 | 603979776 |
| MLP down-projection | `B * S * intermediate * H` | 301989888 | 603979776 |
| Aggregate layer total | sum of decomposed JSON cards | 855638016 | 1711276032 |

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | System total pJ | System pJ/op | System profile | Memory timing | Effective transfer ns | Loaded BW B/ns | Derate factor | Off-chip traffic share | Total transfer overhead | Bandwidth pressure | Contention-adjusted latency ns | Contention pressure | Contention-adjusted eq ops/s | Movement pJ | Movement share | Bandwidth-limited eq ops/s | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics | Source grade | Surrogate type | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BERT-base style encoder layer - QKV projection | n/a | none | 226492416 | 452984832 | 1.41145e+06 | 0.00311589 | 2.35141e+07 | 0.0519093 | default | overlapped | 135168 | 48 | 1 | 0.333333 | 0 | 27033.6 | 135168 | 27033.6 | 3.35127e+12 | 2.21027e+07 | 0.939974 | 3.35127e+12 | 2162688 | 209.455 | 5 | 2.26492e+17 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style encoder layer - Attention scores | n/a | none | 12582912 | 25165824 | 181469 | 0.00721094 | 4.20014e+06 | 0.166898 | default | overlapped | 24576 | 48 | 1 | 0.333333 | 0 | 910.222 | 24576 | 910.222 | 1.024e+12 | 4.01867e+06 | 0.956794 | 1.024e+12 | 393216 | 64 | 27 | 1.04858e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style encoder layer - Attention-value | n/a | none | 12582912 | 25165824 | 143131 | 0.0056875 | 4.1618e+06 | 0.165375 | default | overlapped | 24576 | 48 | 1 | 0.333333 | 0 | 910.222 | 24576 | 910.222 | 1.024e+12 | 4.01867e+06 | 0.965608 | 1.024e+12 | 393216 | 64 | 27 | 1.04858e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style encoder layer - MLP up-projection | n/a | none | 301989888 | 603979776 | 1.878e+06 | 0.00310937 | 3.10133e+07 | 0.0513483 | default | overlapped | 178176 | 48 | 1 | 0.333333 | 0 | 35635.2 | 178176 | 35635.2 | 3.38979e+12 | 2.91353e+07 | 0.939445 | 3.38979e+12 | 2850816 | 211.862 | 5 | 3.0199e+17 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style encoder layer - MLP down-projection | n/a | none | 301989888 | 603979776 | 1.76298e+06 | 0.00291895 | 3.08983e+07 | 0.0511579 | default | overlapped | 178176 | 48 | 1 | 0.333333 | 0 | 35635.2 | 178176 | 35635.2 | 3.38979e+12 | 2.91353e+07 | 0.942942 | 3.38979e+12 | 2850816 | 211.862 | 5 | 3.0199e+17 | n/a | n/a | n/a | none | n/a | n/a | n/a |
