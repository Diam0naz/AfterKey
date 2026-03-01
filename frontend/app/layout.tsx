import Providers from "./providers";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: "AfterKey",
  metadataBase: new URL(baseUrl),
  description: "Programmable Digital Legacy on StarkNet",
  openGraph: {
    title: "AfterKey",
    description: "Programmable Digital Legacy",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <Providers>{children}
          <Toaster richColors position="top-right" theme="dark" closeButton /></Providers>
      </body>
    </html>
  );
}
