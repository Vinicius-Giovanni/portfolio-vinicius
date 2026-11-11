import { createFileRoute } from '@tanstack/react-router'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { NavBar } from '@/components/ui/NavBar'
import { InsightsList } from '@/components/insights/InsightsList'
import { HAS_INSIGHTS } from '@/data/insights'

type InsightsSearchParams = {
  t?: string
  f?: string
  tag?: string
}

export const Route = createFileRoute('/insights/')({
  validateSearch: (search: Record<string, unknown>): InsightsSearchParams => ({
    t: typeof search.t === 'string' && search.t.trim() ? search.t : undefined,
    f: typeof search.f === 'string' && search.f.trim() ? search.f : undefined,
    tag: typeof search.tag === 'string' && search.tag.trim() ? search.tag : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Insights | Vinícius G Pereira' },
      ...(!HAS_INSIGHTS ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
  }),
  component: InsightsIndexPage,
})

function InsightsIndexPage() {
  const search = Route.useSearch()

  return (
    <>
      <NavBar forceVisible />
      <main className="min-h-screen bg-cream text-navy">
        <div className="mx-auto w-[min(92%,1280px)] px-2 pt-28 pb-24 md:pt-32 md:pb-32">
          <SectionLabel>INSIGHTS</SectionLabel>

          <h1 className="font-anton text-navy mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">
            Análises e raciocínio técnico
          </h1>

          <p className="text-navy/60 mt-6 max-w-2xl text-sm leading-relaxed md:text-base mb-14">
            Modelos de negócio, arquitetura de dados e eficiência operacional com métricas e
            evidências transparentes.
          </p>

          <InsightsList search={search} />
        </div>
      </main>
    </>
  )
}
