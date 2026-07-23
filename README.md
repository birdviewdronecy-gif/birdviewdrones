# Bird View Drones — birdviewdrones.cy

Award-oriented marketing site for immersive **Antigravity A1** drone experiences across Cyprus.

**Tagline:** Experience Cyprus From Above  
**Promise:** The closest thing to flying — no technical knowledge required.

Design language is inspired by editorial / Awwwards craft (e.g. [hirotos.com](https://www.hirotos.com/)): strict type hierarchy, cream/black palette with copper accent, full-viewport storytelling, preloader, custom cursor, horizontal spot marquee, and tech narrative for the A1.

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom design tokens |
| Fonts | Instrument Serif + DM Sans (Google Fonts) |
| Motion | CSS reveals + marquee; GSAP available |
| Content | Typed modules in `src/content/` |
| Forms | Mailto inquiry (phase 1) |

## Run locally

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd birdviewdrones
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

| What | File |
|------|------|
| Brand & nav | `src/content/site.ts` |
| Experiences | `src/content/experiences.ts` |
| Spots + images | `src/content/spots.ts` |
| A1 tech copy | `src/content/tech.ts` |
| Images | `public/images/` |

## Home narrative (scroll)

1. Immersive hero — sensation of flight  
2. You don’t pilot. You fly.  
3. Landscape statement  
4. Horizontal Cyprus spots  
5. Technology — Antigravity A1  
6. Occasions list  
7. Retail / Pro split  
8. Golden sunset CTA  

## Deploy

Push to Git, import on Vercel (or similar), point `birdviewdrones.cy` DNS.
