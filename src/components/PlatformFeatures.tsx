"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    ),
    title: "Entity Resolution",
    desc: "Every broker, client, policy, and claim is a resolved entity in the graph — not a duplicated row across disconnected systems.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
    ),
    title: "Live Propagation",
    desc: "A change in one application propagates instantly across every connected interface. No batch sync. No overnight ETL.",
    color: "text-brand-terracotta",
    bg: "bg-brand-terracotta/10",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
    ),
    title: "Integration Layer",
    desc: "Existing systems don't get replaced — they get unified. We ingest data from legacy platforms and structure it into the ontology.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col p-8 md:p-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
    >
      {/* Dynamic hover spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 197, 94, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Icon container */}
      <div className={`relative z-10 w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 ${feature.color} border border-white/5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-500`}>
        {feature.icon}
      </div>
      
      {/* Text */}
      <h3 className="relative z-10 font-serif text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-500">
        {feature.title}
      </h3>
      <p className="relative z-10 text-white/50 text-lg leading-relaxed">
        {feature.desc}
      </p>
    </motion.div>
  );
}

export default function PlatformFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURES.map((feature, i) => (
        <FeatureCard key={i} feature={feature} index={i} />
      ))}
    </div>
  );
}
