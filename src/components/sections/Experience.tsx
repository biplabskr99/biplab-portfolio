"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/FadeUp";
import { GlassCard } from "@/components/ui/GlassCard";

const experiences = [
  {
    role: "Software Development Engineer",
    company: "Vyoma innovus global Pvt Ltd",
    companyLink: "https://www.vyomainnovusglobal.com/",
    period: "06/2025 – Present",
    description: "Building web and mobile applications using React (TypeScript), React Native, Flutter (Dart), and Java (Android) for government and private sector projects. Designed user-friendly UI/UX, integrated POS machine functionality, and handled API integration.",
    color: "bg-amber-500",
  },
  {
    role: "Frontend Developer (Freelance)",
    company: "Flixbug",
    period: "11/2025 – 01/2026",
    description: "Worked as a Frontend Developer in a freelance team project, building a React-based application while collaborating with PHP backend and database developers. Designed responsive and user-friendly UI/UX, implemented API integration for seamless data flow.",
    color: "bg-orange-500",
  },
  {
    role: "Software Development Engineer",
    company: "AMBIQ health services Pvt Ltd",
    period: "06/2024 – 05/2025",
    description: "Developed a React-based enquiry platform and a React Native agent application for booking workflows. Implemented state management using Redux, handled API integration with Axios, integrated Pine Labs POS for payments, and enabled real-time ambulance tracking using Maps API.",
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
              <div className={`absolute -left-[31px] md:-left-[39px] top-6 w-4 h-4 rounded-full ${exp.color} ring-4 ring-[#FEF3C7] shadow-md`} />

              <GlassCard hoverEffect>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-stone-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full w-fit border border-amber-200">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-stone-600 mb-4">
                  {exp.companyLink ? (
                    <a 
                      href={exp.companyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h4>
                <p className="text-stone-500 leading-relaxed">{exp.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <FadeUp className="mt-20">
        <h3 className="text-2xl font-bold mb-8 text-stone-900 flex items-center gap-3">
          <span className="w-8 h-1 rounded-full bg-amber-500" />
          Education
        </h3>
        <div className="space-y-8">
          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h4 className="text-lg font-bold text-stone-900">Bachelor of Technology in Electrical Engineering</h4>
              <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full w-fit border border-amber-200">
                05/2019 – 08/2023
              </span>
            </div>
            <p className="text-stone-600 font-medium mb-2 hover:text-amber-600 transition-colors">
              <a href="https://www.nsec.ac.in/" target="_blank" rel="noopener noreferrer">
                Netaji Subhash Engineering College
              </a>
            </p>
            <p className="text-stone-500 text-sm italic mb-4">Kolkata, West Bengal</p>
            <p className="text-stone-500 leading-relaxed">
              Graduated with a **CGPA of 8.4**. Leveraged a problem-solving mindset while transitioning into software development and building real-world applications.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h4 className="text-lg font-bold text-stone-900">Higher Secondary (Class 12th)</h4>
              <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full w-fit border border-amber-200">
                06/2016 – 05/2018
              </span>
            </div>
            <p className="text-stone-600 font-medium mb-2 hover:text-amber-600 transition-colors">
              <a href="https://www.cmsbarrackpore.org/" target="_blank" rel="noopener noreferrer">
                Central Model School, BKP
              </a>
            </p>
            <p className="text-stone-500 leading-relaxed">
              Focused on Physics, Chemistry, Mathematics, and Computer Science.
            </p>
          </GlassCard>
        </div>
      </FadeUp>
    </section>
  );
}
