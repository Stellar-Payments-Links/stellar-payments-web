"use client";

import { FormEvent, useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { PageHeader } from "@/components/PageHeader";
import { LoadingButton } from "@/components/LoadingButton";
import { CopyButton } from "@/components/CopyButton";
import { FormField } from "@/components/FormField";
import { api } from "@/services/api";
import { isPositiveAmount, isValidMemo, isValidPublicKey, isValidTitle } from "@/utils/validators";

export default function CreatePage() {
  const [title, setTitle] = useState("Website design");
  const [amount, setAmount] = useState("25");
  const [destinationPublicKey, setDestinationPublicKey] = useState("");
  const [memo, setMemo] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};
    if (!isValidTitle(title)) next.title = "Title must be at least 2 characters.";
    if (!isPositiveAmount(amount)) next.amount = "Enter a positive XLM amount.";
    if (!isValidPublicKey(destinationPublicKey)) next.destinationPublicKey = "Enter a valid G... public key.";
    if (!isValidMemo(memo)) next.memo = "Memo must be 28 characters or fewer.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setError("");
    setLoading(true);
    try {
      const res = await api.createPaymentLink({ title, amount, destinationPublicKey, memo: memo || undefined });
      setResult(`${window.location.origin}/pay/${res.payment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create payment link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <WalletCard />
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <PageHeader title="Create payment link" subtitle="Generate a shareable URL for your payer." />
        <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
          <FormField label="Title" error={fieldErrors.title}>
            <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormField>
          <FormField label="Amount (XLM)" error={fieldErrors.amount}>
            <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </FormField>
          <FormField label="Destination public key" error={fieldErrors.destinationPublicKey}>
            <input
              className="w-full rounded border border-slate-700 bg-slate-950 p-2"
              value={destinationPublicKey}
              onChange={(e) => setDestinationPublicKey(e.target.value)}
              placeholder="G..."
            />
          </FormField>
          <FormField label="Memo (optional)" error={fieldErrors.memo}>
            <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={memo} onChange={(e) => setMemo(e.target.value)} />
          </FormField>
          <LoadingButton type="submit" loading={loading}>
            Create link
          </LoadingButton>
        </form>
        {result && (
          <div className="mt-3 rounded bg-emerald-900/40 p-2 text-sm break-all">
            <p>{result}</p>
            <CopyButton value={result} />
          </div>
        )}
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      </section>
    </div>
  );
}
