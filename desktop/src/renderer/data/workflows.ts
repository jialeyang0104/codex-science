import {
  Activity,
  Beaker,
  BookOpenText,
  Boxes,
  ChartNoAxesCombined,
  Dna,
  FileSearch,
  FlaskConical,
  Microscope,
  Network,
  PenLine,
  Workflow
} from "lucide-react";

export interface ResearchWorkflow {
  id: string;
  label: string;
  caption: string;
  accent: string;
  Icon: typeof BookOpenText;
  prompt: string;
  checks: string[];
}

export const workflows: ResearchWorkflow[] = [
  {
    id: "evidence",
    label: "Evidence",
    caption: "Literature review, DOI checks, claim maps",
    accent: "#2563eb",
    Icon: BookOpenText,
    prompt:
      "Create an evidence-first review plan. Define search scope, source types, inclusion criteria, DOI/registry verification, and a final claim-to-source table.",
    checks: ["Primary sources", "Retraction scan", "Claim map"]
  },
  {
    id: "pdf",
    label: "PDF / Document",
    caption: "Parse once, extract pages, inspect figures",
    accent: "#0f766e",
    Icon: FileSearch,
    prompt:
      "Plan a parse-once document workflow. Include outline extraction, page-level evidence, exhaustive table/figure extraction, and a verification pass.",
    checks: ["Page map", "Figure crops", "Source pages"]
  },
  {
    id: "manuscript",
    label: "Manuscript",
    caption: "Paper narrative, response letters, figure arc",
    accent: "#7c3aed",
    Icon: PenLine,
    prompt:
      "Review the paper narrative. Identify the central claim, figure order, panel moves, missing analyses, kill list, and the strongest defensible Figure 1.",
    checks: ["Figure arc", "Missing panels", "Kill list"]
  },
  {
    id: "clinical",
    label: "Clinical",
    caption: "Protocols, endpoints, trial landscape",
    accent: "#be123c",
    Icon: FlaskConical,
    prompt:
      "Draft a clinical study design route. Define population, comparator, endpoints, analogous trials, regulatory assumptions, and protocol sections.",
    checks: ["Population", "Endpoints", "Analog trials"]
  },
  {
    id: "dossier",
    label: "Dossier",
    caption: "Indication identity and waypoint synthesis",
    accent: "#b45309",
    Icon: Boxes,
    prompt:
      "Create an indication dossier plan. Resolve the patient population, epidemiology, biology, standard of care, regulatory precedent, endpoints, and landmark trials.",
    checks: ["Identity", "Epidemiology", "Regulatory"]
  },
  {
    id: "single-cell",
    label: "Single-cell",
    caption: "QC, scVI, integration, annotations",
    accent: "#15803d",
    Icon: Microscope,
    prompt:
      "Plan a single-cell analysis. Inspect input formats, metadata, QC metrics, filtering, normalization, integration model choice, and validation plots.",
    checks: ["QC metrics", "Batch model", "Plots"]
  },
  {
    id: "omics",
    label: "Omics Pipeline",
    caption: "Nextflow, nf-core, GEO/SRA, samplesheets",
    accent: "#0369a1",
    Icon: Workflow,
    prompt:
      "Plan an omics pipeline run. Identify data source, assay, genome build, pipeline, samplesheet, execution profile, and output validation checks.",
    checks: ["Samplesheet", "Genome build", "Run logs"]
  },
  {
    id: "biomodel",
    label: "Biomodel",
    caption: "AlphaFold, Boltz, DiffDock, MPNN, ESM",
    accent: "#9333ea",
    Icon: Dna,
    prompt:
      "Choose a biomodel workflow. Compare model choices, required inputs, GPU and weight needs, data movement, licensing, and validation outputs.",
    checks: ["Model route", "GPU/env", "Licensing"]
  },
  {
    id: "compute",
    label: "Compute",
    caption: "SSH, Slurm, Modal, endpoint runbooks",
    accent: "#475569",
    Icon: Network,
    prompt:
      "Create a remote-compute execution plan. Include environment spec, provider details, smoke test, job submission, output harvest, and failure recovery.",
    checks: ["Env spec", "Smoke test", "Harvest"]
  },
  {
    id: "instrument",
    label: "Instrument",
    caption: "ASM JSON, parser code, flattened CSV",
    accent: "#0d9488",
    Icon: Beaker,
    prompt:
      "Plan a lab instrument data conversion. Detect instrument type, parse files, map fields to ASM JSON, flatten outputs, and validate schema.",
    checks: ["Vendor parse", "ASM JSON", "CSV"]
  },
  {
    id: "strategy",
    label: "Strategy",
    caption: "Problem choice, go/no-go, risk table",
    accent: "#334155",
    Icon: ChartNoAxesCombined,
    prompt:
      "Evaluate this scientific project. Separate novelty, feasibility, impact, risk assumptions, decision tree, stop/go criteria, and next artifact.",
    checks: ["Risk table", "Decision tree", "Next artifact"]
  },
  {
    id: "general",
    label: "Workbench",
    caption: "General AI-assisted research",
    accent: "#4f46e5",
    Icon: Activity,
    prompt:
      "Act as a careful AI research workbench. Ask for missing files or context, propose the smallest useful next step, and keep outputs reproducible.",
    checks: ["Assumptions", "Artifacts", "Validation"]
  }
];

export const providerPresets = {
  openai: {
    provider: "openai",
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    chatPath: "/chat/completions",
    model: ""
  },
  deepseek: {
    provider: "deepseek",
    name: "DeepSeek",
    baseUrl: "https://api.deepseek.com",
    chatPath: "/chat/completions",
    model: "deepseek-v4-pro"
  },
  custom: {
    provider: "custom",
    name: "OpenAI-compatible",
    baseUrl: "",
    chatPath: "/chat/completions",
    model: ""
  }
} as const;
