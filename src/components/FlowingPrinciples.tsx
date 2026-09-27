"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const principles = [
  {
    id: "ontology",
    num: "01",
    title: "Ontology-first.",
    description: "We model the relationships between entities — policies, claims, carriers, brokers, clients — not just rows in a table. Every data point exists within a structured graph of meaning, not a flat spreadsheet.",
  },
  {
    id: "graph",
    num: "02",
    title: "One graph. Many products.",
    description: "Every application we build reads and writes to a shared knowledge graph. A change anywhere propagates everywhere. No sync jobs. No reconciliation. One source of truth, infinite interfaces.",
  },
  {
    id: "integration",
    num: "03",
    title: "Built for integration, not replacement.",
    description: "We don't ask enterprises to rip and replace. We sit on top of existing systems and unify their data into a structured, queryable layer — turning decades of siloed information into a connected operating system.",
  }
];

export default function FlowingPrinciples() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 flex flex-col">
      {/* Massive ambient shadow to separate from the busy terminal background without looking like a box */}
      <div className="absolute inset-0 bg-black/60 blur-[120px] rounded-full pointer-events-none -z-10" />

      {principles.map((node, idx) => {
        const isActive = hoveredNode === node.id;
        const isDimmed = hoveredNode !== null && !isActive;
        
        return (
          <div
            key={node.id}
            className="relative z-10 flex flex-col cursor-pointer group py-8 md:py-12 border-t border-white/20 first:border-none"
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setHoveredNode(isActive ? null : node.id)}
          >
            <div className="flex flex-row items-start gap-6 md:gap-12">
              {/* Massive Number */}
              <div 
                className={`font-serif text-3xl md:text-5xl lg:text-6xl italic transition-all duration-500 mt-1 md:mt-2 ${
                  isActive ? "text-brand-teal drop-shadow-[0_0_15px_rgba(43,130,132,0.8)]" : "text-white/40 group-hover:text-brand-teal/70"
                } ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                {node.num}
              </div>
              
              <div className={`flex-1 flex flex-col justify-center transition-opacity duration-500 ${isDimmed ? "opacity-30" : "opacity-100"}`}>
                <div className="flex flex-row items-center justify-between">
                  <h3 
                    className={`font-serif text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight transition-all duration-500 ${
                      isActive ? "text-white" : "text-white/90 group-hover:text-white"
                    }`}
                    style={{ 
                      textShadow: "0 4px 30px rgba(0,0,0,1)" 
                    }}
                  >
                    {node.title}
                  </h3>
                  
                  {/* Interactive Plus/Cross */}
                  <motion.div 
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 ml-4 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "border-brand-teal text-white bg-brand-teal shadow-[0_0_20px_rgba(43,130,132,0.6)]" 
                        : "border-white/20 text-white/60 group-hover:border-white/50 group-hover:text-white"
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 relative max-w-3xl">
                         <p 
                           className="text-xl md:text-3xl text-white/80 leading-relaxed font-light"
                           style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
                         >
                          {node.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
