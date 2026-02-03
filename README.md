# Clement Leow — Portfolio & Blog

Personal portfolio and devlog built with [Astro](https://astro.build).

**Live site:** [clementlsw.com](https://clementlsw.com)

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Astro](https://astro.build) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Typography | Bebas Neue + IBM Plex Sans |
| Content | MDX (Markdown + JSX) |
| CMS | [Decap CMS](https://decapcms.org) |
| Hosting | [Netlify](https://netlify.com) |
| Auth | GitHub OAuth via Netlify |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── public/
│   ├── admin/           # Decap CMS
│   │   ├── index.html
│   │   ├── config.yml
│   │   └── preview.css
│   ├── images/          # Static images
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable components
│   ├── content/
│   │   ├── blog/        # Blog posts (MDX)
│   │   └── projects/    # Project case studies (MDX)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global styles
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## ✍️ Adding Content

### Option 1: Using the CMS

1. Go to [clementlsw.com/admin/](https://clementlsw.com/admin/)
2. Login with GitHub
3. Create/edit content visually
4. Publish — changes commit to the repo automatically

For CMS setup details, see [CMS-SETUP.md](./CMS-SETUP.md).

### Option 2: Manual MDX Files

#### New Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Post Title"
description: "Brief description"
date: 2026-01-28
tags: [devlog, unity]
coverImage: "/images/cover.png"
draft: false
---

Your content here...
```

#### New Project

Create a new `.mdx` file in `src/content/projects/`:

```mdx
---
title: "Project Name"
description: "Brief description"
status: released  # released | in-progress | prototype | archived
date: 2026-01-28
tags: [unity, game-jam]
role: "Designer & Programmer"
coverImage: "/images/projects/your-image.png"
draft: false
links:
  itch: "https://..."
  github: "https://..."
---

Project details here...
```

## 🎨 Customization

### Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-accent: #e07850;
  --color-bg: #faf8f5;
}

.dark {
  --color-accent: #f0a589;
  --color-bg: #1a1918;
}
```

### Fonts

Update imports in `src/styles/global.css` and `tailwind.config.mjs`.

### Layout

Modify files in `src/layouts/`.

## 📦 Deployment

This site auto-deploys to Netlify on push to `main`.

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 18+ |

Build settings are also in `netlify.toml`.

## 📄 License

Content © Clement Leow. Code is MIT.
