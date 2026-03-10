# Exemplo Angular

## O que este exemplo demonstra

Este exemplo mostra como inicializar tracing e métricas em uma aplicação Angular usando OpenTelemetry e exportar os dados para o OpenTelemetry Collector da plataforma local.

O arquivo principal é [telemetry.ts](/home/cicero/projects/observability-platform/examples/angular/telemetry.ts).

## Como instalar dependências

Em um projeto Angular existente, instale:

```bash
npm install @opentelemetry/api @opentelemetry/sdk-trace-web @opentelemetry/sdk-metrics @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/exporter-trace-otlp-http @opentelemetry/exporter-metrics-otlp-http @opentelemetry/instrumentation @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request
```

## Como executar o exemplo

1. Adicione o conteúdo de `telemetry.ts` ao seu projeto Angular.
2. Importe o arquivo no `main.ts` antes do bootstrap da aplicação.
3. Execute o projeto normalmente:

```bash
npm start
```

## Como configurar a variável OTEL

Use estes endpoints:

```bash
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318/v1/metrics
```

Se estiver usando `environment.ts`, exponha os mesmos valores e leia-os no bootstrap da telemetria.

## Como conectar ao OTEL Collector

O Collector da plataforma recebe OTLP HTTP em `http://localhost:4318`.

O exemplo envia:

- traces para `http://localhost:4318/v1/traces`
- métricas para `http://localhost:4318/v1/metrics`

## Como visualizar dados no Grafana

1. Suba a plataforma com `docker compose up -d`.
2. Acesse `http://localhost:3000`.
3. Gere navegação e chamadas HTTP na aplicação Angular.
4. Valide traces em `Explore` usando o datasource `Tempo`.
5. Valide métricas no dashboard `API Overview` ou diretamente no datasource `Prometheus`.
