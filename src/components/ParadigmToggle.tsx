"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ParadigmToggle() {
  const [active, setActive] = useState<"sales" | "utility">("sales");

  return (
    <div className="relative w-full my-12 p-8 border border-white/10 bg-black/40 rounded-3xl backdrop-blur-md flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <div className="flex bg-white/5 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActive("sales")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${active === "sales" ? "bg-brand-terracotta text-white" : "text-white/50 hover:text-white/80"}`}
          >
            The Culture
          </button>
          <button 
            onClick={() => setActive("utility")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${active === "utility" ? "bg-brand-teal text-white" : "text-white/50 hover:text-white/80"}`}
          >
            The Software
          </button>
        </div>
        
        <div className="h-24">
          <AnimatePresence mode="wait">
            {active === "sales" ? (
              <motion.div
                key="sales"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white/80"
              >
                <h4 className="font-bold text-lg mb-2 text-brand-terracotta">Relationship-Driven Sales</h4>
                <p className="text-sm leading-relaxed">Closing deals and maintaining trust are prioritized above all else. Historically, technical adoption takes a back seat to the human element.</p>
              </motion.div>
            ) : (
              <motion.div
                key="utility"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white/80"
              >
                <h4 className="font-bold text-lg mb-2 text-brand-teal">Back-Office Utility</h4>
                <p className="text-sm leading-relaxed">Software was viewed merely as a necessary utility, not a competitive advantage. Incumbent systems have massive inertia and artificially high switching costs.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-48 h-48 relative flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <AnimatePresence mode="wait">
          {active === "sales" ? (
             <motion.svg
               key="handshake"
               initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
               animate={{ scale: 1, opacity: 1, rotate: 0 }}
               exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
               className="w-20 h-20 text-brand-terracotta"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             >
               <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
               <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
               <path d="m21 3-6 6"/>
               <path d="M21 17v4h-4"/>
               <path d="M3 3v4h4"/>
             </motion.svg>
          ) : (
             <motion.svg
               key="server"
               initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
               animate={{ scale: 1, opacity: 1, rotate: 0 }}
               exit={{ scale: 0.8, opacity: 0, rotate: -10 }}
               className="w-20 h-20 text-brand-teal"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             >
               <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
               <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
               <line x1="6" x2="6.01" y1="6" y2="6"/>
               <line x1="6" x2="6.01" y1="18" y2="18"/>
             </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
