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
    try {
      const res = await api.createPaymentLink({ title, amount, destinationPublicKey, memo });
      const origin = window.location.origin;
      setResult(`${origin}/pay/${res.payment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create payment link.");
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <WalletCard />
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h1 className="text-xl font-semibold">Create payment link</h1>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Payment title" />
          <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in XLM" />
          <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={destinationPublicKey} onChange={(e) => setDestinationPublicKey(e.target.value)} placeholder="Destination public key (G...)" />
          <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Memo (optional)" />
          <button className="rounded bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500" type="submit">Create link</button>
        </form>
        {result && <p className="mt-3 rounded bg-emerald-900/40 p-2 text-sm break-all">{result}</p>}
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      </section>
    </div>
  );
}
