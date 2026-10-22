"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Mail, Check, Code2, BriefcaseBusiness, Command, Terminal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import type { Profile } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { MotionLink } from "@/components/ui/motion-link";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { motion } from "framer-motion";

export function Hero({ profile }: { profile: Profile }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="top" className="relative isolate flex min-h-[92dvh] w-full flex-col justify-center overflow-hidden px-4 pt-16 pb-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <StaggerContainer className="max-w-3xl">
            <StaggerItem className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant="glow" className="gap-2 pl-2 py-1 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability}
              </Badge>
              <button
                onClick={() => {
                  const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                  document.dispatchEvent(event);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-card hover:bg-muted/80 transition-colors px-2.5 py-1 rounded-md border border-border cursor-pointer"
              >
                <Command className="h-3 w-3" />
                <span>+ K search</span>
              </button>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08]">
                {profile.headline}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.bio}
              </p>
            </StaggerItem>

            <StaggerItem className="mt-8 flex flex-wrap items-center gap-3">
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

              <motion.button 
                type="button"
                onClick={handleCopyEmail}
                className={buttonVariants("ghost", "lg")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? <Check className="mr-2 h-4 w-4 text-emerald-500" /> : <Mail className="mr-2 h-4 w-4" />}
                {copied ? "Copied to Clipboard!" : "Copy Email"}
              </motion.button>
            </StaggerItem>

            <StaggerItem className="mt-12 flex items-center gap-3 text-sm text-muted-foreground">
              {profile.socialLinks.map((link) => (
                <Link
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                >
                  {link.platform === "GitHub" && <Code2 className="h-3.5 w-3.5" />}
                  {link.platform === "LinkedIn" && <BriefcaseBusiness className="h-3.5 w-3.5" />}
                  {link.platform === "Email" && <Mail className="h-3.5 w-3.5" />}
                  <span className="text-foreground group-hover:text-primary">{link.label}</span>
                </Link>
              ))}
            </StaggerItem>
          </StaggerContainer>

          {/* Interactive Developer Artifact / Terminal Preview Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            data-ui
            className="hidden lg:block relative rounded-2xl border border-border bg-card p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-muted-foreground flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> system-status.ts
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                LIVE TELEMETRY
              </span>
            </div>

            <pre data-ui className="text-xs leading-relaxed text-foreground/90 overflow-x-auto space-y-2">
              <code>
                <span className="text-muted-foreground">// Core Engineer Competencies</span>{'\n'}
                <span className="text-blue-500 dark:text-blue-400">const</span> engineer = {'{'}{'\n'}
                {'  '}name: <span className="text-emerald-600 dark:text-emerald-400">&quot;{profile.name}&quot;</span>,{'\n'}
                {'  '}role: <span className="text-emerald-600 dark:text-emerald-400">&quot;{profile.role}&quot;</span>,{'\n'}
                {'  '}stack: [<span className="text-emerald-600 dark:text-emerald-400">&quot;Next.js App Router&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;TypeScript&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;PostgreSQL&quot;</span>],{'\n'}
                {'  '}performance: <span className="text-emerald-600 dark:text-emerald-400">&quot;100/100 Core Web Vitals&quot;</span>,{'\n'}
                {'  '}a11y: <span className="text-emerald-600 dark:text-emerald-400">&quot;WCAG 2.1 AA Compliant&quot;</span>,{'\n'}
                {'}'};{'\n'}{'\n'}
                <span className="text-muted-foreground">// Real-time system health</span>{'\n'}
                <span className="text-blue-500 dark:text-blue-400">export default</span> <span className="text-blue-500 dark:text-blue-400">async function</span> <span className="text-yellow-600 dark:text-yellow-400">getTelemetry</span>() {'{'}{'\n'}
                {'  '}<span className="text-blue-500 dark:text-blue-400">return</span> {'{'} uptime: <span className="text-emerald-600 dark:text-emerald-400">&quot;99.99%&quot;</span>, latency: <span className="text-emerald-600 dark:text-emerald-400">&quot;42ms&quot;</span> {'}'};{'\n'}
                {'}'}
              </code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
