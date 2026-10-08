import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Your Name",
    role: "Software Engineer",
    headline: "I design and build product experiences that make complex systems feel simple.",
    bio: "I am a software engineer focused on crafting reliable, accessible, and maintainable digital products. I enjoy turning ambiguous product challenges into clear technical execution plans and shipping polished experiences that help teams move faster.",
    location: "Remote / Your City",
    availability: "Open to opportunities",
    email: "your.email@example.com",
    resumeUrl: "/resume.pdf",
    socialLinks: [
      {
        platform: "GitHub",
        label: "GitHub",
        href: "https://github.com/yourusername",
        ariaLabel: "Visit GitHub profile",
      },
      {
        platform: "LinkedIn",
        label: "LinkedIn",
        href: "https://linkedin.com/in/yourusername",
        ariaLabel: "Visit LinkedIn profile",
      },
      {
        platform: "Email",
        label: "Email",
        href: "mailto:your.email@example.com",
        ariaLabel: "Send an email",
      },
    ],
  },
  projects: [
    {
      id: "project-analytics-dashboard",
      title: "Operations Analytics Dashboard",
      summary:
        "A data-rich dashboard that helps teams monitor product health, operational trends, and delivery performance across multiple business units.",
      problem:
        "The team was relying on disconnected reports and manual spreadsheet updates, which slowed decisions and made cross-functional visibility inconsistent.",
      architecture: [
        "Server-rendered metrics using React Server Components for fast initial paint.",
        "PostgreSQL optimizations and connection pooling to handle concurrent high-volume reads."
      ],
      metrics: "40% Faster TTFB",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Charting", "REST API"],
      impact: [
        "Reduced reporting time by consolidating multiple views into one operational workflow.",
        "Improved decision confidence with clearer KPI visibility for product and engineering stakeholders.",
        "Made the dashboard easier to extend as new business metrics were introduced.",
      ],
      links: [
        { label: "Live Demo", href: "https://example.com" },
        { label: "Source Code", href: "https://github.com/yourusername/analytics-dashboard" },
      ],
    },
    {
      id: "project-internal-tooling",
      title: "Internal Workflow Automation",
      summary:
        "A workflow platform that reduces repetitive operational work and improves cross-team coordination for service delivery and issue triage.",
      problem:
        "Teams were managing routine operational tasks across multiple manual systems, which created delays, inconsistent handoffs, and a heavy maintenance burden.",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "Docker"],
      impact: [
        "Automated repetitive coordination tasks, saving hours of manual effort each week.",
        "Standardized team handoffs and reduced process ambiguity for recurring operational work.",
        "Improved visibility into issue status through structured workflows and audit trails.",
      ],
      links: [
        { label: "Case Study", href: "https://example.com/case-study" },
        { label: "Source Code", href: "https://github.com/yourusername/workflow-automation" },
      ],
    },
    {
      id: "project-ux-foundations",
      title: "Design System Foundations",
      summary:
        "A design system and component library that standardizes patterns, improves UI consistency, and speeds up product delivery across teams.",
      problem:
        "Product teams were building similar interfaces repeatedly, leading to inconsistency, slower implementation, and higher design review overhead.",
      stack: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Figma"],
      impact: [
        "Accelerated product delivery by reusing high-quality, tested interface patterns.",
        "Improved visual consistency across multiple applications and feature teams.",
        "Reduced implementation variance while making UI updates easier to maintain at scale.",
      ],
      links: [
        { label: "Documentation", href: "https://example.com/design-system" },
        { label: "Component Library", href: "https://github.com/yourusername/design-system" },
      ],
    },
  ],
  experience: [
    {
      id: "experience-1",
      company: "Your Company",
      role: "Senior Software Engineer",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      summary:
        "Led end-to-end engineering work across product discovery, implementation, and operational support for customer-facing and internal systems.",
      achievements: [
        "Built and shipped product features that improved core user flows and reduced friction in day-to-day workflows.",
        "Partnered with product and design teams to turn roadmap priorities into technically sound, high-impact delivery plans.",
        "Improved developer velocity by simplifying integrations, clarifying ownership, and strengthening release quality practices.",
      ],
    },
    {
      id: "experience-2",
      company: "Previous Company",
      role: "Software Engineer",
      location: "Hybrid",
      startDate: "2020",
      endDate: "2023",
      summary:
        "Worked across frontend and backend delivery, contributing to customer-facing tools and data-heavy internal systems used by operational teams.",
      achievements: [
        "Delivered features across application layers with a focus on reliability, maintainability, and measurable business impact.",
        "Collaborated with cross-functional stakeholders to define requirements, remove blockers, and improve delivery confidence.",
        "Improved system observability and release quality by standardizing testing and monitoring patterns.",
      ],
    },
    {
      id: "experience-3",
      company: "Earlier Company",
      role: "Frontend Engineer",
      location: "On-site",
      startDate: "2018",
      endDate: "2020",
      summary:
        "Developed responsive user interfaces and collaborated closely with product teams to deliver polished, accessible experiences.",
      achievements: [
        "Implemented reusable interface patterns that improved consistency and reduced duplicated work across product teams.",
        "Improved performance and accessibility awareness during feature development to support broader product usability.",
        "Supported rapid iteration by contributing to design handoff processes and code review quality.",
      ],
    },
  ],
  skills: [
    { id: "skill-typescript", name: "TypeScript", category: "Languages", level: "Production" },
    { id: "skill-javascript", name: "JavaScript", category: "Languages", level: "Production" },
    { id: "skill-python", name: "Python", category: "Languages", level: "Proficient" },
    { id: "skill-html", name: "HTML", category: "Languages", level: "Production" },
    { id: "skill-css", name: "CSS", category: "Languages", level: "Production" },
    { id: "skill-react", name: "React", category: "Frontend", level: "Production" },
    { id: "skill-nextjs", name: "Next.js", category: "Frontend", level: "Production" },
    { id: "skill-tailwind", name: "Tailwind CSS", category: "Frontend", level: "Production" },
    { id: "skill-a11y", name: "Accessibility", category: "Frontend", level: "Proficient" },
    { id: "skill-node", name: "Node.js", category: "Backend & Databases", level: "Production" },
    { id: "skill-postgres", name: "PostgreSQL", category: "Backend & Databases", level: "Proficient" },
    { id: "skill-rest", name: "REST APIs", category: "Backend & Databases", level: "Production" },
    { id: "skill-prisma", name: "Prisma", category: "Backend & Databases", level: "Familiar" },
    { id: "skill-docker", name: "Docker", category: "DevOps & Cloud", level: "Proficient" },
    { id: "skill-aws", name: "AWS", category: "DevOps & Cloud", level: "Familiar" },
    { id: "skill-cicd", name: "CI/CD", category: "DevOps & Cloud", level: "Proficient" },
    { id: "skill-gh-actions", name: "GitHub Actions", category: "DevOps & Cloud", level: "Proficient" },
    { id: "skill-testing", name: "Testing", category: "Tools & Testing", level: "Production" },
    { id: "skill-storybook", name: "Storybook", category: "Tools & Testing", level: "Proficient" },
    { id: "skill-figma", name: "Figma", category: "Tools & Testing", level: "Proficient" },
  ],
};

export default portfolioData;
