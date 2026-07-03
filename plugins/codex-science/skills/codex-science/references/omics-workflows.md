# Omics And Workflow Execution

Use this route for single-cell, bulk RNA-seq, proteomics, metabolomics, variant calling, clinical omics, and public sequencing reanalysis.

## Process

1. Inspect input files, sample metadata, assay type, genome/build, and expected output.
2. Check local environment before proposing long runs.
3. Use deterministic scripts for repeated transformations.
4. Preserve raw data and write outputs to explicit result directories.
5. Verify counts, dimensions, missingness, sample IDs, and units before modeling.
6. For GPU foundation-model work, check `compute-and-biomodels.md` before assuming local execution.

## Specialist Skills

- `single-cell-rna-qc` for scRNA-seq QC.
- `scvi-tools` for deep generative single-cell modeling.
- `nextflow-development` for nf-core pipelines.
- `instrument-data-to-allotrope` for instrument data standardization.
- `compute-and-biomodels.md` for Borzoi, Evo 2, scGPT, protein models, remote GPU jobs, and endpoint routing.
