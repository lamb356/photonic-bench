(function () {
  "use strict";

  const state = {
    data: window.PhotonicBenchIndex || null,
    selectedId: null,
    search: "",
    kind: "all",
    boundary: "all",
    quality: "all",
    sort: "name",
    group: "schema",
    view: "detail",
    compareIds: new Set(),
    pinnedId: null,
    paretoMode: "energy-throughput",
    analysisFocus: "balanced",
    customScoreWeights: {},
    topVisibleCount: 5,
    payloadCache: new Map(),
    payloadPromises: new Map(),
    userPresets: [],
    presetMessage: "",
    presetMessageIsWarning: false,
    externalIds: new Set(),
    externalMessage: "",
    externalMessageIsWarning: false,
    externalDiagnostics: [],
    urlStateReady: false,
    urlStateTimer: null,
  };
  const USER_PRESETS_KEY = "photonic-bench-comparison-presets:v1";
  const SCORE_WEIGHTS_KEY = "photonic-bench-score-weights:v1";
  const COMPARISON_EXPORT_SCHEMA = "photonic-bench-comparison-export-v1";
  const PRESET_EXPORT_SCHEMA = "photonic-bench-comparison-presets-v1";
  const URL_STATE_VERSION = "1";
  const DEFAULT_STATE = {
    search: "",
    kind: "all",
    boundary: "all",
    quality: "all",
    sort: "name",
    group: "schema",
    view: "detail",
    paretoMode: "energy-throughput",
    analysisFocus: "balanced",
  };
  const VALID_KINDS = ["all", "transformer_model", "transformer_layer", "matmul_card"];
  const VALID_BOUNDARIES = [
    "all",
    "published",
    "local-only",
    "provenance",
    "transformer-boundaries",
  ];
  const VALID_SOURCE_QUALITIES = ["all", "A", "B", "C", "D", "unrated"];
  const VALID_SORTS = ["name", "energy", "intensity", "latency", "ops"];
  const VALID_GROUPS = ["schema", "source-quality", "system-profile", "boundary", "none"];
  const VALID_VIEWS = ["detail", "compare"];
  const SOURCE_CONFIDENCE_BY_GRADE = { A: 100, B: 75, C: 50, D: 25 };
  const PUBLISHED_UNRATED_SOURCE_CONFIDENCE = 40;
  const REPORT_SCHEMA_VERSION = "photonic-bench-report-v1";
  const TRANSFORMER_LAYER_SCHEMA_VERSION =
    "photonic-bench-transformer-layer-report-v1";
  const TRANSFORMER_MODEL_SCHEMA_VERSION =
    "photonic-bench-transformer-model-report-v1";

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
  state.userPresets = readUserPresets();
  state.customScoreWeights = readScoreWeights();
  applyUrlState();

  updateCounts();

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

  document.getElementById("quality-filter").addEventListener("change", (event) => {
    state.quality = event.target.value;
    render();
  });

  document.getElementById("sort-filter").addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  document.getElementById("group-filter").addEventListener("change", (event) => {
    state.group = event.target.value;
    render();
  });

  document.getElementById("compare-visible").addEventListener("click", () => {
    compareVisibleArtifacts();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    resetFilters();
  });

  document.getElementById("preset-select").addEventListener("change", () => {
    renderPresetControls();
  });

  document.getElementById("load-preset").addEventListener("click", () => {
    const preset = selectedPreset();
    if (!preset) {
      setPresetMessage("Select a preset to load.", true);
      return;
    }
    applyPreset(preset);
  });

  document.getElementById("save-preset").addEventListener("click", () => {
    saveCurrentPreset();
  });

  document.getElementById("delete-preset").addEventListener("click", () => {
    deleteSelectedUserPreset();
  });

  document.getElementById("export-presets").addEventListener("click", () => {
    exportUserPresets();
  });

  document
    .getElementById("import-preset-file")
    .addEventListener("change", (event) => {
      importPresetFile((event.target.files || [])[0]);
      event.target.value = "";
    });

  document
    .getElementById("external-report-file")
    .addEventListener("change", (event) => {
      loadExternalFiles(Array.from(event.target.files || []));
      event.target.value = "";
    });

  document.getElementById("clear-external").addEventListener("click", () => {
    clearExternalArtifacts();
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
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    return `${formatNumber(value)} pJ`;
  }

  function formatNs(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    return `${formatNumber(value)} ns`;
  }

  function formatThroughput(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    return `${formatNumber(value)} eq ops/s`;
  }

  function formatBytes(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    const number = Number(value);
    if (Math.abs(number) >= 1e9) {
      return `${formatNumber(number / 1e9)} GB`;
    }
    if (Math.abs(number) >= 1e6) {
      return `${formatNumber(number / 1e6)} MB`;
    }
    if (Math.abs(number) >= 1e3) {
      return `${formatNumber(number / 1e3)} KB`;
    }
    return `${formatNumber(number)} bytes`;
  }

  function formatOpsPerByte(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    return `${formatNumber(value)} eq ops/byte`;
  }

  function formatPercent(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    return `${formatNumber(Number(value) * 100)}%`;
  }

  function yesNo(value) {
    return value ? "yes" : "no";
  }

  function formatProfileOverrides(value) {
    if (!Array.isArray(value) || value.length === 0) {
      return "none";
    }
    return value.join(", ");
  }

  function kindLabel(kind) {
    if (kind === "transformer_model") return "Transformer model";
    if (kind === "transformer_layer") return "Transformer layer";
    return "Per-matmul card";
  }

  function updateCounts() {
    document.getElementById("artifact-count").textContent =
      state.data.artifacts.length;
    document.getElementById("issue-count").textContent = state.data.issues.length;
  }

  function boundaryMatches(summary) {
    if (state.boundary === "all") return true;
    if (state.boundary === "published") return summary.has_published_reference;
    if (state.boundary === "local-only") return !summary.has_published_reference;
    if (state.boundary === "provenance") {
      return summary.provenance_status !== "local model artifact";
    }
    if (state.boundary === "transformer-boundaries") {
      return summary.kind === "transformer_layer" || summary.kind === "transformer_model";
    }
    return true;
  }

  function qualityMatches(summary) {
    if (state.quality === "all") return true;
    const grade = summary.source_quality_grade || "";
    if (state.quality === "unrated") return !grade;
    return grade.toUpperCase() === state.quality;
  }

  function compareFiniteNumbers(left, right, direction = "ascending") {
    const a = Number(left);
    const b = Number(right);
    const aFinite = Number.isFinite(a);
    const bFinite = Number.isFinite(b);
    if (aFinite && bFinite) {
      return direction === "descending" ? b - a : a - b;
    }
    if (aFinite) return -1;
    if (bFinite) return 1;
    return 0;
  }

  function filteredArtifacts() {
    const artifacts = state.data.artifacts.filter((artifact) => {
      const summary = artifact.summary;
      const haystack = [
        summary.benchmark_name,
        summary.description,
        summary.source_path,
        summary.schema_version,
        summary.source_quality_grade,
        summary.source_surrogate_type,
        summary.system_profile,
        summary.memory_timing_mode,
        ...(summary.boundary_tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return (
        (state.kind === "all" || summary.kind === state.kind) &&
        boundaryMatches(summary) &&
        qualityMatches(summary) &&
        haystack.includes(state.search)
      );
    });

    return artifacts.sort((left, right) => {
      const a = left.summary;
      const b = right.summary;
      if (state.sort === "energy") {
        return (
          compareFiniteNumbers(a.total_energy_pj, b.total_energy_pj) ||
          a.benchmark_name.localeCompare(b.benchmark_name)
        );
      }
      if (state.sort === "intensity") {
        return (
          compareFiniteNumbers(
            a.operational_intensity_ops_per_byte,
            b.operational_intensity_ops_per_byte,
            "descending"
          ) || a.benchmark_name.localeCompare(b.benchmark_name)
        );
      }
      if (state.sort === "latency") {
        return (
          compareFiniteNumbers(a.latency_ns, b.latency_ns) ||
          a.benchmark_name.localeCompare(b.benchmark_name)
        );
      }
      if (state.sort === "ops") {
        return (
          compareFiniteNumbers(a.equivalent_ops, b.equivalent_ops, "descending") ||
          a.benchmark_name.localeCompare(b.benchmark_name)
        );
      }
      return a.benchmark_name.localeCompare(b.benchmark_name);
    });
  }

  function compareVisibleArtifacts() {
    const artifacts = filteredArtifacts();
    if (!artifacts.length) {
      setPresetMessage("No visible artifacts to compare.", true);
      return;
    }
    state.compareIds = new Set(artifacts.map((artifact) => artifact.summary.id));
    if (!state.compareIds.has(state.pinnedId)) {
      state.pinnedId = artifacts[0].summary.id;
    }
    ensurePinnedReference(artifacts);
    state.selectedId = artifacts[0].summary.id;
    state.view = "compare";
    setPresetMessage(`Comparing ${artifacts.length} visible artifact(s).`);
    render();
  }

  function resetFilters() {
    state.search = "";
    state.kind = "all";
    state.boundary = "all";
    state.quality = "all";
    state.sort = "name";
    state.group = "schema";
    document.getElementById("search").value = "";
    document.getElementById("kind-filter").value = state.kind;
    document.getElementById("boundary-filter").value = state.boundary;
    document.getElementById("quality-filter").value = state.quality;
    document.getElementById("sort-filter").value = state.sort;
    document.getElementById("group-filter").value = state.group;
    setPresetMessage("Filters reset.");
    render();
  }

  function safeOption(value, allowed, fallback) {
    return allowed.includes(value) ? value : fallback;
  }

  function parseSelectedIds(value) {
    return String(value || "")
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id && byId.has(id));
  }

  function applyUrlState() {
    const params = new URLSearchParams(window.location.search);
    if (!params.size) {
      state.urlStateReady = true;
      return;
    }
    state.search = String(params.get("q") || DEFAULT_STATE.search).toLowerCase();
    state.kind = safeOption(params.get("schema"), VALID_KINDS, DEFAULT_STATE.kind);
    state.boundary = safeOption(
      params.get("boundary"),
      VALID_BOUNDARIES,
      DEFAULT_STATE.boundary
    );
    state.quality = safeOption(
      params.get("quality"),
      VALID_SOURCE_QUALITIES,
      DEFAULT_STATE.quality
    );
    state.sort = safeOption(params.get("sort"), VALID_SORTS, DEFAULT_STATE.sort);
    state.group = safeOption(params.get("group"), VALID_GROUPS, DEFAULT_STATE.group);
    state.view = safeOption(params.get("view"), VALID_VIEWS, DEFAULT_STATE.view);
    state.analysisFocus = safeOption(
      params.get("focus"),
      Object.keys(comparisonFocusOptions()),
      DEFAULT_STATE.analysisFocus
    );
    state.paretoMode = safeOption(
      params.get("pareto"),
      Object.keys(paretoSpecs()),
      DEFAULT_STATE.paretoMode
    );
    const profileKey = safeOption(
      params.get("profile"),
      Object.keys(scoreWeightProfiles()),
      ""
    );
    if (profileKey) {
      applyScoreProfileState(profileKey, false);
    }

    const selectedIds = parseSelectedIds(params.get("selected"));
    state.compareIds = new Set(selectedIds);
    const pinnedId = params.get("pinned");
    state.pinnedId =
      pinnedId && state.compareIds.has(pinnedId) && byId.has(pinnedId)
        ? pinnedId
        : null;
    const selectedId = params.get("artifact");
    if (selectedId && byId.has(selectedId)) {
      state.selectedId = selectedId;
    } else if (selectedIds.length) {
      state.selectedId = selectedIds[0];
    }
    const urlWeights = parseScoreWeightsParam(params.get("weights"));
    if (Object.keys(urlWeights).length) {
      state.customScoreWeights = urlWeights;
      writeScoreWeights();
    }
    if (state.view === "compare" && !state.compareIds.size) {
      state.view = "detail";
    }
    state.urlStateReady = true;
  }

  function syncStaticControls() {
    setControlValue("search", state.search);
    setControlValue("kind-filter", state.kind);
    setControlValue("boundary-filter", state.boundary);
    setControlValue("quality-filter", state.quality);
    setControlValue("sort-filter", state.sort);
    setControlValue("group-filter", state.group);
  }

  function setControlValue(id, value) {
    const control = document.getElementById(id);
    if (control && control.value !== value) {
      control.value = value;
    }
  }

  function scheduleUrlStateUpdate() {
    if (!state.urlStateReady || !window.history || !window.history.replaceState) {
      return;
    }
    window.clearTimeout(state.urlStateTimer);
    state.urlStateTimer = window.setTimeout(updateUrlState, 120);
  }

  function stateUrlParams() {
    const params = new URLSearchParams();
    params.set("v", URL_STATE_VERSION);
    if (state.search !== DEFAULT_STATE.search) params.set("q", state.search);
    if (state.kind !== DEFAULT_STATE.kind) params.set("schema", state.kind);
    if (state.boundary !== DEFAULT_STATE.boundary) {
      params.set("boundary", state.boundary);
    }
    if (state.quality !== DEFAULT_STATE.quality) {
      params.set("quality", state.quality);
    }
    if (state.sort !== DEFAULT_STATE.sort) params.set("sort", state.sort);
    if (state.group !== DEFAULT_STATE.group) params.set("group", state.group);
    if (state.view !== DEFAULT_STATE.view) params.set("view", state.view);
    if (state.selectedId) params.set("artifact", state.selectedId);
    if (state.compareIds.size) {
      params.set("selected", Array.from(state.compareIds).join(","));
    }
    if (state.pinnedId) params.set("pinned", state.pinnedId);
    if (state.analysisFocus !== DEFAULT_STATE.analysisFocus) {
      params.set("focus", state.analysisFocus);
    }
    if (state.paretoMode !== DEFAULT_STATE.paretoMode) {
      params.set("pareto", state.paretoMode);
    }
    const profileKey = matchedScoreProfileKey();
    if (profileKey && profileKey !== "balanced") {
      params.set("profile", profileKey);
    }
    const weights = encodeScoreWeightsParam(state.customScoreWeights);
    if (weights) params.set("weights", weights);
    return params;
  }

  function stateUrlString(absolute = false) {
    const url = new URL(window.location.href);
    url.search = stateUrlParams().toString();
    return absolute ? url.href : `${url.pathname}${url.search}${url.hash}`;
  }

  function updateUrlState() {
    const nextUrl = stateUrlString(false);
    if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(null, "", nextUrl);
    }
  }

  function copyShareableLink() {
    updateUrlState();
    const link = window.location.href;
    setPresetMessage("Shareable link ready.");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(link).then(
        () => setPresetMessage("Copied shareable comparison link."),
        () => setPresetMessage(`Shareable link: ${link}`)
      );
      return;
    }
    setPresetMessage(`Shareable link: ${link}`);
  }

  function filterSummaryLabel() {
    const labels = [];
    if (state.search) labels.push(`search: ${state.search}`);
    if (state.kind !== "all") labels.push(`schema: ${kindLabel(state.kind)}`);
    if (state.boundary !== "all") labels.push(`boundary: ${state.boundary}`);
    if (state.quality !== "all") {
      labels.push(
        state.quality === "unrated"
          ? "source grade: unrated"
          : `source grade: ${state.quality}`
      );
    }
    if (state.sort !== "name") labels.push(`sort: ${state.sort}`);
    return labels.length ? labels.join(" | ") : "All artifacts, sorted by name";
  }

  function currentFilterState() {
    return {
      search: state.search,
      schema: state.kind,
      boundary: state.boundary,
      source_quality: state.quality,
      sort: state.sort,
      grouping: state.group,
    };
  }

  function groupArtifactsForRail(artifacts) {
    if (state.group === "none") {
      return [["All artifacts", artifacts]];
    }
    const groups = new Map();
    artifacts.forEach((artifact) => {
      const labels = railGroupLabels(artifact.summary);
      labels.forEach((label) => {
        if (!groups.has(label)) {
          groups.set(label, []);
        }
        groups.get(label).push(artifact);
      });
    });
    return Array.from(groups.entries()).sort(([left], [right]) =>
      left.localeCompare(right)
    );
  }

  function railGroupLabels(summary) {
    if (state.group === "schema") return [kindLabel(summary.kind)];
    if (state.group === "source-quality") {
      return [`Source grade ${summary.source_quality_grade || "unrated"}`];
    }
    if (state.group === "system-profile") {
      return [`Profile ${summary.system_profile || "n/a"}`];
    }
    if (state.group === "boundary") {
      const tags = summary.boundary_tags || [];
      return tags.length ? tags : ["untagged boundary"];
    }
    return ["All artifacts"];
  }

  function selectedArtifacts() {
    return Array.from(state.compareIds)
      .map((id) => byId.get(id))
      .filter(Boolean);
  }

  function removeComparisonArtifact(id) {
    state.compareIds.delete(id);
    if (state.pinnedId === id) {
      state.pinnedId = null;
    }
    const remaining = selectedArtifacts();
    if (!remaining.length) {
      state.view = "detail";
    } else {
      ensurePinnedReference(remaining);
      state.selectedId = remaining[0].summary.id;
    }
    render();
  }

  function clearSelectionGroup(kind) {
    selectedArtifacts()
      .filter((artifact) => artifact.summary.kind === kind)
      .forEach((artifact) => state.compareIds.delete(artifact.summary.id));
    if (state.pinnedId && !state.compareIds.has(state.pinnedId)) {
      state.pinnedId = null;
    }
    const remaining = selectedArtifacts();
    if (!remaining.length) {
      state.view = "detail";
    } else {
      ensurePinnedReference(remaining);
    }
    render();
  }

  function invertVisibleSelection() {
    const visible = filteredArtifacts();
    if (!visible.length) {
      setPresetMessage("No visible artifacts to invert.", true);
      return;
    }
    visible.forEach((artifact) => {
      const id = artifact.summary.id;
      if (state.compareIds.has(id)) {
        state.compareIds.delete(id);
      } else {
        state.compareIds.add(id);
      }
    });
    if (state.pinnedId && !state.compareIds.has(state.pinnedId)) {
      state.pinnedId = null;
    }
    const selected = selectedArtifacts();
    if (selected.length) {
      ensurePinnedReference(selected);
      state.selectedId = selected[0].summary.id;
      state.view = "compare";
      setPresetMessage(`Selection inverted across ${visible.length} visible artifact(s).`);
    } else {
      state.view = "detail";
      setPresetMessage("Visible artifacts were removed from the comparison.");
    }
    render();
  }

  function compareTopVisible(count) {
    const limit = Math.max(1, Math.min(50, Number.parseInt(count, 10) || 1));
    state.topVisibleCount = limit;
    const artifacts = filteredArtifacts().slice(0, limit);
    if (!artifacts.length) {
      setPresetMessage("No visible artifacts to compare.", true);
      return;
    }
    state.compareIds = new Set(artifacts.map((artifact) => artifact.summary.id));
    state.pinnedId = artifacts[0].summary.id;
    state.selectedId = artifacts[0].summary.id;
    state.view = "compare";
    setPresetMessage(`Comparing top ${artifacts.length} visible artifact(s).`);
    render();
  }

  function ensurePinnedReference(artifacts = selectedArtifacts()) {
    if (state.pinnedId && state.compareIds.has(state.pinnedId)) {
      return byId.get(state.pinnedId) || null;
    }
    state.pinnedId = artifacts[0] ? artifacts[0].summary.id : null;
    return state.pinnedId ? byId.get(state.pinnedId) : null;
  }

  function generatedPresets() {
    return (state.data.comparison_presets || []).map((preset, index) => ({
      ...preset,
      key: `generated:${index}:${preset.name}`,
      source: "generated",
    }));
  }

  function localPresets() {
    return state.userPresets.map((preset, index) => ({
      ...preset,
      key: `local:${index}:${preset.name}`,
      source: "local",
      source_path: "browser local storage",
    }));
  }

  function allPresets() {
    return [...generatedPresets(), ...localPresets()];
  }

  function selectedPreset() {
    const key = document.getElementById("preset-select").value;
    return allPresets().find((preset) => preset.key === key) || null;
  }

  function readUserPresets() {
    try {
      const parsed = JSON.parse(localStorage.getItem(USER_PRESETS_KEY) || "[]");
      return sanitizeUserPresets(parsed);
    } catch {
      return [];
    }
  }

  function sanitizeUserPresets(value) {
    if (!Array.isArray(value)) {
      return [];
    }
    return value
      .filter(
        (preset) =>
          preset &&
          typeof preset.name === "string" &&
          preset.name.trim() &&
          Array.isArray(preset.artifact_ids)
      )
      .map((preset) => ({
        name: preset.name.trim(),
        description:
          typeof preset.description === "string" ? preset.description : "",
        artifact_ids: Array.from(
          new Set(preset.artifact_ids.filter((id) => typeof id === "string"))
        ),
        pinned_id: typeof preset.pinned_id === "string" ? preset.pinned_id : null,
      }));
  }

  function writeUserPresets() {
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(state.userPresets));
  }

  function exportUserPresets() {
    if (!state.userPresets.length) {
      setPresetMessage("No browser-local presets to export.", true);
      return;
    }
    const payload = {
      schema_version: PRESET_EXPORT_SCHEMA,
      exported_at: new Date().toISOString(),
      presets: state.userPresets.map((preset) => ({
        name: preset.name,
        description: preset.description || "",
        artifact_ids: preset.artifact_ids,
        pinned_id: preset.pinned_id || null,
      })),
    };
    downloadText(
      "photonic-bench-local-presets.json",
      `${JSON.stringify(payload, null, 2)}\n`,
      "application/json"
    );
    setPresetMessage(`Exported ${state.userPresets.length} browser-local preset(s).`);
  }

  function importPresetFile(file) {
    if (!file) {
      return;
    }
    file
      .text()
      .then((text) => {
        const imported = validatePresetImport(JSON.parse(text));
        const byName = new Map(
          state.userPresets.map((preset) => [preset.name.toLowerCase(), preset])
        );
        imported.forEach((preset) => byName.set(preset.name.toLowerCase(), preset));
        state.userPresets = Array.from(byName.values()).sort((left, right) =>
          left.name.localeCompare(right.name)
        );
        writeUserPresets();
        setPresetMessage(`Imported ${imported.length} browser-local preset(s).`);
        render();
      })
      .catch((error) => {
        setPresetMessage(`Preset import failed: ${error.message}`, true);
      });
  }

  function validatePresetImport(payload) {
    if (!payload || typeof payload !== "object") {
      throw new Error("expected a JSON object");
    }
    if (payload.schema_version !== PRESET_EXPORT_SCHEMA) {
      throw new Error(`expected schema_version ${PRESET_EXPORT_SCHEMA}`);
    }
    const presets = sanitizeUserPresets(payload.presets);
    if (!presets.length) {
      throw new Error("no valid presets found");
    }
    return presets.map((preset) => {
      const validIds = preset.artifact_ids.filter((id) => byId.has(id));
      if (!validIds.length) {
        throw new Error(`preset ${preset.name} has no artifact IDs in this index`);
      }
      return {
        ...preset,
        artifact_ids: validIds,
        pinned_id: validIds.includes(preset.pinned_id) ? preset.pinned_id : null,
      };
    });
  }

  function setPresetMessage(message, isWarning = false) {
    state.presetMessage = message;
    state.presetMessageIsWarning = isWarning;
    renderPresetControls();
  }

  function applyPreset(preset) {
    const validIds = preset.artifact_ids.filter((id) => byId.has(id));
    const missingIds = preset.artifact_ids.filter((id) => !byId.has(id));
    state.compareIds = new Set(validIds);
    state.pinnedId =
      preset.pinned_id && state.compareIds.has(preset.pinned_id)
        ? preset.pinned_id
        : validIds[0] || null;
    state.selectedId = state.pinnedId || validIds[0] || state.selectedId;
    state.view = validIds.length ? "compare" : "detail";
    state.presetMessage = missingIds.length
      ? `Loaded ${validIds.length} artifact(s); missing: ${missingIds.join(", ")}`
      : `Loaded ${preset.name}.`;
    state.presetMessageIsWarning = missingIds.length > 0;
    render();
  }

  function saveCurrentPreset() {
    const name = document.getElementById("preset-name").value.trim();
    const artifactIds = Array.from(state.compareIds);
    if (!name) {
      setPresetMessage("Enter a preset name.", true);
      return;
    }
    if (!artifactIds.length) {
      setPresetMessage("Select artifacts before saving.", true);
      return;
    }
    const nextPreset = {
      name,
      description: "Saved in this browser.",
      artifact_ids: artifactIds,
      pinned_id: state.pinnedId && state.compareIds.has(state.pinnedId)
        ? state.pinnedId
        : artifactIds[0],
    };
    const existingIndex = state.userPresets.findIndex(
      (preset) => preset.name.toLowerCase() === name.toLowerCase()
    );
    if (existingIndex >= 0) {
      state.userPresets.splice(existingIndex, 1, nextPreset);
    } else {
      state.userPresets.push(nextPreset);
    }
    writeUserPresets();
    document.getElementById("preset-name").value = "";
    setPresetMessage(`Saved ${name}.`);
  }

  function deleteSelectedUserPreset() {
    const preset = selectedPreset();
    if (!preset || preset.source !== "local") {
      setPresetMessage("Select a browser-saved preset to delete.", true);
      return;
    }
    state.userPresets = state.userPresets.filter(
      (candidate) => candidate.name !== preset.name
    );
    writeUserPresets();
    setPresetMessage(`Deleted ${preset.name}.`);
  }

  function setExternalMessage(message, isWarning = false) {
    state.externalMessage = message;
    state.externalMessageIsWarning = isWarning;
    renderExternalControls();
  }

  function renderExternalControls() {
    const message = document.getElementById("external-message");
    message.textContent = state.externalMessage;
    message.classList.toggle("warn", state.externalMessageIsWarning);
    document.getElementById("clear-external").disabled = state.externalIds.size === 0;
    renderExternalDiagnostics();
  }

  function renderExternalDiagnostics() {
    const panel = document.getElementById("external-diagnostics");
    if (!state.externalDiagnostics.length) {
      panel.innerHTML = "";
      return;
    }
    panel.innerHTML = state.externalDiagnostics
      .map((diagnostic) => {
        const issues = [...diagnostic.errors, ...diagnostic.warnings];
        const issueRows = issues.length
          ? `<ul>${issues
              .map((issue) => `<li>${escapeHtml(issue)}</li>`)
              .join("")}</ul>`
          : "";
        const schema = diagnostic.schema_version || "schema not detected";
        const status = diagnostic.accepted ? "accepted" : "rejected";
        return `
          <div class="external-diagnostic${diagnostic.accepted ? "" : " error"}">
            <strong>${escapeHtml(diagnostic.fileName)}: ${escapeHtml(status)}</strong>
            <div>${escapeHtml(diagnostic.schema_label || schema)}</div>
            ${issueRows}
          </div>
        `;
      })
      .join("");
  }

  function loadExternalFiles(files) {
    if (!files.length) {
      setExternalMessage("Select one or more PhotonicBench JSON reports.", true);
      return;
    }
    Promise.all(files.map((file) => readExternalFile(file)))
      .then((results) => {
        state.externalDiagnostics = results.map((result) => result.diagnostic);
        const accepted = results.filter((result) => result.ok);
        const rejected = results.filter((result) => !result.ok);
        accepted.forEach((result) => addExternalArtifact(result.artifact));
        const acceptedNames = accepted.map((result) => result.fileName).join(", ");
        const rejectedMessages = rejected
          .map((result) => `${result.fileName}: ${result.message}`)
          .join("; ");
        const messageParts = [];
        if (accepted.length) {
          messageParts.push(`Loaded external report(s): ${acceptedNames}`);
        }
        if (rejected.length) {
          messageParts.push(`Rejected ${rejectedMessages}`);
        }
        setExternalMessage(messageParts.join(" | "), rejected.length > 0);
        if (accepted.length) {
          state.selectedId = accepted[accepted.length - 1].artifact.summary.id;
          state.view = "detail";
        }
        render();
      })
      .catch((error) => {
        setExternalMessage(error.message || "Could not load external reports.", true);
      });
  }

  function readExternalFile(file) {
    const diagnostic = {
      fileName: file.name,
      accepted: false,
      schema_version: null,
      schema_label: "",
      errors: [],
      warnings: [],
    };
    return file
      .text()
      .then((text) => {
        let payload;
        try {
          payload = JSON.parse(text);
        } catch (error) {
          throw new Error(`invalid JSON: ${error.message}`);
        }
        const sourcePath = `external/${file.name}`;
        const validation = validateExternalPayload(payload, sourcePath);
        diagnostic.schema_version = validation.schema_version;
        diagnostic.schema_label = validation.schema_label;
        diagnostic.errors = validation.errors;
        diagnostic.warnings = validation.warnings;
        if (validation.errors.length) {
          throw new Error(validation.errors.join("; "));
        }
        const artifact = summarizeExternalPayload(payload, sourcePath, file.name);
        diagnostic.accepted = true;
        if (!diagnostic.warnings.length) {
          diagnostic.warnings.push("Accepted schema and required fields.");
        }
        return { ok: true, fileName: file.name, artifact, diagnostic };
      })
      .catch((error) => ({
        ok: false,
        fileName: file.name,
        message: error.message || "unreadable file",
        diagnostic: {
          ...diagnostic,
          errors: diagnostic.errors.length
            ? diagnostic.errors
            : [error.message || "unreadable file"],
        },
      }));
  }

  function addExternalArtifact(artifact) {
    const id = artifact.summary.id;
    if (byId.has(id)) {
      state.data.artifacts = state.data.artifacts.filter(
        (candidate) => candidate.summary.id !== id
      );
    }
    byId.set(id, artifact);
    state.payloadCache.set(id, artifact.payload);
    state.payloadPromises.delete(id);
    state.externalIds.add(id);
    state.data.artifacts.push(artifact);
    updateCounts();
  }

  function clearExternalArtifacts() {
    if (!state.externalIds.size) {
      setExternalMessage("No external reports are loaded.", true);
      return;
    }
    state.data.artifacts = state.data.artifacts.filter((artifact) => {
      const keep = !state.externalIds.has(artifact.summary.id);
      if (!keep) {
        byId.delete(artifact.summary.id);
        state.payloadCache.delete(artifact.summary.id);
        state.payloadPromises.delete(artifact.summary.id);
        state.compareIds.delete(artifact.summary.id);
      }
      return keep;
    });
    if (state.pinnedId && state.externalIds.has(state.pinnedId)) {
      state.pinnedId = null;
    }
    if (state.selectedId && state.externalIds.has(state.selectedId)) {
      const first = filteredArtifacts()[0] || state.data.artifacts[0];
      state.selectedId = first ? first.summary.id : null;
    }
    const cleared = state.externalIds.size;
    state.externalIds.clear();
    updateCounts();
    setExternalMessage(`Cleared ${cleared} external report(s).`);
    render();
  }

  function validateExternalPayload(payload, sourcePath) {
    const diagnostic = {
      schema_version: null,
      schema_label: "",
      errors: [],
      warnings: [],
    };
    if (!isPlainObject(payload)) {
      diagnostic.errors.push("Expected a JSON object.");
      return diagnostic;
    }
    if (typeof payload.schema_version !== "string") {
      diagnostic.errors.push("Missing required field: schema_version.");
      return diagnostic;
    }
    diagnostic.schema_version = payload.schema_version;

    const schema = externalSchemaSpec(payload.schema_version);
    if (!schema) {
      diagnostic.errors.push(
        `Unsupported schema/version: ${payload.schema_version}.`
      );
      return diagnostic;
    }
    diagnostic.schema_label = `${schema.label} (${payload.schema_version})`;

    for (const requirement of schema.required) {
      const problem = validatePathRequirement(payload, requirement);
      if (problem) diagnostic.errors.push(problem);
    }
    const unexpected = Object.keys(payload).filter(
      (key) => !schema.allowedTopLevel.includes(key)
    );
    if (unexpected.length) {
      diagnostic.warnings.push(
        `Unexpected top-level field(s): ${unexpected.join(", ")}.`
      );
    }
    if (!diagnostic.errors.length) {
      diagnostic.warnings.push(`Detected and accepted ${diagnostic.schema_label}.`);
    }
    return diagnostic;
  }

  function externalSchemaSpec(schemaVersion) {
    const commonTopLevel = [
      "schema_version",
      "benchmark",
      "workload",
      "model_inputs",
      "local_model",
      "published_reference",
      "calibration_fit",
      "assumptions",
      "provenance",
    ];
    if (schemaVersion === REPORT_SCHEMA_VERSION) {
      return {
        label: "Per-matmul report",
        allowedTopLevel: commonTopLevel,
        required: [
          ["benchmark", "name", "string"],
          ["benchmark", "description", "string"],
          ["workload", "type", "string", "matmul"],
          ["workload", "shape", "object"],
          ["workload", "shape", "m", "integer"],
          ["workload", "shape", "k", "integer"],
          ["workload", "shape", "n", "integer"],
          ["workload", "macs", "integer"],
          ["workload", "equivalent_ops", "integer"],
          ["workload", "output_elements", "integer"],
          ["local_model", "energy", "object"],
          ["local_model", "energy", "total_pj", "number"],
          ["local_model", "energy", "energy_per_op_pj", "number"],
          ["local_model", "timing", "object"],
          ["local_model", "timing", "batch_latency_ns", "number"],
          [
            "local_model",
            "timing",
            "steady_state_equivalent_ops_per_second",
            "number",
          ],
          ["assumptions", "array"],
        ],
      };
    }
    if (schemaVersion === TRANSFORMER_LAYER_SCHEMA_VERSION) {
      return {
        label: "Transformer-layer aggregate",
        allowedTopLevel: [
          ...commonTopLevel,
          "artifact_type",
          "transformer_layer",
          "aggregate_semantics",
          "formula_audit",
          "matmuls",
          "exclusions",
        ],
        required: [
          ["artifact_type", "string", "transformer_layer_aggregate"],
          ["benchmark", "name", "string"],
          ["benchmark", "description", "string"],
          ["workload", "type", "string", "transformer_layer"],
          ["workload", "macs", "integer"],
          ["workload", "equivalent_ops", "integer"],
          ["workload", "output_elements", "integer"],
          ["transformer_layer", "shape", "object"],
          ["local_model", "energy", "total_pj", "number"],
          ["local_model", "energy", "energy_per_op_pj", "number"],
          ["local_model", "timing", "serial_batch_latency_ns", "number"],
          [
            "local_model",
            "timing",
            "serial_effective_equivalent_ops_per_second",
            "number",
          ],
          ["local_model", "noise", "note", "string"],
          ["aggregate_semantics", "object"],
          ["formula_audit", "object"],
          ["matmuls", "array"],
          ["exclusions", "array"],
          ["assumptions", "array"],
        ],
      };
    }
    if (schemaVersion === TRANSFORMER_MODEL_SCHEMA_VERSION) {
      return {
        label: "Transformer-model aggregate",
        allowedTopLevel: [
          ...commonTopLevel,
          "artifact_type",
          "aggregate_semantics",
          "model_components",
          "layers",
          "exclusions",
        ],
        required: [
          ["artifact_type", "string", "transformer_model_aggregate"],
          ["benchmark", "name", "string"],
          ["benchmark", "description", "string"],
          ["workload", "type", "string", "transformer_model"],
          ["workload", "macs", "integer"],
          ["workload", "equivalent_ops", "integer"],
          ["workload", "output_elements", "integer"],
          ["local_model", "energy", "total_pj", "number"],
          ["local_model", "energy", "energy_per_op_pj", "number"],
          ["local_model", "timing", "serial_batch_latency_ns", "number"],
          [
            "local_model",
            "timing",
            "serial_effective_equivalent_ops_per_second",
            "number",
          ],
          ["local_model", "memory_traffic", "object"],
          ["local_model", "activation_memory_traffic", "object"],
          ["local_model", "noise", "note", "string"],
          ["aggregate_semantics", "object"],
          ["model_components", "object"],
          ["layers", "array"],
          ["exclusions", "array"],
          ["assumptions", "array"],
        ],
      };
    }
    return null;
  }

  function validatePathRequirement(root, requirement) {
    const knownTypes = ["array", "integer", "number", "object", "string"];
    const expected = requirement[requirement.length - 1];
    const hasConst =
      requirement.length >= 3 &&
      knownTypes.includes(requirement[requirement.length - 2]);
    const type = hasConst
      ? requirement[requirement.length - 2]
      : expected;
    const path = requirement.slice(0, hasConst ? -2 : -1);
    const expectedConst = hasConst ? expected : null;
    let current = root;
    for (const key of path) {
      if (!isPlainObject(current) || !(key in current)) {
        return `Missing required field: ${path.join(".")}.`;
      }
      current = current[key];
    }
    const typeProblem = validateExternalType(current, type, path.join("."));
    if (typeProblem) return typeProblem;
    if (expectedConst !== null && current !== expectedConst) {
      return `${path.join(".")} must be ${expectedConst}.`;
    }
    return "";
  }

  function validateExternalType(value, type, path) {
    if (type === "object" && !isPlainObject(value)) {
      return `${path} must be an object.`;
    }
    if (type === "array" && !Array.isArray(value)) {
      return `${path} must be a list.`;
    }
    if (type === "string" && typeof value !== "string") {
      return `${path} must be a string.`;
    }
    if (type === "number" && (typeof value !== "number" || !Number.isFinite(value))) {
      return `${path} must be numeric and finite.`;
    }
    if (
      type === "integer" &&
      (typeof value !== "number" ||
        !Number.isFinite(value) ||
        !Number.isInteger(value) ||
        value < 0)
    ) {
      return `${path} must be a non-negative integer.`;
    }
    return "";
  }

  function summarizeExternalPayload(payload, sourcePath, fileName) {
    if (!isPlainObject(payload)) {
      throw new Error("expected a JSON object");
    }
    const schemaVersion = requiredString(payload, sourcePath, "schema_version");
    if (schemaVersion === REPORT_SCHEMA_VERSION) {
      return externalMatmulArtifact(payload, sourcePath, fileName);
    }
    if (schemaVersion === TRANSFORMER_LAYER_SCHEMA_VERSION) {
      return externalTransformerLayerArtifact(payload, sourcePath, fileName);
    }
    if (schemaVersion === TRANSFORMER_MODEL_SCHEMA_VERSION) {
      return externalTransformerModelArtifact(payload, sourcePath, fileName);
    }
    throw new Error(`unsupported schema_version ${JSON.stringify(schemaVersion)}`);
  }

  function externalMatmulArtifact(payload, sourcePath, fileName) {
    const workload = requiredObject(payload, sourcePath, "workload");
    if (requiredString(workload, sourcePath, "type") !== "matmul") {
      throw new Error("workload.type must be matmul");
    }
    const localModel = requiredObject(payload, sourcePath, "local_model");
    const energy = requiredObject(localModel, sourcePath, "energy");
    const timing = requiredObject(localModel, sourcePath, "timing");
    const hasPublishedReference = payload.published_reference !== null &&
      payload.published_reference !== undefined;
    const hasCalibrationFit = payload.calibration_fit !== null &&
      payload.calibration_fit !== undefined;
    const status = provenanceStatus(payload);
    const summary = externalSummaryBase(
      payload,
      sourcePath,
      fileName,
      "matmul_card",
      "Batch latency",
      {
        macs: requiredNumber(workload, sourcePath, "macs"),
        equivalent_ops: requiredNumber(workload, sourcePath, "equivalent_ops"),
        output_elements: requiredNumber(workload, sourcePath, "output_elements"),
        total_energy_pj: requiredNumber(energy, sourcePath, "total_pj"),
        energy_per_op_pj: requiredNumber(energy, sourcePath, "energy_per_op_pj"),
        latency_ns: requiredNumber(timing, sourcePath, "batch_latency_ns"),
        throughput_equivalent_ops_per_second: requiredNumber(
          timing,
          sourcePath,
          "steady_state_equivalent_ops_per_second"
        ),
        memory_traffic_bytes: optionalNumber(
          localModel,
          sourcePath,
          "memory_traffic",
          "total_interface_bytes"
        ),
        operational_intensity_ops_per_byte: optionalNumber(
          localModel,
          sourcePath,
          "memory_traffic",
          "equivalent_ops_per_byte"
        ),
        bandwidth_limited_latency_ns: optionalNumber(
          localModel,
          sourcePath,
          "system",
          "bandwidth_limited_batch_latency_ns"
        ),
        bandwidth_limited_throughput_equivalent_ops_per_second: optionalNumber(
          localModel,
          sourcePath,
          "system",
          "bandwidth_limited_equivalent_ops_per_second"
        ),
      },
      hasPublishedReference,
      hasCalibrationFit,
      status
    );
    return { summary, payload };
  }

  function externalTransformerLayerArtifact(payload, sourcePath, fileName) {
    if (
      requiredString(payload, sourcePath, "artifact_type") !==
      "transformer_layer_aggregate"
    ) {
      throw new Error("artifact_type must be transformer_layer_aggregate");
    }
    const workload = requiredObject(payload, sourcePath, "workload");
    if (requiredString(workload, sourcePath, "type") !== "transformer_layer") {
      throw new Error("workload.type must be transformer_layer");
    }
    requiredArray(payload, sourcePath, "matmuls");
    requiredObject(payload, sourcePath, "formula_audit");
    requiredArray(payload, sourcePath, "exclusions");
    return externalAggregateArtifact(
      payload,
      sourcePath,
      fileName,
      "transformer_layer",
      "Serial batch latency",
      "serial_batch_latency_ns",
      "serial_effective_equivalent_ops_per_second",
      "bandwidth_limited_serial_batch_latency_ns",
      "bandwidth_limited_serial_effective_equivalent_ops_per_second"
    );
  }

  function externalTransformerModelArtifact(payload, sourcePath, fileName) {
    if (
      requiredString(payload, sourcePath, "artifact_type") !==
      "transformer_model_aggregate"
    ) {
      throw new Error("artifact_type must be transformer_model_aggregate");
    }
    const workload = requiredObject(payload, sourcePath, "workload");
    if (requiredString(workload, sourcePath, "type") !== "transformer_model") {
      throw new Error("workload.type must be transformer_model");
    }
    requiredArray(payload, sourcePath, "layers");
    return externalAggregateArtifact(
      payload,
      sourcePath,
      fileName,
      "transformer_model",
      "Model serial batch latency",
      "serial_batch_latency_ns",
      "serial_effective_equivalent_ops_per_second",
      "bandwidth_limited_serial_batch_latency_ns",
      "bandwidth_limited_serial_effective_equivalent_ops_per_second"
    );
  }

  function externalAggregateArtifact(
    payload,
    sourcePath,
    fileName,
    kind,
    latencyLabel,
    latencyKey,
    throughputKey,
    bandwidthLatencyKey,
    bandwidthThroughputKey
  ) {
    const workload = requiredObject(payload, sourcePath, "workload");
    const localModel = requiredObject(payload, sourcePath, "local_model");
    const energy = requiredObject(localModel, sourcePath, "energy");
    const timing = requiredObject(localModel, sourcePath, "timing");
    const hasPublishedReference = payload.published_reference !== null &&
      payload.published_reference !== undefined;
    const hasCalibrationFit = payload.calibration_fit !== null &&
      payload.calibration_fit !== undefined;
    const status = provenanceStatus(payload);
    const summary = externalSummaryBase(
      payload,
      sourcePath,
      fileName,
      kind,
      latencyLabel,
      {
        macs: requiredNumber(workload, sourcePath, "macs"),
        equivalent_ops: requiredNumber(workload, sourcePath, "equivalent_ops"),
        output_elements: requiredNumber(workload, sourcePath, "output_elements"),
        total_energy_pj: requiredNumber(energy, sourcePath, "total_pj"),
        energy_per_op_pj: requiredNumber(energy, sourcePath, "energy_per_op_pj"),
        latency_ns: requiredNumber(timing, sourcePath, latencyKey),
        throughput_equivalent_ops_per_second: requiredNumber(
          timing,
          sourcePath,
          throughputKey
        ),
        memory_traffic_bytes: optionalNumber(
          localModel,
          sourcePath,
          "memory_traffic",
          "total_interface_bytes"
        ),
        operational_intensity_ops_per_byte: optionalNumber(
          localModel,
          sourcePath,
          "memory_traffic",
          "equivalent_ops_per_byte"
        ),
        bandwidth_limited_latency_ns: optionalNumber(
          localModel,
          sourcePath,
          "system",
          bandwidthLatencyKey
        ),
        bandwidth_limited_throughput_equivalent_ops_per_second: optionalNumber(
          localModel,
          sourcePath,
          "system",
          bandwidthThroughputKey
        ),
      },
      hasPublishedReference,
      hasCalibrationFit,
      status
    );
    return { summary, payload };
  }

  function externalSummaryBase(
    payload,
    sourcePath,
    fileName,
    kind,
    latencyLabel,
    values,
    hasPublishedReference,
    hasCalibrationFit,
    provenanceStatusValue
  ) {
    const localModel = requiredObject(payload, sourcePath, "local_model");
    const assumptions = requiredArray(payload, sourcePath, "assumptions");
    const sourceQuality = sourceQualitySummary(payload);
    return {
      id: uniqueExternalId(fileName),
      kind,
      schema_version: requiredString(payload, sourcePath, "schema_version"),
      benchmark_name: requiredString(payload, sourcePath, "benchmark", "name"),
      description: requiredString(payload, sourcePath, "benchmark", "description"),
      source_path: sourcePath,
      browser_path: "",
      macs: values.macs,
      equivalent_ops: values.equivalent_ops,
      output_elements: values.output_elements,
      total_energy_pj: values.total_energy_pj,
      energy_per_op_pj: values.energy_per_op_pj,
      latency_label: latencyLabel,
      latency_ns: values.latency_ns,
      throughput_equivalent_ops_per_second:
        values.throughput_equivalent_ops_per_second,
      memory_traffic_bytes: values.memory_traffic_bytes,
      operational_intensity_ops_per_byte:
        values.operational_intensity_ops_per_byte,
      system_total_energy_pj: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "total_system_energy_pj"
      ),
      system_energy_per_op_pj: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "system_energy_per_op_pj"
      ),
      movement_energy_pj: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "total_movement_energy_pj"
      ),
      movement_energy_share: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "movement_energy_share"
      ),
      system_profile: optionalString(localModel, sourcePath, "system", "profile"),
      system_profile_overrides: optionalStringArray(
        localModel,
        sourcePath,
        "system",
        "profile_overrides"
      ),
      memory_timing_mode: optionalString(
        localModel,
        sourcePath,
        "system",
        "memory_timing_mode"
      ),
      effective_transfer_time_ns: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "effective_transfer_time_ns"
      ),
      bandwidth_limited_latency_ns: values.bandwidth_limited_latency_ns,
      bandwidth_limited_throughput_equivalent_ops_per_second:
        values.bandwidth_limited_throughput_equivalent_ops_per_second,
      contention_adjusted_latency_ns:
        values.contention_adjusted_latency_ns ??
        optionalNumber(
          localModel,
          sourcePath,
          "system",
          "contention_adjusted_batch_latency_ns"
        ) ??
        optionalNumber(
          localModel,
          sourcePath,
          "system",
          "contention_adjusted_serial_batch_latency_ns"
        ),
      contention_adjusted_throughput_equivalent_ops_per_second:
        values.contention_adjusted_throughput_equivalent_ops_per_second ??
        optionalNumber(
          localModel,
          sourcePath,
          "system",
          "contention_adjusted_equivalent_ops_per_second"
        ) ??
        optionalNumber(
          localModel,
          sourcePath,
          "system",
          "contention_adjusted_serial_effective_equivalent_ops_per_second"
        ),
      shared_bandwidth_clients: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "contention",
        "shared_bandwidth_clients"
      ),
      bandwidth_arbitration_efficiency: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "contention",
        "arbitration_efficiency"
      ),
      calibration_overhead_fraction: optionalNumber(
        localModel,
        sourcePath,
        "system",
        "contention",
        "calibration_overhead_fraction"
      ),
      provenance_status: provenanceStatusValue,
      has_published_reference: hasPublishedReference,
      source_quality_grade: sourceQuality.grade,
      source_surrogate_type: sourceQuality.surrogateType,
      assumptions_count: assumptions.length,
      has_calibration_fit: hasCalibrationFit,
      boundary_tags: boundaryTags(
        kind,
        hasPublishedReference,
        hasCalibrationFit,
        provenanceStatusValue
      ),
      payload_path: "",
      payload_script_path: "",
      is_external: true,
    };
  }

  function uniqueExternalId(fileName) {
    return `external:${fileName}`;
  }

  function boundaryTags(
    kind,
    hasPublishedReference,
    hasCalibrationFit,
    provenanceStatusValue
  ) {
    const tags = ["local model", "external file"];
    if (kind === "transformer_layer" || kind === "transformer_model") {
      tags.push("serial timing", "non-additive noise", "exclusions");
    }
    if (hasPublishedReference) tags.push("published reference");
    if (hasCalibrationFit) tags.push("calibration fit");
    if (provenanceStatusValue !== "local model artifact") tags.push("provenance");
    return tags;
  }

  function provenanceStatus(payload) {
    const provenance = payload.provenance;
    if (isPlainObject(provenance)) {
      if (typeof provenance.claim_status === "string" && provenance.claim_status) {
        return provenance.claim_status;
      }
      if (typeof provenance.source_title === "string" && provenance.source_title) {
        return provenance.source_title;
      }
    }
    return "local model artifact";
  }

  function sourceQualitySummary(payload) {
    const quality = payload?.published_reference?.source_quality;
    if (!isPlainObject(quality)) {
      return { grade: null, surrogateType: null };
    }
    return {
      grade:
        typeof quality.confidence_grade === "string"
          ? quality.confidence_grade
          : null,
      surrogateType:
        typeof quality.local_surrogate_type === "string"
          ? quality.local_surrogate_type
          : null,
    };
  }

  function requiredObject(root, sourcePath, ...keys) {
    const value = requiredValue(root, sourcePath, ...keys);
    if (!isPlainObject(value)) {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be an object`);
    }
    return value;
  }

  function requiredArray(root, sourcePath, ...keys) {
    const value = requiredValue(root, sourcePath, ...keys);
    if (!Array.isArray(value)) {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be a list`);
    }
    return value;
  }

  function requiredString(root, sourcePath, ...keys) {
    const value = requiredValue(root, sourcePath, ...keys);
    if (typeof value !== "string") {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be a string`);
    }
    return value;
  }

  function requiredNumber(root, sourcePath, ...keys) {
    const value = requiredValue(root, sourcePath, ...keys);
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be numeric and finite`);
    }
    return value;
  }

  function optionalNumber(root, sourcePath, ...keys) {
    let current = root;
    for (const key of keys) {
      if (!isPlainObject(current) || !(key in current)) {
        return null;
      }
      current = current[key];
    }
    if (typeof current !== "number" || !Number.isFinite(current)) {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be numeric and finite`);
    }
    return current;
  }

  function optionalString(root, sourcePath, ...keys) {
    let current = root;
    for (const key of keys) {
      if (!isPlainObject(current) || !(key in current)) {
        return null;
      }
      current = current[key];
    }
    if (typeof current !== "string") {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be a string`);
    }
    return current;
  }

  function optionalStringArray(root, sourcePath, ...keys) {
    let current = root;
    for (const key of keys) {
      if (!isPlainObject(current) || !(key in current)) {
        return [];
      }
      current = current[key];
    }
    if (!Array.isArray(current)) {
      throw new Error(`${sourcePath}: ${keys.join(".")} must be a list`);
    }
    return current.map((value, index) => {
      if (typeof value !== "string") {
        throw new Error(
          `${sourcePath}: ${keys.join(".")}[${index}] must be a string`
        );
      }
      return value;
    });
  }

  function requiredValue(root, sourcePath, ...keys) {
    let current = root;
    for (const key of keys) {
      if (!isPlainObject(current) || !(key in current)) {
        throw new Error(`${sourcePath}: missing ${keys.join(".")}`);
      }
      current = current[key];
    }
    return current;
  }

  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function renderPresetControls() {
    const presets = allPresets();
    const select = document.getElementById("preset-select");
    const previousValue = select.value;
    select.innerHTML = [
      '<option value="">Comparison presets</option>',
      ...presets.map((preset) => {
        const label = `${preset.name} (${preset.source})`;
        return `<option value="${escapeHtml(preset.key)}">${escapeHtml(label)}</option>`;
      }),
    ].join("");
    if (presets.some((preset) => preset.key === previousValue)) {
      select.value = previousValue;
    }
    const selected = selectedPreset();
    document.getElementById("load-preset").disabled = !selected;
    document.getElementById("delete-preset").disabled =
      !selected || selected.source !== "local";
    const message = document.getElementById("preset-message");
    message.textContent = state.presetMessage;
    message.classList.toggle("warn", state.presetMessageIsWarning);
  }

  function renderList() {
    const list = document.getElementById("artifact-list");
    const artifacts = filteredArtifacts();
    if (!artifacts.length) {
      list.innerHTML =
        `<div class="filter-summary">0 visible - ${escapeHtml(filterSummaryLabel())}</div>
        <div class="empty">No artifacts match the current filters.</div>`;
      return;
    }

    const grouped = groupArtifactsForRail(artifacts);
    list.innerHTML = [
      `<div class="filter-summary">${artifacts.length} visible - ${escapeHtml(filterSummaryLabel())}</div>`,
      ...grouped.map(
        ([label, group]) => `
          <section class="artifact-group">
            <div class="artifact-group-heading">
              <span>${escapeHtml(label)}</span>
              <strong>${formatNumber(group.length)}</strong>
            </div>
            <div class="artifact-group-list">
              ${group.map(renderArtifactRow).join("")}
            </div>
          </section>
        `
      ),
    ].join("");

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
          if (state.pinnedId === id) {
            state.pinnedId = null;
          }
        }
        ensurePinnedReference();
        render();
      });
    });

    list.querySelectorAll("button[data-pin-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.pinId;
        if (!state.compareIds.has(id)) {
          return;
        }
        state.pinnedId = id;
        state.view = "compare";
        render();
      });
    });
  }

  function renderArtifactRow(artifact) {
    const summary = artifact.summary;
    const active = summary.id === state.selectedId ? " active" : "";
    const pinned = summary.id === state.pinnedId ? " pinned" : "";
    const checked = state.compareIds.has(summary.id) ? " checked" : "";
    const pinDisabled = state.compareIds.has(summary.id) ? "" : " disabled";
    const pinActive = summary.id === state.pinnedId ? " active" : "";
    const badgeClass =
      summary.kind === "transformer_layer" || summary.kind === "transformer_model"
        ? "badge layer"
        : "badge";
    const tags = (summary.boundary_tags || [])
      .slice(0, 3)
      .map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`)
      .join("");
    return `
      <div class="artifact-row${active}${pinned}" data-id="${escapeHtml(summary.id)}">
        <button class="artifact-main" type="button" data-id="${escapeHtml(summary.id)}">
          <div class="artifact-title">${escapeHtml(summary.benchmark_name)}</div>
          <div class="artifact-meta">${escapeHtml(summary.source_path)}</div>
          <div class="badge-row">
            <span class="${badgeClass}">${kindLabel(summary.kind)}</span>
            ${summary.is_external ? '<span class="badge mix">external</span>' : ""}
            ${summary.id === state.pinnedId ? '<span class="badge layer">pinned reference</span>' : ""}
            ${summary.source_quality_grade ? `<span class="badge good">grade ${escapeHtml(summary.source_quality_grade)}</span>` : '<span class="badge">unrated source</span>'}
            ${summary.system_profile ? `<span class="badge">profile: ${escapeHtml(summary.system_profile)}</span>` : ""}
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
            <div class="compare-controls">
              <label class="compare-pick">
                <input type="checkbox" data-compare-id="${escapeHtml(summary.id)}"${checked} aria-label="Compare ${escapeHtml(summary.benchmark_name)}">
                Compare
              </label>
              <button class="pin-button${pinActive}" type="button" data-pin-id="${escapeHtml(summary.id)}" aria-label="Pin ${escapeHtml(summary.benchmark_name)} as comparison reference"${pinDisabled}>Pin</button>
            </div>
          </div>
        `;
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
              <span class="${summary.kind === "transformer_layer" || summary.kind === "transformer_model" ? "badge layer" : "badge"}">${kindLabel(summary.kind)}</span>
              <span class="badge">${escapeHtml(summary.schema_version)}</span>
              ${summary.is_external ? '<span class="badge mix">external file</span>' : ""}
              ${summary.has_calibration_fit ? '<span class="badge mix">calibration fit</span>' : ""}
              ${summary.system_profile ? `<span class="badge">profile: ${escapeHtml(summary.system_profile)}</span>` : ""}
              ${summary.source_quality_grade ? `<span class="badge good">source grade: ${escapeHtml(summary.source_quality_grade)}</span>` : ""}
            </div>
            <h2>${escapeHtml(summary.benchmark_name)}</h2>
            <div class="description">${escapeHtml(summary.description)}</div>
          </div>
          ${
            summary.browser_path
              ? `<a class="source-link" href="${escapeHtml(summary.browser_path)}">${escapeHtml(summary.source_path)}</a>`
              : `<span class="source-link">${escapeHtml(summary.source_path)}</span>`
          }
        </div>
        <div class="metric-grid">
          ${metric("MACs", formatNumber(summary.macs), "from workload")}
          ${metric("Equivalent ops", formatNumber(summary.equivalent_ops), "2x MAC accounting")}
          ${metric("Local total energy", formatPj(summary.total_energy_pj), "local_model estimate")}
          ${metric(summary.latency_label, formatNs(summary.latency_ns), "schema-specific timing")}
          ${metric("Interface traffic", formatBytes(summary.memory_traffic_bytes), "converter boundary")}
          ${metric("Operational intensity", formatOpsPerByte(summary.operational_intensity_ops_per_byte), "local model")}
          ${metric("System energy/op", formatPj(summary.system_energy_per_op_pj), "core + movement")}
          ${metric("Movement share", formatPercent(summary.movement_energy_share), "SRAM/intermediate/off-chip")}
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

  function renderSystemModel(system, timingLabel = "Bandwidth-limited latency") {
    if (!system) {
      return `
        <section class="panel">
          <h3>Multi-Tier System Model</h3>
          <div class="notes"><p>No local_model.system block is present in this artifact.</p></div>
        </section>
      `;
    }
    const tiers = system.tiers || {};
    const preferredTierNames = ["sram", "intermediate", "off_chip"];
    const tierNames = [
      ...preferredTierNames.filter((name) => tiers[name]),
      ...Object.keys(tiers).filter((name) => !preferredTierNames.includes(name)),
    ];
    const tierRows = tierNames
      .map((name) => {
        const tier = tiers[name];
        return [
          escapeHtml(systemTierLabel(name)),
          escapeHtml(formatBytes(tier.read_bytes)),
          escapeHtml(formatBytes(tier.write_bytes)),
          escapeHtml(formatPj(tier.total_energy_pj)),
          escapeHtml(formatNs(tier.transfer_time_ns)),
          escapeHtml(formatNs(tier.contention_adjusted_transfer_time_ns)),
          escapeHtml(
            `${formatNumber(
              tier.effective_bandwidth_bytes_per_ns ?? tier.bandwidth_bytes_per_ns
            )} bytes/ns`
          ),
        ];
      });
    const contention = system.contention || {};
    const summaryRows = [
      ["System profile", system.profile || "n/a"],
      ["Profile tier overrides", formatProfileOverrides(system.profile_overrides)],
      ["Memory timing mode", system.memory_timing_mode || "n/a"],
      ["Shared bandwidth clients", formatNumber(contention.shared_bandwidth_clients)],
      ["Arbitration efficiency", formatPercent(contention.arbitration_efficiency)],
      [
        "Calibration/control overhead",
        formatPercent(contention.calibration_overhead_fraction),
      ],
      ["Local compute/conversion energy", formatPj(system.local_compute_and_conversion_energy_pj)],
      ["Total movement energy", formatPj(system.total_movement_energy_pj)],
      ["Total system energy", formatPj(system.total_system_energy_pj)],
      ["System energy/op", formatPj(system.system_energy_per_op_pj)],
      ["Movement share", formatPercent(system.movement_energy_share)],
      ["Max transfer time", formatNs(system.max_transfer_time_ns ?? system.serial_transfer_time_ns)],
      ["Serialized transfer time", formatNs(system.serial_transfer_time_ns)],
      ["Effective transfer time", formatNs(system.effective_transfer_time_ns ?? system.serial_transfer_time_ns)],
      [
        "Contention-adjusted transfer",
        formatNs(
          system.contention_adjusted_effective_transfer_time_ns ??
            system.contention_adjusted_serial_transfer_time_ns
        ),
      ],
      [
        "Calibration-adjusted transfer",
        formatNs(
          system.calibration_adjusted_effective_transfer_time_ns ??
            system.contention_adjusted_serial_transfer_time_ns
        ),
      ],
      [timingLabel, formatNs(system.bandwidth_limited_batch_latency_ns ?? system.bandwidth_limited_serial_batch_latency_ns)],
      [
        "Bandwidth-limited throughput",
        formatThroughput(
          system.bandwidth_limited_equivalent_ops_per_second ??
            system.bandwidth_limited_serial_effective_equivalent_ops_per_second
        ),
      ],
      [
        "Contention-adjusted latency",
        formatNs(
          system.contention_adjusted_batch_latency_ns ??
            system.contention_adjusted_serial_batch_latency_ns
        ),
      ],
      [
        "Contention-adjusted throughput",
        formatThroughput(
          system.contention_adjusted_equivalent_ops_per_second ??
            system.contention_adjusted_serial_effective_equivalent_ops_per_second
        ),
      ],
    ];
    return `
      <section class="panel">
        <h3>Multi-Tier System Model</h3>
        <div class="notes"><p>${escapeHtml(system.note || "System movement energy is a local SRAM/intermediate/off-chip tier estimate added separately from photonic core energy.")}</p></div>
        ${simpleTable(
          [
            { label: "Tier" },
            { label: "Read bytes", num: true },
            { label: "Write bytes", num: true },
            { label: "Movement energy", num: true },
            { label: "Transfer time", num: true },
            { label: "Adjusted transfer", num: true },
            { label: "Effective bandwidth", num: true },
          ],
          tierRows,
          "comparison-table"
        )}
        ${simpleTable(
          [{ label: "Metric" }, { label: "Value", num: true }],
          summaryRows.map(([label, value]) => [escapeHtml(label), escapeHtml(value)])
        )}
      </section>
    `;
  }

  function systemTierLabel(name) {
    if (name === "sram") return "SRAM";
    if (name === "intermediate") return "Intermediate/cache";
    if (name === "off_chip") return "Off-chip/DRAM";
    return name.replaceAll("_", " ");
  }

  function renderSourceQuality(sourceQuality) {
    const reportedMetrics = Array.isArray(sourceQuality.reported_metrics)
      ? sourceQuality.reported_metrics.join(", ")
      : "n/a";
    const coverage = isPlainObject(sourceQuality.coverage)
      ? sourceQuality.coverage
      : {};
    const coverageRows = Object.entries(coverage).map(([dimension, status]) => [
      escapeHtml(dimension),
      escapeHtml(status),
    ]);
    const notes = Array.isArray(sourceQuality.notes)
      ? sourceQuality.notes
      : [];
    return `
      ${simpleTable([{ label: "Field" }, { label: "Value" }], [
        ["Source DOI", escapeHtml(sourceQuality.source_doi || "n/a")],
        ["Reported metrics", escapeHtml(reportedMetrics)],
        ["Local surrogate type", escapeHtml(sourceQuality.local_surrogate_type || "n/a")],
        ["Confidence grade", escapeHtml(sourceQuality.confidence_grade || "n/a")],
      ])}
      ${simpleTable(
        [{ label: "Dimension" }, { label: "Coverage" }],
        coverageRows.length ? coverageRows : [["n/a", "n/a"]]
      )}
      ${
        notes.length
          ? `<div class="notes">${notes
              .map((note) => `<p>${escapeHtml(note)}</p>`)
              .join("")}</div>`
          : ""
      }
    `;
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
          <div class="concept"><strong>Interface traffic</strong><span>Memory bytes use converter widths and reuse counts, not hierarchy simulation.</span></div>
          <div class="concept"><strong>System tiers</strong><span>SRAM/intermediate/off-chip movement energy is a local tier estimate added outside paper references.</span></div>
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
    if (!artifact) {
      return Promise.reject(new Error(`No artifact recorded for ${id}`));
    }
    if (!artifact.summary.payload_script_path && !artifact.summary.payload_path) {
      return Promise.reject(new Error(`No payload path recorded for ${id}`));
    }

    const promise = artifact.summary.payload_script_path
      ? loadPayloadScript(id, artifact.summary.payload_script_path)
      : fetchPayloadJson(id, artifact.summary.payload_path);

    state.payloadPromises.set(id, promise);
    promise.catch(() => {
      state.payloadPromises.delete(id);
    });
    return promise;
  }

  function loadPayloadScript(id, scriptPath) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptPath;
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
  }

  function fetchPayloadJson(id, payloadPath) {
    return fetch(payloadPath, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${payloadPath}: HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        state.payloadCache.set(id, payload);
        return payload;
      });
  }

  function renderMatmul(artifact, payload) {
    const summary = artifact.summary;
    const shape = payload.workload.shape;
    const energyRows = objectRows(payload.local_model.energy);
    const timingRows = objectRows(payload.local_model.timing);
    const memoryRows = objectRows(payload.local_model.memory_traffic);
    const published = payload.published_reference;
    const sourceQuality = published?.source_quality;
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
        <h3>Interface Memory Traffic</h3>
        <div class="notes"><p>${escapeHtml(payload.local_model.memory_traffic?.note || "Interface traffic is derived from converter bit widths and reuse counts.")}</p></div>
        ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], memoryRows)}
      </section>
      ${renderSystemModel(payload.local_model.system)}
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
          <h3>Source Quality Index</h3>
          ${
            sourceQuality
              ? renderSourceQuality(sourceQuality)
              : '<div class="notes"><p>No source_quality block is attached to this card.</p></div>'
          }
        </section>
      </div>
      <div class="grid-2">
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
    const memory = payload.local_model.memory_traffic;
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
          <h3>Interface Memory Traffic</h3>
          <div class="notes"><p>${escapeHtml(memory?.note || "Summed from decomposed cards; not a full memory hierarchy simulation.")}</p></div>
          ${simpleTable(
            [{ label: "Field" }, { label: "Value", num: true }],
            objectRows(memory)
          )}
        </section>
        <section class="panel">
          <h3>Serial Timing</h3>
          <div class="notes"><p>Timing model: ${escapeHtml(timing.timing_model)}.</p><p>These values are serial summaries over decomposed matmuls.</p></div>
          ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], objectRows(timing))}
        </section>
      </div>
      ${renderSystemModel(payload.local_model.system, "Bandwidth-limited serial latency")}
      <div class="grid-2">
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

  function renderTransformerModel(artifact, payload) {
    const summary = artifact.summary;
    const timing = payload.local_model.timing;
    const memory = payload.local_model.memory_traffic;
    const activationMemory = payload.local_model.activation_memory_traffic;
    const noise = payload.local_model.noise;
    const components = payload.model_components;
    const sourceDir = summary.browser_path.split("/").slice(0, -1).join("/");
    const layerRows = payload.layers.map((layer) => {
      const href = sourceDir ? `${sourceDir}/${layer.json_report}` : layer.json_report;
      return [
        escapeHtml(layer.name),
        escapeHtml(formatNumber(layer.count)),
        `<a class="source-link" href="${escapeHtml(href)}">${escapeHtml(layer.json_report)}</a>`,
        escapeHtml(formatNumber(layer.workload.macs)),
        escapeHtml(formatNumber(layer.weighted_macs)),
        escapeHtml(formatPj(layer.local_model.system.system_energy_per_op_pj)),
        escapeHtml(formatNs(layer.local_model.system.bandwidth_limited_serial_batch_latency_ns)),
      ];
    });

    return `
      ${header(summary)}
      ${renderConcepts()}
      <section class="panel">
        <h3>Transformer Model Workload</h3>
        ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], [
          ["unique layer specs", escapeHtml(payload.workload.unique_layer_specs)],
          ["layer instances", escapeHtml(payload.workload.layer_count)],
          ["MACs", escapeHtml(formatNumber(payload.workload.macs))],
          ["equivalent ops", escapeHtml(formatNumber(payload.workload.equivalent_ops))],
          ["output elements", escapeHtml(formatNumber(payload.workload.output_elements))],
        ])}
      </section>
      ${
        components
          ? `<section class="panel">
              <h3>Model Components</h3>
              ${simpleTable(
                [{ label: "Component" }, { label: "Status" }, { label: "Quantity", num: true }],
                [
                  [
                    "Embeddings",
                    components.embeddings?.enabled ? "enabled" : "disabled",
                    formatBytes(components.embeddings?.total_embedding_read_bytes),
                  ],
                  [
                    "Output projection",
                    components.output_projection ? "enabled" : "disabled",
                    components.output_projection
                      ? formatNumber(components.output_projection.workload.macs)
                      : "0",
                  ],
                  [
                    "Activation tensors",
                    activationMemory?.enabled ? "enabled" : "disabled",
                    formatBytes(activationMemory?.total_tensor_bytes),
                  ],
                  [
                    "KV cache",
                    components.kv_cache?.enabled ? components.kv_cache.mode : "disabled",
                    formatBytes(
                      (components.kv_cache?.cache_read_bytes || 0) +
                        (components.kv_cache?.cache_write_bytes || 0)
                    ),
                  ],
                ]
              )}
            </section>`
          : ""
      }
      <div class="grid-2">
        <section class="panel">
          <h3>Interface Memory Traffic</h3>
          <div class="notes"><p>${escapeHtml(memory?.note || "Weighted from layer summaries; not a full memory hierarchy simulation.")}</p></div>
          ${simpleTable(
            [{ label: "Field" }, { label: "Value", num: true }],
            objectRows(memory)
          )}
        </section>
        <section class="panel">
          <h3>Serial Timing</h3>
          <div class="notes"><p>Timing model: ${escapeHtml(timing.timing_model)}.</p><p>These values are weighted serial summaries over layer specs.</p></div>
          ${simpleTable([{ label: "Field" }, { label: "Value", num: true }], objectRows(timing))}
        </section>
      </div>
      ${
        activationMemory
          ? `<section class="panel">
              <h3>Activation And KV-Cache Tensor Traffic</h3>
              <div class="notes"><p>${escapeHtml(activationMemory.note || "Tensor traffic is a local model-level assumption.")}</p></div>
              ${simpleTable(
                [{ label: "Field" }, { label: "Value", num: true }],
                objectRows(activationMemory)
              )}
            </section>`
          : ""
      }
      ${renderSystemModel(payload.local_model.system, "Bandwidth-limited model latency")}
      <section class="panel">
        <h3>Layer Specs</h3>
        ${simpleTable(
          [
            { label: "Layer spec" },
            { label: "Count", num: true },
            { label: "Summary JSON" },
            { label: "Per-layer MACs", num: true },
            { label: "Weighted MACs", num: true },
            { label: "System pJ/op", num: true },
            { label: "BW-limited layer latency", num: true },
          ],
          layerRows
        )}
      </section>
      <div class="grid-2">
        <section class="panel">
          <h3>Non-additive Noise</h3>
          <div class="notes"><p>${escapeHtml(noise.note)}</p></div>
          ${simpleTable(
            [{ label: "Field" }, { label: "Value", num: true }],
            objectRows(noise)
          )}
        </section>
        <section class="panel">
          <h3>Aggregate Semantics</h3>
          <div class="notes">${Object.values(payload.aggregate_semantics)
            .map((value) => `<p>${escapeHtml(value)}</p>`)
            .join("")}</div>
        </section>
      </div>
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
        if (artifact.summary.kind === "transformer_model") {
          detail.innerHTML = renderTransformerModel(artifact, payload);
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

  function comparisonSummaryRows(artifacts, pinnedArtifact) {
    const metricRows = [
      [
        "Pinned reference",
        (summary) => (pinnedArtifact && summary.id === pinnedArtifact.summary.id ? "yes" : "no"),
      ],
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
      ["System total energy", (summary) => formatPj(summary.system_total_energy_pj)],
      ["System energy per op", (summary) => formatPj(summary.system_energy_per_op_pj)],
      ["System profile", (summary) => summary.system_profile || "n/a"],
      [
        "Profile tier overrides",
        (summary) => formatProfileOverrides(summary.system_profile_overrides),
      ],
      ["Memory timing mode", (summary) => summary.memory_timing_mode || "n/a"],
      [
        "Effective transfer time",
        (summary) => formatNs(summary.effective_transfer_time_ns),
      ],
      [
        "Shared bandwidth clients",
        (summary) => formatNumber(summary.shared_bandwidth_clients),
      ],
      [
        "Arbitration efficiency",
        (summary) => formatPercent(summary.bandwidth_arbitration_efficiency),
      ],
      [
        "Calibration/control overhead",
        (summary) => formatPercent(summary.calibration_overhead_fraction),
      ],
      ["Movement energy", (summary) => formatPj(summary.movement_energy_pj)],
      ["Movement share", (summary) => formatPercent(summary.movement_energy_share)],
      ["Latency label", (summary) => summary.latency_label],
      ["Latency", (summary) => formatNs(summary.latency_ns)],
      ["Throughput", (summary) =>
        formatThroughput(summary.throughput_equivalent_ops_per_second)],
      ["Bandwidth-limited latency", (summary) =>
        formatNs(summary.bandwidth_limited_latency_ns)],
      ["Bandwidth-limited throughput", (summary) =>
        formatThroughput(
          summary.bandwidth_limited_throughput_equivalent_ops_per_second
        )],
      ["Contention-adjusted latency", (summary) =>
        formatNs(summary.contention_adjusted_latency_ns)],
      ["Contention-adjusted throughput", (summary) =>
        formatThroughput(
          summary.contention_adjusted_throughput_equivalent_ops_per_second
        )],
      ["Interface traffic", (summary) => formatBytes(summary.memory_traffic_bytes)],
      ["Operational intensity", (summary) =>
        formatOpsPerByte(summary.operational_intensity_ops_per_byte)],
      ["Assumptions", (summary) => formatNumber(summary.assumptions_count)],
      ["Published reference", (summary) => yesNo(summary.has_published_reference)],
      ["Source quality grade", (summary) => summary.source_quality_grade || "n/a"],
      ["Local surrogate type", (summary) => summary.source_surrogate_type || "n/a"],
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

  function comparisonMetricSpecs() {
    return [
      {
        label: "MACs",
        get: (summary) => summary.macs,
        format: formatNumber,
        direction: "context",
      },
      {
        label: "Equivalent ops",
        get: (summary) => summary.equivalent_ops,
        format: formatNumber,
        direction: "context",
      },
      {
        label: "Output elements",
        get: (summary) => summary.output_elements,
        format: formatNumber,
        direction: "context",
      },
      {
        label: "Local total energy",
        get: (summary) => summary.total_energy_pj,
        format: formatPj,
        direction: "lower",
      },
      {
        label: "Energy per op",
        get: (summary) => summary.energy_per_op_pj,
        format: formatPj,
        direction: "lower",
      },
      {
        label: "System energy per op",
        get: (summary) => summary.system_energy_per_op_pj,
        format: formatPj,
        direction: "lower",
      },
      {
        label: "Movement share",
        get: (summary) => summary.movement_energy_share,
        format: formatPercent,
        direction: "lower",
      },
      {
        label: "Latency",
        get: (summary) => summary.latency_ns,
        format: formatNs,
        direction: "lower",
      },
      {
        label: "Throughput",
        get: (summary) => summary.throughput_equivalent_ops_per_second,
        format: formatThroughput,
        direction: "higher",
      },
      {
        label: "Bandwidth-limited throughput",
        get: (summary) =>
          summary.bandwidth_limited_throughput_equivalent_ops_per_second,
        format: formatThroughput,
        direction: "higher",
      },
      {
        label: "Contention-adjusted latency",
        get: (summary) => summary.contention_adjusted_latency_ns,
        format: formatNs,
        direction: "lower",
      },
      {
        label: "Contention-adjusted throughput",
        get: (summary) =>
          summary.contention_adjusted_throughput_equivalent_ops_per_second,
        format: formatThroughput,
        direction: "higher",
      },
      {
        label: "Shared bandwidth clients",
        get: (summary) => summary.shared_bandwidth_clients,
        format: formatNumber,
        direction: "lower",
      },
      {
        label: "Calibration/control overhead",
        get: (summary) => summary.calibration_overhead_fraction,
        format: formatPercent,
        direction: "lower",
      },
      {
        label: "Interface traffic",
        get: (summary) => summary.memory_traffic_bytes,
        format: formatBytes,
        direction: "lower",
      },
      {
        label: "Operational intensity",
        get: (summary) => summary.operational_intensity_ops_per_byte,
        format: formatOpsPerByte,
        direction: "higher",
      },
      {
        label: "Assumption count",
        get: (summary) => summary.assumptions_count,
        format: formatNumber,
        direction: "context",
      },
      {
        label: "Source confidence",
        get: sourceConfidenceScore,
        format: formatConfidenceScore,
        direction: "higher",
      },
    ];
  }

  function sourceConfidenceScore(summary) {
    const gradeScore =
      SOURCE_CONFIDENCE_BY_GRADE[
        String(summary.source_quality_grade || "").toUpperCase()
      ];
    if (gradeScore !== undefined) {
      return gradeScore;
    }
    return summary.has_published_reference ? PUBLISHED_UNRATED_SOURCE_CONFIDENCE : 0;
  }

  function formatConfidenceScore(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "n/a";
    }
    return `${formatNumber(value)} / 100`;
  }

  function readScoreWeights() {
    try {
      return sanitizeScoreWeights(
        JSON.parse(localStorage.getItem(SCORE_WEIGHTS_KEY) || "{}")
      );
    } catch {
      return {};
    }
  }

  function writeScoreWeights() {
    const weights = sanitizeScoreWeights(state.customScoreWeights);
    state.customScoreWeights = weights;
    localStorage.setItem(SCORE_WEIGHTS_KEY, JSON.stringify(weights));
  }

  function parseScoreWeightsParam(value) {
    if (!value) {
      return {};
    }
    try {
      return sanitizeScoreWeights(JSON.parse(value));
    } catch {
      return {};
    }
  }

  function encodeScoreWeightsParam(weights) {
    const sanitized = sanitizeScoreWeights(weights);
    return Object.keys(sanitized).length ? JSON.stringify(sanitized) : "";
  }

  function sanitizeScoreWeights(value) {
    if (!value || typeof value !== "object") {
      return {};
    }
    const knownLabels = new Set(comparisonMetricSpecs().map((spec) => spec.label));
    return Object.fromEntries(
      Object.entries(value)
        .map(([label, weight]) => [label, Number(weight)])
        .filter(
          ([label, weight]) =>
            knownLabels.has(label) && Number.isFinite(weight) && weight >= 0
        )
        .map(([label, weight]) => [label, Number(weight.toFixed(3))])
        .filter(([, weight]) => weight !== 1)
    );
  }

  function scoreWeightForMetric(label, weights = state.customScoreWeights) {
    const weight = Number(weights[label]);
    return Number.isFinite(weight) && weight >= 0 ? weight : 1;
  }

  function setScoreWeight(label, value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) {
      return;
    }
    if (Math.abs(number - 1) < 0.001) {
      delete state.customScoreWeights[label];
    } else {
      state.customScoreWeights[label] = Number(number.toFixed(3));
    }
    writeScoreWeights();
    render();
  }

  function resetFocusWeights(focus) {
    specsForFocus(focus).forEach((spec) => {
      delete state.customScoreWeights[spec.label];
    });
    writeScoreWeights();
    render();
  }

  function activeScoreWeightSummary(focus, weights = state.customScoreWeights) {
    return specsForFocus(focus)
      .filter((spec) => ["lower", "higher"].includes(spec.direction))
      .map((spec) => ({
        metric: spec.label,
        weight: scoreWeightForMetric(spec.label, weights),
      }));
  }

  function comparisonFocusOptions() {
    return {
      balanced: {
        label: "Balanced",
        description:
          "Balances energy, movement, latency, bandwidth-limited throughput, contention-adjusted throughput, operational intensity, and source confidence.",
        metricLabels: [
          "Energy per op",
          "System energy per op",
          "Movement share",
          "Latency",
          "Bandwidth-limited throughput",
          "Contention-adjusted throughput",
          "Operational intensity",
          "Source confidence",
        ],
      },
      efficiency: {
        label: "Efficiency",
        description:
          "Prioritizes low local/system energy, low movement share, low interface traffic, and high operational intensity.",
        metricLabels: [
          "Energy per op",
          "System energy per op",
          "Movement share",
          "Interface traffic",
          "Operational intensity",
        ],
      },
      throughput: {
        label: "Throughput",
        description:
          "Prioritizes low latency and high local, bandwidth-limited, and contention-adjusted throughput.",
        metricLabels: [
          "Latency",
          "Throughput",
          "Bandwidth-limited throughput",
          "Contention-adjusted latency",
          "Contention-adjusted throughput",
        ],
      },
      contention: {
        label: "Contention",
        description:
          "Prioritizes adjusted throughput/latency while penalizing shared-client and calibration/control guardband assumptions.",
        metricLabels: [
          "Contention-adjusted latency",
          "Contention-adjusted throughput",
          "Shared bandwidth clients",
          "Calibration/control overhead",
          "System energy per op",
        ],
      },
      provenance: {
        label: "Provenance",
        description:
          "Prioritizes source confidence while still including system energy and operational intensity for context.",
        metricLabels: [
          "Source confidence",
          "System energy per op",
          "Operational intensity",
        ],
      },
    };
  }

  function scoreWeightProfiles() {
    return {
      balanced: {
        label: "Balanced",
        analysisFocus: "balanced",
        description:
          "Default review profile. Keeps energy, movement, timing, throughput, intensity, contention, and source confidence in view.",
        weights: {},
      },
      efficiency: {
        label: "Efficiency",
        analysisFocus: "efficiency",
        description:
          "Use when the daily question is which card minimizes local and system energy without hiding data-movement cost.",
        weights: {
          "Energy per op": 1.5,
          "System energy per op": 2,
          "Movement share": 1.5,
          "Interface traffic": 1.25,
          "Operational intensity": 1.25,
        },
      },
      throughput: {
        label: "Throughput",
        analysisFocus: "throughput",
        description:
          "Use when ranking is driven by latency and sustained equivalent-op throughput under local bandwidth limits.",
        weights: {
          Latency: 1.25,
          Throughput: 1.25,
          "Bandwidth-limited throughput": 2,
          "Contention-adjusted latency": 1.25,
          "Contention-adjusted throughput": 1.75,
        },
      },
      contention: {
        label: "Contention",
        analysisFocus: "contention",
        description:
          "Use when shared bandwidth, calibration/control overhead, and adjusted throughput are the main operational risks.",
        weights: {
          "Contention-adjusted latency": 1.75,
          "Contention-adjusted throughput": 2,
          "Shared bandwidth clients": 1.25,
          "Calibration/control overhead": 1.5,
          "System energy per op": 1.1,
        },
      },
      provenance: {
        label: "Provenance",
        analysisFocus: "provenance",
        description:
          "Use when source quality and published-reference confidence should dominate triage before local-model estimates.",
        weights: {
          "Source confidence": 2.5,
          "System energy per op": 0.75,
          "Operational intensity": 0.75,
        },
      },
    };
  }

  function scoreProfileWeights(profile) {
    return sanitizeScoreWeights(profile ? profile.weights : {});
  }

  function scoreWeightsEqual(left, right) {
    const leftWeights = sanitizeScoreWeights(left);
    const rightWeights = sanitizeScoreWeights(right);
    const labels = new Set([
      ...Object.keys(leftWeights),
      ...Object.keys(rightWeights),
    ]);
    return Array.from(labels).every(
      (label) =>
        Math.abs(
          scoreWeightForMetric(label, leftWeights) -
            scoreWeightForMetric(label, rightWeights)
        ) < 0.001
    );
  }

  function matchedScoreProfileKey(
    weights = state.customScoreWeights,
    focusKey = state.analysisFocus
  ) {
    return (
      Object.entries(scoreWeightProfiles()).find(
        ([, profile]) =>
          profile.analysisFocus === focusKey &&
          scoreWeightsEqual(weights, scoreProfileWeights(profile))
      ) || []
    )[0] || null;
  }

  function focusForProfile(profile) {
    const options = comparisonFocusOptions();
    const focus = options[profile.analysisFocus] || options.balanced;
    return {
      key: profile.analysisFocus,
      ...focus,
    };
  }

  function activeScoreProfileSummary(focus = activeComparisonFocus()) {
    const profileKey = matchedScoreProfileKey(state.customScoreWeights, focus.key);
    if (profileKey) {
      const profile = scoreWeightProfiles()[profileKey];
      return {
        key: profileKey,
        label: profile.label,
        description: profile.description,
        is_builtin: true,
      };
    }
    return {
      key: "custom",
      label: "Custom",
      description:
        "User-adjusted score weights for the current comparison context.",
      is_builtin: false,
    };
  }

  function applyScoreProfileState(profileKey, persist = true) {
    const profile = scoreWeightProfiles()[profileKey];
    if (!profile) {
      return false;
    }
    state.analysisFocus = profile.analysisFocus;
    state.customScoreWeights = scoreProfileWeights(profile);
    if (persist) {
      writeScoreWeights();
    }
    return true;
  }

  function applyScoreProfile(profileKey) {
    const profile = scoreWeightProfiles()[profileKey];
    if (!profile || !applyScoreProfileState(profileKey)) {
      setPresetMessage("Select a valid score profile.", true);
      return;
    }
    setPresetMessage(`Applied ${profile.label} score profile.`);
    render();
  }

  function scoreProfileWeightSummary(profile) {
    const focus = focusForProfile(profile);
    const weights = scoreProfileWeights(profile);
    return activeScoreWeightSummary(focus, weights)
      .map((entry) => `${entry.metric} x${formatNumber(entry.weight)}`)
      .join(", ");
  }

  function scoreProfilePreview(profile, artifacts) {
    if (!artifacts.length) {
      return "Select artifacts to preview profile winners.";
    }
    const focus = focusForProfile(profile);
    const recommendations = comparisonRecommendations(
      artifacts,
      focus,
      scoreProfileWeights(profile)
    );
    if (!recommendations.length) {
      return "No same-schema score preview available for the current set.";
    }
    return recommendations
      .slice(0, 2)
      .map(
        (entry) =>
          `${entry.group}: ${entry.artifact.summary.benchmark_name} (${formatNumber(entry.score)})`
      )
      .join("; ");
  }

  function activeComparisonFocus() {
    const options = comparisonFocusOptions();
    return {
      key: state.analysisFocus,
      ...(options[state.analysisFocus] || options.balanced),
    };
  }

  function specsForFocus(focus = activeComparisonFocus()) {
    const metricLabels = new Set(focus.metricLabels);
    return comparisonMetricSpecs().filter((spec) => metricLabels.has(spec.label));
  }

  function paretoSpecs() {
    return {
      "energy-throughput": {
        label: "Energy/op vs throughput",
        xLabel: "System pJ/op",
        yLabel: "BW-limited eq ops/s",
        xDirection: "lower",
        yDirection: "higher",
        xGet: (summary) => summary.system_energy_per_op_pj ?? summary.energy_per_op_pj,
        yGet: (summary) =>
          summary.bandwidth_limited_throughput_equivalent_ops_per_second ??
          summary.throughput_equivalent_ops_per_second,
        xFormat: formatPj,
        yFormat: formatThroughput,
      },
      "intensity-latency": {
        label: "Ops/byte vs latency",
        xLabel: "Eq ops/byte",
        yLabel: "BW-limited latency",
        xDirection: "higher",
        yDirection: "lower",
        xGet: (summary) => summary.operational_intensity_ops_per_byte,
        yGet: (summary) =>
          summary.bandwidth_limited_latency_ns ?? summary.latency_ns,
        xFormat: formatOpsPerByte,
        yFormat: formatNs,
      },
      "contention-throughput": {
        label: "Contention-adjusted throughput",
        xLabel: "System pJ/op",
        yLabel: "Contention-adjusted eq ops/s",
        xDirection: "lower",
        yDirection: "higher",
        xGet: (summary) => summary.system_energy_per_op_pj ?? summary.energy_per_op_pj,
        yGet: (summary) =>
          summary.contention_adjusted_throughput_equivalent_ops_per_second ??
          summary.bandwidth_limited_throughput_equivalent_ops_per_second ??
          summary.throughput_equivalent_ops_per_second,
        xFormat: formatPj,
        yFormat: formatThroughput,
      },
    };
  }

  function paretoPoints(artifacts, spec) {
    const points = artifacts
      .map((artifact) => ({
        artifact,
        x: Number(spec.xGet(artifact.summary)),
        y: Number(spec.yGet(artifact.summary)),
      }))
      .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    return points.map((point) => ({
      ...point,
      frontier: isParetoFrontierPoint(point, points, spec),
    }));
  }

  function isParetoFrontierPoint(point, points, spec) {
    return !points.some((candidate) => {
      if (candidate.artifact.summary.id === point.artifact.summary.id) {
        return false;
      }
      const xAtLeast =
        spec.xDirection === "lower" ? candidate.x <= point.x : candidate.x >= point.x;
      const yAtLeast =
        spec.yDirection === "lower" ? candidate.y <= point.y : candidate.y >= point.y;
      const xBetter =
        spec.xDirection === "lower" ? candidate.x < point.x : candidate.x > point.x;
      const yBetter =
        spec.yDirection === "lower" ? candidate.y < point.y : candidate.y > point.y;
      return xAtLeast && yAtLeast && (xBetter || yBetter);
    });
  }

  function renderParetoChart(artifacts) {
    const specs = paretoSpecs();
    const spec = specs[state.paretoMode] || specs["energy-throughput"];
    const points = paretoPoints(artifacts, spec);
    if (!points.length) {
      return `
        <section class="panel">
          <h3>Pareto Trade-Offs</h3>
          <div class="notes"><p>No finite data is available for the selected Pareto axes.</p></div>
        </section>
      `;
    }
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const xScale = axisScale(minX, maxX);
    const yScale = axisScale(minY, maxY);
    const xCoord = (value) => 54 + xScale.normalize(value) * 300;
    const yCoord = (value) => 244 - yScale.normalize(value) * 180;
    const frontierRows = points
      .filter((point) => point.frontier)
      .sort((left, right) =>
        spec.xDirection === "higher" ? right.x - left.x : left.x - right.x
      )
      .map((point) => [
        escapeHtml(point.artifact.summary.benchmark_name),
        escapeHtml(spec.xFormat(point.x)),
        escapeHtml(spec.yFormat(point.y)),
      ]);
    return `
      <section class="panel">
        <div class="panel-heading">
          <h3>Pareto Trade-Offs</h3>
          <select id="pareto-mode" aria-label="Pareto chart mode">
            ${Object.entries(specs)
              .map(
                ([key, option]) =>
                  `<option value="${escapeHtml(key)}"${
                    key === state.paretoMode ? " selected" : ""
                  }>${escapeHtml(option.label)}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="notes"><p>Frontier points are not dominated on both axes for this chart mode. Axis direction is explicit: ${escapeHtml(spec.xLabel)} is ${spec.xDirection} better; ${escapeHtml(spec.yLabel)} is ${spec.yDirection} better. Axes are log-scaled automatically when positive values span at least 100x; current scales are ${escapeHtml(xScale.label)} x-axis and ${escapeHtml(yScale.label)} y-axis.</p></div>
        <div class="pareto-wrap">
          <svg class="pareto-chart" viewBox="0 0 390 280" role="img" aria-label="${escapeHtml(spec.label)} Pareto chart">
            <line x1="54" y1="244" x2="354" y2="244" class="axis"></line>
            <line x1="54" y1="64" x2="54" y2="244" class="axis"></line>
            <text x="204" y="274" text-anchor="middle" class="axis-label">${escapeHtml(spec.xLabel)}</text>
            <text x="15" y="154" text-anchor="middle" class="axis-label vertical">${escapeHtml(spec.yLabel)}</text>
            <text x="54" y="260" text-anchor="middle" class="tick-label">${escapeHtml(spec.xFormat(minX))}</text>
            <text x="354" y="260" text-anchor="middle" class="tick-label">${escapeHtml(spec.xFormat(maxX))}</text>
            <text x="46" y="248" text-anchor="end" class="tick-label">${escapeHtml(spec.yFormat(minY))}</text>
            <text x="46" y="68" text-anchor="end" class="tick-label">${escapeHtml(spec.yFormat(maxY))}</text>
            ${points
              .map((point, index) => {
                const x = xCoord(point.x);
                const y = yCoord(point.y);
                const label = String(index + 1);
                return `
                  <g class="${point.frontier ? "pareto-point frontier" : "pareto-point"}">
                    <circle cx="${x}" cy="${y}" r="${point.frontier ? 7 : 5}"></circle>
                    <text x="${x}" y="${y - 11}" text-anchor="middle">${escapeHtml(label)}</text>
                    <title>${escapeHtml(point.artifact.summary.benchmark_name)}: ${escapeHtml(spec.xFormat(point.x))}, ${escapeHtml(spec.yFormat(point.y))}</title>
                  </g>
                `;
              })
              .join("")}
          </svg>
          <div class="pareto-legend">
            ${points
              .map(
                (point, index) => `
                  <div><span class="${point.frontier ? "legend-dot frontier" : "legend-dot"}">${index + 1}</span>${escapeHtml(point.artifact.summary.benchmark_name)}</div>
                `
              )
              .join("")}
          </div>
        </div>
        <h4>Frontier Points</h4>
        ${simpleTable(
          [
            { label: "Artifact" },
            { label: spec.xLabel, num: true },
            { label: spec.yLabel, num: true },
          ],
          frontierRows,
          "comparison-table"
        )}
      </section>
    `;
  }

  function normalize(value, min, max) {
    if (max === min) {
      return 0.5;
    }
    return (value - min) / (max - min);
  }

  function axisScale(min, max) {
    const useLog = min > 0 && max > 0 && max / min >= 100;
    if (!useLog) {
      return {
        label: "linear",
        normalize: (value) => normalize(value, min, max),
      };
    }
    const logMin = Math.log10(min);
    const logMax = Math.log10(max);
    return {
      label: "log",
      normalize: (value) => normalize(Math.log10(value), logMin, logMax),
    };
  }

  function groupArtifactsByKind(artifacts) {
    const groups = new Map();
    artifacts.forEach((artifact) => {
      const label = kindLabel(artifact.summary.kind);
      if (!groups.has(label)) {
        groups.set(label, []);
      }
      groups.get(label).push(artifact);
    });
    return Array.from(groups.entries());
  }

  function renderComparisonInsights(artifacts, pinnedArtifact, focus) {
    const insightSpecs = specsForFocus(focus).filter((spec) =>
      ["lower", "higher"].includes(spec.direction)
    );
    return `
      <section class="panel">
        <h3>Comparison Insights</h3>
        <div class="notes"><p>${escapeHtml(focus.label)} focus: ${escapeHtml(focus.description)} Ranking cues stay inside each schema group so per-matmul cards and transformer-layer aggregates are not treated as interchangeable hardware results.</p></div>
        <div class="insight-grid">
          ${groupArtifactsByKind(artifacts)
            .map(([label, group]) => {
              const compatiblePinned =
                pinnedArtifact &&
                pinnedArtifact.summary.kind === group[0].summary.kind;
              const rows = insightSpecs
                .map((spec) => {
                  const best = bestArtifactForSpec(group, spec);
                  if (!best) {
                    return "";
                  }
                  return `
                    <div class="insight-row">
                      <span>${escapeHtml(insightLabel(spec))}</span>
                      <strong>${escapeHtml(best.summary.benchmark_name)}</strong>
                      <code>${escapeHtml(spec.format(spec.get(best.summary)))}</code>
                    </div>
                  `;
                })
                .join("");
              return `
                <div class="insight-card">
                  <div class="insight-title">${escapeHtml(label)}</div>
                  <div class="insight-meta">${group.length} selected - ${
                    compatiblePinned
                      ? "pinned deltas active"
                      : "values only for this schema"
                  }</div>
                  ${rows}
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderDecisionScorecard(artifacts, focus) {
    const scoreSpecs = specsForFocus(focus).filter((spec) =>
      ["lower", "higher"].includes(spec.direction)
    );
    const sections = groupArtifactsByKind(artifacts)
      .map(([label, group]) => {
        const scored = group
          .map((artifact) => ({
            artifact,
            explanation: decisionScoreExplanation(artifact, group, scoreSpecs),
          }))
          .sort((left, right) => right.explanation.score - left.explanation.score);
        const rows = scored.map((entry, index) => [
          escapeHtml(formatNumber(index + 1)),
          escapeHtml(entry.artifact.summary.benchmark_name),
          escapeHtml(formatNumber(entry.explanation.score)),
          escapeHtml(bestUseLabel(entry.artifact.summary, group, scoreSpecs)),
          escapeHtml(entry.artifact.summary.memory_timing_mode || "n/a"),
          escapeHtml(formatPj(entry.artifact.summary.system_energy_per_op_pj)),
          escapeHtml(
            formatThroughput(
              entry.artifact.summary
                .bandwidth_limited_throughput_equivalent_ops_per_second
            )
          ),
        ]);
        return `
          <section class="panel">
            <h3>${escapeHtml(label)} Decision Scorecard</h3>
            <div class="notes"><p>${escapeHtml(focus.label)} focus normalizes selected same-schema artifacts across: ${escapeHtml(scoreSpecs.map((spec) => `${spec.label} x${formatNumber(scoreWeightForMetric(spec.label))}`).join(", "))}. The score is a weighted local UI triage aid, not a benchmark claim.</p></div>
            ${simpleTable(
              [
                { label: "Rank", num: true },
                { label: "Artifact" },
                { label: "Score", num: true },
                { label: "Best use" },
                { label: "Memory timing" },
                { label: "System pJ/op", num: true },
                { label: "BW-limited throughput", num: true },
              ],
              rows,
              "comparison-table"
            )}
          </section>
        `;
      })
      .join("");
    return sections;
  }

  function comparisonRecommendations(
    artifacts,
    focus,
    weights = state.customScoreWeights
  ) {
    const scoreSpecs = specsForFocus(focus).filter((spec) =>
      ["lower", "higher"].includes(spec.direction)
    );
    return groupArtifactsByKind(artifacts)
      .map(([label, group]) => {
        const ranked = group
          .map((artifact) => ({
            artifact,
            explanation: decisionScoreExplanation(
              artifact,
              group,
              scoreSpecs,
              weights
            ),
          }))
          .filter((entry) => Number.isFinite(entry.explanation.score))
          .sort((left, right) => right.explanation.score - left.explanation.score);
        const winner = ranked[0];
        if (!winner) {
          return null;
        }
        return {
          group: label,
          artifact: winner.artifact,
          score: winner.explanation.score,
          scoreExplanation: winner.explanation,
          bestUse: bestUseLabel(winner.artifact.summary, group, scoreSpecs),
        };
      })
      .filter(Boolean);
  }

  function renderComparisonRecommendations(artifacts, focus) {
    const recommendations = comparisonRecommendations(artifacts, focus);
    if (!recommendations.length) {
      return "";
    }
    return `
      <section class="panel">
        <h3>Comparison Recommendations</h3>
        <div class="notes"><p>${escapeHtml(focus.label)} focus is applied within each schema group. Recommendations are local dashboard heuristics from selected artifacts and do not convert surrogate estimates or system-model assumptions into measured hardware claims.</p></div>
        <div class="recommendation-grid">
          ${recommendations
            .map(
              (entry) => `
                <div class="recommendation-card">
                  <div class="recommendation-kicker">${escapeHtml(entry.group)}</div>
                  <strong>${escapeHtml(entry.artifact.summary.benchmark_name)}</strong>
                  <span>${escapeHtml(entry.bestUse)}</span>
                  <code>${escapeHtml(formatNumber(entry.score))} focus score</code>
                  ${renderScoreExplanation(entry.scoreExplanation)}
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderScoreWeightControls(focus) {
    const specs = specsForFocus(focus).filter((spec) =>
      ["lower", "higher"].includes(spec.direction)
    );
    if (!specs.length) {
      return "";
    }
    return `
      <div class="weight-panel" aria-label="Custom score weights">
        <div>
          <strong>Score weights</strong>
          <span>Local same-schema triage weights for this focus mode.</span>
        </div>
        <div class="weight-grid">
          ${specs
            .map(
              (spec) => `
                <label>
                  <span>${escapeHtml(spec.label)}</span>
                  <input type="number" min="0" step="0.25" value="${escapeHtml(scoreWeightForMetric(spec.label))}" data-score-weight="${escapeHtml(spec.label)}" aria-label="${escapeHtml(spec.label)} score weight">
                </label>
              `
            )
            .join("")}
        </div>
        <button class="action-button" type="button" data-action="reset-score-weights">Reset weights</button>
      </div>
    `;
  }

  function renderScoreProfileGallery(artifacts, focus) {
    const activeProfile = activeScoreProfileSummary(focus);
    const profiles = Object.entries(scoreWeightProfiles());
    return `
      <section class="score-profile-gallery" aria-label="Score profile gallery">
        <div class="profile-gallery-heading">
          <div>
            <strong>Score Profile Gallery</strong>
            <span>Apply a named weighting stance without changing the selected artifacts or pinned reference.</span>
          </div>
          <code>${escapeHtml(activeProfile.label)} profile active</code>
        </div>
        <div class="profile-card-grid">
          ${profiles
            .map(([key, profile]) => {
              const isActive = activeProfile.is_builtin && activeProfile.key === key;
              const weightSummary = scoreProfileWeightSummary(profile);
              return `
                <article class="score-profile-card${isActive ? " active" : ""}">
                  <div class="score-profile-card-head">
                    <strong>${escapeHtml(profile.label)}</strong>
                    <span>${escapeHtml(comparisonFocusOptions()[profile.analysisFocus].label)} focus</span>
                  </div>
                  <p>${escapeHtml(profile.description)}</p>
                  <div class="profile-weight-summary">${escapeHtml(weightSummary)}</div>
                  <div class="profile-preview">
                    <span>Current set preview</span>
                    <strong>${escapeHtml(scoreProfilePreview(profile, artifacts))}</strong>
                  </div>
                  <button class="action-button${isActive ? " primary" : ""}" type="button" data-score-profile="${escapeHtml(key)}" aria-label="Apply ${escapeHtml(profile.label)} score profile">
                    ${isActive ? "Active" : "Apply profile"}
                  </button>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderSelectionDrawer(artifacts) {
    const groups = groupArtifactsByKind(artifacts);
    return `
      <section class="panel selection-drawer" aria-label="Selection drawer">
        <div class="panel-heading">
          <h3>Selection Drawer</h3>
          <div class="selection-actions">
            <label>
              <span>Top N visible</span>
              <input id="top-visible-count" type="number" min="1" max="50" step="1" value="${escapeHtml(state.topVisibleCount)}" aria-label="Top visible artifact count">
            </label>
            <button class="action-button" type="button" data-action="compare-top-visible">Compare top N visible</button>
            <button class="action-button" type="button" data-action="invert-visible">Invert visible selection</button>
          </div>
        </div>
        <div class="notes"><p>Selection actions operate on the current rail filters. Clear group removes selected artifacts in one schema group; invert toggles only visible artifacts and keeps hidden selections unchanged.</p></div>
        <div class="selection-grid">
          ${groups
            .map(
              ([label, group]) => `
                <div class="selection-group">
                  <div class="selection-group-heading">
                    <strong>${escapeHtml(label)}</strong>
                    <button class="action-button" type="button" data-clear-selection-group="${escapeHtml(group[0].summary.kind)}" aria-label="Clear ${escapeHtml(label)} selection group">Clear group</button>
                  </div>
                  ${group
                    .map(
                      (artifact) => `
                        <div class="selection-row">
                          <span>${escapeHtml(artifact.summary.benchmark_name)}</span>
                          <button class="action-button" type="button" data-remove-selection="${escapeHtml(artifact.summary.id)}" aria-label="Remove ${escapeHtml(artifact.summary.benchmark_name)} from comparison">Remove</button>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function decisionScore(artifact, group, specs, weights = state.customScoreWeights) {
    return decisionScoreExplanation(artifact, group, specs, weights).score;
  }

  function decisionScoreExplanation(
    artifact,
    group,
    specs,
    weights = state.customScoreWeights
  ) {
    const components = specs.map((spec) => {
      const rawValue = spec.get(artifact.summary);
      const normalizedScore = normalizedMetricScore(spec, rawValue, group);
      const weight = scoreWeightForMetric(spec.label, weights);
      const included = Number.isFinite(normalizedScore) && weight > 0;
      return {
        metric: spec.label,
        direction: spec.direction,
        raw_value: Number.isFinite(Number(rawValue)) ? Number(rawValue) : null,
        formatted_value: spec.format(rawValue),
        normalized_score: Number.isFinite(normalizedScore)
          ? Number(normalizedScore.toFixed(6))
          : null,
        weight,
        contribution: included
          ? Number((normalizedScore * weight).toFixed(6))
          : null,
        included,
      };
    });
    const included = components.filter((component) => component.included);
    const totalWeight = included.reduce(
      (total, component) => total + component.weight,
      0
    );
    const weightedTotal = included.reduce(
      (total, component) => total + component.contribution,
      0
    );
    return {
      score: totalWeight ? weightedTotal / totalWeight : 0,
      total_weight: totalWeight,
      components,
    };
  }

  function renderScoreExplanation(explanation) {
    const rows = explanation.components.map((component) => [
      escapeHtml(component.metric),
      escapeHtml(component.formatted_value),
      escapeHtml(
        component.normalized_score === null
          ? "n/a"
          : formatNumber(component.normalized_score)
      ),
      escapeHtml(formatNumber(component.weight)),
      escapeHtml(
        component.contribution === null
          ? "n/a"
          : formatNumber(component.contribution)
      ),
    ]);
    return `
      <details class="score-explanation">
        <summary>Explain score</summary>
        <div class="notes"><p>Final score ${escapeHtml(formatNumber(explanation.score))} = weighted contribution sum divided by total included weight ${escapeHtml(formatNumber(explanation.total_weight))}. Missing metrics and zero-weight metrics are excluded.</p></div>
        ${simpleTable(
          [
            { label: "Metric" },
            { label: "Raw value", num: true },
            { label: "Normalized", num: true },
            { label: "Weight", num: true },
            { label: "Contribution", num: true },
          ],
          rows,
          "comparison-table score-table"
        )}
      </details>
    `;
  }

  function normalizedMetricScore(spec, value, group) {
    const number = Number(value);
    if (!Number.isFinite(number)) return Number.NaN;
    const values = group
      .map((artifact) => Number(spec.get(artifact.summary)))
      .filter((candidate) => Number.isFinite(candidate));
    if (!values.length) return Number.NaN;
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (min === max) return 100;
    if (spec.direction === "lower") {
      return 100 * (1 - (number - min) / (max - min));
    }
    if (spec.direction === "higher") {
      return 100 * ((number - min) / (max - min));
    }
    return Number.NaN;
  }

  function bestUseLabel(summary, group, specs = comparisonMetricSpecs()) {
    const labels = [];
    specs
      .filter((spec) => ["lower", "higher"].includes(spec.direction))
      .forEach((spec) => {
        if (isBestByLabel(summary, group, spec.label)) {
          labels.push(`${bestBadge(spec)} ${spec.label.toLowerCase()}`);
        }
      });
    return labels.length ? labels.join(", ") : "balanced trade-off";
  }

  function isBestByLabel(summary, group, label) {
    const spec = comparisonMetricSpecs().find((candidate) => candidate.label === label);
    const best = spec ? bestArtifactForSpec(group, spec) : null;
    return Boolean(best && best.summary.id === summary.id);
  }

  function renderSchemaCompatibility(artifacts, pinnedArtifact) {
    const rows = groupArtifactsByKind(artifacts).map(([label, group]) => {
      const compatiblePinned =
        pinnedArtifact && pinnedArtifact.summary.kind === group[0].summary.kind;
      return [
        escapeHtml(label),
        escapeHtml(formatNumber(group.length)),
        compatiblePinned
          ? '<span class="badge layer">compatible pinned baseline</span>'
          : '<span class="badge warn">no compatible pinned baseline</span>',
        compatiblePinned
          ? "Deltas, percent deltas, and ratios are computed against the pinned artifact."
          : "Values are shown, but cross-schema deltas stay n/a to preserve artifact semantics.",
      ];
    });
    return `
      <section class="panel">
        <h3>Schema Compatibility</h3>
        ${simpleTable(
          [
            { label: "Group" },
            { label: "Selected", num: true },
            { label: "Pinned compatibility" },
            { label: "Treatment" },
          ],
          rows,
          "comparison-table"
        )}
      </section>
    `;
  }

  function renderGroupedAnalytics(artifacts, pinnedArtifact) {
    return groupArtifactsByKind(artifacts)
      .map(([label, group]) => {
        const compatiblePinned =
          pinnedArtifact && pinnedArtifact.summary.kind === group[0].summary.kind
            ? pinnedArtifact
            : null;
        const reference = compatiblePinned || group[0];
        const note = compatiblePinned
          ? `Deltas, percent deltas, and ratios use pinned reference: ${reference.summary.benchmark_name}.`
          : "Pinned reference is a different schema, so this group shows values without cross-schema deltas.";
        return `
          <section class="panel">
            <h3>${escapeHtml(label)} Analytics</h3>
            <div class="notes"><p>${escapeHtml(note)}</p></div>
            ${simpleTable(
              [
                { label: "Metric" },
                { label: "Artifact" },
                { label: "Value", num: true },
                { label: "Delta vs pinned", num: true },
                { label: "Percent vs pinned", num: true },
                { label: "Ratio vs pinned", num: true },
              ],
              analyticsRows(group, reference, Boolean(compatiblePinned)),
              "comparison-table"
            )}
          </section>
        `;
      })
      .join("");
  }

  function renderComparisonBrief(artifacts) {
    const publishedCount = artifacts.filter(
      (artifact) => artifact.summary.has_published_reference
    ).length;
    const calibrationCount = artifacts.filter(
      (artifact) => artifact.summary.has_calibration_fit
    ).length;
    const totalInterfaceBytes = artifacts.reduce(
      (total, artifact) =>
        total + Number(artifact.summary.memory_traffic_bytes || 0),
      0
    );
    const bestIntensity = bestArtifactForSpec(artifacts, {
      label: "Operational intensity",
      get: (summary) => summary.operational_intensity_ops_per_byte,
      format: formatOpsPerByte,
      direction: "higher",
    });
    const fastest = bestArtifactForSpec(artifacts, {
      label: "Latency",
      get: (summary) => summary.latency_ns,
      format: formatNs,
      direction: "lower",
    });
    return `
      <section class="panel">
        <h3>Comparison Brief</h3>
        <div class="metric-grid">
          ${metric("Published coverage", `${publishedCount}/${artifacts.length}`, "reference blocks")}
          ${metric("Calibration fits", `${calibrationCount}/${artifacts.length}`, "explicit fits")}
          ${metric("Total interface traffic", formatBytes(totalInterfaceBytes), "selected artifacts")}
          ${metric(
            "Best ops per byte",
            bestIntensity
              ? bestIntensity.summary.benchmark_name
              : "n/a",
            bestIntensity
              ? formatOpsPerByte(
                  bestIntensity.summary.operational_intensity_ops_per_byte
                )
              : ""
          )}
          ${metric(
            "Fastest selected",
            fastest ? fastest.summary.benchmark_name : "n/a",
            fastest ? formatNs(fastest.summary.latency_ns) : ""
          )}
        </div>
      </section>
    `;
  }

  function renderContentionInsight(artifacts) {
    const withAdjusted = artifacts.filter((artifact) =>
      Number.isFinite(Number(artifact.summary.contention_adjusted_latency_ns))
    );
    if (!withAdjusted.length) {
      return "";
    }
    const worstLatency = bestArtifactForSpec(withAdjusted, {
      label: "Contention-adjusted latency",
      get: (summary) => summary.contention_adjusted_latency_ns,
      format: formatNs,
      direction: "lower",
    });
    const bestThroughput = bestArtifactForSpec(withAdjusted, {
      label: "Contention-adjusted throughput",
      get: (summary) =>
        summary.contention_adjusted_throughput_equivalent_ops_per_second,
      format: formatThroughput,
      direction: "higher",
    });
    const highestClientCount = [...withAdjusted].sort(
      (left, right) =>
        Number(right.summary.shared_bandwidth_clients || 0) -
        Number(left.summary.shared_bandwidth_clients || 0)
    )[0];
    const highestGuardband = [...withAdjusted].sort(
      (left, right) =>
        Number(right.summary.calibration_overhead_fraction || 0) -
        Number(left.summary.calibration_overhead_fraction || 0)
    )[0];
    return `
      <section class="panel">
        <h3>Contention Insight</h3>
        <div class="metric-grid">
          ${metric(
            "Best adjusted throughput",
            bestThroughput ? bestThroughput.summary.benchmark_name : "n/a",
            bestThroughput
              ? formatThroughput(
                  bestThroughput.summary
                    .contention_adjusted_throughput_equivalent_ops_per_second
                )
              : ""
          )}
          ${metric(
            "Lowest adjusted latency",
            worstLatency ? worstLatency.summary.benchmark_name : "n/a",
            worstLatency
              ? formatNs(worstLatency.summary.contention_adjusted_latency_ns)
              : ""
          )}
          ${metric(
            "Most shared clients",
            highestClientCount ? highestClientCount.summary.benchmark_name : "n/a",
            highestClientCount
              ? formatNumber(highestClientCount.summary.shared_bandwidth_clients)
              : ""
          )}
          ${metric(
            "Largest guardband",
            highestGuardband ? highestGuardband.summary.benchmark_name : "n/a",
            highestGuardband
              ? formatPercent(highestGuardband.summary.calibration_overhead_fraction)
              : ""
          )}
        </div>
        <div class="notes"><p>Contention metrics are local shared-link assumptions: nominal tier bandwidth is reduced by client count and arbitration efficiency, then calibration/control guardband is applied to transfer timing.</p></div>
      </section>
    `;
  }

  function renderComparisonWorkspace(artifacts, pinnedArtifact, focus) {
    const visibleCount = filteredArtifacts().length;
    return `
      <section class="panel">
        <h3>Comparison Workspace</h3>
        <div class="metric-grid">
          ${metric("Analysis focus", focus.label, "local UI scoring lens")}
          ${metric("Selected artifacts", formatNumber(artifacts.length), "comparison set")}
          ${metric("Visible artifacts", formatNumber(visibleCount), "current rail filters")}
          ${metric(
            "Pinned reference",
            pinnedArtifact ? pinnedArtifact.summary.benchmark_name : "none",
            "same-schema deltas only"
          )}
          ${metric("List grouping", state.group, "rail organization")}
          ${metric("Filter state", filterSummaryLabel(), "active artifact slice")}
        </div>
        <div class="notes"><p>Workspace state affects dashboard recommendations and exports, but it does not change the generated JSON reports or their modeling boundaries.</p></div>
      </section>
    `;
  }

  function analyticsRows(group, reference, showDeltas) {
    const specs = comparisonMetricSpecs();
    return specs.flatMap((spec) =>
      group.map((artifact) => {
        const value = Number(spec.get(artifact.summary));
        const referenceValue = Number(spec.get(reference.summary));
        const isReference =
          showDeltas && artifact.summary.id === reference.summary.id;
        const best = bestArtifactForSpec(group, spec);
        const isBest =
          best &&
          artifact.summary.id === best.summary.id &&
          spec.direction !== "context";
        return [
          escapeHtml(spec.label),
          `${escapeHtml(artifact.summary.benchmark_name)}${
            isReference ? ' <span class="badge layer">reference</span>' : ""
          }${
            isBest
              ? ` <span class="badge good">${escapeHtml(bestBadge(spec))}</span>`
              : ""
          }`,
          escapeHtml(spec.format(value)),
          escapeHtml(showDeltas ? formatDelta(value, referenceValue, spec.format) : "n/a"),
          escapeHtml(showDeltas ? formatPercentDelta(value, referenceValue) : "n/a"),
          escapeHtml(showDeltas ? formatRatio(value, referenceValue) : "n/a"),
        ];
      })
    );
  }

  function bestArtifactForSpec(group, spec) {
    if (!["lower", "higher"].includes(spec.direction)) {
      return null;
    }
    const finiteArtifacts = group
      .map((artifact) => ({
        artifact,
        value: Number(spec.get(artifact.summary)),
      }))
      .filter((entry) => Number.isFinite(entry.value));
    if (!finiteArtifacts.length) {
      return null;
    }
    finiteArtifacts.sort((left, right) =>
      spec.direction === "lower"
        ? left.value - right.value
        : right.value - left.value
    );
    return finiteArtifacts[0].artifact;
  }

  function insightLabel(spec) {
    if (spec.direction === "lower") {
      return `Lowest ${spec.label.toLowerCase()}`;
    }
    if (spec.direction === "higher") {
      return `Highest ${spec.label.toLowerCase()}`;
    }
    return spec.label;
  }

  function bestBadge(spec) {
    return spec.direction === "higher" ? "highest" : "lowest";
  }

  function formatDelta(value, referenceValue, formatter) {
    if (!Number.isFinite(value) || !Number.isFinite(referenceValue)) {
      return "n/a";
    }
    const delta = value - referenceValue;
    const prefix = delta > 0 ? "+" : "";
    return `${prefix}${formatter(delta)}`;
  }

  function formatPercentDelta(value, referenceValue) {
    if (
      !Number.isFinite(value) ||
      !Number.isFinite(referenceValue) ||
      referenceValue === 0
    ) {
      return "n/a";
    }
    const percent = ((value - referenceValue) / Math.abs(referenceValue)) * 100;
    const prefix = percent > 0 ? "+" : "";
    return `${prefix}${formatNumber(percent)}%`;
  }

  function formatRatio(value, referenceValue) {
    if (
      !Number.isFinite(value) ||
      !Number.isFinite(referenceValue) ||
      referenceValue === 0
    ) {
      return "n/a";
    }
    return `${formatNumber(value / referenceValue)}x`;
  }

  function comparisonExport(artifacts, pinnedArtifact, boundaryNotes, focus) {
    return {
      schema_version: COMPARISON_EXPORT_SCHEMA,
      generated_at: new Date().toISOString(),
      reports_dir: state.data.reports_dir,
      pinned_id: pinnedArtifact ? pinnedArtifact.summary.id : null,
      selected_artifact_ids: artifacts.map((artifact) => artifact.summary.id),
      analysis_focus: {
        key: focus.key,
        label: focus.label,
        description: focus.description,
        metric_labels: focus.metricLabels,
        score_profile: activeScoreProfileSummary(focus),
        score_weights: activeScoreWeightSummary(focus),
      },
      filters: currentFilterState(),
      url_state: stateUrlString(true),
      visible_artifact_ids: filteredArtifacts().map((artifact) => artifact.summary.id),
      recommendations: comparisonRecommendations(artifacts, focus).map((entry) => ({
        group: entry.group,
        artifact_id: entry.artifact.summary.id,
        benchmark_name: entry.artifact.summary.benchmark_name,
        score: entry.score,
        best_use: entry.bestUse,
        score_explanation: entry.scoreExplanation,
      })),
      modeling_boundaries: state.data.modeling_boundaries || [],
      boundary_notes: boundaryNotes,
      artifacts: artifacts.map((artifact) => ({
        id: artifact.summary.id,
        kind: artifact.summary.kind,
        benchmark_name: artifact.summary.benchmark_name,
        source_path: artifact.summary.source_path,
        macs: artifact.summary.macs,
        equivalent_ops: artifact.summary.equivalent_ops,
        local_total_energy_pj: artifact.summary.total_energy_pj,
        local_energy_per_op_pj: artifact.summary.energy_per_op_pj,
        system_total_energy_pj: artifact.summary.system_total_energy_pj,
        system_energy_per_op_pj: artifact.summary.system_energy_per_op_pj,
        system_profile: artifact.summary.system_profile,
        system_profile_overrides: artifact.summary.system_profile_overrides || [],
        memory_timing_mode: artifact.summary.memory_timing_mode,
        effective_transfer_time_ns: artifact.summary.effective_transfer_time_ns,
        shared_bandwidth_clients: artifact.summary.shared_bandwidth_clients,
        bandwidth_arbitration_efficiency:
          artifact.summary.bandwidth_arbitration_efficiency,
        calibration_overhead_fraction:
          artifact.summary.calibration_overhead_fraction,
        movement_energy_pj: artifact.summary.movement_energy_pj,
        movement_energy_share: artifact.summary.movement_energy_share,
        latency_label: artifact.summary.latency_label,
        latency_ns: artifact.summary.latency_ns,
        throughput_equivalent_ops_per_second:
          artifact.summary.throughput_equivalent_ops_per_second,
        bandwidth_limited_latency_ns: artifact.summary.bandwidth_limited_latency_ns,
        bandwidth_limited_throughput_equivalent_ops_per_second:
          artifact.summary.bandwidth_limited_throughput_equivalent_ops_per_second,
        contention_adjusted_latency_ns:
          artifact.summary.contention_adjusted_latency_ns,
        contention_adjusted_throughput_equivalent_ops_per_second:
          artifact.summary
            .contention_adjusted_throughput_equivalent_ops_per_second,
        memory_traffic_bytes: artifact.summary.memory_traffic_bytes,
        operational_intensity_ops_per_byte:
          artifact.summary.operational_intensity_ops_per_byte,
        provenance_status: artifact.summary.provenance_status,
        has_published_reference: artifact.summary.has_published_reference,
        source_quality_grade: artifact.summary.source_quality_grade,
        source_surrogate_type: artifact.summary.source_surrogate_type,
        has_calibration_fit: artifact.summary.has_calibration_fit,
        boundary_tags: artifact.summary.boundary_tags || [],
      })),
      grouped_metrics: groupArtifactsByKind(artifacts).map(([label, group]) => ({
        group: label,
        artifacts: group.map((artifact) => artifact.summary.id),
        decision_scorecard: group
          .map((artifact) => ({
            artifact_id: artifact.summary.id,
            score_explanation: decisionScoreExplanation(
              artifact,
              group,
              specsForFocus(focus).filter((spec) =>
                ["lower", "higher"].includes(spec.direction)
              )
            ),
            best_use: bestUseLabel(
              artifact.summary,
              group,
              specsForFocus(focus)
            ),
          }))
          .map((entry) => ({
            ...entry,
            score: entry.score_explanation.score,
          }))
          .sort((left, right) => right.score - left.score),
        best: comparisonMetricSpecs()
          .filter((spec) => ["lower", "higher"].includes(spec.direction))
          .map((spec) => {
            const best = bestArtifactForSpec(group, spec);
            return {
              metric: spec.label,
              direction: spec.direction,
              artifact_id: best ? best.summary.id : null,
              value: best ? spec.get(best.summary) : null,
            };
          }),
      })),
    };
  }

  function comparisonMarkdown(artifacts, pinnedArtifact, boundaryNotes, focus) {
    const rows = artifacts
      .map((artifact) => {
        const summary = artifact.summary;
        return [
          summary.benchmark_name,
          kindLabel(summary.kind),
          summary.source_path,
          formatPj(summary.energy_per_op_pj),
          formatPj(summary.system_energy_per_op_pj),
          summary.system_profile || "n/a",
          formatProfileOverrides(summary.system_profile_overrides),
          summary.memory_timing_mode || "n/a",
          formatNs(summary.effective_transfer_time_ns),
          formatNumber(summary.shared_bandwidth_clients),
          formatPercent(summary.bandwidth_arbitration_efficiency),
          formatPercent(summary.calibration_overhead_fraction),
          formatNs(summary.latency_ns),
          formatThroughput(summary.throughput_equivalent_ops_per_second),
          formatThroughput(
            summary.bandwidth_limited_throughput_equivalent_ops_per_second
          ),
          formatNs(summary.contention_adjusted_latency_ns),
          formatThroughput(
            summary.contention_adjusted_throughput_equivalent_ops_per_second
          ),
          formatBytes(summary.memory_traffic_bytes),
          formatOpsPerByte(summary.operational_intensity_ops_per_byte),
          formatPercent(summary.movement_energy_share),
          summary.has_published_reference ? "yes" : "no",
          summary.source_quality_grade || "n/a",
          summary.source_surrogate_type || "n/a",
          summary.provenance_status,
        ];
      })
      .map((row) => `| ${row.map(markdownCell).join(" | ")} |`)
      .join("\n");
    const notes = boundaryNotes.map((note) => `- ${note}`).join("\n");
    const recommendations = comparisonRecommendations(artifacts, focus)
      .map(
        (entry) =>
          `- ${entry.group}: ${entry.artifact.summary.benchmark_name} (${formatNumber(entry.score)} focus score; ${entry.bestUse})`
      )
      .join("\n");
    const weightSummary = activeScoreWeightSummary(focus)
      .map((entry) => `${entry.metric}=${formatNumber(entry.weight)}`)
      .join(", ");
    return `# PhotonicBench Comparison Export

Pinned reference: ${
      pinnedArtifact ? pinnedArtifact.summary.benchmark_name : "none"
    }

Analysis focus: ${focus.label}

Focus description: ${focus.description}

Score profile: ${activeScoreProfileSummary(focus).label}

Score weights: ${weightSummary || "n/a"}

| Benchmark | Kind | Source | Local pJ/op | System pJ/op | System profile | Profile overrides | Memory timing | Effective transfer | Shared clients | Arbitration eff. | Calibration overhead | Latency | Throughput | BW-limited throughput | Contention latency | Contention throughput | Interface traffic | Eq ops/byte | Movement share | Published reference | Source grade | Surrogate type | Provenance |
| --- | --- | --- | ---: | ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
${rows}

## Recommendations

${recommendations || "- n/a"}

## Boundary Notes

${notes}
`;
  }

  function comparisonCsv(artifacts, focus, boundaryNotes) {
    const headers = [
      "analysis_focus",
      "score_profile",
      "score_weights",
      "artifact_id",
      "benchmark",
      "kind",
      "source",
      "local_pj_per_op",
      "system_pj_per_op",
      "latency_ns",
      "throughput_equivalent_ops_per_second",
      "bandwidth_limited_throughput_equivalent_ops_per_second",
      "contention_adjusted_latency_ns",
      "contention_adjusted_throughput_equivalent_ops_per_second",
      "interface_traffic_bytes",
      "operational_intensity_ops_per_byte",
      "movement_share",
      "published_reference",
      "source_grade",
      "surrogate_type",
      "system_profile",
      "memory_timing_mode",
      "boundary_tags",
      "comparison_boundary_notes",
      "provenance",
    ];
    const rows = artifacts.map((artifact) => {
      const summary = artifact.summary;
      return [
        focus.key,
        activeScoreProfileSummary(focus).label,
        activeScoreWeightSummary(focus)
          .map((entry) => `${entry.metric}=${entry.weight}`)
          .join("; "),
        summary.id,
        summary.benchmark_name,
        kindLabel(summary.kind),
        summary.source_path,
        summary.energy_per_op_pj,
        summary.system_energy_per_op_pj,
        summary.latency_ns,
        summary.throughput_equivalent_ops_per_second,
        summary.bandwidth_limited_throughput_equivalent_ops_per_second,
        summary.contention_adjusted_latency_ns,
        summary.contention_adjusted_throughput_equivalent_ops_per_second,
        summary.memory_traffic_bytes,
        summary.operational_intensity_ops_per_byte,
        summary.movement_energy_share,
        summary.has_published_reference ? "yes" : "no",
        summary.source_quality_grade || "",
        summary.source_surrogate_type || "",
        summary.system_profile || "",
        summary.memory_timing_mode || "",
        (summary.boundary_tags || []).join("; "),
        boundaryNotes.join(" | "),
        summary.provenance_status || "",
      ];
    });
    return [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n") + "\n";
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }

  function markdownCell(value) {
    return String(value ?? "n/a").replaceAll("|", "\\|").replaceAll("\n", " ");
  }

  function downloadText(filename, text, mimeType) {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function comparisonFilename(extension) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `photonic-bench-comparison-${stamp}.${extension}`;
  }

  function renderComparison() {
    const detail = document.getElementById("detail");
    const artifacts = selectedArtifacts();

    if (!artifacts.length) {
      detail.innerHTML =
        '<div class="empty">Select artifacts with the Compare checkboxes to build a side-by-side view.</div>';
      return;
    }

    const pinnedArtifact = ensurePinnedReference(artifacts);
    const kinds = new Set(artifacts.map((artifact) => artifact.summary.kind));
    const hasTransformerAggregate = artifacts.some(
      (artifact) =>
        artifact.summary.kind === "transformer_layer" ||
        artifact.summary.kind === "transformer_model"
    );
    const hasPublished = artifacts.some(
      (artifact) => artifact.summary.has_published_reference
    );
    const focus = activeComparisonFocus();
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
      hasTransformerAggregate
        ? "Transformer layer/model aggregate latency remains serial timing, and aggregate noise remains non-additive diagnostic extrema."
        : "Per-matmul timing and noise are local model card fields.",
      hasPublished
        ? "Published references are present for at least one artifact and remain separate from local model estimates."
        : "Selected artifacts are local model summaries with no published_reference block.",
      "Interface traffic is derived from converter bit widths and reuse counts; it is not a full memory hierarchy simulation.",
      "System movement energy is a local SRAM/intermediate/off-chip tier estimate added separately from photonic core compute/conversion energy.",
      "Contention metrics are local shared-bandwidth and calibration/control guardband assumptions, not paper-reported hardware claims.",
    ];
    const exportObject = comparisonExport(
      artifacts,
      pinnedArtifact,
      boundaryNotes,
      focus
    );
    const exportMarkdown = comparisonMarkdown(
      artifacts,
      pinnedArtifact,
      boundaryNotes,
      focus
    );
    const exportCsv = comparisonCsv(artifacts, focus, boundaryNotes);
    const focusOptions = comparisonFocusOptions();

    detail.innerHTML = `
      <section class="header-panel">
        <div class="header-top">
          <div class="header-title">
            <div class="badge-row">
              <span class="badge mix">Comparison Mode</span>
              <span class="badge">${artifacts.length} selected</span>
              ${pinnedArtifact ? '<span class="badge layer">Pinned reference</span>' : ""}
              ${kinds.size > 1 ? '<span class="badge warn">mixed schema</span>' : ""}
            </div>
            <h2>Artifact Comparison</h2>
            <div class="description">Schema-aware side-by-side summary plus grouped insights, deltas, percent deltas, and ratio analysis across selected PhotonicBench JSON artifacts.</div>
            <div class="comparison-toolbar">
              <label>
                <span>Analysis focus</span>
                <select id="analysis-focus" aria-label="Comparison analysis focus">
                  ${Object.entries(focusOptions)
                    .map(
                      ([key, option]) =>
                        `<option value="${escapeHtml(key)}"${
                          key === state.analysisFocus ? " selected" : ""
                        }>${escapeHtml(option.label)}</option>`
                    )
                    .join("")}
                </select>
              </label>
              <div class="focus-description">${escapeHtml(focus.description)}</div>
            </div>
            ${renderScoreProfileGallery(artifacts, focus)}
            ${renderScoreWeightControls(focus)}
            ${
              pinnedArtifact
                ? `<div class="description"><strong>Reference:</strong> ${escapeHtml(pinnedArtifact.summary.benchmark_name)} (${escapeHtml(pinnedArtifact.summary.source_path)})</div>`
                : ""
            }
          </div>
          <div class="actions">
            <button class="action-button primary" type="button" data-action="download-json">Download JSON</button>
            <button class="action-button" type="button" data-action="download-markdown">Download Markdown</button>
            <button class="action-button" type="button" data-action="download-csv">Download CSV</button>
            <button class="action-button" type="button" data-action="copy-markdown">Copy Markdown</button>
            <button class="action-button" type="button" data-action="copy-link">Copy state link</button>
            <button class="action-button" type="button" data-action="clear-compare">Clear comparison</button>
          </div>
        </div>
      </section>
      ${renderComparisonWorkspace(artifacts, pinnedArtifact, focus)}
      ${renderSelectionDrawer(artifacts)}
      ${renderComparisonBrief(artifacts)}
      ${renderContentionInsight(artifacts)}
      ${renderComparisonRecommendations(artifacts, focus)}
      ${renderDecisionScorecard(artifacts, focus)}
      ${renderParetoChart(artifacts)}
      <section class="panel">
        <h3>Comparison Matrix</h3>
        ${simpleTable(headers, comparisonSummaryRows(artifacts, pinnedArtifact), "comparison-table")}
      </section>
      ${renderComparisonInsights(artifacts, pinnedArtifact, focus)}
      ${renderSchemaCompatibility(artifacts, pinnedArtifact)}
      <section class="panel">
        <h3>Grouped Same-Schema Analytics</h3>
        <div class="notes"><p>Compatible rows report value, absolute delta, percent delta, and ratio against the pinned reference. Mixed-schema groups keep incompatible deltas as n/a.</p></div>
      </section>
      ${renderGroupedAnalytics(artifacts, pinnedArtifact)}
      <section class="panel">
        <h3>Comparison Boundary Notes</h3>
        <div class="notes">${boundaryNotes
          .map((note) => `<p>${escapeHtml(note)}</p>`)
          .join("")}</div>
      </section>
      <section class="panel">
        <h3>Export Preview</h3>
        <textarea id="export-preview" class="export-preview" readonly>${escapeHtml(exportMarkdown)}</textarea>
      </section>
    `;

    const focusSelect = detail.querySelector("#analysis-focus");
    if (focusSelect) {
      focusSelect.addEventListener("change", (event) => {
        state.analysisFocus = event.target.value;
        render();
      });
    }

    detail.querySelectorAll("[data-score-weight]").forEach((input) => {
      input.addEventListener("change", () => {
        setScoreWeight(input.dataset.scoreWeight, input.value);
      });
    });

    const resetWeights = detail.querySelector("[data-action='reset-score-weights']");
    if (resetWeights) {
      resetWeights.addEventListener("click", () => resetFocusWeights(focus));
    }

    detail.querySelectorAll("[data-score-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        applyScoreProfile(button.dataset.scoreProfile);
      });
    });

    detail.querySelectorAll("[data-remove-selection]").forEach((button) => {
      button.addEventListener("click", () => {
        removeComparisonArtifact(button.dataset.removeSelection);
      });
    });

    detail.querySelectorAll("[data-clear-selection-group]").forEach((button) => {
      button.addEventListener("click", () => {
        clearSelectionGroup(button.dataset.clearSelectionGroup);
      });
    });

    const compareTopVisibleButton = detail.querySelector(
      "[data-action='compare-top-visible']"
    );
    if (compareTopVisibleButton) {
      compareTopVisibleButton.addEventListener("click", () => {
        compareTopVisible(detail.querySelector("#top-visible-count").value);
      });
    }

    const invertVisible = detail.querySelector("[data-action='invert-visible']");
    if (invertVisible) {
      invertVisible.addEventListener("click", () => invertVisibleSelection());
    }

    const paretoMode = detail.querySelector("#pareto-mode");
    if (paretoMode) {
      paretoMode.addEventListener("change", (event) => {
        state.paretoMode = event.target.value;
        render();
      });
    }

    detail.querySelector("[data-action='download-json']").addEventListener(
      "click",
      () => {
        downloadText(
          comparisonFilename("json"),
          `${JSON.stringify(exportObject, null, 2)}\n`,
          "application/json"
        );
      }
    );

    detail.querySelector("[data-action='download-markdown']").addEventListener(
      "click",
      () => {
        downloadText(
          comparisonFilename("md"),
          exportMarkdown,
          "text/markdown"
        );
      }
    );

    detail.querySelector("[data-action='download-csv']").addEventListener(
      "click",
      () => {
        downloadText(comparisonFilename("csv"), exportCsv, "text/csv");
      }
    );

    detail.querySelector("[data-action='copy-markdown']").addEventListener(
      "click",
      () => {
        const preview = detail.querySelector("#export-preview");
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(exportMarkdown).catch(() => {
            preview.focus();
            preview.select();
          });
        } else {
          preview.focus();
          preview.select();
        }
      }
    );

    detail.querySelector("[data-action='copy-link']").addEventListener(
      "click",
      () => {
        copyShareableLink();
      }
    );

    detail.querySelector("[data-action='clear-compare']").addEventListener(
      "click",
      () => {
        state.compareIds.clear();
        state.pinnedId = null;
        state.view = "detail";
        render();
      }
    );
  }

  function renderModeTabs() {
    const detailMode = document.getElementById("detail-mode");
    const compareMode = document.getElementById("compare-mode");
    detailMode.classList.toggle("active", state.view === "detail");
    compareMode.classList.toggle("active", state.view === "compare");
    detailMode.setAttribute("aria-pressed", state.view === "detail" ? "true" : "false");
    compareMode.setAttribute(
      "aria-pressed",
      state.view === "compare" ? "true" : "false"
    );
    document.getElementById("compare-count").textContent = state.compareIds.size;
  }

  function render() {
    syncStaticControls();
    if (!byId.has(state.selectedId)) {
      const first = filteredArtifacts()[0];
      state.selectedId = first ? first.summary.id : null;
    }
    ensurePinnedReference();
    renderModeTabs();
    renderPresetControls();
    renderExternalControls();
    renderList();
    renderIssues();
    if (state.view === "compare") {
      renderComparison();
    } else {
      renderDetail();
    }
    scheduleUrlStateUpdate();
  }

  render();
})();
