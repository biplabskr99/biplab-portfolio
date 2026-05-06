"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function BackgroundEffects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const orb1X = useTransform(springX, [-0.5, 0.5], [120, -120]);
  const orb1Y = useTransform(springY, [-0.5, 0.5], [120, -120]);
  const orb2X = useTransform(springX, [-0.5, 0.5], [-160, 160]);
  const orb2Y = useTransform(springY, [-0.5, 0.5], [-160, 160]);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouseX.set(x / window.innerWidth - 0.5);
      mouseY.set(y / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("touchmove", onMove); };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Orange-red orb top-left */}
      <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,146,60,0.55) 0%, rgba(251,146,60,0) 70%)" }}
        />
      </motion.div>

      {/* Rose-pink orb bottom-right */}
      <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-32 -right-32 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.40) 0%, rgba(244,63,94,0) 70%)" }}
        />
      </motion.div>

      {/* Teal center-left glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 70%)" }}
      />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)"
        }}
      />
    </div>
  );
}
