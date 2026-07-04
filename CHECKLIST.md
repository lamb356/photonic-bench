# PhotonicBench Branch Protection And Automation Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.

## Cycle Control

- [x] DONE: Roll state files forward and create the prioritized checklist.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` describe the branch-protection, CI badge, Dependabot, and
      packaging-check goal.
    - `tasks/todo.md` marks the prior CI hygiene goal complete and this goal
      active.
    - The checklist covers implementation, verification, push, branch
      protection, critique, and closeout.
  - Proof:
    - Re-read all five required state files at the start of the cycle.
    - Re-read `tasks/todo.md`.
    - Inspected `.github/workflows/ci.yml`, `README.md`, `pyproject.toml`,
      `.github` contents, git status, recent log, remotes, and GitHub
      repository metadata.
    - Confirmed repository `lamb356/photonic-bench` is private.
    - Confirmed existing CI workflow is `.github/workflows/ci.yml`.
    - Confirmed no `.github/dependabot.yml` exists yet.
    - Confirmed the existing workflow has Ruff and pytest but no packaging
      build step.

## Task 1: CI Packaging Check

- [x] DONE: Add and verify a packaging build check in CI.
  - Done when:
    - `.github/workflows/ci.yml` installs package build tooling.
    - The workflow runs `python -m build`.
    - The build step fails the workflow if packaging is broken.
    - Local `python -m build` succeeds.
    - Local `python -m ruff check` and `python -m pytest` still pass.
  - Proof:
    - Added `build>=1.2` to the `dev` optional dependencies in
      `pyproject.toml`.
    - Updated `.github/workflows/ci.yml` job name to
      `Ruff, package, and pytest`.
    - Added a `Build package` step that runs `python -m build`.
    - Ran `python -m pip install -e ".[dev]"`: succeeded and installed
      `build-1.5.0`.
    - Ran `python -m build` after the final README badge edit:
      successfully built `photonic_bench-0.1.0.tar.gz` and
      `photonic_bench-0.1.0-py3-none-any.whl`.
    - Ran `python -m ruff check`: passed.
    - Ran `python -m pytest`: 73 passed, 146 warnings from
      `pytest_freezegun`/`distutils` deprecation.
    - Ran local workflow assertions confirming `python -m build`, Ruff, pytest,
      and the expected action versions are present.

## Task 2: README CI Badge

- [x] DONE: Add and verify a CI status badge.
  - Done when:
    - `README.md` has a clear badge near the top.
    - The badge uses the badge URL reported by GitHub's workflow API for the
      active `CI` workflow and is scoped to `master`.
    - The badge links to `.github/workflows/ci.yml` through the workflow page.
    - Direct private-repo badge fetch behavior is verified or the private-repo
      access limitation is recorded with alternate proof.
  - Proof:
    - Added a CI badge directly under the `# PhotonicBench` heading in
      `README.md`.
    - Badge image URL:
      `https://github.com/lamb356/photonic-bench/workflows/CI/badge.svg?branch=master`.
    - Badge link:
      `https://github.com/lamb356/photonic-bench/actions/workflows/ci.yml`.
    - Ran `gh api repos/lamb356/photonic-bench/actions/workflows/ci.yml`; the
      active workflow exists and GitHub reports badge URL
      `https://github.com/lamb356/photonic-bench/workflows/CI/badge.svg`.
    - Local README assertion verified the exact badge Markdown.
    - Direct SVG fetch returned 404 even with a token-backed request because
      the repository is private; this is recorded as a GitHub private-repo badge
      access limitation, not a syntax failure.

## Task 3: Dependabot Configuration

- [x] DONE: Add and verify Dependabot configuration.
  - Done when:
    - `.github/dependabot.yml` exists.
    - It uses Dependabot config `version: 2`.
    - It configures weekly GitHub Actions updates.
    - It configures weekly Python `pip` updates from `/`.
    - The YAML parses locally and contains the expected ecosystems.
  - Proof:
    - Added `.github/dependabot.yml`.
    - Config uses `version: 2`.
    - Configures `github-actions` updates from `/` weekly on Monday at 09:00
      America/Chicago.
    - Configures `pip` updates from `/` weekly on Monday at 09:30
      America/Chicago.
    - Sets `open-pull-requests-limit: 5` for both ecosystems.
    - Checked existing repo labels with `gh label list`; only default issue
      labels exist.
    - Removed custom Dependabot `labels:` overrides so GitHub can apply and
      create its default dependency labels.
    - Ran local YAML assertions confirming `version: 2`, `github-actions`,
      `pip`, weekly schedules, PR limits, and no custom labels.

## Task 4: Commit, Push, And GitHub Actions Verification

- [ ] TODO: Commit, push, and verify the workflow passes remotely.
  - Done when:
    - Final diff/status are inspected.
    - Files are staged explicitly.
    - A clean descriptive commit exists with no Codex attribution.
    - The commit is pushed to `origin/master`.
    - The triggered GitHub Actions run is found and passes.
    - The passing run includes Ruff, pytest, and package build steps.
    - Local `HEAD` and `origin/master` match.
  - Proof:
    - Pending.

## Task 5: Branch Protection

- [ ] TODO: Enable and verify `master` branch protection.
  - Done when:
    - `gh` is used to configure branch protection on `master`.
    - Required status checks are enabled.
    - The required check matches the passing CI job context from the pushed
      packaging-check workflow.
    - Branch protection requires the branch to be up to date before merging.
    - Force pushes and deletions are disabled.
    - `gh` verifies the resulting protection rule.
    - Repository visibility remains private.
  - Proof:
    - Pending.

## Task 6: Mandatory Hostile Senior Reviewer Critique

- [ ] TODO: Critique maintainability and safety, then fix major issues.
  - Done when:
    - The five required state files are re-read before the critique pass.
    - Findings are recorded in `PROGRESS.md`.
    - Major issues are fixed or explicitly justified.
    - Post-fix local and remote verification still pass.
  - Proof:
    - Pending.

## Task 7: Final Closeout

- [ ] TODO: Close state files and final status.
  - Done when:
    - All checklist items are DONE with proof.
    - `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and `tasks/todo.md` reflect the
      final verified state.
    - Any closeout state-file changes are committed and pushed if needed.
    - Final `git status --short --branch` is clean and synchronized.
  - Proof:
    - Pending.
