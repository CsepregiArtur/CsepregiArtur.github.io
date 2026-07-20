# DESIGN_APPROVAL_CHECKLIST.md

# Milestone 2 — Design Approval Checklist

Version: 1.2
Status: In Review

---

## Visual Prototype

The interactive wireframe prototype is at: `/wireframe.html`

It demonstrates:
- All sections with real content
- Full responsive behavior (desktop, tablet, mobile)
- Scroll animations
- Sticky header behavior
- Mobile hamburger menu
- All component variants (buttons, cards, timeline, contact cards)

---

## Approval Criteria

### 1. Layout & Structure

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1.1 | Hero section with portrait, title, 3 CTAs | ✅ | 100vh, avatar with ring animation |
| 1.2 | Executive Summary (max 250 words) | ✅ | 4 paragraphs, split layout |
| 1.3 | Leadership Philosophy (4 cards) | ✅ | People First, Data-Driven, CI, Customer Focus |
| 1.4 | Manufacturing Expertise (7 cards) | ✅ | Operations, Lean, Digital, Automation, I4.0, BD, Leadership |
| 1.5 | Key Metrics Bar (3 stats) | ✅ | Dark background, accent-colored numbers |
| 1.6 | Featured Case Studies (alternating L/R) | ✅ | 4 projects with image/content grid |
| 1.7 | Career Timeline (vertical, alternating) | ✅ | 3 entries with dot indicators |
| 1.8 | Education (4 cards) | ✅ | University, Certs, Languages, Learning |
| 1.9 | Skills (5 categories) | ✅ | Grouped with icons and descriptions |
| 1.10 | Contact (80vh, 4 cards) | ✅ | Email, LinkedIn, GitHub, CV |
| 1.11 | Footer (links, social, copyright) | ✅ | Back to top button |

### 2. Navigation

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 2.1 | Sticky header, transparent → solid on scroll | ✅ | Background + blur at 80px |
| 2.2 | Hide on scroll down, show on scroll up | ✅ | TranslateY animation |
| 2.3 | Smooth scroll to sections | ✅ | Via JS smooth scrolling |
| 2.4 | Mobile hamburger with fullscreen overlay | ✅ | Large touch targets |
| 2.5 | Download CV button in header | ✅ | Secondary outline style |

### 3. Responsive Design

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 3.1 | Desktop (1440px+) | ✅ | Full grid layout, alternating case studies |
| 3.2 | Tablet (768–1024px) | ✅ | Single column for hero, 2-col for cards |
| 3.3 | Mobile (<768px) | ✅ | Stacked layout, full-width CTAs |
| 3.4 | No horizontal scrolling | ✅ | overflow-x: hidden |
| 3.5 | Minimum button height 48px | ✅ | Padding ensures touch targets |

### 4. Animations & Interactions

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 4.1 | Fade + slide-up on scroll | ✅ | IntersectionObserver, 300ms |
| 4.2 | Stagger delays (100ms) | ✅ | animate-delay-1/2/3 classes |
| 4.3 | Only trigger once | ✅ | unobserve after animation |
| 4.4 | Card hover: lift + shadow | ✅ | translateY(-4px) + shadow-md |
| 4.5 | Button hover: darker + lift 2px | ✅ | Primary: darken + translateY |
| 4.6 | Max duration 300ms | ✅ | --transition: 250ms |
| 4.7 | Respect prefers-reduced-motion | ✅ | Disables animations |
| 4.8 | No parallax, no bouncing | ✅ | Clean, minimal animations |

### 5. Design System Compliance

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 5.1 | Color palette matches DESIGN_SYSTEM.md | ✅ | All CSS variables match |
| 5.2 | Typography: Inter font | ✅ | Google Fonts, fallback Arial |
| 5.3 | Font sizes correct | ✅ | Hero 48px, section 36px, body 18px |
| 5.4 | Card radius 20px | ✅ | --radius-card |
| 5.5 | Button radius 12px | ✅ | --radius-btn |
| 5.6 | Container max-width 1200px | ✅ | --max-width |
| 5.7 | Spacing 8px system | ✅ | Consistent multiples of 8px |
| 5.8 | Shadows soft | ✅ | shadow-sm and shadow-md |

### 6. Emotional Goal

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 6.1 | Feels like Manufacturing Executive site | ✅ | Clean, confident, professional |
| 6.2 | Not a developer portfolio | ✅ | Business case focus |
| 6.3 | Trust before technology | ✅ | Leadership first, tech as enabler |
| 6.4 | Professional, confident, clear | ✅ | Tone of voice matches |

---

## Approval Decision

```
[  ] APPROVED — Proceed to Milestone 3 (Assets)
[ X] APPROVED WITH CHANGES — List changes below
[  ] REJECTED — Major revisions needed
```

### Changes Requested

conect my image to the siete
dorrect the linked in link
connect the download link for the cv_pdfs from the documents folder 

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Project Owner | Artur Csepregi | ___ | ___ |

---

## Next Steps After Approval

1. Milestone 3: Prepare assets (photo, CV PDF, screenshots, favicon, icons)
2. Milestone 4: Set up development environment (CSS architecture, JS modules)
3. Milestone 5: Build the actual production website
