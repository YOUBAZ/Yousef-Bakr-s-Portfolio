# Yousef Bakr Portfolio

Modern animated portfolio built with React 19, Vite, Tailwind, and a curated motion stack (Framer Motion, GSAP, Three.js, etc.).

## Requirements

- Node.js 18.17+ (recommended 20.x)
- npm 9+

## Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm install`   | Install dependencies                        |
| `npm run dev`   | Start Vite dev server                       |
| `npm run build` | Create production bundle in `dist/`         |
| `npm run preview` | Serve the production bundle locally       |

## Deploying to Vercel

This repo includes `vercel.json` so Vercel can treat the build as a Vite SPA and ensure React Router routes resolve via rewrites.

1. **Install dependencies & build**
   ```bash
   npm install
   npm run build
   ```
2. **Login to Vercel (CLI)**
   ```bash
   npm install -g vercel
   vercel login
   ```
3. **Deploy**
   ```bash
   vercel --prod
   ```
   - Vercel reads `vercel.json` to run `npm run build`, publish `dist/`, and apply the SPA rewrite (`/(.*) -> /`).
   - If you use the dashboard instead, set **Framework Preset** to “Vite”, **Build Command** to `npm run build`, and **Output Directory** to `dist`.
4. **Environment variables**
   - Add any `VITE_*` secrets (e.g., EmailJS keys) under *Project Settings → Environment Variables*. Re-deploy afterwards.

After the first deploy, pushes to the linked Git branch will automatically trigger new Vercel builds. Use `vercel logs` and `vercel env pull` for troubleshooting and syncing env vars locally.
