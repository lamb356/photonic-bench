# PhotonicBench Goal

Date started: 2026-07-04

## Objective

Set up basic GitHub Actions CI and complete essential GitHub repository hygiene
for `lamb356/photonic-bench` so the project is clean and professional on
GitHub.

## Required Outcomes

1. Add a workflow under `.github/workflows/` that runs on:
   - pushes to `master`;
   - pull requests.
2. The workflow must install project dependencies and run:
   - `python -m ruff check`;
   - `python -m pytest`.
3. Verify the workflow command path locally before pushing.
4. Push the workflow to `origin/master` and verify the GitHub Actions run
   passes.
5. Decide repository visibility and apply/verify it:
   - current decision: keep the repository private for this phase because the
     previous pushed state created a private repo and no explicit public-release
     approval was given.
6. Add a clear GitHub repository description.
7. Add relevant GitHub topics for a photonic AI benchmarking tool.
8. Run a mandatory Hostile Senior Reviewer critique focused on CI reliability
   and GitHub presentation, then fix significant issues.
9. Update state files and `tasks/todo.md` with proof for each completed item.

## Scope

In scope:

- GitHub Actions workflow for the current Python package.
- Local verification of the same lint/test commands CI runs.
- GitHub repository visibility verification.
- GitHub description and topics through `gh` where possible.
- Commit and push of local workflow/state/doc changes required for CI.
- GitHub Actions run verification after push.

Out of scope:

- Hosted application deployment.
- New benchmark features.
- Formal MLCommons submission.
- File upload workflow.
- Branch protection or required checks unless explicitly requested later.

## Stop Condition

Stop only when all of the following are true:

- `GOAL.md`, `CHECKLIST.md`, `CONTEXT.md`, `PROGRESS.md`, and `RUBRIC.md` have
  been re-read at the start of each cycle.
- All checklist items are marked DONE with proof.
- A GitHub Actions workflow exists under `.github/workflows/`.
- The workflow runs on push to `master` and on pull requests.
- Local `python -m ruff check` passes.
- Local `python -m pytest` passes.
- The workflow has been pushed and the corresponding GitHub Actions run passes.
- Repository visibility has been explicitly decided and verified.
- A clear repository description is set on GitHub.
- Relevant repository topics are set on GitHub.
- The mandatory Hostile Senior Reviewer critique is recorded and major findings
  are fixed or explicitly justified.
- Final local and remote git status are clean and synchronized.
