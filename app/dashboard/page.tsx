"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WalletCard } from "@/components/WalletCard";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { api, TransactionRecord } from "@/services/api";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTransactions()
      .then((res) => setTransactions(res.transactions))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <WalletCard />
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <PageHeader title="Recent transactions" subtitle="Verified payments recorded by the API." />
        {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
        {loading && <p className="text-sm text-slate-400">Loading...</p>}
        {!loading && transactions.length === 0 && <EmptyState />}
        <ul className="mt-3 space-y-2 text-sm">
          {transactions.map((tx) => (
            <li key={tx.id} className="rounded bg-slate-800 p-2">
              <p>
                Payment #{tx.paymentId.slice(0, 8)}… — {tx.amount} XLM
              </p>
              <p className="break-all text-xs text-slate-400">{tx.txHash}</p>
              <Link href={`/dashboard/${tx.id}`} className="text-xs text-cyan-300 hover:underline">
                View details
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
