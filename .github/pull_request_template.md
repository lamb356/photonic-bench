## Review Checklist

- [ ] Artifact freshness checked with `python -m photonic_bench.cli verify-artifacts`.
- [ ] Relevant examples checked with `python -m photonic_bench.cli validate-examples --json`.
- [ ] Visual-regression screenshots from CI artifacts were inspected when visualizer, CSS, generated payloads, or baselines changed.
- [ ] Decision Packet JSON export/import replay was checked when comparison, presets, review state, or packet schemas changed.
- [ ] Schema changes follow the compatibility policy: same schema id only adds optional fields or docs; required fields, unit/type changes, renames, or boundary-semantic changes use a new schema id.
- [ ] Published source values remain under `published_reference` and `source_audit`; local estimates remain under `local_model`.

## Notes For Reviewers

Summarize any artifact regeneration, visual baseline promotion, schema change, or source-audit/provenance update that needs close review.
