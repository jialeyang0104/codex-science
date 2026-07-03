# Codex Science

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Codex Plugin](https://img.shields.io/badge/Codex-plugin-10A37F.svg)](plugins/codex-science)
[![Life Sciences](https://img.shields.io/badge/domain-life%20sciences-166534.svg)](plugins/codex-science/skills)
[![Skills](https://img.shields.io/badge/skills-7-informational.svg)](plugins/codex-science/skills)

**English** | [中文](README.zh-CN.md)

Codex Science is a Codex-native life-sciences workflow pack inspired by the Claude Science pattern: skills for repeatable scientific work, a routing layer for choosing the right workflow, and an MCP catalog for external scientific services.

It packages portable life-sciences skills from `anthropics/life-sciences` with a Codex orchestration skill, local install scripts, workflow documentation, and a connector index for services such as PubMed, ClinicalTrials.gov, ChEMBL, Open Targets, BioRender, Synapse, Consensus, 10x Genomics, and more.

## Contents

- [Quickstart](#quickstart)
- [What This Is](#what-this-is)
- [Skill Index](#skill-index)
- [MCP Connector Catalog](#mcp-connector-catalog)
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

## What This Is

Codex Science is not a single monolithic assistant. It is a small framework with three layers:

1. **Orchestration skill** - `codex-science` classifies the request and routes to the right workflow.
2. **Portable science skills** - domain workflows for research strategy, clinical protocols, single-cell QC, scVI modeling, nf-core pipelines, and instrument data conversion.
3. **MCP catalog** - a documented list of external services that can extend the workflow when credentials and connectors are configured.

The design follows the same practical shape as curated skill collections: quick install, clear categories, short skill descriptions, and direct links to the files that matter.

## Skill Index

| Skill | Use it for | Path |
|---|---|---|
| `codex-science` | Front-door routing for research strategy, evidence synthesis, clinical work, omics analysis, and Claude Science-like workflows in Codex. | [`plugins/codex-science/skills/codex-science`](plugins/codex-science/skills/codex-science) |
| `scientific-problem-selection` | Project ideation, stuck-project troubleshooting, research-risk assessment, and strategic scientific decisions. | [`plugins/codex-science/skills/scientific-problem-selection`](plugins/codex-science/skills/scientific-problem-selection) |
| `clinical-trial-protocol-skill` | Device or drug clinical trial protocol drafting with modular regulatory sections. | [`plugins/codex-science/skills/clinical-trial-protocol-skill`](plugins/codex-science/skills/clinical-trial-protocol-skill) |
| `single-cell-rna-qc` | scRNA-seq QC on `.h5ad` or 10x `.h5` files using scverse-style metrics, MAD filtering, and visualizations. | [`plugins/codex-science/skills/single-cell-rna-qc`](plugins/codex-science/skills/single-cell-rna-qc) |
| `scvi-tools` | Deep generative single-cell workflows: scVI, scANVI, totalVI, PeakVI, MultiVI, DestVI, veloVI, and scArches. | [`plugins/codex-science/skills/scvi-tools`](plugins/codex-science/skills/scvi-tools) |
| `nextflow-development` | nf-core `rnaseq`, `sarek`, and `atacseq` workflows for local FASTQs or public GEO/SRA data. | [`plugins/codex-science/skills/nextflow-development`](plugins/codex-science/skills/nextflow-development) |
| `instrument-data-to-allotrope` | Convert lab instrument outputs into Allotrope Simple Model JSON or flattened CSV for LIMS, ELN, and data lakes. | [`plugins/codex-science/skills/instrument-data-to-allotrope`](plugins/codex-science/skills/instrument-data-to-allotrope) |

## MCP Connector Catalog

The original Claude Science marketplace includes scientific MCP connectors for literature search, clinical registries, compound databases, target discovery, research data platforms, scientific illustration, and commercial intelligence services.

Codex Science records those connectors in [`mcp-catalog/life-sciences-mcp.json`](mcp-catalog/life-sciences-mcp.json). The catalog is intentionally descriptive: it does not bundle third-party MCP servers, store credentials, or assume paid services are available.

| Area | Example connectors |
|---|---|
| Literature and evidence | PubMed, bioRxiv/medRxiv, Wiley Scholar Gateway, Consensus |
| Clinical and regulatory | ClinicalTrials.gov, Medidata, Cortellis, AdisInsight |
| Drug discovery | ChEMBL, Open Targets, ToolUniverse, Owkin |
| Data and figures | Synapse, BioRender, 10x Genomics |

## Repository Layout

```text
codex-science/
  .agents/plugins/marketplace.json
  docs/
    claude-science-workflow.md
    codex-science-design.md
  mcp-catalog/
    life-sciences-mcp.json
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

- [`docs/claude-science-workflow.md`](docs/claude-science-workflow.md) audits the Claude Science / `life-sciences` workflow, skill layer, MCP layer, and replication principles.
- [`docs/codex-science-design.md`](docs/codex-science-design.md) describes the Codex-native package shape, routing model, external connector policy, and output standards.
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
