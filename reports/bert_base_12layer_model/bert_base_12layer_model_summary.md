# PhotonicBench Transformer Model Summary: BERT-base style 12-layer encoder model

Dense BERT-base style full encoder model summary with 12 identical encoder layers. This is a transformer-model workflow example, not a published accelerator calibration card.

## Workload

| Metric | Value |
| --- | ---: |
| Layer specs | 1 |
| Total layer instances | 12 |
| Total MACs | 13268090880 |
| Total equivalent ops | 26536181760 |
| Total output elements | 16882944 |

## Local Model Totals

| Metric | Value |
| --- | ---: |
| Compute/conversion energy (pJ) | 8.30779e+07 |
| Movement energy (pJ) | 1.53834e+09 |
| Total system energy (pJ) | 1.62142e+09 |
| System energy per MAC (pJ) | 0.122204 |
| System energy per equivalent op (pJ) | 0.0611022 |
| Movement energy share | 0.948762 |
| Serial batch latency (ns) | 833 |
| Overlap-adjusted latency (ns) | 624.75 |
| Bandwidth-limited serial latency (ns) | 9.40766e+06 |
| Bandwidth-limited overlap-adjusted latency (ns) | 7.05575e+06 |
| Bandwidth-limited equivalent ops/s | 2.8207e+12 |

## Model Components

| Component | Enabled | Quantity | Basis |
| --- | --- | ---: | --- |
| Embeddings | True | 393216 | tensor reads |
| Output projection | True | 3.00043e+09 | matmul MACs |
| Activation tensors | True | 1.92676e+07 | read/write bytes |
| KV cache | False | 0 | none |

## Activation And KV-Cache Tensor Traffic

| Metric | Value |
| --- | ---: |
| Embedding reads | 393216 bytes |
| Layer input reads | 2.3593e+06 bytes |
| Layer output writes | 2.3593e+06 bytes |
| Attention score tensors | 4.71859e+06 bytes |
| MLP intermediate tensors | 9.43718e+06 bytes |
| KV-cache reads | 0 bytes |
| KV-cache writes | 0 bytes |
| Total tensor traffic | 1.92676e+07 bytes |

## Layer Specs

| Layer spec | Count | Summary JSON | Per-layer MACs | Weighted MACs | System pJ/op | BW-limited layer latency (ns) |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| encoder_block | 12 | encoder_block/bert_base_12layer_encoder_block_layer_summary.json | 855638016 | 10267656192 | 0.0548057 | 540672 |

## Aggregate Semantics

- `source`: Generated from transformer-layer aggregate JSON summaries emitted by the transformer-model command.
- `layer_counts`: Each layer spec is generated once as decomposed transformer-layer artifacts and multiplied by its configured count.
- `energy`: Additive layer energy fields are multiplied by layer count and summed; per-MAC and per-op fields are recomputed from model totals.
- `memory_traffic`: Layer interface traffic is multiplied by layer count and summed. Output projection interface traffic is added when enabled. Activation tensor and KV-cache traffic are reported separately.
- `activation_memory_traffic`: Embedding reads, activation tensor materialization, and KV-cache read/write bytes are local model-level assumptions outside the converter-interface traffic table.
- `system`: Layer system movement estimates are multiplied by layer count and summed over explicit SRAM, intermediate/cache, and off-chip tiers. Output projection and tensor-memory movement are added when configured. Bandwidth-limited timing is serial accounting, not a measured full-model scheduler.
- `timing`: serial_* timing fields assume weighted layer summaries execute one after another. Overlap-adjusted timing fields are optional local assumptions and do not replace the serial fields.
- `noise`: Noise remains non-additive. Model-level noise fields are maxima over representative layer summaries.

## Assumptions

- Dense full-sequence encoder self-attention is used.
- BERT-base style means common public model dimensions, not a source-backed photonic accelerator claim.
- Embeddings, vocabulary projection, activation tensor traffic, and overlap timing are local transformer-model assumptions, not a measured scheduler.
- Full transformer model JSON is generated from representative transformer-layer summaries and configured layer counts.
- Layer counts multiply additive energy, movement, conversion, memory, and serial timing fields.
- Embeddings, output projection, activation traffic, KV-cache traffic, and overlap timing are explicit local assumptions when configured.
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
