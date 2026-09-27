"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FragmentVisual() {
  const pieces = Array.from({ length: 6 });

  return (
    <div className="relative w-full h-48 md:h-64 my-12 flex items-center justify-center overflow-hidden border border-white/5 bg-black/20 rounded-3xl">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32"
        >
          {pieces.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-16 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm"
              initial={{ 
                x: (Math.random() - 0.5) * 200, 
                y: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 360 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 250, 
                y: (Math.random() - 0.5) * 250,
                rotate: Math.random() * 360 
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            >
              {/* Fake text lines */}
              <div className="w-8 h-1 bg-white/10 rounded mt-2 ml-2" />
              <div className="w-6 h-1 bg-white/10 rounded mt-2 ml-2" />
              <div className="w-4 h-1 bg-white/10 rounded mt-2 ml-2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-6 text-xs font-serif italic text-white/40">
        Fig 1. Data trapped in fragmentation
      </div>
    </div>
  );
}
