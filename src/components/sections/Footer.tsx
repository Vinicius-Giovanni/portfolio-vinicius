import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react'
import { Mail, Phone, ExternalLink, ArrowUpRight, ArrowUp } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TiltCard } from '@/components/ui/TiltCard'

const HEADLINE = ['VAMOS', 'CONSTRUIR', 'ALGO', 'INCRÍVEL', 'JUNTOS?']

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer
      id="contato"
      ref={ref}
      className="rounded-t-brand bg-navy text-cream relative mt-16 overflow-hidden px-6 pt-20 pb-8 md:mt-24 md:rounded-t-[60px] md:px-12 md:pt-28 md:pb-10"
    >
      {/* ===== BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Grid pontilhado */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(237,230,216,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)',
          }}
        />
        {/* Orbs pulsando */}
        {!reduced && (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 left-1/4 h-[50vh] w-[50vh] rounded-full blur-[140px]"
              style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.4), transparent)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              className="absolute right-1/4 bottom-0 h-[40vh] w-[40vh] rounded-full blur-[140px]"
              style={{ background: 'radial-gradient(circle, rgba(139,164,201,0.4), transparent)' }}
            />
          </>
        )}
        {/* Watermark gigante */}
        <motion.span
          style={{ y: reduced ? 0 : watermarkY }}
          className="font-anton text-cream/[0.025] absolute -bottom-8 left-0 leading-none whitespace-nowrap select-none"
          aria-hidden
        >
          <span style={{ fontSize: 'clamp(10rem, 30vw, 28rem)' }}>CONTATO</span>
        </motion.span>
      </div>

      <div className="relative mx-auto w-[min(100%,1280px)]">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            {!reduced && (
              <>
                <motion.span
                  animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="bg-emerald-400 absolute inset-0 rounded-full"
                />
                <motion.span
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                  className="bg-emerald-400 absolute inset-0 rounded-full"
                />
              </>
            )}
            <span className="bg-emerald-400 relative h-2 w-2 rounded-full" />
          </span>
          <span className="text-cream/80 text-xs font-medium tracking-wide">
            Disponível para novos projetos
          </span>
        </motion.div>

        <SectionLabel variant="light">CONTATO</SectionLabel>

        {/* ===== HEADLINE com word reveal ===== */}
        <h2 className="mt-10 max-w-5xl text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-bold tracking-tight">
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 40, filter: 'blur(12px)' }
              }
              transition={{
                duration: 0.8,
                delay: reduced ? 0 : i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${i === HEADLINE.length - 1 ? 'text-cream/50' : ''} ${i < HEADLINE.length - 1 ? 'mr-3 md:mr-5' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-cream/70 mt-8 max-w-2xl text-[clamp(0.95rem,1.3vw,1.15rem)] leading-relaxed"
        >
          Estou sempre aberto a novos desafios, projetos freelance pela Cosmos ou oportunidades
          na área de Engenharia e Análise de Dados. Entre em contato!
        </motion.p>

        {/* ===== CONTACT CARDS ===== */}
        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          <ContactCard
            href="mailto:viniciusgiovanni588@gmail.com"
            icon={Mail}
            label="E-mail"
            value="viniciusgiovanni588@gmail.com"
            delay={0.8}
            inView={inView}
          />
          <ContactCard
            href="https://wa.me/5511968635390"
            icon={Phone}
            label="WhatsApp"
            value="11 96863-5390"
            external
            delay={0.9}
            inView={inView}
          />
          <ContactCard
            href="https://www.grupocosmos.com.br"
            icon={ExternalLink}
            label="Grupo Cosmos"
            value="grupocosmos.com.br"
            external
            delay={1.0}
            inView={inView}
          />
        </div>

        {/* ===== DIVIDER + BOTTOM BAR ===== */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-cream/15 mt-20 h-px w-full origin-left"
        />

        <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="text-cream/50 text-xs leading-relaxed"
          >
            © 2026 Vinícius G Pereira.
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            Desenvolvido com React + Tailwind CSS.
          </motion.p>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-cream/40 flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.2em] uppercase"
          >
            <span className="inline-block h-1 w-1 rounded-full bg-cream/40" />
            Feito com dedicação em São Paulo, BR
          </motion.p>

          {/* Scroll to top button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="border-cream/20 text-cream hover:border-cream/50 hover:bg-cream/5 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

type ContactCardProps = {
  href: string
  icon: React.ElementType
  label: string
  value: string
  external?: boolean
  delay: number
  inView: boolean
}

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  external,
  delay,
  inView,
}: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 30, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard maxTilt={4}>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="group rounded-brand border-cream/15 bg-cream/[0.03] hover:border-cream/40 hover:bg-cream/[0.08] relative flex h-full items-start gap-4 border p-6 backdrop-blur-sm transition-all duration-300 md:p-7"
        >
          {/* Glow dourado no hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at 100% 0%, rgba(255,215,0,0.08), transparent 60%)',
            }}
            aria-hidden
          />

          {/* Ícone em círculo */}
          <span className="border-cream/15 bg-cream/5 text-cream group-hover:border-gold/40 group-hover:bg-gold/10 relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors">
            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden />
          </span>

          {/* Texto */}
          <div className="relative min-w-0 flex-1">
            <p className="text-cream/50 text-[10px] font-bold tracking-[0.2em] uppercase">
              {label}
            </p>
            <p className="text-cream mt-1.5 truncate text-sm font-semibold md:text-base">
              {value}
            </p>
            <p className="text-cream/40 mt-3 flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase transition-colors group-hover:text-cream/70">
              {external ? 'Abrir' : 'Enviar'}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </p>
          </div>
        </a>
      </TiltCard>
    </motion.div>
  )
}