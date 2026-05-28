import { ListingStrategy as ListingStrategyType } from '@/lib/schemas';
import { Target } from 'lucide-react';

interface ListingStrategyProps {
  strategy: ListingStrategyType;
}

export function ListingStrategy({ strategy }: ListingStrategyProps) {
  return (
    <div className="mb-8">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4" />
          <p className="text-sm font-medium">Recommended listing strategy</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[13px] leading-relaxed">
            <span className="text-[var(--text-2)]">Target list date:</span> {strategy.targetListDate}
          </p>
          <p className="text-[13px] leading-relaxed">
            <span className="text-[var(--text-2)]">Staging priority:</span> {strategy.stagingPriority}
          </p>
          <p className="text-[13px] leading-relaxed">
            <span className="text-[var(--text-2)]">Marketing emphasis:</span> {strategy.marketingEmphasis}
          </p>
          <p className="text-[13px] leading-relaxed">
            <span className="text-[var(--text-2)]">Photography:</span> {strategy.photography}
          </p>
        </div>
      </div>
    </div>
  );
}
