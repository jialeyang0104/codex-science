# Codex Science

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Codex Plugin](https://img.shields.io/badge/Codex-plugin-10A37F.svg)](plugins/codex-science)
[![Life Sciences](https://img.shields.io/badge/domain-life%20sciences-166534.svg)](plugins/codex-science/skills)
[![Skills](https://img.shields.io/badge/skills-7-informational.svg)](plugins/codex-science/skills)

[English](README.md) | **中文**

Codex Science 是一个面向 Codex 的生命科学工作流插件包。它参考 Claude Science 的组织方式：用 Skill 描述可复用科研流程，用统一入口进行任务路由，并用 MCP 目录记录可连接的外部科研服务。

这个仓库把 `anthropics/life-sciences` 中可迁移的生命科学技能整理为 Codex 插件，并补充了 Codex 原生的编排技能、本地安装脚本、流程文档，以及 PubMed、ClinicalTrials.gov、ChEMBL、Open Targets、BioRender、Synapse、Consensus、10x Genomics 等服务的连接器索引。

## 目录

- [快速开始](#快速开始)
- [这是什么](#这是什么)
- [技能索引](#技能索引)
- [MCP 连接器目录](#mcp-连接器目录)
- [仓库结构](#仓库结构)
- [文档](#文档)
- [开发与验证](#开发与验证)
- [贡献者](#贡献者)
- [许可证](#许可证)

## 快速开始

将本仓库作为本地 Codex 插件安装：

```bash
./scripts/install.sh
```

也可以手动安装：

```bash
codex plugin marketplace add /path/to/codex-science
codex plugin marketplace upgrade
codex plugin add codex-science@codex-science
```

安装后重启 Codex，或打开一个新对话，让技能列表在新会话中加载。

## 这是什么

Codex Science 不是单个大而全的助手，而是一个三层结构的小框架：

1. **编排技能**：`codex-science` 负责识别任务类型，并路由到合适的科研工作流。
2. **可迁移科研技能**：覆盖科研选题、临床方案、单细胞 QC、scVI 建模、nf-core 流程和仪器数据标准化。
3. **MCP 目录**：记录可选外部科研服务；只有当用户配置了连接器和凭据时，才会参与实际工作流。

README 的组织方式参考了优秀技能集合仓库的风格：先给快速安装，再按类别列出技能，最后补充连接器、结构和开发信息。

## 技能索引

| 技能 | 适用场景 | 路径 |
|---|---|---|
| `codex-science` | Codex Science 的统一入口，用于科研策略、证据综合、临床工作、组学分析，以及类似 Claude Science 的 Codex 工作流。 | [`plugins/codex-science/skills/codex-science`](plugins/codex-science/skills/codex-science) |
| `scientific-problem-selection` | 科研选题、项目卡点排查、风险评估和战略性科研决策。 | [`plugins/codex-science/skills/scientific-problem-selection`](plugins/codex-science/skills/scientific-problem-selection) |
| `clinical-trial-protocol-skill` | 面向药物或医疗器械的临床试验方案撰写，包含模块化监管章节。 | [`plugins/codex-science/skills/clinical-trial-protocol-skill`](plugins/codex-science/skills/clinical-trial-protocol-skill) |
| `single-cell-rna-qc` | 对 `.h5ad` 或 10x `.h5` 单细胞 RNA-seq 数据进行 QC、MAD 过滤和可视化。 | [`plugins/codex-science/skills/single-cell-rna-qc`](plugins/codex-science/skills/single-cell-rna-qc) |
| `scvi-tools` | 深度生成式单细胞分析，包括 scVI、scANVI、totalVI、PeakVI、MultiVI、DestVI、veloVI 和 scArches。 | [`plugins/codex-science/skills/scvi-tools`](plugins/codex-science/skills/scvi-tools) |
| `nextflow-development` | 使用 nf-core `rnaseq`、`sarek` 和 `atacseq` 分析本地 FASTQ 或 GEO/SRA 公共数据。 | [`plugins/codex-science/skills/nextflow-development`](plugins/codex-science/skills/nextflow-development) |
| `instrument-data-to-allotrope` | 将实验仪器输出转换为 Allotrope Simple Model JSON 或扁平 CSV，便于 LIMS、ELN 和数据湖接入。 | [`plugins/codex-science/skills/instrument-data-to-allotrope`](plugins/codex-science/skills/instrument-data-to-allotrope) |

## MCP 连接器目录

原 Claude Science marketplace 包含面向文献检索、临床注册、化合物数据库、靶点发现、科研数据平台、科学绘图和商业情报服务的 MCP 连接器。

Codex Science 将这些连接器记录在 [`mcp-catalog/life-sciences-mcp.json`](mcp-catalog/life-sciences-mcp.json)。这个目录只做说明和路由参考：它不会打包第三方 MCP 服务，不保存凭据，也不会假设付费服务已经可用。

| 领域 | 示例连接器 |
|---|---|
| 文献与证据 | PubMed、bioRxiv/medRxiv、Wiley Scholar Gateway、Consensus |
| 临床与监管 | ClinicalTrials.gov、Medidata、Cortellis、AdisInsight |
| 药物发现 | ChEMBL、Open Targets、ToolUniverse、Owkin |
| 数据与图形 | Synapse、BioRender、10x Genomics |

## 仓库结构

```text
codex-science/
  .agents/plugins/marketplace.json
  docs/
    claude-science-workflow.md
    codex-science-design.md
  mcp-catalog/
    life-sciences-mcp.json
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
  scripts/
    install.sh
    validate.sh
```

## 文档

- [`docs/claude-science-workflow.md`](docs/claude-science-workflow.md)：梳理 Claude Science / `life-sciences` 的工作流、Skill 层、MCP 层和迁移原则。
- [`docs/codex-science-design.md`](docs/codex-science-design.md)：描述 Codex 原生包结构、路由模型、外部连接器策略和输出标准。
- [`NOTICE.md`](NOTICE.md)：记录 vendored skills 的来源，以及第三方连接器边界。

## 开发与验证

验证插件元数据、技能 frontmatter 和 JSON 文件：

```bash
./scripts/validate.sh
```

验证脚本默认使用 `~/.codex/skills/.system/skill-creator/scripts/quick_validate.py`，并需要一个安装了 `PyYAML` 的 Python 环境。

## 贡献者

- [`jialeyang0104`](https://github.com/jialeyang0104)

## 许可证

本仓库使用 [Apache-2.0](LICENSE)。从 `anthropics/life-sciences` vendored 进来的技能保留各自目录中的原始 `LICENSE.txt` 文件。
