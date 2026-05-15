"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { t, type Locale } from "@/i18n";

export default function HomePage() {
  const [locale] = useState<Locale>("en");
  const copy = t(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-cyan-900 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <PageHeader title="Stellar Payment Links" subtitle="Accept XLM with one shared link." />
        <p className="mt-3 max-w-2xl text-slate-300">
          A public-good toolkit that helps freelancers, creators, and small businesses accept simple XLM payments with one
          shared link.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/create" className="rounded bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500">
            {copy.home.ctaCreate}
          </Link>
          <Link href="/dashboard" className="rounded border border-slate-600 px-4 py-2 font-medium hover:bg-slate-800">
            {copy.home.ctaDashboard}
          </Link>
        </div>
      </section>
    </div>
  );
}
