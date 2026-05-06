"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Start" },
  { id: "specialization", label: "Specialization" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function ScrollStepper() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-6">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        const isPast = sections.findIndex(s => s.id === activeSection) > index;
        return (
          <div key={section.id} className="relative flex items-center justify-end">
            {/* Connecting line */}
            {index !== sections.length - 1 && (
              <div className={cn(
                "absolute top-[50%] right-[5px] w-[2px] h-[calc(100%+1.5rem)] transition-colors duration-500 -z-10",
                isPast ? "bg-amber-400" : "bg-stone-200"
              )} />
            )}

            <button
              onClick={() => scrollTo(section.id)}
              aria-label={`Scroll to ${section.label}`}
              className="group relative flex items-center justify-end h-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full"
            >
              {/* Label */}
              <span className={cn(
                "pr-6 text-xs font-semibold transition-all duration-300",
                isActive
                  ? "opacity-100 text-stone-800 translate-x-0"
                  : "opacity-0 text-stone-400 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )}>
                {section.label}
              </span>

              {/* Dot */}
              <div className={cn(
                "w-3 h-3 rounded-full transition-all duration-500 border-2 z-10",
                isActive
                  ? "bg-amber-500 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.7)] scale-125"
                  : "bg-[#FEF3C7] border-amber-300 group-hover:border-amber-500"
              )} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
