# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: complete and verified.

## Objective

Improve PhotonicBench for practical daily use by advancing three areas in
priority order:

1. significantly improve the web visualizer, especially comparison and
   analytical workflows;
2. add at least 2-3 high-quality, source-backed published photonic accelerator
   cards with clear provenance;
3. improve core modeling realism and/or make full transformer-model analysis
   more convenient.

## Required Outcomes

1. Visualizer comparison mode is meaningfully more useful for daily analysis:
   - richer analytical summaries for energy, throughput, latency, calibration,
     provenance, and modeling-boundary interpretation;
   - support for saved comparison presets that survive regeneration through
     committed configuration or generated assets;
   - exportable comparison results in at least one machine-readable and one
     human-readable form.
2. Published-card coverage expands by at least 2-3 new paper-backed cards:
   - each new card has a YAML config, generated Markdown report, generated JSON
     report, source citation details, and explicit local-model-vs-published
     boundary language;
   - published claims are carried as provenance/reference data, not silently
     mixed into local component-model estimates.
3. Modeling or transformer support improves measurably:
   - component model realism improves in an auditable way, or
   - transformer support gains a more convenient full-model workflow, with clear
     assumptions and exclusions.
4. Documentation is updated for all new user-facing behavior:
   - README usage;
   - model/schema docs where relevant;
   - visualizer workflow notes where relevant.
5. Verification is run before checklist items are marked done:
   - focused unit tests for new behavior;
   - full `python -m ruff check`;
   - full `python -m pytest`;
   - local visualizer generation;
   - manual or automated browser smoke coverage for the visualizer.
6. A mandatory Hostile Senior Reviewer critique is recorded after substantial
   visualizer and card progress, focused on usability and modeling clarity.
   Important findings are fixed or explicitly justified.
7. `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and
   `tasks/todo.md` are kept current, with proof attached to completed checklist
   items.

## Scope

In scope:

- Static and served web visualizer improvements.
- Comparison analytics, saved presets, and exports.
- New published photonic accelerator example configs and generated reports.
- Auditable component-model or transformer-workflow improvements.
- Tests, docs, generated example artifacts, and reviewer critique.

Out of scope unless explicitly requested:

- Hosted backend service.
- File upload workflow.
- Formal MLCommons submission.
- Release publishing automation.
- Replacing source-backed published references with unsupported local claims.

## Priority Order

1. Visualizer improvements.
2. New published accelerator cards.
3. Modeling and transformer-support improvements.

Parallel work is allowed when it reduces risk or verification time, but the
visualizer remains the highest-value daily-use surface.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` have
  been re-read at the start of each cycle.
- All checklist items are marked DONE with proof.
- The visualizer has substantially better comparison and analytical features,
  including saved presets or export support.
- At least 2-3 new high-quality published cards have been added and regenerated.
- Modeling realism or transformer support has measurably improved.
- Documentation reflects all user-facing changes.
- Full local verification passes.
- Browser visualizer verification passes.
- The mandatory Hostile Senior Reviewer critique is complete and major issues
  are addressed.
- Final local git status is inspected, and any commit/push work requested or
  appropriate for the goal is completed.

## Implementation Evidence

- Visualizer:
  - comparison brief, richer grouped analytics, operational-intensity ranking,
    interface-traffic metrics, generated/local presets, and JSON/Markdown
    export are implemented.
- Cards:
  - Feldmann 2021, Pappas 2025, and Taichi 2024 source-backed surrogate cards
    were added with YAML, Markdown, JSON, provenance, DOI/source details, and
    explicit surrogate assumptions.
- Modeling:
  - converter-interface memory traffic and operational intensity were added to
    matmul reports and transformer aggregate reports.
- Critique:
  - mandatory Hostile Senior Reviewer critique was completed and important
    usability/modeling-clarity findings were fixed.
- Verification:
  - `node --check photonic_bench\visualizer_assets\app.js` passed;
  - `python -m ruff check` passed;
  - `python -m photonic_bench.cli visualize --reports-dir reports --output
    reports/visualizer/index.html` produced 26 artifacts and 0 warnings;
  - `python -m pytest` passed with 77 tests.
