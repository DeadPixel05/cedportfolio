"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { buttonVariants } from "@/components/ui/button-variants";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean; // Fake asChild for TS compatibility if needed, though we won't use it directly here
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "default",
  size = "default",
  asChild,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={buttonVariants(variant, size, className)}
      {...props}
    />
  );
});

Button.displayName = "Button";

