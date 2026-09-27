"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ConnectionDiagram() {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[250px] md:h-[300px] my-12 flex items-center justify-center">
      {/* SVG Connectors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
        {/* Base lines */}
        <path d="M 150 200 C 250 200, 300 80, 400 80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <path d="M 650 200 C 550 200, 500 80, 400 80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />

        {/* Animated pulses */}
        <motion.path 
          d="M 150 200 C 250 200, 300 80, 400 80" 
          fill="none" 
          stroke="#2dd4bf" 
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 650 200 C 550 200, 500 80, 400 80" 
          fill="none" 
          stroke="#e87a66"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
        />
      </svg>

      {/* HTML Overlays for Nodes (positioned relative to SVG viewbox percentages) */}
      
      {/* BrokerOS Node */}
      <div className="absolute top-[66.6%] left-[18.75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-black/40 border border-brand-teal/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.2)]">
          <svg className="w-8 h-8 text-brand-teal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
        </div>
        <span className="mt-3 text-sm md:text-base font-bold text-white tracking-wider">BrokerOS</span>
      </div>

      {/* ClientOS Node */}
      <div className="absolute top-[66.6%] left-[81.25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-black/40 border border-brand-terracotta/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(232,122,102,0.2)]">
          <svg className="w-8 h-8 text-brand-terracotta" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="15" y1="9" y2="9"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
        </div>
        <span className="mt-3 text-sm md:text-base font-bold text-white tracking-wider">ClientOS</span>
      </div>

      {/* Shared Truth Node */}
      <div className="absolute top-[26.6%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-white border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] z-10">
          <svg className="w-10 h-10 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
        </div>
        <span className="mt-4 text-sm md:text-base font-bold text-white tracking-widest uppercase">Shared Truth</span>
      </div>
    </div>
  );
}
