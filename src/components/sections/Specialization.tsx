"use client";

import { Code2, Smartphone, Server } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/FadeUp";

const areas = [
  {
    icon: <Smartphone className="w-8 h-8 text-orange-500" />,
    title: "Mobile Apps",
    description: "Building responsive, high-performance cross-platform mobile applications using React Native.",
    color: "bg-orange-50 border-orange-100",
  },
  {
    icon: <Code2 className="w-8 h-8 text-amber-600" />,
    title: "Web Platforms",
    description: "Creating dynamic, SEO-friendly, and accessible web experiences with Next.js and React.",
    color: "bg-amber-50 border-amber-100",
  },
  {
    icon: <Server className="w-8 h-8 text-rose-500" />,
    title: "Scalable Systems",
    description: "Designing robust APIs and backend services that scale seamlessly under heavy load.",
    color: "bg-rose-50 border-rose-100",
  },
];

export function Specialization() {
  return (
    <section className="py-20 lg:py-28 w-full" id="specialization">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-stone-900">
          My <span className="text-amber-600">Specializations</span>
        </h2>
        <p className="text-stone-500 text-center max-w-2xl mx-auto mb-16 text-lg">
          I bridge the gap between design and engineering to build products that look good and perform flawlessly.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {areas.map((area, index) => (
          <StaggerItem key={index} className="h-full">
            <GlassCard hoverEffect className="h-full">
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-6 ${area.color}`}>
                {area.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">{area.title}</h3>
              <p className="text-stone-500 leading-relaxed">{area.description}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
