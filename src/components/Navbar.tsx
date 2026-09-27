"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isDarkPage = pathname === '/products' || pathname === '/vision';
  
  // Crossfade backgrounds between light mode (hero) and dark mode (rest)
  const lightProgress = useTransform(scrollY, [200, 800], [1, 0]);
  const darkProgress = useTransform(scrollY, [200, 800], [0, 1]);
  
  // Interpolate text color from dark grey to white
  const textColorTransform = useTransform(scrollY, [200, 800], ["#1a1a1a", "#ffffff"]);

  const lightOpacity = isDarkPage ? 0 : lightProgress;
  const darkOpacity = isDarkPage ? 1 : darkProgress;
  const finalTextColor = isDarkPage ? "#ffffff" : textColorTransform;

  return (
    <motion.nav 
      style={{ color: finalTextColor }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4 md:px-12 pointer-events-none transition-all duration-300"
    >
      {/* Light background layer */}
      <motion.div 
        style={{ opacity: lightOpacity }}
        className="absolute inset-0 bg-[#faf9f8]/80 backdrop-blur-md border-b border-black/5 z-[-1]"
      />
      {/* Dark background layer */}
      <motion.div 
        style={{ opacity: darkOpacity }}
        className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-md border-b border-white/5 z-[-1]"
      />

      <Link href="/" className="font-serif text-2xl font-bold tracking-tight pointer-events-auto transition-opacity hover:opacity-70">
        Syndica.
      </Link>
      
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium pointer-events-auto">
        <Link href="/" className="transition-opacity hover:opacity-70">
          Home
        </Link>
        <Link href="/#platform" className="transition-opacity hover:opacity-70">
          Platform
        </Link>
        <Link href="/products" className="transition-opacity hover:opacity-70">
          Products
        </Link>
        <Link href="/vision" className="transition-opacity hover:opacity-70">
          Vision
        </Link>
        <a href="mailto:hello@syndica.com" className="transition-opacity hover:opacity-70">
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
