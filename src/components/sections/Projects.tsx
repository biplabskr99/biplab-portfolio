"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Code, Eye } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "./ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  images?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management, stripe payments, and an admin dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    category: "Web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    images: ["https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"],
    problem: "Traditional e-commerce platforms were too slow and difficult to customize.",
    solution: "Built a headless commerce solution using Next.js App Router for instant page transitions.",
    outcome: "Increased conversion rate by 24% and reduced load times by 2 seconds."
  },
  {
    id: "2",
    title: "Financial Dashboard",
    description: "A comprehensive analytics dashboard for tracking investments, with interactive charts and real-time data feeds.",
    tags: ["React", "Redux", "Framer Motion", "Recharts", "WebSockets"],
    category: "Web",
    githubUrl: "https://github.com",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    ],
    problem: "Users needed a way to visualize complex financial data intuitively.",
    solution: "Implemented a modular dashboard with customizable widgets and real-time WebSocket connections.",
    outcome: "Adopted by 500+ active users within the first month of launch."
  },
  {
    id: "3",
    title: "Social Media Scheduler",
    description: "An automated scheduling tool to plan, preview, and post content across multiple social platforms.",
    tags: ["Vue.js", "Node.js", "Express", "MongoDB", "OAuth"],
    category: "Web",
    liveUrl: "https://example.com",
    images: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"],
    problem: "Managing content across multiple platforms was time-consuming.",
    solution: "Created a unified timeline view integrated with native platform APIs.",
    outcome: "Saved users an average of 10 hours per week in content management."
  },
  {
    id: "4",
    title: "Health & Fitness Tracker",
    description: "A mobile-first app for tracking daily workouts, nutrition, and personal records.",
    tags: ["React Native", "Expo", "Firebase", "HealthKit"],
    category: "Mobile",
    githubUrl: "https://github.com",
    images: ["https://images.unsplash.com/photo-1526506114622-6b14249bb3c7?q=80&w=1000&auto=format&fit=crop"],
    problem: "Most fitness apps were too complex or required expensive subscriptions.",
    solution: "Built a streamlined, offline-first app focusing on core metrics.",
    outcome: "Achieved a 4.8 star rating on the App Store with 10k+ active users."
  },
  {
    id: "5",
    title: "AI Writing Assistant",
    description: "A browser extension providing real-time grammar checking, tone suggestions, and AI text generation.",
    tags: ["Next.js", "OpenAI API", "Chrome Extensions", "Tailwind"],
    category: "AI",
    liveUrl: "https://example.com",
    images: ["https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop"],
    problem: "Writers struggled to maintain a consistent tone across documents.",
    solution: "Integrated GPT-4 to analyze context and suggest improvements inside any text box.",
    outcome: "Processed over 1 million words in the first week of beta testing."
  },
  {
    id: "6",
    title: "Real Estate Platform",
    description: "A modern property listing platform with 3D virtual tours, advanced filtering, and agent messaging.",
    tags: ["React", "Three.js", "PostgreSQL", "Prisma", "AWS"],
    category: "Web",
    githubUrl: "https://github.com",
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"],
    problem: "Property photos weren't enough for remote buyers to make decisions.",
    solution: "Implemented WebGL-based virtual tours allowing browser-based exploration.",
    outcome: "Increased out-of-state property inquiries by 35%."
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Web: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Mobile: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  AI: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  API: "text-green-400 bg-green-500/10 border-green-500/20",
};

function CoverCard({ project, offset, onClick }: {
  project: Project;
  offset: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const abs = Math.abs(offset);
  const isActive = offset === 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        zIndex: 20 - abs,
        ...(isActive ? { rotateX: tiltX, rotateY: tiltY } : {}),
      }}
      animate={{
        rotateY: offset * 42,
        x: offset * 340,
        z: -abs * 200,
        scale: 1 - abs * 0.13,
        opacity: abs > 2 ? 0 : 1 - abs * 0.35,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 32 }}
      className={`w-72 md:w-80 ${isActive ? "cursor-default" : "cursor-pointer"}`}
    >
      <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isActive
        ? "border-amber-400 shadow-[0_0_40px_rgba(217,119,6,0.15)]"
        : "border-amber-200"
        } bg-[#FFFBEB]`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        {project.images?.[0] && (
          <div className="relative h-44 overflow-hidden">
            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBEB]/80 to-transparent" />
            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[project.category] ?? "text-gray-400 bg-gray-500/10 border-gray-500/20"}`}>
              {project.category}
            </span>
          </div>
        )}
        <div className="p-5">
          <h3 className="text-lg font-bold text-stone-900 mb-1.5">{project.title}</h3>
          <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-stone-400 px-2 py-0.5">+{project.tags.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Ground reflection */}
      {isActive && (
        <div className="absolute -bottom-1 left-4 right-4 h-8 bg-amber-500/5 blur-xl rounded-full" />
      )}
    </motion.div>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const active = projectsData[activeIndex];

  const navigate = (dir: number) => {
    setActiveIndex(i => Math.max(0, Math.min(projectsData.length - 1, i + dir)));
  };

  const handleCardClick = (index: number, offset: number) => {
    if (offset !== 0) { setActiveIndex(index); return; }
    if (active.liveUrl) window.open(active.liveUrl, "_blank");
    else setSelectedProject(active);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 w-full overflow-hidden">
      <div className="w-full">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-stone-900">
            Featured <span className="text-amber-600">Projects</span>
          </h2>
          <p className="text-center text-stone-500 mb-16 max-w-xl mx-auto">
            Navigate through my work — click the side cards to explore, or interact with the active one.
          </p>
        </FadeUp>
      </div>

      {/* ── 3D COVER FLOW ── */}
      <div
        className="relative h-[420px] flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {projectsData.map((project, index) => {
          const offset = index - activeIndex;
          if (Math.abs(offset) > 3) return null;
          return (
            <CoverCard
              key={project.id}
              project={project}
              offset={offset}
              onClick={() => handleCardClick(index, offset)}
            />
          );
        })}
      </div>

      {/* ── DOT PROGRESS ── */}
      <div className="flex items-center justify-center gap-2 mt-10">
        {projectsData.map((_, i) => (
          <button key={i} onClick={() => setActiveIndex(i)}
          className={`rounded-full transition-all duration-300 ${i === activeIndex
              ? "w-6 h-2 bg-amber-500"
              : "w-2 h-2 bg-amber-200 hover:bg-amber-400"}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* ── NAV ARROWS ── */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button onClick={() => navigate(-1)} disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 transition-all bg-[#FFFBEB]">
          <ChevronLeft size={20} />
        </button>
        <span className="text-stone-500 text-sm tabular-nums">
          {activeIndex + 1} / {projectsData.length}
        </span>
        <button onClick={() => navigate(1)} disabled={activeIndex === projectsData.length - 1}
          className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 transition-all bg-[#FFFBEB]">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ── ACTIVE PROJECT DETAILS ── */}
      <div className="max-w-[700px] mx-auto px-4 mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">{active.title}</h3>
            <p className="text-stone-500 mb-6 leading-relaxed">{active.description}</p>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {active.tags.map(tag => (
                <span key={tag} className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              {active.liveUrl && (
                <Button variant="primary" className="gap-2" onClick={() => window.open(active.liveUrl, "_blank")}>
                  <ExternalLink size={16} aria-hidden /> Live Demo
                </Button>
              )}
              {!active.liveUrl && (
                <Button variant="primary" className="gap-2" onClick={() => setSelectedProject(active)}>
                  <Eye size={16} aria-hidden /> Preview
                </Button>
              )}
              {active.githubUrl && (
                <Button variant="outline" className="gap-2" onClick={() => window.open(active.githubUrl, "_blank")}>
                  <Code size={16} aria-hidden /> Source
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
