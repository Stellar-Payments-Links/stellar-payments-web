"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n";

const KEY = "spl_locale";

export function LocaleSwitcher({ onChange }: { onChange: (locale: Locale) => void }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Locale | null;
    if (saved === "en" || saved === "fr") {
      setLocale(saved);
      onChange(saved);
    }
  }, [onChange]);

  function select(next: Locale) {
    setLocale(next);
    localStorage.setItem(KEY, next);
    onChange(next);
  }

  return (
    <div className="flex gap-2 text-xs">
      <button type="button" onClick={() => select("en")} className={locale === "en" ? "text-cyan-300" : "text-slate-400"}>
        EN
      </button>
      <button type="button" onClick={() => select("fr")} className={locale === "fr" ? "text-cyan-300" : "text-slate-400"}>
        FR
      </button>
    </div>
  );
}
