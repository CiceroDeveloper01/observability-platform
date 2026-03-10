declare const process: {
  env: Record<string, string | undefined>;
  on(event: string, listener: (...args: unknown[]) => unknown): void;
};

declare module '@opentelemetry/api' {
  export const diag: {
    setLogger(logger: unknown, level?: unknown): void;
  };

  export class DiagConsoleLogger {}

  export const DiagLogLevel: {
    ERROR: unknown;
  };
}

declare module '@opentelemetry/exporter-logs-otlp-http' {
  export class OTLPLogExporter {
    constructor(config?: unknown);
  }
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

declare module '@opentelemetry/auto-instrumentations-node' {
  export function getNodeAutoInstrumentations(): unknown;
}

declare module '@opentelemetry/sdk-metrics' {
  export class PeriodicExportingMetricReader {
    constructor(config?: unknown);
  }
}

declare module '@opentelemetry/sdk-logs' {
  export class LoggerProvider {
    constructor(config?: unknown);
    addLogRecordProcessor(processor: unknown): void;
    shutdown(): Promise<void>;
  }

  export class BatchLogRecordProcessor {
    constructor(exporter: unknown);
  }
}

declare module '@opentelemetry/sdk-node' {
  export class NodeSDK {
    constructor(config?: unknown);
    start(): void;
    shutdown(): Promise<void>;
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
