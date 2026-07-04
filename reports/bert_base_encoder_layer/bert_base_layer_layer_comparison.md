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
| MLP intermediate size | 3072 |

## Formula Audit

| Operation | Formula | JSON MACs | JSON equivalent ops |
| --- | --- | ---: | ---: |
| QKV projection | `3 * B * S * H * H` | 226492416 | 452984832 |
| Attention scores | `B * heads * S * S * head_dim` | 12582912 | 25165824 |
| Attention-value | `B * heads * S * S * head_dim` | 12582912 | 25165824 |
| MLP up-projection | `B * S * H * intermediate` | 301989888 | 603979776 |
| MLP down-projection | `B * S * intermediate * H` | 301989888 | 603979776 |
| Aggregate layer total | sum of decomposed JSON cards | 855638016 | 1711276032 |

| Benchmark | Source DOI | Calibration fit | MACs | Eq ops | Local total pJ | Local pJ/op | Batch latency ns | Steady eq ops/s | Published TOPS | Published TOPS/W incl lasers | Published pJ/op incl lasers | Published metrics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BERT-base style encoder layer - QKV projection | n/a | none | 226492416 | 452984832 | 1.41145e+06 | 0.00311589 | 5 | 2.26492e+17 | n/a | n/a | n/a | none |
| BERT-base style encoder layer - Attention scores | n/a | none | 12582912 | 25165824 | 181469 | 0.00721094 | 27 | 1.04858e+15 | n/a | n/a | n/a | none |
| BERT-base style encoder layer - Attention-value | n/a | none | 12582912 | 25165824 | 143131 | 0.0056875 | 27 | 1.04858e+15 | n/a | n/a | n/a | none |
| BERT-base style encoder layer - MLP up-projection | n/a | none | 301989888 | 603979776 | 1.878e+06 | 0.00310937 | 5 | 3.0199e+17 | n/a | n/a | n/a | none |
| BERT-base style encoder layer - MLP down-projection | n/a | none | 301989888 | 603979776 | 1.76298e+06 | 0.00291895 | 5 | 3.0199e+17 | n/a | n/a | n/a | none |
