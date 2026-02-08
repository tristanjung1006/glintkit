import { cn } from "__UTILS_ALIAS__/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gradient" | "glow-border";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden",
          {
            "bg-gradient-to-r from-[#00D4FF] to-[#00FF88] text-black hover:shadow-[0_0_30px_rgba(0,229,160,0.4)] hover:-translate-y-0.5":
              variant === "gradient",
            "bg-[#00E5A0] text-black hover:bg-[#00C488] hover:shadow-[0_0_20px_rgba(0,229,160,0.4)] hover:-translate-y-0.5":
              variant === "primary",
            "bg-transparent text-white border border-white/10 hover:border-[#00D4FF]/50 hover:text-[#00E5A0] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:-translate-y-0.5":
              variant === "secondary",
            "bg-transparent text-white hover:bg-white/5 hover:text-[#00E5A0]":
              variant === "ghost",
            "btn-glow-border text-white hover:-translate-y-0.5":
              variant === "glow-border",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
