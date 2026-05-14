"use client";

import { useEffect, useState } from "react";
import { createWallet, getWallet, importWallet, LocalWallet } from "@/lib/stellar";

export function useWallet() {
  const [wallet, setWallet] = useState<LocalWallet | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setWallet(getWallet());
  }, []);

  async function handleCreate() {
    try {
      const created = await createWallet();
      setWallet(created);
      setError(null);
    } catch {
      setError("Unable to create wallet.");
    }
  }

  async function handleImport(secret: string) {
    try {
      const imported = await importWallet(secret);
      setWallet(imported);
      setError(null);
    } catch {
      setError("Invalid Stellar secret key.");
    }
  }

  return { wallet, error, handleCreate, handleImport };
}
