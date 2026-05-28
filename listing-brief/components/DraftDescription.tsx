import { Descriptions } from '@/lib/schemas';
import { FileText } from 'lucide-react';

interface DraftDescriptionProps {
  descriptions: Descriptions;
}

export function DraftDescription({ descriptions }: DraftDescriptionProps) {
  return (
    <div className="mb-8">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4" />
          <p className="text-sm font-medium">Draft listing description · lifestyle voice</p>
        </div>
        <p className="text-[13px] leading-relaxed text-[var(--text)]">{descriptions.lifestyle}</p>
        <p className="text-[11px] text-[var(--text-3)] mt-3">
          Two other voices generated (luxury, factual) — see PDF
        </p>
      </div>
    </div>
  );
}
