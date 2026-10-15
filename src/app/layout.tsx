import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import ArtStage from "@/components/ArtStage";
import GridOverlay from "@/components/GridOverlay";
import FilmGrain from "@/components/FilmGrain";
import ScrollSpine from "@/components/ScrollSpine";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syndica — Order is a product",
  description:
    "Work still runs on spreadsheets, PDFs, inboxes and memory. Syndica builds the software that puts it in order. BrokerOS is live today.",
  openGraph: {
    title: "Syndica — Order is a product",
    description:
      "Work still runs on spreadsheets, PDFs, inboxes and memory. Syndica builds the software that puts it in order. BrokerOS is live today.",
    siteName: "Syndica",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syndica — Order is a product",
    description:
      "Syndica builds the software that puts unstructured work in order.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Syndica",
              url: "https://syndica.com",
              description:
                "Syndica builds software that puts unstructured work in order, then builds intelligence on top.",
              founders: [
                { "@type": "Person", name: "Ishaan" },
                { "@type": "Person", name: "Vatsal" },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#0A0A0B] text-[#ECE8DF] min-h-screen flex flex-col font-body selection:bg-[#FF4F2B] selection:text-[#0A0A0B]">
        <noscript>
          <style>{`
            .reveal-line, [data-reading] {
              transform: none !important;
              opacity: 1 !important;
              visibility: visible !important;
            }
          `}</style>
        </noscript>
        <ScrollProvider>
          <ArtStage />
          <FilmGrain />
          <GridOverlay />
          <ScrollSpine />
          <Navbar />
          <main className="flex-grow relative z-10 w-full">
            {children}
          </main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
