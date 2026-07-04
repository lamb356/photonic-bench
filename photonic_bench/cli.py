from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

from photonic_bench.artifacts import verify_artifact_freshness
from photonic_bench.comparison import load_comparison_cards, render_comparison_markdown
from photonic_bench.config import (
    SYSTEM_PROFILES,
    TransformerLayerConfig,
    load_config,
    load_transformer_layer_config,
    load_transformer_model_config,
    system_config_to_dict,
)
from photonic_bench.json_report import render_json
from photonic_bench.model import (
    SUPPORTED_CALIBRATION_FIT_PARAMETERS,
    SUPPORTED_CALIBRATION_TARGETS,
    CalibrationFitRequest,
    evaluate,
)
from photonic_bench.report import render_markdown
from photonic_bench.transformer import (
    build_transformer_layer_plan,
    render_transformer_layer_comparison_markdown,
    render_transformer_layer_json,
    render_transformer_model_json,
    render_transformer_model_markdown,
    slugify,
    transformer_layer_config_from_model,
    TransformerModelLayerArtifact,
)
from photonic_bench.visualizer import build_visualizer_http_server, write_visualizer


def main(argv: list[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)

    try:
        if args.command == "run":
            return _run(
                args.config,
                args.report,
                args.json_report,
                args.fit_target,
                args.fit_parameter,
            )
        if args.command == "compare":
            return _compare(args.json_cards, args.report)
        if args.command == "transformer-layer":
            return _transformer_layer(args.config, args.output_dir, args.prefix)
        if args.command == "transformer-model":
            return _transformer_model(args.config, args.output_dir, args.prefix)
        if args.command == "visualize":
            return _visualize(
                args.reports_dir,
                args.output,
                args.serve,
                args.host,
                args.port,
            )
        if args.command == "system-profiles":
            return _system_profiles(args.json)
        if args.command == "verify-artifacts":
            return _verify_artifacts(args.examples_dir, args.reports_dir, args.verbose)
    except (OSError, ValueError) as exc:
        parser.exit(2, f"error: {exc}\n")

    parser.print_help()
    return 1


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="photonic-bench",
        description="Generate transparent photonic AI benchmark cards.",
    )
    subparsers = parser.add_subparsers(dest="command")

    run = subparsers.add_parser("run", help="Evaluate a benchmark config")
    run.add_argument("config", type=Path, help="Path to a PhotonicBench YAML config")
    run.add_argument(
        "--report",
        type=Path,
        required=True,
        help="Path where the Markdown benchmark card should be written",
    )
    run.add_argument(
        "--json-report",
        type=Path,
        help="Optional path where the machine-readable JSON card should be written",
    )
    run.add_argument(
        "--fit-target",
        choices=SUPPORTED_CALIBRATION_TARGETS,
        help="Optional published energy target for one-parameter calibration fitting",
    )
    run.add_argument(
        "--fit-parameter",
        choices=SUPPORTED_CALIBRATION_FIT_PARAMETERS,
        help="Component-model parameter to fit when --fit-target is used",
    )

    compare = subparsers.add_parser(
        "compare",
        help="Generate a Markdown comparison table from JSON benchmark cards",
    )
    compare.add_argument(
        "json_cards",
        type=Path,
        nargs="+",
        help="Machine-readable PhotonicBench JSON cards to compare",
    )
    compare.add_argument(
        "--report",
        type=Path,
        required=True,
        help="Path where the Markdown comparison table should be written",
    )

    transformer = subparsers.add_parser(
        "transformer-layer",
        help="Generate decomposed benchmark cards for a transformer layer config",
    )
    transformer.add_argument(
        "config",
        type=Path,
        help="Path to a PhotonicBench transformer-layer YAML config",
    )
    transformer.add_argument(
        "--output-dir",
        type=Path,
        required=True,
        help="Directory where decomposed cards and layer comparison are written",
    )
    transformer.add_argument(
        "--prefix",
        help="Optional filename prefix; defaults to a slug of the benchmark name",
    )

    transformer_model = subparsers.add_parser(
        "transformer-model",
        help="Generate representative layer artifacts and a full transformer model summary",
    )
    transformer_model.add_argument(
        "config",
        type=Path,
        help="Path to a PhotonicBench transformer-model YAML config",
    )
    transformer_model.add_argument(
        "--output-dir",
        type=Path,
        required=True,
        help="Directory where model, layer, and decomposed card artifacts are written",
    )
    transformer_model.add_argument(
        "--prefix",
        help="Optional filename prefix; defaults to a slug of the benchmark name",
    )

    visualize = subparsers.add_parser(
        "visualize",
        help="Generate a static web visualizer from JSON reports",
    )
    visualize.add_argument(
        "--reports-dir",
        type=Path,
        default=Path("reports"),
        help="Directory containing PhotonicBench JSON reports",
    )
    visualize.add_argument(
        "--output",
        type=Path,
        default=Path("reports/visualizer/index.html"),
        help="HTML file to write",
    )
    visualize.add_argument(
        "--serve",
        action="store_true",
        help="Serve the visualizer locally without writing duplicated payload assets",
    )
    visualize.add_argument(
        "--host",
        default="127.0.0.1",
        help="Host interface for --serve",
    )
    visualize.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port for --serve; use 0 to select an available port",
    )

    verify = subparsers.add_parser(
        "verify-artifacts",
        help="Check that checked-in generated artifacts match current examples",
    )
    verify.add_argument(
        "--examples-dir",
        type=Path,
        default=Path("examples"),
        help="Directory containing checked example YAML inputs",
    )
    verify.add_argument(
        "--reports-dir",
        type=Path,
        default=Path("reports"),
        help="Directory containing checked generated report artifacts",
    )
    verify.add_argument(
        "--verbose",
        action="store_true",
        help="Print every checked generated artifact path on success",
    )
    profiles = subparsers.add_parser(
        "system-profiles",
        help="List built-in system memory profile assumptions",
    )
    profiles.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable profile data instead of a Markdown table",
    )
    return parser


def _run(
    config_path: Path,
    report_path: Path,
    json_report_path: Path | None,
    fit_target: str | None,
    fit_parameter: str | None,
) -> int:
    config = load_config(config_path)
    result = evaluate(
        config,
        calibration_fit=_build_calibration_fit_request(fit_target, fit_parameter),
    )
    markdown = render_markdown(result)

    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(markdown, encoding="utf-8")
    print(f"Wrote benchmark card to {report_path}")

    if json_report_path is not None:
        json_report_path.parent.mkdir(parents=True, exist_ok=True)
        json_report_path.write_text(render_json(result), encoding="utf-8")
        print(f"Wrote machine-readable benchmark card to {json_report_path}")

    return 0


def _build_calibration_fit_request(
    fit_target: str | None,
    fit_parameter: str | None,
) -> CalibrationFitRequest | None:
    if fit_target is None and fit_parameter is None:
        return None
    if fit_target is None or fit_parameter is None:
        raise ValueError(
            "calibration fitting requires both --fit-target and --fit-parameter"
        )

    return CalibrationFitRequest(target=fit_target, parameter=fit_parameter)


def _compare(json_cards: list[Path], report_path: Path) -> int:
    cards = load_comparison_cards(json_cards)
    markdown = render_comparison_markdown(cards)

    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(markdown, encoding="utf-8")
    print(f"Wrote comparison table to {report_path}")
    return 0


def _transformer_layer(
    config_path: Path,
    output_dir: Path,
    prefix: str | None,
) -> int:
    config = load_transformer_layer_config(config_path)
    file_prefix = slugify(prefix or config.benchmark.name)
    _write_transformer_layer_outputs(config, output_dir, file_prefix)
    return 0


def _write_transformer_layer_outputs(
    config: TransformerLayerConfig,
    output_dir: Path,
    file_prefix: str,
) -> Path:
    plan = build_transformer_layer_plan(config)
    output_dir.mkdir(parents=True, exist_ok=True)
    json_paths = []

    for card in plan.cards:
        result = evaluate(card.config)
        if result.macs != card.expected_macs:
            raise ValueError(
                f"{card.key} produced {result.macs} MACs; expected "
                f"{card.expected_macs}"
            )

        markdown_path = output_dir / f"{file_prefix}_{card.key}.md"
        json_path = output_dir / f"{file_prefix}_{card.key}.json"
        markdown_path.write_text(render_markdown(result), encoding="utf-8")
        json_path.write_text(render_json(result), encoding="utf-8")
        json_paths.append(json_path)
        print(f"Wrote transformer matmul card to {markdown_path}")
        print(f"Wrote transformer matmul JSON to {json_path}")

    aggregate_path = output_dir / f"{file_prefix}_layer_comparison.md"
    aggregate_json_path = output_dir / f"{file_prefix}_layer_summary.json"
    cards = load_comparison_cards(json_paths)
    aggregate_path.write_text(
        render_transformer_layer_comparison_markdown(config, cards),
        encoding="utf-8",
    )
    aggregate_json_path.write_text(
        render_transformer_layer_json(config, cards),
        encoding="utf-8",
    )
    print(f"Wrote transformer layer comparison to {aggregate_path}")
    print(f"Wrote transformer layer JSON summary to {aggregate_json_path}")
    return aggregate_json_path


def _transformer_model(
    config_path: Path,
    output_dir: Path,
    prefix: str | None,
) -> int:
    config = load_transformer_model_config(config_path)
    output_dir.mkdir(parents=True, exist_ok=True)
    file_prefix = slugify(prefix or config.benchmark.name)
    layer_artifacts = []

    for layer in config.layers:
        layer_slug = slugify(layer.name)
        layer_dir = output_dir / layer_slug
        layer_prefix = f"{file_prefix}_{layer_slug}"
        layer_config = transformer_layer_config_from_model(config, layer)
        summary_path = _write_transformer_layer_outputs(
            layer_config,
            layer_dir,
            layer_prefix,
        )
        layer_artifacts.append(
            TransformerModelLayerArtifact(
                name=layer.name,
                count=layer.count,
                json_report=_relative_posix(summary_path, output_dir),
                payload=json.loads(summary_path.read_text(encoding="utf-8")),
            )
        )

    markdown_path = output_dir / f"{file_prefix}_model_summary.md"
    json_path = output_dir / f"{file_prefix}_model_summary.json"
    markdown_path.write_text(
        render_transformer_model_markdown(config, layer_artifacts),
        encoding="utf-8",
    )
    json_path.write_text(
        render_transformer_model_json(config, layer_artifacts),
        encoding="utf-8",
    )
    print(f"Wrote transformer model summary to {markdown_path}")
    print(f"Wrote transformer model JSON summary to {json_path}")
    return 0


def _relative_posix(path: Path, base: Path) -> str:
    return path.relative_to(base).as_posix()


def _visualize(
    reports_dir: Path,
    output_path: Path,
    serve: bool,
    host: str,
    port: int,
) -> int:
    if serve:
        server, site = build_visualizer_http_server(
            reports_dir,
            host=host,
            port=port,
        )
        bound_host, bound_port = server.server_address[:2]
        display_host = "127.0.0.1" if bound_host in ("", "0.0.0.0") else bound_host
        print(
            f"Serving web visualizer at http://{display_host}:{bound_port}/ "
            f"({len(site.data.artifacts)} artifacts, {len(site.data.issues)} warnings)"
        )
        print("Press Ctrl+C to stop.")
        for issue in site.data.issues:
            print(f"warning: {issue.source_path}: {issue.message}", file=sys.stderr)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped web visualizer server.")
        finally:
            server.server_close()
        return 0

    data = write_visualizer(reports_dir, output_path)
    print(
        f"Wrote web visualizer to {output_path} "
        f"({len(data.artifacts)} artifacts, {len(data.issues)} warnings)"
    )
    for issue in data.issues:
        print(f"warning: {issue.source_path}: {issue.message}", file=sys.stderr)
    return 0


def _verify_artifacts(
    examples_dir: Path,
    reports_dir: Path,
    verbose: bool,
) -> int:
    result = verify_artifact_freshness(
        examples_dir=examples_dir,
        reports_dir=reports_dir,
    )
    if result.is_fresh:
        print(result.success_message())
        if verbose:
            for path in result.checked_files:
                print(f"checked: {path}")
        return 0

    print(result.failure_report(), file=sys.stderr)
    return 1


def _system_profiles(json_output: bool) -> int:
    rows = []
    for profile in SYSTEM_PROFILES.values():
        system = profile.to_system_config()
        rows.append(
            {
                "name": profile.name,
                "description": profile.description,
                "memory_timing_mode": system.memory_timing_mode,
                "system": system_config_to_dict(system),
            }
        )

    if json_output:
        print(json.dumps({"profiles": rows}, indent=2))
        return 0

    print("| Profile | Timing | SRAM pJ/B | Intermediate pJ/B | Off-chip pJ/B | Description |")
    print("| --- | --- | ---: | ---: | ---: | --- |")
    for row in rows:
        system = row["system"]
        sram = system["sram"]
        intermediate = system["intermediate"]
        off_chip = system["off_chip"]
        print(
            "| "
            f"{row['name']} | "
            f"{row['memory_timing_mode']} | "
            f"{_tier_energy_label(sram)} | "
            f"{_tier_energy_label(intermediate)} | "
            f"{_tier_energy_label(off_chip)} | "
            f"{row['description']} |"
        )
    return 0


def _tier_energy_label(tier: dict[str, float]) -> str:
    return (
        f"{tier['read_energy_pj_per_byte']:.6g}/"
        f"{tier['write_energy_pj_per_byte']:.6g}"
    )


if __name__ == "__main__":
    raise SystemExit(main())
