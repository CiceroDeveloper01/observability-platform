# Integração com .NET

## Pacotes recomendados

Adicione os pacotes:

```bash
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
dotnet add package OpenTelemetry.Instrumentation.Http
dotnet add package OpenTelemetry.Instrumentation.Runtime
```

## Configuração

Defina o endpoint OTLP:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
```

## Exemplo mínimo

Use [examples/dotnet/Program.cs](/home/cicero/projects/observability-platform/examples/dotnet/Program.cs) como referência.

## O que validar

- Métricas HTTP expostas via OpenTelemetry chegam ao Prometheus
- Traces aparecem no Tempo
- Logs estruturados aparecem no Loki quando configurados para OTLP
