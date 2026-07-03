# Codex Science

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Codex Plugin](https://img.shields.io/badge/Codex-plugin-10A37F.svg)](plugins/codex-science)
[![Life Sciences](https://img.shields.io/badge/domain-life%20sciences-166534.svg)](plugins/codex-science/skills)
[![Skills](https://img.shields.io/badge/skills-7-informational.svg)](plugins/codex-science/skills)
[![Audited Workflows](https://img.shields.io/badge/audited%20workflows-34-7C3AED.svg)](workflow-catalog/claude-science-workflows.json)

**English** | [中文](README.zh-CN.md)

Codex Science is a Codex-native science workflow pack inspired by Claude Science. It combines portable life-sciences skills, a front-door orchestration skill, a workflow catalog from a local Claude Science audit, and an MCP catalog for optional scientific services.

The project now covers both layers of Claude Science:

- directly portable skills from `anthropics/life-sciences`
- documented workflow parity for literature review, PDF exploration, paper narrative, figure composition, indication dossiers, biomodels, remote compute, endpoints, and state/provenance

## Contents

- [Quickstart](#quickstart)
- [What This Is](#what-this-is)
- [Skill Index](#skill-index)
- [Desktop App](#desktop-app)
- [Claude Science Workflow Parity](#claude-science-workflow-parity)
- [Catalogs](#catalogs)
- [Repository Layout](#repository-layout)
- [Documentation](#documentation)
- [Development](#development)
- [Contributor](#contributor)
- [License](#license)

## Quickstart

Install this repository as a local Codex plugin:

```bash
./scripts/install.sh
```

Or install manually:

```bash
codex plugin marketplace add /path/to/codex-science
codex plugin marketplace upgrade
codex plugin add codex-science@codex-science
```

Restart Codex or open a new thread after installation so the skills are visible in the next session.

## Desktop App

Codex Science also ships a desktop workbench for macOS and Windows. It is built with Electron and React, with provider profiles for OpenAI, DeepSeek, and custom OpenAI-compatible chat APIs.

The app is designed for AI-assisted scientific work rather than as a generic chatbot:

- workflow routing for evidence review, PDFs, manuscripts, clinical protocols, dossiers, single-cell, omics, biomodels, compute, instruments, and strategy
- local provider profile storage through Electron safeStorage when available
- configurable base URL, chat path, and model ID for changing provider catalogs
- research guardrails for evidence, local data, compute assumptions, and citation integrity

Build locally:

```bash
cd desktop
npm install
npm run typecheck
npm run build
```

Release packaging is handled by [`.github/workflows/desktop-release.yml`](.github/workflows/desktop-release.yml), which builds macOS and Windows installers from `desktop-v*` tags.

## What This Is

Codex Science is not a single monolithic assistant. It is a small framework with four layers:

1. **Orchestration skill** - `codex-science` classifies the request and routes to the right workflow.
2. **Portable science skills** - domain workflows for research strategy, clinical protocols, single-cell QC, scVI modeling, nf-core pipelines, and instrument data conversion.
3. **Workflow parity references** - Codex-native runbooks distilled from a local Claude Science audit.
4. **Catalogs** - optional MCP connectors and audited Claude Science workflow categories.

The design follows curated skill collection conventions: quick install, clear categories, short skill descriptions, and direct links to the files that matter.

## Skill Index

| Skill | Use it for | Path |
|---|---|---|
| `codex-science` | Front-door routing for research strategy, evidence synthesis, document/PDF work, clinical work, omics analysis, biomodel planning, and Claude Science-like workflows in Codex. | [`plugins/codex-science/skills/codex-science`](plugins/codex-science/skills/codex-science) |
| `scientific-problem-selection` | Project ideation, stuck-project troubleshooting, research-risk assessment, and strategic scientific decisions. | [`plugins/codex-science/skills/scientific-problem-selection`](plugins/codex-science/skills/scientific-problem-selection) |
| `clinical-trial-protocol-skill` | Device or drug clinical trial protocol drafting with modular regulatory sections. | [`plugins/codex-science/skills/clinical-trial-protocol-skill`](plugins/codex-science/skills/clinical-trial-protocol-skill) |
| `single-cell-rna-qc` | scRNA-seq QC on `.h5ad` or 10x `.h5` files using scverse-style metrics, MAD filtering, and visualizations. | [`plugins/codex-science/skills/single-cell-rna-qc`](plugins/codex-science/skills/single-cell-rna-qc) |
| `scvi-tools` | Deep generative single-cell workflows: scVI, scANVI, totalVI, PeakVI, MultiVI, DestVI, veloVI, and scArches. | [`plugins/codex-science/skills/scvi-tools`](plugins/codex-science/skills/scvi-tools) |
| `nextflow-development` | nf-core `rnaseq`, `sarek`, and `atacseq` workflows for local FASTQs or public GEO/SRA data. | [`plugins/codex-science/skills/nextflow-development`](plugins/codex-science/skills/nextflow-development) |
| `instrument-data-to-allotrope` | Convert lab instrument outputs into Allotrope Simple Model JSON or flattened CSV for LIMS, ELN, and data lakes. | [`plugins/codex-science/skills/instrument-data-to-allotrope`](plugins/codex-science/skills/instrument-data-to-allotrope) |

## Claude Science Workflow Parity

The local Claude Science folder audited for this project contains 34 skills and a full runtime: conda environments, a state database, artifacts, workspaces, tool results, remote-compute patterns, managed endpoints, and a local model shim. Credential stores and encryption keys were intentionally excluded.

Codex Science now captures the portable workflow logic:

| Area | Claude Science pattern | Codex Science route |
|---|---|---|
| Literature | retrieve, verify DOI, expand citations, check retractions, synthesize by claim | [`literature-evidence.md`](plugins/codex-science/skills/codex-science/references/literature-evidence.md) |
| PDFs and documents | parse once, page-map, scan/extract, crop figures | [`literature-document-figure.md`](plugins/codex-science/skills/codex-science/references/literature-document-figure.md) |
| Figures and papers | figure style, panel composition, paper narrative review | [`literature-document-figure.md`](plugins/codex-science/skills/codex-science/references/literature-document-figure.md) |
| Indication dossiers | patient-population framing and waypoint phases | [`clinical-regulatory.md`](plugins/codex-science/skills/codex-science/references/clinical-regulatory.md) |
| Biomodels | AlphaFold2, Boltz, Chai-1, OpenFold3, DiffDock, MPNN, Borzoi, Evo 2, ESM, scGPT | [`compute-and-biomodels.md`](plugins/codex-science/skills/codex-science/references/compute-and-biomodels.md) |
| Remote compute | SSH/Slurm/Modal submit, wait, harvest, record | [`compute-and-biomodels.md`](plugins/codex-science/skills/codex-science/references/compute-and-biomodels.md) |
| Runtime state | database-backed sessions, artifacts, logs, compute records | [`state-artifact-model.md`](plugins/codex-science/skills/codex-science/references/state-artifact-model.md) |

## Catalogs

- [`workflow-catalog/claude-science-workflows.json`](workflow-catalog/claude-science-workflows.json) records the 34 audited Claude Science skills, their categories, portability status, and runtime dependencies.
- [`mcp-catalog/life-sciences-mcp.json`](mcp-catalog/life-sciences-mcp.json) records optional scientific MCP connectors such as PubMed, ClinicalTrials.gov, ChEMBL, Open Targets, BioRender, Synapse, Consensus, and 10x Genomics.

The catalogs are descriptive. They do not bundle third-party services, store credentials, or assume paid services are available.

## Repository Layout

```text
codex-science/
  .agents/plugins/marketplace.json
  docs/
    claude-science-workflow.md
    codex-science-design.md
  desktop/
    src/
    DESIGN_SYSTEM.md
    RELEASE_NOTES.md
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

## Documentation

- [`docs/claude-science-workflow.md`](docs/claude-science-workflow.md) audits the local Claude Science workflow and portability boundaries.
- [`docs/codex-science-design.md`](docs/codex-science-design.md) describes the Codex-native package shape, routing model, external connector policy, state model, and output standards.
- [`NOTICE.md`](NOTICE.md) records vendored skill provenance and third-party connector boundaries.

## Development

Validate plugin metadata, skill frontmatter, and JSON files:

```bash
./scripts/validate.sh
```

The validator expects the Codex skill validator at `~/.codex/skills/.system/skill-creator/scripts/quick_validate.py` and a Python interpreter with `PyYAML`.

## Contributor

- [`jialeyang0104`](https://github.com/jialeyang0104)

## License

This repository uses [Apache-2.0](LICENSE). Vendored skills from `anthropics/life-sciences` retain their original `LICENSE.txt` files in each skill directory.
