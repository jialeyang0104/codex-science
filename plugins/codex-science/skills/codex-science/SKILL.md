---
name: codex-science
description: Codex-native science workflow orchestrator for research strategy, literature synthesis, manuscript work, clinical trial protocols, single-cell and omics analysis, Nextflow pipelines, scvi-tools modeling, instrument data standardization, and Claude Science-like workflows in Codex. Use when users ask for Codex Science, Claude Science replication, biomedical research planning, evidence synthesis, study design, or life-sciences analysis.
metadata:
  source: codex-science
  version: 0.1.0
---

# Codex Science

Use this skill as the front door for science work. Route to specialist skills and tools instead of doing everything in this file.

## Operating Rules

1. Classify the task before acting: strategy, evidence, writing, clinical/regulatory, omics/data, workflow execution, or instrument standardization.
2. Prefer local evidence first when the user provides files, datasets, notes, or code.
3. Use web or MCP sources only when the task requires current literature, external registry data, or service-specific data.
4. State whether an answer is based on local files, external sources, or inference.
5. For analysis tasks, move from inspection to runnable commands or scripts.
6. For clinical or regulatory tasks, keep claims conservative and mark assumptions.
7. Do not assume paid MCP connectors are configured. Check availability before relying on them.

## Route Map

- Research idea, stuck project, project selection: use `scientific-problem-selection`; read `references/research-strategy.md`.
- Literature review, evidence map, paper reading: read `references/literature-evidence.md`; use local PDFs/Zotero/browser/web as available.
- Manuscript, review, response letter: use installed academic writing/reviewer skills when available; keep claims tied to evidence.
- Clinical protocol or trial design: use `clinical-trial-protocol-skill`; read `references/clinical-regulatory.md`.
- scRNA-seq QC: use `single-cell-rna-qc`.
- scVI/scANVI/totalVI/PeakVI/MultiVI: use `scvi-tools`.
- nf-core/Nextflow/RNA-seq/WGS/WES/ATAC-seq: use `nextflow-development`.
- Instrument data conversion: use `instrument-data-to-allotrope`.
- MCP connector questions: read `references/mcp-connectors.md`.

## Expected Workflow

1. Summarize the user goal in one sentence.
2. Identify the route and required evidence.
3. Inspect files or environment if available.
4. Execute the specialist workflow.
5. Return concrete artifacts: document, table, script, command, protocol section, or analysis plan.
6. List unresolved assumptions and the next verification step.

## References

- `references/research-strategy.md`
- `references/literature-evidence.md`
- `references/clinical-regulatory.md`
- `references/omics-workflows.md`
- `references/mcp-connectors.md`
- `references/output-standards.md`

