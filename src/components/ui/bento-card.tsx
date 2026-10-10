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
          "group relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {glowOnHover && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/5" />
          </div>
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
BentoCard.displayName = "BentoCard";
