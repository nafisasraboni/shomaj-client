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

1. Copy `.env.example` to `.env.local` and provide the required values.
2. Start the Express API from the sibling `server` project.
3. Install dependencies with `npm install`.
4. Start Next.js with `npm run dev`.

The frontend expects the API at `NEXT_PUBLIC_API_URL` and serves Better Auth from `/api/auth`.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Cloudflare deployment

Set the production environment variables and secrets, then run `npm run deploy`. The project uses `@opennextjs/cloudflare` and deploys directly through Wrangler without a GitHub integration.
