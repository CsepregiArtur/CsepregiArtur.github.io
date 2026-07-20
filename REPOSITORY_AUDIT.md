# Repository Audit — CsepregiArtur.github.io

**Date:** 2026-07-20  
**Auditor:** Senior Software Architect  
**Scope:** Full repository classification & dependency analysis  
**Total files (non-git):** 59  

---

## Classification Legend

| Category | Description |
|----------|-------------|
| **POR** | Required for the Portfolio Website (index.html, CSS, JS, assets) |
| **DEM** | Required for Live Demo (project demo.html files) |
| **DOC** | Required for Technical Documentation (Technical_Overview.html) |
| **DEP** | Required for Build / Deployment (README, LICENSE, robots.txt, sitemap.xml) |
| **REF** | Referenced but currently unused in production |
| **UNU** | Completely unused (no references anywhere) |
| **ARC** | Candidate for Archive (empty placeholders, deprecated) |
| **UNK** | Unknown (needs manual review) |

---

## File-by-File Classification

### Root Level

#### `index.html`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Production home page. Landing page for csepregiartur.github.io. Contains all case studies, hero, about, timeline, skills, contact. JSON-LD structured data for SEO. |
| **Referenced by** | `sitemap.xml`, `robots.txt` (canonical URL) |
| **References** | `css/variables.css`, `css/style.css`, `css/responsive.css`, `js/navigation.js`, `js/animations.js`, `js/main.js`, `assets/favicon.svg`, `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` (4x), all 4 `projects/*/live_demo.html`, all 4 `projects/*/Technical_Overview.html`, Google Fonts CDN, LinkedIn, GitHub, mailto |
| **Delete breaks?** | **YES** — complete site loss |
| **Confidence** | **High** |

#### `wireframe.html`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Interactive wireframe prototype built during Milestone 3 design validation. All CSS/JS inline. Real photo, CV PDF links, 11 sections matching DESIGN_SYSTEM.md. |
| **Referenced by** | `documents/MILESTONE_3_ASSETS.md` (listed as "Live"), `documents/DESIGN_APPROVAL_CHECKLIST.md` (text mention) |
| **References** | `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` (4x), Google Fonts CDN, LinkedIn, `documents/DESIGN_SYSTEM.md` (comment), `documents/COMPONENT_LIBRARY.md` (comment), `documents/WIREFRAMES.md` (comment), `documents/UI_UX_GUIDELINES.md` (comment) |
| **Delete breaks?** | **No** — `index.html` is the production page. Wireframe is historical/design reference. The `documents/` references are text mentions. However, if someone visits the URL directly, it would 404. |
| **Confidence** | **High** |

#### `README.md`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | GitHub repository documentation. Project structure, quick start, tech stack, contact info. |
| **Referenced by** | GitHub repository page (auto-displayed) |
| **References** | References `showcase/` directory (line 44) that does **NOT exist** (broken reference) |
| **Delete breaks?** | **No** — GitHub Pages deployment unaffected. Removes repo documentation. |
| **Confidence** | **High** |

#### `LICENSE`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | MIT license for open-source repository |
| **Referenced by** | GitHub (auto-detected) |
| **References** | None |
| **Delete breaks?** | **No** — legal documentation only |
| **Confidence** | **High** |

#### `robots.txt`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | SEO — allows all crawlers, points to sitemap |
| **Referenced by** | Search engines via convention |
| **References** | `sitemap.xml` |
| **Delete breaks?** | **No** — SEO impact only |
| **Confidence** | **High** |

#### `sitemap.xml`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | SEO sitemap listing 5 URLs |
| **Referenced by** | `robots.txt` |
| **References** | `index.html`, 4 project directories (`projects/*/`) — but **no `index.html` exists in any project subdirectory** (sitemap lists directory URLs, not file URLs). GitHub Pages will serve directory listing or 404 for these URLs. |
| **Delete breaks?** | **No** — SEO impact only. The project URLs in sitemap are broken (no index.html). |
| **Confidence** | **High** |

---

### CSS

#### `css/variables.css`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Design system variables (colors, spacing, typography, shadows, breakpoints). Referenced by `style.css` and `responsive.css` via `var(--...)`. |
| **Referenced by** | `index.html` (line 22 via `<link>`), `css/style.css`, `css/responsive.css` |
| **References** | None (no `@import` or `url()`) |
| **Delete breaks?** | **YES** — `style.css` and `responsive.css` depend on these variables |
| **Confidence** | **High** |

#### `css/style.css`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Main stylesheet — header, hero, buttons, cards, timeline, contact, animations, stats bar, footer |
| **Referenced by** | `index.html` (line 23 via `<link>`) |
| **References** | `css/variables.css` (via `var(--...)` references) |
| **Delete breaks?** | **YES** — all visual styling lost |
| **Confidence** | **High** |

#### `css/responsive.css`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | 3 breakpoints (1024px, 768px, 480px) for mobile/tablet responsiveness |
| **Referenced by** | `index.html` (line 24 via `<link>`) |
| **References** | `css/variables.css` (via `var(--...)` references) |
| **Delete breaks?** | **YES** — mobile layout breaks on small screens |
| **Confidence** | **High** |

---

### JavaScript

#### `js/navigation.js`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | IIFE — header scroll effect, mobile menu toggle, smooth scroll, active nav link highlighting |
| **Referenced by** | `index.html` (line 567 via `<script>`) |
| **References** | None (standalone, references DOM by ID) |
| **Delete breaks?** | **YES** — header scroll, mobile menu, smooth scroll stop working |
| **Confidence** | **High** |

#### `js/animations.js`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | IIFE — IntersectionObserver-based fade/slide-up animations. Respects `prefers-reduced-motion`. |
| **Referenced by** | `index.html` (line 568 via `<script>`) |
| **References** | None (standalone) |
| **Delete breaks?** | **YES** — all scroll-triggered animations stop working |
| **Confidence** | **High** |

#### `js/main.js`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | IIFE — back-to-top button, stat counter animation, copyright year |
| **Referenced by** | `index.html` (line 569 via `<script>`) |
| **References** | None (standalone) |
| **Delete breaks?** | **YES** — stat counters, copyright year, back-to-top stop working |
| **Confidence** | **High** |

---

### Assets

#### `assets/favicon.svg`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Browser tab icon |
| **Referenced by** | `index.html` (line 20 via `<link rel="icon">`) |
| **References** | None |
| **Delete breaks?** | **No** — cosmetic, browser shows generic icon |
| **Confidence** | **High** |

#### `assets/og-image.svg`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Open Graph / Twitter Card share image |
| **Referenced by** | `index.html` (lines 13, 18 via `<meta property="og:image">` and `<meta name="twitter:image">`) |
| **References** | None |
| **Delete breaks?** | **No** — social share previews lose image. Site still works. |
| **Confidence** | **High** |

#### `assets/.gitkeep`
| Field | Value |
|-------|-------|
| **Category** | **ARC** — Candidate for Archive |
| **Why it exists** | Empty placeholder to keep `assets/` directory in git |
| **Referenced by** | None |
| **References** | None |
| **Delete breaks?** | **No** — directory already has `favicon.svg` and `og-image.svg`, so `.gitkeep` is redundant |
| **Confidence** | **High** |

---

### Architecture

#### `architecture/.gitkeep`
| Field | Value |
|-------|-------|
| **Category** | **ARC** — Candidate for Archive |
| **Why it exists** | Empty placeholder to keep `architecture/` directory in git |
| **Referenced by** | None |
| **References** | None |
| **Delete breaks?** | **No** — directory is empty and unused |
| **Confidence** | **High** |

---

### Images

#### `images/Csepregi_Artur.png`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Profile photo in hero section |
| **Referenced by** | `index.html` (line 80 via `<img>`), `wireframe.html` (line 501 via `<img>`) |
| **References** | None |
| **Delete breaks?** | **YES** — hero section missing profile image on both pages |
| **Confidence** | **High** |

---

### Documents

#### `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf`
| Field | Value |
|-------|-------|
| **Category** | **POR** — Required for the Portfolio Website |
| **Why it exists** | Downloadable CV/Resume |
| **Referenced by** | `index.html` (4x: header CTA, hero CTA, mobile menu, contact card), `wireframe.html` (4x), `documents/DESIGN_APPROVAL_CHECKLIST.md`, `documents/MILESTONE_3_ASSETS.md` |
| **References** | None |
| **Delete breaks?** | **YES** — all "Download CV" buttons link to this PDF |
| **Confidence** | **High** |

#### `documents/COMPONENT_LIBRARY.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Design component documentation. Referenced by comments in `wireframe.html` (7 occurrences mapping component IDs to design specs). |
| **Referenced by** | `wireframe.html` (comment references only, e.g. `/* COMPONENT_LIBRARY.md #3 */`) |
| **References** | None |
| **Delete breaks?** | **No** — comment references, not functional imports. Removes design documentation. |
| **Confidence** | **High** |

#### `documents/CONTENT_STRATEGY.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Content strategy documentation from project planning phase |
| **Referenced by** | Not directly referenced by any code file (likely referenced by `PROJECT_BACKLOG.md` or similar planning docs) |
| **References** | None |
| **Delete breaks?** | **No** — planning documentation only |
| **Confidence** | **Medium** |

#### `documents/COPYWRITING_MASTER.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Copywriting master document from project planning phase |
| **Referenced by** | Not directly referenced by any code file |
| **References** | None |
| **Delete breaks?** | **No** — planning documentation only |
| **Confidence** | **Medium** |

#### `documents/DESIGN_APPROVAL_CHECKLIST.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Design approval checklist from project management phase |
| **Referenced by** | Not directly referenced by any code file |
| **References** | References `wireframe.html`, `documents/DESIGN_SYSTEM.md`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` (text mentions) |
| **Delete breaks?** | **No** — project management documentation only |
| **Confidence** | **Medium** |

#### `documents/DESIGN_SYSTEM.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Design system specification. Referenced by comments in `wireframe.html` (e.g., `/* per DESIGN_SYSTEM.md */`). |
| **Referenced by** | `wireframe.html` (2 comment references in inline CSS), `documents/DESIGN_APPROVAL_CHECKLIST.md` (text mention) |
| **References** | None |
| **Delete breaks?** | **No** — comment references only. The actual design system is implemented in `css/variables.css`. |
| **Confidence** | **High** |

#### `documents/MILESTONE_3_ASSETS.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Milestone 3 asset checklist — tracks which assets are ready for deployment |
| **Referenced by** | Not directly referenced by any code file |
| **References** | `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf`, `assets/favicon.svg`, `assets/og-image.svg`, `wireframe.html`, `showcase/index.html` (🔴 BROKEN), `projects/*/index.html` (🔴 BROKEN ×4) |
| **Delete breaks?** | **No** — project management documentation only. However, note it references 5 non-existent files. |
| **Confidence** | **Medium** |

#### `documents/PROJECT_BACKLOG.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Project backlog — tracks milestones, tasks, and progress |
| **Referenced by** | Not directly referenced by any code file |
| **References** | None |
| **Delete breaks?** | **No** — project management documentation only |
| **Confidence** | **Medium** |

#### `documents/SITEMAP.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Information architecture sitemap documentation |
| **Referenced by** | Not directly referenced by any code file |
| **References** | None |
| **Delete breaks?** | **No** — planning documentation only |
| **Confidence** | **Medium** |

#### `documents/TECHNICAL_SPECIFICATION.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Technical specification. Referenced by `README.md` (line under Tech Stack section). |
| **Referenced by** | `README.md` (text mention: "Full specifications: documents/TECHNICAL_SPECIFICATION.md") |
| **References** | None |
| **Delete breaks?** | **No** — planning documentation only |
| **Confidence** | **High** |

#### `documents/UI_UX_GUIDELINES.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | UI/UX design guidelines. Referenced by comments in `wireframe.html`. |
| **Referenced by** | `wireframe.html` (comment references only) |
| **References** | None |
| **Delete breaks?** | **No** — design documentation only |
| **Confidence** | **High** |

#### `documents/WIREFRAMES.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced but currently unused in production |
| **Why it exists** | Wireframe documentation. Referenced by comments in `wireframe.html`. |
| **Referenced by** | `wireframe.html` (comment references only) |
| **References** | None |
| **Delete breaks?** | **No** — design documentation only |
| **Confidence** | **High** |

---

### Projects — Manufacturing Dashboard

#### `projects/manufacturing-dashboard/live_demo.html`
| Field | Value |
|-------|-------|
| **Category** | **DEM** — Required for the Live Demo |
| **Why it exists** | Full SMD dashboard replica — 10 tabs, 20 API endpoints, 9 change types, ApexCharts, i18n with 4 languages, filters. Interactive demo of the Manufacturing Operations Dashboard. |
| **Referenced by** | `index.html` (line 267 iframe, line 268 link, line 290 "Launch Application" button) |
| **References** | ApexCharts CDN (`cdn.jsdelivr.net/npm/apexcharts`) |
| **Delete breaks?** | **YES** — breaks case study 1 Launch Application button and iframe preview |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Category** | **DOC** — Required for Technical Documentation |
| **Why it exists** | Architecture, API, DB schema reference. Includes "Back to Portfolio" link. |
| **Referenced by** | `index.html` (line 291 "Technical Overview" button) |
| **References** | `../../showcase/index.html` (🔴 **BROKEN** — file does not exist), `../../documents/README.md` (link to repo docs), GitHub repo URL |
| **Delete breaks?** | **YES** — breaks case study 1 Technical Overview button |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Architecture documentation for the project |
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (line 95 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break. No production code depends on it. |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Business case documentation for the project |
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (line 95 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Executive summary for the project |
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (line 95 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Category** | **UNU** — Completely unused |
| **Why it exists** | Lessons learned documentation from the project |
| **Referenced by** | **None** — not referenced by any file in the repository |
| **References** | None |
| **Delete breaks?** | **No** — unreferenced file |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/README.md`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | Project documentation index. Links to 6 sub-documents (one broken: `IMPLEMENTATION.md`). |
| **Referenced by** | GitHub (auto-displayed when browsing project directory) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, `./IMPLEMENTATION.md` (🔴 **BROKEN**), `./RESULTS.md`, `./TECH_STACK.md` |
| **Delete breaks?** | **No** — README loss only. But it contains the only references to the ARCHITECTURE/BUSINESS_CASE/EXECUTIVE_SUMMARY/RESULTS/TECH_STACK docs. |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/RESULTS.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Results documentation for the project |
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (line 95 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Tech stack documentation for the project |
| **Referenced by** | `projects/manufacturing-dashboard/README.md` (line 95 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/manufacturing-dashboard/.gitkeep`
| Field | Value |
|-------|-------|
| **Category** | **ARC** — Candidate for Archive |
| **Why it exists** | Empty placeholder to keep directory in git |
| **Referenced by** | None |
| **References** | None |
| **Delete breaks?** | **No** — directory has other files now |
| **Confidence** | **High** |

---

### Projects — SMT Production Monitoring

#### `projects/smt-production-monitoring/live_demo.html`
| Field | Value |
|-------|-------|
| **Category** | **DEM** — Required for the Live Demo |
| **Why it exists** | Andon light dashboard with 5 lines, 4 station types (PRINTER/MOUNTER/OVEN/OPTICAL), supervisor view. Interactive demo of SMT Line Monitoring. |
| **Referenced by** | `index.html` (line 299 iframe, line 300 link, line 323 "Launch Application" button) |
| **References** | Google Fonts CDN |
| **Delete breaks?** | **YES** — breaks case study 2 Launch Application button and iframe preview |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Category** | **DOC** — Required for Technical Documentation |
| **Why it exists** | Validation rules, Andon system, notification channels. Includes "Back to Portfolio" link. |
| **Referenced by** | `index.html` (line 324 "Technical Overview" button) |
| **References** | `../../showcase/index.html` (🔴 **BROKEN** — file does not exist), `../../documents/README.md`, GitHub repo URL |
| **Delete breaks?** | **YES** — breaks case study 2 Technical Overview button |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Architecture documentation for the project |
| **Referenced by** | `projects/smt-production-monitoring/README.md` (line 105 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Business case documentation for the project |
| **Referenced by** | `projects/smt-production-monitoring/README.md` (line 105 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Executive summary for the project |
| **Referenced by** | `projects/smt-production-monitoring/README.md` (line 105 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Category** | **UNU** — Completely unused |
| **Why it exists** | Lessons learned documentation from the project |
| **Referenced by** | **None** — not referenced by any file in the repository |
| **References** | None |
| **Delete breaks?** | **No** — unreferenced file |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/Metrics.md`
| Field | Value |
|-------|-------|
| **Category** | **UNU** — Completely unused |
| **Why it exists** | Metrics documentation. Contains Google Analytics and Clarity tracking code references. |
| **Referenced by** | **None** — not referenced by any file in the repository |
| **References** | Google Analytics CDN, Microsoft Clarity CDN (external URLs only) |
| **Delete breaks?** | **No** — unreferenced file. The tracking codes mentioned are not actually used in any live HTML file. |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/README.md`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | Project documentation index. Links to 6 sub-documents (one broken: `IMPLEMENTATION.md`). |
| **Referenced by** | GitHub (auto-displayed when browsing project directory) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, `./IMPLEMENTATION.md` (🔴 **BROKEN**), `./RESULTS.md`, `./TECH_STACK.md` |
| **Delete breaks?** | **No** — README loss only. But it contains the only references to the ARCHITECTURE/BUSINESS_CASE/EXECUTIVE_SUMMARY/RESULTS/TECH_STACK docs. |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/RESULTS.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Results documentation for the project |
| **Referenced by** | `projects/smt-production-monitoring/README.md` (line 105 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Tech stack documentation for the project |
| **Referenced by** | `projects/smt-production-monitoring/README.md` (line 105 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/smt-production-monitoring/.gitkeep`
| Field | Value |
|-------|-------|
| **Category** | **ARC** — Candidate for Archive |
| **Why it exists** | Empty placeholder to keep directory in git |
| **Referenced by** | None |
| **References** | None |
| **Delete breaks?** | **No** — directory has other files now |
| **Confidence** | **High** |

---

### Projects — HIVE WMS

#### `projects/hive-wms/live_demo.html`
| Field | Value |
|-------|-------|
| **Category** | **DEM** — Required for the Live Demo |
| **Why it exists** | Dashboard + 3 interactive demo tabs (ML Predictions with 7 models, Job Pipeline with 6-step animation, DB Schema explorer). Interactive demo of HIVE WMS. |
| **Referenced by** | `index.html` (line 332 iframe, line 333 link, line 356 "Launch Application" button) |
| **References** | Google Fonts CDN |
| **Delete breaks?** | **YES** — breaks case study 3 Launch Application button and iframe preview |
| **Confidence** | **High** |

#### `projects/hive-wms/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Category** | **DOC** — Required for Technical Documentation |
| **Why it exists** | Architecture layers, 7 ML models, DB design. Includes "Back to Portfolio" link. |
| **Referenced by** | `index.html` (line 357 "Technical Overview" button) |
| **References** | `../../showcase/index.html` (🔴 **BROKEN** — file does not exist), `../../documents/README.md`, GitHub repo URL |
| **Delete breaks?** | **YES** — breaks case study 3 Technical Overview button |
| **Confidence** | **High** |

#### `projects/hive-wms/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Architecture documentation for the project |
| **Referenced by** | `projects/hive-wms/README.md` (line 96 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/hive-wms/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Business case documentation for the project |
| **Referenced by** | `projects/hive-wms/README.md` (line 96 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/hive-wms/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Executive summary for the project |
| **Referenced by** | `projects/hive-wms/README.md` (line 96 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/hive-wms/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Category** | **UNU** — Completely unused |
| **Why it exists** | Lessons learned documentation from the project |
| **Referenced by** | **None** — not referenced by any file in the repository |
| **References** | None |
| **Delete breaks?** | **No** — unreferenced file |
| **Confidence** | **High** |

#### `projects/hive-wms/README.md`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | Project documentation index. Links to 6 sub-documents (all valid — no broken `IMPLEMENTATION.md` link unlike other projects). |
| **Referenced by** | GitHub (auto-displayed when browsing project directory) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, `./TECH_STACK.md`, `./RESULTS.md` |
| **Delete breaks?** | **No** — README loss only. But it contains the only references to the ARCHITECTURE/BUSINESS_CASE/EXECUTIVE_SUMMARY/TECH_STACK/RESULTS docs. |
| **Confidence** | **High** |

#### `projects/hive-wms/RESULTS.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Results documentation for the project |
| **Referenced by** | `projects/hive-wms/README.md` (line 96 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/hive-wms/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Tech stack documentation for the project |
| **Referenced by** | `projects/hive-wms/README.md` (line 96 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

---

### Projects — Inventory Export

#### `projects/inventory-export/live_demo.html`
| Field | Value |
|-------|-------|
| **Category** | **DEM** — Required for the Live Demo |
| **Why it exists** | Desktop app UI with config panel, progress simulation, results table, log console, FIFO/FEFO toggle. Interactive demo of Automated Inventory Data Extraction. |
| **Referenced by** | `index.html` (line 365 iframe, line 366 link, line 388 "Launch Application" button) |
| **References** | Google Fonts CDN |
| **Delete breaks?** | **YES** — breaks case study 4 Launch Application button and iframe preview |
| **Confidence** | **High** |

#### `projects/inventory-export/Technical_Overview.html`
| Field | Value |
|-------|-------|
| **Category** | **DOC** — Required for Technical Documentation |
| **Why it exists** | Performance benchmarks, architecture, export schema. Includes "Back to Portfolio" link. |
| **Referenced by** | `index.html` (line 389 "Technical Overview" button) |
| **References** | `../../showcase/index.html` (🔴 **BROKEN** — file does not exist), `../../documents/README.md`, GitHub repo URL |
| **Delete breaks?** | **YES** — breaks case study 4 Technical Overview button |
| **Confidence** | **High** |

#### `projects/inventory-export/ARCHITECTURE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Architecture documentation for the project |
| **Referenced by** | `projects/inventory-export/README.md` (line 102 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/inventory-export/BUSINESS_CASE.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Business case documentation for the project |
| **Referenced by** | `projects/inventory-export/README.md` (line 102 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/inventory-export/EXECUTIVE_SUMMARY.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Executive summary for the project |
| **Referenced by** | `projects/inventory-export/README.md` (line 102 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/inventory-export/LESSONS_LEARNED.md`
| Field | Value |
|-------|-------|
| **Category** | **UNU** — Completely unused |
| **Why it exists** | Lessons learned documentation from the project |
| **Referenced by** | **None** — not referenced by any file in the repository |
| **References** | None |
| **Delete breaks?** | **No** — unreferenced file |
| **Confidence** | **High** |

#### `projects/inventory-export/README.md`
| Field | Value |
|-------|-------|
| **Category** | **DEP** — Required for Build / Deployment |
| **Why it exists** | Project documentation index. Links to 6 sub-documents (one broken: `IMPLEMENTATION.md`). |
| **Referenced by** | GitHub (auto-displayed when browsing project directory) |
| **References** | `./EXECUTIVE_SUMMARY.md`, `./BUSINESS_CASE.md`, `./ARCHITECTURE.md`, `./IMPLEMENTATION.md` (🔴 **BROKEN**), `./RESULTS.md`, `./TECH_STACK.md` |
| **Delete breaks?** | **No** — README loss only. But it contains the only references to the ARCHITECTURE/BUSINESS_CASE/EXECUTIVE_SUMMARY/RESULTS/TECH_STACK docs. |
| **Confidence** | **High** |

#### `projects/inventory-export/RESULTS.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Results documentation for the project |
| **Referenced by** | `projects/inventory-export/README.md` (line 102 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

#### `projects/inventory-export/TECH_STACK.md`
| Field | Value |
|-------|-------|
| **Category** | **REF** — Referenced by project README |
| **Why it exists** | Tech stack documentation for the project |
| **Referenced by** | `projects/inventory-export/README.md` (line 102 link) |
| **References** | None |
| **Delete breaks?** | **No** — README link would break |
| **Confidence** | **High** |

---

## Summary Statistics

| Category | Count | Files |
|----------|-------|-------|
| **POR** — Required for Portfolio | 12 | `index.html`, `css/variables.css`, `css/style.css`, `css/responsive.css`, `js/navigation.js`, `js/animations.js`, `js/main.js`, `assets/favicon.svg`, `assets/og-image.svg`, `images/Csepregi_Artur.png`, `documents/Artur_Csepregi_Head_of_SMT_Operations.pdf` |
| **DEM** — Required for Live Demo | 4 | `projects/*/live_demo.html` (×4) |
| **DOC** — Required for Technical Documentation | 4 | `projects/*/Technical_Overview.html` (×4) |
| **DEP** — Required for Build/Deployment | 7 | `README.md`, `LICENSE`, `robots.txt`, `sitemap.xml`, `projects/*/README.md` (×4) |
| **REF** — Referenced but unused | 27 | `wireframe.html`, `documents/*.md` (×10), `projects/*/ARCHITECTURE.md` (×4), `projects/*/BUSINESS_CASE.md` (×4), `projects/*/EXECUTIVE_SUMMARY.md` (×4), `projects/*/RESULTS.md` (×4) |
| **UNU** — Completely unused | 5 | `projects/*/LESSONS_LEARNED.md` (×4), `projects/smt-production-monitoring/Metrics.md` |
| **ARC** — Candidate for Archive | 4 | `architecture/.gitkeep`, `assets/.gitkeep`, `projects/manufacturing-dashboard/.gitkeep`, `projects/smt-production-monitoring/.gitkeep` |
| **UNK** — Unknown | 0 | — |

---

## Critical Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 1 | **Broken `showcase/index.html` link** | 🔴 High | All 4 `Technical_Overview.html` files link to `../../showcase/index.html` which does not exist. Also referenced in `documents/MILESTONE_3_ASSETS.md` and `README.md`. |
| 2 | **Missing `IMPLEMENTATION.md`** | 🟡 Medium | 3 project READMEs (`manufacturing-dashboard`, `smt-production-monitoring`, `inventory-export`) link to `./IMPLEMENTATION.md` which does not exist. |
| 3 | **Sitemap URLs point to directories without `index.html`** | 🟡 Medium | `sitemap.xml` lists 4 project URLs ending with `/` but no `index.html` exists in any project subdirectory. GitHub Pages may show a 404 or directory listing. |
| 4 | **4 `LESSONS_LEARNED.md` files unreferenced** | 🟢 Low | One per project. Not linked from READMEs or any other file. |
| 5 | **`Metrics.md` unreferenced** | 🟢 Low | Contains unused Google Analytics/Clarity references. Not loaded by any live HTML file. |
| 6 | **4 `.gitkeep` files redundant** | 🟢 Low | Directories already have content files. `.gitkeep` placeholders are no longer needed. |

---

## Recommendations

1. **Create `showcase/index.html`** — Fix all "Back to Portfolio" links in Technical_Overview.html files (or update links to point to `../../index.html`). This is the highest-priority fix.
2. **Create `IMPLEMENTATION.md`** in 3 project directories — Fix broken README links, or remove the references.
3. **Add `index.html` redirects** in project directories — Create minimal `index.html` files that redirect to `live_demo.html` for proper sitemap/social link resolution.
4. **Remove `.gitkeep` files** — All 4 are redundant since directories contain actual files.
5. **Archive `documents/` strategy docs** — Move to `archive/` or remove. They are only referenced by comments in `wireframe.html` and have no production function.
