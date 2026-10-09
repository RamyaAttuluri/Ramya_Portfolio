# Attuluri Ramya — Premium Frontend Portfolio

A modern, responsive glassmorphism portfolio built using **plain HTML, CSS and JavaScript**. There are no frameworks, build tools, databases, APIs or backend server to configure.

## Start the website

1. Extract the ZIP fully (do not open `index.html` from inside a compressed ZIP).
2. Open `index.html` in Chrome, Edge, Firefox or Safari.
3. Browse the projects and click the live-demo cards to explore the three sample websites.

You can also run VS Code's **Live Server** extension, but it is optional.

## Folder structure

```text
Attuluri_Ramya_Glass_Portfolio_Updated/
├── index.html                  Main portfolio website
├── Ramya_Resume.pdf            Your uploaded resume (original content)
├── README.md
├── assets/
│   ├── css/style.css           Glass UI, gradients, responsive layout, animations
│   ├── js/script.js            Menus, theme, filters, project popups, scrolling
│   └── img/                   Your portrait (ramya-portrait.webp), local illustrations and preview screenshots
└── demos/
    ├── ecommerce.html         Demo product catalog, favorites and shopping cart
    ├── recipe-finder.html      Demo recipes, steps and speech playback
    └── weather.html           Demo weather dashboard with sample weather data
```

## Included features

- Premium dark glassmorphism layout with purple, indigo and teal ambient effects
- Light/dark mode with saved preference where storage is available
- Responsive mobile navigation, scroll reveals, your real portrait in the hero, floating glass cards and subtle motion
- Continuous right-to-left animated skills strip (pauses on hover and respects reduced-motion preferences)
- 6 projects with app case-study popups and working website-demo links
- Category filters (All, Applications, Websites, Academic)
- Contact email button (`mailto:`) and Copy Email; no backend form
- Original resume download button
- Keyboard-operable dialogs, focus indicators, reduced-motion support and SEO metadata

## Customize your content

- **Name, intro, about and timeline**: `index.html`
- **Projects**: card markup in `index.html`, extra case-study content in `assets/js/script.js` (`projects` object)
- **Skills**: `index.html` under `#skills`; edit both identical `.stack-group` sets in the scrolling BUILDING WITH bar
- **Hero photo**: replace `assets/img/ramya-portrait.webp` with your own image (keep the same filename)
- **Email**: replace all occurrences of `attuluri03@gmail.com` in `index.html` and `assets/js/script.js`
- **Colors & animation**: `assets/css/style.css` (edit the `:root` CSS variables)
- **Resume**: replace `Ramya_Resume.pdf` with a revised PDF, keeping the same file name
- **GitHub/LinkedIn**: Add real profile links when available; no placeholders were published.

## Important data notes

Information comes from the resume and details previously provided in conversation. The **1-year Mathematics Teacher position (2024–2025)** comes from prior conversation, not the uploaded resume; please confirm exact employer/dates before applying for jobs. The portfolio **does not claim 1 year of professional frontend employment**.

The Real Estate App and Desktop Application screens are original representative illustrations, **not actual screenshots or links to private company code**. The three interactive websites use sample data: the ecommerce shop does not process payments, and the weather dashboard does not provide live forecasts.

**Privacy when publishing:** The original resume PDF includes personal details such as date of birth and marital status. Consider replacing it with a public-safe resume before making the portfolio publicly available.

## Deploy for free

This is a static website. Upload the full folder's contents to GitHub Pages, Netlify, Cloudflare Pages, or any static file host. No deployment environment variables are needed. The design works without internet access (Google Fonts are optional enhancements; fallback fonts are provided).

## Browser compatibility

Use a modern browser. The recipe demo's spoken instructions require browser speech-synthesis support. Clipboard access can be restricted in some browser contexts; a fallback notification shows the email address in that case.
