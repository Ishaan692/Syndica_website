"use client";

import React from "react";

export default function HorizonLight({ className = "" }: { className?: string }) {
  return (
    <>
      <style>{`
        @keyframes horizonDrift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .horizon-gradient {
          background: linear-gradient(
            90deg,
            #FF3D2E,
            #FF9A1F,
            #F5F03A,
            #38E08C,
            #2FB5FF,
            #6B4DFF,
            #D83DFF,
            #FF3D2E
          );
          background-size: 200% 100%;
          animation: horizonDrift 30s linear infinite alternate;
          filter: blur(48px) saturate(1.25);
          mix-blend-mode: screen;
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
        }
      `}</style>
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-[16vh] pointer-events-none select-none overflow-hidden z-0 opacity-50 ${className}`}
      >
        <div className="w-full h-full horizon-gradient" />
      </div>
    </>
  );
}
