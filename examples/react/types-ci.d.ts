interface ImportMeta {
  env?: Record<string, string>;
}

declare module '@opentelemetry/exporter-trace-otlp-http' {
  export class OTLPTraceExporter {
    constructor(config?: unknown);
  }
}

declare module '@opentelemetry/instrumentation-fetch' {
  export class FetchInstrumentation {
    constructor(config?: unknown);
  }
}

declare module '@opentelemetry/instrumentation-xml-http-request' {
  export class XMLHttpRequestInstrumentation {
    constructor(config?: unknown);
  }
}

declare module '@opentelemetry/instrumentation' {
  export function registerInstrumentations(config: unknown): void;
}

declare module '@opentelemetry/resources' {
  export class Resource {
    constructor(attributes?: Record<string, unknown>);
  }
}

declare module '@opentelemetry/semantic-conventions' {
  export const SemanticResourceAttributes: Record<string, string>;
}

declare module '@opentelemetry/sdk-trace-base' {
  export class BatchSpanProcessor {
    constructor(exporter: unknown);
  }
}

declare module '@opentelemetry/sdk-trace-web' {
  export class WebTracerProvider {
    constructor(config?: unknown);
    addSpanProcessor(processor: unknown): void;
    register(): void;
  }
}
