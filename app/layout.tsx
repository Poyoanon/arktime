import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";

const notoSans = Noto_Sans_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arktime",
  description: "A reminder app for Arknights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
