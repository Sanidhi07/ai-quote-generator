import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Quote-Generator | Creative Inspiration",
  description: "Generate unique, aesthetic quotes for coding, life, and philosophy using AI. Perfect for developers, thinkers, and creatives seeking daily inspiration.",
  keywords: ["AI", "Quote Generator", "Next.js", "Full Stack Developer", "Sanidhi Shinde"],
  authors: [{ name: "Sanidhi Shinde" }],
  openGraph: {
    title: "AI Quote Generator",
    description: "Instant aesthetic inspiration at your fingertips.",
    url: "https://ai-quote-generator-sigma.vercel.app/",
    siteName: "AI Quote Generator",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added suppressHydrationWarning here - required for next-themes
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Swapped inter.className for geistSans.className */}
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}