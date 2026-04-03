import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SpendLens",
  description: "Ogni euro pubblico in vista.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--canvas)] text-slate-950">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(38,166,154,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.16),_transparent_38%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,_#0f172a_1px,_transparent_1px),linear-gradient(to_bottom,_#0f172a_1px,_transparent_1px)] [background-size:56px_56px]" />

          <header className="relative z-10 border-b border-slate-200/70 bg-white/72 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold tracking-[0.18em] text-white">SL</div>
                <div>
                  <div className="font-display text-xl font-semibold tracking-[-0.04em] text-slate-950">SpendLens</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Trasparenza sulla spesa pubblica</div>
                </div>
              </Link>
              <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
                <Link href="/dashboard" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950">Dashboard</Link>
                <Link href="/methodology" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950">Metodo</Link>
                <Link href="/sources" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950">Fonti</Link>
              </nav>
            </div>
          </header>

          <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 lg:px-10">
            {children}
          </main>

          <footer className="relative z-10 border-t border-slate-200/70 bg-white/72 backdrop-blur-xl">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-8 text-sm text-slate-600 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
              <div>
                <div className="font-display text-lg font-semibold text-slate-950">Ogni euro pubblico in vista.</div>
                <p className="mt-3 max-w-md leading-7">
                  Un MVP rapido per la fiducia pubblica: stato dei dossier leggibile, metodo visibile e logica aperta per semafori su costo, tempo e completezza dei dati.
                </p>
              </div>
              <div>
                <div className="footer-title">Metodo</div>
                <Link href="/methodology" className="footer-link">Regole semaforiche</Link>
                <Link href="/methodology" className="footer-link">Logica di valutazione</Link>
              </div>
              <div>
                <div className="footer-title">Regole</div>
                <Link href="/policy" className="footer-link">Nota di neutralità</Link>
                <Link href="/policy" className="footer-link">Regole d&apos;uso</Link>
              </div>
              <div>
                <div className="footer-title">Fonti</div>
                <Link href="/sources" className="footer-link">Provenienza dei dati</Link>
                <Link href="/dashboard" className="footer-link">Registro dossier</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
