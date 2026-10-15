"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import StatusMark from "./StatusMark";
import { products, type Product } from "@/content/products";

interface ProductIndexListProps {
  showHowItConnects?: boolean;
}

export default function ProductIndexList({ showHowItConnects = false }: ProductIndexListProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const toggleAccordion = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="w-full">
      {/* Legend of the four status marks (rendered once) */}
      <div className="pb-8 pt-4 border-b border-[rgba(236,232,223,0.14)] flex flex-wrap gap-8 items-center text-xs font-mono text-[rgba(236,232,223,0.68)]">
        <StatusMark status="live" label="LIVE · PILOT IN PROGRESS" />
        <StatusMark status="dev" label="IN DEVELOPMENT" />
        <StatusMark status="planned" label="PLANNED · 2026" />
        <StatusMark status="research" label="IN RESEARCH" />
      </div>

      {/* Index List: 5 rows divided by rules, no cards */}
      <div className="divide-y divide-[rgba(236,232,223,0.14)]">
        {products.map((p, idx) => {
          const indexNum = String(idx + 1).padStart(2, "0");
          const isBrokerOS = p.slug === "brokeros";
          const isExpanded = expandedSlug === p.slug;

          const rowContent = (
            <div
              className={`w-full group transition-colors duration-200 hover:bg-[#111113] ${
                isBrokerOS ? "py-14" : "py-8"
              } px-2 sm:px-4`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                {/* Folio */}
                <div className="md:col-span-1 font-mono text-sm text-[rgba(236,232,223,0.44)]">
                  {indexNum}
                </div>

                {/* Name */}
                <div className="md:col-span-4">
                  <h3
                    className="font-display font-semibold transition-transform duration-200 group-hover:translate-x-2 text-[#ECE8DF]"
                    style={{
                      fontSize: "clamp(36px, 5vw, 84px)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {p.name}
                  </h3>
                </div>

                {/* One-liner */}
                <div className="md:col-span-4 body-default text-[rgba(236,232,223,0.68)]">
                  {p.oneLiner}
                </div>

                {/* StatusMark */}
                <div className="md:col-span-3 flex justify-start md:justify-end items-center">
                  <StatusMark status={p.status} label={p.statusLabel} />
                </div>
              </div>

              {/* Accordion content for rows without a standalone page */}
              {!p.hasPage && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-2 pl-0 md:pl-28 max-w-3xl">
                        <p className="body-l text-[rgba(236,232,223,0.8)] mb-3">
                          {p.description}
                        </p>
                        {showHowItConnects && p.howItConnects && (
                          <div className="pt-2 border-t border-[rgba(236,232,223,0.06)]">
                            <span className="font-mono text-xs uppercase tracking-wider text-[rgba(236,232,223,0.44)] block mb-1">
                              How it connects
                            </span>
                            <p className="body-default text-[rgba(236,232,223,0.68)]">
                              {p.howItConnects}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );

          if (p.hasPage) {
            return (
              <div key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="block focus-visible:outline-[#FF4F2B]"
                  aria-label={`View ${p.name}`}
                >
                  {rowContent}
                </Link>
              </div>
            );
          }

          return (
            <div key={p.slug}>
              <button
                type="button"
                onClick={() => toggleAccordion(p.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleAccordion(p.slug);
                  }
                }}
                className="w-full text-left focus-visible:outline-[#FF4F2B]"
                aria-expanded={isExpanded}
              >
                {rowContent}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
