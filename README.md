<p align="center">
  <img src="assets/images/shift-logo.svg" alt="SHIFT by Lumax Logo" width="320"/>
</p>

<h1 align="center">SHIFT by Lumax — Website</h1>

<p align="center">
  R&D portal for Lumax Auto Technologies' Software Defined Vehicle initiative.<br/>
  Pure HTML · CSS · Vanilla JS · No frameworks · No build step.
</p>

---

## 📁 Project Structure

```
shift-website/
│
├── index.html                   ← Homepage (hero, stats, product grid, updates)
├── insights.html                ← R&D articles & technical write-ups
├── roadmap.html                 ← 2025–26 product milestone timeline
├── team.html                    ← Org chart, team bios, open positions
├── contact.html                 ← Contact form + key contacts
│
├── products/
│   ├── index.html               ← Product portfolio hub with filters
│   ├── dms.html                 ← Driver Monitoring System
│   ├── svs.html                 ← Surround View System
│   ├── camera.html              ← Automotive Camera Module
│   ├── sidestep.html            ← Motorized Retractable Side-step
│   ├── motor-controller.html    ← EV Motor Controller
│   ├── type-c-charger.html      ← USB-C Type-C Charger
│   ├── wireless-charger.html    ← Qi Wireless Charger
│   └── gesture-control.html     ← Gesture Control HMI
│
├── css/
│   └── style.css                ← All shared styles (design tokens, components)
│
├── js/
│   └── main.js                  ← Nav active state, mobile menu, scroll animations, ⌘K search
│
├── partials/
│   ├── nav.html                 ← Shared navigation bar
│   └── footer.html              ← Shared footer
│
└── assets/
    └── images/
        └── shift-logo.svg       ← SHIFT brand logo (infinity + EKG, red–pink gradient)
```

---

## 📄 Pages

### Core Pages

| Page | Description |
|---|---|
| `index.html` | Landing page with hero banner, stats strip, quick-access cards, mission pillars, product preview, featured video, and a live updates feed with sidebar widgets. |
| `insights.html` | R&D article feed with category filters (All · Product · R&D · Events · Team), 7 published articles, and a topics/authors sidebar. |
| `roadmap.html` | Vertical milestone timeline spanning Q1 2025 → Q4 2026, covering all 8 products across 7 quarterly phases. Status indicators: ✅ Complete · 🔄 In Progress · ⏳ Upcoming. |
| `team.html` | Leadership grid, engineering leads across 3 domains (ADAS, Body/Powertrain, In-Cabin), team bios, and 3 open positions. |
| `contact.html` | Contact form (topic + product dropdowns, inline validation) with key contacts sidebar and office address. |

### Product Pages

| Product | Category | Development Status |
|---|---|---|
| [DMS](products/dms.html) — Driver Monitoring System | ADAS | v2.3 validated (98.2% accuracy) · Vehicle trial in progress |
| [SVS](products/svs.html) — Surround View System | Connectivity | Algorithm complete · Hardware integration in progress |
| [Camera Module](products/camera.html) | ADAS | EVT complete · DVT environmental testing |
| [Sidestep](products/sidestep.html) — Motorized Side-step | Body Electronics | Mechanical prototype · ECU integration in progress |
| [Motor Controller](products/motor-controller.html) | Powertrain | 48V prototype done · 400V board design Q1 2026 |
| [Type-C Charger](products/type-c-charger.html) | Charging | Single-port validated · Dual-port DVT Q1 2026 |
| [Wireless Charger](products/wireless-charger.html) | Charging | Qi 1.3 certified · Console integration Q1 2026 |
| [Gesture Control](products/gesture-control.html) | HMI | Active demo (Auto Expo 2026) · OEM integration Q1 2026 |

Each product page includes: key features, a 3-stage development timeline, technical specs card, application areas, and related product links.

---

## ⚙️ How It Works

### Partials
`nav.html` and `footer.html` are written once and embedded inline on each page. Edit either partial file and propagate the change manually to all pages (or automate with a build step if preferred).

### JavaScript (`main.js`)
- **Active nav** — highlights the current page link based on `window.location.pathname`
- **Mobile menu** — hamburger toggle with animated X transition
- **Scroll animations** — IntersectionObserver adds `.visible` to `.animate-on-scroll` elements
- **⌘K / Ctrl+K** — focuses the search bar in the nav

### Subdirectory pages
For pages inside `products/`, prefix asset paths with `../`:
```html
<link rel="stylesheet" href="../css/style.css">
<script src="../js/main.js"></script>
<div data-include="../partials/nav.html"></div>
```

---

## 🎨 Design System

**Fonts** — [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) (headings) + [Barlow](https://fonts.google.com/specimen/Barlow) (body) via Google Fonts.

**CSS variables** — edit the `:root` block at the top of `css/style.css`:

```css
:root {
  --bg:      #f4f5f7;   /* page background */
  --surface: #ffffff;   /* card surface */
  --border:  #dde0e8;   /* borders */
  --red:     #d42e24;   /* primary brand accent */
  --gold:    #b07d10;   /* secondary accent */
  --text:    #3a3f50;   /* body text */
  --muted:   #8a90a0;   /* secondary text */
  --dark:    #1a1d26;   /* headings */
}
```

**Responsive breakpoints** — `900px` (tablet) and `600px` (mobile). Grids collapse, nav links hide, sidebar stacks.

---

## 🚀 Local Development

**Python (built-in):**
```bash
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080).

**Node.js:**
```bash
npx serve .
```

> ⚠️ Must be served over HTTP — partials use `fetch()` which doesn't work with `file://` URLs.

---

## 🌐 Deployment

**Option A — Static server (Apache / Nginx):**
Upload the entire folder to your web root (e.g. `/var/www/html/shift/`).

**Option B — Nginx config snippet:**
```nginx
server {
    listen 80;
    server_name shift.yourdomain.com;
    root /var/www/shift;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript text/html;
}
```

**Option C — GitHub Pages / Netlify / Vercel:**
Drop the folder in; no build configuration required.

---

## 🏢 About SHIFT

SHIFT is Lumax Auto Technologies' center for rapid prototyping and validation of next-generation automotive electronics — spanning ADAS, connected mobility, body electronics, powertrain, and in-cabin experiences. The goal: transition Lumax from component supplier to **Tier 0.5 co-creation partner** for global automakers.

&copy; 2026 Lumax Auto Technologies Limited
