from __future__ import annotations

import argparse
from pathlib import Path

from photonic_bench.comparison import load_comparison_cards, render_comparison_markdown
from photonic_bench.config import load_config, load_transformer_layer_config
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
    slugify,
)


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
    plan = build_transformer_layer_plan(config)
    output_dir.mkdir(parents=True, exist_ok=True)
    file_prefix = slugify(prefix or config.benchmark.name)
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
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
