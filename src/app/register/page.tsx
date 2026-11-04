"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { registrationSchema } from "@/lib/validations";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = registrationSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Check your details");
      return;
    }

    setLoading(true);
    const response = await signUp.email({
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
      image: result.data.photoURL,
      callbackURL: "/",
    });
    setLoading(false);
    if (response.error) {
      toast.error(response.error.message ?? "Unable to create your account");
      return;
    }
    toast.success("Your Shomaj account is ready");
    router.push("/");
    router.refresh();
  }

  return (
    <AuthShell title="Join the community" description="Create an account and turn good intentions into local action.">
      <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
        <label className="grid gap-2 text-sm font-bold">Name<Input name="name" autoComplete="name" placeholder="Your full name" required /></label>
        <label className="grid gap-2 text-sm font-bold">Email<Input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label className="grid gap-2 text-sm font-bold">Photo URL<Input name="photoURL" type="url" autoComplete="url" placeholder="https://example.com/photo.jpg" required /></label>
        <label className="grid gap-2 text-sm font-bold">Password<PasswordInput name="password" autoComplete="new-password" placeholder="Uppercase, lowercase, 6+ characters" required /></label>
        <Button type="submit" size="lg" className="mt-2" disabled={loading}>{loading ? "Creating account…" : "Create account"}</Button>
      </form>
      <p className="mt-7 text-center text-sm text-[var(--muted-foreground)]">Already have an account? <Link href="/login" className="font-bold text-[var(--primary)] hover:underline">Sign in</Link></p>
    </AuthShell>
  );
}
