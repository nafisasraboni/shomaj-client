"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validations";

function safeCallback(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackURL = safeCallback(searchParams.get("callbackUrl"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Check your details");
      return;
    }

    setLoading(true);
    const response = await signIn.email({ ...result.data, callbackURL });
    setLoading(false);
    if (response.error) {
      toast.error(response.error.message ?? "Unable to log in");
      return;
    }
    toast.success("Welcome back to Shomaj");
    router.push(callbackURL);
    router.refresh();
  }

  async function handleGoogleLogin() {
    await signIn.social({ provider: "google", callbackURL });
  }

  return (
    <AuthShell title="Welcome back" description="Sign in to create and join community events.">
      <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <label className="grid gap-2 text-sm font-bold">Email<Input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label className="grid gap-2 text-sm font-bold">Password<PasswordInput name="password" autoComplete="current-password" placeholder="Your password" required /></label>
        <Button type="submit" size="lg" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--muted-foreground)]"><span className="h-px flex-1 bg-[var(--border)]" />or<span className="h-px flex-1 bg-[var(--border)]" /></div>
      <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
        <span className="text-lg font-bold text-[#4285f4]">G</span> Continue with Google
      </Button>
      <p className="mt-7 text-center text-sm text-[var(--muted-foreground)]">New to Shomaj? <Link href="/register" className="font-bold text-[var(--primary)] hover:underline">Create an account</Link></p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
