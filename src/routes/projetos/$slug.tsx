import { useEffect } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, CalendarDays, Phone } from 'lucide-react'
import { PROJECTS, getProjectBySlug, type Project } from '@/data/projects'
import { DiagnosticRenderer } from '@/components/projects/diagnostics/DiagnosticRenderer'
import { EvidenceBadge } from '@/components/ui/EvidenceBadge'
import { NavBar } from '@/components/ui/NavBar'
import { calUrl, WHATSAPP_URL } from '@/data/site'
import { track } from '@/lib/track'
import { PUBLISHED } from '@/data/insights'

export const Route = createFileRoute('/projetos/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) throw notFound()
    return { project }
  },
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const { project } = Route.useLoaderData()

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [project.slug])

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]
  const relatedInsights = PUBLISHED.filter((i) => i.relatedCases?.includes(project.slug))

  return (
    <>
      <NavBar forceVisible />
      <main key={project.slug} className="min-h-screen bg-cream pt-16 text-navy">
        {/* ================= HERO ================= */}
        <CaseHero project={project} />

        {/* ================= CONTENT ================= */}
        <div className="mx-auto w-[min(92%,1080px)] px-2 pb-24 md:pb-32">
          {/* 01 · RESULTADO */}
          {project.results && project.results.length > 0 && (
            <NumberedSection number="01" title="Resultado">
              <ResultsGrid results={project.results} accentColor={project.accentColor} />
            </NumberedSection>
          )}

          {/* 02 · CONTEXTO */}
          {project.context && (
            <NumberedSection number="02" title="Contexto">
              <p className="text-navy/80 text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed">
                {project.context}
              </p>
            </NumberedSection>
          )}

          {/* 03 · DESAFIO */}
          {project.challenge && (
            <NumberedSection number="03" title="Desafio">
              <p className="font-anton text-navy text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] tracking-tight">
                {project.challenge}
              </p>
            </NumberedSection>
          )}

          {/* 04 · ABORDAGEM */}
          {project.approach && project.approach.length > 0 && (
            <NumberedSection number="04" title="Abordagem">
              <ol className="relative space-y-5 pl-8">
                <div className="bg-navy/15 absolute top-2 bottom-2 left-2 w-px" aria-hidden />
                {project.approach.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    <span
                      className="absolute top-1.5 -left-6 flex h-4 w-4 items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: project.accentColor,
                        backgroundColor: '#EDE6D8',
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                      />
                    </span>
                    <p className="text-navy/85 text-sm leading-relaxed md:text-base">{step}</p>
                  </motion.li>
                ))}
              </ol>
            </NumberedSection>
          )}

          {/* 05 · STACK */}
          {project.stack && project.stack.length > 0 && (
            <NumberedSection number="05" title="Stack técnica">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-navy/25 bg-cream/50 text-navy hover:border-navy/50 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </NumberedSection>
          )}

          {/* 06 · DIAGNÓSTICO */}
          {project.visual !== 'none' && (
            <NumberedSection number="06" title="Diagnóstico">
              <DiagnosticRenderer slug={project.slug} accentColor={project.accentColor} />
            </NumberedSection>
          )}

          {/* 07 · APRENDIZADO */}
          {project.learnings && (
            <NumberedSection number="07" title="Aprendizado">
              <div className="relative">
                <span
                  className="font-anton text-navy/[0.08] pointer-events-none absolute -top-12 -left-2 leading-none select-none md:-top-16 md:-left-6"
                  style={{ fontSize: 'clamp(6rem, 14vw, 12rem)' }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="relative max-w-3xl">
                  <p className="text-navy/85 text-[clamp(1.1rem,2vw,1.5rem)] leading-snug font-medium italic">
                    {project.learnings}
                  </p>
                </blockquote>
              </div>
            </NumberedSection>
          )}

          {/* INSIGHTS RELACIONADOS */}
          {relatedInsights.length > 0 && (
            <NumberedSection number="08" title="Insights relacionados">
              <div className="grid gap-4 md:grid-cols-2">
                {relatedInsights.map((insight) => (
                  <Link
                    key={insight.slug}
                    to="/insights/$slug"
                    params={{ slug: insight.slug }}
                    className="border-navy/15 hover:border-navy/40 rounded-brand block border p-5 transition-colors"
                  >
                    <p className="font-anton text-navy text-xl">{insight.title}</p>
                    <p className="text-navy/60 mt-2 line-clamp-2 text-xs leading-relaxed">
                      {insight.hook}
                    </p>
                  </Link>
                ))}
              </div>
            </NumberedSection>
          )}

          {/* BLOCO CTA */}
          <div className="border-navy/15 rounded-brand mt-20 border p-6 text-center md:p-8">
            <h3 className="font-anton text-navy text-2xl md:text-3xl">
              Conversar sobre este case
            </h3>
            <p className="text-navy/60 mt-2 text-xs md:text-sm">
              Agende 30 minutos ou entre em contato pelo WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={calUrl('case')}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="case"
                onClick={() => track('cta_click', { location: 'case', type: 'agendar' })}
                className="border-navy/20 bg-navy text-cream hover:opacity-90 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-opacity"
              >
                <CalendarDays className="h-4 w-4" />
                Agendar 30 min
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="case"
                onClick={() => track('cta_click', { location: 'case', type: 'whatsapp' })}
                className="border-navy/15 text-navy hover:border-navy/40 hover:bg-navy/5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-colors"
              >
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* NAVEGAÇÃO */}
          <div className="border-navy/15 mt-16 grid gap-3 border-t pt-8 md:grid-cols-2">
            <Link
              to="/projetos"
              className="group border-navy/15 hover:border-navy/40 rounded-brand flex items-center gap-4 border p-5 transition-colors"
            >
              <ArrowLeft className="text-navy/40 group-hover:text-navy h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <div>
                <p className="text-navy/40 text-[10px] font-bold tracking-[0.15em] uppercase">
                  Voltar
                </p>
                <p className="text-navy mt-1 text-sm font-bold">Todos os cases</p>
              </div>
            </Link>

            <Link
              to="/projetos/$slug"
              params={{ slug: next.slug }}
              className="group border-navy/15 hover:border-navy/40 rounded-brand flex items-center justify-between gap-4 border p-5 text-right transition-colors"
            >
              <div className="flex-1">
                <p className="text-navy/40 text-[10px] font-bold tracking-[0.15em] uppercase">
                  Próximo case · {next.dossierNumber}
                </p>
                <p className="text-navy mt-1 text-sm font-bold">{next.title}</p>
              </div>
              <ArrowRight className="text-navy/40 group-hover:text-navy h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

// ============================================================
// HERO
// ============================================================
function CaseHero({ project }: { project: Project }) {
  return (
    <header className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse at 70% 20%, ${project.accentColor}15, transparent 55%)`,
        }}
      />

      <div className="mx-auto w-[min(92%,1080px)] px-2">
        {/* Breadcrumb */}
        <Link
          to="/projetos"
          className="text-navy/50 hover:text-navy group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Cases
        </Link>

        {/* Case badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <div className="border-navy/30 flex items-center gap-2 rounded-full border px-3 py-1.5">
            <span className="bg-navy h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="text-navy font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
              Case {project.dossierNumber}
            </span>
          </div>
          <span
            className="rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-white uppercase"
            style={{ backgroundColor: project.accentColor }}
          >
            {project.category}
          </span>
          <span className="text-navy/40 text-[11px] font-medium">{project.year}</span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-anton text-navy mt-8 max-w-4xl text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.92] tracking-tight"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-navy/55 mt-4 text-base md:text-lg"
        >
          {project.subtitle}
        </motion.p>

        {project.role && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-navy/70 mt-3 text-sm font-semibold"
          >
            Meu papel: {project.role}
          </motion.p>
        )}
      </div>
    </header>
  )
}

// ============================================================
// SECTION WRAPPER
// ============================================================
function NumberedSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 md:mt-24"
    >
      <div className="mb-8 flex items-center gap-4">
        <span className="text-navy/40 font-mono text-sm font-bold tracking-[0.2em] md:text-base">
          {number}
        </span>
        <span className="text-navy text-sm font-bold tracking-[0.2em] uppercase md:text-base">
          {title}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-navy/20 h-px flex-1 origin-left"
        />
      </div>
      {children}
    </motion.section>
  )
}

// ============================================================
// RESULTS GRID
// ============================================================
function ResultsGrid({
  results,
  accentColor,
}: {
  results: NonNullable<Project['results']>
  accentColor: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {results.map((m, i) => {
        const isFirst = i === 0
        const isLongValue = m.value.length > 8
        return (
          <div
            key={i}
            className="border-navy/15 bg-cream/60 flex flex-col justify-between rounded-2xl border p-4 backdrop-blur-sm md:p-5"
          >
            <div>
              <p
                className={`font-anton leading-[0.95] tracking-tight ${
                  isLongValue
                    ? 'text-[clamp(1.25rem,2.2vw,1.75rem)]'
                    : 'text-[clamp(1.5rem,3vw,2.5rem)]'
                }`}
                style={{ color: isFirst ? accentColor : '#0B1F3A' }}
              >
                {m.value}
              </p>
              <p className="text-navy/70 mt-2 text-xs font-semibold leading-tight">
                {m.label}
              </p>
            </div>

            <div className="mt-4">
              <EvidenceBadge evidence={m.evidence ?? 'comprovado'} />
              {m.method && (
                <p className="text-navy/50 mt-1.5 text-[10px] leading-snug">{m.method}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
