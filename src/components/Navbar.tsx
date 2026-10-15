"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import StatusMark from "./StatusMark";

const NAV_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/products", label: "Products", hasDropdown: true },
  { href: "/vision", label: "Vision" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure all nav elements are immediately visible when on non-home pages
  useEffect(() => {
    if (!isHome) {
      document.documentElement.style.setProperty("--nav-topbar-opacity", "1");
      document.documentElement.style.setProperty("--nav-logo-opacity", "1");
      document.documentElement.style.setProperty("--nav-topbar-pointer-events", "auto");
      document.documentElement.style.setProperty("--nav-logo-pointer-events", "auto");
      document.documentElement.style.setProperty("--nav-header-pointer-events", "auto");
    }
  }, [isHome]);

  // Close mobile nav & dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-colors duration-200 select-none ${
          scrolled
            ? "bg-[#0A0A0B] border-b border-[rgba(236,232,223,0.14)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          opacity: isHome ? "var(--nav-topbar-opacity, 0)" : "1",
          pointerEvents: isHome
            ? ("var(--nav-header-pointer-events, none)" as any)
            : "auto",
        }}
      >
        <div className="container-grid h-full flex items-center justify-between">
          {/* Left: Mark + Extended Wordmark */}
          <Link
            id="nav-brand-logo"
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none"
            style={{
              opacity: isHome ? "var(--nav-logo-opacity, 0)" : "1",
              pointerEvents: isHome
                ? ("var(--nav-logo-pointer-events, none)" as any)
                : "auto",
            }}
            aria-label="Syndica Home"
          >
            <div className="h-7 w-auto flex items-center justify-center flex-shrink-0">
              <Image
                src="/brand/syndica-mark.webp"
                alt="Syndica Mark"
                width={20}
                height={28}
                className="h-7 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
                priority
              />
            </div>
            <span
              className="wordmark text-[14px] text-[#ECE8DF] group-hover:text-white transition-colors"
            >
              SYNDICA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 text-[13px] font-display uppercase tracking-[0.12em] font-medium"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onFocus={() => setDropdownOpen(true)}
                      className={`relative py-2 text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors inline-flex items-center gap-1 ${
                        isActive ? "text-[#ECE8DF]" : ""
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#ECE8DF]" />
                      )}
                    </Link>

                    {/* Flat Dropdown Panel (NO BLUR, --ink-2, 1px rule, radius 4px) */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 top-full mt-2 w-64 bg-[#111113] border border-[rgba(236,232,223,0.14)] rounded-[4px] p-2 shadow-2xl z-50"
                        >
                          <Link
                            href="/products/brokeros"
                            className="block p-3 rounded-[2px] hover:bg-[#1A1A1D] transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[13px] font-display font-semibold tracking-wider text-[#ECE8DF]">
                                BrokerOS
                              </span>
                              <StatusMark status="live" label="LIVE" />
                            </div>
                            <p className="text-[11px] font-mono lowercase tracking-normal text-[rgba(236,232,223,0.44)] normal-case">
                              Commercial brokerage workspace
                            </p>
                          </Link>

                          <div className="my-1 border-t border-[rgba(236,232,223,0.06)]" />

                          <Link
                            href="/products"
                            className="block p-3 rounded-[2px] hover:bg-[#1A1A1D] transition-colors text-[12px] font-mono text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF]"
                          >
                            All products →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-[rgba(236,232,223,0.68)] hover:text-[#ECE8DF] transition-colors ${
                    isActive ? "text-[#ECE8DF]" : ""
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#ECE8DF]" />
                  )}
                </Link>
              );
            })}

            {/* Pilot with us CTA with line arrow */}
            <Link
              href="/contact?interest=brokeros"
              className="inline-flex items-center gap-2 pl-4 text-[#ECE8DF] hover:text-white transition-colors group"
            >
              <span className="font-semibold text-[13px] tracking-[0.12em]">
                Pilot with us
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M2.5 8H13.5M13.5 8L8.5 3M13.5 8L8.5 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#ECE8DF] focus-visible:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-[1px] bg-[#ECE8DF] transition-transform duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[7.5px]" : ""
                }`}
              />
              <span
                className={`w-full h-[1px] bg-[#ECE8DF] transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-[1px] bg-[#ECE8DF] transition-transform duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay (solid ink, line-by-line reveal) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0A0A0B] z-40 md:hidden flex flex-col justify-between px-6 pt-28 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6">
              {[
                { href: "/", label: "Home" },
                { href: "/products/brokeros", label: "BrokerOS" },
                { href: "/products", label: "All Products" },
                { href: "/platform", label: "Platform" },
                { href: "/vision", label: "Vision" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="heading-hero text-3xl sm:text-4xl text-[#ECE8DF] hover:text-white block py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="pt-8 border-t border-[rgba(236,232,223,0.14)]"
            >
              <Link
                href="/contact?interest=brokeros"
                className="w-full inline-flex items-center justify-center h-[52px] bg-[#ECE8DF] text-[#0A0A0B] rounded-[2px] font-display text-[13px] font-semibold uppercase tracking-[0.12em]"
              >
                Pilot with us →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
