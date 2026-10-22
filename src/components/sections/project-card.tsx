"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Activity, ChevronRight, X, Layers, Cpu, CheckCircle2 } from "lucide-react";

import type { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento-card";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <BentoCard glowOnHover className="flex flex-col h-full group/card cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {project.category && (
                <span className="text-xs font-medium text-muted-foreground">
                  {project.category}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight group-hover/card:text-accent transition-[color] flex items-center gap-2">
              {project.title}
              <ChevronRight className="h-5 w-5 opacity-0 -translate-x-2 transition-[opacity,transform] group-hover/card:opacity-100 group-hover/card:translate-x-0" />
            </h3>
            {project.metrics && (
              <Badge variant="glow" className="mt-3 py-1">
                <Activity className="mr-1.5 h-3.5 w-3.5" />
                {project.metrics}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground" onClick={(e) => e.stopPropagation()}>
            {project.links.filter(link => link.href.trim() !== "").map((link) => (
              <Link key={link.label} href={link.href} target="_blank" className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-3 py-1.5 transition-colors hover:text-foreground hover:bg-muted">
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-3xl">{project.summary}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {project.architecture ? (
            <div className="rounded-xl border border-border bg-surface/50 p-5">
              <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-accent" /> Architecture Highlights
              </p>
              <ul className="space-y-2.5 text-xs text-foreground/90">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted-foreground text-xs">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface/50 p-5">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Problem Context</p>
              <p className="text-xs leading-relaxed text-foreground/90">{project.problem}</p>
            </div>
          )}

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Key Impact
              </p>
              <ul className="space-y-2 text-xs leading-relaxed text-foreground/90">
                {project.impact.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Badge key={item} variant="muted" className="bg-transparent border-border hover:bg-muted text-[11px] px-2.5 py-0.5">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-medium text-accent">
          <span>Inspect Case Study & Trade-offs</span>
          <span className="flex items-center gap-1">Deep Dive <ChevronRight className="h-3.5 w-3.5" /></span>
        </div>
      </BentoCard>

      {/* Interactive Case Study Deep-Dive Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-50 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Technical Deep-Dive</span>
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">{project.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-6 text-sm">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent" /> Problem & Challenge Statement
                  </h4>
                  <p className="text-muted-foreground leading-relaxed bg-surface/40 p-4 rounded-xl border border-border">
                    {project.problem}
                  </p>
                </div>

                {project.keyFeatures && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Key Features & Capabilities
                    </h4>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.keyFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 bg-surface/30 p-3 rounded-lg border border-border/60 text-xs">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technicalTradeoffs && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-amber-500" /> Engineering Trade-offs & Decisions
                    </h4>
                    <div className="space-y-2">
                      {project.technicalTradeoffs.map((tradeoff, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-border bg-surface/40 text-xs text-foreground/90 leading-relaxed">
                          {tradeoff}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="default" className="text-xs px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border bg-surface/30 px-6 py-4">
                <span className="text-xs text-muted-foreground">Press Escape or click outside to close</span>
                <div className="flex items-center gap-3">
                  {project.links.filter(link => link.href.trim() !== "").map((link) => (
                    <Link key={link.label} href={link.href} target="_blank" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground bg-primary text-primary-foreground px-4 py-2 rounded-lg transition-opacity hover:opacity-90">
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
