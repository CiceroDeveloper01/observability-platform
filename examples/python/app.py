import os
import time

from opentelemetry import metrics, trace
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor


TRACES_ENDPOINT = os.getenv(
    "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT",
    "http://localhost:4318/v1/traces",
)
METRICS_ENDPOINT = os.getenv(
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT",
    "http://localhost:4318/v1/metrics",
)


def main() -> None:
    resource = Resource.create(
        {
            "service.name": "python-example",
            "service.version": "1.0.0",
        }
    )

    tracer_provider = TracerProvider(resource=resource)
    tracer_provider.add_span_processor(
        BatchSpanProcessor(OTLPSpanExporter(endpoint=TRACES_ENDPOINT))
    )
    trace.set_tracer_provider(tracer_provider)

    metric_reader = PeriodicExportingMetricReader(
        OTLPMetricExporter(endpoint=METRICS_ENDPOINT),
        export_interval_millis=10000,
    )
    meter_provider = MeterProvider(resource=resource, metric_readers=[metric_reader])
    metrics.set_meter_provider(meter_provider)

    tracer = trace.get_tracer("python-example")
    meter = metrics.get_meter("python-example")
    counter = meter.create_counter("python_example_runs_total")

    with tracer.start_as_current_span("python.example.run") as span:
        span.set_attribute("example.language", "python")
        span.set_attribute("collector.protocol", "otlp-http")
        counter.add(1, {"runtime": "python"})
        time.sleep(1)

    tracer_provider.force_flush()
    meter_provider.force_flush()
    print("Telemetry enviada para o OpenTelemetry Collector.")


if __name__ == "__main__":
    main()
