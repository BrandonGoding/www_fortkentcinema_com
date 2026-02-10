# Fort Kent Cinema Design Standards

This document defines the visual identity and design system for the Fort Kent Cinema brand across the website and preshow video slides.

---

## Color Palette

The theme draws inspiration from classic movie theater interiors: deep burgundy velvet, warm gold accents, and soft cream lighting.

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-dark` | `#1a0a0d` | Primary page background (warm near-black) |
| `--color-bg-charcoal` | `#2a1015` | Secondary sections, nav background |
| `--color-bg-charcoal-dark` | `#120609` | Deepest background, ticket button cutouts |
| `--color-bg-card` | `#3a1520` | Card backgrounds, elevated surfaces |

### Gold Accents

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gold` | `#f0c34a` | Primary accent, headings, buttons, icons |
| `--color-gold-warm` | `#d8a844` | Secondary accent, borders, subtle text |
| `--color-gold-light` | `#ffe8a0` | Highlighted/emphasized text, hover states |
| `--color-gold-glow` | `rgba(240, 195, 74, 0.35)` | Box-shadow glow effects |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-cream` | `#fff8ec` | Primary body text |
| `--color-cream-muted` | `#e8d8c0` | Secondary/subdued text |
| `--color-white` | `#ffffff` | Pure white (rare, for max contrast) |

### Theater Reds

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-deep-red` | `#6b1520` | Accent red, decorative borders |
| `--color-burgundy` | `#4a0e18` | Curtain edges, section tinting |

---

## Typography

Three typefaces form a deliberate hierarchy: bold display, elegant serif, and warm body text.

### Font Stack

| Token | Family | Usage |
|-------|--------|-------|
| `--font-display` | **Bebas Neue** | Section titles, nav links, CTAs, taglines. Always uppercase, wide letter-spacing (0.2em-0.5em). |
| `--font-heading` | **Playfair Display** | Primary headings, hero text, prices. Weights 400-900, italic for emphasis. |
| `--font-body` | **Cormorant Garamond** | Body text, descriptions, fine print. Elegant serif, italic for secondary info (weight 300-700). |

### Google Fonts Import

```
Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700
Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400
Bebas+Neue
```

### Type Hierarchy

| Element | Font | Size | Weight | Color | Letter-Spacing |
|---------|------|------|--------|-------|----------------|
| Section title | Bebas Neue | 3rem | 400 | `--color-gold` | 6px |
| Hero heading | Playfair Display | clamp(52px, 8vw, 110px) | 900 | `--color-cream` | normal |
| Hero heading `<em>` | Playfair Display | inherited | 900 italic | `--color-gold-light` | normal |
| Subtitle / presents | Cormorant Garamond | clamp(16px, 2vw, 22px) | 600 italic | `--color-gold-warm` | 0.3em |
| Body text | Cormorant Garamond | 18px (base) | 400 | `--color-cream` | normal |
| Fine print | Cormorant Garamond | clamp(16px, 2vw, 22px) | 600 italic | `--color-gold-warm` | 0.15em |
| Tagline | Bebas Neue | clamp(18px, 2.2vw, 26px) | 400 | `--color-gold` | 0.5em |

### Text Shadow (Headings)

Large headings use a warm gold glow:
```css
text-shadow: 0 2px 30px rgba(240, 195, 74, 0.25), 0 0 60px rgba(240, 195, 74, 0.08);
```

---

## Theatrical Effects

These effects create the classic cinema atmosphere across both the website and preshow slides.

### Film Grain Overlay

Applied via `body::before` pseudo-element. Uses an inline SVG with `feTurbulence` noise filter. Animated with a subtle step-based translation.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence noise */
  pointer-events: none;
  z-index: 9999;
  opacity: 0.3;          /* 0.5 on preshow slides */
  animation: grain 0.5s steps(4) infinite;
}
```

**Preshow slides** use `opacity: 0.5` for a heavier grain. **Website** uses `opacity: 0.3` so content remains readable.

### Vignette

Darkens the edges of the viewport using a radial gradient overlay.

```css
.vignette {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
  z-index: 9998;
}
```

### Curtain Edges

Burgundy gradients on the left and right edges of the viewport, simulating theater curtains.

```css
.curtain-left, .curtain-right {
  position: fixed;
  top: 0; bottom: 0;
  width: 120px;
  z-index: 50;
  pointer-events: none;
  opacity: 0.35;
}
.curtain-left {
  left: 0;
  background: linear-gradient(90deg, var(--color-burgundy) 0%, transparent 100%);
}
.curtain-right {
  right: 0;
  background: linear-gradient(-90deg, var(--color-burgundy) 0%, transparent 100%);
}
```

### Spotlight Pulse (Preshow Only)

A subtle gold radial glow from the top of the viewport, pulsing slowly.

```css
.spotlight {
  position: fixed;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: 60vh;
  background: radial-gradient(ellipse at center, rgba(212, 168, 83, 0.04) 0%, transparent 70%);
  pointer-events: none;
  animation: spotlightPulse 6s ease-in-out infinite;
}
```

---

## Ornamental Dividers

A signature decorative element used between sections. The pattern is: **line + diamond + star + diamond + line**.

### Markup

```html
<div class="ornament-divider">
  <div class="ornament-line"></div>
  <div class="ornament-diamond"></div>
  <span class="ornament-star">✦</span>
  <div class="ornament-diamond"></div>
  <div class="ornament-line"></div>
</div>
```

### Styles

| Element | Details |
|---------|---------|
| `.ornament-divider` | Flexbox, centered, `gap: 16px`, `padding: 2rem 0` |
| `.ornament-line` | 200px wide, 3px tall, gold gradient (`transparent → gold → transparent`) |
| `.ornament-diamond` | 14px square, gold fill, rotated 45deg |
| `.ornament-star` | `✦` character, 24px, gold |

Ornament lines shrink to 60px on mobile (`max-width: 600px`).

---

## Buttons

Three button variants, all using Bebas Neue, uppercase, with letter-spacing.

### Primary (Gold Gradient)

```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-warm) 100%);
  color: var(--color-bg-dark);
  box-shadow: 0 4px 15px var(--color-gold-glow);
}
```
Hover: lifts 3px, stronger glow.

### Secondary (Gold Outline)

```css
.btn-secondary {
  background: transparent;
  color: var(--color-gold);
  border: 2px solid var(--color-gold);
}
```
Hover: fills gold, text goes dark.

### Ticket (Gold with Cutouts)

```css
.btn-ticket {
  background: linear-gradient(180deg, var(--color-gold) 0%, var(--color-gold-warm) 100%);
  color: var(--color-bg-dark);
}
```
Has circular pseudo-element cutouts on left/right edges to mimic a tear-off ticket.

---

## Card Styling

Cards (movie, membership, blog, rental) share common conventions:

| Property | Value |
|----------|-------|
| Background | `var(--color-bg-card)` or `rgba(75, 20, 30, 0.5)` gradient |
| Border | `1.5px solid rgba(240, 195, 74, 0.25)` (subtle gold tint) |
| Featured border | `var(--color-gold)` solid, with `box-shadow: 0 0 30px rgba(240, 195, 74, 0.1)` |
| Border radius | `var(--radius-md)` (8px) |
| Text | Cream body, gold-light for emphasis |
| Hover | Border brightens to gold, subtle glow appears |

### Badges

```css
.card-badge {
  font-family: 'Bebas Neue', sans-serif;
  color: var(--color-bg-dark);
  background: var(--color-gold);
  border-radius: 10px;
  padding: 2px 14px;
  letter-spacing: 0.15em;
}
```

---

## SVG Icons (Preshow Slides)

Preshow slides use hand-drawn SVG icons at 80x80 viewBox, scaled to 110x110px display. All strokes use `#f0c34a` (gold).

| Stroke Color | `#f0c34a` |
|--------------|-----------|
| Primary stroke width | 2.5px |
| Detail stroke width | 1.5px |
| Accent stroke width | 3.5px |
| Primary opacity | 0.95 |
| Detail opacity | 0.4-0.7 |

---

## Animations

### Preshow Slide Animations

Preshow slides use staggered entrance animations timed for 15-20 second video renders:

| Animation | CSS | Usage |
|-----------|-----|-------|
| `fadeSlideIn` | `opacity 0→1, translateY 15px→0` | Most elements (text, ornaments, icons) |
| `fadeScaleIn` | `opacity 0→1, scale 0.92→1` | Main headings, price callouts |
| `spotlightPulse` | `opacity 0.6↔1` over 6s | Background spotlight glow |
| `grain` | `translate` shifting 2px in steps | Film grain movement |

Stagger pattern: ornaments (0.3s) → cinema name (0.8s) → subtitle (1.2s) → heading (1.6s) → icon (2.2s) → body text (2.6s) → fine print (3.2s) → bottom ornament (3.8-4.2s) → tagline (4.5s).

### Website Animations

| Animation | CSS | Usage |
|-----------|-----|-------|
| `bulb-flicker-a/b` | Opacity + box-shadow pulse | Marquee light bulbs |
| `twinkle` | `opacity 0.7↔1` | Background stars |
| `grain` | `translate` steps | Film grain overlay |

All hover transitions use `var(--transition-base)` (0.3s ease).

---

## Spacing System

| Token | Value |
|-------|-------|
| `--spacing-xs` | 0.5rem (8px) |
| `--spacing-sm` | 1rem (16px) |
| `--spacing-md` | 1.5rem (24px) |
| `--spacing-lg` | 2rem (32px) |
| `--spacing-xl` | 3rem (48px) |
| `--spacing-2xl` | 4rem (64px) |

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| 1200px | Membership grid: 3 cols to 2 cols |
| 900px | Nav and hero title scale down |
| 768px | Mobile nav toggle, layout shifts to single column |
| 600px | Compact mobile layouts, ornament lines shrink to 60px |

---

## Preshow Slide Template

New preshow slides (rendered to video via Playwright) should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fort Kent Cinema — [Slide Title]</title>
  <!-- Google Fonts link -->
  <!-- Inline <style> with full theme (colors, effects, animations) -->
</head>
<body>
  <div class="curtain-left"></div>
  <div class="curtain-right"></div>
  <div class="spotlight"></div>

  <div class="stage">
    <!-- Top ornament -->
    <div class="cinema-name">Fort Kent Cinema</div>
    <div class="presents">— [subtitle] —</div>
    <h1 class="heading">[Main <em>Message</em>]</h1>
    <!-- SVG icon (80x80 viewBox, gold strokes) -->
    <p class="subtext">[Body copy with <strong>emphasis</strong>]</p>
    <p class="fine-print">[Secondary message]</p>
    <!-- Bottom ornament -->
    <div class="tagline">[Closing tagline]</div>
  </div>
</body>
</html>
```

Each slide is self-contained with inline styles (no external CSS). Rendered at 1920x1080 via `main.py`.

---

## File Structure

### Website (`~/GitHub/www_fortkentcinema_com/`)
```
src/styles/variables.css    ← Design tokens (colors, fonts, spacing)
src/styles/global.css       ← Base styles, buttons, effects, ornaments
src/components/*/            ← Component-scoped CSS files
src/pages/*/                 ← Page-scoped CSS files
```

### Preshow Slides (`~/PycharmProjects/htmlToVideo/html/`)
```
preshow.html                ← Silence your devices
preshow-no-talking.html     ← No talking
preshow-membership.html     ← Cinema Club membership
preshow-open-mic.html       ← Open Mic Night (Mondays)
preshow-classic-movie.html  ← Classic Movie Night (Tuesdays)
preshow-discount-wednesday.html ← Discount Wednesday
```
