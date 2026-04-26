import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-cyan-900 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <h1 className="text-3xl font-bold">Stellar Payment Links</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          A public-good toolkit that helps freelancers, creators, and small businesses accept simple XLM payments with one shared link.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/create" className="rounded bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500">Create payment link</Link>
          <Link href="/dashboard" className="rounded border border-slate-600 px-4 py-2 font-medium hover:bg-slate-800">View dashboard</Link>
        </div>
      </section>
    </div>
  );
}
