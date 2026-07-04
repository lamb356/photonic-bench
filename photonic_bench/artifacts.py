from __future__ import annotations

from dataclasses import dataclass
import hashlib
import json
import shutil
import tempfile
from pathlib import Path
from typing import Callable, Sequence

from photonic_bench.comparison import load_comparison_cards, render_comparison_markdown
from photonic_bench.config import (
    TransformerLayerConfig,
    load_config,
    load_transformer_layer_config,
    load_transformer_model_config,
)
from photonic_bench.json_report import render_json
from photonic_bench.model import CalibrationFitRequest, evaluate
from photonic_bench.report import render_markdown
from photonic_bench.transformer import (
    TransformerModelLayerArtifact,
    build_transformer_layer_plan,
    render_transformer_layer_comparison_markdown,
    render_transformer_layer_json,
    render_transformer_model_json,
    render_transformer_model_markdown,
    slugify,
    transformer_layer_config_from_model,
)
from photonic_bench.visualizer import PRESETS_JSON_PATH, write_visualizer


IGNORED_REPORT_PATHS = frozenset({PRESETS_JSON_PATH})


@dataclass(frozen=True)
class MatmulArtifactRecipe:
    config_path: str
    output_stem: str
    fit_target: str | None = None
    fit_parameter: str | None = None


@dataclass(frozen=True)
class TransformerLayerArtifactRecipe:
    config_path: str
    output_dir: str
    prefix: str


@dataclass(frozen=True)
class TransformerModelArtifactRecipe:
    config_path: str
    output_dir: str
    prefix: str


@dataclass(frozen=True)
class ArtifactDifference:
    path: str
    actual_sha256: str
    expected_sha256: str


@dataclass(frozen=True)
class ArtifactGenerationError:
    label: str
    message: str


@dataclass(frozen=True)
class ArtifactFreshnessResult:
    checked_files: tuple[str, ...]
    missing_files: tuple[str, ...]
    unexpected_files: tuple[str, ...]
    stale_files: tuple[ArtifactDifference, ...]
    generation_errors: tuple[ArtifactGenerationError, ...]

    @property
    def is_fresh(self) -> bool:
        return not (
            self.missing_files
            or self.unexpected_files
            or self.stale_files
            or self.generation_errors
        )

    def success_message(self) -> str:
        return f"Artifacts are fresh: checked {len(self.checked_files)} generated files."

    def failure_report(self) -> str:
        lines = ["Generated artifacts are stale or incomplete."]
        if self.generation_errors:
            lines.append("")
            lines.append("Generation errors:")
            for error in self.generation_errors:
                lines.append(f"- {error.label}: {error.message}")
        if self.missing_files:
            lines.append("")
            lines.append("Missing generated files:")
            for path in self.missing_files:
                lines.append(f"- {path}")
        if self.unexpected_files:
            lines.append("")
            lines.append("Unexpected generated files:")
            for path in self.unexpected_files:
                lines.append(f"- {path}")
        if self.stale_files:
            lines.append("")
            lines.append("Stale generated files:")
            for diff in self.stale_files:
                lines.append(
                    "- "
                    f"{diff.path} "
                    f"(actual {diff.actual_sha256[:12]}, "
                    f"expected {diff.expected_sha256[:12]})"
                )
        return "\n".join(lines)


MATMUL_ARTIFACT_RECIPES: tuple[MatmulArtifactRecipe, ...] = (
    MatmulArtifactRecipe("matmul_64x64.yaml", "matmul_64x64"),
    MatmulArtifactRecipe(
        "profile_sensitivity_64x64_on_chip_sram.yaml",
        "profile_sensitivity_64x64_on_chip_sram",
    ),
    MatmulArtifactRecipe(
        "profile_sensitivity_64x64_on_package_sram.yaml",
        "profile_sensitivity_64x64_on_package_sram",
    ),
    MatmulArtifactRecipe(
        "profile_sensitivity_64x64_hbm.yaml",
        "profile_sensitivity_64x64_hbm",
    ),
    MatmulArtifactRecipe(
        "profile_sensitivity_64x64_ddr.yaml",
        "profile_sensitivity_64x64_ddr",
    ),
    MatmulArtifactRecipe(
        "profile_sensitivity_64x64_pcie_attached.yaml",
        "profile_sensitivity_64x64_pcie_attached",
    ),
    MatmulArtifactRecipe(
        "profile_sensitivity_64x64_optical_interconnect.yaml",
        "profile_sensitivity_64x64_optical_interconnect",
    ),
    MatmulArtifactRecipe("nature_pace_64x64.yaml", "nature_pace_64x64"),
    MatmulArtifactRecipe(
        "nature_pace_64x64.yaml",
        "nature_pace_64x64_calibrated",
        fit_target="published-including-lasers",
        fit_parameter="device.dac.energy_pj_per_conversion",
    ),
    MatmulArtifactRecipe(
        "xu_11tops_convolution_surrogate.yaml",
        "xu_11tops_convolution_surrogate",
    ),
    MatmulArtifactRecipe(
        "weight_stationary_64x64_batch.yaml",
        "weight_stationary_64x64_batch",
    ),
    MatmulArtifactRecipe(
        "feldmann_2021_photonic_tensor_core_surrogate.yaml",
        "feldmann_2021_photonic_tensor_core_surrogate",
    ),
    MatmulArtifactRecipe(
        "pappas_2025_awgr_262tops_surrogate.yaml",
        "pappas_2025_awgr_262tops_surrogate",
    ),
    MatmulArtifactRecipe(
        "taichi_2024_chiplet_surrogate.yaml",
        "taichi_2024_chiplet_surrogate",
    ),
    MatmulArtifactRecipe(
        "hitop_2025_optical_tensor_processor_surrogate.yaml",
        "hitop_2025_optical_tensor_processor_surrogate",
    ),
    MatmulArtifactRecipe(
        "lin_2024_tfln_120gops_tensor_core_surrogate.yaml",
        "lin_2024_tfln_120gops_tensor_core_surrogate",
    ),
    MatmulArtifactRecipe(
        "meng_2025_mrr_otpu_tensor_core_surrogate.yaml",
        "meng_2025_mrr_otpu_tensor_core_surrogate",
    ),
    MatmulArtifactRecipe(
        "zhang_2026_pommm_surrogate.yaml",
        "zhang_2026_pommm_surrogate",
    ),
    MatmulArtifactRecipe(
        "chen_2026_fsr_gemm_surrogate.yaml",
        "chen_2026_fsr_gemm_surrogate",
    ),
    MatmulArtifactRecipe(
        "ning_2025_cirptc_surrogate.yaml",
        "ning_2025_cirptc_surrogate",
    ),
    MatmulArtifactRecipe(
        "kovaios_2025_wdm_1tops_tensor_core_surrogate.yaml",
        "kovaios_2025_wdm_1tops_tensor_core_surrogate",
    ),
    MatmulArtifactRecipe(
        "luan_2026_single_shot_mmm_surrogate.yaml",
        "luan_2026_single_shot_mmm_surrogate",
    ),
    MatmulArtifactRecipe(
        "bandyopadhyay_2024_single_chip_dnn_surrogate.yaml",
        "bandyopadhyay_2024_single_chip_dnn_surrogate",
    ),
    MatmulArtifactRecipe(
        "kari_2024_coherent_matrix_platform_surrogate.yaml",
        "kari_2024_coherent_matrix_platform_surrogate",
    ),
    MatmulArtifactRecipe(
        "dong_2023_continuous_time_tensor_core_surrogate.yaml",
        "dong_2023_continuous_time_tensor_core_surrogate",
    ),
    MatmulArtifactRecipe(
        "shen_2017_coherent_onn_surrogate.yaml",
        "shen_2017_coherent_onn_surrogate",
    ),
    MatmulArtifactRecipe(
        "tait_2017_microring_weight_bank_surrogate.yaml",
        "tait_2017_microring_weight_bank_surrogate",
    ),
    MatmulArtifactRecipe(
        "chipai_2025_photonic_chiplet_surrogate.yaml",
        "chipai_2025_photonic_chiplet_surrogate",
    ),
    MatmulArtifactRecipe(
        "lightening_transformer_2024_surrogate.yaml",
        "lightening_transformer_2024_surrogate",
    ),
    MatmulArtifactRecipe(
        "lightning_2023_smartnic_surrogate.yaml",
        "lightning_2023_smartnic_surrogate",
    ),
    MatmulArtifactRecipe(
        "adept_2023_electro_photonic_surrogate.yaml",
        "adept_2023_electro_photonic_surrogate",
    ),
    MatmulArtifactRecipe(
        "meyer_2026_reconfigurable_ptp_surrogate.yaml",
        "meyer_2026_reconfigurable_ptp_surrogate",
    ),
    MatmulArtifactRecipe(
        "xie_2025_complex_mvm_surrogate.yaml",
        "xie_2025_complex_mvm_surrogate",
    ),
    MatmulArtifactRecipe(
        "wu_2026_high_order_tensor_surrogate.yaml",
        "wu_2026_high_order_tensor_surrogate",
    ),
    MatmulArtifactRecipe(
        "tang_2025_waveguide_mvm_surrogate.yaml",
        "tang_2025_waveguide_mvm_surrogate",
    ),
    MatmulArtifactRecipe(
        "meng_2025_digital_analog_hop_surrogate.yaml",
        "meng_2025_digital_analog_hop_surrogate",
    ),
    MatmulArtifactRecipe(
        "prapas_2025_tsw_pitc_surrogate.yaml",
        "prapas_2025_tsw_pitc_surrogate",
    ),
    MatmulArtifactRecipe(
        "zhang_2025_pultc_logic_tensor_surrogate.yaml",
        "zhang_2025_pultc_logic_tensor_surrogate",
    ),
    MatmulArtifactRecipe(
        "sved_2026_inverse_designed_pnn_surrogate.yaml",
        "sved_2026_inverse_designed_pnn_surrogate",
    ),
)

TRANSFORMER_LAYER_ARTIFACT_RECIPES: tuple[TransformerLayerArtifactRecipe, ...] = (
    TransformerLayerArtifactRecipe(
        "transformer_small_sanity.yaml",
        "transformer_small_sanity",
        "small_transformer",
    ),
    TransformerLayerArtifactRecipe(
        "bert_base_encoder_layer.yaml",
        "bert_base_encoder_layer",
        "bert_base_layer",
    ),
    TransformerLayerArtifactRecipe(
        "gpt_style_decoder_layer.yaml",
        "gpt_style_decoder_layer",
        "gpt_decoder_layer",
    ),
)

TRANSFORMER_MODEL_ARTIFACT_RECIPES: tuple[TransformerModelArtifactRecipe, ...] = (
    TransformerModelArtifactRecipe(
        "bert_base_12layer_model.yaml",
        "bert_base_12layer_model",
        "bert_base_12layer",
    ),
    TransformerModelArtifactRecipe(
        "gpt_style_decoder_kv_cache_model.yaml",
        "gpt_style_decoder_kv_cache_model",
        "gpt_decoder_kv_cache",
    ),
)

COMPARISON_JSON_REPORTS: tuple[str, ...] = tuple(
    f"{recipe.output_stem}.json" for recipe in MATMUL_ARTIFACT_RECIPES
)


def verify_artifact_freshness(
    *,
    examples_dir: Path = Path("examples"),
    reports_dir: Path = Path("reports"),
) -> ArtifactFreshnessResult:
    generation_errors: list[ArtifactGenerationError] = []
    reports_dir_label = _canonical_reports_dir_label(reports_dir)
    with tempfile.TemporaryDirectory(prefix="photonic-bench-artifacts-") as temp_name:
        expected_reports_dir = Path(temp_name) / "reports"
        _generate_expected_artifacts(
            examples_dir=examples_dir,
            reports_dir=expected_reports_dir,
            source_reports_dir=reports_dir,
            reports_dir_label=reports_dir_label,
            generation_errors=generation_errors,
        )

        if generation_errors:
            return ArtifactFreshnessResult(
                checked_files=(),
                missing_files=(),
                unexpected_files=(),
                stale_files=(),
                generation_errors=tuple(generation_errors),
            )

        return _compare_report_trees(
            actual_reports_dir=reports_dir,
            expected_reports_dir=expected_reports_dir,
        )


def regenerate_checked_artifacts(
    *,
    examples_dir: Path = Path("examples"),
    reports_dir: Path = Path("reports"),
    source_reports_dir: Path | None = None,
) -> None:
    errors: list[ArtifactGenerationError] = []
    _generate_expected_artifacts(
        examples_dir=examples_dir,
        reports_dir=reports_dir,
        source_reports_dir=source_reports_dir or reports_dir,
        reports_dir_label=_canonical_reports_dir_label(reports_dir),
        generation_errors=errors,
    )
    if errors:
        formatted = "; ".join(f"{error.label}: {error.message}" for error in errors)
        raise ValueError(f"artifact generation failed: {formatted}")


def _generate_expected_artifacts(
    *,
    examples_dir: Path,
    reports_dir: Path,
    source_reports_dir: Path,
    reports_dir_label: str,
    generation_errors: list[ArtifactGenerationError],
) -> None:
    reports_dir.mkdir(parents=True, exist_ok=True)
    _record_unmanifested_example_configs(
        examples_dir=examples_dir,
        generation_errors=generation_errors,
    )
    if generation_errors:
        return

    for recipe in MATMUL_ARTIFACT_RECIPES:
        _record_generation_error(
            generation_errors,
            f"run {recipe.config_path}",
            lambda recipe=recipe: _write_matmul_artifact(
                examples_dir=examples_dir,
                reports_dir=reports_dir,
                recipe=recipe,
            ),
        )

    for recipe in TRANSFORMER_LAYER_ARTIFACT_RECIPES:
        _record_generation_error(
            generation_errors,
            f"transformer-layer {recipe.config_path}",
            lambda recipe=recipe: _write_transformer_layer_artifact(
                examples_dir=examples_dir,
                reports_dir=reports_dir,
                recipe=recipe,
            ),
        )

    for recipe in TRANSFORMER_MODEL_ARTIFACT_RECIPES:
        _record_generation_error(
            generation_errors,
            f"transformer-model {recipe.config_path}",
            lambda recipe=recipe: _write_transformer_model_artifact(
                examples_dir=examples_dir,
                reports_dir=reports_dir,
                recipe=recipe,
            ),
        )

    _copy_visualizer_presets_if_present(
        source_reports_dir=source_reports_dir,
        reports_dir=reports_dir,
    )
    _record_generation_error(
        generation_errors,
        "compare reports",
        lambda: _write_comparison_artifact(reports_dir),
    )
    _record_generation_error(
        generation_errors,
        "visualize reports",
        lambda: _write_visualizer_artifacts(
            reports_dir=reports_dir,
            reports_dir_label=reports_dir_label,
        ),
    )


def _record_generation_error(
    generation_errors: list[ArtifactGenerationError],
    label: str,
    action: Callable[[], object],
) -> None:
    try:
        action()
    except (OSError, ValueError) as exc:
        generation_errors.append(
            ArtifactGenerationError(label=label, message=str(exc))
        )


def _write_matmul_artifact(
    *,
    examples_dir: Path,
    reports_dir: Path,
    recipe: MatmulArtifactRecipe,
) -> None:
    config = load_config(examples_dir / recipe.config_path)
    calibration_fit = None
    if recipe.fit_target is not None or recipe.fit_parameter is not None:
        if recipe.fit_target is None or recipe.fit_parameter is None:
            raise ValueError(f"{recipe.output_stem}: incomplete calibration fit recipe")
        calibration_fit = CalibrationFitRequest(
            target=recipe.fit_target,
            parameter=recipe.fit_parameter,
        )
    result = evaluate(config, calibration_fit=calibration_fit)
    (reports_dir / f"{recipe.output_stem}.md").write_text(
        render_markdown(result),
        encoding="utf-8",
    )
    (reports_dir / f"{recipe.output_stem}.json").write_text(
        render_json(result),
        encoding="utf-8",
    )


def _write_transformer_layer_artifact(
    *,
    examples_dir: Path,
    reports_dir: Path,
    recipe: TransformerLayerArtifactRecipe,
) -> None:
    config = load_transformer_layer_config(examples_dir / recipe.config_path)
    _write_transformer_layer_outputs(
        config,
        reports_dir / recipe.output_dir,
        recipe.prefix,
    )


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
    return aggregate_json_path


def _write_transformer_model_artifact(
    *,
    examples_dir: Path,
    reports_dir: Path,
    recipe: TransformerModelArtifactRecipe,
) -> None:
    config = load_transformer_model_config(examples_dir / recipe.config_path)
    output_dir = reports_dir / recipe.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)
    file_prefix = slugify(recipe.prefix)
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
                json_report=summary_path.relative_to(output_dir).as_posix(),
                payload=_load_json(summary_path),
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


def _write_comparison_artifact(reports_dir: Path) -> None:
    json_paths = [reports_dir / path for path in COMPARISON_JSON_REPORTS]
    cards = load_comparison_cards(json_paths)
    (reports_dir / "comparison.md").write_text(
        render_comparison_markdown(cards),
        encoding="utf-8",
    )


def _write_visualizer_artifacts(
    *,
    reports_dir: Path,
    reports_dir_label: str,
) -> None:
    output_path = reports_dir / "visualizer" / "index.html"
    data = write_visualizer(reports_dir, output_path)
    if data.issues:
        issues = "; ".join(
            f"{issue.source_path}: {issue.message}" for issue in data.issues
        )
        raise ValueError(f"visualizer generation reported issue(s): {issues}")
    _normalize_visualizer_index_reports_dir(
        output_path.parent,
        reports_dir_label,
    )


def _normalize_visualizer_index_reports_dir(
    output_root: Path,
    reports_dir_label: str,
) -> None:
    index_path = output_root / "data" / "index.json"
    index = _load_json(index_path)
    index["reports_dir"] = reports_dir_label
    rendered = _json_dump(index)
    index_path.write_text(rendered, encoding="utf-8")
    (output_root / "data" / "index.js").write_text(
        f"window.PhotonicBenchIndex = {rendered};\n",
        encoding="utf-8",
    )


def _copy_visualizer_presets_if_present(
    *,
    source_reports_dir: Path,
    reports_dir: Path,
) -> None:
    presets_path = source_reports_dir / PRESETS_JSON_PATH
    destination = reports_dir / PRESETS_JSON_PATH
    if presets_path.exists() and presets_path.resolve() != destination.resolve():
        shutil.copy2(presets_path, destination)


def _canonical_reports_dir_label(reports_dir: Path) -> str:
    index_path = reports_dir / "visualizer" / "data" / "index.json"
    if index_path.exists():
        try:
            index = _load_json(index_path)
        except (OSError, ValueError, json.JSONDecodeError):
            return reports_dir.as_posix()
        label = index.get("reports_dir")
        if isinstance(label, str) and label:
            return label
    return reports_dir.as_posix()


def _record_unmanifested_example_configs(
    *,
    examples_dir: Path,
    generation_errors: list[ArtifactGenerationError],
) -> None:
    if not examples_dir.exists():
        generation_errors.append(
            ArtifactGenerationError(
                label="manifest examples",
                message=f"{examples_dir} does not exist",
            )
        )
        return
    expected = {
        recipe.config_path
        for recipe in (
            *MATMUL_ARTIFACT_RECIPES,
            *TRANSFORMER_LAYER_ARTIFACT_RECIPES,
            *TRANSFORMER_MODEL_ARTIFACT_RECIPES,
        )
    }
    actual = {path.name for path in examples_dir.glob("*.yaml")}
    unmanifested = sorted(actual - expected)
    if unmanifested:
        generation_errors.append(
            ArtifactGenerationError(
                label="manifest examples",
                message=(
                    "example YAML config(s) are not in the artifact freshness "
                    f"manifest: {', '.join(unmanifested)}"
                ),
            )
        )


def _compare_report_trees(
    *,
    actual_reports_dir: Path,
    expected_reports_dir: Path,
) -> ArtifactFreshnessResult:
    actual_files = _relative_report_files(actual_reports_dir)
    expected_files = _relative_report_files(expected_reports_dir)
    missing = tuple(sorted(expected_files - actual_files))
    unexpected = tuple(sorted(actual_files - expected_files))
    common = tuple(sorted(actual_files & expected_files))
    stale = []
    for path in common:
        actual_hash = _sha256(actual_reports_dir / path)
        expected_hash = _sha256(expected_reports_dir / path)
        if actual_hash != expected_hash:
            stale.append(
                ArtifactDifference(
                    path=path,
                    actual_sha256=actual_hash,
                    expected_sha256=expected_hash,
                )
            )

    return ArtifactFreshnessResult(
        checked_files=common,
        missing_files=missing,
        unexpected_files=unexpected,
        stale_files=tuple(stale),
        generation_errors=(),
    )


def _relative_report_files(root: Path) -> set[str]:
    if not root.exists():
        return set()
    return {
        path.relative_to(root).as_posix()
        for path in root.rglob("*")
        if path.is_file()
        and path.relative_to(root).as_posix() not in IGNORED_REPORT_PATHS
    }


def _load_json(path: Path) -> dict[str, object]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return payload


def _sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _json_dump(value: object) -> str:
    return (
        json.dumps(value, indent=2, allow_nan=False)
        .replace("</", "<\\/")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
        + "\n"
    )


def expected_generated_report_paths() -> tuple[str, ...]:
    expected: list[str] = []
    for recipe in MATMUL_ARTIFACT_RECIPES:
        expected.extend([f"{recipe.output_stem}.md", f"{recipe.output_stem}.json"])
    for recipe in TRANSFORMER_LAYER_ARTIFACT_RECIPES:
        for suffix in _transformer_layer_output_suffixes(recipe.prefix):
            expected.append(f"{recipe.output_dir}/{suffix}")
    for recipe in TRANSFORMER_MODEL_ARTIFACT_RECIPES:
        expected.extend(
            [
                f"{recipe.output_dir}/{recipe.prefix}_model_summary.md",
                f"{recipe.output_dir}/{recipe.prefix}_model_summary.json",
            ]
        )
    expected.append("comparison.md")
    expected.append("visualizer/index.html")
    expected.extend(
        [
            "visualizer/assets/app.js",
            "visualizer/assets/styles.css",
            "visualizer/data/index.js",
            "visualizer/data/index.json",
        ]
    )
    return tuple(sorted(expected))


def _transformer_layer_output_suffixes(prefix: str) -> Sequence[str]:
    return (
        f"{prefix}_attention_scores.md",
        f"{prefix}_attention_scores.json",
        f"{prefix}_attention_value.md",
        f"{prefix}_attention_value.json",
        f"{prefix}_layer_comparison.md",
        f"{prefix}_layer_summary.json",
        f"{prefix}_mlp_down_projection.md",
        f"{prefix}_mlp_down_projection.json",
        f"{prefix}_mlp_up_projection.md",
        f"{prefix}_mlp_up_projection.json",
        f"{prefix}_qkv_projection.md",
        f"{prefix}_qkv_projection.json",
    )
