# Compute And Biomodel Routing

Use this route for protein structure prediction, inverse folding, docking, genomic foundation models, single-cell foundation models, GPU jobs, SSH/Slurm/Modal execution, model endpoint registration, and weight-cache planning.

## First Decision

Classify the job before choosing tools:

| Need | Likely route |
|---|---|
| Small local CPU task | Run locally after checking dependencies. |
| GPU inference with open-source weights | Check existing local GPU/env first; otherwise plan remote compute. |
| Large model service | Check whether a managed endpoint or HTTP API already exists. |
| Batch campaign | Prefer remote compute with explicit input staging, output harvesting, and a retry plan. |
| Provider setup | Build or document the environment before submitting real science jobs. |

Do not assume GPU access, remote providers, endpoint tooling, or model weights exist. Check first.

## Compute Provider Pattern

The Claude Science remote-compute workflow has three durable ideas that port well:

1. **Read provider details first**: existing envs, activation commands, partitions, accounts, GPU shapes, weight caches, and gotchas.
2. **Submit once with a bounded intent**: name the tool, input scale, resources, and expected runtime.
3. **Harvest and record**: collect outputs into a project directory and document new provider facts for next time.

For Codex, use the available local shell, configured apps/connectors, or provider-specific CLIs. Keep the same discipline:

- Stage inputs explicitly.
- Write outputs under a clear result directory.
- Capture stdout/stderr logs.
- Run a short smoke test before expensive jobs.
- Stop after repeated infrastructure failures and ask for missing provider facts.

## Environment Specs

Represent compute environments declaratively when possible:

- base image or Python/CUDA versions
- system packages
- ordered pip/conda phases
- environment variables
- shim files or patches
- model-weight directories and cache variables
- import checks
- GPU witness command
- documented invocation

Validation should progress from import check, to a seeded tiny forward pass, to a full documented invocation.

## Biomodel Catalog

| Workflow | Use for | Notes |
|---|---|---|
| AlphaFold2 / ColabFold | protein monomer/multimer structure prediction | MSA server may send sequence to `api.colabfold.com`; use cached `.a3m` files for campaigns. |
| Boltz-2 | protein, nucleic-acid, ligand co-folding and optional affinity | Good open-source AF3-style default; requires GPU. |
| Chai-1 | all-atom co-folding from FASTA/SMILES, Python campaign loops | Requires cache location for multi-GB downloads. |
| OpenFold3 | Apache-2.0 AF3-style reproduction | Gated Hugging Face weights; MSA/template routes may use external services. |
| ESMFold2 / ESMC | single-sequence or MSA complex prediction, embeddings, mutation scoring | GPU and backend/kernel choice matter. |
| DiffDock-L | blind small-molecule pose prediction | Geometry, not binding affinity; CLI/YAML flag precedence is a known trap. |
| ProteinMPNN | backbone-to-sequence design | Often CPU-feasible for small runs; outputs sequences only. |
| LigandMPNN | sequence design with ligand, nucleic-acid, or metal context | Use for binding pockets; can thread designed sequences into PDBs. |
| SolubleMPNN | expression-biased inverse folding | Still verify folds and solubility with orthogonal filters. |
| Borzoi | DNA-to-functional-track prediction and variant effects | Large windows and many tracks; GPU and HF weights needed. |
| Evo 2 | long-context genomic likelihood, embedding, generation | GPU-heavy; use for variant/regulatory scoring when configured. |
| ESM-2 | protein embeddings, masked-LM scoring, contact prediction | Smaller models can be local; large models need GPU. |
| scGPT | single-cell embeddings and annotation | Requires checkpoint directory and GPU for larger data. |

## Managed Model Endpoints

Treat managed endpoints as lifecycle-managed HTTP services:

1. Register or discover the endpoint name.
2. Build requests from the provided base URL, not hardcoded hostnames.
3. Keep credentials in the runtime credential store, not in scripts or logs.
4. Distinguish local lifecycle scripts from hosted upstream APIs.
5. Let cold starts run when they are downloading images or weights.

In Codex, this is a design pattern unless a concrete endpoint tool is available in the current session.

## Licensing And Data Movement

Before running biomodels:

- Check code and weight licenses separately.
- Note gated weights or model-card restrictions.
- Name external services that receive sequences, structures, ligands, or clinical data.
- Avoid uploading sensitive sequences or patient-derived data to public services unless the user explicitly approves.
- Prefer local or approved private compute for confidential inputs.
