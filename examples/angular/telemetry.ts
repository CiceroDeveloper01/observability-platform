import { metrics, trace } from '@opentelemetry/api';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

const tracesEndpoint =
  (globalThis as { OTEL_EXPORTER_OTLP_TRACES_ENDPOINT?: string }).OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ??
  'http://localhost:4318/v1/traces';

const metricsEndpoint =
  (globalThis as { OTEL_EXPORTER_OTLP_METRICS_ENDPOINT?: string }).OTEL_EXPORTER_OTLP_METRICS_ENDPOINT ??
  'http://localhost:4318/v1/metrics';

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'angular-web',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
});

const tracerProvider = new WebTracerProvider({ resource });
tracerProvider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({ url: tracesEndpoint })));
tracerProvider.register();

const meterProvider = new MeterProvider({ resource });
meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({ url: metricsEndpoint }),
    exportIntervalMillis: 10000,
  }),
);

metrics.setGlobalMeterProvider(meterProvider);

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [/.*/],
    }),
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [/.*/],
    }),
  ],
});

const tracer = trace.getTracer('angular-web');
const meter = metrics.getMeter('angular-web');
const pageLoads = meter.createCounter('frontend_page_loads_total', {
  description: 'Total de carregamentos da aplicacao Angular',
});

export function initializeTelemetry(): void {
  pageLoads.add(1, { route: globalThis.location?.pathname ?? '/' });

  const span = tracer.startSpan('angular.app.bootstrap');
  span.setAttribute('app.framework', 'angular');
  span.setAttribute('page.url', globalThis.location?.href ?? 'unknown');
  span.end();
}
