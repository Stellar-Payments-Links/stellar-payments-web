"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, PaymentLink } from "@/services/api";
import { buildAndSubmitPayment, getWallet } from "@/lib/stellar";

export default function PayPage() {
  const params = useParams<{ id: string }>();
  const [payment, setPayment] = useState<PaymentLink | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getPaymentLink(params.id)
      .then((res) => setPayment(res.payment))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handlePay() {
    if (!payment) return;
    const wallet = getWallet();
    if (!wallet) {
      setError("Load a wallet first on /create or /dashboard.");
      return;
    }

    setStatus("Submitting transaction to Stellar...");
    setError("");

    try {
      const submitted = await buildAndSubmitPayment({
        sourceSecret: wallet.secret,
        destination: payment.destinationPublicKey,
        amount: payment.amount,
        memo: payment.memo
      });

      await api.processPayment({
        paymentId: payment.id,
        txHash: submitted.hash,
        amount: payment.amount,
        payerPublicKey: wallet.publicKey
      });

      setStatus(`Payment successful. TX Hash: ${submitted.hash}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed.");
      setStatus("");
    }
  }

  if (loading) {
    return <p className="text-slate-300">Loading payment request…</p>;
  }

  if (!payment) {
    return <p className="text-rose-300">{error || "Payment link not found."}</p>;
  }

  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/90">Payment request</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{payment.title}</h1>
        </div>
        <span className="rounded-full bg-slate-950/80 px-4 py-2 text-sm text-slate-300">{payment.status.toUpperCase()}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Amount</p>
          <p className="mt-3 text-2xl font-semibold text-white">{payment.amount} XLM</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Destination</p>
          <p className="mt-3 break-all text-sm text-slate-200">{payment.destinationPublicKey}</p>
        </div>
      </div>

      {payment.memo && (
        <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Memo</p>
          <p className="mt-3">{payment.memo}</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <button
          onClick={handlePay}
          className="w-full rounded-3xl bg-cyan-600 px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-500"
        >
          Pay now
        </button>

        <p className="text-sm text-slate-400">Make sure your Stellar wallet is loaded. If you need to add one, go to the Create or Dashboard page.</p>
      </div>

      {status && <p className="mt-4 rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">{status}</p>}
      {error && <p className="mt-4 rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}
    </section>
  );
}
