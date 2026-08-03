import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Research Assistant",
  description: "A polished frontend for AI research workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
