---
name: codex-science
description: Codex-native science workflow orchestrator for research strategy, literature synthesis, PDF/paper exploration, manuscript and figure work, indication dossiers, clinical trial protocols, single-cell and omics analysis, Nextflow pipelines, scvi-tools modeling, biomodel/remote-compute planning, instrument data standardization, and Claude Science-like workflows in Codex. Use when users ask for Codex Science, Claude Science replication, biomedical research planning, evidence synthesis, study design, scientific writing, document analysis, protein/genomic foundation models, or life-sciences analysis.
metadata:
  source: codex-science
  version: 0.2.0
---

# Codex Science

Use this skill as the front door for science work. Route to specialist skills and tools instead of doing everything in this file.

## Operating Rules

1. Classify the task before acting: strategy, evidence, document/PDF, writing/figures, clinical/regulatory, omics/data, biomodel/compute, workflow execution, or instrument standardization.
2. Prefer local evidence first when the user provides files, datasets, notes, or code.
3. Use web or MCP sources only when the task requires current literature, external registry data, or service-specific data.
4. State whether an answer is based on local files, external sources, or inference.
5. For literature, current science, medical, legal, financial, regulatory, pricing, product, or safety claims, verify with current primary sources before finalizing.
6. For analysis tasks, move from inspection to runnable commands or scripts.
7. For clinical or regulatory tasks, keep claims conservative and mark assumptions.
8. Do not assume paid MCP connectors, Claude Science host APIs, remote compute providers, managed endpoints, or GPU model weights are configured. Check availability before relying on them.
9. Do not inspect or copy secrets from Claude Science runtime folders: OAuth token stores, encryption keys, key backups, host-grant internals, or credential values.

## Route Map

- Research idea, stuck project, project selection: use `scientific-problem-selection`; read `references/research-strategy.md`.
- Literature review, evidence map, citation support: read `references/literature-evidence.md`; use local PDFs/Zotero/browser/web/MCP as available.
- Multi-page PDF, report, manuscript, table, figure, or appendix extraction: read `references/literature-document-figure.md`; parse once, cache extracted text, then synthesize.
- Manuscript, review, response letter, paper narrative, figure arc, or publication-grade plots: read `references/literature-document-figure.md`; use installed academic writing/reviewer skills when available; keep claims tied to evidence.
- Indication dossier or therapeutic landscape: read `references/clinical-regulatory.md` and `references/literature-document-figure.md`; use current PubMed, ClinicalTrials.gov, guidelines, and regulatory sources.
- Clinical protocol or trial design: use `clinical-trial-protocol-skill`; read `references/clinical-regulatory.md`.
- scRNA-seq QC: use `single-cell-rna-qc`.
- scVI/scANVI/totalVI/PeakVI/MultiVI: use `scvi-tools`.
- nf-core/Nextflow/RNA-seq/WGS/WES/ATAC-seq: use `nextflow-development`.
- Protein structure prediction, inverse folding, docking, genomic foundation models, or single-cell foundation models: read `references/compute-and-biomodels.md`; route locally only when dependencies exist, otherwise plan remote compute or endpoint use.
- Remote GPU, SSH/Slurm/Modal, managed model endpoint, or model weight cache setup: read `references/compute-and-biomodels.md`; treat provider docs and user approval as part of the workflow.
- Instrument data conversion: use `instrument-data-to-allotrope`.
- MCP connector questions: read `references/mcp-connectors.md`.
- Claude Science parity, local runtime audit, artifact/state behavior, or migration from `.claude-science`: read `references/claude-science-runtime.md` and `references/state-artifact-model.md`.

## Expected Workflow

1. Summarize the user goal in one sentence.
2. Identify the route and required evidence.
3. Inspect files or environment if available.
4. Execute the specialist workflow.
5. Return concrete artifacts: document, table, script, command, protocol section, or analysis plan.
6. List unresolved assumptions and the next verification step.

## References

- `references/claude-science-runtime.md`
- `references/state-artifact-model.md`
- `references/research-strategy.md`
- `references/literature-evidence.md`
- `references/literature-document-figure.md`
- `references/clinical-regulatory.md`
- `references/omics-workflows.md`
- `references/compute-and-biomodels.md`
- `references/mcp-connectors.md`
- `references/output-standards.md`
