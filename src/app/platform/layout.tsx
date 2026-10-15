import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform — Syndica",
  description:
    "Syndica is one idea built in layers. This page shows what exists today and what is still research.",
  openGraph: {
    title: "Platform — Syndica",
    description:
      "Syndica is one idea built in layers. This page shows what exists today and what is still research.",
  },
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
