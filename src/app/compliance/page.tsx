import type { Metadata } from "next";
import { ArrowRight, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { complianceSections } from "@/data/content";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "Jia is designed to support compliance-aware real-estate tokenization workflows with KYC/AML, eligibility, legal wrappers, and risk disclosures.",
};

export default function CompliancePage() {
  return (
    <div>
      <section className="section-pad pb-8">
        <div className="container-page">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <span className="eyebrow">Compliance</span>
            <h1 className="heading-xl">Compliance-first, by design</h1>
            <p className="body-muted text-lg">
              Jia is designed to support compliance-aware real-estate tokenization
              workflows. Participation in any live pool may be subject to jurisdictional
              restrictions, KYC/AML checks, eligibility requirements, pool-specific terms,
              and risk acknowledgements.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/20 bg-gold/[0.04] p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-muted">
              Jia does not claim to be a licensed broker, exchange, or financial
              institution. Descriptions on this page reflect how the platform is{" "}
              <span className="text-cream">intended</span> to operate and what it is{" "}
              <span className="text-cream">designed to support</span>, where applicable.
              Actual availability and requirements depend on jurisdiction and pool-specific
              terms.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-8">
        <div className="container-page">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {complianceSections.map((s) => (
              <StaggerItem key={s.title} className="h-full">
                <div className="card-base flex h-full flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cream">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* No investment advice */}
      <section className="section-pad pt-0">
        <div className="container-page">
          <Reveal className="rounded-2xl border border-gold bg-card p-8">
            <h2 className="font-display text-xl font-semibold text-cream">
              No investment advice
            </h2>
            <p className="body-muted mt-3">
              Nothing on this site constitutes investment, legal, tax, or financial advice,
              a recommendation, or an offer or solicitation to buy or sell any asset. Jia
              provides technology for exploring tokenized real-estate pool participation.
              Eligible users are responsible for reviewing the applicable pool documents,
              understanding the risks, and determining their own eligibility and
              suitability, including obtaining independent professional advice where
              appropriate.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad pt-0">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Review the risk disclosure"
              description="Understanding the risks is a core part of the compliance-first journey. Read the full risk disclosure before participating in any pool."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/risk">
                Read risk disclosure <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/pools" variant="secondary">
                Explore pools
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
