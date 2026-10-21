import { motion, useReducedMotion } from 'motion/react'
import { Workflow, Layers, TrendingUp, ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

type Card = {
  number: string
  icon: React.ElementType
  title: string
  description: string
  metrics?: { label: string; value: string }[]
  metricsTitle?: string
  metricsFooter?: string
}

const CARDS: Card[] = [
  {
    number: '01',
    icon: Workflow,
    title: 'O que construímos',
    description:
      'Não vendemos ferramentas. Entregamos o trabalho. Automatizamos processos manuais, construímos softwares sob medida e estruturamos operações de dados do zero — do mapeamento à entrega em produção. O cliente não compra um dashboard: compra a decisão resolvida.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Como trabalhamos',
    description:
      'Cada projeto começa entendendo onde a inteligência (tarefas repetitivas, baseadas em regras) pode ser automatizada e onde o julgamento humano (contexto, estratégia, exceções) continua essencial. O resultado é um sistema que executa o trabalho, não apenas uma ferramenta que o profissional precisa operar.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Founder track record',
    description:
      'Iniciativa construída por profissional com histórico comprovado em operações de grande escala. Cada solução nasce de um problema real, resolvido com dados e automação.',
    metricsTitle: 'Impacto já entregue',
    metrics: [
      { label: 'Capital liberado', value: 'R$ 25,5 mi' },
      { label: 'Economia anual', value: '+R$ 4 mi' },
      { label: 'Custo evitado', value: 'R$ 3,6 mi' },
      { label: 'Horas devolvidas', value: '+5.400h' },
      { label: 'Softwares', value: '+14' },
      { label: 'Projetos BI', value: '+19' },
    ],
    metricsFooter:
      'Números entregues pelo fundador em projetos anteriores e pela iniciativa Cosmos desde 2026.',
  },
]

export function Cosmos() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-navy text-cream relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(237,230,216,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
          }}
        />
        {!reduced && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 h-[45vh] w-[45vh] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(244,228,188,0.35), transparent)' }}
          />
        )}
      </div>

      <div className="relative mx-auto w-[min(92%,1280px)]">
        <SectionLabel variant="light">COSMOS</SectionLabel>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-bold">
              Iniciativa de tecnologia,
              <br />
              <span className="text-cream/50">construída por mim.</span>
            </h2>
            <p className="text-cream/70 mt-4 text-sm leading-relaxed md:text-base">
              A Cosmos nasceu da obsessão por resolver problemas complexos com tecnologia simples.
              Construímos automações, sistemas e operações de dados sob medida para quem já não
              pode depender de processos manuais para crescer.
            </p>
          </motion.div>

          <motion.a
            href="https://www.grupocosmos.com.br"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="group border-cream/20 hover:border-cream/60 hover:bg-cream/5 hidden items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-colors md:inline-flex"
          >
            Conhecer a Cosmos
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </motion.a>
        </div>

        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {CARDS.map((card, i) => (
            <CosmosCard key={card.number} card={card} index={i} />
          ))}
        </div>

        <motion.a
          href="https://www.grupocosmos.com.br"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-cream/20 hover:bg-cream/5 mt-10 flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-colors md:hidden"
        >
          Conhecer a Cosmos
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </motion.a>
      </div>
    </section>
  )
}

function CosmosCard({ card, index }: { card: Card; index: number }) {
  const reduced = useReducedMotion()
  const { icon: Icon } = card
  const isTrackRecord = !!card.metrics

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 30, filter: reduced ? 'blur(0)' : 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: reduced ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduced ? undefined : { y: -4 }}
      className={cn(
        'group rounded-brand border-cream/10 bg-cream/[0.04] relative flex flex-col overflow-hidden border p-6 backdrop-blur-sm transition-all duration-300 md:p-8',
        'hover:border-cream/30 hover:bg-cream/[0.07]',
        'hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]',
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 100% 0%, rgba(244,228,188,0.12), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between">
        <div className="border-cream/15 bg-cream/5 group-hover:border-cream/40 group-hover:bg-cream/10 flex h-11 w-11 items-center justify-center rounded-full border transition-colors">
          <Icon className="text-cream h-5 w-5" aria-hidden />
        </div>
        <span className="text-cream/25 font-mono text-[10px] font-bold tracking-[0.25em]">
          {card.number}
        </span>
      </div>

      <h3 className="text-cream relative mt-6 text-xl leading-tight font-bold md:text-2xl">
        {card.title}
      </h3>

      <p className="text-cream/65 group-hover:text-cream/80 relative mt-3 text-sm leading-relaxed transition-colors">
        {card.description}
      </p>

      {isTrackRecord && card.metrics && (
        <div className="border-cream/10 relative mt-6 border-t pt-5">
          <p className="text-cream/40 mb-3 text-[9px] font-bold tracking-[0.2em] uppercase">
            {card.metricsTitle}
          </p>
          <div className="grid grid-cols-3 gap-x-2 gap-y-3">
            {card.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-anton text-cream text-base leading-none md:text-lg">
                  {m.value}
                </p>
                <p className="text-cream/45 mt-1 text-[8px] leading-tight font-bold tracking-wider uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          {card.metricsFooter && (
            <p className="text-cream/35 mt-4 border-t border-cream/10 pt-3 text-[9px] leading-relaxed italic">
              {card.metricsFooter}
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}