import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "muted" | "glow";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono transition-colors",
        variant === "default" && "border-border bg-card text-foreground shadow-sm",
        variant === "muted" && "border-transparent bg-muted text-muted-foreground",
        variant === "glow" && "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]",
        className,
      )}
      {...props}
    />
  );
}
