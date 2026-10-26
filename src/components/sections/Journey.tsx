import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Chapter = {
  year: string
  title: string
  text: string
  accent: string
  isCurrent?: boolean
}

const TIMELINE: Chapter[] = [
  {
    year: '2021',
    title: 'O começo',
    text: 'Entro como ajudante interno no Grupo Casas Bahia',
    accent: '#8B6914',
  },
  {
    year: '2023',
    title: 'Crescimento',
    text: 'Passa a assistente administrativo',
    accent: '#C9A227',
  },
  {
    year: '2024',
    title: 'A virada',
    text: 'Passa a analista de dados com foco em dados e RPA',
    accent: '#4A90B8',
  },
  {
    year: '2025',
    title: 'Formação',
    text: 'Começa o bacharelado em Engenharia de Dados',
    accent: '#8BA4C9',
  },
  {
    year: '2026',
    title: 'Empreender',
    text: 'Funda a Cosmos',
    accent: '#F4E4BC',
  },
  {
    year: 'Atual',
    title: 'Agora',
    text: 'Conciliando dados e RPA na Casas Bahia e construção da Cosmos',
    accent: '#FFD700',
    isCurrent: true,
  },
]

export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      id="trajetoria"
      data-snap="start"
      className="bg-navy text-cream relative overflow-hidden"
      style={{ paddingBlock: 'var(--spacing-fluid-section)' }}
    >
      {/* Grid pontilhado de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(237,230,216,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Glow ambiente */}
      {!reduced && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-1/3 right-1/4 h-[40vh] w-[40vh] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(244,228,188,0.4), transparent)',
          }}
          aria-hidden
        />
      )}

      <div className="relative mx-auto w-[min(92%,1080px)]">
        <SectionLabel variant="light">TRAJETÓRIA</SectionLabel>

        {/* Header editorial */}
        <div className="mt-8 mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold leading-tight"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Uma linha
            <br />
            <span className="text-cream/40">do começo até agora.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cream/60 max-w-xs text-sm leading-relaxed md:text-right"
            style={{ fontSize: 'var(--text-small)' }}
          >
            De ajudante interno a analista de dados e fundador. Cinco anos de evolução contínua.
          </motion.p>
        </div>

        {/* Timeline vertical */}
        <div className="relative">
          {/* Linha vertical */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream/15 absolute top-0 bottom-0 left-3 w-px origin-top md:left-4"
            aria-hidden
          />

          <div className="flex flex-col">
            {TIMELINE.map((chapter, i) => (
              <TimelineItem
                key={chapter.year}
                chapter={chapter}
                index={i}
                isInView={isInView}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  chapter,
  index,
  isInView,
  reduced,
}: {
  chapter: Chapter
  index: number
  isInView: boolean
  reduced: boolean | null
}) {
  const delay = 0.4 + index * 0.12

  return (
    <motion.div
      initial={{ opacity: 0, x: reduced ? 0 : -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : -20 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative grid grid-cols-[auto_1fr] items-start gap-5 py-5 md:gap-8 md:py-6"
    >
      {/* Dot */}
      <div className="relative flex h-7 w-7 items-center justify-center md:h-9 md:w-9">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + 0.15,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className="relative flex h-4 w-4 items-center justify-center rounded-full md:h-5 md:w-5"
          style={{ backgroundColor: chapter.accent }}
        >
          {/* Pulso no dot do "Atual" */}
          {chapter.isCurrent && !reduced && isInView && (
            <>
              <motion.span
                animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: chapter.accent }}
                aria-hidden
              />
              <motion.span
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.8,
                }}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: chapter.accent }}
                aria-hidden
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-1 pb-2 md:flex-row md:items-baseline md:gap-6">
        {/* Ano */}
        <div className="flex shrink-0 items-baseline gap-3">
          <span
            className="font-anton leading-[0.9] tracking-tight transition-colors duration-300"
            style={{
              fontSize: chapter.isCurrent ? 'var(--text-numeral-lg)' : 'var(--text-h2)',
              color: chapter.isCurrent ? chapter.accent : chapter.accent,
              textShadow: chapter.isCurrent ? `0 0 40px ${chapter.accent}55` : 'none',
            }}
          >
            {chapter.year}
          </span>
        </div>

        {/* Título + texto */}
        <div className="flex flex-col gap-1">
          <p
            className="font-mono font-bold tracking-[0.2em] text-cream/50 uppercase"
            style={{ fontSize: 'var(--text-tiny)' }}
          >
            {chapter.title}
          </p>
          <p
            className="text-cream/85 max-w-md leading-snug"
            style={{ fontSize: 'var(--text-body)' }}
          >
            {chapter.text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}