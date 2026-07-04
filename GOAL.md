# PhotonicBench Goal

Date started: 2026-07-04
Implementation status: active.

## Objective

Advance PhotonicBench across five areas to make it significantly more useful
for daily analysis of photonic accelerators:

1. extend the memory traffic model into a fuller multi-tier system model with
   explicit SRAM and off-chip/DRAM interface tiers, bandwidth limits, and
   data-movement energy;
2. improve support for full transformer models beyond single-layer aggregation;
3. add at least 2-3 more high-quality source-backed published photonic
   accelerator cards, especially newer GEMM/tensor processor results;
4. add Pareto-style charting to the visualizer for trade-off analysis;
5. prepare a limited foundation for optional file upload or external report
   loading after the local workflow is solid.

## Priority Order

1. Fuller system model.
2. Pareto charting in the visualizer.
3. Full transformer model support.
4. More published cards.
5. Limited external report loading foundation.

The first implementation cycle must prioritize the system model and Pareto
charting before broadening into lower-priority work.

## Required Outcomes

1. System model:
   - add explicit tiers, at minimum SRAM and off-chip/DRAM interface;
   - track tier bytes, bandwidth-limited transfer time, and movement energy;
   - expose compute energy versus movement energy in Markdown reports, JSON
     reports, comparison tables, schemas, docs, and visualizer detail views;
   - keep the model auditable and separate from published paper numbers.
2. Pareto visualizer:
   - add useful Pareto-style visualizations, including energy/op vs throughput
     and ops/byte vs latency;
   - identify or visually distinguish frontier points;
   - keep mixed-schema and missing-data behavior clear.
3. Full transformer support:
   - add a convenient way to define and analyze multi-layer/full transformer
     models;
   - preserve backward compatibility for existing `transformer-layer` usage;
   - keep decomposed-card auditability.
4. Published cards:
   - add at least 2-3 new source-backed cards with YAML configs, generated
     Markdown and JSON reports, DOI/source details where available, paper
     metrics, and explicit surrogate labels.
5. External loading foundation:
   - add a limited design and basic local-file/external-report loading path only
     after the system model, Pareto view, transformer support, and cards have
     meaningful progress;
   - validate loaded reports and keep failures clear.
6. Documentation and verification:
   - update README, model docs, schema docs, generated reports, and visualizer
     docs for all user-facing changes;
   - run focused tests, full `python -m ruff check`, full `python -m pytest`,
     local visualizer generation, and browser visualizer smoke tests before
     marking checklist items done.
7. Mandatory critique:
   - after substantial system-model and Pareto progress, run a Hostile Senior
     Reviewer critique focused on modeling clarity, usability, and daily
     analysis value;
   - fix important findings or explicitly justify non-fixes.

## Scope

In scope:

- Matmul report model extensions for multi-tier memory movement.
- Transformer aggregate extensions and full-model helper workflows.
- Static and served visualizer improvements.
- Pareto charting and trade-off analytics.
- New published photonic accelerator surrogate cards.
- Local-file/external report loading foundation with validation.
- Tests, docs, generated artifacts, state files, critique, commit/PR workflow.

Out of scope unless explicitly requested:

- Hosted backend service.
- Formal MLCommons submission.
- Release publishing automation.
- Unsupported claims that local formulas reproduce source-paper device results.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` have
  been re-read at the start of each cycle.
- All checklist items are marked DONE with proof.
- A fuller multi-tier system model is implemented and exposed in reports and
  the visualizer.
- Pareto-style charting exists in the visualizer and is useful for trade-off
  analysis.
- At least 2-3 new high-quality published cards have been added and
  regenerated.
- Full transformer model support has been improved beyond single-layer
  aggregation.
- Basic external report loading preparation is implemented after core work.
- Documentation reflects all user-facing changes.
- Full local verification passes.
- Browser visualizer verification passes.
- The mandatory Hostile Senior Reviewer critique is complete and major issues
  are addressed.
- Final repository status is inspected and the protected-branch workflow is
  completed if this goal produces committable changes.
