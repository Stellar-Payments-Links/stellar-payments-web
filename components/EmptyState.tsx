import Link from "next/link";

export function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
      <p className="text-lg font-medium">No payments yet</p>
      <p className="mt-2 text-sm text-slate-400">Create your first payment link to start receiving XLM.</p>
      <Link href="/create" className="mt-4 inline-block rounded bg-cyan-600 px-4 py-2 text-sm font-medium hover:bg-cyan-500">
        Create payment link
      </Link>
    </div>
  );
}
