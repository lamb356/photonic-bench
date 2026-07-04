# PhotonicBench Context

## Current Repository State

- Workspace: `C:\Users\burba\OneDrive\Documents\Photonic Acceleration`
- Package: `photonic_bench`
- Branch: `master`
- Remote:
  - `origin` is `https://github.com/lamb356/photonic-bench.git`;
  - repository URL is `https://github.com/lamb356/photonic-bench`;
  - `master` tracks `origin/master`.
- Current phase-start `HEAD`:
  - `fd4d433 Record CI hygiene completion`
- Latest pushed automation-hardening commit:
  - `0829c96924f7dcf6ba0d177c696c2c242304125d`
- Latest verified CI run for this phase:
  - `28694933630`
  - URL: `https://github.com/lamb356/photonic-bench/actions/runs/28694933630`
  - result: passed
  - required status check context candidate: `Ruff, package, and pytest`
- Repository visibility:
  - `PRIVATE`, verified with `gh repo view`.
- Existing CI workflow:
  - `.github/workflows/ci.yml`
  - workflow name: `CI`
  - job id: `test`
  - job name before this phase: `Ruff and pytest`
  - triggers: push to `master` and pull requests
  - runner: `ubuntu-latest`
  - Python: `3.12`
  - current commands: dependency install, Playwright install, Ruff, pytest
  - missing before this phase: package build check
- Existing Dependabot state:
  - no `.github/dependabot.yml` exists at phase start.
- Existing README state:
  - no CI badge exists at phase start.

## Project Packaging And Verification

- `pyproject.toml` declares:
  - package name: `photonic-bench`;
  - Python requirement: `>=3.12`;
  - runtime dependency: `PyYAML>=6.0`;
  - dev dependencies: `build>=1.2`, `playwright>=1.49`, `pytest>=8.0`,
    `ruff>=0.8`.
- `pyproject.toml` explicitly limits setuptools package discovery to
  `photonic_bench*`.
- Package data includes visualizer HTML/CSS/JS assets.
- Local verification commands for this phase:
  - `python -m pip install -e ".[dev]"`;
  - `python -m build`;
  - `python -m ruff check`;
  - `python -m pytest`.

## GitHub Automation Targets

- CI badge target:
  - badge image:
    `https://github.com/lamb356/photonic-bench/workflows/CI/badge.svg?branch=master`
  - badge link:
    `https://github.com/lamb356/photonic-bench/actions/workflows/ci.yml`
- Dependabot target ecosystems:
  - `github-actions`, directory `/`, weekly;
  - `pip`, directory `/`, weekly.
- Branch protection target:
  - branch: `master`
  - required status checks: the exact passing CI job context after the packaging
    check is pushed
  - strict status checks: enabled
  - force pushes: disabled
  - deletions: disabled
- Branch protection blocker:
  - GitHub returned HTTP 403 for branch protection and repository rulesets:
    `Upgrade to GitHub Pro or make this repository public to enable this
    feature.`
  - The same HTTP 403 blocker repeated in Cycle 5 for branch protection update,
    rulesets readback, and branch protection readback.
  - The user explicitly required the repository to remain private, so making it
    public is not an allowed workaround.

## Constraints

- Do not change repository visibility to public.
- Use `gh` to configure and verify branch protection.
- Do not mark checklist items DONE until implementation and verification proof
  are recorded.
- Do not include Codex attribution or co-author footers in commits.
- Stage files explicitly.
- Use GitHub's current Dependabot configuration syntax and verify the YAML
  locally.
