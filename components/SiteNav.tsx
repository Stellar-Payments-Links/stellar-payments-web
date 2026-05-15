"use client";

import Link from "next/link";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { t, type Locale } from "@/i18n";

export function SiteNav() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = t(locale);

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main">
      <Link href="/" className="font-semibold text-cyan-300">
        Stellar Payment Links
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/dashboard" className="hover:text-cyan-300">
          {copy.nav.dashboard}
        </Link>
        <Link href="/create" className="hover:text-cyan-300">
          {copy.nav.create}
        </Link>
        <LocaleSwitcher onChange={setLocale} />
      </div>
    </nav>
  );
}
