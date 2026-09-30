"use client";

import { useActionState } from "react";

import { updatePasswordAction } from "@/app/auth/actions";

const inputClassName = "mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring";

export function PasswordUpdateForm() {
  const [state, action, pending] = useActionState(updatePasswordAction, undefined);

  return (
    <form action={action} className="mt-7 space-y-4">
      <label className="block text-sm font-medium">
        New password
        <input className={inputClassName} type="password" name="password" autoComplete="new-password" minLength={12} maxLength={128} required />
      </label>
      <label className="block text-sm font-medium">
        Confirm new password
        <input className={inputClassName} type="password" name="confirmation" autoComplete="new-password" minLength={12} maxLength={128} required />
      </label>
      {state?.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={pending}
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}