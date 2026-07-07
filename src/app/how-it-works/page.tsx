import type { Metadata } from "next";
import { ArrowRight, ArrowDown, Network } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { howItWorksSteps, architectureLayers } from "@/data/content";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Understand how Jia connects an offchain property and legal wrapper to an audited smart-contract pool and your BNB Chain wallet.",
};

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pb-8">
        <div className="container-page">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <span className="eyebrow">How It Works</span>
            <h1 className="heading-xl">From discovery to a tracked position</h1>
            <p className="body-muted text-lg">
              Jia is built around a clear, compliance-first journey. Every step keeps
              documentation, eligibility, and honest risk disclosure in view — from the
              first pool you browse to the position you track in your portfolio.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section-pad pt-8">
        <div className="container-page">
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {howItWorksSteps.map((step, i) => (
              <StaggerItem key={step.title} className="h-full">
                <div className="card-base card-hover flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-3xl font-semibold text-white/5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cream">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/20 bg-gold/[0.04] p-5">
            <Network className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-cream">Supported networks.</span> Jia is
              BNB Chain-first. Solana and Base support are currently roadmap items and are
              not active unless marked live inside the app.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="section-pad bg-surface/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="The four-layer model"
            title="How an offchain asset connects to your wallet"
            description="Jia links the physical property to a legal wrapper, an audited smart-contract pool, and finally your BNB Chain wallet. Each layer has a distinct role."
            align="center"
          />

          {/* Desktop: horizontal flow. Mobile: vertical. */}
          <div className="mt-14">
            <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
              {architectureLayers.map((layer, i) => (
                <div key={layer.title} className="flex flex-1 flex-col items-stretch gap-4 lg:flex-row lg:items-center">
                  <Reveal delay={i * 0.08} className="flex-1">
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-gold bg-card p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                        <layer.icon className="h-5.5 w-5.5" />
                      </div>
                      <h3 className="font-display text-base font-semibold text-cream">{layer.title}</h3>
                      <p className="text-xs leading-relaxed text-muted">{layer.body}</p>
                    </div>
                  </Reveal>
                  {i < architectureLayers.length - 1 && (
                    <div className="flex items-center justify-center text-gold/50">
                      <ArrowDown className="h-5 w-5 lg:hidden" />
                      <ArrowRight className="hidden h-5 w-5 lg:block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold bg-card p-6 text-center">
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-cream">Distributions & updates.</span>{" "}
              Where applicable, pool-level distributions and lifecycle updates flow back to
              eligible participants and are reflected in the portfolio, subject to pool
              terms. No distribution or return is guaranteed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-gold bg-card px-8 py-14 text-center">
            <h2 className="heading-lg max-w-2xl">Ready to explore curated property pools?</h2>
            <p className="body-muted max-w-xl">
              Review the documentation and risk disclosures, then complete eligibility
              checks to participate.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/pools" size="lg">
                Explore Pools <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/compliance" variant="secondary" size="lg">
                Compliance layer
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
