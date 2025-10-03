# Shyftoff-Next — Agent Rules (Strict)

Every time you choose to apply rule(s), explicitly state the rule(s) in the output. You can abbreviate the rule description to a single word or phrase.

This document defines strict, non-negotiable rules for any automated agent working in this repository. Follow these exactly. When unsure, stop and ask a human.

## Scope and Responsibilities

- **Presentation layer only**: This app renders UI and orchestrates fetches. It holds **no business logic**. All authoritative data and workflows live in `shyftoff-agent-trainer`.
- **Edge-first**: Code must run on Cloudflare Workers/Pages. Avoid Node-only APIs.

## Code Style and Structure

- Write concise, technical Typescript code with accurate examples
- Use functional and declarative programming patterns: avoid classes (unless it's a model in the models directory)
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g. isLoading, hasError)
- Make sure all code is compliant with ESLint config

## Naming conventions

- Use kebab-case for directory folders (e.g. styles/design-system/...)
- Use PascalCase for \*_/_.(ts,tsx) files (e.g. component/LoginForm.tsx, types/CloudflareEnv.d.ts)
- Use kebab-case for app/\*_/_.(ts,tsx) files (e.g app/page.tsx, app/(auth)/layout.tsx)
- Use ALLCAPS for .md files (e.g. README.md)
- Use kebab-case for config files (e.g. eslint.config.ts)
- Use kebab-case for all other file types (e.g. next-env.d.ts, pnpm-lock.yaml)

## Type Safety and Validation

- **Zod is mandatory at runtime**: All inbound data (form inputs, query params, API responses) must be validated with Zod before use.
- **OpenAPI TypeScript**: Use generated types for compile-time safety, but still validate values with Zod.
- Use Typescript for all Code; NO JAVASCRIPT
- Prefer type declarations over interfaces
- Make sure code is typesafe with no `any` types
- Use functional components with Typescript type `FunctionalComponent<...>`
- Absolute imports for all files `@/...`
- If you add or change models from the API, ensure types are sourced from OpenAPI or placed under `models/` with clear provenance.
- Add JSDoc to clearly outline the purpose of each parameter, return, and potential exceptions thrown
- Prefer `.catch` over `try/catch` blocks unless there is a good reason to handle all errors in a given block
- Prefer `'export type {...}'` instead of `'export { type ...}'`

## Syntax and Formatting

- Use only ES6 arrow functions: avoid "function" keyword
- Avoid unnecessary curly braces in conditionals
- Use declarative JSX
- Implement proper TypeScript discriminated unions for message types

## Non‑Negotiable Architecture Rules

- **Server-first rendering**: Use React Server Components by default.
  - Use Client Components only for necessary interactivity or browser-only APIs.
  - If a component needs client features, add the exact `"use client"` directive as the first line.
- **Data fetching**: Perform in Server Components with `Suspense` as needed.
- **Data mutation**: Use Next.js Server Actions for POST/PUT/DELETE.
- **No business logic** in this repo. If you are about to add domain logic, stop.

## UI and Design System

- Use **ShadcnUI** components before building custom UI.
  - Use `pnpm dlx shadcn@latest add <component-name>` to add new ShadcnUI components
  - When adding ShadcnUI component, document the installation command
- Use TailwindCSS with our design tokens from `styles/design-system/`.
- Do not hardcode colors, spacing, or shadows that duplicate tokens. Reference tokens.

## Folder and File Placement

- `app/`: Routes, layouts, RSC pages. Keep pages lean; push logic into helpers.
- `actions/`: Next.js Server Actions for data mutations.
- `components/` and `components/ui/`: Reusable components; prefer `components/ui/` for Shadcn-derived primitives.
- `lib/`: Pure utilities and shared helpers. No business logic.
- `models/`: Entity types that mirror `shyftoff-agent-trainer` outputs.
- `validators/`: Zod schemas shared by server and client.
- `styles/design-system/`: Design tokens only. Do not place component styles here.
- `types/`: Type Declarations & shared type definitions

If a referenced directory is missing, create it following this structure.

## Cloudflare Edge Constraints

- Do not use Node-specific modules (e.g., `fs`, `net`, `tls`, `child_process`).
- Prefer `fetch` and Web Platform APIs compatible with Workers.
- Keep server code stateless and side-effect free beyond request scope.

## Commands You Must Use

- Dev server (Node env):

```bash
pnpm dev
```

- Edge preview (Cloudflare Workers env):

```bash
pnpm preview
```

- Build for Cloudflare:

```bash
pnpm build:cloudflare
```

- Lint (must be clean before commit/PR):

```bash
pnpm lint
```

- Cloudflare env type generation (keep Cloudflare types current):

```bash
pnpm cf-typegen
```

## Git and PR Protocol (Strict)

- Branch from `development` for all feature work.
- Open PRs into `development` only. Do not merge directly to `staging` or `main`.
- At least one human developer must approve every PR.
- Rebase your feature branch on latest `development` before opening or updating a PR.

## Commit Standards (Strict)

- Use atomic commits: one logical change per commit.
- Follow Conventional Commits:
  - `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Write clear, descriptive messages.

## RSC vs Client Component Rules

- Default to RSC. Only mark a component as client when:
  - It uses state, effects, refs tied to DOM, or browser-only APIs.
  - It handles user events requiring client interactivity beyond simple navigation.
- Do not fetch in Client Components unless absolutely required; prefer server data injection via props.

## Data Rules

- All external data must be validated with Zod before rendering or mutating state.
- Handle failure states explicitly: loading via `Suspense`, error boundaries, and typed fallbacks.
- Never persist secrets or credentials in source. Environment variables are not committed.

## Absolute Do/Don’t

- Do: Keep this app presentation-only; rely on `shyftoff-agent-trainer` for data and logic.
- Do: Validate all inputs and responses with Zod.
- Do: Keep code compatible with Cloudflare Edge.
- Do: Use design tokens and ShadcnUI.
- Don’t: Add business logic, long-lived state, or Node-only APIs.
- Don’t: Bypass lint rules or push failing builds.
- Don’t: Add UI primitives that duplicate existing Shadcn components without justification.

## Pre‑Change Safety Checklist

Before committing or opening a PR, confirm all are true:

1. Lint passes locally: `pnpm lint`.
2. Edge preview works: `pnpm preview` loads without runtime errors.
3. New or changed data flows have Zod validation in `validators/` (or colocated) and are invoked.
4. Components are RSC by default; client boundaries are minimal and justified.
5. Design tokens are used; no hardcoded palette/shadows/spacing when tokens exist.
6. No Node-only APIs introduced.
7. Commits are atomic and use Conventional Commits.
8. Feature branch is rebased onto `development`.

## When Unsure

- Stop and request clarification from a human developer. Do not guess on architecture or business logic.

## Minimal Example Placements

- New form with server mutation:
  - UI under `components/` (client if needed); server action under `actions/`; validation in `validators/`.
- Display list from API:
  - Fetch in RSC page or layout with `Suspense`; Zod-validate response; render Shadcn components.

This guide is binding for all automated work in this repository.
