# PhotonicBench Goal

Date started: 2026-07-04

## Objective

Improve repository quality and automation for the private
`lamb356/photonic-bench` repository by adding:

1. branch protection on `master` that requires the CI workflow to pass before
   merging;
2. a working CI status badge in `README.md`;
3. Dependabot configuration for GitHub Actions and Python dependencies;
4. a packaging check in CI using `python -m build` or equivalent.

## Required Outcomes

1. Keep the repository private throughout the phase.
2. Add a clear CI status badge near the top of `README.md` that points at the
   main CI workflow.
3. Add `.github/dependabot.yml` with sensible update schedules for:
   - GitHub Actions;
   - Python dependencies managed from the repository root.
4. Update `.github/workflows/ci.yml` so CI installs build tooling and fails if
   the package cannot be built.
5. Verify locally before push:
   - `python -m ruff check`;
   - `python -m pytest`;
   - `python -m build`.
6. Commit and push the local changes to `origin/master`.
7. Verify the pushed GitHub Actions run passes after the packaging check is in
   the workflow.
8. Configure branch protection on `master` with `gh` so the CI status check is
   required before merging.
9. Verify branch protection, repository privacy, badge URL, and Dependabot
   configuration.
10. Run a mandatory Hostile Senior Reviewer critique focused on long-term
    repository maintainability and safety, then fix important findings.
11. Update `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`,
    `RUBRIC.md`, and `tasks/todo.md` with proof for completed items.

## Scope

In scope:

- GitHub branch protection on `master`.
- CI workflow hardening for source/wheel build validation.
- README status badge for the existing CI workflow.
- Dependabot version-update configuration.
- Local verification, commit, push, GitHub Actions verification, and state-file
  closeout.

Out of scope:

- Changing repository visibility to public.
- Hosted application deployment.
- Formal MLCommons submission.
- Benchmark feature development.
- New release publishing workflows.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` have
  been re-read at the start of each cycle.
- All checklist items are marked DONE with proof.
- The repository is verified private.
- `README.md` contains a working CI badge for `.github/workflows/ci.yml`.
- `.github/dependabot.yml` configures GitHub Actions and Python dependency
  updates.
- CI runs `python -m build` or an equivalent packaging build check and the
  pushed run passes.
- Branch protection is enabled on `master` and requires the CI status check.
- The mandatory Hostile Senior Reviewer critique is recorded and major findings
  are fixed or explicitly justified.
- Final local and remote git status are clean and synchronized.
