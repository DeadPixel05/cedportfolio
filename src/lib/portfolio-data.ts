import "server-only";

import { createClient } from "@supabase/supabase-js";

import { portfolioData } from "@/data/portfolio-data";
import { portfolioDataSchema } from "@/lib/portfolio-schema";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function getPortfolioData() {
  const config = getSupabaseConfig();
  if (!config) return portfolioData;

  const supabase = createClient(config.url, config.key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase
    .from("portfolio_documents")
    .select("data")
    .eq("id", "main")
    .maybeSingle();

  if (error) throw new Error("Unable to load the saved portfolio.", { cause: error });
  if (!data) return portfolioData;

  return portfolioDataSchema.parse(data.data);
}