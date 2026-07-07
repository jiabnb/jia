import { Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
        <Compass className="h-7 w-7" />
      </div>
      <div>
        <h1 className="font-display text-3xl font-semibold text-cream">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Explore
          curated property pools instead.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/pools">Explore Pools</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
