"use client";

import { FormEvent, useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { api } from "@/services/api";

export default function CreatePage() {
  const [title, setTitle] = useState("Website design");
  const [amount, setAmount] = useState("25");
  const [destinationPublicKey, setDestinationPublicKey] = useState("");
  const [memo, setMemo] = useState("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !amount.trim() || !destinationPublicKey.trim()) {
      setError("Title, amount, and destination key are required.");
      return;
    }

    try {
      const res = await api.createPaymentLink({ title, amount, destinationPublicKey, memo });
      const origin = window.location.origin;
      setResult(`${origin}/pay/${res.payment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create payment link.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <WalletCard />

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/90">Create link</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Generate a payment request</h1>
          <p className="mt-3 text-slate-400 leading-7">Enter the payment details, choose a recipient, and share the created link with anyone who needs to pay you.</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm text-slate-300">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project or service name"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Amount (XLM)
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="25.00"
              inputMode="decimal"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Destination public key
            <input
              value={destinationPublicKey}
              onChange={(e) => setDestinationPublicKey(e.target.value)}
              placeholder="G..."
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Memo (optional)
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Enter a note or invoice number"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </label>

          <button type="submit" className="w-full rounded-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-500">
            Create payment link
          </button>
        </form>

        {result && (
          <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-slate-100">
            <p className="font-medium text-emerald-200">Payment link ready</p>
            <p className="mt-2 break-all text-slate-300">{result}</p>
          </div>
        )}

        {error && <p className="mt-5 text-sm text-rose-300">{error}</p>}
      </section>
    </div>
  );
}
