# Exemplo Go

## O que este exemplo demonstra

Este exemplo mostra uma aplicação Go simples gerando um trace manual e uma métrica customizada com OpenTelemetry, enviando ambos para o OpenTelemetry Collector local via OTLP HTTP.

Arquivos principais:

- [main.go](/home/cicero/projects/observability-platform/examples/go/main.go)
- [go.mod](/home/cicero/projects/observability-platform/examples/go/go.mod)

## Como instalar dependências

No diretório do exemplo:

```bash
go mod tidy
```

## Como executar o exemplo

```bash
go run .
```

## Como configurar a variável OTEL

Defina:

```bash
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318/v1/metrics
```

## Como conectar ao OTEL Collector

O exemplo usa OTLP HTTP e envia a telemetria diretamente para o Collector da plataforma em `localhost:4318`.

## Como visualizar dados no Grafana

1. Suba a stack local.
2. Rode `go run .`.
3. No Grafana, use `Explore` com `Tempo` para localizar o trace `go.example.run`.
4. Consulte a métrica `go_example_runs_total` no datasource `Prometheus`.
