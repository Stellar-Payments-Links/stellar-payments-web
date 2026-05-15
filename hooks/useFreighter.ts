"use client";

import { useCallback, useState } from "react";

declare global {
  interface Window {
    freighterApi?: { isConnected: () => Promise<boolean>; getPublicKey: () => Promise<string> };
  }
}

export function useFreighter() {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const connect = useCallback(async () => {
    if (!window.freighterApi) throw new Error("Freighter extension not detected.");
    const connected = await window.freighterApi.isConnected();
    if (!connected) throw new Error("Approve Freighter connection first.");
    const key = await window.freighterApi.getPublicKey();
    setPublicKey(key);
    return key;
  }, []);

  return { publicKey, connect };
}
