"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  // Double the items so it can loop seamlessly
  const content = [...items, ...items, ...items, ...items];

  return (
    <div className={cn("overflow-hidden flex w-full relative", className)}>
      {/* Gradient masks for smooth fading edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FEF3C7] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FEF3C7] to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap items-center hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Slow and smooth
        }}
        style={{ width: "max-content" }}
      >
        <div className="flex shrink-0 items-center gap-8 px-4">
          {content.map((item, index) => (
            <span key={index} className="text-stone-400 text-sm md:text-base font-medium uppercase tracking-wider flex items-center gap-8">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
