"use client";

import React from "react";

interface ProductFrameProps {
  path: string; // e.g. "BrokerOS / Overview", "BrokerOS / Policies"
  isRealScreenshot?: boolean;
  tag?: "ILLUSTRATION" | "SAMPLE DATA";
  children: React.ReactNode;
  className?: string;
}

export default function ProductFrame({
  path,
  isRealScreenshot = false,
  tag = "ILLUSTRATION",
  children,
  className = "",
}: ProductFrameProps) {
  return (
    <div
      className={`w-full rounded-[6px] border border-[rgba(236,232,223,0.14)] bg-[#111113] overflow-hidden shadow-2xl flex flex-col ${className}`}
    >
      {/* 36px Top Bar */}
      <div className="h-[36px] px-4 flex items-center justify-between border-b border-[rgba(236,232,223,0.08)] bg-[#111113] select-none">
        <span className="font-mono text-[11px] text-[rgba(236,232,223,0.68)]">
          {path}
        </span>
        {!isRealScreenshot && (
          <span className="font-mono text-[10px] tracking-wider uppercase text-[rgba(236,232,223,0.44)] px-1.5 py-0.5 border border-[rgba(236,232,223,0.08)] rounded-[2px]">
            {tag}
          </span>
        )}
      </div>

      {/* Frame Content */}
      <div className="w-full flex-1 relative overflow-hidden min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
