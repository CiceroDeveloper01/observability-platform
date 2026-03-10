declare module '@opentelemetry/api' {
  export const metrics: {
    setGlobalMeterProvider(provider: unknown): void;
    getMeter(name: string): {
      createCounter(name: string, config?: unknown): {
        add(value: number, attributes?: Record<string, unknown>): void;
      };
    };
  };

  export const trace: {
    getTracer(name: string): {
      startSpan(name: string): {
        setAttribute(key: string, value: unknown): void;
        end(): void;
      };
    };
  };
}

declare module '@opentelemetry/exporter-metrics-otlp-http' {
  export class OTLPMetricExporter {
    constructor(config?: unknown);
  }
}

declare module '@opentelemetry/exporter-trace-otlp-http' {
  export class OTLPTraceExporter {
    constructor(config?: unknown);
  }
}

declare module '@opentelemetry/instrumentation' {
  export function registerInstrumentations(config: unknown): void;
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

declare module '@opentelemetry/resources' {
  export class Resource {
    constructor(attributes?: Record<string, unknown>);
  }
}

declare module '@opentelemetry/semantic-conventions' {
  export const SemanticResourceAttributes: Record<string, string>;
}

declare module '@opentelemetry/sdk-metrics' {
  export class MeterProvider {
    constructor(config?: unknown);
    addMetricReader(reader: unknown): void;
  }

  export class PeriodicExportingMetricReader {
    constructor(config?: unknown);
  }
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
