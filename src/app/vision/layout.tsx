import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision — Syndica",
  description:
    "Why order is a product: Most of what an organization knows is not written down in a form software can use. We build the systems where work is recorded properly in the first place.",
  openGraph: {
    title: "Vision — Syndica",
    description:
      "Why order is a product: Most of what an organization knows is not written down in a form software can use. We build the systems where work is recorded properly in the first place.",
  },
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
