"use client";

import React from "react";
import { motion } from "framer-motion";
import BrokerVisual from "@/components/BrokerVisual";
import ClientVisual from "@/components/ClientVisual";
import ColorBends from "@/components/ColorBends";

export default function Products() {
  return (
    <div className="relative w-full bg-[#0a0a0a] text-white selection:bg-brand-teal/30 selection:text-white pb-32">
      
      {/* Global Background — Fixed Behind Everything */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100">
        <ColorBends />
      </div>
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/50 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-white/60 mb-6">
            Our Products
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-6">
            Real tools for<br/>real brokers.
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            We build software that replaces the spreadsheets, scattered PDFs, and manual workflows that insurance brokers deal with every day.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* BrokerOS Section */}
      <section className="relative z-10 w-full min-h-screen py-24 flex items-center border-t border-white/5 bg-[#0a0a0a]/40 backdrop-blur-sm">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row h-full">
          {/* Narrative Left */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12 h-full flex items-center px-6 md:px-16 lg:px-24 mb-12 md:mb-0"
          >
            <div className="max-w-xl">
              <p className="text-brand-teal font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                Live &amp; Pilot-Tested
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">BrokerOS</h2>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-5">
                The structured workspace built for commercial insurance brokers. Everything you need to manage clients, policies, and renewals — in one place.
              </p>
              <p className="text-base text-white/50 leading-relaxed mb-5">
                Brokers today spend hours copying data between portals, inboxes, and spreadsheets. BrokerOS replaces that manual work with a single workspace where clients, policies, RFQs, quotes, commissions, and documents are all structured and connected.
              </p>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Track renewals automatically. Compare carrier quotes side by side. Generate submission documents. See commission breakdowns per client. Everything a broker needs, nothing they don&rsquo;t.
              </p>
              
              {/* Concrete capabilities list */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  "Client management",
                  "Policy lifecycle tracking",
                  "RFQ & quote comparison",
                  "Renewal monitoring",
                  "Commission tracking",
                  "Document generation",
                ].map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="w-1 h-1 rounded-full bg-brand-teal flex-shrink-0" />
                    {cap}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual Right */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 h-full flex items-center justify-center p-6 md:p-12"
          >
            <BrokerVisual />
          </motion.div>
        </div>
      </section>

      {/* ClientOS Section */}
      <section className="relative z-10 w-full min-h-screen py-24 flex items-center border-t border-white/5 bg-[#0a0a0a]/40 backdrop-blur-sm">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row h-full">
          {/* Visual Left */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 h-full flex items-center justify-center p-6 md:p-12 mt-12 md:mt-0"
          >
            <ClientVisual />
          </motion.div>

          {/* Narrative Right */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12 h-full flex items-center px-6 md:px-16 lg:px-24"
          >
            <div className="max-w-xl">
              <p className="text-brand-terracotta font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
                In Active Development
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">ClientOS</h2>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-5">
                A client-facing portal that gives policyholders direct visibility into their coverage, renewals, and documents.
              </p>
              <p className="text-base text-white/50 leading-relaxed mb-5">
                Right now, clients email their broker every time they need a certificate, want to check a renewal date, or have a question about their coverage. ClientOS will give them a self-service view — connected to the same data their broker works with in BrokerOS.
              </p>
              <p className="text-base text-white/50 leading-relaxed">
                Currently in development. We&rsquo;re designing it alongside the brokers who use BrokerOS to make sure it solves real client pain points, not imagined ones.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we're building toward — brief forward-looking mention */}
      <section className="relative z-10 w-full py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/20 font-mono text-xs uppercase tracking-widest mb-4">What we&rsquo;re building toward</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white/60">Fabric</h2>
            <p className="text-lg text-white/40 leading-relaxed max-w-2xl">
              Long-term, we believe the structured data underneath BrokerOS and ClientOS can become a shared foundation — a data layer that connects brokers, clients, carriers, and the tools they already use. We call this vision Fabric. It&rsquo;s early-stage research, not a product you can buy today, and we&rsquo;ll share more when it&rsquo;s ready.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
