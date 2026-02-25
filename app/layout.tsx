import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Legacy Protocol",
  description: "Programmable Digital Legacy on StarkNet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050816] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}