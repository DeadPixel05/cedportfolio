import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { getOwnerId } from "@/lib/supabase/owner";

export const metadata: Metadata = {
  title: "Administrator sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getOwnerId()) redirect("/admin");
  const { passwordUpdated, resetError } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md">
        <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Back to portfolio
        </Link>
        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Private workspace</p>
          <h1 className="mt-3 text-3xl font-semibold">Administrator sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Use the owner account to manage portfolio content.</p>
          {passwordUpdated === "1" && (
            <p className="mt-5 rounded-md bg-muted px-3 py-2 text-sm" role="status">
              Password updated. Sign in with your new password.
            </p>
          )}
          {resetError === "1" && (
            <p className="mt-5 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600" role="alert">
              That reset link is invalid or expired. Request a new one.
            </p>
          )}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}