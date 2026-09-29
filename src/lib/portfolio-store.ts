"use client";

import { useEffect, useState } from "react";

import { portfolioData } from "@/data/portfolio-data";
import type { PortfolioData } from "@/types/portfolio";

const STORAGE_KEY = "portfolio-admin-data";

export const clonePortfolioData = (data: PortfolioData): PortfolioData =>
  JSON.parse(JSON.stringify(data)) as PortfolioData;

export function usePortfolioData() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(clonePortfolioData(portfolioData));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPortfolio(JSON.parse(saved) as PortfolioData);
      } catch {
        setPortfolio(clonePortfolioData(portfolioData));
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    }
  }, [portfolio, ready]);

  return { portfolio, setPortfolio, ready };
}

export function resetPortfolioData() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
