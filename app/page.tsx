import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-cyan-500/10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Accept Stellar payments</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Build payment links for clients, fans, and customers in seconds.
            </h1>
            <p className="mt-6 max-w-xl text-slate-300 leading-7">
              Stellar Payment Links gives you a simple flow to collect XLM payments, track transactions, and manage your wallet from one lightweight web app.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/create" className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-500">
                Create a payment link
              </Link>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-500 hover:text-cyan-200">
                View dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/90">Fast setup</p>
              <p className="mt-3 text-slate-300">Start accepting payments immediately with auto-generated links and one-click wallet creation.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/90">Client-friendly</p>
              <p className="mt-3 text-slate-300">Send a clean payment request page that your customers can use without needing a separate account.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/90">Secure wallet</p>
              <p className="mt-3 text-slate-300">Your keys stay in the browser. Create or import a Stellar wallet safely for payments and payouts.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/90">Live tracking</p>
              <p className="mt-3 text-slate-300">Monitor incoming transactions and payment history from the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/40">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Simple workflow</p>
            <p className="mt-4 text-slate-300">Generate a payment link, share it with a payer, and receive XLM directly into your Stellar account.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Designed for creators</p>
            <p className="mt-4 text-slate-300">Perfect for freelancers, small teams, and creators who want a frictionless payment experience.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">No backend required</p>
            <p className="mt-4 text-slate-300">This frontend handles wallet actions and link generation while letting your API focus on payments.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
