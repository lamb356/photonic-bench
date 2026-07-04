# PhotonicBench Progress

## 2026-07-04 Cycle 1: State Rollover

### State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` at the start of the cycle.
- Re-read `tasks/todo.md`.
- Read applicable GitHub, commit, and review skill instructions.
- Checked local memory registry for PhotonicBench/Photonic Acceleration hits;
  no relevant PhotonicBench-specific memory entries were found.

### Repository Inspection

- Ran `git status --short --branch`:
  - `master` tracks `origin/master`;
  - worktree was clean at phase start.
- Ran `git log --oneline -n 8`:
  - latest commit was `6358d91 Record GitHub push completion`.
- Ran `git remote -v`:
  - `origin` points to `https://github.com/lamb356/photonic-bench.git`.
- Ran `git branch -vv`:
  - `master 6358d91 [origin/master] Record GitHub push completion`.
- Inspected `pyproject.toml`:
  - Python `>=3.12`;
  - dev dependencies include Playwright, pytest, and ruff.
- Checked `.github`:
  - no `.github/workflows/` directory exists yet.

### State File Update

- Rolled the phase state files forward to CI and GitHub repository hygiene.
- Created checklist tasks for:
  1. GitHub Actions workflow;
  2. local CI verification;
  3. repository visibility decision and verification;
  4. GitHub description and topics;
  5. commit, push, and Actions verification;
  6. mandatory Hostile Senior Reviewer critique;
  7. final closeout.
- Visibility decision:
  - keep the repo private for this phase unless the user explicitly asks to make
    it public.

### Next Step

- Add `.github/workflows/ci.yml`.
- Run `python -m ruff check` and `python -m pytest` locally.
- Use `gh` to verify/apply repository visibility, description, and topics.

## 2026-07-04 Cycle 2: Workflow And Local Verification

### Implementation

- Added `.github/workflows/ci.yml`.
- Workflow properties:
  - name: `CI`;
  - trigger: push to `master`;
  - trigger: pull requests;
  - permissions: `contents: read`;
  - runner: `ubuntu-latest`;
  - Python: `3.12`;
  - dependency install: `python -m pip install -e ".[dev]"`;
  - Playwright browser install:
    `python -m playwright install --with-deps chromium`;
  - lint command: `python -m ruff check`;
  - test command: `python -m pytest`.

### Local Verification

- Ran `python -m ruff check`:
  - passed.
- Ran `python -m pytest`:
  - 73 passed;
  - 146 warnings from `pytest_freezegun` using deprecated `distutils` version
    classes.
- Ran a local workflow-file assertion script:
  - PyYAML parsed `.github/workflows/ci.yml`;
  - asserted the expected push/PR triggers and required commands.
- Note:
  - the first workflow assertion attempt used Bash heredoc syntax in
    PowerShell and failed before Python ran; it was rerun successfully with a
    PowerShell here-string.

### Next Step

- Use `gh` to verify or apply repository visibility, description, and topics.

## 2026-07-04 Cycle 3: GitHub Metadata

### Visibility

- Ran `gh repo view lamb356/photonic-bench --json
  nameWithOwner,url,visibility,description,repositoryTopics,defaultBranchRef`.
- Result:
  - repository: `lamb356/photonic-bench`;
  - URL: `https://github.com/lamb356/photonic-bench`;
  - default branch: `master`;
  - visibility: `PRIVATE`.
- Decision:
  - keep the repository private for this phase.
- Action:
  - no visibility edit was needed because actual visibility already matched the
    decision.

### Description And Topics

- Ran `gh repo edit lamb356/photonic-bench --description ...` with topics:
  - `photonic-computing`;
  - `photonic-accelerator`;
  - `benchmarking`;
  - `machine-learning`;
  - `ai-accelerators`;
  - `optical-computing`;
  - `python`;
  - `reproducibility`;
  - `mlperf`;
  - `mlcommons`.
- Re-ran `gh repo view ...`.
- Verified description:
  - `Transparent benchmark cards, JSON artifacts, and visual tools for photonic
    AI accelerator energy/noise claims.`
- Verified topics:
  - `ai-accelerators`, `benchmarking`, `machine-learning`, `mlcommons`,
    `mlperf`, `optical-computing`, `photonic-accelerator`,
    `photonic-computing`, `python`, `reproducibility`.

### Next Step

- Inspect diff/status, commit local workflow and state-file changes, push to
  `origin/master`, and verify the triggered GitHub Actions run passes.

## 2026-07-04 Cycle 4: First CI Push And Packaging Fix

### State Re-Read

- Re-read `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and
  `RUBRIC.md` before the commit/push cycle.
- Inspected `git status --short --branch`.
- Inspected `git diff --stat` and the scoped diff for the workflow and state
  files.

### First CI Commit And Push

- Staged explicit paths:
  - `.github/workflows/ci.yml`;
  - `GOAL.md`;
  - `CHECKLIST.md`;
  - `CONTEXT.md`;
  - `PROGRESS.md`;
  - `RUBRIC.md`;
  - `tasks/todo.md`.
- Created commit:
  - `e8cb999 Add GitHub Actions CI`.
- `.Codex/scripts/generate-reasoning.sh` was not present, so reasoning
  generation was skipped.
- Pushed `master` to `origin`.
- Verified local and remote `master` both pointed to:
  - `e8cb9992443f5fdc13b11765d2caff02b9c8afe9`.

### First Actions Run

- Found GitHub Actions run:
  - run ID: `28694399915`;
  - workflow: `CI`;
  - event: `push`;
  - commit: `e8cb9992443f5fdc13b11765d2caff02b9c8afe9`;
  - URL:
    `https://github.com/lamb356/photonic-bench/actions/runs/28694399915`.
- Result:
  - failed in `Install dependencies`.
- Root cause from `gh run view --log-failed`:
  - `python -m pip install -e ".[dev]"` failed because setuptools discovered
    multiple flat-layout top-level packages: `reports`, `thoughts`, and
    `photonic_bench`.

### Fix

- Updated `pyproject.toml`:
  - added `[tool.setuptools.packages.find]`;
  - set `include = ["photonic_bench*"]`.
- This makes package discovery explicit and keeps report/planning directories
  out of the Python distribution.

### Post-Fix Local Verification

- Ran `python -m pip install -e ".[dev]"`:
  - editable install succeeded.
- Ran `python -m ruff check`:
  - passed.
- Ran `python -m pytest`:
  - 73 passed;
  - 146 warnings from `pytest_freezegun` using deprecated `distutils` version
    classes.

### Next Step

- Commit and push the packaging fix, then verify the next GitHub Actions run.

## 2026-07-04 Cycle 5: Passing CI And Action Version Hardening

### Packaging Fix Commit And Push

- Staged explicit paths:
  - `pyproject.toml`;
  - `CHECKLIST.md`;
  - `CONTEXT.md`;
  - `PROGRESS.md`.
- Created commit:
  - `f660fe4 Fix editable install package discovery`.
- `.Codex/scripts/generate-reasoning.sh` was not present, so reasoning
  generation was skipped.
- Pushed `master` to `origin`.
- Verified local and remote `master` both pointed to:
  - `f660fe49be896e59f22b9455bad2e2ce0b5aa708`.

### Passing Actions Run

- Found GitHub Actions run:
  - run ID: `28694440859`;
  - workflow: `CI`;
  - event: `push`;
  - commit: `f660fe49be896e59f22b9455bad2e2ce0b5aa708`;
  - URL:
    `https://github.com/lamb356/photonic-bench/actions/runs/28694440859`.
- Result:
  - passed in 43 seconds.
- Verified job steps:
  - install dependencies passed;
  - install Playwright browser passed;
  - Ruff passed;
  - pytest passed.

### Annotation Follow-Up

- The passing run emitted a GitHub Actions annotation that
  `actions/checkout@v4` and `actions/setup-python@v5` target deprecated
  Node.js 20 and are being forced to Node.js 24.
- Queried current action releases:
  - `gh api repos/actions/checkout/releases/latest` returned `v7.0.0`,
    published `2026-06-18T13:53:05Z`;
  - `gh api repos/actions/setup-python/releases/latest` returned `v6.3.0`,
    published `2026-06-24T02:48:35Z`.
- Updated `.github/workflows/ci.yml`:
  - `actions/checkout@v7`;
  - `actions/setup-python@v6`.

### Next Step

- Commit and push the action-version hardening, then verify the next GitHub
  Actions run.
