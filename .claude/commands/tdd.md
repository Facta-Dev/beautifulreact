---
name: tdd
description: "Delegate to the tdd skill for the <app> frontend."
division: testing
---

# /tdd

## Delegate

Delegate to the **tdd** skill.

Activate when an `<app>` feature or bug fix is to be built test-first, when
the request mentions red-green-refactor, or when integration tests are wanted
at a public interface. The skill agrees the seams first, then runs the loop
one vertical slice at a time: a failing test, the minimal implementation, the
passing run, with refactoring left to the review stage.

Do not activate for a documentation-only edit, for reviewing existing tests
(use `review`), or for behaviour that is not pinned down yet (grill the plan
first).
