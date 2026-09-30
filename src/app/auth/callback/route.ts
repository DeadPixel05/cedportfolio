import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const requestedPath = request.nextUrl.searchParams.get("next");
  const nextPath = requestedPath === "/update-password" || requestedPath === "/admin"
    ? requestedPath
    : "/admin";

  if (!code || !process.env.SUPABASE_OWNER_ID) redirect("/login?resetError=1");

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) redirect("/login?resetError=1");

    const { data, error: claimsError } = await supabase.auth.getClaims();
    if (claimsError || data?.claims?.sub !== process.env.SUPABASE_OWNER_ID) {
      await supabase.auth.signOut();
      redirect("/login?resetError=1");
    }
  } catch {
    redirect("/login?resetError=1");
  }

  redirect(nextPath);
}