import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chat App",
  description: "Chat with AI using Anthropic's Claude",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
