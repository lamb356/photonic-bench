# MLCommons-Style Photonic Benchmark Proposal Draft

Status: draft foundation, not an MLCommons submission; this does not claim MLCommons acceptance.

Last context check: 2026-07-04.

## Source Context

This proposal is patterned after current public MLCommons and MLPerf materials,
but it does not claim that PhotonicBench is an MLCommons benchmark and does
not claim MLCommons acceptance.

- MLCommons benchmark work emphasizes fair comparison, reproducibility, useful
  measurement, and benchmark working groups that define the model, data set,
  rules, allowed changes, and quality metrics:
  <https://mlcommons.org/benchmarks/>
- The MLPerf Inference submission guide describes divisions, categories, system
  types, scenarios, LoadGen responsibilities, accuracy checking, submission
  checkers, and final tarball packaging:
  <https://docs.mlcommons.org/inference/submission/>
- MLPerf Inference rules define fairness, consistent system/framework use,
  shared implementations, deterministic constraints, benchmark-detection
  restrictions, input-optimization restrictions, replicability, system under
  test, reference implementation, and run-result concepts:
  <https://github.com/mlcommons/inference_policies/blob/master/inference_rules.adoc>
- MLCommons Power working group material frames energy efficiency as a system
  measurement problem and calls out power result metrics and approved
  measurement techniques:
  <https://mlcommons.org/working-groups/benchmarks/power/>
- MLPerf Inference Datacenter result pages state that power measurements are
  valid only for the benchmark run and that MLPerf Power validates full-system
  power rather than arbitrary device or rating claims:
  <https://mlcommons.org/benchmarks/inference-datacenter/>
- MLPerf Tiny summaries show a compact benchmark family where each benchmark is
  defined by a dataset, quality target, model, mode, and result metric:
  <https://mlcommons.org/benchmarks/inference-tiny/>
- MLPerf audit guidelines require system documentation, software documentation,
  reproduction of results, compliance checks, methodology explanation, and
  suspicious-behavior review:
  <https://github.com/mlcommons/inference_policies/blob/master/MLPerf_Audit_Guidelines.adoc>

## One-Page Proposal

Photonic accelerator papers and prototypes often report numbers at different
boundaries: optical device energy, electrical conversion energy, host-system
power, local component-model estimates, paper-reported throughput, calibrated
surrogates, and shape-specific transformer accounting. A useful
MLCommons-style photonic benchmark should make those boundaries explicit before
it tries to rank systems.

PhotonicBench v0 should therefore begin as an auditable accounting benchmark
for matmul-centric photonic acceleration. Its first job is not to certify a
full MLPerf result; it is to define reproducible workload cards, explicit units,
machine-readable artifacts, and review rules that prevent device-level, local
model, paper-derived, and full-system claims from being collapsed into one
number.

The proposed benchmark foundation has two tracks:

1. Accounting Track
   - Runs today in PhotonicBench.
   - Produces YAML input configs, Markdown reports, JSON reports, schema
     validation, formula audits, provenance, assumptions, exclusions, and
     optional calibration fits.
   - Compares photonic matmul and transformer-layer accounting without claiming
     measured full-system performance.

2. Measured-SUT Track
   - Future work.
   - Adds real system-under-test execution, repeatable workload generation,
     accuracy or numeric-fidelity checks, full-system power measurement rules,
     and audit-ready system descriptions.
   - Should be designed with MLPerf-style LoadGen, scenario, result-checker, and
     audit concepts in mind.

## Charter

The benchmark should answer four questions:

1. What workload was measured or modeled?
2. At what hardware and system boundary was energy, latency, throughput, noise,
   or accuracy measured?
3. Can another reviewer regenerate or reproduce the artifact?
4. Does the report clearly separate local estimates, published references,
   calibration fits, and measured system results?

## Non-Goals

The v0 proposal must not claim:

- MLCommons acceptance.
- MLPerf result validity.
- full-model end-to-end accuracy.
- fused transformer scheduling.
- full-system power unless a measured-SUT package supplies it.
- device-level optical simulation.
- equivalence between local component models and published measurements.

## Candidate Divisions

| Division | Purpose | Allowed flexibility | PhotonicBench v0 mapping |
| --- | --- | --- | --- |
| Closed-style Accounting | Compare the same workload formulas and artifact schema. | Same workload shape, same accounting formulas, same required fields. | Current YAML to JSON cards and transformer aggregate summaries. |
| Open-style Accounting | Let researchers propose alternate photonic assumptions or mappings. | Must disclose formula changes, model changes, and source of each assumption. | Future config extensions with explicit non-comparable tags. |
| Measured-SUT | Measure hardware/software systems under a repeatable workload harness. | Must disclose SUT, software, calibration, and measurement boundary. | Future track; not implemented today. |

## Candidate Availability Categories

Use MLPerf-like language because photonic systems are often prototypes:

- Available: components and software are purchasable or otherwise accessible to
  third parties.
- Preview: expected to become available by a declared future round.
- Research, Development, or Internal: experimental, lab-only, unpublished, or
  internal systems.

Every result should carry one category and the evidence for that category.

## Workload Scope

### V0 Required Workloads

1. Dense matmul card
   - Shape: `m x k` by `k x n`.
   - Required fields: MACs, equivalent ops, output elements, energy components,
     timing, conversion counts, noise diagnostics, assumptions, provenance.

2. Matrix-vector calibration card
   - Captures accelerator papers that report matrix-vector photonic operation
     points.
   - Must retain published reference values separately from local model output.

3. Weight-stationary batch matmul card
   - Captures operand reuse, vector DAC conversions, weight DAC conversions, and
     pipeline cycle behavior.

4. Transformer-layer aggregate
   - Decomposes a layer into QKV projection, attention scores, attention value,
     MLP up-projection, and MLP down-projection.
   - Reports serial aggregate timing, total energy, formula audits, per-matmul
     breakdowns, assumptions, exclusions, and non-additive noise diagnostics.

### V0 Exclusions

- softmax.
- layer normalization.
- bias adds.
- activation functions.
- dropout.
- attention masking.
- KV-cache incremental decoding.
- causal triangular halving unless explicitly modeled.
- non-matmul memory traffic.
- measured host orchestration overhead.
- wall-plug power.

## Metrics Registry

| Metric | Unit | Direction | Required in Accounting Track | Required in Measured-SUT Track | Boundary note |
| --- | --- | --- | --- | --- | --- |
| MACs | count | context | yes | yes | Workload definition, not a result claim. |
| Equivalent ops | count | context | yes | yes | Uses 2x MAC accounting. |
| Output elements | count | context | yes | yes | Helps normalize converter activity. |
| Total local energy | pJ | lower | yes | optional | Local model estimate only. |
| Energy per MAC | pJ/MAC | lower | yes | optional | Derived from local model unless measured. |
| Energy per equivalent op | pJ/op | lower | yes | optional | Current visualizer uses this for same-schema comparison. |
| ADC conversions | count | lower | yes | yes | Must state ADC precision and reuse assumptions. |
| Vector DAC conversions | count | lower | yes | yes | Separate from weight DAC conversions. |
| Weight DAC conversions | count | lower | yes | yes | Must disclose stationarity/reprogramming assumptions. |
| Single-operation latency | ns | lower | yes | yes | Not enough for throughput without batch/scenario context. |
| Batch latency | ns | lower | yes | yes | Card-level timing. |
| Serial layer latency | ns | lower | transformer only | transformer only | Serial sum, not a fused schedule. |
| Throughput | equivalent ops/s | higher | yes | yes | Must state steady-state or scenario definition. |
| Quantization RMS | relative RMS | lower | yes | yes | Numeric-fidelity diagnostic, not model accuracy. |
| Phase noise RMS | relative RMS | lower | yes | yes | Must state source and independence assumptions. |
| Drift RMS | relative RMS | lower | yes | yes | Must state time horizon if measured. |
| Estimated relative error RMS | relative RMS | lower | yes | yes | Should not be summed across aggregates without a rule. |
| Full-system power | W | lower | no | yes, if power result | Must be measured at the system boundary, not inferred from TDP or component rating. |
| Energy per stream/query | J | lower | no | scenario-dependent | Future scenario metric for measured-SUT submissions. |
| Accuracy or numeric fidelity | task-specific | higher/lower | numeric diagnostic only | yes | Full inference needs task quality targets; accounting v0 needs numeric error thresholds. |

## Proposal Draft Structure

1. Executive summary
   - Why photonic accelerator benchmarking needs boundary-safe artifacts.

2. Benchmark scope
   - Accounting Track.
   - Measured-SUT Track.
   - Non-goals and excluded operations.

3. Definitions
   - Photonic benchmark card.
   - Published reference.
   - Local model estimate.
   - Calibration fit.
   - System under test.
   - Numeric-fidelity target.

4. Workloads
   - Dense matmul.
   - Matrix-vector calibration.
   - Weight-stationary batch matmul.
   - Transformer-layer aggregate.

5. Metrics and units
   - Metric registry.
   - Directionality.
   - Required provenance.
   - Compatibility rules.

6. Artifact format
   - YAML config.
   - Markdown report.
   - Per-matmul JSON.
   - Transformer aggregate JSON.
   - JSON Schema.
   - Visualizer bundle.
   - Regeneration transcript.

7. Reproducibility requirements
   - Deterministic generation.
   - Environment disclosure.
   - Source citations.
   - Schema validation.
   - Formula audit.
   - Hashes or manifest.

8. Review and audit model
   - Static artifact review.
   - Regeneration review.
   - Measured-SUT audit extension.
   - Forbidden claim checklist.

9. Roadmap
   - Freeze v1 schema draft.
   - Add regeneration script.
   - Add more source-backed cards.
   - Define numeric-fidelity thresholds.
   - Prototype measured-SUT harness.
   - Seek external review from photonic accelerator and benchmark experts.

## PhotonicBench Mapping

| Proposal need | Current support | Gap |
| --- | --- | --- |
| YAML inputs | Supported in `examples/`. | Need manifest tying examples to generated artifacts. |
| JSON artifacts | Supported for per-matmul and transformer aggregate reports. | Need schema-version freeze policy. |
| Human reports | Supported via Markdown. | Need proposal-grade report checklist. |
| Formula audits | Supported for transformer aggregates. | Need dense-card manifest audit. |
| Published/local separation | Supported. | Need more source-backed cards. |
| Calibration fits | Supported for one scalar target. | Need policy for multi-parameter fits or forbid them. |
| Visual review | Supported by web visualizer. | Need proposal-specific review checklist view. |
| Reproducibility package | Partially supported. | Need one command/script to regenerate all checked-in artifacts. |
| Full-system measurement | Not supported. | Future measured-SUT track. |
| MLCommons submission checker | Not supported. | Future checker inspired by MLPerf packaging rules. |

## Reproducibility Requirements

A proposal-quality package should include enough information for an independent
reviewer to regenerate artifacts and inspect every benchmark boundary:

- exact PhotonicBench commit or release tag;
- Python version and dependency lock or equivalent environment capture;
- YAML configs for every card;
- generated Markdown and JSON reports;
- JSON Schema files used for validation;
- command transcript for generation, tests, lint, schema validation, and
  visualizer generation;
- source manifest for every paper-derived value;
- hashes for generated artifacts;
- explicit modeling boundary labels for accounting-only versus measured-SUT
  outputs;
- forbidden-claims checklist confirming that local estimates, published values,
  calibration fits, and measured system results are not conflated.

## Open Questions

1. Should v0 stay strictly accounting-only, or should it include an experimental
   measured-SUT appendix?
2. What numeric-fidelity threshold should replace full model accuracy for
   matmul-only workloads?
3. Should transformer-layer aggregate metrics remain serial-only until measured
   schedules exist?
4. Which energy boundary should be headline in accounting results:
   local optical/device energy, electrical conversion energy, or both?
5. How should full-system power be reported for hybrid host plus photonic
   accelerator systems?
6. What minimum source evidence is required before a paper-derived value can
   enter `published_reference`?
7. Should Open-style accounting allow alternate formulas if schema tags make
   them non-comparable?
8. What is the right analog of MLPerf LoadGen for matmul-only photonic
   prototypes?
9. Who reviews new benchmark cards, and what constitutes acceptance?
10. Should a proposal round require a public artifact tarball with all generated
    JSON, Markdown, schema, environment, and source manifests?

## Immediate Next Work

1. Add a reproducibility checklist artifact for proposal packages.
2. Add a regeneration manifest tying checked-in examples to expected reports.
3. Add a proposal-specific forbidden-claims checklist.
4. Add at least one more source-backed photonic accelerator card.
5. Prototype a `photonic-bench package` command that emits a deterministic
   review bundle.
