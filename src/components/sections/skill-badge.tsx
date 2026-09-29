import type { Skill } from "@/types/portfolio";

import { Badge } from "@/components/ui/badge";

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground">{skill.name}</span>
        <Badge variant="muted">{skill.level}</Badge>
      </div>
    </div>
  );
}
