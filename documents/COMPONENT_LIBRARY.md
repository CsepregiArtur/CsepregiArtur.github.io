# COMPONENT_LIBRARY.md

# Executive Portfolio Website
## Component Library

Version: 1.0

---

# 1. Header

## Purpose

Site navigation and branding.

## Structure

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]       Nav Links                    [Download CV]      │
└──────────────────────────────────────────────────────────────┘
```

## States

| State | Behavior |
|-------|----------|
| Default | Transparent background |
| Scrolled | Solid background (#FFFFFF with shadow) |
| Scroll Down | Hidden (slides up) |
| Scroll Up | Visible (slides down) |

## Properties

- Position: fixed, top
- Z-index: 1000
- Height: 72px (desktop), 60px (mobile)
- Logo: 32px height
- Background transition: 300ms

## Mobile Variant

```
┌──────────────────────┐
│ [Logo]          ☰   │
└──────────────────────┘

Fullscreen overlay on ☰ click:
┌──────────────────────┐
│         ✕            │
│                      │
│  Home                │
│  About               │
│  Leadership          │
│  Projects            │
│  Experience          │
│  Skills              │
│  Contact             │
│                      │
│  [Download CV]       │
└──────────────────────┘
```

---

# 2. Button

## Variants

### Primary Button

```
┌──────────────────────┐
│  Download CV         │
└──────────────────────┘
```

- Background: #2563EB
- Text: #FFFFFF
- Padding: 14px 28px
- Border-radius: 12px
- Font: Inter, 16px, Medium
- Hover: Background darkens, transform translateY(-2px)
- Transition: 250ms ease
- Cursor: pointer

### Secondary Button

```
┌──────────────────────┐
│  View Projects       │
└──────────────────────┘
```

- Background: transparent
- Text: #2563EB
- Border: 2px solid #2563EB
- Padding: 14px 28px
- Border-radius: 12px
- Font: Inter, 16px, Medium
- Hover: Background rgba(37,99,235,0.08)
- Transition: 250ms ease

### Ghost Button

```
┌──────────────────────┐
│  LinkedIn            │
└──────────────────────┘
```

- Background: transparent
- Text: #6B7280
- Padding: 12px 24px
- Border-radius: 12px
- Hover: Background rgba(0,0,0,0.05), text darkens
- Transition: 250ms ease

## Usage Rules

- Minimum touch target: 48px height on mobile
- Icons inside buttons: 20px, left-aligned before text
- Buttons in a group: 16px gap between them
- Focus state: visible outline (2px blue, 2px offset)

---

# 3. Section Title

## Structure

```
Subtitle (small, uppercase, #6B7280, 16px)
Title (large, #0F172A, 36px)
Description (body, #6B7280, 18px, optional)
```

## Usage

Every major section starts with a Section Title component.

---

# 4. Hero

## Structure

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌──────────┐                                                │
│  │ Portrait │  Manufacturing Leader Driving                  │
│  │ 180x180  │  Operational Excellence                        │
│  │ rounded  │                                                │
│  │          │  Subheadline text here                         │
│  └──────────┘                                                │
│                                                              │
│  [Primary]  [Secondary]  [Ghost]                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Properties

- Height: 100vh (minimum)
- Portrait: 180x180px, rounded-full, border-4 white/15
- Headline: 56px, Bold, #0F172A
- Subheadline: 24px, Regular, #6B7280
- Animation: fade-in + slide-up, 600ms
- CTA buttons: row with 16px gap

## Mobile Variant

- Portrait centered: 140x140px
- Headline: 32px
- Subheadline: 18px
- CTA buttons: stacked vertically, full width

---

# 5. Card (Base)

## Structure

```
┌──────────────────────────────────────┐
│                                      │
│  Content (padding: 32px)            │
│                                      │
└──────────────────────────────────────┘
```

## Properties

- Background: #FFFFFF
- Border-radius: 20px
- Box-shadow: 0 4px 20px rgba(0,0,0,0.06)
- Padding: 32px
- Transition: 250ms ease

## Hover State

- Box-shadow: 0 8px 30px rgba(0,0,0,0.1)
- Transform: translateY(-4px)

---

# 6. KPI Card

## Structure

```
┌────────────────────────────┐
│                            │
│  [Icon]                    │
│  15+                       │
│  Years Experience          │
│                            │
└────────────────────────────┘
```

## Properties

- Inherits from Card (base)
- Icon: 36px, color #2563EB
- Number: 48px, Bold, #0F172A
- Label: 18px, Regular, #6B7280
- Text alignment: center

## Usage

Displayed in Metrics Bar section, 3-4 per row.

---

# 7. Project Card (Case Study)

## Structure (Desktop)

```
┌──────────────────────┬──────────────────────────────────────┐
│                      │                                      │
│     Image            │  Title: Manufacturing Dashboard      │
│     or               │                                      │
│     Diagram          │  Challenge: Text here                │
│                      │                                      │
│   400x300px          │  Solution: Text here                 │
│   rounded 20px       │                                      │
│                      │  Business Impact: Metrics here       │
│                      │                                      │
│                      │  [Python] [SQL] [MES] [PyQt]        │
│                      │                                      │
│                      │  [View Details →]                   │
│                      │                                      │
└──────────────────────┴──────────────────────────────────────┘
```

## Layout

- Desktop: alternating image-left / image-right
- Tablet: image on top, content below
- Mobile: single column, stacked

## Properties

- Container: display grid, 2 columns (1fr 1fr) on desktop
- Image: object-fit cover, border-radius 20px
- Content padding: 32px
- Technology tags: inline-flex, pill shape, 14px, #2563EB bg/10

---

# 8. Timeline Card

## Structure (Desktop)

```
           │
    ┌──────┴──────┐
    │             │
    │ 2019—Present│
    │             │
    │ Company Name│
    │ Role Title  │
    │             │
    │ Achievements│
    │ • Achievement 1
    │ • Achievement 2
    │ • Achievement 3
    │             │
    │ Technologies│
    │ [Python] [SQL]
    │             │
    └─────────────┘
           │
```

## Properties

- Max-width: 500px per card
- Line: 2px solid #E5E7EB, centered
- Dot: 16px circle, #2563EB, centered on line
- Desktop: alternating left/right of center line
- Mobile: single column, line on left

---

# 9. Skill Card

## Structure

```
┌────────────────────────────┐
│                            │
│  [Icon]                    │
│  Category Title            │
│  Description               │
│                            │
│  Skills tags               │
│  [tag] [tag] [tag]        │
│                            │
└────────────────────────────┘
```

## Properties

- Inherits from Card (base)
- Icon: 40px, color #2563EB
- Title: 24px, SemiBold, #0F172A
- Description: 16px, Regular, #6B7280
- Tags: 14px, pill shape, #F0F5FF background, #2563EB text

## Usage

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 2 columns

---

# 10. Quote Card

## Structure

```
┌──────────────────────────────────────────────┐
│                                              │
│  "                                            │
│  Great manufacturing organizations are built │
│  through people, standardized processes and  │
│  continuous improvement.                     │
│  "                                            │
│                                              │
│  — Artur Csepregi                            │
│  Manufacturing Leader                        │
│                                              │
└──────────────────────────────────────────────┘
```

## Properties

- Background: #F8FAFC or #1E3A8A (dark variant)
- Quote icon: 48px, opacity 0.1
- Quote text: 28px, Italic (dark variant) or Regular
- Author: 18px, SemiBold
- Role: 16px, #6B7280
- Padding: 48px
- Max-width: 800px, centered

---

# 11. Contact Card

## Structure

```
┌──────────────────────────────┐
│                              │
│  [Icon]                      │
│  Email                       │
│  artur@example.com          │
│                              │
│  [Send Email →]             │
│                              │
└──────────────────────────────┘
```

## Properties

- Inherits from Card (base)
- Icon: 32px
- Label: 20px, SemiBold
- Value: 16px, Regular, #6B7280
- Button: Primary or Secondary variant

## Usage

- Desktop: 4 columns (Email, LinkedIn, GitHub, CV)
- Tablet: 2 columns
- Mobile: stacked

---

# 12. Badge

## Variants

| Variant | Background | Text Color |
|---------|-----------|------------|
| Industry | #F0F5FF | #2563EB |
| Technology | #F0FDF4 | #16A34A |
| Leadership | #FFF7ED | #EA580C |
| Automation | #F0F9FF | #0284C7 |
| Lean | #FAFAFA | #525252 |
| Industry 4.0 | #F5F3FF | #7C3AED |

## Properties

- Padding: 6px 14px
- Border-radius: 100px (pill)
- Font: 14px, Medium
- Display: inline-flex

---

# 13. Technology Tag

## Structure

```
┌──────────────┐
│  Python      │
└──────────────┘
```

## Properties

- Background: #F0F5FF
- Text: #2563EB, 14px, Medium
- Padding: 4px 12px
- Border-radius: 6px
- Display: inline-flex

---

# 14. Statistics Component

## Structure

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  15+              100+              10+          │
│  Years             Continuous       Countries    │
│  Experience        Improvement       Served      │
│                   Projects                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Properties

- Layout: 3 columns, equal width
- Number: 48px, Bold, #2563EB
- Label: 18px, Regular, #6B7280
- Number animation: count-up on scroll (optional)

---

# 15. Divider

## Structure

```
───────────────────────────────────────
```

## Properties

- Height: 1px
- Background: #E5E7EB
- Max-width: 80%
- Margin: 0 auto

---

# 16. Footer

## Structure

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Navigation Links          Social Icons        ↑ Back to Top │
│                                                              │
│  Home     About    Projects                  [in] [git] [@]  │
│  Experience  Skills  Contact                                │
│                                                              │
│  © 2026 Artur Csepregi · v1.0                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Properties

- Background: #0F172A
- Text: #FFFFFF
- Padding: 48px 0 24px
- Font: 14px, Regular
- Links: hover color #2563EB

---

# 17. Animation Component

## Variants

### Fade In

```css
animation: fadeIn 300ms ease forwards;
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide Up

```css
animation: slideUp 300ms ease forwards;
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Hover Scale

```css
transition: transform 250ms ease;
:hover { transform: scale(1.02); }
```

## Usage Rules

- Animation triggers once via IntersectionObserver
- Stagger delay: 100ms between child elements
- Maximum duration: 300ms
- Respect `prefers-reduced-motion`

---

# 18. Navigation Link

## Properties

- Font: Inter, 16px, Medium
- Color: #6B7280 (default), #0F172A (active/hover)
- Padding: 8px 16px
- Border-radius: 8px
- Hover: background rgba(0,0,0,0.04)
- Active: bottom border or underline animation
- Transition: 200ms ease

---

# Component Usage Summary

| Component | Section | Priority |
|-----------|---------|----------|
| Header | All pages | 🔴 Must Have |
| Hero | Home | 🔴 Must Have |
| Button | Multiple | 🔴 Must Have |
| Section Title | Every section | 🔴 Must Have |
| Card (Base) | Multiple | 🔴 Must Have |
| KPI Card | Metrics Bar | 🔴 Must Have |
| Project Card | Case Studies | 🔴 Must Have |
| Timeline Card | Career | 🔴 Must Have |
| Skill Card | Skills | 🔴 Must Have |
| Quote Card | Leadership | 🟡 Should Have |
| Contact Card | Contact | 🔴 Must Have |
| Badge | Multiple | 🟡 Should Have |
| Technology Tag | Projects | 🔴 Must Have |
| Statistics | Metrics | 🔴 Must Have |
| Divider | Multiple | 🟢 Nice to Have |
| Footer | All pages | 🔴 Must Have |
| Navigation Link | Header/Footer | 🔴 Must Have |
| Animation | Every section | 🟡 Should Have |
