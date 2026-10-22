"use client";

import type { Skill } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <motion.div 
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group rounded-xl border border-border bg-card p-3.5 shadow-xs transition-colors hover:border-border-strong hover:bg-card-hover"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{skill.name}</span>
        <Badge variant={skill.level === "Production" ? "default" : "muted"} className="text-[11px] px-2 py-0.5">
          {skill.level}
        </Badge>
      </div>
    </motion.div>
  );
}
