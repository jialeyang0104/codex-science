# Codex Science

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Codex Plugin](https://img.shields.io/badge/Codex-plugin-10A37F.svg)](plugins/codex-science)
[![Life Sciences](https://img.shields.io/badge/domain-life%20sciences-166534.svg)](plugins/codex-science/skills)
[![Skills](https://img.shields.io/badge/skills-7-informational.svg)](plugins/codex-science/skills)
[![Audited Workflows](https://img.shields.io/badge/audited%20workflows-34-7C3AED.svg)](workflow-catalog/claude-science-workflows.json)

[English](README.md) | **中文**

Codex Science 是一个面向 Codex 的科研工作流插件包，参考了 Claude Science 的组织方式。它包含可迁移的生命科学 Skills、统一入口编排 Skill、基于本机 Claude Science 审查得到的工作流目录，以及可选科研 MCP 服务目录。

这个项目现在覆盖 Claude Science 的两层能力：

- 直接迁移 `anthropics/life-sciences` 中可移植的 Skills
- 用 Codex 原生参考文档复刻文献综述、PDF 探索、论文叙事、图形排版、适应症 dossier、生物模型、远程计算、模型端点和状态追踪等工作流

## 目录

- [快速开始](#快速开始)
- [这是什么](#这是什么)
- [技能索引](#技能索引)
- [桌面 App](#桌面-app)
- [Claude Science 工作流复刻](#claude-science-工作流复刻)
- [目录文件](#目录文件)
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

## 桌面 App

Codex Science 也包含一个面向 macOS 和 Windows 的桌面工作台。它基于 Electron 和 React，支持 OpenAI、DeepSeek，以及自定义 OpenAI-compatible Chat API。

这个 App 的重点是 AI 辅助科研，而不是普通聊天：

- 覆盖证据综述、PDF、论文、临床方案、dossier、单细胞、组学、生物模型、远程计算、仪器转换和科研策略等工作流
- 在可用时通过 Electron safeStorage 本地保存 provider profile
- 支持配置 base URL、chat path 和 model ID，以兼容不同供应商和变化中的模型目录
- 内置证据优先、本地数据优先、计算假设和引用完整性等科研 guardrails

本地构建：

```bash
cd desktop
npm install
npm run typecheck
npm run build
```

Release 打包由 [`.github/workflows/desktop-release.yml`](.github/workflows/desktop-release.yml) 处理；推送 `desktop-v*` 标签后会构建 macOS 和 Windows 安装包。

## 这是什么

Codex Science 不是单个大而全的助手，而是一个四层结构的小框架：

1. **编排技能**：`codex-science` 负责识别任务类型，并路由到合适的科研工作流。
2. **可迁移科研技能**：覆盖科研选题、临床方案、单细胞 QC、scVI 建模、nf-core 流程和仪器数据标准化。
3. **工作流复刻参考**：把本机 Claude Science 审查得到的流程整理为 Codex 可执行的 runbook。
4. **目录文件**：记录可选 MCP 连接器和已审查的 Claude Science 工作流分类。

README 的组织方式参考优秀技能集合仓库：先给快速安装，再按类别列出技能，最后补充连接器、结构和开发信息。

## 技能索引

| 技能 | 适用场景 | 路径 |
|---|---|---|
| `codex-science` | Codex Science 的统一入口，用于科研策略、证据综合、PDF/文档处理、临床工作、组学分析、生物模型规划，以及类似 Claude Science 的 Codex 工作流。 | [`plugins/codex-science/skills/codex-science`](plugins/codex-science/skills/codex-science) |
| `scientific-problem-selection` | 科研选题、项目卡点排查、风险评估和战略性科研决策。 | [`plugins/codex-science/skills/scientific-problem-selection`](plugins/codex-science/skills/scientific-problem-selection) |
| `clinical-trial-protocol-skill` | 面向药物或医疗器械的临床试验方案撰写，包含模块化监管章节。 | [`plugins/codex-science/skills/clinical-trial-protocol-skill`](plugins/codex-science/skills/clinical-trial-protocol-skill) |
| `single-cell-rna-qc` | 对 `.h5ad` 或 10x `.h5` 单细胞 RNA-seq 数据进行 QC、MAD 过滤和可视化。 | [`plugins/codex-science/skills/single-cell-rna-qc`](plugins/codex-science/skills/single-cell-rna-qc) |
| `scvi-tools` | 深度生成式单细胞分析，包括 scVI、scANVI、totalVI、PeakVI、MultiVI、DestVI、veloVI 和 scArches。 | [`plugins/codex-science/skills/scvi-tools`](plugins/codex-science/skills/scvi-tools) |
| `nextflow-development` | 使用 nf-core `rnaseq`、`sarek` 和 `atacseq` 分析本地 FASTQ 或 GEO/SRA 公共数据。 | [`plugins/codex-science/skills/nextflow-development`](plugins/codex-science/skills/nextflow-development) |
| `instrument-data-to-allotrope` | 将实验仪器输出转换为 Allotrope Simple Model JSON 或扁平 CSV，便于 LIMS、ELN 和数据湖接入。 | [`plugins/codex-science/skills/instrument-data-to-allotrope`](plugins/codex-science/skills/instrument-data-to-allotrope) |

## Claude Science 工作流复刻

本次审查的本机 Claude Science 文件夹包含 34 个 Skills 和完整运行时：conda 环境、状态数据库、artifacts、workspaces、tool results、远程计算模式、托管模型端点以及本地模型 shim。凭据、加密密钥和私有 artifact 内容已刻意排除。

Codex Science 现在保留这些流程中可迁移的部分：

| 领域 | Claude Science 模式 | Codex Science 路由 |
|---|---|---|
| 文献 | 检索、验证 DOI、扩展引用、检查撤稿、按论点综合 | [`literature-evidence.md`](plugins/codex-science/skills/codex-science/references/literature-evidence.md) |
| PDF 和文档 | 一次解析、页码映射、扫描/抽取、图像裁剪 | [`literature-document-figure.md`](plugins/codex-science/skills/codex-science/references/literature-document-figure.md) |
| 图形和论文 | 图形规范、多面板组合、论文叙事审查 | [`literature-document-figure.md`](plugins/codex-science/skills/codex-science/references/literature-document-figure.md) |
| 适应症 dossier | 患者人群视角和分阶段 waypoint | [`clinical-regulatory.md`](plugins/codex-science/skills/codex-science/references/clinical-regulatory.md) |
| 生物模型 | AlphaFold2、Boltz、Chai-1、OpenFold3、DiffDock、MPNN、Borzoi、Evo 2、ESM、scGPT | [`compute-and-biomodels.md`](plugins/codex-science/skills/codex-science/references/compute-and-biomodels.md) |
| 远程计算 | SSH/Slurm/Modal 提交、等待、收集输出、记录 provider 信息 | [`compute-and-biomodels.md`](plugins/codex-science/skills/codex-science/references/compute-and-biomodels.md) |
| 运行时状态 | 数据库会话、artifacts、日志、计算记录 | [`state-artifact-model.md`](plugins/codex-science/skills/codex-science/references/state-artifact-model.md) |

## 目录文件

- [`workflow-catalog/claude-science-workflows.json`](workflow-catalog/claude-science-workflows.json)：记录 34 个已审查 Claude Science Skills、分类、可迁移状态和运行时依赖。
- [`mcp-catalog/life-sciences-mcp.json`](mcp-catalog/life-sciences-mcp.json)：记录 PubMed、ClinicalTrials.gov、ChEMBL、Open Targets、BioRender、Synapse、Consensus、10x Genomics 等可选科研 MCP 连接器。

这些目录只做说明和路由参考：不会打包第三方服务，不保存凭据，也不会假设付费服务已经可用。

## 仓库结构

```text
codex-science/
  .agents/plugins/marketplace.json
  docs/
    claude-science-workflow.md
    codex-science-design.md
  desktop/
    src/
    DESIGN_SYSTEM.md
    RELEASE_NOTES.md
  mcp-catalog/
    life-sciences-mcp.json
  workflow-catalog/
    claude-science-workflows.json
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

- [`docs/claude-science-workflow.md`](docs/claude-science-workflow.md)：审查本机 Claude Science 工作流和可迁移边界。
- [`docs/codex-science-design.md`](docs/codex-science-design.md)：描述 Codex 原生包结构、路由模型、外部连接器策略、状态模型和输出标准。
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
