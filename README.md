# Shyftoff-Next

This is a [Next.js](https://nextjs.org) setup to work on [Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/#deploy-an-existing-nextjs-project-on-workers). Walk through the rest of this README.md to understand how to get up and running, or checkout the [Project Overview](#project-structure--architecture) or [Contributing Guide](#contributing-guide) for more documentation

## Getting Started

Please checkout our [prerequisites](#prerequisites) to get your environment setup.

#### Cloning this repoository

When cloning a private repository from [Github](https://github.com) you'll need to setup your SSH key first.

Getting a Github SSH key setup on
[MacOS](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=mac),
[Linux](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux), or
[Windows](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows)

You can now clone this repo:

```bash
git clone git@github.com:shyftoff/shyftoff-next.git
```

#### Environment Variables

Please reachout to another developer to get environment variables setup. They are not managed by source control.

#### Install all dependencies

```bash
pnpm install
```

#### Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**To Run the development server:**

```bash
# Runs in a cloudflare worker environment
pnpm preview
```

Open [http://localhost:8787](http://localhost:8787) with your browser to see the result.

Checkout out [Contibuting Guide](#contributing-guide) for your first PR.

## Project Structure & Architecture

### Overview

This is a Next.js 15 application built to run on the **Cloudflare Edge**. The server's sole responsibility is to **render UI to the browser** — it contains **NO BUSINESS LOGIC**. All data is fetched from and managed by the [shyftoff-agent-trainer](https://github.com/shyftoff/shyftoff-agent-trainer) repository.

### Core Technologies

#### Next.js 15 & React Server Components (RSC)

This is a **Server-Rendered application first**. Follow these principles:

- **Use Server Components by default** — only use Client Components when necessary (interactivity, browser APIs, etc.)
- **Data Fetching**: Use React Server Components with `Suspense` for loading states
- **Data Mutation**: Use Next.js Server Actions for posting/updating data

#### TailwindCSS & ShadcnUI

We use a combination of [TailwindCSS](https://tailwindcss.com/) and [ShadcnUI](https://ui.shadcn.com/) built on top of our custom design system:

- **Before building custom UI components**, check if it exists in ShadcnUI
- All design tokens (colors, typography, shadows, etc.) are managed in `/styles/design-system/`
- Follow our established design system patterns for consistency

#### Zod & OpenAPI TypeScript

**Type safety is critical** in this project:

- **Zod Validation**: All incoming data (from forms or from `shyftoff-agent-trainer`) **MUST** be validated using Zod before use
- **OpenAPI TypeScript**: We use [OpenAPI TypeScript](https://openapi-ts.dev/openapi-fetch/) to generate type-safe schemas from the `shyftoff-agent-trainer` API

  ⚠️ **Important**: TypeScript types from OpenAPI provide compile-time safety, but **VALUES STILL MUST BE VALIDATED WITH ZOD** at runtime

### Folder Structure

```
shyftoff-next/
├── app/                   # Next.js App Router
│   ├── page.tsx           # Routes and pages
│   ├── layout.tsx         # Layouts
│   └── api/               # API routes (if needed)
│
├── actions/               # Next.js Server Actions
│                          # Handle data mutations (POST, PUT, DELETE)
│
├── components/            # All React components
│   └── ui/                # ShadcnUI components See: https://ui.shadcn.com/
│
├── eslint/                # ESLint configuration modules
│                          # Imported by eslint.config.ts
│
├── models/                # Entity types from shyftoff-agent-trainer
│                          # Type definitions for API entities
│
├── lib/                   # Utility functions and package configs
│                          # Helper functions, shared logic
│
├── public/                # Static assets
│                          # Images, fonts, and other static files
│
├── styles/                # Design system and global styles
│   └── design-system/     # Custom design tokens
│       ├── colors.css
│       ├── typography.css
│       ├── shadows.css
│       └── borders.css
│
├── types/                 # TypeScript type declarations
│                          # Global types, Cloudflare types, etc.
│
└── validators/            # Zod schemas for validation
                           # Shared validation schemas for client & server
```

### Architecture Principles

1. **Edge-First**: Built to run on Cloudflare Workers/Pages for global performance
2. **API Gateway Pattern**: This app is a presentation layer; `shyftoff-agent-trainer` is the source of truth
3. **Type Safety**: Strong typing with TypeScript + runtime validation with Zod
4. **Server-First**: Leverage RSC for better performance and SEO
5. **Design System**: Consistent UI through our custom design tokens + ShadcnUI

### Key Documentation References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [ShadcnUI Components](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Zod Validation](https://zod.dev/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

## Prerequisites

Setup your environment with [MacOS](#macos), [Linux](#linux), or [Windows](#windows)

### MacOS

#### 1. Install [homebrew](https://brew.sh/)

Homebrew makes installing packages easy on any Mac.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. Install [Git](https://git-scm.com/)

Git is already installed on macOS by default, but you can update it using Homebrew:

```bash
# Check if Git is installed
git --version

# If you want to update Git (optional)
brew install git
```

#### 3. Install a JS runtime

You can install either [Node.js](https://nodejs.org/en) or [Bun.js](https://bun.com/)

To install Node.js:

```bash
brew install node
```

To install Bun.js:

```bash
curl -fsSL https://bun.sh/install | bash
```

#### 4. Install [pnpm](https://pnpm.io/installation)

```bash
brew install pnpm
```

**Alternative: Using npm (if you installed Node.js)**

```bash
npm install -g pnpm
```

### Linux

#### 1. Install [Git](https://git-scm.com/)

**For Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install git -y
```

**For CentOS/RHEL/Fedora:**

```bash
sudo yum install git -y
# or for newer versions
sudo dnf install git -y
```

#### 2. Update your package manager

First, update your system's package manager:

**For Ubuntu/Debian:**

```bash
sudo apt update && sudo apt upgrade -y
```

**For CentOS/RHEL/Fedora:**

```bash
sudo yum update -y
# or for newer versions
sudo dnf update -y
```

#### 3. Install a JS runtime

You can install either [Node.js](https://nodejs.org/en) or [Bun.js](https://bun.com/)

**To install Node.js:**

_Ubuntu/Debian:_

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

_CentOS/RHEL/Fedora:_

```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
# or for newer versions
sudo dnf install -y nodejs
```

**To install Bun.js:**

```bash
curl -fsSL https://bun.sh/install | bash
```

#### 4. Install [pnpm](https://pnpm.io/installation)

```bash
npm install -g pnpm
```

### Windows

#### 1. Install [Chocolatey](https://chocolatey.org/install)

Chocolatey is a package manager for Windows that makes installing packages easy.

Open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

#### 2. Install [Git](https://git-scm.com/)

Download and install Git for Windows from the [official website](https://git-scm.com/download/win) or use Chocolatey:

```powershell
# If you have Chocolatey installed
choco install git
```

#### 3. Install a JS runtime

You can install either [Node.js](https://nodejs.org/en) or [Bun.js](https://bun.com/)

**To install Node.js:**

```powershell
choco install nodejs
```

**To install Bun.js:**

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

#### 4. Install [pnpm](https://pnpm.io/installation)

```powershell
choco install pnpm
```

**Alternative: Using npm (if you installed Node.js)**

```powershell
npm install -g pnpm
```

## Contributing Guide

We welcome contributions to the Shyftoff-Next project! Please follow these guidelines to ensure a smooth development process.

### Code Quality Standards

#### ESLint Rules

We maintain very strict and safe ESLint rules that **must** be followed on every commit. Our configuration ensures:

- Consistent code formatting and style
- Type safety and error prevention
- Best practices for React and Next.js development
- Security-focused linting rules

**All code must pass ESLint checks before it can be committed.**

#### Pre-commit Hooks (Husky)

We use [Husky](https://typicode.github.io/husky/) to enforce code quality:

- **Pre-commit**: Automatically runs ESLint on staged files
- **Pre-push**: Ensures the project builds successfully before allowing pushes

If your commit fails these checks, you'll need to fix the issues before proceeding.

### Pull Request Process

#### Required Approvals

- **Each Pull Request must be approved by at least one other developer** before merging
- All feedback from reviewers must be addressed before approval

#### Branch Strategy

We follow a three-environment deployment strategy:

| Branch        | Environment | Purpose                     | PR Source          |
| ------------- | ----------- | --------------------------- | ------------------ |
| `main`        | Production  | Live production environment | `staging` only     |
| `staging`     | Staging     | Internal company testing    | `development` only |
| `development` | Development | Dev team testing            | Feature branches   |

#### Making Changes

1. **Create a feature branch** from `development`:

   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:

   ```bash
   pnpm dev               # Test locally
   pnpm preview           # Test in Cloudflare Workers environment
   ```

4. **Rebase your feature branch onto the latest `development` branch**

   Ensure your changes are up to date and to minimize merge conflicts:

   ```bash
    git checkout development
    git pull
    git checkout feature/your-feature-name
    git rebase development
   ```

5. **Create a Pull Request**:

- **Always merge into `development`** for new features
- Provide a clear description of your changes
- Reference any related issues

6. **Address feedback** from code reviewers

7. **Wait for approval** from at least one other developer

### Getting Help

- Check existing issues before creating new ones
- Ask questions in team channels for clarification
- Review the codebase to understand patterns and conventions

### Commit Guidelines

#### Use Atomic Commits

**Break your Pull Requests into small, logical commits** — each commit should represent a single, complete change:

- ✅ **Good**: Separate commits for each feature, refactor, or fix
- ❌ **Bad**: One massive commit with all changes, or many "WIP" commits

**Benefits of atomic commits:**

- Easier code review (reviewers can understand each change independently)
- Simpler to revert specific changes if needed
- Better git history and debugging with `git bisect`
- Clear progression of thought and implementation

**Example of atomic commits in a PR:**

```
feat: add user registration form component
feat: implement user validation with Zod
feat: create user registration server action
test: add tests for user registration flow
docs: update README with authentication setup
```

#### Commit Message Format

Use clear, descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for build, tooling, or non-sourcecode changes

**Examples:**

- `feat: add user authentication with GitHub OAuth`
- `fix: resolve infinite render loop in dashboard`
- `refactor: extract validation logic into separate module`

Checkout the [Project Overview](#project-structure--architecture) or [Getting Started](#getting-started) for other guides
