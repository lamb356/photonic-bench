# Goal Prompt: PhotonicBench Task 1

Build the first usable PhotonicBench artifact: a Python CLI that reads a photonic matmul benchmark config, computes transparent system-level energy/noise estimates including ADC/DAC/peripheral costs, emits a readable Markdown benchmark card, and ships with tests, documentation, tasks/todo.md, and a handoff note.

Keep the model intentionally simple but explicit. Every assumption must be visible in the report, every derived number must be reproducible from the config, and the first example should be small enough to audit by hand while still pointing toward Nature-style 64x64 photonic matmul accounting.

## Success Criteria

- `photonic-bench run examples/matmul_64x64.yaml --report reports/matmul_64x64.md` writes a Markdown benchmark card.
- The report includes operations, ADC/DAC energy, laser energy, detector energy, optical MAC energy, total energy, latency, and simple noise/degradation estimates.
- The implementation is covered by tests for config loading, calculation, report rendering, and CLI output.
- `README.md` explains the first workflow.
- `tasks/todo.md` records next work without vague placeholders.
