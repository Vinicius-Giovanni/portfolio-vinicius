import { Link } from '@tanstack/react-router'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { InsightCard } from '@/components/insights/InsightCard'
import { HAS_INSIGHTS, PUBLISHED } from '@/data/insights'

export function InsightsPreview() {
  if (!HAS_INSIGHTS) return null

  const recent = PUBLISHED.slice(0, 3)

  return (
    <section className="bg-cream relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-[min(92%,1280px)]">
        <SectionLabel>INSIGHTS</SectionLabel>

        <h2
          className="text-navy mt-10 max-w-3xl font-bold leading-tight"
          style={{ fontSize: 'clamp(1.75rem,4vw,3.5rem)' }}
        >
          Análises, métricas e decisões estratégicas
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/insights"
            className="text-navy/60 hover:text-navy inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
          >
            Ver todos os insights →
          </Link>
        </div>
      </div>
    </section>
  )
}
