"use client";

import { useActionState, useState } from "react";

import { requestPasswordResetAction, signInAction } from "@/app/auth/actions";

const inputClassName = "mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring";
const buttonClassName = "inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50";

export function LoginForm() {
  const [signInState, signIn, signInPending] = useActionState(signInAction, undefined);
  const [resetState, requestReset, resetPending] = useActionState(requestPasswordResetAction, undefined);
  const [showRecovery, setShowRecovery] = useState(false);

  return (
    <div className="mt-7 space-y-6">
      <form action={signIn} className="space-y-4">
        <label className="block text-sm font-medium">
          Email address
          <input className={inputClassName} type="email" name="email" autoComplete="username" required />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input className={inputClassName} type="password" name="password" autoComplete="current-password" required />
        </label>
        {signInState?.error && <p className="text-sm text-red-600" role="alert">{signInState.error}</p>}
        <button className={`${buttonClassName} w-full`} type="submit" disabled={signInPending}>
          {signInPending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="border-t border-border pt-5">
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          aria-expanded={showRecovery}
          onClick={() => setShowRecovery((visible) => !visible)}
        >
          Forgot your password?
        </button>
        {showRecovery && (
          <form action={requestReset} className="mt-4 space-y-4">
            <label className="block text-sm font-medium">
              Account email
              <input className={inputClassName} type="email" name="email" autoComplete="email" required />
            </label>
            {resetState?.error && <p className="text-sm text-red-600" role="alert">{resetState.error}</p>}
            {resetState?.success && <p className="text-sm text-muted-foreground" role="status">{resetState.success}</p>}
            <button className={`${buttonClassName} w-full`} type="submit" disabled={resetPending}>
              {resetPending ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}