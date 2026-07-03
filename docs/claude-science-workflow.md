# Claude Science Workflow Audit

Source inspected: `anthropics/life-sciences`, installed locally as the `life-sciences` marketplace.

## High-Level Model

Claude Science is not one single skill. It is a marketplace framework with two layers:

1. MCP connectors to external scientific services.
2. Skills that encode repeatable scientific workflows.

The intended user experience is:

1. Add the `life-sciences` marketplace.
2. Install MCP servers for external knowledge and scientific services.
3. Install skills for procedural workflows.
4. Configure credentials for MCP servers that require accounts.
5. Restart Claude Code so the skills and tools are available.

## Skill Layer

| Skill | Purpose | Codex portability |
|---|---|---|
| `scientific-problem-selection` | Project ideation, stuck-project troubleshooting, research strategy, risk assessment | Directly portable |
| `clinical-trial-protocol-skill` | FDA/NIH-style protocol generation for device or drug studies | Directly portable |
| `single-cell-rna-qc` | scRNA-seq QC with scverse, MAD filtering, plots | Directly portable |
| `scvi-tools` | scVI/scANVI/totalVI/PeakVI/MultiVI workflows | Directly portable |
| `nextflow-development` | nf-core rnaseq/sarek/atacseq execution and samplesheet generation | Directly portable |
| `instrument-data-to-allotrope` | Convert instrument files to ASM JSON/flat CSV | Directly portable |

The first skill acts as a science-strategy front door. The other five are execution-oriented domain skills.

## MCP Connector Layer

| Connector | Function | Auth |
|---|---|---|
| PubMed | Biomedical literature search | None in the Claude marketplace |
| bioRxiv/medRxiv | Preprint access | Provider-dependent |
| ClinicalTrials.gov | Trial registry access | Provider-dependent |
| ChEMBL | Bioactivity and drug-like molecules | Provider-dependent |
| Open Targets | Target-disease prioritization | Provider-dependent |
| BioRender | Scientific illustrations | BioRender account |
| Synapse | Research data management | Synapse account |
| Wiley Scholar Gateway | Academic publication access | Scholar Gateway account |
| Consensus | Peer-reviewed literature search and synthesis | Consensus account |
| 10x Genomics | 10x Cloud data and workflows | 10x account and token |
| ToolUniverse | Scientific tool-use agent platform | MCPB package |
| Owkin | Biology AI agents and histopathology analysis | Owkin service access |
| Medidata | Clinical platform help and predictive site ranking | Medidata access |
| Cortellis | Regulatory intelligence | Clarivate subscription |
| AdisInsight | Drug development and trial intelligence | Springer Nature subscription |

## Workflow Patterns

Claude Science routes tasks by intent:

- Strategy request: use `scientific-problem-selection`.
- Protocol request: use `clinical-trial-protocol-skill`, optionally with ClinicalTrials.gov, PubMed, Cortellis, and AdisInsight.
- Literature request: use PubMed, bioRxiv, Wiley, Consensus, then synthesize.
- Single-cell QC request: use `single-cell-rna-qc`, then optionally `scvi-tools`.
- Sequencing pipeline request: use `nextflow-development`.
- Instrument standardization request: use `instrument-data-to-allotrope`.
- External platform request: delegate to the relevant MCP connector only after credentials are configured.

## Key Replication Principles

For Codex, the clean replication is not to pretend all remote MCP services are already available. The safer pattern is:

- Package portable skills directly.
- Add a Codex-native orchestration skill.
- Record MCP connectors and authentication requirements.
- Route to existing Codex tools, local files, and installed MCP servers when present.
- Ask for credentials only at the moment an external service is actually needed.

