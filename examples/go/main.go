package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	metricapi "go.opentelemetry.io/otel/metric"
	"go.opentelemetry.io/otel/sdk/resource"
	sdkmetric "go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
)

func main() {
	ctx := context.Background()

	tracesEndpoint := getenv("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT", "http://localhost:4318/v1/traces")
	metricsEndpoint := getenv("OTEL_EXPORTER_OTLP_METRICS_ENDPOINT", "http://localhost:4318/v1/metrics")

	res, err := resource.New(ctx,
		resource.WithAttributes(
			semconv.ServiceName("go-example"),
			semconv.ServiceVersion("1.0.0"),
		),
	)
	if err != nil {
		panic(err)
	}

	traceExporter, err := otlptracehttp.New(ctx,
		otlptracehttp.WithEndpointURL(tracesEndpoint),
	)
	if err != nil {
		panic(err)
	}

	metricExporter, err := otlpmetrichttp.New(ctx,
		otlpmetrichttp.WithEndpointURL(metricsEndpoint),
	)
	if err != nil {
		panic(err)
	}

	tracerProvider := trace.NewTracerProvider(
		trace.WithResource(res),
		trace.WithBatcher(traceExporter),
	)

	meterProvider := sdkmetric.NewMeterProvider(
		sdkmetric.WithResource(res),
		sdkmetric.WithReader(
			sdkmetric.NewPeriodicReader(metricExporter, sdkmetric.WithInterval(10*time.Second)),
		),
	)

	defer func() {
		_ = tracerProvider.Shutdown(ctx)
		_ = meterProvider.Shutdown(ctx)
	}()

	otel.SetTracerProvider(tracerProvider)
	otel.SetMeterProvider(meterProvider)

	tracer := otel.Tracer("go-example")
	meter := otel.Meter("go-example")

	counter, err := meter.Int64Counter("go_example_runs_total")
	if err != nil {
		panic(err)
	}

	_, span := tracer.Start(ctx, "go.example.run")
	span.SetAttributes(
		attribute.String("example.language", "go"),
		attribute.String("collector.protocol", "otlp-http"),
	)

	counter.Add(ctx, 1, metricapi.WithAttributes(attribute.String("runtime", "go")))
	time.Sleep(1200 * time.Millisecond)

	span.End()
	fmt.Println("Telemetry enviada para o OpenTelemetry Collector.")
}

func getenv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
