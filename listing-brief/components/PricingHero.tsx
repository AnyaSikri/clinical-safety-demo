import { PricingRecommendation } from '@/lib/schemas';

interface PricingHeroProps {
  pricing: PricingRecommendation;
  compCount: number;
  avgSimilarity: number;
}

export function PricingHero({ pricing, compCount, avgSimilarity }: PricingHeroProps) {
  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}K`;
  const formatFullPrice = (price: number) => `$${price.toLocaleString()}`;

  return (
    <div className="mb-8">
      <div className="bg-[var(--surface)] border-2 border-[var(--info-text)] rounded-xl p-5">
        <p className="text-[11px] uppercase tracking-wider text-[var(--info-text)] font-medium mb-2">
          Recommended list price range
        </p>
        <p className="text-[32px] font-medium mb-1">
          {formatFullPrice(pricing.rangeLow)} – {formatFullPrice(pricing.rangeHigh)}
        </p>
        <p className="text-[13px] text-[var(--text-2)] mb-4">
          Based on {compCount} adjusted comps within 0.4 mi · 90-day window · {avgSimilarity}% avg similarity
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[var(--surface-2)] rounded-lg p-3">
            <p className="text-[11px] text-[var(--text-2)] uppercase tracking-wider mb-1">Velocity</p>
            <p className="text-[17px] font-medium">{formatFullPrice(pricing.strategies.velocity.price)}</p>
            <p className="text-xs text-[var(--text-2)] mt-1">
              {pricing.strategies.velocity.domMin}–{pricing.strategies.velocity.domMax} days on market
            </p>
          </div>
          <div className="bg-[var(--surface-2)] rounded-lg p-3">
            <p className="text-[11px] text-[var(--text-2)] uppercase tracking-wider mb-1">Market</p>
            <p className="text-[17px] font-medium">{formatFullPrice(pricing.strategies.market.price)}</p>
            <p className="text-xs text-[var(--text-2)] mt-1">
              {pricing.strategies.market.domMin}–{pricing.strategies.market.domMax} days on market
            </p>
          </div>
          <div className="bg-[var(--surface-2)] rounded-lg p-3">
            <p className="text-[11px] text-[var(--text-2)] uppercase tracking-wider mb-1">Aspirational</p>
            <p className="text-[17px] font-medium">{formatFullPrice(pricing.strategies.aspirational.price)}</p>
            <p className="text-xs text-[var(--text-2)] mt-1">
              {pricing.strategies.aspirational.domMin}–{pricing.strategies.aspirational.domMax} days on market
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
