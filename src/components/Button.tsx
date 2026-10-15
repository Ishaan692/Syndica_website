"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  showArrow?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  showArrow = true,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isPrimary = variant === "primary";

  // Arrow icon: thin 1.5px inline SVG line arrow; moves 4px right on hover
  const arrowIcon = showArrow && (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 ease-out flex-shrink-0"
      style={{ transform: isHovered ? "translateX(4px)" : "translateX(0)" }}
      aria-hidden="true"
    >
      <path
        d="M2.5 8H13.5M13.5 8L8.5 3M13.5 8L8.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );

  const content = (
    <span className="relative z-10 inline-flex items-center gap-2.5">
      <span>{children}</span>
      {arrowIcon}
    </span>
  );

  const baseClasses =
    "relative inline-flex items-center justify-center h-[52px] px-6 rounded-[2px] font-display text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-out select-none cursor-pointer overflow-hidden";

  if (href) {
    if (isPrimary) {
      return (
        <Link
          href={href}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${baseClasses} bg-[#ECE8DF] text-[#0A0A0B] ${className}`}
        >
          {/* Fill slides in from left on hover, text flips to paper */}
          <span
            className="absolute inset-0 bg-[#0A0A0B] transition-transform duration-300 ease-out origin-left pointer-events-none"
            style={{
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            }}
          />
          <span
            className={`relative z-10 inline-flex items-center gap-2.5 transition-colors duration-300 ${
              isHovered ? "text-[#ECE8DF]" : "text-[#0A0A0B]"
            }`}
          >
            <span>{children}</span>
            {arrowIcon}
          </span>
        </Link>
      );
    }

    return (
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseClasses} bg-transparent border border-[rgba(236,232,223,0.14)] text-[#ECE8DF] hover:border-[#ECE8DF] ${className}`}
      >
        {content}
      </Link>
    );
  }

  if (isPrimary) {
    return (
      <button
        type={type}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseClasses} bg-[#ECE8DF] text-[#0A0A0B] ${className}`}
      >
        <span
          className="absolute inset-0 bg-[#0A0A0B] transition-transform duration-300 ease-out origin-left pointer-events-none"
          style={{
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          }}
        />
        <span
          className={`relative z-10 inline-flex items-center gap-2.5 transition-colors duration-300 ${
            isHovered ? "text-[#ECE8DF]" : "text-[#0A0A0B]"
          }`}
        >
          <span>{children}</span>
          {arrowIcon}
        </span>
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClasses} bg-transparent border border-[rgba(236,232,223,0.14)] text-[#ECE8DF] hover:border-[#ECE8DF] ${className}`}
    >
      {content}
    </button>
  );
}
