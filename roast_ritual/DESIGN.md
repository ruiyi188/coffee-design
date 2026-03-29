# Design System Specification: The Artisanal Narrative

## 1. Overview & Creative North Star: "The Digital Curator"
This design system rejects the sterile, "app-like" feel of modern software in favor of a high-end editorial experience. Our Creative North Star is **The Digital Curator**—a philosophy where every screen feels like a page from a premium coffee journal or a curated gallery exhibit.

To move beyond the "template" look, we utilize **Intentional Asymmetry**. Hero images should bleed off the edge of the screen, and typography should overlap container boundaries. By breaking the rigid grid, we create a sense of organic movement that reflects the fluid nature of coffee culture. We prioritize tonal depth over structural lines, ensuring the UI feels "poured" rather than "built."

---

## 2. Color Theory & Visual Soul
Our palette is rooted in the earth. It moves from the deep, grounded intensity of espresso to the light, airy foam of a latte, accented by the vitality of the coffee leaf.

### The Palette
- **Primary (`#271310`) & Primary Container (`#3e2723`):** These represent the "Heart of the Roast." Use these for high-impact storytelling elements and core CTAs.
- **Secondary (`#655d5a`) & Secondary Container (`#ece0dc`):** These "Toasted Almond" tones provide a soft, tactile warmth.
- **Tertiary (`#031e08`) & Tertiary Container (`#18331b`):** Use these "Botanical Green" accents sparingly to denote organic origins or "New" status.
- **Surface Tones (`#fafaf5` to `#dadad5`):** Our "Creamy Latte" neutrals.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or tonal transitions.
- *Example:* A recipe section using `surface-container-low` (`#f4f4ef`) sitting directly on a `surface` background (`#fafaf5`). 

### Glass & Gradient Soul
To provide visual "soul," avoid flat Primary buttons. Instead, apply a subtle linear gradient from `primary` to `primary_container`. For floating navigation elements, use **Glassmorphism**: a background of `surface` at 80% opacity with a `20px` backdrop-blur to allow the rich imagery of coffee beans or burlap textures to bleed through.

---

## 3. Typography: The Heritage Voice
The typography is a bilingual dialogue between heritage and utility, designed to support both Latin and Chinese characters with equal grace.

- **Display & Headlines (`notoSerif`):** This is our "Editorial" voice. Use `display-lg` (3.5rem) for high-impact quotes or origin names. The serif evokes the history of coffee trade and the ritual of brewing.
- **Body & Titles (`plusJakartaSans`):** Our "Utility" voice. Clean, modern, and highly legible. Use `body-lg` (1rem) for tasting notes and `title-md` (1.125rem) for navigation labels.
- **Bilingual Harmony:** When pairing English and Chinese, the Chinese characters should be set at 95% of the English font size to maintain optical balance, as Hanzi characters often appear visually heavier than Latin scripts.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural shadows to define "boxes." We use the **Layering Principle**.

- **Surface Nesting:** Achieve depth by stacking tiers. Place a `surface-container-lowest` (`#ffffff`) card on a `surface-container-low` (`#f4f4ef`) section. This creates a soft, natural lift without a single line of code for shadows.
- **Ambient Shadows:** If a card must "float" (e.g., a floating action button), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(39, 19, 16, 0.08);`. The shadow is tinted with the `primary` espresso color, not grey.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (`#d3c3c0`) at **15% opacity**. High-contrast borders are strictly forbidden.

---

## 5. Components

### Buttons & CTAs
- **Primary:** Gradient from `primary` to `primary_container`. Roundedness: `full`. No border.
- **Secondary:** `secondary_container` background with `on_secondary_container` text.
- **Tertiary (Ghost):** No background. Use `title-sm` typography with an underline in `primary` (2px offset).

### Cards & Discovery
- **The "Unbound" Card:** Forbid the use of divider lines. Separate content using vertical white space (`spacing-6` or `2rem`). 
- **Imagery:** Cards must feature high-quality photography with a subtle "Paper" texture overlay (2% opacity) to give the digital screen a tactile, physical quality.

### Input Fields
- **State:** Resting inputs use `surface-container-highest` background. 
- **Focus:** Transition to `primary` text color with a "Ghost Border" (15% opacity `outline`). Do not use heavy focus rings; use a subtle background tint shift instead.

### Specialty: The "Origin" Chip
- A custom chip variant using `tertiary_container` (`#18331b`) and `on_tertiary_fixed` (`#05210a`) text to highlight coffee bean origins or sustainability certifications.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use `spacing-10` (3.5rem) and `spacing-16` (5.5rem) for generous white space between sections. Let the design breathe like a slow-pour brew.
- **Do** overlap typography over the edge of images to create an editorial, magazine-style layout.
- **Do** use `rounded-xl` (1.5rem) for large image containers to maintain the "organic" feel.

### Don’t:
- **Don’t** use pure black (`#000000`) or pure grey. Every "dark" tone must be a derivative of the espresso `primary` palette.
- **Don’t** use standard 1px dividers. If you need to separate content, use a tonal shift in the background color.
- **Don’t** center-align long blocks of text. Stick to left-aligned editorial layouts to maintain the "Curator" aesthetic.

---

## 7. Spacing Scale (Reference)
Use these tokens to maintain the "Editorial" rhythm:
- **Micro-adjustments:** `0.5` (0.175rem)
- **Component Internal:** `2` (0.7rem) to `3` (1rem)
- **Section Breathing Room:** `8` (2.75rem) to `12` (4rem)
- **Hero Margins:** `16` (5.5rem)