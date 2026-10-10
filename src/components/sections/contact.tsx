import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { MotionA } from "@/components/ui/motion-link";

import type { Profile } from "@/types/portfolio";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12 relative overflow-hidden group">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground font-mono">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">Let&apos;s build something thoughtful.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I&apos;m available for product engineering, platform work, and collaborative teams that care about quality and clean execution.
            </p>
          </div>

          <div className="space-y-5 rounded-2xl border border-border bg-muted/20 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sm text-foreground font-medium">
              <Mail className="h-4 w-4 text-primary opacity-70" />
              <a href={`mailto:${profile.email}`} className="hover:underline underline-offset-4">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground font-medium">
              <MapPin className="h-4 w-4 text-primary opacity-70" />
              <span>{profile.location}</span>
            </div>
            <div className="pt-2">
              <MotionA 
                href={`mailto:${profile.email}`}
                className={buttonVariants("default", "lg", "w-full h-12")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send an email
                <ArrowRight className="ml-2 h-4 w-4" />
              </MotionA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
