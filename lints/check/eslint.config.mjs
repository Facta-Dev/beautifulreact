// Beautiful React drop-in lints
//
// Paste this into your repo root (read the overrides below first, then add
// your project-specific ignores on the first entry). It makes eslint enforce
// the rules from the react-best-practices skill that a linter can check: the
// View/ViewModel/SDK layer walls, hooks discipline, accessibility basics, and
// the silencing requirements. Silence a rule locally with a reason, which the
// config requires.
//
// Everything beyond the pinned rules rides the typescript-eslint
// strictTypeChecked + stylisticTypeChecked presets. Make CI strict with:
//
//     npx eslint .
//
// The lints/check project proves every pinned rule fires: see
// scripts/check-lints.sh and tests/contracts/test_lints_contract.py.

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

// The View renders and forwards events. It never talks to the network: no
// SDK import, no fetch, no token read. The ViewModel owns that.
const VIEW_PATTERNS = [
  {
    group: ["@/sdk", "@/sdk/*", "**/sdk/*"],
    message:
      "The View never imports the SDK: call a ViewModel command and render its state — see the 'Architecture contract' in react-best-practices.",
  },
];

// The ViewModel holds presentation logic. Platform rendering modules enter
// through ports, never as direct imports; the same ViewModel runs on web,
// native and extension.
const VIEWMODEL_PATTERNS = [
  {
    group: [
      "react-dom",
      "react-dom/*",
      "react-native",
      "react-native/*",
      "chrome",
      "react-router",
      "react-router-dom",
      "next/navigation",
    ],
    message:
      "The ViewModel must not import a rendering platform or router: platform differences enter through ports — see the 'Architecture contract' in react-best-practices.",
  },
];

// The SDK is a plain TypeScript client. It must stay usable by a CLI, a test
// runner and another renderer.
const SDK_PATTERNS = [
  {
    group: ["react", "react/*", "react-dom", "react-dom/*", "react-native"],
    message:
      "The SDK must not import React or a UI platform: it is a plain TypeScript client — see the 'Architecture contract' in react-best-practices.",
  },
];

export default tseslint.config(
  { ignores: ["dist/", "node_modules/", "coverage/", "src/gen/"] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      "@eslint-community/eslint-comments": eslintComments,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // One logger, not console.* sprinkled through components.
      "no-console": "error",
      // Silencing must be narrow, explained, and rare: @ts-expect-error with a
      // reason on the narrowest line; ts-ignore and ts-nocheck are flat out.
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          // `true` = the directive is banned outright; "allow-with-description"
          // lets @ts-expect-error through only with a reason.
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          minimumDescriptionLength: 10,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksConditionals: true, checksVoidReturn: true },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      // Explicit return types on every export: consumers get the shape, and
      // the declaration output stays stable.
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      // Muting attempts are themselves findings.
      "@eslint-community/eslint-comments/no-unlimited-disable": "error",
      "@eslint-community/eslint-comments/require-description": ["error", { ignore: [] }],
      // Hooks rules are correctness rules, not style.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      // Accessibility basics that a linter can prove; review covers the rest.
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
  {
    // The View never talks to the SDK.
    files: ["src/**/views/**/*.{ts,tsx}", "src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: VIEW_PATTERNS }],
    },
  },
  {
    // The ViewModel stays platform-agnostic.
    files: ["src/**/viewmodels/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: VIEWMODEL_PATTERNS }],
    },
  },
  {
    // The SDK stays React-free.
    files: ["src/sdk/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: SDK_PATTERNS }],
    },
  },
);
