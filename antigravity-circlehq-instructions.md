# Instructions for Antigravity — Circle HQ Restructure + New Pages

## 0. Ground Rules (read first, do not skip)

- The **homepage/landing page is APPROVED and FINAL**. Do not modify its markup, styles, animations, copy, or component structure in any way — not even "small cleanups." If restructuring folders requires moving homepage files, move them without altering their contents.
- Do not introduce a different design language, spacing scale, animation library, or component pattern on new pages. The homepage is the single source of truth for how this site looks and behaves. Every new page is a **continuation** of it, not a fresh interpretation.
- If something in the copy doc is ambiguous or missing a clear UI pattern to reuse from the homepage, stop and ask — don't invent a new pattern.

---

## 1. Study Phase (do this first, report back before building)

Study the folder structure and project organization of this reference project:

```
C:\Users\User\Documents\sage-sh
```

Document:
- Top-level folder layout (e.g. `app/`, `components/`, `features/`, `lib/`, `styles/`, etc.)
- How pages/routes are organized (per-route folders? flat pages dir? route groups?)
- How components are split — shared/global vs. page-specific vs. section-level
- Naming conventions (files, components, exports)
- Where shared design tokens, hooks, and utils live

Then study the **current Circle HQ landing project** the same way, and specifically identify:
- Every component the homepage currently uses (hero, node network, custom cursor, scramble headline, magnetic CTAs, 3D tilt cards, "The Sage" easter egg, etc.)
- Which of these are truly global/reusable (nav, footer, cursor, buttons, section wrappers, animation utilities) vs. homepage-only (hero-specific content)
- Current folder structure so we know what needs to move vs. what stays

**Before writing any code**, give me a short summary of:
1. The sage-sh structure pattern you're adopting
2. The proposed new Circle HQ folder structure
3. Which existing files move where (explicit list)
4. Confirmation that no homepage file content will change, only its location if applicable

---

## 2. Folder Restructure

Once the above is confirmed, reorganize the project to match the sage-sh pattern. Guidelines:
- Group by route/page where sage-sh does (e.g. each page gets its own folder for page-specific sections/components).
- Pull genuinely shared UI (nav, footer, buttons, cursor, layout wrappers, animation/GSAP utilities, theme tokens) into a shared/common layer, consistent with how sage-sh separates shared vs. page-specific code.
- Keep the homepage's internal file contents untouched — this step is about **location**, not rewriting.
- Update imports across the project after the move; verify the homepage still builds and renders identically.

---

## 3. Brand Theme — Apply Site-Wide

Use this exact theme token block as the single source of design tokens for the entire site (already used on the homepage — extend it, don't duplicate or override it per-page):

```css
@theme {
  --color-hq-red: #e0142c;
  --color-hq-red-dim: #8e0b1c;
  --color-hq-black: #070708;
  --color-hq-panel: #0e0e11;
  --color-hq-line: #1e1e24;
  --color-hq-mute: #8a8a94;
  --color-hq-bone: #efeae1;
  --color-hq-bone-deep: #e4ded2;
  --color-hq-ink: #131315;
  --color-hq-red-deep: #c21024;
  --color-hq-red-ink: #5c0512;

  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-sans: Inter, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

If this isn't already centralized in a single tokens/theme file post-restructure, move it there so every page imports from one place.

---

## 4. New Pages to Build

Content source: `Circle_HQ_Website_Copy_v3.md` (attached separately — use it verbatim for copy, do not paraphrase or add pricing anywhere).

Build these pages using the **homepage's existing patterns** — same section rhythm, same hero treatment style (adapted per page's own headline/subhead), same CTA button components, same card/grid treatments, same GSAP transition conventions, same dark theme + signal-red accent usage:

1. **About** — Hero, "Why We Built Circle HQ," "Our Philosophy & Promise" (4 value cards: Growth, Simplicity, Curiosity, Focus — reuse the homepage's card component pattern, e.g. the 3D tilt division cards or "Why Circle HQ" card style).
2. **Circle AI Solutions** — Hero, "Why We Exist," "The Problems We Solve" (problem/solution pairs — pull the full list directly from the source md file, section 3).
3. **Circle Academy** — Hero, "Two Levels of Training" intro, Business Level Training block, Individual Skill-Based Training block (3 tiers: Fast-Track, Standard, Deep-Dive), Free Programmes block, closing CTA with two buttons.
4. **Book a Consultation & Business Readiness Check** — Hero, "What Happens When You Book" (4-step — reuse the homepage's "How We Work" 4-step pattern/component), "Is Your Business Ready for AI?" self-check questions with two CTA paths.
5. **FAQ** — Accordion or stacked Q&A list, matching homepage typography and spacing; closing CTA.

Shared across all new pages:
- Reuse the homepage's nav and footer components as-is (no redesign).
- Reuse the magnetic CTA button component for every CTA in the copy doc.
- Where the copy doc references a numbered/step process, reuse the homepage's existing numbered-step section pattern rather than building a new one.
- No prices anywhere, per the copy doc's explicit instruction.

---

## 5. Definition of Done

- Homepage renders pixel-identical to before restructuring.
- All 5 new pages live, using only components/patterns that already exist in the homepage's design system (net-new components only where the homepage has no equivalent pattern — flag these explicitly for review).
- Folder structure matches the agreed sage-sh-inspired layout.
- Single shared theme/token file in use everywhere; no hardcoded hex values outside it.
- Short changelog of what moved, what was net-new, and any ambiguous copy sections that need my input.
