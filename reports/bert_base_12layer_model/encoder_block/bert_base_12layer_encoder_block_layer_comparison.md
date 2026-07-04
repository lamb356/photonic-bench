# PhotonicBench Transformer Layer Comparison: BERT-base style 12-layer encoder model - encoder_block

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

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | System total pJ | System pJ/op | Compute energy share | System profile | Memory timing | Effective transfer ns | Contention-only loaded BW B/ns | Loaded BW B/ns | Hierarchy eq ops/byte | Movement pJ/hierarchy byte | Dominant traffic tier | Dominant system energy | Dominant movement tier | Memory bottleneck tier | Worst tier pressure | Bandwidth saturation tier | Max bandwidth utilization | Min bandwidth headroom | Max tier system share | Derate factor | Off-chip traffic share | Total transfer overhead | Transfer/compute | Bandwidth pressure | Contention-adjusted latency ns | Contention transfer/compute | Contention pressure | Contention-adjusted eq ops/s | Movement pJ | Movement share | Movement/compute energy | Bandwidth-limited eq ops/s | Interface bytes | Eq ops/byte | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics | Source grade | Surrogate type | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BERT-base style 12-layer encoder model - encoder_block - QKV projection | n/a | none | 226492416 | 452984832 | 1.41145e+06 | 0.00311589 | 2.35141e+07 | 0.0519093 | 0.0600256 | default | overlapped | 135168 | 48 | 48 | 69.8182 | 3.40667 | sram | off_chip | off_chip | off_chip | 27033.6 | off_chip | 27033.6 | 3.6991e-05 | 0.91974 | 1 | 0.333333 | 0 | 27033.6 | 27033.6 | 135168 | 27033.6 | 27033.6 | 3.35127e+12 | 2.21027e+07 | 0.939974 | 15.6596 | 3.35127e+12 | 2162688 | 209.455 | 5 | 2.26492e+17 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style 12-layer encoder model - encoder_block - Attention scores | n/a | none | 12582912 | 25165824 | 181469 | 0.00721094 | 4.20014e+06 | 0.166898 | 0.0432055 | default | overlapped | 24576 | 48 | 48 | 21.3333 | 3.40667 | sram | off_chip | off_chip | off_chip | 910.222 | off_chip | 910.222 | 0.00109863 | 0.936198 | 1 | 0.333333 | 0 | 910.222 | 910.222 | 24576 | 910.222 | 910.222 | 1.024e+12 | 4.01867e+06 | 0.956794 | 22.1452 | 1.024e+12 | 393216 | 64 | 27 | 1.04858e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style 12-layer encoder model - encoder_block - Attention-value | n/a | none | 12582912 | 25165824 | 143131 | 0.0056875 | 4.1618e+06 | 0.165375 | 0.0343915 | default | overlapped | 24576 | 48 | 48 | 21.3333 | 3.40667 | sram | off_chip | off_chip | off_chip | 910.222 | off_chip | 910.222 | 0.00109863 | 0.944822 | 1 | 0.333333 | 0 | 910.222 | 910.222 | 24576 | 910.222 | 910.222 | 1.024e+12 | 4.01867e+06 | 0.965608 | 28.0769 | 1.024e+12 | 393216 | 64 | 27 | 1.04858e+15 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style 12-layer encoder model - encoder_block - MLP up-projection | n/a | none | 301989888 | 603979776 | 1.878e+06 | 0.00310937 | 3.10133e+07 | 0.0513483 | 0.0605546 | default | overlapped | 178176 | 48 | 48 | 70.6207 | 3.40667 | sram | off_chip | off_chip | off_chip | 35635.2 | off_chip | 35635.2 | 2.80621e-05 | 0.919223 | 1 | 0.333333 | 0 | 35635.2 | 35635.2 | 178176 | 35635.2 | 35635.2 | 3.38979e+12 | 2.91353e+07 | 0.939445 | 15.514 | 3.38979e+12 | 2850816 | 211.862 | 5 | 3.0199e+17 | n/a | n/a | n/a | none | n/a | n/a | n/a |
| BERT-base style 12-layer encoder model - encoder_block - MLP down-projection | n/a | none | 301989888 | 603979776 | 1.76298e+06 | 0.00291895 | 3.08983e+07 | 0.0511579 | 0.0570576 | default | overlapped | 178176 | 48 | 48 | 70.6207 | 3.40667 | sram | off_chip | off_chip | off_chip | 35635.2 | off_chip | 35635.2 | 2.80621e-05 | 0.922644 | 1 | 0.333333 | 0 | 35635.2 | 35635.2 | 178176 | 35635.2 | 35635.2 | 3.38979e+12 | 2.91353e+07 | 0.942942 | 16.5262 | 3.38979e+12 | 2850816 | 211.862 | 5 | 3.0199e+17 | n/a | n/a | n/a | none | n/a | n/a | n/a |
