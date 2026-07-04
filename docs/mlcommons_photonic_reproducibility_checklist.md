# Photonic Benchmark Reproducibility Checklist

Status: draft foundation for MLCommons-style proposal work.

This checklist turns the proposal draft into auditable package requirements.
It is intentionally stricter than the current PhotonicBench implementation so
it can guide future work.

## Package Layout

```text
photonicbench-submission/
  README.md
  manifest.json
  environment/
    python.txt
    platform.json
    dependency-lock.txt
  configs/
    *.yaml
  reports/
    *.md
    *.json
  schemas/
    photonic-bench-report-v1.schema.json
    photonic-bench-transformer-layer-report-v1.schema.json
  provenance/
    sources.json
    citations.md
  verification/
    command-transcript.txt
    pytest.log
    ruff.log
    schema-validation.log
    formula-audit.log
  visualizer/
    index.html
    assets/
    data/
```

## Required Manifest Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `package_schema_version` | yes | Version the package contract separately from report JSON. |
| `photonic_bench_version` | yes | Tie artifacts to the tool version or commit. |
| `git_commit` | yes | Identify exact source state. |
| `generated_at_utc` | yes | Timestamp regeneration. |
| `generator_command` | yes | Re-run path for the package. |
| `artifacts` | yes | List configs, Markdown reports, JSON reports, schemas, and hashes. |
| `source_references` | yes | List paper URLs, DOI values, titles, and claim status. |
| `modeling_boundary` | yes | Declare accounting-only, measured-SUT, or mixed package. |
| `excluded_operations` | yes | Preserve transformer/non-matmul exclusions. |
| `verification` | yes | Point to test, lint, schema, and formula-audit logs. |

## Artifact Requirements

- Every generated JSON report must validate against a checked-in JSON Schema.
- Every Markdown report must have a paired JSON report unless it is explicitly
  documented as human-only.
- Every source-backed card must keep `published_reference` separate from
  `local_model`.
- Every calibration fit must state the fitted parameter, source target, original
  value, fitted value, pre-fit error, post-fit error, and separation note.
- Every transformer aggregate must include:
  - shape fields;
  - five decomposed matmul entries;
  - formula audit rows;
  - serial timing language;
  - non-additive noise language;
  - exclusions.
- Generated visualizer assets must not be discovered as source reports during
  regeneration.

## Metric Requirements

| Metric class | Required evidence |
| --- | --- |
| Workload size | Shape, MAC formula, equivalent-op rule, output element count. |
| Local energy | Component table, total pJ, per-MAC pJ, per-equivalent-op pJ. |
| Timing | Single-operation latency, batch latency, pipeline/steady-state note. |
| Throughput | Formula and whether it is steady-state, serial aggregate, or measured scenario. |
| Conversions | ADC, vector DAC, weight DAC, total DAC, and stationarity assumptions. |
| Noise | Quantization, phase, drift, estimated relative error, and non-additivity note. |
| Published reference | Source title, URL/DOI when available, reported fields, and separation note. |
| Full-system power | Only allowed in measured-SUT packages with measurement boundary, method, and logs. |

## Verification Commands

Current PhotonicBench commands that should appear in a proposal package
transcript:

```powershell
python -m pytest
python -m ruff check
python -m photonic_bench.cli visualize --reports-dir reports --output reports/visualizer/index.html
python -m pytest tests/test_visualizer_smoke.py
```

Future package command target:

```powershell
python -m photonic_bench.cli package --reports-dir reports --output photonicbench-submission
```

## Review Checklist

- The package never calls itself an MLPerf or MLCommons result.
- The package declares whether each artifact is accounting-only or measured.
- The package does not rank mixed-schema metrics without caveats.
- The package does not report full-system power from component estimates.
- The package does not sum transformer aggregate noise into a layer error.
- The package does not claim fused transformer scheduling from serial summaries.
- The package does not hide excluded operations.
- The package does not scrape Markdown as the machine interface.
- The package has deterministic regeneration commands and logs.
- The package can be reviewed without private absolute paths.

## Audit Questions

1. Can a reviewer regenerate every JSON report from YAML inputs?
2. Do generated JSON hashes match the manifest?
3. Do schema validators pass for every JSON artifact?
4. Are source-backed claims traceable to a source title, URL, DOI, or paper
   table?
5. Are local estimates clearly separated from paper-reported values?
6. Are calibration fits explicit and reproducible?
7. Are all non-matmul exclusions visible in transformer aggregates?
8. Are same-schema comparisons meaningful and mixed-schema comparisons labeled?
9. If measured-SUT data exists, is the system boundary documented?
10. If power data exists, is it measured for the benchmark run rather than
    inferred from a device rating?
