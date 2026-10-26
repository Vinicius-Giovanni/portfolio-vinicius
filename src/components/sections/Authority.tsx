import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'

type StatItem = { stat: string; text: string }

const ITEMS: StatItem[] = [
  {
    stat: 'R$ 25,5 mi',
    text: 'de capital liberado. Estoque que estava parado entre etapas de expedição voltou ao fluxo operacional e ao caixa.',
  },
  {
    stat: 'R$ 12 mi/ano',
    text: 'de ganhos operacionais estimados com automação RPA em processos críticos.',
  },
  {
    stat: 'R$ 3,6 mi/ano',
    text: 'de custo financeiro evitado com redução de lead time em operação de alta escala.',
  },
  {
    stat: 'R$ 3 mi/ano',
    text: 'de economia direta com projetos de Data Quality e centralização de dados.',
  },
  {
    stat: '+5.400 horas',
    text: 'devolvidas a times operacionais em um único projeto de automação.',
  },
  {
    stat: '+14',
    text: 'softwares e automações sob medida entregues, de RPA a aplicações web.',
  },
  {
    stat: '+19',
    text: 'projetos de Business Intelligence entregues em operações logísticas.',
  },
  {
    stat: 'Cosmos',
    text: 'empresa de Automação RPA + IA, Software & Engenharia de Dados B2B.',
  },
]

export function Authority() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const watermarkX = useTransform(sectionProgress, [0, 1], ['-10%', '-40%'])
  const progressScaleY = useTransform(sectionProgress, [0.1, 0.9], [0, 1])

  return (
    <section
      ref={sectionRef}
      data-snap="start"
      className="bg-navy text-cream relative overflow-hidden py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(237,230,216,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {!reduced && (
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(237,230,216,0.35), transparent)',
          }}
          aria-hidden
        />
      )}

      <motion.span
        style={{ x: reduced ? 0 : watermarkX }}
        className="font-anton text-cream/[0.03] pointer-events-none absolute bottom-0 left-0 leading-none whitespace-nowrap select-none"
        aria-hidden
      >
        <span style={{ fontSize: 'clamp(8rem, 25vw, 24rem)' }}>NÚMEROS</span>
      </motion.span>

      <div className="relative mx-auto w-[min(92%,1280px)]">
        <SectionLabel variant="light">DESTAQUES</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-bold"
        >
          O impacto, em <span className="text-cream/40">números.</span>
        </motion.h2>

        <p className="text-cream/60 mt-5 max-w-xl text-sm leading-relaxed">
        Projetos entregues em operações logísticas de grande escala. Cada valor mede um impacto
        de natureza distinta (capital liberado, economia recorrente, custo evitado) e tem origem,
        metodologia e período de apuração próprios. Os números não representam somatório.
        </p>

        <div className="relative mt-16 md:mt-20">
          <div className="bg-cream/10 absolute top-0 bottom-0 left-0 hidden w-px md:block" aria-hidden />
          <motion.div
            style={{ scaleY: reduced ? 1 : progressScaleY }}
            className="bg-cream/60 absolute top-0 bottom-0 left-0 hidden w-px origin-top md:block"
            aria-hidden
          />

          <div className="md:pl-12">
            {ITEMS.map((item, i) => (
              <StatRow key={item.stat} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatRow({ item, index }: { item: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const numberX = useTransform(scrollYProgress, [0, 1], [40, -40])
  const descX = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const indexY = useTransform(scrollYProgress, [0, 1], [-15, 15])
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: reduced ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-cream/15 hover:border-cream/40 relative grid grid-cols-1 items-center gap-4 border-t py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10"
    >
      <motion.div
        style={{ scaleX: reduced ? 1 : lineScale }}
        className="bg-cream/70 absolute top-0 left-0 h-px w-full origin-left"
        aria-hidden
      />

      <motion.span
        style={{ y: reduced ? 0 : indexY }}
        className="text-cream/30 hidden font-mono text-xs font-bold tracking-[0.25em] md:col-span-1 md:block"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <motion.div style={{ x: reduced ? 0 : numberX }} className="md:col-span-5">
        <span className="font-anton group-hover:text-cream block text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.9] tracking-tight text-cream/90 transition-colors duration-300">
          {item.stat}
        </span>
      </motion.div>

      <div
        className="bg-cream/20 group-hover:bg-cream/50 hidden h-14 w-px transition-colors duration-300 md:col-span-1 md:block"
        aria-hidden
      />

      <motion.p
        style={{ x: reduced ? 0 : descX }}
        className="text-cream/60 group-hover:text-cream/85 max-w-xl text-sm leading-relaxed transition-colors duration-300 md:col-span-5 md:text-base"
      >
        {item.text}
      </motion.p>
    </motion.div>
  )
}