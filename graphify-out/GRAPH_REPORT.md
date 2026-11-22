# Graph Report - .  (2026-11-22)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 920 nodes · 1229 edges · 123 communities (79 shown, 44 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `954cffac`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Path
- write
- Beautiful React
- _support.py
- HarnessTest
- check-examples.py
- interface
- test_checker_failure_paths.py
- What You Must Do When Invoked
- devDependencies
- GateScript
- React best practices
- 2. Categories, in ranking order
- workflow_text
- compilerOptions
- React patterns that survived
- React port
- React 19 digest
- BestPractices
- A worked review: the inventory screen
- TypeScript strict for React
- graphify reference: extra exports and benchmark
- _load
- <app> SDK Contract Reviewer Agent
- <app> ViewModel Reviewer Agent
- <app> Architect Agent
- <app> Build Resolver Agent
- <app> Code Explorer Agent
- <app> Code Reviewer Agent
- <app> Planner Agent
- <app> TDD Guide Agent
- <app> Permission Guard Reviewer Agent
- <app> Test Author Agent
- <app> Add Route skill
- <app> Add Slice skill
- <app> Claim Check skill
- <app> Clean-Room Rebuild skill
- <app> Corpus Retrieval skill
- <app> Diagnosing Bugs skill
- <app> Domain Modeling skill
- <app> Grilling skill
- <app> Learn
- <app> Plan
- <app> Research skill
- <app> Review
- <app> SDK Contract skill
- <app> Ship
- <app> Spec
- <app> State Contract skill
- <app> Test-Driven Development skill
- <app> Verified Status skill
- <app> Visual Review skill
- graphify reference: query, path, explain
- build
- beautifulreact — agent instructions
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- eslint.config.mjs
- consistent-type-imports.ts
- eslint.config.mjs
- check-lints.sh
- guard-bash.sh
- /add-route
- /add-slice
- /claim-check
- /clean-room-rebuild
- /corpus-retrieval
- /diagnosing-bugs
- /domain-modeling
- /grilling
- /learn
- /plan
- /research
- /review
- /sdk-contract
- /ship
- /spec
- /state-contract
- /tdd
- /verified-status
- /visual-review
- Playbooks for `beautifulreact` — load on demand
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- bad-sdk-import.ts
- misused-promises.tsx
- switch-exhaustiveness.ts
- CLAUDE.md
- README.md
- CREDITS.md
- CREDITS.md
- CREDITS.md
- CREDITS.md
- CREDITS.md
- extraction-spec.md
- CREDITS.md
- CREDITS.md
- CREDITS.md
- CREDITS.md
- CREDITS.md
- no-unnecessary-type-assertion.ts
- second
- portal
- client
- useHook

## God Nodes (most connected - your core abstractions)
1. `write()` - 35 edges
2. `CheckSkillTests` - 35 edges
3. `build_valid_repo()` - 32 edges
4. `Checker` - 26 edges
5. `check_repo()` - 17 edges
6. `YamlParser` - 16 edges
7. `Beautiful React` - 15 edges
8. `React best practices` - 15 edges
9. `interface` - 14 edges
10. `React patterns that survived` - 13 edges

## Surprising Connections (you probably didn't know these)
- `add_portable_plugin()` --calls--> `write()`  [EXTRACTED]
  tests/unit/test_check_skill_unit.py → tests/_support.py
- `build_valid_repo()` --calls--> `write()`  [EXTRACTED]
  tests/unit/test_check_skill_unit.py → tests/_support.py

## Import Cycles
- None detected.

## Communities (123 total, 44 thin omitted)

### Community 0 - "Path"
Cohesion: 0.11
Nodes (25): Exception, check_repo(), Checker, _fold_block(), format_problem(), _is_relative(), _json_key_line(), main() (+17 more)

### Community 1 - "write"
Cohesion: 0.15
Nodes (10): write(), EndToEndTest, add_portable_plugin(), build_valid_repo(), CheckSkillTests, error_messages(), formatted(), png_header() (+2 more)

### Community 2 - "Beautiful React"
Cohesion: 0.04
Nodes (39): Added, Changelog, [Unreleased], Contributing, Good first contributions, License, Making a change, Style (+31 more)

### Community 3 - "_support.py"
Cohesion: 0.09
Nodes (16): ledger_data(), ledger_paths(), ledger_skip_count(), LedgerAgrees, LedgerShape, path -> the file entry, only for entries that are objects., Count of block specs that ledger a skip (the checker must match it)., The checker's skipped count must equal the ledger's skip count. (+8 more)

### Community 4 - "HarnessTest"
Cohesion: 0.09
Nodes (6): DomainWallTest, FallbackTest, FindBlocksTest, HarnessTest, MappingTest, RepoTest

### Community 5 - "check-examples.py"
Cohesion: 0.13
Nodes (33): apply_harness(), as_text(), Block, build_project(), check_brackets(), check_quotes(), check_repo(), doc_files() (+25 more)

### Community 6 - "interface"
Cohesion: 0.07
Nodes (29): author, name, url, interface, publication, description, extensions, com.openai (+21 more)

### Community 7 - "test_checker_failure_paths.py"
Cohesion: 0.10
Nodes (15): BrokenTsBlock, CopiedRepoFailures, DeletedLints, GuardedRepoCase, has_eslint(), A broken ```ts block in a bare doc tree fails check-examples., Failure paths that mutate a full copy of the repo., Text surgery on a copy's lints: removing a pinned rule from BOTH the     drop-in (+7 more)

### Community 8 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 9 - "devDependencies"
Cohesion: 0.10
Nodes (19): description, devDependencies, eslint, @eslint-community/eslint-plugin-eslint-comments, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, react (+11 more)

### Community 10 - "GateScript"
Cohesion: 0.12
Nodes (7): ConfigPairing, explicit_rules(), GateScript, HarnessCoverage, marker_names(), The shell contract: bounded runs, surfaced stderr, explicit non-JSON., Rule ids configured at the top level of any rules block in the config.

### Community 11 - "React best practices"
Cohesion: 0.12
Nodes (15): 10. Accessibility and i18n, 11. Security, 12. Testing, 13. Cross-skill contract, 1. Mindset, 2. Before you hand back code, 3. Components, 4. Hooks (+7 more)

### Community 12 - "2. Categories, in ranking order"
Cohesion: 0.13
Nodes (14): 1. Report shape, 2. Categories, in ranking order, 3. Waived gates, 4. How to review, 5. Worked example, 6. Cross-skill contract, Accessibility, Architecture contracts (always Must fix, ranked first) (+6 more)

### Community 13 - "workflow_text"
Cohesion: 0.22
Nodes (5): CheckerSteps, Every existing CI job keeps its exact entrypoint and pin., The unittest gate: the full discovery is the CI job itself., TestsJob, workflow_text()

### Community 14 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, baseUrl, jsx, module, moduleResolution, noEmit, noUncheckedIndexedAccess, paths (+5 more)

### Community 15 - "React patterns that survived"
Cohesion: 0.14
Nodes (13): 10. Performance patterns, 11. Testing patterns, 12. The failure modes to recognize, 1. Composition over configuration, 2. Controlled and uncontrolled components, 3. Custom hooks extract behavior, 4. State machines for screens, 5. URL as state (+5 more)

### Community 16 - "React port"
Cohesion: 0.15
Nodes (12): 1. The order of work, 2. Mapping table, 3. Framework-specific traps, 4. Behavior parity checklist, 5. What not to do, 6. Cross-skill contract, Angular, jQuery / vanilla JS (+4 more)

### Community 17 - "React 19 digest"
Cohesion: 0.17
Nodes (11): 10. The review questions, 1. Actions and forms, 2. `use`, 3. Ref as a prop, 4. Context as provider, 5. Document metadata and resources, 6. Error handling, 7. Suspense and transitions (+3 more)

### Community 18 - "BestPractices"
Cohesion: 0.29
Nodes (4): BestPractices, bp_body(), ReviewSkill, rv_body()

### Community 19 - "A worked review: the inventory screen"
Cohesion: 0.20
Nodes (9): A worked review: the inventory screen, Must fix, Should fix, The fixed module, The module under review, The report, Verdict, Waived gates (+1 more)

### Community 20 - "TypeScript strict for React"
Cohesion: 0.20
Nodes (9): 1. The strict set, 2. Discriminated unions, 3. Branded ids, 4. Props, 5. Generics and inference, 6. Async and promises, 7. The API boundary, 8. Type-level review questions (+1 more)

### Community 21 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 22 - "_load"
Cohesion: 0.36
Nodes (4): _load(), ManifestPairing, Path, skill_dirs()

### Community 23 - "<app> SDK Contract Reviewer Agent"
Cohesion: 0.29
Nodes (6): <app> SDK Contract Reviewer Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 24 - "<app> ViewModel Reviewer Agent"
Cohesion: 0.29
Nodes (6): <app> ViewModel Reviewer Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 25 - "<app> Architect Agent"
Cohesion: 0.29
Nodes (6): <app> Architect Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 26 - "<app> Build Resolver Agent"
Cohesion: 0.29
Nodes (6): <app> Build Resolver Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 27 - "<app> Code Explorer Agent"
Cohesion: 0.29
Nodes (6): <app> Code Explorer Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 28 - "<app> Code Reviewer Agent"
Cohesion: 0.29
Nodes (6): <app> Code Reviewer Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 29 - "<app> Planner Agent"
Cohesion: 0.29
Nodes (6): <app> Planner Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 30 - "<app> TDD Guide Agent"
Cohesion: 0.29
Nodes (6): <app> TDD Guide Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 31 - "<app> Permission Guard Reviewer Agent"
Cohesion: 0.29
Nodes (6): <app> Permission Guard Reviewer Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 32 - "<app> Test Author Agent"
Cohesion: 0.29
Nodes (6): <app> Test Author Agent, Core Mission, Expertise Areas, Guiding Principles, Output Format, Quality Standards

### Community 33 - "<app> Add Route skill"
Cohesion: 0.29
Nodes (6): <app> Add Route skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 34 - "<app> Add Slice skill"
Cohesion: 0.29
Nodes (6): <app> Add Slice skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 35 - "<app> Claim Check skill"
Cohesion: 0.29
Nodes (6): <app> Claim Check skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 36 - "<app> Clean-Room Rebuild skill"
Cohesion: 0.29
Nodes (6): <app> Clean-Room Rebuild skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 37 - "<app> Corpus Retrieval skill"
Cohesion: 0.29
Nodes (6): <app> Corpus Retrieval skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 38 - "<app> Diagnosing Bugs skill"
Cohesion: 0.29
Nodes (6): <app> Diagnosing Bugs skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 39 - "<app> Domain Modeling skill"
Cohesion: 0.29
Nodes (6): <app> Domain Modeling skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 40 - "<app> Grilling skill"
Cohesion: 0.29
Nodes (6): <app> Grilling skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 41 - "<app> Learn"
Cohesion: 0.29
Nodes (6): <app> Learn, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 42 - "<app> Plan"
Cohesion: 0.29
Nodes (6): <app> Plan, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 43 - "<app> Research skill"
Cohesion: 0.29
Nodes (6): <app> Research skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 44 - "<app> Review"
Cohesion: 0.29
Nodes (6): <app> Review, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 45 - "<app> SDK Contract skill"
Cohesion: 0.29
Nodes (6): <app> SDK Contract skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 46 - "<app> Ship"
Cohesion: 0.29
Nodes (6): <app> Ship, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 47 - "<app> Spec"
Cohesion: 0.29
Nodes (6): <app> Spec, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 48 - "<app> State Contract skill"
Cohesion: 0.29
Nodes (6): <app> State Contract skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 49 - "<app> Test-Driven Development skill"
Cohesion: 0.29
Nodes (6): <app> Test-Driven Development skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 50 - "<app> Verified Status skill"
Cohesion: 0.29
Nodes (6): <app> Verified Status skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 51 - "<app> Visual Review skill"
Cohesion: 0.29
Nodes (6): <app> Visual Review skill, Core Principles, Output Format, Research References, Rules, When to Activate

### Community 52 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 53 - "build"
Cohesion: 0.53
Nodes (5): build(), main(), package_files(), Path, Files to package, relative to root, in a stable order.

### Community 54 - "beautifulreact — agent instructions"
Cohesion: 0.50
Nodes (3): beautifulreact — agent instructions, graphify, Model routing (Claude Code + Ollama)

### Community 55 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 56 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 57 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 58 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): SDK_PATTERNS, VIEW_PATTERNS, VIEWMODEL_PATTERNS

### Community 60 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): SDK_PATTERNS, VIEW_PATTERNS, VIEWMODEL_PATTERNS

### Community 61 - "check-lints.sh"
Cohesion: 0.83
Nodes (3): bounded(), fail(), check-lints.sh script

### Community 62 - "guard-bash.sh"
Cohesion: 0.83
Nodes (3): has(), has_i(), guard-bash.sh script

## Knowledge Gaps
- **391 isolated node(s):** `VIEW_PATTERNS`, `VIEWMODEL_PATTERNS`, `SDK_PATTERNS`, `name`, `version` (+386 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `write()` connect `write` to `_support.py`, `HarnessTest`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `render()` connect `check-examples.py` to `Path`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `load_script()` connect `_support.py` to `write`, `HarnessTest`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `VIEW_PATTERNS`, `VIEWMODEL_PATTERNS`, `SDK_PATTERNS` to the rest of the system?**
  _421 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Path` be split into smaller, more focused modules?**
  _Cohesion score 0.10615079365079365 - nodes in this community are weakly interconnected._
- **Should `write` be split into smaller, more focused modules?**
  _Cohesion score 0.14965986394557823 - nodes in this community are weakly interconnected._
- **Should `Beautiful React` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._