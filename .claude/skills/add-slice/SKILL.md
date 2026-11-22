---
name: add-slice
description: "Scaffold a new feature slice in the <app> frontend - the view, the shared ViewModel, the SDK resource and the route - wired to the route contract with the fake-backed test gate, as one change."
division: core
---

# <app> Add Slice skill

A reusable scaffolding workflow for adding a new feature slice to the `<app>` frontend. An agent (for example the planner or the architect role) invokes this skill to produce the view, the ViewModel, the SDK resource and the route together, so a new slice never lands without its registration and its boundary discipline. The output is a wiring sketch plus a boundary checklist, in plain text.

## When to Activate

- A new vertical slice (`apps/web/src/features/<scope>/` plus `packages/viewmodels/<scope>` plus an SDK resource) is requested.
- An existing feature needs a new SDK resource or a new route, and the dependency direction must be verified after the wiring.
- A reviewer asks for the slice plus wiring bundle before approving an internal-structure change.

Do not activate for an in-slice refactor that adds no new slice and no new cross-boundary dependency, that is ordinary implementation work.

## Core Principles

- The slice is the unit of reuse. A new slice spans the view in `apps/web/src/features/<scope>/views`, the shared ViewModel in `packages/viewmodels/<scope>`, the SDK resource in `packages/sdk/src/resources/`, and the route in `apps/web/src/routes`.
- The dependency direction is invariant. Views import ViewModels and the UI kit, never the SDK; ViewModels import the SDK and core ports, never a platform global; the SDK imports core ports only. A wire that reverses this is a BLOCK.
- Ports are consumer-defined. The ViewModel receives `Navigator`, `Notifier` and `Analytics` through the services context; the SDK receives `TokenStore`, `Transport` and `Clock` at construction.
- One feature equals one backend slice. The feature folder, the URL module, the SDK namespace and the permission prefix share one name.
- The route mirrors the playbook. The path `/{userType}/{module}/{resource}` and the SDK namespace `{userType}.{module}.{resource}` are the same segments, and route builders live in `core`.

## Rules

- Anti-hallucination: do not invent file paths, port names or import edges that are not in the tree. Every scaffolding step cites a file that exists or is being added.
- Every claim needs a source: cite the local playbook for a boundary rule and the official React or TanStack documentation for a platform behaviour.
- Do not emit the final sketch as a fenced code block when raw output is expected, the sketch is plain text with labelled sections.
- A new slice must appear in the view, the ViewModel, the SDK resource and the route together; one without the others is a REVISE.
- A View that imports the SDK is a BLOCK, and a ViewModel that imports `react-dom` is a BLOCK.
- Types are generated from the OpenAPI contract; a hand-written DTO in a new slice is a BLOCK.
- A slice that needs a new permission, a new tenant segment or a new durable record is out of scope for this skill, route it to the permission or state work first.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The View to ViewModel to SDK dependency direction | `PLAYBOOK_FRONTEND.md` section 1.1 | 2024 | local file |
| The route contract the slice mirrors | `PLAYBOOK_URLS.md` | 2024 | local file |
| The monorepo layout and feature folder convention | `PLAYBOOK_FRONTEND.md` section 2 | 2024 | local file |
| React hooks for the ViewModel and services context | React hooks reference | 2024 | https://react.dev/reference/react/hooks |
| TanStack Query key convention | TanStack Query docs | 2024 | https://tanstack.com/query/latest/docs/framework/react/guides/query-keys |

## Output Format

A wiring sketch plus a boundary checklist, anchored to the slice root. Plain text, not a fenced block:

```
SLICE  <scope>

  files:
    apps/web/src/features/<scope>/views/     -> the screen view
    packages/viewmodels/<scope>/use...ViewModel.ts -> state + commands
    packages/sdk/src/resources/<module>/<resource>.ts -> typed API client
    apps/web/src/routes/...                  -> the route + guard

  deps:
    packages/core/     -> ports and route builders
    packages/sdk/src/types/ -> generated from OpenAPI
    packages/ui-web/   -> presentational components

  direction:
    views        -> viewmodels + ui-web (never sdk)
    viewmodels   -> sdk + core ports (never react-dom, chrome)
    sdk          -> core ports (never react)

CHECKLIST
  [ ] view, ViewModel, SDK resource and route all added
  [ ] permission prefix and URL module share the slice name
  [ ] dependency direction inward; no cross-feature import
  [ ] types generated, no hand-written DTO
  [ ] ViewModel statuses all exposed; test covers each
  [ ] gate green: typecheck + lint + test + build
```

Summary line: `add-slice: N slice(s) scaffolded, M wiring step(s) - verdict: APPROVE | REVISE`.
