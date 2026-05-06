import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-[#FFFBEB] rounded-2xl p-6 md:p-8 border border-amber-200 shadow-[0_2px_16px_rgba(217,119,6,0.08)]",
        hoverEffect && "glass-hover cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
