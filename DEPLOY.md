# ITZFIZZ Car Scroll Animation — Deployment Guide

---

## 1. Instant Preview (No Install)

Open `car-scroll-animation.html` directly in any browser.
Scroll with mouse wheel, touchpad, spacebar, or arrow keys.

---

## 2. Run Next.js Locally

```bash
cd itzfizz
npm install
npm run dev
# → open http://localhost:3000
```

---

## 3. Deploy to GitHub Pages

### Step 1 — Create GitHub Repo

```bash
# Create repo via GitHub CLI
gh repo create itzfizz-car-scroll --public --source=. --remote=origin --push

# OR manually
git init
git add .
git commit -m "feat: ITZFIZZ scroll-driven car animation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/itzfizz-car-scroll.git
git push -u origin main
```

### Step 2 — Build & Export

```bash
npm run build
# Outputs static files to /out directory
```

### Step 3 — Deploy via gh-pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d out"

npm run deploy
```

### Step 4 — Enable GitHub Pages

1. Go to repo → Settings → Pages
2. Set Source: **Deploy from a branch**
3. Branch: **gh-pages** / root
4. Save → your site is live at `https://YOUR_USERNAME.github.io/itzfizz-car-scroll/`

> **Note**: Update `next.config.js` → add `basePath: '/itzfizz-car-scroll'` if assets don't load on GitHub Pages.

---

## 4. How to Record Demo Video

### What to Record

1. **Start** — Show the page at scroll position 0 (car on right, headline letters animated in).
2. **Slow scroll down** — Show car moving LEFT as you scroll. Narrate: "Car position is directly mapped to scroll progress."
3. **Pause at 20%** — Card 1 (58% yellow) fades in.
4. **Pause at 40%** — Card 2 (27% dark) fades in.
5. **Pause at 60%** — Card 3 (23% blue) fades in.
6. **Pause at 80%** — Card 4 (40% orange) fades in.
7. **Scroll back up** — Show car moving RIGHT. Cards remain visible (no flicker).
8. **Keyboard demo** — Press spacebar and arrow keys to show non-mouse scroll support.

### What to Explain

- "Zero autoplay — the animation ONLY moves when you scroll."
- "Built with GSAP ScrollTrigger scrub for buttery smooth interpolation."
- "Cards reveal at specific scroll checkpoints and stay visible."
- "Works with mouse wheel, touchpad, spacebar, and arrow keys."

### Recommended Tools

- **OBS Studio** (free) — Window capture mode, 1920×1080, 60fps
- **Loom** (quick share) — Screen + webcam overlay

---

## 5. Project Structure

```
itzfizz/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   └── Hero.js
├── public/
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js

car-scroll-animation.html   ← Standalone, open directly in browser
```
