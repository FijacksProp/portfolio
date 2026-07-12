# Joshua Olugbemi Portfolio

Multipage portfolio built with Next.js App Router, TypeScript, Motion, and code-native project visuals.

## Local development

Requirements:

- Node.js 20.9 or newer
- npm

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run check
npm run test:e2e
```

## Vercel deployment

This repository uses the standard Next.js build contract and requires no database, runtime API, analytics service, or secret environment variables.

1. Import `FijacksProp/portfolio` in the Vercel dashboard.
2. Keep the detected framework preset as **Next.js**.
3. Keep the root directory as the repository root.
4. Use the default install and build commands (`npm install` and `npm run build`).
5. Deploy the `main` branch.

Vercel's production project URL is used automatically for canonical links, Open Graph metadata, robots, and the sitemap. `NEXT_PUBLIC_SITE_URL` is optional and only needed when an explicit canonical-domain override is preferred. See [.env.example](./.env.example).

## Deployment behavior

- `main` is the production branch.
- Other branches and pull requests can use Vercel Preview Deployments.
- All case-study routes are statically generated.
- The contact page uses direct links and has no form-processing backend.
- Local fonts and public assets are bundled with the deployment.
