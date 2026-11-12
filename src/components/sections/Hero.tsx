import { useRef } from 'react'
import type { ReactNode } from 'react'
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
import { cn } from '@/lib/utils'
import { calUrl } from '@/data/site'
import { METRICS } from '@/data/metrics'
import { track } from '@/lib/track'

// ROLE is imported from site.ts via metrics; fallback inline
const HERO_ROLE = 'Analista de Dados'

const WORD_STYLE = {
  fontSize: 'clamp(2.5rem, 16vw, 25rem)',
  lineHeight: 0.85,
  letterSpacing: '-0.02em',
} as const

const FLOATING_TECHS = [
  { Icon: SiPython, pos: 'top-[24%] right-[6%] md:top-[30%] md:left-[5%] md:right-auto', delay: 0, hideOnMobile: false },
  { Icon: SiDatabricks, pos: 'top-[44%] right-[7%]', delay: 0.3, hideOnMobile: false },
  { Icon: SiJavascript, pos: 'top-[32%] left-[20%] md:top-[22%]', delay: 0.6, hideOnMobile: false },
  { Icon: SiTypescript, pos: 'top-[35%] right-[30%] md:top-[20%]', delay: 0.9, hideOnMobile: false},
  { Icon: SiCss, pos: 'bottom-[42%] left-[6%] md:top-[60%]', delay: 1.2, hideOnMobile: false },
  { Icon: BarChart3, pos: 'bottom-[22%] right-[5%]', delay: 1.5, hideOnMobile: false },
  { Icon: Bot, pos: 'bottom-[30%] left-[13%] md:top-[80%]', delay: 1.8, hideOnMobile: false },
  { Icon: SiHtml5, pos: 'bottom-[32%] right-[12%]', delay: 2.1, hideOnMobile: false },
]

const capMet = METRICS['cap-liberado']

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

  return (
    <section ref={ref} className="h-screen-safe relative w-full overflow-hidden">
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

      {/* Camada 1 — PORTFÓLIO fill */}
      <motion.div
        style={{ y: yText, opacity: fade }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <h1 className="font-anton text-navy select-none" style={WORD_STYLE}>
          PORTFÓLIO
        </h1>
      </motion.div>

      {/* Ícones tech flutuantes */}
      {FLOATING_TECHS.map(({ Icon, pos, delay, hideOnMobile }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 + i * 0.12 }}
          className={cn(
            'pointer-events-none absolute z-[15]',
            pos,
            hideOnMobile && 'hidden md:block',
          )}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
            className="border-navy/10 bg-cream/75 flex h-11 w-11 items-center justify-center rounded-2xl border shadow-[0_8px_24px_rgba(11,31,58,0.14)] backdrop-blur-md md:h-12 md:w-12 xl:h-14 xl:w-14"
          >
            <Icon className="text-navy h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7" aria-hidden />
          </motion.div>
        </motion.div>
      ))}

      {/* Foto */}
      <motion.picture
        style={{ y: yPhoto }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex w-[90vw] max-w-[460px] -translate-x-1/2 items-end justify-center md:h-[85%] md:w-auto md:max-w-none xl:h-[88%]"
      >
        <source srcSet="/assets/vinicius-hero.avif" type="image/avif" />
        <source srcSet="/assets/vinicius-hero.webp" type="image/webp" />
        <img
          src="/assets/vinicius-hero.png"
          alt="Vinícius G Pereira"
          className="h-auto w-full object-contain object-bottom md:h-full md:w-auto"
          draggable={false}
          fetchPriority="high"
          width={800}
          height={1200}
        />
      </motion.picture>

      {/* Camada 3 — PORTFÓLIO stroke */}
      <motion.div
        style={{ y: yText, opacity: fade }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
      >
        <span
          className="font-anton select-none"
          style={{
            ...WORD_STYLE,
            color: 'transparent',
            WebkitTextStroke: 'clamp(1.5px, 0.22vw, 3px) #EDE6D8',
          }}
        >
          PORTFÓLIO
        </span>
      </motion.div>

      {/* Nome + cargo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[max(4.5rem,8vh)] left-[max(1.25rem,3vw)] z-40 max-w-[calc(100vw-2.5rem)]"
      >
        <p
          className="text-navy font-bold tracking-tight"
          style={{ fontSize: 'max(0.875rem, 1.1vw)' }}
        >
          Vinícius G Pereira
        </p>
        <p
          className="text-navy/60 mt-1 font-medium"
          style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
        >
          {HERO_ROLE} · Engenharia de Dados
        </p>
        <p
          className="text-navy/50 mt-2 max-w-xs font-medium leading-snug"
          style={{ fontSize: 'max(0.7rem, 0.85vw)' }}
        >
          {capMet.value} de capital liberado em operação de +100 mil peças/dia
        </p>
      </motion.div>

      {/* Botões */}
      <div className="absolute bottom-[max(1.5rem,4vh)] left-1/2 z-40 grid w-[min(92%,540px)] -translate-x-1/2 grid-cols-2 gap-2.5 sm:gap-3">
        <HeroButton
          href={calUrl('hero')}
          variant="solid"
          delay={0.55}
          onClick={() => track('cta_click', { location: 'hero', type: 'agendar' })}
          data-cta="hero"
        >
          Agendar 30 min
        </HeroButton>
        <HeroButton
          linkTo="/projetos"
          variant="ghost"
          delay={0.7}
        >
          Ver cases
        </HeroButton>
      </div>
    </section>
  )
}

type HeroButtonProps = {
  variant: 'solid' | 'ghost'
  delay: number
  children: ReactNode
  href?: string
  linkTo?: string
  onClick?: () => void
  'data-cta'?: string
}

function HeroButton({ variant, delay, children, href, linkTo, onClick, 'data-cta': dataCta }: HeroButtonProps) {
  const classes = cn(
    'rounded-brand flex min-h-11 items-center justify-center px-3 py-2.5 sm:px-4 sm:py-3 text-center font-bold whitespace-nowrap text-xs sm:text-sm md:min-h-12 md:px-5',
    variant === 'solid' ? 'bg-navy text-cream' : 'bg-cream text-navy border-navy border',
  )
  const motionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      opacity: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      y: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    whileHover: { y: -4, boxShadow: '0 12px 28px rgba(11,31,58,0.18)', transition: { duration: 0.15, delay: 0 } },
    whileTap: { y: -2, transition: { duration: 0.1, delay: 0 } },
    style: { fontSize: 'max(0.875rem, 0.95vw)' },
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={dataCta}
        onClick={onClick}
        className={classes}
      >
        {children}
      </motion.a>
    )
  }

  if (linkTo) {
    return (
      <motion.div {...motionProps} className={classes}>
        <a href={linkTo} className="flex w-full items-center justify-center">
          {children}
        </a>
      </motion.div>
    )
  }

  return null
}
