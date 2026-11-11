import { useNavigate } from '@tanstack/react-router'
import {
  type Insight,
  TERRITORIES,
  FORMATS,
  PUBLISHED,
} from '@/data/insights'
import { EVIDENCE_HINT, EVIDENCE_LABEL, type Evidence } from '@/data/evidence'
import { InsightCard } from './InsightCard'
import { cn } from '@/lib/utils'

type Filters = {
  t?: string
  f?: string
  tag?: string
}

export function InsightsList({ search }: { search: Filters }) {
  const navigate = useNavigate()

  // Territórios visíveis: visible: true OU com ao menos 1 artigo publicado
  const availableTerritories = TERRITORIES.filter(
    (t) => t.visible || PUBLISHED.some((p) => p.territory === t.id),
  )

  const updateSearch = (patch: Partial<Filters>) => {
    navigate({
      to: '/insights',
      search: (prev: Filters) => {
        const next = { ...prev, ...patch }
        return {
          t: next.t || undefined,
          f: next.f || undefined,
          tag: next.tag || undefined,
        }
      },
    })
  }

  // Filtragem considerando apenas publicados
  const filtered = PUBLISHED.filter((item) => {
    if (search.t && item.territory !== search.t) return false
    if (search.f && item.format !== search.f) return false
    if (search.tag && !item.tags.some((tag) => tag.toLowerCase().includes(search.tag!.toLowerCase()))) {
      return false
    }
    return true
  })

  const evidences: Evidence[] = ['comprovado', 'declarado', 'estimado', 'hipotese']

  return (
    <div>
      {/* Legenda de Evidência */}
      <div className="border-navy/10 mb-8 flex flex-wrap items-center gap-4 border-b pb-4 text-xs">
        <span className="text-navy/50 font-bold uppercase tracking-wider text-[10px]">
          Evidência:
        </span>
        {evidences.map((e) => (
          <span
            key={e}
            title={EVIDENCE_HINT[e]}
            className="text-navy/60 hover:text-navy cursor-help transition-colors"
          >
            {EVIDENCE_LABEL[e]}
          </span>
        ))}
      </div>

      {/* Barra de Filtros */}
      <div className="mb-10 flex flex-col gap-4">
        {/* Chips de Território */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => updateSearch({ t: undefined })}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-bold transition-all',
              !search.t
                ? 'bg-navy text-cream'
                : 'border-navy/20 text-navy/60 hover:border-navy/40 hover:text-navy border',
            )}
          >
            Todos os territórios
          </button>
          {availableTerritories.map((t) => (
            <button
              key={t.id}
              onClick={() => updateSearch({ t: search.t === t.id ? undefined : t.id })}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-bold transition-all',
                search.t === t.id
                  ? 'bg-navy text-cream'
                  : 'border-navy/20 text-navy/60 hover:border-navy/40 hover:text-navy border',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Formato e Tag */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={search.f ?? ''}
            onChange={(e) => updateSearch({ f: e.target.value || undefined })}
            className="border-navy/20 bg-cream text-navy rounded-full border px-4 py-1.5 text-xs font-medium focus:outline-none"
            aria-label="Filtrar por formato"
          >
            <option value="">Todos os formatos</option>
            {FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filtrar por tag..."
            value={search.tag ?? ''}
            onChange={(e) => updateSearch({ tag: e.target.value || undefined })}
            className="border-navy/20 bg-cream text-navy placeholder:text-navy/40 rounded-full border px-4 py-1.5 text-xs focus:outline-none"
          />

          <span className="text-navy/40 ml-auto text-xs font-medium">
            {filtered.length} {filtered.length === 1 ? 'insight' : 'insights'}
          </span>
        </div>
      </div>

      {/* Lista ou Vazio */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="border-navy/10 rounded-brand border border-dashed py-16 text-center">
          <p className="text-navy/60 text-sm font-medium">
            Em breve: artigos e análises em elaboração.
          </p>
        </div>
      )}
    </div>
  )
}
