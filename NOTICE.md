# Notices

This project includes a Codex-native orchestration layer created for `codex-science` by `jialeyang0104`.

Vendored skills under `plugins/codex-science/skills/` include material from `anthropics/life-sciences`, distributed under Apache-2.0 with their original `LICENSE.txt` files preserved in each vendored skill directory.

The MCP connector catalog in `mcp-catalog/life-sciences-mcp.json` is a compatibility and routing index. It does not bundle third-party MCP servers or grant access to third-party services.

The workflow catalog in `workflow-catalog/claude-science-workflows.json` is based on a local workflow audit. It records skill names, categories, portability status, and runtime dependencies only. Credential stores, encryption keys, private artifacts, private workspaces, and raw secrets are intentionally excluded.
