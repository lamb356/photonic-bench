import json
import subprocess
import sys
from pathlib import Path

from photonic_bench.config import load_config
from photonic_bench.json_report import REPORT_SCHEMA_VERSION, report_to_dict
from photonic_bench.model import evaluate
from photonic_bench.transformer import (
    TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION,
    TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION,
)


def test_json_schema_file_documents_report_v1_contract() -> None:
    schema = json.loads(
        Path("docs/photonic-bench-report-v1.schema.json").read_text(
            encoding="utf-8"
        )
    )

    assert schema["title"] == "PhotonicBench report v1"
    assert schema["properties"]["schema_version"]["const"] == REPORT_SCHEMA_VERSION
    assert set(schema["required"]) == {
        "schema_version",
        "benchmark",
        "workload",
        "model_inputs",
        "local_model",
        "published_reference",
        "calibration_fit",
        "assumptions",
        "provenance",
    }
    assert "energy" in schema["properties"]["local_model"]["properties"]
    assert "memory_traffic" in schema["properties"]["local_model"]["required"]
    assert "system" in schema["properties"]["model_inputs"]["required"]
    assert "system" in schema["properties"]["local_model"]["required"]
    assert "systemResult" in schema["$defs"]
    system = schema["$defs"]["systemResult"]
    assert "tiers" in system["required"]
    assert "bandwidth_limited_batch_latency_ns" in system["required"]


def test_transformer_layer_json_schema_file_documents_aggregate_contract() -> None:
    schema = json.loads(
        Path("docs/photonic-bench-transformer-layer-report-v1.schema.json").read_text(
            encoding="utf-8"
        )
    )

    assert schema["title"] == "PhotonicBench transformer layer aggregate report v1"
    assert (
        schema["properties"]["schema_version"]["const"]
        == TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION
    )
    assert set(schema["required"]) == {
        "schema_version",
        "artifact_type",
        "benchmark",
        "transformer_layer",
        "workload",
        "aggregate_semantics",
        "local_model",
        "published_reference",
        "calibration_fit",
        "formula_audit",
        "matmuls",
        "assumptions",
        "exclusions",
        "provenance",
    }
    assert schema["properties"]["artifact_type"]["const"] == (
        "transformer_layer_aggregate"
    )
    assert "serial_batch_latency_ns" in schema["properties"]["local_model"][
        "properties"
    ]["timing"]["required"]
    assert "memory_traffic" in schema["properties"]["aggregate_semantics"]["required"]
    assert "system" in schema["properties"]["aggregate_semantics"]["required"]
    assert "memory_traffic" in schema["properties"]["local_model"]["required"]
    assert "system" in schema["properties"]["local_model"]["required"]
    assert "aggregateSystemResult" in schema["$defs"]
    aggregate_system = schema["$defs"]["aggregateSystemResult"]
    assert "bandwidth_limited_serial_batch_latency_ns" in aggregate_system["required"]
    assert "rows" in schema["properties"]["formula_audit"]["required"]
    assert schema["properties"]["workload"]["properties"]["matmul_count"]["const"] == 5
    assert (
        schema["properties"]["formula_audit"]["properties"]["rows"]["minItems"] == 5
    )
    assert schema["properties"]["formula_audit"]["properties"]["rows"]["maxItems"] == 5
    assert schema["properties"]["matmuls"]["minItems"] == 5
    assert schema["properties"]["matmuls"]["maxItems"] == 5


def test_transformer_model_json_schema_file_documents_aggregate_contract() -> None:
    schema = json.loads(
        Path("docs/photonic-bench-transformer-model-report-v1.schema.json").read_text(
            encoding="utf-8"
        )
    )

    assert schema["title"] == "PhotonicBench transformer model aggregate report v1"
    assert (
        schema["properties"]["schema_version"]["const"]
        == TRANSFORMER_MODEL_REPORT_SCHEMA_VERSION
    )
    assert schema["properties"]["artifact_type"]["const"] == (
        "transformer_model_aggregate"
    )
    assert "layers" in schema["required"]
    assert "layer_counts" in schema["properties"]["aggregate_semantics"]["required"]
    assert "system" in schema["properties"]["local_model"]["required"]
    assert "modelSystem" in schema["$defs"]
    assert schema["properties"]["workload"]["properties"]["type"]["const"] == (
        "transformer_model"
    )


def test_json_schema_docs_describe_units_nullability_and_examples() -> None:
    docs = Path("docs/json_schema.md").read_text(encoding="utf-8")

    assert "Schema version: `photonic-bench-report-v1`" in docs
    assert "Schema version: `photonic-bench-transformer-layer-report-v1`" in docs
    assert "Schema version: `photonic-bench-transformer-model-report-v1`" in docs
    assert "`published_reference` | yes | object or null" in docs
    assert "`calibration_fit` | yes | object or null" in docs
    assert "`formula_audit` | yes | object" in docs
    assert "`matmuls` | yes | array" in docs
    assert "`local_model.energy.*_pj` | pJ" in docs
    assert "`local_model.memory_traffic.*_bytes` | bytes" in docs
    assert "`model_inputs.system.*.read_energy_pj_per_byte` | pJ/byte" in docs
    assert "`local_model.system.total_system_energy_pj` | pJ" in docs
    assert "`local_model.system.bandwidth_limited_batch_latency_ns` | ns" in docs
    assert "Per-Card System Model Fields" in docs
    assert "System movement fields under `local_model.system`" in docs
    assert "converter-interface traffic, not full cache" in docs
    assert "`local_model.timing.serial_batch_latency_ns` | ns" in docs
    assert "Transformer-Layer Config Validation" in docs
    assert "Transformer-Model Config Validation" in docs
    assert "matches decomposed cards by the `Transformer operation: ...`" in docs
    assert "representative transformer-layer summaries and configured layer counts" in docs
    assert "stale `model_inputs`" in docs
    assert "Visualizer External Loading" in docs
    assert "Load external JSON reports" in docs
    assert "Unsupported schemas" in docs
    assert "python examples/load_report_json.py" in docs
    assert "python -m photonic_bench.cli compare" in docs


def test_load_report_json_example_prints_summary(tmp_path: Path) -> None:
    config = load_config(Path("examples/nature_pace_64x64.yaml"))
    json_path = tmp_path / "nature.json"
    json_path.write_text(
        json.dumps(report_to_dict(evaluate(config))),
        encoding="utf-8",
    )

    completed = subprocess.run(
        [
            sys.executable,
            "examples/load_report_json.py",
            str(json_path),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    assert completed.returncode == 0, completed.stderr
    assert "benchmark: Nature PACE 64x64 matrix-vector calibration" in completed.stdout
    assert "schema: photonic-bench-report-v1" in completed.stdout
    assert "local_total_energy_pj: 872.832" in completed.stdout
    assert "published_tops: 8.19" in completed.stdout
