"use client";

import { createContext, createElement, useContext, useState } from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

import type { PortfolioData } from "@/types/portfolio";

export const clonePortfolioData = (data: PortfolioData): PortfolioData =>
  JSON.parse(JSON.stringify(data)) as PortfolioData;

type PortfolioStoreValue = {
  portfolio: PortfolioData;
  setPortfolio: Dispatch<SetStateAction<PortfolioData>>;
  ready: boolean;
  dirty: boolean;
  markSaved: () => void;
};

const PortfolioContext = createContext<PortfolioStoreValue | null>(null);

export function PortfolioProvider({
  initialPortfolio,
  children,
}: PropsWithChildren<{ initialPortfolio: PortfolioData }>) {
  const [portfolio, setPortfolioState] = useState(() => clonePortfolioData(initialPortfolio));
  const [dirty, setDirty] = useState(false);
  const setPortfolio: Dispatch<SetStateAction<PortfolioData>> = (next) => {
    setPortfolioState(next);
    setDirty(true);
  };

  return createElement(
    PortfolioContext.Provider,
    { value: { portfolio, setPortfolio, ready: true, dirty, markSaved: () => setDirty(false) } },
    children,
  );
}

export function usePortfolioData() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("usePortfolioData must be used within PortfolioProvider.");
  return value;
}
