---
name: "diagnosing-bugs"
description: "Diagnoses a hard bug or performance regression in <app> with a red-capable feedback loop, then minimises it, ranks hypotheses, instruments one variable at a time, fixes the root cause and leaves a regression test behind."
division: testing
---

# <app> Diagnosing Bugs skill

A reusable workflow for finding the cause of a hard bug or a performance
regression in the `<app>` application. An agent invokes this skill; the agent
supplies the symptom, the skill supplies the loop. The loop comes first:
everything after it is mechanical, and a hypothesis written before a red
signal exists is a guess dressed up as a plan.

## When to Activate

- Something in `<app>` is broken and the cause is not visible yet: a stack trace nobody read, a wrong value, a test that fails for no clear reason, a message that never arrives, a handler that throws on one path and not another.
- A request is slow and nobody has a baseline measurement.
- A regression appeared between two known states (a commit, a release, a data change) and the bisection point is unknown.

Do not activate for a known cause that only needs the change (go straight to the edit), for feature work (use `plan`), or for a diff review (use `review`).

## Core Principles

- The feedback loop is the skill. A tight pass/fail signal that goes red on THIS bug is what finds the cause; reading code is not.
- Red before theory. No hypothesis is allowed before one command exists that can fail on this exact symptom, and has been run at least once.
- Minimise, then hypothesise. A minimal repro shrinks the suspect set and becomes the regression test.
- Hypotheses come in a ranked list of three to five, each stating the prediction it makes. A hypothesis with no prediction is a vibe.
- One variable per probe. Each probe maps to one stated prediction.
- Fix the root cause where all callers route through it, not the path the report happened to name.
- Measure first for performance work: a baseline before a change, a bisect before a guess.
- Redact secrets before showing commands, output or captured artifacts.

## Rules

- Anti-hallucination: every claim about the current behaviour cites the file that was read; nothing is asserted about the application that was not verified.
- Every claim needs a source: cite the local file for a repository behaviour and the official platform documentation for a platform constraint.
- The loop must be red-capable, deterministic, fast (seconds, not minutes) and agent-runnable. Show the invocation and its output before moving on.
- If the bug is non-deterministic, raise the reproduction rate (loop the trigger, narrow the timing window, add stress) until it is debuggable. A one-percent flake is not a loop.
- Minimise by cutting inputs, callers, config and data one at a time, re-running after each cut. Every remaining element must be load-bearing.
- List the ranked hypotheses and show them to the requester before testing. Proceed with the ranking if the requester is away.
- Change one variable at a time. Never "log everything and grep".
- Tag every debug log with a unique prefix so the cleanup is one grep.
- Write the regression test before the fix, and only at a seam that exercises the real bug pattern. If no such seam exists, that absence is the finding: report it instead of writing a shallow test.
- After the fix, re-run the original, un-minimised scenario. Never claim a fix works without a passing run of the original loop.
- If no loop can be built, stop and say so: list what was tried and ask for access to a reproducing environment, a redacted capture, or permission to add temporary instrumentation. Do not hypothesise without a loop.
- Clean up before declaring done: remove the tagged instrumentation, delete the throwaway prototypes, and state the confirmed cause in the commit message.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| The red-loop sequence (feedback loop, minimise, hypothesise, instrument, fix, cleanup) | upstream `diagnosing-bugs` skill | 2026 | `skills/engineering/diagnosing-bugs/SKILL.md` |
| A regression test must exercise the real bug pattern at the call site, or it gives false confidence | upstream `diagnosing-bugs` skill | 2026 | `skills/engineering/diagnosing-bugs/SKILL.md` |
| The test tiers a regression test lands in and the gate that runs them | `PLAYBOOK_TESTS.md`, `docs/12-testing-and-ci.md` | 2024 | local file |
| The message boundary where a sender or handler defect shows up | `src/contracts/protocol.ts`, `src/messaging/server.ts` | 2024 | local file |

## Output Format

Deliver, in order:

1. The feedback loop: the exact command, its redacted output, and why it is red-capable for this symptom.
2. The minimised repro: the smallest scenario that still goes red.
3. The ranked hypotheses, each with its prediction.
4. The probe results, one variable per probe, and which hypothesis was confirmed or eliminated.
5. The root cause in one sentence, then the fix.
6. The regression test at the chosen seam, or the missing-seam finding.
7. The cleanup status: original repro green, regression test green, instrumentation removed.

Example:

```
diagnosing-bugs: loop = `pnpm test -- tests/notes/frontend/unit/domain/note.test.ts`
(red: expected 1 call, got 0) | hypothesis 1 confirmed | fix: the note port
now dispatches on the event, not on the request | regression test added at
the use-case seam
```
