---
name: sdk-contract
description: "Add or verify an SDK resource in the <app> frontend - namespace mirrors the URL playbook, types generated from OpenAPI, transport interceptors and the typed SdkError envelope - as one gated change."
division: client
---

# <app> SDK Contract skill

A reusable workflow for adding or verifying one SDK resource in the `<app>` frontend. The SDK is a typed mirror of the URL playbook: `sdk.{userType}.{module}.{resource}` maps 1:1 to `/api/v1/{userType}/{module}/{resource}`, the resource methods are `list`, `get`, `create`, `update`, `delete` plus verb methods for transitions, and the types are generated from the backend OpenAPI contract. This skill produces all of those pieces together, so a resource never lands half-wired or with a hand-written DTO.

## When to Activate

- A new SDK resource is needed for an existing or new backend route.
- An existing resource's shape changed after a contract update.
- A reviewer asks whether the SDK namespace matches the URL playbook.
- A transport, interceptor or error mapping change is proposed.

Do not activate for a purely local, in-process helper that is not a backend call, that is a function, not a resource.

## Core Principles

- One namespace, one URL. `sdk.{userType}.{module}.{resource}` and `/api/v1/{userType}/{module}/{resource}` are the same segments, and a path is built in exactly one place.
- Types are generated. The DTOs come from the OpenAPI contract in `packages/sdk/src/types`; a hand-written DTO is a BLOCK, and a contract change surfaces as a typed compile error.
- The tenant argument is explicit. `sdk.admin.tenants.users.list(tenantId, ...)` takes the tenant first; on `/app` routes the active tenant comes from the session.
- Interceptors run in order. Auth with single-flight refresh, tenant header, correlation id, idempotency key, retry with backoff on idempotent calls, then error mapping.
- Errors are values. The backend envelope maps to a typed `SdkError`, and a ViewModel never sees raw HTTP.

## Rules

- Anti-hallucination: the namespace, the method set and the DTO must match the playbook and the generated types; never invent a resource the contract does not back.
- Every claim needs a source: cite the local playbook for the namespace and the generated types file for the DTO.
- Do not emit the final output as a fenced code block when raw output is expected.
- A new resource ships with a contract test that asserts the request URL, method and headers.
- Every call accepts an `AbortSignal` so the ViewModel can cancel on unmount.
- Do not hand-write a DTO; import it from the generated types. A hand-written DTO is a REVISE.
- Versioning: the SDK targets one API version; a breaking change creates a `v2` resource alongside `v1` during the deprecation window.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The SDK namespace mirrors the URL playbook | `PLAYBOOK_FRONTEND.md` section 3.1 | 2024 | local file |
| Types are generated from the OpenAPI contract | `PLAYBOOK_FRONTEND.md` section 3.1 | 2024 | local file |
| Transport interceptors and their order | `PLAYBOOK_FRONTEND.md` section 3.2 | 2024 | local file |
| The typed `SdkError` envelope | `PLAYBOOK_FRONTEND.md` section 3.4 | 2024 | local file |
| The fetch API used by the transport | MDN fetch | 2024 | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |

## Output Format

An SDK change sketch plus a test checklist. Plain text, not a fenced block:

```
RESOURCE  sdk.app.funnels.leads

  namespace:   sdk.app.funnels.leads  ->  /api/v1/app/funnels/leads
  methods:     list, get, create, update, delete
  types:       generated from OpenAPI (packages/sdk/src/types)
  tenant:      active tenant from session (app route)
  interceptors: auth, tenant, correlation, idempotency, retry, error map
  errors:      typed SdkError, never raw HTTP

CHECKLIST
  [ ] namespace matches the URL playbook
  [ ] types imported from the generated file, no hand-written DTO
  [ ] every call accepts an AbortSignal
  [ ] interceptor order preserved
  [ ] error envelope maps to SdkError
  [ ] contract test asserts URL, method and headers; gate green
```

Summary line: `sdk-contract: N resource(s) added, M method(s) - verdict: APPROVE | REVISE`.
