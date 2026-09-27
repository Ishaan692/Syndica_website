"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Section({
  children,
  className = "",
  delay = 0,
  ...props
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth easing
      }}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
}
