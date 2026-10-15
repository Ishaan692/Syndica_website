import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrokerOS — Syndica",
  description:
    "One workspace for the whole commercial insurance deal: the client, the RFQ, the quotes, the policy, the commission and every document in between.",
  openGraph: {
    title: "BrokerOS — Syndica",
    description:
      "One workspace for the whole commercial insurance deal: the client, the RFQ, the quotes, the policy, the commission and every document in between.",
  },
};

export default function BrokerOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
