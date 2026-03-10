# observability-platform

![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-enabled-orange)
![Grafana](https://img.shields.io/badge/Grafana-dashboards-F46800?logo=grafana)
![Prometheus](https://img.shields.io/badge/Prometheus-metrics-E6522C?logo=prometheus)
![Loki](https://img.shields.io/badge/Loki-logs-0A0A0A?logo=grafana)
![Tempo](https://img.shields.io/badge/Tempo-tracing-7B61FF)
![License](https://img.shields.io/badge/license-MIT-green)

Plataforma open source para observabilidade local, pronta para reutilização em times e projetos que precisam padronizar métricas, logs e traces com baixo atrito.

Open source local observability platform designed to help teams and projects standardize metrics, logs and traces with low setup friction.

O repositório entrega uma stack única com `Docker Compose`, provisionamento automático do Grafana, dashboards iniciais e exemplos mínimos de instrumentação para aplicações `NestJS`, `.NET`, `React`, `Angular`, `Java`, `Go` e `Python`.

This repository provides a single `Docker Compose` stack with automatic Grafana provisioning, starter dashboards and minimal instrumentation examples for `NestJS`, `.NET`, `React`, `Angular`, `Java`, `Go` and `Python`.

## Stack

- Grafana
- Prometheus
- Loki
- Tempo
- OpenTelemetry Collector
- Promtail

## Features

### 🇧🇷 O que já está disponível

- Grafana dashboards provisionados automaticamente
- Pipeline de métricas com Prometheus
- Agregação de logs com Loki
- Distributed tracing com Tempo
- Integração central via OpenTelemetry Collector
- Stack pronta para execução com Docker Compose
- Exemplos multi-linguagem:
  - NestJS
  - .NET
  - React
  - Angular
  - Java
  - Go
  - Python

### 🇺🇸 What is already available

- Automatically provisioned Grafana dashboards
- Metrics pipeline using Prometheus
- Log aggregation using Loki
- Distributed tracing with Tempo
- Central telemetry gateway using OpenTelemetry Collector
- Ready-to-run Docker Compose stack
- Multi-language examples:
  - NestJS
  - .NET
  - React
  - Angular
  - Java
  - Go
  - Python

## What This Project Solves / O que este projeto resolve

- Centraliza observabilidade local em uma única composição Docker
- Remove setup manual de datasources no Grafana
- Entrega dashboards iniciais para métricas, logs e tracing
- Facilita onboarding de aplicações instrumentadas com OpenTelemetry
- Padroniza a estrutura para evolução futura em ambientes compartilhados

- Centralizes local observability in a single Docker Compose stack
- Removes manual Grafana datasource setup
- Delivers starter dashboards for metrics, logs and tracing
- Simplifies onboarding for OpenTelemetry-instrumented applications
- Provides a reusable structure for future team-wide evolution

## Architecture / Arquitetura

1. Aplicações enviam telemetria via OTLP para o OpenTelemetry Collector.
2. O Collector expõe métricas para o Prometheus, envia traces para o Tempo e logs para o Loki.
3. O Promtail coleta logs dos containers Docker e também envia para o Loki.
4. O Grafana já sobe com datasources e dashboards provisionados.

1. Applications send telemetry through OTLP to the OpenTelemetry Collector.
2. The Collector exposes metrics to Prometheus, sends traces to Tempo and logs to Loki.
3. Promtail collects Docker container logs and forwards them to Loki.
4. Grafana starts with datasources and dashboards already provisioned.

Documentação adicional em [docs/architecture.md](docs/architecture.md).

Additional details are available in [docs/architecture.md](docs/architecture.md).

## Repository Structure / Estrutura do repositório

```text
.
├── CHANGELOG.md
├── docker-compose.yml
├── .env.example
├── docs/
├── examples/
├── helm/
│   └── observability-platform/
├── observability/
│   ├── alerts/
│   ├── dashboards/
│   └── recording-rules/
├── grafana/
│   ├── dashboards/
│   └── provisioning/
├── loki/
├── otel-collector/
├── prometheus/
├── promtail/
└── tempo/
```

## Quick Start

1. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

2. Suba a stack:

```bash
docker compose up -d
```

3. Acesse os serviços:

- Grafana: `http://localhost:3000`
- Prometheus: `http://localhost:9090`
- Loki: `http://localhost:3100`
- Tempo: `http://localhost:3200`
- OpenTelemetry Collector (gRPC): `localhost:4317`
- OpenTelemetry Collector (HTTP): `http://localhost:4318`

Credenciais padrão do Grafana:

- Usuário: `admin`
- Senha: `admin`

## Fluxo recomendado

1. Suba a stack localmente.
2. Instrumente sua aplicação com OTLP apontando para o Collector.
3. Gere tráfego local.
4. Valide métricas no Prometheus, traces no Tempo e logs no Loki via Grafana.

Recommended flow:

1. Start the local stack.
2. Instrument your application using OTLP and point it to the Collector.
3. Generate local traffic.
4. Validate metrics in Prometheus, traces in Tempo and logs in Loki through Grafana.

## Kubernetes Deployment

The repository now includes a baseline Helm chart in [helm/observability-platform](helm/observability-platform) for Kubernetes-based deployments.

Basic usage:

```bash
helm install observability-platform ./helm/observability-platform
```

You can customize images, ports and replica counts through [helm/observability-platform/values.yaml](helm/observability-platform/values.yaml).

The chart is intentionally minimal and mirrors the current local stack layout so the project can evolve toward cloud-native deployment patterns without breaking the existing Docker Compose workflow.

## Dashboards / Dashboards incluídos

- `API Overview`: taxa de requisições, erro, latência e ingestão do Collector
- `Logs Overview`: stream de logs, distribuição por nível e volume por container
- `Tracing Overview`: ingestão de spans, spans aceitos no Collector e saúde do Tempo

Dashboard summary in English:

- `API Overview`: request rate, error rate, latency and Collector ingestion
- `Logs Overview`: log stream, level distribution and volume by container
- `Tracing Overview`: span ingestion, Collector accepted spans and Tempo health

Os dashboards ficam em [grafana/dashboards](grafana/dashboards).

The dashboards are stored in [grafana/dashboards](grafana/dashboards).

## Observability as Code

The repository now includes an [observability](observability) directory to organize observability assets as versioned project artifacts.

Structure:

- Dashboards: [observability/dashboards](observability/dashboards)
- Alert rules: [observability/alerts](observability/alerts)
- Recording rules: [observability/recording-rules](observability/recording-rules)

For compatibility with the current local stack, dashboards remain available in [grafana/dashboards](grafana/dashboards) and are mirrored under [observability/dashboards](observability/dashboards).

## Application Integration / Integração com aplicações

- NestJS: [docs/connect-nestjs.md](docs/connect-nestjs.md)
- .NET: [docs/connect-dotnet.md](docs/connect-dotnet.md)
- React: [docs/connect-react.md](docs/connect-react.md)

Exemplos mínimos:

- [examples/nestjs](examples/nestjs)
- [examples/dotnet](examples/dotnet)
- [examples/react](examples/react)
- [examples/angular](examples/angular)
- [examples/java](examples/java)
- [examples/go](examples/go)
- [examples/python](examples/python)

Minimal examples are available for:

- NestJS
- .NET
- React
- Angular
- Java
- Go
- Python

## Provisionamento automático

O Grafana é inicializado com:

- Datasource `Prometheus`
- Datasource `Loki`
- Datasource `Tempo`
- Dashboards carregados automaticamente a partir do repositório

Arquivos de provisionamento:

- [grafana/provisioning/datasources/datasources.yaml](grafana/provisioning/datasources/datasources.yaml)
- [grafana/provisioning/dashboards/dashboards.yaml](grafana/provisioning/dashboards/dashboards.yaml)

Grafana starts with:

- `Prometheus` datasource
- `Loki` datasource
- `Tempo` datasource
- Dashboards loaded automatically from the repository

## Environment Variables / Variáveis de ambiente

Os parâmetros principais estão em [.env.example](.env.example), incluindo:

- Portas expostas
- Credenciais iniciais do Grafana
- Nomes de imagens das dependências
- Endpoint OTLP padrão para exemplos

The main parameters are available in [.env.example](.env.example), including:

- Exposed ports
- Initial Grafana credentials
- Dependency image names
- Default OTLP endpoint for the examples

## Documentation / Documentação

- Getting started: [docs/getting-started.md](docs/getting-started.md)
- Arquitetura: [docs/architecture.md](docs/architecture.md)
- NestJS: [docs/connect-nestjs.md](docs/connect-nestjs.md)
- .NET: [docs/connect-dotnet.md](docs/connect-dotnet.md)
- React: [docs/connect-react.md](docs/connect-react.md)

## Use Cases / Casos de uso

- Ambientes locais padronizados para squads
- Base para templates internos de observabilidade
- Sandbox para validar instrumentação OpenTelemetry
- Demonstrações técnicas e workshops

- Standardized local environments for squads
- Foundation for internal observability templates
- Sandbox for validating OpenTelemetry instrumentation
- Technical demos and workshops

## Roadmap

- [ ] Advanced Grafana dashboards
- [ ] Kubernetes support
- [ ] Redis metrics
- [ ] Database performance dashboards
- [ ] Correlation ID dashboards
- [ ] Distributed trace visualization improvements
- [ ] Alertmanager integration

## License / Licença

MIT. Consulte [LICENSE](LICENSE).

MIT. See [LICENSE](LICENSE).
