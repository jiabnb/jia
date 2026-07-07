"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  Network,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { StatCard } from "@/components/StatCard";
import { ChainBadge } from "@/components/ChainBadge";
import { chains } from "@/data/chains";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-radial-fade absolute inset-0 -z-10" />
      <div className="container-page grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        {/* Left: copy */}
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Compliance-first RWAs on BNB Chain
            </span>
          </motion.div>

          <motion.h1
            className="heading-xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            Curated Real Estate Pools on{" "}
            <span className="bg-gold-gradient bg-clip-text text-transparent">
              BNB Chain
            </span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Jia helps eligible users explore tokenized real-estate opportunities with
            property documentation, risk disclosures, KYC-gated participation, and
            transparent smart-contract records.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.19, ease }}
          >
            <ButtonLink href="/pools" size="lg">
              Explore Pools <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" size="lg">
              How Jia Works
            </ButtonLink>
          </motion.div>

          {/* Chain positioning: BNB Chain live/primary, Solana & Base coming soon */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease }}
          >
            <p className="text-xs font-medium text-muted">
              Built on BNB Chain. Expanding to Solana and Base soon.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {chains.map((chain) => (
                <ChainBadge key={chain.key} chain={chain} />
              ))}
            </div>
          </motion.div>

          <motion.p
            className="text-xs text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            Participation is subject to eligibility requirements, KYC/AML checks, and
            pool-specific terms. Not investment advice.
          </motion.p>
        </div>

        {/* Right: image + floating stat cards */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold shadow-card-lift sm:aspect-[4/4.2]">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
              alt="Premium curated real estate"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent" />
          </div>

          {/* Floating stat cards */}
          <div className="pointer-events-none absolute -left-3 top-8 hidden sm:block">
            <div className="pointer-events-auto w-44">
              <StatCard
                icon={<ShieldCheck className="h-4.5 w-4.5" />}
                value="KYC-gated"
                label="Eligible-user access"
                float
                floatDelay={0}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-3 top-1/3 hidden sm:block">
            <div className="pointer-events-auto w-44">
              <StatCard
                icon={<Network className="h-4.5 w-4.5" />}
                value="BNB Chain"
                label="On-chain settlement"
                float
                floatDelay={1.2}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-4 left-6 hidden sm:block">
            <div className="pointer-events-auto w-44">
              <StatCard
                icon={<FileText className="h-4.5 w-4.5" />}
                value="Documented"
                label="Property pools"
                float
                floatDelay={0.6}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile stat row */}
      <div className="container-page grid grid-cols-2 gap-3 pb-10 sm:hidden">
        <StatCard icon={<ShieldCheck className="h-4 w-4" />} value="KYC-gated" label="Eligible access" />
        <StatCard icon={<FileText className="h-4 w-4" />} value="Documented" label="Property pools" />
        <StatCard icon={<Network className="h-4 w-4" />} value="BNB Chain" label="Settlement" />
        <StatCard icon={<AlertTriangle className="h-4 w-4" />} value="Disclosed" label="Risk factors" />
      </div>
    </section>
  );
}
