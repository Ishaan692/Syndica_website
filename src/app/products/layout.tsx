import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Syndica",
  description:
    "We start where work is least organized. BrokerOS is live. The rest is being built on top of it.",
  openGraph: {
    title: "Products — Syndica",
    description:
      "We start where work is least organized. BrokerOS is live. The rest is being built on top of it.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
