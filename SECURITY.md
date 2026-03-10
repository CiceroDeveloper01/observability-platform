# Security Policy

## Supported scope

This repository contains local observability infrastructure, documentation and example integrations. Security reports are welcome for:

- Supply chain concerns in repository-managed dependencies
- Sensitive defaults or insecure configurations introduced by the project
- Documentation that could lead users to unsafe deployment practices
- Vulnerabilities in example code that could reasonably affect adopters

## Reporting a vulnerability

Please do not open a public GitHub issue for security-sensitive reports.

Prefer one of the following private channels:

1. GitHub private vulnerability reporting, if enabled for the repository.
1. A private maintainer contact channel published by the repository owners.

When reporting, include:

- A clear description of the issue
- Impact and affected components
- Steps to reproduce
- Suggested remediation, if available

## Response expectations

Maintainers should aim to:

- Acknowledge receipt within 5 business days
- Assess severity and impact as quickly as practical
- Coordinate a fix and disclosure timeline when the report is confirmed

## Disclosure policy

- Avoid public disclosure until maintainers have had a reasonable opportunity to investigate and release a fix
- Coordinate disclosure details when a patch or mitigation is ready

## Security hygiene for contributors

- Do not commit secrets, tokens or credentials
- Prefer least-privilege examples and safe local defaults
- Review dependency changes carefully in pull requests
