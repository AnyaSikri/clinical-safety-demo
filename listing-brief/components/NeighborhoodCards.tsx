import { NeighborhoodData } from '@/lib/data/types';
import { GraduationCap, Shield, Footprints, Leaf } from 'lucide-react';

interface NeighborhoodCardsProps {
  neighborhood: NeighborhoodData;
}

export function NeighborhoodCards({ neighborhood }: NeighborhoodCardsProps) {
  const getRatingPill = (rating: number) => {
    if (rating >= 7) return 'bg-[var(--accent-bg)] text-[var(--accent-text)]';
    return 'bg-[var(--surface-2)] text-[var(--text-2)]';
  };

  const getStatusPill = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('below') || lowerStatus.includes('good') || lowerStatus.includes('minimal')) {
      return 'bg-[var(--accent-bg)] text-[var(--accent-text)]';
    }
    if (lowerStatus.includes('moderate')) {
      return 'bg-[var(--warn-bg)] text-[var(--warn-text)]';
    }
    return 'bg-[var(--surface-2)] text-[var(--text-2)]';
  };

  return (
    <div className="mb-8">
      <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] font-medium mb-3">
        Neighborhood intelligence
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Schools */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4" />
            <p className="text-sm font-medium">Schools</p>
          </div>
          {neighborhood.schools.map((school, idx) => (
            <div key={idx} className="flex justify-between items-center py-2.5 border-b border-[var(--border)] last:border-0">
              <div>
                <p className="text-sm">{school.name}</p>
                <p className="text-[11px] text-[var(--text-3)] mt-0.5">
                  {school.distanceMi} mi · {school.trend}
                </p>
              </div>
              <span className={`px-2.5 py-0.5 text-xs rounded-lg font-medium ${getRatingPill(school.rating)}`}>
                {school.rating}/10
              </span>
            </div>
          ))}
        </div>

        {/* Crime & Safety */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4" />
            <p className="text-sm font-medium">Crime & safety</p>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-2)]">Property crime, 12mo</span>
            <span className="text-[13px] font-medium">{neighborhood.crime.propertyCrimeYoyPct}% YoY</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-2)]">Violent crime, 12mo</span>
            <span className="text-[13px] font-medium">{neighborhood.crime.violentCrimeYoyPct}% YoY</span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="text-[13px] text-[var(--text-2)]">vs Berkeley average</span>
            <span className={`px-2.5 py-0.5 text-xs rounded-lg font-medium capitalize ${getStatusPill(neighborhood.crime.vsCityAvg)}`}>
              {neighborhood.crime.vsCityAvg}
            </span>
          </div>
        </div>

        {/* Walkability */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Footprints className="w-4 h-4" />
            <p className="text-sm font-medium">Walkability</p>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-2)]">Walk Score</span>
            <span className="text-[13px] font-medium">
              {neighborhood.walkability.walkScore} ·{' '}
              {neighborhood.walkability.walkScore >= 90
                ? 'paradise'
                : neighborhood.walkability.walkScore >= 70
                  ? 'very walkable'
                  : 'walkable'}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-2)]">Bike Score</span>
            <span className="text-[13px] font-medium">
              {neighborhood.walkability.bikeScore} ·{' '}
              {neighborhood.walkability.bikeScore >= 90
                ? 'paradise'
                : neighborhood.walkability.bikeScore >= 70
                  ? 'very bikeable'
                  : 'bikeable'}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="text-[13px] text-[var(--text-2)]">Transit Score</span>
            <span className="text-[13px] font-medium">
              {neighborhood.walkability.transitScore} ·{' '}
              {neighborhood.walkability.transitScore >= 70
                ? 'excellent'
                : neighborhood.walkability.transitScore >= 50
                  ? 'good'
                  : 'some transit'}
            </span>
          </div>
        </div>

        {/* Environmental */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4" />
            <p className="text-sm font-medium">Environmental</p>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-2)]">FEMA flood zone</span>
            <span className={`px-2.5 py-0.5 text-xs rounded-lg font-medium ${getStatusPill('minimal')}`}>
              {neighborhood.environmental.femaFloodZone} · minimal
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-2)]">Wildfire risk</span>
            <span
              className={`px-2.5 py-0.5 text-xs rounded-lg font-medium capitalize ${getStatusPill(neighborhood.environmental.wildfireRisk)}`}
            >
              {neighborhood.environmental.wildfireRisk}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="text-[13px] text-[var(--text-2)]">Air quality, avg</span>
            <span
              className={`px-2.5 py-0.5 text-xs rounded-lg font-medium capitalize ${getStatusPill(neighborhood.environmental.airQuality)}`}
            >
              {neighborhood.environmental.airQuality}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
