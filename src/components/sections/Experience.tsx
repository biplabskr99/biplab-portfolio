"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/FadeUp";
import { GlassCard } from "@/components/ui/GlassCard";

const experiences = [
  {
    role: "Senior Mobile Engineer",
    company: "Tech Corp",
    period: "2022 – Present",
    description: "Lead the development of the flagship mobile app using React Native, improving performance by 40% and mentoring junior developers.",
    color: "bg-amber-500",
  },
  {
    role: "Full Stack Developer",
    company: "Startup Inc",
    period: "2019 – 2022",
    description: "Built scalable web applications and microservices using Next.js and Node.js. Successfully launched 3 major products from scratch.",
    color: "bg-orange-500",
  },
  {
    role: "Frontend Engineer",
    company: "Agency LLC",
    period: "2017 – 2019",
    description: "Developed responsive and interactive web interfaces for various clients. Collaborated closely with design teams to ensure high-quality UI/UX.",
    color: "bg-rose-400",
  },
];

export function Experience() {
  return (
    <section className="py-20 lg:py-28 w-full max-w-[800px] mx-auto" id="experience">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-stone-900">
          My <span className="text-amber-600">Journey</span>
        </h2>
      </FadeUp>

      <div className="relative border-l-2 border-amber-200 pl-6 md:pl-8 ml-4 md:ml-0">
        <StaggerContainer className="space-y-12">
          {experiences.map((exp, index) => (
            <StaggerItem key={index} className="relative">
              {/* Timeline Dot */}
              <div className={`absolute -left-[31px] md:-left-[39px] top-6 w-4 h-4 rounded-full ${exp.color} ring-4 ring-[#FFF8EE] shadow-md`} />

              <GlassCard hoverEffect>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-stone-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full w-fit border border-amber-200">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-stone-600 mb-4">{exp.company}</h4>
                <p className="text-stone-500 leading-relaxed">{exp.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
