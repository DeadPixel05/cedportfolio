import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandMenu } from "@/components/command-menu";
import { portfolioData } from "@/data/portfolio-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function resolveMetadataBase(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

  try {
    return new URL(raw);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const defaultTitle = `${portfolioData.profile.name} | ${portfolioData.profile.role}`;

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: defaultTitle,
    template: `%s | ${portfolioData.profile.name}`,
  },
  description: portfolioData.profile.bio,
  keywords: ["Software Engineer", "Senior Software Engineer", "Full-Stack Engineer", "Next.js", "TypeScript", "Portfolio", "Resume"],
  openGraph: {
    title: defaultTitle,
    description: portfolioData.profile.bio,
    type: "website",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <CommandMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
