# MySQL EXPLAIN Reference

A lightweight, developer-friendly reference site for MySQL `EXPLAIN` and query optimization. Built with [Astro](https://astro.build) for fast, static output that deploys anywhere.

## Features

- **4 main guides:**
  - EXPLAIN Basics — technical reference and column meanings
  - Query Optimizer — how MySQL picks execution plans and common pitfalls
  - Indexes — types, syntax, and optimization strategies
  - Practice — step-by-step real-world query optimization

- **Developer-friendly design:**
  - Monospace, code-first aesthetic
  - Light and dark mode support (via `prefers-color-scheme`)
  - SQL syntax highlighting
  - Mobile responsive

- **100% Static:**
  - No JavaScript runtime
  - Builds to plain HTML/CSS
  - Deploy to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, etc.)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site will reload as you edit files.

### Build for Production

```bash
npm run build
```

Output is generated in `dist/` — this folder contains fully static HTML/CSS/assets and can be deployed directly.

### Preview the Build

```bash
npm run preview
```

Serves the `dist/` folder locally to verify the production build works correctly.

## Project Structure

```
src/
  ├── pages/
  │   ├── index.astro          # Landing page
  │   ├── explain.astro        # EXPLAIN technical guide
  │   ├── optimizer.astro      # Query optimizer guide
  │   ├── indexes.astro        # Indexes guide
  │   └── practice.astro       # Step-by-step optimization examples
  ├── layouts/
  │   └── BaseLayout.astro     # Shared page layout
  ├── components/
  │   └── Nav.astro            # Navigation bar
  └── styles/
      └── global.css           # Global styles (light/dark mode, code blocks, etc.)
```

## Deployment

Since this site is fully static, it can be deployed to any static host:

### Netlify / Vercel

Both services auto-detect Astro projects and require zero config. Connect your repo and push to `main` to deploy.

### GitHub Pages

Add a GitHub Actions workflow to build and deploy on push. Example:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Other Hosts (S3, Cloudflare Pages, etc.)

Upload the `dist/` folder to your host. Since everything is static, there are no server dependencies.

## Development

- **Adding a new page:** Create a new `.astro` file in `src/pages/` and use the `BaseLayout` component. The file path automatically becomes the URL (e.g., `src/pages/about.astro` → `/about/`).
- **Editing content:** Modify the `.astro` files directly. HTML is mixed with Astro syntax; see [Astro docs](https://docs.astro.build).
- **Styling:** All styles are in `src/styles/global.css`. Light/dark mode is handled via CSS custom properties and `@media (prefers-color-scheme: dark)`.

## License

Open source. Feel free to use, modify, and share.
