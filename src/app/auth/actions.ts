"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  success?: string;
} | undefined;

const emailSchema = z.email();

export async function signInAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!emailSchema.safeParse(email).success || password.length === 0) {
    return { error: "Enter a valid email and password." };
  }

  const ownerId = process.env.SUPABASE_OWNER_ID;
  if (!ownerId) return { error: "Administrator access is not configured yet." };

  let userId: string | undefined;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Email or password is incorrect." };
    userId = data.user?.id;

    if (userId !== ownerId) {
      await supabase.auth.signOut();
      return { error: "Email or password is incorrect." };
    }
  } catch {
    return { error: "Sign-in is temporarily unavailable. Try again shortly." };
  }

  redirect("/admin");
}

export async function requestPasswordResetAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!emailSchema.safeParse(email).success) return { error: "Enter a valid email address." };

  try {
    const supabase = await createSupabaseServerClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
      ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=%2Fupdate-password`,
    });
    if (error) return { error: "Password recovery is temporarily unavailable. Try again shortly." };
  } catch {
    return { error: "Password recovery is temporarily unavailable. Try again shortly." };
  }

  return { success: "If the administrator account matches that email, a reset link is on its way." };
}

export async function updatePasswordAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (password.length < 12 || password.length > 128) {
    return { error: "Use a password between 12 and 128 characters." };
  }
  if (password !== confirmation) return { error: "The passwords do not match." };

  const ownerId = process.env.SUPABASE_OWNER_ID;
  if (!ownerId) return { error: "Administrator access is not configured yet." };

  try {
    const supabase = await createSupabaseServerClient();
    const { data: claims, error: claimsError } = await supabase.auth.getClaims();
    if (claimsError || claims?.claims?.sub !== ownerId) {
      return { error: "This password reset link is invalid or has expired. Request a new one." };
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { error: "The password could not be updated. Request a new reset link." };
    await supabase.auth.signOut();
  } catch {
    return { error: "The password could not be updated. Request a new reset link." };
  }

  redirect("/login?passwordUpdated=1");
}

export async function signOutAction() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } finally {
    redirect("/login");
  }
}