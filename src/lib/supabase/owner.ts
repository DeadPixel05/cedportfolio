import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

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