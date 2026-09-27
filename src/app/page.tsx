"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import Section from "@/components/Section";
import GradientOrb from "@/components/GradientOrb";
import Button from "@/components/Button";
import ColorBends from "@/components/ColorBends";
import GraphAssembly from "@/components/GraphAssembly";
import TextScrollReveal from "@/components/TextScrollReveal";
import PlatformShowcase from "@/components/PlatformShowcase";

export default function Home() {
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, 60]);

  // ColorBends dims down into dark background
  const bg1Opacity = useTransform(scrollY, [200, 900], [0.9, 0.25]);
  const darkBgOpacity = useTransform(scrollY, [200, 900], [0, 1]);

  // Pause ColorBends rendering when the dark overlay fully covers it.
  // The canvas is technically in-viewport (fixed position) but invisible,
  // so IntersectionObserver alone can't detect this — we need this threshold check.
  const [colorBendsPaused, setColorBendsPaused] = useState(false);
  useMotionValueEvent(darkBgOpacity, "change", (v) => {
    const shouldPause = v >= 0.95;
    if (shouldPause !== colorBendsPaused) setColorBendsPaused(shouldPause);
  });

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Smooth Dark Transition Layer */}
      <motion.div
        style={{ opacity: darkBgOpacity }}
        className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none"
      />
      {/* Fixed Background - ColorBends */}
      <motion.div
        style={{ opacity: bg1Opacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <ColorBends
          colors={["#2b8284", "#e87a66", "#e6dfd5"]}
          rotation={45}
          speed={0.4}
          scale={1.5}
          frequency={2.5}
          warpStrength={1.2}
          mouseInfluence={1.0}
          noise={0.1}
          parallax={0.3}
          iterations={3}
          intensity={2.2}
          bandWidth={5}
          transparent={true}
          autoRotate={-1.5}
          renderPaused={colorBendsPaused}
        />
      </motion.div>

      {/* ─── HERO ─── */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="max-w-5xl relative z-10 pointer-events-none -mt-16"
        >
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-foreground/50 mb-6">
            Software for Insurance Broking
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            Insurance brokers deserve{" "}
            <br />
            <span className="text-foreground/70">real software. We&rsquo;re building it.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            The commercial insurance industry still runs on spreadsheets, PDFs, and WhatsApp. Syndica builds structured tools that replace that chaos — starting with BrokerOS.
          </p>
        </motion.div>
      </section>

      {/* ─── TEXT SCROLL REVEAL ─── */}
      <TextScrollReveal
        kicker="The problem"
        statement="Brokers spend more time copying data between systems than serving clients. Renewals get missed. Quotes live in inboxes. Client records exist in five places and agree in none. We're building software that fixes this."
      />

      {/* ─── GRAPH ASSEMBLY (Scroll Animation) ─── */}
      <GraphAssembly />

      {/* ─── PRINCIPLES ─── */}
      <section className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
            {[
              {
                num: "01",
                title: "Structured, not scattered.",
                desc: "Clients, policies, quotes, claims — every entity in BrokerOS is a structured record with clear relationships, not a row buried in a spreadsheet or an email attachment you can't find.",
                accent: "text-brand-teal",
                border: "border-brand-teal/20",
              },
              {
                num: "02",
                title: "One workspace. Every workflow.",
                desc: "Quote comparison, renewal tracking, commission management, document generation — everything a broker needs, in one place. No more toggling between six disconnected tools.",
                accent: "text-brand-terracotta",
                border: "border-brand-terracotta/20",
              },
              {
                num: "03",
                title: "Built for how brokers actually work.",
                desc: "We didn't start with a platform thesis. We started by sitting with brokers, watching their workflows break, and building software that fixes the specific, painful gaps.",
                accent: "text-white",
                border: "border-white/10",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`p-8 md:p-12 border-t ${p.border} md:border-t-0 md:border-l first:border-l-0 first:border-t-0`}
              >
                <span className={`font-mono text-sm ${p.accent} tracking-widest`}>{p.num}</span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mt-4 mb-6">{p.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM SHOWCASE (Scroll Linked) ─── */}
      <PlatformShowcase />

      {/* ─── APPLICATIONS (Bento Grid) ─── */}
      <section className="w-full relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-white/30 mb-4">Products</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">What we&rsquo;re building.</h2>
            <p className="text-xl text-white/40 max-w-2xl">
              Software that gives brokers and their clients structured, connected tools — replacing the patchwork of spreadsheets, portals, and manual processes.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* BrokerOS — large card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 flex flex-col"
            >
              <Link href="/products" className="flex-1 group flex flex-col p-10 md:p-12 bg-gradient-to-br from-brand-teal/10 to-transparent border border-white/10 rounded-3xl hover:border-brand-teal/30 transition-all duration-500 min-h-[320px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-teal/5 to-transparent pointer-events-none" />
                <p className="text-brand-teal font-mono text-xs uppercase tracking-widest mb-4">Live</p>
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-brand-teal transition-colors duration-500">BrokerOS</h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-lg mt-auto">
                  The structured workspace for insurance brokers. Manage clients, policies, RFQs, quotes, commissions, and documents — all in one place, with nothing falling through the cracks.
                </p>
              </Link>
            </motion.div>

            {/* ClientOS + Platform API stacked */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/products" className="group flex flex-col p-8 md:p-10 bg-gradient-to-br from-brand-terracotta/10 to-transparent border border-white/10 rounded-3xl hover:border-brand-terracotta/30 transition-all duration-500">
                  <p className="text-brand-terracotta font-mono text-xs uppercase tracking-widest mb-3">In Development</p>
                  <h3 className="font-serif text-3xl font-bold text-white mb-3 group-hover:text-brand-terracotta transition-colors duration-500">ClientOS</h3>
                  <p className="text-white/50 leading-relaxed">
                    A client-facing interface so policyholders can view their coverage, track renewals, and share documents — without emailing their broker for every update.
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col p-8 md:p-10 bg-white/[0.03] border border-white/5 rounded-3xl"
              >
                <p className="text-white/20 font-mono text-xs uppercase tracking-widest mb-3">On the Horizon</p>
                <h3 className="font-serif text-3xl font-bold text-white/30 mb-3">Fabric</h3>
                <p className="text-white/30 leading-relaxed">
                  The long-term vision: a shared data layer that connects every tool in the insurance workflow. Early research, not yet in production.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDERS ─── */}
      <section className="w-full border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mb-16">
              &ldquo;We kept seeing brokers lose deals because their data lived in six different places. We decided to fix it.&rdquo;
            </h2>
          </motion.div>

          {/* PLACEHOLDER — replace with real bios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {[
              { color: "text-brand-teal" },
              { color: "text-brand-terracotta" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h3 className="font-bold text-xl text-white">[Founder Name]</h3>
                <p className={`${f.color} font-medium`}>Co-Founder</p>
                <p className="text-white/50 leading-relaxed">
                  [Bio to be added]
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full relative z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-white/30 mb-4">Get in Touch</p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              We&rsquo;re early, we&rsquo;re building,<br />and we&rsquo;d love to talk.
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              Whether you&rsquo;re a brokerage tired of your current tools, an investor interested in insurance infrastructure, or just curious — we&rsquo;d love to hear from you.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto space-y-4 bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/10"
          >
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1" htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Jane Doe" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white/5 text-white placeholder-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="jane@example.com" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white/5 text-white placeholder-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1" htmlFor="message">Message</label>
              <textarea id="message" rows={3} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white/5 text-white placeholder-white/30"></textarea>
            </div>
            <Button variant="primary" className="w-full mt-2">
              Send inquiry
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
