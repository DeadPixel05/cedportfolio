"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ children, className, glowOnHover = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={glowOnHover ? { y: -2 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 transition-colors hover:border-border-strong",
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
BentoCard.displayName = "BentoCard";
