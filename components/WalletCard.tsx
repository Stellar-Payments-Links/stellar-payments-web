"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useFreighter } from "@/hooks/useFreighter";

export function WalletCard() {
  const [secret, setSecret] = useState("");
  const [freighterError, setFreighterError] = useState("");
  const { wallet, error, handleCreate, handleImport } = useWallet();
  const freighter = useFreighter();

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-4" aria-labelledby="wallet-heading">
      <h2 id="wallet-heading" className="text-lg font-semibold">
        Wallet
      </h2>
      <p className="mb-3 mt-1 text-sm text-slate-300">Create or import a Stellar wallet locally. Keys never leave your browser.</p>
      {wallet ? (
        <p className="rounded bg-slate-800 p-2 text-xs break-all">Public key: {wallet.publicKey}</p>
      ) : freighter.publicKey ? (
        <p className="rounded bg-slate-800 p-2 text-xs break-all">Freighter: {freighter.publicKey}</p>
      ) : (
        <p className="text-sm text-amber-300">No wallet loaded.</p>
      )}
      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => freighter.connect().catch((e) => setFreighterError(e instanceof Error ? e.message : "Freighter failed"))}
          className="rounded border border-cyan-800 px-3 py-2 text-sm hover:bg-slate-800"
        >
          Connect Freighter
        </button>
        {freighterError && <p className="text-xs text-rose-300">{freighterError}</p>}
        <button type="button" onClick={handleCreate} className="rounded bg-cyan-600 px-3 py-2 text-sm font-medium hover:bg-cyan-500">
          Create wallet
        </button>
        <input
          placeholder="Paste secret key (S...)"
          className="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          aria-label="Secret key"
        />
        <button type="button" onClick={() => handleImport(secret)} className="rounded bg-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-600">
          Import wallet
        </button>
        {error && <p className="text-xs text-rose-300">{error}</p>}
      </div>
    </section>
  );
}
