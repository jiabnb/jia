import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Issuer Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <Reveal className="flex flex-col gap-3">
          <span className="eyebrow">Issuer Dashboard</span>
          <h1 className="heading-lg">Manage property pools</h1>
          <p className="body-muted max-w-2xl">
            Add pools, update funding and lifecycle status, and record contract and audit
            details. This is a demonstration surface backed by in-memory mock data.
          </p>
        </Reveal>

        <div className="mt-10">
          <AdminClient />
        </div>
      </div>
    </div>
  );
}
