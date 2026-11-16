---
name: research
description: "Delegate to the research skill for the <app> frontend."
division: core
---

# /research

## Delegate

Delegate to the **research** skill.

Activate when a question about the `<app>` application has to be answered from
authoritative sources and the answer is worth keeping: an API contract to
implement against, a platform behaviour that decides a design, a claim that
will land in a document or a commit message. The skill delegates the reading
to a background agent, requires primary sources over summaries, cites every
claim, and writes the findings to a Markdown brief in the repository.

Do not activate for a question answered by reading the codebase, for a
one-line lookup, or for implementation work (research first, then `plan`).
