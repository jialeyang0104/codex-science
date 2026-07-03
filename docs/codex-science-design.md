# Codex Science Design

## Goal

Recreate the practical Claude Science workflow inside Codex while keeping the package safe, portable, and testable.

Codex strengths:

- Direct filesystem access.
- Local command execution.
- Python/R/SQL workflows through local tooling.
- Code editing, validation, and git workflows.
- Codex skills and plugins.
- Optional MCP/app connectors when configured.

Claude Science strengths to preserve:

- Progressive skill routing.
- Retrieval-first scientific evidence.
- Parse-once document workflows.
- Publication-grade figure checks.
- Resumable waypoint files for long reports.
- Declarative compute environment records.
- Credential-aware external services.

## Package Shape

```text
codex-science/
  .agents/plugins/marketplace.json
  docs/
    claude-science-workflow.md
    codex-science-design.md
  mcp-catalog/
    life-sciences-mcp.json
  workflow-catalog/
    claude-science-workflows.json
  plugins/codex-science/
    .codex-plugin/plugin.json
    skills/
      codex-science/
      scientific-problem-selection/
      clinical-trial-protocol-skill/
      single-cell-rna-qc/
      scvi-tools/
      nextflow-development/
      instrument-data-to-allotrope/
  scripts/
    install.sh
    validate.sh
```

## Orchestration Skill

`codex-science` is the front door. It should trigger when the user asks for:

- Claude Science parity or migration.
- Research problem selection.
- Literature review, evidence synthesis, and citation support.
- PDF, report, figure, or manuscript analysis.
- Paper narrative, response letters, and publication figure work.
- Indication dossiers or clinical landscapes.
- Clinical study design or trial protocol drafting.
- OMIX, single-cell, proteomics, transcriptomics, or sequencing analysis.
- Protein structure prediction, inverse folding, docking, genomic foundation models, or scGPT-style workflows.
- Nextflow/nf-core execution.
- Instrument data standardization.

The orchestrator does not replace specialist skills. It selects and sequences them, then points to references only when needed.

## Routing

| User intent | Primary route | Optional route |
|---|---|---|
| New research idea | `scientific-problem-selection` | literature evidence, local notes |
| Stuck project | `scientific-problem-selection` | statistics, data inspection |
| Literature search | `literature-evidence.md` | PubMed/web/MCP, local PDFs, Zotero |
| Long PDF/report | `literature-document-figure.md` | page extraction, OCR, figure crops |
| Paper writing or response | installed academic writing/reviewer skills | `literature-document-figure.md` |
| Paper figure arc | `literature-document-figure.md` | local plotting scripts |
| Indication dossier | `clinical-regulatory.md`, `literature-document-figure.md` | PubMed, ClinicalTrials.gov, FDA/EMA |
| Clinical protocol | `clinical-trial-protocol-skill` | trial registry connectors |
| scRNA-seq QC | `single-cell-rna-qc` | scanpy, local Python |
| scVI modeling | `scvi-tools` | GPU/env checks |
| Biomodel inference | `compute-and-biomodels.md` | local GPU, remote compute, endpoints |
| nf-core pipeline | `nextflow-development` | Docker/Nextflow checks |
| Instrument data | `instrument-data-to-allotrope` | local parser scripts |
| Claude Science runtime audit | `claude-science-runtime.md`, `state-artifact-model.md` | local filesystem inspection |

## What Is Ported Directly

The directly portable layer is the set of skills from `anthropics/life-sciences` that do not require Claude Science runtime APIs:

- `scientific-problem-selection`
- `clinical-trial-protocol-skill`
- `single-cell-rna-qc`
- `scvi-tools`
- `nextflow-development`
- `instrument-data-to-allotrope`

These skills remain in `plugins/codex-science/skills/` with their own scripts, references, and licenses.

## What Is Documented Instead Of Vendored

The local Claude Science folder contains skills whose instructions depend on runtime-only APIs such as `host.query`, `host.compute`, `host.delegate`, `host.llm`, `host.view_image`, `compute_provider`, or managed endpoint lifecycle tools. Copying those verbatim into Codex would make them trigger on tools that may not exist.

Codex Science instead documents their portable workflow logic:

- `literature-review`: retrieval-first synthesis and DOI/retraction checks.
- `pdf-explore`: parse once, page-map, extract, and crop figures.
- `figure-style`: data/label/axis/color correctness and render-then-verify.
- `figure-composer`: claim to panel outline to composite review loop.
- `paper-narrative`: figure-deck arc and panel move/missing/kill decisions.
- `indication-dossier`: patient-population framing and waypoint phases.
- `compute-env-setup`: declarative environment specs and validation tiers.
- `remote-compute-*`: submit, wait, harvest, and record provider facts.
- `managed-model-endpoints`: lifecycle-managed HTTP model services.
- Biomodel skills: routing catalog, licensing/data-movement warnings, and compute needs.

## External MCP Policy

Do not assume external MCP services are available. Before using a connector:

1. Check whether a matching MCP tool is installed.
2. Check whether credentials are configured.
3. Prefer local files, public APIs, or web search when appropriate.
4. Explain missing connectors only when they materially block the task.
5. Avoid sending sensitive sequences, clinical data, or private files to external services without explicit user approval.

## State And Provenance

Claude Science has a metadata database. Codex Science should use explicit project files:

- `waypoints/progress.json` for phase status.
- One JSON waypoint per phase.
- Markdown summaries for human review.
- `logs/` for command outputs.
- `scripts/` for deterministic reruns.
- `results/` for final outputs.

This makes long scientific work auditable without relying on hidden local state.

## Output Standards

Scientific outputs should be:

- Explicit about assumptions and evidence level.
- Clear about whether claims come from sources, local data, or inference.
- Reproducible when data processing is involved.
- Conservative with clinical and regulatory claims.
- Paired with runnable scripts or commands when execution is requested.
- Verified after generation, especially for JSON, figures, citations, and computed tables.
