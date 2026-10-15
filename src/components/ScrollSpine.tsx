"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const [currentSection, setCurrentSection] = useState<{
    folio: string;
    name: string;
  }>({ folio: "01", name: "HERO" });

  useEffect(() => {
    // Delay slightly to ensure pinned sections have registered their pin-spacers
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>("[data-folio][data-name]");
      const triggers: ScrollTrigger[] = [];

      sections.forEach((sec) => {
        const folio = sec.getAttribute("data-folio");
        const name = sec.getAttribute("data-name");
        if (!folio || !name) return;

        const st = ScrollTrigger.create({
          trigger: sec,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentSection({ folio, name }),
          onEnterBack: () => setCurrentSection({ folio, name }),
        });
        triggers.push(st);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-[20px] top-0 bottom-0 w-[1px] bg-[rgba(236,232,223,0.14)] z-40 hidden xl:block pointer-events-none select-none"
    >
      {/* Paper fill growing with scroll */}
      <motion.div
        className="w-full bg-[#ECE8DF] origin-top"
        style={{ height: "100%", scaleY }}
      />

      {/* 6px signal square riding at the fill's end */}
      <motion.div
        className="absolute -left-[2.5px] w-[6px] h-[6px] bg-[#FF4F2B]"
        style={{
          top: useTransform(scaleY, (v) => `${v * 100}%`),
          translateY: "-50%",
        }}
      />

      {/* Section Folio Label */}
      <div className="absolute top-28 left-3 flex items-center">
        <span
          className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          {currentSection.folio} {currentSection.name}
        </span>
      </div>
    </div>
  );
}
