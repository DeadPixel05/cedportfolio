import { ArrowRight, Mail, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { MotionA } from "@/components/ui/motion-link";

import type { Profile } from "@/types/portfolio";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-xs sm:p-12 relative overflow-hidden group">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Let&apos;s build something thoughtful.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              I&apos;m available for senior product engineering, full-stack architecture, and technical consultation for teams that value speed and engineering rigor.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-surface/50 p-6">
            <div className="flex items-center gap-3 text-sm text-foreground font-medium">
              <Mail className="h-4 w-4 text-accent" />
              <a href={`mailto:${profile.email}`} className="hover:underline underline-offset-4">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground font-medium">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{profile.location}</span>
            </div>
            <div className="pt-2">
              <MotionA 
                href={`mailto:${profile.email}`}
                className={buttonVariants("default", "lg", "w-full h-11 text-sm")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
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
