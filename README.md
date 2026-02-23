<p align="center">
  <img src="assets/images/shift-logo.svg" alt="SHIFT by Lumax Logo" width="320"/>
</p>

# SHIFT by Lumax — Website

A clean, fast, no-framework HTML/CSS/JS website for the SHIFT R&D portal.

---

## 📁 Project Structure

```
shift/
├── index.html                  ← Homepage
├── roadmap.html                ← Roadmap page (to build)
├── insights.html               ← R&D Insights (to build)
├── team.html                   ← Team / Org chart (to build)
├── contact.html                ← Contact page (to build)
│
├── products/
│   ├── index.html              ← Products overview (to build)
│   ├── dms.html                ← DMS product page (to build)
│   ├── svs.html
│   ├── sidestep.html
│   ├── camera.html
│   ├── motor-controller.html
│   ├── type-c-charger.html
│   ├── wireless-charger.html
│   └── gesture-control.html
│
├── css/
│   └── style.css               ← ALL shared styles (one file)
│
├── js/
│   └── main.js                 ← Partial loader + interactions
│
├── partials/
│   ├── nav.html                ← Shared navigation (edit once)
│   └── footer.html             ← Shared footer (edit once)
│
└── assets/
    ├── images/                 ← Photos, product images
    └── icons/                  ← SVG icons if needed
```

---

## ⚙️ How Partials Work

The nav and footer are written **once** and included on every page automatically via JavaScript fetch.

**In each HTML page**, place these two divs:
```html
<!-- Top of <body> -->
<div data-include="partials/nav.html"></div>

<!-- Bottom of <body>, before </body> -->
<div data-include="partials/footer.html"></div>
```

For pages inside subdirectories (e.g. `products/dms.html`), use relative paths:
```html
<div data-include="../partials/nav.html"></div>
<div data-include="../partials/footer.html"></div>
```

And update CSS/JS paths too:
```html
<link rel="stylesheet" href="../css/style.css">
<script src="../js/main.js"></script>
```

---

## 🖊️ Adding a New Page

Copy this starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description here.">
  <title>Page Title — SHIFT by Lumax</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div data-include="partials/nav.html"></div>

  <!-- Page Hero -->
  <div class="page-hero">
    <div class="breadcrumb">
      <a href="index.html">Home</a> › Page Name
    </div>
    <h1>Page Title</h1>
    <p>Short description of this page.</p>
  </div>

  <!-- Your content sections here -->
  <section>
    ...
  </section>

  <div data-include="partials/footer.html"></div>
  <script src="js/main.js"></script>
</body>
</html>
```

---

## 🚀 Deployment

**Option A — Any static server (Apache/Nginx):**
Upload the entire `shift/` folder to your server's web root (e.g. `/var/www/html/shift/`).

⚠️ **Important:** Partials use `fetch()`, so you **must** serve via HTTP — not by opening HTML files directly (`file://`). Use a local dev server for testing:
```bash
# Python (built-in)
cd shift && python3 -m http.server 8080

# Node.js (npx)
cd shift && npx serve .
```

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

---

## 🎨 Customization

**Colors** — edit the `:root` block at the top of `css/style.css`:
```css
:root {
  --red:  #d42e24;   /* ← change to Lumax brand red */
  --dark: #1a1d26;
  /* ... */
}
```

**Nav links** — edit `partials/nav.html` only. All pages update automatically.

**Footer** — edit `partials/footer.html` only.

---

## 📋 Pages Left to Build

- [ ] `products/index.html` — product overview grid with filters
- [ ] `products/dms.html` — individual product page template
- [ ] `roadmap.html` — timeline/kanban view
- [ ] `insights.html` — articles/blog feed
- [ ] `team.html` — org chart + team cards
- [ ] `contact.html` — contact form + key contacts
"# shift-website" 
