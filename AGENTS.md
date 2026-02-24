# AGENTS.md

## Cursor Cloud specific instructions

This is **SandBoxify**, a Nuxt 4 (Vue 3) client-side SPA for managing development sandboxes. It is frontend-only; the backend API is not in this repository.

### Services

| Service | Port | Notes |
|---|---|---|
| Nuxt dev server | 3000 | `npm run dev` -- the only service in this repo |
| Supabase (external) | cloud | Auth provider; requires `SUPABASE_URL` and `SUPABASE_KEY` in `.env` |
| Sandboxify API (external) | 5000 | REST API for sandbox CRUD; not included in this repo. Dashboard will show a fetch error banner when unavailable, but the app still renders. |

### Environment variables

Copy `.env.example` to `.env` and fill in `SUPABASE_URL` and `SUPABASE_KEY` from the SandBoxify Supabase project (project ID: `roshjjnneywpvognfzbx`). The `NUXT_PUBLIC_SANDBOXIFY_API_URL` defaults to `http://localhost:5000`.

### Commands

Standard commands are in `package.json` scripts and `README.md`. Key ones:

- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build`
- **Lint:** No dedicated lint script; the project uses TypeScript via Nuxt's built-in type checking (`nuxt prepare` generates types in `.nuxt/`)

### Gotchas

- The `nuxt prepare` (postinstall) step warns about missing `~/types/database.types.ts` -- this is harmless; the app uses `Database = unknown` fallback.
- SSR is disabled (`ssr: false` in `nuxt.config.ts`), so the dev server serves a client-side SPA shell.
- Supabase email confirmation is enabled on the project. To create a test user that can log in immediately, sign up via the API then confirm the email via SQL: `UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = '...'`.
- The lockfile is `package-lock.json` -- use `npm`, not pnpm/yarn.
