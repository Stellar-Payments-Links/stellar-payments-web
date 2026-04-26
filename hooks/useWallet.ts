"use client";

import { useEffect, useState } from "react";
import { createWallet, getWallet, importWallet, LocalWallet } from "@/lib/stellar";

export function useWallet() {
  const [wallet, setWallet] = useState<LocalWallet | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setWallet(getWallet());
  }, []);

  function handleCreate() {
    const created = createWallet();
    setWallet(created);
    setError(null);
  }

  function handleImport(secret: string) {
    try {
      const imported = importWallet(secret);
      setWallet(imported);
      setError(null);
    } catch {
      setError("Invalid Stellar secret key.");
    }
  }

  return { wallet, error, handleCreate, handleImport };
}
