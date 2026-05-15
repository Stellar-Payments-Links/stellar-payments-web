import "../styles/globals.css";
import { SiteNav } from "@/components/SiteNav";
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
          <SiteNav />
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
