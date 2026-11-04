export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="container-shell section-padding">
      <div className="max-w-3xl">
        <p className="section-kicker">Privacy policy</p>
        <h1 className="section-heading mt-6">Your trust belongs in the community too.</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)]">Last updated: November 3, 2026</p>

        <div className="mt-12 grid gap-10 border-t border-[var(--foreground)] pt-10 text-[var(--muted-foreground)]">
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Information we use</h2><p className="mt-4 leading-8">Shomaj stores the account information you provide, including your name, email address, profile photo, authentication records, events you create, and events you join.</p></section>
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Why we use it</h2><p className="mt-4 leading-8">We use this information to authenticate your account, display organiser details, enforce event ownership, record participation, and operate the community-event service.</p></section>
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Service providers</h2><p className="mt-4 leading-8">Shomaj uses Google for optional sign-in, MongoDB Atlas for application data, and Cloudflare for hosting and security. These providers process information under their own privacy terms.</p></section>
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Your choices</h2><p className="mt-4 leading-8">You may use email and password instead of Google sign-in, update your public profile, and stop using the service at any time. Contact the project administrator through the support address shown on the Google consent screen for account or privacy requests.</p></section>
        </div>
      </div>
    </main>
  );
}
