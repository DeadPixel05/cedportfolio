import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { RECOVERY_COOKIE_NAME } from "@/lib/supabase/owner";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const requestedPath = request.nextUrl.searchParams.get("next");
  const allowedNextPath = requestedPath === "/update-password" || requestedPath === "/admin"
    ? requestedPath
    : "/admin";

  if (!code || !process.env.SUPABASE_OWNER_ID) {
    redirect("/login?resetError=1");
  }

  let destination = "/login?resetError=1";

  try {
    const supabase = await createSupabaseServerClient();
    const { data: exchangeData, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data, error: claimsError } = await supabase.auth.getClaims();
      if (claimsError || data?.claims?.sub !== process.env.SUPABASE_OWNER_ID) {
        await supabase.auth.signOut();
      } else {
        const isRecoveryRedirect =
          Boolean(exchangeData) &&
          "redirectType" in exchangeData &&
          exchangeData.redirectType === "recovery";
        const isRecovery = allowedNextPath === "/update-password" || isRecoveryRedirect;
        const cookieStore = await cookies();

        if (isRecovery) {
          cookieStore.set(RECOVERY_COOKIE_NAME, "1", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 10,
          });
          destination = "/update-password";
        } else {
          cookieStore.delete(RECOVERY_COOKIE_NAME);
          destination = allowedNextPath;
        }
      }
    }
  } catch {
    destination = "/login?resetError=1";
  }

  redirect(destination);
}