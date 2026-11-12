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

const hasControlCharacters = (value: string) => /[\u0000-\u001F\u007F]/.test(value);

const isSafeResourceUrl = (value: string) => {
  if (value === "") return true;
  if (hasControlCharacters(value)) return false;
  if (value.startsWith("/")) return !value.startsWith("//");

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const isSafeSocialUrl = (value: string) => {
  if (value === "") return true;
  if (hasControlCharacters(value)) return false;

  try {
    const parsed = new URL(value);
    return (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:" ||
      parsed.protocol === "mailto:"
    );
  } catch {
    return false;
  }
};

const safeResourceUrlSchema = z
  .string()
  .trim()
  .max(2000)
  .refine(isSafeResourceUrl, {
    message: "URL must be a root-relative path or use http/https.",
  });

const safeSocialUrlSchema = z
  .string()
  .trim()
  .max(2000)
  .refine(isSafeSocialUrl, {
    message: "Social link must use http, https, or mailto.",
  });

export const portfolioDataSchema: z.ZodType<PortfolioData> = z.object({
  profile: z.object({
    name: z.string().max(200),
    role: z.string().max(200),
    headline: z.string().max(2000),
    bio: z.string().max(20000),
    location: z.string().max(500),
    availability: z.string().max(500),
    email: z.email().max(500),
    resumeUrl: safeResourceUrlSchema,
    socialLinks: z.array(z.object({
      platform: socialPlatformSchema,
      label: z.string().max(200),
      href: safeSocialUrlSchema,
      ariaLabel: z.string().max(500),
    })).max(30),
  }),
  projects: z.array(z.object({
    id: z.string().min(1).max(200),
    title: z.string().max(500),
    summary: z.string().max(20000),
    problem: z.string().max(20000),
    featured: z.boolean().optional(),
    role: z.string().max(500).optional(),
    category: z.string().max(500).optional(),
    architecture: z.array(z.string().max(5000)).max(100).optional(),
    metrics: z.string().max(500).optional(),
    stack: z.array(z.string().max(500)).max(100),
    impact: z.array(z.string().max(5000)).max(100),
    keyFeatures: z.array(z.string().max(5000)).max(100).optional(),
    technicalTradeoffs: z.array(z.string().max(5000)).max(100).optional(),
    imageUrl: safeResourceUrlSchema.optional(),
    links: z.array(z.object({
      label: z.string().max(200),
      href: safeResourceUrlSchema,
    })).max(30),
  })).max(100),
  experience: z.array(z.object({
    id: z.string().min(1).max(200),
    company: z.string().max(500),
    logoUrl: safeResourceUrlSchema.optional(),
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