import React from "react";

interface GradientOrbProps {
  color?: "teal" | "terracotta" | "sand";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function GradientOrb({
  color = "teal",
  size = "md",
  className = "",
}: GradientOrbProps) {
  const colorMap = {
    teal: "bg-brand-teal/20",
    terracotta: "bg-brand-terracotta/20",
    sand: "bg-brand-sand/40",
  };

  const sizeMap = {
    sm: "w-64 h-64 blur-3xl",
    md: "w-96 h-96 blur-[100px]",
    lg: "w-[32rem] h-[32rem] blur-[120px]",
    xl: "w-[48rem] h-[48rem] blur-[140px]",
  };

  return (
    <div
      className={`absolute rounded-full opacity-60 mix-blend-multiply pointer-events-none ${colorMap[color]} ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
