"use client";

import { useEffect, useMemo, useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { api, TransactionRecord } from "@/services/api";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions()
      .then((res) => setTransactions(res.transactions))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const count = transactions.length;
    const total = transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    return { count, total: total.toFixed(2) };
  }, [transactions]);

  return (
    <div className="space-y-8">
      <WalletCard />

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
            <p className="mt-2 text-slate-400">Track your recent Stellar transactions and payment performance.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm">
              <p className="text-slate-500">Payments</p>
              <p className="mt-2 text-2xl font-semibold text-white">{summary.count}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm">
              <p className="text-slate-500">Total received</p>
              <p className="mt-2 text-2xl font-semibold text-white">{summary.total} XLM</p>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
          <div className="grid grid-cols-[1.2fr_1fr_1.3fr_1fr] gap-4 border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-500 sm:grid-cols-[2fr_1.2fr_1.2fr_1fr]">
            <span>Request</span>
            <span>Amount</span>
            <span>Payer</span>
            <span>TX Hash</span>
          </div>
          <ul className="space-y-2 px-4 py-4">
            {loading ? (
              <li className="rounded-3xl bg-slate-900 p-4 text-sm text-slate-400">Loading transactions…</li>
            ) : transactions.length > 0 ? (
              transactions.map((tx) => (
                <li key={tx.id} className="rounded-3xl bg-slate-900 p-4">
                  <div className="grid gap-4 text-sm sm:grid-cols-[2fr_1.2fr_1.2fr_1fr]">
                    <span className="font-medium text-slate-100">#{tx.paymentId}</span>
                    <span className="text-cyan-200">{tx.amount} XLM</span>
                    <span className="truncate text-slate-400">{tx.payerPublicKey}</span>
                    <span className="truncate text-slate-400">{tx.txHash}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="rounded-3xl bg-slate-900 p-4 text-sm text-slate-400">No payments have been recorded yet.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
