# PhotonicBench CI And Repo Hygiene Checklist

Status key:

- TODO: not started.
- IN PROGRESS: actively being worked.
- DONE: completed with proof recorded here.

## Cycle Control

- [x] DONE: Roll state files forward and create the prioritized checklist.
  - Done when:
    - `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` describe the CI and GitHub repository hygiene goal.
    - `tasks/todo.md` marks the previous goal as complete and this new goal as
      active.
    - The checklist covers workflow creation, local verification, GitHub
      metadata, push, Actions verification, critique, and closeout.
  - Proof:
    - Re-read all five required state files at the start of the cycle.
    - Re-read `tasks/todo.md`.
    - Inspected `pyproject.toml`, `.github` state, tracked file list, recent
      git log, remote, and branch tracking.
    - Confirmed no existing `.github/workflows/` directory is present.
    - Confirmed `master` tracks `origin/master` at
      `https://github.com/lamb356/photonic-bench.git`.

## Task 1: GitHub Actions Workflow

- [x] DONE: Add a reliable Python CI workflow.
  - Done when:
    - `.github/workflows/ci.yml` exists.
    - It triggers on push to `master`.
    - It triggers on pull requests.
    - It uses a supported Python 3.12 setup.
    - It installs project dev dependencies.
    - It installs Playwright Chromium dependencies needed by the existing smoke
      tests.
    - It runs `python -m ruff check`.
    - It runs `python -m pytest`.
  - Proof:
    - Added `.github/workflows/ci.yml`.
    - Workflow triggers on push to `master` and on pull requests.
    - Workflow uses `actions/checkout@v7` and `actions/setup-python@v6` with
      Python `3.12` and pip caching.
    - Workflow installs `python -m pip install -e ".[dev]"`.
    - Workflow installs Playwright Chromium with Linux dependencies via
      `python -m playwright install --with-deps chromium`.
    - Workflow runs `python -m ruff check`.
    - Workflow runs `python -m pytest`.
    - Parsed the workflow file locally with PyYAML and asserted the expected
      trigger and command entries.
    - First pushed run `28694399915` proved the clean runner also needed
      explicit setuptools package discovery; fixed `pyproject.toml` with
      `[tool.setuptools.packages.find] include = ["photonic_bench*"]`.
    - Second pushed run `28694440859` passed but annotated that older action
      majors targeted deprecated Node 20; checked current releases with
      `gh api` and updated to `actions/checkout@v7` and
      `actions/setup-python@v6`.

## Task 2: Local CI Verification

- [x] DONE: Verify the workflow command path locally.
  - Done when:
    - `python -m ruff check` passes.
    - `python -m pytest` passes.
    - Any workflow-relevant dependency assumptions are checked.
  - Proof:
    - Ran `python -m ruff check`: passed.
    - Ran `python -m pytest`: 73 passed, 146 warnings from
      `pytest_freezegun`/`distutils` deprecation.
    - Re-ran workflow file content assertions after fixing the PowerShell
      here-string invocation used for the local assertion script.
    - After the first Actions failure, ran `python -m pip install -e ".[dev]"`:
      editable install succeeded.
    - Re-ran `python -m ruff check`: passed.
    - Re-ran `python -m pytest`: 73 passed, 146 warnings.

## Task 3: Repository Visibility

- [x] DONE: Decide and verify repository visibility.
  - Done when:
    - The visibility decision is recorded.
    - `gh` verifies the repository visibility.
    - If the actual visibility differs from the decision, `gh repo edit`
      applies the change and the result is re-verified.
  - Decision:
    - Keep `lamb356/photonic-bench` private for this phase. The repository was
      created private in the previous goal, and changing to public would expose
      draft benchmark/proposal artifacts without an explicit public-release
      instruction.
  - Proof:
    - Ran `gh repo view lamb356/photonic-bench --json
      nameWithOwner,url,visibility,description,repositoryTopics,defaultBranchRef`.
    - GitHub reported `visibility` as `PRIVATE`.
    - No visibility change was needed because the decision is to keep the
      repository private for this phase.

## Task 4: GitHub Description And Topics

- [x] DONE: Add professional repository metadata.
  - Done when:
    - A clear repository description is set on GitHub.
    - Relevant topics are set on GitHub.
    - `gh repo view` verifies both.
  - Planned description:
    - `Transparent benchmark cards, JSON artifacts, and visual tools for
      photonic AI accelerator energy/noise claims.`
  - Planned topics:
    - `photonic-computing`
    - `photonic-accelerator`
    - `benchmarking`
    - `machine-learning`
    - `ai-accelerators`
    - `optical-computing`
    - `python`
    - `reproducibility`
    - `mlperf`
    - `mlcommons`
  - Proof:
    - Ran `gh repo edit lamb356/photonic-bench --description ...` with ten
      `--add-topic` values.
    - Verified with `gh repo view lamb356/photonic-bench --json
      nameWithOwner,url,visibility,description,repositoryTopics,defaultBranchRef`.
    - GitHub reported description:
      `Transparent benchmark cards, JSON artifacts, and visual tools for
      photonic AI accelerator energy/noise claims.`
    - GitHub reported topics:
      `ai-accelerators`, `benchmarking`, `machine-learning`, `mlcommons`,
      `mlperf`, `optical-computing`, `photonic-accelerator`,
      `photonic-computing`, `python`, `reproducibility`.

## Task 5: Commit, Push, And Actions Verification

- [x] DONE: Commit, push, and verify GitHub Actions passes.
  - Done when:
    - Final diff/status are inspected.
    - Files are staged explicitly.
    - A clean descriptive commit exists with no Codex attribution.
    - The commit is pushed to `origin/master`.
    - The triggered GitHub Actions run is found and passes.
    - Local `HEAD` and `origin/master` match.
  - Proof:
    - Created and pushed `e8cb999 Add GitHub Actions CI`.
    - Run `28694399915` triggered on push to `master` and failed in
      dependency installation; logs were inspected and root cause was fixed.
    - Created and pushed `f660fe4 Fix editable install package discovery`.
    - Run `28694440859` triggered on push to `master` and passed in 43
      seconds.
    - Created and pushed `43c4a4d Update CI action versions`.
    - Run `28694481430` triggered on push to `master` and passed in 50
      seconds.
    - Verified run `28694481430` job steps all succeeded: checkout, Python
      setup, dependency install, Playwright browser install, Ruff, and pytest.
    - Verified local `HEAD` and `origin/master` matched at
      `43c4a4d7ff01d82fd0a177cf34412c223ae6f72c` before this closeout state
      update.

## Task 6: Mandatory Hostile Senior Reviewer Critique

- [x] DONE: Critique CI reliability and repository presentation, then fix major
  issues.
  - Done when:
    - The five required state files are re-read before the critique pass.
    - Findings are recorded in `PROGRESS.md`.
    - Major CI or presentation issues are fixed or explicitly justified.
    - Post-fix local verification and relevant GitHub verification pass.
  - Proof:
    - Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
      `RUBRIC.md` before the critique pass.
    - Inspected `.github/workflows/ci.yml`, `pyproject.toml`, current GitHub
      metadata, successful run `28694481430`, and current git status/log.
    - Finding 1: clean GitHub runner could not install the package because
      setuptools auto-discovered `reports`, `thoughts`, and `photonic_bench`.
      Fix: explicit `[tool.setuptools.packages.find] include =
      ["photonic_bench*"]`; verified by local editable install and passing CI.
    - Finding 2: passing CI emitted a Node 20 deprecation annotation for older
      action majors. Fix: verified current releases and updated to
      `actions/checkout@v7` and `actions/setup-python@v6`; verified by passing
      run `28694481430`.
    - Finding 3: repository presentation had no description or topics at phase
      start. Fix: set and verified description plus ten relevant topics.
    - Residual non-blocker: branch protection / required checks are not
      configured; this was outside the requested basic CI/repo-hygiene scope.

## Task 7: Final Closeout

- [x] DONE: Close state files and final status.
  - Done when:
    - `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and
      `tasks/todo.md` reflect final verified state.
    - Any closeout state-file changes are committed and pushed if they occur
      after the CI commit.
    - Final `git status --short --branch` is clean and synchronized.
  - Proof:
    - Updated `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, `RUBRIC.md`, and
      `tasks/todo.md` for final verified state.
    - Final closeout state update is intentionally state-only; because CI runs
      on every push to `master`, the post-closeout run is verified after this
      commit and reported in the final response to avoid an infinite
      self-referential ledger loop.
