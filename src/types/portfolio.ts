export type SkillLevel = "Production" | "Proficient" | "Familiar";

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend & Databases"
  | "DevOps & Cloud"
  | "Tools & Testing";

export type SocialPlatform = "GitHub" | "LinkedIn" | "Email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  ariaLabel: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  stack: string[];
  impact: string[];
  links: ProjectLink[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
}
