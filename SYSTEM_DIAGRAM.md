# Letter Writer 2 — System Diagram

Based on the current repository implementation: users select a historical figure, a recipient, and writing settings. The system generates a historical-style letter alongside an analysis from a modern perspective.

![Visual architecture overview](docs/system-architecture.svg)

The overview groups the browser, alternative backends, and generation engines. The detailed flow below shows the exact error branches.

## Detailed Architecture

```mermaid
flowchart TD
    User[User] --> UI[Persona and scene selection / Relationship network / Writing desk]

    subgraph Browser[Browser · React 19 + TypeScript]
        UI --> State[App.tsx state management<br/>Writer, recipient, event, tone, mood, keywords]
        Data[Static historical data<br/>historicalData / triadData / writerReceiverInteractions] --> UI
        Data --> State
        Assets[Images and scene assets] --> UI
        State --> Request[Generation request<br/>250 ms debounce for writing setting changes]
        Local[Client template generator<br/>letterGenerator.ts] --> Letter[GeneratedLetter<br/>Letter content + modernBreakdown]
        State -->|Populate immediately on persona selection| Local
        Request -->|Network error / non-2xx / JSON parsing failure| Local
        Letter --> Desk[WritingDesk<br/>Letter display, modern analysis, copy text]
    end

    Request -->|POST /api/generate-letter| Route{Deployment mode}

    subgraph Backend[Backend · Two alternative deployment paths]
        Route -->|Node server| Express[server.ts · Express<br/>Check writer and recipient<br/>System prompt + writing parameters]
        Route -->|Vercel| Function[api/generate-letter.ts<br/>Check method, writer, and recipient<br/>Writing parameter prompt]
        Express -->|API key available| SDK[GoogleGenAI SDK<br/>Request JSON output]
        Function -->|API key available| SDK
        Express -->|No key / empty response / parsing or API error| ServerTemplate[Persona-specific server templates]
        Function -->|No key / empty response| GenericTemplate[Generic server template]
        Function -->|API or parsing error| Error[HTTP 500]
        SDK --> Parse[Each handler parses JSON<br/>Add generationSource]
    end

    SDK --> Gemini[External Gemini API]
    Gemini -->|Model response| SDK
    Parse -->|HTTP JSON response| Letter
    ServerTemplate --> Letter
    GenericTemplate --> Letter
    Error -->|Frontend catches error| Local

    classDef browser fill:#eff6ff,stroke:#3b82f6,color:#0f172a
    classDef backend fill:#f5f3ff,stroke:#8b5cf6,color:#0f172a
    classDef fallback fill:#ecfdf5,stroke:#10b981,color:#0f172a
    classDef external fill:#fffbeb,stroke:#f59e0b,color:#0f172a
    classDef failure fill:#fff1f2,stroke:#f43f5e,color:#0f172a
    class UI,State,Data,Assets,Request,Letter,Desk browser
    class Express,Function,SDK,Parse,Route backend
    class Local,ServerTemplate,GenericTemplate fallback
    class Gemini external
    class Error failure
```

## Generation Sequence

```mermaid
sequenceDiagram
    actor User
    participant UI as Browser / App.tsx
    participant Local as Client template
    participant API as Express OR Vercel
    participant AI as Gemini API
    User->>UI: Select persona and recipient
    UI->>Local: Create immediate preview
    Local-->>UI: Template letter
    UI->>API: POST /api/generate-letter
    alt API key available
        API->>AI: Prompt + writing parameters
        AI-->>API: Model response or error
        Note over API: Parse JSON; apply deployment-specific error handling
    else No API key
        Note over API: Generate server template
    end
    alt Successful HTTP response with parseable JSON
        API-->>UI: Letter + modernBreakdown
    else Request fails, non-2xx, or invalid JSON
        UI->>Local: Generate fallback letter
        Local-->>UI: Template letter
    end
    UI-->>User: Display letter and modern analysis
```

## Fallback Rules

| Condition | Express | Vercel |
| --- | --- | --- |
| No API key or empty model response | Persona-specific server template | Generic server template |
| Model call or JSON parsing fails | Persona-specific server template | HTTP 500, then client template |
| Missing writer or recipient | HTTP 400, then client template | HTTP 400, then client template |
| Network failure or unreadable HTTP JSON | Client template | Client template |

Client fallback assumes the UI still has valid persona and recipient selections. An unresponsive request has no explicit timeout in the current implementation.

## Core Data Flow

1. The frontend reads personas, relationships, historical events, and keywords from static TypeScript data and stores user selections in React state.
2. Selecting a persona immediately populates a letter using a client template, then requests server generation. Changes to writing settings use a 250 ms debounce.
3. The frontend sends `figure`, `recipient`, `event`, `tone`, `mood`, and `keywords` to the same-origin generation endpoint.
4. When `GEMINI_API_KEY` is configured, the backend calls Gemini and returns the JSON result. Errors and missing configuration follow the fallback branches shown above.
5. `WritingDesk` displays the salutation, date and location, body, closing, and postscript, alongside analysis of communication speed, etiquette, material costs, and historical sources. Users can copy the letter.

## Deployment and Implementation Boundaries

| Area | Current implementation |
| --- | --- |
| Local development | `npm run dev` starts Express on port 3000; Vite serves the frontend as middleware |
| Node production deployment | The build produces frontend assets in `dist` and `dist/server.cjs`; run the server with `NODE_ENV=production` so Express serves static files |
| Vercel deployment | Static frontend with `api/generate-letter.ts`; `vercel.json` configures API and SPA routing rewrites |
| Model configuration | Both backend files hardcode `gemini-3.8-flash`; this documents the code configuration, without verifying the model's availability |
| Prompt differences | Express sets `systemInstruction`; the Vercel handler does not set this field |
| Data and storage | Historical material is embedded in source code; the current flow has no database, vector retrieval, live archive queries, or persistent letter storage |
| Output constraints | JSON MIME type and prompt-defined fields, followed by `JSON.parse`; no runtime schema validation |
| Source labels | Model output uses `gemini-agent`; template output uses `historical-archive-engine`, which does not indicate an actual archive database connection |

## Source Files

- [Frontend state and requests](src/App.tsx)
- [Letter display](src/components/WritingDesk.tsx)
- [Express backend](server.ts)
- [Vercel handler](api/generate-letter.ts)
- [Client templates](src/utils/letterGenerator.ts)
- [Data types](src/types.ts)
