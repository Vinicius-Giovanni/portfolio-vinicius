import { Link } from '@tanstack/react-router'
import {
  type Insight,
  TERRITORIES,
  FORMATS,
  readingTime,
} from '@/data/insights'
import { EvidenceBadge } from '@/components/ui/EvidenceBadge'

export function InsightCard({ insight }: { insight: Insight }) {
  const territory = TERRITORIES.find((t) => t.id === insight.territory)?.label ?? insight.territory
  const format = FORMATS.find((f) => f.id === insight.format)?.label ?? insight.format
  const minutes = readingTime(insight)

  return (
    <article className="border-navy/15 bg-cream/40 hover:border-navy/40 rounded-brand flex flex-col justify-between border p-6 transition-colors">
      <div>
        <p className="text-navy/50 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          {territory} · {format}
        </p>

        <h3 className="font-anton text-navy mt-3 text-2xl leading-tight">
          <Link
            to="/insights/$slug"
            params={{ slug: insight.slug }}
            className="hover:underline"
          >
            {insight.title}
          </Link>
        </h3>

        <p className="text-navy/70 mt-3 line-clamp-2 text-sm leading-relaxed">
          {insight.hook}
        </p>
      </div>

      <div className="mt-6 border-t border-navy/10 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-navy/40 text-xs font-medium">{insight.date}</span>
            <span className="text-navy/30">·</span>
            <span className="text-navy/40 text-xs font-medium">{minutes} min</span>
          </div>
          <EvidenceBadge evidence={insight.evidence} />
        </div>

        {insight.tags && insight.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {insight.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border-navy/20 text-navy/60 rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
