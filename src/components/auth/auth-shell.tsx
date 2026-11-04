export function AuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="grid min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative hidden min-h-[760px] overflow-hidden bg-[#132a24] lg:block">
        <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=88" alt="Community volunteers working together" className="absolute inset-0 size-full object-cover opacity-55 grayscale-[20%]" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10251f] via-[#10251f]/30 to-transparent" />
        <div className="absolute inset-x-12 bottom-12 border-t border-white/40 pt-7 text-[#f4f0e7]">
          <p className="max-w-xl text-3xl font-bold leading-tight tracking-[-0.035em] xl:text-4xl">“A community is built every time someone decides to show up.”</p>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#b5c5bf]">Shomaj · Bangladesh</p>
        </div>
      </div>
      <div className="surface-grid grid place-items-center px-4 py-12 sm:px-8 sm:py-16">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-lift)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Your community account</p>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{title}</h1>
          <p className="mt-4 leading-7 text-[var(--muted-foreground)]">{description}</p>
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </main>
  );
}
