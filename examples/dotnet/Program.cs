using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

var otlpEndpoint = builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"] ?? "http://localhost:4318";
var serviceName = builder.Configuration["OTEL_SERVICE_NAME"] ?? "dotnet-api";
var serviceVersion = builder.Configuration["OTEL_SERVICE_VERSION"] ?? "1.0.0";

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddOpenTelemetry(options =>
{
    options.IncludeScopes = true;
    options.IncludeFormattedMessage = true;
    options.ParseStateValues = true;
    options.SetResourceBuilder(
        ResourceBuilder.CreateDefault()
            .AddService(serviceName: serviceName, serviceVersion: serviceVersion));
    options.AddOtlpExporter(exporter =>
    {
        exporter.Endpoint = new Uri($"{otlpEndpoint}/v1/logs");
        exporter.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
    });
});

builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource.AddService(serviceName, serviceVersion: serviceVersion))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddOtlpExporter(exporter =>
        {
            exporter.Endpoint = new Uri($"{otlpEndpoint}/v1/traces");
            exporter.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
        }))
    .WithMetrics(metrics => metrics
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddRuntimeInstrumentation()
        .AddOtlpExporter(exporter =>
        {
            exporter.Endpoint = new Uri($"{otlpEndpoint}/v1/metrics");
            exporter.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
        }));

var app = builder.Build();

app.MapGet("/", (ILoggerFactory loggerFactory) =>
{
    var logger = loggerFactory.CreateLogger("SampleEndpoint");
    logger.LogInformation("Request received at root endpoint");
    return Results.Ok(new { service = serviceName, status = "ok" });
});

app.Run();
