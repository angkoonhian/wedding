# Lilac Doro Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the wedding RSVP page from gold/pink to a Twilight Garden lilac-sunset palette with a full Doro meme mascot takeover, including chaotic animations, floating oranges, and interactive easter eggs.

**Architecture:** Single-file static HTML page (`index.html`) with all CSS and JS inline. Doro meme images are stored in `assets/doro/` and referenced via `<img>` tags. Google Apps Script (`apps-script.js`) updated with a new `guestNames` column.

**Tech Stack:** Vanilla HTML/CSS/JS, Google Fonts (Bodoni Moda + Lato), Google Apps Script

**Spec:** `docs/superpowers/specs/2026-05-24-lilac-doro-redesign.md`

---

**Prerequisites:** Before starting, the user must download Doro meme images and place them in `assets/doro/`. Required files: `doro-peek.png`, `doro-run-right.gif`, `doro-run-left.gif`, `doro-sit.png`, `doro-happy.png`, `doro-sad.png`, `doro-dance.gif`, `doro-wave.png`, `doro-orange.png`, `doro-point.png`, `doro-hang.png`, `doro-carry.png`, `doro-face.png`. Any additional Doro images in that folder will be used by the random spawner.

---

### Task 1: Foundation — Fonts, CSS Variables, Body Background

**Files:**
- Modify: `index.html:8-46` (head fonts + :root + body)

- [ ] **Step 1: Replace Google Fonts link**

Replace the existing Google Fonts `<link>` tag (line 10) with:

```html
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Replace all CSS custom properties in `:root`**

Replace the entire `:root` block (lines 18-33) with:

```css
:root {
  --bg-gradient: linear-gradient(170deg, #F3E8FF 0%, #F0E0F5 20%, #F5DDE0 40%, #FADCD0 60%, #FDE8D8 80%, #FFF5EE 100%);
  --heading-color: #9B72A8;
  --text-body: #5A4A5A;
  --text-light: #C4A0B0;
  --text-label: #C4A0B8;
  --text-venue: #C8A8A0;
  --card-bg: rgba(255, 255, 255, 0.6);
  --card-border: rgba(212, 184, 216, 0.35);
  --accent-warm: #E8B8A8;
  --accent-purple: #D4B8D8;
  --btn-bg: #9B72A8;
  --btn-hover: #B088C0;
  --error-color: #C07060;
  --orange: #FFA040;
  --font-heading: 'Bodoni Moda', serif;
  --font-body: 'Lato', sans-serif;
}
```

- [ ] **Step 3: Update body styles**

Replace the `body` rule (lines 39-46) with:

```css
body {
  font-family: var(--font-body);
  color: var(--text-body);
  background: var(--bg-gradient);
  background-attachment: fixed;
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.6;
}
```

- [ ] **Step 4: Update divider to use gradient**

Replace the `.divider` rule (lines 49-54) with:

```css
.divider {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-warm));
  margin: 0 auto;
}
```

- [ ] **Step 5: Open in browser and verify**

Open `index.html` in a browser. The page should show the lilac-to-peach gradient background, Bodoni Moda headings (they'll look wrong color-wise — that's fixed in later tasks). Dividers should show a purple-to-peach gradient.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: swap to Twilight Garden palette and Bodoni Moda + Lato fonts"
```

---

### Task 2: Hero Section Restyle + Doro Placements

**Files:**
- Modify: `index.html` — hero CSS rules (~lines 57-139) and hero HTML (~lines 518-532)

- [ ] **Step 1: Update hero CSS**

Replace the hero-related CSS rules (`.hero` through `.scroll-chevron`, lines 57-139) with:

```css
/* ---- Hero ---- */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  position: relative;
}

.hero-names {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 6vw, 3.5rem);
  color: var(--heading-color);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 3px;
  margin-bottom: 20px;
}

.hero-ampersand {
  display: block;
  font-size: 0.5em;
  margin: 4px 0;
  opacity: 0.5;
  font-style: italic;
}

.hero-date {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: var(--text-light);
  letter-spacing: 4px;
  font-weight: 400;
  margin-bottom: 12px;
}

.hero-venue {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-venue);
  font-weight: 300;
  letter-spacing: 1px;
}

.hero-intro {
  font-family: var(--font-body);
  font-size: 0.6rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-label);
  margin-bottom: 24px;
  font-weight: 300;
}

/* Hero Doro placements */
.hero-doro {
  position: absolute;
  pointer-events: none;
  z-index: 2;
}

.hero-doro--peek {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  animation: doro-bounce 2s ease-in-out infinite;
}

.hero-doro--hang {
  top: 20px;
  right: 30px;
  width: 80px;
  animation: doro-swing 3s ease-in-out infinite;
  transform-origin: top center;
}

.hero-doro--orange {
  bottom: 60px;
  left: 30px;
  width: 90px;
  animation: doro-float 4s ease-in-out infinite;
}

@keyframes doro-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
}

@keyframes doro-swing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}

@keyframes doro-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  animation: doro-bounce 2s ease-in-out infinite;
}

.scroll-indicator span {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-light);
  opacity: 0.5;
}

.scroll-doro {
  width: 30px;
  opacity: 0.6;
}

.scroll-chevron {
  width: 12px;
  height: 12px;
  border-right: 1.5px solid var(--text-light);
  border-bottom: 1.5px solid var(--text-light);
  transform: rotate(45deg);
  opacity: 0.4;
}
```

- [ ] **Step 2: Update hero HTML**

Replace the hero `<section>` HTML (lines 518-532) with:

```html
<!-- Hero -->
<section class="hero" id="hero">
  <p class="hero-intro">Together with their families</p>
  <h1 class="hero-names">
    Koon Hian
    <span class="hero-ampersand">&</span>
    Germaine
  </h1>
  <div class="divider" style="margin-bottom: 20px;"></div>
  <p class="hero-date">10 . 10 . 2026</p>
  <p class="hero-venue">Pan Pacific Orchard</p>

  <img src="assets/doro/doro-peek.png" alt="" class="hero-doro hero-doro--peek" aria-hidden="true">
  <img src="assets/doro/doro-hang.png" alt="" class="hero-doro hero-doro--hang" aria-hidden="true">
  <img src="assets/doro/doro-orange.png" alt="" class="hero-doro hero-doro--orange" aria-hidden="true">

  <div class="scroll-indicator" aria-hidden="true">
    <img src="assets/doro/doro-sit.png" alt="" class="scroll-doro">
    <div class="scroll-chevron"></div>
  </div>
</section>
```

- [ ] **Step 3: Open in browser and verify**

Hero should show lilac palette with Bodoni Moda names. Three Doro images should be visible (bottom center peeking, top-right hanging, bottom-left with orange). Scroll indicator should be a Doro with a chevron below.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: restyle hero section with Twilight Garden palette and Doro placements"
```

---

### Task 3: Countdown Section Restyle + Doro on Cards

**Files:**
- Modify: `index.html` — countdown CSS (~lines 141-202) and countdown HTML (~lines 535-556), countdown JS (~lines 681-708)

- [ ] **Step 1: Update section and countdown CSS**

Replace the section and countdown CSS rules (`.section` through `.countdown-label`, lines 141-202) with:

```css
/* ---- Section ---- */
.section {
  padding: 80px 20px;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: var(--heading-color);
  margin-bottom: 12px;
  font-weight: 400;
  letter-spacing: 2px;
}

.section-subtitle {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--text-light);
  font-style: italic;
  margin-bottom: 40px;
}

/* ---- Countdown ---- */
.countdown {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  position: relative;
}

.countdown-doro {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.countdown-doro.bounce {
  transform: translateX(-50%) translateY(-5px);
}

.countdown-item:nth-child(1) .countdown-doro { transform: translateX(-50%) rotate(-3deg); }
.countdown-item:nth-child(2) .countdown-doro { transform: translateX(-50%) rotate(4deg); }
.countdown-item:nth-child(3) .countdown-doro { transform: translateX(-50%) rotate(-5deg); }
.countdown-item:nth-child(4) .countdown-doro { transform: translateX(-50%) rotate(2deg); }

.countdown-number {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 500;
  color: var(--heading-color);
  line-height: 1;
}

.countdown-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-light);
  margin-top: 6px;
}
```

- [ ] **Step 2: Update countdown HTML**

Replace the countdown `<div>` HTML (lines 535-556) with:

```html
<!-- Countdown -->
<div class="section" id="countdown">
  <h2 class="section-title">Counting Down</h2>
  <div class="divider"></div>
  <div class="countdown" id="countdown-timer">
    <div class="countdown-item">
      <img src="assets/doro/doro-sit.png" alt="" class="countdown-doro" aria-hidden="true">
      <span class="countdown-number" id="cd-days">000</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-item">
      <img src="assets/doro/doro-sit.png" alt="" class="countdown-doro" aria-hidden="true">
      <span class="countdown-number" id="cd-hours">00</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-item">
      <img src="assets/doro/doro-sit.png" alt="" class="countdown-doro" aria-hidden="true">
      <span class="countdown-number" id="cd-minutes">00</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-item">
      <img src="assets/doro/doro-sit.png" alt="" class="countdown-doro" aria-hidden="true">
      <span class="countdown-number" id="cd-seconds">00</span>
      <span class="countdown-label">Seconds</span>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Update countdown JS to bounce Doros on tick**

Replace the countdown IIFE (lines 681-708) with:

```js
// ---- Countdown Timer ----
(function startCountdown() {
  var weddingDate = new Date('2026-10-10T18:00:00+08:00').getTime();
  var daysEl = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minutesEl = document.getElementById('cd-minutes');
  var secondsEl = document.getElementById('cd-seconds');
  var prev = {};

  function bounceDoro(el) {
    var doro = el.parentElement.querySelector('.countdown-doro');
    if (doro) {
      doro.classList.add('bounce');
      setTimeout(function() { doro.classList.remove('bounce'); }, 200);
    }
  }

  function update() {
    var now = Date.now();
    var diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }

    var d = Math.floor(diff / (1000 * 60 * 60 * 24));
    var h = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    var m = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    var s = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

    if (prev.d !== d) { daysEl.textContent = d; bounceDoro(daysEl); }
    if (prev.h !== h) { hoursEl.textContent = h; bounceDoro(hoursEl); }
    if (prev.m !== m) { minutesEl.textContent = m; bounceDoro(minutesEl); }
    if (prev.s !== s) { secondsEl.textContent = s; bounceDoro(secondsEl); }

    prev = { d: d, h: h, m: m, s: s };
  }

  update();
  setInterval(update, 1000);
})();
```

- [ ] **Step 4: Open in browser and verify**

Countdown cards should have lilac styling. A Doro sits on top of each card with a slight rotation. Each second, the seconds Doro should do a small bounce.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: restyle countdown with Doro sitting on cards and bounce animation"
```

---

### Task 4: Details Section Restyle + Doro Placements

**Files:**
- Modify: `index.html` — details CSS (~lines 204-238) and details HTML (~lines 559-578)

- [ ] **Step 1: Update details CSS**

Replace the details CSS rules (`.details-grid` through `.detail-sub`, lines 204-238) with:

```css
/* ---- Details ---- */
.details-wrapper {
  position: relative;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
  margin-top: 10px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.detail-heading {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--heading-color);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.detail-item p {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  color: var(--text-body);
}

.detail-sub {
  font-family: var(--font-body) !important;
  font-size: 0.85rem !important;
  color: var(--text-light) !important;
  font-weight: 300 !important;
}

.details-doro {
  position: absolute;
  pointer-events: none;
}

.details-doro--point {
  right: -80px;
  bottom: 0;
  width: 80px;
  animation: doro-float 3s ease-in-out infinite;
}

.details-doro--peek {
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  animation: doro-bounce 2.5s ease-in-out infinite;
}
```

- [ ] **Step 2: Update details HTML**

Replace the details `<div>` HTML (lines 559-578) with:

```html
<!-- Wedding Details -->
<div class="section" id="details">
  <h2 class="section-title">Wedding Details</h2>
  <div class="divider" style="margin-bottom: 40px;"></div>
  <div class="details-wrapper">
    <div class="details-grid">
      <div class="detail-item">
        <h3 class="detail-heading">Date</h3>
        <p>Saturday</p>
        <p>10 October 2026</p>
      </div>
      <div class="detail-item">
        <h3 class="detail-heading">Event</h3>
        <p>Dinner Reception</p>
      </div>
      <div class="detail-item">
        <h3 class="detail-heading">Venue</h3>
        <p>Pan Pacific Orchard</p>
        <p class="detail-sub">10 Claymore Rd, Singapore 229540</p>
      </div>
    </div>
    <img src="assets/doro/doro-point.png" alt="" class="details-doro details-doro--point" aria-hidden="true">
    <img src="assets/doro/doro-peek.png" alt="" class="details-doro details-doro--peek" aria-hidden="true">
  </div>
</div>
```

- [ ] **Step 3: Open in browser and verify**

Details section should show lilac-themed headings. A pointing Doro appears to the right and a peeking Doro on the left.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: restyle details section with Doro usher and peek placements"
```

---

### Task 5: RSVP Form Restyle + Dynamic Guest Names + Doro Reactions

**Files:**
- Modify: `index.html` — RSVP CSS (~lines 240-426), RSVP HTML (~lines 581-665), form JS (~lines 714-783)

- [ ] **Step 1: Update RSVP CSS**

Replace all RSVP-related CSS (`.rsvp-section` through `.rsvp-success p`, lines 240-426) with:

```css
/* ---- RSVP Form ---- */
.rsvp-section {
  padding: 80px 20px;
  max-width: 520px;
  margin: 0 auto;
  position: relative;
}

.rsvp-card {
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 40px;
  text-align: left;
  position: relative;
}

.rsvp-card .section-title,
.rsvp-card .section-subtitle {
  text-align: center;
}

.rsvp-doro {
  position: absolute;
  right: -90px;
  top: 80px;
  width: 80px;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 400;
  color: #7A6A7A;
  margin-bottom: 6px;
}

.required {
  color: var(--heading-color);
}

.form-group input[type="text"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 14px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-body);
  background: white;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--btn-hover);
}

.form-group input.error {
  border-color: var(--error-color);
}

/* Radio buttons */
.radio-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.radio-label {
  display: flex !important;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 300 !important;
  font-family: var(--font-body) !important;
}

.radio-label input[type="radio"] {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--accent-purple);
  border-radius: 50%;
  position: relative;
  transition: border-color 0.3s;
  flex-shrink: 0;
}

.radio-label input[type="radio"]:focus-visible + .radio-custom {
  box-shadow: 0 0 0 3px rgba(155, 114, 168, 0.2);
}

.radio-label input[type="radio"]:checked + .radio-custom {
  border-color: var(--heading-color);
}

.radio-label input[type="radio"]:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--heading-color);
  border-radius: 50%;
}

/* Conditional fields */
.attending-fields {
  transition: opacity 0.3s ease, max-height 0.3s ease;
  max-height: 800px;
  opacity: 1;
  overflow: hidden;
}

.attending-fields.hidden {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}

/* Dynamic guest name fields */
.guest-name-field {
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Submit button */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: white;
  background: var(--btn-bg);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: var(--btn-hover);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-orange {
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.form-error {
  text-align: center;
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 12px;
}

.hidden {
  display: none !important;
}

/* Success state */
.rsvp-success {
  text-align: center;
  padding: 40px 0;
}

.rsvp-success h3 {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--heading-color);
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.rsvp-success p {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  color: var(--text-body);
  margin-bottom: 20px;
}

.doro-dance-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
}

.doro-dance-row img {
  width: 80px;
}

/* Orange burst animation */
.burst-orange {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--orange);
  pointer-events: none;
  z-index: 9999;
  animation: burst 1.5s ease-out forwards;
}

@keyframes burst {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--bx), var(--by)) scale(0); opacity: 0; }
}

/* Confetti */
.confetti {
  position: fixed;
  width: 8px;
  height: 8px;
  pointer-events: none;
  z-index: 9999;
  animation: confetti-fall 3s ease-in forwards;
}

@keyframes confetti-fall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
```

- [ ] **Step 2: Update RSVP HTML**

Replace the RSVP `<div>` HTML (lines 581-665) with:

```html
<!-- RSVP Form -->
<div class="rsvp-section" id="rsvp">
  <div class="rsvp-card">
    <h2 class="section-title">RSVP</h2>
    <p class="section-subtitle">Kindly respond by 31 August 2026</p>

    <img src="assets/doro/doro-peek.png" alt="" class="rsvp-doro" id="rsvp-doro" aria-hidden="true">

    <form id="rsvp-form" novalidate>
      <div class="form-group">
        <label for="guest-name">Full Name <span class="required">*</span></label>
        <input type="text" id="guest-name" name="name" required placeholder="Your full name" autocomplete="name">
      </div>

      <div class="form-group">
        <label>Side <span class="required">*</span></label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="side" value="Groom" required>
            <span class="radio-custom"></span>
            Groom's Side
          </label>
          <label class="radio-label">
            <input type="radio" name="side" value="Bride" required>
            <span class="radio-custom"></span>
            Bride's Side
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>Attending <span class="required">*</span></label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="attending" value="Yes" required>
            <span class="radio-custom"></span>
            Joyfully Accepts
          </label>
          <label class="radio-label">
            <input type="radio" name="attending" value="No" required>
            <span class="radio-custom"></span>
            Regretfully Declines
          </label>
        </div>
      </div>

      <div id="attending-fields" class="attending-fields hidden">
        <div class="form-group">
          <label for="additional-guests">Number of Additional Guests</label>
          <select id="additional-guests" name="additionalGuests">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div id="guest-names-container"></div>

        <div class="form-group">
          <label for="dietary">Dietary Restrictions</label>
          <input type="text" id="dietary" name="dietary" placeholder="e.g. Vegetarian, No shellfish">
        </div>

        <div class="form-group">
          <label for="special-requests">Special Requests</label>
          <input type="text" id="special-requests" name="specialRequests" placeholder="Any special arrangements">
        </div>
      </div>

      <div class="form-group">
        <label for="message">Message to the Couple</label>
        <textarea id="message" name="message" rows="3" placeholder="Your warm wishes..."></textarea>
      </div>

      <button type="submit" class="submit-btn" id="submit-btn">
        <img src="assets/doro/doro-orange.png" alt="" class="btn-orange" aria-hidden="true">
        <span class="btn-text">Send RSVP</span>
        <span class="btn-loading hidden">Sending...</span>
        <img src="assets/doro/doro-orange.png" alt="" class="btn-orange" aria-hidden="true">
      </button>

      <p class="form-error hidden" id="form-error">Please fill in all required fields.</p>
    </form>

    <div class="rsvp-success hidden" id="rsvp-success">
      <h3>Thank You!</h3>
      <p>Your RSVP has been received.<br>We look forward to celebrating with you!</p>
      <div class="doro-dance-row">
        <img src="assets/doro/doro-dance.gif" alt="" aria-hidden="true">
        <img src="assets/doro/doro-happy.png" alt="" aria-hidden="true">
        <img src="assets/doro/doro-dance.gif" alt="" aria-hidden="true">
        <img src="assets/doro/doro-happy.png" alt="" aria-hidden="true">
        <img src="assets/doro/doro-dance.gif" alt="" aria-hidden="true">
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Rewrite form JS with dynamic guest names, Doro reactions, and celebration**

Replace the entire form IIFE (the `setupForm` function) with:

```js
// ---- RSVP Form Logic ----
(function setupForm() {
  var form = document.getElementById('rsvp-form');
  var attendingFields = document.getElementById('attending-fields');
  var guestNamesContainer = document.getElementById('guest-names-container');
  var additionalGuestsSelect = document.getElementById('additional-guests');
  var submitBtn = document.getElementById('submit-btn');
  var btnText = submitBtn.querySelector('.btn-text');
  var btnLoading = submitBtn.querySelector('.btn-loading');
  var formError = document.getElementById('form-error');
  var successDiv = document.getElementById('rsvp-success');
  var rsvpDoro = document.getElementById('rsvp-doro');

  // Doro reactions for attending choice
  document.querySelectorAll('input[name="attending"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.value === 'Yes') {
        attendingFields.classList.remove('hidden');
        rsvpDoro.src = 'assets/doro/doro-happy.png';
      } else {
        attendingFields.classList.add('hidden');
        rsvpDoro.src = 'assets/doro/doro-sad.png';
      }
    });
  });

  // Dynamic guest name fields
  additionalGuestsSelect.addEventListener('change', function() {
    var count = parseInt(this.value, 10);
    guestNamesContainer.innerHTML = '';
    for (var i = 1; i <= count; i++) {
      var div = document.createElement('div');
      div.className = 'form-group guest-name-field';
      div.innerHTML = '<label for="guest-name-' + i + '">Guest ' + i + ' Name</label>' +
        '<input type="text" id="guest-name-' + i + '" placeholder="Guest ' + i + ' full name">';
      guestNamesContainer.appendChild(div);
    }
  });

  // Orange burst celebration
  function celebrate() {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    for (var i = 0; i < 25; i++) {
      var el = document.createElement('div');
      el.className = 'burst-orange';
      var angle = (Math.PI * 2 * i) / 25;
      var dist = 100 + Math.random() * 200;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      el.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--by', Math.sin(angle) * dist + 'px');
      el.style.width = (10 + Math.random() * 15) + 'px';
      el.style.height = el.style.width;
      el.style.animationDelay = (Math.random() * 0.3) + 's';
      document.body.appendChild(el);
      setTimeout(function(e) { e.remove(); }.bind(null, el), 2000);
    }
    // Confetti
    var colors = ['#D4B8D8', '#E8B8A8', '#FFA040', '#F3E8FF', '#9B72A8'];
    for (var j = 0; j < 40; j++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = (Math.random() * 100) + 'vw';
      c.style.top = '-10px';
      c.style.background = colors[j % colors.length];
      c.style.animationDelay = (Math.random() * 1) + 's';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(c);
      setTimeout(function(e) { e.remove(); }.bind(null, c), 4000);
    }
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formError.classList.add('hidden');

    var name = document.getElementById('guest-name').value.trim();
    var side = form.querySelector('input[name="side"]:checked');
    var attending = form.querySelector('input[name="attending"]:checked');

    form.querySelectorAll('.error').forEach(function(el) {
      el.classList.remove('error');
    });

    var hasError = false;
    if (!name) { document.getElementById('guest-name').classList.add('error'); hasError = true; }
    if (!side) { hasError = true; }
    if (!attending) { hasError = true; }

    if (hasError) { formError.classList.remove('hidden'); return; }

    // Collect guest names
    var guestNames = [];
    var guestCount = attending.value === 'Yes' ? parseInt(additionalGuestsSelect.value, 10) : 0;
    for (var i = 1; i <= guestCount; i++) {
      var input = document.getElementById('guest-name-' + i);
      if (input) guestNames.push(input.value.trim());
    }

    var data = {
      name: name,
      side: side.value,
      attending: attending.value,
      additionalGuests: attending.value === 'Yes' ? additionalGuestsSelect.value : '0',
      guestNames: guestNames.join(' | '),
      dietary: attending.value === 'Yes' ? document.getElementById('dietary').value.trim() : '',
      specialRequests: attending.value === 'Yes' ? document.getElementById('special-requests').value.trim() : '',
      message: document.getElementById('message').value.trim()
    };

    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(data)
    })
    .then(function() {
      form.classList.add('hidden');
      successDiv.classList.remove('hidden');
      celebrate();
    })
    .catch(function() {
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      formError.textContent = 'Something went wrong. Please try again.';
      formError.classList.remove('hidden');
    });
  });
})();
```

- [ ] **Step 4: Open in browser and verify**

Test the full form flow: select attending → Doro changes to happy; select declining → Doro changes to sad; change guest count → name fields appear with slide animation; submit shows celebration with orange burst and confetti.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: restyle RSVP form with dynamic guest names, Doro reactions, and celebration"
```

---

### Task 6: Closing & Footer + Doro Parade

**Files:**
- Modify: `index.html` — closing/footer CSS (~lines 429-464) and HTML (~lines 669-677)

- [ ] **Step 1: Update closing/footer CSS**

Replace the closing and footer CSS (`.closing` through `.footer`, lines 429-464) with:

```css
/* ---- Closing ---- */
.closing {
  padding: 80px 20px 40px;
  text-align: center;
}

.closing-script {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: var(--text-light);
  margin-bottom: 12px;
  font-weight: 300;
  letter-spacing: 1px;
}

.closing-names {
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  color: var(--heading-color);
  letter-spacing: 3px;
}

.closing-date {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  letter-spacing: 4px;
  color: var(--text-light);
  margin-top: 12px;
}

/* Doro parade */
.doro-parade {
  overflow: hidden;
  padding: 20px 0;
  position: relative;
}

.doro-parade-track {
  display: flex;
  gap: 40px;
  animation: parade-scroll 15s linear infinite;
  width: max-content;
}

.doro-parade-track img {
  width: 50px;
  flex-shrink: 0;
}

@keyframes parade-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.footer {
  text-align: center;
  padding: 20px;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--text-light);
}
```

- [ ] **Step 2: Update closing/footer HTML**

Replace the closing `<div>` and `<footer>` HTML (lines 669-677) with:

```html
<!-- Closing -->
<div class="closing" id="closing">
  <p class="closing-script">We can't wait to celebrate with you</p>
  <p class="closing-names">Koon Hian & Germaine</p>
  <p class="closing-date">10 . 10 . 2026</p>
</div>

<div class="doro-parade" aria-hidden="true">
  <div class="doro-parade-track">
    <img src="assets/doro/doro-run-right.gif" alt="">
    <img src="assets/doro/doro-orange.png" alt="">
    <img src="assets/doro/doro-happy.png" alt="">
    <img src="assets/doro/doro-sit.png" alt="">
    <img src="assets/doro/doro-dance.gif" alt="">
    <img src="assets/doro/doro-point.png" alt="">
    <img src="assets/doro/doro-peek.png" alt="">
    <img src="assets/doro/doro-wave.png" alt="">
    <!-- Duplicate for seamless loop -->
    <img src="assets/doro/doro-run-right.gif" alt="">
    <img src="assets/doro/doro-orange.png" alt="">
    <img src="assets/doro/doro-happy.png" alt="">
    <img src="assets/doro/doro-sit.png" alt="">
    <img src="assets/doro/doro-dance.gif" alt="">
    <img src="assets/doro/doro-point.png" alt="">
    <img src="assets/doro/doro-peek.png" alt="">
    <img src="assets/doro/doro-wave.png" alt="">
  </div>
</div>

<footer class="footer">
  <p>With love, K & G</p>
</footer>
```

- [ ] **Step 3: Open in browser and verify**

Closing text should use lilac colors. A continuous parade of Doro images scrolls horizontally above the footer. The loop should be seamless.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: restyle closing section and add Doro parade footer"
```

---

### Task 7: Floating Oranges (CSS-only)

**Files:**
- Modify: `index.html` — add CSS and HTML for floating oranges

- [ ] **Step 1: Add floating orange CSS**

Add before the `/* ---- Responsive ---- */` comment:

```css
/* ---- Floating Oranges ---- */
.floating-oranges {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floating-orange {
  position: absolute;
  bottom: -40px;
  width: 20px;
  height: 20px;
  background: var(--orange);
  border-radius: 50%;
  opacity: 0.4;
  animation: orange-float linear infinite;
}

.floating-orange::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #6B8040;
  border-radius: 50% 50% 50% 0;
}

@keyframes orange-float {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.4; }
  10% { opacity: 0.5; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-110vh) rotate(360deg) translateX(30px); opacity: 0; }
}
```

- [ ] **Step 2: Add floating orange HTML**

Add immediately after the opening `<body>` tag:

```html
<!-- Floating Oranges -->
<div class="floating-oranges" aria-hidden="true">
  <div class="floating-orange" style="left:5%;width:18px;height:18px;animation-duration:12s;animation-delay:0s;"></div>
  <div class="floating-orange" style="left:12%;width:24px;height:24px;animation-duration:16s;animation-delay:2s;"></div>
  <div class="floating-orange" style="left:20%;width:15px;height:15px;animation-duration:10s;animation-delay:4s;"></div>
  <div class="floating-orange" style="left:28%;width:22px;height:22px;animation-duration:14s;animation-delay:1s;"></div>
  <div class="floating-orange" style="left:35%;width:18px;height:18px;animation-duration:18s;animation-delay:6s;"></div>
  <div class="floating-orange" style="left:42%;width:28px;height:28px;animation-duration:13s;animation-delay:3s;"></div>
  <div class="floating-orange" style="left:50%;width:16px;height:16px;animation-duration:11s;animation-delay:5s;"></div>
  <div class="floating-orange" style="left:58%;width:20px;height:20px;animation-duration:15s;animation-delay:0.5s;"></div>
  <div class="floating-orange" style="left:65%;width:25px;height:25px;animation-duration:17s;animation-delay:7s;"></div>
  <div class="floating-orange" style="left:72%;width:14px;height:14px;animation-duration:9s;animation-delay:2.5s;"></div>
  <div class="floating-orange" style="left:78%;width:22px;height:22px;animation-duration:14s;animation-delay:4.5s;"></div>
  <div class="floating-orange" style="left:85%;width:18px;height:18px;animation-duration:12s;animation-delay:1.5s;"></div>
  <div class="floating-orange" style="left:92%;width:20px;height:20px;animation-duration:16s;animation-delay:8s;"></div>
  <div class="floating-orange" style="left:8%;width:30px;height:30px;animation-duration:20s;animation-delay:9s;"></div>
  <div class="floating-orange" style="left:45%;width:12px;height:12px;animation-duration:8s;animation-delay:3.5s;"></div>
</div>
```

- [ ] **Step 3: Ensure sections have proper z-index**

Add to the existing `.hero`, `.section`, `.rsvp-section`, `.closing` rules:

```css
position: relative;
z-index: 1;
```

(`.hero` already has `position: relative` — just add `z-index: 1`. For `.section`, `.rsvp-section`, and `.closing`, add both.)

- [ ] **Step 4: Open in browser and verify**

Small orange circles should float upward continuously across the entire page. They should be behind all content. Each orange has a tiny green stem dot.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add floating orange particles across the page"
```

---

### Task 8: Random Doro Spawner

**Files:**
- Modify: `index.html` — add CSS and JS for random Doro spawner

- [ ] **Step 1: Add spawner CSS**

Add after the floating oranges CSS:

```css
/* ---- Random Doro Spawner ---- */
.spawned-doro {
  position: fixed;
  pointer-events: none;
  z-index: 9998;
}

.spawned-doro--ltr {
  animation: doro-run-ltr linear forwards;
}

.spawned-doro--rtl {
  animation: doro-run-rtl linear forwards;
}

@keyframes doro-run-ltr {
  from { transform: translateX(-100px); }
  to { transform: translateX(calc(100vw + 100px)); }
}

@keyframes doro-run-rtl {
  from { transform: translateX(calc(100vw + 100px)) scaleX(-1); }
  to { transform: translateX(-100px) scaleX(-1); }
}
```

- [ ] **Step 2: Add spawner JS**

Add at the end of the `<script>` block:

```js
// ---- Random Doro Spawner ----
(function startSpawner() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  var runImages = ['assets/doro/doro-run-right.gif', 'assets/doro/doro-run-left.gif'];
  var activeCount = 0;
  var maxActive = 3;

  function spawnDoro() {
    if (activeCount >= maxActive) return;
    activeCount++;

    var img = document.createElement('img');
    var ltr = Math.random() > 0.5;
    img.src = runImages[ltr ? 0 : 1];
    img.className = 'spawned-doro ' + (ltr ? 'spawned-doro--ltr' : 'spawned-doro--rtl');
    img.style.top = (Math.random() * 80 + 10) + 'vh';
    img.style.width = (50 + Math.random() * 30) + 'px';
    img.style.animationDuration = (3 + Math.random() * 2) + 's';
    img.setAttribute('aria-hidden', 'true');
    document.body.appendChild(img);

    img.addEventListener('animationend', function() {
      img.remove();
      activeCount--;
    });
  }

  function scheduleNext() {
    var delay = 4000 + Math.random() * 4000;
    setTimeout(function() {
      spawnDoro();
      scheduleNext();
    }, delay);
  }

  scheduleNext();
})();
```

- [ ] **Step 3: Open in browser and verify**

Every 4-8 seconds, a Doro should run across the screen horizontally at a random height. Some go left-to-right, some right-to-left. No more than 3 at once.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add random Doro spawner running across the screen"
```

---

### Task 9: Cursor Trail + Click-to-Spawn

**Files:**
- Modify: `index.html` — add CSS and JS

- [ ] **Step 1: Add cursor trail and click-spawn CSS**

Add after the spawner CSS:

```css
/* ---- Cursor Trail ---- */
.cursor-doro {
  position: fixed;
  pointer-events: none;
  z-index: 9997;
  animation: cursor-fade 0.8s ease-out forwards;
}

@keyframes cursor-fade {
  from { opacity: 0.7; transform: scale(1); }
  to { opacity: 0; transform: scale(0.3); }
}

/* ---- Click Spawn ---- */
.click-doro {
  position: fixed;
  pointer-events: none;
  z-index: 9997;
  animation: click-pop 1s ease-out forwards;
}

@keyframes click-pop {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), -60px) scale(0.5); }
}
```

- [ ] **Step 2: Add cursor trail and click-spawn JS**

Add at the end of the `<script>` block:

```js
// ---- Cursor Trail ----
(function setupCursorTrail() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  var isTouch = 'ontouchstart' in window;
  if (isTouch) return;

  var lastTime = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastTime < 80) return;
    lastTime = now;

    var img = document.createElement('img');
    img.src = 'assets/doro/doro-face.png';
    img.className = 'cursor-doro';
    img.style.left = (e.clientX - 12) + 'px';
    img.style.top = (e.clientY - 12) + 'px';
    img.style.width = '25px';
    img.setAttribute('aria-hidden', 'true');
    document.body.appendChild(img);

    setTimeout(function() { img.remove(); }, 800);
  });
})();

// ---- Click to Spawn ----
(function setupClickSpawn() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  var clickImages = [
    'assets/doro/doro-sit.png', 'assets/doro/doro-happy.png',
    'assets/doro/doro-orange.png', 'assets/doro/doro-peek.png',
    'assets/doro/doro-wave.png', 'assets/doro/doro-face.png'
  ];

  document.addEventListener('click', function(e) {
    if (e.target.closest('form, button, a, select, label')) return;

    var img = document.createElement('img');
    img.src = clickImages[Math.floor(Math.random() * clickImages.length)];
    img.className = 'click-doro';
    img.style.left = (e.clientX - 20) + 'px';
    img.style.top = (e.clientY - 20) + 'px';
    img.style.width = (30 + Math.random() * 20) + 'px';
    img.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
    img.setAttribute('aria-hidden', 'true');
    document.body.appendChild(img);

    setTimeout(function() { img.remove(); }, 1000);
  });
})();
```

- [ ] **Step 3: Open in browser and verify**

Move the mouse — small Doro faces should trail behind the cursor and fade out. Click anywhere outside the form — a random Doro should pop up and bounce away. Neither should interfere with form interaction.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Doro cursor trail and click-to-spawn interactions"
```

---

### Task 10: Konami Code Easter Egg

**Files:**
- Modify: `index.html` — add JS

- [ ] **Step 1: Add Konami code JS**

Add at the end of the `<script>` block:

```js
// ---- Konami Code Easter Egg ----
(function setupKonami() {
  var code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var pos = 0;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var allDoros = [
    'assets/doro/doro-peek.png', 'assets/doro/doro-sit.png',
    'assets/doro/doro-happy.png', 'assets/doro/doro-sad.png',
    'assets/doro/doro-orange.png', 'assets/doro/doro-wave.png',
    'assets/doro/doro-point.png', 'assets/doro/doro-hang.png',
    'assets/doro/doro-face.png', 'assets/doro/doro-carry.png'
  ];

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        doroExplosion();
      }
    } else {
      pos = 0;
    }
  });

  function doroExplosion() {
    // Flash
    var flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:99999;pointer-events:none;opacity:0.8;';
    document.body.appendChild(flash);
    setTimeout(function() { flash.remove(); }, 100);

    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var count = 40;

    for (var i = 0; i < count; i++) {
      var img = document.createElement('img');
      img.src = allDoros[i % allDoros.length];
      img.setAttribute('aria-hidden', 'true');
      img.style.position = 'fixed';
      img.style.left = cx + 'px';
      img.style.top = cy + 'px';
      img.style.width = (30 + Math.random() * 40) + 'px';
      img.style.pointerEvents = 'none';
      img.style.zIndex = '99998';
      img.style.transition = 'all ' + (2 + Math.random()) + 's ease-out';
      document.body.appendChild(img);

      (function(el, idx) {
        var angle = (Math.PI * 2 * idx) / count;
        var dist = 200 + Math.random() * 400;
        var rotation = Math.random() * 720 - 360;
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            el.style.left = (cx + Math.cos(angle) * dist) + 'px';
            el.style.top = (cy + Math.sin(angle) * dist) + 'px';
            el.style.transform = 'rotate(' + rotation + 'deg)';
            el.style.opacity = '0';
          });
        });
        setTimeout(function() { el.remove(); }, 3500);
      })(img, i);
    }
  }
})();
```

- [ ] **Step 2: Open in browser and verify**

Press Up Up Down Down Left Right Left Right B A on the keyboard. A white flash should appear, followed by 40 Doro images bursting outward from the center, spinning and fading away. Should be triggerable multiple times.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Konami code Doro explosion easter egg"
```

---

### Task 11: Responsive Design + Reduced Motion

**Files:**
- Modify: `index.html` — update media queries

- [ ] **Step 1: Replace all responsive CSS**

Replace the responsive media queries (everything from `@media (max-width: 768px)` to the closing `</style>`) with:

```css
/* ---- Responsive ---- */
@media (max-width: 768px) {
  .countdown {
    gap: 10px;
  }

  .countdown-item {
    width: 75px;
    height: 75px;
  }

  .countdown-number {
    font-size: 1.6rem;
  }

  .countdown-doro {
    width: 30px;
    top: -22px;
  }

  .radio-group {
    flex-direction: column;
    gap: 10px;
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .details-doro--point {
    right: -50px;
    width: 50px;
  }

  .details-doro--peek {
    display: none;
  }

  .rsvp-card {
    padding: 28px 20px;
  }

  .rsvp-doro {
    right: -60px;
    width: 50px;
  }

  .hero-doro--hang {
    width: 50px;
    right: 10px;
  }

  .hero-doro--orange {
    display: none;
  }

  .hero-doro--peek {
    width: 70px;
  }

  .doro-parade-track img {
    width: 35px;
  }

  .doro-parade-track {
    gap: 25px;
  }
}

@media (max-width: 380px) {
  .countdown {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .countdown-item {
    width: 100%;
  }

  .countdown-doro {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  .floating-oranges {
    display: none;
  }

  .doro-parade-track {
    animation: none;
  }
}
```

- [ ] **Step 2: Open in browser and verify at different widths**

Test at 768px, 380px, and with `prefers-reduced-motion` enabled (toggle in browser DevTools > Rendering). Floating oranges and parade should stop with reduced motion. Countdown Doros should hide on very small screens.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: update responsive design and reduced motion for Doro elements"
```

---

### Task 12: Update Apps Script

**Files:**
- Modify: `apps-script.js`

- [ ] **Step 1: Update the apps-script.js file**

Replace the entire file with:

```js
/**
 * Google Apps Script for Wedding RSVP
 *
 * Setup instructions:
 * 1. Create a new Google Sheet
 * 2. Add header row: Timestamp | Name | Side | Attending | Additional Guests | Guest Names | Dietary Restrictions | Special Requests | Message
 * 3. Go to Extensions > Apps Script
 * 4. Delete any existing code and paste this entire file
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Set "Execute as": Me
 * 8. Set "Who has access": Anyone
 * 9. Click Deploy and authorize
 * 10. Copy the web app URL
 * 11. Paste the URL into index.html where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;
    if (e.postData.type === 'application/x-www-form-urlencoded') {
      data = e.parameter;
    } else {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.side || '',
      data.attending || '',
      data.additionalGuests || '0',
      data.guestNames || '',
      data.dietary || '',
      data.specialRequests || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps-script.js
git commit -m "feat: add guestNames column to Apps Script for named +1 support"
```

---

### Task 13: Final Smoke Test + Asset Directory Setup

**Files:**
- Create: `assets/doro/.gitkeep`

- [ ] **Step 1: Create the assets/doro directory**

```bash
mkdir -p assets/doro
touch assets/doro/.gitkeep
```

- [ ] **Step 2: Add assets/doro to .gitignore exceptions if needed**

The `.gitignore` currently only ignores `.superpowers/`. No changes needed — `assets/doro/` will be tracked.

- [ ] **Step 3: Full smoke test in browser**

Open `index.html` and verify the complete flow:

1. **Hero**: Lilac-sunset gradient, Bodoni Moda names, 3 Doro placements, Doro scroll indicator
2. **Floating oranges**: Orange circles float upward across the whole page
3. **Random spawner**: Doro runs across the screen every 4-8 seconds
4. **Cursor trail**: Doro faces trail the mouse
5. **Click-to-spawn**: Clicking spawns a random Doro
6. **Countdown**: 4 cards with Doros on top, bounce on tick
7. **Details**: Pointing and peeking Doro placements
8. **RSVP form**: Doro reactions on attending choice, dynamic guest name fields, orange-flanked submit button
9. **RSVP success**: Celebration burst with dancing Doros, orange burst, confetti
10. **Footer**: Doro parade scrolling horizontally
11. **Konami code**: Up Up Down Down Left Right Left Right B A triggers Doro explosion
12. **Mobile**: Resize to 375px, verify reduced Doros and layout adjustments
13. **Reduced motion**: Toggle in DevTools, verify animations stop

- [ ] **Step 4: Commit**

```bash
git add assets/doro/.gitkeep
git commit -m "chore: add assets/doro directory for Doro meme images"
```
