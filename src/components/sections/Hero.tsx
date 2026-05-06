"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Marquee } from "@/components/animations/Marquee";
import { RollingText } from "@/components/animations/RollingText";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { FloatingShapes } from "@/components/animations/FloatingShapes";

export function Hero() {
  const marqueeItems = [
    "React Native", "Next.js", "APIs", "Performance", "UI/UX", "Scalable Systems",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col justify-center items-center text-center overflow-hidden px-4 pb-32 pt-20"
    >
      <FloatingShapes />

      <StaggerContainer className="z-10 max-w-5xl mx-auto flex flex-col items-center justify-center">
        <StaggerItem>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" aria-hidden />
            <span className="text-stone-600 font-medium text-sm">Welcome to my universe</span>
          </div>
        </StaggerItem>

        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-stone-900 leading-none flex flex-col items-center">
            <span className="overflow-hidden block pb-2">
              <motion.span
                initial={{ y: "100%", opacity: 0, rotateZ: 5 }}
                animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.1 }}
                className="block"
              >
                Creative Developer
              </motion.span>
            </span>
            <span className="overflow-hidden block pb-2 mt-2">
              <motion.span
                initial={{ y: "100%", opacity: 0, rotateZ: 5 }}
                animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.3 }}
                className="block"
              >
                <span className="text-stone-400 font-normal">Hi, I&apos;m</span>{" "}
                <span className="text-amber-600">Biplab Sarkar</span>
              </motion.span>
            </span>
          </h1>
        </div>

        <StaggerItem>
          <div className="flex items-center justify-center gap-4">
            <span className="w-8 md:w-16 h-[2px] bg-amber-200 hidden sm:block" />
            <RollingText />
            <span className="w-8 md:w-16 h-[2px] bg-amber-200 hidden sm:block" />
          </div>
        </StaggerItem>

        <StaggerItem className="mt-14 flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto group"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Mail className="w-5 h-5" aria-hidden />
            Let&apos;s Talk
          </Button>
        </StaggerItem>
      </StaggerContainer>

      <div className="absolute bottom-4 md:bottom-10 w-full z-10">
        <Marquee items={marqueeItems} className="py-4" />
      </div>
    </section>
  );
}
