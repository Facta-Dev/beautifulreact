---
name: "grilling"
description: "Grills an <app> plan, decision or idea before implementation: assumptions, failure modes and scope, asked round by round until nothing is left silently assumed."
division: core
---

# <app> Grilling skill

A reusable workflow for stress-testing a plan before anyone implements it. An
agent invokes this skill; the agent supplies the domain judgement, the skill
supplies the interview procedure. The plan is mapped as a design tree and
worked in rounds: every decision branches into the decisions hanging off it,
and each round asks the whole frontier of questions that are answerable now.

## When to Activate

- A plan, proposal or decision is about to be built and the thinking behind it has not been challenged.
- The requester asks to be grilled, stress-tested, challenged, or poked holes in an idea.
- A plan is approved in one breath and it names unstated assumptions.
- Scope is unclear, failure modes are unlisted, or a decision was made for reasons nobody wrote down.
- A cheap question would have redirected the design before the first line of code.

Do not activate for a mechanical change with no open decisions (a rename, a version bump, a formatting fix), for work already under way where only execution remains, or for a diff review (use `review`).

## Core Principles

- The design tree is the map. Every decision branches into the decisions that hang off it. Nothing is asked out of tree order.
- The frontier defines the round. The frontier is every decision whose prerequisites are already settled, meaning the questions answerable right now without guessing at an unanswered one.
- One round, then wait. Ask the whole frontier at once, numbered, each with a recommendation, then wait for the answers before the next round.
- Facts are the agent's job; decisions are the requester's. Look up what can be looked up. Only a genuine choice goes to the requester.
- Every question is answerable with "yes". Word each one so that accepting the recommendation is the cheap path.
- Nothing is assumed silently. The session ends when the frontier is empty, and no implementation starts before the requester confirms a shared understanding.

## Rules

- Anti-hallucination: never assert a fact about the codebase, a dependency, or the requester's intent without reading it. Mark anything unverified as unverified.
- Every claim needs a source: a claim about existing code cites the file that was read.
- No code-fenced final output where raw output is expected: the round is raw Markdown.
- Ask only decisions, never facts. If a question can be answered by reading the repository, the running extension, or the official documentation, answer it and move on.
- Never ask a question whose prerequisite is still open in the same round; it belongs to a later round.
- Never implement, edit, or commit anything until the requester confirms the shared understanding.
- When a fact lookup is still running, do not block the round: ask the rest of the frontier and let the questions downstream of the lookup wait.
- Keep each question small: one decision per question, with the recommended answer stated plainly.
- Write the round in this shape, with each question separated by a horizontal rule:

```
Q1 - <question title>: <question body, multiple paragraphs and choices allowed>

Recommended: <your answer>

---

Q2 - <question title>: <question body>

Recommended: <your answer>
```

- Each round of answers reshapes the tree: settled decisions push the frontier outward and unblock the questions that depended on them. Recompute the frontier and ask the next round.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| Rounds are scoped by the frontier of settled prerequisites | upstream `grilling` skill | 2026 | `skills/productivity/grilling/SKILL.md` |
| Facts are looked up by the agent, decisions go to the requester | upstream `grilling` skill | 2026 | `skills/productivity/grilling/SKILL.md` |
| The permission and storage surfaces a plan must respect | `docs/permissions-register.md`, `src/manifest.ts` | 2024 | local file |

## Output Format

Raw Markdown, not a code fence:

```
### <app> grilling, round <n>

Frontier: <the decisions answerable now>

Q1 - <title>: <body>
Recommended: <answer>

Q2 - <title>: <body>
Recommended: <answer>

Facts gathered while grilling:
- <fact> (source: <file:line | doc | command output>)

Open, waiting on the requester: <decisions in the next frontier>
```
