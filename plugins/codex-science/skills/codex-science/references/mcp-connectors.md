# MCP Connector Policy

Claude Science includes external MCP connectors. Codex Science records them but does not assume they are installed.

## Before Using An MCP Connector

1. Check whether the tool is available in the current session.
2. Check whether the connector requires credentials.
3. If credentials are missing, use local files, web search, or public APIs when appropriate.
4. If the connector is essential, tell the user exactly which service and credential are needed.

## Common Connectors

- PubMed: biomedical literature.
- bioRxiv/medRxiv: preprints.
- ClinicalTrials.gov: trial registry.
- ChEMBL: bioactivity.
- Open Targets: target-disease associations.
- BioRender: scientific figures.
- Synapse: data management.
- 10x Genomics: cloud analysis data.
- Consensus/Wiley: literature access.
- Cortellis/AdisInsight/Medidata: paid clinical and regulatory intelligence.

See repository `mcp-catalog/life-sciences-mcp.json` for details.

