# Decap CMS Setup Guide

This guide documents how to set up Decap CMS with GitHub OAuth on a Netlify-hosted Astro site.

## Overview

| Component | Purpose |
|-----------|---------|
| Decap CMS | Visual content editor at `/admin/` |
| GitHub OAuth | Authentication (only repo owners can edit) |
| Netlify | OAuth proxy + hosting |
| Git Gateway | Connects CMS to GitHub repo |

---

## Step 1: Create CMS Files

### `public/admin/index.html`

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
    <script>
      // Preview styles and templates can be added here
    </script>
  </body>
</html>
```

### `public/admin/config.yml`

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO
  branch: main
  site_domain: YOUR_NETLIFY_SITE.netlify.app

site_url: https://YOUR_DOMAIN.com

media_folder: public/images/projects
public_folder: /images/projects

collections:
  - name: blog
    label: Blog Posts
    folder: src/content/blog
    create: true
    slug: "{{slug}}"
    extension: mdx
    format: frontmatter
    fields:
      - { name: title, label: Title, widget: string }
      - { name: description, label: Description, widget: string }
      - { name: date, label: Date, widget: datetime }
      - { name: tags, label: Tags, widget: list }
      - { name: coverImage, label: Cover Image, widget: image, required: false }
      - { name: draft, label: Draft, widget: boolean, default: false }
      - { name: body, label: Body, widget: markdown }

  - name: projects
    label: Projects
    folder: src/content/projects
    create: true
    slug: "{{slug}}"
    extension: mdx
    format: frontmatter
    fields:
      - { name: title, label: Title, widget: string }
      - { name: description, label: Description, widget: string }
      - { name: date, label: Date, widget: datetime }
      - { name: status, label: Status, widget: select, options: ["released", "in-progress", "prototype", "archived"] }
      - { name: event, label: Event, widget: string, required: false }
      - { name: role, label: Role, widget: string }
      - { name: coverImage, label: Cover Image, widget: image, required: false }
      - { name: draft, label: Draft, widget: boolean, default: false }
      - { name: body, label: Body, widget: markdown }
```

---

## Step 2: Create GitHub OAuth App

1. Go to **GitHub** → **Settings** → **Developer settings** → **OAuth Apps**
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** `Portfolio CMS` (or any name)
   - **Homepage URL:** `https://YOUR_DOMAIN.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** → copy the **Client Secret**

> ⚠️ **Important:** The callback URL must be exactly `https://api.netlify.com/auth/done`

---

## Step 3: Configure Netlify

### Enable Git Gateway

1. Netlify dashboard → your site
2. **Site configuration** → **Services**
3. Find **Git Gateway** → **Enable**
4. Connect to your GitHub repository

### Add GitHub OAuth Provider

1. Netlify dashboard → your site
2. **Site configuration** → **Access control** (or search for OAuth)
3. Click **Install provider** → **GitHub**
4. Paste the **Client ID** and **Client Secret** from Step 2

### Enable Netlify Identity (if not already enabled)

1. Netlify dashboard → your site
2. **Extensions** → search for **Identity**
3. Enable Identity
4. Go to **Identity settings** → **Registration** → set to **Invite only**
5. Invite your email address

---

## Step 4: Configure Preview Styles (Optional)

To make the CMS preview match your site's styling, create `public/admin/preview.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

:root {
  --color-bg: #1a1918;
  --color-text-primary: #e8e4df;
  --color-text-secondary: #a8a29e;
  --color-accent: #f0a589;
  --color-border: #3d3835;
}

body {
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--color-bg);
  color: var(--color-text-primary);
  padding: 2rem;
  line-height: 1.6;
  max-width: 768px;
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  color: var(--color-text-primary);
}

/* Add more styles as needed */
```

Then update `index.html` to register it:

```html
<script>
  CMS.registerPreviewStyle('/admin/preview.css');
</script>
```

---

## Step 5: Hide Admin from Search Engines

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://YOUR_DOMAIN.com/sitemap-index.xml
```

---

## Config Reference

### `config.yml` Fields

| Field | Description |
|-------|-------------|
| `backend.name` | `github` for direct GitHub OAuth |
| `backend.repo` | `username/repo-name` |
| `backend.branch` | Branch to commit to (usually `main`) |
| `backend.site_domain` | Your Netlify subdomain (e.g., `my-site.netlify.app`) |
| `media_folder` | Where uploaded images are stored in repo |
| `public_folder` | URL path for images in content |

### Local Development

For local testing, add to `config.yml`:

```yaml
local_backend: true
```

Then run:

```bash
npx decap-server
```

This allows the CMS to read/write local files without GitHub authentication.

---

## Troubleshooting

### "Not Found" on OAuth

- Ensure GitHub OAuth callback URL is exactly `https://api.netlify.com/auth/done`
- Verify Client ID and Secret are correctly entered in Netlify

### "redirect_uri not associated"

- Check that callback URL in GitHub OAuth App matches exactly
- No trailing slashes or different protocols

### Media tab empty

- Decap CMS only shows files uploaded through the CMS
- Existing files in repo won't appear automatically
- Try uploading a test image

### Images not loading in preview

- Add `site_url` to config.yml
- Ensure `public_folder` path matches how images are served

---

## Security Notes

- **GitHub OAuth:** Only users with write access to the repo can use the CMS
- **Netlify Identity (Invite only):** Adds an extra login layer
- **robots.txt:** Prevents search engines from indexing `/admin/`
- No credentials are stored in the repo — OAuth handles authentication
