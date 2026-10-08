You are an elite Principal Design Engineer and Senior Full-Stack Architect possessing world-class frontend engineering capabilities paired with senior UI/UX product design expertise (comparable to design-led engineering at Vercel, Linear, and Stripe).

Your goal is to completely redesign and elevate my personal portfolio and interactive resume website. The end product must look unmistakably like it was created by an experienced Senior Developer who has mastered design systems, visual hierarchy, typography, and recruiter-focused user experience.

---

### 1. UI/UX Design System & Aesthetic Foundation

- **Visual Style & Philosophy:**
  - Modern, minimalist, and ultra-refined developer aesthetic (inspired by Linear, Raycast, and Vercel).
  - **Color Palette & Contrast:** Deep dark mode default with an immaculate light mode toggle. Utilize a cohesive neutral base (Zinc or Neutral), subtle tonal depth (`bg-zinc-950`, `bg-zinc-900/50`, `border-zinc-800/80`), and high-contrast typography. Accents should be surgical and intentional (e.g., subtle indigo, emerald, or cyan glows for interactive focus).
  - **Grid & Depth:** Modern Bento-grid layouts with subtle 1px border highlights (`border border-white/10 dark:border-white/5`), radial gradient spotlight effects on hover, backdrop-blur acrylic glass effects, and soft layered drop-shadows.
  - **Typography Scale:** Fluid, high-legibility typography (using `Inter`, `Geist`, or system font stacks) with distinct visual hierarchy, tight tracking on large headings (`tracking-tight`), and readable line heights (`leading-relaxed`) for body text.

- **Micro-Interactions & Animation Standards (Framer Motion):**
  - Subtle, spring-physics micro-interactions (stiffness: 400, damping: 30) for button presses, card hovers, and tab switches.
  - Staggered entrance animations on initial page load.
  - Hover glow / spotlight effects following mouse position on interactive project cards.
  - Strict adherence to `prefers-reduced-motion` for accessibility.

---

### 2. Information Architecture & Recruiter UX

Recruiters and hiring managers spend an average of 15–30 seconds reviewing a portfolio. The UX must support both a rapid high-level scan and an in-depth technical drill-down.

1. **Executive Hero Section (The 5-Second Pitch):**
   - Clean status indicator: Glowing green dot with "Available for opportunities" (or active role).
   - High-impact headline communicating domain expertise, seniority, and stack specialization.
   - 2-sentence executive summary focusing on engineering philosophy and business impact.
   - Primary action strip: "View Selected Work", "Download Resume (PDF)", and direct "Copy Email" with one-click toast feedback.
   - Quick-access social pills (GitHub, LinkedIn, Email) with hover tooltips.

2. **Command Palette (`Cmd + K` Navigation):**
   - Keyboard-accessible search modal (using `cmdk` or Radix UI Dialog) enabling recruiters to instantly jump to projects, view skills, download the resume, or toggle dark/light themes.

3. **Featured Engineering Projects (Bento Grid Layout):**
   - Case-study cards showing more than just screenshots:
     - **Context & Problem:** What engineering problem was solved?
     - **Key Architectural Highlights:** (e.g., "Optimized Redis cache layer", "Built real-time WebSockets pipeline").
     - **Quantifiable Metrics Badge:** (e.g., "99.9% Uptime", "40% Lower TTFB", "10k+ MAU").
     - **Interactive Drawer / Modal:** Option to click into a project to read technical deep-dives (architecture diagram, trade-offs made, and lessons learned).
     - Direct links: GitHub Source (with star count badge if applicable) and Live Production Demo.

4. **Interactive Timeline & Resume Engine:**
   - Chronological timeline featuring company logos, tenure, role titles, and technology tags.
   - Bullet points written in Google's X-Y-Z format (*Accomplished [X] measured by [Y] by doing [Z]*).
   - **Recruiter Print View:** Dedicated `@media print` CSS stylesheet ensuring that pressing `Cmd + P` or clicking "Print Resume" exports an unformatted, pixel-perfect, 1-page or 2-page traditional PDF resume.

5. **Categorized Tech Stack & Competency Matrix:**
   - Grouped cleanly: Languages, Frontend Architecture, Backend & Distributed Systems, Cloud & DevOps, Testing & Tooling.
   - Interactive filtering: Selecting a skill (e.g., "Next.js" or "PostgreSQL") highlights the projects that utilize that technology.

6. **Contact & Social Connect:**
   - Minimalist, friction-free contact component with instant copy-to-clipboard for email, calendar scheduling link (Cal.com/Calendly), and verified contact information.

---

### 3. Senior Engineering & Clean Code Standards

- **Tech Stack:** Next.js (App Router, Server Components where appropriate), TypeScript (strict mode, zero `any`), Tailwind CSS (v3 or v4), Framer Motion, and Radix UI primitives.
- **Component Architecture:**
  - Strict separation of design tokens, headless logic, and presentation components.
  - Reusable primitive components inside `@/components/ui/` (`Card`, `Badge`, `Button`, `Dialog`, `Tooltip`).
  - Section components inside `@/components/sections/`.
  - Single source of truth for all content in `@/data/portfolio.ts` with strict TypeScript schemas.
- **Accessibility (a11y):** WCAG 2.1 AA compliant, full keyboard tab order navigation, visible focus rings (`focus-visible:ring-2`), and semantic HTML5 landmark tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Performance:** 100/100 Core Web Vitals, zero layout shift (CLS = 0), optimized Next.js `<Image />` tags with blurred placeholder support.

---

### 4. Redesign Execution Plan (How You Will Guide Me)

Please execute the redesign collaboratively in structured phases. Do not output thousands of lines in one prompt. Guide me step-by-step:

- **Phase 1: Design Tokens & Base Setup:** Define Tailwind configuration (extended color tokens, surface elevations, blur tokens, font variables) and base CSS typography styles.
- **Phase 2: Data Schema & Content Architecture:** Define the strongly typed `/data/portfolio.ts` schema, including project metrics, architecture highlights, and experience entries.
- **Phase 3: Core Design Primitives:** Code the fundamental Bento Card, Section Header, Glow Badge, and Magnetic Button components.
- **Phase 4: Hero & Command Palette (`Cmd + K`):** Build the high-converting Hero section and interactive quick-search dialog.
- **Phase 5: Bento Projects Grid & Interactive Detail Modals:** Build the project showcase cards with hover effects and deep-dive technical views.
- **Phase 6: Experience Timeline & Print-Optimized Resume:** Assemble the work history timeline and implement the `@media print` clean resume view.
- **Phase 7: Final Polish & Audit:** Optimize transitions, test keyboard navigation, and verify responsive mobile breakpoints.

Begin with **Phase 1: Design Tokens & Base Setup**. Provide the configuration files and wait for my review before moving forward.
