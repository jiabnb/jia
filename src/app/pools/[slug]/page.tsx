import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Building2,
  Scale,
  CheckCircle2,
  Circle,
  Clock,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { getPropertyBySlug, getAllSlugs } from "@/data/properties";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PoolPanel } from "@/components/property/PoolPanel";
import { DocumentVault } from "@/components/DocumentVault";
import { RiskDisclosure } from "@/components/RiskDisclosure";
import { Accordion } from "@/components/ui/Accordion";
import { Badge, riskTone } from "@/components/ui/Badge";
import { shortenAddress } from "@/lib/utils";
import { TimelineStep } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: "Pool not found" };
  return {
    title: property.name,
    description: property.tagline,
  };
}

function timelineIcon(state: TimelineStep["state"]) {
  if (state === "complete") return <CheckCircle2 className="h-4 w-4 text-emerald-300" />;
  if (state === "active") return <Clock className="h-4 w-4 text-gold" />;
  return <Circle className="h-4 w-4 text-muted" />;
}

function Block({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-xl font-semibold text-cream">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  return (
    <div className="section-pad pt-8">
      <div className="container-page">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-cream">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/pools" className="hover:text-cream">Property Pools</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-cream">{property.name}</span>
        </nav>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral" icon={<Building2 className="h-3 w-3" />}>
              {property.assetType}
            </Badge>
            <Badge tone={riskTone(property.riskLevel)}>{property.riskLevel} risk</Badge>
            {property.kycRequired && (
              <Badge tone="gold" icon={<ShieldCheck className="h-3 w-3" />}>KYC required</Badge>
            )}
          </div>
          <h1 className="heading-lg">{property.name}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {property.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Scale className="h-4 w-4" /> {property.jurisdiction}
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          {/* LEFT */}
          <div className="min-w-0 space-y-12">
            <PropertyGallery images={property.gallery} alt={property.name} />

            <Block title="Overview">
              <p className="body-muted">{property.description}</p>
            </Block>

            {/* Location placeholder */}
            <Block title="Location">
              <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-gold bg-[linear-gradient(135deg,#12121c,#0d0d14)]">
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(242,199,102,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(242,199,102,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <MapPin className="h-7 w-7 text-gold" />
                  <span className="text-sm font-medium text-cream">{property.location}</span>
                  <span className="text-xs text-muted">Interactive map available on request</span>
                </div>
              </div>
            </Block>

            {/* Specs */}
            <Block title="Property specifications">
              <div className="grid gap-3 sm:grid-cols-2">
                {property.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between rounded-xl border border-gold bg-card px-4 py-3"
                  >
                    <span className="text-sm text-muted">{spec.label}</span>
                    <span className="text-sm font-medium text-cream">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Block>

            {/* Timeline */}
            <Block title="Pool timeline">
              <ol className="space-y-1">
                {property.timeline.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {timelineIcon(step.state)}
                      {i < property.timeline.length - 1 && (
                        <div className="my-1 w-px flex-1 bg-white/10" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="text-sm font-semibold text-cream">{step.phase}</div>
                      <p className="mt-0.5 text-sm text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            {/* Legal structure */}
            <Block title="How this pool is structured">
              <div className="rounded-2xl border border-gold bg-card p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <Scale className="h-5 w-5 text-gold" />
                  <span className="text-sm font-semibold text-cream">Legal structure</span>
                </div>
                <p className="body-muted">
                  Each live Jia property pool should be connected to an offchain legal
                  wrapper and an onchain smart contract record. The token or pool position
                  does not automatically represent direct property title unless explicitly
                  stated in the pool documents. Users must review the applicable terms,
                  eligibility requirements, and risk disclosures before participating.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="text-xs text-muted">Legal wrapper</div>
                    <div className="mt-1 text-sm font-medium text-cream">{property.legalWrapper}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="text-xs text-muted">Legal review status</div>
                    <div className="mt-1 text-sm font-medium text-cream">{property.legalReviewStatus}</div>
                  </div>
                </div>
              </div>
            </Block>

            {/* Risk factors */}
            <Block title="Risk factors">
              <RiskDisclosure risks={property.risks} title="Pool-specific risk factors" />
            </Block>

            {/* Document vault */}
            <Block title="Document vault" id="documents">
              <DocumentVault documents={property.documents} />
            </Block>

            {/* Smart contract */}
            <Block title="Smart contract information">
              <div className="rounded-2xl border border-gold bg-card p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-muted">Pool contract</div>
                    <div className="mt-1 flex items-center gap-2 font-mono text-sm text-cream">
                      {property.contractAddress ? (
                        <>
                          {shortenAddress(property.contractAddress, 6)}
                          <a
                            href={`https://bscscan.com/address/${property.contractAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold/80"
                            aria-label="View on BscScan"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </>
                      ) : (
                        <span className="text-muted">Not yet deployed</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Audit status</div>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <FileCheck2 className="h-4 w-4 text-gold" />
                      <span className="font-medium text-cream">{property.auditStatus}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-5 border-t border-white/5 pt-4 text-xs leading-relaxed text-muted">
                  Audited contracts reduce but do not eliminate smart-contract risk.
                  Contract addresses and audit reports should always be independently
                  verified before participating.
                </p>
              </div>
            </Block>

            {/* FAQ */}
            <Block title="Pool FAQ">
              <Accordion items={property.faq} />
            </Block>
          </div>

          {/* RIGHT sticky */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <PoolPanel property={property} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
