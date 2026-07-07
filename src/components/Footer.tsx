import Link from "next/link";
import { Logo } from "./ui/Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/pools", label: "Property Pools" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/portfolio", label: "Portfolio" },
    ],
  },
  {
    title: "Trust & Compliance",
    links: [
      { href: "/compliance", label: "Compliance" },
      { href: "/risk", label: "Risk Disclosure" },
      { href: "/how-it-works", label: "Documentation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#why", label: "About Jia" },
      { href: "/#faq", label: "FAQ" },
      { href: "/pools", label: "Explore Pools" },
    ],
  },
];

const socials = [
  { href: "https://x.com", label: "X" },
  { href: "https://telegram.org", label: "Telegram" },
  { href: "https://dappbay.bnbchain.org", label: "DappBay" },
];

export function Footer() {
  return (
    <footer className="border-t border-gold bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A compliance-first real-estate RWA platform on BNB Chain, built to help
              eligible users explore curated property pools with transparent
              documentation and on-chain participation records.
            </p>
            <div className="flex gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gold px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-gold/40 hover:text-cream"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold my-10" />

        <div className="rounded-xl border border-gold bg-card/50 p-5">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-semibold text-cream">Disclaimer.</span> Jia currently
            focuses on BNB Chain-based real-estate RWA pool participation. Solana and Base
            support are planned roadmap expansions and are not live unless explicitly
            marked inside the app. Content on this site is not investment, legal, tax, or
            financial advice. Participation in any live pool may be subject to KYC/AML
            checks, jurisdictional restrictions, eligibility requirements, and
            pool-specific terms.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted">
            © {2026} Jia. All rights reserved.
          </p>
          <p className="text-xs text-muted">Built on BNB Chain.</p>
        </div>
      </div>
    </footer>
  );
}
