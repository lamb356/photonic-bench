# PhotonicBench Progress

## 2026-07-03 Prior Baseline

Completed before this goal:

- First tested matmul benchmark-card CLI.
- JSON export beside Markdown reports.
- Calibration fitting mode.
- Component realism improvements for operand reuse, weight-stationary behavior,
  pipelining, and separate vector/weight DAC handling.
- Two source-backed photonic accelerator cards.
- Comparison tables across JSON cards.
- JSON schema documentation and loading examples.
- Transformer-layer shape helpers with decomposed per-matmul Markdown/JSON.
- Aggregate transformer-layer Markdown comparison.
- Aggregate transformer-layer JSON summary:
  `<prefix>_layer_summary.json`.
- Transformer-layer hardening:
  - path-aware config and JSON errors;
  - stricter aggregate card validation;
  - exact five-row aggregate schema contract;
  - strict non-finite JSON handling;
  - stronger shape and CLI tests;
  - regenerated transformer examples;
  - final hardening verification.
- Web visualizer and MLCommons-style proposal planning artifacts.

Latest recorded hardening verification:

- `python -m pytest`: 63 passed.
- `python -m ruff check`: passed.

## 2026-07-03 Commit And Visualizer Cycle 1

### State Re-Read

- Re-read existing `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md`.
- Found they described the completed transformer-layer hardening goal, while
  the new active goal is hardened baseline commit plus initial web visualizer.
- Re-read `tasks/todo.md`.
- Inspected repository file list and git status.
- Confirmed there are no commits yet on `master`; all project files are
  untracked and form the baseline snapshot.
- Read the local commit, frontend-design, and review skill entrypoints.
- Searched memory for PhotonicBench/visualizer context; no project-specific
  prior memory notes were found.

### State File Update

- Replaced `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` with the current commit plus initial visualizer goal state.
- Updated `tasks/todo.md` to record transformer-layer hardening as complete and
  the initial web visualizer as active.
- Created a prioritized checklist:
  1. commit the hardened baseline;
  2. add artifact discovery and indexing;
  3. add schema-aware loading;
  4. build the static visualizer UI;
  5. render the transformer-layer detail view;
  6. document and verify;
  7. run hostile senior reviewer critique and fix major findings.

### Baseline Commit Preparation

- Pending.

### Visualizer Implementation

- Pending.

### Verification

- Pending.

### Hostile Senior Reviewer Critique

- Pending.
