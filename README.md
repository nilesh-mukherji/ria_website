# RIA Advisory — Site Redesign

A premium, modern marketing site for **RIA Advisory**, the global business
and technology consulting firm specializing in Oracle Revenue Management.

## Design system

- **Type**: Instrument Serif (display) · Inter (UI) · JetBrains Mono (eyebrows)
- **Palette**: obsidian `#0B0D12` · bone `#F5F1EA` · aged gold `#D4B97A` · electric blue `#6A8BFF`
- **Voice**: editorial, confident, partner-led
- **Motion**: scroll reveal, animated counters, infinite marquee, subtle parallax

## Pages

| File | Description |
| --- | --- |
| `index.html` | Homepage — hero, capabilities bento, industries, stats, approach, case studies, global footprint, CTA |
| `services.html` | Eight capability blocks across the revenue lifecycle |
| `industries.html` | Financial Services, Utilities, Healthcare Payers, Public Sector |
| `approach.html` | The Recognize / Innovate / Accelerate method + 180-day timeline + operating principles |
| `about.html` | Founding story, timeline, leadership grid, culture |
| `contact.html` | Form + global offices |

## Structure

```
.
├── index.html
├── services.html
├── industries.html
├── approach.html
├── about.html
├── contact.html
├── demo.html               # single-file homepage (CSS + JS inlined) for portable preview
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/logo.svg
```

## Run locally

No build step. Either open the files directly, or serve the folder:

```bash
python3 -m http.server 8000
# then http://localhost:8000
```

`demo.html` is fully self-contained — open it in any browser, no server required.

## Deploy

Drop the folder onto Vercel, Netlify, Cloudflare Pages, or any static host.
