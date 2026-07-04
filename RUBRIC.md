# PhotonicBench CI And Repo Hygiene Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## CI Trigger Quality

- The workflow file lives under `.github/workflows/`.
- Pushes to `master` trigger CI.
- Pull requests trigger CI.
- Workflow permissions are minimal for a read-only test workflow.
- The workflow name and job names are clear.

## Python Environment Quality

- CI uses Python 3.12, matching the package's practical supported floor for
  current development.
- Dependencies are installed through the package metadata, not a hidden
  hand-maintained dependency list.
- Dev dependencies are installed so `pytest`, `ruff`, and Playwright are
  available.
- Playwright Chromium and Linux system dependencies are installed before tests.
- Commands run as modules:
  - `python -m ruff check`;
  - `python -m pytest`.

## Verification Quality

- Local `python -m ruff check` passes before push.
- Local `python -m pytest` passes before push.
- Pushed GitHub Actions run is located and verified passing.
- Failures are investigated from logs rather than waved through.
- Local `HEAD` and `origin/master` match after push.

## Repository Presentation Quality

- Visibility is explicitly decided and verified.
- A private-to-public change is not made without explicit user approval.
- Description is concise, specific, and accurate.
- Topics are lowercase, relevant, and discoverable for photonics, benchmarking,
  AI accelerators, Python, and reproducibility.
- `gh repo view` verifies the resulting metadata.

## Git Hygiene

- Diff and status are inspected before staging.
- Files are staged explicitly.
- Commit message is descriptive, imperative, and has no Codex attribution or
  co-author footer.
- Push target is explicit.
- State files record proof for completed checklist items.

## Review Readiness

- Checklist DONE items include proof.
- State files are current.
- The Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Major critique findings are fixed before completion or explicitly justified.
- Remaining risks are named plainly.
