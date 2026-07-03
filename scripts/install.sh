#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if command -v codex >/dev/null 2>&1; then
  codex_bin="codex"
elif [ -x "/Applications/Codex.app/Contents/Resources/codex" ]; then
  codex_bin="/Applications/Codex.app/Contents/Resources/codex"
else
  echo "Codex CLI not found. Install Codex or set PATH so 'codex' is available." >&2
  exit 1
fi

"$codex_bin" plugin marketplace add "$repo_root" >/dev/null || true
"$codex_bin" plugin marketplace upgrade >/dev/null || true
"$codex_bin" plugin add codex-science@codex-science >/dev/null || true

echo "Codex Science installed. Restart Codex or open a new thread to load the skills."

