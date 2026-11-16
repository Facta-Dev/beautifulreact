---
name: "domain-modeling"
description: "Sharpens the <app> domain model: challenges conflicting terms, resolves vocabulary into the project glossary, and records an ADR only for decisions that are hard to reverse."
division: core
---

# <app> Domain Modeling skill

A reusable workflow for changing the `<app>` domain model, not just reading
it. An agent invokes this skill; the agent supplies the vocabulary, the skill
supplies the discipline. Changing the model is active work: challenge the
term, sharpen the language, cross-reference the code, and write the
resolution down the moment it crystallises.

## When to Activate

- A term in the request is ambiguous, overloaded, or already means something else in the codebase.
- A requester describes behaviour the code contradicts (partial cancellation is possible, but the code cancels the whole order).
- A glossary entry needs writing, correcting, or splitting.
- A decision was made that a future reader would puzzle over.
- A new capability introduces a concept the project has no word for yet.

Do not activate for reading existing vocabulary (one grep of the glossary is enough), for adding or changing a test (use `tdd`), or for a diff review (use `review`).

## Core Principles

- One word per concept. Pick the best name and list the rejected ones under `_Avoid_`, so the vocabulary does not fork.
- The glossary holds domain language and nothing else. No implementation detail, no spec, no scratch pad.
- Definitions say what a thing IS, not what it does. One or two sentences.
- Only context-specific terms belong. Generic programming vocabulary (timeouts, error types, util patterns) stays out even when the project uses it heavily.
- The code is evidence. When the requester describes behaviour, check the code and surface the contradiction instead of silently picking a side.
- ADRs are offered sparingly. Most decisions are not worth a file.
- Files are created lazily. No empty scaffolding: the glossary appears with the first resolved term, `docs/adr/` with the first ADR.

## Rules

- Anti-hallucination: every claim about what the code does cites the file that was read; never invent a term the requester did not use and the code does not support.
- Every claim needs a source: cite the local file for a repository behaviour and the official platform documentation for a platform constraint.
- Update the glossary inline as terms resolve. Do not batch the writes to the end of the session.
- Call out a conflict with the existing glossary immediately: name the existing definition and the new meaning, then ask which one is intended.
- For a fuzzy or overloaded term, propose one canonical term and its `_Avoid_` list rather than leaving both words alive.
- Stress-test relationships with concrete scenarios that probe edge cases and force the boundaries between concepts to be stated.
- A single-context repo keeps one glossary file. A multi-context repo keeps a `GLOSSARY-MAP.md` at the root pointing at each context's glossary and ADR folder, plus the relationships between contexts.
- Write an ADR only when all three hold: hard to reverse, surprising without context, and the result of a real trade-off. If one is missing, skip the ADR and say which condition failed.
- An ADR is one short paragraph: context, decision, reason. Optional sections (status, considered options, consequences) only when they earn their place. Number sequentially as `docs/adr/NNNN-slug.md`.
- Never write a real secret, token, customer identifier or personal name into a glossary or an ADR. Describe the shape, not the value.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| Glossary terms carry an `_Avoid_` list and define what a thing IS | upstream `domain-modeling` skill | 2026 | `skills/engineering/domain-modeling/GLOSSARY-FORMAT.md` |
| An ADR is warranted only when hard to reverse, surprising, and a real trade-off | upstream `domain-modeling` skill | 2026 | `skills/engineering/domain-modeling/ADR-FORMAT.md` |
| The active discipline (challenge terms, sharpen language, cross-reference the code) | upstream `domain-modeling` skill | 2026 | `skills/engineering/domain-modeling/SKILL.md` |
| Where this kit keeps its own vocabulary and its architecture decisions | `docs/14-glossary.md`, `docs/adr/` | 2024 | local file |

## Output Format

Deliver, in order:

1. The resolved terms: canonical term, its definition, and the `_Avoid_` list.
2. The glossary update, written inline (the repository's existing glossary file, or a new one when the first term resolves).
3. The ADR, or the reason none was written (which of the three conditions was missing).
4. Open questions: terms that are still ambiguous and need a decision from the requester.

Example:

```
domain-modeling: "cancellation" is now canonical for a full Order cancel;
"Avoid: refund, void". Partial cancellation is a different concept and has
no term yet. ADR skipped: the refund policy choice is easy to reverse.
```
