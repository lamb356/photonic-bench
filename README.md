# PhotonicBench

[![CI](https://github.com/lamb356/photonic-bench/workflows/CI/badge.svg?branch=master)](https://github.com/lamb356/photonic-bench/actions/workflows/ci.yml)

PhotonicBench generates transparent benchmark cards for photonic AI energy and noise claims.

The current CLI reads YAML configs for photonic matmul benchmark cards, transformer-layer shape helpers, and counted transformer-model summaries, computes auditable local model budgets, and writes Markdown plus optional JSON reports that expose assumptions, provenance, calibration fits, and comparison tables.

## Quick Start

```powershell
python -m pytest
python -m photonic_bench.cli run examples/matmul_64x64.yaml --report reports/matmul_64x64.md
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64.md
python -m photonic_bench.cli run examples/xu_11tops_convolution_surrogate.yaml --report reports/xu_11tops_convolution_surrogate.md --json-report reports/xu_11tops_convolution_surrogate.json
python -m photonic_bench.cli run examples/weight_stationary_64x64_batch.yaml --report reports/weight_stationary_64x64_batch.md --json-report reports/weight_stationary_64x64_batch.json
python -m photonic_bench.cli run examples/feldmann_2021_photonic_tensor_core_surrogate.yaml --report reports/feldmann_2021_photonic_tensor_core_surrogate.md --json-report reports/feldmann_2021_photonic_tensor_core_surrogate.json
python -m photonic_bench.cli run examples/pappas_2025_awgr_262tops_surrogate.yaml --report reports/pappas_2025_awgr_262tops_surrogate.md --json-report reports/pappas_2025_awgr_262tops_surrogate.json
python -m photonic_bench.cli run examples/taichi_2024_chiplet_surrogate.yaml --report reports/taichi_2024_chiplet_surrogate.md --json-report reports/taichi_2024_chiplet_surrogate.json
python -m photonic_bench.cli run examples/hitop_2025_optical_tensor_processor_surrogate.yaml --report reports/hitop_2025_optical_tensor_processor_surrogate.md --json-report reports/hitop_2025_optical_tensor_processor_surrogate.json
python -m photonic_bench.cli run examples/lin_2024_tfln_120gops_tensor_core_surrogate.yaml --report reports/lin_2024_tfln_120gops_tensor_core_surrogate.md --json-report reports/lin_2024_tfln_120gops_tensor_core_surrogate.json
python -m photonic_bench.cli run examples/meng_2025_mrr_otpu_tensor_core_surrogate.yaml --report reports/meng_2025_mrr_otpu_tensor_core_surrogate.md --json-report reports/meng_2025_mrr_otpu_tensor_core_surrogate.json
python -m photonic_bench.cli run examples/luan_2026_single_shot_mmm_surrogate.yaml --report reports/luan_2026_single_shot_mmm_surrogate.md --json-report reports/luan_2026_single_shot_mmm_surrogate.json
python -m photonic_bench.cli run examples/bandyopadhyay_2024_single_chip_dnn_surrogate.yaml --report reports/bandyopadhyay_2024_single_chip_dnn_surrogate.md --json-report reports/bandyopadhyay_2024_single_chip_dnn_surrogate.json
python -m photonic_bench.cli run examples/kari_2024_coherent_matrix_platform_surrogate.yaml --report reports/kari_2024_coherent_matrix_platform_surrogate.md --json-report reports/kari_2024_coherent_matrix_platform_surrogate.json
python -m photonic_bench.cli run examples/dong_2023_continuous_time_tensor_core_surrogate.yaml --report reports/dong_2023_continuous_time_tensor_core_surrogate.md --json-report reports/dong_2023_continuous_time_tensor_core_surrogate.json
python -m photonic_bench.cli transformer-layer examples/transformer_small_sanity.yaml --output-dir reports/transformer_small_sanity --prefix small_transformer
python -m photonic_bench.cli transformer-layer examples/bert_base_encoder_layer.yaml --output-dir reports/bert_base_encoder_layer --prefix bert_base_layer
python -m photonic_bench.cli transformer-layer examples/gpt_style_decoder_layer.yaml --output-dir reports/gpt_style_decoder_layer --prefix gpt_decoder_layer
python -m photonic_bench.cli transformer-model examples/bert_base_12layer_model.yaml --output-dir reports/bert_base_12layer_model --prefix bert_base_12layer
python -m photonic_bench.cli transformer-model examples/gpt_style_decoder_kv_cache_model.yaml --output-dir reports/gpt_style_decoder_kv_cache_model --prefix gpt_decoder_kv_cache
python -m photonic_bench.cli inspect-config examples/bert_base_12layer_model.yaml --kind transformer-model
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64.md --json-report reports/nature_pace_64x64.json
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64_calibrated.md --json-report reports/nature_pace_64x64_calibrated.json --fit-target published-including-lasers --fit-parameter device.dac.energy_pj_per_conversion
python -m photonic_bench.cli compare reports/matmul_64x64.json reports/nature_pace_64x64.json reports/nature_pace_64x64_calibrated.json reports/xu_11tops_convolution_surrogate.json reports/weight_stationary_64x64_batch.json reports/feldmann_2021_photonic_tensor_core_surrogate.json reports/pappas_2025_awgr_262tops_surrogate.json reports/taichi_2024_chiplet_surrogate.json reports/hitop_2025_optical_tensor_processor_surrogate.json reports/lin_2024_tfln_120gops_tensor_core_surrogate.json reports/meng_2025_mrr_otpu_tensor_core_surrogate.json reports/luan_2026_single_shot_mmm_surrogate.json reports/bandyopadhyay_2024_single_chip_dnn_surrogate.json reports/kari_2024_coherent_matrix_platform_surrogate.json reports/dong_2023_continuous_time_tensor_core_surrogate.json --report reports/comparison.md
python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html
python -m photonic_bench.cli verify-artifacts
```

After the commands run, open `reports/matmul_64x64.md` and `reports/nature_pace_64x64.md`.
Use `--json-report <path>` when you also want a machine-readable card beside the Markdown report.

## What The Model Counts

For a matmul with shape `m x k` times `k x n`, PhotonicBench computes:

- `MACs per operation = m * n * k`
- `Equivalent ops per operation = 2 * MACs per operation`
- `Operations per batch = execution.batch_size`
- `ADC conversions = m * n * batch_size`
- `Vector DAC conversions = m * k * ceil(batch_size / vector_reuse_factor)`
- `Weight DAC conversions = k * n * ceil(batch_size / weight_reuse_factor)`, or one weight load per batch when `weight_stationary: true`
- `DAC conversions = vector_dac_conversions + weight_dac_conversions`
- `Vector operand read bytes = vector_dac_conversions * ceil(vector_dac_bits / 8)`
- `Weight operand read bytes = weight_dac_conversions * ceil(weight_dac_bits / 8)`
- `Output write bytes = output_elements * ceil(adc_bits / 8)`
- `Operational intensity = equivalent_ops / total_interface_bytes`
- `Optical compute pJ = MACs * optical_mac_energy_fj / 1000`
- `Laser electrical pJ = optical_compute_pJ / laser_wall_plug_efficiency`
- `Detector pJ = output_elements * photodetector_energy_fj_per_sample / 1000`
- `Total pJ = laser_electrical_pJ + detector_pJ + ADC_pJ + DAC_pJ`

Configs may provide a legacy shared `device.dac`, separate `device.vector_dac` and `device.weight_dac`, or both. If separate DACs are present, vector and weight DAC energy are reported separately and summed into total DAC energy.

The first noise estimate combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms. This is deliberately conservative and auditable, not a replacement for device-level simulation.

Interface traffic is a converter-boundary estimate derived from reuse counts
and converter bit widths. It is useful for comparing local operational
intensity and feeds the optional tier model, but it is not a cache simulator,
NoC router, instruction model, or nonlinear tensor traffic model.

Configs can also include a named system profile, explicit system tiers, or both.
Defaults are supplied when the section is omitted:

```yaml
system:
  profile: default
  memory_timing_mode: overlapped
  sram:
    read_energy_pj_per_byte: 0.02
    write_energy_pj_per_byte: 0.02
    bandwidth_bytes_per_ns: 1024
  intermediate:
    read_energy_pj_per_byte: 0.2
    write_energy_pj_per_byte: 0.2
    bandwidth_bytes_per_ns: 256
  off_chip:
    read_energy_pj_per_byte: 10.0
    write_energy_pj_per_byte: 10.0
    bandwidth_bytes_per_ns: 16
  contention:
    shared_bandwidth_clients: 1.0
    arbitration_efficiency: 1.0
    calibration_overhead_fraction: 0.0
```

Named profiles are local modeling presets, not measured hardware claims:

| Profile | Intent |
| --- | --- |
| `default` | SRAM plus intermediate/cache plus generic DDR-style off-chip defaults. |
| `on_chip_sram` | Keeps modeled converter-interface traffic on SRAM by setting intermediate and off-chip read/write fractions to zero. |
| `hbm` | Uses an intermediate/cache tier plus a higher-bandwidth, lower-energy off-chip tier for HBM-style sensitivity checks. |
| `ddr` | Uses the generic DDR-class off-chip tier with an intermediate/cache tier. |
| `pcie_attached` | Uses a lower-bandwidth, higher-energy host/PCIe-attached tier and serialized memory timing. |

Profile selection can be combined with tier overrides:

```yaml
system:
  profile: hbm
  memory_timing_mode: serialized
  off_chip:
    bandwidth_bytes_per_ns: 256
    read_fraction: 0.5
```

Each tier can also set `read_fraction` and `write_fraction` between `0` and `1`.
The optional `contention` block reduces nominal tier bandwidth by shared client
count and arbitration efficiency, then applies a calibration/control overhead
guardband to adjusted transfer timing. For example, the built-in
`pcie_attached` profile uses two shared clients, `0.85` arbitration efficiency,
and `0.05` calibration overhead. These are local system assumptions, not
paper-reported hardware measurements.
Reports expose `local_model.system` with SRAM/intermediate/off-chip read bytes,
write bytes, movement energy, transfer time, total movement energy, total system
energy, system energy per MAC/op, movement-energy share, selected profile
metadata, memory timing mode, bandwidth-limited throughput,
contention-adjusted latency/throughput, hierarchy traffic shares, loaded
hierarchy bandwidth under contention, bandwidth derate, guardband overhead, and
bandwidth/contention pressure ratios. Each tier also records traffic share,
movement-energy share, guardbanded transfer time, transfer share, and tier-local
pressure ratio. It also records the bandwidth required to move that tier's
bytes inside the compute batch window, utilization of the contention-adjusted
effective bandwidth, remaining bandwidth headroom in bytes/ns, and a headroom
ratio. The system summary identifies the dominant traffic tier, dominant
movement-energy tier, memory bottleneck tier, bandwidth saturation tier, maximum
tier bandwidth utilization, and minimum tier bandwidth headroom ratio. `overlapped`
timing uses the slowest tier transfer; `serialized` timing sums the tier
transfer times for a conservative contention-style bound. These are local
PhotonicBench estimates and remain separate from paper-reported values and from
the older `local_model.energy.total_pj` compute/conversion estimate.

The checked examples include a profile sensitivity preset built from identical
64x64 workloads under `on_chip_sram`, `hbm`, `ddr`, and `pcie_attached`.
Open the visualizer and choose `System profile sensitivity` from the comparison
preset list to compare the movement-energy and bandwidth-limited effects.

Timing now reports both single-operation latency and batch/pipeline behavior. With a pipeline cycle time, batch latency is:

```text
batch_latency_ns = single_operation_latency_ns + (batch_size - 1) * pipeline_cycle_time_ns
```

Steady-state throughput uses one operation per configured pipeline cycle.

## Transformer Layer Helpers

Use the `transformer-layer` command when you want decomposed benchmark cards for
the major dense matmuls in a transformer layer:

```powershell
python -m photonic_bench.cli transformer-layer examples/bert_base_encoder_layer.yaml --output-dir reports/bert_base_encoder_layer --prefix bert_base_layer
```

The command writes one Markdown card and one JSON card for each generated
matmul:

- `<prefix>_qkv_projection.md/json`
- `<prefix>_attention_scores.md/json`
- `<prefix>_attention_value.md/json`
- `<prefix>_mlp_up_projection.md/json`
- `<prefix>_mlp_down_projection.md/json`

It also writes two aggregate layer artifacts loaded from the generated JSON
reports:

- `<prefix>_layer_comparison.md`: human-readable comparison card.
- `<prefix>_layer_summary.json`: machine-readable layer summary.

Both aggregate artifacts include a formula audit and verify that the summed JSON
MAC counts match the helper formulas. Aggregate validation matches decomposed
cards by their `Transformer operation: ...` assumption, so callers do not have
to supply cards in filename order. Missing, duplicate, wrong-schema,
wrong-operation, stale-model-input, or malformed cards are rejected with an
error that names the offending file and JSON field where practical.

Transformer-layer YAML uses a `transformer_layer` section beside the existing
device, timing, noise, execution, provenance, and assumptions sections:

```yaml
benchmark:
  name: BERT-base style encoder layer
transformer_layer:
  layer_type: encoder
  attention_mode: dense
  batch_size: 1
  sequence_length: 128
  hidden_size: 768
  num_heads: 12
  head_dim: 64
  mlp_intermediate_size: 3072
```

If `head_dim` is omitted, it is inferred as `hidden_size / num_heads` when the
division is exact. PhotonicBench validates that `head_dim * num_heads` equals
`hidden_size`. Shape fields such as `batch_size`, `sequence_length`,
`hidden_size`, `num_heads`, `head_dim`, and `mlp_intermediate_size` must be
positive integers. The supported `layer_type` values are `encoder` and
`decoder`; `attention_mode` currently supports only `dense`.

The dense transformer MAC formulas are:

```text
QKV projection MACs       = 3 * B * S * H * H
Attention scores MACs    = B * heads * S_query * S_context * head_dim
Attention-value MACs     = B * heads * S_query * S_context * head_dim
MLP up-projection MACs   = B * S * H * intermediate
MLP down-projection MACs = B * S * intermediate * H
Layer equivalent ops     = 2 * summed MACs
```

For generated cards, learned-weight matmuls use the configured weight reuse and
weight-stationary settings. Attention-score and attention-value cards treat the
right operand as activation data, so cross-batch weight-stationary reuse is
disabled for those cards.

For ordinary layer helpers, `S_query` and `S_context` are both the configured
`sequence_length`. Transformer-model KV-cache mode can explicitly set decoder
representative layers to `S_query = sequence_length` and
`S_context = kv_cache.context_length + sequence_length`; this is visible in the
layer JSON as `attention_context_length` and `kv_cache_enabled`. The helper
still excludes softmax, layer norm, bias adds, activation functions, dropout,
masking, causal triangular shortcuts, and non-matmul tensor traffic unless a
full-model option explicitly accounts for the tensor traffic.

Transformer-layer configs may include provenance, but `published_calibration` is
not accepted for this helper yet; decomposed per-matmul cards remain local-model
cards unless a future layer-level published-reference model is added explicitly.

## Transformer Model Helpers

Use the `transformer-model` command when you want a counted full-model summary
instead of only a single representative layer:

```powershell
python -m photonic_bench.cli transformer-model examples/bert_base_12layer_model.yaml --output-dir reports/bert_base_12layer_model --prefix bert_base_12layer
python -m photonic_bench.cli transformer-model examples/gpt_style_decoder_kv_cache_model.yaml --output-dir reports/gpt_style_decoder_kv_cache_model --prefix gpt_decoder_kv_cache
```

Transformer-model YAML uses a `transformer_model.layers` list. Each entry uses
the same shape fields as `transformer_layer`, plus a positive integer `count`:

```yaml
transformer_model:
  layers:
    - name: encoder_block
      count: 12
      layer_type: encoder
      attention_mode: dense
      batch_size: 1
      sequence_length: 128
      hidden_size: 768
      num_heads: 12
      head_dim: 64
      mlp_intermediate_size: 3072
  embeddings:
    enabled: true
    vocab_size: 30522
    bits_per_element: 16
  output_projection:
    enabled: true
    vocab_size: 30522
    tied_to_token_embedding: true
  activation_memory:
    enabled: true
    bits_per_element: 16
  pipeline_overlap:
    enabled: true
    overlap_fraction: 0.25
    label: local_layer_overlap_assumption
```

The command generates one representative transformer-layer artifact tree per
layer spec, then writes `<prefix>_model_summary.md` and
`<prefix>_model_summary.json`. Additive fields are multiplied by each layer
spec's `count`; per-op, throughput, movement-share, and operational-intensity
fields are recomputed from model totals. The summary links back to
`layers[].json_report` and `layers[].matmul_reports` so the model total remains
auditable through decomposed layer/card artifacts.

Transformer-model summaries can add explicit local realism assumptions beyond
serial layer matmul aggregation:

- `embeddings`: records token and optional position embedding tensor-read bytes.
- `output_projection`: models a vocabulary projection as an additional local
  matmul and adds its MACs, energy, interface traffic, system movement, and
  timing to model totals.
- `activation_memory`: reports estimated hidden-state read/write bytes
  separately from optical matmul interface traffic.
- `kv_cache`: for decoder incremental inference, increases dense attention
  score/value context length and reports KV-cache read/write bytes.
- `pipeline_overlap`: preserves serial baseline timing and adds separate
  overlap-adjusted latency/throughput fields from a named local assumption.

These fields are local PhotonicBench assumptions. They are not hidden scheduler
behavior, paper-measured behavior, tokenizer work, poolers, losses, or a full
memory hierarchy.

### Common Transformer-Layer Validation Failures

CLI errors are intended to point at the file and field that need attention:

- `... does not exist`: the config or JSON path passed to the command is wrong.
- `contains invalid YAML at line ..., column ...`: the YAML parser could not
  read the config.
- `transformer_layer.hidden_size must be divisible by
  transformer_layer.num_heads when head_dim is omitted`: add a valid `head_dim`
  or fix the shape.
- `transformer_layer.head_dim * transformer_layer.num_heads must equal
  transformer_layer.hidden_size`: the explicit head dimension does not match
  the hidden size.
- `duplicate transformer operation ...` or `missing transformer JSON card(s)
  ...`: the aggregate was built from an incomplete or duplicated decomposed-card
  set.
- `<card>.json: model_inputs... expected ...`: a stale decomposed card was
  generated from different device, execution, timing, or noise settings.

## Published Calibration Cards

Configs may include optional `provenance` and `published_calibration` sections. These let a benchmark card carry paper-reported targets beside the local component model without pretending they came from the local formulas.

The Nature PACE example uses the paper-reported 64x64 matrix-vector accelerator values:

- 64x64 matrix-vector oMAC architecture
- More than 16,000 photonic components
- Approximately 8.19 TOPS
- 4.21 TOPS/W excluding lasers
- 2.38 TOPS/W including lasers
- 7.61 ENOB average bit accuracy
- 5 ns demonstrated cycle latency

PhotonicBench converts TOPS/W to pJ/op with:

```text
energy_per_op_pj = 1 / tops_per_watt
energy_per_mac_pj = 2 / tops_per_watt
workload_energy_pj = equivalent_ops / tops_per_watt
```

The Xu 2021 example uses the Nature paper "11 TOPS photonic convolutional accelerator for optical neural networks" as a second published source:

- DOI: `10.1038/s41586-020-03063-0`
- Nature 589, 44-51 (2021)
- Reported 11 TOPS title / more-than-10 TOPS abstract claim
- 250,000-pixel image convolution workload
- 8-bit resolution
- 10 kernels
- 88% handwritten-digit recognition accuracy

Because that source is a vector convolution accelerator, PhotonicBench labels the local workload as a dense matmul surrogate (`m=1`, `k=250000`, `n=10`). The card carries the paper numbers as published references, not as local model results.

This repository also includes twenty-two additional source-backed published-card
surrogates:

- Feldmann et al., "Parallel convolutional processing using an integrated
  photonic tensor core", Nature 589, 52-58 (2021), DOI:
  `10.1038/s41586-020-03070-1`. The card records the paper's tera-MAC/s and
  greater-than-14-GHz bandwidth claims while using a small dense-tile local
  surrogate.
- Pappas et al., "A 262 TOPS hyperdimensional photonic AI accelerator powered
  by a Si3N4 microcomb laser", APL Photonics 10, 110805 (2025), DOI:
  `10.1063/5.0271374`. The card records 262 TOPS, 32 Gbaud, 273 fJ/OP, DDoS
  kappa, and MNIST accuracy as paper metrics while using a 16x16 dense-tile
  surrogate.
- Xu et al., "Large-scale photonic chiplet Taichi empowers 160-TOPS/W
  artificial general intelligence", Science 384, 202-209 (2024), DOI:
  `10.1126/science.adl1203`. The card records 160 TOPS/W, 64x64 chiplet
  dimensions, 879 T MACS/mm2, and reported task accuracies while using a 64x64
  dense local surrogate.
- Chen/Ou/Xue et al., "Hypermultiplexed integrated photonics-based optical
  tensor processor", Science Advances 11, eadu0228 (2025), DOI:
  `10.1126/sciadv.adu0228`. The card records the HITOP 40 TOPS/W reference,
  trillion-operation-per-second scale note, and 405,000-parameter validation
  note while using a 64x64 dense local surrogate.
- Lin et al., "120 GOPS Photonic tensor core in thin-film lithium niobate for
  inference and in situ training", Nature Communications 15, 9081 (2024), DOI:
  `10.1038/s41467-024-53261-x`. The card records 120 GOPS, 60 GHz weight
  updates, and 131,072 fan-in as paper metrics while using a 16x16 dense local
  surrogate.
- Meng et al., "High-integrated photonic tensor core utilizing
  high-dimensional lightwave and microwave multidomain multiplexing", Light:
  Science & Applications 14, 27 (2025), DOI: `10.1038/s41377-024-01706-9`.
  The card records 34.04 TOPS/mm2 computing density and 96.41% MNIST accuracy
  while using a 16x16 dense local surrogate.
- Zhang et al., "Direct tensor processing with coherent light", Nature
  Photonics 20, 102-108 (2026), DOI: `10.1038/s41566-025-01799-7`. The card
  records POMMM matrix-size, numerical-error, code, and dataset references
  while using the reported 20x20 matrix-matrix demonstration as a dense local
  surrogate.
- Chen et al., "FSR-GeMM: A Scalable FSR-Parallel Photonic Accelerator for
  Real-Valued GeMM Computing", DATE 2026, DOI:
  `10.23919/DATE69613.2026.11539161`. The card records relative FSR-GeMM area,
  energy, and speedup metrics while using a 64x64 dense GEMM surrogate.
- Ning et al., "Hardware-efficient photonic tensor core: accelerating deep
  neural networks with structured compression", Optica 12, 1079-1089 (2025),
  DOI: `10.1364/OPTICA.559604`. The card records projected power efficiency,
  computing density, parameter reduction, and co-design improvement metrics
  while using a 16x16 dense local surrogate.
- Kovaios et al., "On-chip 1 TOPS Hyperdimensional Photonic Tensor Core Using
  a WDM Silicon Photonic Coherent Crossbar", Journal of Lightwave Technology
  43, 8799-8805 (2025), DOI: `10.1109/JLT.2025.3589088`. The card records the
  0.96 TOPS throughput claim, 4x2x1 primitive shape, average error, data-rate,
  and Iris classification metrics while using the demonstrated primitive shape
  as the local workload.
- Luan et al., "Single-shot matrix-matrix photonic processor based on
  spatial-spectral hypermultiplexed parallel diffraction", Nature
  Communications 17, 484 (2026), DOI: `10.1038/s41467-026-68452-x`. The card
  records the 16x16-by-16x16 matrix-matrix demonstration, 4096 MACs per shot,
  2 GSa/s sample rate, 20 aJ/MAC optical energy, and task accuracy while using
  a 16x16 dense tile surrogate.
- Bandyopadhyay et al., "Single-chip photonic deep neural network with
  forward-only training", Nature Photonics 18, 1335-1343 (2024), DOI:
  `10.1038/s41566-024-01567-z`. The card records the integrated six-neuron,
  three-layer photonic DNN, 410 ps latency, forward-only training, and reported
  accuracy while using a compact 6x6 dense local surrogate.
- Kari et al., "Realization of an integrated coherent photonic platform for
  scalable matrix operations", Optica 11, 542-551 (2024), DOI:
  `10.1364/OPTICA.507525`. The card records coherent real/complex
  multiply-accumulate and scalable matrix-operation framing while using a small
  dense coherent dot-product tile surrogate.
- Dong et al., "Higher-dimensional processing using a photonic tensor core
  with continuous-time data", Nature Photonics 17, 1080-1088 (2023), DOI:
  `10.1038/s41566-023-01313-x`. The card records the spatial/wavelength/RF
  tensor-core framing, parallelism of 100, RF/WDM dimensions, ECG workload, and
  reported accuracy while using a 3x3-by-3x100 dense local surrogate.
- Meyer et al., "Deep neural network inference on an integrated,
  reconfigurable photonic tensor processor", Nature Communications 17, 3396
  (2026), DOI: `10.1038/s41467-026-71599-2`. The card records the 9-input,
  3-output rack-integrated PTP primitive, 27 GMAC/s, 0.022 TOPS/W projected
  efficiency, MVM error, and MNIST/CIFAR-10 accuracy while using a primitive
  local MVM surrogate.
- Xie et al., "Complex-valued matrix-vector multiplication using a scalable
  coherent photonic processor", Science Advances 11, eads7475 (2025), DOI:
  `10.1126/sciadv.ads7475`. The card records the 16-channel complex coherent
  MVM processor and 1.28 TOPS throughput while using a dense real-valued local
  MVM surrogate.
- Wu et al., "Scalable high-order integrated photonic tensor processor via
  frequency-domain modulation", Optica 13, 998-1006 (2026), DOI:
  `10.1364/OPTICA.579208`. The card records third- and fourth-order
  frequency-domain tensor-processing architecture claims while using a 16x16
  dense GEMM surrogate.
- Tang et al., "Waveguide-multiplexed photonic matrix-vector multiplication
  processor using multiport photodetectors", Optica 12, 812-820 (2025), DOI:
  `10.1364/OPTICA.552023`. The card records the 4x4 MVM primitive, 16-port
  Ge photodetector bandwidth, scaling projection, and task accuracy while
  using the demonstrated primitive as a local MVM surrogate.
- Meng et al., "Digital-analog hybrid matrix multiplication processor for
  optical neural networks", Nature Communications 16, 7465 (2025), DOI:
  `10.1038/s41467-025-62586-0`. The card records HOP per-sample energy,
  cascaded-MRM count, task data rates, and precision metadata while using a
  3x3-kernel MVM surrogate.
- Prapas et al., "Time-space-wavelength multiplexed photonic tensor core using
  WDM SiGe EAM array chiplets", Optics Express 33, 36960-36972 (2025), DOI:
  `10.1364/OE.564666`. The card records the 8x8 PITC layout, 20 Gbaud WDM EAM
  operation, 2.56 TOPS MNIST demonstration, and benchmark kappa scores while
  using an 8x8 dense tile surrogate.
- Zhang et al., "Photonic logic tensor computing beyond Tbit/s per core",
  Optica 12, 1252-1260 (2025), DOI: `10.1364/OPTICA.557867`. The card records
  wavelength, spatial, line-rate, and modulation-bandwidth metadata for the
  PULTC logic tensor core while using a low-confidence dense bookkeeping
  surrogate.
- Sved et al., "Inverse-designed nanophotonic neural network accelerators for
  ultra-compact optical computing", Nature Communications 17, 1059 (2026),
  DOI: `10.1038/s41467-026-68648-1`. The card records computational density,
  footprint, and MNIST/MedNIST accuracy evidence while using a compact
  classifier-head surrogate.

## Current Boundary

This repo now carries multiple source-backed cards, but it still does not claim independent device-level reproduction of the source papers. Published calibration/reference tables are paper-derived; component-model tables remain transparent local assumption sets.

Published cards can also carry a Source Quality Index under
`published_reference.source_quality`. The index records the DOI/reference,
paper-reported metric types, local surrogate type, coverage for throughput,
energy, accuracy, area, and precision, and a conservative `A` through `D`
confidence grade. This table is an audit aid only; it does not change local
model math or promote a surrogate card into a measured reproduction.

## Machine-Readable JSON

The `run` command can write Markdown and JSON in the same invocation:

```powershell
python -m photonic_bench.cli run examples/matmul_64x64.yaml --report reports/matmul_64x64.md --json-report reports/matmul_64x64.json
```

The JSON card includes:

- `schema_version`
- benchmark metadata and workload dimensions
- model input assumptions
- local component-model energy, timing, noise, and conversion-count outputs
- local system movement, contention, effective bandwidth, and
  contention-adjusted latency/throughput outputs
- optional published reference data, source quality, and provenance
- a `calibration_fit` field reserved for fitted calibration results

Published reference values and source-quality metadata remain under
`published_reference`; local estimates remain under `local_model`.

Transformer-layer aggregate JSON uses the separate schema version
`photonic-bench-transformer-layer-report-v1` and is written by default as
`<prefix>_layer_summary.json` when running `transformer-layer`. It includes
layer shape metadata, summed MAC/equivalent-op totals, summed conversion and
energy totals, a serial timing summary, non-additive noise diagnostics, a
per-matmul breakdown, formula-audit rows, assumptions, exclusions, and
provenance. Per-matmul artifact references are local filenames so downstream
tools do not need private machine paths.

Transformer-model aggregate JSON uses schema version
`photonic-bench-transformer-model-report-v1` and is written by default as
`<prefix>_model_summary.json` when running `transformer-model`. It includes
count-weighted workload totals, energy, system movement, serial timing,
contention-adjusted serial timing, non-additive noise diagnostics, activation
tensor traffic, model-component assumption details, optional overlap-adjusted timing fields, layer summary
references, and decomposed matmul report references.

Schema documentation:

- Human-readable guide: `docs/json_schema.md`
- Machine-readable JSON Schema: `docs/photonic-bench-report-v1.schema.json`
- Machine-readable transformer layer schema: `docs/photonic-bench-transformer-layer-report-v1.schema.json`
- Machine-readable transformer model schema: `docs/photonic-bench-transformer-model-report-v1.schema.json`
- Programmatic loading example: `examples/load_report_json.py`

```powershell
python examples/load_report_json.py reports/nature_pace_64x64.json
```

## Web Visualizer

Generate the portable static visualizer from checked-in JSON reports:

```powershell
python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html
```

Then open `reports/visualizer/index.html` in a browser. The generated page is
static and can be opened directly from disk without a backend server. The CLI
writes a visualizer bundle beside the HTML:

- `reports/visualizer/index.html`: shell page.
- `reports/visualizer/assets/styles.css`: visualizer styling.
- `reports/visualizer/assets/app.js`: browser UI logic.
- `reports/visualizer/data/index.json`: lightweight artifact index for tools.
- `reports/visualizer/data/index.js`: disk-safe browser bootstrap for the same
  index.
- `reports/visualizer/data/payloads/*.payload.json`: one full JSON payload per
  discovered artifact.
- `reports/visualizer/data/payloads/*.payload.js`: disk-safe lazy-load wrappers
  for those payloads.
- `reports/visualizer_presets.json`: optional generated-preset sidecar read
  from the reports directory and embedded into the visualizer index.

For larger local report directories, use server mode instead:

```powershell
python -m photonic_bench.cli visualize --reports-dir reports --serve
```

By default this serves `http://127.0.0.1:8000/`; pass `--host` or `--port` to
change the bind address. Server mode serves the same shell, CSS, JavaScript, and
lightweight index, but it loads individual artifact payload JSON over HTTP on
demand from the source reports. That avoids writing the duplicated
`.payload.json` plus `.payload.js` static payload tree and is the better path
when the report corpus grows. Press `Ctrl+C` to stop the local server.

The visualizer discovers `.json` files recursively under `reports/`, branches on
`schema_version`, and loads all supported contracts:

- `photonic-bench-report-v1`: per-matmul benchmark cards.
- `photonic-bench-transformer-layer-report-v1`: transformer-layer aggregate
  summaries.
- `photonic-bench-transformer-model-report-v1`: counted transformer-model
  summaries.

Unsupported or malformed JSON files are shown as index warnings instead of
crashing the whole page. Markdown reports are not scraped; JSON is the machine
interface. The generated `reports/visualizer/` directory is excluded from input
discovery so regenerating the visualizer does not index its own payload copies.

The Detail view lazy-loads the selected artifact payload. Per-matmul cards show
workload shape, local energy components, multi-tier system movement, timing,
published-reference separation, source-quality index when present, provenance,
and assumptions. Transformer-layer
summaries show layer shape, aggregate workload totals, local energy, interface
traffic, aggregate system movement, serial timing, non-additive noise
diagnostics, aggregate semantics, formula audit rows, per-matmul breakdowns,
assumptions, exclusions, and provenance. Transformer-model summaries show
count-weighted model totals, system movement, serial and overlap-adjusted
timing, model components, activation/KV-cache tensor traffic, layer-spec
references, aggregate semantics, assumptions, exclusions, and provenance.

The Compare view lets you select multiple artifacts from the rail, pin one as
the reference, and inspect a side-by-side matrix, comparison brief, comparison
insights, recommendation cards, Pareto trade-off chart, schema compatibility,
selection drawer, and grouped same-schema analytics. The rail includes search,
schema, boundary, source-quality, sort, and group controls. `Compare visible`
replaces the comparison set with the current filtered slice, and `Reset
filters` returns the rail to the default all-artifact/schema-grouped view.
Grouping can organize the rail by schema, source grade, system profile,
boundary tag, or a flat ungrouped list. The current filters, focus mode,
selected artifacts, pinned artifact, Pareto mode, and custom score weights are
kept in the URL with `replaceState`, so a copied link restores the same
comparison context without filling browser history with every keystroke.

The comparison dashboard has an `Analysis focus` selector. `Balanced`,
`Efficiency`, `Throughput`, `Contention`, and `Provenance` focus modes change
the recommendation cards, insights, and decision scorecards without changing
the underlying reports. The `Score Profile Gallery` provides one-click named
weighting stances for `Balanced`, `Efficiency`, `Throughput`, `Contention`, and
`Provenance` analysis. Each profile shows its intent, metric weights, and a
current-set preview of likely same-schema winners before you apply it. Applying
a profile updates the active focus and score weights while preserving the
selected artifacts, pinned reference, filters, grouping, and comparison state.
The `Score weights` controls still let you tune the active focus mode, reset
weights back to defaults, and preserve tuned weights in local storage and
shareable URLs. Browser exports include both the active profile identity and
the exact weights so profile-based comparisons are reproducible. Recommendation
cards include an `Explain score` drilldown showing raw metric values,
normalized scores, weights, weighted contributions, and the final score. Scores
are same-schema local UI heuristics for triage; they are not benchmark claims.
Compatible rows show the value, absolute delta, percent delta, and ratio
against the pinned reference. Mixed per-matmul, transformer-layer, and
transformer-model comparison is allowed, but labeled as mixed-schema
comparison; incompatible cross-schema deltas stay `n/a` so serial timing,
non-additive aggregate noise, exclusions, local estimates, system movement
estimates, interface traffic estimates, contention assumptions, and published
references are not flattened into one false hardware model.

The selection drawer provides dense comparison management for larger artifact
sets. It can remove one selected artifact, clear a schema group, invert the
current visible selection, or compare the top N artifacts from the current
filtered rail. Wide comparison tables keep the header row and first column
sticky inside the scroll container so metric labels stay visible during
horizontal and vertical review.

The Pareto chart has three modes:

- `Energy/op vs throughput`: lower system pJ/equivalent-op and higher
  bandwidth-limited equivalent ops/s are better.
- `Ops/byte vs latency`: higher equivalent ops/byte and lower
  bandwidth-limited latency are better.
- `Contention-adjusted throughput`: lower system pJ/equivalent-op and higher
  contention-adjusted equivalent ops/s are better.

Frontier points are highlighted deterministically from the currently selected
comparison artifacts. Missing legacy fields degrade to `n/a`; the chart falls
back to older local energy/timing fields only where the new system fields are
absent. Positive axes automatically switch from linear to log scaling when the
selected values span at least 100x, which keeps outlier-heavy photonic-card
comparisons readable while leaving the exact frontier table values unchanged.

Comparison presets are static-friendly. Add or edit `reports/visualizer_presets.json`
with schema version `photonic-bench-comparison-presets-v1`, a `presets` array,
stable artifact IDs, and an optional `pinned_id`; the next `visualize` run
validates the sidecar and embeds it into `data/index.json`. The browser UI can
also save local presets into local storage for ad hoc daily comparisons. Stale
sidecar artifact IDs are reported as index warnings and valid artifacts still
load. Browser-local presets can also be exported as
`photonic-bench-comparison-presets-v1` JSON and imported back with validation;
generated sidecar presets remain read-only.

The comparison dashboard also includes a contention insight panel that
highlights the best adjusted throughput, lowest adjusted latency, largest
shared-client count, largest calibration/control overhead, highest pressure
ratio, best contention-only loaded hierarchy bandwidth, best guardbanded loaded
hierarchy bandwidth, highest compute-window bandwidth utilization, and lowest
bandwidth headroom among the selected artifacts. It keeps the boundary label
explicit: these metrics are local shared-link, hierarchy, and guardband
assumptions, not paper-reported hardware claims.
The Energy Stack panel ranks selected artifacts by movement-to-compute energy,
dominant total-system energy component, compute/conversion share, movement
share, and largest single-tier share of total local system energy. These are
local decomposition diagnostics, not published energy-breakdown claims.
The Bottleneck Stack ranks selected artifacts by worst tier-local pressure,
dominant movement-energy tier, dominant traffic tier, bandwidth saturation tier,
bandwidth utilization, and bandwidth headroom so hierarchy problems are visible
before opening individual payloads.
The Comparison Review Checklist converts the current selection into
review-ready checks for pinned baseline availability, schema compatibility,
published-reference and source-quality coverage, provenance coverage, system
metric coverage, energy-split coverage, bandwidth phase-split coverage,
transformer boundary presence, and external/legacy payloads.
The adjacent Review Queue highlights the selected artifacts most worth manual
inspection for high contention transfer/compute ratio, high movement-to-compute
energy, high movement energy per hierarchy byte, worst tier-local pressure,
high compute-window bandwidth utilization, low bandwidth headroom, low
hierarchy intensity, or low source-confidence metadata. It is a local triage aid
only, not a failure label or hardware ranking.

Comparison results are exportable from the browser. `Download JSON` writes a
`photonic-bench-comparison-export-v1` object with selected artifact summaries,
analysis focus, active score profile, score weights, active filter/grouping
state, shareable `url_state`, visible artifact IDs, schema-grouped
recommendations with score explanations, grouped best-metric analysis,
provenance status, and modeling-boundary notes. Its formal schema is checked in at
`docs/photonic-bench-comparison-export-v1.schema.json`. `Download Markdown` and
`Copy Markdown` produce a human-readable table suitable for reviews or notes.
`Download CSV` writes a spreadsheet-friendly selected-artifact table with
focus, score weights, energy, timing, throughput, movement, loaded hierarchy
bandwidth split into contention-only and guardbanded phases, hierarchy
intensity, movement energy per hierarchy byte, dominant traffic/movement/system
energy tiers, memory bottleneck tier, worst tier pressure, largest tier movement
and system-energy shares, transfer/compute ratios, off-chip traffic share,
pressure ratios, bandwidth saturation tier, bandwidth utilization, bandwidth
headroom, provenance, source-quality, system-profile, and boundary tag columns
plus comparison-level boundary notes.

The visualizer accessibility pass keeps controls keyboard-reachable, adds
specific ARIA labels to comparison and pin controls, exposes mode button
pressed state, preserves visible focus outlines, and honors reduced-motion
preferences. Dense table and drawer layouts use stable dimensions so text and
controls do not overlap on desktop or mobile.

The visualizer can load external local JSON reports. Use
`Load external JSON reports` to select one or more PhotonicBench JSON files in
the browser. Files are parsed client-side, validated against the supported
per-matmul, transformer-layer, or transformer-model schema shape, and added to
the current session as `external/...` artifacts. This does not upload files,
write into `reports/`, or change the generated static index. The import panel
keeps visible per-file diagnostics: detected schema/version, accepted status,
missing required fields, unsupported schema reasons, and unexpected top-level
field warnings.

Source layout for the visualizer:

- `photonic_bench/visualizer.py`: discovery, schema-aware adapters, data asset
  generation, and template assembly.
- `photonic_bench/visualizer_assets/template.html`: generated HTML shell.
- `photonic_bench/visualizer_assets/styles.css`: workbench styling.
- `photonic_bench/visualizer_assets/app.js`: browser navigation, lazy payload
  loading, detail views, and comparison mode.

Browser smoke and visual regression coverage are checked in with the tests.
Install the development extras and run:

```powershell
python -m pip install -e ".[dev]"
python -m playwright install chromium
python -m pytest tests/test_visualizer_smoke.py
python -m pytest tests/test_visualizer_visual_regression.py
python -m pytest tests/test_visualizer_accessibility.py
```

The smoke test launches Chromium with Playwright, opens a generated visualizer,
loads generated and browser-local presets, verifies URL-state restoration,
custom score weights, score explanations, selection-drawer controls, comparison
analytics, JSON/Markdown/CSV exports, representative transformer and
per-matmul detail flows, comparison pinning, reduced-motion behavior, and
delta/ratio labels while failing on page or console errors. The accessibility
test uses axe-core through `axe-playwright-python` against representative
detail and comparison states; any automatically detectable axe violation fails
the test with affected targets listed in the assertion message.

The visual regression test captures desktop and mobile comparison screenshots,
a published-reference detail view, external-report rejection diagnostics, and a
wide BERT transformer comparison against checked baselines. It uses exact pixel
matching when the renderer is identical and a perceptual fallback so CI font
rasterization differences do not mask real layout regressions. When a
renderer-specific baseline exists, for example under
`tests/visual_baselines/github-linux/`, that baseline is preferred when
`VISUAL_REGRESSION_BASELINE_PLATFORM` names it. `darwin`, `mac`, and
`macos-latest` normalize to a `macos` baseline folder, but macOS PNG baselines
should only be checked in after capture on a real macOS runner. CI now includes
a strict `macOS visual regression` job on `macos-latest` that compares against
reviewed checked baselines in `tests/visual_baselines/macos/`. CI writes Linux
visual screenshots to `test-results/visual-regression/` and uploads them as a
visual regression artifact on every run, including passing pull request runs. To
intentionally refresh baselines after a reviewed UI change, run:

```powershell
$env:UPDATE_VISUAL_BASELINES='1'
$env:VISUAL_REGRESSION_BASELINE_PLATFORM='root'
python -m pytest tests/test_visualizer_visual_regression.py
Remove-Item Env:\UPDATE_VISUAL_BASELINES
Remove-Item Env:\VISUAL_REGRESSION_BASELINE_PLATFORM
```

Recent visualizer changes are summarized in `CHANGELOG.md`.

## Config Inspection

Use `inspect-config` to validate a config and print the normalized workload,
system profile, tier, and contention assumptions before generating artifacts:

```powershell
python -m photonic_bench.cli inspect-config examples/profile_sensitivity_64x64_pcie_attached.yaml
python -m photonic_bench.cli inspect-config examples/bert_base_12layer_model.yaml --kind transformer-model --json
```

`--kind auto` is the default and recognizes single-card matmul,
`transformer-layer`, and `transformer-model` configs from their top-level YAML
sections. The command is read-only and is meant for catching complex
transformer/system-profile mistakes before a longer artifact generation run.

Use `list-examples` when you want a repository-level inventory before choosing
what to run or compare:

```powershell
python -m photonic_bench.cli list-examples
python -m photonic_bench.cli list-examples --json
```

The table and JSON output include config path, detected kind, benchmark name,
workload summary, system profile, published-reference presence, source-quality
grade, and local surrogate type.

Use `validate-examples` when you want a fast repository health check before
regenerating reports:

```powershell
python -m photonic_bench.cli validate-examples
python -m photonic_bench.cli validate-examples --json
```

It loads every checked YAML example, reports path-aware validation failures,
and exits non-zero when any example is invalid.

## Artifact Freshness

Checked-in reports and visualizer outputs can be verified without mutating the
working tree:

```powershell
python -m photonic_bench.cli verify-artifacts
```

The command regenerates the checked example artifact set into a temporary
directory, copies `reports/visualizer_presets.json` as a visualizer input, and
byte-compares the expected outputs against `reports/`. It covers per-card
Markdown/JSON reports, transformer-layer and transformer-model artifacts,
`reports/comparison.md`, and the static `reports/visualizer/` bundle. Failures
list missing, unexpected, and stale paths with SHA-256 prefixes. CI runs this
command after Ruff, package build, and pytest.

## MLCommons-Style Proposal Draft

PhotonicBench now includes initial proposal foundation artifacts for a future
MLCommons-style photonic benchmark discussion:

- `docs/mlcommons_photonic_benchmark_proposal.md`: draft structure, scope,
  workload classes, metrics, reproducibility expectations, current MLCommons
  context links, PhotonicBench mapping, and open questions.
- `docs/mlcommons_photonic_reproducibility_checklist.md`: proposed package
  layout, manifest fields, artifact requirements, metric evidence, verification
  commands, review checklist, and audit questions.

These documents do not claim MLCommons acceptance or MLPerf result status. They
define a concrete starting point for benchmark standardization work while
preserving the existing separation between accounting artifacts, published
references, calibration fits, and future measured-system submissions.

## Comparison Tables

Use the `compare` command to generate a Markdown table from JSON cards:

```powershell
python -m photonic_bench.cli compare reports/matmul_64x64.json reports/nature_pace_64x64.json reports/nature_pace_64x64_calibrated.json reports/xu_11tops_convolution_surrogate.json reports/weight_stationary_64x64_batch.json reports/feldmann_2021_photonic_tensor_core_surrogate.json reports/pappas_2025_awgr_262tops_surrogate.json reports/taichi_2024_chiplet_surrogate.json reports/hitop_2025_optical_tensor_processor_surrogate.json reports/lin_2024_tfln_120gops_tensor_core_surrogate.json reports/meng_2025_mrr_otpu_tensor_core_surrogate.json reports/luan_2026_single_shot_mmm_surrogate.json reports/bandyopadhyay_2024_single_chip_dnn_surrogate.json reports/kari_2024_coherent_matrix_platform_surrogate.json reports/dong_2023_continuous_time_tensor_core_surrogate.json --report reports/comparison.md
```

The comparison table is generated from `local_model`, `published_reference`,
`calibration_fit`, and `provenance` fields in JSON. It includes local energy,
system energy, movement energy, movement share, interface bytes, operational
intensity, timing, throughput, bandwidth-limited throughput,
contention-adjusted latency/throughput, tier bottleneck summaries, bandwidth
saturation/headroom diagnostics, and selected published metrics. For published
cards it also shows source grade, surrogate type, and key-dimension coverage.
Missing optional paper or quality fields are rendered as `n/a` instead of
guessed.

## Calibration Fitting

Calibration fitting is optional and explicit. It solves one selected scalar component-model parameter so `local_model.energy.total_pj` matches a paper-derived total-energy target from the `published_calibration` section.

Example:

```powershell
python -m photonic_bench.cli run examples/nature_pace_64x64.yaml --report reports/nature_pace_64x64_calibrated.md --json-report reports/nature_pace_64x64_calibrated.json --fit-target published-including-lasers --fit-parameter device.dac.energy_pj_per_conversion
```

Supported targets:

- `published-including-lasers`: fit to the published including-lasers TOPS/W converted to total workload energy.
- `published-excluding-lasers`: fit to the published excluding-lasers TOPS/W converted to total workload energy.

Supported fitted parameters:

- `device.optical_mac_energy_fj`
- `device.laser_wall_plug_efficiency`
- `device.photodetector_energy_fj_per_sample`
- `device.adc.energy_pj_per_conversion`
- `device.dac.energy_pj_per_conversion`
- `device.vector_dac.energy_pj_per_conversion`
- `device.weight_dac.energy_pj_per_conversion`

The output records the target, target source, original value, fitted value, pre-fit local energy, post-fit local energy, fit error, and assumptions. The fitted result is reported under a separate `calibration_fit` section and does not overwrite the local model inputs or paper-reported reference fields.

## Project Files

- `photonic_bench/config.py`: YAML loading and validation.
- `photonic_bench/model.py`: energy, timing, and noise calculations.
- `photonic_bench/report.py`: Markdown benchmark card rendering.
- `photonic_bench/json_report.py`: machine-readable JSON card rendering.
- `photonic_bench/comparison.py`: Markdown comparison table rendering from JSON cards.
- `photonic_bench/transformer.py`: transformer-layer shape helpers and aggregate layer comparison rendering.
- `photonic_bench/visualizer.py`: web visualizer discovery, schema-aware loading, template assembly, static asset writing, and local server routing.
- `photonic_bench/visualizer_assets/`: source HTML, CSS, and JavaScript assets for the generated visualizer.
- `tests/test_visualizer_smoke.py`: Playwright browser smoke test for the generated visualizer.
- `docs/mlcommons_photonic_benchmark_proposal.md`: MLCommons-style photonic benchmark proposal foundation.
- `docs/mlcommons_photonic_reproducibility_checklist.md`: proposal package and audit checklist.
- `docs/photonic-bench-transformer-layer-report-v1.schema.json`: machine-readable aggregate transformer-layer JSON Schema.
- `photonic_bench/cli.py`: command-line entry point.
- `docs/json_schema.md`: JSON schema guide, units, nullability, and examples.
- `docs/photonic-bench-report-v1.schema.json`: machine-readable JSON Schema.
- `examples/matmul_64x64.yaml`: first example workload.
- `examples/nature_pace_64x64.yaml`: source-backed Nature PACE calibration card config.
- `examples/xu_11tops_convolution_surrogate.yaml`: source-backed Xu 2021 convolution accelerator card encoded as a labeled matmul surrogate.
- `examples/feldmann_2021_photonic_tensor_core_surrogate.yaml`: source-backed Feldmann 2021 photonic tensor core card encoded as a labeled matmul surrogate.
- `examples/pappas_2025_awgr_262tops_surrogate.yaml`: source-backed Pappas 2025 AWGR accelerator card encoded as a labeled matmul surrogate.
- `examples/taichi_2024_chiplet_surrogate.yaml`: source-backed Taichi 2024 chiplet card encoded as a labeled matmul surrogate.
- `examples/weight_stationary_64x64_batch.yaml`: synthetic realism example for reuse, stationarity, pipelining, and separate DACs.
- `examples/transformer_small_sanity.yaml`: tiny transformer-layer formula sanity example.
- `examples/bert_base_encoder_layer.yaml`: BERT-base style encoder-layer shape helper example.
- `examples/gpt_style_decoder_layer.yaml`: GPT-style decoder-layer shape helper example.
- `examples/load_report_json.py`: small programmatic JSON loading example.
- `reports/visualizer/index.html`: generated static web visualizer.
- `reports/visualizer_presets.json`: generated comparison preset sidecar.
- `tasks/goal-prompt.md`: first-task execution prompt.
- `tasks/todo.md`: live task ledger.
