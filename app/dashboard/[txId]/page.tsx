"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { api, TransactionRecord } from "@/services/api";
import { stellarExpertTxUrl } from "@/lib/explorer";

export default function TransactionDetailPage() {
  const params = useParams<{ txId: string }>();
  const [tx, setTx] = useState<TransactionRecord | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getTransactions()
      .then((res) => {
        const found = res.transactions.find((t) => t.id === params.txId);
        if (!found) setError("Transaction not found.");
        else setTx(found);
      })
      .catch((e) => setError(String(e)));
  }, [params.txId]);

  if (error) return <p className="text-rose-300">{error}</p>;
  if (!tx) return <p className="text-slate-400">Loading transaction...</p>;

  return (
    <section className="max-w-xl space-y-4">
      <PageHeader title="Transaction details" subtitle={`Record ${tx.id}`} />
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-slate-400">Amount</dt>
          <dd>{tx.amount} XLM</dd>
        </div>
        <div>
          <dt className="text-slate-400">Payment ID</dt>
          <dd className="break-all">{tx.paymentId}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Payer</dt>
          <dd className="break-all">{tx.payerPublicKey}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Hash</dt>
          <dd className="break-all">{tx.txHash}</dd>
        </div>
      </dl>
      <a href={stellarExpertTxUrl(tx.txHash)} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
        View on Stellar Expert
      </a>
      <Link href="/dashboard" className="block text-sm text-slate-400 hover:text-cyan-300">
        ← Back to dashboard
      </Link>
    </section>
  );
}
