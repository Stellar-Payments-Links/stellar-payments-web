"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, PaymentLink } from "@/services/api";
import { buildAndSubmitPayment, getWallet } from "@/lib/stellar";
import { PaymentQr } from "@/components/PaymentQr";
import { LoadingButton } from "@/components/LoadingButton";

export default function PayPage() {
  const params = useParams<{ id: string }>();
  const [payment, setPayment] = useState<PaymentLink | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [paying, setPaying] = useState(false);
  const [payUrl, setPayUrl] = useState("");

  useEffect(() => {
    api.getPaymentLink(params.id).then((res) => setPayment(res.payment)).catch((e) => setError(String(e)));
    if (typeof window !== "undefined") setPayUrl(window.location.href);
  }, [params.id]);

  async function handlePay() {
    if (!payment) return;
    const wallet = getWallet();
    if (!wallet) {
      setError("Load a wallet first on /create or /dashboard.");
      return;
    }

    setPaying(true);
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
    } finally {
      setPaying(false);
    }
  }

  if (!payment) return <p>{error || "Loading payment link..."}</p>;

  return (
    <section className="mx-auto max-w-xl rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold">Pay request</h1>
      <p className="mt-2 text-slate-300">{payment.title}</p>
      <div className="mt-4 space-y-1 text-sm">
        <p>
          Amount: <strong>{payment.amount} XLM</strong>
        </p>
        <p className="break-all">To: {payment.destinationPublicKey}</p>
        {payment.memo && <p>Memo: {payment.memo}</p>}
      </div>
      {payUrl && <PaymentQr url={payUrl} />}
      <LoadingButton className="mt-6" loading={paying} onClick={handlePay}>
        Pay now
      </LoadingButton>
      {status && (
        <p className="mt-4 rounded bg-emerald-900/40 p-2 text-sm break-all" role="status">
          {status}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm text-rose-300" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
