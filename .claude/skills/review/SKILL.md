---
name: review
description: "Runs the <app> frontend pre-landing checklist - layer boundaries, SDK contract, route contract, port boundary, gate hygiene and test adequacy - producing a severity-ranked verdict against `make ci`."
division: core
---

# <app> Review

A reusable pre-landing review checklist for the `<app>` React 19 web SPA. An agent invokes this skill; the agent supplies the contextual judgement, the skill supplies the deterministic procedure. Six fixed categories are walked in the same order every time: layer boundary, SDK contract, route contract, port boundary, gate hygiene, and test adequacy. The output is raw structured prose with a verdict, never a fenced block.

## When to Activate

- Before landing any change under `src/`, `tests/` or `package.json`.
- Whenever a request asks for a "review", a "gate check" or a "pre-landing pass".
- A pull request touches a View, a ViewModel, the SDK, a route or a port.
- A follow-up review after fixes from a prior `/review` pass.

Do not activate for documentation-only changes with no source edits. This skill COMPLEMENTS the `code-reviewer` core agent rather than replacing it: the agent reasons freely about intent and tradeoffs, while this skill walks the same six categories in the same order every time.

## Core Principles

- **Checklist, not judgement.** Six fixed categories, always in this order: layer boundary, SDK contract, route contract, port boundary, gate hygiene, test adequacy.
- **The direction is the product.** Any edge that violates `views -> viewmodels -> sdk -> core`, or any `react` import in `core`/`sdk`/`viewmodels`, is a BLOCK; ESLint and the architecture test enforce it, and the review states which one caught it.
- **The SDK is the only thing that talks to the backend.** A View or ViewModel that reaches for `fetch` directly is a BLOCK.
- **Contracts are shared.** Every SDK resource needs a namespace that mirrors the URL playbook, a typed `SdkError` mapping, and a contract test. A resource missing the last one is a BLOCK.
- **Paths are built once.** A hand-written path string outside `src/core/routes.ts` is a BLOCK.
- **Gates are green.** A change that leaves `make ci` red, or a residual placeholder, or a secret in the tree, is a BLOCK.

## Rules

- No fabricated data: do not invent file paths or line numbers. If a file was not read this session, list it under "not reviewed" instead of guessing.
- Every claim needs a source: a finding cites the file and line actually read, or it is tagged "unverified".
- No code-fenced final output where raw output is expected: the verdict is raw structured prose.
- Read each touched file before reporting on it; unread files are listed separately.
- BLOCK only on a real finding: a layer violation, a View or ViewModel that fetches, a hand-written path string, a resource without its contract test, a ViewModel status without coverage, a secret, or a red gate.
- WARN on style-grade issues: a thin but present justification, a duplicated constant that belongs in `core`, a test that could assert more precisely.
- APPROVE only when all six categories show no BLOCK-level finding.

## Research References

Provenance table - every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The React-free walls in `core`, `sdk` and `viewmodels` | `eslint.config.mjs` | 2024 | local file |
| The dependency-direction rules | `tests/architecture/architecture.test.ts` | 2024 | local file |
| The SDK namespace and the typed error envelope | `src/sdk/index.ts`, `src/core/types.ts` | 2024 | local file |
| The route builders | `src/core/routes.ts` | 2024 | local file |
| The ports the shared layers depend on | `src/core/ports.ts` | 2024 | local file |
| The test tiers and the gates | `PLAYBOOK_TESTS.md` | 2024 | local file |

## Output Format

Raw structured prose - not a code fence:

```
### <app> review - pre-landing checklist

Gate: make ci (typecheck + lint + test + build)

Findings:
- [BLOCK|WARN] layer-boundary @ <file>:<line> - <what> | fix: <suggestion>
- [BLOCK|WARN] sdk-contract @ <file>:<line> - <what> | fix: <suggestion>
- [BLOCK|WARN] route-contract @ <file>:<line> - <what> | fix: <suggestion>
- [BLOCK|WARN] port-boundary @ <file>:<line> - <what> | fix: <suggestion>
- [BLOCK|WARN] gate-hygiene @ <file>:<line> - <what> | fix: <suggestion>
- [BLOCK|WARN] test-adequacy @ <file>:<line> - <what> | fix: <suggestion>

Not reviewed (not read):
- <file>

Verdict: APPROVE | WARN | BLOCK
```
