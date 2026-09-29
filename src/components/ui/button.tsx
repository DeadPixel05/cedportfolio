import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "border-transparent bg-foreground text-background hover:opacity-90",
        variant === "outline" && "border-border bg-transparent text-foreground hover:bg-muted/50",
        variant === "ghost" && "border-transparent bg-transparent text-foreground hover:bg-muted/50",
        size === "sm" && "h-9 px-3",
        size === "lg" && "h-12 px-5",
        size === "default" && "h-11 px-4",
        className,
      )}
      {...props}
    />
  );
}
