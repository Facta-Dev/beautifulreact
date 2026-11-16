---
name: "research"
description: "Investigates an <app> question against primary sources and captures the findings as a cited Markdown brief in the repository."
division: core
---

# <app> Research skill

A reusable workflow for answering a question from primary sources and leaving
a cited brief behind. An agent invokes this skill; the agent supplies the
question, the skill supplies the sourcing discipline. The deliverable is a
file in the repository, not an answer that vanishes with the session.

## When to Activate

- A question about the platform, a library, a spec or an API has to be answered from authoritative sources and the answer is worth keeping.
- An API contract will be implemented against and the contract details matter.
- A version behaviour decides a design and the design needs the citation.
- A claim will end up in a document, a spec, or a commit message.

Do not activate for a question the repository already answers (read the code instead), for a one-line lookup with no lasting value, or for implementation work (research first, then `plan`).

## Core Principles

- Primary sources only: official documentation, the source code itself, specifications, first-party API references. A blog post summarizing a spec is not the spec.
- Follow every claim back to the source that owns it.
- The deliverable is a file in the repository, not a chat answer.
- Every claim carries its source. A claim without a source is a guess.
- The reading runs in a background agent with a fresh context window, so the main thread keeps working.

## Rules

- Anti-hallucination: never fabricate a URL, a version number, an API signature or a quotation. If the source could not be reached, say so instead of filling the gap.
- Every claim needs a source: cite the local file for a repository behaviour and the official platform documentation for a platform constraint.
- Delegate the reading to a background agent with a fresh context window; the agent must cite the source of every claim it writes down.
- Save the brief where the repository already keeps such notes. Match the existing convention; if there is none, put it somewhere sensible and say where.
- One Markdown file per investigation. Do not scatter findings across chat messages.
- Prefer the canonical source over a mirror or a cached copy: the upstream spec page, the upstream repository, the vendor's own reference.
- Record the version or date the claim was true for when the source has versions (a spec version, a release tag, a browser release).
- Distinguish what the source states from what you concluded. Label the inference.
- Never write a real secret, token, cookie value or customer identifier into the brief. Describe the shape, not the value.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| Primary sources over secondary write-ups, each claim cited | upstream `research` skill | 2026 | `skills/engineering/research/SKILL.md` |
| The brief goes to a Markdown file in the repository, following the local convention | upstream `research` skill | 2026 | `skills/engineering/research/SKILL.md` |
| Where the application keeps its own platform notes | `PLAYBOOK_FRONTEND.md`, `docs/` | 2024 | local file |

## Output Format

Deliver, in order:

1. The question and the scope of the investigation.
2. The path of the brief written to disk.
3. The brief itself: findings with a citation per claim, plus a source table.

Brief shape:

```
# The question under investigation

## Findings
- Claim one. (Source: official docs, section, version)
- Claim two. (Source: source code, file and tag)

## Sources
| claim | source | version or date | link |
| --- | --- | --- | --- |

## Open questions
- What could not be verified, and why.
```

State explicitly when a source could not be reached.
