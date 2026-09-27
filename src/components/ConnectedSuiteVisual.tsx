"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ConnectedSuiteVisual() {
  const { scrollYProgress } = useScroll();
  
  // A simple representation: disconnected boxes on the left vs deeply connected single core on the right
  
  return (
    <div className="relative w-full my-12 h-64 border border-white/10 bg-black/40 rounded-3xl backdrop-blur-md flex items-center justify-between px-4 md:px-16 overflow-hidden">
      
      {/* Before: Broken/Fragmented */}
      <div className="flex flex-col items-center justify-center gap-4 relative w-1/2">
        <h4 className="absolute -top-10 text-xs tracking-widest text-white/40 uppercase font-bold">Before</h4>
        
        <div className="flex gap-4">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 bg-white/5 border border-white/20 rounded-md"
          />
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 bg-white/5 border border-white/20 rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 bg-white/5 border border-white/20 rounded-md"
          />
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 bg-white/5 border border-white/20 rounded-md"
          />
        </div>
        
        {/* Broken links */}
        <svg className="absolute inset-0 w-full h-full text-white/10" pointerEvents="none">
           <line x1="40" y1="40" x2="60" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
           <line x1="80" y1="40" x2="60" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Divider */}
      <div className="w-px h-32 bg-white/10 mx-4" />

      {/* After: Connected Suite */}
      <div className="flex flex-col items-center justify-center relative w-1/2">
        <h4 className="absolute -top-10 text-xs tracking-widest text-brand-teal uppercase font-bold">Connected Suite</h4>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 border-2 border-brand-teal/30 rounded-full border-t-brand-teal/80"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute inset-2 border border-brand-terracotta/30 rounded-full border-b-brand-terracotta/80"
           />
           <div className="w-12 h-12 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] rounded-full flex items-center justify-center z-10">
             <div className="w-4 h-4 bg-black rounded-full" />
           </div>
           
           {/* Connected nodes */}
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute -top-2 -right-2 w-6 h-6 bg-brand-teal rounded-full"
           />
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity, delay: 1 }}
             className="absolute -bottom-2 -left-2 w-6 h-6 bg-brand-terracotta rounded-full"
           />
        </div>
      </div>
    </div>
  );
}
