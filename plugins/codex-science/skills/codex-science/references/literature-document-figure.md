# Literature, Document, And Figure Workflows

Use this route for literature review, multi-page PDF exploration, manuscript narrative, publication figures, figure decks, response letters, and indication dossiers.

## Literature Review

Follow a retrieval-first workflow:

1. Clarify the scope only when it materially changes the answer.
2. Retrieve current primary sources, guidelines, trial records, or public registries before drafting.
3. Resolve identifiers instead of guessing citations. Prefer DOI links in markdown citation text.
4. Expand around key papers by checking references and cited-by papers when the task is a real survey.
5. Check retractions or failed-replication context for high-profile, surprising, or clinical claims.
6. Synthesize by theme and evidence strength, not as a paper-by-paper list.
7. State uncertainty, preprint status, and evidence level.

Good outputs include narrative reviews, evidence tables, gap maps, claim-to-source maps, and manuscript-ready paragraphs.

## PDF And Document Exploration

The Claude Science `pdf-explore` pattern is: parse once, keep persistent extracted text, then answer from relevant page ranges. In Codex:

1. Use text extraction tools (`pdftotext`, `python` libraries, OCR, or available document tooling) rather than repeatedly rendering pages.
2. Build a page map or outline first for documents longer than a few pages.
3. For semantic retrieval, search extracted text and then inspect the top pages.
4. For exhaustive extraction, sweep all pages once, normalize and deduplicate, then do one batched verification pass.
5. For figures, render high-resolution page crops rather than relying on full-page screenshots.
6. Keep page numbers with every extracted claim.

Do not claim full-document coverage unless every page or every relevant section has actually been scanned.

## Figure Style

Use the figure-style principles before drawing plots:

- Make the plotted data consistent with the title, labels, legend, and caption.
- Never include excluded rows in summary statistics unless they are explicitly marked and excluded from summaries.
- Label only what is needed to identify marks and support the claim.
- Use color consistently for the same entity across panels.
- Avoid red/green opposing contrasts.
- Prefer raw data plus summary marks for small categorical comparisons.
- Use readable axes, human-scale tick labels, and direct labels when possible.
- Render, inspect, and fix geometry and perceptual defects before finalizing.

For data figures, verification is part of the workflow: check overlaps, text clipping, contrast, leader lines, axis semantics, and whether the figure's claim is true for every plotted row.

## Figure Composition

For multi-panel scientific figures:

1. Start with one claim the figure should make.
2. Draft a panel outline before drawing: hook panel, primary evidence panel, then support or boundary panels.
3. Give each panel a message, chart family, data source, and expected dimensions.
4. Compose the full figure, then inspect each panel crop.
5. Regenerate only panels with defects or outline changes.
6. Stop when remaining changes would add unnecessary labels or visual complexity.

For a paper or figure deck, run the narrative review first: decide what Figure 1 must prove, which panels move between figures, which panels are missing, and which panels should be demoted.

## Paper Narrative

Use this route when revising a manuscript or deck:

1. Derive the brief from the work itself: abstract, introduction, captions, and existing figures.
2. Identify the pitch, audience, most compelling asset, and per-figure claims.
3. Review the arc: hook, mechanism, evidence, robustness, application.
4. Produce concrete actions: figure moves, missing analyses, kill list, and a defensible Figure 1 claim.
5. Re-run the review after revisions.

The output should not just critique. It should name which figure to make or change next.

## Indication Dossiers

For a therapeutic indication dossier:

1. Frame the indication as a patient population.
2. Resolve identity first: clinical definition, aliases, diagnostic status, ICD codes if relevant, and parent indication.
3. Research epidemiology, disease biology, standard of care, unmet need, regulatory precedent, accepted endpoints, and landmark trials.
4. Use current PubMed, ClinicalTrials.gov, guidelines, FDA/EMA materials, and disease-society sources.
5. Write resumable waypoints or section files for long dossiers.
6. In synthesis, avoid new broad research; fill only targeted gaps.

For ambiguous indications such as biological states or iatrogenic populations, explicitly separate biological concept, billable diagnosis, regulatory indication, and trial-enrollable population.
