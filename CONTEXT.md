# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`;
  - repository URL is `https://github.com/lamb356/photonic-bench`;
  - `master` tracks `origin/master`.
- Current `HEAD` at phase start:
  - `6358d91 Record GitHub push completion`
- Latest verified CI commit before closeout:
  - `43c4a4d Update CI action versions`
- Latest verified CI run before closeout:
  - `28694481430`
  - URL: `https://github.com/lamb356/photonic-bench/actions/runs/28694481430`
  - result: passed.

## Project Packaging And Verification

- `pyproject.toml` declares:
  - package name: `photonic-bench`;
  - Python requirement: `>=3.12`;
  - runtime dependency: `PyYAML>=6.0`;
  - dev dependencies: `playwright>=1.49`, `pytest>=8.0`, `ruff>=0.8`.
- `pyproject.toml` explicitly limits setuptools package discovery to
  `photonic_bench*` so editable installs do not accidentally treat `reports/`
  or `thoughts/` as top-level packages.
- Local verification commands:
  - `python -m ruff check`;
  - `python -m pytest`.
- CI should install the project with dev dependencies:
  - `python -m pip install -e ".[dev]"`.
- Because the test suite includes Playwright smoke coverage, CI on Ubuntu must
  install Chromium and its system dependencies before `pytest`:
  - `python -m playwright install --with-deps chromium`.

## GitHub Actions CI

- Workflow path:
  - `.github/workflows/ci.yml`
- Trigger:
  - push to `master`;
  - pull requests.
- Permissions:
  - `contents: read`.
- Runner:
  - `ubuntu-latest`.
- Actions:
  - `actions/checkout@v7`;
  - `actions/setup-python@v6`.
- Python:
  - `3.12`.
- Commands:
  - `python -m pip install --upgrade pip`;
  - `python -m pip install -e ".[dev]"`;
  - `python -m playwright install --with-deps chromium`;
  - `python -m ruff check`;
  - `python -m pytest`.

## GitHub Repository Hygiene

- Repository: `lamb356/photonic-bench`.
- Visibility decision for this phase:
  - keep private;
  - rationale: the repository was created private in the prior goal and no
    explicit public-release instruction was given.
- Description target:
  - `Transparent benchmark cards, JSON artifacts, and visual tools for photonic
    AI accelerator energy/noise claims.`
- Topic target:
  - `ai-accelerators`
  - `benchmarking`
  - `machine-learning`
  - `mlcommons`
  - `mlperf`
  - `optical-computing`
  - `photonic-accelerator`
  - `photonic-computing`
  - `python`
  - `reproducibility`

## Constraints

- Do not push unless local `ruff check` and `pytest` pass.
- Do not change repository visibility to public without explicit instruction.
- Do not include Codex attribution or co-author footers in commits.
- Use `gh` where possible for GitHub repository metadata verification and
  updates.
- Keep CI basic and reliable; avoid overbuilding matrix/release workflows unless
  the current package needs them.
