import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Cedric",
    role: "Senior Software Engineer",
    headline: "I design and build product experiences that make complex systems feel simple.",
    bio: "Senior Software Engineer specializing in Next.js, React, TypeScript, and cloud architecture. I turn complex technical challenges into high-performance, accessible, and maintainable product experiences with strict attention to performance and UX design systems.",
    location: "Remote / Available Worldwide",
    availability: "Available for Senior / Lead Roles",
    email: "cedric@example.com",
    resumeUrl: "/resume.pdf",
    socialLinks: [
      {
        platform: "GitHub",
        label: "GitHub",
        href: "https://github.com/DeadPixel05",
        ariaLabel: "Visit GitHub profile",
      },
      {
        platform: "LinkedIn",
        label: "LinkedIn",
        href: "https://linkedin.com",
        ariaLabel: "Visit LinkedIn profile",
      },
      {
        platform: "Email",
        label: "Email",
        href: "mailto:cedric@example.com",
        ariaLabel: "Send an email",
      },
    ],
  },
  projects: [
    {
      id: "project-analytics-dashboard",
      title: "Real-Time Operations & Analytics Engine",
      featured: true,
      category: "Full-Stack & Systems Architecture",
      role: "Lead Full-Stack Engineer",
      summary:
        "High-throughput analytics platform aggregating operational metrics across 500k+ daily telemetry events with sub-100ms query latency.",
      problem:
        "Legacy reporting tools suffered from multi-second load times and fragmented spreadsheet syncs, blocking real-time operational decisions for engineering and product leads.",
      architecture: [
        "React Server Components & Next.js App Router for zero-JS initial render overhead.",
        "PostgreSQL read-replicas with Prisma ORM and connection pooling for concurrent burst traffic.",
        "Server-Sent Events (SSE) for low-overhead live dashboard streaming without WebSocket connection saturation."
      ],
      metrics: "99.9% Uptime · 42% Lower TTFB · 500k+ Events/Day",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma", "Docker"],
      impact: [
        "Eliminated 15+ hours per week of manual cross-team report compilation.",
        "Reduced 95th percentile page latency from 3.2s to under 180ms.",
        "Scaled telemetry ingestion from 50k to 500k daily events without infrastructure cost inflation."
      ],
      keyFeatures: [
        "Real-time event streaming via Server-Sent Events with automatic reconnection.",
        "Interactive canvas timeline and time-series aggregation charts.",
        "Granular role-based access control (RBAC) and CSV/JSON audit exporting."
      ],
      technicalTradeoffs: [
        "Selected Server-Sent Events over WebSockets to reduce connection pooling overhead and simplify load balancing.",
        "Chose PostgreSQL materialized views over Elasticsearch for initial phase to keep operational complexity low while maintaining sub-100ms reads."
      ],
      links: [
        { label: "Live Demo", href: "https://example.com" },
        { label: "Source Code", href: "https://github.com/DeadPixel05/cedportfolio" },
      ],
    },
    {
      id: "project-internal-tooling",
      title: "Distributed Workflow Orchestration Platform",
      featured: false,
      category: "Platform Engineering",
      role: "Senior Software Engineer",
      summary:
        "An asynchronous job queue and orchestration engine automating multi-step service delivery, third-party webhook dispatch, and automated issue triage.",
      problem:
        "Cross-departmental handoffs relied on manual slack notifications and ticket updates, resulting in frequent missed SLA targets and high process error rates.",
      architecture: [
        "Node.js microservice architecture utilizing Redis-backed job queues with exponential backoff retries.",
        "Idempotent webhook delivery pipeline handling 10k+ third-party integrations daily.",
        "Docker containerized services managed via GitHub Actions CI/CD pipeline."
      ],
      metrics: "85% Process Automation · <50ms Queue Overhead",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
      impact: [
        "Automated 85% of routine operational handoffs, saving over 40 team-hours weekly.",
        "Reduced process error rates from 4.2% to under 0.1% via automated idempotency checks.",
        "Achieved seamless zero-downtime deployments using Docker rolling updates."
      ],
      keyFeatures: [
        "Visual DAG job workflow builder with step dependency tracking.",
        "Real-time retry monitor and failed job dead-letter queue inspection.",
        "Structured audit logging for security compliance."
      ],
      technicalTradeoffs: [
        "Selected BullMQ over Kafka to avoid operational maintenance overhead given team size and throughput needs.",
        "Used JSON schema validation at API boundaries rather than GraphQL to preserve legacy endpoint compatibility."
      ],
      links: [
        { label: "Architecture Spec", href: "https://example.com" },
        { label: "Source Code", href: "https://github.com/DeadPixel05/cedportfolio" },
      ],
    },
    {
      id: "project-ux-foundations",
      title: "Enterprise Design System & UI Primitive Engine",
      featured: false,
      category: "Design Systems & Frontend Architecture",
      role: "Design Systems Engineer",
      summary:
        "An accessible, headless UI component library and design system enforcing WCAG 2.1 AA compliance across 12+ internal and customer-facing products.",
      problem:
        "Inconsistent UI patterns and redundant codebases across different product teams led to fragmented user experience, accessibility violations, and slow feature velocity.",
      architecture: [
        "Built on Radix UI headless primitives and Tailwind CSS for full keyboard navigation and screen-reader compliance.",
        "Strict TypeScript type contracts enforcing token-driven spacing, typography, and color elevations.",
        "Automated visual regression testing pipeline using Playwright and Storybook."
      ],
      metrics: "100% WCAG AA Compliant · 3x Faster Feature Scaffolding",
      stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI", "Storybook", "Playwright"],
      impact: [
        "Accelerated new feature rollout speed by 3x by standardizing reusable accessible UI primitives.",
        "Achieved zero accessibility audit violations across all primary customer-facing user flows.",
        "Reduced bundle size by 35% through tree-shakeable modular component exports."
      ],
      keyFeatures: [
        "Full dark/light mode surface elevations with high-contrast token enforcement.",
        "Comprehensive keyboard shortcut manager and focus trap manager.",
        "Interactive Storybook documentation with live token inspector."
      ],
      technicalTradeoffs: [
        "Selected Tailwind CSS with CSS custom properties over runtime CSS-in-JS to eliminate runtime style injection overhead.",
        "Prioritized headless Radix UI primitives over building raw unstyled elements from scratch to ensure robust WAI-ARIA behavior."
      ],
      links: [
        { label: "Documentation", href: "https://example.com" },
        { label: "Source Code", href: "https://github.com/DeadPixel05/cedportfolio" },
      ],
    },
  ],
  experience: [
    {
      id: "experience-1",
      company: "Apex Tech Systems",
      role: "Senior Software Engineer",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      summary:
        "Led core application architecture and frontend platform initiatives across distributed product teams, serving over 100k active users.",
      achievements: [
        "Architected Next.js App Router migration, improving Lighthouse Performance score from 68 to 98 and reducing bundle size by 40%.",
        "Mentored a team of 6 engineers on TypeScript best practices, design systems, and automated testing strategies.",
        "Spearheaded real-time telemetry streaming implementation that processed 500k+ daily operational events with 99.9% uptime."
      ],
    },
    {
      id: "experience-2",
      company: "Vanguard Digital Lab",
      role: "Software Engineer",
      location: "Hybrid",
      startDate: "2021",
      endDate: "2023",
      summary:
        "Built customer-facing web applications and internal operational tooling, collaborating closely with product managers and UX designers.",
      achievements: [
        "Developed end-to-end user authentication and role-based access control (RBAC) system serving 50k+ enterprise users.",
        "Optimized complex PostgreSQL queries and database indexing, reducing slow query occurrences by 65%.",
        "Established CI/CD pipeline automated testing suites, reducing staging release defects by 45%."
      ],
    },
    {
      id: "experience-3",
      company: "Nexus Interactive",
      role: "Frontend Engineer",
      location: "On-site",
      startDate: "2019",
      endDate: "2021",
      summary:
        "Crafted responsive, high-performance web interfaces and design tokens for e-commerce and SaaS platforms.",
      achievements: [
        "Implemented component library adopted by 4 cross-functional feature teams, decreasing UI bug reports by 30%.",
        "Engineered accessible checkout flows complying with WCAG 2.1 AA standards.",
        "Streamlined asset loading and image optimization pipeline, boosting mobile conversion rate by 18%."
      ],
    },
  ],
  skills: [
    { id: "skill-typescript", name: "TypeScript", category: "Languages", level: "Production" },
    { id: "skill-javascript", name: "JavaScript", category: "Languages", level: "Production" },
    { id: "skill-python", name: "Python", category: "Languages", level: "Proficient" },
    { id: "skill-html", name: "HTML / CSS", category: "Languages", level: "Production" },
    { id: "skill-react", name: "React", category: "Frontend", level: "Production" },
    { id: "skill-nextjs", name: "Next.js (App Router)", category: "Frontend", level: "Production" },
    { id: "skill-tailwind", name: "Tailwind CSS", category: "Frontend", level: "Production" },
    { id: "skill-a11y", name: "WCAG / Accessibility", category: "Frontend", level: "Production" },
    { id: "skill-framer", name: "Framer Motion", category: "Frontend", level: "Proficient" },
    { id: "skill-node", name: "Node.js", category: "Backend & Databases", level: "Production" },
    { id: "skill-postgres", name: "PostgreSQL", category: "Backend & Databases", level: "Production" },
    { id: "skill-redis", name: "Redis", category: "Backend & Databases", level: "Proficient" },
    { id: "skill-rest", name: "REST / GraphQL", category: "Backend & Databases", level: "Production" },
    { id: "skill-prisma", name: "Prisma ORM", category: "Backend & Databases", level: "Production" },
    { id: "skill-docker", name: "Docker", category: "DevOps & Cloud", level: "Proficient" },
    { id: "skill-git", name: "Git / GitHub Actions", category: "DevOps & Cloud", level: "Production" },
    { id: "skill-supabase", name: "Supabase", category: "DevOps & Cloud", level: "Proficient" },
    { id: "skill-testing", name: "Playwright / Vitest", category: "Tools & Testing", level: "Production" },
    { id: "skill-storybook", name: "Storybook", category: "Tools & Testing", level: "Proficient" },
  ],
};
