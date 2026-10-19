import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const TESTIMONIALS = [
  {
    image: '/assets/clients/client-1.svg',
    name: 'Camila Rodrigues',
    role: 'Gerente de Operações',
    quote:
      'A automação entregue pela Cosmos reduziu drasticamente o tempo das nossas rotinas. Hoje a equipe foca no que realmente importa, e os resultados aparecem mês a mês.',
  },
  {
    image: '/assets/clients/client-2.svg',
    name: 'Rafael Menezes',
    role: 'Diretor Financeiro',
    quote:
      'Os dashboards que desenvolvemos com o Vinícius transformaram a forma como enxergamos os números. Decisões que antes levavam dias agora são tomadas em minutos, com clareza total.',
  },
  {
    image: '/assets/clients/client-3.svg',
    name: 'Beatriz Santos',
    role: 'Head de Dados',
    quote:
      'Trabalhar com alguém que entende o negócio e não só a técnica faz toda a diferença. As soluções foram pensadas para o nosso contexto, o que gerou adesão imediata dos times.',
  },
  {
    image: '/assets/clients/client-4.svg',
    name: 'Lucas Ferreira',
    role: 'Coordenador de Logística',
    quote:
      'Conseguimos ganhos reais de eficiência na operação. O olhar analítico aliado à automação trouxe previsibilidade e reduziu erros manuais que impactavam diretamente o cliente.',
  },
]

const AUTO_ADVANCE_MS = 7000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduced = useReducedMotion()
  const touchStart = useRef<number | null>(null)

  const total = TESTIMONIALS.length
  const active = TESTIMONIALS[index]

  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % total)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + total) % total)
  }

  const goTo = (i: number) => {
    if (i === index) return
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % total)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [reduced, index, total])

  return (
    <section data-snap="start" className="bg-cream relative overflow-hidden py-24 md:py-32">
      {/* Grid pontilhado de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(11,31,58,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Watermark */}
      <span
        className="font-anton text-navy/[0.04] pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 leading-none whitespace-nowrap select-none"
        aria-hidden
        style={{ fontSize: 'clamp(10rem, 30vw, 28rem)' }}
      >
        DEPOIMENTOS
      </span>

      <div className="relative mx-auto w-[min(92%,1280px)]">
        <SectionLabel>DEPOIMENTOS</SectionLabel>
      </div>

      {/* Palco 3D */}
      <div
        className="relative mx-auto mt-12 flex h-[60vh] min-h-[460px] w-[min(92%,1100px)] items-center justify-center md:mt-16"
        style={{ perspective: 1600 }}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return
          const delta = e.changedTouches[0].clientX - touchStart.current
          if (delta < -80) next()
          else if (delta > 80) prev()
          touchStart.current = null
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.article
            key={index}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? '70vw' : '-70vw',
                rotateY: dir > 0 ? -35 : 35,
                scale: 0.75,
                opacity: 0,
                filter: 'blur(8px)',
              }),
              center: {
                x: 0,
                rotateY: 0,
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
              },
              exit: (dir: number) => ({
                x: dir > 0 ? '-70vw' : '70vw',
                rotateY: dir > 0 ? 35 : -35,
                scale: 0.75,
                opacity: 0,
                filter: 'blur(8px)',
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduced ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformStyle: 'preserve-3d', position: 'absolute' }}
            className="border-navy/10 relative flex w-full max-w-3xl flex-col items-center gap-6 rounded-[40px] border bg-white/95 p-8 shadow-[0_40px_80px_-30px_rgba(11,31,58,0.4)] backdrop-blur-sm md:p-12"
          >
            {/* Aspas gigante */}
            <Quote
              className="text-navy/[0.06] pointer-events-none absolute top-2 left-3 h-16 w-16 md:top-4 md:left-6 md:h-32 md:w-32"
              aria-hidden
              strokeWidth={1.5}
            />

            {/* Avatar flutuante */}
            <motion.div
              animate={reduced ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="border-navy/15 bg-cream absolute inset-0 -m-1.5 rounded-full border-2" />
              <img
                src={active.image}
                alt={`Foto de ${active.name}`}
                loading="lazy"
                className="border-navy/15 relative h-20 w-20 rounded-full border-2 object-cover md:h-24 md:w-24"
              />
            </motion.div>

            <p className="text-navy relative z-10 max-w-2xl text-center text-[clamp(1rem,1.8vw,1.4rem)] leading-relaxed font-medium">
              &ldquo;{active.quote}&rdquo;
            </p>

            <div className="bg-navy/15 h-px w-12" />

            <div className="text-center">
              <p className="text-navy text-base font-bold md:text-lg">{active.name}</p>
              <p className="text-navy/60 mt-1 text-xs font-medium md:text-sm">{active.role}</p>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Setas laterais */}
        <button
          type="button"
          aria-label="Depoimento anterior"
          onClick={prev}
          className="group text-navy/40 hover:text-navy absolute top-1/2 left-0 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-navy/5 md:flex md:-left-2"
        >
          <ChevronLeft
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </button>

        <button
          type="button"
          aria-label="Próximo depoimento"
          onClick={next}
          className="group text-navy/40 hover:text-navy absolute top-1/2 right-0 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-navy/5 md:flex md:-right-2"
        >
          <ChevronRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      </div>

      {/* Dots + barra de progresso */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Ir para depoimento ${i + 1}`}
            onClick={() => goTo(i)}
            className="group relative flex h-2 items-center"
          >
            <span
              className={
                'h-2 rounded-full transition-all duration-500 ' +
                (i === index ? 'bg-navy w-10' : 'bg-navy/30 group-hover:bg-navy/50 w-2')
              }
            />
            {/* Barra de progresso interna no dot ativo */}
            {i === index && !reduced && (
              <motion.span
                key={`progress-${index}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                className="bg-navy/40 absolute inset-y-0 left-0 origin-left rounded-full"
                style={{ width: '100%' }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}