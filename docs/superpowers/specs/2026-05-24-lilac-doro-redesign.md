# Wedding RSVP Page — Lilac Doro Redesign Spec

## Overview

A full visual redesign of the wedding RSVP page (`index.html`) for Koon Hian & Germaine (10 October 2026, Pan Pacific Orchard). The page shifts from the current gold/pink/cream elegant theme to a **Twilight Garden** lilac-sunset palette with a **full cartoon Doro meme takeover**.

Doro (Dororong) — the chibi meme character from NIKKE: Goddess of Victory — serves as the page mascot. She appears everywhere: peeking, running, sitting, dancing, holding oranges. The couple's names remain in elegant typography while Doro brings maximum chaotic energy around them.

All Doro assets are real meme images (PNG/GIF), not CSS/SVG recreations. Oranges are a core decorative motif tied to Doro's meme lore.

## Color Palette — Twilight Garden

| Role | Color | Hex |
|------|-------|-----|
| Background start | Pale lilac | `#F3E8FF` |
| Background mid-1 | Soft lavender | `#F0E0F5` |
| Background mid-2 | Lilac-rose | `#F5DDE0` |
| Background mid-3 | Warm blush | `#FADCD0` |
| Background end | Sunset cream | `#FFF5EE` |
| Heading text | Muted purple | `#9B72A8` |
| Body text | Soft plum | `#5A4A5A` |
| Light text | Dusty mauve | `#C4A0B0` |
| Label text | Warm mauve | `#C4A0B8` |
| Card background | White at 60% opacity | `rgba(255,255,255,0.6)` |
| Card border | Lilac tint | `rgba(212,184,216,0.35)` |
| Accent warm | Sunset peach | `#E8B8A8` |
| Accent purple | Lavender | `#D4B8D8` |
| Divider gradient | Lavender → Peach | `#D4B8D8 → #E8B8A8` |
| Submit button | Muted purple | `#9B72A8` |
| Submit hover | Light purple | `#B088C0` |
| Error text | Dusty rose | `#C07060` |
| Orange (decorative) | Orange | `#FFA040` |

### Page Background Gradient

```css
background: linear-gradient(170deg,
  #F3E8FF 0%,
  #F0E0F5 20%,
  #F5DDE0 40%,
  #FADCD0 60%,
  #FDE8D8 80%,
  #FFF5EE 100%
);
```

## Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| Headings (couple names, section titles, RSVP title, countdown numbers) | Bodoni Moda | 400, 500 | Google Fonts |
| Headings italic (ampersand, subtitle) | Bodoni Moda Italic | 400 | Google Fonts |
| Body (labels, inputs, body text, countdown labels) | Lato | 300, 400 | Google Fonts |

## Doro Image Assets

### Sourcing

Download actual Doro meme images (PNG with transparent backgrounds, and GIFs for animated poses) from these sources:

- emoji.gg — Discord emotes/stickers
- sigstick.com — Sticker packs
- Pixiv fan art — particularly Doro + orange art
- Know Your Meme image gallery
- GIPHY / Tenor — Animated GIFs

### Required Poses (minimum set)

Store in `assets/doro/` directory:

| Filename | Pose | Used In |
|----------|------|---------|
| `doro-peek.png` | Peeking up from an edge | Hero bottom, RSVP form side |
| `doro-run-right.gif` | Running to the right | Random spawner, transitions |
| `doro-run-left.gif` | Running to the left | Random spawner |
| `doro-sit.png` | Sitting idle | Countdown cards |
| `doro-happy.png` | Celebrating / happy | RSVP "Joyfully Accepts" reaction |
| `doro-sad.png` | Sad / tear | RSVP "Regretfully Declines" reaction |
| `doro-dance.gif` | Dancing / celebrating | RSVP success screen |
| `doro-wave.png` | Waving | Footer goodbye |
| `doro-orange.png` | Holding an orange | Hero, decorative |
| `doro-point.png` | Pointing at something | Details section usher |
| `doro-hang.png` | Hanging / dangling | Hero top corner |
| `doro-carry.png` | Carrying something | +1 name field animation |
| `doro-face.png` | Just the face (small) | Cursor trail, click spawner |

Additional poses are encouraged — the more variety, the more chaotic. Any extra Doro images get added to the random spawner pool.

### Image Sizing

- Hero/section Doros: 80-120px
- Countdown card Doros: 40-60px
- Random spawner Doros: 50-80px
- Cursor trail faces: 20-30px
- Click-spawn Doros: 30-50px
- Success celebration Doros: 100-150px

## Page Sections

### 1. Global Chaos Engine (page-wide, all sections)

Effects that run across the entire page, independent of scroll position:

**Floating Oranges**
- 15-20 orange images (CSS-drawn circles or small PNGs) floating upward continuously
- Varying sizes (15-35px), rotation speeds, horizontal drift
- `pointer-events: none` so they don't interfere with interaction
- CSS `@keyframes` animations with randomized durations (8-20s) and delays
- Replace the old fairy-dust particles entirely

**Random Doro Spawner**
- Every 4-8 seconds (randomized interval), a Doro image runs across the screen horizontally
- Alternates between left-to-right and right-to-left
- Random vertical position (anywhere on the visible viewport)
- Uses running GIFs from the asset pool
- CSS animation: `translateX(-100px)` to `translateX(calc(100vw + 100px))` over 3-5 seconds
- Element removed from DOM after animation completes
- Maximum 3 concurrent running Doros to avoid performance issues

**Cursor Trail**
- On mousemove, spawn a small Doro face (`doro-face.png`, 20-25px) at the cursor position
- Each face fades out and shrinks over 800ms, then removed
- Throttled to one spawn per 80ms to avoid flooding
- `pointer-events: none` on all trail elements
- Disabled on touch devices (no mousemove)

**Click-to-Spawn**
- On click anywhere on the page (except form inputs/buttons), spawn a random Doro image (30-50px)
- The Doro bounces upward (translateY -60px) and fades out over 1s
- Random slight horizontal drift
- Uses random poses from the asset pool

**Konami Code Easter Egg**
- Sequence: Up Up Down Down Left Right Left Right B A
- On activation: 30-50 random Doro images burst from the center of the viewport
- Each flies outward in a random direction with rotation
- Accompanied by a brief screen flash (white overlay, 100ms)
- All Doros fade out after 3 seconds
- Can be triggered multiple times

**`prefers-reduced-motion` Override**
- When `prefers-reduced-motion: reduce` is active, disable: floating oranges, random spawner, cursor trail, click-to-spawn
- Keep: static Doro placements, form reactions (but no animation)
- Konami code still works but with instant placement instead of animation

### 2. Hero Section

- Full viewport height, centered content
- **Background**: Twilight Garden gradient (top of gradient = lilac, bottom = warm peach)
- **Content** (centered, elegant):
  - "Together with their families" — Lato Light, 10px, letter-spacing 4px, uppercase, color `#C4A0B8`
  - "Koon Hian" — Bodoni Moda 400, `clamp(2rem, 6vw, 3.5rem)`, color `#9B72A8`
  - "&" — Bodoni Moda Italic, 0.5em of heading size, opacity 0.5
  - "Germaine" — same as Koon Hian
  - Divider line: 40px wide, 1px, gradient `#D4B8D8 → #E8B8A8`
  - "10 . 10 . 2026" — Bodoni Moda 400, `clamp(1rem, 2.5vw, 1.4rem)`, color `#C4A0B0`, letter-spacing 4px
  - "Pan Pacific Orchard" — Lato Light, 0.9rem, color `#C8A8A0`

- **Doro placements**:
  - `doro-peek.png` at bottom center, peeking up from the viewport edge (positioned so only the top half is visible, the rest is "below" the fold). Subtle bounce animation.
  - `doro-hang.png` in top-right corner, dangling from the edge. Gentle swing animation (CSS rotate oscillation).
  - `doro-orange.png` in bottom-left area, holding an orange.
  - 2-3 small orange SVG circles scattered decoratively.

- **Scroll indicator**: Replace the chevron with a small Doro bouncing downward (a Doro face or sitting Doro with a tiny down arrow below it).

### 3. Countdown Section

- Same layout as current: "Counting Down" title + 4 countdown cards (days/hours/minutes/seconds)
- Title in Bodoni Moda, color `#9B72A8`
- Divider line: gradient `#D4B8D8 → #E8B8A8`

- **Countdown cards**:
  - Background: `rgba(255,255,255,0.5)`
  - Border: `1px solid rgba(212,184,216,0.35)`
  - Border-radius: 12px
  - Number: Bodoni Moda 500, color `#9B72A8`
  - Label: Lato Light, letter-spacing 2px, color `#C4A0B0`

- **Doro on cards**: A `doro-sit.png` image positioned on top of each countdown card (positioned absolutely, sitting on the top edge). Each one has a slightly different rotation (±5°) for variety. When the countdown number changes, the corresponding Doro does a small bounce (CSS animation triggered by JS class toggle).

### 4. Wedding Details Section

- Title: "Wedding Details" in Bodoni Moda
- Divider line
- Details grid: same 3-column layout (Date, Event, Venue)
  - Detail headings: Lato 400, color `#9B72A8`, letter-spacing 2px, uppercase
  - Detail values: Bodoni Moda 400, color `#5A4A5A`
  - Sub-text: Lato Light, color `#C4A0B0`

- **Doro placements**:
  - `doro-point.png` positioned to the right of the details grid, pointing at the venue information
  - A small Doro peeking from behind the left edge of the section
  - Orange slice decorations (CSS-drawn half-circles in orange) scattered around as divider accents

### 5. RSVP Form Section

- Card container: glassmorphism (`rgba(255,255,255,0.6)`, `backdrop-filter: blur(8px)`, border `rgba(212,184,216,0.35)`, border-radius 16px)
- Title: "RSVP" in Bodoni Moda 500, color `#9B72A8`
- Subtitle: "Kindly respond by 31 August 2026" in Bodoni Moda Italic, color `#C4A0B0`

**Form Fields:**

1. **Full Name** — text input, required
2. **Side** — radio buttons: "Groom's Side" / "Bride's Side", required
3. **Attending** — radio buttons: "Joyfully Accepts" / "Regretfully Declines", required
4. **Number of Additional Guests** — dropdown (0-5), shown only when attending = "Yes"
5. **Additional Guest Names** — dynamic name fields that appear based on the dropdown value. When guest count is N, show N text input fields labeled "Guest 1 Name", "Guest 2 Name", etc. Each field slides in with a small Doro carrying animation (`doro-carry.png` slides in from the left, then fades, revealing the input field).
6. **Dietary Restrictions** — text input, shown only when attending = "Yes"
7. **Special Requests** — text input, shown only when attending = "Yes"
8. **Message to the Couple** — textarea, always shown
9. **Submit Button** — Bodoni Moda 500, white text, `#9B72A8` background. Small orange images on either side of the button text.

**Form Styling:**
- Inputs: white background, border `rgba(212,184,216,0.35)`, border-radius 8px, Lato font
- Focus state: border-color `#B088C0`
- Error state: border-color `#C07060`
- Radio buttons: custom styled (same as current but recolored — lilac border, purple fill dot)
- Labels: Lato 400, color `#7A6A7A`

**Doro Reactions:**
- `doro-peek.png` positioned to the right of the form card, watching the user fill it out
- When "Joyfully Accepts" is selected: `doro-happy.png` replaces the peeking Doro, with a small bounce animation
- When "Regretfully Declines" is selected: `doro-sad.png` replaces it
- These transitions use a CSS fade (opacity transition, 300ms)

**Success State:**
- Form element gets `display: none`
- Replaced by a celebration container:
  - "Thank You!" — Bodoni Moda, large, color `#9B72A8`
  - "Your RSVP has been received." — Bodoni Moda, color `#5A4A5A`
  - Multiple `doro-dance.gif` images (3-5) arranged in a row, dancing
  - Burst of oranges: JS spawns 20-30 small orange circles that fly outward from center (CSS animation, `@keyframes burst`)
  - Confetti-like CSS particles in lilac/peach/orange colors falling from above
  - The celebration plays for 4-5 seconds then settles to a static happy state

### 6. Closing & Footer

- "We can't wait to celebrate with you" — Lato Light, color `#C4A0B0`
- "Koon Hian & Germaine" — Bodoni Moda, `clamp(1.6rem, 4vw, 2.4rem)`, color `#9B72A8`
- "10 . 10 . 2026" — Bodoni Moda, color `#C4A0B0`, letter-spacing 4px

**Doro Footer Parade:**
- A row of 6-8 Doro images in various poses marching/walking across the bottom of the page
- CSS animation: continuous horizontal scroll (marquee-like effect)
- One Doro at the end is `doro-wave.png`, waving goodbye

- Footer text: "With love, K & G" — Lato, small, color `#C4A0B0`

## Responsive Design

### Mobile (max-width: 768px)
- Countdown cards: 2x2 grid on very small screens, smaller Doros on cards (30-40px)
- Details grid: single column
- Form card: reduced padding
- Radio groups: vertical stack
- Random Doro spawner: reduce frequency to every 8-12 seconds, max 2 concurrent
- Floating oranges: reduce to 8-10
- Cursor trail: disabled (no mousemove on touch)
- Click-to-spawn: converted to tap-to-spawn, works on touch
- Hero Doros: reduce to 2 (peek + orange)
- Footer parade: smaller images, fewer Doros (4-5)

### Small mobile (max-width: 380px)
- Countdown: 2x2 grid, full-width cards
- Doros on countdown cards: hide to avoid overcrowding

### `prefers-reduced-motion: reduce`
- All animations: duration set to 0.01ms
- Floating oranges: hidden
- Random spawner: disabled
- Cursor trail: disabled
- Click-to-spawn: disabled
- Doro reactions: instant swap, no transition
- Footer parade: static (no scroll animation)
- Konami code: Doros appear instantly in place, no burst animation

## Technical Details

### File Structure
```
index.html          — all CSS/JS inline (single file)
assets/
  doro/
    doro-peek.png
    doro-run-right.gif
    doro-run-left.gif
    doro-sit.png
    doro-happy.png
    doro-sad.png
    doro-dance.gif
    doro-wave.png
    doro-orange.png
    doro-point.png
    doro-hang.png
    doro-carry.png
    doro-face.png
    ... (additional poses for spawner pool)
apps-script.js      — Google Apps Script (updated: new guestNames column)
```

### External Dependencies
- Google Fonts CDN (Bodoni Moda, Lato)
- Google Apps Script endpoint (user-configured)
- No JavaScript libraries — all vanilla JS

### Google Sheets Integration
- Same architecture: `fetch` POST to Google Apps Script, Apps Script appends row to sheet
- Same `no-cors` + `URLSearchParams` approach
- **Updated schema** — new `guestNames` field added for named +1s
- Updated sheet columns: Timestamp | Name | Side | Attending | Additional Guests | Guest Names | Dietary Restrictions | Special Requests | Message
- Guest names from dynamic fields are joined with ` | ` separator before submission

### Apps Script Update
- `doPost` function updated to handle the new `guestNames` field (read from `data.guestNames`)
- Sheet header row updated: new "Guest Names" column inserted between "Additional Guests" and "Dietary Restrictions"

### Performance Considerations
- Preload all Doro images used in the hero section
- Lazy-load images below the fold (use `loading="lazy"` on `<img>` tags)
- Random spawner: cap at 3 concurrent animated Doros, remove from DOM after animation
- Cursor trail: throttle to 80ms intervals, remove old trail elements after fade
- Floating oranges: pure CSS animation (no JS), use `will-change: transform` for GPU acceleration
- Click-to-spawn: remove elements after animation completes
- Total estimated image assets: ~200-400KB depending on how many poses are collected

### RSVP Form Submission
- Same `no-cors` fetch with `URLSearchParams` body
- New field `guestNames` added to the POST data (pipe-separated string, e.g. `"Alice Tan | Bob Lee"`)
- `GOOGLE_SCRIPT_URL` constant remains at the top of the script section

### Browser Compatibility
- Modern browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
- `backdrop-filter`: supported in all modern browsers, graceful degradation (solid white background fallback)
- CSS animations: fully supported
- Konami code: keyboard only (desktop feature, silently unavailable on mobile)
