import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import {
  SiPython,
  SiDatabricks,
  SiJavascript,
  SiTypescript,
  SiCss,
  SiHtml5,
} from 'react-icons/si'
import { BarChart3, Bot } from 'lucide-react'
import { HeroCanvas } from '@/components/three/HeroCanvas'
import { cn } from '@/lib/utils'

function scrollToId(id: string) {
  const target = document.querySelector(id)
  if (!target) return
  if (window.lenis) {
    window.lenis.scrollTo(target as HTMLElement)
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const WORD_STYLE = {
  fontSize: 'clamp(3rem, 19vw, 25rem)',
  lineHeight: 0.85,
  letterSpacing: '-0.02em',
} as const

const FLOATING_TECHS = [
  { Icon: SiPython, pos: 'top-[22%] left-[6%]', delay: 0 },
  { Icon: SiDatabricks, pos: 'top-[17%] right-[8%]', delay: 0.3 },
  { Icon: SiJavascript, pos: 'top-[40%] left-[3%]', delay: 0.6 },
  { Icon: SiTypescript, pos: 'top-[43%] right-[4%]', delay: 0.9 },
  { Icon: SiCss, pos: 'bottom-[40%] left-[7%]', delay: 1.2 },
  { Icon: BarChart3, pos: 'bottom-[42%] right-[6%]', delay: 1.5 },
  { Icon: Bot, pos: 'bottom-[28%] left-[14%]', delay: 1.8 },
  { Icon: SiHtml5, pos: 'bottom-[30%] right-[13%]', delay: 2.1 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -140])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const buttons = [
    {
      label: 'Conhecer Cosmos →',
      variant: 'solid' as const,
      onClick: () => window.open('https://www.grupocosmos.com.br', '_blank', 'noopener'),
    },
    {
      label: 'Ver Projetos →',
      variant: 'ghost' as const,
      onClick: () => scrollToId('#entregaveis'),
    },
    {
      label: 'Entrar em Contato →',
      variant: 'solid' as const,
      onClick: () => scrollToId('#contato'),
    },
  ]

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <HeroCanvas />

      {!reduced && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(11,31,58,0.2), transparent 70%)',
          }}
          aria-hidden
        />
      )}

      {/* Camada 2 — PORTFÓLIO fill */}
      <motion.div
        style={{ y: yText, opacity: fade }}
        className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-[18vh] md:items-center md:pt-0"
      >
        <h1 className="font-anton text-navy select-none" style={WORD_STYLE}>
          PORTFÓLIO
        </h1>
      </motion.div>

      {/* Ícones tech flutuantes */}
      {FLOATING_TECHS.map(({ Icon, pos, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 + i * 0.12 }}
          className={cn('pointer-events-none absolute z-[15]', pos)}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
            className="border-navy/10 bg-cream/75 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[0_8px_24px_rgba(11,31,58,0.14)] backdrop-blur-md md:h-14 md:w-14"
          >
            <Icon className="text-navy h-6 w-6 md:h-7 md:w-7" aria-hidden />
          </motion.div>
        </motion.div>
      ))}

      {/* Camada 4 — foto */}
      <motion.img
        src="/assets/vinicius-hero.png"
        alt="Vinícius G Pereira"
        style={{ y: yPhoto }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[72%] max-w-none -translate-x-1/2 object-contain md:h-[90%]"
        draggable={false}
        fetchPriority="high"
      />

      {/* Camada 5 — PORTFÓLIO stroke */}
      <motion.div
        style={{ y: yText, opacity: fade }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 flex items-start justify-center pt-[18vh] md:items-center md:pt-0"
      >
        <span
          className="font-anton select-none"
          style={{ ...WORD_STYLE, color: 'transparent', WebkitTextStroke: '3px #EDE6D8' }}
        >
          PORTFÓLIO
        </span>
      </motion.div>

      {/* Nome + cargo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 left-5 z-40 md:top-8 md:left-10"
      >
        <p className="text-navy text-[clamp(0.875rem,1.2vw,1.125rem)] font-bold tracking-tight">
          Vinícius G Pereira
        </p>
        <p className="text-navy/60 mt-1 text-[clamp(0.75rem,0.95vw,0.9rem)] font-medium">
          Engenharia de Software &amp; Dados
        </p>
      </motion.div>

      {/* Botões */}
      <div className="absolute bottom-8 left-1/2 z-40 flex w-[min(92%,860px)] -translate-x-1/2 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3 md:bottom-12">
        {buttons.map((btn, i) => (
          <HeroButton
            key={btn.label}
            variant={btn.variant}
            onClick={btn.onClick}
            delay={0.55 + i * 0.15}
          >
            {btn.label}
          </HeroButton>
        ))}
      </div>
    </section>
  )
}

type HeroButtonProps = {
  variant: 'solid' | 'ghost'
  onClick: () => void
  delay: number
  children: ReactNode
}

function HeroButton({ variant, onClick, delay, children }: HeroButtonProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30, boxShadow: '0 0 0 rgba(11,31,58,0)' }}
      animate={{ opacity: 1, y: 0, boxShadow: '0 0 0 rgba(11,31,58,0)' }}
      transition={{
        opacity: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        boxShadow: { duration: 0.6, delay },
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 28px rgba(11,31,58,0.18)',
        transition: { duration: 0.15, delay: 0, ease: 'easeOut' },
      }}
      whileTap={{
        y: -2,
        transition: { duration: 0.1, delay: 0 },
      }}
      onClick={onClick}
      className={cn(
        'rounded-brand flex-1 px-6 py-3 text-center text-[clamp(0.875rem,1vw,1.1rem)] font-bold whitespace-nowrap',
        variant === 'solid' ? 'bg-navy text-cream' : 'bg-cream text-navy border-navy border',
      )}
    >
      {children}
    </motion.button>
  )
}