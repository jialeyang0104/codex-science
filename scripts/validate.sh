#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
validator="${CODEX_SKILL_VALIDATOR:-$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py}"

if [ ! -f "$validator" ]; then
  echo "Skill validator not found: $validator" >&2
  exit 1
fi

python_bin="${PYTHON:-}"
if [ -z "$python_bin" ]; then
  for candidate in python3 /opt/homebrew/anaconda3/bin/python /opt/homebrew/bin/python3 /usr/bin/python3; do
    if command -v "$candidate" >/dev/null 2>&1 || [ -x "$candidate" ]; then
      if "$candidate" - <<'PY' >/dev/null 2>&1
import yaml
PY
      then
        python_bin="$candidate"
        break
      fi
    fi
  done
fi

if [ -z "$python_bin" ]; then
  echo "No Python with PyYAML found. Set PYTHON=/path/to/python with yaml installed." >&2
  exit 1
fi

"$python_bin" -m json.tool "$repo_root/.agents/plugins/marketplace.json" >/dev/null
"$python_bin" -m json.tool "$repo_root/plugins/codex-science/.codex-plugin/plugin.json" >/dev/null
"$python_bin" -m json.tool "$repo_root/mcp-catalog/life-sciences-mcp.json" >/dev/null

find "$repo_root/plugins/codex-science/skills" -mindepth 1 -maxdepth 1 -type d | sort | while read -r skill_dir; do
  [ -f "$skill_dir/SKILL.md" ] || continue
  "$python_bin" "$validator" "$skill_dir" >/dev/null
  echo "valid $(basename "$skill_dir")"
done

echo "Codex Science validation passed."
