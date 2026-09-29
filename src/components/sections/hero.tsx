import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, MapPin, Mail, Sparkles } from "lucide-react";

import type { Profile } from "@/types/portfolio";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{profile.availability}</span>
          </div>

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {profile.role}
          </p>

          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{profile.bio}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full border border-transparent bg-foreground px-5 text-sm font-medium text-background transition-colors hover:opacity-90"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={profile.resumeUrl}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              Download Resume
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-transparent bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {profile.socialLinks.map((link) => (
              <Link
                key={link.platform}
                href={link.href}
                aria-label={link.ariaLabel}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                {link.platform === "Email" ? <Mail className="h-4 w-4" /> : <BriefcaseBusiness className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Profile</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">{profile.name}</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {profile.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">
                {profile.email}
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Focus</p>
            <p className="mt-3 text-base text-foreground">
              Product-minded engineering for reliable web platforms, thoughtful UX, and measurable business outcomes.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
