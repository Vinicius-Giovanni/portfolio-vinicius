import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Chapter = {
  year: string
  chapter: string
  title: string
  text: string
  accent: string
}

const TIMELINE: Chapter[] = [
  {
    year: '2021',
    chapter: '01',
    title: 'O começo',
    text: 'Entro como ajudante interno no Grupo Casas Bahia',
    accent: '#8B6914',
  },
  {
    year: '2023',
    chapter: '02',
    title: 'Crescimento',
    text: 'Passa a assistente administrativo',
    accent: '#C9A227',
  },
  {
    year: '2024',
    chapter: '03',
    title: 'A virada',
    text: 'Passa a analista de dados com foco em dados e RPA',
    accent: '#4A90B8',
  },
  {
    year: '2025',
    chapter: '04',
    title: 'Formação',
    text: 'Começa o bacharelado em Engenharia de Dados',
    accent: '#8BA4C9',
  },
  {
    year: '2026',
    chapter: '05',
    title: 'Empreender',
    text: 'Funda a Cosmos',
    accent: '#F4E4BC',
  },
  {
    year: 'Atual',
    chapter: '06',
    title: 'Agora',
    text: 'Conciliando dados e RPA na Casas Bahia e construção da Cosmos',
    accent: '#FFD700',
  },
]

const N = TIMELINE.length

export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-83.333%'])
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.floor(v * N))
    if (next !== active) setActive(next)
  })

  if (reduced) return <ReducedFallback />

  return (
    <section id="trajetoria" data-snap="multi" data-snap-intervals="6" ref={ref} className="relative h-[600vh] bg-navy">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section label */}
        <div className="absolute top-16 left-5 z-30 md:top-8 md:left-10">
          <SectionLabel variant="light">TRAJETÓRIA</SectionLabel>
        </div>

        {/* Story progress bars */}
        <div className="absolute top-20 left-1/2 z-30 flex -translate-x-1/2 gap-1 md:top-8 md:gap-1.5">
          {TIMELINE.map((_, i) => (
            <div key={i} className="bg-cream/20 h-0.5 w-6 overflow-hidden rounded-full md:w-12">
              <motion.div
                animate={{ scaleX: i <= active ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-cream h-full origin-left"
              />
            </div>
          ))}
        </div>

        {/* Chapter counter */}
        <div className="pointer-events-none absolute top-16 right-5 z-30 flex items-baseline gap-1 md:top-8 md:right-10">
          <span className="font-anton text-cream text-2xl leading-none md:text-3xl">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="text-cream/40 text-sm leading-none">/ {String(N).padStart(2, '0')}</span>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex h-full w-[600vw]">
          {TIMELINE.map((item, i) => (
            <ChapterSlide
              key={item.year}
              item={item}
              index={i}
              isActive={active === i}
            />
          ))}
        </motion.div>

        {/* Bottom chapter title + dots */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3">
          <motion.p
            key={`title-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-cream/70 font-mono text-[10px] font-bold tracking-[0.3em] uppercase md:text-xs"
          >
            {TIMELINE[active].title}
          </motion.p>
          <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-4 py-2.5 backdrop-blur-md">
            {TIMELINE.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? 'bg-cream w-8'
                    : i < active
                      ? 'bg-cream/50 w-2'
                      : 'bg-cream/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChapterSlide({
  item,
  index,
  isActive,
}: {
  item: Chapter
  index: number
  isActive: boolean
}) {
  const isCurrent = item.year === 'Atual'

  return (
    <div className="relative flex h-full w-screen shrink-0 items-center justify-center overflow-hidden px-6 md:px-16">
      {/* Background gradient with accent */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${30 + index * 8}% 45%, ${item.accent}28 0%, transparent 60%)`,
          }}
        />
        {/* Grid pontilhado */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #EDE6D8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        {/* Glow pulsante per chapter */}
        <motion.div
          animate={
            isActive
              ? { scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }
              : { opacity: 0 }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{
            background: `radial-gradient(circle, ${item.accent}55, transparent)`,
          }}
        />
      </div>

      {/* Chapter info — top left area (abaixo do label global) */}
      <div className="absolute top-24 left-6 md:top-28 md:left-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-cream/40 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
            Capítulo {item.chapter}
          </p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-10 md:flex-row md:items-baseline md:gap-16">
        {/* Huge year */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(24px)' }}
            animate={
              isActive
                ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, scale: 0.7, filter: 'blur(24px)' }
            }
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-anton leading-[0.85] tracking-tight"
            style={{
              fontSize: isCurrent
                ? 'clamp(4rem, 14vw, 12rem)'
                : 'clamp(6rem, 20vw, 18rem)',
              color: isCurrent ? '#FFD700' : item.accent,
              textShadow: isCurrent ? '0 0 120px rgba(255,215,0,0.5)' : 'none',
            }}
          >
            {item.year}
          </motion.div>

          {/* Pulse rings for "Atual" */}
          {isCurrent && isActive && (
            <>
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, #FFD70080, transparent)' }}
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 1.2,
                }}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, #FFD70060, transparent)' }}
              />
            </>
          )}
        </div>

        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 h-px w-16 origin-left"
            style={{ background: item.accent }}
          />
          <p className="text-cream/90 text-[clamp(1rem,1.8vw,1.5rem)] leading-snug font-medium">
            {item.text}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function ReducedFallback() {
  return (
    <section id="trajetoria" className="bg-navy px-6 py-24 md:px-16">
      <div className="mx-auto max-w-3xl">
        <SectionLabel variant="light">TRAJETÓRIA</SectionLabel>
        <div className="mt-12 flex flex-col gap-10">
          {TIMELINE.map((item) => (
            <div key={item.year} className="border-cream/20 border-l-2 pl-6">
              <p className="text-cream/40 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                Capítulo {item.chapter}
              </p>
              <p
                className="font-anton mt-2 text-5xl md:text-7xl"
                style={{ color: item.accent }}
              >
                {item.year}
              </p>
              <p className="text-cream mt-2 font-bold">{item.title}</p>
              <p className="text-cream/70 mt-2 text-sm leading-relaxed md:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}