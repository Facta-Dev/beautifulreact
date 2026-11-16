---
name: "tdd"
description: "Drives an <app> change test-first: red, green, refactor, with integration tests at agreed public seams and the repository's own test tiers."
division: testing
---

# <app> Test-Driven Development skill

A reusable workflow for the red to green loop, and the reference that keeps
the loop producing tests worth keeping. An agent invokes this skill; the
agent supplies the behaviour, the skill supplies the loop. Every section
applies on every cycle: consult them before and during the loop, not after.

## When to Activate

- An `<app>` feature or bug fix is to be built test-first.
- The request mentions red-green-refactor, or asks for a test that pins a behaviour down.
- Integration tests are wanted at a public interface rather than a unit test at an internal one.

Do not activate for a pure documentation or comment edit, for reviewing existing tests (use `review`), or when the behaviour cannot be pinned down yet (grill the plan first, then drive the change).

## Core Principles

- Red before green: the failing test comes first, then only enough code to pass it.
- One vertical slice at a time: one seam, one test, one minimal implementation, repeat. Each test is a tracer bullet that responds to what the last cycle taught you.
- Tests verify behaviour through public interfaces, never implementation details. The code can change entirely; the tests should not.
- A good test reads like a specification: "a user can save a note with a valid title" states the capability, not the mechanism.
- Seams are agreed before the first test is written. You cannot test everything, so agreeing the seams up front is how the effort lands on the critical paths.
- Expected values come from an independent source of truth: a known-good literal, a worked example, the specification.
- Use the project's own vocabulary. Read the glossary and respect the ADRs for the area under test, so test names and interfaces speak the same domain language.

## Rules

- Anti-hallucination: never write a test asserting behaviour the code does not have, or a claim about the platform without citing the file or the official documentation that proves it.
- Every claim needs a source: cite the local file for a repository behaviour and the official platform documentation for a platform constraint.
- Write down the seams under test and confirm them with the requester before writing any test. No test is written at an unconfirmed seam.
- Give each proposed seam a one-line note on what it catches and what it misses.
- Never anticipate future tests or add speculative features in the green step.
- Refactoring belongs to the review stage, not to the red-to-green implementation cycle.
- Do not mock your own classes or internal collaborators. Mock only at system boundaries: external APIs, the clock, randomness, the filesystem, and sometimes the database. This kit prefers hand-written fakes over a mocking library.
- Do not assert through a side channel (querying the storage instead of using the interface). The tell: the test breaks on a refactor that changed no behaviour.
- Do not recompute the expected value the way the code computes it. That makes the test pass by construction and it can never disagree with the code.
- Do not write all the tests first and then all the implementation. Horizontal slicing tests imagined behaviour and goes insensitive to real changes.
- Put the test next to the slice it covers, in the tier that matches what it exercises, and finish with the repository's full gate green.

## Research References

Provenance table, every claim in a finding needs a row.

| claim | source | year | link |
| --- | --- | --- | --- |
| Red before green, one slice at a time, refactoring is not part of the loop | upstream `tdd` skill | 2026 | `skills/engineering/tdd/SKILL.md` |
| Good tests verify behaviour through public interfaces; tautological tests pass by construction | upstream `tdd` skill | 2026 | `skills/engineering/tdd/tests.md` |
| Mock only at system boundaries, and design for mockability at those boundaries | upstream `tdd` skill | 2026 | `skills/engineering/tdd/mocking.md` |
| The test tiers, the layout and the gate commands | `PLAYBOOK_TESTS.md`, `docs/12-testing-and-ci.md` | 2024 | local file |
| The fakes that stand in for the platform in tests | `tests/_shared/fakes/` | 2024 | local file |

## Output Format

Deliver, in order:

1. The seams under test, with what each catches and what it misses, and the confirmation that they were agreed.
2. The cycle log, one entry per slice: the failing test (and how it fails), the minimal implementation, the passing run.
3. The final state: the full gate result and the seam coverage note (what is not covered by design).

Example:

```
tdd: seam = the SDK HTTP client contract (catches: status mapping and
error envelopes, misses: retry timing)
cycle 1: messageServerTest fails (expected 1 handler call, got 0) -> added the
sender check in the handler -> passes
```
