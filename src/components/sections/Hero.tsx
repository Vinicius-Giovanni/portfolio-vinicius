import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useNavigate } from '@tanstack/react-router'
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
  fontSize: 'clamp(2rem, 17.5vw, 25rem)',
  lineHeight: 0.85,
  letterSpacing: '-0.02em',
} as const

const FLOATING_TECHS = [
  { Icon: SiPython, pos: 'top-[16%] left-[5%]', delay: 0, hideOnMobile: false },
  { Icon: SiDatabricks, pos: 'top-[14%] right-[7%]', delay: 0.3, hideOnMobile: false },
  { Icon: SiJavascript, pos: 'top-[42%] left-[2%]', delay: 0.6, hideOnMobile: true },
  { Icon: SiTypescript, pos: 'top-[45%] right-[3%]', delay: 0.9, hideOnMobile: true },
  { Icon: SiCss, pos: 'bottom-[42%] left-[6%]', delay: 1.2, hideOnMobile: true },
  { Icon: BarChart3, pos: 'bottom-[44%] right-[5%]', delay: 1.5, hideOnMobile: false },
  { Icon: Bot, pos: 'bottom-[30%] left-[13%]', delay: 1.8, hideOnMobile: true },
  { Icon: SiHtml5, pos: 'bottom-[32%] right-[12%]', delay: 2.1, hideOnMobile: true },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const navigate = useNavigate()

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
      variant: 'ghots' as const,
      onClick: () => navigate({ to: '/projetos' }),
    },
    {
      label: 'Ver Entregáveis →',
      variant: 'solid' as const,
      onClick: () => scrollToId('#entregaveis'),
    },
    {
      label: 'Entrar em Contato →',
      variant: 'solid' as const,
      onClick: () => scrollToId('#contato'),
    },
  ]

  return (
    <section ref={ref} className="h-screen-safe relative w-full overflow-hidden">
      {/* Partículas CSS no lugar do Canvas 3D */}

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
        className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-[18vh] md:items-center md:pt-0"
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
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex h-[78%] max-w-none -translate-x-1/2 items-end md:h-[85%] xl:h-[88%]"
      >
        <source srcSet="/assets/vinicius-hero.avif" type="image/avif" />
        <source srcSet="/assets/vinicius-hero.webp" type="image/webp" />
        <img
          src="/assets/vinicius-hero.png"
          alt="Vinícius G Pereira"
          className="h-full w-auto object-contain"
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
        className="absolute top-[max(1.5rem,4vh)] left-[max(1.25rem,3vw)] z-40"
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
          Engenharia de Software &amp; Dados
        </p>
      </motion.div>

      {/* Botões */}
      <div className="absolute bottom-[max(1.5rem,4vh)] left-1/2 z-40 flex w-[min(92%,1200px)] -translate-x-1/2 flex-col items-stretch gap-2.5 sm:grid sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
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
      style={{ fontSize: 'max(0.875rem, 0.95vw)' }}
      className={cn(
        'rounded-brand flex min-h-11 items-center justify-center px-4 py-3 text-center font-bold whitespace-nowrap md:min-h-12 md:px-5',
        variant === 'solid' ? 'bg-navy text-cream' : 'bg-cream text-navy border-navy border',
      )}
    >
      {children}
    </motion.button>
  )
}