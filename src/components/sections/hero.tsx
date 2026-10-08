import Link from "next/link";
import { ArrowRight, FileText, Mail, Code2, BriefcaseBusiness, Command } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import type { Profile } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { MotionLink, MotionA } from "@/components/ui/motion-link";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-4 pt-20 pb-16 sm:px-6 lg:px-8">
      <StaggerContainer className="max-w-3xl">
        <StaggerItem className="mb-8 flex items-center gap-3">
          <Badge variant="glow" className="gap-2 pl-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {profile.availability}
          </Badge>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border">
            <Command className="h-3 w-3" />
            <span>+ K for command palette</span>
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl lg:leading-[1.1]">
            {profile.headline}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {profile.bio}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-10 flex flex-wrap items-center gap-4">
          <MotionLink 
            href="#projects"
            className={buttonVariants("default", "lg")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Selected Work
            <ArrowRight className="ml-2 h-4 w-4" />
          </MotionLink>
          <MotionLink 
            href={profile.resumeUrl} target="_blank"
            className={buttonVariants("outline", "lg")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Resume (PDF)
          </MotionLink>
          <MotionA 
            href={`mailto:${profile.email}`}
            className={buttonVariants("ghost", "lg")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Copy Email
          </MotionA>
        </StaggerItem>

        <StaggerItem className="mt-16 flex items-center gap-4 text-sm text-muted-foreground">
          {profile.socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.href}
              aria-label={link.ariaLabel}
              className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-colors hover:bg-muted"
            >
              {link.platform === "GitHub" && <Code2 className="h-4 w-4" />}
              {link.platform === "LinkedIn" && <BriefcaseBusiness className="h-4 w-4" />}
              {link.platform === "Email" && <Mail className="h-4 w-4" />}
              <span className="font-medium text-foreground group-hover:text-primary">{link.label}</span>
            </Link>
          ))}
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
