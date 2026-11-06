# Punith Kumar A B — Portfolio

A responsive personal portfolio for an AI and machine-learning engineer. The site is built with React, TypeScript, Vite, Tailwind CSS, Motion, and GSAP. It is intentionally a public portfolio rather than an account portal; it does not collect credentials or pretend to provide a backend service.

## Features

- Responsive portfolio with About, Work, Experience, Education, Skills, and Contact sections
- Dark/light theme preference saved locally when browser storage is available
- Working project category filters and accessible project-detail dialogs
- Downloadable resume, email links, and email-copy action
- Motion and GSAP scroll reveals that respect reduced-motion preferences
- Keyboard-accessible navigation and dialogs
- Static production build deployable to Vercel or Netlify

## Project structure

```text
src/
  App.tsx       Main page and interactive components
  data.ts       Portfolio content
  index.css     Tailwind entry and responsive visual system
  main.tsx      React entry point
index.html      SEO metadata and application entry
vite.config.ts  Vite, React, and Tailwind configuration
```

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Once Vite is running, open the site at [http://localhost:5173/](http://localhost:5173/).

Create and verify a production build:

```bash
npm run build
npm run preview
```

## Deploy

### Vercel

1. Push the repository to GitHub and import it in Vercel.
2. Select **Vite** as the framework preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. No environment variables are required for this static portfolio.

### Netlify

1. Import the GitHub repository in Netlify.
2. The checked-in `netlify.toml` configures `npm run build` and `dist`.
3. Deploy. No environment variables are required.

The original PDF resume is imported into the production bundle by Vite. Update the profile content and project details in `src/data.ts` and `src/App.tsx`.
