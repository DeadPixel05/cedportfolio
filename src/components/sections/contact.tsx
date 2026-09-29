import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import type { Profile } from "@/types/portfolio";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Let&apos;s build something thoughtful.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              I&apos;m available for product engineering, platform work, and collaborative teams that care about quality and clean execution.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-5">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{profile.location}</span>
            </div>
            <Link
              href={`mailto:${profile.email}`}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-transparent bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:opacity-90"
            >
              Send an email
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
