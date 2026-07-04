(function () {
  "use strict";

  const state = {
    data: window.PhotonicBenchIndex || null,
    selectedId: null,
    search: "",
    kind: "all",
    boundary: "all",
    sort: "name",
    view: "detail",
    compareIds: new Set(),
    payloadCache: new Map(),
    payloadPromises: new Map(),
  };

  if (!state.data) {
    document.getElementById("detail").innerHTML =
      '<div class="empty">Missing generated visualizer index. Regenerate the visualizer from the CLI.</div>';
    return;
  }

  const byId = new Map(
    state.data.artifacts.map((artifact) => [artifact.summary.id, artifact])
  );
  const firstLayer = state.data.artifacts.find(
    (artifact) => artifact.summary.kind === "transformer_layer"
  );
  state.selectedId = (
    firstLayer ||
    state.data.artifacts[0] || { summary: { id: null } }
  ).summary.id;

  document.getElementById("artifact-count").textContent =
    state.data.artifacts.length;
  document.getElementById("issue-count").textContent = state.data.issues.length;

  document.getElementById("search").addEventListener("input", (event) => {
    state.search = event.target.value.toLowerCase();
    render();
  });

  document.getElementById("kind-filter").addEventListener("change", (event) => {
    state.kind = event.target.value;
    render();
  });

  document
    .getElementById("boundary-filter")
    .addEventListener("change", (event) => {
      state.boundary = event.target.value;
      render();
    });

  document.getElementById("sort-filter").addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  document.getElementById("detail-mode").addEventListener("click", () => {
    state.view = "detail";
    render();
  });

  document.getElementById("compare-mode").addEventListener("click", () => {
    state.view = "compare";
    render();
  });

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatNumber(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    const number = Number(value);
    if (
      Math.abs(number) >= 1e6 ||
      (Math.abs(number) > 0 && Math.abs(number) < 0.001)
    ) {
      return number.toExponential(3);
    }
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 6,
    }).format(number);
  }

  function formatPj(value) {
    return `${formatNumber(value)} pJ`;
  }

  function formatNs(value) {
    return `${formatNumber(value)} ns`;
  }

  function formatThroughput(value) {
    return `${formatNumber(value)} eq ops/s`;
  }

  function yesNo(value) {
    return value ? "yes" : "no";
  }

  function kindLabel(kind) {
    return kind === "transformer_layer"
      ? "Transformer layer"
      : "Per-matmul card";
  }

  function boundaryMatches(summary) {
    if (state.boundary === "all") return true;
    if (state.boundary === "published") return summary.has_published_reference;
    if (state.boundary === "local-only") return !summary.has_published_reference;
    if (state.boundary === "provenance") {
      return summary.provenance_status !== "local model artifact";
    }
    if (state.boundary === "transformer-boundaries") {
      return summary.kind === "transformer_layer";
    }
    return true;
  }

  function filteredArtifacts() {
    const artifacts = state.data.artifacts.filter((artifact) => {
      const summary = artifact.summary;
      const haystack = [
        summary.benchmark_name,
        summary.description,
        summary.source_path,
        summary.schema_version,
        ...(summary.boundary_tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return (
        (state.kind === "all" || summary.kind === state.kind) &&
        boundaryMatches(summary) &&
        haystack.includes(state.search)
      );
    });

    return artifacts.sort((left, right) => {
      const a = left.summary;
      const b = right.summary;
      if (state.sort === "energy") return a.total_energy_pj - b.total_energy_pj;
      if (state.sort === "latency") return a.latency_ns - b.latency_ns;
      if (state.sort === "ops") return b.equivalent_ops - a.equivalent_ops;
      return a.benchmark_name.localeCompare(b.benchmark_name);
    });
  }

  function renderList() {
    const list = document.getElementById("artifact-list");
    const artifacts = filteredArtifacts();
    if (!artifacts.length) {
      list.innerHTML =
        '<div class="empty">No artifacts match the current filters.</div>';
      return;
    }

    list.innerHTML = artifacts
      .map((artifact) => {
        const summary = artifact.summary;
        const active = summary.id === state.selectedId ? " active" : "";
        const checked = state.compareIds.has(summary.id) ? " checked" : "";
        const badgeClass =
          summary.kind === "transformer_layer" ? "badge layer" : "badge";
        const tags = (summary.boundary_tags || [])
          .slice(0, 3)
          .map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`)
          .join("");
        return `
          <div class="artifact-row${active}" data-id="${escapeHtml(summary.id)}">
            <button class="artifact-main" type="button" data-id="${escapeHtml(summary.id)}">
              <div class="artifact-title">${escapeHtml(summary.benchmark_name)}</div>
              <div class="artifact-meta">${escapeHtml(summary.source_path)}</div>
              <div class="badge-row">
                <span class="${badgeClass}">${kindLabel(summary.kind)}</span>
                <span class="badge">${formatNumber(summary.equivalent_ops)} eq ops</span>
                <span class="badge">${formatPj(summary.total_energy_pj)}</span>
                ${
                  summary.has_published_reference
                    ? '<span class="badge warn">published reference</span>'
                    : ""
                }
                ${tags}
              </div>
            </button>
            <label class="compare-pick">
              <input type="checkbox" data-compare-id="${escapeHtml(summary.id)}"${checked}>
              Compare
            </label>
          </div>
        `;
      })
      .join("");

    list.querySelectorAll("button[data-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedId = button.dataset.id;
        state.view = "detail";
        render();
      });
    });

    list.querySelectorAll("input[data-compare-id]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const id = checkbox.dataset.compareId;
        if (checkbox.checked) {
          state.compareIds.add(id);
        } else {
          state.compareIds.delete(id);
        }
        render();
      });
    });
  }

  function renderIssues() {
    const issues = document.getElementById("issues");
    if (!state.data.issues.length) {
      issues.innerHTML = "";
      return;
    }
    issues.innerHTML = state.data.issues
      .map(
        (issue) => `
        <div class="issue"><strong>${escapeHtml(issue.source_path)}:</strong> ${escapeHtml(issue.message)}</div>
      `
      )
      .join("");
  }

  function metric(label, value, note = "") {
    return `
      <div class="metric">
        <div class="metric-label">${escapeHtml(label)}</div>
        <div class="metric-value">${escapeHtml(value)}</div>
        ${note ? `<div class="metric-note">${escapeHtml(note)}</div>` : ""}
      </div>
    `;
  }

  function header(summary) {
    return `
      <section class="header-panel">
        <div class="header-top">
          <div class="header-title">
            <div class="badge-row">
              <span class="${summary.kind === "transformer_layer" ? "badge layer" : "badge"}">${kindLabel(summary.kind)}</span>
              <span class="badge">${escapeHtml(summary.schema_version)}</span>
              ${summary.has_calibration_fit ? '<span class="badge mix">calibration fit</span>' : ""}
            </div>
            <h2>${escapeHtml(summary.benchmark_name)}</h2>
            <div class="description">${escapeHtml(summary.description)}</div>
          </div>
          <a class="source-link" href="${escapeHtml(summary.browser_path)}">${escapeHtml(summary.source_path)}</a>
        </div>
        <div class="metric-grid">
          ${metric("MACs", formatNumber(summary.macs), "from workload")}
          ${metric("Equivalent ops", formatNumber(summary.equivalent_ops), "2x MAC accounting")}
          ${metric("Local total energy", formatPj(summary.total_energy_pj), "local_model estimate")}
          ${metric(summary.latency_label, formatNs(summary.latency_ns), "schema-specific timing")}
        </div>
      </section>
    `;
  }

  function simpleTable(headers, rows, className = "") {
    return `
      <div class="table-wrap">
        <table class="${className}">
          <thead><tr>${headers
            .map(
              (header) =>
                `<th${header.num ? ' class="num"' : ""}>${escapeHtml(header.label)}</th>`
            )
            .join("")}</tr></thead>
          <tbody>
            ${rows
              .map(
                (row) =>
                  `<tr>${row
                    .map(
                      (cell, index) =>
                        `<td${headers[index].num ? ' class="num"' : ""}>${cell}</td>`
                    )
                    .join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function objectRows(object, formatter = defaultFormatter) {
    return Object.entries(object || {}).map(([key, value]) => [
      escapeHtml(key),
      `<span class="num">${escapeHtml(formatter(value))}</span>`,
    ]);
  }

  function defaultFormatter(value) {
    return typeof value === "number" ? formatNumber(value) : value;
  }

  function renderConcepts() {
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
  }

  function loadPayload(id) {
    if (state.payloadCache.has(id)) {
      return Promise.resolve(state.payloadCache.get(id));
    }
    if (state.payloadPromises.has(id)) {
      return state.payloadPromises.get(id);
    }

    const artifact = byId.get(id);
    if (!artifact || !artifact.summary.payload_script_path) {
      return Promise.reject(new Error(`No payload path recorded for ${id}`));
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = artifact.summary.payload_script_path;
      script.onload = () => {
        const registry = window.PhotonicBenchPayloadRegistry || {};
        const payload = registry[id];
        if (!payload) {
          reject(new Error(`Payload script loaded but did not register ${id}`));
          return;
        }
        state.payloadCache.set(id, payload);
        resolve(payload);
      };
      script.onerror = () => reject(new Error(`Could not load ${script.src}`));
      document.head.appendChild(script);
    });

    state.payloadPromises.set(id, promise);
    promise.catch(() => {
      state.payloadPromises.delete(id);
    });
    return promise;
  }

  function renderMatmul(artifact, payload) {
    const summary = artifact.summary;
    const shape = payload.workload.shape;
    const energyRows = objectRows(payload.local_model.energy);
    const timingRows = objectRows(payload.local_model.timing);
    const published = payload.published_reference;
    const provenance = payload.provenance;

    return `
      ${header(summary)}
      ${renderConcepts()}
      <div class="grid-2">
        <section class="panel">
          <h3>Workload Shape</h3>
          ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], [
            ["m", escapeHtml(shape.m)],
            ["k", escapeHtml(shape.k)],
            ["n", escapeHtml(shape.n)],
            ["output elements", escapeHtml(payload.workload.output_elements)],
          ])}
        </section>
        <section class="panel">
          <h3>Timing</h3>
          ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], timingRows)}
        </section>
      </div>
      <section class="panel">
        <h3>Local Energy Components</h3>
        ${simpleTable([{ label: "Component" }, { label: "Value", num: true }], energyRows)}
      </section>
      <div class="grid-2">
        <section class="panel">
          <h3>Published Reference</h3>
          ${
            published
              ? `<div class="notes"><p><strong>${escapeHtml(published.provenance?.source_title || "Published source")}</strong></p><p>${escapeHtml(published.separation_note)}</p></div>`
              : '<div class="notes"><p>No published_reference block is attached to this local model card.</p></div>'
          }
        </section>
        <section class="panel">
          <h3>Provenance</h3>
          ${
            provenance
              ? simpleTable(
                  [{ label: "Field" }, { label: "Value" }],
                  Object.entries(provenance).map(([key, value]) => [
                    escapeHtml(key),
                    escapeHtml(value),
                  ])
                )
              : '<div class="notes"><p>No provenance block recorded.</p></div>'
          }
        </section>
      </div>
      <section class="panel">
        <h3>Assumptions</h3>
        <div class="notes">${payload.assumptions
          .map((item) => `<p>${escapeHtml(item)}</p>`)
          .join("")}</div>
      </section>
    `;
  }

  function renderTransformer(artifact, payload) {
    const summary = artifact.summary;
    const shape = payload.transformer_layer.shape;
    const timing = payload.local_model.timing;
    const noise = payload.local_model.noise;
    const sourceDir = summary.browser_path.split("/").slice(0, -1).join("/");
    const matmulRows = payload.matmuls.map((row) => {
      const href = sourceDir ? `${sourceDir}/${row.json_report}` : row.json_report;
      return [
        escapeHtml(row.label),
        `<code>${escapeHtml(row.formula)}</code>`,
        `<a class="source-link" href="${escapeHtml(href)}">${escapeHtml(row.json_report)}</a>`,
        escapeHtml(formatNumber(row.workload.macs)),
        escapeHtml(formatPj(row.local_model.energy.total_pj)),
        escapeHtml(formatNs(row.local_model.timing.batch_latency_ns)),
      ];
    });
    const formulaRows = payload.formula_audit.rows.map((row) => [
      escapeHtml(row.label),
      `<code>${escapeHtml(row.formula)}</code>`,
      escapeHtml(formatNumber(row.expected_macs)),
      escapeHtml(formatNumber(row.json_macs)),
      row.expected_macs === row.json_macs
        ? '<span class="badge layer">match</span>'
        : '<span class="badge warn">mismatch</span>',
    ]);

    return `
      ${header(summary)}
      ${renderConcepts()}
      <section class="panel">
        <h3>Transformer Layer Shape</h3>
        ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], [
          ["layer type", escapeHtml(payload.transformer_layer.layer_type)],
          ["attention mode", escapeHtml(payload.transformer_layer.attention_mode)],
          ["batch size", escapeHtml(shape.batch_size)],
          ["sequence length", escapeHtml(shape.sequence_length)],
          ["hidden size", escapeHtml(shape.hidden_size)],
          ["heads", escapeHtml(shape.num_heads)],
          ["head dimension", escapeHtml(shape.head_dim)],
          ["MLP intermediate", escapeHtml(shape.mlp_intermediate_size)],
        ])}
      </section>
      <div class="grid-2">
        <section class="panel">
          <h3>Serial Timing</h3>
          <div class="notes"><p>Timing model: ${escapeHtml(timing.timing_model)}.</p><p>These values are serial summaries over decomposed matmuls.</p></div>
          ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], objectRows(timing))}
        </section>
        <section class="panel">
          <h3>Non-additive Noise</h3>
          <div class="notes"><p>${escapeHtml(noise.note)}</p></div>
          ${simpleTable(
            [{ label: "Field" }, { label: "Value", num: true }],
            objectRows(noise)
          )}
        </section>
      </div>
      <section class="panel">
        <h3>Aggregate Semantics</h3>
        <div class="notes">${Object.values(payload.aggregate_semantics)
          .map((value) => `<p>${escapeHtml(value)}</p>`)
          .join("")}</div>
      </section>
      <section class="panel">
        <h3>Formula Audit</h3>
        ${simpleTable(
          [
            { label: "Operation" },
            { label: "Formula" },
            { label: "Expected MACs", num: true },
            { label: "JSON MACs", num: true },
            { label: "Status" },
          ],
          formulaRows
        )}
      </section>
      <section class="panel">
        <h3>Per-Matmul Breakdown</h3>
        ${simpleTable(
          [
            { label: "Operation" },
            { label: "Formula" },
            { label: "JSON card" },
            { label: "MACs", num: true },
            { label: "Energy", num: true },
            { label: "Batch latency", num: true },
          ],
          matmulRows
        )}
      </section>
      <div class="grid-2">
        <section class="panel">
          <h3>Transformer Exclusions</h3>
          <div class="chips">${payload.exclusions
            .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
            .join("")}</div>
        </section>
        <section class="panel">
          <h3>Provenance</h3>
          ${
            payload.provenance
              ? simpleTable(
                  [{ label: "Field" }, { label: "Value" }],
                  Object.entries(payload.provenance).map(([key, value]) => [
                    escapeHtml(key),
                    escapeHtml(value),
                  ])
                )
              : '<div class="notes"><p>No provenance block recorded.</p></div>'
          }
        </section>
      </div>
      <section class="panel">
        <h3>Assumptions</h3>
        <div class="notes">${payload.assumptions
          .map((item) => `<p>${escapeHtml(item)}</p>`)
          .join("")}</div>
      </section>
    `;
  }

  function renderDetail() {
    const detail = document.getElementById("detail");
    const artifact = byId.get(state.selectedId);
    if (!artifact) {
      detail.innerHTML = '<div class="empty">No artifact selected.</div>';
      return;
    }

    detail.innerHTML = `
      ${header(artifact.summary)}
      <div class="empty">Loading artifact payload...</div>
    `;

    const selectedAtRequest = state.selectedId;
    loadPayload(artifact.summary.id)
      .then((payload) => {
        if (state.selectedId !== selectedAtRequest || state.view !== "detail") {
          return;
        }
        detail.innerHTML =
          artifact.summary.kind === "transformer_layer"
            ? renderTransformer(artifact, payload)
            : renderMatmul(artifact, payload);
      })
      .catch((error) => {
        detail.innerHTML = `<div class="empty">Could not load artifact payload: ${escapeHtml(error.message)}</div>`;
      });
  }

  function comparisonRows(artifacts) {
    const metricRows = [
      ["Kind", (summary) => kindLabel(summary.kind)],
      ["Schema", (summary) => summary.schema_version],
      [
        "Source",
        (summary) => ({
          html: `<a class="source-link" href="${escapeHtml(summary.browser_path)}">${escapeHtml(summary.source_path)}</a>`,
        }),
      ],
      ["MACs", (summary) => formatNumber(summary.macs)],
      ["Equivalent ops", (summary) => formatNumber(summary.equivalent_ops)],
      ["Output elements", (summary) => formatNumber(summary.output_elements)],
      ["Local total energy", (summary) => formatPj(summary.total_energy_pj)],
      ["Energy per op", (summary) => formatPj(summary.energy_per_op_pj)],
      ["Latency label", (summary) => summary.latency_label],
      ["Latency", (summary) => formatNs(summary.latency_ns)],
      ["Throughput", (summary) =>
        formatThroughput(summary.throughput_equivalent_ops_per_second)],
      ["Assumptions", (summary) => formatNumber(summary.assumptions_count)],
      ["Published reference", (summary) => yesNo(summary.has_published_reference)],
      ["Calibration fit", (summary) => yesNo(summary.has_calibration_fit)],
      ["Provenance", (summary) => summary.provenance_status],
      ["Boundary tags", (summary) => (summary.boundary_tags || []).join(", ")],
    ];

    return metricRows.map(([label, getter]) => [
      `<strong>${escapeHtml(label)}</strong>`,
      ...artifacts.map((artifact) => {
        const value = getter(artifact.summary);
        if (value && typeof value === "object" && "html" in value) {
          return value.html;
        }
        return escapeHtml(value);
      }),
    ]);
  }

  function renderComparison() {
    const detail = document.getElementById("detail");
    const artifacts = Array.from(state.compareIds)
      .map((id) => byId.get(id))
      .filter(Boolean);

    if (!artifacts.length) {
      detail.innerHTML =
        '<div class="empty">Select artifacts with the Compare checkboxes to build a side-by-side view.</div>';
      return;
    }

    const kinds = new Set(artifacts.map((artifact) => artifact.summary.kind));
    const hasLayer = artifacts.some(
      (artifact) => artifact.summary.kind === "transformer_layer"
    );
    const hasPublished = artifacts.some(
      (artifact) => artifact.summary.has_published_reference
    );
    const headers = [
      { label: "Metric" },
      ...artifacts.map((artifact) => ({
        label: artifact.summary.benchmark_name,
      })),
    ];
    const boundaryNotes = [
      kinds.size > 1
        ? "Mixed-schema comparison: per-matmul cards and transformer aggregates are shown side-by-side without flattening their semantics."
        : "Single-schema comparison: summary metrics share the same artifact kind.",
      hasLayer
        ? "Transformer aggregate latency remains serial timing, and aggregate noise remains non-additive diagnostic extrema."
        : "Per-matmul timing and noise are local model card fields.",
      hasPublished
        ? "Published references are present for at least one artifact and remain separate from local model estimates."
        : "Selected artifacts are local model summaries with no published_reference block.",
    ];

    detail.innerHTML = `
      <section class="header-panel">
        <div class="header-top">
          <div class="header-title">
            <div class="badge-row">
              <span class="badge mix">Comparison Mode</span>
              <span class="badge">${artifacts.length} selected</span>
              ${kinds.size > 1 ? '<span class="badge warn">mixed schema</span>' : ""}
            </div>
            <h2>Artifact Comparison</h2>
            <div class="description">Schema-aware side-by-side summary across selected PhotonicBench JSON artifacts.</div>
          </div>
          <div class="actions">
            <button class="action-button" type="button" data-action="clear-compare">Clear comparison</button>
          </div>
        </div>
      </section>
      <section class="panel">
        <h3>Comparison Matrix</h3>
        ${simpleTable(headers, comparisonRows(artifacts), "comparison-table")}
      </section>
      <section class="panel">
        <h3>Comparison Boundary Notes</h3>
        <div class="notes">${boundaryNotes
          .map((note) => `<p>${escapeHtml(note)}</p>`)
          .join("")}</div>
      </section>
    `;

    detail.querySelector("[data-action='clear-compare']").addEventListener(
      "click",
      () => {
        state.compareIds.clear();
        state.view = "detail";
        render();
      }
    );
  }

  function renderModeTabs() {
    document
      .getElementById("detail-mode")
      .classList.toggle("active", state.view === "detail");
    document
      .getElementById("compare-mode")
      .classList.toggle("active", state.view === "compare");
    document.getElementById("compare-count").textContent = state.compareIds.size;
  }

  function render() {
    if (!byId.has(state.selectedId)) {
      const first = filteredArtifacts()[0];
      state.selectedId = first ? first.summary.id : null;
    }
    renderModeTabs();
    renderList();
    renderIssues();
    if (state.view === "compare") {
      renderComparison();
    } else {
      renderDetail();
    }
  }

  render();
})();
