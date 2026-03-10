# Contributing

Thank you for contributing to `observability-platform`.

This repository is intended to be a reusable local observability platform and an educational reference for OpenTelemetry-based integrations. Contributions should preserve clarity, reproducibility and a low-friction local developer experience.

## Development workflow

1. Fork the repository and create a dedicated branch from `main`.
1. Keep changes focused and small when possible.
1. Update documentation whenever behavior, examples or contribution workflows change.
1. Open a pull request with a clear summary, validation notes and any follow-up items.

## Running the project locally

Copy the sample environment file:

```bash
cp .env.example .env
```

Start the local stack:

```bash
docker compose up -d
```

Validate the compose configuration before opening a pull request:

```bash
docker compose --env-file .env.example config
```

Stop the stack when finished:

```bash
docker compose down
```

## Running the Docker stack

The repository is designed around a single `docker-compose.yml`.

- Do not replace the existing stack structure unless there is a clear architectural reason.
- Do not change ports, provisioning or observability configs casually.
- Prefer additive improvements that keep onboarding simple for other contributors.

## Pull request guidelines

- Describe the problem and the proposed change clearly.
- Reference related issues when applicable.
- Document manual validation steps and expected outcomes.
- Keep unrelated formatting changes out of the pull request.
- If you touch examples or docs, verify that instructions still match the repository structure.

## Commit conventions

Use clear, conventional commit messages whenever possible:

- `feat: add new integration example`
- `fix: correct grafana documentation link`
- `docs: improve getting started instructions`
- `ci: add markdown validation workflow`
- `chore: refine repository metadata`

## Quality expectations

- Keep documentation bilingual only where the repository already follows that pattern.
- Preserve compatibility with local Docker Compose execution.
- Prefer readable, explicit configuration over clever shortcuts.
- Avoid destructive changes to existing observability components unless discussed first.
