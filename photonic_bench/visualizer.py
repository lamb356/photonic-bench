from __future__ import annotations

from dataclasses import asdict, dataclass
import json
import math
import os
from pathlib import Path
from typing import Any, Literal

from photonic_bench.json_report import REPORT_SCHEMA_VERSION
from photonic_bench.transformer import TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION


ArtifactKind = Literal["matmul_card", "transformer_layer"]


@dataclass(frozen=True)
class ArtifactSummary:
    id: str
    kind: ArtifactKind
    schema_version: str
    benchmark_name: str
    description: str
    source_path: str
    browser_path: str
    macs: int
    equivalent_ops: int
    output_elements: int
    total_energy_pj: float
    energy_per_op_pj: float
    latency_label: str
    latency_ns: float
    throughput_equivalent_ops_per_second: float
    provenance_status: str
    has_published_reference: bool
    assumptions_count: int


@dataclass(frozen=True)
class VisualizerArtifact:
    summary: ArtifactSummary
    payload: dict[str, Any]


@dataclass(frozen=True)
class ArtifactIssue:
    source_path: str
    message: str


@dataclass(frozen=True)
class VisualizerData:
    reports_dir: str
    artifacts: tuple[VisualizerArtifact, ...]
    issues: tuple[ArtifactIssue, ...]

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def discover_visualizer_data(
    reports_dir: Path,
    *,
    link_base_dir: Path | None = None,
) -> VisualizerData:
    reports_root = reports_dir.resolve()
    if not reports_root.exists():
        raise ValueError(f"{reports_dir} does not exist")
    if not reports_root.is_dir():
        raise ValueError(f"{reports_dir} must be a directory")

    link_base = (link_base_dir or reports_root).resolve()
    artifacts: list[VisualizerArtifact] = []
    issues: list[ArtifactIssue] = []

    for path in sorted(reports_root.rglob("*.json")):
        source_path = _source_path(path, reports_root)
        browser_path = _browser_path(path, link_base)
        try:
            artifacts.append(
                load_visualizer_artifact(
                    path,
                    source_path=source_path,
                    browser_path=browser_path,
                )
            )
        except ValueError as exc:
            issues.append(ArtifactIssue(source_path=source_path, message=str(exc)))

    artifacts.sort(key=lambda artifact: (artifact.summary.kind, artifact.summary.id))
    return VisualizerData(
        reports_dir=reports_dir.as_posix(),
        artifacts=tuple(artifacts),
        issues=tuple(issues),
    )


def load_visualizer_artifact(
    path: Path,
    *,
    source_path: str | None = None,
    browser_path: str | None = None,
) -> VisualizerArtifact:
    payload = _load_json_object(path)
    schema_version = _required_str(payload, "schema_version", source=path)
    source = source_path or path.as_posix()
    browser = browser_path or source

    if schema_version == REPORT_SCHEMA_VERSION:
        return _load_matmul_artifact(payload, source_path=source, browser_path=browser)
    if schema_version == TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION:
        return _load_transformer_layer_artifact(
            payload,
            source_path=source,
            browser_path=browser,
        )

    raise ValueError(f"{source}: unsupported schema_version {schema_version!r}")


def write_visualizer(reports_dir: Path, output_path: Path) -> VisualizerData:
    data = discover_visualizer_data(reports_dir, link_base_dir=output_path.parent)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(render_visualizer_html(data), encoding="utf-8")
    return data


def render_visualizer_html(data: VisualizerData) -> str:
    data_json = (
        json.dumps(data.to_dict(), indent=2, allow_nan=False)
        .replace("</", "<\\/")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    )
    artifact_count = len(data.artifacts)
    issue_count = len(data.issues)

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PhotonicBench Visualizer</title>
  <style>
    :root {{
      color-scheme: light;
      --paper: #f7f8f5;
      --panel: #ffffff;
      --ink: #19211f;
      --muted: #5b6762;
      --line: #d9ded8;
      --teal: #0b6f72;
      --teal-soft: #dcefed;
      --amber: #a16207;
      --amber-soft: #fff3cf;
      --red: #a43d3d;
      --red-soft: #ffe6e2;
      --steel: #46535a;
      --shadow: 0 14px 35px rgba(24, 33, 31, 0.08);
    }}

    * {{
      box-sizing: border-box;
    }}

    body {{
      margin: 0;
      min-height: 100vh;
      background:
        linear-gradient(90deg, rgba(25, 33, 31, 0.035) 1px, transparent 1px),
        linear-gradient(180deg, rgba(25, 33, 31, 0.035) 1px, transparent 1px),
        var(--paper);
      background-size: 28px 28px;
      color: var(--ink);
      font-family: "Aptos", "Segoe UI", sans-serif;
      letter-spacing: 0;
    }}

    button, input, select {{
      font: inherit;
    }}

    .app {{
      display: grid;
      grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
      min-height: 100vh;
    }}

    .rail {{
      border-right: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(8px);
      padding: 22px;
      position: sticky;
      top: 0;
      align-self: start;
      min-height: 100vh;
    }}

    .brand {{
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }}

    .mark {{
      width: 34px;
      height: 34px;
      border: 2px solid var(--ink);
      display: grid;
      place-items: center;
      background: var(--amber-soft);
      box-shadow: 4px 4px 0 var(--teal);
    }}

    .mark::before {{
      content: "";
      width: 14px;
      height: 14px;
      border: 2px solid var(--ink);
      transform: rotate(45deg);
      background: var(--panel);
    }}

    h1, h2, h3 {{
      margin: 0;
      line-height: 1.1;
    }}

    h1 {{
      font-size: 1.22rem;
    }}

    .subtitle {{
      color: var(--muted);
      font-size: 0.88rem;
      margin-top: 3px;
    }}

    .counts {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 18px 0;
    }}

    .count-box {{
      border: 1px solid var(--line);
      background: var(--panel);
      padding: 10px;
      border-radius: 6px;
    }}

    .count-box strong {{
      display: block;
      font-size: 1.25rem;
    }}

    .count-box span {{
      color: var(--muted);
      font-size: 0.78rem;
    }}

    .filters {{
      display: grid;
      gap: 8px;
      margin-bottom: 14px;
    }}

    .filters input, .filters select {{
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: var(--panel);
      color: var(--ink);
      padding: 9px 10px;
    }}

    .artifact-list {{
      display: grid;
      gap: 8px;
    }}

    .artifact-row {{
      width: 100%;
      border: 1px solid var(--line);
      border-left: 4px solid var(--steel);
      border-radius: 6px;
      background: var(--panel);
      color: var(--ink);
      padding: 10px;
      text-align: left;
      cursor: pointer;
      transition: border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;
    }}

    .artifact-row:hover,
    .artifact-row:focus {{
      border-color: var(--teal);
      box-shadow: 0 8px 18px rgba(11, 111, 114, 0.12);
      transform: translateY(-1px);
      outline: none;
    }}

    .artifact-row.active {{
      border-left-color: var(--teal);
      box-shadow: 0 0 0 2px var(--teal-soft);
    }}

    .artifact-title {{
      font-weight: 700;
      font-size: 0.94rem;
    }}

    .artifact-meta {{
      color: var(--muted);
      font-size: 0.76rem;
      margin-top: 6px;
      word-break: break-word;
    }}

    .badge-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }}

    .badge {{
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 3px 7px;
      background: #f4f6f2;
      color: var(--steel);
      font-size: 0.72rem;
      font-weight: 700;
    }}

    .badge.layer {{
      background: var(--teal-soft);
      color: var(--teal);
    }}

    .badge.warn {{
      background: var(--amber-soft);
      color: var(--amber);
    }}

    main {{
      padding: 24px;
      min-width: 0;
    }}

    .detail {{
      max-width: 1180px;
      margin: 0 auto;
      display: grid;
      gap: 16px;
    }}

    .header-panel,
    .panel {{
      background: rgba(255, 255, 255, 0.94);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }}

    .header-panel {{
      padding: 20px;
      display: grid;
      gap: 14px;
    }}

    .header-top {{
      display: flex;
      justify-content: space-between;
      gap: 14px;
      align-items: start;
    }}

    .header-title {{
      display: grid;
      gap: 6px;
    }}

    .header-title h2 {{
      font-size: clamp(1.35rem, 2vw, 2rem);
    }}

    .description {{
      color: var(--muted);
      max-width: 86ch;
    }}

    .source-link {{
      color: var(--teal);
      font-weight: 700;
      text-decoration: none;
      overflow-wrap: anywhere;
    }}

    .source-link:hover {{
      text-decoration: underline;
    }}

    .metric-grid {{
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }}

    .metric {{
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fbfcfa;
      padding: 12px;
      min-width: 0;
    }}

    .metric-label {{
      color: var(--muted);
      font-size: 0.78rem;
      margin-bottom: 6px;
    }}

    .metric-value {{
      font-size: 1.12rem;
      font-weight: 800;
      overflow-wrap: anywhere;
    }}

    .metric-note {{
      color: var(--muted);
      font-size: 0.75rem;
      margin-top: 5px;
    }}

    .panel {{
      padding: 16px;
      overflow: hidden;
    }}

    .panel h3 {{
      font-size: 1rem;
      margin-bottom: 12px;
    }}

    .grid-2 {{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }}

    .concepts {{
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }}

    .concept {{
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 11px;
      background: #fbfcfa;
    }}

    .concept strong {{
      display: block;
      margin-bottom: 5px;
    }}

    .concept span {{
      color: var(--muted);
      font-size: 0.82rem;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 0.86rem;
    }}

    th, td {{
      border-bottom: 1px solid var(--line);
      padding: 8px 7px;
      text-align: left;
      vertical-align: top;
    }}

    th {{
      color: var(--muted);
      font-size: 0.76rem;
      text-transform: uppercase;
      font-weight: 800;
    }}

    td.num, th.num {{
      text-align: right;
      font-variant-numeric: tabular-nums;
    }}

    .table-wrap {{
      overflow-x: auto;
    }}

    .chips {{
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }}

    .chip {{
      background: var(--amber-soft);
      border: 1px solid #ead18c;
      color: var(--amber);
      padding: 5px 8px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
    }}

    .notes {{
      display: grid;
      gap: 8px;
      color: var(--muted);
      font-size: 0.88rem;
    }}

    .notes p {{
      margin: 0;
    }}

    .issue-list {{
      margin-top: 16px;
      display: grid;
      gap: 8px;
    }}

    .issue {{
      border: 1px solid #efb6ad;
      border-radius: 6px;
      background: var(--red-soft);
      color: var(--red);
      padding: 9px;
      font-size: 0.82rem;
    }}

    .empty {{
      color: var(--muted);
      border: 1px dashed var(--line);
      border-radius: 8px;
      padding: 24px;
      background: rgba(255, 255, 255, 0.75);
    }}

    @media (max-width: 980px) {{
      .app {{
        grid-template-columns: 1fr;
      }}

      .rail {{
        position: relative;
        min-height: auto;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }}

      .metric-grid,
      .concepts,
      .grid-2 {{
        grid-template-columns: 1fr 1fr;
      }}
    }}

    @media (max-width: 620px) {{
      main, .rail {{
        padding: 14px;
      }}

      .metric-grid,
      .concepts,
      .grid-2,
      .counts {{
        grid-template-columns: 1fr;
      }}

      .header-top {{
        display: grid;
      }}
    }}
  </style>
</head>
<body>
  <div class="app">
    <aside class="rail">
      <div class="brand">
        <div class="mark" aria-hidden="true"></div>
        <div>
          <h1>PhotonicBench Visualizer</h1>
          <div class="subtitle">JSON artifact workbench</div>
        </div>
      </div>
      <div class="counts" aria-label="Artifact counts">
        <div class="count-box"><strong>{artifact_count}</strong><span>loaded artifacts</span></div>
        <div class="count-box"><strong>{issue_count}</strong><span>index warnings</span></div>
      </div>
      <div class="filters">
        <input id="search" type="search" placeholder="Filter artifacts" aria-label="Filter artifacts">
        <select id="kind-filter" aria-label="Filter by artifact kind">
          <option value="all">All schemas</option>
          <option value="transformer_layer">Transformer layers</option>
          <option value="matmul_card">Per-matmul cards</option>
        </select>
      </div>
      <div id="artifact-list" class="artifact-list"></div>
      <div id="issues" class="issue-list"></div>
    </aside>
    <main>
      <div id="detail" class="detail"></div>
    </main>
  </div>
  <script id="photonicbench-data" type="application/json">{data_json}</script>
  <script>
    const state = {{
      data: JSON.parse(document.getElementById("photonicbench-data").textContent),
      selectedId: null,
      search: "",
      kind: "all",
    }};

    const byId = new Map(state.data.artifacts.map((artifact) => [artifact.summary.id, artifact]));
    const firstLayer = state.data.artifacts.find((artifact) => artifact.summary.kind === "transformer_layer");
    state.selectedId = (firstLayer || state.data.artifacts[0] || {{ summary: {{ id: null }} }}).summary.id;

    document.getElementById("search").addEventListener("input", (event) => {{
      state.search = event.target.value.toLowerCase();
      render();
    }});

    document.getElementById("kind-filter").addEventListener("change", (event) => {{
      state.kind = event.target.value;
      render();
    }});

    function escapeHtml(value) {{
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }}

    function formatNumber(value) {{
      if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
      const number = Number(value);
      if (Math.abs(number) >= 1e6 || (Math.abs(number) > 0 && Math.abs(number) < 0.001)) {{
        return number.toExponential(3);
      }}
      return new Intl.NumberFormat("en-US", {{ maximumFractionDigits: 6 }}).format(number);
    }}

    function formatPj(value) {{
      return `${{formatNumber(value)}} pJ`;
    }}

    function formatNs(value) {{
      return `${{formatNumber(value)}} ns`;
    }}

    function kindLabel(kind) {{
      return kind === "transformer_layer" ? "Transformer layer" : "Per-matmul card";
    }}

    function filteredArtifacts() {{
      return state.data.artifacts.filter((artifact) => {{
        const summary = artifact.summary;
        const haystack = `${{summary.benchmark_name}} ${{summary.source_path}} ${{summary.schema_version}}`.toLowerCase();
        return (state.kind === "all" || summary.kind === state.kind) && haystack.includes(state.search);
      }});
    }}

    function renderList() {{
      const list = document.getElementById("artifact-list");
      const artifacts = filteredArtifacts();
      if (!artifacts.length) {{
        list.innerHTML = `<div class="empty">No artifacts match the current filter.</div>`;
        return;
      }}

      list.innerHTML = artifacts.map((artifact) => {{
        const summary = artifact.summary;
        const active = summary.id === state.selectedId ? " active" : "";
        const badgeClass = summary.kind === "transformer_layer" ? "badge layer" : "badge";
        return `
          <button class="artifact-row${{active}}" data-id="${{escapeHtml(summary.id)}}">
            <div class="artifact-title">${{escapeHtml(summary.benchmark_name)}}</div>
            <div class="artifact-meta">${{escapeHtml(summary.source_path)}}</div>
            <div class="badge-row">
              <span class="${{badgeClass}}">${{kindLabel(summary.kind)}}</span>
              <span class="badge">${{formatNumber(summary.equivalent_ops)}} eq ops</span>
              ${{summary.has_published_reference ? '<span class="badge warn">published reference</span>' : ""}}
            </div>
          </button>
        `;
      }}).join("");

      list.querySelectorAll("button[data-id]").forEach((button) => {{
        button.addEventListener("click", () => {{
          state.selectedId = button.dataset.id;
          render();
        }});
      }});
    }}

    function renderIssues() {{
      const issues = document.getElementById("issues");
      if (!state.data.issues.length) {{
        issues.innerHTML = "";
        return;
      }}
      issues.innerHTML = state.data.issues.map((issue) => `
        <div class="issue"><strong>${{escapeHtml(issue.source_path)}}:</strong> ${{escapeHtml(issue.message)}}</div>
      `).join("");
    }}

    function metric(label, value, note = "") {{
      return `
        <div class="metric">
          <div class="metric-label">${{escapeHtml(label)}}</div>
          <div class="metric-value">${{escapeHtml(value)}}</div>
          ${{note ? `<div class="metric-note">${{escapeHtml(note)}}</div>` : ""}}
        </div>
      `;
    }}

    function header(summary) {{
      return `
        <section class="header-panel">
          <div class="header-top">
            <div class="header-title">
              <div class="badge-row">
                <span class="${{summary.kind === "transformer_layer" ? "badge layer" : "badge"}}">${{kindLabel(summary.kind)}}</span>
                <span class="badge">${{escapeHtml(summary.schema_version)}}</span>
              </div>
              <h2>${{escapeHtml(summary.benchmark_name)}}</h2>
              <div class="description">${{escapeHtml(summary.description)}}</div>
            </div>
            <a class="source-link" href="${{escapeHtml(summary.browser_path)}}">${{escapeHtml(summary.source_path)}}</a>
          </div>
          <div class="metric-grid">
            ${{metric("MACs", formatNumber(summary.macs), "from workload")}}
            ${{metric("Equivalent ops", formatNumber(summary.equivalent_ops), "2x MAC accounting")}}
            ${{metric("Local total energy", formatPj(summary.total_energy_pj), "local_model estimate")}}
            ${{metric(summary.latency_label, formatNs(summary.latency_ns), "schema-specific timing")}}
          </div>
        </section>
      `;
    }}

    function simpleTable(headers, rows) {{
      return `
        <div class="table-wrap">
          <table>
            <thead><tr>${{headers.map((header) => `<th${{header.num ? ' class="num"' : ""}}>${{escapeHtml(header.label)}}</th>`).join("")}}</tr></thead>
            <tbody>
              ${{rows.map((row) => `<tr>${{row.map((cell, index) => `<td${{headers[index].num ? ' class="num"' : ""}}>${{cell}}</td>`).join("")}}</tr>`).join("")}}
            </tbody>
          </table>
        </div>
      `;
    }}

    function objectRows(object, formatter = (value) => typeof value === "number" ? formatNumber(value) : value) {{
      return Object.entries(object || {{}}).map(([key, value]) => [
        escapeHtml(key),
        `<span class="num">${{escapeHtml(formatter(value))}}</span>`,
      ]);
    }}

    function renderConcepts() {{
      return `
        <section class="panel">
          <h3>Modeling Boundaries</h3>
          <div class="concepts">
            <div class="concept"><strong>Local model estimate</strong><span>Energy, timing, and noise numbers come from local_model fields.</span></div>
            <div class="concept"><strong>Published references</strong><span>Paper-derived values stay separate under published_reference.</span></div>
            <div class="concept"><strong>Serial timing</strong><span>Transformer aggregate timing is a serial sum, not a fused scheduler claim.</span></div>
            <div class="concept"><strong>Non-additive noise</strong><span>Aggregate noise is diagnostic extrema, not a summed layer error.</span></div>
          </div>
        </section>
      `;
    }}

    function renderMatmul(artifact) {{
      const payload = artifact.payload;
      const summary = artifact.summary;
      const shape = payload.workload.shape;
      const energyRows = objectRows(payload.local_model.energy, (value) => typeof value === "number" ? formatNumber(value) : value);
      const timingRows = objectRows(payload.local_model.timing, (value) => typeof value === "number" ? formatNumber(value) : value);
      const published = payload.published_reference;
      const provenance = payload.provenance;

      return `
        ${{header(summary)}}
        ${{renderConcepts()}}
        <div class="grid-2">
          <section class="panel">
            <h3>Workload Shape</h3>
            ${{simpleTable([{{label: "Field"}}, {{label: "Value", num: true}}], [
              ["m", escapeHtml(shape.m)],
              ["k", escapeHtml(shape.k)],
              ["n", escapeHtml(shape.n)],
              ["output elements", escapeHtml(payload.workload.output_elements)],
            ])}}
          </section>
          <section class="panel">
            <h3>Timing</h3>
            ${{simpleTable([{{label: "Field"}}, {{label: "Value", num: true}}], timingRows)}}
          </section>
        </div>
        <section class="panel">
          <h3>Local Energy Components</h3>
          ${{simpleTable([{{label: "Component"}}, {{label: "Value", num: true}}], energyRows)}}
        </section>
        <div class="grid-2">
          <section class="panel">
            <h3>Published Reference</h3>
            ${{published ? `<div class="notes"><p><strong>${{escapeHtml(published.provenance?.source_title || "Published source")}}</strong></p><p>${{escapeHtml(published.separation_note)}}</p></div>` : '<div class="notes"><p>No published_reference block is attached to this local model card.</p></div>'}}
          </section>
          <section class="panel">
            <h3>Provenance</h3>
            ${{provenance ? simpleTable([{{label: "Field"}}, {{label: "Value"}}], Object.entries(provenance).map(([key, value]) => [escapeHtml(key), escapeHtml(value)])) : '<div class="notes"><p>No provenance block recorded.</p></div>'}}
          </section>
        </div>
        <section class="panel">
          <h3>Assumptions</h3>
          <div class="notes">${{payload.assumptions.map((item) => `<p>${{escapeHtml(item)}}</p>`).join("")}}</div>
        </section>
      `;
    }}

    function renderTransformer(artifact) {{
      const payload = artifact.payload;
      const summary = artifact.summary;
      const shape = payload.transformer_layer.shape;
      const timing = payload.local_model.timing;
      const noise = payload.local_model.noise;
      const sourceDir = summary.browser_path.split("/").slice(0, -1).join("/");
      const matmulRows = payload.matmuls.map((row) => {{
        const href = sourceDir ? `${{sourceDir}}/${{row.json_report}}` : row.json_report;
        return [
          escapeHtml(row.label),
          `<code>${{escapeHtml(row.formula)}}</code>`,
          `<a class="source-link" href="${{escapeHtml(href)}}">${{escapeHtml(row.json_report)}}</a>`,
          escapeHtml(formatNumber(row.workload.macs)),
          escapeHtml(formatPj(row.local_model.energy.total_pj)),
          escapeHtml(formatNs(row.local_model.timing.batch_latency_ns)),
        ];
      }});
      const formulaRows = payload.formula_audit.rows.map((row) => [
        escapeHtml(row.label),
        `<code>${{escapeHtml(row.formula)}}</code>`,
        escapeHtml(formatNumber(row.expected_macs)),
        escapeHtml(formatNumber(row.json_macs)),
        row.expected_macs === row.json_macs ? '<span class="badge layer">match</span>' : '<span class="badge warn">mismatch</span>',
      ]);

      return `
        ${{header(summary)}}
        ${{renderConcepts()}}
        <section class="panel">
          <h3>Transformer Layer Shape</h3>
          ${{simpleTable([{{label: "Field"}}, {{label: "Value", num: true}}], [
            ["layer type", escapeHtml(payload.transformer_layer.layer_type)],
            ["attention mode", escapeHtml(payload.transformer_layer.attention_mode)],
            ["batch size", escapeHtml(shape.batch_size)],
            ["sequence length", escapeHtml(shape.sequence_length)],
            ["hidden size", escapeHtml(shape.hidden_size)],
            ["heads", escapeHtml(shape.num_heads)],
            ["head dimension", escapeHtml(shape.head_dim)],
            ["MLP intermediate", escapeHtml(shape.mlp_intermediate_size)],
          ])}}
        </section>
        <div class="grid-2">
          <section class="panel">
            <h3>Serial Timing</h3>
            <div class="notes"><p>Timing model: ${{escapeHtml(timing.timing_model)}}.</p><p>These values are serial summaries over decomposed matmuls.</p></div>
            ${{simpleTable([{{label: "Field"}}, {{label: "Value", num: true}}], objectRows(timing))}}
          </section>
          <section class="panel">
            <h3>Non-additive Noise</h3>
            <div class="notes"><p>${{escapeHtml(noise.note)}}</p></div>
            ${{simpleTable([{{label: "Field"}}, {{label: "Value", num: true}}], objectRows(noise, (value) => typeof value === "number" ? formatNumber(value) : value))}}
          </section>
        </div>
        <section class="panel">
          <h3>Aggregate Semantics</h3>
          <div class="notes">${{Object.values(payload.aggregate_semantics).map((value) => `<p>${{escapeHtml(value)}}</p>`).join("")}}</div>
        </section>
        <section class="panel">
          <h3>Formula Audit</h3>
          ${{simpleTable([
            {{label: "Operation"}},
            {{label: "Formula"}},
            {{label: "Expected MACs", num: true}},
            {{label: "JSON MACs", num: true}},
            {{label: "Status"}},
          ], formulaRows)}}
        </section>
        <section class="panel">
          <h3>Per-Matmul Breakdown</h3>
          ${{simpleTable([
            {{label: "Operation"}},
            {{label: "Formula"}},
            {{label: "JSON card"}},
            {{label: "MACs", num: true}},
            {{label: "Energy", num: true}},
            {{label: "Batch latency", num: true}},
          ], matmulRows)}}
        </section>
        <div class="grid-2">
          <section class="panel">
            <h3>Transformer Exclusions</h3>
            <div class="chips">${{payload.exclusions.map((item) => `<span class="chip">${{escapeHtml(item)}}</span>`).join("")}}</div>
          </section>
          <section class="panel">
            <h3>Provenance</h3>
            ${{payload.provenance ? simpleTable([{{label: "Field"}}, {{label: "Value"}}], Object.entries(payload.provenance).map(([key, value]) => [escapeHtml(key), escapeHtml(value)])) : '<div class="notes"><p>No provenance block recorded.</p></div>'}}
          </section>
        </div>
        <section class="panel">
          <h3>Assumptions</h3>
          <div class="notes">${{payload.assumptions.map((item) => `<p>${{escapeHtml(item)}}</p>`).join("")}}</div>
        </section>
      `;
    }}

    function renderDetail() {{
      const detail = document.getElementById("detail");
      const artifact = byId.get(state.selectedId);
      if (!artifact) {{
        detail.innerHTML = '<div class="empty">No artifact selected.</div>';
        return;
      }}
      detail.innerHTML = artifact.summary.kind === "transformer_layer"
        ? renderTransformer(artifact)
        : renderMatmul(artifact);
    }}

    function render() {{
      if (!byId.has(state.selectedId)) {{
        const first = filteredArtifacts()[0];
        state.selectedId = first ? first.summary.id : null;
      }}
      renderList();
      renderIssues();
      renderDetail();
    }}

    render();
  </script>
</body>
</html>
"""


def _load_matmul_artifact(
    payload: dict[str, Any],
    *,
    source_path: str,
    browser_path: str,
) -> VisualizerArtifact:
    workload = _required_dict(payload, "workload", source=source_path)
    if _required_str(workload, "type", source=source_path) != "matmul":
        raise ValueError(f"{source_path}: workload.type must be 'matmul'")

    summary = ArtifactSummary(
        id=source_path,
        kind="matmul_card",
        schema_version=REPORT_SCHEMA_VERSION,
        benchmark_name=_required_str(payload, "benchmark", "name", source=source_path),
        description=_required_str(
            payload,
            "benchmark",
            "description",
            source=source_path,
        ),
        source_path=source_path,
        browser_path=browser_path,
        macs=_required_int(workload, "macs", source=source_path),
        equivalent_ops=_required_int(workload, "equivalent_ops", source=source_path),
        output_elements=_required_int(workload, "output_elements", source=source_path),
        total_energy_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "total_pj",
            source=source_path,
        ),
        energy_per_op_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "energy_per_op_pj",
            source=source_path,
        ),
        latency_label="Batch latency",
        latency_ns=_required_number(
            payload,
            "local_model",
            "timing",
            "batch_latency_ns",
            source=source_path,
        ),
        throughput_equivalent_ops_per_second=_required_number(
            payload,
            "local_model",
            "timing",
            "steady_state_equivalent_ops_per_second",
            source=source_path,
        ),
        provenance_status=_provenance_status(payload),
        has_published_reference=payload.get("published_reference") is not None,
        assumptions_count=len(_required_list(payload, "assumptions", source=source_path)),
    )
    return VisualizerArtifact(summary=summary, payload=payload)


def _load_transformer_layer_artifact(
    payload: dict[str, Any],
    *,
    source_path: str,
    browser_path: str,
) -> VisualizerArtifact:
    artifact_type = _required_str(payload, "artifact_type", source=source_path)
    if artifact_type != "transformer_layer_aggregate":
        raise ValueError(
            f"{source_path}: artifact_type must be 'transformer_layer_aggregate'"
        )
    workload = _required_dict(payload, "workload", source=source_path)
    if _required_str(workload, "type", source=source_path) != "transformer_layer":
        raise ValueError(f"{source_path}: workload.type must be 'transformer_layer'")

    summary = ArtifactSummary(
        id=source_path,
        kind="transformer_layer",
        schema_version=TRANSFORMER_LAYER_REPORT_SCHEMA_VERSION,
        benchmark_name=_required_str(payload, "benchmark", "name", source=source_path),
        description=_required_str(
            payload,
            "benchmark",
            "description",
            source=source_path,
        ),
        source_path=source_path,
        browser_path=browser_path,
        macs=_required_int(workload, "macs", source=source_path),
        equivalent_ops=_required_int(workload, "equivalent_ops", source=source_path),
        output_elements=_required_int(workload, "output_elements", source=source_path),
        total_energy_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "total_pj",
            source=source_path,
        ),
        energy_per_op_pj=_required_number(
            payload,
            "local_model",
            "energy",
            "energy_per_op_pj",
            source=source_path,
        ),
        latency_label="Serial batch latency",
        latency_ns=_required_number(
            payload,
            "local_model",
            "timing",
            "serial_batch_latency_ns",
            source=source_path,
        ),
        throughput_equivalent_ops_per_second=_required_number(
            payload,
            "local_model",
            "timing",
            "serial_effective_equivalent_ops_per_second",
            source=source_path,
        ),
        provenance_status=_provenance_status(payload),
        has_published_reference=payload.get("published_reference") is not None,
        assumptions_count=len(_required_list(payload, "assumptions", source=source_path)),
    )
    _required_list(payload, "matmuls", source=source_path)
    _required_dict(payload, "formula_audit", source=source_path)
    _required_list(payload, "exclusions", source=source_path)
    return VisualizerArtifact(summary=summary, payload=payload)


def _load_json_object(path: Path) -> dict[str, Any]:
    try:
        raw_text = path.read_text(encoding="utf-8")
    except OSError as exc:
        raise ValueError(f"{path}: cannot read file: {exc}") from exc

    try:
        payload = json.loads(raw_text, parse_constant=_reject_json_constant)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"{path}: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}"
        ) from exc
    except ValueError as exc:
        raise ValueError(f"{path}: invalid JSON: {exc}") from exc

    if not isinstance(payload, dict):
        raise ValueError(f"{path}: expected a JSON object")
    return payload


def _reject_json_constant(value: str) -> None:
    raise ValueError(f"unsupported non-finite JSON value {value!r}")


def _provenance_status(payload: dict[str, Any]) -> str:
    provenance = payload.get("provenance")
    if isinstance(provenance, dict):
        claim_status = provenance.get("claim_status")
        if isinstance(claim_status, str) and claim_status:
            return claim_status
        source_title = provenance.get("source_title")
        if isinstance(source_title, str) and source_title:
            return source_title
    return "local model artifact"


def _source_path(path: Path, reports_root: Path) -> str:
    return path.relative_to(reports_root).as_posix()


def _browser_path(path: Path, link_base: Path) -> str:
    return Path(_relative_path(path.resolve(), link_base)).as_posix()


def _relative_path(path: Path, base: Path) -> str:
    return os.path.relpath(path, start=base)


def _required_dict(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> dict[str, Any]:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, dict):
        raise ValueError(f"{source}: {_field(keys)} must be an object")
    return value


def _required_list(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> list[Any]:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, list):
        raise ValueError(f"{source}: {_field(keys)} must be a list")
    return value


def _required_str(
    payload: dict[str, Any],
    *keys: str,
    source: str | Path,
) -> str:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, str):
        raise ValueError(f"{source}: {_field(keys)} must be a string")
    return value


def _required_int(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> int:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, int) or isinstance(value, bool):
        raise ValueError(f"{source}: {_field(keys)} must be an integer")
    return value


def _required_number(
    payload: dict[str, Any],
    *keys: str,
    source: str,
) -> float:
    value = _required_value(payload, *keys, source=source)
    if not isinstance(value, int | float) or isinstance(value, bool):
        raise ValueError(f"{source}: {_field(keys)} must be numeric and finite")
    number = float(value)
    if not math.isfinite(number):
        raise ValueError(f"{source}: {_field(keys)} must be numeric and finite")
    return number


def _required_value(
    payload: dict[str, Any],
    *keys: str,
    source: str | Path,
) -> Any:
    current: Any = payload
    for index, key in enumerate(keys):
        if not isinstance(current, dict):
            parent = ".".join(keys[:index]) or "<root>"
            raise ValueError(
                f"{source}: {_field(keys)} is missing because {parent} is not an object"
            )
        if key not in current:
            raise ValueError(f"{source}: missing {_field(keys)}")
        current = current[key]
    return current


def _field(keys: tuple[str, ...]) -> str:
    return ".".join(keys)
