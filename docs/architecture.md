# Arquitetura

## Visão geral

Esta plataforma foi organizada para priorizar simplicidade local, reuso e baixo esforço de manutenção.

```text
Applications
   |
   | OTLP (gRPC/HTTP)
   v
OpenTelemetry Collector
   |--> Prometheus exporter --> Prometheus --> Grafana
   |--> Loki exporter ---------------------> Loki ------> Grafana
   |--> OTLP exporter ---------------------> Tempo -----> Grafana

Docker container logs --> Promtail --------> Loki ------> Grafana
```

## Responsabilidades

### Grafana

- Visualização central de métricas, logs e traces
- Provisionamento automático de datasources
- Provisionamento automático de dashboards

### Prometheus

- Scrape de métricas do Collector e dos componentes da stack
- Consulta PromQL para dashboards e troubleshooting

### Loki

- Armazenamento de logs da infraestrutura local
- Recebimento de logs via Promtail e OpenTelemetry Collector

### Tempo

- Armazenamento de traces distribuídos
- Consulta de traces via Grafana

### OpenTelemetry Collector

- Ponto único de entrada OTLP
- Processamento com batch
- Exportação de métricas, logs e traces para backends especializados

### Promtail

- Coleta de logs de containers Docker
- Enriquecimento com labels básicas para consulta

## Princípios adotados

- Um único `docker-compose.yml`
- Baixa dependência de configuração manual
- Separação clara por componente
- Exemplos mínimos para acelerar integração
- Estrutura pronta para evoluir para ambientes de equipe
