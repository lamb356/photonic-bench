# PhotonicBench Production-Ready Review Context

## Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Active branch: `codex/decision-grade-analysis-tool`
- Base branch: `master`
- Remote: `https://github.com/lamb356/photonic-bench.git`
- Current state at this goal start:
  - branch `codex/decision-grade-analysis-tool`;
  - many dirty tracked/generated files plus new decision-packet schema,
    reviewer workflow doc, new example cards, and new generated visualizer
    payloads;
  - previous decision-grade implementation is locally verified but not yet
    committed, pushed, or opened as a PR.

## Prior Implementation Now Being Productized

The branch already contains the previous decision-grade analysis pass:

- decision-packet JSON/Markdown export;
- full analysis-intent presets and reviewer notes;
- local-triage rank explanations for recommendations, Energy Stack, and
  Bottleneck Stack;
- named memory scenarios and contention presets;
- first-class usable bandwidth under load and hierarchy energy outputs;
- Shen 2017, Tait 2017, and ChipAI 2025 source-backed surrogate cards;
- `actions/upload-artifact@v6`, changelog updates, and reviewer workflow docs;
- generated reports, schemas, visualizer payloads, and visual baselines.

The new goal must preserve those changes, commit them cleanly, and extend them
into a production-ready review workflow.

## Durable Context Used

- GBrain page:
  - `photonicbench-decision-grade-analysis-tool-2026-07-04`
    - Confirms the previous decision-grade pass was locally verified, with the
      remaining risk that it was not committed, pushed, or opened as a PR.
- GBrain page:
  - `photonicbench-pr9-bandwidth-headroom-followup-2026-07-04`
    - Records bandwidth/headroom diagnostics and the boundary that those fields
      are local PhotonicBench diagnostics, not published paper measurements.
- Local memory:
  - `MEMORY.md` confirms the static visualizer contract:
    `index.html`, split assets, `data/index.json`, payload JSON, and payload
    JS wrappers so `file://` works without browser `fetch()`.
  - `MEMORY.md` confirms the modeling-boundary contract:
    `published_reference` stays separate from `local_model`, transformer serial
    timing remains labeled as serial sum, and non-additive noise remains
    diagnostic only.
  - `MEMORY.md` records the mandatory Hostile Senior Reviewer critique pattern
    and state-file re-read requirement for PhotonicBench loops.

## Relevant Code Surfaces

- Git/CI/review:
  - `.github/workflows/*.yml`
  - `.github/pull_request_template.md` or `.github/PULL_REQUEST_TEMPLATE/*`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/reviewer_workflow.md`
- Visualizer:
  - `photonic_bench/visualizer.py`
  - `photonic_bench/visualizer_assets/app.js`
  - `photonic_bench/visualizer_assets/styles.css`
  - `photonic_bench/visualizer_assets/template.html`
  - `reports/visualizer/**`
- Model/report/JSON/schema:
  - `photonic_bench/config.py`
  - `photonic_bench/model.py`
  - `photonic_bench/json_report.py`
  - `photonic_bench/report.py`
  - `photonic_bench/comparison.py`
  - `photonic_bench/transformer.py`
  - `docs/*schema*.json`
  - `docs/json_schema.md`
  - `docs/model.md`
- Examples/artifacts:
  - `examples/*.yaml`
  - `reports/*.json`
  - `reports/*.md`
  - `reports/**/_summary.json`
  - `reports/**/_summary.md`
- Tests:
  - `tests/test_config.py`
  - `tests/test_model.py`
  - `tests/test_json_report.py`
  - `tests/test_report.py`
  - `tests/test_comparison.py`
  - `tests/test_transformer.py`
  - `tests/test_visualizer*.py`
  - `tests/test_cli.py`
  - `tests/test_artifacts.py`
  - `tests/test_schema_docs.py`

## Implementation Constraints

- Keep the visualizer directly openable from disk.
- Preserve split index/payload architecture; avoid browser `fetch()` dependence
  for local file viewing.
- Keep decision-packet import/replay entirely local-browser compatible.
- Keep published-card facts source-backed. Use surrogate/local-model fields and
  assumption notes when papers do not publish all required PhotonicBench inputs.
- Scenario provenance packs must cite sources or clearly identify local
  assumptions. They must not imply measured end-to-end hardware behavior.
- Source-audit metadata must keep quoted source metrics, derived conversions,
  and local assumptions in distinct structured fields.
- Preserve backward compatibility unless schema versioning policy explicitly
  calls out a version bump.
- Generated artifacts must be regenerated after source, model, schema, example,
  or visualizer changes.
- Do not weaken CI checks to remove warnings; update workflow plumbing while
  preserving or improving coverage.

## Starting Risks

- The dirty branch is large; committing requires care to avoid losing generated
  artifacts or mixing unrelated state updates.
- Remote CI may expose visual-regression portability issues not visible in the
  local run.
- Decision-packet replay can mislead reviewers if stale artifact IDs are
  silently restored. Replay must show validation status clearly.
- Scenario sensitivity can overclaim if it looks like measured hardware sweep
  data. It must be labeled as local model analysis.
- Provenance packs and source audits must be structured enough to survive JSON
  review, not just Markdown prose.
- Adding more cards without materially different memory behavior would dilute
  comparison value.
