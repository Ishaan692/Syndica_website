"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import ProductFrame from "./ProductFrame";
import ScreenSkeleton from "./ScreenSkeleton";

const DEAL_STEPS = [
  {
    num: "01",
    node: "RFQ",
    path: "BrokerOS / RFQs",
    skeletonVariant: "rfq" as const,
    title: "Start with the request.",
    body: "The client, the risk and the insurers you plan to approach, recorded once. BrokerOS suggests insurers from the product appetite and relationship strength you have noted.",
  },
  {
    num: "02",
    node: "QCR",
    path: "BrokerOS / QCR",
    skeletonVariant: "qcr" as const,
    title: "Put the quotes side by side.",
    body: "Quotes from every carrier land in one comparison. Premium and terms are in one table, not five attachments.",
  },
  {
    num: "03",
    node: "POLICY",
    path: "BrokerOS / Policies",
    skeletonVariant: "policy" as const,
    title: "The winning quote becomes the policy.",
    body: "The policy keeps its link to the RFQ and quote it came from, and the documents are generated in the formats brokers actually send.",
  },
  {
    num: "04",
    node: "COMMISSION",
    path: "BrokerOS / Commissions",
    skeletonVariant: "commission" as const,
    title: "Commission follows the policy.",
    body: "Commission is tracked against the policy that earned it, separate from premium.",
  },
];

export default function BrokerDealScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(3, Math.floor(latest * 4));
      setActiveStep(stepIndex);
    });
  }, [scrollYProgress]);

  const step = DEAL_STEPS[activeStep];

  return (
    <section
      ref={containerRef}
      id="deal-flow"
      data-folio="02"
      data-name="THE DEAL, ONE FLOW"
      className="relative w-full"
    >
      {/* DESKTOP SCROLLYTELLING (400vh tall with sticky 100svh stage) */}
      <div className="hidden lg:block relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-24 overflow-hidden">
          {/* Top Rail: four nodes joined by a rule */}
          <div className="container-grid w-full">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[11px] text-[#ECE8DF]">02</span>
              <span className="folio-label">THE DEAL, ONE FLOW</span>
            </div>

            <div className="relative flex items-center justify-between max-w-2xl pt-4">
              {/* Background hairline rule */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[rgba(236,232,223,0.14)] -translate-y-1/2 z-0" />
              {/* Progress filled rule */}
              <div
                className="absolute top-1/2 left-0 h-[1px] bg-[#ECE8DF] -translate-y-1/2 z-0 transition-all duration-300"
                style={{
                  width: `${(activeStep / (DEAL_STEPS.length - 1)) * 100}%`,
                }}
              />

              {DEAL_STEPS.map((s, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep >= idx;

                return (
                  <div
                    key={s.node}
                    className="relative z-10 flex items-center gap-2 bg-[#0A0A0B] px-3 py-1 border border-[rgba(236,232,223,0.14)]"
                  >
                    <span
                      className={`w-[7px] h-[7px] transition-colors duration-200 ${
                        isActive
                          ? "bg-[#FF4F2B]"
                          : isPassed
                          ? "bg-[#ECE8DF]"
                          : "border border-[rgba(236,232,223,0.3)] bg-transparent"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                        isActive
                          ? "text-[#ECE8DF] font-semibold"
                          : isPassed
                          ? "text-[#ECE8DF]"
                          : "text-[rgba(236,232,223,0.44)]"
                      }`}
                    >
                      {s.node}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Stage Content: Left copy / Right frame */}
          <div className="container-grid w-full my-auto">
            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Left: Columns 1-5 */}
              <div className="col-span-5 flex flex-col justify-center min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="font-mono text-xs text-[rgba(236,232,223,0.44)] mb-4">
                      {step.num} / 04
                    </div>
                    <h2 className="heading-sub mb-6">{step.title}</h2>
                    <p className="body-l text-[rgba(236,232,223,0.68)]">{step.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Columns 6-12 */}
              <div className="col-span-7 pl-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <ProductFrame path={step.path} tag="ILLUSTRATION">
                      <ScreenSkeleton variant={step.skeletonVariant} />
                    </ProductFrame>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="container-grid w-full">
            <span className="font-mono text-[11px] text-[rgba(236,232,223,0.35)]">
              STAGE {step.num} · CANONICAL DEAL RECORD
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE STACKED STEPS (under 1024px: no sticky, stacked steps) */}
      <div className="block lg:hidden py-16">
        <div className="container-grid">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">02</span>
            <span className="folio-label">THE DEAL, ONE FLOW</span>
          </div>

          <div className="flex flex-col gap-16 mt-8">
            {DEAL_STEPS.map((s) => (
              <div
                key={s.num}
                className="flex flex-col gap-6 pb-12 border-b border-[rgba(236,232,223,0.14)]"
              >
                <div className="font-mono text-xs text-[#FF4F2B]">
                  {s.num} / 04 · {s.node}
                </div>
                <h2 className="heading-sub">{s.title}</h2>
                <p className="body-default">{s.body}</p>
                <ProductFrame path={s.path} tag="ILLUSTRATION">
                  <ScreenSkeleton variant={s.skeletonVariant} />
                </ProductFrame>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
