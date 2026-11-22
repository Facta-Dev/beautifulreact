---
name: plan
description: "Writes the <app> plan document under docs/plans/ - problem, constraints, design, files, risks, tests and gate commands - as an ordered, verifiable sequence that ends at `make ci`."
division: core
---

# <app> Plan

A reusable workflow for producing the plan document of a change in the `<app>` React 19 web SPA. The plan is a sequence of gate-checked steps, not a wish list: each step names the files it touches, the order it must land in, and the command that proves it. The output is the plan document itself plus the ordered step list.

## When to Activate

- A feature request needs to be broken into ordered steps before any code is written.
- A change touches more than one layer - a View, a ViewModel, the SDK or a route.
- A change adds a port, an SDK resource or a route, and the ordering matters.
- A reviewer asks "what is the order here?" before approving the work.

Do not activate for a single-file, single-layer change that one engineer can sequence in their head - the plan for that is the diff.

## Core Principles

- Every step is verifiable. A step without a named gate command is not a step; "test it" is not a command.
- Order is part of the plan. A `core` type lands before the SDK resource that uses it, the SDK resource lands before the ViewModel that calls it, the ViewModel lands before the View that renders it.
- The blast radius is stated up front: which layers are touched, which are deliberately not, and what the port and route consequences are.
- The smallest correct change. The plan extends the existing seams - the existing port, the existing route builder, the existing SDK namespace - instead of introducing a new package, port or dependency.
- The plan ends at `make ci`. Typecheck, lint, test and build are the definition of done; a plan that stops earlier is incomplete.

## Rules

- Anti-hallucination: every file path in the plan must exist or be created by a named step; never cite a path that was not read.
- Every claim needs a source: cite the local file or playbook for a repository rule; cite the official documentation for a platform behaviour.
- Do not emit the final plan as a fenced code block when raw output is expected - the document is plain Markdown text.
- Each step names exactly one gate command, so a failure points at the step that caused it.
- A plan never proposes a `react` import in `core`, `sdk` or `viewmodels`, never a View that imports the SDK, and never a hand-written path string.
- A plan that changes a shared shape includes the `core` type change, the SDK resource and the tests as explicit steps.
- Do not schedule work the request does not need: no speculative refactors, no future-proofing, no second abstraction.

## Research References

Provenance table - every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The layer rules and the dependency direction | `PLAYBOOK_FRONTEND.md` | 2024 | local file |
| The Vite build emits the SPA bundle | `vite.config.ts` | 2024 | local file |
| The SDK namespace and the URL playbook | `PLAYBOOK_URLS.md` | 2024 | local file |
| The gate commands and what each one proves | `Makefile`, `package.json` | 2024 | local file |
| The enforced React-free walls | `eslint.config.mjs` | 2024 | local file |
| The dependency-direction test | `tests/architecture/architecture.test.ts` | 2024 | local file |

## Output Format

The plan document, written to `docs/plans/<slug>.md` (the directory is created on demand), then the ordered step list. Plain Markdown - not a fenced block:

```
# Plan - <title>

## Problem
One paragraph: what is missing today and what changes for the user.

## Constraints
The rules that bound the solution: the layer boundaries, the port set, the
SDK namespace, the route contract, the gates.

## Design
The chosen approach and the alternatives rejected, with the reason.

## Files
The files created and edited, with one line each.

## Risks
What can go wrong, how it is detected, and what happens if it does.

## Tests
The tests to write, per tier, and the red-first order.

## Steps
1. <file> - <what changes>
   Gate: <command>
2. ...

## Definition of done
make ci green; npm run evals green; docs updated where the public
surface changed.
```

Summary line: `plan: <slug> - N step(s), M risk(s) - verdict: READY | NEEDS-CLARIFICATION`.
