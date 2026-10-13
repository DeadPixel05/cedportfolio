"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  // Raw mouse coordinates relative to the viewport
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to produce fluid, organic movement without jitter
  const springConfig = { damping: 28, stiffness: 140, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle parallax shifts for the grid and dots (inverted or shifted)
  const gridShiftX = useTransform(smoothX, [0, 1920], [-18, 18]);
  const gridShiftY = useTransform(smoothY, [0, 1080], [-18, 18]);

  const dotShiftX = useTransform(smoothX, [0, 1920], [14, -14]);
  const dotShiftY = useTransform(smoothY, [0, 1080], [14, -14]);

  useEffect(() => {
    setMounted(true);
    // Center initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Follower */}
      {mounted && (
        <motion.div
          className="absolute -top-64 -left-64 h-[32rem] w-[32rem] rounded-full blur-[90px] opacity-60 dark:opacity-40"
          style={{
            x: smoothX,
            y: smoothY,
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--primary) 22%, transparent) 0%, color-mix(in srgb, var(--primary) 8%, transparent) 45%, transparent 75%)",
          }}
        />
      )}

      {/* Moving SVG Grid Pattern with mouse parallax */}
      <motion.div
        style={{
          x: gridShiftX,
          y: gridShiftY,
        }}
        className="absolute -inset-16 h-[calc(100%+8rem)] w-[calc(100%+8rem)] opacity-45 dark:opacity-35"
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 40] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 18,
            ease: "linear",
          }}
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, var(--foreground) 9%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 9%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Pulsing Accent Dots Pattern with subtle counter-parallax */}
      <motion.div
        style={{
          x: dotShiftX,
          y: dotShiftY,
        }}
        className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)]"
      >
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="h-full w-full opacity-40 dark:opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--foreground) 16%, transparent) 1.2px, transparent 1.2px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </motion.div>

      {/* Floating luminous glow orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.15, 0.92, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
        }}
        className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15"
      />

      <motion.div
        animate={{
          x: [0, -45, 30, 0],
          y: [0, 30, -25, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 26,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-sky-500/12"
      />

      {/* Radial fade mask to seamlessly blend edges into the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 20%, var(--background) 82%)",
        }}
      />
    </div>
  );
}
