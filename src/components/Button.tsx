import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  className = "",
  variant = "primary",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out hover:scale-105";

  const variantStyles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl"
      : "bg-transparent text-foreground border border-foreground/10 hover:border-foreground/30";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}
