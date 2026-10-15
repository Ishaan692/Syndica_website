"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const DOCUMENTS = [
  { name: "RFQ.PDF", title: "Request for Quote" },
  { name: "QCR.PDF", title: "Quote Comparison Report" },
  { name: "PLACEMENT_SLIP.PDF", title: "Placement Slip" },
  { name: "PLACEMENT_LETTER.PDF", title: "Placement Letter" },
  { name: "RISK_COVER_LETTER.PDF", title: "Risk Cover Letter" },
  { name: "POLICY_COVER_LETTER.PDF", title: "Policy Cover Letter" },
  { name: "POLICY_COVER_PAGE.PDF", title: "Policy Cover Page" },
];

export default function BrokerDocumentsPaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const rotations = [-9, -6, -3, 0, 3, 6, 9];
  const xOffsets = [-150, -100, -50, 0, 50, 100, 150];

  return (
    <section
      ref={containerRef}
      data-folio="03"
      data-name="DOCUMENTS"
      className="relative w-full py-28 md:py-36 bg-[#ECE8DF] text-[#0A0A0B] border-y border-[rgba(10,10,11,0.16)] select-none overflow-hidden"
    >
      <div className="container-grid mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#0A0A0B]">03</span>
          <span className="font-display font-medium text-[11px] uppercase tracking-[0.18em] text-[rgba(10,10,11,0.66)]">
            DOCUMENTS
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0A0A0B] mb-6">
          The paperwork, generated.
        </h2>

        <p className="font-sans text-xl text-[rgba(10,10,11,0.66)] max-w-2xl leading-relaxed">
          Seven documents, produced as PDFs from the records already in BrokerOS: RFQ, QCR, Placement Slip, Placement Letter, Risk Cover Letter, Policy Cover Letter and Policy Cover Page.
        </p>
      </div>

      {/* DESKTOP: FANNING PAPERS */}
      <div className="hidden lg:flex items-center justify-center min-h-[460px] relative w-full pt-6 pb-12 overflow-visible">
        <div className="relative w-[280px] h-[380px]">
          {DOCUMENTS.map((doc, idx) => {
            const rot = rotations[idx];
            const xOff = xOffsets[idx];

            return (
              <motion.div
                key={doc.name}
                initial={{
                  rotate: 0,
                  x: 0,
                  y: 0,
                }}
                animate={
                  isInView || shouldReduceMotion
                    ? {
                        rotate: shouldReduceMotion ? 0 : rot,
                        x: shouldReduceMotion ? 0 : xOff,
                        y: 0,
                      }
                    : { rotate: 0, x: 0, y: 0 }
                }
                transition={{
                  duration: 0.9,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 rounded-[2px] bg-[#F7F4EC] border border-[rgba(10,10,11,0.12)] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.18)] origin-bottom"
                style={{
                  zIndex: idx + 1,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[rgba(10,10,11,0.08)] pb-3">
                  <span className="font-mono text-[10px] text-[rgba(10,10,11,0.66)] uppercase">
                    {doc.name}
                  </span>
                  <span className="w-1.5 h-1.5 bg-[rgba(10,10,11,0.2)] rounded-full" />
                </div>

                {/* Abstract rule lines in light gray (no fake legal text or numbers) */}
                <div className="flex-1 py-6 flex flex-col gap-2.5 opacity-60">
                  <div className="w-1/2 h-2.5 bg-[rgba(10,10,11,0.2)] rounded-[1px] mb-2" />
                  <div className="w-full h-1.5 bg-[rgba(10,10,11,0.1)] rounded-[1px]" />
                  <div className="w-5/6 h-1.5 bg-[rgba(10,10,11,0.1)] rounded-[1px]" />
                  <div className="w-4/6 h-1.5 bg-[rgba(10,10,11,0.1)] rounded-[1px]" />
                  <div className="w-full h-1.5 bg-[rgba(10,10,11,0.08)] rounded-[1px] mt-4" />
                  <div className="w-3/4 h-1.5 bg-[rgba(10,10,11,0.08)] rounded-[1px]" />
                  <div className="w-5/6 h-1.5 bg-[rgba(10,10,11,0.08)] rounded-[1px]" />
                  <div className="w-2/3 h-1.5 bg-[rgba(10,10,11,0.08)] rounded-[1px]" />
                </div>

                {/* Footer rule */}
                <div className="pt-3 border-t border-[rgba(10,10,11,0.08)] flex justify-between items-center text-[9px] font-mono text-[rgba(10,10,11,0.44)]">
                  <span>SYNDICA / BROKEROS</span>
                  <span>CANONICAL</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MOBILE: HORIZONTAL SNAP-SCROLL ROW */}
      <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory px-6 gap-4 pb-6 scrollbar-none">
        {DOCUMENTS.map((doc) => (
          <div
            key={doc.name}
            className="flex-shrink-0 w-[240px] h-[330px] snap-center rounded-[2px] bg-[#F7F4EC] border border-[rgba(10,10,11,0.12)] p-5 flex flex-col justify-between shadow-[0_12px_24px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between border-b border-[rgba(10,10,11,0.08)] pb-2">
              <span className="font-mono text-[10px] text-[rgba(10,10,11,0.66)] uppercase">
                {doc.name}
              </span>
              <span className="w-1.5 h-1.5 bg-[rgba(10,10,11,0.2)] rounded-full" />
            </div>

            <div className="flex-1 py-4 flex flex-col gap-2 opacity-60">
              <div className="w-1/2 h-2 bg-[rgba(10,10,11,0.2)] rounded-[1px] mb-2" />
              <div className="w-full h-1 bg-[rgba(10,10,11,0.1)] rounded-[1px]" />
              <div className="w-5/6 h-1 bg-[rgba(10,10,11,0.1)] rounded-[1px]" />
              <div className="w-4/6 h-1 bg-[rgba(10,10,11,0.1)] rounded-[1px]" />
              <div className="w-full h-1 bg-[rgba(10,10,11,0.08)] rounded-[1px] mt-2" />
              <div className="w-3/4 h-1 bg-[rgba(10,10,11,0.08)] rounded-[1px]" />
            </div>

            <div className="pt-2 border-t border-[rgba(10,10,11,0.08)] flex justify-between items-center text-[9px] font-mono text-[rgba(10,10,11,0.44)]">
              <span>SYNDICA / BROKEROS</span>
              <span>CANONICAL</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
