# PhotonicBench Transformer Model Summary: BERT-base style 12-layer encoder model

Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card.

## Workload

| Metric | Value |
| --- | ---: |
| Layer specs | 1 |
| Total layer instances | 12 |
| Total MACs | 10267656192 |
| Total equivalent ops | 20535312384 |
| Total output elements | 12976128 |

## Local Model Totals

| Metric | Value |
| --- | ---: |
| Compute/conversion energy (pJ) | 6.45244e+07 |
| Movement energy (pJ) | 1.04017e+09 |
| Total system energy (pJ) | 1.10469e+09 |
| System energy per MAC (pJ) | 0.107589 |
| System energy per equivalent op (pJ) | 0.0537947 |
| Movement energy share | 0.941591 |
| Serial batch latency (ns) | 828 |
| Bandwidth-limited serial latency (ns) | 6.48806e+06 |
| Bandwidth-limited equivalent ops/s | 3.16509e+12 |

## Layer Specs

| Layer spec | Count | Summary JSON | Per-layer MACs | Weighted MACs | System pJ/op | BW-limited layer latency (ns) |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| encoder_block | 12 | encoder_block/bert_base_12layer_encoder_block_layer_summary.json | 855638016 | 10267656192 | 0.0537947 | 540672 |

## Aggregate Semantics

- `source`: Generated from transformer-layer aggregate JSON summaries emitted by the transformer-model command.
- `layer_counts`: Each layer spec is generated once as decomposed transformer-layer artifacts and multiplied by its configured count.
- `energy`: Additive layer energy fields are multiplied by layer count and summed; per-MAC and per-op fields are recomputed from model totals.
- `memory_traffic`: Layer interface traffic is multiplied by layer count and summed. Activation lifetime, cache residency, and KV-cache reuse are not modeled.
- `system`: Layer system movement estimates are multiplied by layer count and summed over explicit SRAM/off-chip tiers. Bandwidth-limited timing is serial accounting, not a fused full-model scheduler.
- `timing`: serial_* timing fields assume weighted layer summaries execute one after another.
- `noise`: Noise remains non-additive. Model-level noise fields are maxima over representative layer summaries.

## Assumptions

- Dense full-sequence encoder self-attention is used.
- BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.
- The model summary multiplies one representative encoder-layer artifact by 12 and does not model embeddings, pooler, classifier head, layer norm, softmax, or activation functions.
- Full transformer model JSON is generated from representative transformer-layer summaries and configured layer counts.
- Layer counts multiply additive energy, movement, conversion, memory, and serial timing fields.
- The model summary preserves decomposed layer/card provenance through layers[].json_report and layers[].matmul_reports.
- Published calibration targets are rejected for transformer-model configs so model totals remain local estimates.

## Exclusions

- softmax
- layer_norm
- bias_adds
- activation_functions
- dropout
- masking
- kv_cache_incremental_decoding
- causal_triangular_halving
- non_matmul_memory_traffic
