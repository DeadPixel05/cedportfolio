import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";

import type { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento-card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <BentoCard glowOnHover className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold text-foreground tracking-tight">{project.title}</h3>
          {project.metrics && (
            <Badge variant="glow" className="mt-3 pl-1.5 py-1">
              <Activity className="mr-1.5 h-3.5 w-3.5" />
              {project.metrics}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
          {project.links.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              {link.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-3xl">{project.summary}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr]">
        {project.architecture ? (
          <div className="rounded-2xl border border-border bg-muted/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono mb-4">Architecture Highlights</p>
            <ul className="space-y-3 text-sm text-foreground">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex gap-3 leading-relaxed">
                  <span className="text-muted-foreground opacity-50 font-mono mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-muted/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono mb-4">Problem Context</p>
            <p className="text-sm leading-relaxed text-foreground">{project.problem}</p>
          </div>
        )}

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono mb-4">Business Impact</p>
            <ul className="space-y-3 text-sm leading-relaxed text-foreground/90">
              {project.impact.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item} variant="muted" className="bg-transparent border-border hover:bg-muted transition-colors px-3 py-1">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
