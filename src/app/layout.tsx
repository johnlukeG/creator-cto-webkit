import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import siteConfig from "../../site.config";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colors } = siteConfig;

  // Inject custom colors from config as CSS variables
  const colorStyles = `
    :root {
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --background: ${colors.background};
      --foreground: ${colors.foreground};
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --background: ${colors.backgroundDark};
        --foreground: ${colors.foregroundDark};
      }
    }
  `;

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: colorStyles }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
