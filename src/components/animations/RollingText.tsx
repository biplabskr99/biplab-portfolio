"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "I build Mobile Apps",
  "I create Web Platforms",
  "I design Scalable Systems",
];

export function RollingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[40px] sm:h-[48px] overflow-hidden relative flex items-center justify-center md:justify-start mt-2">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute text-xl sm:text-2xl md:text-3xl font-medium text-stone-600 whitespace-nowrap"
        >
          {phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
