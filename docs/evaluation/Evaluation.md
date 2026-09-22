# Epistola — Evaluation Set & Results

**Author:** Yuwen Wang  
**Report version:** 1.0 — initial evaluation record  
**Test date:** 21 September 2026, approximately 19:33–19:35 PDT  
**Live system:** https://letterwriting.vercel.app  
**Repository:** https://github.com/Wyworange/letter-writer-2

## Purpose and method

Evaluate whether the historical letter-writing experience completes its core flow and responds meaningfully to user selections. This is an assistant-operated browser evaluation prepared with Codex, not a participant usability study. Five cases were exercised in one browser session; two additional cases are specified but unexecuted. Results apply to the observed deployment only. Its deployed commit and backend generation source were not independently identified.

The evaluation separates working controls from satisfactory letter content. Pass means the stated criterion was observed; Partial means only some criteria were met or verified; Fail means an observed result contradicted the criterion; Not run means there is no execution evidence. These are qualitative judgments, not statistical reliability estimates.

## Evaluation set

Baseline: select Albert Einstein’s pen, keep Marie Skłodowska-Curie as recipient, select First Solvay Council in Brussels (1911), Contemplative tone, Cosmic mood, and the two default motifs: Curvature of Spacetime and Mass-Energy Equivalence. Open the parchment and click Start Writing. Capture the completed output, not the animation alone.

| ID | Test and procedure | Expected behavior / pass criterion |
| --- | --- | --- |
| E01 | Complete the baseline flow from pen selection to finished letter. | A readable letter appears with Curie as recipient and Einstein as writer. No blank or stuck state. This checks flow, not historical accuracy. |
| E02 | From E01, change only Contemplative to Passionate. Inspect output, then explicitly click Inscribe Letter and inspect again after the animation completes. | Selected tone changes and the letter shows a meaningful shift toward the UI’s stated passionate/solidarity tone. A button-state change alone is insufficient. |
| E03 | From E02, keep writer, recipient, Passionate tone, Cosmic mood and motifs; select Engadine Alpine Glacier Expedition (1913). | Output updates to the event/year, adds event-specific substance rather than only substituting a title, and avoids duplicated date text. |
| E04 | From E03, return to the network and choose Rabindranath Tagore; open the parchment. The app automatically changes the event to The Caputh Meeting on Truth & Reality (1930). | Recipient label and salutation change to Tagore; Einstein remains the writer; event/year reflect the newly selected context. This is a flow-consistency check, not an isolated comparison of recipient-specific prose. |
| E05 | On the E04 letter, click Copy Letter and compare clipboard text with the displayed letter. | A confirmation appears and the complete letter is copied accurately. |
| E06 | In an isolated test environment, exercise missing API key and failed-request conditions separately; record which fallback is used. | A usable fallback is displayed and its source is communicated accurately; the user is not left in an indefinite loading state. |
| E07 | Save a letter and its source references for a fixed event. Check dated claims and citations against primary historical sources, recording source links and discrepancies. | Each checked claim is supported or explicitly uncertain; citations resolve to relevant evidence; generated prose is not presented as an authentic archival transcription. |

## Evaluation results

### E01 — Pass for core flow

The Einstein → Curie flow produced a completed, readable letter. The salutation named Marie Skłodowska-Curie and the closing named Albert Einstein. A separate content defect was observed: the first sentence repeated the year as “(1911) (1911)”. The body matched the generic fallback wording previously inspected in the repository; this resemblance does not independently establish the backend response source or the reason for fallback.

Evidence: [baseline screen](evidence/E01-baseline.png) · [rendered-page text](evidence/E01-baseline.txt).

### E02 — Fail for meaningful tone responsiveness in this run

The Passionate button became selected. The completed letter retained the same wording after the change and after explicitly clicking Inscribe Letter. No meaningful shift in tone was observed. This finding applies to the tested output path; it does not prove that all Gemini-generated outputs ignore tone.

Evidence: [Passionate selection](evidence/E02-passionate.png) · [explicit rerun](evidence/E02-passionate-regenerated.png) · [rerun text](evidence/E02-passionate-regenerated.txt). Compare with E01.

### E03 — Partial

The event heading and letter year changed to Engadine Alpine Glacier Expedition / 1913. The letter inserted the new event title, but retained the generic discussion of disciplined observation and first principles. It did not develop the selected expedition context. The first sentence now contained “(1913) (1913)”. Thus field propagation worked, but substantive adaptation and clean formatting did not meet the full criterion.

Evidence: [event-change screen](evidence/E03-event-change.png) · [rendered-page text](evidence/E03-event-change.txt).

### E04 — Pass for recipient/context consistency

The UI recipient and salutation changed to Rabindranath Tagore. The closing still named Albert Einstein. The app selected The Caputh Meeting on Truth & Reality (1930), and that title/year appeared in the letter. The prose remained generic and repeated “(1930) (1930)”; passing this narrow consistency check does not establish historical or relationship-specific quality.

Evidence: [recipient-change screen](evidence/E04-recipient-change.png) · [rendered-page text](evidence/E04-recipient-change.txt).

### E05 — Partial / clipboard payload unverified

Clicking Copy Letter changed the button to “Letter Copied”. The browser automation clipboard read returned an empty string, so the copied content could not be verified through this method. This is not enough evidence to diagnose a product copy failure. Repeat with a manual paste into a blank document and compare with the displayed letter.

Evidence: [copy confirmation page state](evidence/E05-copy-confirmation.txt). The empty automation read is retained separately as E05-copied-letter.txt.

### E06 — Not run

No controlled outage or missing-key test was performed. The production deployment configuration was not changed. Documentation describes fallback branches, and observed text resembles a bundled template, but neither substitutes for a controlled failure test.

### E07 — Not run

No independent historical-source verification was performed in this evaluation. Interface labels such as “Archival Proof” or “Primary Record Draft” are not evidence that the letter’s factual claims or citations have been checked.

## Findings and next iteration

- **Working:** the tested core flow, recipient switching and event-field updates.
- **Needs revision:** meaningful tone response, richer event adaptation, and duplicated year formatting.
- **Needs verification:** clipboard payload, controlled fallback behavior, historical claims and citation traceability.

Proposed next steps: trace and label the actual generation source; make template limitations visible; ensure the active generation path responds to the advertised controls; normalize event-title/year formatting. Then rerun E01–E05 on the revised deployment and append the new results rather than overwriting this record. Run E06 in a safe test environment and E07 against primary sources.

No code fixes or post-fix retests are claimed in this report. One session cannot establish learning outcomes, general usability, model reliability or historical accuracy.

## Evidence and version notes

The evidence folder contains original browser screenshots and rendered-page text captured during this evaluation. Screenshots may show only the current viewport; text files retain additional rendered-page content. This report is version 1.0 of the evaluation record, not a historical system-card version. Keep system cards as a separate submission item.
