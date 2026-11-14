<p align="center">
  <img src="assets/icon.png" alt="Beautiful React: a cyan atom on a dark field" width="160">
</p>

# Beautiful React

Three standard [Agent Skills](https://agentskills.io) and a lints config that
teach coding agents to write, review, port, and enforce idiomatic React 19 +
TypeScript:

- **`react-best-practices`** loads whenever an agent writes or changes React,
  and steers it toward components, hooks, state, and an architecture that
  survives its second year.
- **`react-review`** reviews existing code — a component, a hook, a feature
  folder, or a diff — and writes a prioritized report where every finding
  cites the rule it breaks and shows the fix.
- **`react-port`** ports Vue, Svelte, Angular, jQuery, vanilla JavaScript, or
  class components to React 19 with the same behavior, porting the original
  tests first so you can prove the two match.
- **`lints/`** is a drop-in ESLint 9 flat config whose layer walls, hooks
  rules, and accessibility rules run in CI.

They work with Claude Code, OpenAI Codex, GitHub Copilot, Cursor, Gemini CLI,
and any other agent that reads the Agent Skills format. Every rule in the
lint config is proven to fire, and every JSX example is reviewed against the
same contract the skills teach.

## Why

React is easy to start and hard to keep clean. The expensive bugs are rarely
"syntax": they are a component that fetches on its own, a state that is
mirrored from props and drifts, a list keyed by index, a clickable `div`, a
`useEffect` that races itself, or an "architecture" that is a folder name
rather than an enforced dependency graph.

Beautiful React is the contract that catches those before review:

- **One headless core, many frontends.** The View renders; the ViewModel
  holds presentation state; the SDK talks to the backend. The walls are lint
  rules, not suggestions.
- **State is a closed set.** One discriminated union per screen
  (`loading | empty | ready | forbidden | error`), never three booleans that
  can contradict each other.
- **Hooks are correctness.** Rules of hooks and exhaustive dependencies are
  errors, not warnings.
- **Accessibility is part of done.** A clickable `div`, an icon-only button
  without a name, or a form field without a label is a finding, not a
  preference.

## Install

### Claude Code

```bash
/plugin marketplace add Facta-Dev/beautifulreact
/plugin install beautiful-react@beautiful-react
```

### OpenAI Codex and ChatGPT

The repository ships a portable `plugin.json` with the `com.openai` interface
block. Point Codex at the repository, or package it with:

```bash
python3 scripts/package-openai-plugin.py --out beautiful-react.zip
```

### Any agent

Copy `skills/react-best-practices`, `skills/react-review`, and
`skills/react-port` into your agent's skills directory. Each skill is a
`SKILL.md` plus a `references/` digest; no runtime, no network.

## A worked example

Without the skill, an agent writes the shape that compiles and tests fine for
a week:

```tsx
// Without the skill: the fetch, the state mirror, and the a11y hole.
import { useEffect, useState } from "react";

export function LeadList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/v1/app/funnels/leads")
      .then((r) => r.json())
      .then((data) => { setLeads(data); setLoading(false); });
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {leads.map((lead, index) => (
        <div key={index} onClick={() => location.assign(`/leads/${lead.id}`)}>
          {lead.name}
        </div>
      ))}
    </div>
  );
}
```

Problems: the View talks to the network, the URL is hand-written, loading is
a boolean with no error/empty state, the key is the index, and the row is a
clickable `div` with no keyboard behavior.

With the skill, the same screen is a View, a ViewModel, and an SDK call:

```tsx
// With the skill: the View renders one state and forwards one event.
import type { ReactElement } from "react";
import { useLeads } from "../viewmodels/useLeads";

export function LeadList(): ReactElement {
  const { state, refresh } = useLeads();
  switch (state.status) {
    case "loading":
      return <p>Loading…</p>;
    case "empty":
      return <p>No leads yet. <button type="button" onClick={refresh}>Refresh</button></p>;
    case "forbidden":
      return <p>You do not have permission to view leads.</p>;
    case "error":
      return <p>Something went wrong. <button type="button" onClick={refresh}>Retry</button></p>;
    case "ready":
      return (
        <ul>
          {state.rows.map((lead) => (
            <li key={lead.id}>
              <a href={`/leads/${lead.id}`}>{lead.name}</a>
            </li>
          ))}
        </ul>
      );
  }
}
```

The ViewModel owns the SDK call, the status union, and the retry; the View
owns only rendering and events. The lint config rejects the first version's
`fetch` in a view, the raw URL, and the clickable `div`.

## The architecture contract

```text
View (JSX)  ──►  ViewModel (hook)  ──►  SDK (plain TS)  ──►  Backend API
     ▲                 │                    │
     └── state/events ─┘                    └── ports: TokenStore, Transport, Clock
                       └── ports: Navigator, Notifier, Permissions
```

| Layer | Owns | Must not import |
|---|---|---|
| **View** | JSX, layout, styling, a11y, event forwarding | the SDK, `fetch`, tokens, business rules |
| **ViewModel** | Presentation state, commands, derived values, SDK orchestration | `react-dom`, `react-native`, `chrome.*`, router internals |
| **SDK** | Typed HTTP client, DTOs, error normalization, auth/tenant headers | React, any UI, any platform global |

The full contract, including feature folders, the error envelope, and the
testing pyramid, is in
[`skills/react-best-practices/references/frontend-architecture.md`](skills/react-best-practices/references/frontend-architecture.md).

## The lints config

[`lints/eslint.config.mjs`](lints/eslint.config.mjs) is a copy-in ESLint 9
flat config. It pins:

- **Layer walls:** `no-restricted-imports` overrides for views, viewmodels
  and the SDK.
- **Hooks:** `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps`.
- **Accessibility:** `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`.
- **Type discipline:** `ban-ts-comment` (a reason is required on
  `@ts-expect-error`; `ts-ignore` and `ts-nocheck` are errors),
  `consistent-type-imports`, `explicit-module-boundary-types`,
  `no-unnecessary-type-assertion`, `switch-exhaustiveness-check`.
- **Async discipline:** `no-floating-promises`, `no-misused-promises`.
- **Silencing:** `@eslint-community/eslint-comments` requires a description
  and rejects an unlimited disable.
- **One logger:** `no-console` is an error.

[`lints/check/`](lints/README.md) is the violation harness: one deliberate file
per rule with a `// expect:<rule>` marker, plus a clean control.
[`scripts/check-lints.sh`](scripts/check-lints.sh) fails if a marked rule
stays quiet, if anything unmarked fires, or if `tsc --noEmit` fails on the
same files. Every rule in the config is proven, not assumed.

## Architecture diagrams

The repository ships eight Archify diagrams under `docs/architecture/`, each one a
standalone HTML page you can open, zoom and read in a browser. The index, with the source
JSON for every diagram, is in
[`docs/architecture/README.md`](docs/architecture/README.md).

| Diagram | What it shows |
|---|---|
| [c4-containers](docs/architecture/c4-containers.html) | The delivery mechanism and the application it produces |
| [services-slices](docs/architecture/services-slices.architecture.html) | The module topology and the lint walls between the layers |
| [auth-algorithm](docs/architecture/auth-algorithm.workflow.html) | The credential algorithm, from the mounted View to the authorized request |
| [outbox-algorithm](docs/architecture/outbox-algorithm.workflow.html) | The async path: the query cache, its retries and the optimistic rollback |
| [auth-sequence](docs/architecture/auth-sequence.sequence.html) | One request end to end, and the single screen state it produces |
| [outbox-sequence](docs/architecture/outbox-sequence.sequence.html) | The async path in time, from a cache miss to a retried mutation |
| [database-dataflow](docs/architecture/database-dataflow.dataflow.html) | Where the data goes: browser storage, the client cache and the Backend API |
| [runtime-lifecycle](docs/architecture/runtime-lifecycle.lifecycle.html) | The runtime states of a screen, and the endings |

The diagrams are conceptual and source-backed: every component and edge traces to this
README, to the frontend architecture reference and to the lint config. Two roles are
adapted for a browser client — there is no client-side outbox and no client-side database,
so the async path is the query cache and the data path is browser storage plus HTTP.

## What it does not do

- The skills contain instructions and reference text only. They make no
  network calls and collect no data ([PRIVACY.md](PRIVACY.md)).
- When a Node.js toolchain is available, the skills run `tsc`, `eslint`, and
  `vitest` on your project; without one, they work from the code alone.
- The lint config is a copy-in unit, not a dependency. It does not install
  itself, and it does not weaken an existing config you merge it into.

## Repository layout

```text
docs/
  architecture/          eight Archify diagrams (C4, slices, auth,
                         outbox, dataflow, lifecycle)
skills/
  react-best-practices/   SKILL.md + references/ (React 19, patterns,
                          architecture, strict TypeScript)
  react-review/           SKILL.md (report format, ranking, waived gates)
  react-port/             SKILL.md (Vue/Svelte/Angular/jQuery/class → React)
lints/
  eslint.config.mjs       the drop-in
  check/                  the violation harness + byte-identical config
scripts/
  check-skill.py          frontmatter, links, evals, manifests
  check-lints.sh          every pinned rule fires
  check-examples.py       TypeScript blocks compile
  examples.json           the ledger of deliberately skipped blocks
  package-openai-plugin.py
tests/                    unit, contracts, integration, e2e
examples/
  review-inventory.md     a full worked review
tests/                    unit, contracts, integration and CI-gate suites
```

## Sources

The skills distill, and cite where they disagree:

- The React 19 documentation (components, hooks, Actions, Suspense, Server
  Components).
- The React patterns the community converged on (composition, controlled
  components, custom hooks, state machines, optimistic updates).
- The TypeScript strict handbook (discriminated unions, branded ids,
  exhaustive switches).
- The facta frontend handbook (`PLAYBOOK_FRONTEND.md`): View → ViewModel →
  SDK, feature folders, the error envelope, the testing pyramid.

## Contributing

Rule proposals are welcome; open an issue with the
[rule template](.github/ISSUE_TEMPLATE/propose-a-rule.yml) and a source. A
rule without a source and a failing example is a preference, not a rule.
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Siblings

Beautiful React is part of the Beautiful series for the facta playbooks:
[beautiful-j2ee](https://github.com/Facta-Dev/beautiful-j2ee),
[beautifulandroid](https://github.com/Facta-Dev/beautifulandroid),
[beautifulcli](https://github.com/Facta-Dev/beautifulcli),
[beautifulextension](https://github.com/Facta-Dev/beautifulextension),
[beautifulgo](https://github.com/Facta-Dev/beautifulgo),
[beautifulios](https://github.com/Facta-Dev/beautifulios),
[beautifulnodejs](https://github.com/Facta-Dev/beautifulnodejs),
[beautifulpython](https://github.com/Facta-Dev/beautifulpython),
[beautifulqt](https://github.com/Facta-Dev/beautifulqt),
[beautifulreactnative](https://github.com/Facta-Dev/beautifulreactnative),
[beautifulrust](https://github.com/Facta-Dev/beautifulrust).

## License

MIT — see [LICENSE](LICENSE).
