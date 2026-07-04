# PhotonicBench Transformer Model Summary: GPT-style decoder KV-cache model

GPT-2-small style decoder inference summary with 12 identical decoder layers, one generated query token, and a 1024-token KV-cache context. This is a transformer-model workflow example, not a published accelerator calibration card.

## Workload

| Metric | Value |
| --- | ---: |
| Layer specs | 1 |
| Total layer instances | 12 |
| Total MACs | 135346944 |
| Total equivalent ops | 270693888 |
| Total output elements | 280801 |

## Local Model Totals

| Metric | Value |
| --- | ---: |
| Compute/conversion energy (pJ) | 6.13456e+07 |
| Movement energy (pJ) | 1.74383e+09 |
| Total system energy (pJ) | 1.80518e+09 |
| System energy per MAC (pJ) | 13.3374 |
| System energy per equivalent op (pJ) | 6.6687 |
| Movement energy share | 0.966017 |
| Serial batch latency (ns) | 833 |
| Overlap-adjusted latency (ns) | 416.5 |
| Bandwidth-limited serial latency (ns) | 1.08772e+07 |
| Bandwidth-limited overlap-adjusted latency (ns) | 5.4386e+06 |
| Bandwidth-limited equivalent ops/s | 2.48864e+10 |

## Model Components

| Component | Enabled | Quantity | Basis |
| --- | --- | ---: | --- |
| Embeddings | True | 3072 | tensor reads |
| Output projection | True | 3.85974e+07 | matmul MACs |
| Activation tensors | True | 3.81945e+07 | read/write bytes |
| KV cache | True | 3.77856e+07 | decoder_incremental |

## Activation And KV-Cache Tensor Traffic

| Metric | Value |
| --- | ---: |
| Embedding reads | 3072 bytes |
| Layer input reads | 18432 bytes |
| Layer output writes | 18432 bytes |
| Attention score tensors | 295200 bytes |
| MLP intermediate tensors | 73728 bytes |
| KV-cache reads | 3.77487e+07 bytes |
| KV-cache writes | 36864 bytes |
| Total tensor traffic | 3.81945e+07 bytes |

## Layer Specs

| Layer spec | Count | Summary JSON | Per-layer MACs | Weighted MACs | System pJ/op | BW-limited layer latency (ns) |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| decoder_block | 12 | decoder_block/gpt_decoder_kv_cache_decoder_block_layer_summary.json | 8062464 | 96749568 | 5.25966 | 506210 |

## Aggregate Semantics

- `source`: Generated from transformer-layer aggregate JSON summaries emitted by the transformer-model command.
- `layer_counts`: Each layer spec is generated once as decomposed transformer-layer artifacts and multiplied by its configured count.
- `energy`: Additive layer energy fields are multiplied by layer count and summed; per-MAC and per-op fields are recomputed from model totals.
- `memory_traffic`: Layer interface traffic is multiplied by layer count and summed. Output projection interface traffic is added when enabled. Activation tensor and KV-cache traffic are reported separately.
- `activation_memory_traffic`: Embedding reads, activation tensor materialization, and KV-cache read/write bytes are local model-level assumptions outside the converter-interface traffic table.
- `system`: Layer system movement estimates are multiplied by layer count and summed over explicit SRAM/off-chip tiers. Output projection and tensor-memory movement are added when configured. Bandwidth-limited timing is serial accounting, not a measured full-model scheduler.
- `timing`: serial_* timing fields assume weighted layer summaries execute one after another. Overlap-adjusted timing fields are optional local assumptions and do not replace the serial fields.
- `noise`: Noise remains non-additive. Model-level noise fields are maxima over representative layer summaries.

## Assumptions

- Decoder incremental inference uses one query token and a 1024-token KV-cache context.
- GPT-style means common public decoder dimensions, not a source-backed photonic accelerator claim.
- Embeddings, vocabulary projection, activation tensor traffic, KV-cache traffic, and overlap timing are local transformer-model assumptions.
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
- causal_triangular_halving
- non_matmul_memory_traffic
