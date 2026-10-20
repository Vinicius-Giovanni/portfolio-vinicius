import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Testimonial = {
  name: string
  role: string
  company?: string
  relationship: 'Gestor direto' | 'Sênior' | 'Mentorado' | 'Colega'
  quote: string
  initials: string
  accent: string
  imageUrl?: string
  linkedinUrl?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Leonardo Camargo',
    role: 'Coordenador de Operações',
    company: 'Grupo Casas Bahia',
    relationship: 'Gestor direto',
    quote:
      'Tive a satisfação de trabalhar diretamente com este profissional, sendo seu gestor direto, e posso afirmar que é um talento diferenciado. Autodidata, analítico, comunicativo e com excelente relacionamento interpessoal, destaca-se pela capacidade de aprender rapidamente, identificar oportunidades e transformar desafios em soluções eficientes. Seu conhecimento em linguagens de programação e sua habilidade no desenvolvimento de automações e dashboards gerenciais contribuíram significativamente para a otimização de processos, ganho de produtividade e melhoria na tomada de decisões.',
    initials: 'LC',
    accent: '#4A90B8',
    imageUrl: '/assets/clients/leonardo.svg',
    linkedinUrl: 'https://www.linkedin.com/in/leonardo-camargo-783407146/',
  },
  {
    name: 'Jonathan Maciel',
    role: 'Supervisor de Operações',
    company: 'Grupo Casas Bahia',
    relationship: 'Gestor direto',
    quote:
      'Profissional de alta performance, com excelente capacidade de transformar desafios em soluções eficientes. Possui forte conhecimento em Power BI, Excel e automação, e desenvolve ferramentas que facilitam o dia a dia da operação. Um exemplo é o dashboard que criou para controlar toda a demanda de expedição, que ajuda a gerência a fazer previsões com base no mesmo período de anos anteriores e contribui diretamente na tomada de decisão. Comprometido, disciplinado e proativo, destaca-se pela qualidade das entregas e pela busca constante por conhecimento e melhoria.',
    initials: 'JM',
    accent: '#D97706',
    imageUrl: '/assets/clients/jonathan.svg',
    linkedinUrl: 'https://www.linkedin.com/in/jonathan-maciel-b0049a280/',
  },
  {
    name: 'Thainá Souza',
    role: 'Software Engineering Student',
    relationship: 'Mentorado',
    quote:
      'O Vinícius combina um raciocínio lógico afiado com uma criatividade impressionante para solucionar problemas complexos, sempre trazendo respostas práticas e eficientes. Além do sólido domínio técnico, seu diferencial está nas habilidades interpessoais. Possui uma comunicação clara e assertiva, transitando com facilidade entre diferentes perfis e interagindo com posições estratégicas de liderança com muita segurança e respeito. Para além de suas entregas técnicas, se destaca como um excelente mentor — generosidade natural para compartilhar conhecimento e ensinar com didática impecável, clara e acessível.',
    initials: 'TS',
    accent: '#6B21A8',
    imageUrl: '/assets/clients/thaina.svg',
    linkedinUrl: 'https://www.linkedin.com/in/thain%C3%A1-souza-5aaba332a/',
  },
  {
    name: 'Edmilson Silva',
    role: 'Coordenador de Operações Logísticas',
    company: 'Grupo Casas Bahia',
    relationship: 'Sênior',
    quote:
      'Vinícius, você é um ótimo profissional, com altas habilidades em desenvolver ferramentas que facilitam nossas visões operacionais.',
    initials: 'ES',
    accent: '#10B981',
    imageUrl: '/assets/clients/edmilson.svg',
    linkedinUrl: 'https://www.linkedin.com/in/edmilson-silva-31b461141/',
  },
  {
    name: 'Patiño Pedro Dyer',
    role: 'Assistente Administrativo',
    company: 'Grupo Casas Bahia',
    relationship: 'Colega',
    quote:
      'Tive a oportunidade de trabalhar com este colega e posso destacar seu profissionalismo, comprometimento e dedicação às atividades desempenhadas. É uma pessoa responsável, colaborativa e sempre disposta a contribuir para o bom desempenho da equipe, demonstrando respeito, ética e vontade de aprender. Sua postura profissional e facilidade para trabalhar em equipe fazem dele um excelente colega de trabalho.',
    initials: 'PD',
    accent: '#F59E0B',
    imageUrl: '/assets/clients/patino.svg',
    linkedinUrl: 'https://www.linkedin.com/in/pati%C3%B1o-pedro-dyer-1430081a6/',
  },
]

const AUTO_ADVANCE_MS = 9000
const TOTAL = TESTIMONIALS.length

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduced = useReducedMotion()
  const touchStart = useRef<number | null>(null)

  const active = TESTIMONIALS[index]

  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % TOTAL)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + TOTAL) % TOTAL)
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
      setIndex((i) => (i + 1) % TOTAL)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [reduced, index])

  return (
    <section className="bg-cream relative overflow-hidden py-24 md:py-32">
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

      <span
        className="font-anton text-navy/[0.04] pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 leading-none whitespace-nowrap select-none"
        aria-hidden
        style={{ fontSize: 'clamp(10rem, 30vw, 28rem)' }}
      >
        DEPOIMENTOS
      </span>

      <div className="relative mx-auto w-[min(92%,1280px)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionLabel>DEPOIMENTOS</SectionLabel>
          <span className="text-navy/40 text-[10px] font-bold tracking-[0.2em] uppercase">
            {index + 1} / {TOTAL} · via LinkedIn
          </span>
        </div>
      </div>

      {/* Palco — altura aumentada pra caber quotes longas */}
      <div
        className="relative mx-auto mt-12 flex h-[80vh] min-h-[620px] max-h-[820px] w-[min(92%,1100px)] items-center justify-center md:mt-16"
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
            className="border-navy/10 relative flex w-full max-w-3xl flex-col items-center gap-4 rounded-[40px] border bg-white/95 px-6 py-8 shadow-[0_40px_80px_-30px_rgba(11,31,58,0.4)] backdrop-blur-sm md:gap-5 md:px-10 md:py-10"
          >
            <Quote
              className="text-navy/[0.06] pointer-events-none absolute top-3 left-4 h-16 w-16 md:top-4 md:left-6 md:h-24 md:w-24"
              aria-hidden
              strokeWidth={1.5}
            />

            {/* Avatar */}
            <motion.div
              animate={reduced ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div
                className="absolute inset-0 -m-1.5 rounded-full opacity-30 blur-md"
                style={{ backgroundColor: active.accent }}
                aria-hidden
              />
              {active.imageUrl ? (
                <img
                  src={active.imageUrl}
                  alt={active.name}
                  loading="lazy"
                  className="relative h-14 w-14 rounded-full border-2 border-white bg-navy/5 object-cover shadow-md md:h-18 md:w-18"
                />
              ) : (
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white shadow-md md:h-18 md:w-18"
                  style={{ backgroundColor: active.accent }}
                >
                  <span className="font-anton text-cream text-base leading-none tracking-tight md:text-lg">
                    {active.initials}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Badge de relação */}
            <div
              className="rounded-full px-2.5 py-0.5 text-[8px] font-bold tracking-[0.18em] uppercase md:text-[9px]"
              style={{
                backgroundColor: `${active.accent}15`,
                color: active.accent,
              }}
            >
              {active.relationship}
            </div>

            {/* Depoimento — reduzido */}
            <p className="text-navy relative z-10 max-w-2xl text-center text-[clamp(0.75rem,1.1vw,0.9rem)] leading-relaxed font-medium md:text-[0.9rem]">
              &ldquo;{active.quote}&rdquo;
            </p>

            <div className="bg-navy/15 h-px w-10" />

            {/* Autor — reduzido */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-navy text-sm font-bold md:text-base">{active.name}</p>
              <p className="text-navy/60 text-[10px] font-medium md:text-xs">
                {active.role}
                {active.company && (
                  <>
                    {' · '}
                    <span className="text-navy/50">{active.company}</span>
                  </>
                )}
              </p>
              {active.linkedinUrl && (
                <a
                  href={active.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy/40 hover:text-navy mt-0.5 inline-flex items-center gap-1 text-[9px] font-medium transition-colors"
                >
                  <LinkedInIcon className="h-2.5 w-2.5" />
                  Ver no LinkedIn
                </a>
              )}
            </div>
          </motion.article>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Depoimento anterior"
          onClick={prev}
          className="group text-navy/40 hover:text-navy hover:bg-navy/5 absolute top-1/2 left-0 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:-translate-y-[calc(50%+2px)] md:-left-2 md:flex"
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
          className="group text-navy/40 hover:text-navy hover:bg-navy/5 absolute top-1/2 right-0 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:-translate-y-[calc(50%+2px)] md:-right-2 md:flex"
        >
          <ChevronRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      </div>

      <div className="mt-10 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Ir para depoimento ${i + 1}`}
            onClick={() => goTo(i)}
            className={
              'h-2.5 rounded-full transition-all ' +
              (i === index ? 'bg-navy w-8' : 'bg-navy/30 hover:bg-navy/50 w-2.5')
            }
          />
        ))}
      </div>
    </section>
  )
}