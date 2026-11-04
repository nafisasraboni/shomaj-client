# Shomaj

Shomaj is a community-driven event platform that helps people discover, create, join, and track local social-service initiatives across Bangladesh.

**Live site:** https://shomaj.sraboni.dev

**API:** https://api.shomaj.sraboni.dev

## Features

- Email/password and Google authentication powered by Better Auth.
- Public upcoming-event discovery with search, cause filters, and date sorting.
- Secure event creation, editing, deletion, and ownership enforcement.
- One-click event joining with a personal joined-events dashboard.
- Editable user profiles with names and profile photos.
- Responsive light and dark themes for mobile, tablet, and desktop.
- Loading skeletons, validation, accessible feedback, and polished empty states.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and provide the required values.
3. Start the Express API from the sibling `server` project.
4. Start Next.js with `npm run dev`.

The frontend expects the API at `NEXT_PUBLIC_API_URL` and serves Better Auth from `/api/auth`.

### Required environment values

- `MONGODB_URI` and `MONGODB_DB_NAME` connect the Better Auth MongoDB adapter.
- `BETTER_AUTH_SECRET` signs authentication data and must remain private.
- `BETTER_AUTH_URL` must match the public client origin.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` enable Google sign-in.
- `NEXT_PUBLIC_API_URL` points browser requests to the Express API.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Cloudflare deployment

The project uses OpenNext and deploys directly through Wrangler without a GitHub integration. Before the first deployment:

1. Set non-secret production values in `wrangler.jsonc`.
2. Store `MONGODB_URI`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` with `npx wrangler secret put NAME`.
3. Add the production callback URL to the Google OAuth application.
4. Run `npm run deploy` and verify `/`, `/events`, `/login`, and `/api/auth/get-session`.

Cloudflare smart placement is enabled to reduce latency to MongoDB, and Worker observability is enabled for production diagnostics.
