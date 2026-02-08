import { cn } from "__UTILS_ALIAS__/cn";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "gradient" | "outline";
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          {
            "bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/10":
              variant === "default",
            "bg-white/[0.1] backdrop-blur-xl border border-white/[0.1] shadow-lg shadow-black/15":
              variant === "strong",
            "bg-gradient-to-br from-[#00D4FF]/[0.08] to-[#00FF88]/[0.05] backdrop-blur-xl border border-white/[0.1] shadow-lg shadow-black/15":
              variant === "gradient",
            "bg-transparent backdrop-blur-sm border border-white/[0.1] hover:border-[#00D4FF]/30":
              variant === "outline",
          },
          hover && "hover:bg-white/[0.1] hover:border-[#00D4FF]/20 hover:shadow-[0_8px_32px_rgba(0,212,255,0.1)] hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
