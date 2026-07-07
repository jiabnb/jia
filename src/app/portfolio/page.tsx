import type { Metadata } from "next";
import { PortfolioClient } from "./PortfolioClient";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "View the Jia property-pool positions associated with your connected BNB Chain wallet.",
};

export default function PortfolioPage() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow">Portfolio</span>
          <h1 className="heading-xl">Your pool positions</h1>
          <p className="body-muted max-w-2xl">
            Track your participation, claimable distributions, signed documents, and
            transaction history across Jia property pools on BNB Chain.
          </p>
        </Reveal>

        <div className="mt-10">
          <PortfolioClient />
        </div>
      </div>
    </div>
  );
}
