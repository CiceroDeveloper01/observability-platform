import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

const endpoint =
  (import.meta as { env?: Record<string, string> }).env?.VITE_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ??
  'http://localhost:4318/v1/traces';

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'react-web',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
});

const provider = new WebTracerProvider({ resource });

provider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({ url: endpoint })));
provider.register();

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [/.*/],
      clearTimingResources: true,
    }),
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [/.*/],
    }),
  ],
});
