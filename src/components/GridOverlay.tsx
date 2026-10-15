"use client";

import React from "react";

export default function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] hidden lg:block"
    >
      <div className="container-grid h-full relative">
        {/* Left edge container rule */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[rgba(236,232,223,0.06)]" />

        {/* 12-column interior rules at boundaries 4|5 (33.333%) and 8|9 (66.666%) */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-[rgba(236,232,223,0.06)]"
          style={{ left: "calc((100% - clamp(40px, 8vw, 128px)) * 0.3333 + clamp(20px, 4vw, 64px))" }}
        />
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-[rgba(236,232,223,0.06)]"
          style={{ left: "calc((100% - clamp(40px, 8vw, 128px)) * 0.6666 + clamp(20px, 4vw, 64px))" }}
        />

        {/* Right edge container rule */}
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[rgba(236,232,223,0.06)]" />
      </div>
    </div>
  );
}
