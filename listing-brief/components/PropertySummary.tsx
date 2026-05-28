import { PropertyData } from '@/lib/data/types';

interface PropertySummaryProps {
  property: PropertyData;
}

export function PropertySummary({ property }: PropertySummaryProps) {
  return (
    <div className="mb-8">
      <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] font-medium mb-3">
        Property summary
      </p>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">Beds / baths</p>
          <p className="text-lg font-medium">
            {property.beds} / {property.baths}
          </p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">Square feet</p>
          <p className="text-lg font-medium">{property.sqft.toLocaleString()}</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">Lot size</p>
          <p className="text-lg font-medium">{property.lotSqft.toLocaleString()} sf</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg p-3.5">
          <p className="text-xs text-[var(--text-2)] mb-1">Year built</p>
          <p className="text-lg font-medium">{property.yearBuilt}</p>
        </div>
      </div>
      <p className="text-[13px] text-[var(--text-2)] mt-3">
        {property.propertyType}
        {property.renovationYear && ` · Renovated ${property.renovationYear}`}
        {property.lastSale &&
          ` · Last sold ${property.lastSale.date} for $${property.lastSale.price.toLocaleString()}`}
      </p>
    </div>
  );
}
