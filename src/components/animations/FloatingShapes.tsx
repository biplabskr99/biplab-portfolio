"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function FloatingShapes() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const sy = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Three depth layers — different parallax intensities
  const l1x = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const l1y = useTransform(sy, [-0.5, 0.5], [-40, 40]);
  const l2x = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const l2y = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const l3x = useTransform(sx, [-0.5, 0.5], [-70, 70]);
  const l3y = useTransform(sy, [-0.5, 0.5], [-70, 70]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* ── DEPTH 3 (farthest): large orbit ring ── */}
      <motion.div
        style={{ x: l2x, y: l2y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
      >
        <motion.svg viewBox="0 0 700 700" className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
          <ellipse cx="350" cy="350" rx="340" ry="160"
            fill="none" stroke="rgba(245,158,11,0.10)" strokeWidth="1" strokeDasharray="6 14" />
          {/* amber dot orbiting */}
          <circle cx="690" cy="350" r="5" fill="#F59E0B" opacity="0.8"
            style={{ filter: "drop-shadow(0 0 8px #F59E0B)" }} />
        </motion.svg>
      </motion.div>

      {/* ── DEPTH 2 (mid): counter-rotating inner ring ── */}
      <motion.div
        style={{ x: l2x, y: l2y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px]"
      >
        <motion.svg viewBox="0 0 430 430" className="w-full h-full opacity-50"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}>
          <ellipse cx="215" cy="215" rx="205" ry="95"
            fill="none" stroke="rgba(139,163,199,0.18)" strokeWidth="1" />
          <circle cx="420" cy="215" r="3" fill="#8BA3C7" />
        </motion.svg>
      </motion.div>

      {/* ── DEPTH 1 (closest): floating geometric details ── */}
      {/* Top-right code brackets */}
      <motion.div style={{ x: l1x, y: l1y }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[8%] hidden md:block">
        <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
          <path d="M12 4 L3 4 L3 52 L12 52" stroke="rgba(245,158,11,0.45)" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 4 L41 4 L41 52 L32 52" stroke="rgba(245,158,11,0.45)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Bottom-left spinning square */}
      <motion.div style={{ x: l3x, y: l3y }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[28%] left-[6%] hidden md:block">
        <div className="w-9 h-9 border-2 border-amber-500/30 rounded-sm" />
      </motion.div>

      {/* Top-left pulsing plus */}
      <motion.div style={{ x: l1x, y: l1y }}
        animate={{ y: [0, 10, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[32%] left-[5%] hidden md:block">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <line x1="13" y1="2" x2="13" y2="24" stroke="rgba(139,163,199,0.45)" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="13" x2="24" y2="13" stroke="rgba(139,163,199,0.45)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Bottom-right pulsing dot grid */}
      <motion.div style={{ x: l2x, y: l2y }}
        className="absolute bottom-[28%] right-[5%] hidden md:grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div key={i}
            animate={{ opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        ))}
      </motion.div>

      {/* Center-left: small glowing ring */}
      <motion.div style={{ x: l3x, y: l3y }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-[55%] left-[3%] hidden lg:block">
        <div className="w-12 h-12 rounded-full border border-amber-500/30" style={{ boxShadow: "0 0 20px rgba(245,158,11,0.15)" }} />
      </motion.div>

    </div>
  );
}
