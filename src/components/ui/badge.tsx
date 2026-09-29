import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "muted";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em]",
        variant === "default" && "border-border bg-muted/40 text-foreground",
        variant === "muted" && "border-transparent bg-muted/60 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
