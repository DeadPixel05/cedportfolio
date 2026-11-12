import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PortfolioProvider } from "@/lib/portfolio-store";
import { getPortfolioData } from "@/lib/portfolio-data";
import { getOwnerId } from "@/lib/supabase/owner";

export const metadata: Metadata = {
  title: "Portfolio Admin Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  if (!(await getOwnerId())) redirect("/login");

  const portfolio = await getPortfolioData();
  return <PortfolioProvider initialPortfolio={portfolio}>{children}</PortfolioProvider>;
}