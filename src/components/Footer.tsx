"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isDarkPage = pathname === '/products' || pathname === '/vision';

  return (
    <footer className={`w-full px-6 py-12 md:px-12 border-t transition-colors ${isDarkPage ? 'bg-[#0a0a0a] border-white/10 text-white' : 'border-foreground/5 text-foreground'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-serif text-xl font-bold tracking-tight">
          Syndica.
        </div>
        
        <div className={`flex items-center gap-6 text-sm font-medium ${isDarkPage ? 'text-white/60' : 'text-foreground/60'}`}>
          <Link href="/products" className={`transition-colors ${isDarkPage ? 'hover:text-white' : 'hover:text-foreground'}`}>
            Products
          </Link>
          <Link href="/vision" className={`transition-colors ${isDarkPage ? 'hover:text-white' : 'hover:text-foreground'}`}>
            Vision
          </Link>
          <a href="mailto:hello@syndica.com" className={`transition-colors ${isDarkPage ? 'hover:text-white' : 'hover:text-foreground'}`}>
            Contact
          </a>
        </div>
        
        <div className={`text-sm ${isDarkPage ? 'text-white/40' : 'text-foreground/40'}`}>
          &copy; {new Date().getFullYear()} Syndica. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
