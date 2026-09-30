import { z } from "zod";

import type { PortfolioData } from "@/types/portfolio";

const socialPlatformSchema = z.enum(["GitHub", "LinkedIn", "Email"]);
const skillCategorySchema = z.enum([
  "Languages",
  "Frontend",
  "Backend & Databases",
  "DevOps & Cloud",
  "Tools & Testing",
]);
const skillLevelSchema = z.enum(["Production", "Proficient", "Familiar"]);

export const portfolioDataSchema: z.ZodType<PortfolioData> = z.object({
  profile: z.object({
    name: z.string().max(200),
    role: z.string().max(200),
    headline: z.string().max(2000),
    bio: z.string().max(20000),
    location: z.string().max(500),
    availability: z.string().max(500),
    email: z.string().max(500),
    resumeUrl: z.string().max(2000),
    socialLinks: z.array(z.object({
      platform: socialPlatformSchema,
      label: z.string().max(200),
      href: z.string().max(2000),
      ariaLabel: z.string().max(500),
    })).max(30),
  }),
  projects: z.array(z.object({
    id: z.string().min(1).max(200),
    title: z.string().max(500),
    summary: z.string().max(20000),
    problem: z.string().max(20000),
    stack: z.array(z.string().max(500)).max(100),
    impact: z.array(z.string().max(5000)).max(100),
    links: z.array(z.object({
      label: z.string().max(200),
      href: z.string().max(2000),
    })).max(30),
  })).max(100),
  experience: z.array(z.object({
    id: z.string().min(1).max(200),
    company: z.string().max(500),
    role: z.string().max(500),
    location: z.string().max(500),
    startDate: z.string().max(100),
    endDate: z.string().max(100),
    summary: z.string().max(20000),
    achievements: z.array(z.string().max(5000)).max(100),
  })).max(100),
  skills: z.array(z.object({
    id: z.string().min(1).max(200),
    name: z.string().max(500),
    category: skillCategorySchema,
    level: skillLevelSchema,
  })).max(300),
});