import type { Metadata } from "next";
import {
  TrendingDown,
  Droplets,
  FileCode2,
  Landmark,
  Globe,
  Scale,
  Users,
  Ban,
  BookOpenCheck,
  ArrowRight,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description:
    "Real estate and tokenized participation carry risk. Read Jia's risk disclosure covering market, liquidity, smart-contract, regulatory, and other risks.",
};

const risks = [
  {
    icon: TrendingDown,
    title: "Real estate market risk",
    body: "Property values, occupancy, and rental demand can decline due to economic, local-market, and sector-specific conditions. Past performance does not indicate future results.",
  },
  {
    icon: Droplets,
    title: "Liquidity risk",
    body: "Pool positions may be illiquid. You may be unable to exit a position when you want, or at all, before a defined event. There is no assurance that any secondary market will exist.",
  },
  {
    icon: FileCode2,
    title: "Smart contract risk",
    body: "Smart contracts may contain bugs or be subject to exploits. Audits reduce but do not eliminate this risk. Interacting with contracts is irreversible and at your own risk.",
  },
  {
    icon: Landmark,
    title: "Regulatory risk",
    body: "Laws and regulations affecting tokenized real estate are evolving and may change. Regulatory action could affect a pool, its structure, or your ability to participate.",
  },
  {
    icon: Globe,
    title: "Jurisdiction risk",
    body: "Availability and eligibility vary by jurisdiction. Participation may be restricted or prohibited where you are located. You are responsible for compliance with local law.",
  },
  {
    icon: Scale,
    title: "Valuation risk",
    body: "Property valuations are periodic estimates prepared under assumptions that may prove inaccurate. Realizable value can differ materially from any stated valuation.",
  },
  {
    icon: Users,
    title: "Counterparty risk",
    body: "Pools depend on third parties, including SPVs, operators, custodians, and service providers. Their failure, insolvency, or misconduct could adversely affect a pool.",
  },
  {
    icon: Ban,
    title: "No guaranteed returns",
    body: "No pool offers guaranteed returns. Targets, projections, and illustrations are not promises. You may lose some or all of the amount you commit.",
  },
];

export default function RiskPage() {
  return (
    <div>
      <section className="section-pad pb-8">
        <div className="container-page">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <span className="eyebrow text-rose-300">Risk Disclosure</span>
            <h1 className="heading-xl">Understand the risks before participating</h1>
            <p className="body-muted text-lg">
              Real estate and tokenized participation carry significant risk. This
              disclosure summarizes key risks but is not exhaustive. Always review the
              official documents for each pool, and obtain independent professional advice
              where appropriate.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-8">
        <div className="container-page">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {risks.map((r) => (
              <StaggerItem key={r.title} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-rose-400/15 bg-rose-400/[0.02] p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-cream">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* No advice + review docs */}
      <section className="section-pad pt-0">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-gold bg-card p-8">
            <div className="mb-3 flex items-center gap-2.5">
              <Ban className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg font-semibold text-cream">No investment advice</h2>
            </div>
            <p className="body-muted">
              Nothing on this site is investment, legal, tax, or financial advice, a
              recommendation, or an offer or solicitation. You are solely responsible for
              your decisions and for determining your own eligibility and suitability.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-gold bg-card p-8">
            <div className="mb-3 flex items-center gap-2.5">
              <BookOpenCheck className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg font-semibold text-cream">Review official pool documents</h2>
            </div>
            <p className="body-muted">
              Each pool&rsquo;s document vault contains the definitive terms, legal wrapper
              summary, and risk disclosures. In case of any conflict, the official pool
              documents govern. Review them in full before participating.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-page">
          <Reveal className="flex flex-col items-start gap-4 rounded-3xl border border-gold bg-gradient-to-br from-card to-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="heading-md">Questions about eligibility or terms?</h2>
              <p className="body-muted mt-2">
                Review the compliance layer to understand how access, KYC/AML, and legal
                wrappers fit together.
              </p>
            </div>
            <ButtonLink href="/compliance" variant="outline" size="lg" className="shrink-0">
              View compliance <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
