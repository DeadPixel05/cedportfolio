import { redirect } from "next/navigation";

import { PasswordUpdateForm } from "@/components/auth/password-update-form";
import { getOwnerId } from "@/lib/supabase/owner";

export const dynamic = "force-dynamic";

export default async function UpdatePasswordPage() {
  if (!(await getOwnerId())) redirect("/login?resetError=1");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Account recovery</p>
        <h1 className="mt-3 text-3xl font-semibold">Choose a new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">Use at least 12 characters.</p>
        <PasswordUpdateForm />
      </section>
    </main>
  );
}