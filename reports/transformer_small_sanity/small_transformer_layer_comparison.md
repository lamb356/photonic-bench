# PhotonicBench Transformer Layer Comparison: Small transformer sanity layer

Rows are decomposed transformer matmul cards loaded from machine-readable JSON reports. Aggregate totals below are summed from those JSON cards and checked against the helper formulas.

## Transformer Shape

| Field | Value |
| --- | ---: |
| Layer type | encoder |
| Attention mode | dense |
| Batch size | 2 |
| Sequence length | 4 |
| Hidden size | 8 |
| Attention heads | 2 |
| Head dimension | 4 |
| MLP intermediate size | 16 |

## Formula Audit

| Operation | Formula | JSON MACs | JSON equivalent ops |
| --- | --- | ---: | ---: |
| QKV projection | `3 * B * S * H * H` | 1536 | 3072 |
| Attention scores | `B * heads * S * S * head_dim` | 256 | 512 |
| Attention-value | `B * heads * S * S * head_dim` | 256 | 512 |
| MLP up-projection | `B * S * H * intermediate` | 1024 | 2048 |
| MLP down-projection | `B * S * intermediate * H` | 1024 | 2048 |
| Aggregate layer total | sum of decomposed JSON cards | 4096 | 8192 |

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Small transformer sanity layer - QKV projection | n/a | none | 1536 | 3072 | 195.072 | 0.0635 | 7 | 7.68e+11 | n/a | n/a | n/a | none |
| Small transformer sanity layer - Attention scores | n/a | none | 256 | 512 | 69.632 | 0.136 | 11 | 6.4e+10 | n/a | n/a | n/a | none |
| Small transformer sanity layer - Attention-value | n/a | none | 256 | 512 | 69.632 | 0.136 | 11 | 6.4e+10 | n/a | n/a | n/a | none |
| Small transformer sanity layer - MLP up-projection | n/a | none | 1024 | 2048 | 132.608 | 0.06475 | 7 | 5.12e+11 | n/a | n/a | n/a | none |
| Small transformer sanity layer - MLP down-projection | n/a | none | 1024 | 2048 | 107.648 | 0.0525625 | 7 | 5.12e+11 | n/a | n/a | n/a | none |
