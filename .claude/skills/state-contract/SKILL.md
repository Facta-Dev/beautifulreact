---
name: state-contract
description: "Write or verify a ViewModel in the <app> frontend - the state and commands, the explicit status, ports for side effects and no platform global - so it stays shared across web and native."
division: client
---

# <app> State Contract skill

A reusable workflow for writing or verifying one ViewModel in the `<app>` frontend. A ViewModel is a hook that returns plain state and commands with no JSX, exposes an explicit status, and reaches side effects through ports. This skill produces the hook shape, the status mapping and the port wiring together, so a ViewModel never leaks a platform concern and stays identical across web and native.

## When to Activate

- A new screen or significant component needs a ViewModel.
- An existing ViewModel's status handling, port wiring or query keys changed.
- A reviewer asks whether a ViewModel runs without a DOM, a native runtime or `chrome`.
- A platform concern is suspected to have leaked into a shared ViewModel.

Do not activate for a pure presentational component with no state and no SDK, that is a View concern, not a ViewModel.

## Core Principles

- The return shape is state and commands. The View receives plain data and functions, mapped through a mapper such as `toLeadVM` when a presentation shape is needed, never a raw SDK object.
- Status is explicit. The ViewModel exposes `loading`, `ready`, `empty`, `forbidden`, `not-found`, `error` and `offline`, and the View renders all of them.
- Side effects are ports. Navigation, toasts and analytics go through `Navigator`, `Notifier` and `Analytics` from the services context, never a singleton import.
- No platform global. The ViewModel imports no `react-dom`, no `react-native`, no router library and no View.
- Server state is keyed like the URL. Query keys follow `['userType','module','resource', tenantId?, params]` so invalidation is predictable.

## Rules

- Anti-hallucination: the statuses, the ports and the query keys must be named from the playbook and the SDK surface, never invented.
- Every claim needs a source: cite the local playbook for the ViewModel contract and the SDK types file for the error envelope.
- Do not emit the final output as a fenced code block when raw output is expected.
- Every SDK call takes an `AbortSignal` and cancels on unmount.
- A `forbidden`, `offline` or `error` status is exposed and mapped, not swallowed; the View must be able to render each.
- A ViewModel test must run without a DOM, a native runtime or `chrome`; if it needs one, a platform concern leaked in, and that is a REVISE.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The ViewModel returns state and commands with no JSX | `PLAYBOOK_FRONTEND.md` section 4.1 | 2024 | local file |
| The explicit status enum a ViewModel exposes | `PLAYBOOK_FRONTEND.md` section 4.1 | 2024 | local file |
| Side effects go through ports from the services context | `PLAYBOOK_FRONTEND.md` section 4.1 | 2024 | local file |
| The query-key convention mirrors the URL | `PLAYBOOK_FRONTEND.md` section 4.3 | 2024 | local file |
| React hooks for the ViewModel shape | React hooks reference | 2024 | https://react.dev/reference/react/hooks |

## Output Format

A ViewModel sketch plus a status checklist. Plain text, not a fenced block:

```
VIEWMODEL  packages/viewmodels/funnels/useLeadDetailViewModel.ts

  return:     status, lead (mapped), canEdit, moveToStage, isMoving
  status:     loading | ready | empty | forbidden | not-found | error | offline
  ports:      Navigator, Notifier, Analytics via useServices
  query key:  ['app','funnels','leads', leadId]
  cancel:     every call takes AbortSignal; cancelled on unmount

CHECKLIST
  [ ] returns state and commands, no JSX, no platform global
  [ ] raw SDK object mapped through a mapper
  [ ] every status exposed and rendered by the View
  [ ] side effects through ports, not singletons
  [ ] query keys mirror the URL convention
  [ ] hermetic test covering every status; gate green
```

Summary line: `state-contract: N ViewModel(s) written, M status(es) - verdict: APPROVE | REVISE`.
