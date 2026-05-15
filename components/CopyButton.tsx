"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [message, setMessage] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setMessage("Copied!");
    } catch {
      setMessage("Copy failed — select the link manually.");
    }
    setTimeout(() => setMessage(""), 2500);
  }

  if (!value) return null;

  return (
    <div>
      <button type="button" onClick={copy} className="mt-2 rounded bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600">
        Copy link
      </button>
      {message && (
        <p className="mt-1 text-xs text-emerald-300" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
