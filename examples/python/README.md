# Exemplo Python

## O que este exemplo demonstra

Este exemplo mostra como uma aplicação Python pode gerar um trace manual e uma métrica customizada usando OpenTelemetry Python SDK, exportando ambos para o OpenTelemetry Collector local.

Arquivos principais:

- [app.py](/home/cicero/projects/observability-platform/examples/python/app.py)
- [requirements.txt](/home/cicero/projects/observability-platform/examples/python/requirements.txt)

## Como instalar dependências

Crie um ambiente virtual e instale:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Como executar o exemplo

```bash
python app.py
```

## Como configurar a variável OTEL

Defina:

```bash
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318/v1/metrics
```

## Como conectar ao OTEL Collector

O exemplo envia traces e métricas via OTLP HTTP diretamente para o Collector exposto em `localhost:4318`.

## Como visualizar dados no Grafana

1. Suba a plataforma de observabilidade.
2. Rode `python app.py`.
3. Procure o trace `python.example.run` em `Explore` com o datasource `Tempo`.
4. Consulte a métrica `python_example_runs_total` no datasource `Prometheus`.
