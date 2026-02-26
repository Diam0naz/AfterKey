import Providers from "./providers";
import "./globals.css";

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
