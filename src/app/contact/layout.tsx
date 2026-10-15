import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Syndica",
  description:
    "Pilot with us. Or just talk. Reach out to participate in the BrokerOS pilot, discuss research collaborations, or learn more about Syndica.",
  openGraph: {
    title: "Contact — Syndica",
    description:
      "Pilot with us. Or just talk. Reach out to participate in the BrokerOS pilot, discuss research collaborations, or learn more about Syndica.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
