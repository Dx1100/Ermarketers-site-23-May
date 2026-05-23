import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base = [
      "relative overflow-hidden inline-flex items-center justify-center",
      "font-semibold tracking-wide transition-all duration-300 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
      "disabled:opacity-50 disabled:pointer-events-none",
      "rounded-xl select-none cursor-pointer",
    ].join(" ");

    const variants: Record<string, string> = {
      primary: [
        "bg-primary text-white",
        "hover:bg-[#e06e00] hover:-translate-y-0.5",
        "shadow-[0_4px_15px_rgba(255,122,0,0.35)]",
        "hover:shadow-[0_8px_30px_rgba(255,122,0,0.55)]",
        "active:scale-[0.98] active:translate-y-0",
        "btn-shine",
      ].join(" "),
      gradient: [
        "text-white",
        "bg-gradient-to-r from-[#FF7A00] via-[#FFB366] to-[#D45D00]",
        "bg-[length:200%_auto]",
        "hover:bg-right-bottom hover:-translate-y-0.5",
        "shadow-[0_4px_20px_rgba(255,122,0,0.4)]",
        "hover:shadow-[0_10px_35px_rgba(255,122,0,0.6)]",
        "active:scale-[0.98]",
        "btn-shine",
        "animate-shimmer",
      ].join(" "),
      glow: [
        "bg-primary text-white",
        "hover:bg-[#e06e00] hover:-translate-y-0.5",
        "animate-glow btn-shine",
        "shadow-[0_0_20px_rgba(255,122,0,0.4)]",
        "hover:shadow-[0_0_40px_rgba(255,122,0,0.7)]",
        "active:scale-[0.98]",
      ].join(" "),
      secondary: [
        "bg-white/8 text-foreground border border-white/10",
        "hover:bg-white/12 hover:border-white/20 hover:-translate-y-0.5",
        "active:scale-[0.98]",
      ].join(" "),
      outline: [
        "border border-white/15 bg-transparent text-foreground",
        "hover:bg-white/5 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5",
        "active:scale-[0.98]",
      ].join(" "),
      ghost: [
        "bg-transparent text-foreground",
        "hover:bg-white/8 hover:text-primary",
        "active:scale-[0.98]",
      ].join(" "),
    };

    const sizes: Record<string, string> = {
      sm:  "h-9  px-4  text-sm   gap-1.5",
      md:  "h-11 px-6  text-sm   gap-2",
      lg:  "h-14 px-8  text-base gap-2",
      xl:  "h-16 px-10 text-lg   gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
