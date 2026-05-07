"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Code, Eye } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "./ProjectModal";

export interface Project {
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
    id: "puja-bandhu",
    title: "Puja Bandhu (Kolkata Police)",
    description: "Official festival companion app for Kolkata Police, providing 100,000+ users with real-time pandal navigation, traffic updates, and emergency services.",
    tags: ["React Native", "Expo", "Google Maps API", "Java Spring Boot", "High Scale"],
    category: "Mobile",
    liveUrl: "https://play.google.com/store/apps/details?id=com.indranilvyoma.boltexponativewind&hl=en",
    images: ["/projects/puja-bandhu-1.png", "/projects/puja-bandhu-2.png", "/projects/puja-bandhu-3.png", "/projects/puja-bandhu-4.png"],
    problem: "Coordinating safety and navigation for millions of visitors during the Durga Puja festival was a massive logistical challenge for the Kolkata Police.",
    solution: "Developed a scalable mobile platform with GPS-based location tracking, interactive maps for nearby utilities (parking, hospitals, police), and real-time crowd management alerts.",
    outcome: "Achieved over 100,000+ downloads and successfully supported peak festive traffic, significantly improving public safety and navigation efficiency across the city."
  },
  {
    id: "ucap",
    title: "Unified Common Admission Portal (UCAP)",
    description: "A large-scale educational admission and scholarship platform for West Bengal, featuring AI-driven face detection and real-time government API integrations.",
    tags: ["React 19", "TypeScript", "Zustand", "TensorFlow.js", "Java Spring Boot"],
    category: "Web",
    liveUrl: "https://admission-tetsd.wb.gov.in/",
    images: ["/projects/ucap.png"],
    problem: "Managing thousands of admission and scholarship applications across multiple departments required a secure, unified platform with automated verification to prevent identity fraud.",
    solution: "Developed a comprehensive portal with multi-tiered verifier roles, AI-based profile moderation using TensorFlow.js, and real-time NIC API connectivity for certificate validation.",
    outcome: "Unified the admission lifecycle for multiple technical councils, ensuring 100% data integrity and significantly reducing the manual burden on institutional verifiers."
  },
  {
    id: "allarrest-mobile",
    title: "AllArrest Mobile",
    description: "An enterprise-grade law enforcement ecosystem for the West Bengal Police, featuring Aadhaar-based biometric verification and secure arrest documentation.",
    tags: ["React Native", "TypeScript", "Native Modules", "Biometrics", "Node.js"],
    category: "Mobile",
    images: ["/projects/all-arrest-mob-1.jpg", "/projects/all-arrest-mob-2.jpg", "/projects/all-arrest-mob-3.jpg"],
    problem: "Field officers needed a secure, high-integrity way to verify identities and document arrests in real-time without relying on manual, error-prone entry.",
    solution: "Built a robust React Native app with a custom Native Module bridge for RD biometric services, enabling secure Aadhaar fingerprint scanning and automated profile ingestion.",
    outcome: "Transformed law enforcement operations by providing a secure digital paper trail, eliminating identity fraud, and optimizing field documentation speed."
  },
  {
    id: "attendance-web",
    title: "Attendance Management Web",
    description: "A high-performance Next.js 15 admin portal featuring real-time attendance analytics, automated leave processing, and advanced PDF/Excel reporting.",
    tags: ["Next.js 15", "TypeScript", "Shadcn UI", "Recharts", "Leaflet"],
    category: "Web",
    liveUrl: "https://vigpl.com/attendance",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"],
    problem: "HR departments needed a centralized, real-time dashboard to monitor employee movements and automate complex reporting tasks across multiple office locations.",
    solution: "Built a secure, full-stack portal with interactive D3-based charts, geolocation tracking via Leaflet, and an automated report generation engine for payroll compliance.",
    outcome: "Reduced monthly reporting time by 80% and provided executives with instant, data-driven insights into organizational attendance trends."
  },
  {
    id: "vig-attendance",
    title: "VIG Attendance",
    description: "A professional employee management application for tracking real-time attendance, managing leave requests, and maintaining organizational profiles.",
    tags: ["React Native", "Expo", "Java Spring Boot", "MySQL", "Mobile UI"],
    category: "Mobile",
    liveUrl: "https://play.google.com/store/apps/details?id=com.indranilvyoma.VIGAttendance&hl=en",
    images: ["/projects/vig-1.png", "/projects/vig-2.png", "/projects/vig-3.png"],
    problem: "Organizations struggled with manual attendance tracking and fragmented leave management processes, leading to payroll inaccuracies and administrative delays.",
    solution: "Developed an integrated mobile solution with real-time check-in/out capabilities, automated leave balance tracking, and a hierarchical approval workflow connected to a robust Spring Boot backend.",
    outcome: "Streamlined HR operations for the organization, achieving 100% digital attendance accuracy and reducing leave processing time by over 60%."
  },
  {
    id: "student-portal",
    title: "Student Management Portal",
    description: "A centralized academic management system for WBSCTVE&SD coordinating marks entry and progress tracking for thousands of students across West Bengal.",
    tags: ["React", "Vite", "Java Spring Boot", "MySQL", "OTP Auth"],
    category: "Web",
    liveUrl: "https://sctedved.wb.gov.in/emp/login",
    images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"],
    problem: "Coordinating marks entry and academic verification across hundreds of polytechnic institutes was a manual, slow, and error-prone process.",
    solution: "Built a role-based portal with real-time analytics, cascading state-driven filters, and a secure OTP-based administrative control system to manage the entire evaluation lifecycle.",
    outcome: "Digitized the academic lifecycle for the state council, ensuring transparency, preventing data loss, and providing real-time oversight for council executives."
  },
  {
    id: "allarrest",
    title: "AllArrest Management System",
    description: "A centralized digital register for the West Bengal Police to capture and manage arrestee information with Aadhaar-based real-time verification.",
    tags: ["React", "Node.js", "MySQL", "Microservices", "Aadhaar Auth"],
    category: "Web",
    liveUrl: "https://allarrest.wb.gov.in/",
    images: ["/projects/all-arrest.png"],
    problem: "Police departments relied on manual record-keeping for arrestee data, leading to data inaccuracies, slow information retrieval, and fragmented criminal records.",
    solution: "Developed a secure, microservices-based platform for digital data entry of personal info, case records, and legal docs, integrated with Aadhaar for instant identity verification.",
    outcome: "Significantly improved operational efficiency for West Bengal Police, enabling faster investigation tracking and centralized access to criminal data across departments."
  },
  {
    id: "haat",
    title: "Haat Management System",
    description: "A multi-role digital platform for Zila Parishad Jalpaiguri to manage shop surveys, verifications, and certification workflows for traditional markets.",
    tags: ["React", "Java Spring Boot", "MySQL", "Workflow Engine"],
    category: "Web",
    liveUrl: "https://haatmgmtjpgzp.wb.gov.in/",
    images: ["/projects/haat-management.png"],
    problem: "Market management was fragmented, lacking transparency in shop allocation, verification, and certification processes across rural districts.",
    solution: "Designed an end-to-end role-based platform that automates the entire lifecycle—from initial survey by field agents to multi-stage verification, digital hearings, and automated certificate issuance.",
    outcome: "Successfully digitized market operations for Zila Parishad, ensuring 100% process transparency and accountability for thousands of shop owners."
  },
  {
    id: "toto",
    title: "TOTO Registration (E-rickshaw)",
    description: "A single window registration website for unregistered toto drivers. Features a 6-step registration form with GRIPS payment integration and a 3-level admin panel for application oversight.",
    tags: ["React", "Java Spring Boot", "MySQL", "GRIPS Integration"],
    category: "Web",
    liveUrl: "https://tten.wb.gov.in/",
    images: ["/projects/toto.png"],
    problem: "There was no centralized system to regulate and register thousands of unlicensed toto drivers in West Bengal.",
    solution: "Developed a secure 6-step registration portal with government payment gateway integration and a hierarchical approval workflow.",
    outcome: "Streamlined the registration process for over 50,000+ drivers within the first 6 months."
  },
  {
    id: "sparking-agent",
    title: "SParkingAgent",
    description: "A comprehensive Parking Management Solution for Android POS terminals, featuring thermal printing, hardware integration, and offline-first synchronization.",
    tags: ["Java", "Android", "Retrofit", "SQLite", "POS SDK", "Bluetooth"],
    category: "Mobile",
    images: ["/projects/sparking-1.jpg", "/projects/sparking-2.jpg", "/projects/sparking-3.jpg", "/projects/sparking-4.jpg"],
    problem: "Attendants needed a rugged, all-in-one solution for high-volume parking environments that works reliably on specialized POS hardware even without internet.",
    solution: "Developed a custom Android application integrated with Pax, Ezetap, and PineLabs SDKs, featuring real-time fee calculation, Bluetooth gate control, and a robust offline SQLite sync engine.",
    outcome: "Successfully deployed and operational at high-traffic hubs including Apollo Multispeciality Hospitals (Salt Lake) and Magma House (Park Street), streamlining vehicle throughput and ensuring 100% financial accountability through digital record-keeping."
  },
  {
    id: "smart-power",
    title: "Smart Power Ticketing System",
    description: "An enterprise-grade offline-first ticketing solution for POS terminals, streamlining visitor management with real-time sync and hardware integration.",
    tags: ["Java", "Android", "MVVM", "Room DB", "POS SDK", "AIDL"],
    category: "Mobile",
    images: ["/projects/smart-power.jpg"],
    problem: "Eco Park required a high-performance, rugged ticketing system that could handle massive visitor volumes with 100% reliability, even during network outages.",
    solution: "Architected an MVVM-based Android application with an offline-first strategy using Room DB. Developed a hardware-agnostic bridge for PineLab, Sunmi, and Pax devices to ensure seamless thermal printing across different terminals.",
    outcome: "Successfully operational at Eco Park (Kolkata), processing thousands of tickets daily with zero data loss and significantly reduced wait times at entry gates."
  },
  {
    id: "e-sakshya",
    title: "eSakshya",
    description: "An enterprise-grade Flutter utility for law enforcement, featuring secure attendance, evidence collection, and background data synchronization.",
    tags: ["Flutter", "Hive", "SQFlite", "AWS S3", "Geolocation", "Biometrics"],
    category: "Mobile",
    images: ["/projects/e-sakshya.jpg"],
    problem: "Field officers needed a secure, high-integrity platform for attendance and evidence documentation that works reliably in low-connectivity environments.",
    solution: "Developed a Flutter-based application with an offline-first architecture using Hive and SQFlite. Integrated jailbreak detection for security and a robust background sync mechanism to ensure data reaches the server (AWS S3) as soon as connectivity is restored.",
    outcome: "Empowered the West Bengal Police with a tamper-proof digital paper trail for field operations, ensuring 100% data integrity and accountability across the organization."
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
    <section id="projects" className="w-full overflow-hidden">
      <div className="w-full">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-stone-900">
            Featured <span className="text-amber-600">Projects</span>
          </h2>
          <p className="text-center text-stone-500 mb-20 max-w-xl mx-auto">
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

            <div className="flex flex-wrap gap-4 justify-center items-center">
              {active.liveUrl ? (
                <Button variant="primary" className="gap-2" onClick={() => window.open(active.liveUrl, "_blank")}>
                  <ExternalLink size={16} aria-hidden /> Live Demo
                </Button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-100 text-stone-500 border border-stone-200 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse" />
                  Internal Project
                </div>
              )}
              


              <Button variant={active.liveUrl ? "outline" : "primary"} className="gap-2" onClick={() => setSelectedProject(active)}>
                <Eye size={16} aria-hidden /> Case Study
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} isOpen={true} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
