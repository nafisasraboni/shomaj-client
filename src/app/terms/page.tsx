export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <main className="container-shell section-padding">
      <div className="max-w-3xl">
        <p className="section-kicker">Terms of service</p>
        <h1 className="section-heading mt-6">Clear expectations for shared action.</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)]">Last updated: November 3, 2026</p>

        <div className="mt-12 grid gap-10 border-t border-[var(--foreground)] pt-10 text-[var(--muted-foreground)]">
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Use Shomaj responsibly</h2><p className="mt-4 leading-8">Provide accurate account and event information. Do not create misleading, unsafe, unlawful, discriminatory, or harmful events or use the platform to abuse other people.</p></section>
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Event responsibility</h2><p className="mt-4 leading-8">Event organisers are responsible for their event details, safety arrangements, and communication. Participants decide independently whether an event is appropriate for them.</p></section>
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Accounts and content</h2><p className="mt-4 leading-8">You are responsible for activity under your account and for content you submit. Shomaj may restrict access to content or accounts that threaten the service or its community.</p></section>
          <section><h2 className="display-title text-3xl text-[var(--foreground)]">Service availability</h2><p className="mt-4 leading-8">The service is provided for community coordination and may change or experience interruptions. Shomaj does not guarantee an organiser, participant, or event outcome.</p></section>
        </div>
      </div>
    </main>
  );
}
