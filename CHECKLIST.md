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

- [x] DONE: Commit the current hardened PhotonicBench state.
  - Done when:
    - Git status and diff have been inspected.
    - Relevant files have been staged.
    - A clean commit exists with a descriptive hardening-focused message.
    - The latest commit hash is recorded in `PROGRESS.md`.
    - No push has been performed.
  - Proof:
    - Ran `python -m pytest`: 63 passed.
    - Ran `python -m ruff check`: passed.
    - Inspected `git status --short --branch` and staged the project files
      listed by `git ls-files --others --exclude-standard`.
    - Created commit `a147736 Harden transformer layer aggregate reports`.
    - Confirmed post-commit `git status --short --branch` reported a clean
      `master` worktree.
    - Confirmed no push was performed.
    - Checked for `.Codex/scripts/generate-reasoning.sh`; it is not present in
      this checkout.

## Task 2: Artifact Discovery And Indexing

- [x] DONE: Add visualizer artifact discovery over report directories.
  - Done when:
    - JSON artifacts under `reports/` can be discovered recursively.
    - Unsupported or malformed JSON files are reported without crashing the
      index generation.
    - Artifact summaries include schema version, artifact kind, benchmark name,
      MACs, equivalent ops, local energy, and source path.
    - Tests cover discovery across root reports and nested transformer reports.
  - Proof:
    - Added `discover_visualizer_data()` in `photonic_bench/visualizer.py`.
    - Discovery walks `reports/` recursively and considers `.json` files only.
    - Unsupported or malformed files become `ArtifactIssue` entries instead of
      aborting the index.
    - Artifact summaries include schema version, kind, benchmark name, MACs,
      equivalent ops, output elements, local total energy, source path, browser
      path, provenance status, and published-reference status.
    - `python -m photonic_bench.cli visualize --reports-dir reports --output
      reports\visualizer\index.html` generated 23 artifacts with 0 warnings.
    - `python -m pytest tests\test_visualizer.py` passed: 5 tests.

## Task 3: Schema-Aware Loading

- [x] DONE: Add schema-aware adapters for per-matmul and transformer-layer JSON.
  - Done when:
    - `photonic-bench-report-v1` cards load through a typed adapter path.
    - `photonic-bench-transformer-layer-report-v1` aggregates load through a
      separate adapter path.
    - Unknown schema versions are rejected or surfaced clearly.
    - Adapter tests cover required summary fields and schema routing.
  - Proof:
    - Added `load_visualizer_artifact()` with explicit branching on
      `schema_version`.
    - Added separate `_load_matmul_artifact()` and
      `_load_transformer_layer_artifact()` adapter paths.
    - Unknown schema versions are surfaced as index warnings.
    - Added tests for per-matmul summary fields, transformer-layer summary
      fields, and unsupported schema handling.
    - `python -m pytest tests\test_visualizer.py` passed: 5 tests.

## Task 4: Basic Visualizer UI

- [x] DONE: Build the initial static web visualizer.
  - Done when:
    - A generated HTML page loads the artifact index and checked-in JSON
      artifacts using browser-friendly relative paths.
    - The page lists discovered per-matmul and aggregate artifacts.
    - Selecting an aggregate transformer-layer report shows the detail view.
    - The UI remains compact and workbench-like rather than marketing-oriented.
  - Proof:
    - Added `render_visualizer_html()` and `write_visualizer()`.
    - Added CLI command:
      `python -m photonic_bench.cli visualize --reports-dir reports --output reports\visualizer\index.html`.
    - Generated `reports/visualizer/index.html`.
    - The HTML embeds the discovered artifact index and payloads with
      browser-friendly links back to checked-in JSON artifacts.
    - The UI is a compact artifact rail plus detail workbench, with no landing
      page or marketing surface.
    - `Select-String` confirmed generated HTML contains `photonicbench-data`,
      `nature_pace_64x64.json`, and transformer-layer detail labels.
    - `python -m pytest tests\test_visualizer.py` passed: 5 tests.

## Task 5: Transformer Layer Detail View

- [x] DONE: Render the transformer-layer aggregate detail view.
  - Done when:
    - Layer shape, workload totals, local energy, serial timing, diagnostic
      noise, formula audit rows, and per-matmul rows are visible.
    - Assumptions, exclusions, provenance, and aggregate semantics are visible.
    - Serial timing and non-additive noise are labeled accurately.
    - Tests or generated-content checks protect the key concept labels.
  - Proof:
    - Transformer detail view renders shape, aggregate metric strip, serial
      timing, non-additive noise, aggregate semantics, formula audit,
      per-matmul breakdown, exclusions, provenance, and assumptions.
    - Concept panels explicitly label local model estimates, published
      references, serial timing, and non-additive noise.
    - Generated HTML contains `Serial timing`, `Non-additive noise`,
      `Transformer Exclusions`, `Formula Audit`, and `Per-Matmul Breakdown`.
    - `python -m pytest tests\test_visualizer.py` passed: 5 tests.

## Task 6: Documentation And Verification

- [x] DONE: Document and verify the initial visualizer.
  - Done when:
    - README or docs explain how to generate/open the visualizer.
    - Any new commands are documented with expected outputs.
    - `python -m pytest` passes.
    - `python -m ruff check` passes.
  - Proof:
    - README documents `python -m photonic_bench.cli visualize --reports-dir
      reports --output reports/visualizer/index.html`.
    - README explains that the generated page is self-contained, JSON is the
      machine interface, Markdown is not scraped, and local estimates,
      published references, serial timing, non-additive noise, and exclusions
      remain distinct.
    - Generated `reports/visualizer/index.html`.
    - Pre-critique full `python -m pytest` passed: 68 tests.
    - Pre-critique full `python -m ruff check` passed.
    - Post-fix focused `python -m pytest tests\test_visualizer.py` passed:
      5 tests.
    - Post-fix focused `python -m ruff check photonic_bench\visualizer.py
      photonic_bench\cli.py tests\test_visualizer.py` passed.
    - Playwright browser smoke opened `reports/visualizer/index.html`, selected
      `transformer_small_sanity/small_transformer_layer_summary.json`, and
      verified the key transformer detail sections with no page or console
      errors.
    - Final post-critique `python -m pytest` passed: 68 tests.
    - Final post-critique `python -m ruff check` passed.

## Task 7: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Critique the visualizer scaffolding and fix major findings.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md`
      have been re-read before the critique pass.
    - The critique is recorded in `PROGRESS.md`.
    - Major code-structure, maintainability, or scaling issues are fixed or
      explicitly justified.
    - Final `python -m pytest` and `python -m ruff check` pass after fixes.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` before the critique pass.
    - Recorded hostile reviewer findings in `PROGRESS.md`.
    - Fixed warning routing so visualizer index warnings print to stderr.
    - Fixed the JavaScript object-table formatter so string fields such as
      `timing_model` are not rendered as `n/a`.
    - Regenerated `reports/visualizer/index.html` after fixes.
    - Playwright browser smoke passed after fixes.
    - Remaining scale risks are documented in `PROGRESS.md`.
    - Final post-critique `python -m pytest` passed: 68 tests.
    - Final post-critique `python -m ruff check` passed.
