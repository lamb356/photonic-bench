from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Print a short summary from a PhotonicBench JSON card.",
    )
    parser.add_argument("json_report", type=Path)
    args = parser.parse_args(argv)

    card = json.loads(args.json_report.read_text(encoding="utf-8"))
    print(summary(card))
    return 0


def summary(card: dict[str, Any]) -> str:
    benchmark = card["benchmark"]["name"]
    energy = card["local_model"]["energy"]
    lines = [
        f"benchmark: {benchmark}",
        f"schema: {card['schema_version']}",
        f"local_total_energy_pj: {energy['total_pj']:.6g}",
        f"local_energy_per_op_pj: {energy['energy_per_op_pj']:.6g}",
    ]

    published = card.get("published_reference")
    if published is None:
        lines.append("published_reference: none")
    else:
        reported = published["reported"]
        lines.append(f"published_reference: {reported['architecture']}")
        if "reported_tops" in reported:
            lines.append(f"published_tops: {reported['reported_tops']:.6g}")

    fit = card.get("calibration_fit")
    if fit is not None:
        parameter = fit["fitted_parameter"]
        lines.append(f"fit_target: {fit['target']}")
        lines.append(
            "fit_parameter: "
            f"{parameter['path']}={parameter['fitted_value']:.6g} "
            f"{parameter['unit']}"
        )

    return "\n".join(lines)


if __name__ == "__main__":
    raise SystemExit(main())
