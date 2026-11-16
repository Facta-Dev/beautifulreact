# Changelog

All notable changes to this project are listed here. Versions follow
[Semantic Versioning](https://semver.org/), and the version lives in
`.claude-plugin/plugin.json`.

## [Unreleased]

### Added

- **Three skills for React 19 + TypeScript.** `react-best-practices` steers
  new code toward function components and composition, hooks discipline,
  one discriminated union per screen, derived state instead of mirrored
  state, and the unbreakable View → ViewModel → SDK layer contract.
  `react-review` reviews a component, hook, feature folder, or diff, ranks a
  broken architecture contract above everything, and shows a concrete fix for
  every finding. `react-port` ports Vue, Svelte, Angular, jQuery, vanilla
  JavaScript, or class components to React 19 with the same behavior, porting
  the original tests first and writing a `PORTING.md`.
- **A drop-in ESLint config.** `lints/eslint.config.mjs` (ESLint 9 flat
  config + typescript-eslint 8, strictTypeChecked) turns the architecture
  contract into red-on-save output: `no-restricted-imports` keeps the View off
  the SDK, the ViewModel off `react-dom`/`react-native`/`chrome`, and the SDK
  off React. Hooks rules, accessibility rules, promise discipline, and the
  silencing requirements are pinned as errors.
- **Proof that every rule fires.** `lints/check/` holds one deliberate
  violation per rule plus a clean file, and `scripts/check-lints.sh` runs
  eslint and tsc over both, bounded and with stderr surfaced.
- **A skill validator, an example compiler, and a test suite.**
  `scripts/check-skill.py` checks frontmatter, links, eval cases, and the
  plugin manifests; `scripts/check-examples.py` compiles every `ts` block in
  the skills and docs; `tests/` covers the unit, contract, integration, and
  CI-gate layers.
- **A worked review.** `examples/review-inventory.md` shows the report shape
  and the architecture-first ranking on a small inventory screen.
- **Four failure-mode rules from a production console.** Guards redirect once
  per mount (a `Navigate` component re-firing while a lazy target loads
  livelocks the renderer), one query key can only hold one data shape (a
  single-page query poisons an infinite query on the same key), a run-once
  effect must not lose its async result to StrictMode's remount, and an
  import-boundary gate must ban package subpaths (`^pkg(\/|$)` in custom
  gates).

[Unreleased]: https://github.com/Facta-Dev/beautifulreact/compare/v0.1.0...HEAD
