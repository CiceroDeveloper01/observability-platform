# Exemplo Java

## O que este exemplo demonstra

Este exemplo mostra uma aplicação Java simples usando OpenTelemetry Java SDK para gerar um trace manual e uma métrica customizada, exportando ambos para o OpenTelemetry Collector local.

Arquivos principais:

- [Main.java](/home/cicero/projects/observability-platform/examples/java/Main.java)
- [pom.xml](/home/cicero/projects/observability-platform/examples/java/pom.xml)

## Como instalar dependências

Use Maven:

```bash
mvn clean package
```

## Como executar o exemplo

Execute a aplicação com:

```bash
mvn exec:java
```

## Como configurar a variável OTEL

Defina:

```bash
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318/v1/metrics
```

## Como conectar ao OTEL Collector

O exemplo lê as variáveis de ambiente acima e envia os dados via OTLP HTTP para o Collector da plataforma local.

## Como visualizar dados no Grafana

1. Garanta que a plataforma esteja ativa com `docker compose up -d`.
1. Rode o exemplo Java.
1. Acesse `http://localhost:3000`.
1. Consulte traces em `Explore` com o datasource `Tempo`.
1. Consulte métricas no datasource `Prometheus` procurando por `java_example_runs_total`.
