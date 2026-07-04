# PhotonicBench TODO

## Done Before This Goal

- [x] Build the first tested CLI slice for a photonic matmul benchmark card.
- [x] Calibrate the 64x64 example against a published photonic accelerator paper.
- [x] Add source citations and assumption notes to benchmark card reports.
- [x] Implement JSON export beside Markdown reports.
- [x] Add calibration fitting mode.
- [x] Improve component model realism: operand reuse, weight-stationary behavior,
      pipelining, and separate vector/weight DAC handling.
- [x] Add a second published photonic accelerator benchmark card.
- [x] Add comparison tables across cards.
- [x] Create clear JSON schema documentation and usage examples.
- [x] Add transformer-layer shape helpers with YAML integration.
- [x] Generate decomposed transformer per-matmul Markdown and JSON artifacts.
- [x] Generate aggregate transformer-layer Markdown comparison artifacts.
- [x] Test transformer helper MAC/op formulas and CLI generation.
- [x] Document transformer helper usage, formulas, assumptions, and artifact
      layout.
- [x] Add aggregate transformer-layer JSON output.
- [x] Test aggregate JSON structure, totals, CLI behavior, and docs.
- [x] Document aggregate JSON usage and regenerate example artifacts.
- [x] Run full aggregate JSON verification and hostile senior reviewer critique.
- [x] Complete transformer-layer hardening:
      path-aware errors, strict aggregate validation, schema tightening,
      regenerated examples, docs, tests, and critique fixes.
- [x] Create gated web visualizer planning artifact.
- [x] Create gated MLCommons-style photonic benchmark proposal planning artifact.

## Active Goal: Hardened Baseline Commit And Initial Web Visualizer

- [ ] Task 1: Commit the current hardened PhotonicBench baseline.
- [ ] Task 2: Add artifact discovery and indexing over report directories.
- [ ] Task 3: Add schema-aware loading for per-matmul and aggregate JSON.
- [ ] Task 4: Build the initial static visualizer UI.
- [ ] Task 5: Build a basic transformer-layer aggregate detail view.
- [ ] Task 6: Document visualizer usage and run verification.
- [ ] Task 7: Run mandatory hostile senior reviewer critique and fix important
      findings.

## Explicitly Not Active In This Goal

- [ ] Full comparison dashboard.
- [ ] File upload workflow.
- [ ] Backend web service.
- [ ] MLCommons-style proposal implementation.
