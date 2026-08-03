# payroutes

PayRoutes monorepo.

- **Package manager**: pnpm (workspaces)
- **Runtime**: Node.js
- **Framework**: Next.js

## Getting started

```bash
pnpm install    # install all workspaces
pnpm build      # build every package/app
pnpm dev        # run the landing app locally
```

## Layout

- `apps/landing` — the landing page (marketing site). The only app that exists today.
- `apps/dashboard` — reserved for the main app. Not scaffolded yet.
- `apps/service` — reserved for a standalone API/worker. Not scaffolded yet.
- `packages/shared-ui` — shared UI primitives (`Button`, `PayroutesLogo`, `cn`) consumed via `@payroutes/shared-ui` with the `workspace:*` protocol.

## Conventions

- Internal packages are consumed via the pnpm workspace protocol (`"@payroutes/shared-ui": "workspace:*"`).
- Each app/package has its own `package.json` and `tsconfig.json`; shared TS compiler options live in `tsconfig.base.json` at the repo root.
