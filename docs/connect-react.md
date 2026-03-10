# Integração com React

## Pacotes recomendados

```bash
npm install @opentelemetry/sdk-trace-web @opentelemetry/exporter-trace-otlp-http @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request @opentelemetry/resources @opentelemetry/semantic-conventions
```

## Objetivo

O exemplo incluído cobre tracing no navegador para chamadas `fetch` e `XMLHttpRequest`.

## Inicialização

Importe a telemetria no ponto de entrada da aplicação:

```ts
import './telemetry';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## Exemplo mínimo

Use [examples/react/telemetry.ts](/home/cicero/projects/observability-platform/examples/react/telemetry.ts) como base.

## O que validar

- Navegação e chamadas HTTP geram traces
- Os spans chegam ao Tempo
- O Collector aceita chamadas OTLP via HTTP do navegador
