# Claude Science Runtime Audit

Use this reference when porting a Claude Science workflow into Codex or when a user asks what the local `.claude-science` installation provides.

## Audited Local Shape

The local Claude Science folder is a full agent runtime, not just a skill collection:

- `skills/`: 34 workflow skills, including biomodels, literature review, PDF exploration, paper narrative, figure composition, remote compute, managed endpoints, and the portable life-sciences skills.
- `conda/`: prebuilt environments for `operon-mcp`, `python`, `r`, and `scanpy`.
- `bin/claude-science`: desktop/runtime binary plus previous local binary backups.
- `config.toml`: model defaults and kernel LLM defaults.
- `cpa_claude_science_shim.py`: a local Claude-compatible API shim that exposes Claude-style model IDs while forwarding to a CPA upstream.
- `operon-cli.db` and WAL files: session, artifact, execution, and compute state.
- `artifacts/`, `workspaces/`, `tool-results/`, and logs: local working state and generated outputs.
- `.oauth-tokens/`, `encryption.key`, `.key-backups/`: encrypted credential material. Do not read, print, copy, or vendor these files.

## What This Means For Codex

Claude Science parity has four layers:

1. **Routing**: intent classification selects evidence, document, figure, clinical, omics, biomodel, or compute workflows.
2. **Skills**: progressive-disclosure `SKILL.md` files describe procedures, with optional `kernel.py` helpers in Claude Science.
3. **Runtime state**: artifacts, execution logs, tool results, workspaces, and compute job ledgers make work resumable.
4. **External capabilities**: MCP connectors, model endpoints, SSH/Slurm/Modal providers, and hosted APIs extend local work.

Codex Science should port the routing and procedural parts directly, document runtime-only features clearly, and use Codex tools or local commands where Claude Science-specific `host.*` APIs are unavailable.

## Sensitive Boundaries

When auditing or migrating a `.claude-science` folder:

- Never dump credential files, encryption keys, OAuth token stores, or key backups.
- Avoid raw logs unless a user explicitly asks for a specific diagnostic and secrets have been considered.
- Do not copy private workspaces, artifacts, or tool outputs into a public repository.
- Record shapes, filenames, workflows, and compatibility notes rather than user data.

## Workflow Parity Table

| Claude Science feature | Codex Science treatment |
|---|---|
| Progressive skills | Supported by Codex skills. Keep front-door routes lean and put detail in references. |
| `kernel.py` auto-injected helpers | Not portable as-is. Recreate as scripts, reference recipes, or normal local code when needed. |
| `host.query()` session DB access | Not portable as-is. Use Codex local files, shell commands, git history, and explicit docs instead. |
| `host.compute.*` SSH/Modal jobs | Treat as a design pattern. Use available Codex tools, local shell, configured MCP/app tools, or write provider-specific runbooks. |
| Managed model endpoints | Treat as a documented endpoint lifecycle pattern; do not assume endpoint tooling exists. |
| Claude-compatible model shim | Document local API behavior; do not vendor token/config files. |
| Encrypted credential stores | Excluded from migration. |

## Porting Checklist

1. Identify whether the requested workflow is procedural, runtime-dependent, credential-dependent, or data-dependent.
2. If procedural, port as a Codex skill or reference.
3. If runtime-dependent, document the expected runtime surface and provide a Codex fallback.
4. If credential-dependent, check connector or provider availability at execution time.
5. If data-dependent, keep private user files out of the repository and create reproducible scripts or instructions instead.
6. Test plugin metadata, skill frontmatter, JSON catalogs, and a fresh local plugin install after each substantial update.
