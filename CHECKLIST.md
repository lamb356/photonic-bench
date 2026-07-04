# PhotonicBench Commit And Visualizer Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.

## Cycle Control

- [x] DONE: Roll state files forward to the commit plus initial visualizer goal.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`
      describe the baseline commit plus initial web visualizer goal.
    - `tasks/todo.md` reflects the web visualizer as the active goal.
    - The initial prioritized checklist is present.
  - Proof:
    - Replaced the hardening goal state with the commit plus visualizer goal.
    - Updated `tasks/todo.md` so transformer-layer hardening is recorded as
      complete and the initial visualizer work is active.

## Task 1: Hardened Baseline Commit

- [ ] TODO: Commit the current hardened PhotonicBench state.
  - Done when:
    - Git status and diff have been inspected.
    - Relevant files have been staged.
    - A clean commit exists with a descriptive hardening-focused message.
    - The latest commit hash is recorded in `PROGRESS.md`.
    - No push has been performed.
  - Proof:
    - Pending.

## Task 2: Artifact Discovery And Indexing

- [ ] TODO: Add visualizer artifact discovery over report directories.
  - Done when:
    - JSON artifacts under `reports/` can be discovered recursively.
    - Unsupported or malformed JSON files are reported without crashing the
      index generation.
    - Artifact summaries include schema version, artifact kind, benchmark name,
      MACs, equivalent ops, local energy, and source path.
    - Tests cover discovery across root reports and nested transformer reports.
  - Proof:
    - Pending.

## Task 3: Schema-Aware Loading

- [ ] TODO: Add schema-aware adapters for per-matmul and transformer-layer JSON.
  - Done when:
    - `photonic-bench-report-v1` cards load through a typed adapter path.
    - `photonic-bench-transformer-layer-report-v1` aggregates load through a
      separate adapter path.
    - Unknown schema versions are rejected or surfaced clearly.
    - Adapter tests cover required summary fields and schema routing.
  - Proof:
    - Pending.

## Task 4: Basic Visualizer UI

- [ ] TODO: Build the initial static web visualizer.
  - Done when:
    - A generated HTML page loads the artifact index and checked-in JSON
      artifacts using browser-friendly relative paths.
    - The page lists discovered per-matmul and aggregate artifacts.
    - Selecting an aggregate transformer-layer report shows the detail view.
    - The UI remains compact and workbench-like rather than marketing-oriented.
  - Proof:
    - Pending.

## Task 5: Transformer Layer Detail View

- [ ] TODO: Render the transformer-layer aggregate detail view.
  - Done when:
    - Layer shape, workload totals, local energy, serial timing, diagnostic
      noise, formula audit rows, and per-matmul rows are visible.
    - Assumptions, exclusions, provenance, and aggregate semantics are visible.
    - Serial timing and non-additive noise are labeled accurately.
    - Tests or generated-content checks protect the key concept labels.
  - Proof:
    - Pending.

## Task 6: Documentation And Verification

- [ ] TODO: Document and verify the initial visualizer.
  - Done when:
    - README or docs explain how to generate/open the visualizer.
    - Any new commands are documented with expected outputs.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
  - Proof:
    - Pending.

## Task 7: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Critique the visualizer scaffolding and fix major findings.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`
      have been re-read before the critique pass.
    - The critique is recorded in `PROGRESS.md`.
    - Major code-structure, maintainability, or scaling issues are fixed or
      explicitly justified.
    - Final `python -m pytest` and `python -m ruff check` pass after fixes.
  - Proof:
    - Pending.
