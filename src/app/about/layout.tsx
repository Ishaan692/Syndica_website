import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Syndica",
  description:
    "Order is not an accident. It is engineered. Discover Syndica's origins, engineering philosophy, and the team building software for high-stakes operational work.",
  openGraph: {
    title: "About — Syndica",
    description:
      "Order is not an accident. It is engineered. Discover Syndica's origins, engineering philosophy, and the team building software for high-stakes operational work.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
