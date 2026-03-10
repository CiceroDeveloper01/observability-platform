# Getting Started

## Pré-requisitos

- Docker
- Docker Compose Plugin
- Portas `3000`, `3100`, `3200`, `4317`, `4318` e `9090` livres

## Subindo a plataforma

1. Crie seu arquivo local de ambiente:

```bash
cp .env.example .env
```

2. Suba todos os serviços:

```bash
docker compose up -d
```

3. Acompanhe a inicialização:

```bash
docker compose logs -f grafana prometheus loki tempo otel-collector promtail
```

## Validando o ambiente

### Grafana

- URL: `http://localhost:3000`
- Login padrão: `admin` / `admin`

Confirme:

- Datasources provisionados
- Dashboards iniciais disponíveis
- Explore habilitado para Prometheus, Loki e Tempo

### Prometheus

Abra `http://localhost:9090/targets` e verifique se:

- `prometheus` está `UP`
- `otel-collector` está `UP`
- `tempo` está `UP`
- `loki` está `UP`
- `promtail` está `UP`

### OTLP

Use estes endpoints nas aplicações:

- gRPC: `localhost:4317`
- HTTP: `http://localhost:4318`

## Primeiro teste

1. Instrumente uma aplicação usando um dos guias em `docs/`.
2. Gere tráfego local.
3. Abra o dashboard `API Overview`.
4. Vá para `Logs Overview` para validar logs.
5. Abra `Explore` no Grafana e consulte traces no datasource `Tempo`.

## Parando o ambiente

```bash
docker compose down
```

Para remover volumes:

```bash
docker compose down -v
```
