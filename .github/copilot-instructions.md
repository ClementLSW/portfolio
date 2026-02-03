## Purpose
Short, actionable guidance for AI coding agents working on this Astro portfolio site. Focus on content patterns, build/dev flows, integrations, and file locations developers will edit.

## Quick start commands
- Install: `npm install`
- Dev server: `npm run dev` (alias: `npm start`)
- Build: `npm run build`
- Preview build: `npm run preview`

## Big-picture architecture
- Framework: Astro (see `astro.config.mjs`) with MDX via `@astrojs/mdx` and Tailwind CSS integration.
- Content is file-based (Astro Content). Sources live under `src/content/` with collections: `blog`, `projects`, and `pages` (see `src/content/config.ts`).
- Layouts in `src/layouts/` (e.g. `BaseLayout.astro`, `ProjectPage.astro`). Pages import content with `astro:content` (e.g. `getEntry('pages', 'now')`).
- Static assets under `public/` — project images expected at `public/images/projects` and referenced via `/images/projects/<name>`.

## Important project-specific conventions
- Frontmatter shape (discoverable in `src/content/config.ts`):
  - Blog posts: `title`, `description`, `date`, `updatedDate?`, `tags[]`, `draft` (boolean), `coverImage` (string).
  - Projects: `title`, `description`, `status` (`released|in-progress|prototype|archived`), `date`, `tags[]`, `role`, `coverImage`, `links` (object), `draft`.
- Use filename-based slugs. The CMS config and README rely on `{{slug}}` generation; keep file names stable for permalinks.
- Images: CMS stores images in `public/images/projects` (see `public/admin/config.yml`). Use absolute paths starting with `/images/projects/...` in frontmatter.
- Status mapping: `ProjectPage.astro` maps `status` to UI classes; stick to the four allowed status values.

## CMS & content workflow
- The repo includes Decap CMS (Netlify) configured at `public/admin/config.yml`. Live CMS at `/admin/` on the deployed site. Local testing: `npx decap-server` with `local_backend: true` in config.
- Two ways to add content: via the CMS or by creating `.mdx` files in `src/content/blog` or `src/content/projects`. Follow examples in `src/content/projects/Template.mdx`.

## Build & deploy notes
- Netlify auto-deploys from `main`. Build command: `npm run build`, publish directory: `dist` (see `README.md` and `netlify.toml`). Node 18+ recommended.
- Astro config includes MDX, Tailwind and sitemap; keep shiki config changes minimal (syntax themes are set in `astro.config.mjs`).

## Key files to inspect when making changes
- `astro.config.mjs` — integrations and markdown config
- `package.json` — scripts and deps
- `src/content/config.ts` — content collection schemas and types
- `public/admin/config.yml` & `CMS-SETUP.md` — CMS configuration and local dev notes
- `src/layouts/` — page layouts (SEO/head, site wrapper)
- `src/components/` — shared UI (Header/Footer) and small JS behaviors (image error handling, header scroll)

## Small gotchas & tips
- Date fields are coerced to JS Date via zod in `config.ts` — ensure frontmatter date formats are valid ISO or parseable by new Date().
- `draft: true` means content is intended to be hidden; search repo for how drafts are filtered before publishing.
- Images that fail to load are hidden by a script in `BaseLayout.astro`; when debugging missing images, check paths and `public/images/...`.

If anything here is unclear or you want more examples (e.g., typical PR granularity, test patterns, or preferred commit message style), tell me what to expand and I'll iterate.
