import { MarketData } from '@/lib/data/types';

interface MarketVelocityProps {
  market: MarketData;
  zipCode?: string;
}

export function MarketVelocity({ market, zipCode }: MarketVelocityProps) {
  const formatDelta = (value: number, isPositiveGood = true) => {
    const sign = value > 0 ? '↑' : value < 0 ? '↓' : '';
    const color = (value > 0 && isPositiveGood) || (value < 0 && !isPositiveGood) ? 'var(--accent)' : 'var(--text-2)';
    return { sign, color, abs: Math.abs(value) };
  };

  const domDelta = formatDelta(market.domTrend, false);
  const listToSaleDelta = formatDelta(market.listToSaleTrend);

  return (
    <div className="mb-8">
      <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] font-medium mb-3">
        Market velocity{zipCode && ` · ${zipCode} micro-market`}
      </p>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">Median DOM</p>
          <p className="text-lg font-medium">{market.medianDom} days</p>
          <p className="text-[11px] mt-0.5" style={{ color: domDelta.color }}>
            {domDelta.sign} from {market.medianDom - market.domTrend}
          </p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">List-to-sale</p>
          <p className="text-lg font-medium">{market.listToSale}%</p>
          <p className="text-[11px] mt-0.5" style={{ color: listToSaleDelta.color }}>
            {listToSaleDelta.sign} from {market.listToSale - market.listToSaleTrend}%
          </p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">Active inventory</p>
          <p className="text-lg font-medium">{market.activeInventory} homes</p>
          <p className="text-[11px] text-[var(--text-2)] mt-0.5">
            {market.inventoryDelta} vs last month
          </p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">90-day price</p>
          <p className="text-lg font-medium">+{market.priceAppreciation90d}%</p>
          <p className="text-[11px] text-[var(--text-2)] mt-0.5">vs city +{market.cityPriceAppreciation90d}%</p>
        </div>
      </div>
    </div>
  );
}
