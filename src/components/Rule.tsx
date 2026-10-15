"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RuleProps {
  className?: string;
  delay?: number;
  soft?: boolean;
}

export default function Rule({ className = "", delay = 0, soft = false }: RuleProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`w-full h-[1px] ${
          soft ? "bg-[rgba(236,232,223,0.06)]" : "bg-[rgba(236,232,223,0.14)]"
        } ${className}`}
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.65, 0, 0.35, 1], // --ease-io
      }}
      className={`w-full h-[1px] origin-left ${
        soft ? "bg-[rgba(236,232,223,0.06)]" : "bg-[rgba(236,232,223,0.14)]"
      } ${className}`}
    />
  );
}
