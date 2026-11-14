# beautifulreact — Architecture Diagrams

Rendered with [Archify](https://github.com/tt-a1i/archify). Each entry is a standalone,
explorable HTML page (inline SVG, dark/light themes, live motion) paired with its source
JSON candidate. The set documents the React 19 + TypeScript contract this repository teaches
and enforces: the View → ViewModel → SDK → Backend API layers, the lint walls between them,
the closed set of screen states, the error envelope, and the delivery mechanism — three
Agent Skills, a drop-in ESLint 9 flat config and the CI gates that prove every pinned rule
fires.

| Diagram | Type | What it shows | JSON | HTML |
|---|---|---|---|---|
| c4-containers | architecture | Container view: the agent runtime, the three skills, the ESLint drop-in and the CI gates on the delivery side; the React app, the shared SDK, the injected ports, browser storage and the Backend API on the runtime side — with the layer walls and the delivery mechanism framed on top | [json](c4-containers.json) | [html](c4-containers.html) |
| services-slices | architecture | Module topology: `src/app` → `src/features/<feature>` → `src/sdk` → `src/core`, with `lib/` and `ui/` as the code promoted out of a feature, the query layer as the owner of server state, and the lint walls plus the test suite as the enforcement that keeps the edges honest | [json](services-slices.architecture.json) | [html](services-slices.architecture.html) |
| auth-algorithm | workflow | The credential algorithm: the View mounts, the ViewModel calls the SDK, the SDK attaches the auth/tenant/correlation headers it read from the TokenStore, the server authorizes, the envelope is normalized and exactly one screen state is rendered — with the single 401 refresh-and-retry | [json](auth-algorithm.workflow.json) | [html](auth-algorithm.workflow.html) |
| outbox-algorithm | workflow | The async path, adapted from a transactional outbox: the query key, the in-flight dedupe, the fetch, the cache write, the invalidation by prefix and the optimistic write with its snapshot and rollback | [json](outbox-algorithm.workflow.json) | [html](outbox-algorithm.workflow.html) |
| auth-sequence | sequence | One request end to end: the View never leaves its layer, only the SDK touches the credential and the network, and the answer — 200, 401, 403 or an error envelope — becomes exactly one screen state | [json](auth-sequence.sequence.json) | [html](auth-sequence.sequence.html) |
| outbox-sequence | sequence | The async path in time: the first load from a cache miss to ready, then a mutation with an optimistic write, an invalidation, a refetch and a failed retry that restores the snapshot | [json](outbox-sequence.sequence.json) | [html](outbox-sequence.sequence.html) |
| database-dataflow | dataflow | Where the data goes: browser storage (an httpOnly cookie or an in-memory token) → ViewModel → SDK → Backend API, with the in-memory query cache as the only other client-side state and the backend as the system of record | [json](database-dataflow.dataflow.json) | [html](database-dataflow.dataflow.html) |
| runtime-lifecycle | lifecycle | The runtime states of a screen: mount → render → SDK request → the response gate → ready, with the empty, rejected, error and unmount endings and the transitions back into a retry | [json](runtime-lifecycle.lifecycle.json) | [html](runtime-lifecycle.lifecycle.html) |

The diagrams are conceptual and source-backed: every component, boundary and edge traces to
this repository's `README.md`, to
[`skills/react-best-practices/references/frontend-architecture.md`](../../skills/react-best-practices/references/frontend-architecture.md)
and to [`lints/eslint.config.mjs`](../../lints/eslint.config.mjs). Two roles are adapted for a
browser client and none is invented: **outbox** is the query cache and its retry path — a
browser has no durable queue, so nothing is spooled for later delivery — and
**database-dataflow** is browser storage plus HTTP, with no client-side database. The
**auth** role is the SDK's TokenStore and credential boundary; the backend remains the
authority for every request.

Authored with Archify, sibling set of the facta Beautiful series.
