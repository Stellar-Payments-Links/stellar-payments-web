"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";

export function WalletCard() {
  const [secret, setSecret] = useState("");
  const { wallet, error, handleCreate, handleImport } = useWallet();

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">Wallet</h2>
      <p className="mb-3 mt-1 text-sm text-slate-300">
        Create or import a Stellar wallet locally. Keys never leave your browser.
      </p>
      {wallet ? (
        <p className="rounded bg-slate-800 p-2 text-xs break-all">Public key: {wallet.publicKey}</p>
      ) : (
        <p className="text-sm text-amber-300">No wallet loaded.</p>
      )}
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={handleCreate} className="rounded bg-cyan-600 px-3 py-2 text-sm font-medium hover:bg-cyan-500">
          Create wallet
        </button>
        <input
          placeholder="Paste secret key (S...)"
          className="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <button
          onClick={() => handleImport(secret)}
          className="rounded bg-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-600"
        >
          Import wallet
        </button>
        {error && <p className="text-xs text-rose-300">{error}</p>}
      </div>
    </section>
  );
}
