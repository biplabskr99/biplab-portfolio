"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import type { Project } from "./Projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!project) return null;

  const nextImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  const isPrivate = !project.liveUrl && !project.githubUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFBEB] border border-amber-200 rounded-3xl shadow-2xl overflow-y-auto flex flex-col"
          >
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 p-2 bg-stone-100/80 hover:bg-amber-100 rounded-full text-stone-600 hover:text-amber-600 transition-all border border-amber-200"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {project.images && project.images.length > 0 && (
              <div className="relative w-full h-[250px] sm:h-[450px] bg-amber-50 group border-b border-amber-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain p-4"
                />
                
                {project.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-amber-100 rounded-full text-stone-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all border border-amber-200"
                    >
                      <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <button 
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-amber-100 rounded-full text-stone-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all border border-amber-200"
                    >
                      <ChevronRight size={24} aria-hidden="true" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 bg-stone-900/10 backdrop-blur-sm px-3 py-1.5 rounded-full" role="tablist">
                      {project.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-amber-600 scale-125" : "bg-stone-300 hover:bg-stone-400"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-6 sm:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold mb-4 text-stone-900 leading-tight">{project.title}</h2>
                  <div className="flex flex-wrap gap-2.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs sm:text-sm bg-amber-100 text-amber-800 px-3.5 py-1.5 rounded-full border border-amber-200 font-semibold tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {isPrivate && (
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-stone-100/50 border border-stone-200 text-stone-500">
                    <Lock size={20} className="text-amber-600" />
                    <div>
                      <p className="text-sm font-bold text-stone-800">Private Project</p>
                      <p className="text-[10px] uppercase tracking-widest font-medium">Not Publicly Accessible</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-8">
                  {project.problem && (
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-amber-500 rounded-full" />
                        The Problem
                      </h3>
                      <p className="text-stone-600 leading-relaxed text-lg">{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-orange-500 rounded-full" />
                        The Solution
                      </h3>
                      <p className="text-stone-600 leading-relaxed text-lg">{project.solution}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {project.outcome && (
                    <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                      <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2 text-rose-600">
                        The Impact
                      </h3>
                      <p className="text-stone-600 leading-relaxed">{project.outcome}</p>
                    </div>
                  )}
                  
                  {!project.problem && !project.solution && !project.outcome && (
                    <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                      <h3 className="text-lg font-bold text-stone-900 mb-3">About Project</h3>
                      <p className="text-stone-600 leading-relaxed">{project.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
