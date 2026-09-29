import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {project.links.map((link) => (
            <Link key={link.label} href={link.href} className="inline-flex items-center gap-1 hover:text-foreground">
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-4 text-base leading-7 text-muted-foreground">{project.summary}</p>

      <div className="mt-5 rounded-2xl border border-border bg-muted/30 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Problem</p>
        <p className="mt-2 text-sm leading-6 text-foreground">{project.problem}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Badge key={item} variant="muted">
            {item}
          </Badge>
        ))}
      </div>

      <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
        {project.impact.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
