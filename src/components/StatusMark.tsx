"use client";

import React from "react";
import type { ProductStatus } from "@/content/products";

interface StatusMarkProps {
  status: ProductStatus;
  label?: string;
  className?: string;
}

export default function StatusMark({ status, label, className = "" }: StatusMarkProps) {
  const getShape = () => {
    switch (status) {
      case "live":
        return (
          <div className="relative flex items-center justify-center w-[7px] h-[7px]">
            <div className="w-[7px] h-[7px] bg-[#ECE8DF]" />
            <div
              className="absolute inset-0 border border-[#ECE8DF] animate-ping"
              style={{ animationDuration: "2.4s" }}
            />
          </div>
        );
      case "dev":
        // half-filled square (top half solid)
        return (
          <div className="w-[7px] h-[7px] border border-[#ECE8DF] flex flex-col overflow-hidden">
            <div className="w-full h-1/2 bg-[#ECE8DF]" />
            <div className="w-full h-1/2 bg-transparent" />
          </div>
        );
      case "planned":
        // hollow square
        return <div className="w-[7px] h-[7px] border border-[#ECE8DF] bg-transparent" />;
      case "research":
        // dashed hollow square
        return (
          <div
            className="w-[7px] h-[7px] bg-transparent"
            style={{
              border: "1px dashed #ECE8DF",
            }}
          />
        );
    }
  };

  const getDefaultLabel = () => {
    switch (status) {
      case "live":
        return "LIVE · PILOT IN PROGRESS";
      case "dev":
        return "IN DEVELOPMENT";
      case "planned":
        return "PLANNED · 2026";
      case "research":
        return "IN RESEARCH";
    }
  };

  const displayText = label || getDefaultLabel();

  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#ECE8DF]/80 select-none ${className}`}
      aria-label={`Status: ${displayText}`}
      role="status"
    >
      <span className="flex-shrink-0" aria-hidden="true">
        {getShape()}
      </span>
      <span className="tabular-nums font-normal">{displayText}</span>
    </div>
  );
}
