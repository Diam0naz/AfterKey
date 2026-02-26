import Providers from "./providers";
import "./globals.css";
import { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Legacy Protocol",
  metadataBase: new URL(baseUrl),
  description: "Programmable Digital Legacy on StarkNet",
  openGraph: {
    title: "AfterKey",
    description: "Premium Web3 security platform.",
    images: [
      {
        url: "/ChatGPT Image Feb 26, 2026, 04_11_12 AM.png",
        width: 600,
        height: 600,
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
