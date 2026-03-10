# Integração com NestJS

## Pacotes recomendados

```bash
npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/exporter-metrics-otlp-http @opentelemetry/exporter-logs-otlp-http
```

## Variáveis de ambiente

```env
OTEL_SERVICE_NAME=nestjs-api
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

## Bootstrap

Inicialize a instrumentação antes de subir a aplicação:

```ts
import './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

bootstrap();
```

## Exemplo mínimo

Use [examples/nestjs/tracing.ts](/home/cicero/projects/observability-platform/examples/nestjs/tracing.ts) como base.

## O que validar

- Requisições HTTP aparecem no dashboard `API Overview`
- Logs da aplicação aparecem no Loki
- Traces aparecem no datasource `Tempo`
