# Epistola — System Card

**Version:** 1.0 — first formal system card  
**Date:** 21 September 2026  
**Project author:** Yuwen Wang  
**Documentation:** prepared with Codex from project records, repository implementation, and recorded evaluation  
**Status:** exploratory prototype; limitations remain open  
**Live system:** https://letterwriting.vercel.app  
**Repository snapshot reviewed:** [f08bab3](https://github.com/Wyworange/letter-writer-2/tree/f08bab368546c9e122e08b443ad521c21512ff27)

This card distinguishes design goals, implemented behavior, and observed results. The reviewed repository commit was not independently matched to the live deployment.

## 1. Design intention and intended use

Epistola explores how writing a letter can help a person enter another historical perspective. Instead of only assisting with prose, it connects a historical persona, their relationships, a period writing environment, and the social and material context of correspondence.

The intended experience is exploratory: choose a writer and recipient, select an event and expressive settings, then read a historical-style letter and a modern comparative interpretation. The central personas are Albert Einstein, Marie Skłodowska-Curie, and Rabindranath Tagore; the repository also includes Leonardo da Vinci and Benjamin Franklin.

The prototype is intended for people exploring historical correspondence and for design demonstration. Learning gains and suitability for a particular learner population have not been evaluated.

**Output should be understood as creative historical interpretation. It is not an authenticated archival letter, a verified quotation, or a substitute for historical research.**

## 2. Inputs, outputs and information boundaries

| Area | Current implementation |
| --- | --- |
| User choices | Writer, recipient, event, tone, mood and selected keywords/motifs. |
| Context source | Historical persona, relationship, event and keyword records bundled as static TypeScript data. |
| Data sent to the generation endpoint | Selected figure, recipient, event, tone, mood and keyword objects. |
| Information included in the model prompt | Writer name, country, era and city; recipient name, title, location, relationship and transit information; event title/year/context; tone and mood descriptions; keyword labels and historical-fact strings. |
| Requested output | Salutation, date/location, body paragraphs, closing, postscript, and a modern breakdown covering communication speed, etiquette, materials and source references. The schema also includes a mirrored-script field. |
| Not supplied to the runtime model | Live archive search results, a retrieved and verified primary-source corpus, stored prior letters, or the interface reference images used during design. |
| Knowledge beyond the prompt | Model-generated content can draw on pretrained knowledge and inference; it is not limited to verified facts in the supplied records. |

The UI uses images and historical scenes for presentation. These are distinct from the textual information passed to the letter-generation model.

## 3. How the system works

1. The browser loads bundled data and stores user selections in React state.
2. Persona selection creates an immediate client-template preview while a server request runs. Writing-setting changes use a 250 ms debounce.
3. The browser sends selections to `POST /api/generate-letter`.
4. The active backend is either the Express server or the Vercel function. It checks required inputs and, when configured, requests Gemini output.
5. The backend parses returned JSON. Depending on the failure or configuration state, a server or client template supplies a fallback.
6. The interface renders the letter and provides reading, adjustment and copy controls. Documentation also describes a modern-analysis view.

**Deterministic:** authored navigation/state rules, selection handling, prompt assembly, parsing, fallback branching and template composition.  
**Probabilistic:** Gemini's generated wording and analysis, including generated citations.  
Here, deterministic describes authored processing and content rules, not timestamps or the availability of an external service.

See the [system diagram](SYSTEM_DIAGRAM.md) for deployment-specific flows.

## 4. Model instructions and configuration

The Express implementation includes this instruction excerpt:

> Write strictly in the first-person voice ("I") of the selected historical persona.

It also asks for period vocabulary, grounding in the chosen event/tone/mood/keywords, no modern anachronisms, and a separate modern comparative analysis. These are intended constraints, not guarantees of compliance or accuracy.

Both backends request JSON and configure a temperature of 0.75. They differ in their prompts and recovery behavior:

| Backend | Instructions and configured model identifiers | Fallback behavior |
| --- | --- | --- |
| Express / Node.js (`server.ts`) | Historical system instruction plus detailed parameter/output prompt. Configured candidates: `gemini-3.8-flash`, `gemini-flash-latest`, `gemini-3.1-flash-lite`. | Empty responses or recognized capacity/quota errors can advance to another candidate. Missing key, exhausted candidates, parsing failures or other model errors lead to persona-specific server templates. |
| Vercel (`api/generate-letter.ts`) | Shorter parameter/output prompt, without the Express `systemInstruction` field. Configured model: `gemini-3.8-flash`. | Missing key or empty response uses a generic server template. Exceptions return HTTP 500, which the browser can catch and replace with a client template. |
| Browser | Local authored templates; no model needed for this path. | Network errors, non-2xx responses or unreadable response JSON trigger client fallback. |

Model names above are settings found in the repository; model availability and a successful live Gemini call were not verified. The UI's model label is static and cannot establish which Express candidate actually responded.

## 5. Data handling and storage

- Generation requests send the selected context to the backend and, when the model path runs, to Google's Gemini service.
- The implementation keeps the API key on the server.
- The documented prototype has no authentication, application database, persistent letter history, vector search or live archive retrieval. Selections and letters are held in React memory and lost on refresh.
- No audit of hosting/provider logs, retention or model-provider data policies was performed. In-memory application state does not establish that no infrastructure logging occurs.

## 6. Evaluation evidence

The [evaluation set and results](docs/evaluation/Evaluation.md) record an assistant-operated browser session on 21 September 2026. It was not a participant study.

| Case | Recorded result |
| --- | --- |
| E01: baseline letter flow | Pass for flow: Einstein → Curie produced a readable completed letter. A duplicated year was observed. |
| E02: change tone | Fail for meaningful responsiveness in this run: Passionate became selected, but letter wording remained unchanged, including after an explicit rerun. |
| E03: change event | Partial: title/year changed, but substantive event adaptation was limited and the year repeated. |
| E04: change recipient | Pass for narrow consistency: recipient label and salutation changed to Tagore; writer remained Einstein and context updated. |
| E05: copy letter | Partial: confirmation appeared, but clipboard content was not verified by the automation method. |
| E06: controlled fallback | Not run. |
| E07: independent historical verification | Not run. |

The observed letter matched generic fallback wording in the repository. This is evidence of template-like output, not independent proof of the actual backend response source or the cause of fallback. No aggregate accuracy score, learning gain, general reliability rate or historical-validity claim is supported by this evaluation.

## 7. Known limitations and risks

- Generated details and citations are not automatically checked against historical sources; confident prose may contain unsupported claims or anachronisms.
- Historical voices and relationships are simplified through authored records and model interpretation. Representational accuracy has not been assessed.
- The label `historical-archive-engine` refers to bundled templates, not a connected archive. Such labels can overstate the provenance of output.
- Template behavior may not honor every tone or mood control; the recorded tone comparison found no meaningful change.
- Express and Vercel do not share the same full instruction contract.
- JSON parsing is present, but runtime schema validation is absent. Client requests have no explicit timeout or cancellation.
- Repeated event-year text was observed. Clipboard payload, failure recovery under controlled conditions and historical claims still require verification.

Fallbacks are an implemented continuity mechanism. They do not resolve historical accuracy, expressive variation or source transparency.

## 8. Planned improvements and update criteria

Proposed work, not completed fixes:

1. Trace the generation source and label model/template output clearly.
2. Align backend instructions and make the advertised controls meaningful across output paths.
3. Normalize event-title/year formatting; add runtime output validation and request timeout/cancellation.
4. Retest E01–E05 after changes, exercise E06 in an isolated environment, and perform E07 against primary sources.
5. Evaluate task clarity with people before making broader usability or learning claims.

Update this card when inputs, prompts, model configuration, fallback rules, storage, intended use or evaluation findings change. Record the new version and its evidence; retain prior versions through Git history or explicit snapshots.

## Version history

| Version | Date | Basis and change |
| --- | --- | --- |
| 1.0 | 21 September 2026 | First formal card compiled from Week 3/4 records, current repository documentation/code and evaluation v1.0. No earlier formal system-card versions were supplied or fabricated. |

The earlier presentation excerpt was a documentation summary, not a separately preserved historical card version.

## Sources

- [Week 3 design process](https://tdf-website-eight.vercel.app/week-3)
- [Week 4 implementation documentation](https://tdf-website-eight.vercel.app/week-4)
- [Project README](README.md)
- [System diagram](SYSTEM_DIAGRAM.md)
- [Express instructions and generation path](server.ts)
- [Vercel generation handler](api/generate-letter.ts)
- [Evaluation record and evidence](docs/evaluation/Evaluation.md)
