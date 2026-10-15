"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({ lenis: null });

export const useScrollContext = () => useContext(ScrollContext);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false, // touch devices use native scroll
    });

    setLenisInstance(lenis);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // VELOCITY SKEW on elements marked [data-skew]
    const skewElements = document.querySelectorAll<HTMLElement>("[data-skew]");
    if (skewElements.length > 0) {
      const skewSetters = Array.from(skewElements).map((el) =>
        gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3.out" })
      );

      lenis.on("scroll", (e: { velocity: number }) => {
        const targetSkew = gsap.utils.clamp(-2.5, 2.5, (e.velocity || 0) / -400);
        skewSetters.forEach((setter) => setter(targetSkew));
      });
    }

    // Refresh after fonts are ready and images decode
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </ScrollContext.Provider>
  );
}
