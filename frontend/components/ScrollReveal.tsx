"use client";
import { useEffect, useRef, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  const initialVariants = {
    up: { opacity: 0, y: 50 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
  };

  const visibleVariant = { opacity: 1, y: 0, x: 0 };

  useEffect(() => {
    if (isInView) {
      controls.start(visibleVariant);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={initialVariants[direction]}
      animate={controls}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}>
      {children}
    </motion.div>
  );
}
