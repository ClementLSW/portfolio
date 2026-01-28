# Clement Leow — Portfolio & Blog

Personal portfolio and devlog built with [Astro](https://astro.build).

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
│   ├── images/          # Static images
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

### New Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Post Title"
description: "Brief description"
date: 2026-01-28
tags: [devlog, unity]
draft: false
---

Your content here...
```

### New Project

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
links:
  itch: "https://..."
  github: "https://..."
---

Project details here...
```

## 🎨 Customization

- **Colors**: Edit `tailwind.config.mjs`
- **Fonts**: Update imports in `src/styles/global.css`
- **Layout**: Modify files in `src/layouts/`

## 📦 Deployment

This site auto-deploys to Netlify on push to `main`. Build settings are in `netlify.toml`.

## 📄 License

Content © Clement Leow. Code is MIT.
