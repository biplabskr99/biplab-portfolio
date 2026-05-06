"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
          >
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {project.images && project.images.length > 0 && (
              <div className="relative w-full h-[250px] sm:h-[400px] bg-black/50 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {project.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <button 
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ChevronRight size={24} aria-hidden="true" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
                      {project.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/30"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <h2 id="modal-title" className="text-3xl font-bold mb-2 text-white">{project.title}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-sm text-primary-purple bg-primary-purple/10 px-3 py-1 rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-6 text-white/70">
                {project.problem && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">The Problem</h3>
                    <p className="leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">The Solution</h3>
                    <p className="leading-relaxed">{project.solution}</p>
                  </div>
                )}
                {project.outcome && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">The Outcome</h3>
                    <p className="leading-relaxed">{project.outcome}</p>
                  </div>
                )}
                {!project.problem && !project.solution && !project.outcome && (
                  <p className="leading-relaxed">{project.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
