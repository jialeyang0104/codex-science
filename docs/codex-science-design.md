# Codex Science Design

## Goal

Recreate the practical Claude Science workflow inside Codex while taking advantage of Codex strengths:

- Direct filesystem access.
- Local command execution.
- Python/R/SQL workflows.
- Local data inspection.
- Codex skills and plugins.
- Optional MCP connectors when configured.

## Package Shape

Codex Science is a Codex plugin with multiple skills:

```text
codex-science/
  .agents/plugins/marketplace.json
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
```

## Orchestration Skill

`codex-science` is the front door. It should trigger when the user asks for:

- Research problem selection.
- Literature review or evidence synthesis.
- Paper reading or manuscript writing.
- Clinical study design or trial protocol drafting.
- OMIX, single-cell, proteomics, transcriptomics, or sequencing analysis.
- Nextflow/nf-core execution.
- Instrument data standardization.
- A Claude Science-like workflow in Codex.

The orchestrator does not replace specialist skills. It selects and sequences them.

## Routing

| User intent | Primary route | Optional route |
|---|---|---|
| New research idea | `scientific-problem-selection` | literature skills, local notes |
| Stuck project | `scientific-problem-selection` | statistics, data inspection |
| Literature search | local papers, web/PubMed if available | Zotero, citation skills |
| Paper writing | academic-paper, academic-pipeline | reviewer skills |
| Clinical protocol | `clinical-trial-protocol-skill` | trial registry connectors |
| scRNA-seq QC | `single-cell-rna-qc` | scanpy, local Python |
| scVI modeling | `scvi-tools` | GPU/env checks |
| nf-core pipeline | `nextflow-development` | Docker/Nextflow checks |
| Instrument data | `instrument-data-to-allotrope` | local parser scripts |

## External MCP Policy

Do not assume external MCP services are available. Before using a connector:

1. Check whether a matching MCP tool is installed.
2. Check whether the user has configured credentials.
3. Prefer local files and existing Codex skills if the connector is unavailable.
4. Explain the missing connector only when it materially blocks the task.

## Output Standards

Scientific outputs should be:

- Explicit about assumptions and evidence level.
- Clear about whether claims come from sources, local data, or inference.
- Reproducible when data processing is involved.
- Conservative with clinical and regulatory claims.
- Paired with runnable scripts or commands when execution is requested.

