"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/FadeUp";

const skillCategories = [
  {
    title: "Web & Core",
    color: "bg-amber-500",
    skills: ["React 19", "Next.js 15", "TypeScript", "Zustand", "AI Integration", "Tailwind CSS", "Vite", "HTML"],
  },
  {
    title: "Mobile Development",
    color: "bg-orange-500",
    skills: ["React Native", "Flutter", "Native Modules", "Biometrics", "Java", "Kotlin", "Expo", "Mobile UI/UX"],
  },
  {
    title: "Backend & Testing",
    color: "bg-rose-500",
    skills: ["Node.js", "Axios", "REST APIs", "Postman", "MySQL"],
  },
  {
    title: "State & Tools",
    color: "bg-teal-500",
    skills: ["Redux", "Provider", "Microservices", "Solidity", "Figma", "Git", "AWS", "Maps API"],
  },
];

export function Skills() {
  return (
    <section className="w-full" id="skills">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-24 text-stone-900">
          Technical <span className="text-amber-600">Arsenal</span>
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {skillCategories.map((category, idx) => (
          <FadeUp key={idx} delay={idx * 0.1}>
            <h3 className="text-xl font-semibold mb-6 text-stone-800 flex items-center gap-3">
              <span className={`w-8 h-1 rounded-full ${category.color}`} />
              {category.title}
            </h3>
            <StaggerContainer className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <StaggerItem key={skill}>
                  <div className="px-4 py-2 rounded-full bg-white border border-amber-200 text-stone-700 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700 transition-colors cursor-default shadow-sm font-medium text-sm">
                    {skill}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
