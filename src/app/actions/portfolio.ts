"use server";

import { revalidatePath } from "next/cache";

import { portfolioDataSchema } from "@/lib/portfolio-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOwnerId } from "@/lib/supabase/owner";

export type SavePortfolioResult = { success: true } | { error: string };

function getDatabaseSaveError(code: string | undefined) {
  if (code === "42501") {
    return "Supabase row-level security rejected this save. Register this account in private.portfolio_admins and verify the portfolio migration policies are applied.";
  }
  if (code === "42P01" || code === "PGRST205") {
    return "The portfolio table was not found. Apply the portfolio Supabase migration and try again.";
  }
  if (code === "23503") {
    return "The configured portfolio owner was not found in Supabase Auth. Check SUPABASE_OWNER_ID and try again.";
  }

  return code
    ? `The portfolio could not be saved (database error ${code}). Check the server logs and try again.`
    : "The portfolio could not be saved. Check the server logs and try again.";
}

export async function savePortfolioAction(value: unknown): Promise<SavePortfolioResult> {
  const ownerId = await getOwnerId();
  if (!ownerId) return { error: "Your administrator session has expired. Sign in again." };

  const parsed = portfolioDataSchema.safeParse(value);
  if (!parsed.success || JSON.stringify(value).length > 800_000) {
    return { error: "The portfolio data is invalid or too large to save." };
  }

  let saveStage = "client initialization";
  try {
    const supabase = await createSupabaseServerClient();
    saveStage = "database upsert";
    const { error } = await supabase.from("portfolio_documents").upsert({
      id: "main",
      owner_id: ownerId,
      data: parsed.data,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

    if (error) {
      console.error("[portfolio-save] Supabase upsert failed", {
        code: error.code,
        message: error.message,
      });
      return { error: getDatabaseSaveError(error.code) };
    }
  } catch (error) {
    console.error(`[portfolio-save] Supabase ${saveStage} failed`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return {
      error: saveStage === "client initialization"
        ? "Supabase could not be initialized. Check the server configuration and try again."
        : "Could not reach Supabase while saving. Check the server logs and try again.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}