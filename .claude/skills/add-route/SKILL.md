---
name: "<app> Add Route"
description: "Add a route to the <app> web SPA - the path from the URL playbook, its {userType} layout and guard, the core route builder and the code-split - as one gated change."
division: core
---

# <app> Add Route skill

A reusable workflow for adding one route to the `<app>` web SPA. A route is the frontend half of the URL playbook: the path segments mirror `/api/v1/{userType}/{module}/{resource}`, the layout and guard are chosen by `{userType}`, the path is built once in `core`, and the bundle is split per `{userType}`. This skill produces all of those pieces together, so a route never lands without its guard, its builder and its redirect rules.

## When to Activate

- A new screen needs a route in `apps/web/src/routes`.
- A route needs a new `{userType}` segment or a new `{tenantId}` placement.
- A guard, layout or redirect rule is added or changed.
- A reviewer asks whether a proposed route matches the URL playbook.

Do not activate for a purely internal refactor of an existing route with no path, guard or layout change.

## Core Principles

- The path mirrors the playbook. `/{userType}/{module}/{resource}[/{resourceId}[/{subresource}]]` uses the same segments as the backend URL and the SDK namespace.
- One layout and one guard per `{userType}`. `AppLayout`, `AdminLayout`, `PartnerLayout` and `PublicLayout` pair with their role or auth guard, and the admin bundle is never loaded for `/app` users.
- Route builders live in `core`. `routes.app.lead(id)` and `routes.admin.tenantUsers(tenantId)` are the only way a path is produced; a hand-written string is a BLOCK.
- `{tenantId}` appears in the URL only where the playbook includes it, on admin and cross-tenant routes. On `/app` routes the active tenant comes from the session.
- Redirects are explicit. Unauthenticated goes to `/login` with a `returnTo`, authenticated without permission goes to `/403`, and an unknown `{userType}` renders not-found.

## Rules

- Anti-hallucination: every path segment is read from the playbook, never invented; a route that no backend URL backs is a REVISE.
- Every claim needs a source: cite the local playbook for the route contract and the router documentation for the file-based pattern.
- Do not emit the final output as a fenced code block when raw output is expected.
- A route ships with its layout, its guard and its `core` builder together; one without the others is a REVISE.
- A guard is UX, never security; the ViewModel on the other side must still handle `forbidden`.
- Code-split per `{userType}`; a route that pulls the admin chunk into the `/app` bundle is a REVISE.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The route tree mirrors the URL playbook segments | `PLAYBOOK_URLS.md` | 2024 | local file |
| The web route and guard rules | `PLAYBOOK_FRONTEND.md` section 5 | 2024 | local file |
| Route builders live in `core`, never hand-written | `PLAYBOOK_FRONTEND.md` section 5.1 | 2024 | local file |
| File-based routing and route groups | Next.js App Router docs | 2024 | https://nextjs.org/docs/app/building-your-application/routing |

## Output Format

A route change sketch plus a guard checklist. Plain text, not a fenced block:

```
ROUTE  /app/funnels/leads/:leadId

  path:       /app/funnels/leads/:leadId   (segments mirror the URL)
  layout:     AppLayout
  guard:      (authenticated) + RequireUserType('app')
  builder:    core routes.app.lead(leadId)
  code-split: app bundle only
  redirects:  /login?returnTo=... | /403 | not-found

CHECKLIST
  [ ] path segments match the URL playbook
  [ ] layout and guard chosen by {userType}
  [ ] core route builder used, no hand-written string
  [ ] {tenantId} present only where the playbook has it
  [ ] redirect rules explicit and tested
  [ ] code-split per {userType}; gate green
```

Summary line: `add-route: N route(s) added, M guard(s) - verdict: APPROVE | REVISE`.
