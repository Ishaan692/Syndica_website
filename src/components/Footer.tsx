"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/content/products";
import StatusMark from "./StatusMark";
import { HalftoneWordmark } from "@/components/ui/halftone-wordmark-footer";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#0A0A0B] border-t border-[rgba(236,232,223,0.14)] relative overflow-hidden select-none z-10 pt-20"
    >
      <div className="container-grid">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Column 1: Products */}
          <div className="md:col-span-6">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] mb-6">
              Products
            </h3>
            <ul className="space-y-4">
              {products.map((p) => (
                <li key={p.slug} className="flex items-center justify-between max-w-sm">
                  {p.hasPage ? (
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-display text-sm uppercase tracking-wider text-[#ECE8DF] hover:underline"
                    >
                      {p.name}
                    </Link>
                  ) : (
                    <span className="font-display text-sm uppercase tracking-wider text-[rgba(236,232,223,0.68)]">
                      {p.name}
                    </span>
                  )}
                  <StatusMark status={p.status} label={p.statusLabel} />
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] mb-6">
              Company
            </h3>
            <ul className="space-y-3 font-display text-sm uppercase tracking-wider">
              <li>
                <Link
                  href="/platform"
                  className="text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/vision"
                  className="text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Elsewhere */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] mb-6">
              Elsewhere
            </h3>
            <ul className="space-y-3 font-display text-sm uppercase tracking-wider">
              <li>
                <a
                  href="https://x.com/syndica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/syndica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright rule */}
        <div className="pt-8 pb-4 border-t border-[rgba(236,232,223,0.06)] flex items-center justify-between text-[11px] font-mono text-[rgba(236,232,223,0.44)]">
          <span>© 2026 Syndica</span>
          <span>SYSTEMS FOR COMPLEX WORK</span>
        </div>

        {/* Cropped Brand Mark */}
        <div className="flex justify-center mt-12 mb-2">
          <Image
            src="/brand/syndica-mark.webp"
            alt="Syndica Mark"
            width={48}
            height={68}
            className="w-10 h-auto object-contain opacity-70"
            style={{
              mixBlendMode: "screen",
              filter: "drop-shadow(0 0 12px rgba(255,255,255,0.2))",
            }}
          />
        </div>
      </div>

      {/* Interactive Halftone SYNDICA Wordmark */}
      <div className="w-full relative mt-2">
        <HalftoneWordmark
          wordmark="SYNDICA"
          height="clamp(180px, 24vw, 320px)"
          crop={0}
          fitRatio={0.92}
          dotGap={5}
          radius={85}
          fontFamily="var(--font-display), Archivo, sans-serif"
          fontWeight={800}
          fontVariationSettings='"wdth" 125'
          palette={{
            background: "#0A0A0B",
            ink: "#ECE8DF",
            warm: "#FF4F2B",
          }}
          className="w-full"
        />
      </div>
    </footer>
  );
}

