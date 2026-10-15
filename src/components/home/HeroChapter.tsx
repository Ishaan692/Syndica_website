"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

export default function HeroChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleCardRef = useRef<HTMLDivElement>(null);
  const beamLineRef = useRef<HTMLDivElement>(null);
  const lockupWrapperRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const headlineCardRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const bodyTextRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Helper to control top bar and nav logo visibility/pointer events
    const setNavState = (topbar: number, logo: number) => {
      document.documentElement.style.setProperty("--nav-topbar-opacity", String(topbar));
      document.documentElement.style.setProperty("--nav-logo-opacity", String(logo));
      document.documentElement.style.setProperty(
        "--nav-topbar-pointer-events",
        topbar > 0.5 ? "auto" : "none"
      );
      document.documentElement.style.setProperty(
        "--nav-logo-pointer-events",
        logo > 0.5 ? "auto" : "none"
      );
      document.documentElement.style.setProperty(
        "--nav-header-pointer-events",
        topbar > 0.1 || logo > 0.1 ? "auto" : "none"
      );
    };

    if (window.scrollY > 100) {
      setNavState(1, 1);
    } else {
      setNavState(0, 0);
    }

    if (!containerRef.current || prefersReducedMotion) {
      setNavState(1, 1);
      return;
    }

    if (!isDesktop) {
      // Mobile fallback: hide top bar on initial hero screen, fade in when scrolling toward headline
      const mobileTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "35% top",
        scrub: 0.5,
        onUpdate: (self) => {
          setNavState(self.progress, self.progress);
        },
      });

      return () => {
        mobileTrigger.kill();
        setNavState(1, 1);
      };
    }

    const ctx = gsap.context(() => {
      // Initially hide the headline card completely so NO letter-tops can ever leak as dashes
      gsap.set(headlineCardRef.current, { opacity: 0, pointerEvents: "none" });
      gsap.set([headlineLine1Ref.current, headlineLine2Ref.current], { yPercent: 125 });
      gsap.set([bodyTextRef.current, buttonsRef.current], { opacity: 0, y: 20 });

      // ─── 1. LOAD TIMELINE (plays once on load, ~2s) ───
      const loadTl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      // 0.0s: Continuous beam line draws down directly into the top of the logo needle
      loadTl.fromTo(
        beamLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.1, ease: "power2.inOut" },
        0
      );

      // 0.5s: Clean transparent lockup fades in with radiant ignite
      loadTl.fromTo(
        lockupWrapperRef.current,
        { opacity: 0, scale: 1.04, filter: "brightness(2.2)" },
        { opacity: 1, scale: 1.0, filter: "brightness(1.0)", duration: 1.4, ease: "expo.out" },
        0.5
      );

      // 1.4s: Bottom mono line fades in
      loadTl.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.4
      );

      // ─── 2. PINNED SCROLL MORPH (+=260% scroll length) ───
      const morphTl = gsap.timeline({
        onUpdate: function () {
          const t = this.time();
          // The logo moves toward top-left from 0.12 to 0.50.
          // The top bar only appears when the syndica logo has actually reached and gone into the top bar (0.48 to 0.54):
          const progress = t <= 0.48 ? 0 : t >= 0.54 ? 1 : (t - 0.48) / 0.06;
          const smoothP = progress * progress * (3 - 2 * progress);
          setNavState(smoothP, smoothP);
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => tweenArtStage("01a"),
          onEnterBack: () => tweenArtStage("01a"),
        },
      });

      // 0.00 - 0.12: Hold on title card

      // 0.12 - 0.22: Mono line and beam line fade out
      morphTl.to(
        bottomBarRef.current,
        { opacity: 0, duration: 0.1, ease: "power1.out" },
        0.12
      );
      morphTl.to(
        beamLineRef.current,
        { opacity: 0, duration: 0.1, ease: "power1.out" },
        0.12
      );

      // 0.12 - 0.50: Clean lockup moves and scales toward nav-logo slot (top-left)
      morphTl.to(
        lockupWrapperRef.current,
        {
          x: "-38vw",
          y: "-40vh",
          scale: 0.22,
          duration: 0.38,
          ease: "power2.inOut",
        },
        0.12
      );

      // 0.46 - 0.54: Crossfade lockup out as it docks into nav logo
      morphTl.to(
        lockupWrapperRef.current,
        {
          opacity: 0,
          duration: 0.08,
          ease: "power1.in",
        },
        0.46
      );

      // 0.30 - 0.62: ArtStage transitions from 01a to 01b
      morphTl.to(
        {},
        {
          duration: 0.32,
          onStart: () => tweenArtStage("01b", 1.2),
          onReverseComplete: () => tweenArtStage("01a", 1.2),
        },
        0.3
      );

      // 0.40: Fade in headline card container
      morphTl.to(
        headlineCardRef.current,
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.1,
          ease: "none",
        },
        0.40
      );

      // 0.42 - 0.62: HEADLINE CARD LINE REVEAL
      morphTl.to(
        headlineLine1Ref.current,
        { yPercent: 0, duration: 0.15, ease: "expo.out" },
        0.42
      );
      morphTl.to(
        headlineLine2Ref.current,
        { yPercent: 0, duration: 0.15, ease: "expo.out" },
        0.46
      );

      // 0.52 - 0.70: Body text & buttons fade in
      morphTl.to(
        bodyTextRef.current,
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.52
      );
      morphTl.to(
        buttonsRef.current,
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.56
      );

      // 0.70 - 1.00: Hold so duration is full 1.0s
      morphTl.to({}, { duration: 0.3 }, 0.70);
    }, containerRef);

    return () => {
      ctx.revert();
      setNavState(1, 1);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-folio="01"
      data-name="HERO"
      className="relative w-full min-h-[100svh] overflow-hidden select-none bg-[#0A0A0B]"
    >
      {/* ─── DESKTOP PINNED COMPOSITION ─── */}
      <div className="hidden lg:block relative w-full h-[100svh]">
        {/* Continuous Beam Line from top of screen directly to top of logo needle */}
        <div
          ref={beamLineRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] pointer-events-none z-10"
          style={{
            height: "calc(50vh - 140px)",
            background: "linear-gradient(180deg, transparent 0%, #ECE8DF 40%, #FFFFFF 100%)",
            boxShadow: "0 0 16px rgba(236,232,223,0.8), 0 0 32px rgba(255,255,255,0.4)",
          }}
        />

        {/* TITLE CARD LAYER */}
        <div
          ref={titleCardRef}
          className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-20 pt-16 pb-8"
        >
          {/* Spacer aligning with beam line */}
          <div className="h-4" />

          {/* Centered Lockup using transparent clean PNG (NO black bounding box) */}
          <div
            ref={lockupWrapperRef}
            className="relative my-auto flex items-center justify-center"
            style={{
              width: "min(52vw, 820px)",
              mixBlendMode: "screen",
            }}
          >
            <Image
              src="/brand/syndica-lockup-clean.png"
              alt="Syndica Logo Lockup"
              width={1024}
              height={531}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Bottom Edge Mono Line */}
          <div
            ref={bottomBarRef}
            className="container-grid w-full flex items-center justify-between text-xs font-mono text-[rgba(236,232,223,0.68)] pt-4"
          >
            <span data-reading>SOFTWARE THAT PUTS WORK IN ORDER</span>
            <div className="flex flex-col items-center gap-1.5" data-reading>
              <span>SCROLL</span>
              <div className="w-[1px] h-12 bg-[#ECE8DF] animate-pulse origin-top" />
            </div>
          </div>
        </div>

        {/* HEADLINE CARD LAYER (Cleanly hidden at scroll 0 so zero letters peek out as dashes) */}
        <div
          ref={headlineCardRef}
          className="container-grid absolute inset-0 flex flex-col justify-end pb-[14vh] z-30"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <div className="max-w-4xl flex flex-col items-start">
            <h1 className="display-xl -ml-[0.04em] mb-8" data-skew>
              <div className="overflow-hidden leading-[0.9]">
                <div ref={headlineLine1Ref} className="reveal-line">
                  ORDER IS
                </div>
              </div>
              <div className="overflow-hidden leading-[0.9]">
                <div ref={headlineLine2Ref} className="reveal-line">
                  A PRODUCT.
                </div>
              </div>
            </h1>

            <div ref={bodyTextRef} className="max-w-[46ch] mb-10">
              <p className="body-l text-[rgba(236,232,223,0.78)]" data-reading>
                Most work still lives in spreadsheets, PDFs, inboxes and memory. We build the software that puts it in order, starting with commercial insurance. BrokerOS is live today. The rest is being built on top of it.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
              <Button href="/products/brokeros" variant="primary">
                Explore BrokerOS
              </Button>
              <Button href="/contact?interest=brokeros" variant="secondary">
                Pilot with us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE STACKED SCREENS (under 1024px) ─── */}
      <div className="block lg:hidden w-full">
        {/* Screen 1: Lockup + Mono Line */}
        <div className="min-h-[92svh] flex flex-col justify-between items-center px-6 pt-24 pb-12">
          <div className="w-full flex justify-center py-4">
            <div className="w-[1px] h-16 bg-[#ECE8DF] opacity-50" />
          </div>

          <div
            className="w-full max-w-sm my-auto"
            style={{
              mixBlendMode: "screen",
            }}
          >
            <Image
              src="/brand/syndica-lockup-clean.png"
              alt="Syndica"
              width={1024}
              height={531}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="w-full flex justify-between items-center text-[11px] font-mono text-[rgba(236,232,223,0.6)] pt-6 border-t border-[rgba(236,232,223,0.08)]">
            <span data-reading>SOFTWARE THAT PUTS WORK IN ORDER</span>
            <span>SCROLL &darr;</span>
          </div>
        </div>

        {/* Screen 2: Headline Card */}
        <div className="min-h-[100svh] flex flex-col justify-center px-6 py-16 border-t border-[rgba(236,232,223,0.14)]">
          <h1 className="display-xl -ml-[0.04em] mb-6">
            ORDER IS<br />A PRODUCT.
          </h1>

          <p className="body-l text-[rgba(236,232,223,0.78)] mb-8" data-reading>
            Most work still lives in spreadsheets, PDFs, inboxes and memory. We build the software that puts it in order, starting with commercial insurance. BrokerOS is live. The rest is being built on top of it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/products/brokeros" variant="primary">
              Explore BrokerOS
            </Button>
            <Button href="/contact?interest=brokeros" variant="secondary">
              Pilot with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
