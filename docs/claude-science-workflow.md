# Claude Science Workflow Audit

Audit date: 2026-07-03

Sources inspected:

- Local runtime: `/Users/yangjiale/.claude-science/`
- Local skills: `/Users/yangjiale/.claude-science/skills/`
- Existing Codex Science project: `/Users/yangjiale/Desktop/codex-science/`

Credential stores, encryption keys, key backups, raw secrets, and private artifact contents were intentionally not inspected or copied.

## High-Level Model

Claude Science is a local scientific agent runtime. It is larger than a set of prompt files:

1. **Skill layer**: 34 skills covering strategy, clinical work, omics, literature, PDFs, figures, biomodels, compute providers, endpoints, and runtime introspection.
2. **Execution layer**: Python/R/scanpy conda environments and `kernel.py` sidecars that inject helper functions for selected skills.
3. **State layer**: SQLite metadata, artifacts, workspaces, tool results, logs, and resumable job state.
4. **External layer**: MCP connectors, remote compute providers, managed model endpoints, and a Claude-compatible local model shim.

Codex Science now treats Claude Science parity as workflow parity, not binary compatibility. Portable skills are vendored. Runtime-specific capabilities are documented and routed through Codex-native tools when available.

## Local Runtime Inventory

| Component | Observed role | Codex treatment |
|---|---|---|
| `skills/` | 34 scientific and runtime skills | Vendored portable skills; cataloged or documented others. |
| `conda/` | `operon-mcp`, `python`, `r`, `scanpy` environments | Do not vendor; document expected env checks. |
| `bin/claude-science` | Runtime binary | Do not vendor. |
| `config.toml` | Model defaults and kernel model defaults | Document only when relevant. |
| `cpa_claude_science_shim.py` | Local API shim exposing Claude-style model IDs and forwarding to CPA | Document as local runtime integration. |
| `operon-cli.db` | Session/artifact/execution/compute metadata | Do not copy; port state model as explicit files/waypoints. |
| `artifacts/`, `workspaces/`, `tool-results/` | Private project outputs and working state | Do not vendor. |
| `.oauth-tokens/`, `encryption.key`, `.key-backups/` | Encrypted credentials and key material | Excluded. |

## Skill Inventory

The local Claude Science skill catalog contains 34 skills.

| Category | Skills | Codex Science status |
|---|---|---|
| Portable life-sciences | `scientific-problem-selection`, `clinical-trial-protocol-skill`, `single-cell-rna-qc`, `scvi-tools`, `nextflow-development`, `instrument-data-to-allotrope` | Vendored as Codex skills. |
| Literature, documents, figures | `literature-review`, `pdf-explore`, `figure-style`, `figure-composer`, `paper-narrative`, `indication-dossier` | Converted into Codex Science routing/reference docs. |
| Remote compute and endpoints | `compute-env-setup`, `remote-compute-ssh`, `remote-compute-modal`, `managed-model-endpoints`, `using-model-endpoint` | Converted into compute and endpoint runbook guidance. |
| Biomodels | `alphafold2`, `boltz`, `borzoi`, `chai1`, `diffdock`, `esmfold2`, `evo2`, `fair-esm2`, `ligandmpnn`, `openfold3`, `proteinmpnn`, `scgpt`, `solublempnn` | Cataloged for routing; execution depends on local/remote envs and model weights. |
| Runtime/customization | `customize`, `product-self-knowledge`, `self-awareness`, `skill-creator` | Runtime-specific; documented as non-portable or replaced by Codex equivalents. |

The machine-readable inventory is in `workflow-catalog/claude-science-workflows.json`.

## Workflow Patterns To Replicate

### Progressive Disclosure

Claude Science keeps the front skill concise and routes to detailed references, scripts, and kernels only when needed. Codex Science follows the same shape: `codex-science` is a front-door router with references for literature, documents, compute, biomodels, state, clinical work, omics, and MCP policy.

### Retrieval-First Literature

The `literature-review` workflow retrieves and verifies sources before writing. It emphasizes DOI resolution, citation graph expansion, retraction checks, primary sources, and synthesis by scientific claim rather than paper order. Codex Science now captures those gates in `literature-evidence.md` and `literature-document-figure.md`.

### Parse-Once Document Work

`pdf-explore` parses a long PDF once into persistent page text, outline, page scans, or structured per-page extraction. Codex Science ports the principle rather than the Claude-specific kernel: extract text/page maps once, keep page numbers, inspect only relevant pages, and crop figures at high resolution.

### Figure And Paper Narrative

Claude Science separates:

- `figure-style`: single-plot correctness and legibility.
- `figure-composer`: one multi-panel figure from claim to panel outline to review loop.
- `paper-narrative`: whole-paper figure arc and deck reshaping.

Codex Science now routes manuscript and figure work through the same tiers.

### Resumable Dossiers

`indication-dossier` writes phase waypoint files for indication identity, epidemiology, biology/standard of care, regulatory/trials, and synthesis. Codex Science now recommends waypoint-based work directories for long clinical or landscape reports.

### Declarative Compute

`compute-env-setup` treats each environment as a declarative spec: base, package phases, environment variables, weight dirs, import checks, GPU witnesses, and documented invocation. Codex Science now records this as the compute/biomodel route.

### Remote Submit And Harvest

The SSH/Modal workflows follow a submit, notify, harvest, record pattern. In Codex, the exact `host.compute.*` API is not assumed. The portable principle is to stage inputs, run bounded jobs, harvest outputs, keep logs, validate small before large, and document provider facts.

### Managed Endpoints

Managed endpoints are daemon-owned HTTP services with lifecycle and credential boundaries. Codex Science treats this as a runbook pattern unless endpoint tools are configured in the current Codex session.

## Replication Principles

For Codex, the safe replication is:

- Package directly portable skills.
- Add a Codex-native orchestration skill.
- Document Claude Science runtime features without copying private state.
- Add a workflow catalog for audited skills and compatibility status.
- Route biomodel and compute requests through environment checks and provider planning.
- Keep external connectors optional and credential-aware.
- Test plugin metadata, skill frontmatter, JSON catalogs, and fresh plugin installation.
