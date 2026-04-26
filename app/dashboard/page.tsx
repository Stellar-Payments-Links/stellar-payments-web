"use client";

import { useEffect, useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { api, TransactionRecord } from "@/services/api";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getTransactions()
      .then((res) => setTransactions(res.transactions))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="space-y-6">
      <WalletCard />
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h1 className="text-xl font-semibold">Recent transactions</h1>
        {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
        <ul className="mt-3 space-y-2 text-sm">
          {transactions.map((tx) => (
            <li key={tx.id} className="rounded bg-slate-800 p-2">
              <p>Payment #{tx.paymentId} - {tx.amount} XLM</p>
              <p className="break-all text-xs text-slate-400">{tx.txHash}</p>
            </li>
          ))}
          {transactions.length === 0 && <li className="text-slate-300">No payments yet.</li>}
        </ul>
      </section>
    </div>
  );
}
