import { cn } from "@/lib/utils";

export const buttonVariants = (variant: string = "default", size: string = "default", className?: string) => {
  return cn(
    "inline-flex items-center justify-center rounded-xl border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variant === "default" && "border-transparent bg-foreground text-background hover:bg-foreground/90",
    variant === "secondary" && "border-transparent bg-muted text-foreground hover:bg-muted/80",
    variant === "outline" && "border-border bg-transparent text-foreground hover:bg-muted/50",
    variant === "ghost" && "border-transparent bg-transparent text-foreground hover:bg-muted/50",
    size === "sm" && "h-9 px-3",
    size === "lg" && "h-12 px-6",
    size === "icon" && "h-10 w-10",
    size === "default" && "h-10 px-4",
    className
  );
};
