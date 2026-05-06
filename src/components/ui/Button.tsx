import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8EE] disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5":
              variant === "primary",
            "border-2 border-amber-300 bg-white text-stone-700 hover:border-amber-500 hover:bg-amber-50 hover:-translate-y-0.5":
              variant === "outline",
            "text-stone-500 hover:text-stone-800 hover:bg-amber-50":
              variant === "ghost",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
