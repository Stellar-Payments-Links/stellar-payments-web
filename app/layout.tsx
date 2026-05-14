import "../styles/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Stellar Payment Links",
  description: "Create and share simple Stellar payment links for freelancers and small businesses."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_24%),radial-gradient(circle_at_100%_20%,rgba(56,189,248,0.1),transparent_26%)]">
          <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
              <Link href="/" className="text-lg font-semibold tracking-tight text-cyan-300">Stellar Payment Links</Link>
              <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                <Link href="/dashboard" className="rounded-full border border-slate-800 px-4 py-2 transition hover:border-cyan-500 hover:text-cyan-200">Dashboard</Link>
                <Link href="/create" className="rounded-full bg-cyan-600 px-4 py-2 text-slate-950 transition hover:bg-cyan-500">Create link</Link>
              </div>
            </nav>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
