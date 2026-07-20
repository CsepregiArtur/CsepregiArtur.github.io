# Dependency Report — CsepregiArtur.github.io

**Date:** 2026-07-20  
**Format:** Every file analyzed for "Referenced by", "References", "Safe to archive", "Confidence"

---

## Root Level

### `index.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `sitemap.xml`, `robots.txt` (canonical URL) |
| **References** | `css/variables.css`, `css/style.css`, `css/responsive.css`, `js/navigation.js`, `js/animations.js`, `js/main.js`, `assets/favicon.svg`, `assets/og-image.svg`, `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` (4×), `projects/manufacturing-dashboard/live_demo.html` (iframe + 2 links), `projects/manufacturing-dashboard/Technical_Overview.html`, `projects/smt-production-monitoring/live_demo.html` (iframe + 2 links), `projects/smt-production-monitoring/Technical_Overview.html`, `projects/hive-wms/live_demo.html` (iframe + 2 links), `projects/hive-wms/Technical_Overview.html`, `projects/inventory-export/live_demo.html` (iframe + 2 links), `projects/inventory-export/Technical_Overview.html`, Google Fonts CDN, LinkedIn, GitHub, mailto |
| **Safe to archive** | **NO** — production entry point |
| **Confidence** | **High** |

### `wireframe.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `documents/MILESTONE_3_ASSETS.md` (text mention), `documents/DESIGN_APPROVAL_CHECKLIST.md` (text mention) |
| **References** | `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` (4×), Google Fonts CDN, LinkedIn |
| **Safe to archive** | **YES** — design prototype, not used in production. No production file references it. |
| **Confidence** | **High** |

### `README.md`
| Field | Value |
|-------|-------|
| **Referenced by** | GitHub repository page (auto-displayed) |
| **References** | Mentions `showcase/` directory (🔴 does not exist), `documents/TECHNICAL_SPECIFICATION.md` |
| **Safe to archive** | **YES** — no production dependency. GitHub will show repo without readme. |
| **Confidence** | **High** |

### `LICENSE`
| Field | Value |
|-------|-------|
| **Referenced by** | GitHub (auto-detected) |
| **References** | None |
| **Safe to archive** | **YES** — legal docs can be archived. No code dependency. |
| **Confidence** | **High** |

### `robots.txt`
| Field | Value |
|-------|-------|
| **Referenced by** | Search engine crawlers (by convention) |
| **References** | `sitemap.xml` |
| **Safe to archive** | **YES** — SEO only. Site works without it. |
| **Confidence** | **High** |

### `sitemap.xml`
| Field | Value |
|-------|-------|
| **Referenced by** | `robots.txt` |
| **References** | `https://csepregiartur.github.io/` (valid), `https://csepregiartur.github.io/projects/manufacturing-dashboard/` (⚠️ no index.html), `https://csepregiartur.github.io/projects/smt-production-monitoring/` (⚠️), `https://csepregiartur.github.io/projects/hive-wms/` (⚠️), `https://csepregiartur.github.io/projects/inventory-export/` (⚠️) |
| **Safe to archive** | **YES** — SEO only. Contains 4 broken URLs (no index.html in project dirs). |
| **Confidence** | **High** |

---

## CSS

### `css/variables.css`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<link>`), `css/style.css` (via `var()`), `css/responsive.css` (via `var()`) |
| **References** | None |
| **Safe to archive** | **NO** — required by `style.css` and `responsive.css` |
| **Confidence** | **High** |

### `css/style.css`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<link>`) |
| **References** | `css/variables.css` (via `var(--...)`) |
| **Safe to archive** | **NO** — production styles |
| **Confidence** | **High** |

### `css/responsive.css`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<link>`) |
| **References** | `css/variables.css` (via `var(--...)`) |
| **Safe to archive** | **NO** — mobile responsiveness |
| **Confidence** | **High** |

---

## JavaScript

### `js/navigation.js`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<script>`) |
| **References** | None (standalone IIFE, queries DOM by ID) |
| **Safe to archive** | **NO** — header scroll, mobile menu, smooth scroll |
| **Confidence** | **High** |

### `js/animations.js`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<script>`) |
| **References** | None (standalone IIFE, IntersectionObserver) |
| **Safe to archive** | **NO** — scroll animations |
| **Confidence** | **High** |

### `js/main.js`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<script>`) |
| **References** | None (standalone IIFE) |
| **Safe to archive** | **NO** — back-to-top, stat counters, copyright |
| **Confidence** | **High** |

---

## Assets

### `assets/favicon.svg`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<link rel="icon">`) |
| **References** | None |
| **Safe to archive** | **YES** — cosmetic. Browser shows generic icon if missing. |
| **Confidence** | **High** |

### `assets/og-image.svg`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (OG meta tags, Twitter Card meta tag) |
| **References** | None |
| **Safe to archive** | **YES** — social share previews lose image. Site functions. |
| **Confidence** | **High** |

### `assets/.gitkeep`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — redundant placeholder |
| **Confidence** | **High** |

---

## Architecture

### `architecture/.gitkeep`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — empty directory placeholder |
| **Confidence** | **High** |

---

## Images

### `images/Csepregi_Artur.png`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (`<img>`), `wireframe.html` (`<img>`) |
| **References** | None |
| **Safe to archive** | **NO** — profile photo in hero section of both pages |
| **Confidence** | **High** |

---

## Documents

### `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (4× Download CV links), `wireframe.html` (4× Download CV links), `documents/DESIGN_APPROVAL_CHECKLIST.md`, `documents/MILESTONE_3_ASSETS.md` |
| **References** | None |
| **Safe to archive** | **NO** — all Download CV buttons link to this file |
| **Confidence** | **High** |

### `documents/COMPONENT_LIBRARY.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `wireframe.html` (7 comment references) |
| **References** | None |
| **Safe to archive** | **YES** — design documentation. Comment references only. |
| **Confidence** | **High** |

### `documents/CONTENT_STRATEGY.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None (planning phase artifact) |
| **References** | None |
| **Safe to archive** | **YES** — planning documentation |
| **Confidence** | **Medium** |

### `documents/COPYWRITING_MASTER.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None (planning phase artifact) |
| **References** | None |
| **Safe to archive** | **YES** — planning documentation |
| **Confidence** | **Medium** |

### `documents/DESIGN_APPROVAL_CHECKLIST.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None (planning phase artifact) |
| **References** | `wireframe.html` (text mention), `documents/DESIGN_SYSTEM.md` (text mention), `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` (text mention) |
| **Safe to archive** | **YES** — planning documentation |
| **Confidence** | **Medium** |

### `documents/DESIGN_SYSTEM.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `wireframe.html` (2 comment references), `documents/DESIGN_APPROVAL_CHECKLIST.md` (text mention) |
| **References** | None |
| **Safe to archive** | **YES** — design documentation. Design system is implemented in `css/variables.css`. |
| **Confidence** | **High** |

### `documents/MILESTONE_3_ASSETS.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None (planning phase artifact) |
| **References** | 🔴 `showcase/index.html` (broken), 🔴 `projects/*/index.html` (broken ×4), `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf`, `assets/favicon.svg`, `assets/og-image.svg`, `wireframe.html` |
| **Safe to archive** | **YES** — planning documentation. Contains 5 broken references. |
| **Confidence** | **Medium** |

### `documents/PROJECT_BACKLOG.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None (planning phase artifact) |
| **References** | None |
| **Safe to archive** | **YES** — planning documentation |
| **Confidence** | **Medium** |

### `documents/SITEMAP.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None (planning phase artifact) |
| **References** | None |
| **Safe to archive** | **YES** — planning documentation |
| **Confidence** | **Medium** |

### `documents/TECHNICAL_SPECIFICATION.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `README.md` (1 text mention: "Full specifications: documents/TECHNICAL_SPECIFICATION.md") |
| **References** | None |
| **Safe to archive** | **YES** — planning documentation. A README text mention is the only reference. |
| **Confidence** | **High** |

### `documents/UI_UX_GUIDELINES.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `wireframe.html` (2 comment references) |
| **References** | None |
| **Safe to archive** | **YES** — design documentation. Comment references only. |
| **Confidence** | **High** |

### `documents/WIREFRAMES.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `wireframe.html` (3 comment references) |
| **References** | None |
| **Safe to archive** | **YES** — design documentation. Comment references only. |
| **Confidence** | **High** |

---

## Projects — Manufacturing Dashboard

### `projects/manufacturing-dashboard/live_demo.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (iframe, preview link, Launch Application button) |
| **References** | ApexCharts CDN |
| **Safe to archive** | **NO** — case study 1 interactive demo |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (Technical Overview button) |
| **References** | 🔴 `../../showcase/index.html` (broken), `../../documents/README.md`, GitHub repo URL, Google Fonts CDN |
| **Safe to archive** | **NO** — case study 1 technical documentation |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — completely unreferenced |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/README.md`
| Field | Value |
|-------|-------|
| **Referenced by** | GitHub repository browser (auto-displayed) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, 🔴 `./IMPLEMENTATION.md` (broken), `./RESULTS.md`, `./TECH_STACK.md` |
| **Safe to archive** | **YES** — no production code reference. Contains the only links to sub-documents. |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/RESULTS.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/manufacturing-dashboard/.gitkeep`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — redundant placeholder |
| **Confidence** | **High** |

---

## Projects — SMT Production Monitoring

### `projects/smt-production-monitoring/live_demo.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (iframe, preview link, Launch Application button) |
| **References** | Google Fonts CDN |
| **Safe to archive** | **NO** — case study 2 interactive demo |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (Technical Overview button) |
| **References** | 🔴 `../../showcase/index.html` (broken), `../../documents/README.md`, GitHub repo URL, Google Fonts CDN |
| **Safe to archive** | **NO** — case study 2 technical documentation |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/smt-production-monitoring/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/smt-production-monitoring/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/smt-production-monitoring/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — completely unreferenced |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/Metrics.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | Google Analytics CDN URL, Microsoft Clarity CDN URL (external URLs only — not actual imports) |
| **Safe to archive** | **YES** — completely unreferenced. The tracking codes are not used in any live HTML file. |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/README.md`
| Field | Value |
|-------|-------|
| **Referenced by** | GitHub repository browser (auto-displayed) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, 🔴 `./IMPLEMENTATION.md` (broken), `./RESULTS.md`, `./TECH_STACK.md` |
| **Safe to archive** | **YES** — no production code reference |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/RESULTS.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/smt-production-monitoring/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/smt-production-monitoring/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/smt-production-monitoring/.gitkeep`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — redundant placeholder |
| **Confidence** | **High** |

---

## Projects — HIVE WMS

### `projects/hive-wms/live_demo.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (iframe, preview link, Launch Application button) |
| **References** | Google Fonts CDN |
| **Safe to archive** | **NO** — case study 3 interactive demo |
| **Confidence** | **High** |

### `projects/hive-wms/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (Technical Overview button) |
| **References** | 🔴 `../../showcase/index.html` (broken), `../../documents/README.md`, GitHub repo URL, Google Fonts CDN |
| **Safe to archive** | **NO** — case study 3 technical documentation |
| **Confidence** | **High** |

### `projects/hive-wms/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/hive-wms/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/hive-wms/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/hive-wms/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/hive-wms/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/hive-wms/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/hive-wms/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — completely unreferenced |
| **Confidence** | **High** |

### `projects/hive-wms/README.md`
| Field | Value |
|-------|-------|
| **Referenced by** | GitHub repository browser (auto-displayed) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, `./TECH_STACK.md`, `./RESULTS.md` |
| **Safe to archive** | **YES** — no production code reference. Note: this README has NO broken `IMPLEMENTATION.md` link (unlike the other 3 project READMEs). |
| **Confidence** | **High** |

### `projects/hive-wms/RESULTS.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/hive-wms/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/hive-wms/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/hive-wms/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

---

## Projects — Inventory Export

### `projects/inventory-export/live_demo.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (iframe, preview link, Launch Application button) |
| **References** | Google Fonts CDN |
| **Safe to archive** | **NO** — case study 4 interactive demo |
| **Confidence** | **High** |

### `projects/inventory-export/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Referenced by** | `index.html` (Technical Overview button) |
| **References** | 🔴 `../../showcase/index.html` (broken), `../../documents/README.md`, GitHub repo URL, Google Fonts CDN |
| **Safe to archive** | **NO** — case study 4 technical documentation |
| **Confidence** | **High** |

### `projects/inventory-export/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/inventory-export/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/inventory-export/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/inventory-export/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/inventory-export/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/inventory-export/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/inventory-export/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Referenced by** | None |
| **References** | None |
| **Safe to archive** | **YES** — completely unreferenced |
| **Confidence** | **High** |

### `projects/inventory-export/README.md`
| Field | Value |
|-------|-------|
| **Referenced by** | GitHub repository browser (auto-displayed) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, 🔴 `./IMPLEMENTATION.md` (broken), `./RESULTS.md`, `./TECH_STACK.md` |
| **Safe to archive** | **YES** — no production code reference |
| **Confidence** | **High** |

### `projects/inventory-export/RESULTS.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/inventory-export/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

### `projects/inventory-export/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Referenced by** | `projects/inventory-export/README.md` (link) |
| **References** | None |
| **Safe to archive** | **YES** — only the project README references it |
| **Confidence** | **High** |

---

## External Dependencies

| Dependency | Used By | Type | Safe to remove? |
|------------|---------|------|-----------------|
| Google Fonts (Inter) | `index.html`, `wireframe.html`, all 4 `live_demo.html`, all 4 `Technical_Overview.html` | CSS font loading | **NO** — design system depends on Inter font |
| ApexCharts CDN | `projects/manufacturing-dashboard/live_demo.html` | JavaScript library | **NO** — all charts in the dashboard demo depend on it |
| LinkedIn URL | `index.html`, `wireframe.html` | External link | **YES** — link only |
| GitHub URL | `index.html` | External link | **YES** — link only |
| mailto: email | `index.html` | Contact link | **YES** — link only |

---

## Dependency Graph (Simplified)

```
sitemap.xml ──► index.html
robots.txt  ──► sitemap.xml

index.html ──┬──► css/variables.css
             ├──► css/style.css ──► css/variables.css
             ├──► css/responsive.css ──► css/variables.css
             ├──► js/navigation.js
             ├──► js/animations.js
             ├──► js/main.js
             ├──► assets/favicon.svg
             ├──► assets/og-image.svg
             ├──► images/Csepregi_Artur.png
             ├──► documents/Artur_Csepregi_Head_of_SMT_Operations.pdf
             ├──► projects/*/live_demo.html (×4)
             └──► projects/*/Technical_Overview.html (×4)

projects/*/live_demo.html ──► Google Fonts CDN
projects/manufacturing-dashboard/live_demo.html ──► ApexCharts CDN
projects/*/Technical_Overview.html ──► ../../showcase/index.html 🔴 (broken)
```

---

## Broken References Summary

| Broken Reference | Found In | Suggested Fix |
|-----------------|----------|---------------|
| `../../showcase/index.html` | All 4 `Technical_Overview.html` files | Update to `../../index.html` or create `showcase/index.html` |
| `./IMPLEMENTATION.md` | 3 project READMEs (not HIVE WMS) | Create empty `IMPLEMENTATION.md` or remove link from README |
| `projects/*/index.html` in sitemap | `sitemap.xml` | Add `index.html` redirects in project dirs |
