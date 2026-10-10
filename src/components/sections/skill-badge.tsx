"use client";

import type { Skill } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-border/80"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
        <Badge variant={skill.level === "Production" ? "default" : "muted"} className="font-mono">
          {skill.level}
        </Badge>
      </div>
    </motion.div>
  );
}
