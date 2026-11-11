import { Link } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import {
  type Insight,
  TERRITORIES,
  FORMATS,
  sectionsFor,
  readingTime,
  PUBLISHED,
} from '@/data/insights'
import { EvidenceBadge } from '@/components/ui/EvidenceBadge'
import { getProjectBySlug } from '@/data/projects'
import { cn } from '@/lib/utils'

export function InsightArticle({ insight }: { insight: Insight }) {
  const territory = TERRITORIES.find((t) => t.id === insight.territory)
  const format = FORMATS.find((f) => f.id === insight.format)
  const minutes = readingTime(insight)
  const expectedSections = sectionsFor(insight.format)

  // Território - anterior / próximo
  const sameTerritory = PUBLISHED.filter((i) => i.territory === insight.territory)
  const currentIdx = sameTerritory.findIndex((i) => i.slug === insight.slug)
  const prev = currentIdx > 0 ? sameTerritory[currentIdx - 1] : undefined
  const next = currentIdx >= 0 && currentIdx < sameTerritory.length - 1 ? sameTerritory[currentIdx + 1] : undefined

  // Cases relacionados
  const relatedCasesData = (insight.relatedCases ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <article className="mx-auto w-[min(92%,1080px)] px-2 pt-28 pb-24 md:pt-32 md:pb-32">
      {/* 1. Kicker, Título, Metadados */}
      <header className="border-navy/15 border-b pb-10">
        <Link
          to="/insights"
          className="text-navy/50 hover:text-navy group mb-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Insights
        </Link>

        <p className="text-navy/50 font-mono text-xs font-bold uppercase tracking-[0.2em]">
          {territory?.label ?? insight.territory} · {format?.label ?? insight.format}
        </p>

        <h1 className="font-anton text-navy mt-4 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">
          {insight.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
          <span className="text-navy/60">{insight.date}</span>
          <span className="text-navy/30">·</span>
          <span className="text-navy/60">{minutes} min de leitura</span>
          <EvidenceBadge evidence={insight.evidence} />
          {insight.reference && (
            <>
              <span className="text-navy/30">·</span>
              <span className="text-navy/60">
                Ref: {insight.reference.name} ({insight.reference.kind})
                {insight.reference.url && (
                  <a
                    href={insight.reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-navy ml-1 inline-flex items-center"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </span>
            </>
          )}
        </div>
      </header>

      {/* 2. Bloco Resultado em destaque */}
      <div className="border-navy/15 bg-cream/70 rounded-brand mt-10 border p-6 md:p-8">
        <p className="text-navy/50 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          {format?.hookLabel ?? 'Resultado'}
        </p>
        <p className="text-navy font-anton mt-3 text-2xl md:text-3xl leading-snug">
          {insight.hook}
        </p>
      </div>

      {/* Grid com Sumário Lateral + Seções */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr]">
        {/* 3. Sumário lateral sticky no desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-2">
            <p className="text-navy/40 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Sumário
            </p>
            {expectedSections.map((secTitle) => (
              <a
                key={secTitle}
                href={`#${encodeURIComponent(secTitle)}`}
                className="text-navy/60 hover:text-navy block text-xs leading-relaxed transition-colors"
              >
                {secTitle}
              </a>
            ))}
          </div>
        </aside>

        {/* 4. Seções na ordem do formato */}
        <div className="space-y-12">
          {insight.sections.map((section) => {
            const isHighlight =
              section.title === 'Interpretação' || section.title === 'Aplicação prática'

            return (
              <section
                key={section.title}
                id={encodeURIComponent(section.title)}
                className={cn(
                  'scroll-mt-28',
                  isHighlight && 'border-navy/15 bg-cream/30 rounded-brand border p-6',
                )}
              >
                <h2 className="font-anton text-navy text-2xl md:text-3xl mb-4">
                  {section.title}
                </h2>

                <div className="text-navy/85 space-y-4 text-sm md:text-base leading-relaxed">
                  {section.body.map((para, pIdx) => {
                    if (para.startsWith('- ')) {
                      return (
                        <ul key={pIdx} className="list-disc pl-5 space-y-1">
                          <li>{para.substring(2)}</li>
                        </ul>
                      )
                    }
                    return <p key={pIdx}>{para}</p>
                  })}
                </div>
              </section>
            )
          })}

          {/* 5. Discussão */}
          <section className="border-navy/15 border-t pt-10">
            <h2 className="font-anton text-navy text-2xl mb-3">Discussão</h2>
            <p className="text-navy/80 text-sm md:text-base leading-relaxed mb-6">
              {insight.discussion}
            </p>
            {insight.linkedinUrl && (
              <a
                href={insight.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-navy/20 bg-navy text-cream hover:opacity-90 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-opacity"
              >
                Discutir no LinkedIn
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </section>

          {/* 6. Fontes */}
          <section className="border-navy/15 border-t pt-10">
            <h2 className="text-navy/50 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Fontes
            </h2>
            <ul className="space-y-2">
              {insight.sources.map((src, i) => (
                <li key={i} className="text-navy/70 text-xs">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-navy inline-flex items-center gap-1 underline underline-offset-2"
                    >
                      {src.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span>{src.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 7. Cases relacionados */}
          {relatedCasesData.length > 0 && (
            <section className="border-navy/15 border-t pt-10">
              <h2 className="text-navy/50 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Cases relacionados
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedCasesData.map((project) => (
                  <Link
                    key={project.slug}
                    to="/projetos/$slug"
                    params={{ slug: project.slug }}
                    className="border-navy/15 hover:border-navy/40 rounded-brand block border p-5 transition-colors"
                  >
                    <p className="text-navy/40 font-mono text-[10px] font-bold uppercase tracking-wider">
                      Case {project.dossierNumber}
                    </p>
                    <p className="font-anton text-navy mt-1 text-lg">{project.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Navegação anterior/próximo no mesmo território */}
          {(prev || next) && (
            <div className="border-navy/15 border-t pt-8 grid gap-4 md:grid-cols-2">
              {prev ? (
                <Link
                  to="/insights/$slug"
                  params={{ slug: prev.slug }}
                  className="border-navy/15 hover:border-navy/40 rounded-brand block border p-4 transition-colors"
                >
                  <span className="text-navy/40 text-[10px] font-bold uppercase">Anterior</span>
                  <p className="font-anton text-navy mt-1 text-base">{prev.title}</p>
                </Link>
              ) : <div />}
              {next && (
                <Link
                  to="/insights/$slug"
                  params={{ slug: next.slug }}
                  className="border-navy/15 hover:border-navy/40 rounded-brand block border p-4 text-right transition-colors"
                >
                  <span className="text-navy/40 text-[10px] font-bold uppercase">Próximo</span>
                  <p className="font-anton text-navy mt-1 text-base">{next.title}</p>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
