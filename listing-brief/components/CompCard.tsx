import { Comp } from '@/lib/data/types';

interface CompCardProps {
  comp: Comp;
  similarityScore: number;
  reasoning: string;
}

export function CompCard({ comp, similarityScore, reasoning }: CompCardProps) {
  const getPillColor = (score: number) => {
    if (score >= 90) return 'bg-[var(--accent-bg)] text-[var(--accent-text)]';
    if (score >= 85) return 'bg-[var(--surface-2)] text-[var(--text-2)]';
    return 'bg-[var(--warn-bg)] text-[var(--warn-text)]';
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 mb-2">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium text-sm">{comp.address}</p>
          <p className="text-xs text-[var(--text-2)] mt-1">
            {comp.beds} BD / {comp.baths} BA · {comp.sqft.toLocaleString()} sf · {comp.distanceMi} mi · sold{' '}
            {comp.saleDate}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-sm">${comp.salePrice.toLocaleString()}</p>
          <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs rounded-lg font-medium ${getPillColor(similarityScore)}`}>
            {similarityScore}% match
          </span>
        </div>
      </div>
      <p className="text-xs text-[var(--text-2)] mt-2 pt-2 border-t border-[var(--border)]">{reasoning}</p>
    </div>
  );
}
