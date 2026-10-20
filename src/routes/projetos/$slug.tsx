import { useRef } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PROJECTS, getProjectBySlug } from '@/data/projects'
import { DiagnosticRenderer } from '@/components/projects/diagnostics/DiagnosticRenderer'
import { NavBar } from '#/components/ui/NavBar'

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

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <>
    <NavBar forceVisible />
    <main key={project.slug} className="pt-16 bg-cream text-navy min-h-screen">
      {/* ================= HERO ================= */}
      <CaseHero project={project} />

      {/* ================= CONTENT ================= */}
      <div className="mx-auto w-[min(92%,1080px)] px-2 pb-24 md:pb-32">
        {/* 01 · CONTEXTO */}
        {project.context && (
          <NumberedSection number="01" title="Contexto">
            <p className="text-navy/80 text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed">
              {project.context}
            </p>
          </NumberedSection>
        )}

        {/* 02 · DESAFIO — tipografia gigante */}
        {project.challenge && (
          <NumberedSection number="02" title="Desafio">
            <p className="font-anton text-navy text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] tracking-tight">
              {project.challenge}
            </p>
          </NumberedSection>
        )}

        {/* 03 · ABORDAGEM — timeline */}
        {project.approach && project.approach.length > 0 && (
          <NumberedSection number="03" title="Abordagem">
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

        {/* 04 · STACK */}
        {project.stack && project.stack.length > 0 && (
          <NumberedSection number="04" title="Stack técnica">
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

        {/* 05 · DIAGNÓSTICO */}
        {project.visual !== 'none' && (
          <div className="mt-20 md:mt-28">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-navy/40 font-mono text-sm font-bold tracking-[0.2em] md:text-base">
                05
              </span>
              <span className="text-navy text-sm font-bold tracking-[0.2em] uppercase md:text-base">
                Diagnóstico
              </span>
              <span className="bg-navy/20 h-px flex-1" />
            </div>
            <DiagnosticRenderer slug={project.slug} accentColor={project.accentColor} />
          </div>
        )}

        {/* 06 · RESULTADO — TAKEOVER */}
        {project.results && project.results.length > 0 && (
          <ResultsTakeover
            results={project.results}
            accentColor={project.accentColor}
          />
        )}

        {/* 07 · APRENDIZADO — quote gigante */}
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

        {/* NAVEGAÇÃO */}
        <div className="border-navy/15 mt-24 grid gap-3 border-t pt-8 md:grid-cols-2">
          <Link
            to="/projetos"
            className="group border-navy/15 hover:border-navy/40 rounded-brand flex items-center gap-4 border p-5 transition-colors"
          >
            <ArrowLeft className="text-navy/40 group-hover:text-navy h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <div>
              <p className="text-navy/40 text-[10px] font-bold tracking-[0.15em] uppercase">
                Voltar
              </p>
              <p className="text-navy mt-1 text-sm font-bold">Todos os dossiês</p>
            </div>
          </Link>

          <Link
            to="/projetos/$slug"
            params={{ slug: next.slug }}
            className="group border-navy/15 hover:border-navy/40 rounded-brand flex items-center justify-between gap-4 border p-5 text-right transition-colors"
          >
            <div className="flex-1">
              <p className="text-navy/40 text-[10px] font-bold tracking-[0.15em] uppercase">
                Próximo dossiê · {next.dossierNumber}
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
function CaseHero({ project }: { project: ReturnType<typeof getProjectBySlug> & object }) {
  return (
    <header className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28">
      {/* Gradient backdrop */}
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
          Dossiês
        </Link>

        {/* Dossier badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <div className="border-navy/30 flex items-center gap-2 rounded-full border px-3 py-1.5">
            <span className="bg-navy h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="text-navy font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
              Dossiê {project.dossierNumber} · Declassified
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

        {/* Métricas hero */}
        {project.results && project.results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          >
            {project.results.slice(0, 4).map((m, i) => (
              <div
                key={i}
                className="border-navy/15 bg-cream/60 rounded-2xl border p-4 backdrop-blur-sm md:p-5"
              >
                <p
                  className="font-anton text-[clamp(1.25rem,2.2vw,1.75rem)] leading-none tracking-tight"
                  style={{ color: project.accentColor }}
                >
                  {m.value}
                </p>
                <p className="text-navy/55 mt-2 text-[10px] leading-tight font-bold tracking-[0.1em] uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  )
}

// ============================================================
// SECTION WRAPPER (com número editorial)
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
      className="mt-20 md:mt-28"
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
// RESULTS TAKEOVER
// ============================================================
function ResultsTakeover({
  results,
  accentColor,
}: {
  results: { value: string; label: string }[]
  accentColor: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const total = results.length
  const segment = total > 0 ? 0.85 / total : 0.2

  return (
    <section
      ref={ref}
      className="relative mt-20 md:mt-28 h-[180vh]"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-4">
        {/* Background dramático */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}18, transparent 65%)`,
          }}
        />

        {/* Number + label header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-14"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-navy/40 font-mono text-[11px] font-bold tracking-[0.2em]">
              06
            </span>
            <span className="text-navy/70 text-[10px] font-bold tracking-[0.3em] uppercase">
              Resultado
            </span>
          </div>
          <p className="text-navy/50 mt-3 text-sm">
            {total} {total === 1 ? 'métrica' : 'métricas'} auditáveis
          </p>
        </motion.div>

        {/* Grid de números */}
        <div
          className={`grid w-full max-w-6xl gap-3 md:gap-4 ${
            total <= 4
              ? 'grid-cols-2'
              : total <= 6
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-3'
          }`}
        >
          {results.map((metric, i) => (
            <ResultNumber
              key={i}
              metric={metric}
              progress={scrollYProgress}
              start={i * segment}
              end={i * segment + segment * 1.4}
              accentColor={accentColor}
              reduced={reduced}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ResultNumber({
  metric,
  progress,
  start,
  end,
  accentColor,
  reduced,
  isFirst,
}: {
  metric: { value: string; label: string }
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
  accentColor: string
  reduced: boolean | null
  isFirst: boolean
}) {
  const scale = useTransform(progress, [start, end], [0.4, 1])
  const opacity = useTransform(progress, [start, end], [0, 1])

  const finalStyle = reduced
    ? { scale: 1, opacity: 1 }
    : { scale, opacity }

  // Detectar se o value é muito longo (ex: "R$ 13M → R$ 8M")
  const isLongValue = metric.value.length > 8

  return (
    <motion.div
      style={finalStyle}
      className="border-navy/15 bg-cream/60 hover:bg-cream flex flex-col rounded-2xl border p-5 backdrop-blur-sm transition-colors md:p-7"
    >
      <p
        className={`font-anton leading-[0.95] tracking-tight ${
          isLongValue ? 'text-[clamp(1.25rem,2.5vw,2rem)]' : 'text-[clamp(1.75rem,4vw,3.5rem)]'
        }`}
        style={{ color: isFirst ? accentColor : '#0B1F3A' }}
      >
        {metric.value}
      </p>
      <p className="text-navy/55 mt-3 text-[10px] leading-tight font-bold tracking-[0.15em] uppercase md:text-[11px]">
        {metric.label}
      </p>
    </motion.div>
  )
}