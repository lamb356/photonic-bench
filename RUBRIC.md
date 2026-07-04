# PhotonicBench Branch Protection And Automation Rubric

Use this rubric for checklist completion decisions and the mandatory Hostile
Senior Reviewer critique.

## Repository Visibility

- Original private visibility is not changed unless explicitly requested by the
  user.
- If the user authorizes public visibility, the public state is verified before
  completing branch protection.
- Visibility is verified after remote changes.

## CI Badge Quality

- The badge appears near the top of `README.md`.
- The badge uses the badge URL reported by GitHub's workflow API for the
  active `CI` workflow.
- The badge is scoped to `master`.
- The badge links to the workflow page.
- If direct SVG fetches are blocked because the repository is private, that
  limitation is recorded and workflow existence is verified through `gh`.

## Dependabot Quality

- `.github/dependabot.yml` uses `version: 2`.
- GitHub Actions updates are configured from `/`.
- Python dependency updates use the `pip` ecosystem from `/`.
- Schedules are predictable and not noisy.
- Open PR limits prevent Dependabot from overwhelming a small private repo.
- The YAML parses locally and the expected ecosystems are asserted.

## Packaging Check Quality

- CI installs `build` or equivalent build tooling explicitly.
- CI runs `python -m build`.
- The build step is part of the required CI job.
- Local `python -m build` passes before push.
- Existing Ruff and pytest checks still pass.
- Build artifacts are not committed.

## Branch Protection Quality

- Branch protection is configured with `gh`.
- `master` requires the exact passing CI status check context.
- Required status checks are strict so branches must be up to date before
  merging.
- Force pushes are disabled.
- Branch deletions are disabled.
- The resulting protection rule is verified with `gh api`.

## Git Hygiene

- Diff and status are inspected before staging.
- Files are staged explicitly.
- Commit message is descriptive, imperative, and has no Codex attribution or
  co-author footer.
- Push target is explicit.
- Pushed GitHub Actions run is located and verified passing.
- Local `HEAD` and `origin/master` match after push.

## Review Readiness

- Checklist DONE items include proof.
- State files are current.
- The Hostile Senior Reviewer critique is recorded in `PROGRESS.md`.
- Major critique findings are fixed before completion or explicitly justified.
- Remaining risks are named plainly.
