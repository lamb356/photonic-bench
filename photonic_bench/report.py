from __future__ import annotations

from photonic_bench.model import BenchmarkResult


REPORT_ASSUMPTIONS = (
    "The optical MAC energy is treated as delivered optical energy per multiply-accumulate.",
    "The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.",
    "ADC conversions are counted once per output element.",
    "DAC conversions are counted once per input value for the left and right matmul operands.",
    "Detector energy is counted once per output sample.",
    "The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.",
    "Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.",
)


def render_markdown(result: BenchmarkResult) -> str:
    config = result.config
    energy = result.energy
    timing = result.timing
    noise = result.noise
    workload = config.workload
    execution = config.execution

    description = config.benchmark.description or "No description provided."
    peripheral_percent = energy.peripheral_share * 100
    relative_error_percent = noise.estimated_relative_error_rms * 100

    return f"""# PhotonicBench Benchmark Card: {config.benchmark.name}

{description}

{_render_provenance(config)}
{_render_published_calibration(result)}
{_render_calibration_fit(result)}
## Workload

| Metric | Value |
| --- | ---: |
| Type | {workload.type} |
| Shape | {workload.m} x {workload.k} times {workload.k} x {workload.n} |
| Operations per batch | {result.operations_per_batch} |
| MACs per operation | {result.operation_macs} |
| MACs | {result.macs} |
| Equivalent ops per operation | {result.operation_equivalent_ops} |
| Equivalent ops | {result.equivalent_ops} |
| Output elements per operation | {result.output_elements_per_operation} |
| Output elements | {result.output_elements} |
| Vector DAC conversions | {result.vector_dac_conversions} |
| Weight DAC conversions | {result.weight_dac_conversions} |
| DAC conversions | {result.dac_conversions} |
| ADC conversions | {result.adc_conversions} |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | {execution.batch_size} |
| Vector reuse factor | {execution.vector_reuse_factor} |
| Weight reuse factor | {execution.weight_reuse_factor} |
| Weight stationary | {execution.weight_stationary} |
| Pipeline stages | {execution.pipeline.stages} |
| Pipeline cycle time | {_ns(timing.pipeline_cycle_time_ns)} |

## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | {_pj(energy.optical_compute_pj)} |
| Laser electrical energy | {_pj(energy.laser_electrical_pj)} |
| Detector energy | {_pj(energy.detector_pj)} |
| ADC energy | {_pj(energy.adc_pj)} |
| Vector DAC energy | {_pj(energy.vector_dac_pj)} |
| Weight DAC energy | {_pj(energy.weight_dac_pj)} |
| DAC energy | {_pj(energy.dac_pj)} |
| Total energy | {_pj(energy.total_pj)} |
| Energy per MAC | {_pj(energy.energy_per_mac_pj)} |
| Energy per equivalent op | {_pj(energy.energy_per_op_pj)} |
| Peripheral share | {peripheral_percent:.2f}% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | {_ns(timing.optical_latency_ns)} |
| ADC latency | {_ns(timing.adc_latency_ns)} |
| DAC latency | {_ns(timing.dac_latency_ns)} |
| Total latency | {_ns(timing.total_latency_ns)} |
| Pipeline cycle time | {_ns(timing.pipeline_cycle_time_ns)} |
| Batch latency | {_ns(timing.batch_latency_ns)} |
| Steady-state operations/s | {timing.steady_state_operations_per_second:.3f} |
| Steady-state equivalent ops/s | {timing.steady_state_equivalent_ops_per_second:.3f} |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | {noise.quantization_snr_db:.2f} dB |
| ADC quantization RMS | {noise.quantization_rms:.6f} |
| Phase noise RMS | {noise.phase_noise_rad_rms:.6f} rad |
| Drift RMS during integration | {noise.drift_rms_rad:.12f} rad |
| Estimated relative error RMS | {relative_error_percent:.4f}% |

## Assumptions

{_render_assumptions(result)}
"""


def _pj(value: float) -> str:
    return f"{value:.3f} pJ"


def _ns(value: float) -> str:
    return f"{value:.3f} ns"


def _render_provenance(config) -> str:
    provenance = config.provenance
    if provenance is None:
        return ""

    return f"""## Provenance

| Field | Value |
| --- | --- |
| Source | {provenance.source_title} |
| URL | {provenance.source_url} |
| DOI | {provenance.doi} |
| Venue | {provenance.venue} |
| Claim status | {provenance.claim_status} |

"""


def _render_published_calibration(result: BenchmarkResult) -> str:
    calibration = result.config.published_calibration
    derived = result.published_calibration
    if calibration is None or derived is None:
        return ""

    rows = [
        ("Architecture", calibration.architecture),
    ]
    rows.extend(
        _optional_rows(
            [
                ("Reported throughput", calibration.reported_tops, "TOPS"),
                (
                    "Energy efficiency, excluding lasers",
                    calibration.energy_efficiency_excluding_lasers_tops_per_watt,
                    "TOPS/W",
                ),
                (
                    "Energy efficiency, including lasers",
                    calibration.energy_efficiency_including_lasers_tops_per_watt,
                    "TOPS/W",
                ),
                (
                    "Energy per equivalent op, excluding lasers",
                    derived.energy_per_op_excluding_lasers_pj,
                    "pJ",
                ),
                (
                    "Energy per equivalent op, including lasers",
                    derived.energy_per_op_including_lasers_pj,
                    "pJ",
                ),
                (
                    "Energy per MAC, excluding lasers",
                    derived.energy_per_mac_excluding_lasers_pj,
                    "pJ",
                ),
                (
                    "Energy per MAC, including lasers",
                    derived.energy_per_mac_including_lasers_pj,
                    "pJ",
                ),
                (
                    "Workload energy, excluding lasers",
                    derived.total_energy_excluding_lasers_pj,
                    "pJ",
                ),
                (
                    "Workload energy, including lasers",
                    derived.total_energy_including_lasers_pj,
                    "pJ",
                ),
                (
                    "Component-model / published including-lasers ratio",
                    derived.model_to_published_including_lasers_ratio,
                    "x",
                ),
                ("Reported cycle latency", calibration.reported_latency_ns, "ns"),
                (
                    "Future-device latency discussed",
                    calibration.reported_future_latency_ns,
                    "ns",
                ),
                ("Reported ENOB", calibration.reported_enob, "bits"),
                (
                    "PACE total Ising computation time",
                    calibration.pace_total_time_us,
                    "us",
                ),
                (
                    "A10 total Ising computation time",
                    calibration.gpu_total_time_us,
                    "us",
                ),
            ]
        )
    )
    if calibration.reported_component_count_min is not None:
        rows.append(
            (
                "Reported component count",
                f">= {calibration.reported_component_count_min}",
            )
        )
    if calibration.a10_latency_ns_min is not None:
        rows.append(
            (
                "A10 single-cycle latency comparison",
                f">= {_ns(calibration.a10_latency_ns_min)}",
            )
        )
    for metric_name, metric_value in calibration.additional_metrics.items():
        rows.append((_humanize_metric_name(metric_name), str(metric_value)))

    table = "\n".join(f"| {name} | {value} |" for name, value in rows)

    return f"""## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
{table}

"""


def _render_calibration_fit(result: BenchmarkResult) -> str:
    fit = result.calibration_fit
    if fit is None:
        return ""

    relative_error_percent = fit.relative_error * 100
    assumptions = "\n".join(f"- {assumption}" for assumption in fit.assumptions)
    return f"""## Calibration Fit

This fit changes one local component-model parameter to match a selected published total-energy target. It is a calibration aid, not an independent reproduction of the source paper.

| Metric | Value |
| --- | ---: |
| Target | {fit.target} |
| Target source | {fit.target_source} |
| Target total energy | {_pj(fit.target_total_energy_pj)} |
| Fitted parameter | {fit.fitted_parameter} |
| Original parameter value | {fit.original_value:.9g} {fit.fitted_parameter_unit} |
| Fitted parameter value | {fit.fitted_value:.9g} {fit.fitted_parameter_unit} |
| Pre-fit local total energy | {_pj(fit.pre_fit_total_energy_pj)} |
| Post-fit local total energy | {_pj(fit.post_fit_total_energy_pj)} |
| Absolute fit error | {_pj(fit.absolute_error_pj)} |
| Relative fit error | {relative_error_percent:.6f}% |
| Objective | {fit.objective} |

Calibration fit assumptions:

{assumptions}

"""


def _render_assumptions(result: BenchmarkResult) -> str:
    return "\n".join(f"- {assumption}" for assumption in result_assumptions(result))


def result_assumptions(result: BenchmarkResult) -> tuple[str, ...]:
    execution = result.config.execution
    weight_load_description = (
        "once per batch because weight_stationary is true"
        if execution.weight_stationary
        else f"every {execution.weight_reuse_factor} operation(s)"
    )
    return (
        *REPORT_ASSUMPTIONS,
        *result.config.assumptions,
        f"The benchmark models {execution.batch_size} operation(s) per batch.",
        (
            "Vector DAC conversions are counted as ceil(batch_size / "
            "vector_reuse_factor) * m * k."
        ),
        f"Weight DAC conversions are counted {weight_load_description}.",
        (
            "The pipeline model reports single-operation latency, total batch "
            "latency including fill/drain, and steady-state throughput from the "
            "configured cycle time."
        ),
    )


def _optional_rows(
    rows: list[tuple[str, float | int | None, str]],
) -> list[tuple[str, str]]:
    rendered = []
    for name, value, unit in rows:
        if value is None:
            continue
        rendered.append((name, _format_metric_value(value, unit)))
    return rendered


def _format_metric_value(value: float | int, unit: str) -> str:
    if isinstance(value, int):
        rendered = str(value)
    else:
        rendered = f"{value:.3f}"

    if not unit:
        return rendered
    return f"{rendered} {unit}"


def _humanize_metric_name(name: str) -> str:
    return name.replace("_", " ").capitalize()
