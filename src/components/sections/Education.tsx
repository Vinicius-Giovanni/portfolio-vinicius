import { useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import { Award, BookOpen, ExternalLink } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

type EducationCard = {
  institution: string
  institutionColor: string
  title: string
  description: string
  tags: string[]
  type: 'certification' | 'degree'
}

const CARDS: EducationCard[] = [
  {
    institution: 'FIAP',
    institutionColor: '#E30613',
    title: 'Leadership Communication',
    description:
      'Nesta formação, aprendi a conectar a tecnologia aos negócios através de uma comunicação assertiva e de liderança. Desenvolvi competências práticas para traduzir dados e conceitos técnicos complexos em narrativas claras (Data Storytelling), conduzir apresentações de alto impacto para executivos e aplicar técnicas de escuta ativa e feedback estruturado para engajar equipes e eliminar ruídos nas operações.',
    tags: ['Comunicação', 'Feedback', 'Storytelling', 'Liderança'],
    type: 'certification',
  },
  {
    institution: 'FIAP',
    institutionColor: '#E30613',
    title: 'Gestão Financeira de Empresas',
    description:
      'Nesta formação, aprendi a analisar a saúde financeira de negócios e a avaliar decisões estratégicas de investimento e risco. Desenvolvi competências práticas para interpretar demonstrações financeiras (como a DRE), calcular indicadores de rentabilidade e liquidez, e otimizar carteiras e estruturas de capital através de modelos matemáticos e métricas de risco (como Markowitz e Valor em Risco), aplicando também boas práticas de governança corporativa.',
    tags: ['KPIs', 'Finanças', 'Governança', 'Tributação'],
    type: 'certification',
  },
  {
    institution: 'Databricks',
    institutionColor: '#FF3621',
    title: 'Data Analyst Learning Plan',
    description:
      'Nesta formação, aprendi a analisar grandes volumes de dados e a criar soluções modernas de inteligência de negócios de ponta a ponta. Desenvolvi competências práticas para realizar análises de dados de alta performance utilizando SQL Analytics no ambiente Databricks e a integrar inteligência artificial para otimizar a extração de insights, gerando relatórios de BI ágeis e acionáveis para tomadas de decisão rápidas.',
    tags: ['AI/BI for Data Analysts', 'SQL Analytics on Databricks'],
    type: 'certification',
  },
  {
    institution: 'Databricks',
    institutionColor: '#FF3621',
    title: 'Data Engineer Learning Plan',
    description:
      'Nesta formação, aprendi a construir, automatizar e monitorar pipelines de dados escaláveis dentro da plataforma Databricks. Desenvolvi competências práticas para realizar a ingestão de dados eficiente com o Lakeflow Connect, construir pipelines declarativos robustos com Spark, aplicar conceitos essenciais de DevOps na engenharia de dados e implantar e agendar cargas de trabalho de alta performance de forma orquestrada utilizando o Lakeflow Jobs.',
    tags: ['Lakeflow Connect', 'Declarative Pipelines with Lakeflow Spark', 'DevOps', 'Lakeflow Jobs'],
    type: 'certification',
  },
  {
    institution: 'UNICV',
    institutionColor: '#00A86B',
    title: 'Bacharelado em Engenharia de Dados',
    description:
      'Ao longo da formação, aprendi os fundamentos essenciais de dados, compreendendo como as informações são coletadas, armazenadas e processadas nas empresas. Desenvolvi uma base sólida em lógica de programação, modelagem e estruturação de bancos de dados, e aprendi a construir os primeiros fluxos de integração e organização de dados para transformá-los em relatórios e ferramentas úteis para a tomada de decisão.',
    tags: ['Big Data Fundamentals', 'IA & Big Data', 'Pipelines'],
    type: 'degree',
  },
]

export function Education() {
  return (
    <section data-snap="start" className="bg-cream relative overflow-hidden py-24 md:py-32">
      {/* Grid pontilhado de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, #0B1F3A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto w-[min(92%,1280px)]">
        <SectionLabel>FORMAÇÃO E CERTIFICAÇÕES</SectionLabel>

        {/* Header editorial */}
        <div className="mt-10 mb-14 flex flex-wrap items-baseline gap-4 md:gap-8">
          <div>
            <span className="font-anton text-navy text-[clamp(3rem,8vw,6rem)] leading-none">
              05
            </span>
            <p className="text-navy/60 mt-1 text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs">
              Credenciais
            </p>
          </div>
          <div className="font-anton text-navy/20 text-[clamp(2rem,4vw,3rem)] leading-none">
            /
          </div>
          <div>
            <span className="font-anton text-navy text-[clamp(3rem,8vw,6rem)] leading-none">
              03
            </span>
            <p className="text-navy/60 mt-1 text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs">
              Instituições
            </p>
          </div>
        </div>

        {/* Timeline + cards */}
        <div className="relative">
          {/* Linha vertical decorativa */}
          <div
            className="bg-navy/15 absolute top-0 bottom-0 left-3 hidden w-px md:block md:left-[calc(2.5rem-1px)]"
            aria-hidden
          />

          <div className="flex flex-col gap-5 md:gap-6 md:pl-24">
            {CARDS.map((card, i) => (
              <EducationCardView key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationCardView({ card, index }: { card: EducationCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} className="relative">
      {/* Node da timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: 'backOut' }}
        className="border-navy/30 bg-cream absolute top-8 -left-[calc(2.5rem-1px)] z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 md:block"
        style={{ backgroundColor: card.institutionColor }}
      >
        {card.type === 'degree' && (
          <motion.span
            animate={
              reduced ? undefined : { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full"
            style={{ background: card.institutionColor }}
          />
        )}
      </motion.div>

      <motion.article
        initial={{
          opacity: 0,
          x: reduced ? 0 : -30,
          filter: reduced ? 'blur(0px)' : 'blur(6px)',
        }}
        animate={
          inView
            ? { opacity: 1, x: 0, filter: 'blur(0px)' }
            : { opacity: 0, x: reduced ? 0 : -30, filter: 'blur(6px)' }
        }
        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-brand border-navy/15 bg-cream/60 relative overflow-hidden border p-6 shadow-[0_4px_14px_rgba(11,31,58,0.04)] backdrop-blur-sm transition-all duration-500 hover:border-navy/40 hover:bg-cream hover:shadow-[0_20px_50px_-12px_rgba(11,31,58,0.15)] md:p-8"
      >
        {/* Watermark gigante com nome da instituição */}
        <span
          className="font-anton text-navy/[0.04] pointer-events-none absolute -top-2 right-4 leading-none select-none md:right-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          aria-hidden
        >
          {card.institution}
        </span>

        {/* Glow colorido no hover (cor da instituição) */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${card.institutionColor}15, transparent 50%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="relative grid gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
          {/* Coluna esquerda — institution + title */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: card.institutionColor }}
              />
              <p className="text-navy/60 text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs">
                {card.institution}
              </p>
              {card.type === 'degree' && (
                <span className="bg-navy text-cream ml-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase">
                  Graduação
                </span>
              )}
            </div>

            <h3 className="text-navy mt-3 text-2xl leading-tight font-bold md:text-3xl">
              {card.title}
            </h3>

            {/* Ícone decorativo */}
            <div className="mt-4 flex items-center gap-2 text-navy/40">
              {card.type === 'degree' ? (
                <BookOpen className="h-4 w-4" aria-hidden />
              ) : (
                <Award className="h-4 w-4" aria-hidden />
              )}
              <span className="text-[10px] font-medium tracking-wider uppercase">
                {card.type === 'degree' ? 'Bacharelado' : 'Certificação'}
              </span>
            </div>
          </div>

          {/* Coluna direita — description + tags */}
          <div>
            <p className="text-navy/75 text-sm leading-relaxed md:text-base">
              {card.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5 md:gap-2">
              {card.tags.map((tag, tagIdx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08 + 0.5 + tagIdx * 0.05,
                    ease: 'easeOut',
                  }}
                  className={cn(
                    'border-navy/25 text-navy rounded-full border px-3 py-1 text-[11px] font-medium transition-colors duration-300',
                    'hover:bg-navy hover:text-cream hover:border-navy',
                  )}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}