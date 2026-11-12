import "server-only";

import { cookies } from "next/headers";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const RECOVERY_COOKIE_NAME = "portfolio_pw_recovery";

function hasRecoveryMethod(amr: unknown): boolean {
  if (!Array.isArray(amr)) return false;

  return amr.some((entry) => {
    if (typeof entry === "string") {
      return entry === "recovery" || entry === "otp";
    }
    if (entry && typeof entry === "object" && "method" in entry) {
      const method = (entry as { method?: unknown }).method;
      return method === "recovery" || method === "otp";
    }
    return false;
  });
}

export async function getOwnerId() {
  const ownerId = process.env.SUPABASE_OWNER_ID;
  if (!ownerId) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data || data.claims?.sub !== ownerId) return null;
    return ownerId;
  } catch {
    return null;
  }
}

export async function hasPasswordRecoverySession(): Promise<boolean> {
  const ownerId = process.env.SUPABASE_OWNER_ID;
  if (!ownerId) return false;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data || data.claims?.sub !== ownerId) return false;

    const cookieStore = await cookies();
    const hasRecoveryCookie = cookieStore.get(RECOVERY_COOKIE_NAME)?.value === "1";

    return hasRecoveryCookie || hasRecoveryMethod(data.claims.amr);
  } catch {
    return false;
  }
}