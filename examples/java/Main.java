import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.metrics.LongCounter;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanKind;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.metrics.SdkMeterProvider;
import io.opentelemetry.sdk.metrics.export.PeriodicMetricReader;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ServiceAttributes;
import java.time.Duration;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        String tracesEndpoint = System.getenv().getOrDefault(
            "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT",
            "http://localhost:4318/v1/traces"
        );
        String metricsEndpoint = System.getenv().getOrDefault(
            "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT",
            "http://localhost:4318/v1/metrics"
        );

        Resource resource = Resource.getDefault().merge(
            Resource.builder()
                .put(ServiceAttributes.SERVICE_NAME, "java-example")
                .put(ServiceAttributes.SERVICE_VERSION, "1.0.0")
                .build()
        );

        SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
            .setResource(resource)
            .addSpanProcessor(
                BatchSpanProcessor.builder(
                    OtlpHttpSpanExporter.builder()
                        .setEndpoint(tracesEndpoint)
                        .build()
                ).build()
            )
            .build();

        SdkMeterProvider meterProvider = SdkMeterProvider.builder()
            .setResource(resource)
            .registerMetricReader(
                PeriodicMetricReader.builder(
                    OtlpHttpMetricExporter.builder()
                        .setEndpoint(metricsEndpoint)
                        .build()
                )
                    .setInterval(Duration.ofSeconds(10))
                    .build()
            )
            .build();

        OpenTelemetrySdk openTelemetry = OpenTelemetrySdk.builder()
            .setTracerProvider(tracerProvider)
            .setMeterProvider(meterProvider)
            .buildAndRegisterGlobal();

        OpenTelemetry telemetry = GlobalOpenTelemetry.get();
        Tracer tracer = telemetry.getTracer("java-example");
        LongCounter runsCounter = telemetry.getMeter("java-example")
            .counterBuilder("java_example_runs_total")
            .setDescription("Numero total de execucoes do exemplo Java")
            .build();

        Span span = tracer.spanBuilder("java.example.run")
            .setSpanKind(SpanKind.INTERNAL)
            .startSpan();

        try {
            runsCounter.add(1, Attributes.of(AttributeKey.stringKey("runtime"), "java"));
            span.setAttribute("example.language", "java");
            span.setAttribute("collector.protocol", "otlp-http");
            Thread.sleep(1000);
            span.setStatus(StatusCode.OK);
            System.out.println("Telemetry enviada para o OpenTelemetry Collector.");
        } catch (Exception ex) {
            span.recordException(ex);
            span.setStatus(StatusCode.ERROR);
            throw ex;
        } finally {
            span.end();
            tracerProvider.forceFlush().join(10, java.util.concurrent.TimeUnit.SECONDS);
            meterProvider.forceFlush().join(10, java.util.concurrent.TimeUnit.SECONDS);
            tracerProvider.close();
            meterProvider.close();
        }
    }
}
