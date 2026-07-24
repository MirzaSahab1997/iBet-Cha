"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-brand-green text-white hover:bg-brand-green-dark shadow-lg shadow-brand-green/20",
    secondary:
      "bg-brand-dark-card text-white hover:bg-brand-dark-muted border border-brand-dark-muted",
    outline:
      "border border-brand-green text-brand-green hover:bg-brand-green/10",
    ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
    danger: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
    accent:
      "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-lg shadow-brand-blue/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3.5 text-base rounded-xl",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
