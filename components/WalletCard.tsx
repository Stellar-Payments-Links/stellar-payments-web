"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";

export function WalletCard() {
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const { wallet, error, handleCreate, handleImport } = useWallet();

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Wallet</h2>
          <p className="mt-1 text-sm text-slate-400">Create or import a Stellar wallet locally. Keys never leave your browser.</p>
        </div>
        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200">Secure</span>
      </div>

      <div className="mt-6 space-y-4">
        {wallet ? (
          <div className="space-y-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Public key</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="break-all text-sm text-slate-200">{wallet.publicKey}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(wallet.publicKey)}
                  className="inline-flex items-center rounded-full bg-slate-800 px-3 py-2 text-xs font-medium text-cyan-200 transition hover:bg-cyan-600/20"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Secret key</p>
                  <p className="mt-2 break-all text-sm text-slate-300">
                    {showSecret ? wallet.secret : "••••••••••••••••••••••••••••••••"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <button
                    type="button"
                    onClick={() => setShowSecret((current) => !current)}
                    className="rounded-full bg-slate-800 px-3 py-2 text-xs font-medium text-cyan-200 transition hover:bg-cyan-600/20"
                  >
                    {showSecret ? "Hide" : "Reveal"}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(wallet.secret)}
                    className="rounded-full bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
                  >
                    Copy secret
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300">
            No wallet loaded yet. Create a new wallet or import an existing one to get started.
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleCreate}
            className="w-full rounded-3xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-500"
          >
            Create wallet
          </button>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Paste secret key (S...)"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleImport(secret)}
              className="rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Import wallet
            </button>
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}
        </div>
      </div>
    </section>
  );
}
