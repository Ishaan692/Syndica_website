import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision | Syndica",
  description: "Our thesis on why broker workflows are broken, why more software keeps making it worse, and how structured data can fix it.",
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
