# MLCommons-Style Photonic Benchmark Proposal Plan

Status: superseded by concrete proposal draft artifacts.

Primary artifacts:

- `docs/mlcommons_photonic_benchmark_proposal.md`
- `docs/mlcommons_photonic_reproducibility_checklist.md`

This file remains as the original planning note. The docs above are now the
active proposal foundation.

## Goal

Prepare PhotonicBench for a future MLCommons-style photonic AI benchmark
proposal. This is a planning artifact, not a claim that PhotonicBench is an
MLCommons benchmark or that the current local model is standard-ready.

## Current Evidence

PhotonicBench currently provides:

- Reproducible YAML configs for matmul benchmark cards.
- Source-backed published-reference cards for existing photonic accelerator
  papers.
- Local component-model estimates for energy, timing, conversion counts, and
  noise.
- Optional one-parameter calibration fitting against paper-derived energy
  targets.
- Transformer-layer shape helpers that decompose a layer into five dense
  matmul cards.
- Aggregate transformer-layer JSON with formula audits, totals, per-matmul
  breakdowns, assumptions, exclusions, and provenance.
- Passing verification:
  - `python -m pytest`
  - `python -m ruff check`

These are useful ingredients, but they are not yet a benchmark standard.

## Scope Candidate

Initial proposal scope should focus on photonic matmul and transformer-layer
accounting:

- Dense matrix-vector and matrix-matrix workloads.
- Source-backed accelerator reference cards.
- Transformer layer shapes:
  - small sanity shape
  - BERT-base style encoder layer
  - GPT-style decoder layer
- Explicitly excluded from v0:
  - full-model end-to-end accuracy
  - training
  - sparsity
  - KV-cache incremental decoding
  - non-matmul memory traffic
  - device-level optical simulation

## Candidate Metrics

Required local-model metrics:

- MACs
- equivalent ops
- total energy pJ
- energy per MAC pJ
- energy per equivalent op pJ
- conversion counts:
  ADC, vector DAC, weight DAC, total DAC
- timing:
  single-operation latency
  batch latency
  steady-state per-card throughput
  serial aggregate transformer-layer latency
- noise diagnostics:
  quantization RMS
  phase noise RMS
  drift RMS
  estimated relative error RMS

Required provenance and boundary fields:

- source title, URL, DOI, venue, claim status when source-backed
- published reference fields separated from local model estimates
- assumptions
- exclusions
- schema version

## Reproducibility Requirements

A proposal-quality benchmark package should include:

- YAML input configs.
- Generated Markdown reports for human review.
- Generated JSON reports for machine ingestion.
- JSON schema files.
- A command transcript or script that regenerates every artifact.
- Tests that verify:
  - formula totals
  - schema presence
  - aggregate totals from decomposed cards
  - published/local separation
  - deterministic filenames
- A versioned release bundle with no private absolute paths in artifacts.

## Proposal Structure

1. Motivation
   - Photonic accelerator claims are hard to compare because papers mix device
     assumptions, paper-reported throughput, local reproductions, and workload
     definitions.

2. Benchmark boundary
   - PhotonicBench v0 is an auditable accounting benchmark for matmul-centric
     workloads, not a device simulator or model-accuracy benchmark.

3. Workload definitions
   - Matmul card schema.
   - Transformer-layer decomposition formulas.
   - Required shape parameters.

4. Metrics and units
   - Energy, timing, noise, throughput, and provenance fields.

5. Artifact format
   - YAML config inputs.
   - Markdown card outputs.
   - Per-card JSON schema.
   - Aggregate transformer-layer JSON schema.

6. Validation
   - Formula tests.
   - Schema checks.
   - Regeneration commands.
   - Review checklist for overclaim prevention.

7. Roadmap to standardization
   - Add more paper-backed reference cards.
   - Add cross-lab review of metric definitions.
   - Add optional measured-device ingestion fields.
   - Add web visualizer for artifact review.
   - Define acceptance criteria for new benchmark cards.

## Open Questions

- Which photonic hardware classes should v0 include or exclude?
- Should benchmark cards normalize by delivered optical energy, electrical
  wall-plug energy, or both in headline comparisons?
- How should measured-device data be represented without weakening the current
  local/published separation?
- What minimum provenance should be required for source-backed cards?
- Should transformer aggregates eventually model fused scheduling, or should
  serial aggregation remain the baseline until measured schedules exist?
- What review body or maintainer process would accept new photonic benchmark
  cards?

## First Proposal Milestones

1. Freeze the current JSON schemas as v1 draft artifacts.
2. Add a regeneration script for all checked-in examples.
3. Add at least one more source-backed photonic accelerator card.
4. Build the web visualizer to make artifact review easier.
5. Draft a short proposal memo using the structure above.
6. Seek external technical review from photonic accelerator and ML benchmarking
   experts before making any standards claim.
