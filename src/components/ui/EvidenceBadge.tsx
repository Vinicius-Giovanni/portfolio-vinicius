import { EVIDENCE_LABEL, EVIDENCE_HINT } from '@/data/evidence'
import type { Evidence } from '@/data/evidence'
import { cn } from '@/lib/utils'

const COLOR: Record<Evidence, string> = {
  comprovado: 'bg-emerald-100 text-emerald-800',
  declarado: 'bg-sky-100 text-sky-800',
  estimado: 'bg-amber-100 text-amber-800',
  hipotese: 'bg-slate-100 text-slate-700',
}

export function EvidenceBadge({
  evidence,
  className,
}: {
  evidence: Evidence
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]',
        COLOR[evidence],
        className,
      )}
      title={EVIDENCE_HINT[evidence]}
    >
      {EVIDENCE_LABEL[evidence]}
    </span>
  )
}
