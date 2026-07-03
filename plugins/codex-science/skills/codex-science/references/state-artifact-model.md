# State And Artifact Model

Use this reference when a task needs resumable scientific work, provenance, logs, artifact handoff, or comparison with Claude Science's session database.

## Claude Science Pattern

Claude Science stores durable work in a local metadata database and workspace folders:

- sessions and sub-agent frames
- messages and compaction archives
- artifacts and artifact versions
- execution logs and files written
- host SDK calls
- compute job usage and outputs
- memories and verification checks

That state model makes long scientific workflows resumable and auditable. It also means local runtime folders can contain private user data and secrets-adjacent metadata.

## Codex Science Equivalent

In Codex Science, use explicit filesystem artifacts and git-friendly project structure:

```text
project/
  inputs/        # user-supplied or raw data, usually not committed
  work/          # intermediate parsed text, caches, temporary tables
  results/       # final outputs
  logs/          # command logs and run metadata
  docs/          # narrative reports, protocols, reviews
  scripts/       # reusable code
```

Prefer clear paths and checksums over hidden state when building reusable workflows.

## Provenance Rules

For every generated scientific artifact, record:

- input files and versions
- commands or scripts used
- software versions when material
- external sources and retrieval dates for current evidence
- assumptions and user-supplied parameters
- output paths and validation checks

For long workflows, write waypoint files after each major phase. Use JSON for structured state and Markdown for human review.

## Safe Runtime Audits

When auditing a local science runtime:

1. List directory structure, sizes, skill names, and config keys.
2. Read public skill and documentation files.
3. Inspect database schemas only when needed and only through read-only queries.
4. Avoid values from preferences, credentials, tokens, keys, private data, and raw logs unless specifically required and safe.
5. Report what was intentionally skipped.

## Resumable Workflow Pattern

Use this pattern for dossiers, protocol work, large PDF extractions, and multi-step analyses:

1. Create a work directory with `waypoints/`.
2. Write `progress.json` with phase status and source list.
3. After each phase, write one structured JSON waypoint and a short Markdown summary.
4. On resume, read waypoints first and ask only if overwriting or changing phase identity.
5. Keep final reports generated from waypoints rather than ad hoc memory.

## Verification Gates

Before finalizing:

- Confirm expected files exist and are non-empty.
- Validate JSON, CSV, and table shapes.
- Re-run small deterministic scripts when possible.
- Check claims against sources or data.
- Flag gaps instead of fabricating missing values.
