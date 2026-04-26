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
      <body className="bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900/70">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-cyan-300">Stellar Payment Links</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/dashboard" className="hover:text-cyan-300">Dashboard</Link>
              <Link href="/create" className="hover:text-cyan-300">Create Link</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
