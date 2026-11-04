"use client";

import { Camera, Mail, Save, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient, useSession } from "@/lib/auth-client";
import { profileSchema } from "@/lib/validations";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const imageValue = image ?? session?.user.image ?? "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const result = profileSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Check your profile details");
      return;
    }
    setSaving(true);
    const response = await authClient.updateUser(result.data);
    setSaving(false);
    if (response.error) {
      toast.error(response.error.message ?? "Unable to update your profile");
      return;
    }
    toast.success("Profile updated");
  }

  return (
    <ProtectedRoute>
      <main className="container-shell section-padding">
        <p className="section-kicker">Your profile</p><h1 className="section-heading mt-5">The person behind the action.</h1>
        <div className="mt-10 grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] lg:grid-cols-[300px_1fr]">
          <aside className="border-b bg-[var(--muted)] p-8 text-center lg:border-b-0 lg:border-r">
            <div className="relative mx-auto size-32">
              {imageValue ? <img src={imageValue} alt="Profile preview" className="size-32 rounded-full border-4 border-[var(--card)] object-cover shadow-sm" onError={() => setImage("")} /> : <span className="grid size-32 place-items-center rounded-full border-4 border-[var(--card)] bg-[var(--accent)] text-[var(--primary)] shadow-sm"><UserRound size={48} /></span>}
              <span className="absolute bottom-1 right-1 grid size-10 place-items-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"><Camera size={18} /></span>
            </div>
            <h2 className="mt-5 text-xl font-bold">{session?.user.name}</h2>
            <p className="mt-2 break-all text-sm text-[var(--muted-foreground)]">{session?.user.email}</p>
          </aside>
          <form onSubmit={handleSubmit} className="grid content-start gap-6 p-6 sm:p-10" noValidate>
            <div><h2 className="text-2xl font-bold">Profile details</h2><p className="mt-2 text-[var(--muted-foreground)]">Keep your public organiser information current.</p></div>
            <label className="grid gap-2 text-sm font-bold"><span className="inline-flex items-center gap-2"><UserRound size={16} />Display name</span><Input name="name" defaultValue={session?.user.name ?? ""} required /></label>
            <label className="grid gap-2 text-sm font-bold"><span className="inline-flex items-center gap-2"><Mail size={16} />Email</span><Input value={session?.user.email ?? ""} disabled /><span className="text-xs font-normal text-[var(--muted-foreground)]">Email changes are disabled for this assignment.</span></label>
            <label className="grid gap-2 text-sm font-bold"><span className="inline-flex items-center gap-2"><Camera size={16} />Photo URL</span><Input name="image" type="url" value={imageValue} onChange={(event) => setImage(event.target.value)} required /></label>
            <Button type="submit" className="justify-self-start" disabled={saving}><Save size={17} />{saving ? "Saving…" : "Save changes"}</Button>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
