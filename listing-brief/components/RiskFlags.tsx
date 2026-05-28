import { RiskFlags as RiskFlagsType } from '@/lib/schemas';
import { AlertTriangle, Info } from 'lucide-react';

interface RiskFlagsProps {
  riskFlags: RiskFlagsType;
}

export function RiskFlags({ riskFlags }: RiskFlagsProps) {
  if (!riskFlags.flags || riskFlags.flags.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] font-medium mb-3">Risk flags</p>
      {riskFlags.flags.map((flag, idx) => (
        <div
          key={idx}
          className={`flex gap-2.5 p-3.5 rounded-lg mb-2 ${
            flag.severity === 'warning'
              ? 'bg-[var(--warn-bg)] text-[var(--warn-text)]'
              : 'bg-[var(--info-bg)] text-[var(--info-text)]'
          }`}
        >
          {flag.severity === 'warning' ? (
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-[13px]">{flag.message}</p>
        </div>
      ))}
    </div>
  );
}
