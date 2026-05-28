'use client';

import { use, useEffect, useState } from 'react';
import { PropertySummary } from '@/components/PropertySummary';
import { PricingHero } from '@/components/PricingHero';
import { CompCard } from '@/components/CompCard';
import { MarketVelocity } from '@/components/MarketVelocity';
import { NeighborhoodCards } from '@/components/NeighborhoodCards';
import { ListingStrategy } from '@/components/ListingStrategy';
import { RiskFlags } from '@/components/RiskFlags';
import { DraftDescription } from '@/components/DraftDescription';
import { BriefResult } from '@/lib/pipeline';

export default function BriefPage({ params }: { params: Promise<{ address: string }> }) {
  const resolvedParams = use(params);
  const address = decodeURIComponent(resolvedParams.address);

  const [data, setData] = useState<BriefResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateBrief() {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate brief');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    generateBrief();
  }, [address]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--border-2)] border-t-[var(--accent)] rounded-full animate-spin mb-4"></div>
          <p className="text-[var(--text-2)]">Generating your listing intelligence brief...</p>
          <p className="text-sm text-[var(--text-3)] mt-2">This may take 20-30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-medium mb-3">Error</h1>
          <p className="text-[var(--text-2)] mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[var(--info-text)] text-white rounded-lg font-medium hover:opacity-90"
          >
            Try another address
          </a>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const avgSimilarity = Math.round(
    data.adjustments.adjustments.reduce((sum, adj) => sum + adj.similarityScore, 0) /
      data.adjustments.adjustments.length
  );

  const zipMatch = address.match(/\d{5}/);
  const zipCode = zipMatch ? zipMatch[0] : undefined;

  return (
    <div className="min-h-screen p-8 pb-16">
      <div className="max-w-[760px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start pb-5 border-b border-[var(--border)] mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] font-medium mb-1.5">
              Listing intelligence brief
            </p>
            <p className="text-[22px] font-medium">{address}</p>
            <p className="text-[13px] text-[var(--text-2)] mt-1.5">
              Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ·
              Confidence {data.pricing.confidence}%
            </p>
          </div>
          <button className="px-3.5 py-2 text-[13px] bg-[var(--surface)] border border-[var(--border-2)] rounded-lg font-medium hover:bg-[var(--surface-2)]">
            ↓ Download PDF
          </button>
        </div>

        <PropertySummary property={data.property} />
        <PricingHero pricing={data.pricing} compCount={data.comps.length} avgSimilarity={avgSimilarity} />

        {/* Comps */}
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] font-medium mb-3">
            Comparable sales
          </p>
          {data.comps.map((comp, idx) => {
            const adjustment = data.adjustments.adjustments.find((adj) => adj.compAddress === comp.address);
            if (!adjustment) return null;
            return (
              <CompCard
                key={idx}
                comp={comp}
                similarityScore={adjustment.similarityScore}
                reasoning={adjustment.reasoning}
              />
            );
          })}
        </div>

        <MarketVelocity market={data.market} zipCode={zipCode} />
        <NeighborhoodCards neighborhood={data.neighborhood} />
        <ListingStrategy strategy={data.strategy} />
        <RiskFlags riskFlags={data.riskFlags} />
        <DraftDescription descriptions={data.descriptions} />
      </div>
    </div>
  );
}
